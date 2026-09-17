import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react';
import { AuthProvider } from '../../context/auth-context';
import { OtpForm } from '../otp-form';
import { MockAuthAdapter } from '../../core/mock-adapter';
import type { AuthSession, AuthUser } from '../../types/adapter';

describe('OtpForm', () => {
  it('renders 6 digit inputs with accessible digit labels, group role, and autocomplete', () => {
    const adapter = new MockAuthAdapter();
    render(
      <AuthProvider adapter={adapter}>
        <OtpForm email="alex@example.com" length={6} />
      </AuthProvider>
    );

    const group = screen.getByRole('group', { name: /one-time verification code/i });
    expect(group).toBeInTheDocument();

    for (let i = 1; i <= 6; i++) {
      const input = screen.getByLabelText(`Digit ${i} of 6`);
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('autocomplete', 'one-time-code');
      expect(input).toHaveAttribute('aria-invalid', 'false');
    }
  });

  it('handles paste of full 6-digit code and triggers verification', async () => {
    const adapter = new MockAuthAdapter({ latencyMs: 0 });
    const initialSession: AuthSession<AuthUser> = {
      user: { id: 'usr_demo_123', email: 'alex@example.com' },
      accessToken: 'access_demo',
    };
    const onSuccess = vi.fn();

    render(
      <AuthProvider adapter={adapter} initialSession={initialSession}>
        <OtpForm email="alex@example.com" onSuccess={onSuccess} />
      </AuthProvider>
    );

    const firstInput = screen.getByLabelText('Digit 1 of 6');

    fireEvent.paste(firstInput, {
      clipboardData: {
        getData: () => '123456',
      },
    });

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalledTimes(1);
    });
  });

  it('displays error message when verification fails and links via aria-invalid/describedby', async () => {
    const adapter = new MockAuthAdapter({ latencyMs: 0 });
    const onError = vi.fn();

    render(
      <AuthProvider adapter={adapter}>
        <OtpForm email="alex@example.com" onError={onError} />
      </AuthProvider>
    );

    // Enter wrong code
    for (let i = 1; i <= 6; i++) {
      fireEvent.change(screen.getByLabelText(`Digit ${i} of 6`), {
        target: { value: '9' },
      });
    }

    await waitFor(() => {
      const alert = screen.getByRole('alert');
      expect(alert).toBeInTheDocument();
      expect(alert).toHaveAttribute('aria-live', 'polite');
      const alertId = alert.getAttribute('id');
      expect(alertId).toBeTruthy();

      const firstInput = screen.getByLabelText('Digit 1 of 6');
      expect(firstInput).toHaveAttribute('aria-invalid', 'true');
      expect(firstInput).toHaveAttribute('aria-describedby', alertId);
      expect(onError).toHaveBeenCalled();
    });
  });

  it('ticks cooldown timer without thrashing intervals', () => {
    vi.useFakeTimers();
    try {
      const adapter = new MockAuthAdapter();
      render(
        <AuthProvider adapter={adapter}>
          <OtpForm email="alex@example.com" />
        </AuthProvider>
      );

      const resendBtn = screen.getByRole('button', { name: /resend in 30s/i });
      expect(resendBtn).toBeDisabled();

      // Advance by 10 seconds
      act(() => {
        vi.advanceTimersByTime(10000);
      });
      expect(screen.getByRole('button', { name: /resend in 20s/i })).toBeDisabled();

      // Advance remaining 20 seconds
      act(() => {
        vi.advanceTimersByTime(20000);
      });
      expect(screen.getByRole('button', { name: /resend code/i })).not.toBeDisabled();
    } finally {
      vi.useRealTimers();
    }
  });
});
