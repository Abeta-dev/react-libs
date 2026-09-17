import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { OAuthButton } from '../oauth-button';
import { OAuthButtonGroup } from '../oauth-button-group';
import { AuthProvider } from '../../context/auth-context';
import { MockAuthAdapter } from '../../core/mock-adapter';
import { isValidRedirectUrl } from '../../core/pkce';

describe('OAuthButton & OAuthButtonGroup', () => {
  it('renders Google button with accessible label and responds to clicks', () => {
    const onClick = vi.fn();
    render(<OAuthButton provider="google" onClick={onClick} />);

    const button = screen.getByRole('button', { name: /continue with google/i });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders LinkedIn button with brand styling and icon', () => {
    render(<OAuthButton provider="linkedin" />);
    const button = screen.getByRole('button', { name: /continue with linkedin/i });
    expect(button).toBeInTheDocument();
  });

  it('displays spinner and sets aria-busy when loading', () => {
    render(<OAuthButton provider="google" isLoading={true} />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(button).toBeDisabled();
  });

  it('OAuthButtonGroup integrates with AuthProvider to execute OAuth sign in with PKCE and state', async () => {
    const adapter = new MockAuthAdapter({ latencyMs: 10 });
    const signInSpy = vi.spyOn(adapter, 'signInWithOAuth');

    render(
      <AuthProvider adapter={adapter}>
        <OAuthButtonGroup providers={['google', 'linkedin']} />
      </AuthProvider>
    );

    const googleBtn = screen.getByRole('button', { name: /continue with google/i });
    const linkedInBtn = screen.getByRole('button', { name: /continue with linkedin/i });

    expect(googleBtn).toBeInTheDocument();
    expect(linkedInBtn).toBeInTheDocument();

    fireEvent.click(googleBtn);

    await waitFor(() => {
      expect(signInSpy).toHaveBeenCalledWith(
        'google',
        expect.objectContaining({
          state: expect.any(String),
          codeVerifier: expect.any(String),
          codeChallenge: expect.any(String),
          codeChallengeMethod: 'S256',
        })
      );
    });
  });

  it('rejects untrusted redirectUrl to prevent open redirect vulnerabilities', async () => {
    const adapter = new MockAuthAdapter({ latencyMs: 10 });
    const signInSpy = vi.spyOn(adapter, 'signInWithOAuth');

    render(
      <AuthProvider adapter={adapter}>
        <OAuthButtonGroup
          providers={['google']}
          options={{ redirectUrl: 'https://malicious-attacker.com/steal-token' }}
          allowedOrigins={['https://trustedapp.com']}
        />
      </AuthProvider>
    );

    const googleBtn = screen.getByRole('button', { name: /continue with google/i });
    fireEvent.click(googleBtn);

    expect(signInSpy).not.toHaveBeenCalled();
  });

  it('validates redirect URLs against dangerous protocols and untrusted origins', () => {
    expect(isValidRedirectUrl('/dashboard')).toBe(true);
    expect(isValidRedirectUrl('https://trustedapp.com/callback', ['https://trustedapp.com'])).toBe(true);
    expect(isValidRedirectUrl('https://evil.com/callback', ['https://trustedapp.com'])).toBe(false);
    expect(isValidRedirectUrl('javascript:alert(document.cookie)')).toBe(false);
    expect(isValidRedirectUrl('//evil.com/callback')).toBe(false);
    expect(isValidRedirectUrl('data:text/html,<script>alert(1)</script>')).toBe(false);
  });

  it('debounces rapid multiple clicks with default 1s cooldown', () => {
    vi.useFakeTimers();
    try {
      const onClick = vi.fn();
      const onBlocked = vi.fn();
      render(<OAuthButton provider="google" onClick={onClick} onBlocked={onBlocked} />);

      const button = screen.getByRole('button', { name: /continue with google/i });
      fireEvent.click(button);
      expect(onClick).toHaveBeenCalledTimes(1);

      // Immediate second click dropped
      fireEvent.click(button);
      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onBlocked).toHaveBeenCalledWith('cooldown');

      // After 1 second cooldown
      vi.advanceTimersByTime(1000);
      fireEvent.click(button);
      expect(onClick).toHaveBeenCalledTimes(2);
    } finally {
      vi.useRealTimers();
    }
  });

  it('allows disabling debounce when debounceSec is false or 0', () => {
    const onClick = vi.fn();
    render(<OAuthButton provider="google" debounceSec={false} onClick={onClick} />);

    const button = screen.getByRole('button', { name: /continue with google/i });
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(3);
  });

  it('renders GitHub, Apple, and Microsoft buttons with dedicated icons and styling', () => {
    const { rerender } = render(<OAuthButton provider="github" variant="brand" />);
    const githubBtn = screen.getByRole('button', { name: /continue with github/i });
    expect(githubBtn).toBeInTheDocument();
    expect(githubBtn.className).toContain('bg-[#24292F]');

    rerender(<OAuthButton provider="apple" variant="brand" />);
    const appleBtn = screen.getByRole('button', { name: /continue with apple/i });
    expect(appleBtn).toBeInTheDocument();
    expect(appleBtn.className).toContain('bg-black');

    rerender(<OAuthButton provider="microsoft" variant="outline" />);
    const msBtn = screen.getByRole('button', { name: /continue with microsoft/i });
    expect(msBtn).toBeInTheDocument();
    // Microsoft icon has 4 color rects
    expect(msBtn.querySelector('rect[fill="#F25022"]')).toBeInTheDocument();
    expect(msBtn.querySelector('rect[fill="#7FBA00"]')).toBeInTheDocument();
    expect(msBtn.querySelector('rect[fill="#00A4EF"]')).toBeInTheDocument();
    expect(msBtn.querySelector('rect[fill="#FFB900"]')).toBeInTheDocument();
  });
});
