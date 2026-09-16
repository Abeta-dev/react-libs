import * as React from 'react';
import { clsx } from 'clsx';
import { useAuth } from '../context/hooks';
import { SpinnerIcon } from '../icons/spinner-icon';

export interface ForgotPasswordFormProps {
  onSuccess?: () => void;
  onBackToSignIn?: () => void;
  className?: string;
}

function isValidEmail(val: string): boolean {
  const atIndex = val.indexOf('@');
  const dotIndex = val.lastIndexOf('.');
  return atIndex > 0 && dotIndex > atIndex + 1 && dotIndex < val.length - 1 && !val.includes(' ');
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onSuccess,
  onBackToSignIn,
  className,
}) => {
  const { requestPasswordReset, error: contextError, clearError } = useAuth();
  const [email, setEmail] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [localError, setLocalError] = React.useState<string | null>(null);
  const [cooldownSeconds, setCooldownSeconds] = React.useState(0);

  const displayError = localError ?? contextError;

  React.useEffect(() => {
    if (cooldownSeconds <= 0) return;
    const timer = setInterval(() => {
      setCooldownSeconds((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldownSeconds]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (cooldownSeconds > 0) return;

    setLocalError(null);
    clearError();

    if (!isValidEmail(email.trim())) {
      setLocalError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    try {
      await requestPasswordReset(email.trim());
      setIsSuccess(true);
      setCooldownSeconds(60);
      onSuccess?.();
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : 'Failed to send reset link');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className={clsx('space-y-4 text-center', className)}>
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <div className="space-y-1">
          <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
            Check your email
          </h3>
          <p className="text-xs text-neutral-600 dark:text-neutral-400">
            We sent a password reset link to{' '}
            <span className="font-medium text-neutral-900 dark:text-neutral-200">{email}</span>.
          </p>
        </div>

        <div className="pt-2 space-y-2">
          <button
            type="button"
            disabled={cooldownSeconds > 0 || isSubmitting}
            onClick={(e) => void handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>)}
            className="w-full text-xs font-medium text-indigo-600 hover:text-indigo-500 disabled:text-neutral-400 focus:outline-none"
          >
            {cooldownSeconds > 0
              ? `Resend available in ${cooldownSeconds}s`
              : "Didn't receive the email? Click to resend"}
          </button>

          {onBackToSignIn && (
            <button
              type="button"
              onClick={onBackToSignIn}
              className="w-full rounded-md border border-neutral-300 bg-white px-4 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 shadow-xs"
            >
              Back to sign in
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={clsx('space-y-4', className)}>
      <div className="space-y-1">
        <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
          Reset your password
        </h3>
        <p className="text-xs text-neutral-600 dark:text-neutral-400">
          Enter the email address associated with your account and we'll send you a link to reset your password.
        </p>
      </div>

      {displayError && (
        <div
          role="alert"
          className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300"
        >
          <div className="flex items-center gap-2">
            <span className="font-medium">Error:</span>
            <span>{displayError}</span>
          </div>
        </div>
      )}

      <div className="space-y-1.5">
        <label
          htmlFor="auth-forgot-email"
          className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
        >
          Email address
        </label>
        <input
          id="auth-forgot-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (displayError) setLocalError(null);
          }}
          placeholder="name@example.com"
          className="w-full rounded-md border border-neutral-300 bg-white px-3.5 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-500 shadow-xs"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-xs hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 transition-colors"
      >
        {isSubmitting ? (
          <>
            <SpinnerIcon size={16} className="animate-spin text-white" />
            <span>Sending link...</span>
          </>
        ) : (
          <span>Send reset link</span>
        )}
      </button>

      {onBackToSignIn && (
        <button
          type="button"
          onClick={onBackToSignIn}
          className="w-full text-center text-xs font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 hover:underline focus:outline-none pt-1"
        >
          Back to sign in
        </button>
      )}
    </form>
  );
};
const FORGOT_COMPONENT_NAME = ['Forgot', 'Password', 'Form'].join('');
ForgotPasswordForm.displayName = FORGOT_COMPONENT_NAME;
