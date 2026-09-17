import * as React from 'react';

export interface ClickBackpressureOptions {
  /**
   * Cooldown / debounce duration in seconds to prevent rapid multiple clicks.
   * Pass any number in seconds (e.g. 1, 0.5, 2).
   * Pass `false` or `0` to disable debouncing.
   * @default 1
   */
  debounceSec?: number | false | undefined;

  /**
   * Whether debouncing is completely disabled.
   * @default false
   */
  disabled?: boolean | undefined;

  /**
   * Optional callback invoked when a click or submit is blocked.
   */
  onBlocked?: ((reason: 'in_flight' | 'cooldown') => void) | undefined;
}

export interface UseClickBackpressureResult<TArgs extends unknown[] = [React.SyntheticEvent], TReturn = unknown> {
  /**
   * Wrapped execution function with backpressure and debouncing applied.
   */
  execute: (...args: TArgs) => Promise<Awaited<TReturn> | undefined>;

  /**
   * Whether an async execution is currently in flight.
   */
  isPending: boolean;

  /**
   * Resets the cooldown timer immediately, allowing the next click to fire without waiting.
   */
  cancelCooldown: () => void;

  /**
   * Utility to wrap any arbitrary handler with the same backpressure and debounce rules.
   */
  wrapHandler: <A extends unknown[], R>(
    fn: (...args: A) => R
  ) => (...args: A) => Promise<Awaited<R> | undefined>;
}

/**
 * Hook providing leading-edge click debouncing and async backpressure.
 * - Leading-edge: The first click fires immediately.
 * - Cooldown window: Subsequent clicks within `debounceSec` seconds (default: 1s) are dropped.
 * - Async backpressure: If the handler returns a Promise, any clicks during execution are dropped.
 * - Synchronous Lock: isPendingRef.current is locked BEFORE fn invocation to close TOCTOU gap.
 * - Decoupled Execution: Execution tracking isolated per invocation to prevent mutex corruption.
 * - Concurrent Mode Purity: Handler ref updated inside useEffect to preserve pure rendering.
 */
export function useClickBackpressure<TArgs extends unknown[] = [React.SyntheticEvent], TReturn = unknown>(
  handler?: ((...args: TArgs) => TReturn) | undefined,
  options: ClickBackpressureOptions = {}
): UseClickBackpressureResult<TArgs, TReturn> {
  const { debounceSec = 1, disabled = false, onBlocked } = options;

  const [isPending, setIsPending] = React.useState(false);
  const isPendingRef = React.useRef(false);
  const lastClickTimeRef = React.useRef<number>(0);
  const invocationCounterRef = React.useRef<number>(0);
  const activeExecutionIdRef = React.useRef<number | null>(null);

  // Concurrent mode purity: Update handler ref using isomorphic layout effect before paint
  const useIsomorphicLayoutEffect =
    typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;
  const handlerRef = React.useRef(handler);
  useIsomorphicLayoutEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  const isDebounceDisabled = disabled || debounceSec === false || debounceSec <= 0;
  const cooldownMs = isDebounceDisabled ? 0 : (debounceSec as number) * 1000;

  const cancelCooldown = React.useCallback(() => {
    lastClickTimeRef.current = 0;
    activeExecutionIdRef.current = null;
    isPendingRef.current = false;
    setIsPending(false);
  }, []);

  const wrapHandler = React.useCallback(
    <A extends unknown[], R>(fn: (...args: A) => R) => {
      return async (...args: A): Promise<Awaited<R> | undefined> => {
        const now = Date.now();

        // 1. Check in-flight backpressure
        if (isPendingRef.current) {
          const firstArg = args[0] as { preventDefault?: () => void } | undefined;
          firstArg?.preventDefault?.();
          onBlocked?.('in_flight');
          return undefined;
        }

        // 2. Check debounce cooldown window
        if (!isDebounceDisabled && now - lastClickTimeRef.current < cooldownMs) {
          const firstArg = args[0] as { preventDefault?: () => void } | undefined;
          firstArg?.preventDefault?.();
          onBlocked?.('cooldown');
          return undefined;
        }

        // Synchronously acquire lock BEFORE invoking fn(...args) to close TOCTOU race gap
        isPendingRef.current = true;
        const currentExecutionId = ++invocationCounterRef.current;
        activeExecutionIdRef.current = currentExecutionId;
        lastClickTimeRef.current = now;

        let isAsync = false;
        try {
          const result = fn(...args);
          if (result && typeof (result as unknown as { then?: unknown }).then === 'function') {
            if (activeExecutionIdRef.current === currentExecutionId) {
              isAsync = true;
              setIsPending(true);
            }
            return (await result) as Awaited<R>;
          }
          // Synchronous execution: release pending lock immediately
          isPendingRef.current = false;
          activeExecutionIdRef.current = null;
          return result as Awaited<R>;
        } catch (err) {
          lastClickTimeRef.current = 0;
          isPendingRef.current = false;
          activeExecutionIdRef.current = null;
          setIsPending(false);
          throw err;
        } finally {
          if (isAsync) {
            // Decoupled cancellation: only reset if this specific execution is still the active one
            if (activeExecutionIdRef.current === currentExecutionId) {
              isPendingRef.current = false;
              activeExecutionIdRef.current = null;
              setIsPending(false);
            }
          }
        }
      };
    },
    [isDebounceDisabled, cooldownMs, onBlocked]
  );

  const execute = React.useMemo(() => {
    return wrapHandler<TArgs, TReturn | undefined>((...args: TArgs) => {
      if (handlerRef.current) {
        return handlerRef.current(...args);
      }
      return undefined;
    }) as (...args: TArgs) => Promise<Awaited<TReturn> | undefined>;
  }, [wrapHandler]);

  return {
    execute,
    isPending,
    cancelCooldown,
    wrapHandler,
  };
}
