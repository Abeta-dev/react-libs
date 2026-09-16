import * as React from 'react';
import { clsx } from 'clsx';
import { useAuth } from '../context/hooks';
import { EyeIcon, EyeOffIcon } from '../icons/eye-icons';
import { SpinnerIcon } from '../icons/spinner-icon';
import type { AuthSession, SignUpCredentials } from '../types/adapter';

export interface SignUpFormProps {
  onSuccess?: ((session: AuthSession) => void) | undefined;
  onError?: ((error: Error) => void) | undefined;
  onSignInClick?: (() => void) | undefined;
  submitLabel?: string | undefined;
  termsUrl?: string | undefined;
  privacyUrl?: string | undefined;
  className?: string | undefined;
}

function calculatePasswordStrength(password: string): {
  score: number;
  label: 'Weak' | 'Fair' | 'Good' | 'Strong';
  color: string;
} {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  switch (score) {
    case 0:
    case 1:
      return { score: Math.max(1, score), label: 'Weak', color: 'bg-red-500' };
    case 2:
      return { score, label: 'Fair', color: 'bg-amber-500' };
    case 3:
      return { score, label: 'Good', color: 'bg-blue-500' };
    case 4:
    default:
      return { score: 4, label: 'Strong', color: 'bg-emerald-500' };
  }
}

function isValidEmail(val: string): boolean {
  const atIndex = val.indexOf('@');
  const dotIndex = val.lastIndexOf('.');
  return atIndex > 0 && dotIndex > atIndex + 1 && dotIndex < val.length - 1 && !val.includes(' ');
}

export const SignUpForm: React.FC<SignUpFormProps> = ({
  onSuccess,
  onError,
  onSignInClick,
  submitLabel = 'Create account',
  termsUrl = '#',
  privacyUrl = '#',
  className,
}) => {
  const { signUp, error: contextError, clearError } = useAuth();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [acceptTerms, setAcceptTerms] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [localError, setLocalError] = React.useState<string | null>(null);

  const displayError = localError ?? contextError;
  const strength = calculatePasswordStrength(password);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocalError(null);
    clearError();

    if (!name.trim()) {
      setLocalError('Please enter your full name');
      return;
    }

    if (!isValidEmail(email.trim())) {
      setLocalError('Please enter a valid email address');
      return;
    }

    if (password.length < 8) {
      setLocalError('Password must be at least 8 characters long');
      return;
    }

    if (!Object.is(password, confirmPassword)) {
      setLocalError('Passwords do not match');
      return;
    }

    if (!acceptTerms) {
      setLocalError('You must accept the terms of service to proceed');
      return;
    }

    setIsSubmitting(true);
    try {
      const credentials: SignUpCredentials = {
        name: name.trim(),
        email: email.trim(),
        password,
        confirmPassword,
      };
      const session = await signUp(credentials);
      onSuccess?.(session);
    } catch (err) {
      const errorInstance = err instanceof Error ? err : new Error('Registration failed');
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
          htmlFor="auth-signup-name"
          className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
        >
          Full name
        </label>
        <input
          id="auth-signup-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (displayError) setLocalError(null);
          }}
          placeholder="Jane Doe"
          className="w-full rounded-md border border-neutral-300 bg-white px-3.5 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-500 shadow-xs"
        />
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="auth-signup-email"
          className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
        >
          Email address
        </label>
        <input
          id="auth-signup-email"
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
        <label
          htmlFor="auth-signup-password"
          className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
        >
          Password
        </label>
        <div className="relative">
          <input
            id="auth-signup-password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (displayError) setLocalError(null);
            }}
            placeholder="At least 8 characters"
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

        {password.length > 0 && (
          <div className="pt-1.5 space-y-1">
            <div className="flex justify-between items-center text-xs text-neutral-500">
              <span>Password strength:</span>
              <span className="font-medium text-neutral-700 dark:text-neutral-300">{strength.label}</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5 h-1.5">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={clsx(
                    'rounded-full transition-all duration-300',
                    step <= strength.score ? strength.color : 'bg-neutral-200 dark:bg-neutral-700'
                  )}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="auth-signup-confirm"
          className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
        >
          Confirm password
        </label>
        <input
          id="auth-signup-confirm"
          name="confirmPassword"
          type={showPassword ? 'text' : 'password'}
          autoComplete="new-password"
          required
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            if (displayError) setLocalError(null);
          }}
          placeholder="Repeat password"
          className="w-full rounded-md border border-neutral-300 bg-white px-3.5 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-500 shadow-xs"
        />
      </div>

      <div className="flex items-start">
        <input
          id="auth-signup-terms"
          name="acceptTerms"
          type="checkbox"
          checked={acceptTerms}
          onChange={(e) => setAcceptTerms(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-neutral-300 text-indigo-600 focus:ring-indigo-500 dark:border-neutral-700 dark:bg-neutral-900"
        />
        <label
          htmlFor="auth-signup-terms"
          className="ml-2 block text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed"
        >
          I agree to the{' '}
          <a href={termsUrl} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href={privacyUrl} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline">
            Privacy Policy
          </a>
        </label>
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
            <span>Creating account...</span>
          </>
        ) : (
          <span>{submitLabel}</span>
        )}
      </button>

      {onSignInClick && (
        <p className="text-center text-xs text-neutral-500 dark:text-neutral-400 pt-1">
          Already have an account?{' '}
          <button
            type="button"
            onClick={onSignInClick}
            className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 hover:underline focus:outline-none"
          >
            Sign in
          </button>
        </p>
      )}
    </form>
  );
};
SignUpForm.displayName = 'SignUpForm';
