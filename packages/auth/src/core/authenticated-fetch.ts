import type { AuthClient } from './auth-client';

export interface AuthenticatedFetchOptions extends RequestInit {
  /** Required for automatic replay of a body. Omit to make a request non-replayable. */
  replay?: (() => RequestInit) | undefined;
  /** Only auth middleware expiry responses may trigger a retry. */
  isAccessExpired?: ((response: Response) => boolean) | undefined;
}

export interface AuthenticatedFetchClient {
  fetch(input: string | URL, init?: AuthenticatedFetchOptions): Promise<Response>;
}

/** Creates a guarded bearer transport with exactly one eligible retry. */
export function createAuthenticatedFetch<TUser>(
  auth: AuthClient<TUser>,
  allowedOrigin: string,
  fetchImpl: typeof fetch = fetch
): AuthenticatedFetchClient {
  const expectedOrigin = new URL(allowedOrigin).origin;

  return {
    async fetch(input, init = {}) {
      const url = new URL(typeof input === 'string' ? input : input.toString(), expectedOrigin);
      if (url.origin !== expectedOrigin) throw new TypeError('Authenticated requests must target the configured backend origin.');

      const execute = async (request: AuthenticatedFetchOptions): Promise<Response> => {
        const token = await auth.getAccessToken();
        const headers = new Headers(request.headers);
        if (token) headers.set('Authorization', `Bearer ${token}`);
        return fetchImpl(url, { ...request, headers, redirect: 'error' });
      };

      const response = await execute(init);
      if (!init.replay || !init.isAccessExpired?.(response)) return response;
      const refreshed = await auth.refresh();
      if (!refreshed) return response;
      return execute({ ...init, ...init.replay(), replay: undefined });
    },
  };
}
