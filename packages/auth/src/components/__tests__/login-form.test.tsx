import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AuthProvider } from '../../context/auth-context';
import { LoginForm } from '../login-form';
import { MockAuthAdapter } from '../../core/mock-adapter';

describe('LoginForm', () => {
  it('validates email and password requirements before submitting', async () => {
    const adapter = new MockAuthAdapter({ latencyMs: 0 });
    const onSuccess = vi.fn();

    render(
      <AuthProvider adapter={adapter}>
        <LoginForm onSuccess={onSuccess} />
      </AuthProvider>
    );

    const submitBtn = screen.getByRole('button', { name: /sign in/i });

    // Submit empty
    fireEvent.click(submitBtn);
    expect(screen.getByRole('alert')).toHaveTextContent(/please enter your email address/i);
    expect(onSuccess).not.toHaveBeenCalled();

    // Invalid email
    const emailInput = screen.getByLabelText(/email address/i);
    fireEvent.change(emailInput, { target: { value: 'not-an-email' } });
    fireEvent.click(submitBtn);
    expect(screen.getByRole('alert')).toHaveTextContent(/valid email address/i);

    // Missing password
    fireEvent.change(emailInput, { target: { value: 'alex@example.com' } });
    fireEvent.click(submitBtn);
    expect(screen.getByRole('alert')).toHaveTextContent(/please enter your password/i);
  });

  it('toggles password visibility with show/hide button', () => {
    const adapter = new MockAuthAdapter();
    render(
      <AuthProvider adapter={adapter}>
        <LoginForm />
      </AuthProvider>
    );

    const passwordInput = screen.getByLabelText(/^password$/i);
    expect(passwordInput).toHaveAttribute('type', 'password');

    const toggleBtn = screen.getByRole('button', { name: /show password/i });
    fireEvent.click(toggleBtn);
    expect(passwordInput).toHaveAttribute('type', 'text');

    fireEvent.click(screen.getByRole('button', { name: /hide password/i }));
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('successfully signs in and triggers onSuccess callback', async () => {
    const adapter = new MockAuthAdapter({ latencyMs: 0 });
    const onSuccess = vi.fn();

    render(
      <AuthProvider adapter={adapter}>
        <LoginForm onSuccess={onSuccess} />
      </AuthProvider>
    );

    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'alex@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/^password$/i), {
      target: { value: 'Password123!' },
    });

    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalledTimes(1);
      expect(onSuccess).toHaveBeenCalledWith(
        expect.objectContaining({
          user: expect.objectContaining({ email: 'alex@example.com' }),
        })
      );
    });
  });

  it('displays adapter error message when authentication fails', async () => {
    const adapter = new MockAuthAdapter({ latencyMs: 0 });
    const onError = vi.fn();

    render(
      <AuthProvider adapter={adapter}>
        <LoginForm onError={onError} />
      </AuthProvider>
    );

    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'alex@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/^password$/i), {
      target: { value: 'WrongPassword!' },
    });

    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/invalid email or password/i);
      expect(onError).toHaveBeenCalled();
    });
  });
});
