import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { TokenManager } from '../token-manager';
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

  it('deduplicates concurrent refresh requests using a single in-flight mutex promise', async () => {
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

    // Fire 5 concurrent getValidToken requests simultaneously
    const promise1 = manager.getValidToken();
    const promise2 = manager.getValidToken();
    const promise3 = manager.getValidToken();
    const promise4 = manager.getValidToken();
    const promise5 = manager.getValidToken();

    // Adapter refreshToken should be called exactly once
    expect(mockAdapter.refreshToken).toHaveBeenCalledTimes(1);

    // Resolve the delayed token refresh
    resolver!({
      user: { id: 'usr_1', email: 'test@example.com' },
      accessToken: 'access_tok_shared_fresh',
      expiresAt: Date.now() + 300_000,
    });

    const [t1, t2, t3, t4, t5] = await Promise.all([
      promise1,
      promise2,
      promise3,
      promise4,
      promise5,
    ]);

    expect(t1).toBe('access_tok_shared_fresh');
    expect(t2).toBe('access_tok_shared_fresh');
    expect(t3).toBe('access_tok_shared_fresh');
    expect(t4).toBe('access_tok_shared_fresh');
    expect(t5).toBe('access_tok_shared_fresh');

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

  it('handles token storage integration safely', () => {
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

    const manager = new TokenManager(mockAdapter, { storage: mockStorage });
    manager.setSession(initialSession);

    expect(mockStorage.setItem).toHaveBeenCalledWith('abeta_access_token', 'access_tok_initial');
    expect(mockStorage.setItem).toHaveBeenCalledWith('abeta_refresh_token', 'refresh_tok_initial');

    manager.setSession(null);
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
