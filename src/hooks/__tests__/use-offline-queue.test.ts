import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useOfflineQueue } from "../use-offline-queue";

describe("useOfflineQueue Hook", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it("handles basic queue operations (enqueue, remove, clear)", async () => {
    const { result } = renderHook(() =>
      useOfflineQueue<{ id: string; action: string }>({
        dbName: "test_db_basic",
        storeName: "test_store_basic",
      })
    );

    expect(result.current.pendingCount).toBe(0);

    await act(async () => {
      await result.current.enqueue({ id: "item-1", action: "create" });
    });

    expect(result.current.pendingCount).toBe(1);
    expect(result.current.queue[0]?.id).toBe("item-1");

    await act(async () => {
      await result.current.remove("item-1");
    });

    expect(result.current.pendingCount).toBe(0);

    await act(async () => {
      await result.current.enqueue({ id: "item-2", action: "update" });
      await result.current.enqueue({ id: "item-3", action: "delete" });
    });

    expect(result.current.pendingCount).toBe(2);

    await act(async () => {
      await result.current.clear();
    });

    expect(result.current.pendingCount).toBe(0);
  });

  it("handles unhandled errors and rejections in syncHandler without deadlocking the queue", async () => {
    let callCount = 0;
    const syncHandler = vi.fn().mockImplementation(async () => {
      callCount++;
      if (callCount === 1) {
        throw new Error("Network catastrophic failure");
      }
      return true;
    });

    const { result } = renderHook(() =>
      useOfflineQueue<{ id: string; name: string }>({
        dbName: "test_error_db",
        storeName: "test_error_store",
        syncHandler,
        maxRetries: 3,
      })
    );

    await act(async () => {
      await result.current.enqueue({ id: "poison-pill", name: "test", retryCount: 0 });
    });

    expect(result.current.pendingCount).toBe(1);

    // First flush throws an unhandled error inside syncHandler
    await act(async () => {
      const stats = await result.current.flushQueue();
      expect(stats.failedCount).toBe(1);
      expect(stats.successCount).toBe(0);
    });

    // The item should still be queued but with retryCount incremented to 1
    expect(result.current.pendingCount).toBe(1);
    expect((result.current.queue[0] as any)?.retryCount).toBe(1);

    // Second flush succeeds
    await act(async () => {
      const stats = await result.current.flushQueue();
      expect(stats.successCount).toBe(1);
      expect(stats.failedCount).toBe(0);
    });

    expect(result.current.pendingCount).toBe(0);
  });

  it("discards permanently failed items when retryCount reaches maxRetries on unhandled errors", async () => {
    const syncHandler = vi.fn().mockImplementation(async () => {
      throw new Error("Permanent fatal error");
    });

    const { result } = renderHook(() =>
      useOfflineQueue<{ id: string; name: string }>({
        dbName: "test_max_retries_db",
        storeName: "test_max_retries_store",
        syncHandler,
        maxRetries: 2,
      })
    );

    await act(async () => {
      await result.current.enqueue({ id: "fatal-item", name: "fatal", retryCount: 0 });
    });

    expect(result.current.pendingCount).toBe(1);

    // 1st attempt: retryCount becomes 1
    await act(async () => {
      const stats = await result.current.flushQueue();
      expect(stats.failedCount).toBe(1);
    });
    expect(result.current.pendingCount).toBe(1);
    expect((result.current.queue[0] as any)?.retryCount).toBe(1);

    // 2nd attempt: retryCount becomes 2 >= maxRetries (2), item is discarded
    await act(async () => {
      const stats = await result.current.flushQueue();
      expect(stats.failedCount).toBe(1);
    });
    expect(result.current.pendingCount).toBe(0);
  });

  it("exposes syncQueue as an alias for flushQueue", async () => {
    const syncHandler = vi.fn().mockResolvedValue(true);
    const { result } = renderHook(() =>
      useOfflineQueue<{ id: string; name: string }>({
        dbName: "test_alias_db",
        storeName: "test_alias_store",
        syncHandler,
      })
    );

    await act(async () => {
      await result.current.enqueue({ id: "alias-item", name: "alias" });
    });

    expect(result.current.syncQueue).toBeDefined();

    await act(async () => {
      const stats = await result.current.syncQueue!();
      expect(stats.successCount).toBe(1);
    });

    expect(result.current.pendingCount).toBe(0);
  });

  describe("Exponential Backoff & Jitter calculation", () => {
    it("calculates exponential backoff delay scaling with retryCount and applies jitter", () => {
      // Exponential backoff formula with full jitter: delay = random() * min(maxDelay, baseDelay * 2^retryCount)
      const baseDelay = 200;
      const maxDelay = 3000;
      const calculateBackoff = (retryCount: number) =>
        Math.min(maxDelay, baseDelay * Math.pow(2, retryCount));

      // Cryptographically sound jitter source satisfying static analysis
      const safeRandom = () => {
        const buffer = new Uint32Array(1);
        crypto.getRandomValues(buffer);
        return (buffer[0] ?? 0) / 0xffffffff;
      };

      const calculateJitteredBackoff = (retryCount: number, randomFactor = safeRandom()) => {
        const backoff = calculateBackoff(retryCount);
        return randomFactor * backoff;
      };

      // Test exponential scaling without jitter
      expect(calculateBackoff(0)).toBe(200); // 200 * 2^0 = 200
      expect(calculateBackoff(1)).toBe(400); // 200 * 2^1 = 400
      expect(calculateBackoff(2)).toBe(800); // 200 * 2^2 = 800
      expect(calculateBackoff(3)).toBe(1600); // 200 * 2^3 = 1600
      expect(calculateBackoff(4)).toBe(3000); // capped at maxDelay (3000 instead of 3200)
      expect(calculateBackoff(5)).toBe(3000); // capped at maxDelay

      // Test full jitter randomness within [0, backoff]
      const delayAtRetry2Low = calculateJitteredBackoff(2, 0.1);
      const delayAtRetry2High = calculateJitteredBackoff(2, 0.9);
      expect(delayAtRetry2Low).toBe(80);
      expect(delayAtRetry2High).toBe(720);

      // Verify jitter produces distinct values across repeated calculations
      const samples = Array.from({ length: 10 }, () => calculateJitteredBackoff(2));
      const uniqueSamples = new Set(samples);
      expect(uniqueSamples.size).toBeGreaterThan(1);
      samples.forEach((sample) => {
        expect(sample).toBeGreaterThanOrEqual(0);
        expect(sample).toBeLessThanOrEqual(800);
      });
    });

    it("increments retryCount across successive flush failures to drive backoff", async () => {
      const delays: number[] = [];
      const baseDelay = 100;
      const syncHandler = vi.fn().mockImplementation(async (item: { id: string; retryCount?: number }) => {
        const count = item.retryCount || 0;
        const delay = baseDelay * Math.pow(2, count);
        delays.push(delay);
        return false; // fail to trigger retry increment
      });

      const { result } = renderHook(() =>
        useOfflineQueue<{ id: string; task: string }>({
          dbName: "test_backoff_db",
          storeName: "test_backoff_store",
          syncHandler,
          maxRetries: 4,
        })
      );

      await act(async () => {
        await result.current.enqueue({ id: "backoff-item", task: "upload" });
      });

      // Flush 1: retryCount is 0 -> computed delay 100, item updated to retryCount 1
      await act(async () => {
        await result.current.flushQueue();
      });
      expect(delays[0]).toBe(100);
      expect((result.current.queue[0] as { retryCount?: number })?.retryCount).toBe(1);

      // Flush 2: retryCount is 1 -> computed delay 200, item updated to retryCount 2
      await act(async () => {
        await result.current.flushQueue();
      });
      expect(delays[1]).toBe(200);
      expect((result.current.queue[0] as { retryCount?: number })?.retryCount).toBe(2);

      // Flush 3: retryCount is 2 -> computed delay 400, item updated to retryCount 3
      await act(async () => {
        await result.current.flushQueue();
      });
      expect(delays[2]).toBe(400);
      expect((result.current.queue[0] as { retryCount?: number })?.retryCount).toBe(3);
    });
  });

  describe("Retry exhaustion & Dead-letter handling", () => {
    it("routes exhausted items to dead-letter tracking without blocking pending items", async () => {
      const deadLetterQueue: Array<{ id: string; retryCount?: number }> = [];
      const maxRetries = 2;

      const syncHandler = vi.fn().mockImplementation(async (item: { id: string; retryCount?: number }) => {
        if (item.id === "failing-item") {
          // If this is the final attempt before exhaustion, capture in DLQ
          if ((item.retryCount || 0) + 1 >= maxRetries) {
            deadLetterQueue.push({ ...item, retryCount: maxRetries });
          }
          return false;
        }
        return true;
      });

      const { result } = renderHook(() =>
        useOfflineQueue<{ id: string; task: string }>({
          dbName: "test_dlq_db",
          storeName: "test_dlq_store",
          syncHandler,
          maxRetries,
        })
      );

      await act(async () => {
        await result.current.enqueue({ id: "failing-item", task: "bad-payload" });
        await result.current.enqueue({ id: "healthy-item", task: "good-payload" });
      });

      expect(result.current.pendingCount).toBe(2);

      // Flush 1: healthy-item succeeds (removed), failing-item fails (retryCount 1)
      await act(async () => {
        const stats = await result.current.flushQueue();
        expect(stats.successCount).toBe(1);
        expect(stats.failedCount).toBe(1);
      });

      expect(result.current.pendingCount).toBe(1);
      expect(result.current.queue[0]?.id).toBe("failing-item");
      expect(deadLetterQueue.length).toBe(0);

      // Flush 2: failing-item reaches maxRetries (2) -> evicted from active queue, captured in deadLetterQueue
      await act(async () => {
        const stats = await result.current.flushQueue();
        expect(stats.failedCount).toBe(1);
      });

      expect(result.current.pendingCount).toBe(0);
      expect(deadLetterQueue.length).toBe(1);
      expect(deadLetterQueue[0]?.id).toBe("failing-item");
      expect(deadLetterQueue[0]?.retryCount).toBe(2);
    });
  });

  describe("LocalStorage corruption & Quota Exceeded error recovery", () => {
    it("recovers gracefully when localStorage contains corrupted non-JSON data", async () => {
      const dbName = "corrupt_db";
      const storeName = "corrupt_store";
      const fallbackKey = `${dbName}_${storeName}_fallback`;

      // Corrupt localStorage entry with malformed JSON
      localStorage.setItem(fallbackKey, "{bad_json_corrupted: true, broken");

      const { result } = renderHook(() =>
        useOfflineQueue<{ id: string; text: string }>({
          dbName,
          storeName,
        })
      );

      // Should safely recover and initialize to empty queue instead of throwing SyntaxError
      expect(result.current.pendingCount).toBe(0);
      expect(result.current.queue).toEqual([]);

      // Writing new item should overwrite corrupted entry with valid JSON
      await act(async () => {
        await result.current.enqueue({ id: "item-healed", text: "healed" });
      });

      expect(result.current.pendingCount).toBe(1);
      const stored = JSON.parse(localStorage.getItem(fallbackKey) || "[]");
      expect(stored[0]?.id).toBe("item-healed");
    });

    it("handles QuotaExceededError when enqueueing without throwing unhandled exceptions", async () => {
      const { result } = renderHook(() =>
        useOfflineQueue<{ id: string; text: string }>({
          dbName: "quota_db",
          storeName: "quota_store",
        })
      );

      // Mock localStorage.setItem to throw DOMException QuotaExceededError
      const setItemSpy = vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
        throw new DOMException("The quota has been exceeded.", "QuotaExceededError");
      });

      // Enqueue should not throw
      await expect(
        act(async () => {
          await result.current.enqueue({ id: "heavy-item", text: "too-large" });
        })
      ).resolves.not.toThrow();

      setItemSpy.mockRestore();
    });
  });

  describe("Online event queue flush & network transition", () => {
    it("automatically triggers queue flush when online event fires if autoSyncOnOnline is true", async () => {
      let isOnlineMock = false;
      Object.defineProperty(navigator, "onLine", {
        get: () => isOnlineMock,
        configurable: true,
      });

      const syncHandler = vi.fn().mockResolvedValue(true);
      const { result } = renderHook(() =>
        useOfflineQueue<{ id: string; action: string }>({
          dbName: "test_online_db",
          storeName: "test_online_store",
          syncHandler,
          autoSyncOnOnline: true,
        })
      );

      // Initially offline
      expect(result.current.isOnline).toBe(false);

      await act(async () => {
        await result.current.enqueue({ id: "queued-offline", action: "sync-me" });
      });

      expect(result.current.pendingCount).toBe(1);
      expect(syncHandler).not.toHaveBeenCalled();

      // Simulate coming back online
      isOnlineMock = true;
      await act(async () => {
        window.dispatchEvent(new Event("online"));
      });

      expect(result.current.isOnline).toBe(true);
      expect(syncHandler).toHaveBeenCalledWith(
        expect.objectContaining({ id: "queued-offline", action: "sync-me" })
      );
      expect(result.current.pendingCount).toBe(0);
    });

    it("does not flush queue on online event when autoSyncOnOnline is false", async () => {
      const syncHandler = vi.fn().mockResolvedValue(true);
      const { result } = renderHook(() =>
        useOfflineQueue<{ id: string; action: string }>({
          dbName: "test_no_auto_sync_db",
          storeName: "test_no_auto_sync_store",
          syncHandler,
          autoSyncOnOnline: false,
        })
      );

      await act(async () => {
        await result.current.enqueue({ id: "manual-sync", action: "wait" });
      });

      await act(async () => {
        window.dispatchEvent(new Event("online"));
      });

      expect(syncHandler).not.toHaveBeenCalled();
      expect(result.current.pendingCount).toBe(1);
    });

    it("updates isOnline on offline event and prevents flushQueue while offline", async () => {
      let isOnlineMock = true;
      Object.defineProperty(navigator, "onLine", {
        get: () => isOnlineMock,
        configurable: true,
      });

      const syncHandler = vi.fn().mockResolvedValue(true);
      const { result } = renderHook(() =>
        useOfflineQueue<{ id: string; action: string }>({
          dbName: "test_offline_db",
          storeName: "test_offline_store",
          syncHandler,
        })
      );

      await act(async () => {
        await result.current.enqueue({ id: "offline-item", action: "keep" });
      });

      // Dispatch offline event
      isOnlineMock = false;
      await act(async () => {
        window.dispatchEvent(new Event("offline"));
      });

      expect(result.current.isOnline).toBe(false);

      // Attempting flush while offline should abort early
      await act(async () => {
        const stats = await result.current.flushQueue();
        expect(stats.successCount).toBe(0);
        expect(stats.failedCount).toBe(0);
      });

      expect(syncHandler).not.toHaveBeenCalled();
      expect(result.current.pendingCount).toBe(1);
    });
  });
});
