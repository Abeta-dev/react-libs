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
  execute: (...args: TArgs) => Promise<TReturn | undefined>;

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
  ) => (...args: A) => Promise<R | undefined>;
}

/**
 * Hook providing leading-edge click debouncing and async backpressure.
 * - Leading-edge: The first click fires immediately.
 * - Cooldown window: Subsequent clicks within `debounceSec` seconds (default: 1s) are dropped.
 * - Async backpressure: If the handler returns a Promise, any clicks during execution are dropped.
 * - Configurable: Specify any number of seconds, or disable via `debounceSec={0}` / `debounceSec={false}`.
 */
export function useClickBackpressure<TArgs extends unknown[] = [React.SyntheticEvent], TReturn = unknown>(
  handler?: ((...args: TArgs) => TReturn) | undefined,
  options: ClickBackpressureOptions = {}
): UseClickBackpressureResult<TArgs, TReturn> {
  const { debounceSec = 1, disabled = false, onBlocked } = options;

  const [isPending, setIsPending] = React.useState(false);
  const isPendingRef = React.useRef(false);
  const lastClickTimeRef = React.useRef<number>(0);
  const handlerRef = React.useRef(handler);
  handlerRef.current = handler;

  const isDebounceDisabled = disabled || debounceSec === false || debounceSec <= 0;
  const cooldownMs = isDebounceDisabled ? 0 : (debounceSec as number) * 1000;

  const cancelledRef = React.useRef(false);

  const cancelCooldown = React.useCallback(() => {
    cancelledRef.current = true;
    lastClickTimeRef.current = 0;
    isPendingRef.current = false;
    setIsPending(false);
  }, []);

  const wrapHandler = React.useCallback(
    <A extends unknown[], R>(fn: (...args: A) => R) => {
      return async (...args: A): Promise<R | undefined> => {
        const now = Date.now();

        // 1. Check in-flight backpressure
        if (isPendingRef.current) {
          const firstArg = args[0] as { preventDefault?: () => void; stopPropagation?: () => void } | undefined;
          firstArg?.preventDefault?.();
          firstArg?.stopPropagation?.();
          onBlocked?.('in_flight');
          return undefined;
        }

        // 2. Check debounce cooldown window
        if (!isDebounceDisabled && now - lastClickTimeRef.current < cooldownMs) {
          const firstArg = args[0] as { preventDefault?: () => void; stopPropagation?: () => void } | undefined;
          firstArg?.preventDefault?.();
          firstArg?.stopPropagation?.();
          onBlocked?.('cooldown');
          return undefined;
        }

        cancelledRef.current = false;
        lastClickTimeRef.current = now;

        let isAsync = false;
        try {
          const result = fn(...args);
          if (result && typeof (result as unknown as Promise<unknown>).then === 'function') {
            if (cancelledRef.current) {
              return undefined;
            }
            isAsync = true;
            isPendingRef.current = true;
            setIsPending(true);
            return (await result) as R;
          }
          return result;
        } finally {
          if (isAsync && !cancelledRef.current) {
            isPendingRef.current = false;
            setIsPending(false);
          }
        }
      };
    },
    [isDebounceDisabled, cooldownMs, onBlocked]
  );

  const execute = React.useMemo(() => {
    return wrapHandler((...args: TArgs) => {
      if (handlerRef.current) {
        return handlerRef.current(...args);
      }
      return undefined as unknown as TReturn;
    });
  }, [wrapHandler]);

  return {
    execute,
    isPending,
    cancelCooldown,
    wrapHandler,
  };
}
