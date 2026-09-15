import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useToast, toast, reducer } from "../use-toast";

describe("useToast", () => {
  beforeEach(() => {
    vi.useRealTimers();
  });

  it("dispatches toast and updates state across all subscribers", () => {
    const { result: sub1 } = renderHook(() => useToast());
    const { result: sub2 } = renderHook(() => useToast());

    act(() => {
      toast({
        title: "Test Notification",
        description: "Operation successful",
      });
    });

    expect(sub1.current.toasts.length).toBe(1);
    expect(sub1.current.toasts[0]!.title).toBe("Test Notification");

    expect(sub2.current.toasts.length).toBe(1);
    expect(sub2.current.toasts[0]!.title).toBe("Test Notification");
  });

  it("allows updating an existing toast in-flight", () => {
    const { result } = renderHook(() => useToast());

    let toastHandle!: ReturnType<typeof toast>;
    act(() => {
      toastHandle = toast({
        title: "Initial Title",
      });
    });

    expect(result.current.toasts[0]!.title).toBe("Initial Title");

    act(() => {
      toastHandle.update({
        id: toastHandle.id,
        title: "Updated Title",
      });
    });

    expect(result.current.toasts[0]!.title).toBe("Updated Title");
  });

  it("dismisses toast and marks open as false", () => {
    const { result } = renderHook(() => useToast());

    let toastHandle!: ReturnType<typeof toast>;
    act(() => {
      toastHandle = toast({
        title: "Dismiss Me",
      });
    });

    expect(result.current.toasts[0]!.open).toBe(true);

    act(() => {
      toastHandle.dismiss();
    });

    expect(result.current.toasts[0]!.open).toBe(false);
  });

  describe("Max simultaneous toasts limit", () => {
    it("enforces max simultaneous toasts limit by discarding older toasts beyond limit", () => {
      const { result } = renderHook(() => useToast());

      act(() => {
        toast({ title: "First Toast", description: "Message 1" });
      });
      expect(result.current.toasts.length).toBe(1);
      expect(result.current.toasts[0]!.title).toBe("First Toast");

      act(() => {
        toast({ title: "Second Toast", description: "Message 2" });
      });
      // TOAST_LIMIT is 1, so the new toast replaces older toasts beyond the limit
      expect(result.current.toasts.length).toBe(1);
      expect(result.current.toasts[0]!.title).toBe("Second Toast");

      act(() => {
        toast({ title: "Third Toast", description: "Message 3" });
      });
      expect(result.current.toasts.length).toBe(1);
      expect(result.current.toasts[0]!.title).toBe("Third Toast");
    });

    it("enforces TOAST_LIMIT in reducer by slicing the toast queue", () => {
      const initialState = { toasts: [] };
      const state1 = reducer(initialState, {
        type: "ADD_TOAST",
        toast: { id: "toast-1", title: "Toast 1" },
      });
      expect(state1.toasts).toHaveLength(1);
      expect(state1.toasts[0]?.id).toBe("toast-1");

      const state2 = reducer(state1, {
        type: "ADD_TOAST",
        toast: { id: "toast-2", title: "Toast 2" },
      });
      expect(state2.toasts).toHaveLength(1);
      expect(state2.toasts[0]?.id).toBe("toast-2");
    });
  });

  describe("Updating existing toast by ID (title, description, status)", () => {
    it("updates existing toast by ID including title, description, and status variant", () => {
      const { result } = renderHook(() => useToast());

      let toastHandle!: ReturnType<typeof toast>;
      act(() => {
        toastHandle = toast({
          title: "Uploading file...",
          description: "0% complete",
          variant: "default",
        });
      });

      expect(result.current.toasts[0]!.title).toBe("Uploading file...");
      expect(result.current.toasts[0]!.description).toBe("0% complete");
      expect(result.current.toasts[0]!.variant).toBe("default");

      // Update with new title, description, and status variant ("destructive")
      act(() => {
        toastHandle.update({
          id: toastHandle.id,
          title: "Upload failed",
          description: "Network timeout",
          variant: "destructive",
        });
      });

      expect(result.current.toasts[0]!.title).toBe("Upload failed");
      expect(result.current.toasts[0]!.description).toBe("Network timeout");
      expect(result.current.toasts[0]!.variant).toBe("destructive");

      // Partial update: updating description preserves title and variant
      act(() => {
        toastHandle.update({
          id: toastHandle.id,
          description: "Server returned 500 error",
        });
      });

      expect(result.current.toasts[0]!.title).toBe("Upload failed");
      expect(result.current.toasts[0]!.description).toBe("Server returned 500 error");
      expect(result.current.toasts[0]!.variant).toBe("destructive");
    });

    it("leaves toasts unchanged in reducer when updating a non-existent toast ID", () => {
      const initialState = {
        toasts: [{ id: "toast-a", title: "Original Title", description: "Original Description" }],
      };

      const updatedState = reducer(initialState, {
        type: "UPDATE_TOAST",
        toast: {
          id: "non-existent-id",
          title: "Changed Title",
        },
      });

      expect(updatedState.toasts[0]?.id).toBe("toast-a");
      expect(updatedState.toasts[0]?.title).toBe("Original Title");
      expect(updatedState.toasts[0]?.description).toBe("Original Description");
    });
  });

  describe("Manual dismissal & Auto-dismiss timer cleanup", () => {
    afterEach(() => {
      vi.useRealTimers();
    });

    it("cleans up dismissed toast after remove delay timer fires", () => {
      vi.useFakeTimers();
      const { result } = renderHook(() => useToast());

      let toastHandle!: ReturnType<typeof toast>;
      act(() => {
        toastHandle = toast({
          title: "Temporary Notification",
        });
      });

      expect(result.current.toasts.length).toBe(1);
      expect(result.current.toasts[0]!.open).toBe(true);

      // Dismiss manually
      act(() => {
        toastHandle.dismiss();
      });

      // Immediately marked open: false, but still in array awaiting animation exit
      expect(result.current.toasts.length).toBe(1);
      expect(result.current.toasts[0]!.open).toBe(false);

      // Calling dismiss a second time is safe and idempotent
      act(() => {
        toastHandle.dismiss();
      });
      expect(result.current.toasts.length).toBe(1);

      // Advance timers by 999ms - still in array
      act(() => {
        vi.advanceTimersByTime(999);
      });
      expect(result.current.toasts.length).toBe(1);

      // Advance by remaining 1ms (total 1000ms TOAST_REMOVE_DELAY)
      act(() => {
        vi.advanceTimersByTime(1);
      });
      expect(result.current.toasts.length).toBe(0);
    });

    it("handles auto-dismiss trigger via onOpenChange(false) and timer cleanup", () => {
      vi.useFakeTimers();
      const { result } = renderHook(() => useToast());

      act(() => {
        toast({
          title: "Auto-closing Toast",
        });
      });

      expect(result.current.toasts[0]!.open).toBe(true);

      // Radix UI calls onOpenChange(false) when auto-dismiss interval elapses
      act(() => {
        result.current.toasts[0]!.onOpenChange?.(false);
      });

      expect(result.current.toasts[0]!.open).toBe(false);

      // Fast-forward removal timeout
      act(() => {
        vi.advanceTimersByTime(1000);
      });

      expect(result.current.toasts.length).toBe(0);
    });

    it("dismisses all toasts simultaneously when dismiss is called without an ID", () => {
      vi.useFakeTimers();
      const { result } = renderHook(() => useToast());

      act(() => {
        toast({ title: "Global Dismiss Target" });
      });

      expect(result.current.toasts[0]!.open).toBe(true);

      // Global dismiss
      act(() => {
        result.current.dismiss();
      });

      expect(result.current.toasts[0]!.open).toBe(false);

      act(() => {
        vi.advanceTimersByTime(1000);
      });

      expect(result.current.toasts.length).toBe(0);
    });

    it("handles REMOVE_TOAST reducer action for specific ID and all toasts", () => {
      const activeState = {
        toasts: [
          { id: "t-1", title: "Toast 1" },
          { id: "t-2", title: "Toast 2" },
        ],
      };

      // Remove specific toast
      const removedOne = reducer(activeState, {
        type: "REMOVE_TOAST",
        toastId: "t-1",
      });
      expect(removedOne.toasts).toEqual([{ id: "t-2", title: "Toast 2" }]);

      // Remove all toasts (toastId undefined)
      const removedAll = reducer(activeState, {
        type: "REMOVE_TOAST",
        toastId: undefined,
      });
      expect(removedAll.toasts).toEqual([]);
    });
  });
});
