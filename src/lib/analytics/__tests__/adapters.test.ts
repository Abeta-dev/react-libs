import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  HttpAdapter,
  MixpanelAdapter,
  GoogleAnalyticsAdapter,
  ConsoleAdapter,
} from "../adapters";
import type { AnalyticsEvent } from "../types";

function mockEvent(overrides: Partial<AnalyticsEvent> = {}): AnalyticsEvent {
  return {
    eventId: "evt-123",
    eventName: "button_click",
    timestamp: new Date().toISOString(),
    sessionId: "sess-1",
    pageId: "pg-1",
    anonymousId: "anon-1",
    userId: "usr-9",
    component: {
      id: "cmp-1",
      name: "Submit",
      type: "button",
      interaction: "click",
      interactionCount: 1,
    },
    page: {
      url: "http://localhost/invoice",
      path: "/invoice",
      title: "Invoice",
      referrer: "",
    },
    metadata: { key: "value" },
    ...overrides,
  };
}

describe("Analytics Adapters", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    delete (window as unknown as { mixpanel?: unknown }).mixpanel;
    delete (window as unknown as { gtag?: unknown }).gtag;
    delete (window as unknown as { dataLayer?: unknown }).dataLayer;
  });

  describe("HttpAdapter", () => {
    it("delivers batch via fetch with configured headers and endpoint", async () => {
      const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200 });
      global.fetch = fetchMock;

      const adapter = new HttpAdapter({
        endpoint: "https://telemetry.example.com/events",
        headers: { "X-API-KEY": "secret-key" },
      });

      await adapter.track(mockEvent());

      expect(fetchMock).toHaveBeenCalledTimes(1);
      const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
      expect(url).toBe("https://telemetry.example.com/events");
      expect(init.method).toBe("POST");
      expect((init.headers as Record<string, string>)["X-API-KEY"]).toBe("secret-key");
      expect((init.headers as Record<string, string>)["Content-Type"]).toBe("application/json");
      const body = JSON.parse(init.body as string);
      expect(body.events).toHaveLength(1);
      expect(body.events[0]?.eventId).toBe("evt-123");
    });

    it("returns immediately without calling fetch if events array is empty", async () => {
      const fetchMock = vi.fn();
      global.fetch = fetchMock;

      const adapter = new HttpAdapter({
        endpoint: "https://telemetry.example.com/events",
      });

      await adapter.trackBatch([]);
      expect(fetchMock).not.toHaveBeenCalled();
    });

    it("resolves dynamic headers from async getHeaders and forwards credentials", async () => {
      const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200 });
      global.fetch = fetchMock;

      const adapter = new HttpAdapter({
        endpoint: "https://api.example.com/analytics",
        getHeaders: async () => ({
          Authorization: "Bearer token_xyz",
        }),
        credentials: "include",
      });

      await adapter.track(mockEvent());

      expect(fetchMock).toHaveBeenCalledTimes(1);
      const [, init] = fetchMock.mock.calls[0] as [string, RequestInit];
      expect((init.headers as Record<string, string>).Authorization).toBe("Bearer token_xyz");
      expect(init.credentials).toBe("include");
    });

    it("throws an error when HTTP delivery response is not ok", async () => {
      const fetchMock = vi.fn().mockResolvedValue({
        ok: false,
        status: 503,
        statusText: "Service Unavailable",
      });
      global.fetch = fetchMock;

      const adapter = new HttpAdapter({
        endpoint: "https://telemetry.example.com/events",
      });

      await expect(adapter.track(mockEvent())).rejects.toThrow(
        "HttpAdapter delivery failed: HTTP 503 Service Unavailable"
      );
    });
  });

  describe("MixpanelAdapter", () => {
    it("delegates to window.mixpanel", () => {
      const track = vi.fn();
      const identify = vi.fn();
      const set = vi.fn();
      const reset = vi.fn();

      window.mixpanel = {
        track,
        identify,
        people: { set },
        reset,
      };

      const adapter = new MixpanelAdapter();
      adapter.track(mockEvent());

      expect(track).toHaveBeenCalledTimes(1);
      expect(track).toHaveBeenCalledWith("button_click", expect.objectContaining({
        distinct_id: "usr-9",
        session_id: "sess-1",
        component_name: "Submit",
      }));

      adapter.identify("usr-9", { plan: "enterprise" });
      expect(identify).toHaveBeenCalledWith("usr-9");
      expect(set).toHaveBeenCalledWith({ plan: "enterprise" });

      adapter.reset();
      expect(reset).toHaveBeenCalledTimes(1);
    });

    it("supports custom client passed to constructor", () => {
      const customClient = {
        track: vi.fn(),
        identify: vi.fn(),
        people: { set: vi.fn() },
        reset: vi.fn(),
      };

      const adapter = new MixpanelAdapter({ client: customClient });
      adapter.track(mockEvent());
      expect(customClient.track).toHaveBeenCalledTimes(1);

      adapter.identify("user_c", { role: "tester" });
      expect(customClient.identify).toHaveBeenCalledWith("user_c");
      expect(customClient.people.set).toHaveBeenCalledWith({ role: "tester" });

      adapter.reset();
      expect(customClient.reset).toHaveBeenCalledTimes(1);
    });

    it("falls back to anonymousId when userId is undefined", () => {
      const customClient = {
        track: vi.fn(),
        identify: vi.fn(),
        reset: vi.fn(),
      };

      const adapter = new MixpanelAdapter({ client: customClient });
      adapter.track(mockEvent({ userId: undefined, anonymousId: "anon_999" }));

      expect(customClient.track).toHaveBeenCalledWith(
        "button_click",
        expect.objectContaining({
          distinct_id: "anon_999",
        })
      );
    });

    it("handles missing client gracefully without throwing errors", () => {
      const adapter = new MixpanelAdapter();
      expect(() => adapter.track(mockEvent())).not.toThrow();
      expect(() => adapter.trackBatch([mockEvent()])).not.toThrow();
      expect(() => adapter.identify("user_test")).not.toThrow();
      expect(() => adapter.reset()).not.toThrow();
    });

    it("safely handles identify when client has no people object and reset when reset is not provided", () => {
      const customClient = {
        track: vi.fn(),
        identify: vi.fn(),
      };

      const adapter = new MixpanelAdapter({ client: customClient as unknown as import("../adapters").MixpanelClient });
      adapter.identify("user_bare", { tier: "free" });
      expect(customClient.identify).toHaveBeenCalledWith("user_bare");

      expect(() => adapter.reset()).not.toThrow();
    });

    it("delivers batches by tracking each event individually", () => {
      const customClient = {
        track: vi.fn(),
        identify: vi.fn(),
        reset: vi.fn(),
      };

      const adapter = new MixpanelAdapter({ client: customClient });
      adapter.trackBatch([mockEvent({ eventId: "e1" }), mockEvent({ eventId: "e2" })]);

      expect(customClient.track).toHaveBeenCalledTimes(2);
    });
  });

  describe("GoogleAnalyticsAdapter", () => {
    it("delegates to window.gtag for event tracking", () => {
      const gtag = vi.fn();
      window.gtag = gtag;

      const adapter = new GoogleAnalyticsAdapter({ measurementId: "G-XYZ123" });
      adapter.track(mockEvent());

      expect(gtag).toHaveBeenCalledTimes(1);
      expect(gtag).toHaveBeenCalledWith(
        "event",
        "button_click",
        expect.objectContaining({
          send_to: "G-XYZ123",
          event_label: "Submit",
        })
      );

      adapter.identify("usr-9", { role: "admin" });
      expect(gtag).toHaveBeenCalledWith("set", {
        user_id: "usr-9",
        user_properties: { role: "admin" },
      });
    });

    it("formats page_view payload correctly", () => {
      const gtag = vi.fn();
      window.gtag = gtag;

      const adapter = new GoogleAnalyticsAdapter({ measurementId: "G-PAGEVIEW" });
      adapter.track(
        mockEvent({
          eventName: "page_view",
          page: {
            url: "https://portal.example.com/billing",
            path: "/billing",
            title: "Billing Details",
            referrer: "https://portal.example.com/",
          },
        })
      );

      expect(gtag).toHaveBeenCalledWith("event", "page_view", {
        page_location: "https://portal.example.com/billing",
        page_path: "/billing",
        page_title: "Billing Details",
        page_id: "pg-1",
        session_id: "sess-1",
        send_to: "G-PAGEVIEW",
        key: "value",
      });
    });

    it("falls back to component.id when component name is missing and handles undefined component", () => {
      const gtag = vi.fn();
      window.gtag = gtag;

      const adapter = new GoogleAnalyticsAdapter();
      adapter.track(
        mockEvent({
          component: {
            id: "btn_save",
            name: undefined as unknown as string,
            type: "button",
            interaction: "click",
            interactionCount: 1,
          },
        })
      );

      expect(gtag).toHaveBeenCalledWith(
        "event",
        "button_click",
        expect.objectContaining({
          event_label: "btn_save",
          event_category: "button",
        })
      );

      // Undefined component
      adapter.track(mockEvent({ component: undefined }));
      expect(gtag).toHaveBeenCalledWith(
        "event",
        "button_click",
        expect.objectContaining({
          event_category: "ui_interaction",
          event_label: undefined,
        })
      );
    });

    it("falls back to window.dataLayer when window.gtag is not defined", () => {
      const dataLayer: unknown[][] = [];
      window.dataLayer = dataLayer;

      const adapter = new GoogleAnalyticsAdapter({ measurementId: "G-DATA-LAYER" });
      adapter.track(mockEvent());

      expect(dataLayer).toHaveLength(1);
      expect(dataLayer[0]?.[0]).toBe("event");
      expect(dataLayer[0]?.[1]).toBe("button_click");

      adapter.identify("usr_dl");
      expect(dataLayer[1]?.[0]).toBe("set");

      adapter.reset();
      expect(dataLayer[2]?.[0]).toBe("set");
      expect(dataLayer[2]?.[1]).toEqual({ user_id: null });
    });

    it("gracefully does nothing when neither gtag nor dataLayer is available", () => {
      const adapter = new GoogleAnalyticsAdapter();
      expect(() => adapter.track(mockEvent())).not.toThrow();
      expect(() => adapter.identify("user_x")).not.toThrow();
      expect(() => adapter.reset()).not.toThrow();
    });

    it("tracks multiple events through trackBatch", () => {
      const gtag = vi.fn();
      window.gtag = gtag;

      const adapter = new GoogleAnalyticsAdapter();
      adapter.trackBatch([mockEvent(), mockEvent()]);
      expect(gtag).toHaveBeenCalledTimes(2);
    });

    it("resets user identity by setting user_id to null", () => {
      const gtag = vi.fn();
      window.gtag = gtag;

      const adapter = new GoogleAnalyticsAdapter();
      adapter.reset();
      expect(gtag).toHaveBeenCalledWith("set", { user_id: null });
    });
  });

  describe("ConsoleAdapter", () => {
    it("prints track event with default prefix and log level info", () => {
      const infoSpy = vi.spyOn(console, "info").mockImplementation(() => {});
      const adapter = new ConsoleAdapter();
      adapter.track(mockEvent());

      expect(infoSpy).toHaveBeenCalledWith(
        "[Analytics] button_click",
        {
          component: "Submit",
          page: "/invoice",
          user: "usr-9",
          metadata: { key: "value" },
        },
        expect.any(Object)
      );
      infoSpy.mockRestore();
    });

    it("respects custom prefix and debug log level", () => {
      const debugSpy = vi.spyOn(console, "debug").mockImplementation(() => {});
      const adapter = new ConsoleAdapter({ prefix: "[VendorPortal]", logLevel: "debug" });
      adapter.track(mockEvent());

      expect(debugSpy).toHaveBeenCalledWith(
        "[VendorPortal] button_click",
        expect.any(Object),
        expect.any(Object)
      );
      debugSpy.mockRestore();
    });

    it("prints trackBatch, identify, and reset messages", () => {
      const infoSpy = vi.spyOn(console, "info").mockImplementation(() => {});
      const adapter = new ConsoleAdapter({ prefix: "[TestLogger]" });

      const events = [mockEvent(), mockEvent()];
      adapter.trackBatch(events);
      expect(infoSpy).toHaveBeenCalledWith("[TestLogger] Flushed Batch (2 events):", events);

      adapter.identify("usr_99", { organization: "Acme" });
      expect(infoSpy).toHaveBeenCalledWith("[TestLogger] Identify User: usr_99", { organization: "Acme" });

      adapter.reset();
      expect(infoSpy).toHaveBeenCalledWith("[TestLogger] Reset Identity");

      infoSpy.mockRestore();
    });
  });
});
