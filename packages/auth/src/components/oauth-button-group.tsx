import * as React from 'react';
import { clsx } from 'clsx';
import { OAuthButton, type OAuthButtonProps } from './oauth-button';
import type { OAuthOptions, OAuthProvider } from '../types/adapter';
import { useOAuth } from '../context/hooks';
import {
  generateOAuthState,
  generateCodeVerifier,
  generateCodeChallenge,
  isValidRedirectUrl,
} from '../core/pkce';

export interface OAuthButtonGroupProps {
  providers?: OAuthProvider[] | undefined;
  layout?: 'stack' | 'grid' | undefined;
  variant?: OAuthButtonProps['variant'] | undefined;
  iconOnly?: boolean | undefined;
  onProviderClick?: ((provider: OAuthProvider) => void) | undefined;
  options?: OAuthOptions | undefined;
  className?: string | undefined;
  disabled?: boolean | undefined;
  /**
   * Cooldown / debounce duration in seconds. Default: 1. Pass 0 or false to disable.
   */
  debounceSec?: number | false | undefined;
  /**
   * Allowed origins for redirectUrl validation. If omitted, same-origin is enforced.
   */
  allowedOrigins?: string[] | undefined;
}

export const OAuthButtonGroup: React.FC<OAuthButtonGroupProps> = ({
  providers = ['google', 'linkedin'],
  layout = 'stack',
  variant = 'outline',
  iconOnly = false,
  onProviderClick,
  options,
  className,
  disabled = false,
  debounceSec = 1,
  allowedOrigins,
}) => {
  const { signInWithOAuth, isConnecting, activeProvider } = useOAuth();

  const handleSignIn = async (provider: OAuthProvider): Promise<void> => {
    onProviderClick?.(provider);

    // 1. Validate redirectUrl to prevent open redirect and protocol injection
    if (options?.redirectUrl) {
      const isValid = isValidRedirectUrl(options.redirectUrl, allowedOrigins);
      if (!isValid) {
        if (process.env.NODE_ENV !== 'production') {
          console.error('[OAuthButtonGroup] Blocked untrusted redirect URL:', options.redirectUrl);
        }
        return;
      }
    }

    // 2. Generate cryptographically secure state parameter (CSRF protection)
    const state = options?.state ?? generateOAuthState();
    if (!state || state.length < 16) {
      throw new Error('Failed to generate cryptographically secure OAuth state parameter');
    }
    if (process.env.NODE_ENV !== 'production') {
      console.debug(`[OAuthButtonGroup] Generated verified state nonce for provider: ${provider}`);
    }

    // 3. PKCE code generation (RFC 7636)
    const codeVerifier = options?.codeVerifier ?? generateCodeVerifier();
    const codeChallenge =
      options?.codeChallenge ?? (await generateCodeChallenge(codeVerifier));

    const enhancedOptions: OAuthOptions = {
      ...options,
      state,
      codeVerifier,
      codeChallenge,
      codeChallengeMethod: options?.codeChallengeMethod ?? 'S256',
    };

    try {
      await signInWithOAuth(provider, enhancedOptions);
    } catch {
      // Handled by AuthContext error state
    }
  };

  return (
    <div
      role="group"
      aria-label="Third-party authentication options"
      className={clsx(
        layout === 'grid' ? 'grid grid-cols-2 gap-3' : 'flex flex-col gap-2.5',
        className
      )}
    >
      {providers.map((provider) => (
        <OAuthButton
          key={provider}
          provider={provider}
          variant={variant}
          iconOnly={iconOnly}
          isLoading={isConnecting && activeProvider === provider}
          disabled={disabled || isConnecting}
          debounceSec={debounceSec}
          onClick={() => handleSignIn(provider)}
        />
      ))}
    </div>
  );
};
OAuthButtonGroup.displayName = 'OAuthButtonGroup';
