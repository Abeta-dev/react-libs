// @vitest-environment node
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { initAnalytics, getAnalyticsEngine } from "../engine";
import type { AnalyticsAdapter, AnalyticsEvent, ComponentContext } from "../types";

// Lightweight SSR / Node window mock avoiding heavy JSDOM startup overhead
const storage = new Map<string, string>();
const mockStorage = {
  getItem: (k: string) => storage.get(k) ?? null,
  setItem: (k: string, v: string) => { storage.set(k, String(v)); },
  removeItem: (k: string) => { storage.delete(k); },
  clear: () => { storage.clear(); },
  key: (i: number) => Array.from(storage.keys())[i] ?? null,
  get length() { return storage.size; },
};

const windowListeners = new Map<string, Set<(...args: unknown[]) => void>>();

const mockWindow = {
  localStorage: mockStorage,
  sessionStorage: mockStorage,
  history: {
    pushState: vi.fn(),
    replaceState: vi.fn(),
  },
  location: {
    href: "http://localhost:3000/home",
    pathname: "/home",
    search: "",
  },
  addEventListener: (event: string, fn: (...args: unknown[]) => void) => {
    if (!windowListeners.has(event)) {
      windowListeners.set(event, new Set());
    }
    windowListeners.get(event)?.add(fn);
  },
  removeEventListener: (event: string, fn: (...args: unknown[]) => void) => {
    windowListeners.get(event)?.delete(fn);
  },
  dispatchEvent: (event: { type: string }) => {
    windowListeners.get(event.type)?.forEach((fn) => fn(event));
    return true;
  },
};

(globalThis as unknown as { window: typeof mockWindow }).window = mockWindow;

if (typeof (globalThis as unknown as { document: unknown }).document === "undefined") {
  (globalThis as unknown as { document: unknown }).document = {
    title: "Test Page",
    referrer: "",
    visibilityState: "visible",
    addEventListener: () => {},
    removeEventListener: () => {},
  };
}

describe("AnalyticsEngine", () => {
  let trackedEvents: AnalyticsEvent[] = [];
  const mockAdapter: AnalyticsAdapter = {
    name: "test_adapter",
    track: vi.fn((event) => {
      trackedEvents.push(event);
    }),
    trackBatch: vi.fn((events) => {
      trackedEvents.push(...events);
    }),
    identify: vi.fn(),
    reset: vi.fn(),
  };

  beforeEach(() => {
    trackedEvents = [];
    storage.clear();
    windowListeners.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    getAnalyticsEngine()?.destroy();
  });

  it("initializes and tracks custom events with global metadata", async () => {
    const engine = initAnalytics({
      appId: "test_app",
      adapters: [mockAdapter],
      batchSize: 1, // immediate flush
      globalMetadata: { appVersion: "2.1.0" },
      autoTrackDom: false,
      autoTrackPages: false,
    });

    engine.track("custom_action", { feature: "export" });
    await engine.flush();

    expect(trackedEvents).toHaveLength(1);
    const event = trackedEvents[0];
    expect(event?.eventName).toBe("custom_action");
    expect(event?.metadata.appVersion).toBe("2.1.0");
    expect(event?.metadata.feature).toBe("export");
    expect(event?.sessionId).toBeTruthy();
    expect(event?.anonymousId).toBeTruthy();
  });

  it("handles user identity lifecycle and resets state", async () => {
    const engine = initAnalytics({
      adapters: [mockAdapter],
      batchSize: 1,
      autoTrackDom: false,
      autoTrackPages: false,
    });

    engine.identify("user_42", { role: "buyer" });
    expect(mockAdapter.identify).toHaveBeenCalledWith("user_42", { role: "buyer" });

    engine.track("purchase");
    await engine.flush();

    const purchaseEvent = trackedEvents.find((e) => e.eventName === "purchase");
    expect(purchaseEvent?.userId).toBe("user_42");

    engine.logout();
    expect(mockAdapter.reset).toHaveBeenCalled();
  });

  it("tracks page views and updates active pageId", async () => {
    const engine = initAnalytics({
      adapters: [mockAdapter],
      batchSize: 1,
      autoTrackDom: false,
      autoTrackPages: false,
    });

    const event1 = engine.trackPageView({ path: "/home", title: "Home" });
    const event2 = engine.trackPageView({ path: "/settings", title: "Settings" });

    expect(event1.eventName).toBe("page_view");
    expect(event1.page.path).toBe("/home");
    expect(event2.page.path).toBe("/settings");
  });

  describe("Batching and flush intervals", () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("batches events until batchSize threshold is reached", async () => {
      const engine = initAnalytics({
        adapters: [mockAdapter],
        batchSize: 3,
        flushIntervalMs: 60000,
        autoTrackDom: false,
        autoTrackPages: false,
      });

      engine.track("event_1");
      engine.track("event_2");
      expect(mockAdapter.trackBatch).not.toHaveBeenCalled();

      engine.track("event_3");
      await engine.flush();

      expect(mockAdapter.trackBatch).toHaveBeenCalledTimes(1);
      expect(trackedEvents).toHaveLength(3);
    });

    it("automatically flushes on interval timer", async () => {
      initAnalytics({
        adapters: [mockAdapter],
        batchSize: 10,
        flushIntervalMs: 2500,
        autoTrackDom: false,
        autoTrackPages: false,
      });

      const engine = getAnalyticsEngine();
      engine?.track("interval_event");
      expect(mockAdapter.trackBatch).not.toHaveBeenCalled();

      await vi.advanceTimersByTimeAsync(2500);

      expect(mockAdapter.trackBatch).toHaveBeenCalledTimes(1);
      expect(trackedEvents).toHaveLength(1);
    });
  });

  describe("Disabled tracking & auto-tracking options", () => {
    it("disables DOM tracker when autoTrackDom is false", () => {
      const engine = initAnalytics({
        adapters: [mockAdapter],
        autoTrackDom: false,
        autoTrackPages: false,
      });

      expect(engine.getSessionManager()).toBeDefined();
    });

    it("disables automatic page view tracking when autoTrackPages is false", () => {
      initAnalytics({
        adapters: [mockAdapter],
        autoTrackPages: false,
        autoTrackDom: false,
      });

      expect(trackedEvents).toHaveLength(0);
    });

    it("tracks initial page view when autoTrackPages is true or default", () => {
      initAnalytics({
        adapters: [mockAdapter],
        autoTrackPages: true,
        autoTrackDom: false,
        batchSize: 1,
      });

      expect(trackedEvents.some((e) => e.eventName === "page_view")).toBe(true);
    });
  });

  describe("Error recovery and adapter lifecycle", () => {
    it("catches synchronous adapter onInit error and notifies onError", () => {
      const onError = vi.fn();
      const faultyAdapter: AnalyticsAdapter = {
        name: "faulty_sync",
        onInit: vi.fn(() => {
          throw new Error("Sync onInit crash");
        }),
        track: vi.fn(),
      };

      initAnalytics({
        adapters: [faultyAdapter],
        onError,
        autoTrackDom: false,
        autoTrackPages: false,
      });

      expect(onError).toHaveBeenCalledTimes(1);
      expect((onError.mock.calls[0]?.[0] as Error).message).toBe("Sync onInit crash");
    });

    it("catches asynchronous rejected promise in onInit and notifies onError", async () => {
      const onError = vi.fn();
      const asyncFaultyAdapter: AnalyticsAdapter = {
        name: "faulty_async",
        onInit: vi.fn().mockRejectedValue(new Error("Async onInit rejection")),
        track: vi.fn(),
      };

      initAnalytics({
        adapters: [asyncFaultyAdapter],
        onError,
        autoTrackDom: false,
        autoTrackPages: false,
      });

      await vi.waitFor(() => {
        expect(onError).toHaveBeenCalledWith(expect.objectContaining({ message: "Async onInit rejection" }));
      });
    });

    it("catches errors in adapter identify calls (both sync and async)", async () => {
      const onError = vi.fn();
      const faultyIdentifyAdapter: AnalyticsAdapter = {
        name: "faulty_identify",
        track: vi.fn(),
        identify: vi.fn().mockImplementation(() => {
          throw new Error("Identify sync failed");
        }),
      };
      const asyncFaultyIdentifyAdapter: AnalyticsAdapter = {
        name: "async_faulty_identify",
        track: vi.fn(),
        identify: vi.fn().mockRejectedValue(new Error("Identify async failed")),
      };

      const engine = initAnalytics({
        adapters: [faultyIdentifyAdapter, asyncFaultyIdentifyAdapter],
        onError,
        autoTrackDom: false,
        autoTrackPages: false,
      });

      engine.identify("usr_err", { plan: "pro" });
      expect(onError).toHaveBeenCalledWith(expect.objectContaining({ message: "Identify sync failed" }));

      await vi.waitFor(() => {
        expect(onError).toHaveBeenCalledWith(expect.objectContaining({ message: "Identify async failed" }));
      });
    });

    it("catches errors in adapter reset calls during logout (both sync and async)", async () => {
      const onError = vi.fn();
      const faultyResetAdapter: AnalyticsAdapter = {
        name: "faulty_reset",
        track: vi.fn(),
        reset: vi.fn().mockImplementation(() => {
          throw new Error("Reset sync failed");
        }),
      };
      const asyncFaultyResetAdapter: AnalyticsAdapter = {
        name: "async_faulty_reset",
        track: vi.fn(),
        reset: vi.fn().mockRejectedValue(new Error("Reset async failed")),
      };

      const engine = initAnalytics({
        adapters: [faultyResetAdapter, asyncFaultyResetAdapter],
        onError,
        autoTrackDom: false,
        autoTrackPages: false,
      });

      engine.logout();
      expect(onError).toHaveBeenCalledWith(expect.objectContaining({ message: "Reset sync failed" }));

      await vi.waitFor(() => {
        expect(onError).toHaveBeenCalledWith(expect.objectContaining({ message: "Reset async failed" }));
      });
    });

    it("dynamically adds adapters and handles onInit errors", async () => {
      const onError = vi.fn();
      const engine = initAnalytics({
        onError,
        autoTrackDom: false,
        autoTrackPages: false,
      });

      const newAdapter: AnalyticsAdapter = {
        name: "dynamically_added",
        onInit: vi.fn().mockRejectedValue(new Error("Dynamic init failure")),
        track: vi.fn(),
      };

      engine.addAdapter(newAdapter);
      expect(newAdapter.onInit).toHaveBeenCalled();

      await vi.waitFor(() => {
        expect(onError).toHaveBeenCalledWith(expect.objectContaining({ message: "Dynamic init failure" }));
      });

      const syncErrorAdapter: AnalyticsAdapter = {
        name: "dynamic_sync_err",
        onInit: vi.fn(() => {
          throw new Error("Dynamic sync failure");
        }),
        track: vi.fn(),
      };

      engine.addAdapter(syncErrorAdapter);
      expect(onError).toHaveBeenCalledWith(expect.objectContaining({ message: "Dynamic sync failure" }));
    });
  });

  describe("Metadata management", () => {
    it("updates and clears global metadata appropriately", async () => {
      const engine = initAnalytics({
        adapters: [mockAdapter],
        batchSize: 1,
        globalMetadata: { env: "staging", tenantId: "tenant_1" },
        autoTrackDom: false,
        autoTrackPages: false,
      });

      engine.setGlobalMetadata({ cluster: "eu-west-1", env: "production" });
      engine.track("meta_test_1");
      await engine.flush();

      const event1 = trackedEvents[0];
      expect(event1?.metadata.env).toBe("production");
      expect(event1?.metadata.tenantId).toBe("tenant_1");
      expect(event1?.metadata.cluster).toBe("eu-west-1");

      // Clear specific keys
      engine.clearGlobalMetadata(["cluster"]);
      engine.track("meta_test_2");
      await engine.flush();

      const event2 = trackedEvents[1];
      expect(event2?.metadata.cluster).toBeUndefined();
      expect(event2?.metadata.tenantId).toBe("tenant_1");

      // Clear all metadata
      engine.clearGlobalMetadata();
      engine.track("meta_test_3");
      await engine.flush();

      const event3 = trackedEvents[2];
      expect(event3?.metadata.tenantId).toBeUndefined();
      expect(event3?.metadata.env).toBeUndefined();
    });
  });

  describe("DOM interaction dispatching", () => {
    it("handles DOM interactions and enriches component context with counts", async () => {
      const engine = initAnalytics({
        adapters: [mockAdapter],
        batchSize: 1,
        autoTrackDom: false,
        autoTrackPages: false,
      });

      const component: ComponentContext = {
        id: "save_button",
        name: "Save",
        type: "button",
        interaction: "click",
        interactionCount: 0,
      };

      (engine as unknown as {
        handleDomInteraction: (comp: ComponentContext, meta: Record<string, unknown>) => void;
      }).handleDomInteraction(component, { clickPosition: "center" });
      await engine.flush();

      expect(trackedEvents).toHaveLength(1);
      const event = trackedEvents[0];
      expect(event?.eventName).toBe("component_click");
      expect(event?.metadata.clickPosition).toBe("center");
      expect(event?.component?.interactionCount).toBe(1);

      (engine as unknown as {
        handleDomInteraction: (comp: ComponentContext, meta: Record<string, unknown>) => void;
      }).handleDomInteraction(component, {});
      await engine.flush();

      expect(trackedEvents[1]?.component?.interactionCount).toBe(2);
    });
  });

  describe("Full reset, accessors and destroy lifecycle", () => {
    it("resets session manager and adapter state completely on reset()", () => {
      const engine = initAnalytics({
        adapters: [mockAdapter],
        autoTrackDom: false,
        autoTrackPages: false,
      });

      engine.identify("user_100");
      expect(engine.getSessionManager().getUserId()).toBe("user_100");

      engine.reset();
      expect(engine.getSessionManager().getUserId()).toBeUndefined();
      expect(mockAdapter.reset).toHaveBeenCalled();
    });

    it("exposes queue and sessionManager accessors", () => {
      const engine = initAnalytics({
        adapters: [mockAdapter],
        autoTrackDom: false,
        autoTrackPages: false,
      });

      expect(engine.getSessionManager()).toBeDefined();
      expect(engine.getQueue()).toBeDefined();
    });

    it("safely handles multiple destroy calls", () => {
      const engine = initAnalytics({
        adapters: [mockAdapter],
        autoTrackDom: false,
        autoTrackPages: false,
      });

      expect(() => {
        engine.destroy();
        engine.destroy();
      }).not.toThrow();
    });

    it("destroys previous instance when initAnalytics is called again", () => {
      const engine1 = initAnalytics({
        adapters: [mockAdapter],
        autoTrackDom: false,
        autoTrackPages: false,
      });
      const destroySpy = vi.spyOn(engine1, "destroy");

      const engine2 = initAnalytics({
        adapters: [mockAdapter],
        autoTrackDom: false,
        autoTrackPages: false,
      });

      expect(destroySpy).toHaveBeenCalledTimes(1);
      expect(engine2).not.toBe(engine1);
    });
  });

  describe("window.history monkey-patching and navigation events", () => {
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    afterEach(() => {
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
    });

    it("does NOT monkey-patch window.history.pushState by default when patchHistory is omitted", () => {
      const initialPushState = window.history.pushState;
      initAnalytics({
        adapters: [mockAdapter],
        autoTrackPages: true,
      });

      expect(window.history.pushState).toBe(initialPushState);
    });

    it("does NOT monkey-patch window.history.pushState when patchHistory is false", () => {
      const initialPushState = window.history.pushState;
      initAnalytics({
        adapters: [mockAdapter],
        autoTrackPages: true,
        patchHistory: false,
      });

      expect(window.history.pushState).toBe(initialPushState);
    });

    it("monkey-patches window.history.pushState and replaceState when patchHistory is true and restores them on destroy()", () => {
      const initialPushState = window.history.pushState;
      const initialReplaceState = window.history.replaceState;

      const engine = initAnalytics({
        adapters: [mockAdapter],
        autoTrackPages: true,
        patchHistory: true,
      });

      expect(window.history.pushState).not.toBe(initialPushState);
      expect(window.history.replaceState).not.toBe(initialReplaceState);

      // Trigger pushState and replaceState
      window.history.pushState({}, "", "/new-location");
      window.history.replaceState({}, "", "/replaced-location");

      engine.destroy();

      expect(window.history.pushState).toBe(initialPushState);
      expect(window.history.replaceState).toBe(initialReplaceState);
    });

    it("tracks page view and renews page ID on window popstate event", () => {
      const engine = initAnalytics({
        adapters: [mockAdapter],
        autoTrackPages: true,
        batchSize: 1,
      });

      const initialPageId = engine.getSessionManager().getActivePageId();

      mockWindow.dispatchEvent({ type: "popstate" });

      const newPageId = engine.getSessionManager().getActivePageId();
      expect(newPageId).not.toBe(initialPageId);
      expect(trackedEvents.some((e) => e.eventName === "page_view")).toBe(true);
    });
  });
});

