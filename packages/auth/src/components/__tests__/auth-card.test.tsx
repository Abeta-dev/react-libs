import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AuthProvider } from '../../context/auth-context';
import { AuthCard } from '../auth-card';
import { MockAuthAdapter } from '../../core/mock-adapter';

describe('AuthCard', () => {
  it('renders sign in mode by default and switches to sign up on tab click', () => {
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

    // Switch to Create Account tab
    const signUpTab = screen.getByRole('button', { name: /create account/i });
    fireEvent.click(signUpTab);

    expect(screen.getByRole('heading', { name: /create your account/i })).toBeInTheDocument();
    expect(onModeChange).toHaveBeenCalledWith('signUp');
  });

  it('switches to forgot password mode from login form link', () => {
    const adapter = new MockAuthAdapter();

    render(
      <AuthProvider adapter={adapter}>
        <AuthCard />
      </AuthProvider>
    );

    const forgotBtn = screen.getByRole('button', { name: /forgot password\?/i });
    fireEvent.click(forgotBtn);

    expect(screen.getByRole('heading', { name: /reset your password/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send reset link/i })).toBeInTheDocument();
  });
});
