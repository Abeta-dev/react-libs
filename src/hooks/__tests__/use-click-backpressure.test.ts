import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useClickBackpressure } from '../use-click-backpressure';

describe('useClickBackpressure', () => {
  it('fires the first click immediately (leading-edge)', async () => {
    const handler = vi.fn().mockReturnValue('result');
    const { result } = renderHook(() => useClickBackpressure(handler));

    let ret: unknown;
    await act(async () => {
      ret = await result.current.execute();
    });

    expect(handler).toHaveBeenCalledTimes(1);
    expect(ret).toBe('result');
  });

  it('drops subsequent clicks within the default 1-second cooldown window', async () => {
    vi.useFakeTimers();
    try {
      const handler = vi.fn().mockReturnValue('done');
      const onBlocked = vi.fn();
      const { result } = renderHook(() =>
        useClickBackpressure(handler, { onBlocked })
      );

      await act(async () => {
        await result.current.execute();
      });
      expect(handler).toHaveBeenCalledTimes(1);

      // Click again after 400ms (within 1s window)
      vi.advanceTimersByTime(400);
      await act(async () => {
        await result.current.execute();
      });
      expect(handler).toHaveBeenCalledTimes(1); // Dropped
      expect(onBlocked).toHaveBeenCalledWith('cooldown');

      // Click again after 700ms more (total 1100ms > 1000ms)
      vi.advanceTimersByTime(700);
      await act(async () => {
        await result.current.execute();
      });
      expect(handler).toHaveBeenCalledTimes(2); // Accepted
    } finally {
      vi.useRealTimers();
    }
  });

  it('supports custom duration in seconds (e.g. 2.5s)', async () => {
    vi.useFakeTimers();
    try {
      const handler = vi.fn();
      const { result } = renderHook(() =>
        useClickBackpressure(handler, { debounceSec: 2.5 })
      );

      await act(async () => {
        await result.current.execute();
      });
      expect(handler).toHaveBeenCalledTimes(1);

      // After 2.0s, should still be blocked
      vi.advanceTimersByTime(2000);
      await act(async () => {
        await result.current.execute();
      });
      expect(handler).toHaveBeenCalledTimes(1);

      // After 600ms more (2.6s total), should fire
      vi.advanceTimersByTime(600);
      await act(async () => {
        await result.current.execute();
      });
      expect(handler).toHaveBeenCalledTimes(2);
    } finally {
      vi.useRealTimers();
    }
  });

  it('allows disabling debounce via debounceSec={false} or debounceSec={0}', async () => {
    const handler = vi.fn();
    const { result } = renderHook(() =>
      useClickBackpressure(handler, { debounceSec: false })
    );

    await act(async () => {
      await result.current.execute();
      await result.current.execute();
      await result.current.execute();
    });

    expect(handler).toHaveBeenCalledTimes(3);
  });

  it('applies async in-flight backpressure while a promise is pending', async () => {
    let resolvePromise!: (val: string) => void;
    const asyncAction = vi.fn().mockImplementation(() => {
      return new Promise<string>((resolve) => {
        resolvePromise = resolve;
      });
    });
    const onBlocked = vi.fn();

    const { result } = renderHook(() =>
      useClickBackpressure(asyncAction, { debounceSec: false, onBlocked })
    );

    const firstPromise = result.current.execute();

    await vi.waitFor(() => {
      expect(result.current.isPending).toBe(true);
    });
    expect(asyncAction).toHaveBeenCalledTimes(1);

    // Second click attempted while first is pending
    result.current.execute();
    expect(asyncAction).toHaveBeenCalledTimes(1);
    expect(onBlocked).toHaveBeenCalledWith('in_flight');

    // Resolve first promise
    resolvePromise('done');
    await firstPromise;

    await vi.waitFor(() => {
      expect(result.current.isPending).toBe(false);
    });

    // Third click now succeeds
    asyncAction.mockResolvedValueOnce('second-done');
    await act(async () => {
      await result.current.execute();
    });
    expect(asyncAction).toHaveBeenCalledTimes(2);
  });

  it('clears pending state and rethrows when an async action fails', async () => {
    const failingAction = vi.fn().mockRejectedValue(new Error('Network error'));
    const { result } = renderHook(() => useClickBackpressure(failingAction));

    await expect(
      act(async () => {
        await result.current.execute();
      })
    ).rejects.toThrow('Network error');

    expect(result.current.isPending).toBe(false);
  });

  it('acquires lock synchronously BEFORE invoking fn to close TOCTOU window', async () => {
    let hookResult!: ReturnType<typeof useClickBackpressure>;
    const onBlocked = vi.fn();

    const reentrantHandler = vi.fn().mockImplementation(() => {
      // Synchronously attempt a re-entrant click while fn is executing
      hookResult.execute().catch(() => {});
      return Promise.resolve('ok');
    });

    const { result } = renderHook(() => {
      hookResult = useClickBackpressure(reentrantHandler, {
        debounceSec: false,
        onBlocked,
      });
      return hookResult;
    });

    await act(async () => {
      await result.current.execute();
    });

    // Initial click called handler once; re-entrant click was blocked immediately
    expect(reentrantHandler).toHaveBeenCalledTimes(1);
    expect(onBlocked).toHaveBeenCalledWith('in_flight');
    expect(result.current.isPending).toBe(false);
  });

  it('isolates cancellation and execution per invocation (decoupled mutex)', async () => {
    let resolveFirst!: () => void;
    const slowPromise = new Promise<void>((resolve) => {
      resolveFirst = resolve;
    });

    const handler = vi.fn().mockReturnValue(slowPromise);
    const onBlocked = vi.fn();
    const { result } = renderHook(() =>
      useClickBackpressure(handler, { debounceSec: false, onBlocked })
    );

    let firstExec!: Promise<unknown>;
    act(() => {
      firstExec = result.current.execute();
    });

    expect(result.current.isPending).toBe(true);

    // Rapid successive click during flight
    await act(async () => {
      await result.current.execute();
    });
    expect(onBlocked).toHaveBeenCalledWith('in_flight');

    // Ensure first execution is still pending and not corrupted by dropped second click
    expect(result.current.isPending).toBe(true);

    await act(async () => {
      resolveFirst();
      await firstExec;
    });

    expect(result.current.isPending).toBe(false);
  });

  it('allows manual cooldown cancellation via cancelCooldown()', async () => {
    const handler = vi.fn();
    const { result } = renderHook(() => useClickBackpressure(handler));

    await act(async () => {
      await result.current.execute();
    });
    expect(handler).toHaveBeenCalledTimes(1);

    act(() => {
      result.current.cancelCooldown();
    });

    // Next click succeeds immediately without waiting 1s
    await act(async () => {
      await result.current.execute();
    });
    expect(handler).toHaveBeenCalledTimes(2);
  });

  it('allows cancelCooldown inside an async handler without sticking in pending state', async () => {
    let hookResult!: ReturnType<typeof useClickBackpressure>;
    const handler = vi.fn().mockImplementation(async () => {
      hookResult.cancelCooldown();
    });

    const { result } = renderHook(() => {
      hookResult = useClickBackpressure(handler);
      return hookResult;
    });

    await act(async () => {
      await result.current.execute();
    });
    expect(handler).toHaveBeenCalledTimes(1);
    expect(result.current.isPending).toBe(false);

    // Immediate second click should succeed without waiting 1s
    await act(async () => {
      await result.current.execute();
    });
    expect(handler).toHaveBeenCalledTimes(2);
  });
});
