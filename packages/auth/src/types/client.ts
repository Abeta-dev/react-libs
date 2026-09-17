import type { AuthSession, AuthUser, PasswordCredentials, ResetPasswordParams, SignUpCredentials } from './adapter';

/** Versioned contract for the cookie-backed, one-backend client. */
export interface AuthClientSession<TUser = AuthUser> extends Omit<AuthSession<TUser>, 'expiresAt' | 'refreshToken'> {
  /** Required absolute access-token expiry in milliseconds. */
  expiresAt: number;
  /** The backend session identifier is display/debug metadata, never a credential. */
  sessionId?: string | undefined;
}

export type AuthClientStatus =
  | 'restoring'
  | 'unauthenticated'
  | 'authenticated'
  | 'refreshing'
  | 'reauth_required';

export interface AuthClientSnapshot<TUser = AuthUser> {
  readonly status: AuthClientStatus;
  readonly session: AuthClientSession<TUser> | null;
  readonly epoch: number;
  readonly error: AuthClientError | null;
}

export interface CsrfProvider {
  getToken(signal?: AbortSignal): Promise<string>;
}

export interface CapabilityDescriptor {
  supported: boolean;
  reason?: string | undefined;
}

/** Unsupported methods are not callable: applications must inspect capabilities first. */
export interface AuthCapabilities {
  oauth?: CapabilityDescriptor | undefined;
  otp?: CapabilityDescriptor | undefined;
}

export interface PendingActivation {
  status: 'activation_required';
  accepted: true;
}

export interface ActivationInspection {
  status: 'valid' | 'expired' | 'used' | 'invalid';
  context?: Record<string, unknown> | undefined;
}

export interface InvitationInspection {
  status: 'valid' | 'expired' | 'used' | 'invalid';
  requiresLogin: boolean;
  context?: Record<string, unknown> | undefined;
}

export interface InvitationAccepted {
  accepted: true;
  membership?: Record<string, unknown> | undefined;
}

export interface AuthClientAdapter<TUser = AuthUser> {
  login(credentials: PasswordCredentials, context: AuthRequestContext): Promise<AuthClientSession<TUser>>;
  signup(credentials: SignUpCredentials, context: AuthRequestContext): Promise<PendingActivation>;
  inspectActivation(token: string, context: AuthRequestContext): Promise<ActivationInspection>;
  completeActivation(params: ResetPasswordParams, context: AuthRequestContext): Promise<void>;
  resendActivation(identifier: string, context: AuthRequestContext): Promise<PendingActivation>;
  inspectInvitation(token: string, context: AuthRequestContext): Promise<InvitationInspection>;
  acceptInvitation(token: string, context: AuthRequestContext): Promise<InvitationAccepted>;
  forgotPassword(identifier: string, context: AuthRequestContext): Promise<void>;
  inspectPasswordReset(token: string, context: AuthRequestContext): Promise<ActivationInspection>;
  resetPassword(params: ResetPasswordParams, context: AuthRequestContext): Promise<void>;
  changePassword(params: { currentPassword: string; newPassword: string }, context: AuthRequestContext): Promise<void>;
  me(context: AuthRequestContext): Promise<TUser>;
  /** Cookie-only rotation; a refresh secret must never be passed or returned here. */
  refresh(context: AuthRequestContext): Promise<AuthClientSession<TUser> | null>;
  logout(context: AuthRequestContext): Promise<void>;
  revokeAll?(context: AuthRequestContext): Promise<void>;
  getCapabilities?(): Promise<AuthCapabilities>;
}

export interface AuthRequestContext {
  csrfToken: string;
  signal?: AbortSignal | undefined;
}

export interface AccessSessionPersistence<TUser = AuthUser> {
  load(): Promise<AuthClientSession<TUser> | null>;
  save(session: AuthClientSession<TUser>): Promise<void>;
  clear(): Promise<void>;
}

export interface RefreshCoordinator {
  /** Serializes cookie-mutating work. A coordinator without cross-tab support must return false. */
  readonly supportsCookieRefresh: boolean;
  run<T>(work: () => Promise<T>): Promise<T>;
  publish(message: AuthCoordinationMessage): void;
  subscribe(listener: (message: AuthCoordinationMessage) => void): () => void;
  close?(): void;
}

export interface AuthCoordinationMessage {
  type: 'invalidate';
  epoch: number;
}

export interface AuthClientOptions<TUser = AuthUser> {
  adapter: AuthClientAdapter<TUser>;
  csrf: CsrfProvider;
  refreshCoordinator?: RefreshCoordinator | undefined;
  /** Disabled by default. Cookie refresh credentials are never persisted by this package. */
  persistence?: AccessSessionPersistence<TUser> | undefined;
  now?: (() => number) | undefined;
  refreshThresholdMs?: number | undefined;
}

export class AuthClientError extends Error {
  constructor(
    message: string,
    public readonly code: string = 'AUTH_FAILED',
    public readonly status: number = 0,
    options?: { cause?: unknown }
  ) {
    super(message, options);
    this.name = 'AuthClientError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
