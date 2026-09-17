import * as React from 'react';
import { useSyncExternalStore } from 'react';
import type { AuthUser } from '../types/adapter';
import type { AuthClientSnapshot } from '../types/client';
import { AuthClient } from '../core/auth-client';

const AuthClientContext = React.createContext<AuthClient<AuthUser> | null>(null);

export interface AuthClientProviderProps<TUser = AuthUser> {
  client: AuthClient<TUser>;
  children: React.ReactNode;
}

/** React subscription layer for the headless client. The client lifecycle remains caller-owned. */
export function AuthClientProvider<TUser = AuthUser>({ client, children }: AuthClientProviderProps<TUser>): React.JSX.Element {
  return <AuthClientContext.Provider value={client as unknown as AuthClient<AuthUser>}>{children}</AuthClientContext.Provider>;
}

export function useAuthClient<TUser = AuthUser>(): AuthClient<TUser> {
  const client = React.useContext(AuthClientContext);
  if (!client) throw new Error('useAuthClient must be used within an <AuthClientProvider>.');
  return client as unknown as AuthClient<TUser>;
}

export function useAuthClientSnapshot<TUser = AuthUser>(): AuthClientSnapshot<TUser> {
  const client = useAuthClient<TUser>();
  return useSyncExternalStore(client.subscribe, client.getSnapshot, client.getSnapshot);
}
