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
});
