import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { TokenManager } from '../token-manager';
import { MockAuthAdapter, DEFAULT_MOCK_PASSWORD } from '../mock-adapter';
import { AuthError } from '../../types/adapter';
import type { AuthAdapter, AuthSession, AuthUser } from '../../types/adapter';
import type { TokenStorage } from '../../types/tokens';

describe('TokenManager', () => {
  let mockAdapter: AuthAdapter<AuthUser>;
  let initialSession: AuthSession<AuthUser>;

  beforeEach(() => {
    vi.useFakeTimers();
    initialSession = {
      user: { id: 'usr_1', email: 'test@example.com' },
      accessToken: 'access_tok_initial',
      refreshToken: 'refresh_tok_initial',
      expiresAt: Date.now() + 120_000, // Expires in 2 minutes
    };

    mockAdapter = {
      signInWithPassword: vi.fn(),
      signOut: vi.fn(),
      refreshToken: vi.fn().mockImplementation(async (token?: string) => {
        return {
          user: { id: 'usr_1', email: 'test@example.com' },
          accessToken: 'access_tok_refreshed',
          refreshToken: token ? `${token}_rotated` : 'refresh_tok_new',
          expiresAt: Date.now() + 300_000,
        };
      }),
    };
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it('returns valid token immediately if not expiring soon', async () => {
    const manager = new TokenManager(mockAdapter, { refreshThresholdMs: 60_000 });
    manager.setSession(initialSession);

    expect(manager.isTokenValid()).toBe(true);
    const token = await manager.getValidToken();

    expect(token).toBe('access_tok_initial');
    expect(mockAdapter.refreshToken).not.toHaveBeenCalled();
    manager.destroy();
  });

  it('deduplicates 50 concurrent refresh requests using a single in-flight mutex promise', async () => {
    // Session that is already expired
    const expiredSession: AuthSession<AuthUser> = {
      ...initialSession,
      expiresAt: Date.now() - 1000,
    };

    let resolver: (session: AuthSession<AuthUser>) => void;
    const delayedPromise = new Promise<AuthSession<AuthUser>>((resolve) => {
      resolver = resolve;
    });

    mockAdapter.refreshToken = vi.fn().mockReturnValue(delayedPromise);

    const manager = new TokenManager(mockAdapter);
    manager.setSession(expiredSession);

    expect(manager.isTokenValid()).toBe(false);

    // Fire 50 concurrent getValidToken requests simultaneously
    const promises = Array.from({ length: 50 }, () => manager.getValidToken());

    // Adapter refreshToken should be called exactly once
    expect(mockAdapter.refreshToken).toHaveBeenCalledTimes(1);

    // Resolve the delayed token refresh
    resolver!({
      user: { id: 'usr_1', email: 'test@example.com' },
      accessToken: 'access_tok_shared_fresh',
      expiresAt: Date.now() + 300_000,
    });

    const tokens = await Promise.all(promises);

    expect(tokens).toHaveLength(50);
    tokens.forEach((t) => expect(t).toBe('access_tok_shared_fresh'));
    expect(mockAdapter.refreshToken).toHaveBeenCalledTimes(1);
    manager.destroy();
  });

  it('triggers proactive background refresh before expiration', async () => {
    const onSessionRefreshed = vi.fn();
    const manager = new TokenManager(mockAdapter, {
      refreshThresholdMs: 30_000, // 30s before expiry
      onSessionRefreshed,
    });

    // Expires in 60s
    manager.setSession({
      ...initialSession,
      expiresAt: Date.now() + 60_000,
    });

    expect(mockAdapter.refreshToken).not.toHaveBeenCalled();

    // Advance timers by 30 seconds (60s - 30s threshold = 30s until proactive refresh)
    await vi.advanceTimersByTimeAsync(30_001);

    expect(mockAdapter.refreshToken).toHaveBeenCalledTimes(1);
    expect(onSessionRefreshed).toHaveBeenCalledTimes(1);
    expect(manager.getSession()?.accessToken).toBe('access_tok_refreshed');

    manager.destroy();
  });

  it('ensures proactive background refresh shares mutex with concurrent getValidToken', async () => {
    let resolver: (session: AuthSession<AuthUser>) => void;
    const delayedPromise = new Promise<AuthSession<AuthUser>>((resolve) => {
      resolver = resolve;
    });

    mockAdapter.refreshToken = vi.fn().mockReturnValue(delayedPromise);

    const manager = new TokenManager(mockAdapter, {
      refreshThresholdMs: 30_000,
    });

    manager.setSession({
      ...initialSession,
      expiresAt: Date.now() + 60_000,
    });

    // Advance to trigger proactive refresh
    await vi.advanceTimersByTimeAsync(30_001);
    expect(mockAdapter.refreshToken).toHaveBeenCalledTimes(1);

    // At the exact same time, a consumer calls getValidToken()
    const concurrentCall = manager.getValidToken();

    // Still only called once because background refresh and caller share refreshPromise
    expect(mockAdapter.refreshToken).toHaveBeenCalledTimes(1);

    resolver!({
      user: { id: 'usr_1', email: 'test@example.com' },
      accessToken: 'access_tok_mutex_shared',
      expiresAt: Date.now() + 300_000,
    });

    const token = await concurrentCall;
    expect(token).toBe('access_tok_mutex_shared');
    expect(mockAdapter.refreshToken).toHaveBeenCalledTimes(1);

    manager.destroy();
  });

  it('prevents session resurrection on destroy() while refresh is in flight', async () => {
    let resolver: (session: AuthSession<AuthUser>) => void;
    const delayedPromise = new Promise<AuthSession<AuthUser>>((resolve) => {
      resolver = resolve;
    });

    mockAdapter.refreshToken = vi.fn().mockReturnValue(delayedPromise);
    const onSessionRefreshed = vi.fn();

    const manager = new TokenManager(mockAdapter, { onSessionRefreshed });
    manager.setSession({
      ...initialSession,
      expiresAt: Date.now() - 1000,
    });

    // Start in-flight refresh
    const refreshOp = manager.getValidToken();

    // User navigates away / unmounts calling destroy()
    manager.destroy();
    expect(manager.getSession()).toBeNull();

    // Slow network refresh resolves AFTER destroy
    resolver!({
      user: { id: 'usr_1', email: 'test@example.com' },
      accessToken: 'access_tok_resurrected_should_be_ignored',
      expiresAt: Date.now() + 300_000,
    });

    await refreshOp;

    // Session must NOT be resurrected
    expect(manager.getSession()).toBeNull();
    expect(onSessionRefreshed).not.toHaveBeenCalled();
  });

  it('prevents session resurrection on signOut() while refresh is in flight', async () => {
    let resolver: (session: AuthSession<AuthUser>) => void;
    const delayedPromise = new Promise<AuthSession<AuthUser>>((resolve) => {
      resolver = resolve;
    });

    mockAdapter.refreshToken = vi.fn().mockReturnValue(delayedPromise);
    const onSessionRefreshed = vi.fn();

    const storageMap = new Map<string, string>();
    const mockStorage: TokenStorage = {
      getItem: vi.fn((k: string) => storageMap.get(k) ?? null),
      setItem: vi.fn((k: string, v: string) => {
        storageMap.set(k, v);
      }),
      removeItem: vi.fn((k: string) => {
        storageMap.delete(k);
      }),
    };

    const manager = new TokenManager(mockAdapter, {
      storage: mockStorage,
      onSessionRefreshed,
    });

    manager.setSession({
      ...initialSession,
      expiresAt: Date.now() - 1000,
    });

    // In-flight refresh begins
    const refreshOp = manager.getValidToken();

    // User logs out while refresh is in flight
    manager.signOut();
    expect(manager.getSession()).toBeNull();
    expect(storageMap.size).toBe(0);

    // Refresh resolves after logout
    resolver!({
      user: { id: 'usr_1', email: 'test@example.com' },
      accessToken: 'access_tok_should_not_save',
      refreshToken: 'refresh_tok_should_not_save',
      expiresAt: Date.now() + 300_000,
    });

    await refreshOp;

    // Session remains null and storage remains empty
    expect(manager.getSession()).toBeNull();
    expect(storageMap.size).toBe(0);
    expect(onSessionRefreshed).not.toHaveBeenCalled();

    manager.destroy();
  });

  it('clamps proactive refresh delay to 32-bit integer maximum', () => {
    const setTimeoutSpy = vi.spyOn(globalThis, 'setTimeout');

    const manager = new TokenManager(mockAdapter);
    // Expiration far into the future (> 2147483647 ms)
    const farFuture = Date.now() + 3_000_000_000;

    manager.setSession({
      ...initialSession,
      expiresAt: farFuture,
    });

    expect(setTimeoutSpy).toHaveBeenCalled();
    const delayArg = setTimeoutSpy.mock.calls[0]?.[1];
    expect(delayArg).toBeLessThanOrEqual(2147483647);
    expect(delayArg).toBe(2147483647);

    manager.destroy();
    setTimeoutSpy.mockRestore();
  });

  it('handles token storage integration and lifecycle safely', async () => {
    const storageMap = new Map<string, string>();
    const mockStorage: TokenStorage = {
      getItem: vi.fn((k: string) => storageMap.get(k) ?? null),
      setItem: vi.fn((k: string, v: string) => {
        storageMap.set(k, v);
      }),
      removeItem: vi.fn((k: string) => {
        storageMap.delete(k);
      }),
    };

    // Pre-populate storage to verify reading on initialization (avoid write-only storage leak)
    storageMap.set('abeta_access_token', 'stored_access_token');
    storageMap.set('abeta_refresh_token', 'stored_refresh_token');

    const manager = new TokenManager(mockAdapter, { storage: mockStorage });

    // Verify read occurred on initialization
    expect(mockStorage.getItem).toHaveBeenCalledWith('abeta_access_token');
    expect(mockStorage.getItem).toHaveBeenCalledWith('abeta_refresh_token');

    const stored = await manager.getStoredTokens();
    expect(stored?.accessToken).toBe('stored_access_token');
    expect(stored?.refreshToken).toBe('stored_refresh_token');

    // Update session (write)
    manager.setSession(initialSession);
    expect(mockStorage.setItem).toHaveBeenCalledWith('abeta_access_token', 'access_tok_initial');
    expect(mockStorage.setItem).toHaveBeenCalledWith('abeta_refresh_token', 'refresh_tok_initial');

    // Evict on sign out
    manager.signOut();
    expect(mockStorage.removeItem).toHaveBeenCalledWith('abeta_access_token');
    expect(mockStorage.removeItem).toHaveBeenCalledWith('abeta_refresh_token');

    manager.destroy();
  });

  it('handles refresh failure and triggers onSessionExpired', async () => {
    const onSessionExpired = vi.fn();
    mockAdapter.refreshToken = vi.fn().mockRejectedValue(new Error('Network error'));

    const manager = new TokenManager(mockAdapter, { onSessionExpired });
    manager.setSession({
      ...initialSession,
      expiresAt: Date.now() - 5000,
    });

    const token = await manager.getValidToken();

    expect(token).toBeNull();
    expect(onSessionExpired).toHaveBeenCalledTimes(1);
    expect(manager.getSession()).toBeNull();

    manager.destroy();
  });
});

describe('MockAuthAdapter Security & Integrity', () => {
  it('rejects invalid refresh tokens with AuthError and never falls back to admin user', async () => {
    const adapter = new MockAuthAdapter({ latencyMs: 0 });

    // Attack 1: Request refresh with arbitrary unissued token
    await expect(adapter.refreshToken('malicious_crafted_token')).rejects.toThrow(
      'Invalid refresh token'
    );
    await expect(adapter.refreshToken('malicious_crafted_token')).rejects.toBeInstanceOf(AuthError);

    // Attack 2: Request refresh with no session and no token
    await expect(adapter.refreshToken()).rejects.toThrow('Invalid refresh token');

    // Sign in legitimate user
    const session = await adapter.signInWithPassword({
      email: 'alex@example.com',
      password: DEFAULT_MOCK_PASSWORD,
    });

    expect(session.user.id).toBe('usr_demo_123');
    const validRefreshToken = session.refreshToken!;

    // Legitimate refresh succeeds
    const refreshed = await adapter.refreshToken(validRefreshToken);
    expect(refreshed).not.toBeNull();
    expect(refreshed?.accessToken).toContain('mock_jwt_access_');

    // Attack 3: Refresh Token Rotation - Reusing old rotated token must reject
    await expect(adapter.refreshToken(validRefreshToken)).rejects.toThrow(
      'Invalid refresh token'
    );
  });
});
