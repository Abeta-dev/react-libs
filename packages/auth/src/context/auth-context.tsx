import * as React from 'react';
import type {
  AuthAdapter,
  AuthSession,
  AuthUser,
  OAuthOptions,
  OAuthProvider,
  PasswordCredentials,
  SignUpCredentials,
  VerifyOtpParams,
} from '../types/adapter';
import type { TokenManagerOptions } from '../types/tokens';
import { TokenManager } from '../core/token-manager';

export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

export interface AuthContextValue<TUser = AuthUser> {
  user: TUser | null;
  session: AuthSession<TUser> | null;
  status: AuthStatus;
  isLoading: boolean;
  error: string | null;
  rawError?: unknown;
  signIn: (credentials: PasswordCredentials) => Promise<AuthSession<TUser>>;
  signUp: (credentials: SignUpCredentials) => Promise<AuthSession<TUser>>;
  signOut: () => Promise<void>;
  signInWithOAuth: (provider: OAuthProvider, options?: OAuthOptions) => Promise<void | AuthSession<TUser>>;
  requestPasswordReset: (email: string) => Promise<void>;
  verifyOtp: (params: VerifyOtpParams) => Promise<AuthSession<TUser>>;
  getValidToken: () => Promise<string | null>;
  clearError: () => void;
  tokenManager: TokenManager<TUser>;
}

export const AuthContext = React.createContext<AuthContextValue<AuthUser> | null>(null);

export interface AuthProviderProps<TUser = AuthUser> {
  adapter: AuthAdapter<TUser>;
  tokenOptions?: TokenManagerOptions;
  initialSession?: AuthSession<TUser> | null;
  onSessionChange?: (session: AuthSession<TUser> | null) => void;
  children: React.ReactNode;
}

export function AuthProvider<TUser = AuthUser>({
  adapter,
  tokenOptions,
  initialSession = null,
  onSessionChange,
  children,
}: AuthProviderProps<TUser>): React.JSX.Element {
  const [session, setSessionState] = React.useState<AuthSession<TUser> | null>(initialSession);
  const [status, setStatus] = React.useState<AuthStatus>(initialSession ? 'authenticated' : 'loading');
  const [error, setError] = React.useState<string | null>(null);
  const [rawError, setRawError] = React.useState<unknown>(undefined);

  // Initialize TokenManager instance once per adapter
  const tokenManager = React.useMemo(() => {
    return new TokenManager<TUser>(adapter, {
      ...tokenOptions,
      onSessionRefreshed: (refreshed) => {
        setSessionState(refreshed as AuthSession<TUser>);
        setStatus('authenticated');
        tokenOptions?.onSessionRefreshed?.(refreshed);
      },
      onSessionExpired: (err) => {
        setSessionState(null);
        setStatus('unauthenticated');
        setError(err instanceof Error ? err.message : 'Session expired');
        setRawError(err);
        tokenOptions?.onSessionExpired?.(err);
      },
    });
  }, [adapter, tokenOptions]);

  // Sync tokenManager when session changes
  const applySession = React.useCallback(
    (newSession: AuthSession<TUser> | null) => {
      setSessionState(newSession);
      setStatus(newSession ? 'authenticated' : 'unauthenticated');
      tokenManager.setSession(newSession);
      onSessionChange?.(newSession);
    },
    [tokenManager, onSessionChange]
  );

  // Restore session on mount
  React.useEffect(() => {
    let isMounted = true;

    async function initSession() {
      if (initialSession) {
        tokenManager.setSession(initialSession);
        return;
      }

      if (!adapter.getSession) {
        if (isMounted) setStatus('unauthenticated');
        return;
      }

      try {
        const restored = await adapter.getSession();
        if (isMounted) {
          if (restored) {
            applySession(restored);
          } else {
            setStatus('unauthenticated');
          }
        }
      } catch (err) {
        if (isMounted) {
          setStatus('unauthenticated');
          setError(err instanceof Error ? err.message : 'Failed to restore session');
          setRawError(err);
        }
      }
    }

    void initSession();

    return () => {
      isMounted = false;
      tokenManager.destroy();
    };
  }, [adapter, initialSession, tokenManager, applySession]);

  const clearError = React.useCallback(() => {
    setError(null);
    setRawError(undefined);
  }, []);

  const signIn = React.useCallback(
    async (credentials: PasswordCredentials): Promise<AuthSession<TUser>> => {
      setError(null);
      setRawError(undefined);
      try {
        const result = await adapter.signInWithPassword(credentials);
        applySession(result);
        return result;
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Sign in failed';
        setError(msg);
        setRawError(err);
        throw err;
      }
    },
    [adapter, applySession]
  );

  const signUp = React.useCallback(
    async (credentials: SignUpCredentials): Promise<AuthSession<TUser>> => {
      if (!adapter.signUpWithPassword) {
        throw new Error('Sign up is not supported by the current auth adapter');
      }
      setError(null);
      setRawError(undefined);
      try {
        const result = await adapter.signUpWithPassword(credentials);
        applySession(result);
        return result;
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Registration failed';
        setError(msg);
        setRawError(err);
        throw err;
      }
    },
    [adapter, applySession]
  );

  const signOut = React.useCallback(async (): Promise<void> => {
    setError(null);
    setRawError(undefined);
    try {
      await adapter.signOut();
    } finally {
      applySession(null);
    }
  }, [adapter, applySession]);

  const signInWithOAuth = React.useCallback(
    async (provider: OAuthProvider, options?: OAuthOptions): Promise<void | AuthSession<TUser>> => {
      if (!adapter.signInWithOAuth) {
        throw new Error(`OAuth login is not supported by the current auth adapter`);
      }
      setError(null);
      setRawError(undefined);
      try {
        const result = await adapter.signInWithOAuth(provider, options);
        if (result) {
          applySession(result);
          return result;
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : `Failed to sign in with ${provider}`;
        setError(msg);
        setRawError(err);
        throw err;
      }
    },
    [adapter, applySession]
  );

  const requestPasswordReset = React.useCallback(
    async (email: string): Promise<void> => {
      if (!adapter.requestPasswordReset) {
        throw new Error('Password reset is not supported by the current auth adapter');
      }
      setError(null);
      setRawError(undefined);
      try {
        await adapter.requestPasswordReset(email);
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Failed to request password reset';
        setError(msg);
        setRawError(err);
        throw err;
      }
    },
    [adapter]
  );

  const verifyOtp = React.useCallback(
    async (params: VerifyOtpParams): Promise<AuthSession<TUser>> => {
      if (!adapter.verifyOtp) {
        throw new Error('OTP verification is not supported by the current auth adapter');
      }
      setError(null);
      setRawError(undefined);
      try {
        const result = await adapter.verifyOtp(params);
        applySession(result);
        return result;
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Invalid verification code';
        setError(msg);
        setRawError(err);
        throw err;
      }
    },
    [adapter, applySession]
  );

  const getValidToken = React.useCallback(async (): Promise<string | null> => {
    return tokenManager.getValidToken();
  }, [tokenManager]);

  const value = React.useMemo<AuthContextValue<TUser>>(
    () => ({
      user: session?.user ?? null,
      session,
      status,
      isLoading: status === 'loading',
      error,
      rawError,
      signIn,
      signUp,
      signOut,
      signInWithOAuth,
      requestPasswordReset,
      verifyOtp,
      getValidToken,
      clearError,
      tokenManager,
    }),
    [
      session,
      status,
      error,
      rawError,
      signIn,
      signUp,
      signOut,
      signInWithOAuth,
      requestPasswordReset,
      verifyOtp,
      getValidToken,
      clearError,
      tokenManager,
    ]
  );

  return (
    <AuthContext.Provider value={value as unknown as AuthContextValue<AuthUser>}>
      {children}
    </AuthContext.Provider>
  );
}
