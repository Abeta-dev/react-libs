# @abeta.dev/auth

[![npm version](https://img.shields.io/npm/v/@abeta.dev/auth.svg)](https://www.npmjs.com/package/@abeta.dev/auth)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![Headless Core](https://img.shields.io/badge/core-Zero--React-emerald)](https://www.npmjs.com/package/@abeta.dev/auth)
[![React 18 / 19](https://img.shields.io/badge/react-18%20%7C%2019-blue)](https://react.dev)
[![Storybook](https://img.shields.io/badge/Storybook-Live%20Docs-ff4785)](https://abeta-dev.github.io/react-libs/)

Backend-agnostic authentication engine and React 19 UI primitives featuring an in-memory, cookie-backed headless client (`@abeta.dev/auth/core`), StrictMode-safe React bindings (`@abeta.dev/auth/react`), and accessible login/signup/OTP/OAuth UI forms (`@abeta.dev/auth`).

`@abeta.dev/auth/core` is a generic client for one backend that owns credentials and refresh cookies. It deliberately contains no product forms, roles, tenant logic, or provider implementation.

---

## Installation

```bash
npm install @abeta.dev/auth
```

If you import from `@abeta.dev/auth` or `@abeta.dev/auth/react`, ensure compatible React peers are installed:

```bash
npm install react@^19.0.0 react-dom@^19.0.0
```

---

## Entry-Point Matrix

| Entrypoint | Runtime | `'use client'` | Exports |
| :--- | :--- | :---: | :--- |
| `@abeta.dev/auth/core` | Browser-neutral / Node / Any UI framework | No | `AuthClient`, `createAuthenticatedFetch`, `AuthClientError`, and headless contract types (`AuthClientAdapter`, `CsrfProvider`, `RefreshCoordinator`, `AccessSessionPersistence`) |
| `@abeta.dev/auth/react` | React 18 & 19 | Yes | `AuthClientProvider`, `useAuthClient`, `useAuthClientSnapshot`, `AuthProvider`, `AuthContext`, `useAuth`, `useToken`, `useUser`, `useOAuth` |
| `@abeta.dev/auth` | React 18 & 19 | Yes | Full barrel: core engine, React hooks/providers, PKCE utilities, brand icons, `useClickBackpressure`, and UI components (`AuthCard`, `LoginForm`, `SignUpForm`, `ForgotPasswordForm`, `OtpForm`, `OAuthButton`, `OAuthButtonGroup`) |
| `@abeta.dev/auth/core/use-click-backpressure` | React 18 & 19 | Yes | Standalone `useClickBackpressure` hook preventing double-submits and rapid click bursts |

---

## Quickstart

### 1. Headless `AuthClient` & `createAuthenticatedFetch` (`@abeta.dev/auth/core`)

```ts
import {
  AuthClient,
  createAuthenticatedFetch,
  type AuthClientAdapter,
  type CsrfProvider,
} from "@abeta.dev/auth/core";

const csrf: CsrfProvider = {
  async getToken(signal) {
    const res = await fetch("https://api.example.com/auth/csrf", {
      credentials: "include",
      signal,
    });
    const { token } = (await res.json()) as { token: string };
    return token;
  },
};

declare const adapter: AuthClientAdapter;

export const authClient = new AuthClient({
  adapter,
  csrf,
  refreshThresholdMs: 60_000,
});

// Guarded bearer transport locked to a single backend origin with 1 eligible retry
export const api = createAuthenticatedFetch(authClient, "https://api.example.com");

await authClient.bootstrap();

const response = await api.fetch("/v1/orders", {
  method: "GET",
  isAccessExpired: (res) => res.status === 401 && res.headers.get("x-auth-code") === "ACCESS_EXPIRED",
  replay: () => ({ method: "GET" }),
});
```

### 2. React Subscription with `AuthClientProvider` (`@abeta.dev/auth/react`)

```tsx
"use client";

import * as React from "react";
import { AuthClientProvider, useAuthClientSnapshot } from "@abeta.dev/auth/react";
import { authClient } from "./auth-client";

function SessionGate({ children }: { children: React.ReactNode }) {
  const snapshot = useAuthClientSnapshot();

  if (snapshot.status === "restoring") return <p>Checking session...</p>;
  if (snapshot.status !== "authenticated") return <p>Please sign in.</p>;

  return <>{children}</>;
}

export function AppRoot({ children }: { children: React.ReactNode }) {
  return (
    <AuthClientProvider client={authClient}>
      <SessionGate>{children}</SessionGate>
    </AuthClientProvider>
  );
}
```

### 3. Drop-In Authentication UI Forms (`@abeta.dev/auth`)

Use the pre-built accessible forms (`AuthCard`, `LoginForm`, `SignUpForm`, `OtpForm`, `OAuthButtonGroup`) inside `AuthProvider`:

```tsx
"use client";

import {
  AuthProvider,
  AuthCard,
  LoginForm,
  SignUpForm,
  OtpForm,
  OAuthButtonGroup,
  MockAuthAdapter,
} from "@abeta.dev/auth";

const adapter = new MockAuthAdapter();

export function SignInPage() {
  return (
    <AuthProvider adapter={adapter}>
      {/* All-in-one tabbed card with OAuth + Sign In / Sign Up / Forgot Password / OTP */}
      <AuthCard
        initialMode="signIn"
        providers={["google", "linkedin"]}
        onSuccess={(session) => console.log("Signed in:", session.user.email)}
      />
    </AuthProvider>
  );
}

// Or compose individual primitives directly inside <AuthProvider>:
export function CustomAuthFlows() {
  return (
    <AuthProvider adapter={adapter}>
      <OAuthButtonGroup providers={["google", "linkedin", "github"]} layout="grid" />
      <LoginForm showRememberMe showForgotPassword />
      <SignUpForm termsUrl="/terms" privacyUrl="/privacy" />
      <OtpForm email="user@example.com" length={6} />
    </AuthProvider>
  );
}
```

---

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

---

## Documentation & Ecosystem

- **Interactive Storybook**: [https://abeta-dev.github.io/react-libs/](https://abeta-dev.github.io/react-libs/)
- **LLM / AI Agent Reference (`llms.txt`)**: [https://abeta-dev.github.io/react-libs/llms.txt](https://abeta-dev.github.io/react-libs/llms.txt)
- **Source & Issues**: [github.com/Abeta-dev/react-libs](https://github.com/Abeta-dev/react-libs)
- **Sibling Packages**: `@abeta.dev/ui` · `@abeta.dev/india` · `@abeta.dev/talent`

## License

MIT © [abeta-dev](./LICENSE)
