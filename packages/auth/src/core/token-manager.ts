import type { AuthAdapter, AuthSession, AuthUser } from '../types/adapter';
import type { TokenManagerOptions, TokenStorage } from '../types/tokens';

/**
 * Concurrency-safe Token Lifecycle Manager.
 *
 * Guarantees:
 * 1. Proactive silent refresh before token expiry with 32-bit integer overflow protection.
 * 2. Deduplicated refresh requests (single in-flight Promise mutex shared by proactive & caller requests).
 * 3. Session resurrection prevention via AbortController on signOut / destroy.
 * 4. Memory primary with verified storage read/write/eviction hygiene.
 * 5. SSR and client-side safe execution.
 */
export class TokenManager<TUser = AuthUser> {
  private currentSession: AuthSession<TUser> | null = null;
  private refreshPromise: Promise<string | null> | null = null;
  private refreshTimer: ReturnType<typeof setTimeout> | null = null;
  private abortController: AbortController | null = null;
  private isLoggedOut = false;
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

    this.checkInitialStorage();
  }

  /**
   * Check storage on initialization to avoid write-only storage leaks.
   */
  private checkInitialStorage(): void {
    if (!this.storage) return;

    try {
      const storedAccessToken = this.storage.getItem(this.tokenKey);
      const storedRefreshToken = this.storage.getItem(this.refreshKey);

      const applyStoredTokens = (
        accessToken: string | null,
        refreshToken: string | null
      ) => {
        if (!this.currentSession && (accessToken || refreshToken)) {
          this.currentSession = {
            user: {} as TUser,
            accessToken: accessToken ?? '',
            refreshToken: refreshToken ?? undefined,
            expiresAt: 0,
          };
        }
      };

      if (
        storedAccessToken &&
        typeof (storedAccessToken as Promise<string | null>).then === 'function'
      ) {
        Promise.all([
          storedAccessToken as Promise<string | null>,
          storedRefreshToken as Promise<string | null>,
        ])
          .then(([access, refresh]) => {
            applyStoredTokens(access, refresh);
          })
          .catch(() => {});
      } else {
        applyStoredTokens(
          storedAccessToken as string | null,
          storedRefreshToken as string | null
        );
      }
    } catch {
      // Storage read errors handled gracefully
    }
  }

  /**
   * Set or update active session.
   * Schedules proactive background refresh if expiresAt is provided.
   */
  public setSession(session: AuthSession<TUser> | null): void {
    this.clearTimer();

    if (!session) {
      this.abortInFlightRefresh();
      this.currentSession = null;
      this.clearStoredTokens();
      return;
    }

    this.isLoggedOut = false;
    this.currentSession = session;
    this.persistTokens(session);
    this.scheduleProactiveRefresh(session);
  }

  /**
   * Return current session snapshot.
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
   * Concurrent callers and background timers share a single in-flight Promise mutex.
   */
  public async getValidToken(): Promise<string | null> {
    if (this.isTokenValid()) {
      return this.currentSession?.accessToken ?? null;
    }

    if (this.isLoggedOut || (!this.currentSession && !this.storage)) {
      return null;
    }

    return this.executeRefresh();
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
   * Deduplicates concurrent refresh requests using an in-flight Promise mutex.
   */
  public async executeRefresh(): Promise<string | null> {
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = this.performRefresh().finally(() => {
      this.refreshPromise = null;
    });

    return this.refreshPromise;
  }

  private async performRefresh(): Promise<string | null> {
    if (!this.adapter.refreshToken) {
      return this.currentSession?.accessToken ?? null;
    }

    const abortController = new AbortController();
    this.abortController = abortController;
    const { signal } = abortController;

    try {
      const currentRefreshToken = this.currentSession?.refreshToken;
      const newSession = await this.adapter.refreshToken(currentRefreshToken, signal);

      if (signal.aborted || this.isLoggedOut) {
        return null;
      }

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
      if (signal.aborted || this.isLoggedOut) {
        return null;
      }
      this.setSession(null);
      this.options.onSessionExpired?.(
        err instanceof Error ? err : new Error(String(err), { cause: err })
      );
      return null;
    } finally {
      if (this.abortController === abortController) {
        this.abortController = null;
      }
    }
  }

  /**
   * Schedule automatic silent refresh before expiration.
   * Clamps delay to 32-bit signed integer max (2147483647 ms) to avoid timer overflow.
   */
  private scheduleProactiveRefresh(session: AuthSession<TUser>): void {
    if (typeof session.expiresAt !== 'number' || typeof window === 'undefined') {
      return;
    }

    const msUntilRefresh = Math.max(0, session.expiresAt - Date.now() - this.refreshThresholdMs);
    const safeDelay = Math.min(msUntilRefresh, 2147483647);

    this.refreshTimer = setTimeout(() => {
      if (this.refreshPromise) {
        this.refreshPromise.catch(() => {});
      } else {
        this.executeRefresh().catch(() => {});
      }
    }, safeDelay);
  }

  private clearTimer(): void {
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
      this.refreshTimer = null;
    }
  }

  private abortInFlightRefresh(): void {
    if (this.abortController) {
      this.abortController.abort();
      this.abortController = null;
    }
    this.refreshPromise = null;
  }

  /**
   * Terminate active session and abort any pending refresh operations.
   */
  public signOut(): void {
    this.isLoggedOut = true;
    this.abortInFlightRefresh();
    this.setSession(null);
  }

  /**
   * Retrieve tokens currently stored in persistence storage.
   */
  public async getStoredTokens(): Promise<{
    accessToken: string | null;
    refreshToken: string | null;
  } | null> {
    if (!this.storage) return null;
    try {
      const accessToken = await this.storage.getItem(this.tokenKey);
      const refreshToken = await this.storage.getItem(this.refreshKey);
      return { accessToken, refreshToken };
    } catch {
      return null;
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
   * Teardown timer, abort in-flight refresh, and clear references.
   */
  public destroy(): void {
    this.isLoggedOut = true;
    this.abortInFlightRefresh();
    this.clearTimer();
    this.currentSession = null;
    this.refreshPromise = null;
  }
}
