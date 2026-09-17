# @abeta.dev/auth headless client

`@abeta.dev/auth/core` is a generic client for one backend that owns credentials and refresh cookies. It deliberately contains no product forms, roles, tenant logic, or provider implementation.

## Security model

- Access tokens live in the `AuthClient` memory snapshot. No storage is read or written unless an application explicitly injects `persistence`.
- `refresh()` accepts no refresh token and returns no refresh token. The adapter uses the backend's same-site HttpOnly cookie and a CSRF token supplied by `CsrfProvider`.
- A cookie refresh is one-flight. If it may have reached the backend and fails, the client becomes `reauth_required`; it does not retry a potentially consumed rotating token.
- Login/logout, refresh, and cross-tab invalidation use epochs. A late response cannot install a session after logout or account replacement.
- A `RefreshCoordinator` is optional but must declare `supportsCookieRefresh: true` before automatic refresh is allowed. Use it to provide Web Locks plus BroadcastChannel invalidation in browsers.

## Adapter contract assumptions

The application adapter maps its backend's `{ data }` / `{ error }` envelope to the typed methods in `AuthClientAdapter`. It must require a finite millisecond `expiresAt` for authenticated results, include CSRF headers for every unsafe auth call, and surface only an authentication-middleware `ACCESS_EXPIRED` response as retryable to `createAuthenticatedFetch`.

OAuth and OTP are capability descriptors only. Unsupported capabilities are absent or reported as `{ supported: false }`; the package supplies no success-returning provider or OTP stub.

Use `@abeta.dev/auth/core` for non-React/browser-neutral applications. It has no React runtime dependency and its output deliberately has no `'use client'` directive. `@abeta.dev/auth` and `@abeta.dev/auth/react` are React entrypoints: install compatible `react` and `react-dom` before importing either. The React peer metadata is optional so a core-only consumer is not forced to install React, not because the React entrypoints may run without it.

Use `@abeta.dev/auth/react` for `AuthClientProvider` and `useAuthClientSnapshot`. The provider subscribes to a caller-owned client and does not create or destroy it, which keeps React StrictMode remounts from duplicating lifecycle work.
