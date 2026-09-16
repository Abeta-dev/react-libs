import type { AuthAdapter, AuthSession, AuthUser } from '../types/adapter';
import type { TokenManagerOptions, TokenStorage } from '../types/tokens';

/**
 * Concurrency-safe Token Lifecycle Manager.
 *
 * Guarantees:
 * 1. Proactive silent refresh before token expiry.
 * 2. Deduplicated refresh requests (single in-flight Promise mutex).
 * 3. Memory or custom storage persistence.
 * 4. SSR and client-side safe execution.
 */
export class TokenManager<TUser = AuthUser> {
  private currentSession: AuthSession<TUser> | null = null;
  private refreshPromise: Promise<string | null> | null = null;
  private refreshTimer: ReturnType<typeof setTimeout> | null = null;
  private readonly refreshThresholdMs: number;
  private readonly storage: TokenStorage | null;
  private readonly tokenKey: string;
  private readonly refreshKey: string;

  constructor(
    private readonly adapter: AuthAdapter<TUser>,
    private readonly options: TokenManagerOptions = {}
  ) {
    this.refreshThresholdMs = options.refreshThresholdMs ?? 60_000;
    this.storage = options.storage ?? null;
    this.tokenKey = options.tokenStorageKey ?? 'abeta_access_token';
    this.refreshKey = options.refreshTokenStorageKey ?? 'abeta_refresh_token';
  }

  /**
   * Set or update active session.
   * Schedules proactive background refresh if expiresAt is provided.
   */
  public setSession(session: AuthSession<TUser> | null): void {
    this.currentSession = session;
    this.clearTimer();

    if (!session) {
      this.clearStoredTokens();
      return;
    }

    this.persistTokens(session);
    this.scheduleProactiveRefresh(session);
  }

  /**
   * Retrieve active session synchronously (in-memory).
   */
  public getSession(): AuthSession<TUser> | null {
    return this.currentSession;
  }

  /**
   * Check if current access token is valid and not within the refresh window.
   */
  public isTokenValid(): boolean {
    if (!this.currentSession?.accessToken) {
      return false;
    }

    if (typeof this.currentSession.expiresAt === 'number') {
      const remainingMs = this.currentSession.expiresAt - Date.now();
      return remainingMs > this.refreshThresholdMs;
    }

    // If no expiresAt specified, assume token is valid
    return true;
  }

  /**
   * Obtain a guaranteed valid access token.
   * If current token is expired or close to expiry, safely executes a refresh.
   * Concurrent callers share a single in-flight Promise mutex.
   */
  public async getValidToken(): Promise<string | null> {
    if (this.isTokenValid()) {
      return this.currentSession?.accessToken ?? null;
    }

    // Deduplicate concurrent refresh requests
    if (!this.refreshPromise) {
      this.refreshPromise = this.executeRefresh().finally(() => {
        this.refreshPromise = null;
      });
    }

    return this.refreshPromise;
  }

  /**
   * Generates a token provider callback suitable for passing to API clients
   * and BlobStorageClient.
   */
  public getTokenProvider(): () => Promise<string | null> {
    return () => this.getValidToken();
  }

  /**
   * Execute token refresh via adapter.
   */
  public async executeRefresh(): Promise<string | null> {
    if (!this.adapter.refreshToken) {
      return this.currentSession?.accessToken ?? null;
    }

    try {
      const currentRefreshToken = this.currentSession?.refreshToken;
      const newSession = await this.adapter.refreshToken(currentRefreshToken);

      if (newSession) {
        this.setSession(newSession);
        this.options.onSessionRefreshed?.(newSession as AuthSession);
        return newSession.accessToken;
      }

      // Refresh returned null: session invalidated
      this.setSession(null);
      this.options.onSessionExpired?.(new Error('Session refresh returned empty'));
      return null;
    } catch (err) {
      this.setSession(null);
      this.options.onSessionExpired?.(err);
      return null;
    }
  }

  /**
   * Schedule automatic silent refresh before expiration.
   */
  private scheduleProactiveRefresh(session: AuthSession<TUser>): void {
    if (typeof session.expiresAt !== 'number' || typeof window === 'undefined') {
      return;
    }

    const msUntilRefresh = Math.max(0, session.expiresAt - Date.now() - this.refreshThresholdMs);

    this.refreshTimer = setTimeout(() => {
      this.executeRefresh().catch(() => {});
    }, msUntilRefresh);
  }

  private clearTimer(): void {
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
      this.refreshTimer = null;
    }
  }

  private persistTokens(session: AuthSession<TUser>): void {
    if (!this.storage) return;

    try {
      const setTokenRes = this.storage.setItem(this.tokenKey, session.accessToken);
      if (setTokenRes && typeof (setTokenRes as Promise<void>).catch === 'function') {
        (setTokenRes as Promise<void>).catch(() => {});
      }
      if (session.refreshToken) {
        const setRefreshRes = this.storage.setItem(this.refreshKey, session.refreshToken);
        if (setRefreshRes && typeof (setRefreshRes as Promise<void>).catch === 'function') {
          (setRefreshRes as Promise<void>).catch(() => {});
        }
      }
    } catch {
      // Storage errors handled gracefully
    }
  }

  private clearStoredTokens(): void {
    if (!this.storage) return;

    try {
      const rmTokenRes = this.storage.removeItem(this.tokenKey);
      if (rmTokenRes && typeof (rmTokenRes as Promise<void>).catch === 'function') {
        (rmTokenRes as Promise<void>).catch(() => {});
      }
      const rmRefreshRes = this.storage.removeItem(this.refreshKey);
      if (rmRefreshRes && typeof (rmRefreshRes as Promise<void>).catch === 'function') {
        (rmRefreshRes as Promise<void>).catch(() => {});
      }
    } catch {
      // Storage errors handled gracefully
    }
  }

  /**
   * Teardown timer and clear references.
   */
  public destroy(): void {
    this.clearTimer();
    this.currentSession = null;
    this.refreshPromise = null;
  }
}
