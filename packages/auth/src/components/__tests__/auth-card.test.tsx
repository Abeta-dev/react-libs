import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AuthProvider } from '../../context/auth-context';
import { AuthCard } from '../auth-card';
import { MockAuthAdapter } from '../../core/mock-adapter';

describe('AuthCard', () => {
  it('renders sign in mode by default and switches to sign up on tab click with accessible tabs and tabpanels', () => {
    const adapter = new MockAuthAdapter();
    const onModeChange = vi.fn();

    render(
      <AuthProvider adapter={adapter}>
        <AuthCard onModeChange={onModeChange} />
      </AuthProvider>
    );

    // Initial sign in tab and heading
    expect(screen.getByRole('heading', { name: /welcome back/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /continue with google/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /continue with linkedin/i })).toBeInTheDocument();

    // Verify accessible tablist and tabs
    const tablist = screen.getByRole('tablist', { name: /authentication modes/i });
    expect(tablist).toBeInTheDocument();

    const signInTab = screen.getByRole('tab', { name: /sign in/i });
    const signUpTab = screen.getByRole('tab', { name: /create account/i });

    expect(signInTab).toHaveAttribute('aria-selected', 'true');
    expect(signUpTab).toHaveAttribute('aria-selected', 'false');

    const signInControls = signInTab.getAttribute('aria-controls');
    expect(signInControls).toBeTruthy();

    const signInPanel = screen.getByRole('tabpanel');
    expect(signInPanel).toHaveAttribute('id', signInControls!);
    expect(signInPanel).toHaveAttribute('aria-labelledby', signInTab.getAttribute('id')!);

    // Switch to Create Account tab
    fireEvent.click(signUpTab);

    expect(screen.getByRole('heading', { name: /create your account/i })).toBeInTheDocument();
    expect(onModeChange).toHaveBeenCalledWith('signUp');
    expect(signInTab).toHaveAttribute('aria-selected', 'false');
    expect(signUpTab).toHaveAttribute('aria-selected', 'true');

    const signUpControls = signUpTab.getAttribute('aria-controls');
    const signUpPanel = screen.getByRole('tabpanel');
    expect(signUpPanel).toHaveAttribute('id', signUpControls!);
    expect(signUpPanel).toHaveAttribute('aria-labelledby', signUpTab.getAttribute('id')!);
  });

  it('switches to forgot password mode from login form link and forwards callbacks', () => {
    const adapter = new MockAuthAdapter();
    const onSuccess = vi.fn();
    const onError = vi.fn();

    render(
      <AuthProvider adapter={adapter}>
        <AuthCard onSuccess={onSuccess} onError={onError} />
      </AuthProvider>
    );

    const forgotBtn = screen.getByRole('button', { name: /forgot password\?/i });
    fireEvent.click(forgotBtn);

    expect(screen.getByRole('heading', { name: /reset your password/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send reset link/i })).toBeInTheDocument();
  });

  it('clears error when switching tabs', async () => {
    const adapter = new MockAuthAdapter();
    vi.spyOn(adapter, 'signInWithPassword').mockRejectedValueOnce(new Error('Invalid credentials'));

    render(
      <AuthProvider adapter={adapter}>
        <AuthCard />
      </AuthProvider>
    );

    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/^password/i, { selector: 'input' }), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /^sign in$/i }));

    expect(await screen.findByRole('alert')).toHaveTextContent('Invalid credentials');

    // Switch to Create Account tab
    const signUpTab = screen.getByRole('tab', { name: /create account/i });
    fireEvent.click(signUpTab);

    // Error alert should be cleared
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
