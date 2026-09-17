import { describe, expect, it, vi } from 'vitest';
import { AuthClient } from '../auth-client';
import { createAuthenticatedFetch } from '../authenticated-fetch';
import type { AuthClientAdapter, AuthClientSession, CsrfProvider, RefreshCoordinator } from '../../types/client';

const session = (token = 'access'): AuthClientSession => ({
  user: { id: 'user-1', email: 'user@example.test' },
  accessToken: token,
  expiresAt: Date.now() + 300_000,
});

function adapter(overrides: Partial<AuthClientAdapter> = {}): AuthClientAdapter {
  return {
    login: vi.fn().mockResolvedValue(session()), signup: vi.fn().mockResolvedValue({ status: 'activation_required', accepted: true }),
    inspectActivation: vi.fn(), completeActivation: vi.fn(), resendActivation: vi.fn(), inspectInvitation: vi.fn(), acceptInvitation: vi.fn(),
    forgotPassword: vi.fn(), inspectPasswordReset: vi.fn(), resetPassword: vi.fn(), changePassword: vi.fn(), me: vi.fn(),
    refresh: vi.fn().mockResolvedValue(session('fresh')), logout: vi.fn(), ...overrides,
  };
}

const csrf: CsrfProvider = { getToken: vi.fn().mockResolvedValue('csrf') };

describe('AuthClient', () => {
  it('deduplicates concurrent cookie refreshes', async () => {
    let resolve!: (value: AuthClientSession) => void;
    const refresh = vi.fn().mockReturnValue(new Promise<AuthClientSession>((done) => { resolve = done; }));
    const client = new AuthClient({ adapter: adapter({ refresh }), csrf });
    const results = Array.from({ length: 50 }, () => client.refresh());
    await Promise.resolve();
    await Promise.resolve();
    expect(refresh).toHaveBeenCalledTimes(1);
    resolve(session('shared'));
    expect(await Promise.all(results)).toEqual(Array(50).fill('shared'));
  });

  it('does not resurrect a session when logout wins a delayed refresh', async () => {
    let resolve!: (value: AuthClientSession) => void;
    const client = new AuthClient({ adapter: adapter({ refresh: vi.fn().mockReturnValue(new Promise<AuthClientSession>((done) => { resolve = done; })) }), csrf });
    const refreshing = client.refresh();
    await client.logout();
    resolve(session('late'));
    await refreshing;
    expect(client.getSnapshot()).toMatchObject({ status: 'unauthenticated', session: null });
  });

  it('requires login after an ambiguous refresh failure rather than replaying rotation', async () => {
    const refresh = vi.fn().mockRejectedValue(new TypeError('network lost'));
    const client = new AuthClient({ adapter: adapter({ refresh }), csrf });
    expect(await client.refresh()).toBeNull();
    expect(refresh).toHaveBeenCalledTimes(1);
    expect(client.getSnapshot().status).toBe('reauth_required');
  });

  it('invalidates this tab on a cross-tab message', async () => {
    let listener: ((message: { type: 'invalidate'; epoch: number }) => void) | undefined;
    const coordinator: RefreshCoordinator = {
      supportsCookieRefresh: true, run: async (work) => work(), publish: vi.fn(),
      subscribe: (next) => { listener = next; return () => { listener = undefined; }; },
    };
    const client = new AuthClient({ adapter: adapter(), csrf, refreshCoordinator: coordinator });
    await client.login({ email: 'user@example.test', password: 'secret' });
    listener?.({ type: 'invalidate', epoch: 50 });
    expect(client.getSnapshot()).toMatchObject({ status: 'reauth_required', session: null, epoch: 50 });
  });

  it('rejects malformed session envelopes', async () => {
    const client = new AuthClient({ adapter: adapter({ login: vi.fn().mockResolvedValue({ ...session(), expiresAt: Number.NaN }) }), csrf });
    await client.login({ email: 'user@example.test', password: 'secret' });
    expect(client.getSnapshot().status).toBe('reauth_required');
  });

  it('retries an eligible protected request once after refresh', async () => {
    const client = new AuthClient({ adapter: adapter(), csrf });
    await client.login({ email: 'user@example.test', password: 'secret' });
    const fetchImpl = vi.fn().mockResolvedValueOnce(new Response('', { status: 401 })).mockResolvedValueOnce(new Response('ok'));
    const authFetch = createAuthenticatedFetch(client, 'https://api.example.test', fetchImpl);
    const response = await authFetch.fetch('/private', { replay: () => ({}), isAccessExpired: (item) => item.status === 401 });
    expect(response.status).toBe(200);
    expect(fetchImpl).toHaveBeenCalledTimes(2);
  });
});
