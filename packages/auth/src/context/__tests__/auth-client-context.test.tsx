import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AuthClient } from '../../core/auth-client';
import { AuthClientProvider, useAuthClientSnapshot } from '../auth-client-context';
import type { AuthClientAdapter, CsrfProvider } from '../../types/client';

const csrf: CsrfProvider = { getToken: vi.fn().mockResolvedValue('csrf') };
const adapter: AuthClientAdapter = {
  login: vi.fn(), signup: vi.fn(), inspectActivation: vi.fn(), completeActivation: vi.fn(), resendActivation: vi.fn(),
  inspectInvitation: vi.fn(), acceptInvitation: vi.fn(), forgotPassword: vi.fn(), inspectPasswordReset: vi.fn(),
  resetPassword: vi.fn(), changePassword: vi.fn(), me: vi.fn(), refresh: vi.fn().mockResolvedValue(null), logout: vi.fn(),
};

function Snapshot() {
  const value = useAuthClientSnapshot();
  return <output>{value.status}</output>;
}

describe('AuthClientProvider', () => {
  it('does not destroy a caller-owned client across StrictMode remounts', () => {
    const client = new AuthClient({ adapter, csrf });
    render(<React.StrictMode><AuthClientProvider client={client}><Snapshot /></AuthClientProvider></React.StrictMode>);
    expect(screen.getByText('restoring')).toBeTruthy();
    expect(client.getSnapshot().status).toBe('restoring');
  });
});
