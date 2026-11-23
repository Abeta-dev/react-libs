---
name: react-libs-analytics
description: Use when adding behavioral analytics, telemetry adapters, PII sanitization, or React page/click tracking with @abeta.dev/analytics (v0.22.0).
---

# `@abeta.dev/analytics` (`v0.22.0`)

## Install

```bash
npm install @abeta.dev/analytics
```

## Strict RSC vs Client Boundary

- **Server / Node / RSC-Safe (`@abeta.dev/analytics`)**: zero `'use client'`, zero React runtime. Exports `AnalyticsEngine`, `initAnalytics`, `getAnalyticsEngine`, `SessionManager`, `AnalyticsQueue`, `DomTracker`, `ConsoleAdapter`, `HttpAdapter`, `GoogleAnalyticsAdapter`, `MixpanelAdapter`, and types.
- **Client Components (`@abeta.dev/analytics/react`)**: `'use client'`. Exports `AnalyticsProvider`, `useAnalytics`, `TrackArea`, and `PageViewTracker`.

## Canonical Recipes

- Headless engine: `initAnalytics({ app, adapters: [new ConsoleAdapter(), new HttpAdapter({ endpoint })] })`
- React shell: wrap app with `<AnalyticsProvider config={...}>`, track views with `<PageViewTracker />`, scope click telemetry with `<TrackArea name="...">`, and fire custom events with `useAnalytics().track(...)`.
- Never import from legacy `@abeta.dev/react-libs/analytics` in greenfield projects — use `@abeta.dev/analytics` and `@abeta.dev/analytics/react`.
