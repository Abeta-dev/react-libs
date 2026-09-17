import * as React from 'react';
import { clsx } from 'clsx';
import { OAuthButtonGroup } from './oauth-button-group';
import { LoginForm, type LoginFormProps } from './login-form';
import { SignUpForm, type SignUpFormProps } from './signup-form';
import { ForgotPasswordForm } from './forgot-password-form';
import { OtpForm } from './otp-form';
import { AuthContext } from '../context/auth-context';
import type { AuthSession, OAuthOptions, OAuthProvider } from '../types/adapter';

export type AuthCardMode = 'signIn' | 'signUp' | 'forgotPassword' | 'otp';

export interface AuthCardProps {
  initialMode?: AuthCardMode | undefined;
  mode?: AuthCardMode | undefined;
  onModeChange?: ((mode: AuthCardMode) => void) | undefined;
  providers?: OAuthProvider[] | undefined;
  oauthOptions?: OAuthOptions | undefined;
  title?: string | undefined;
  subtitle?: string | undefined;
  logo?: React.ReactNode | undefined;
  onSuccess?: ((session: AuthSession) => void) | undefined;
  onError?: ((error: Error) => void) | undefined;
  loginProps?: Partial<LoginFormProps> | undefined;
  signUpProps?: Partial<SignUpFormProps> | undefined;
  otpEmail?: string | undefined;
  className?: string | undefined;
  /**
   * Cooldown / debounce duration in seconds for buttons and forms. Default: 1. Pass 0 or false to disable.
   */
  debounceSec?: number | false | undefined;
}

export const AuthCard: React.FC<AuthCardProps> = ({
  initialMode = 'signIn',
  mode: controlledMode,
  onModeChange,
  providers = ['google', 'linkedin'],
  oauthOptions,
  title,
  subtitle,
  logo,
  onSuccess,
  onError,
  loginProps,
  signUpProps,
  otpEmail,
  className,
  debounceSec = 1,
}) => {
  const auth = React.useContext(AuthContext);
  const [internalMode, setInternalMode] = React.useState<AuthCardMode>(initialMode);
  const currentMode = controlledMode ?? internalMode;

  const baseId = React.useId();
  const signInTabId = `${baseId}-tab-signin`;
  const signUpTabId = `${baseId}-tab-signup`;
  const signInPanelId = `${baseId}-panel-signin`;
  const signUpPanelId = `${baseId}-panel-signup`;

  const setMode = (newMode: AuthCardMode) => {
    auth?.clearError?.();
    setInternalMode(newMode);
    onModeChange?.(newMode);
  };

  const defaultHeader = React.useMemo(() => {
    switch (currentMode) {
      case 'signUp':
        return {
          title: 'Create your account',
          subtitle: 'Get started in just a few minutes',
        };
      case 'forgotPassword':
        return {
          title: 'Reset password',
          subtitle: 'Receive instructions to regain access',
        };
      case 'otp':
        return {
          title: 'Verify code',
          subtitle: 'Confirm your identity with two-factor authentication',
        };
      case 'signIn':
      default:
        return {
          title: 'Welcome back',
          subtitle: 'Sign in to access your account',
        };
    }
  }, [currentMode]);

  const currentHeader = {
    title: title ?? defaultHeader.title,
    subtitle: subtitle ?? defaultHeader.subtitle,
  };

  const showSocialLogins = (currentMode === 'signIn' || currentMode === 'signUp') && providers.length > 0;

  return (
    <div
      className={clsx(
        'w-full max-w-md rounded-xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-900',
        className
      )}
    >
      {/* Header */}
      <div className="text-center space-y-2 mb-6">
        {logo && <div className="flex justify-center mb-3">{logo}</div>}
        <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          {currentHeader.title}
        </h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          {currentHeader.subtitle}
        </p>
      </div>

      {/* Tabs (Sign In / Sign Up) */}
      {(currentMode === 'signIn' || currentMode === 'signUp') && (
        <div
          role="tablist"
          aria-label="Authentication modes"
          className="grid grid-cols-2 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800 mb-6"
        >
          <button
            id={signInTabId}
            type="button"
            role="tab"
            aria-selected={currentMode === 'signIn'}
            aria-controls={signInPanelId}
            onClick={() => setMode('signIn')}
            className={clsx(
              'rounded-md py-1.5 text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
              currentMode === 'signIn'
                ? 'bg-white text-neutral-900 shadow-xs dark:bg-neutral-900 dark:text-white'
                : 'text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200'
            )}
          >
            Sign In
          </button>
          <button
            id={signUpTabId}
            type="button"
            role="tab"
            aria-selected={currentMode === 'signUp'}
            aria-controls={signUpPanelId}
            onClick={() => setMode('signUp')}
            className={clsx(
              'rounded-md py-1.5 text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
              currentMode === 'signUp'
                ? 'bg-white text-neutral-900 shadow-xs dark:bg-neutral-900 dark:text-white'
                : 'text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200'
            )}
          >
            Create Account
          </button>
        </div>
      )}

      {/* 3PL OAuth Social Login Buttons */}
      {showSocialLogins && (
        <div className="space-y-4 mb-6">
          <OAuthButtonGroup
            providers={providers}
            options={oauthOptions}
            layout="stack"
            variant="outline"
            debounceSec={debounceSec}
          />

          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200 dark:border-neutral-800" />
            </div>
            <span className="relative bg-white px-3 text-xs uppercase tracking-wider text-neutral-400 dark:bg-neutral-900 dark:text-neutral-500">
              Or continue with email
            </span>
          </div>
        </div>
      )}

      {/* Mode Body */}
      {currentMode === 'signIn' && (
        <div
          id={signInPanelId}
          role="tabpanel"
          aria-labelledby={signInTabId}
        >
          <LoginForm
            onSuccess={onSuccess}
            onError={onError}
            onForgotPasswordClick={() => setMode('forgotPassword')}
            onSignUpClick={() => setMode('signUp')}
            debounceSec={debounceSec}
            {...loginProps}
          />
        </div>
      )}

      {currentMode === 'signUp' && (
        <div
          id={signUpPanelId}
          role="tabpanel"
          aria-labelledby={signUpTabId}
        >
          <SignUpForm
            onSuccess={onSuccess}
            onError={onError}
            onSignInClick={() => setMode('signIn')}
            debounceSec={debounceSec}
            {...signUpProps}
          />
        </div>
      )}

      {currentMode === 'forgotPassword' && (
        <ForgotPasswordForm
          onSuccess={onSuccess ? () => onSuccess(undefined as unknown as AuthSession) : undefined}
          onError={onError}
          onBackToSignIn={() => setMode('signIn')}
          debounceSec={debounceSec}
        />
      )}

      {currentMode === 'otp' && (
        <OtpForm
          email={otpEmail}
          onSuccess={onSuccess}
          onError={onError}
          debounceSec={debounceSec}
        />
      )}
    </div>
  );
};
AuthCard.displayName = 'AuthCard';
