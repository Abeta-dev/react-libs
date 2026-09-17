/**
 * @abeta.dev/auth
 *
 * Backend-agnostic React 19 authentication UI library.
 * Supports Google & LinkedIn 3PL, Email/Password, OTP, and
 * concurrency-safe silent token refresh.
 */

// Core Types
export type {
  AuthUser,
  AuthSession,
  PasswordCredentials,
  SignUpCredentials,
  ResetPasswordParams,
  VerifyOtpParams,
  OAuthProvider,
  OAuthOptions,
  OAuthSignInOptions,
  AuthAdapter,
} from './types/adapter';
export { AuthError } from './types/adapter';

export type {
  TokenStorage,
  TokenManagerOptions,
} from './types/tokens';

export type {
  AccessSessionPersistence,
  ActivationInspection,
  AuthCapabilities,
  AuthClientAdapter,
  AuthClientOptions,
  AuthClientSession,
  AuthClientSnapshot,
  AuthClientStatus,
  AuthCoordinationMessage,
  CapabilityDescriptor,
  CsrfProvider,
  InvitationAccepted,
  InvitationInspection,
  PendingActivation,
  RefreshCoordinator,
} from './types/client';
export { AuthClientError } from './types/client';

// Core Engine & Adapters
export { AuthClient } from './core/auth-client';
export { createAuthenticatedFetch, type AuthenticatedFetchClient, type AuthenticatedFetchOptions } from './core/authenticated-fetch';
export { TokenManager } from './core/token-manager';
export { MockAuthAdapter, DEFAULT_MOCK_PASSWORD, type MockAdapterOptions } from './core/mock-adapter';
export {
  generateOAuthState,
  generateCodeVerifier,
  generateCodeChallenge,
  isValidRedirectUrl,
} from './core/pkce';

// Context & Hooks
export {
  AuthContext,
  AuthProvider,
  type AuthProviderProps,
  type AuthContextValue,
  type AuthStatus,
} from './context/auth-context';

export {
  useAuth,
  useToken,
  useUser,
  useOAuth,
} from './context/hooks';
export {
  AuthClientProvider,
  type AuthClientProviderProps,
  useAuthClient,
  useAuthClientSnapshot,
} from './context/auth-client-context';

// Icons
export { GoogleIcon, type IconProps } from './icons/google-icon';
export { LinkedInIcon } from './icons/linkedin-icon';
export { GitHubIcon } from './icons/github-icon';
export { AppleIcon } from './icons/apple-icon';
export { MicrosoftIcon } from './icons/microsoft-icon';
export { EyeIcon, EyeOffIcon } from './icons/eye-icons';
export { SpinnerIcon } from './icons/spinner-icon';

// UI Components
export { OAuthButton, type OAuthButtonProps } from './components/oauth-button';
export { OAuthButtonGroup, type OAuthButtonGroupProps } from './components/oauth-button-group';
export { LoginForm, type LoginFormProps } from './components/login-form';
export { SignUpForm, type SignUpFormProps } from './components/signup-form';
export { ForgotPasswordForm, type ForgotPasswordFormProps } from './components/forgot-password-form';
export { OtpForm, type OtpFormProps } from './components/otp-form';
export { AuthCard, type AuthCardProps, type AuthCardMode } from './components/auth-card';
export {
  useClickBackpressure,
  type ClickBackpressureOptions,
  type UseClickBackpressureResult,
} from './core/use-click-backpressure';
