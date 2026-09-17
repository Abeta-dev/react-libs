# Migration Guide: Upgrading to v0.15.1

This guide details architectural evolutions, security hardening, and migration steps for upgrading to `@abeta.dev/react-libs` v0.15.1 and `@abeta.dev/auth` v0.3.0.

---

## Upgrading to v0.15.1

### GitHub installation without an npm registry dependency

Install the root package from an immutable Git commit (or the `v0.15.1` tag once it exists). The root distribution now contains the `@abeta.dev/react-libs/auth` implementation, so consumers must import that root subpath rather than declaring `@abeta.dev/auth` separately:

```json
{
  "dependencies": {
    "@abeta.dev/react-libs": "github:Abeta-dev/react-libs#<immutable-v0.15.1-commit>"
  }
}
```

```ts
import { AuthClient, createAuthenticatedFetch } from '@abeta.dev/react-libs/auth';
```

The standalone `@abeta.dev/auth@0.3.0` workspace package remains independently publishable for registry consumers. Do not add it to a Git-installed root consumer: npm cannot resolve a workspace subdirectory from a Git dependency and the root package intentionally has no runtime dependency on the registry artifact.

---

## Upgrading to v0.15.0

### 1. Headless Cookie-Backed Auth Client

The new headless client is available from `@abeta.dev/auth/core`, with React bindings from `@abeta.dev/auth/react`. Existing form and `AuthAdapter` APIs remain available; applications only need to migrate when adopting the new one-backend, HttpOnly-cookie session model.

Refresh credentials are intentionally absent from client state. Keep access tokens in memory, implement cookie-backed refresh in the application adapter, and provide CSRF headers for unsafe auth operations. See [`packages/auth/README.md`](./packages/auth/README.md) for the adapter contract and security invariants.

---

## Upgrading to v0.14.2

### 1. Direct Backpressure Hook Re-Export
`useClickBackpressure` is now exported directly from the canonical `@abeta.dev/react-libs` root and `src/hooks/use-click-backpressure.ts`. If your UI components imported this hook from domain subpaths, you may now consume it directly from `@abeta.dev/react-libs`.

### 2. Zero Error Manipulation & Raw Error Access
In accordance with zero error manipulation standards, underlying error causes are now preserved via `AuthError.originalError` and ES2022 `options.cause`. In `AuthContextValue`, `rawError?: unknown` is exposed alongside formatted error messages for uncompromised debugging fidelity.

---

## Upgrading to v0.14.0

### 1. OAuth PKCE and State Nonce Support
The OAuth integration now generates RFC 7636 PKCE `code_challenge` / `code_verifier` pairs and CSRF `state` nonces by default using Web Crypto API. If your custom backend adapter receives OAuth options, inspect the optional `state` and `codeChallenge` parameters:
```tsx
const adapter: AuthAdapter = {
  // ...
  signInWithOAuth: async (provider, options) => {
    // options?.state - cryptographically generated state nonce
    // options?.codeChallenge - SHA-256 code challenge
    // options?.redirectUrl - validated redirect URL (non-http schemes rejected)
  },
};
```

### 2. Form Error Association & Accessible Tab Navigation
All auth forms (`LoginForm`, `SignUpForm`, `ForgotPasswordForm`, `OtpForm`, `AuthCard`) now strictly adhere to WCAG 2.2 Level A/AA:
- Inputs are dynamically coupled to error alerts via `React.useId()`, `aria-describedby`, and `aria-invalid`.
- `AuthCard` implements semantic `role="tablist"` and `role="tab"` navigation; switching tabs automatically clears lingering validation errors.
- Password strength meter uses `role="meter"` with ARIA range and textual state attributes.

### 3. Strict `exactOptionalPropertyTypes: true` Compliance (ADR 0007)
The `TokenManagerOptions` interface has been updated so all optional properties permit `undefined`:
```tsx
export interface TokenManagerOptions {
  refreshThresholdMs?: number | undefined;
  storage?: TokenStorage | undefined;
  tokenStorageKey?: string | undefined;
  refreshTokenStorageKey?: string | undefined;
  onSessionRefreshed?: ((session: AuthSession) => void) | undefined;
  onSessionExpired?: ((error: unknown) => void) | undefined;
}
```

### 4. Tailwind v4 Styles for Monorepo Packages
If you consume `@abeta.dev/auth` standalone in an application using Tailwind CSS v4, ensure you import `@abeta.dev/react-libs/style.css` (which contains compiled styles for all auth and UI components) or add `@source` pointing to the package in your CSS bundle.

---

## Upgrading to v0.13.0

### 1. Turborepo Monorepo Architecture & Backend-Agnostic Auth UI
Authentication components are now provided via Turborepo monorepo workspace `@abeta.dev/auth` or via zero-overhead subpath export `@abeta.dev/react-libs/auth`:
```tsx
// Using standalone package:
import { LoginForm, OAuthButtonGroup, TokenManager } from '@abeta.dev/auth';

// Or using core subpath:
import { LoginForm, OAuthButtonGroup, TokenManager } from '@abeta.dev/react-libs/auth';
```
Any backend (Supabase, Firebase, custom REST/GraphQL, Next.js Auth) can be plugged in by implementing the `AuthAdapter` contract.

### 2. Async Backpressure & Click Debouncing on `Button`
The core `<Button />` primitive now automatically enforces click debouncing (default: `1` second cooldown) and async in-flight promise backpressure to prevent double clicks and duplicate API requests:
```tsx
import { Button } from '@abeta.dev/react-libs';

// Default: 1 second debounce cooldown + async in-flight backpressure
<Button onClick={asyncSubmit}>Submit</Button>

// Custom debounce duration (in seconds):
<Button debounceSec={2.5} onClick={handleAction}>Save</Button>

// Disable debouncing for continuous rapid actions (zoom, rotate, pagination, toggles):
<Button debounceSec={false} onClick={handleNextPage}>Next Page</Button>
```

### 3. Standalone `useClickBackpressure` Hook
You can also apply leading-edge click debouncing and promise backpressure to arbitrary event handlers:
```tsx
import { useClickBackpressure } from '@abeta.dev/react-libs';

const { execute, isPending } = useClickBackpressure(handleSave, {
  debounceSec: 1.5,
  onBlocked: (reason) => console.warn(`Action blocked due to ${reason}`),
});
```

---

## Upgrading to v0.12.0

### 1. Package Rebrand to `@abeta.dev/react-libs`
All packages, documentation, and repository URLs have been standardized to `@abeta.dev/react-libs` and `abeta.dev`:
```bash
npm install @abeta.dev/react-libs
```

### 2. Multi-Tenant Isolated Blob Storage Client
`src/lib/blob-storage.ts` now provides `BlobStorageClient` and `createBlobStorageClient` to prevent cross-tenant SSR pollution:
```tsx
import { createBlobStorageClient, BlobStorageClient } from '@abeta.dev/react-libs';

// Create isolated client instances per-request or per-tenant:
const client = createBlobStorageClient({
  apiBase: 'https://api.vendorportal.com',
  token: tenantJwtToken,
});
const { url } = await client.uploadFile(file, 'invoices');
```
*Note: Top-level helper functions (`uploadFileToStorage`, `downloadFileFromStorage`, `fetchBlobStorageConfig`, etc.) remain fully supported for backward compatibility.*

### 3. Chart CSS Security Sanitization
`ChartStyle` in `src/components/ui/data-display/chart.tsx` now sanitizes chart IDs, CSS custom property keys, and theme colors. If you pass dynamic colors from untrusted user inputs, use `sanitizeCssColor`:
```tsx
import { sanitizeCssColor } from '@abeta.dev/react-libs';

const safeColor = sanitizeCssColor(untrustedUserColorInput);
```

### 4. AnalyticsQueue SPA Lifecycle Cleanup
`AnalyticsQueue.destroy()` now cleans up all bound event listeners on `window` and `document` (`online`, `pagehide`, `beforeunload`, `visibilitychange`), preventing SPA memory leaks across unmounts.

---

## Overview of Architectural Changes

In v0.1.0, `@abeta.dev/react-libs` achieves full domain neutralization, minimal bundle footprint, and strict React Server Components (RSC) purity:
1. **Dedicated Domain Subpath**: Indian regional and compliance logic has been moved from root and `/utils` into a dedicated subpath: `@abeta.dev/react-libs/india`.
2. **Pure RSC `/utils`**: The `@abeta.dev/react-libs/utils` entry point exports pure utilities with zero DOM, browser, or React dependencies.
3. **Pure Analytics Engine vs Client React Subpath**: `@abeta.dev/react-libs/analytics` exports the pure headless engine, queue, and adapters (zero React hooks, zero directives, RSC-safe). React components and hooks (`AnalyticsProvider`, `useAnalytics`, `TrackArea`, `PageViewTracker`) are isolated in `@abeta.dev/react-libs/analytics/react` with a `'use client'` boundary.
4. **Optional Peer Dependencies**: Heavy libraries (`recharts`, `react-pdf`, `xlsx`, `jspdf`, `canvas-confetti`, etc.) are declared as optional peer dependencies.

---

## 1. Indian Domain & Compliance Logic Migration

All Indian-specific validators, tax calculations, and regional constants are isolated in `@abeta.dev/react-libs/india`.

### Before (pre-0.1.0):
```tsx
// Deprecated: imports from root or /utils
import { 
  validateGSTIN, 
  validatePAN, 
  validateIFSC, 
  validateFSSAI, 
  validatePincode, 
  INDIA_STATES, 
  INDIA_CITIES 
} from '@abeta.dev/react-libs';
// or
import { validateGSTIN } from '@abeta.dev/react-libs/utils';
```

### After (v0.1.0):
```tsx
// 1. Pure domain validators, tax calculations, and datasets (Server-safe, Edge-safe, Node-safe):
import { 
  validateGSTIN, 
  validatePAN, 
  validateIFSC, 
  validateFSSAI, 
  validatePincode, 
  calculateGSTSplit, 
  calculateTDS,
  INDIA_STATES, 
  INDIA_CITIES,
  INDIAN_LANGUAGES,
  formatLakhs,
  formatCrores
} from '@abeta.dev/react-libs/india';

// 2. Interactive React UI components ('use client' bounded):
import { AmountSummaryCardIndia } from '@abeta.dev/react-libs/india/react';
```

---

## 2. Purity of `@abeta.dev/react-libs/utils`

`@abeta.dev/react-libs/utils` is now strictly server-safe and contains zero browser DOM references (`window`, `document`, `Blob`).

- If your application imported `downloadFileSecurely` or `exportData` from `@abeta.dev/react-libs/utils`, update the import to root `@abeta.dev/react-libs`:

```tsx
// Before (pre-0.1.0)
import { downloadFileSecurely, exportData } from '@abeta.dev/react-libs/utils';

// After (v0.1.0)
import { downloadFileSecurely, exportData } from '@abeta.dev/react-libs';
```

---

## 3. Analytics Subpath Migration (Pure vs React Boundary)

Analytics functionality is cleanly partitioned between pure headless telemetry and React bindings:

- **Server-Safe Telemetry Engine (`@abeta.dev/react-libs/analytics`)**:
  Contains zero React code and zero `"use client"` directives. Completely safe to import in RSC, background tasks, or server runtimes.
  ```tsx
  import { createAnalyticsEngine, ConsoleAdapter, HttpAdapter } from '@abeta.dev/react-libs/analytics';
  ```

- **React Client Context & Hooks (`@abeta.dev/react-libs/analytics/react`)**:
  Contains `"use client"` bounded provider, hooks, and tracker components.
  ```tsx
  import { AnalyticsProvider, useAnalytics, TrackArea, PageViewTracker } from '@abeta.dev/react-libs/analytics/react';
  ```

---

## 4. Optional Peer Dependencies

To keep the core bundle lightweight and eliminate dependency bloat, heavy visualization and specialized packages are now declared as **optional peer dependencies**.

If you use any of the following features, ensure the corresponding peer package is installed in your project:

| Feature / Component | Required Peer Dependency | Installation Command |
|---|---|---|
| `ChartContainer`, `ChartTooltip`, `ChartLegend` | `recharts` | `npm i recharts` |
| `PdfViewer` (`@abeta.dev/react-libs/pdf`) | `react-pdf` | `npm i react-pdf` |
| Export to Excel (`exportData({ format: 'xlsx' })`) | `xlsx` | `npm i xlsx` |
| Export to PDF (`exportData({ format: 'pdf' })`) | `jspdf`, `jspdf-autotable` | `npm i jspdf jspdf-autotable` |
| Confetti interactions (`SuccessMicroInteraction`) | `canvas-confetti` | `npm i canvas-confetti @types/canvas-confetti` |
| `Carousel` | `embla-carousel-react` | `npm i embla-carousel-react` |
| `Command` (command palette dialog) | `cmdk` | `npm i cmdk` |
| `Drawer` | `vaul` | `npm i vaul` |
| `Calendar`, `DateRangePicker` | `react-day-picker` | `npm i react-day-picker` |

---

## 5. Component API Updates

### `AmountSummaryCard`
The card now accepts dynamic, configurable tax breakdowns rather than hardcoded Indian GST categories (`CGST`, `SGST`, `IGST`).

```tsx
// Before (pre-0.1.0)
<AmountSummaryCard
  subtotal={10000}
  cgst={900}
  sgst={900}
  total={11800}
/>

// After (v0.1.0)
<AmountSummaryCard
  subtotal={10000}
  taxes={[
    { label: 'State Tax', amount: 900, rate: 9 },
    { label: 'City Tax', amount: 900, rate: 9 }
  ]}
  total={11800}
/>
```

> **Tip for India GST apps**: Use `AmountSummaryCardIndia` from `@abeta.dev/react-libs/india/react` which automatically formats GST splits:
> ```tsx
> import { AmountSummaryCardIndia } from '@abeta.dev/react-libs/india/react';
> ```

### `SalaryRangeDisplay`
Deprecated `minLakhs`, `fixedLakhs`, and `esopsLakhs` props have been replaced with standard numeric props and configurable currency:

```tsx
// Before (pre-0.1.0)
<SalaryRangeDisplay minLakhs={20} fixedLakhs={35} esopsLakhs={10} />

// After (v0.1.0)
<SalaryRangeDisplay min={2000000} max={3500000} equity={1000000} currency="$" />
```

### `BilingualTooltip`
`BilingualTooltip` no longer bundles a hardcoded Hindi translation dictionary. Provide your translation map and target language code via props:

```tsx
// After (v0.1.0)
<BilingualTooltip
  term="Gross Revenue"
  dictionary={{ "Gross Revenue": "Ingresos Brutos" }}
  targetLanguage="es"
>
  <span>Hover me</span>
</BilingualTooltip>
```

---

## Upgrading to v0.9.0

`v0.9.0` is 100% backward-compatible with `v0.8.0` and introduces dedicated entry points and layer ordering presets:

### 1. Isolated `DataTable` Subpath (`@abeta.dev/react-libs/data-table`)

Consumers with strict bundle budgets can now import `DataTable` from its standalone subpath to isolate `@tanstack/react-table` from lighter pages:

```tsx
// Backward compatible (still supported):
import { DataTable } from "@abeta.dev/react-libs";

// Recommended for micro-bundle budgets / data dashboards:
import { DataTable } from "@abeta.dev/react-libs/data-table";
```

### 2. Standard Cascade Layer Ordering Preset

If using custom cascade layers, import or declare the standard layer sequence preset in your global stylesheet:

```css
@layer reset, base, react-libs, components, utilities, overrides;
```

---

## Upgrading to v0.11.0

`v0.11.0` is 100% backward-compatible and introduces discrete subpaths for heavy dependencies to eliminate peer dependency bundle overhead:

### 1. Isolated Subpaths for Heavy Peers

Consumers can import heavy primitives from dedicated standalone entry points:
- `@abeta.dev/react-libs/charts` (isolates `recharts`)
- `@abeta.dev/react-libs/command` (isolates `cmdk`)
- `@abeta.dev/react-libs/drawer` (isolates `vaul`)
- `@abeta.dev/react-libs/carousel` (isolates `embla-carousel-react`)
- `@abeta.dev/react-libs/calendar` (isolates `react-day-picker`)
- `@abeta.dev/react-libs/date-picker` (isolates `react-day-picker` and `date-fns`)
- `@abeta.dev/react-libs/form` (isolates `react-hook-form`)

```tsx
// Backward compatible:
import { Calendar, ChartContainer, Drawer } from "@abeta.dev/react-libs";

// Recommended for minimal bundle footprints:
import { Calendar } from "@abeta.dev/react-libs/calendar";
import { ChartContainer } from "@abeta.dev/react-libs/charts";
import { Drawer } from "@abeta.dev/react-libs/drawer";
```

### 2. Accessibility & Reduced Motion Compliance

- Added WCAG 2.3.3 reduced motion `@layer base` media query (`@media (prefers-reduced-motion: reduce)`) in `theme.css`.
- Okabe-Ito colorblind-compliant palette calibrated for `--chart-1` through `--chart-5` ($\Delta E > 35$).
- Interactive `DataTable` rows (`onRowClick`) now feature `role="button"`, `tabIndex={0}`, focus visible rings, and `Enter`/`Space` keyboard navigation.
- Carousel indicators and slider thumbs extended to 44×44px mobile touch hit targets.


