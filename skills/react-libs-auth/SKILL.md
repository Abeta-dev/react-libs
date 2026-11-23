---
name: react-libs-auth
description: Implementation guide for @abeta.dev/auth (v0.22.0) — headless cookie-backed AuthClient (@abeta.dev/auth/core), React providers & hooks (@abeta.dev/auth/react), and accessible auth UI forms (@abeta.dev/auth) with single-flight refresh mutex, CSRF, and RFC 7636 PKCE.
---

# `@abeta.dev/auth` Skill (`v0.22.0`)

## Installation

```bash
npm install @abeta.dev/auth
```

## Entrypoints & Security Architecture

| Subpath | Directive | Contents |
| :--- | :--- | :--- |
| `@abeta.dev/auth/core` | **Pure TS (Zero React, Zero `'use client'`)** | `AuthClient`, `createAuthenticatedFetch`, `AuthClientError` — in-memory access token snapshots, single-flight HttpOnly cookie refresh mutex, monotonic epoch invalidation across tabs, CSRF header injection, fail-closed `reauth_required`. |
| `@abeta.dev/auth/react` | `'use client'` | `AuthClientProvider` (StrictMode-safe caller-owned client), `useAuthClient`, `useAuthClientSnapshot` (`useSyncExternalStore`), plus `AuthProvider`, `useAuth`, `useToken`, `useUser`, `useOAuth`. |
| `@abeta.dev/auth` | `'use client'` | Full bundle adding accessible UI components (`AuthCard`, `LoginForm`, `SignUpForm`, `ForgotPasswordForm`, `OtpForm`, `OAuthButton`, `OAuthButtonGroup`), `TokenManager`, `MockAuthAdapter`, RFC 7636 PKCE helpers, and `useClickBackpressure`. |
| `@abeta.dev/auth/core/use-click-backpressure` | `'use client'` | Standalone button/form submission backpressure hook (`{ execute, isPending, cancelCooldown, wrapHandler }`). |

## Security Invariants (Never Violate)

- Never persist refresh tokens in `localStorage`; rely on backend SameSite HttpOnly cookies + `CsrfProvider`.
- Always pass a caller-owned `AuthClient` instance into `AuthClientProvider` so React 19 StrictMode remounts never duplicate initialization or teardown.
- `createAuthenticatedFetch` enforces same-origin safety, `redirect: 'error'`, and a single guarded retry on `ACCESS_EXPIRED` (fail-closed thereafter).
