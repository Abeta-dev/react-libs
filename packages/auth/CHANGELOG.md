# Changelog

All notable changes to `@abeta.dev/auth` are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this package adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.22.0] - 2026-11-23

### Changed
- Migrated `LoginForm`, `SignUpForm`, `ForgotPasswordForm`, `OtpForm`, and `OAuthButton` from hardcoded indigo shades to semantic design tokens (`bg-primary`, `text-primary`, `focus:border-primary`, `ring-ring`) enforced by ESLint `design-tokens` rules.
- Deduplicated `"use client"` banners in `dist/react.{js,cjs}` via `tsup` `onSuccess` hook.

## [0.21.0] - 2026-11-20

### Changed
- Synchronized package version to `0.21.0` with the monorepo release.
- Added high-intent npm discovery keywords (`react-19`, `headless`, `cookie-auth`, `csrf`, `typescript`, `abeta`), `homepage`, `bugs`, `engines` (`node >=20.0.0`), `LICENSE`, and excluded sourcemaps from published tarballs.
- Expanded `README.md` with entry-point matrix, quickstart examples for headless `AuthClient`, `createAuthenticatedFetch`, `AuthClientProvider`, and drop-in auth UI forms while preserving all security model and adapter contract documentation verbatim.

## [0.20.0] - 2026-11-10

### Changed
- Domain and author metadata transition to `abeta-dev <contact@abeta.dev>`.
- Version bumped to 0.20.0 in synchronization with the monorepo release.

## [0.3.1] - 2026-09-17

### Changed
- Updated repository metadata casing to match GitHub organization for provenance verification.

## [0.3.0] - 2026-09-17

### Added
- Added a versioned headless `AuthClient` for a single cookie-backed backend, including login, pending activation, invitation, password lifecycle, bootstrap, refresh, logout, revocation, capability discovery, and React subscription bindings.
- Added guarded authenticated fetch with backend-origin enforcement and one eligible replay after an expired-access response.

### Security
- Access credentials remain in memory by default; optional persistence is explicitly injected and refresh credentials are never modeled as persisted client state.
- Added one-flight refresh, epoch guards, cross-tab invalidation hooks, malformed-session rejection, and fail-closed handling for ambiguous cookie refresh outcomes.

## [0.2.2] - 2026-09-17

### Changed
- Added explicit package build lifecycle hooks and npm provenance configuration for the independently published workspace artifact.
- Established release verification that requires the root package to consume this exact version before it can publish.

## [0.2.1] - 2026-09-17

### Changed
- Published the backend-agnostic authentication workspace baseline used by `@abeta.dev/react-libs`.
