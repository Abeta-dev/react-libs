/**
 * @abeta.dev/auth - Core Adapter & Authentication Types
 * Backend-agnostic abstraction allowing integration with any backend.
 */

export interface AuthUser {
  id: string;
  email: string;
  name?: string | undefined;
  avatarUrl?: string | undefined;
  role?: string | undefined;
  emailVerified?: boolean | undefined;
  [key: string]: unknown;
}

export interface AuthSession<TUser = AuthUser> {
  user: TUser;
  accessToken: string;
  /** Unix timestamp in milliseconds when the access token expires */
  expiresAt?: number | undefined;
  /** Optional refresh token (when not managed by HttpOnly cookies) */
  refreshToken?: string | undefined;
}

export interface PasswordCredentials {
  email: string;
  password: string;
  rememberMe?: boolean | undefined;
}

export interface SignUpCredentials {
  email: string;
  password: string;
  name?: string | undefined;
  confirmPassword?: string | undefined;
  [key: string]: unknown;
}

export interface ResetPasswordParams {
  token: string;
  newPassword: string;
}

export interface VerifyOtpParams {
  email?: string | undefined;
  code: string;
  type?: 'email' | 'sms' | 'totp' | undefined;
}

export type OAuthProvider = 'google' | 'linkedin' | 'github' | 'apple' | 'microsoft' | (string & {});

export interface OAuthOptions {
  redirectUrl?: string | undefined;
  mode?: 'redirect' | 'popup' | undefined;
  scopes?: string[] | undefined;
  state?: string | undefined;
  codeVerifier?: string | undefined;
  codeChallenge?: string | undefined;
  codeChallengeMethod?: 'S256' | 'plain' | undefined;
}

export type OAuthSignInOptions = OAuthOptions;

export class AuthError extends Error {
  public readonly code: string;
  public readonly status: number;
  public readonly originalError?: unknown;

  constructor(
    message: string,
    code: string = 'INVALID_TOKEN',
    status: number = 401,
    options?: { cause?: unknown }
  ) {
    super(message, options);
    this.name = 'AuthError';
    this.code = code;
    this.status = status;
    this.originalError = options?.cause;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * The pluggable backend adapter interface.
 * Consumers implement this interface to connect to any backend
 * (Supabase, Firebase, Node/Express, Django, Go, AWS Cognito, custom REST/GraphQL).
 */
export interface AuthAdapter<TUser = AuthUser> {
  /** Sign in with email and password */
  signInWithPassword(credentials: PasswordCredentials): Promise<AuthSession<TUser>>;

  /** Sign up / Register a new user */
  signUpWithPassword?(credentials: SignUpCredentials): Promise<AuthSession<TUser>>;

  /** Sign out and invalidate session on server */
  signOut(): Promise<void>;

  /** Refresh the current access token */
  refreshToken?(currentToken?: string, signal?: AbortSignal): Promise<AuthSession<TUser> | null>;

  /** Initiate or execute 3rd-party OAuth login */
  signInWithOAuth?(provider: OAuthProvider, options?: OAuthOptions): Promise<void | AuthSession<TUser>>;

  /** Request password reset email */
  requestPasswordReset?(email: string): Promise<void>;

  /** Reset password using a reset token */
  resetPassword?(params: ResetPasswordParams): Promise<void>;

  /** Verify OTP / 2FA code */
  verifyOtp?(params: VerifyOtpParams): Promise<AuthSession<TUser>>;

  /** Restore session from backend on application boot */
  getSession?(): Promise<AuthSession<TUser> | null>;
}
