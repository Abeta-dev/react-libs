# @abeta.dev/analytics

Zero-bloat behavioral analytics engine for Node.js, React Server Components, and React 18/19 clients — with pluggable adapters (`ConsoleAdapter`, `HttpAdapter`, `GoogleAnalyticsAdapter`, `MixpanelAdapter`), automatic PII sanitization, offline batching queue, session tracking, and declarative React wrappers.

## Installation

```bash
npm install @abeta.dev/analytics
```

> **Zero React Bloat on the Server:** `react` and `react-dom` are **optional** peer dependencies. Backend APIs, Next.js Route Handlers, and React Server Components can import `@abeta.dev/analytics` without pulling React or DOM code.

## Entrypoints & Runtime Boundaries

| Import Path | Runtime | Exports |
| :--- | :--- | :--- |
| `@abeta.dev/analytics` | Pure Node / RSC / Universal (zero `'use client'`, zero React) | `AnalyticsEngine`, `initAnalytics`, `getAnalyticsEngine`, `SessionManager`, `generateUUID`, `AnalyticsQueue`, `DomTracker`, `ConsoleAdapter`, `HttpAdapter`, `GoogleAnalyticsAdapter`, `MixpanelAdapter`, types |
| `@abeta.dev/analytics/react` | Client (`'use client'`) | `AnalyticsProvider`, `useAnalytics`, `TrackArea`, `PageViewTracker` |

## Headless / Server / Node Usage

```ts
import { initAnalytics, ConsoleAdapter, HttpAdapter } from "@abeta.dev/analytics";

const analytics = initAnalytics({
  app: "vendor-portal",
  adapters: [
    new ConsoleAdapter(),
    new HttpAdapter({ endpoint: "https://telemetry.example.com/events" }),
  ],
  batchSize: 10,
  flushIntervalMs: 5000,
});

analytics.identify("usr_1042", { role: "procurement_lead" });
analytics.track("invoice_approved", { invoiceId: "INV-2026-042", amountInr: 149900 });
await analytics.flush();
```

## React 18/19 Client Usage

```tsx
"use client";

import { AnalyticsProvider, PageViewTracker, TrackArea, useAnalytics } from "@abeta.dev/analytics/react";
import { ConsoleAdapter } from "@abeta.dev/analytics";

function CheckoutButton() {
  const { track } = useAnalytics();
  return (
    <button onClick={() => track("checkout_submitted", { channel: "upi" })}>
      Pay via UPI
    </button>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <AnalyticsProvider config={{ app: "vendor-portal", adapters: [new ConsoleAdapter()] }}>
      <PageViewTracker route="/checkout" title="Vendor Checkout" />
      <TrackArea name="checkout_panel">
        <CheckoutButton />
        {children}
      </TrackArea>
    </AnalyticsProvider>
  );
}
```

## License

MIT © [Abeta-dev](https://github.com/Abeta-dev/react-libs)
