import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { OAuthButton } from '../oauth-button';
import { OAuthButtonGroup } from '../oauth-button-group';
import { AuthProvider } from '../../context/auth-context';
import { MockAuthAdapter } from '../../core/mock-adapter';

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

  it('OAuthButtonGroup integrates with AuthProvider to execute OAuth sign in', async () => {
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
      expect(signInSpy).toHaveBeenCalledWith('google', undefined);
    });
  });
});
