/* eslint-disable security/detect-object-injection */
import * as React from 'react';
import { clsx } from 'clsx';
import { useAuth } from '../context/hooks';
import { SpinnerIcon } from '../icons/spinner-icon';
import type { AuthSession } from '../types/adapter';

export interface OtpFormProps {
  email?: string | undefined;
  length?: number | undefined;
  onSuccess?: ((session: AuthSession) => void) | undefined;
  onError?: ((error: Error) => void) | undefined;
  onResendCode?: (() => Promise<void> | void) | undefined;
  className?: string | undefined;
}

export const OtpForm: React.FC<OtpFormProps> = ({
  email,
  length = 6,
  onSuccess,
  onError,
  onResendCode,
  className,
}) => {
  const { verifyOtp, error: contextError, clearError } = useAuth();
  const [digits, setDigits] = React.useState<string[]>(Array(length).fill(''));
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [localError, setLocalError] = React.useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = React.useState(30);
  const inputsRef = React.useRef<(HTMLInputElement | null)[]>([]);

  const displayError = localError ?? contextError;

  React.useEffect(() => {
    // Focus first input on mount
    inputsRef.current[0]?.focus();
  }, []);

  React.useEffect(() => {
    if (resendCooldown <= 0) return;
    const interval = setInterval(() => {
      setResendCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [resendCooldown]);

  const submitCode = React.useCallback(
    async (codeToSubmit: string) => {
      setLocalError(null);
      clearError();
      setIsSubmitting(true);

      try {
        const session = await verifyOtp({
          email,
          code: codeToSubmit,
          type: 'email',
        });
        onSuccess?.(session);
      } catch (err) {
        const errorInstance = err instanceof Error ? err : new Error('Verification failed');
        setLocalError(errorInstance.message);
        onError?.(errorInstance);
      } finally {
        setIsSubmitting(false);
      }
    },
    [verifyOtp, email, onSuccess, onError, clearError]
  );

  const handleChange = (index: number, val: string) => {
    // Keep only the last character entered
    const char = val.replace(/\D/g, '').slice(-1);
    const newDigits = [...digits];
    newDigits[index] = char;
    setDigits(newDigits);
    setLocalError(null);

    // Auto-advance
    if (char && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    // Auto-submit if all digits are filled
    const fullCode = newDigits.join('');
    if (fullCode.length === length && newDigits.every((d) => d !== '')) {
      void submitCode(fullCode);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!digits[index] && index > 0) {
        // Empty current box: jump back and clear previous
        const newDigits = [...digits];
        newDigits[index - 1] = '';
        setDigits(newDigits);
        inputsRef.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputsRef.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    if (!pasted) return;

    const newDigits = [...digits];
    for (let i = 0; i < pasted.length; i++) {
      newDigits[i] = pasted[i] ?? '';
    }
    setDigits(newDigits);

    const nextIndex = Math.min(pasted.length, length - 1);
    inputsRef.current[nextIndex]?.focus();

    if (pasted.length === length) {
      void submitCode(pasted);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0 || isSubmitting) return;
    setResendCooldown(60);
    setLocalError(null);
    try {
      await onResendCode?.();
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : 'Failed to resend code');
    }
  };

  return (
    <div className={clsx('space-y-5 text-center', className)}>
      <div className="space-y-1">
        <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
          Enter verification code
        </h3>
        <p className="text-xs text-neutral-600 dark:text-neutral-400">
          We sent a {length}-digit code to{' '}
          <span className="font-medium text-neutral-900 dark:text-neutral-200">
            {email ?? 'your email or phone'}
          </span>
        </p>
      </div>

      {displayError && (
        <div
          role="alert"
          className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300 text-left"
        >
          <div className="flex items-center gap-2">
            <span className="font-medium">Error:</span>
            <span>{displayError}</span>
          </div>
        </div>
      )}

      <div
        role="group"
        aria-label="One-time verification code"
        className="flex items-center justify-center gap-2 sm:gap-3"
      >
        {digits.map((digit, idx) => (
          <input
            key={idx}
            ref={(el) => {
              inputsRef.current[idx] = el;
            }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={digit}
            aria-label={`Digit ${idx + 1} of ${length}`}
            disabled={isSubmitting}
            onChange={(e) => handleChange(idx, e.target.value)}
            onKeyDown={(e) => handleKeyDown(idx, e)}
            onPaste={handlePaste}
            className="h-12 w-10 sm:w-12 text-center text-lg font-semibold rounded-md border border-neutral-300 bg-white text-neutral-900 shadow-xs focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 disabled:opacity-50"
          />
        ))}
      </div>

      <button
        type="button"
        disabled={isSubmitting || digits.some((d) => d === '')}
        onClick={() => void submitCode(digits.join(''))}
        className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-xs hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 transition-colors"
      >
        {isSubmitting ? (
          <>
            <SpinnerIcon size={16} className="animate-spin text-white" />
            <span>Verifying code...</span>
          </>
        ) : (
          <span>Verify & Continue</span>
        )}
      </button>

      <div className="text-xs text-neutral-500 dark:text-neutral-400">
        Didn't receive code?{' '}
        <button
          type="button"
          disabled={resendCooldown > 0 || isSubmitting}
          onClick={() => void handleResend()}
          className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 hover:underline disabled:text-neutral-400 disabled:no-underline focus:outline-none"
        >
          {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend code'}
        </button>
      </div>
    </div>
  );
};
OtpForm.displayName = 'OtpForm';
