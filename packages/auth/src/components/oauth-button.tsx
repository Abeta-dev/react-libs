import * as React from 'react';
import { clsx } from 'clsx';
import { GoogleIcon } from '../icons/google-icon';
import { LinkedInIcon } from '../icons/linkedin-icon';
import { SpinnerIcon } from '../icons/spinner-icon';
import type { OAuthProvider } from '../types/adapter';
import { useClickBackpressure } from '../core/use-click-backpressure';

export interface OAuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  provider: OAuthProvider;
  isLoading?: boolean | undefined;
  variant?: 'outline' | 'brand' | 'secondary' | undefined;
  label?: string | undefined;
  iconOnly?: boolean | undefined;
  /**
   * Cooldown / debounce duration in seconds to prevent multiple rapid clicks.
   * Pass any number in seconds (e.g. 1, 0.5, 2).
   * Pass `false` or `0` to disable debouncing.
   * @default 1
   */
  debounceSec?: number | false | undefined;
  /**
   * Optional callback when a click is blocked by debouncing or in-flight backpressure.
   */
  onBlocked?: ((reason: 'in_flight' | 'cooldown') => void) | undefined;
}

function getProviderConfig(provider: OAuthProvider) {
  if (provider === 'google') {
    return {
      name: 'Google',
      icon: GoogleIcon,
      brandClasses:
        'bg-white hover:bg-neutral-50 text-neutral-800 border-neutral-300 shadow-xs dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-white dark:border-neutral-700',
    };
  }
  if (provider === 'linkedin') {
    return {
      name: 'LinkedIn',
      icon: LinkedInIcon,
      brandClasses: 'bg-[#0A66C2] hover:bg-[#095196] text-white border-transparent shadow-xs',
    };
  }
  return {
    name: provider.charAt(0).toUpperCase() + provider.slice(1),
    icon: GoogleIcon,
    brandClasses: 'bg-primary text-primary-foreground',
  };
}

export const OAuthButton = React.forwardRef<HTMLButtonElement, OAuthButtonProps>(
  (
    {
      provider,
      isLoading = false,
      variant = 'outline',
      label,
      iconOnly = false,
      debounceSec = 1,
      onBlocked,
      onClick,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const config = getProviderConfig(provider);

    const { execute: handleClick, isPending } = useClickBackpressure(onClick, {
      debounceSec,
      onBlocked,
    });

    const IconComponent = config.icon;
    const buttonText = label ?? (iconOnly ? '' : `Continue with ${config.name}`);
    const ariaLabel = label ?? (iconOnly ? `Sign in with ${config.name}` : undefined);

    const isEffectiveLoading = isLoading || isPending;

    const baseClasses =
      'inline-flex items-center justify-center gap-3 rounded-md px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 select-none';

    let variantClasses =
      'border border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-800 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:hover:bg-neutral-800 shadow-xs';
    if (variant === 'secondary') {
      variantClasses =
        'bg-neutral-100 hover:bg-neutral-200 text-neutral-900 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-100';
    } else if (variant === 'brand') {
      variantClasses = config.brandClasses;
    }

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled || isEffectiveLoading}
        aria-label={ariaLabel}
        aria-busy={isEffectiveLoading}
        onClick={handleClick}
        className={clsx(
          baseClasses,
          variantClasses,
          iconOnly ? 'w-10 h-10 px-0' : 'w-full',
          className
        )}
        {...props}
      >
        {isEffectiveLoading ? (
          <SpinnerIcon size={18} className="animate-spin text-current" />
        ) : (
          <IconComponent size={18} className="shrink-0" />
        )}
        {!iconOnly && <span>{buttonText}</span>}
      </button>
    );
  }
);
OAuthButton.displayName = 'OAuthButton';
