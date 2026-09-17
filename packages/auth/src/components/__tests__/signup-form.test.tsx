import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AuthProvider } from '../../context/auth-context';
import { SignUpForm } from '../signup-form';
import { MockAuthAdapter } from '../../core/mock-adapter';

describe('SignUpForm', () => {
  it('validates password mismatch and terms acceptance', async () => {
    const adapter = new MockAuthAdapter({ latencyMs: 0 });
    const onSuccess = vi.fn();

    render(
      <AuthProvider adapter={adapter}>
        <SignUpForm onSuccess={onSuccess} />
      </AuthProvider>
    );

    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'jane@example.com' } });
    fireEvent.change(screen.getByLabelText(/^password$/i), { target: { value: 'Password123!' } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'DifferentPassword!' } });

    fireEvent.click(screen.getByRole('button', { name: /create account/i }));

    expect(screen.getByRole('alert')).toHaveTextContent(/passwords do not match/i);
    expect(onSuccess).not.toHaveBeenCalled();

    // Fix confirm password, but leave terms unchecked
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'Password123!' } });
    fireEvent.click(screen.getByRole('button', { name: /create account/i }));
    expect(screen.getByRole('alert')).toHaveTextContent(/must accept the terms of service/i);
  });

  it('calculates dynamic password strength indicators', () => {
    const adapter = new MockAuthAdapter();

    render(
      <AuthProvider adapter={adapter}>
        <SignUpForm />
      </AuthProvider>
    );

    const passwordInput = screen.getByLabelText(/^password$/i);

    // Weak
    fireEvent.change(passwordInput, { target: { value: 'pass' } });
    expect(screen.getByText(/weak/i)).toBeInTheDocument();
    const weakMeter = screen.getByRole('meter');
    expect(weakMeter).toHaveAttribute('aria-valuenow', '1');
    expect(weakMeter).toHaveAttribute('aria-valuemin', '0');
    expect(weakMeter).toHaveAttribute('aria-valuemax', '4');
    expect(weakMeter).toHaveAttribute('aria-valuetext', 'Password strength: Weak');

    // Strong (length >= 8, uppercase, lowercase, number, special char)
    fireEvent.change(passwordInput, { target: { value: 'SuperSecret123!' } });
    expect(screen.getByText(/strong/i)).toBeInTheDocument();
    const strongMeter = screen.getByRole('meter');
    expect(strongMeter).toHaveAttribute('aria-valuenow', '4');
    expect(strongMeter).toHaveAttribute('aria-valuetext', 'Password strength: Strong');
  });

  it('sanitizes termsUrl and privacyUrl rejecting javascript: and dangerous schemes', () => {
    const adapter = new MockAuthAdapter();

    render(
      <AuthProvider adapter={adapter}>
        <SignUpForm
          termsUrl="javascript:alert('xss')"
          privacyUrl="https://example.com/privacy"
        />
      </AuthProvider>
    );

    const termsLink = screen.getByRole('link', { name: /terms of service/i });
    const privacyLink = screen.getByRole('link', { name: /privacy policy/i });

    expect(termsLink).toHaveAttribute('href', '#');
    expect(privacyLink).toHaveAttribute('href', 'https://example.com/privacy');
  });

  it('links errors via aria-invalid and aria-describedby, and toggles password visibility', () => {
    const adapter = new MockAuthAdapter();

    render(
      <AuthProvider adapter={adapter}>
        <SignUpForm />
      </AuthProvider>
    );

    const nameInput = screen.getByLabelText(/full name/i);
    const passwordInput = screen.getByLabelText(/^password$/i);

    // Toggle button accessible state
    const toggleBtn = screen.getByRole('button', { name: /toggle password visibility/i });
    expect(toggleBtn).toHaveAttribute('aria-pressed', 'false');
    fireEvent.click(toggleBtn);
    expect(passwordInput).toHaveAttribute('type', 'text');
    expect(toggleBtn).toHaveAttribute('aria-pressed', 'true');

    // Trigger validation error
    fireEvent.click(screen.getByRole('button', { name: /create account/i }));

    const alert = screen.getByRole('alert');
    expect(alert).toHaveAttribute('aria-live', 'polite');
    const alertId = alert.getAttribute('id');
    expect(alertId).toBeTruthy();

    expect(nameInput).toHaveAttribute('aria-invalid', 'true');
    expect(nameInput).toHaveAttribute('aria-describedby', alertId);

    // Typing in name clears error
    fireEvent.change(nameInput, { target: { value: 'Alex Morgan' } });
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(nameInput).toHaveAttribute('aria-invalid', 'false');
  });

  it('submits valid registration and invokes onSuccess', async () => {
    const adapter = new MockAuthAdapter({ latencyMs: 0 });
    const onSuccess = vi.fn();

    render(
      <AuthProvider adapter={adapter}>
        <SignUpForm onSuccess={onSuccess} />
      </AuthProvider>
    );

    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'Alice Smith' } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'alice@example.com' } });
    fireEvent.change(screen.getByLabelText(/^password$/i), { target: { value: 'SecurePass123!' } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'SecurePass123!' } });
    fireEvent.click(screen.getByLabelText(/terms of service/i));

    fireEvent.click(screen.getByRole('button', { name: /create account/i }));

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalledTimes(1);
      expect(onSuccess).toHaveBeenCalledWith(
        expect.objectContaining({
          user: expect.objectContaining({ email: 'alice@example.com', name: 'Alice Smith' }),
        })
      );
    });
  });
});
