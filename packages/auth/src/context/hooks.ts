import * as React from 'react';
import { AuthContext, type AuthContextValue } from './auth-context';
import type { AuthSession, AuthUser, OAuthOptions, OAuthProvider } from '../types/adapter';

/**
 * Access full authentication context.
 * Throws an error if used outside an `<AuthProvider>`.
 */
export function useAuth<TUser = AuthUser>(): AuthContextValue<TUser> {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an <AuthProvider>');
  }
  return context as AuthContextValue<TUser>;
}

/**
 * Hook to access and manage valid access tokens.
 * Compatible with API interceptors and BlobStorageClient.
 */
export function useToken(): {
  token: string | null;
  getValidToken: () => Promise<string | null>;
  isTokenValid: boolean;
} {
  const { session, tokenManager, getValidToken: baseGetValidToken } = useAuth();
  const [validityTick, setValidityTick] = React.useState<number>(0);

  // Reactively track token expiration or validity threshold transitions
  React.useEffect(() => {
    if (!session?.expiresAt || typeof session.expiresAt !== 'number') {
      return undefined;
    }

    const msUntilCheck = Math.min(Math.max(0, session.expiresAt - Date.now() - 60_000), 2147483647);
    const timer = setTimeout(() => {
      setValidityTick((tick) => tick + 1);
    }, msUntilCheck);

    return () => clearTimeout(timer);
  }, [tokenManager, session]);

  const isTokenValid = React.useMemo(() => {
    if (!session || validityTick < 0) {
      return false;
    }
    return tokenManager.isTokenValid();
  }, [tokenManager, session, validityTick]);

  const getValidToken = React.useCallback(async () => {
    const validToken = await baseGetValidToken();
    setValidityTick((tick) => tick + 1);
    return validToken;
  }, [baseGetValidToken]);

  return {
    token: session?.accessToken ?? null,
    getValidToken,
    isTokenValid,
  };
}

/**
 * Hook for consuming the currently authenticated user.
 */
export function useUser<TUser = AuthUser>(): {
  user: TUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
} {
  const { user, status, isLoading } = useAuth<TUser>();

  return {
    user,
    isAuthenticated: status === 'authenticated',
    isLoading,
  };
}

/**
 * Hook for managing OAuth sign-in operations with loading state.
 */
export function useOAuth(): {
  signInWithOAuth: (provider: OAuthProvider, options?: OAuthOptions) => Promise<void | AuthSession>;
  isConnecting: boolean;
  activeProvider: OAuthProvider | null;
} {
  const { signInWithOAuth: baseSignIn } = useAuth();
  const [activeProvider, setActiveProvider] = React.useState<OAuthProvider | null>(null);

  const signInWithOAuth = React.useCallback(
    async (provider: OAuthProvider, options?: OAuthOptions) => {
      setActiveProvider(provider);
      try {
        return await baseSignIn(provider, options);
      } finally {
        setActiveProvider(null);
      }
    },
    [baseSignIn]
  );

  return {
    signInWithOAuth,
    isConnecting: activeProvider !== null,
    activeProvider,
  };
}
