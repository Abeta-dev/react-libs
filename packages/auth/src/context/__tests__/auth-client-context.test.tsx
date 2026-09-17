import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import { AuthClient } from '../../core/auth-client';
import { AuthClientProvider, useAuthClientSnapshot } from '../auth-client-context';
import type { AuthClientAdapter, AuthClientSession, CsrfProvider } from '../../types/client';

const csrf: CsrfProvider = { getToken: vi.fn().mockResolvedValue('csrf') };
const session = (): AuthClientSession => ({ user: { id: 'user-1', email: 'user@example.test' }, accessToken: 'access', expiresAt: Date.now() + 300_000 });
function adapter(overrides: Partial<AuthClientAdapter> = {}): AuthClientAdapter {
  return {
    login: vi.fn().mockResolvedValue(session()), signup: vi.fn(), inspectActivation: vi.fn(), completeActivation: vi.fn(), resendActivation: vi.fn(),
    inspectInvitation: vi.fn(), acceptInvitation: vi.fn(), forgotPassword: vi.fn(), inspectPasswordReset: vi.fn(),
    resetPassword: vi.fn(), changePassword: vi.fn(), me: vi.fn(), refresh: vi.fn().mockResolvedValue(null), logout: vi.fn(), ...overrides,
  };
}

function Snapshot() {
  const value = useAuthClientSnapshot();
  return <output>{value.status}:{value.session?.user.id ?? 'none'}</output>;
}

describe('AuthClientProvider', () => {
  it('does not destroy a caller-owned client across StrictMode remounts', () => {
    const client = new AuthClient({ adapter: adapter(), csrf });
    render(<React.StrictMode><AuthClientProvider client={client}><Snapshot /></AuthClientProvider></React.StrictMode>);
    expect(screen.getByText('restoring:none')).toBeTruthy();
    expect(client.getSnapshot().status).toBe('restoring');
  });

  it('rerenders DOM snapshots for login and logout transitions', async () => {
    const client = new AuthClient({ adapter: adapter(), csrf });
    render(<AuthClientProvider client={client}><Snapshot /></AuthClientProvider>);
    await act(() => client.login({ email: 'user@example.test', password: 'secret' }));
    expect(screen.getByText('authenticated:user-1')).toBeTruthy();
    await act(() => client.logout());
    expect(screen.getByText('unauthenticated:none')).toBeTruthy();
  });
});
