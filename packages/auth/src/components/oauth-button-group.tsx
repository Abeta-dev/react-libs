import * as React from 'react';
import { clsx } from 'clsx';
import { OAuthButton, type OAuthButtonProps } from './oauth-button';
import type { OAuthOptions, OAuthProvider } from '../types/adapter';
import { useOAuth } from '../context/hooks';

export interface OAuthButtonGroupProps {
  providers?: OAuthProvider[] | undefined;
  layout?: 'stack' | 'grid' | undefined;
  variant?: OAuthButtonProps['variant'] | undefined;
  iconOnly?: boolean | undefined;
  onProviderClick?: ((provider: OAuthProvider) => void) | undefined;
  options?: OAuthOptions | undefined;
  className?: string | undefined;
  disabled?: boolean | undefined;
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
}) => {
  const { signInWithOAuth, isConnecting, activeProvider } = useOAuth();

  const handleSignIn = async (provider: OAuthProvider) => {
    onProviderClick?.(provider);
    try {
      await signInWithOAuth(provider, options);
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
          onClick={() => void handleSignIn(provider)}
        />
      ))}
    </div>
  );
};
OAuthButtonGroup.displayName = 'OAuthButtonGroup';
