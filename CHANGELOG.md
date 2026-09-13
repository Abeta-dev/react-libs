# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.6.1] - 2026-09-13

### Fixed
- Eliminated duplicate `'use client'` directives in source files (`Button`, `Dialog`, `Input`) ensuring single-directive banners across ESM and CJS bundles.
- Resolved initial render state tearing in `AnalyticsProvider` by synchronously initializing `initAnalytics` in `useState` lazy initializer with zero render-time ref mutations for full React 19 compiler compliance.
- Replaced unsafe `any` casting in test DOMMatrix polyfill (`src/test/setup.ts`) to satisfy strict ESLint rules (`--max-warnings 0`).
- Exported `Sonner` component alias from `@umesh0492/react-libs` root barrel to guarantee 100% symbol parity with `README.md`.

### Security
- Hardened `scripts/verify-release-version.mjs` to match strictly against topmost `CHANGELOG.md` release to prevent historical version rollback bypasses.
- Hardened `scripts/check-exports.mjs` to assert leading `export` keywords, blocking commented-out exports from passing verification.
- Enforced non-zero CI exit on test failures in `scripts/generate-performance-report.mjs` so benchmark runners cannot swallow errors.
- Expanded `scripts/verify-directives.mjs` to inspect all 20 client entries and 6 server entries across both ESM (`.js`) and CJS (`.cjs`) outputs, asserting at most one directive on Line 1 and zero leaks in server modules.
- Hardened `scripts/inventory-symbols.mjs` and `scripts/docs-match-tree.mjs` with an automated `verifyReadmeComponents()` gate cross-referencing all 71 documented components in `README.md` against the exported AST symbol tree.
- Synchronized `.github/workflows/publish.yml` with the complete 13-step CI quality and truth gate suite prior to package distribution.

### Changed
- Tightened per-component bundle size budgets in `scripts/check-bundle-size.mjs` (`button`: 8 KB, `dialog`: 15 KB, `card`: 8 KB, `badge`: 6 KB, `input`: 6 KB) and introduced a dedicated budget for `@umesh0492/react-libs/analytics/react` (35 KB raw, 10 KB gzip).

## [0.6.0] - 2026-09-11

### Added
- Dedicated client subpaths `@umesh0492/react-libs/button`, `@umesh0492/react-libs/dialog`, `@umesh0492/react-libs/card`, `@umesh0492/react-libs/badge`, `@umesh0492/react-libs/input` (`Button`, `Dialog`, `Card`, `Badge`, `Input`) for fine-grained per-component tree-shaking with dual ESM/CJS exports and TypeScript definitions.
- Automated per-entry bundle size verification budgets in `scripts/check-bundle-size.mjs` ensuring component subpaths remain under strict budgets (`dist/button.js` <= 15 KB raw, measured 2.55 KB raw).
- Dedicated client subpath `@umesh0492/react-libs/analytics/react` (`AnalyticsProvider`, `useAnalytics`, `TrackArea`, `PageViewTracker`) with explicit `'use client'` directive boundary.
- Pure headless domain isolation for `@umesh0492/react-libs/analytics` with zero React hooks, zero client directives, and full server runtime safety.

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
- Dedicated pure subpath `@umesh0492/react-libs/utils` for domain-neutral utilities
- Dedicated subpaths for `@umesh0492/react-libs/india` (pure domain tax/compliance/locations) and `@umesh0492/react-libs/india/react` (interactive AmountSummaryCardIndia component)
- Pluggable client analytics library (`@umesh0492/react-libs/analytics`) with console, Google Analytics, HTTP, and Mixpanel adapters
- Standalone Tailwind CSS stylesheet exported via `./style.css`
- PDF viewer component (`@umesh0492/react-libs/pdf`) with optional peer dependencies
- Toast notification system (`@umesh0492/react-libs/hooks/use-toast`)

### Known limitations
- Root index bundle is ~425 KB raw due to complete UI primitive inclusion; subpath imports should be preferred for lean bundles
- PDF viewer requires optional peer dependencies (react-pdf, pdfjs-dist) to be installed separately by consumers
- Analytics engine persists offline events in browser localStorage which is limited by browser storage quotas
