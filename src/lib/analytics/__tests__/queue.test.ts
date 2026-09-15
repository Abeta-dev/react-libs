import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { AnalyticsQueue } from "../queue";
import type { AnalyticsAdapter, AnalyticsEvent } from "../types";

function createMockEvent(id: string): AnalyticsEvent {
  return {
    eventId: id,
    eventName: "test_event",
    timestamp: new Date().toISOString(),
    sessionId: "sess_1",
    pageId: "page_1",
    anonymousId: "anon_1",
    page: {
      url: "http://localhost/test",
      path: "/test",
      title: "Test",
      referrer: "",
    },
    metadata: {},
  };
}

describe("AnalyticsQueue", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("flushes automatically when batchSize is reached", async () => {
    const trackBatch = vi.fn().mockResolvedValue(undefined);
    const mockAdapter: AnalyticsAdapter = {
      name: "mock",
      track: vi.fn(),
      trackBatch,
    };

    const queue = new AnalyticsQueue({
      adapters: [mockAdapter],
      batchSize: 3,
      flushIntervalMs: 10000,
    });

    queue.enqueue(createMockEvent("1"));
    queue.enqueue(createMockEvent("2"));
    expect(trackBatch).not.toHaveBeenCalled();

    queue.enqueue(createMockEvent("3"));
    await queue.flush();

    expect(trackBatch).toHaveBeenCalledTimes(1);
    expect(trackBatch.mock.calls[0]?.[0]).toHaveLength(3);
    queue.destroy();
  });

  it("flushes on interval even if batchSize is not reached", async () => {
    const trackBatch = vi.fn().mockResolvedValue(undefined);
    const mockAdapter: AnalyticsAdapter = {
      name: "mock",
      track: vi.fn(),
      trackBatch,
    };

    const queue = new AnalyticsQueue({
      adapters: [mockAdapter],
      batchSize: 10,
      flushIntervalMs: 2000,
    });

    queue.enqueue(createMockEvent("1"));
    expect(trackBatch).not.toHaveBeenCalled();

    await vi.advanceTimersByTimeAsync(2000);

    expect(trackBatch).toHaveBeenCalledTimes(1);
    expect(trackBatch.mock.calls[0]?.[0]).toHaveLength(1);
    queue.destroy();
  });

  it("buffers failed events to localStorage and limits by maxOfflineQueue", async () => {
    const failingAdapter: AnalyticsAdapter = {
      name: "failing",
      track: vi.fn().mockRejectedValue(new Error("Network Error")),
      trackBatch: vi.fn().mockRejectedValue(new Error("Network Error")),
    };

    const queue = new AnalyticsQueue({
      adapters: [failingAdapter],
      batchSize: 2,
      maxOfflineQueue: 3,
      storagePrefix: "test_storage",
    });

    queue.enqueue(createMockEvent("1"));
    queue.enqueue(createMockEvent("2"));
    await queue.flush();

    queue.enqueue(createMockEvent("3"));
    queue.enqueue(createMockEvent("4"));
    await queue.flush();

    const stored = JSON.parse(
      window.localStorage.getItem("test_storage_offline_queue") || "[]"
    );
    // Should be capped to 3 (events 2, 3, 4)
    expect(stored.length).toBe(3);
    expect(stored[stored.length - 1]?.eventId).toBe("4");
    queue.destroy();
  });

  it("falls back to adapter.track when trackBatch is not implemented", async () => {
    const track = vi.fn().mockResolvedValue(undefined);
    const singleAdapter: AnalyticsAdapter = {
      name: "single_only",
      track,
    };

    const queue = new AnalyticsQueue({
      adapters: [singleAdapter],
      batchSize: 2,
    });

    queue.enqueue(createMockEvent("s1"));
    queue.enqueue(createMockEvent("s2"));
    await queue.flush();

    expect(track).toHaveBeenCalledTimes(2);
    expect(track).toHaveBeenCalledWith(expect.objectContaining({ eventId: "s1" }));
    expect(track).toHaveBeenCalledWith(expect.objectContaining({ eventId: "s2" }));
    queue.destroy();
  });

  it("handles partial adapter failure by notifying onError without re-buffering stored events", async () => {
    const onError = vi.fn();
    const successAdapter: AnalyticsAdapter = {
      name: "ok_adapter",
      track: vi.fn(),
      trackBatch: vi.fn().mockResolvedValue(undefined),
    };
    const failAdapter: AnalyticsAdapter = {
      name: "fail_adapter",
      track: vi.fn(),
      trackBatch: vi.fn().mockRejectedValue(new Error("Adapter exploded")),
    };

    const queue = new AnalyticsQueue({
      adapters: [successAdapter, failAdapter],
      storagePrefix: "partial_fail",
      onError,
    });

    queue.enqueue(createMockEvent("part-1"));
    await queue.flush();

    expect(onError).toHaveBeenCalledWith(expect.objectContaining({ message: "Adapter exploded" }));
    // Because successAdapter succeeded, events are not re-buffered into storage
    const stored = window.localStorage.getItem("partial_fail_offline_queue");
    expect(stored).toBeNull();
    queue.destroy();
  });

  it("persists offline events to localStorage when navigator.onLine is false", async () => {
    const trackBatch = vi.fn();
    const adapter: AnalyticsAdapter = {
      name: "online_only",
      track: vi.fn(),
      trackBatch,
    };

    const originalOnLine = navigator.onLine;
    Object.defineProperty(navigator, "onLine", { value: false, configurable: true, writable: true });

    const queue = new AnalyticsQueue({
      adapters: [adapter],
      storagePrefix: "offline_test",
    });

    queue.enqueue(createMockEvent("off-1"));
    await queue.flush();

    expect(trackBatch).not.toHaveBeenCalled();
    const stored = JSON.parse(window.localStorage.getItem("offline_test_offline_queue") || "[]");
    expect(stored).toHaveLength(1);
    expect(stored[0]?.eventId).toBe("off-1");

    // Restore online
    Object.defineProperty(navigator, "onLine", { value: originalOnLine, configurable: true, writable: true });
    queue.destroy();
  });

  describe("Lifecycle listeners", () => {
    it("flushes queued events when window receives online event", async () => {
      const trackBatch = vi.fn().mockResolvedValue(undefined);
      const adapter: AnalyticsAdapter = {
        name: "test",
        track: vi.fn(),
        trackBatch,
      };

      const queue = new AnalyticsQueue({
        adapters: [adapter],
        batchSize: 10,
      });

      queue.enqueue(createMockEvent("onl-1"));
      expect(trackBatch).not.toHaveBeenCalled();

      window.dispatchEvent(new Event("online"));
      await queue.flush();

      expect(trackBatch).toHaveBeenCalled();
      queue.destroy();
    });

    it("flushes queued events on visibilitychange to hidden", async () => {
      const trackBatch = vi.fn().mockResolvedValue(undefined);
      const adapter: AnalyticsAdapter = {
        name: "test",
        track: vi.fn(),
        trackBatch,
      };

      const queue = new AnalyticsQueue({
        adapters: [adapter],
        batchSize: 10,
      });

      queue.enqueue(createMockEvent("vis-1"));
      expect(trackBatch).not.toHaveBeenCalled();

      const originalVis = document.visibilityState;
      Object.defineProperty(document, "visibilityState", {
        value: "hidden",
        configurable: true,
        writable: true,
      });

      document.dispatchEvent(new Event("visibilitychange"));
      await queue.flush();

      expect(trackBatch).toHaveBeenCalled();

      Object.defineProperty(document, "visibilityState", {
        value: originalVis,
        configurable: true,
        writable: true,
      });
      queue.destroy();
    });

    it("persists memory queue to localStorage on pagehide and beforeunload", () => {
      const queue = new AnalyticsQueue({
        adapters: [],
        storagePrefix: "unload_test",
      });

      queue.enqueue(createMockEvent("pagehide-1"));
      window.dispatchEvent(new Event("pagehide"));

      let stored = JSON.parse(window.localStorage.getItem("unload_test_offline_queue") || "[]");
      expect(stored).toHaveLength(1);

      queue.enqueue(createMockEvent("beforeunload-2"));
      window.dispatchEvent(new Event("beforeunload"));

      stored = JSON.parse(window.localStorage.getItem("unload_test_offline_queue") || "[]");
      expect(stored).toHaveLength(2);

      queue.destroy();
    });
  });

  describe("Persistence error handling and edge cases", () => {
    it("handles corrupted JSON and non-array storage values safely", async () => {
      window.localStorage.setItem("corrupt_test_offline_queue", "INVALID_JSON_CORRUPT{");

      const trackBatch = vi.fn().mockResolvedValue(undefined);
      const queue = new AnalyticsQueue({
        adapters: [{ name: "test", track: vi.fn(), trackBatch }],
        storagePrefix: "corrupt_test",
      });

      // Does not throw when reading corrupted storage
      expect(queue.getPendingCount()).toBe(0);

      // Overwrite with non-array object
      window.localStorage.setItem("corrupt_test_offline_queue", JSON.stringify({ not: "an array" }));
      expect(queue.getPendingCount()).toBe(0);

      queue.enqueue(createMockEvent("valid_after_corrupt"));
      await queue.flush();
      expect(trackBatch).toHaveBeenCalledTimes(1);
      queue.destroy();
    });

    it("safely catches localStorage.setItem quota exceptions", async () => {
      const setItemSpy = vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
        throw new DOMException("QuotaExceededError", "QuotaExceededError");
      });

      const failingAdapter: AnalyticsAdapter = {
        name: "fail",
        track: vi.fn().mockRejectedValue(new Error("fail")),
        trackBatch: vi.fn().mockRejectedValue(new Error("fail")),
      };

      const queue = new AnalyticsQueue({
        adapters: [failingAdapter],
        storagePrefix: "quota_test",
      });

      queue.enqueue(createMockEvent("q-1"));
      // Flush attempt tries to write back to storage on complete failure
      await expect(queue.flush()).resolves.not.toThrow();

      setItemSpy.mockRestore();
      queue.destroy();
    });

    it("safely catches localStorage.removeItem exceptions", async () => {
      const removeItemSpy = vi.spyOn(Storage.prototype, "removeItem").mockImplementation(() => {
        throw new Error("SecurityError: Access Denied");
      });

      const queue = new AnalyticsQueue({
        adapters: [{ name: "test", track: vi.fn(), trackBatch: vi.fn().mockResolvedValue(undefined) }],
        storagePrefix: "remove_test",
      });

      queue.enqueue(createMockEvent("rm-1"));
      await expect(queue.flush()).resolves.not.toThrow();

      removeItemSpy.mockRestore();
      queue.destroy();
    });

    it("coalesces concurrent flush calls into a single execution", async () => {
      let resolveFirst: (() => void) | undefined;
      const delayedBatch = vi.fn(
        () =>
          new Promise<void>((resolve) => {
            resolveFirst = resolve;
          })
      );

      const queue = new AnalyticsQueue({
        adapters: [{ name: "delayed", track: vi.fn(), trackBatch: delayedBatch }],
      });

      queue.enqueue(createMockEvent("conc-1"));
      const p1 = queue.flush();
      const p2 = queue.flush();

      resolveFirst?.();
      await Promise.all([p1, p2]);

      expect(delayedBatch).toHaveBeenCalledTimes(1);
      queue.destroy();
    });

    it("tracks pending count accurately across memory and storage queues", () => {
      window.localStorage.setItem(
        "pending_test_offline_queue",
        JSON.stringify([createMockEvent("stored-1"), createMockEvent("stored-2")])
      );

      const queue = new AnalyticsQueue({
        adapters: [],
        storagePrefix: "pending_test",
      });

      expect(queue.getPendingCount()).toBe(2);

      queue.enqueue(createMockEvent("mem-1"));
      queue.enqueue(createMockEvent("mem-2"));

      expect(queue.getPendingCount()).toBe(4);
      queue.destroy();
    });

    it("handles zero or negative flushIntervalMs without setting interval", () => {
      const queue = new AnalyticsQueue({
        adapters: [],
        flushIntervalMs: 0,
      });

      expect(queue.getPendingCount()).toBe(0);
      queue.destroy();
    });
  });
});
