import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { AuthProvider } from '../../context/auth-context';
import { ForgotPasswordForm } from '../forgot-password-form';
import { MockAuthAdapter } from '../../core/mock-adapter';

describe('ForgotPasswordForm', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('validates empty email before submitting and displays error alert', async () => {
    const adapter = new MockAuthAdapter({ latencyMs: 0 });
    const onSuccess = vi.fn();

    render(
      <AuthProvider adapter={adapter}>
        <ForgotPasswordForm debounceSec={0} onSuccess={onSuccess} />
      </AuthProvider>
    );

    const submitBtn = screen.getByRole('button', { name: /send reset link/i });
    await act(async () => {
      fireEvent.click(submitBtn);
    });

    expect(screen.getByRole('alert')).toHaveTextContent(/please enter a valid email address/i);
    expect(onSuccess).not.toHaveBeenCalled();
  });

  it('validates invalid email format, displays error alert, and clears on change', async () => {
    const adapter = new MockAuthAdapter({ latencyMs: 0 });

    render(
      <AuthProvider adapter={adapter}>
        <ForgotPasswordForm debounceSec={0} />
      </AuthProvider>
    );

    const emailInput = screen.getByLabelText(/email address/i);
    const submitBtn = screen.getByRole('button', { name: /send reset link/i });

    fireEvent.change(emailInput, { target: { value: 'invalid-email-string' } });
    await act(async () => {
      fireEvent.click(submitBtn);
    });

    expect(screen.getByRole('alert')).toHaveTextContent(/please enter a valid email address/i);

    // Typing clears the error
    fireEvent.change(emailInput, { target: { value: 'user@' } });
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('submits valid email, transitions to success state, and calls onSuccess', async () => {
    const adapter = new MockAuthAdapter({ latencyMs: 0 });
    const onSuccess = vi.fn();
    const requestResetSpy = vi.spyOn(adapter, 'requestPasswordReset');

    render(
      <AuthProvider adapter={adapter}>
        <ForgotPasswordForm onSuccess={onSuccess} />
      </AuthProvider>
    );

    const emailInput = screen.getByLabelText(/email address/i);
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    const submitBtn = screen.getByRole('button', { name: /send reset link/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/check your email/i)).toBeInTheDocument();
    });

    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(requestResetSpy).toHaveBeenCalledWith('test@example.com');
    expect(onSuccess).toHaveBeenCalledTimes(1);
  });

  it('handles submission error and calls onError callback', async () => {
    const adapter = new MockAuthAdapter({ latencyMs: 0 });
    vi.spyOn(adapter, 'requestPasswordReset').mockRejectedValueOnce(new Error('Network error sending reset'));
    const onError = vi.fn();

    render(
      <AuthProvider adapter={adapter}>
        <ForgotPasswordForm onError={onError} />
      </AuthProvider>
    );

    const emailInput = screen.getByLabelText(/email address/i);
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    const submitBtn = screen.getByRole('button', { name: /send reset link/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/network error sending reset/i);
    });

    expect(onError).toHaveBeenCalledWith(expect.any(Error));
  });

  it('renders and invokes onBackToSignIn when provided', () => {
    const adapter = new MockAuthAdapter();
    const onBackToSignIn = vi.fn();

    render(
      <AuthProvider adapter={adapter}>
        <ForgotPasswordForm onBackToSignIn={onBackToSignIn} />
      </AuthProvider>
    );

    const backBtn = screen.getByRole('button', { name: /back to sign in/i });
    fireEvent.click(backBtn);
    expect(onBackToSignIn).toHaveBeenCalledTimes(1);

    // Verify back to sign in is also available on success screen
    // (mock success flow)
  });

  it('runs countdown timer after success and re-enables resend button', async () => {
    vi.useFakeTimers();
    const adapter = new MockAuthAdapter({ latencyMs: 0 });

    render(
      <AuthProvider adapter={adapter}>
        <ForgotPasswordForm debounceSec={0} />
      </AuthProvider>
    );

    const emailInput = screen.getByLabelText(/email address/i);
    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });

    const submitBtn = screen.getByRole('button', { name: /send reset link/i });
    fireEvent.click(submitBtn);

    // Wait for the async submission promise to resolve
    await act(async () => {
      await Promise.resolve();
      await Promise.resolve();
    });

    expect(screen.getByText(/check your email/i)).toBeInTheDocument();

    // Initial countdown state
    const resendBtn = screen.getByRole('button', { name: /resend available in/i });
    expect(resendBtn).toHaveTextContent(/resend available in 60s/i);
    expect(resendBtn).toBeDisabled();

    // Advance 1 second
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(resendBtn).toHaveTextContent(/resend available in 59s/i);

    // Advance remaining 59 seconds
    act(() => {
      vi.advanceTimersByTime(59000);
    });

    // Countdown complete
    expect(screen.getByRole('button', { name: /click to resend/i })).toBeEnabled();
  });
});
