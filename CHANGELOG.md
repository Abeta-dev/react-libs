# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.14.0] - 2026-09-17

### Added
- Exported `generateCodeChallenge`, `generateCodeVerifier`, and `generateOAuthState` in `@abeta.dev/auth` (`packages/auth/src/core/pkce.ts`) implementing RFC 7636 SHA-256 PKCE challenge generation and cryptographically secure state nonces for OAuth flows.
- Exported `GitHubIcon`, `AppleIcon`, and `MicrosoftIcon` SVG branding components in `@abeta.dev/auth` for OAuth authentication buttons.
- Added comprehensive engineering quality scorecard `QUALITY_STANDARDS_AND_AUDIT_SCORECARD.md` covering 26 automated quality parameters across security, architecture, accessibility, concurrency, and testing rigor.

### Changed
- Expanded automated test suite from 1,346 to 1,463 passing tests across 153 test suites with zero failures (100% pass rate).
- Integrated `@abeta.dev/auth` test suites directly into root `vitest.config.ts` and GitHub Actions CI pipelines.
- Relaxed Node engine requirement in `package.json` to `node >= 20.0.0` and aligned peer dependencies across workspace packages to React `^18.2.0 || ^19.0.0`.
- Configured Tailwind CSS v4 `@source` scanner in `src/styles/tailwind-bundle.css` to ingest `@abeta.dev/auth` component styles, compiling complete auth utility classes into the unified stylesheet bundle.
- Synchronized Turborepo task graph so root build topologically depends on `@abeta.dev/auth` build, and ordered npm publication in `.github/workflows/publish.yml`.

### Fixed
- Fixed authentication bypass vulnerability in `MockAuthAdapter.refreshToken()` by enforcing active token validation and rotation (RTR) and rejecting invalid tokens with `AuthError('Invalid refresh token')`.
- Hardened OAuth and form security by validating redirect URL origins against open redirects and sanitizing terms and privacy URLs against `javascript:` injection (CWE-79).
- Hardened `TokenManager` concurrency: synchronized proactive background refresh with consumer requests via shared mutex, clamped timer intervals against 32-bit integer overflow, and integrated `AbortController` on sign-out to prevent post-logout session resurrection.
- Hardened `useClickBackpressure` hook: closed TOCTOU race window with synchronous lock acquisition before handler execution, decoupled cancellation state per invocation, and ensured ref purity for React 19 Concurrent Mode.
- Fixed WCAG 2.2 Level A/AA violations across all auth forms (`LoginForm`, `SignUpForm`, `ForgotPasswordForm`, `OtpForm`, `AuthCard`): added unique `React.useId()` dynamic IDs, linked error banners via `role="alert"` and `aria-describedby`, added `role="meter"` to password strength indicators, grouped OTP inputs with `autocomplete="one-time-code"`, and expanded password visibility toggle touch target to 44×44px with high-contrast focus rings.
- Purged all synthetic smoke tests and generator script `scripts/generate-smoke-tests.mjs`, replacing them with genuine DOM mounting and behavioral assertions across 15 component test suites.
- Restored ADR 0007 compliance (`exactOptionalPropertyTypes: true`) across `TokenManagerOptions` in `@abeta.dev/auth`.

## [0.13.0] - 2026-09-16

### Added
- Exported `@abeta.dev/react-libs/auth` subpath export in root package.json connecting to the `@abeta.dev/auth` monorepo package with zero-overhead re-export.
- Exported `useClickBackpressure` hook in `@abeta.dev/react-libs` (`src/hooks/use-click-backpressure.ts`) providing leading-edge click debouncing, configurable cooldown windows, and async promise in-flight backpressure.
- Added `debounceSec` and `onBlocked` props to `Button` primitive (`src/components/ui/forms/button.tsx`) defaulting to 1s debouncing cooldown and async backpressure while supporting custom intervals or disabling via `debounceSec={false}`.

### Changed
- Migrated codebase architecture to Turborepo with npm workspaces and `turbo.json` task orchestration.
- Expanded automated test suite from 1,282 to 1,346 passing tests across 144 test suites (100% pass rate).

### Fixed
- Fixed double-triggering on rapid user clicks and duplicate async in-flight mutations across all action buttons and auth forms.
- Prevented unneeded React state updates and test `act(...)` warnings on synchronous button clicks by isolating pending state tracking to async Promise execution.
- Added explicit `debounceSec={false}` to high-frequency image viewer, PDF viewer, copy button, and PWA guide controls to preserve rapid multi-click operations.

## [0.12.0] - 2026-09-16

### Added
- Exported `sanitizeCssColor` utility in `@abeta.dev/react-libs` (`src/components/ui/data-display/chart.tsx`) mitigating CSS injection and style breakout attacks (CWE-79).
- Exported instantiable `BlobStorageClient` and `createBlobStorageClient` factory in `@abeta.dev/react-libs` (`src/lib/blob-storage.ts`) providing isolated storage configuration and eliminating cross-tenant pollution in SSR environments.

### Changed
- Expanded automated test suite from 1,255 to 1,282 passing tests across 133 test suites (100% pass rate).

### Fixed
- Hardened `ChartStyle` in `src/components/ui/data-display/chart.tsx` by sanitizing chart IDs, CSS custom property keys, and theme color values against tag closing and CSS breakout sequences.
- Fixed single-page application (SPA) memory leak in `AnalyticsQueue` (`src/lib/analytics/queue.ts`) by binding lifecycle listeners (`online`, `pagehide`, `beforeunload`, `visibilitychange`) to class instance properties and detaching them in `destroy()`.
- Purged all legacy repository URLs, copyright notices, and author handles across `package.json`, `LICENSE`, `eslint.config.mjs`, issue templates, and storybook files, standardizing exclusively on `abeta.dev`.

## [0.11.0] - 2026-09-15

### Added
- Dedicated standalone subpaths for heavy peer dependencies: `@abeta.dev/react-libs/charts`, `@abeta.dev/react-libs/command`, `@abeta.dev/react-libs/drawer`, `@abeta.dev/react-libs/carousel`, `@abeta.dev/react-libs/calendar`, `@abeta.dev/react-libs/date-picker`, and `@abeta.dev/react-libs/form`.
- Colorblind-compliant Okabe-Ito data visualization palette for `--chart-1` through `--chart-5` in light and dark modes.
- Global WCAG 2.3.3 reduced motion compliance media query in `src/styles/theme.css` resetting animation and transition durations.
- Interactive keyboard navigation on `DataTable` clickable rows supporting keyboard row activation.
- Expanded visual and keyboard accessibility smoke regression test suite in `src/__tests__/visual-smoke.test.tsx`.

### Changed
- Expanded automated test suite from 1,048 to 1,255 passing tests across 133 test suites (100% pass rate).
- Elevated test coverage across analytics subsystem (`engine.ts`, `queue.ts`, `session.ts`, `dom-tracker.ts`, and adapters) to over 90%.

### Fixed
- Fixed `Slider` component prop spreading under strict `"exactOptionalPropertyTypes": true` by conditionally passing `onValueChange` and `aria-readonly`.
- Fixed static type narrowing in `useAnalytics` test suite by leveraging standard `renderHook` from `@testing-library/react`.
- Added formula injection sanitization (CWE-1236) in `export-utils.ts` and path traversal mitigation (CWE-22) in `blob-storage.ts`.

## [0.10.0] - 2026-09-15

### Changed
- Elevated core repository positioning to Enterprise B2B Design System & Application Engine for React 19 (vendor portals, compliance workflows, audit telemetry, and offline PWAs).
- Deepened 20 component test suites across overlays, forms, navigation, feedback, and mobile PWA, expanding test suite from 890 to 1,048 passing unit tests (85.08% line coverage, 75.59% branch coverage).
- Untracked built distribution files from Git version control, restored `.gitignore` exclusion, and verified `prepare` and `prepack` lifecycle hooks for clean npm distribution.

### Added
- Automated visual and layout smoke regression test suite asserting visual tokens, dark mode container scoping, and responsive mobile navigation.
- Package script `test:visual` and integrated CI Visual & Layout Smoke Regression Gate in GitHub Actions.

### Fixed
- Hardened `useOfflineQueue` with automated sync failure recovery and retry count checks, preventing unhandled mutation rejections from deadlocking the offline sync queue.
- Added defensive parameter sanitization across all 18+ generic and Indian statutory form validators (`validateEmail`, `validatePhone`, `validateGSTIN`, `validatePAN`, etc.) to safeguard against `null`, `undefined`, and non-string inputs.
- Hardened `DataTable` pagination calculations with defensive page size clamping (`Math.max(1, pageSize)`), eliminating potential infinite page calculation loops.
- Validated URL schemes in `PdfViewer` print handler to reject unsafe URI schemes (such as `javascript:` execution).
- Resolved WCAG 2.1 AA contrast ratio failure for `--destructive` semantic color tokens in light mode by deepening crimson hue to `#dc2626` (contrast >= 4.5:1).
- Restored keyboard focus visibility rings on interactive elements in `SkillTagCloud` and `NavigationMenu`.
- Added uncontrolled input state support to `SearchField` and `AsyncSelect` components.
- Rebuilt `calendar.test.tsx` and expanded `pdf-viewer.test.tsx` interaction test suites, lifting `pdf-viewer.tsx` test coverage from 30% to 95.31%.

## [0.9.0] - 2026-09-15

### Added
- Dedicated standalone subpath `@abeta.dev/react-libs/data-table` (`DataTable`) isolating `@tanstack/react-table` for data-heavy pages.
- Pre-configured CSS cascade layer ordering preset in `src/styles/theme.css` (`@layer reset, base, react-libs, components, utilities, overrides;`).
- Complete Storybook coverage across 100% of UI components (29 new story files for feedback, mobile PWA, and complex data-display primitives).
- Enterprise full-application integration recipe (`docs/recipes/full-app-integration.md`) covering React 19 / Next.js 15, multi-brand theming, and composite workflows.
- Continuous automated visual regression testing architecture guide (`docs/recipes/visual-regression-testing.md`) with Playwright snapshot runner and Chromatic CI review gates.

## [0.8.0] - 2026-09-14

### Added
- Bilingual form validation system (`ValidationLanguage = 'en' | 'hi'`) with Hindi localized message dictionaries (`VALIDATION_MESSAGES_HI`, `VALIDATION_MESSAGES_IN_HI`).
- Generic form validators: `cleanPhoneNumber`, `isValidEmail`, `isValidPhone`, `validatePassword`, `validatePositiveNumber`, `validateDateRange`, `validateTimeRange`, and `validateRequired`.
- India WhatsApp utilities: `generateWhatsAppUrl`, `generateWhatsAppAppUrl`, `openWhatsApp`, and template interpolator `formatWhatsAppTemplate`.
- Cross-platform runtime detection and device interaction helpers: `isIOS`, `isAndroid`, `isMobile`, `isStandalone`, `platformName`, `hasTouch`, `triggerHaptic`, and `nativeShare`.
- Mobile and PWA hooks: `usePlatform`, `usePWAInstall`, and `useOfflineQueue` (IndexedDB + localStorage mutation queue with retry limits and automatic online flush).
- Mobile and PWA components: `InstallPwaBanner`, `AppSplashScreen`, and `MobileBottomNav`.

## [0.7.0] - 2026-09-13

### Changed
- Adopted `"exactOptionalPropertyTypes": true` across the entire codebase (`tsconfig.json`) per ADR 0007, resolving all 28 type discrepancies across headless wrappers, DOM fetch calls, and internal interface definitions.
- Expanded ESLint scope to cover 100% of repository assets (including tests, stories, and build scripts) with zero warnings (`eslint . --max-warnings 0`).
- Documented 5 standalone primitive subpaths (`@abeta.dev/react-libs/button`, `@abeta.dev/react-libs/dialog`, `@abeta.dev/react-libs/card`, `@abeta.dev/react-libs/badge`, `@abeta.dev/react-libs/input`) in the README subpath matrix and clarified modern ESM tree-shaking boundaries.
- Streamlined Vitest runner concurrency in `vitest.config.ts`.
- Cleaned up redundant regex escape characters in `scripts/docs-match-tree.mjs` and `scripts/inventory-symbols.mjs`.

### Fixed
- Fixed unescaped regular expressions and unused imports across build and truth-gate scripts (`scripts/build-css.mjs`, `scripts/docs-match-tree.mjs`, `scripts/inventory-symbols.mjs`).
- Resolved Storybook accessibility issues in tabs and hover-card stories.
- Updated ADR 0007 status to "Adopted" with domain resolutions.

## [0.6.1] - 2026-09-13

### Fixed
- Eliminated duplicate `'use client'` directives in source files (`Button`, `Dialog`, `Input`) ensuring single-directive banners across ESM and CJS bundles.
- Resolved initial render state tearing in `AnalyticsProvider` by synchronously initializing `initAnalytics` in `useState` lazy initializer with zero render-time ref mutations for full React 19 compiler compliance.
- Replaced unsafe `any` casting in test DOMMatrix polyfill (`src/test/setup.ts`) to satisfy strict ESLint rules (`--max-warnings 0`).
- Exported `Sonner` component alias from `@abeta.dev/react-libs` root barrel to guarantee 100% symbol parity with `README.md`.

### Security
- Hardened `scripts/verify-release-version.mjs` to match strictly against topmost `CHANGELOG.md` release to prevent historical version rollback bypasses.
- Hardened `scripts/check-exports.mjs` to assert leading `export` keywords, blocking commented-out exports from passing verification.
- Enforced non-zero CI exit on test failures in `scripts/generate-performance-report.mjs` so benchmark runners cannot swallow errors.
- Expanded `scripts/verify-directives.mjs` to inspect all 20 client entries and 6 server entries across both ESM (`.js`) and CJS (`.cjs`) outputs, asserting at most one directive on Line 1 and zero leaks in server modules.
- Hardened `scripts/inventory-symbols.mjs` and `scripts/docs-match-tree.mjs` with an automated `verifyReadmeComponents()` gate cross-referencing all 71 documented components in `README.md` against the exported AST symbol tree.
- Synchronized `.github/workflows/publish.yml` with the complete 13-step CI quality and truth gate suite prior to package distribution.

### Changed
- Tightened per-component bundle size budgets in `scripts/check-bundle-size.mjs` (`button`: 8 KB, `dialog`: 15 KB, `card`: 8 KB, `badge`: 6 KB, `input`: 6 KB) and introduced a dedicated budget for `@abeta.dev/react-libs/analytics/react` (35 KB raw, 10 KB gzip).

## [0.6.0] - 2026-09-11

### Added
- Dedicated client subpaths `@abeta.dev/react-libs/button`, `@abeta.dev/react-libs/dialog`, `@abeta.dev/react-libs/card`, `@abeta.dev/react-libs/badge`, `@abeta.dev/react-libs/input` (`Button`, `Dialog`, `Card`, `Badge`, `Input`) for fine-grained per-component tree-shaking with dual ESM/CJS exports and TypeScript definitions.
- Automated per-entry bundle size verification budgets in `scripts/check-bundle-size.mjs` ensuring component subpaths remain under strict budgets (`dist/button.js` <= 15 KB raw, measured 2.55 KB raw).
- Dedicated client subpath `@abeta.dev/react-libs/analytics/react` (`AnalyticsProvider`, `useAnalytics`, `TrackArea`, `PageViewTracker`) with explicit `'use client'` directive boundary.
- Pure headless domain isolation for `@abeta.dev/react-libs/analytics` with zero React hooks, zero client directives, and full server runtime safety.

### Changed
- Isolated `window.history.pushState` and `window.history.replaceState` monkey-patching in `AnalyticsEngine` behind explicit opt-in (`patchHistory: true`, defaults to `false`) with full method restoration and event listener cleanup upon `destroy()`.
- Configured Storybook a11y parameters to `a11y: { test: 'error' }` in `.storybook/preview.ts` to block on accessibility violations.
- Documented `src/components/ui/__tests__/accessibility.test.tsx` (automated `axe-core` suite) as the blocking CI gate for accessibility compliance.
- Expanded `src/__tests__/ssr-smoke.test.tsx` to systematically verify server-side rendering and module directive boundaries across all `package.json` `exports` entries.
- Streamlined Vitest runner concurrency (`maxWorkers: 2`) and removed redundant `prestorybook` test execution.

### Fixed
- Migrated all hardcoded slate and indigo color classes in `AmountSummaryCard` to semantic design tokens (`text-muted-foreground`, `text-primary`, `border-border`, `bg-card`, `bg-destructive`).
- Stabilized `AnalyticsProvider` configuration equality: adapter comparison by name and stable `onError` callback reference to eliminate recreation churn.
- Eliminated state updates during render in `AnalyticsProvider` to prevent React render loops and cascading updates.
- Documented `SidebarProvider` SSR hydration contract requiring `defaultOpen` to read server cookies to prevent client hydration mismatch.

## [0.1.0] - 2026-09-09
Initial public release.

### Added
- 50+ accessible Tailwind UI components (buttons, dialogs, dropdowns, forms, layout, data display)
- Modern DataTable built on TanStack Table with filtering, pagination, and column controls
- Dual packaging: ESM and CJS builds with TypeScript .d.ts declarations
- Dedicated pure subpath `@abeta.dev/react-libs/utils` for domain-neutral utilities
- Dedicated subpaths for `@abeta.dev/react-libs/india` (pure domain tax/compliance/locations) and `@abeta.dev/react-libs/india/react` (interactive AmountSummaryCardIndia component)
- Pluggable client analytics library (`@abeta.dev/react-libs/analytics`) with console, Google Analytics, HTTP, and Mixpanel adapters
- Standalone Tailwind CSS stylesheet exported via `./style.css`
- PDF viewer component (`@abeta.dev/react-libs/pdf`) with optional peer dependencies
- Toast notification system (`@abeta.dev/react-libs/hooks/use-toast`)

### Known limitations
- Root index bundle is ~425 KB raw due to complete UI primitive inclusion; subpath imports should be preferred for lean bundles
- PDF viewer requires optional peer dependencies (react-pdf, pdfjs-dist) to be installed separately by consumers
- Analytics engine persists offline events in browser localStorage which is limited by browser storage quotas
