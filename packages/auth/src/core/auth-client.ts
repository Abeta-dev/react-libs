import type { AuthUser, PasswordCredentials, ResetPasswordParams, SignUpCredentials } from '../types/adapter';
import {
  AuthClientError,
  type ActivationInspection,
  type AuthCapabilities,
  type AuthClientOptions,
  type AuthClientSession,
  type AuthClientSnapshot,
  type AuthClientStatus,
  type InvitationAccepted,
  type InvitationInspection,
  type PendingActivation,
} from '../types/client';

const initialSnapshot = <TUser>(): AuthClientSnapshot<TUser> => Object.freeze({
  status: 'restoring',
  session: null,
  epoch: 0,
  error: null,
});

/**
 * Headless, backend-neutral owner of an in-memory access session.
 * Refresh is cookie-backed, deduplicated, and guarded by epochs so old work can
 * never restore a session after logout, account replacement, or cross-tab invalidation.
 */
export class AuthClient<TUser = AuthUser> {
  private snapshot: AuthClientSnapshot<TUser> = initialSnapshot<TUser>();
  private readonly listeners = new Set<() => void>();
  private refreshFlight: Promise<string | null> | null = null;
  private destroyController = new AbortController();
  private destroyed = false;
  private refreshTimer: ReturnType<typeof setTimeout> | null = null;
  private readonly now: () => number;
  private readonly refreshThresholdMs: number;
  private unsubscribeCoordination: (() => void) | null = null;

  constructor(private readonly options: AuthClientOptions<TUser>) {
    this.now = options.now ?? Date.now;
    this.refreshThresholdMs = options.refreshThresholdMs ?? 60_000;
    if (options.refreshCoordinator) {
      this.unsubscribeCoordination = options.refreshCoordinator.subscribe((message) => {
        if (message.type === 'invalidate') this.invalidateFromAnotherTab(message.epoch);
      });
    }
  }

  getSnapshot = (): AuthClientSnapshot<TUser> => this.snapshot;

  subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  async bootstrap(): Promise<AuthClientSnapshot<TUser>> {
    const epoch = this.begin('restoring');
    const restored = await this.options.persistence?.load().catch(() => null);
    if (restored && this.isCurrent(epoch) && restored.expiresAt > this.now()) {
      this.install(restored, epoch);
    } else if (restored) {
      this.ignorePersistence(this.options.persistence?.clear());
    }

    const token = await this.refresh({ epoch });
    if (!this.isCurrent(epoch)) return this.snapshot;
    if (!token && this.snapshot.status === 'restoring') {
      this.replace({ status: 'unauthenticated', session: null, epoch, error: null });
    }
    return this.snapshot;
  }

  async login(credentials: PasswordCredentials): Promise<AuthClientSession<TUser>> {
    const epoch = this.begin('restoring');
    try {
      const session = await this.withCsrf((context) => this.options.adapter.login(credentials, context));
      if (!this.isCurrent(epoch)) throw new AuthClientError('A newer authentication operation superseded this login.', 'STALE_OPERATION');
      this.install(session, epoch);
      return session;
    } catch (error) {
      if (this.isCurrent(epoch)) this.replace({ status: 'unauthenticated', session: null, epoch, error: this.normalizeError(error) });
      throw error;
    }
  }

  signup(credentials: SignUpCredentials): Promise<PendingActivation> {
    return this.withCsrf((context) => this.options.adapter.signup(credentials, context));
  }

  inspectActivation(token: string): Promise<ActivationInspection> {
    return this.withCsrf((context) => this.options.adapter.inspectActivation(token, context));
  }

  completeActivation(params: ResetPasswordParams): Promise<void> {
    return this.withCsrf((context) => this.options.adapter.completeActivation(params, context));
  }

  resendActivation(identifier: string): Promise<PendingActivation> {
    return this.withCsrf((context) => this.options.adapter.resendActivation(identifier, context));
  }

  inspectInvitation(token: string): Promise<InvitationInspection> {
    return this.withCsrf((context) => this.options.adapter.inspectInvitation(token, context));
  }

  acceptInvitation(token: string): Promise<InvitationAccepted> {
    return this.withCsrf((context) => this.options.adapter.acceptInvitation(token, context));
  }

  forgotPassword(identifier: string): Promise<void> {
    return this.withCsrf((context) => this.options.adapter.forgotPassword(identifier, context));
  }

  inspectPasswordReset(token: string): Promise<ActivationInspection> {
    return this.withCsrf((context) => this.options.adapter.inspectPasswordReset(token, context));
  }

  resetPassword(params: ResetPasswordParams): Promise<void> {
    return this.withCsrf((context) => this.options.adapter.resetPassword(params, context));
  }

  async changePassword(params: { currentPassword: string; newPassword: string }): Promise<void> {
    await this.withCsrf((context) => this.options.adapter.changePassword(params, context));
    this.invalidate('reauth_required');
  }

  me(): Promise<TUser> {
    return this.withCsrf((context) => this.options.adapter.me(context));
  }

  capabilities(): Promise<AuthCapabilities> {
    return this.options.adapter.getCapabilities?.() ?? Promise.resolve({});
  }

  async getAccessToken(): Promise<string | null> {
    if (this.snapshot.status === 'reauth_required') return null;
    const session = this.snapshot.session;
    if (session && session.expiresAt - this.now() > this.refreshThresholdMs) return session.accessToken;
    return this.refresh();
  }

  async refresh(options: { epoch?: number } = {}): Promise<string | null> {
    if (this.snapshot.status === 'reauth_required' || this.refreshFlight) return this.snapshot.status === 'reauth_required' ? null : this.refreshFlight;
    const epoch = options.epoch ?? this.snapshot.epoch;
    if (this.destroyed || !this.isCurrent(epoch)) return null;
    const coordinator = this.options.refreshCoordinator;
    if (coordinator && !coordinator.supportsCookieRefresh) {
      this.invalidate('reauth_required', epoch);
      return null;
    }

    this.refreshFlight = (async () => {
      try {
        const work = () => this.withCsrf((context) => this.options.adapter.refresh(context));
        const session = coordinator ? await coordinator.run(work) : await work();
        if (!this.isCurrent(epoch) || this.destroyed) return null;
        if (!session) {
          this.invalidate('unauthenticated', epoch);
          return null;
        }
        this.install(session, epoch);
        return this.isCurrent(epoch) && this.snapshot.session?.accessToken === session.accessToken ? session.accessToken : null;
      } catch (error) {
        if (!this.destroyed) {
          // A network loss after a rotation may have consumed a single-use generation.
          // Never retry automatically: require an explicit login in every tab.
          this.invalidate('reauth_required', epoch, error);
        }
        return null;
      }
    })();
    const flight = this.refreshFlight;
    return flight.finally(() => {
      if (this.refreshFlight === flight) this.refreshFlight = null;
    });
  }

  async logout(): Promise<void> {
    const epoch = this.begin('unauthenticated');
    this.clearLocalSession();
    this.options.refreshCoordinator?.publish({ type: 'invalidate', epoch });
    try {
      await this.withCsrf((context) => this.options.adapter.logout(context));
    } catch (error) {
      if (this.isCurrent(epoch)) this.replace({ status: 'reauth_required', session: null, epoch, error: this.normalizeError(error) });
    }
  }

  async revokeAll(): Promise<void> {
    if (!this.options.adapter.revokeAll) throw new AuthClientError('Session revocation is unsupported.', 'UNSUPPORTED_CAPABILITY');
    await this.withCsrf((context) => this.options.adapter.revokeAll!(context));
    this.invalidate('unauthenticated');
  }

  destroy(): void {
    this.destroyed = true;
    this.clearTimer();
    this.destroyController.abort();
    this.listeners.clear();
    this.unsubscribeCoordination?.();
    this.unsubscribeCoordination = null;
    this.options.refreshCoordinator?.close?.();
  }

  private async withCsrf<TResult>(operation: (context: { csrfToken: string; signal: AbortSignal }) => Promise<TResult>): Promise<TResult> {
    const signal = this.destroyController.signal;
    const csrfToken = await this.options.csrf.getToken(signal);
    if (signal.aborted) throw new AuthClientError('Auth client has been destroyed.', 'CLIENT_DESTROYED');
    return operation({ csrfToken, signal });
  }

  private install(session: AuthClientSession<TUser>, epoch: number): void {
    if (!this.isCurrent(epoch) || this.destroyed) return;
    if (!session.accessToken || !Number.isFinite(session.expiresAt) || session.expiresAt <= this.now()) {
      this.invalidate('reauth_required', epoch, new AuthClientError('The backend returned an invalid or expired session envelope.', 'MALFORMED_SESSION'));
      return;
    }
    const immutableSession = Object.freeze({ ...session, user: Object.freeze({ ...session.user }) });
    this.replace({ status: 'authenticated', session: immutableSession, epoch, error: null });
    this.ignorePersistence(this.options.persistence?.save(immutableSession));
    this.scheduleRefresh(immutableSession, epoch);
  }

  /** Invalidates only if the expected async operation still owns the current epoch. */
  private invalidate(status: 'unauthenticated' | 'reauth_required', expectedEpoch?: number, cause?: unknown): boolean {
    if (expectedEpoch !== undefined && !this.isCurrent(expectedEpoch)) return false;
    const epoch = this.snapshot.epoch + 1;
    this.clearLocalSession();
    this.replace({ status, session: null, epoch, error: cause ? this.normalizeError(cause) : null });
    this.options.refreshCoordinator?.publish({ type: 'invalidate', epoch });
    return true;
  }

  /** Remote epochs are not comparable counters: every message must invalidate locally. */
  private invalidateFromAnotherTab(remoteEpoch: number): void {
    const epoch = Math.max(this.snapshot.epoch + 1, remoteEpoch + 1);
    this.clearLocalSession();
    // Do not re-publish a received message: BroadcastChannel/storage relays can otherwise loop forever.
    this.replace({ status: 'reauth_required', session: null, epoch, error: null });
  }

  private begin(status: Extract<AuthClientStatus, 'restoring' | 'unauthenticated'>): number {
    const epoch = this.snapshot.epoch + 1;
    this.replace({ status, session: null, epoch, error: null });
    return epoch;
  }

  private clearLocalSession(): void {
    this.clearTimer();
    this.ignorePersistence(this.options.persistence?.clear());
  }

  private scheduleRefresh(session: AuthClientSession<TUser>, epoch: number): void {
    this.clearTimer();
    if (typeof window === 'undefined') return;
    const delay = Math.min(Math.max(0, session.expiresAt - this.now() - this.refreshThresholdMs), 2_147_483_647);
    this.refreshTimer = setTimeout(() => { this.ignoreRefresh(this.refresh({ epoch })); }, delay);
  }

  private ignorePersistence(operation: Promise<void> | undefined): void {
    if (!operation) return;
    operation.catch(() => {});
  }

  private ignoreRefresh(operation: Promise<string | null>): void {
    operation.catch(() => {});
  }

  private clearTimer(): void {
    if (this.refreshTimer) clearTimeout(this.refreshTimer);
    this.refreshTimer = null;
  }

  private replace(snapshot: AuthClientSnapshot<TUser>): void {
    this.snapshot = Object.freeze(snapshot);
    this.listeners.forEach((listener) => listener());
  }

  private isCurrent(epoch: number): boolean {
    return this.snapshot.epoch === epoch;
  }

  private normalizeError(error: unknown): AuthClientError {
    return error instanceof AuthClientError ? error : new AuthClientError('Authentication requires attention.', 'AUTH_FAILED', 0, { cause: error });
  }
}
