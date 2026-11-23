# Changelog — `@abeta.dev/analytics`

All notable changes to `@abeta.dev/analytics` are documented here.

## [0.22.0] - 2026-11-23

### Added
- Extracted `@abeta.dev/analytics` into a dedicated standalone scoped package with two-tier RSC/client isolation:
  - `@abeta.dev/analytics`: pure Node/RSC universal core (`AnalyticsEngine`, `initAnalytics`, `getAnalyticsEngine`, `SessionManager`, `AnalyticsQueue`, `DomTracker`, `ConsoleAdapter`, `HttpAdapter`, `GoogleAnalyticsAdapter`, `MixpanelAdapter`) with zero React dependencies.
  - `@abeta.dev/analytics/react`: `'use client'` React 18/19 bindings (`AnalyticsProvider`, `useAnalytics`, `TrackArea`, `PageViewTracker`).
- Optional `react` and `react-dom` peer dependencies so backend and RSC consumers install zero UI bloat.
- Dual ESM/CJS builds with complete `.d.ts` / `.d.cts` TypeScript declarations verified by `@arethetypeswrong/cli` (zero `--ignore-rules`).
