import * as React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act, renderHook } from "@testing-library/react";
import {
  AnalyticsProvider,
  useAnalytics,
  TrackArea,
  PageViewTracker,
} from "../react";
import { initAnalytics, getAnalyticsEngine } from "../engine";
import type { AnalyticsAdapter, AnalyticsConfig, AnalyticsEvent } from "../types";

describe("React Analytics Integration", () => {
  let trackedEvents: AnalyticsEvent[] = [];
  const mockAdapter: AnalyticsAdapter = {
    name: "react_mock",
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
    vi.clearAllMocks();
  });

  afterEach(() => {
    getAnalyticsEngine()?.destroy();
  });

  function TestButton() {
    const { track, trackPageView, identify, setGlobalMetadata, logout } = useAnalytics();
    return (
      <div>
        <button onClick={() => track("custom_click", { buttonId: "btn_test" })}>
          Click Me
        </button>
        <button onClick={() => trackPageView({ path: "/test-page", title: "Test Page" })}>
          Track Page
        </button>
        <button onClick={() => identify("user_react", { role: "admin" })}>
          Identify User
        </button>
        <button onClick={() => setGlobalMetadata({ orgId: "org_1" })}>
          Set Metadata
        </button>
        <button onClick={() => logout()}>
          Logout
        </button>
      </div>
    );
  }

  it("provides useAnalytics hook through AnalyticsProvider and exercises all context methods", async () => {
    const engine = initAnalytics({
      adapters: [mockAdapter],
      batchSize: 1,
      autoTrackDom: false,
      autoTrackPages: false,
    });

    render(
      <AnalyticsProvider engine={engine}>
        <TestButton />
      </AnalyticsProvider>
    );

    // Track click
    screen.getByText("Click Me").click();
    await engine.flush();
    expect(trackedEvents.some((e) => e.eventName === "custom_click")).toBe(true);

    // Track page view
    screen.getByText("Track Page").click();
    await engine.flush();
    expect(trackedEvents.some((e) => e.eventName === "page_view" && e.page.path === "/test-page")).toBe(true);

    // Identify
    screen.getByText("Identify User").click();
    expect(mockAdapter.identify).toHaveBeenCalledWith("user_react", { role: "admin" });

    // Set metadata
    screen.getByText("Set Metadata").click();
    screen.getByText("Click Me").click();
    await engine.flush();
    const lastEvent = trackedEvents[trackedEvents.length - 1];
    expect(lastEvent?.metadata.orgId).toBe("org_1");

    // Logout
    screen.getByText("Logout").click();
    expect(mockAdapter.reset).toHaveBeenCalled();

    engine.destroy();
  });

  describe("TrackArea component", () => {
    it("renders TrackArea with proper data attributes and handles undefined metadata", () => {
      const { container } = render(
        <TrackArea
          journey="checkout_funnel"
          step="shipping"
          metadata={{ courier: "express" }}
        >
          <span>Content</span>
        </TrackArea>
      );

      const area = container.querySelector("[data-track-area]");
      expect(area).toBeInTheDocument();
      expect(area).toHaveAttribute("data-track-area-journey", "checkout_funnel");
      expect(area).toHaveAttribute("data-track-area-step", "shipping");
      expect(area).toHaveAttribute(
        "data-track-area-metadata",
        JSON.stringify({ courier: "express" })
      );

      // Render without metadata
      const { container: containerNoMeta } = render(
        <TrackArea journey="onboarding">
          <span>Bare</span>
        </TrackArea>
      );
      const bareArea = containerNoMeta.querySelector("[data-track-area]");
      expect(bareArea).not.toHaveAttribute("data-track-area-metadata");
    });

    it("renders TrackArea with area prop as alias for journey", () => {
      const { container } = render(
        <TrackArea area="invoice_management" step="review">
          <span>Invoice Content</span>
        </TrackArea>
      );

      const area = container.querySelector("[data-track-area]");
      expect(area).toBeInTheDocument();
      expect(area).toHaveAttribute("data-track-area-journey", "invoice_management");
      expect(area).toHaveAttribute("data-track-area-step", "review");
    });

    it("forwards ref and passes through custom HTML attributes and className", () => {
      const ref = React.createRef<HTMLDivElement>();

      const { container } = render(
        <TrackArea
          ref={ref}
          journey="settings"
          className="custom-track-class"
          id="settings-track-area"
          aria-label="Settings Area"
        >
          <div>Settings Content</div>
        </TrackArea>
      );

      expect(ref.current).toBe(container.firstChild);
      expect(ref.current).toHaveClass("custom-track-class");
      expect(ref.current).toHaveAttribute("id", "settings-track-area");
      expect(ref.current).toHaveAttribute("aria-label", "Settings Area");
    });
  });

  describe("PageViewTracker component", () => {
    it("automatically dispatches page view on mount and on prop updates", async () => {
      const engine = initAnalytics({
        adapters: [mockAdapter],
        batchSize: 1,
        autoTrackDom: false,
        autoTrackPages: false,
      });

      const { rerender } = render(
        <AnalyticsProvider engine={engine}>
          <PageViewTracker pageTitle="Dashboard" path="/app/dashboard" metadata={{ source: "nav" }} />
        </AnalyticsProvider>
      );

      await engine.flush();
      const pageEvent1 = trackedEvents.find((e) => e.page.path === "/app/dashboard");
      expect(pageEvent1).toBeDefined();
      expect(pageEvent1?.page.title).toBe("Dashboard");
      expect(pageEvent1?.metadata.source).toBe("nav");

      // Rerender with new path and title
      rerender(
        <AnalyticsProvider engine={engine}>
          <PageViewTracker pageTitle="Reports" path="/app/reports" />
        </AnalyticsProvider>
      );

      await engine.flush();
      const pageEvent2 = trackedEvents.find((e) => e.page.path === "/app/reports");
      expect(pageEvent2).toBeDefined();
      expect(pageEvent2?.page.title).toBe("Reports");

      engine.destroy();
    });

    it("handles partial props when only pageTitle or only path is provided", async () => {
      const engine = initAnalytics({
        adapters: [mockAdapter],
        batchSize: 1,
        autoTrackDom: false,
        autoTrackPages: false,
      });

      const { rerender } = render(
        <AnalyticsProvider engine={engine}>
          <PageViewTracker pageTitle="Only Title" />
        </AnalyticsProvider>
      );

      await engine.flush();
      expect(trackedEvents.some((e) => e.page.title === "Only Title")).toBe(true);

      rerender(
        <AnalyticsProvider engine={engine}>
          <PageViewTracker path="/only-path" />
        </AnalyticsProvider>
      );

      await engine.flush();
      expect(trackedEvents.some((e) => e.page.path === "/only-path")).toBe(true);

      engine.destroy();
    });
  });

  describe("AnalyticsProvider configuration and lifecycle", () => {
    it("does not re-initialize or destroy engine when config and onError are inline on 5x parent re-renders", () => {
      const capturedEngines: { pass: number; engine: unknown }[] = [];

      function ConsumerComponent({ pass }: { pass: number }) {
        const { engine } = useAnalytics();
        capturedEngines.push({ pass, engine });
        return <div>Pass: {pass}</div>;
      }

      function Parent({ pass }: { pass: number }) {
        return (
          <AnalyticsProvider
            config={{
              appId: "stable-app-5x",
              autoTrackDom: false,
              autoTrackPages: false,
            }}
            onError={() => {}}
          >
            <ConsumerComponent pass={pass} />
          </AnalyticsProvider>
        );
      }

      const { rerender } = render(<Parent pass={1} />);
      const initialEngine = capturedEngines[0]?.engine as { destroy: () => void };
      expect(initialEngine).toBeTruthy();

      const destroySpy = vi.spyOn(initialEngine, "destroy");

      for (let pass = 2; pass <= 5; pass++) {
        rerender(<Parent pass={pass} />);
      }

      expect(destroySpy).not.toHaveBeenCalled();
      expect(capturedEngines.length).toBe(5);
      for (let i = 1; i < 5; i++) {
        expect(capturedEngines[i]?.engine).toBe(initialEngine);
      }

      destroySpy.mockRestore();
      initialEngine.destroy();
    });

    it("re-initializes engine when critical config properties change", async () => {
      const capturedEngines: unknown[] = [];

      function Consumer() {
        const { engine } = useAnalytics();
        capturedEngines.push(engine);
        return <div>Consumer</div>;
      }

      const { rerender } = render(
        <AnalyticsProvider
          config={{
            appId: "app-v1",
            batchSize: 5,
            autoTrackDom: false,
            autoTrackPages: false,
          }}
        >
          <Consumer />
        </AnalyticsProvider>
      );

      const engine1 = capturedEngines[0] as { destroy: () => void };
      const destroySpy = vi.spyOn(engine1, "destroy");

      // Rerender with different batchSize
      rerender(
        <AnalyticsProvider
          config={{
            appId: "app-v1",
            batchSize: 20,
            autoTrackDom: false,
            autoTrackPages: false,
          }}
        >
          <Consumer />
        </AnalyticsProvider>
      );

      expect(destroySpy).toHaveBeenCalled();
      const engine2 = capturedEngines[capturedEngines.length - 1];
      expect(engine2).not.toBe(engine1);

      // Rerender with different adapters, maskPatterns, or globalMetadata
      rerender(
        <AnalyticsProvider
          config={{
            appId: "app-v1",
            batchSize: 20,
            globalMetadata: { newKey: "val" },
            maskPatterns: [/test/],
            adapters: [{ name: "different_adapter", track: vi.fn() }],
            autoTrackDom: false,
            autoTrackPages: false,
          }}
        >
          <Consumer />
        </AnalyticsProvider>
      );

      const engine3 = capturedEngines[capturedEngines.length - 1];
      expect(engine3).not.toBe(engine2);
    });

    it("destroys internal engine on provider unmount", () => {
      let capturedEngine: { destroy: () => void } | null = null;

      function Consumer() {
        const { engine } = useAnalytics();
        capturedEngine = engine as { destroy: () => void } | null;
        return <div>Consumer</div>;
      }

      const { unmount } = render(
        <AnalyticsProvider
          config={{
            appId: "unmount-test",
            autoTrackDom: false,
            autoTrackPages: false,
          }}
        >
          <Consumer />
        </AnalyticsProvider>
      );

      expect(capturedEngine).toBeTruthy();
      const destroySpy = vi.spyOn(capturedEngine!, "destroy");

      unmount();
      expect(destroySpy).toHaveBeenCalledTimes(1);
    });

    it("does NOT destroy external engine on provider unmount", () => {
      const externalEngine = initAnalytics({
        adapters: [mockAdapter],
        autoTrackDom: false,
        autoTrackPages: false,
      });
      const destroySpy = vi.spyOn(externalEngine, "destroy");

      const { unmount } = render(
        <AnalyticsProvider engine={externalEngine}>
          <div>External Engine Consumer</div>
        </AnalyticsProvider>
      );

      unmount();
      // External engine should NOT be destroyed on provider unmount
      expect(destroySpy).not.toHaveBeenCalled();

      externalEngine.destroy();
    });

    it("switches engine when external engine prop changes", () => {
      const engineA = initAnalytics({ appId: "A", autoTrackDom: false, autoTrackPages: false });
      const engineB = initAnalytics({ appId: "B", autoTrackDom: false, autoTrackPages: false });

      let currentEngine: unknown = null;
      function Consumer() {
        const { engine } = useAnalytics();
        currentEngine = engine;
        return <div>Consumer</div>;
      }

      const { rerender } = render(
        <AnalyticsProvider engine={engineA}>
          <Consumer />
        </AnalyticsProvider>
      );
      expect(currentEngine).toBe(engineA);

      rerender(
        <AnalyticsProvider engine={engineB}>
          <Consumer />
        </AnalyticsProvider>
      );
      expect(currentEngine).toBe(engineB);

      engineA.destroy();
      engineB.destroy();
    });

    it("updates onErrorRef without re-creating engine when only onError prop changes", () => {
      let currentEngine: unknown = null;
      function ErrorConsumer() {
        const { engine } = useAnalytics();
        currentEngine = engine;
        return <span data-testid="err-consumer">Consumer With Error Handler</span>;
      }

      const config: AnalyticsConfig = {
        appId: "stable-config",
        autoTrackDom: false,
        autoTrackPages: false,
      };

      const { rerender } = render(
        <AnalyticsProvider config={config} onError={() => {}}>
          <ErrorConsumer />
        </AnalyticsProvider>
      );
      const firstEngine = currentEngine;

      // Rerender with new onError callback reference
      rerender(
        <AnalyticsProvider config={config} onError={() => {}}>
          <ErrorConsumer />
        </AnalyticsProvider>
      );

      expect(currentEngine).toBe(firstEngine);
    });
  });

  describe("useAnalytics outside provider fallback", () => {
    it("falls back to global singleton engine when used outside AnalyticsProvider", async () => {
      const globalEngine = initAnalytics({
        adapters: [mockAdapter],
        batchSize: 1,
        autoTrackDom: false,
        autoTrackPages: false,
      });

      const { result } = renderHook(() => useAnalytics());

      expect(result.current.engine).toBe(globalEngine);

      act(() => {
        result.current.track("outside_click");
        result.current.trackPageView({ path: "/outside" });
        result.current.identify("user_outside");
        result.current.setGlobalMetadata({ global: "yes" });
        result.current.logout();
      });

      await globalEngine.flush();

      expect(trackedEvents.some((e) => e.eventName === "outside_click")).toBe(true);
      expect(mockAdapter.identify).toHaveBeenCalledWith("user_outside", undefined);
      expect(mockAdapter.reset).toHaveBeenCalled();

      globalEngine.destroy();
    });

    it("safely handles method calls without throwing when used outside provider and no global engine exists", () => {
      // Ensure no global engine
      getAnalyticsEngine()?.destroy();

      const { result } = renderHook(() => useAnalytics());

      expect(result.current).toBeDefined();

      expect(() => {
        result.current.track("noop_event");
        result.current.trackPageView();
        result.current.identify("usr");
        result.current.setGlobalMetadata({ a: 1 });
        result.current.logout();
      }).not.toThrow();
    });

    it("attaches to global singleton when AnalyticsProvider has no props", () => {
      const globalEngine = initAnalytics({
        appId: "global-no-props",
        autoTrackDom: false,
        autoTrackPages: false,
      });

      const { result } = renderHook(() => useAnalytics(), {
        wrapper: ({ children }: { children: React.ReactNode }) => (
          <AnalyticsProvider>{children}</AnalyticsProvider>
        ),
      });

      expect(result.current.engine).toBe(globalEngine);
      globalEngine.destroy();
    });

    it("forwards internal engine errors to provider onError callback on config update", () => {
      const onErrorSpy = vi.fn();
      const faultyAdapter: AnalyticsAdapter = {
        name: "faulty_provider_adapter",
        onInit: () => {
          throw new Error("Provider init failure");
        },
        track: vi.fn(),
      };

      const { rerender } = render(
        <AnalyticsProvider
          config={{
            appId: "v1-init",
            autoTrackDom: false,
            autoTrackPages: false,
          }}
          onError={onErrorSpy}
        >
          <div>Child</div>
        </AnalyticsProvider>
      );

      rerender(
        <AnalyticsProvider
          config={{
            appId: "v2-faulty",
            adapters: [faultyAdapter],
            autoTrackDom: false,
            autoTrackPages: false,
          }}
          onError={onErrorSpy}
        >
          <div>Child</div>
        </AnalyticsProvider>
      );

      expect(onErrorSpy).toHaveBeenCalledWith(
        expect.objectContaining({ message: "Provider init failure" })
      );
    });

    it("detects changes across sessionTimeoutMs, maxOfflineQueue, and prefix config properties", () => {
      const capturedEngines: unknown[] = [];
      function ConfigConsumer() {
        const { engine } = useAnalytics();
        capturedEngines.push(engine);
        return <h4>Prefix Config Consumer</h4>;
      }

      const { rerender } = render(
        <AnalyticsProvider
          config={{
            appId: "prefix-app",
            sessionTimeoutMs: 10000,
            maxOfflineQueue: 50,
            storagePrefix: "p1",
            autoTrackDom: false,
            autoTrackPages: false,
          }}
        >
          <ConfigConsumer />
        </AnalyticsProvider>
      );

      const firstEngine = capturedEngines[0];

      rerender(
        <AnalyticsProvider
          config={{
            appId: "prefix-app",
            sessionTimeoutMs: 20000,
            maxOfflineQueue: 100,
            storagePrefix: "p2",
            autoTrackDom: false,
            autoTrackPages: false,
          }}
        >
          <ConfigConsumer />
        </AnalyticsProvider>
      );

      const secondEngine = capturedEngines[capturedEngines.length - 1];
      expect(secondEngine).not.toBe(firstEngine);
    });
  });
});
