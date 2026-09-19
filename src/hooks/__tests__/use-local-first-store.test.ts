import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useLocalFirstStore } from "../use-local-first-store";

describe("useLocalFirstStore", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  it("initializes with default value and hydrates", () => {
    const { result } = renderHook(() =>
      useLocalFirstStore({
        key: "test-key-1",
        initialValue: { count: 0 },
      })
    );

    expect(result.current.data).toEqual({ count: 0 });
    expect(result.current.isHydrated).toBe(true);
  });

  it("reads existing data from localStorage on mount", () => {
    window.localStorage.setItem(
      "test-key-2",
      JSON.stringify({ _v: 1, _data: { count: 42 } })
    );

    const { result } = renderHook(() =>
      useLocalFirstStore({
        key: "test-key-2",
        initialValue: { count: 0 },
      })
    );

    expect(result.current.data).toEqual({ count: 42 });
  });

  it("updates state and persists to localStorage via setData", () => {
    const { result } = renderHook(() =>
      useLocalFirstStore({
        key: "test-key-3",
        initialValue: { theme: "light" },
      })
    );

    act(() => {
      result.current.setData({ theme: "dark" });
    });

    expect(result.current.data).toEqual({ theme: "dark" });
    const stored = JSON.parse(window.localStorage.getItem("test-key-3")!);
    expect(stored).toEqual({ _v: 1, _data: { theme: "dark" } });
  });

  it("synchronizes across hook instances in the same tab via custom events", () => {
    const { result: hookA } = renderHook(() =>
      useLocalFirstStore({
        key: "shared-key",
        initialValue: { message: "hello" },
      })
    );

    const { result: hookB } = renderHook(() =>
      useLocalFirstStore({
        key: "shared-key",
        initialValue: { message: "hello" },
      })
    );

    act(() => {
      hookA.current.setData({ message: "world" });
    });

    expect(hookA.current.data).toEqual({ message: "world" });
    expect(hookB.current.data).toEqual({ message: "world" });
  });

  it("synchronizes across tabs via storage events and resets on deletion", () => {
    const { result } = renderHook(() =>
      useLocalFirstStore({
        key: "cross-tab-key",
        initialValue: { val: 10 },
      })
    );

    // Simulate another tab updating localStorage
    act(() => {
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "cross-tab-key",
          newValue: JSON.stringify({ _v: 1, _data: { val: 20 } }),
        })
      );
    });

    expect(result.current.data).toEqual({ val: 20 });

    // Simulate another tab removing key
    act(() => {
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "cross-tab-key",
          newValue: null,
        })
      );
    });

    expect(result.current.data).toEqual({ val: 10 });
  });

  it("executes schema migration without infinite re-render loops", () => {
    // Store v1 data
    window.localStorage.setItem(
      "migration-key",
      JSON.stringify({ _v: 1, _data: { oldField: "legacy" } })
    );

    const migrateFn = vi.fn((oldData: any) => ({
      newField: oldData.oldField.toUpperCase(),
    }));

    const { result } = renderHook(() =>
      useLocalFirstStore({
        key: "migration-key",
        initialValue: { newField: "" },
        version: 2,
        onMigrate: migrateFn,
      })
    );

    expect(migrateFn).toHaveBeenCalledTimes(1);
    expect(result.current.data).toEqual({ newField: "LEGACY" });
    const stored = JSON.parse(window.localStorage.getItem("migration-key")!);
    expect(stored._v).toBe(2);
    expect(stored._data).toEqual({ newField: "LEGACY" });
  });

  it("resets to initialValue via resetData", () => {
    const { result } = renderHook(() =>
      useLocalFirstStore({
        key: "reset-key",
        initialValue: { count: 0 },
      })
    );

    act(() => {
      result.current.setData({ count: 99 });
    });
    expect(result.current.data).toEqual({ count: 99 });

    act(() => {
      result.current.resetData();
    });
    expect(result.current.data).toEqual({ count: 0 });
  });

  it("imports valid JSON file and updates store", async () => {
    const { result } = renderHook(() =>
      useLocalFirstStore({
        key: "import-key",
        initialValue: { name: "default" },
      })
    );

    const mockFile = {
      text: vi.fn().mockResolvedValue(JSON.stringify({ data: { name: "imported" } })),
    } as unknown as File;

    let success = false;
    await act(async () => {
      success = await result.current.importJson(mockFile);
    });

    expect(success).toBe(true);
    expect(result.current.data).toEqual({ name: "imported" });
  });
});
