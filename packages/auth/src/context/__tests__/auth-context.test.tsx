import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import { AuthProvider } from '../auth-context';
import { useAuth, useToken, useUser } from '../hooks';
import { MockAuthAdapter } from '../../core/mock-adapter';
import type { AuthSession, AuthUser } from '../../types/adapter';

function TestConsumer() {
  const { user, status, signIn, signOut } = useAuth();
  const { isTokenValid } = useToken();
  const { isAuthenticated } = useUser();

  return (
    <div>
      <div data-testid="status">{status}</div>
      <div data-testid="auth-state">{isAuthenticated ? 'logged-in' : 'logged-out'}</div>
      <div data-testid="user-email">{user?.email ?? 'none'}</div>
      <div data-testid="token-valid">{isTokenValid ? 'yes' : 'no'}</div>
      <button
        type="button"
        onClick={() =>
          void signIn({ email: 'alex@example.com', password: 'Password123!' })
        }
      >
        Sign In Button
      </button>
      <button type="button" onClick={() => void signOut()}>
        Sign Out Button
      </button>
    </div>
  );
}

describe('AuthProvider & Hooks', () => {
  it('throws helpful error when useAuth is called outside AuthProvider', () => {
    // Suppress console.error for expected test error
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<TestConsumer />)).toThrow('useAuth must be used within an <AuthProvider>');
    spy.mockRestore();
  });

  it('renders initialSession directly in authenticated state', () => {
    const adapter = new MockAuthAdapter();
    const session: AuthSession<AuthUser> = {
      user: { id: 'usr_init', email: 'init@example.com' },
      accessToken: 'tok_init',
      expiresAt: Date.now() + 60_000,
    };

    render(
      <AuthProvider adapter={adapter} initialSession={session}>
        <TestConsumer />
      </AuthProvider>
    );

    expect(screen.getByTestId('status').textContent).toBe('authenticated');
    expect(screen.getByTestId('auth-state').textContent).toBe('logged-in');
    expect(screen.getByTestId('user-email').textContent).toBe('init@example.com');
  });

  it('authenticates and signs out through adapter', async () => {
    const adapter = new MockAuthAdapter({ latencyMs: 0 });

    render(
      <AuthProvider adapter={adapter}>
        <TestConsumer />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('status').textContent).toBe('unauthenticated');
    });

    // Click Sign In
    await act(async () => {
      screen.getByText('Sign In Button').click();
    });

    await waitFor(() => {
      expect(screen.getByTestId('status').textContent).toBe('authenticated');
      expect(screen.getByTestId('user-email').textContent).toBe('alex@example.com');
    });

    // Click Sign Out
    await act(async () => {
      screen.getByText('Sign Out Button').click();
    });

    await waitFor(() => {
      expect(screen.getByTestId('status').textContent).toBe('unauthenticated');
      expect(screen.getByTestId('user-email').textContent).toBe('none');
    });
  });
});
