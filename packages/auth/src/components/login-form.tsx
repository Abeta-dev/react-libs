import * as React from 'react';
import { clsx } from 'clsx';
import { useAuth } from '../context/hooks';
import { EyeIcon, EyeOffIcon } from '../icons/eye-icons';
import { SpinnerIcon } from '../icons/spinner-icon';
import type { AuthSession, PasswordCredentials } from '../types/adapter';

export interface LoginFormProps {
  onSuccess?: ((session: AuthSession) => void) | undefined;
  onError?: ((error: Error) => void) | undefined;
  onForgotPasswordClick?: (() => void) | undefined;
  onSignUpClick?: (() => void) | undefined;
  showRememberMe?: boolean | undefined;
  showForgotPassword?: boolean | undefined;
  submitLabel?: string | undefined;
  defaultValues?: Partial<PasswordCredentials> | undefined;
  className?: string | undefined;
}

function isValidEmail(val: string): boolean {
  const atIndex = val.indexOf('@');
  const dotIndex = val.lastIndexOf('.');
  return atIndex > 0 && dotIndex > atIndex + 1 && dotIndex < val.length - 1 && !val.includes(' ');
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSuccess,
  onError,
  onForgotPasswordClick,
  onSignUpClick,
  showRememberMe = true,
  showForgotPassword = true,
  submitLabel = 'Sign in',
  defaultValues,
  className,
}) => {
  const { signIn, error: contextError, clearError } = useAuth();
  const [email, setEmail] = React.useState(defaultValues?.email ?? '');
  const [password, setPassword] = React.useState(defaultValues?.password ?? '');
  const [rememberMe, setRememberMe] = React.useState(defaultValues?.rememberMe ?? false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [localError, setLocalError] = React.useState<string | null>(null);

  const displayError = localError ?? contextError;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocalError(null);
    clearError();

    if (!email.trim()) {
      setLocalError('Please enter your email address');
      return;
    }

    if (!isValidEmail(email.trim())) {
      setLocalError('Please enter a valid email address');
      return;
    }

    if (!password) {
      setLocalError('Please enter your password');
      return;
    }

    setIsSubmitting(true);
    try {
      const session = await signIn({
        email: email.trim(),
        password,
        rememberMe,
      });
      onSuccess?.(session);
    } catch (err) {
      const errorInstance = err instanceof Error ? err : new Error('Sign in failed');
      onError?.(errorInstance);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className={clsx('space-y-4', className)}>
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
          htmlFor="auth-login-email"
          className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
        >
          Email address
        </label>
        <input
          id="auth-login-email"
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

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label
            htmlFor="auth-login-password"
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
          >
            Password
          </label>
          {showForgotPassword && onForgotPasswordClick && (
            <button
              type="button"
              onClick={onForgotPasswordClick}
              className="text-xs font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 hover:underline focus:outline-none focus:underline"
            >
              Forgot password?
            </button>
          )}
        </div>
        <div className="relative">
          <input
            id="auth-login-password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (displayError) setLocalError(null);
            }}
            placeholder="••••••••"
            className="w-full rounded-md border border-neutral-300 bg-white px-3.5 py-2 pr-10 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-500 shadow-xs"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 focus:outline-none"
          >
            {showPassword ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
          </button>
        </div>
      </div>

      {showRememberMe && (
        <div className="flex items-center">
          <input
            id="auth-login-remember"
            name="rememberMe"
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="h-4 w-4 rounded border-neutral-300 text-indigo-600 focus:ring-indigo-500 dark:border-neutral-700 dark:bg-neutral-900"
          />
          <label
            htmlFor="auth-login-remember"
            className="ml-2 block text-xs text-neutral-600 dark:text-neutral-400"
          >
            Remember me for 30 days
          </label>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-xs hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 transition-colors"
      >
        {isSubmitting ? (
          <>
            <SpinnerIcon size={16} className="animate-spin text-white" />
            <span>Signing in...</span>
          </>
        ) : (
          <span>{submitLabel}</span>
        )}
      </button>

      {onSignUpClick && (
        <p className="text-center text-xs text-neutral-500 dark:text-neutral-400 pt-1">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={onSignUpClick}
            className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 hover:underline focus:outline-none"
          >
            Sign up
          </button>
        </p>
      )}
    </form>
  );
};
LoginForm.displayName = 'LoginForm';
