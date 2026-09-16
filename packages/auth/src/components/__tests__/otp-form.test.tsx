import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AuthProvider } from '../../context/auth-context';
import { OtpForm } from '../otp-form';
import { MockAuthAdapter } from '../../core/mock-adapter';
import type { AuthSession, AuthUser } from '../../types/adapter';

describe('OtpForm', () => {
  it('renders 6 digit inputs with accessible digit labels', () => {
    const adapter = new MockAuthAdapter();
    render(
      <AuthProvider adapter={adapter}>
        <OtpForm email="alex@example.com" length={6} />
      </AuthProvider>
    );

    for (let i = 1; i <= 6; i++) {
      expect(screen.getByLabelText(`Digit ${i} of 6`)).toBeInTheDocument();
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

  it('displays error message when verification fails', async () => {
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
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(onError).toHaveBeenCalled();
    });
  });
});
