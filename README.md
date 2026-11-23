# Abeta React Ecosystem (`@abeta.dev/*`)

> **Enterprise B2B Design System, India Statutory Compliance, Talent Verification, Headless Auth, Behavioral Analytics & MCP Server for React 19 / React 18.**  
> Six modular, tree-shakeable npm packages (`@abeta.dev/ui`, `@abeta.dev/india`, `@abeta.dev/talent`, `@abeta.dev/auth`, `@abeta.dev/analytics`, `@abeta.dev/mcp`) — plus 100% backward-compatible legacy omnibus `@abeta.dev/react-libs` — built with Tailwind CSS v4, Radix UI, strict TypeScript, and explicit RSC / `'use client'` boundaries.

[![Version](https://img.shields.io/badge/version-0.22.0-blue.svg)](https://www.npmjs.com/package/@abeta.dev/ui)
[![CI](https://github.com/Abeta-dev/react-libs/actions/workflows/ci.yml/badge.svg)](https://github.com/Abeta-dev/react-libs/actions/workflows/ci.yml)
[![Tests](https://img.shields.io/badge/tests-passing-brightgreen)](#testing)
[![React](https://img.shields.io/badge/react-19-blue)](https://react.dev)
[![Tailwind](https://img.shields.io/badge/tailwind-v4-38bdf8)](https://tailwindcss.com)
[![Storybook](https://img.shields.io/badge/storybook-10.x-ff4785)](https://abeta-dev.github.io/react-libs/)
[![llms.txt](https://img.shields.io/badge/llms.txt-AI--Ready-7C3AED)](https://abeta-dev.github.io/react-libs/llms.txt)
[![OpenSSF Scorecard](https://api.scorecard.dev/projects/github.com/Abeta-dev/react-libs/badge)](https://scorecard.dev/viewer/?uri=github.com/Abeta-dev/react-libs)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

---

## Modular Package Matrix

Install only the domain slice your application requires — zero monolithic dependency bloat:

| Package | Install | RSC / Client Compatibility | What's Inside |
| :--- | :--- | :--- | :--- |
| [**`@abeta.dev/ui`**](https://www.npmjs.com/package/@abeta.dev/ui) | `npm i @abeta.dev/ui` | **RSC-safe** `./utils` · **Client** `.`, `./pdf`, `./hooks/use-toast`, micro-bundles | Complete Tailwind CSS v4 + Radix UI design system (forms, tables, dialogs, charts, hooks, formatters), isolated `PdfViewer` (`./pdf`), `@abeta.dev/ui/theme.css` (Tailwind v4 tokens), and `@abeta.dev/ui/style.css` (zero-Tailwind precompiled CSS). |
| [**`@abeta.dev/india`**](https://www.npmjs.com/package/@abeta.dev/india) | `npm i @abeta.dev/india` | **RSC & Server-Safe** `.` · **Client** `./react` | Zero-bloat Indian statutory validators (`validateGSTIN`, `validatePAN`, `validateIFSC`, `validateFSSAI`, `validatePincode`), `calculateGSTSplit` / `calculateTDS`, NPCI UPI URI engine (`generateUpiPayUri`, `validateUpiId`), Lakhs/Crores & WhatsApp utilities, plus interactive `AmountSummaryCardIndia` & `UpiQrCard` (`./react`). |
| [**`@abeta.dev/talent`**](https://www.npmjs.com/package/@abeta.dev/talent) | `npm i @abeta.dev/talent` | **Client** `.` (`'use client'`) | `ProofOfWorkCertificate` (print-ready verifiable credentials), `CheckpointRunner`, `DiagnosticQuiz`, `PipelineKanban`, `ProofOfWorkCard`, `MatchScoreGauge`, `RadarSweep`, and `SalaryRangeDisplay`. |
| [**`@abeta.dev/auth`**](https://www.npmjs.com/package/@abeta.dev/auth) | `npm i @abeta.dev/auth` | **Zero-React / Server** `./core` · **Client** `.`, `./react` | Headless `AuthClient` (in-memory access tokens, single-flight HttpOnly cookie refresh, CSRF, epoch invalidation), `createAuthenticatedFetch`, `AuthClientProvider`, `useAuthClientSnapshot`, `AuthCard`, `LoginForm`, `SignUpForm`, `OtpForm`, OAuth PKCE helpers, and `useClickBackpressure`. |
| [**`@abeta.dev/analytics`**](https://www.npmjs.com/package/@abeta.dev/analytics) | `npm i @abeta.dev/analytics` | **RSC & Node-Safe** `.` · **Client** `./react` | Zero-bloat `AnalyticsEngine`, automatic PII sanitization, offline batching queue, adapters (`ConsoleAdapter`, `HttpAdapter`, `GoogleAnalyticsAdapter`, `MixpanelAdapter`), plus React `AnalyticsProvider`, `useAnalytics`, `TrackArea`, and `PageViewTracker`. |
| [**`@abeta.dev/mcp`**](https://www.npmjs.com/package/@abeta.dev/mcp) | `npx -y @abeta.dev/mcp` | **Zero-Dep Node Stdio MCP** `.` | Offline-first Model Context Protocol server and SDK exposing 5 live tools (`abeta_list_packages`, `abeta_lookup_symbol`, `abeta_check_rsc_boundary`, `abeta_search_rag`, `abeta_traverse_context_graph`) and 4 resources for Claude, Cursor, Windsurf, and RAG/Context-Graph pipelines. |

> [!NOTE]
> **Legacy Omnibus (`@abeta.dev/react-libs`)**: `@abeta.dev/react-libs` is deprecated for new projects in favor of the modular packages above (scheduled sunset `v1.0.0`, tracked in [`deprecations.json`](./deprecations.json)), while preserving **100% backward compatibility** throughout `0.x`. See [Migration Guide: Upgrading to v0.22.0](./MIGRATION.md#upgrading-to-v0220) and [Migrating to Modular Packages](./MIGRATION.md#migrating-from-abetadevreact-libs-to-modular-packages).

---

## 30-Second Quickstarts

### 1. Next.js App Router (Tailwind CSS v4)

Install the UI and India packages (requires React 18.2+ or 19 and Node.js `>= 20.0.0`):

```bash
npm install @abeta.dev/ui @abeta.dev/india
```

Register the design tokens and Tailwind v4 `@source` directives in `app/globals.css`:

```css
@import "tailwindcss";
@import "@abeta.dev/ui/theme.css";

@source "../node_modules/@abeta.dev/ui";
@source "../node_modules/@abeta.dev/india";
```

Run pure statutory logic inside a **React Server Component** (`app/page.tsx`):

```tsx
import { calculateGSTSplit, validateGSTIN } from "@abeta.dev/india";
import { VendorCheckout } from "../components/vendor-checkout";

export default function CheckoutPage() {
  const gstin = "27AADCA1234D1Z5";
  const gstinError = validateGSTIN(gstin); // undefined when valid
  const gst = calculateGSTSplit(125000, 18, true); // Intra-state CGST + SGST

  return (
    <VendorCheckout
      gstin={gstin}
      isGstinValid={!gstinError}
      totalPayable={gst.totalPayable}
    />
  );
}
```

Render interactive primitives inside a **Client Component** (`components/vendor-checkout.tsx`):

```tsx
"use client";

import { Button, Card, CardContent, CardHeader, CardTitle } from "@abeta.dev/ui";
import { UpiQrCard } from "@abeta.dev/india/react";

export function VendorCheckout({
  gstin,
  isGstinValid,
  totalPayable,
}: {
  gstin: string;
  isGstinValid: boolean;
  totalPayable: number;
}) {
  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Vendor Settlement ({isGstinValid ? "GSTIN Verified" : "Invalid"})</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <UpiQrCard
          upiId="billing@okhdfcbank"
          payeeName="Abeta Logistics Pvt Ltd"
          amount={Math.round(totalPayable)}
          transactionNote={`GSTIN ${gstin}`}
        />
        <Button className="w-full">Confirm Payout</Button>
      </CardContent>
    </Card>
  );
}
```

### 2. Vite + React 19 (Zero-Tailwind Option)

No Tailwind CSS configuration needed — import the precompiled cascade-layered stylesheet (`@layer abeta-ui`) once in `src/main.tsx`:

```bash
npm install @abeta.dev/ui @abeta.dev/india @abeta.dev/talent
```

```tsx
// src/main.tsx
import "@abeta.dev/ui/style.css";
```

```tsx
// src/App.tsx
import { Button, Card, CardContent, CardHeader, CardTitle } from "@abeta.dev/ui";
import { UpiQrCard } from "@abeta.dev/india/react";

export function App() {
  return (
    <Card className="max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle>Instant UPI Settlement</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <UpiQrCard
          upiId="merchant@okhdfcbank"
          payeeName="Abeta Commerce Pvt Ltd"
          amount={1499}
          transactionNote="Invoice #1042"
        />
        <Button>Mark Paid</Button>
      </CardContent>
    </Card>
  );
}
```

### 3. Starter Templates & AI Coding Assistants

- **Starter Templates**:
  - [`examples/nextjs-app-router`](./examples/nextjs-app-router) — Next.js App Router + Tailwind CSS v4 + RSC `@abeta.dev/india` + Client `@abeta.dev/ui`
  - [`examples/vite-react-19`](./examples/vite-react-19) — Vite + React 19 + zero-Tailwind `@abeta.dev/ui/style.css` + `@abeta.dev/india/react` + `@abeta.dev/talent`
- **AI Coding Assistants, RAG Pipelines & External Context Graphs (Cursor, Claude Code, Copilot, Gemini CLI, LlamaIndex, LangChain, Neo4j, GraphRAG)**:
  - Concise index (`llmstxt.org`): [https://abeta-dev.github.io/react-libs/llms.txt](https://abeta-dev.github.io/react-libs/llms.txt) ([`public/llms.txt`](./public/llms.txt))
  - Complete single-file API & recipe reference: [https://abeta-dev.github.io/react-libs/llms-full.txt](https://abeta-dev.github.io/react-libs/llms-full.txt) ([`public/llms-full.txt`](./public/llms-full.txt))
  - **Pre-chunked RAG Corpus (`JSONL`)**: [https://abeta-dev.github.io/react-libs/rag-chunks.jsonl](https://abeta-dev.github.io/react-libs/rag-chunks.jsonl) — URN-linked, SHA-256-stamped records ready for direct vector DB upsert (Pinecone, Weaviate, Qdrant, pgvector) with zero scraping.
  - **External Context Graph (`JSON-LD`)**: [https://abeta-dev.github.io/react-libs/context-graph.json](https://abeta-dev.github.io/react-libs/context-graph.json) — typed nodes & edges (`packages -> subpaths -> symbols -> runtime boundaries -> deprecations -> ADRs -> skills`) keyed by canonical URNs (`urn:abeta:subpath:@abeta.dev/ui/button`, `urn:abeta:symbol:@abeta.dev/india:calculateGSTSplit`) so any app's import graph joins directly.
  - **Machine Package Registry (`JSON`)**: [https://abeta-dev.github.io/react-libs/registry.json](https://abeta-dev.github.io/react-libs/registry.json) — compact machine catalog for CLIs, MCP servers, and IDEs.
  - Interactive Storybook & Living Workflows: [https://abeta-dev.github.io/react-libs/](https://abeta-dev.github.io/react-libs/)

```ts
// Connect @abeta.dev/* into your RAG vector DB or Context Graph in 5 lines:
const chunks = (await fetch("https://abeta-dev.github.io/react-libs/rag-chunks.jsonl").then((r) => r.text()))
  .trim().split("\n").map((line) => JSON.parse(line)); // { id, urn, package, subpath, runtime, symbols, content, sha256 }

const graph = await fetch("https://abeta-dev.github.io/react-libs/context-graph.json").then((r) => r.json());
// Join your codebase imports directly via `node.importPath` or `urn:abeta:subpath:<importPath>`
```

---

## Table of Contents

1. [Modular Package Matrix](#modular-package-matrix)
2. [30-Second Quickstarts](#30-second-quickstarts)
3. [Installation & Peer Dependencies](#installation)
4. [Quick Start & Subpath Reference](#quick-start--imports)
   - [Enterprise Integration Recipe](docs/recipes/full-app-integration.md)
   - [Subpath Reference Table](#subpath-reference-table)
   - [Tree-Shaking Scope & Standalone Primitives](#tree-shaking-scope--standalone-primitives)
   - [SSR Compatibility & Hydration Architecture](#ssr-compatibility--hydration-architecture)
   - [Dedicated Client Subpath for PdfViewer](#dedicated-client-subpath-for-pdfviewer)
   - [Dual ESM & CommonJS Support](#dual-esm--commonjs-support)
5. [Styling & CSS Delivery](#styling--css-delivery)
6. [Component Reference](#component-reference)
7. [Composite Components](#composite-components)
   - [PdfViewer (Client Subpath)](#pdfviewer-client-subpath)
8. [Pluggable Behavioral Analytics](#pluggable-behavioral-analytics)
9. [Hooks](#hooks)
10. [Formatters](#formatters)
11. [Responsive Design](#responsive-design)
12. [Testing](#testing)
13. [Publishing & Release Automation](#publishing--release-automation)
14. [Architecture & Accessibility](#architecture--accessibility)

---

## Enterprise Architecture & Subpath Matrix

The Abeta React ecosystem addresses the complete domain stack required to power multi-tenant vendor portals, procurement suites, talent verification platforms, and compliance engines. Every domain capability is isolated into **strictly decoupled modular packages and subpaths** so consumers only bundle what they import:

```
┌────────────────────────────────────────────────────────────────────────┐
│                    @abeta.dev Monorepo Module Matrix                   │
├────────────────────────────────────────────────────────────────────────┤
│ 1. Core UI Layer (@abeta.dev/ui)                                       │
│    Accessible Tailwind v4 components, hooks, ./pdf, ./theme.css, CSS   │
├────────────────────────────────────────────────────────────────────────┤
│ 2. Standalone Primitives (@abeta.dev/ui/button, /card, /dialog, etc.)  │
│    Micro-bundle entry points for strict per-route dashboard budgets    │
├────────────────────────────────────────────────────────────────────────┤
│ 3. India Statutory Compliance & FinTech (@abeta.dev/india & /react)    │
│    Zero-bloat GSTIN, PAN, IFSC, GST/TDS, UPI URIs & counter standees   │
├────────────────────────────────────────────────────────────────────────┤
│ 4. Talent & Credential Verification (@abeta.dev/talent)                │
│    ProofOfWorkCertificate, CheckpointRunner, DiagnosticQuiz, Kanban    │
├────────────────────────────────────────────────────────────────────────┤
│ 5. Headless Auth & Security (@abeta.dev/auth/core & /react)            │
│    HttpOnly cookie refresh, single-flight mutex, CSRF & Auth UI        │
├────────────────────────────────────────────────────────────────────────┤
│ 6. Legacy Omnibus & Analytics (@abeta.dev/react-libs & /analytics)     │
│    100% backward-compatible umbrella re-exports & telemetry engine     │
└────────────────────────────────────────────────────────────────────────┘
```

---

## Installation

Install the modular packages you need from npm:

```bash
# Recommended modular installation
npm install @abeta.dev/ui
npm install @abeta.dev/india
npm install @abeta.dev/talent
npm install @abeta.dev/auth

# Or legacy omnibus package (100% backward compatible, deprecated for greenfield apps)
npm install @abeta.dev/react-libs
```

### Peer Dependencies
Ensure your project runs Node.js `>= 20.0.0` and has React 18 or 19 installed:

```bash
npm install react@^19.0.0 react-dom@^19.0.0
# Or for React 18 projects:
# npm install react@^18.2.0 react-dom@^18.2.0
```

---

## Quick Start & Imports

No complex path mapping or bundler alias configurations are required in your application. All components, utilities, and formatters are accessible through standard, tree-shakable package entry points.

### Subpath Reference Table

The ecosystem exposes dedicated entry points across modular packages and the backward-compatible `@abeta.dev/react-libs` omnibus:

| Subpath / Export | Module Formats | SSR / RSC Compatibility | Purpose & Contents |
|---|---|---|---|
| `@abeta.dev/ui` *(legacy: `@abeta.dev/react-libs`)* | ESM (`import`), CJS (`require`) | **Client Components** (`'use client'`) | Primary UI component library (accessible Tailwind UI components, primitives, forms, dialogs, charts, error boundaries, and hooks). SSR-compatible with browser APIs guarded inside lifecycle hooks. |
| `@abeta.dev/ui/utils` *(legacy: `@abeta.dev/react-libs/utils`)* | ESM (`import`), CJS (`require`) | **RSC & Server-Safe** | Pure utility helpers (`cn`; plus formatters, universal validators, and masking in `/utils`). Zero DOM and zero React dependencies; safe in Next.js Server Components, Server Actions, Route Handlers, and Edge runtimes. |
| `@abeta.dev/india` *(legacy: `@abeta.dev/react-libs/india`)* | ESM (`import`), CJS (`require`) | **RSC & Server-Safe** | Zero-bloat India compliance logic: GSTIN, PAN, IFSC, FSSAI, and Pincode validators, `calculateGSTSplit` / `calculateTDS`, regional constants (`INDIA_STATES`, `INDIA_CITIES`), WhatsApp utilities, and pure NPCI UPI payment URI generators (`generateUpiPayUri`, `validateUpiId`, `parseUpiPayUri`). |
| `@abeta.dev/india/react` *(legacy: `@abeta.dev/react-libs/india/react`)* | ESM (`import`), CJS (`require`) | **Client Component** (`'use client'`) | Interactive regional components (`AmountSummaryCardIndia`, `UpiQrCard` counter standee, `LanguageToggle`, `BilingualTooltip`). |
| `@abeta.dev/talent` | ESM (`import`), CJS (`require`) | **Client Components** (`'use client'`) | Verifiable credentials and assessment widgets (`ProofOfWorkCertificate`, `CheckpointRunner`, `DiagnosticQuiz`, `PipelineKanban`, `ProofOfWorkCard`, `MatchScoreGauge`, `RadarSweep`, `SalaryRangeDisplay`). |
| `@abeta.dev/auth/core` | ESM (`import`), CJS (`require`) | **Zero-React / Universal** | Pure TypeScript headless `AuthClient`, `createAuthenticatedFetch`, single-flight cookie refresh mutex, CSRF injection, and epoch invalidation. |
| `@abeta.dev/auth` & `@abeta.dev/auth/react` *(legacy: `@abeta.dev/react-libs/auth`)* | ESM (`import`), CJS (`require`) | **Client Components** (`'use client'`) | `AuthClientProvider`, `useAuthClientSnapshot`, `AuthProvider`, `AuthCard`, `LoginForm`, `SignUpForm`, `ForgotPasswordForm`, `OtpForm`, `OAuthButtonGroup`, PKCE utilities, and `useClickBackpressure`. |
| `@abeta.dev/react-libs/analytics` | ESM (`import`), CJS (`require`) | **RSC & Server-Safe** | Pure behavioral analytics tracking engine, DOM auto-tracking, batching pipeline, and destination adapters. Zero React hooks. |
| `@abeta.dev/react-libs/analytics/react` | ESM (`import`), CJS (`require`) | **Client Components** (`'use client'`) | React integration layer for analytics: `AnalyticsProvider`, `useAnalytics`, `TrackArea`, and `PageViewTracker`. |
| `@abeta.dev/ui/pdf` *(legacy: `@abeta.dev/react-libs/pdf`)* | ESM (`import`), CJS (`require`) | **Client-Only** (`'use client'`) | Dedicated client subpath for `PdfViewer`. Isolated from root to prevent Node SSR from executing browser-only PDF workers (`pdfjs-dist`). |
| `@abeta.dev/ui/hooks/use-toast` *(legacy: `@abeta.dev/react-libs/hooks/use-toast`)* | ESM (`import`), CJS (`require`) | **Client Hook** (`'use client'`) | Standalone imperative toast notification hook (`useToast`, `toast`). |
| `@abeta.dev/ui/button` *(legacy: `/button`)* | ESM (`import`), CJS (`require`) | **Client Component** (`'use client'`) | Standalone Button with Radix Slot polymorphism (`asChild`), custom loading spinners, and async click backpressure. |
| `@abeta.dev/ui/dialog` *(legacy: `/dialog`)* | ESM (`import`), CJS (`require`) | **Client Component** (`'use client'`) | Standalone Dialog primitive with isolated Radix Dialog dependency. |
| `@abeta.dev/ui/card` *(legacy: `/card`)* | ESM (`import`), CJS (`require`) | **Client Component** (`'use client'`) | Standalone Card primitive (`Card`, `StandardCard`) with zero Radix dependency overhead. |
| `@abeta.dev/ui/badge` *(legacy: `/badge`)* | ESM (`import`), CJS (`require`) | **Client Component** (`'use client'`) | Standalone Badge primitive with zero Radix dependency overhead. |
| `@abeta.dev/ui/input` *(legacy: `/input`)* | ESM (`import`), CJS (`require`) | **Client Component** (`'use client'`) | Standalone Input primitive with zero Radix dependency overhead. |
| `@abeta.dev/ui/data-table` *(legacy: `/data-table`)* | ESM (`import`), CJS (`require`) | **Client Component** (`'use client'`) | Standalone DataTable component with client/server sorting, pagination, keyboard row activation, and skeleton loading. |
| `@abeta.dev/ui/chart` *(legacy: `/charts`)* | ESM (`import`), CJS (`require`) | **Client Component** (`'use client'`) | Standalone Chart container and tooltip primitives (`ChartContainer`, `ChartTooltip`, `ChartLegend`), isolating Recharts peer dependency. |
| `@abeta.dev/ui/command` *(legacy: `/command`)* | ESM (`import`), CJS (`require`) | **Client Component** (`'use client'`) | Standalone Command palette primitives (`Command`, `CommandInput`, `CommandList`), isolating `cmdk` peer dependency. |
| `@abeta.dev/ui/drawer` *(legacy: `/drawer`)* | ESM (`import`), CJS (`require`) | **Client Component** (`'use client'`) | Standalone Drawer overlay primitives (`Drawer`, `DrawerContent`, `DrawerHeader`), isolating Vaul peer dependency. |
| `@abeta.dev/ui/carousel` *(legacy: `/carousel`)* | ESM (`import`), CJS (`require`) | **Client Component** (`'use client'`) | Standalone Carousel primitives (`Carousel`, `CarouselContent`, `CarouselItem`), isolating Embla Carousel peer dependency. |
| `@abeta.dev/ui/calendar` *(legacy: `/calendar`)* | ESM (`import`), CJS (`require`) | **Client Component** (`'use client'`) | Standalone Calendar date picker primitive (`Calendar`), isolating `react-day-picker` peer dependency. |
| `@abeta.dev/ui/date-range-picker` *(legacy: `/date-picker`)* | ESM (`import`), CJS (`require`) | **Client Component** (`'use client'`) | Standalone `DateRangePicker` primitive, isolating `react-day-picker` and `date-fns` peer dependencies. |
| `@abeta.dev/ui/form` *(legacy: `/form`)* | ESM (`import`), CJS (`require`) | **Client Component** (`'use client'`) | Standalone Form field and form context primitives (`Form`, `FormField`, `FormItem`, `FormLabel`), isolating `react-hook-form` peer dependency. |
| `@abeta.dev/ui/style.css` *(legacy: `@abeta.dev/react-libs/style.css`)* | CSS | N/A | Standalone pre-compiled stylesheet with all Tailwind utility classes and design tokens wrapped in `@layer react-libs`. |
| `@abeta.dev/ui/theme.css` *(legacy: `@abeta.dev/react-libs/theme.css`)* | CSS | N/A | Design system theme variables and color tokens for Tailwind CSS v4 projects (`@import`). |

### Tree-Shaking Scope & Standalone Primitives

Modern bundlers (Vite, Next.js, Rollup, Webpack 5) automatically perform dead-code elimination and tree-shake unreferenced components from `@abeta.dev/ui` and `@abeta.dev/react-libs`.

For consumer environments with strict per-route bundle budgets, zero optional peer dependencies, or legacy bundlers without deep tree-shaking, high-frequency primitives and heavy components provide **dedicated standalone entry points** with zero barrel overhead:
- `@abeta.dev/ui/button` (Micro-bundle: ~2.5 KB)
- `@abeta.dev/ui/dialog` (Micro-bundle: ~3.3 KB)
- `@abeta.dev/ui/card` (Micro-bundle: ~3.7 KB)
- `@abeta.dev/ui/badge` (Micro-bundle: ~1.6 KB)
- `@abeta.dev/ui/input` (Micro-bundle: ~1.1 KB)
- `@abeta.dev/ui/data-table` (Isolated data table: ~12.6 KB)
- `@abeta.dev/ui/chart` (Isolates `recharts` peer dependency)
- `@abeta.dev/ui/command` (Isolates `cmdk` peer dependency)
- `@abeta.dev/ui/drawer` (Isolates `vaul` peer dependency)
- `@abeta.dev/ui/carousel` (Isolates `embla-carousel-react` peer dependency)
- `@abeta.dev/ui/calendar` (Isolates `react-day-picker` peer dependency)
- `@abeta.dev/ui/date-range-picker` (Isolates `react-day-picker` + `date-fns` peer dependencies)
- `@abeta.dev/ui/form` (Isolates `react-hook-form` peer dependency)

All other UI components are imported directly from `@abeta.dev/ui` (or legacy `@abeta.dev/react-libs`), relying on modern ESM bundler tree-shaking.

### SSR Compatibility & Hydration Architecture

Both `@abeta.dev/ui` and `@abeta.dev/react-libs` are engineered for broad SSR and RSC compatibility:
- **Zero Module-Level DOM Access**: No browser globals (`window`, `document`, `navigator`, `localStorage`) are evaluated during module evaluation or import, preventing Node.js SSR crashes.
- **SSR & RSC Architecture**: Interactive components carry explicit `'use client'` boundaries for React Server Component frameworks (such as Next.js App Router). Zero-DOM pure utilities reside in `@abeta.dev/ui/utils`, `@abeta.dev/india`, `@abeta.dev/auth/core`, and `@abeta.dev/react-libs/utils` and run safely in Server Components, Server Actions, and Edge runtimes.
- **Client Effects Isolation**: All interactive browser logic (event listeners, DOM measurements, post-mount fallbacks) is scoped inside `useEffect` or client event handlers to prevent hydration mismatches. For zero-flash SSR with components like `Sidebar`, pass server cookie values directly to `defaultOpen`.

### Dedicated Client Subpath for PdfViewer

Components with browser-only dependencies—specifically `PdfViewer`, which relies on `pdfjs-dist` and web workers—are isolated into a dedicated client subpath:

```tsx
"use client"; // Next.js App Router client component directive

import { PdfViewer } from "@abeta.dev/ui/pdf";

export function ContractViewer() {
  return (
    <PdfViewer
      file="/agreements/sample-agreement.pdf"
      showDownload
      showPrint
    />
  );
}
```

> [!IMPORTANT]
> **Why is `PdfViewer` isolated?**  
> PDF rendering engines require browser APIs (`DOMMatrix`, Canvas rendering context, `window.URL.createObjectURL`) and web workers (`pdf.worker.mjs`). Isolating `PdfViewer` under `@abeta.dev/ui/pdf` (and legacy `@abeta.dev/react-libs/pdf`) prevents Node.js SSR environments from executing browser-only PDF workers or encountering `DOMMatrix is not defined` errors during server compilation.

### Dual ESM & CommonJS Support

All packages ship with first-class dual build support for modern ECMAScript Modules (`import`) and legacy CommonJS (`require`):

```tsx
// Modern ESM (Vite, Next.js, Remix, Webpack 5, tsx)
import { Button, Card } from "@abeta.dev/ui";
import { cn } from "@abeta.dev/ui/utils";
import { PdfViewer } from "@abeta.dev/ui/pdf";
import { validateGSTIN, calculateGSTSplit } from "@abeta.dev/india";
```

```javascript
// CommonJS (Node.js runtime, legacy tooling, Jest)
const { Button, Card } = require("@abeta.dev/ui");
const { cn } = require("@abeta.dev/ui/utils");
const { PdfViewer } = require("@abeta.dev/ui/pdf");
const { validateGSTIN, calculateGSTSplit } = require("@abeta.dev/india");
```

### Server-Safe Pure Utilities Subpath (`/utils`)

`@abeta.dev/react-libs/utils` (and `@abeta.dev/ui/utils` for `cn`) provides pure helper functions with **zero DOM and zero React dependencies**. It is guaranteed to execute safely inside React Server Components, Server Actions, Route Handlers, Node.js scripts, and Edge workers:

```tsx
import { cn, formatCurrency, maskSensitiveValue } from "@abeta.dev/react-libs/utils";

// Pure functions safe in React Server Components, Server Actions, and Node.js
export async function ServerSummaryCard({ balance, masked }: { balance: number; masked: boolean }) {
  return (
    <div className={cn("p-4 rounded-lg border", "bg-muted/50")}>
      <p>{maskSensitiveValue(balance, { isMasked: masked })}</p>
      <p>{formatCurrency(balance)}</p>
    </div>
  );
}
```

### Standard UI Component Imports

```tsx
import { Button, Card } from "@abeta.dev/ui";

export function App() {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold">Hello World</h2>
      <Button variant="default" className="mt-4">
        Click Me
      </Button>
    </Card>
  );
}
```

### Analytics Subpath Import

```tsx
import { initAnalytics } from "@abeta.dev/react-libs/analytics";

initAnalytics({
  autoTrackDom: true,
});
```

### India Regional & UPI Subpaths Import

Pure server-side compliance and payment URI generation (zero React/DOM overhead):

```tsx
import { generateUpiPayUri, validateUpiId } from "@abeta.dev/india";

// Validate and generate standard NPCI URI
const check = validateUpiId("merchant@icici");
if (check.isValid) {
  const upiUri = generateUpiPayUri({
    upiId: "merchant@icici",
    payeeName: "Vendor Billing",
    amount: 1499.00,
    transactionNote: "Invoice #1042",
  });
}
```

Interactive client components (`'use client'`):

```tsx
import { UpiQrCard } from "@abeta.dev/india/react";

export function CheckoutStandee() {
  return (
    <UpiQrCard
      upiId="merchant@icici"
      payeeName="Vendor Billing"
      amount={1499}
      transactionNote="Invoice #1042"
    />
  );
}
```

---

## Styling & CSS Delivery

The ecosystem provides two delivery strategies for styling and design tokens depending on your build system and Tailwind version:

### 1. For Tailwind CSS v4 Applications
Import the design system theme directly into your global CSS stylesheet (e.g. `src/index.css` or `app/globals.css`) and point `@source` to the installed `@abeta.dev/*` packages:

```css
@import "tailwindcss";
@import "@abeta.dev/ui/theme.css";

@source "../node_modules/@abeta.dev/ui";
@source "../node_modules/@abeta.dev/india";
@source "../node_modules/@abeta.dev/talent";
@source "../node_modules/@abeta.dev/auth";
```

This registers all semantic design tokens (`--primary`, `--muted`, `--border`, etc.) directly with Tailwind v4's `@theme` directive, giving you instant access to semantic utility classes like `bg-primary`, `text-muted`, and `border-border`.

### 2. For Standard CSS / Tailwind CSS v3 / Vite Applications
If your project uses Tailwind CSS v3, Vite without Tailwind, Webpack, or plain CSS, import the pre-compiled distribution stylesheet at your application's root entry point (e.g. `src/main.tsx`, `App.tsx`, or `_app.tsx`):

```tsx
import "@abeta.dev/ui/style.css";
// Legacy omnibus equivalent:
// import "@abeta.dev/react-libs/style.css";
```

> [!TIP]
> **CSS Cascade Layer Isolation (`@layer react-libs`)**:
> Precompiled `style.css` is encapsulated in `@layer react-libs { ... }` per the W3C CSS Cascading and Inheritance Level 5 specification. Because unlayered styles have higher precedence than layered styles in the CSS cascade, your application's custom CSS classes and local Tailwind utilities naturally override library styles without specificity wars or `!important`.
>
> If your application uses multiple cascade layers, `@abeta.dev/ui/theme.css` pre-declares the standard layer ordering preset:
> ```css
> @layer reset, base, react-libs, components, utilities, overrides;
> ```

> [!NOTE]
> `@abeta.dev/ui/style.css` contains all pre-compiled Tailwind utility classes and design tokens. It requires zero PostCSS or Tailwind build plugins on the consumer end, making it plug-and-play in any React project.

### Brand Tokens & CSS Variables

All color, spacing, typography, and border-radius tokens are defined via semantic CSS variables:

| Token | Light | Dark | Usage |
|---|---|---|---|
| `--primary` | `hsl(142.1 76.2% 28%)` | `hsl(142 71% 45%)` | Primary brand green — buttons, active states (WCAG AA >= 4.5:1) |
| `--destructive` | `hsl(0 84% 60%)` | `hsl(0 63% 31%)` | Danger & destructive actions |
| `--muted` | `hsl(210 40% 96%)` | `hsl(217 33% 18%)` | Backgrounds, neutral subtle fills |
| `--border` | `hsl(214 32% 91%)` | `hsl(217 33% 18%)` | Component outlines & dividers |
| `--accent` | `hsl(210 40% 96%)` | `hsl(217 33% 18%)` | Hover states and badge highlights |

### Multi-Brand Theming

Add `.theme-orange` (or customized brand classes) to switch accent branding seamlessly:

```tsx
<div className="theme-orange">
  <Button>Orange Action Button</Button>
</div>
```

---

## Component Reference

> Interactive documentation & stories: [Storybook Playground](https://abeta-dev.github.io/react-libs/) · AI Reference: [llms.txt](https://abeta-dev.github.io/react-libs/llms.txt) · Comprehensive guide: [WIKI.md](./WIKI.md) · Architecture Recipe: [Enterprise App Integration](docs/recipes/full-app-integration.md)

> [!NOTE]
> **SSR Compatibility**: UI components in `@abeta.dev/ui` and root `@abeta.dev/react-libs` are tagged with `'use client'` directives and guard browser APIs to avoid server hydration mismatches in Next.js App Router and Remix. Pure utilities under `@abeta.dev/ui/utils`, `@abeta.dev/india`, `@abeta.dev/auth/core`, and `@abeta.dev/react-libs/utils` run safely in server contexts with zero DOM/React dependencies. Browser-only components such as `PdfViewer` are exported through dedicated client subpaths (`@abeta.dev/ui/pdf` / `@abeta.dev/react-libs/pdf`) to prevent server runtime issues.

All standard UI components are directly importable from `@abeta.dev/ui` (and preserved in legacy `@abeta.dev/react-libs`, with domain/client-only subpaths noted):

| Domain | Component | Notes |
|---|---|---|
| **Forms** | `Button` | Accessible button with `isLoading`, `loadingText`, `debounceSec`, variants (`default`, `destructive`, `outline`, `ghost`, `secondary`, `link`) |
| | `Input` | Controlled/uncontrolled input with label and helper text integration |
| | `FileUpload` | Drag-and-drop file upload with preview, file-type filters, and size validation |
| | `MultiSelect` | Searchable chip/tag selector with keyboard navigation |
| | `Textarea` | Multiline text input with auto-resize and character counts |
| | `Select` | Radix-based custom select (`SelectTrigger`, `SelectContent`, `SelectItem`) |
| | `AsyncSelect` | Debounced remote-search select for dynamic datasets |
| | `FilterSelect` | Searchable filter dropdown for data table headers and toolbars |
| | `Checkbox` | Accessible checkbox supporting indeterminate and disabled states |
| | `RadioGroup` | Accessible radio group (`RadioGroupItem`) with keyboard arrow navigation |
| | `Switch` | Accessible binary toggle switch |
| | `Toggle` | Single-press toggle button |
| | `ToggleGroup` | Single and multi-select button toggle groups |
| | `Slider` | Range and single-value track slider |
| | `Form` | Full `react-hook-form` integration with schema validation |
| | `Label` | Accessible form label with error styling |
| | `InputGroup` | Input with integrated prefix/suffix buttons or icons |
| | `ButtonGroup` | Grouped set of related action buttons |
| **Data Display** | `Badge` | Status and label badges (`default`, `secondary`, `destructive`, `outline`) |
| | `KPICard` | Key Performance Indicator metric card with trend arrow and percentage change |
| | `Timeline` | Chronological activity log and audit trail feed |
| | `StatusBadge` | Pre-configured color and icon badges for common entity and workflow statuses |
| | `ActiveFilterBadge` | Dismissible filter tag for active filter rows |
| | `Avatar` | Profile image with graceful fallback initials |
| | `Card` | Structured surface container (`CardHeader`, `CardContent`, `CardFooter`, `StandardCard`) |
| | `DataTable` | Feature-rich table with client/server sorting, skeleton loading, pagination, and empty states |
| | `Table` | Primitive semantic table building blocks (`TableHeader`, `TableRow`, `TableCell`) |
| | `PdfViewer` | Multi-page interactive PDF document viewer with zoom, pagination, rotation, and printing. *Imported via `@abeta.dev/ui/pdf` or `@abeta.dev/react-libs/pdf` (client-only subpath).* |
| | `Chart` | Themed Recharts wrapper for responsive analytics visualizations |
| | `Accordion` | Accessible collapsible accordion panels |
| | `Collapsible` | Expandable content section |
| | `Carousel` | Touch-friendly Embla-powered carousel slider |
| | `ProofOfWorkCertificate` | Verifiable completion credential displaying project accomplishments, cryptographic ID, skills, and sharing. *Recommended package: `@abeta.dev/talent`.* |
| **Layout** | `PageHeader` | Standardized header container with title, breadcrumb slot, and action buttons |
| | `Separator` | Semantic horizontal or vertical divider |
| | `ScrollArea` | Cross-browser custom scrollbar container |
| | `AspectRatio` | Fixed aspect ratio wrapper (16:9, 4:3, etc.) |
| | `ResizablePanelGroup` | Split-pane draggable resizable panels |
| **Overlays** | `Dialog` | Accessible modal dialog with focus trap and backdrop animation |
| | `AlertDialog` | High-priority destructive confirmation modal |
| | `ConfirmDialog` | Streamlined confirmation modal with loading feedback |
| | `Sheet` | Sliding drawer panel (left, right, top, bottom) |
| | `Popover` | Floating popover positioned relative to anchor elements |
| | `HoverCard` | Preview card displayed on mouse hover |
| | `Tooltip` | Accessible tooltip with configurable delays |
| | `DropdownMenu` | Contextual action dropdown menu |
| | `ContextMenu` | Right-click contextual menu |
| | `Command` | Fast cmdk-powered search & command palette |
| | `Drawer` | Mobile-first bottom drawer sheet (vaul) |
| | `DiagnosticQuiz` | Multi-step interactive assessment modal for skill evaluation and automated track recommendation. *Recommended package: `@abeta.dev/talent`.* |
| **Navigation** | `Sidebar` | Collapsible desktop and mobile application sidebar |
| | `Stepper` | Multi-step wizard and workflow progression indicator |
| | `NavigationMenu` | Top-level dropdown navigation header |
| | `Breadcrumb` | Hierarchy pathway navigation trail |
| | `Tabs` | Tabbed navigation container (`TabsList`, `TabsTrigger`, `TabsContent`) |
| | `Menubar` | Desktop-style menu bar (File / Edit / View) |
| | `Pagination` | Accessible pagination controls with page jumpers |
| **Feedback** | `Banner` | System announcement banner with call-to-action and dismiss controls |
| | `CopyButton` | 1-click clipboard copy button with checkmark feedback animation |
| | `CheckpointRunner` | Interactive verification runner for stepped command execution, verification evidence, and progress tracking. *Recommended package: `@abeta.dev/talent`.* |
| | `ReactionBar` | Floating or inline engagement bar with multi-clap applause, bookmarks, web sharing, and reading progress |
| | `Toast` / `Toaster` | Notification toast system |
| | `Sonner` | Sonner toast provider alternative |
| | `Skeleton` | Content loading placeholder skeleton |
| | `SkeletonList` | Multi-item skeleton loader |
| | `Progress` | Accessible determinate progress bar |
| | `Spinner` | Indeterminate loading spinner |
| | `Alert` | Inline notification message callout |
| | `EmptyState` | Informative empty data state with icon and action button |
| | `RoleEmptyState` | Permission-aware zero state for restricted pages |
| **Core** | `Calendar` | Interactive date and month picker calendar |
| | `DateRangePicker` | Two-date selection picker with presets |
| | `LanguageToggle` | Multi-language switcher toggle |
| | `Kbd` | Keyboard shortcut badge |
| **Regional & India** | `AmountSummaryCardIndia` | B2B invoice amount breakdown with CGST/SGST/IGST tax splits and TDS deductions. *Imported via `@abeta.dev/india/react` (legacy: `@abeta.dev/react-libs/india/react`).* |
| | `UpiQrCard` | Dynamic NPCI-compliant UPI payment counter standee card with vector QR code, VPA copy, and offline PNG download. *Imported via `@abeta.dev/india/react` (legacy: `@abeta.dev/react-libs/india/react`).* |

---

## Composite Components

### Button — Loading State

```tsx
import { Button } from "@abeta.dev/ui";

<Button isLoading={isSubmitting} loadingText="Saving...">
  Save Changes
</Button>
<Button variant="destructive" isLoading={isDeleting}>
  Delete Record
</Button>
<Button variant="outline" size="sm">
  Refresh
</Button>
```

---

### ConfirmDialog

```tsx
import { useState } from "react";
import { ConfirmDialog } from "@abeta.dev/ui";

export function DeleteDialog() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    await api.deleteItem();
    setLoading(false);
    setOpen(false);
  };

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={setOpen}
      title="Delete Item?"
      description="This action is permanent and cannot be undone."
      variant="destructive"
      confirmLabel="Delete"
      isLoading={loading}
      onConfirm={handleDelete}
    />
  );
}
```

---

### StatusBadge

```tsx
import { StatusBadge } from "@abeta.dev/ui";

<StatusBadge status="pending" />
<StatusBadge status="confirmed" />
<StatusBadge status="delivered" />
<StatusBadge status="overdue_payment" />
<StatusBadge status="under_review" />
<StatusBadge status="rejected" size="sm" label="Rejected" />
```

---

### DataTable

```tsx
import { DataTable, StatusBadge, formatCurrency } from "@abeta.dev/ui";

const columns = [
  { key: "id", header: "Order ID", sortable: true },
  { key: "customer", header: "Customer", cell: (row) => row.customer.name },
  { key: "amount", header: "Amount", cell: (row) => formatCurrency(row.amount) },
  { key: "status", header: "Status", cell: (row) => <StatusBadge status={row.status} /> },
];

<DataTable
  columns={columns}
  data={orders}
  rowKey={(row) => row.id}
  isLoading={isLoading}
  emptyMessage="No orders found."
  pagination={{ page, pageSize: 20, total, onPageChange: setPage }}
/>
```

---

### PdfViewer (Client Subpath)

To prevent server-side rendering (SSR) crashes in Node.js environments caused by browser-only PDF workers (`pdfjs-dist`) or missing canvas/DOM APIs, `PdfViewer` is isolated in a dedicated client subpath:

```tsx
"use client";

import { PdfViewer } from "@abeta.dev/ui/pdf";

export function InvoiceViewer() {
  return (
    <div className="h-[700px] w-full max-w-4xl border rounded-lg overflow-hidden">
      <PdfViewer
        file="/documents/invoice-1042.pdf"
        showDownload
        showPrint
        onLoadSuccess={(numPages) => console.log(`Loaded ${numPages} pages`)}
      />
    </div>
  );
}
```

> **Isolation Note**: `PdfViewer` is exported from `@abeta.dev/ui/pdf` (and legacy `@abeta.dev/react-libs/pdf`) to keep browser-only PDF workers (`pdfjs-dist`) isolated from root imports, ensuring server-side rendering in Node.js, Next.js, and Remix does not crash on missing canvas or web worker APIs.

---

## Pluggable Behavioral Analytics

The library includes a client behavioral analytics engine with automated DOM tracking, batching, offline resilience, and pluggable destination adapters.

> [!TIP]
> For a complete, production-ready recipe showing how to configure `AnalyticsProvider`, route tracking with `<PageViewTracker />`, click scoping with `<TrackArea />`, and multi-brand theming, see [Enterprise Integration Recipe](docs/recipes/full-app-integration.md).

```tsx
import { initAnalytics, ConsoleAdapter, trackEvent } from "@abeta.dev/react-libs/analytics";
import { AnalyticsProvider, useAnalytics } from "@abeta.dev/react-libs/analytics/react";

// Initialize analytics globally (pure engine — RSC/Server-safe)
initAnalytics({
  autoTrackDom: true,
  batchSize: 10,
  flushIntervalMs: 5000,
  adapters: [new ConsoleAdapter()],
  globalMetadata: {
    environment: process.env.NODE_ENV,
  },
});

// Explicit event tracking
trackEvent("order_submitted", { orderId: "12345", total: 4999 });
```

---

## Hooks

```tsx
import {
  useDebounce,
  useLocalStorage,
  useIsMobile,
  useClickBackpressure,
  useLocalFirstStore,
} from "@abeta.dev/ui";
```

| Hook | Description |
|---|---|
| `useDebounce(value, delay)` | Debounces rapidly changing values before triggering expensive effects or API queries |
| `useLocalStorage<T>(key, default)` | Syncs state with browser `localStorage` and listens to cross-tab updates |
| `useIsMobile()` | Detects whether the viewport width is below mobile threshold (< 768px) via `useSyncExternalStore` |
| `useClickBackpressure(handler, options)` | Leading-edge click debouncing and async in-flight backpressure (`{ execute, isPending, cancelCooldown, wrapHandler }`) |
| `useLocalFirstStore(options)` | Versioned local-first persistent store with schema migration and cross-tab sync |

---

## Formatters

Deterministic formatters that automatically handle `null`, `undefined`, and `NaN` safely with placeholder fallbacks:

```tsx
import {
  formatCurrency,
  formatNumber,
  formatDate,
  formatDateTime,
  formatRelativeTime,
  formatWeight,
  formatQuantity,
  formatFileSize,
  formatPercent,
  formatLocalizedDate,
  formatLocalizedDateTime,
  formatLocalizedNumber,
} from "@abeta.dev/ui";
```

| Formatter | Example Input | Output |
|---|---|---|
| `formatCurrency` | `123456.78` | `$123,456.78` |
| `formatDate` | `"2026-03-27"` | `27 Mar 2026` |
| `formatDateTime` | `"2026-03-27T14:32:00"` | `27 Mar 2026, 14:32` |
| `formatRelativeTime` | `yesterday` | `1d ago` |
| `formatWeight` | `12.5` | `12.5 kg` |
| `formatQuantity` | `150, "boxes"` | `150 boxes` |
| `formatFileSize` | `1234567` | `1.2 MB` |
| `formatPercent` | `0.856` | `85.6%` |
| `formatNumber` | `1234567` | `1,234,567` |

---

## Responsive Design

Components are designed mobile-first with adaptive layouts:
- Dialogs gracefully transform into bottom sheets (`Drawer`) on touch viewports.
- Data tables support horizontal scrollbars and responsive column hiding.
- Stepper navigations switch between horizontal and vertical layouts based on viewport width.

---

## Testing

The codebase maintains strict automated quality gates:

```bash
npm run test             # Vitest unit & interaction tests with coverage
npm run storybook        # Launch Storybook visual playground
npm run build-storybook  # Compile static Storybook bundle
npm run lint             # ESLint static code analysis (src/**/*.{ts,tsx} with --max-warnings 0)
npx tsc --noEmit         # Full TypeScript compiler verification
npm run perf             # Generate performance benchmark report
```

---

## Publishing & Release Automation

Releases are fully automated via GitHub Actions (`.github/workflows/publish.yml`) upon pushing a semantic version tag (`v*`):

### Standard Release Protocol ("Going Forward")

1. **Prepare Release Artifacts**:
   - Update `version` in `package.json`, all workspace `packages/*/package.json`, and synchronize `package-lock.json`.
   - Add release notes entry to `CHANGELOG.md` (`## [x.y.z] - YYYY-MM-DD`).
   - Update version badge and migration guide link in `README.md`.
   - Add migration notes under `## Upgrading to vx.y.z` in `MIGRATION.md`.

2. **Pre-Flight Local Verification**:
   ```bash
   npm run check:truth            # Asserts version alignment, ATTW matrix & directive purity
   node scripts/verify-release-version.mjs
   npm run verify:ci-gate         # Proves CI gate blocks on failure & permits clean release
   npm run verify:packed-consumers
   npm run check:size
   npm run lint && npx tsc --noEmit
   npm run test
   ```

3. **Pull Request & Linear Merge**:
   - Create a release branch (`release/vx.y.z`), commit changes, and submit a PR to `main`.
   - Merge the PR into `main`.

4. **Tag & Trigger Automated Release**:
   ```bash
   git checkout main && git pull origin main
   git tag -a vx.y.z -m "Release vx.y.z: <Summary>"
   git push origin vx.y.z
   ```

### What the Automated Pipeline Executes

Whenever a `v*` tag is pushed, GitHub Actions automatically:
1. **Pre-Publish CI Gate (`gate-ci`)**: Queries commit check-runs via GitHub API and strictly blocks publishing if any non-publish CI check has failed on that commit.
2. Executes all verification and truth gates (TypeScript, ESLint, ATTW, module directives, P95 perf, and unit tests).
3. Extracts version-specific release notes from `CHANGELOG.md` via `scripts/extract-release-notes.mjs`.
4. Publishes verified packages to the **npm registry** with provenance.
5. **Automatically creates the GitHub Release** with the tag, title, and extracted release notes (`gh release create "$TAG" --notes-file dist/release-notes.md`).
6. Dual-publishes packages to **GitHub Packages** (`npm.pkg.github.com`).

---

## Architecture & Accessibility

- **Radix UI Primitives**: Built upon headless, fully accessible primitives managing focus traps, ARIA attributes, and keyboard navigation according to WCAG 2.2 AA specifications. Automated regression tests via `axe-core` verify 0 violations across all interactive widgets.
- **SSR Compatibility**: Root UI components avoid top-level browser globals during module evaluation, guarding interactive code within client hooks and event handlers. Pure utilities in `@abeta.dev/ui/utils`, `@abeta.dev/india`, `@abeta.dev/auth/core`, and `@abeta.dev/react-libs/utils` feature zero DOM and zero React dependencies for native Server Component execution. Browser-only components like `PdfViewer` reside in isolated client subpaths.
- **Dual ESM & CommonJS**: Full dual module support (`import` and `require`) with TypeScript declaration files (`.d.ts` and `.d.cts`) and subpath type mappings across modern module loaders, verified with `@arethetypeswrong/cli`.
- **Domain Subpath Isolation**: Keeps Indian compliance logic in `@abeta.dev/india` and talent assessment in `@abeta.dev/talent` while leaving `@abeta.dev/ui` and `/utils` domain-neutral.
- **Static Zero-Runtime CSS Delivery**: CSS tokens and component styles compile into static stylesheets (`@abeta.dev/ui/theme.css` and `@abeta.dev/ui/style.css`), eliminating runtime `<style>` injection and satisfying strict Content Security Policies (`CSP`).
- **Tree-Shaking**: Pure ES modules allow modern bundlers (Vite, Rollup, Webpack, Turbopack) to eliminate unused components and utilities from consumer bundles.

### Blocking Accessibility (a11y) Quality Gate

Accessibility compliance is strictly enforced across CI and development environments:
- **Automated Vitest Axe Suite**: [`src/components/ui/__tests__/accessibility.test.tsx`](./src/components/ui/__tests__/accessibility.test.tsx) runs `axe-core` against all interactive widgets and primitives, asserting 0 violations (`expect(results.violations).toEqual([])`) as a blocking CI gate.
- **Storybook A11y Error Policy**: Storybook preview configuration ([`.storybook/preview.ts`](./.storybook/preview.ts)) enforces `a11y: { test: 'error' }`, ensuring that any accessibility violation immediately fails tests rather than being marked as non-blocking TODOs.

### Architecture Decision Records (ADRs)
Explore our formal design decisions in [`docs/adr/`](./docs/adr/):
- [ADR 0001: tsup and Dual Module (ESM/CJS) Publishing Architecture](./docs/adr/0001-tsup-and-dual-module-publishing.md)
- [ADR 0002: Peer vs Optional Dependencies and Dependency Surface Minimization](./docs/adr/0002-peer-vs-optional-dependencies.md)
- [ADR 0003: SSR & React Server Components (RSC) Purity Architecture](./docs/adr/0003-ssr-and-react-server-components-architecture.md)
- [ADR 0004: Accessibility Baseline and Automated WCAG Compliance](./docs/adr/0004-accessibility-baseline-and-wcag-compliance.md)
- [ADR 0005: Controlled vs Uncontrolled State and Ref Forwarding Convention](./docs/adr/0005-controlled-and-uncontrolled-component-convention.md)
- [ADR 0006: Domain Subpath Isolation Architecture (@abeta.dev/react-libs/india)](./docs/adr/0006-domain-subpath-isolation-architecture.md)

---

## 🤖 AI Agent Skills & Multi-Model Context Routing

`react-libs` ships vendor-neutral **Agent Skills (`SKILL.md`)**, a root **[`AGENTS.md`](./AGENTS.md)** router, and machine-readable **[`llms.txt`](./llms.txt)** for any AI coding assistant (Antigravity, Gemini CLI, Claude Code, OpenAI Codex, Cursor, Windsurf, GitHub Copilot):

| Skill | Path | Covered Scope |
| :--- | :--- | :--- |
| **`react-libs` (Umbrella)** | [`skills/react-libs/SKILL.md`](./skills/react-libs/SKILL.md) | 4-package routing matrix, Tailwind CSS v4 setup, RSC boundaries & CI truth gates |
| **`react-libs-ui`** | [`skills/react-libs-ui/SKILL.md`](./skills/react-libs-ui/SKILL.md) | `@abeta.dev/ui` — 111 components, 9 hooks, RSC `./utils`, isolated `./pdf`, `./theme.css`, `./style.css` |
| **`react-libs-india`** | [`skills/react-libs-india/SKILL.md`](./skills/react-libs-india/SKILL.md) | `@abeta.dev/india` & `./react` — GSTIN/PAN/IFSC/FSSAI/UPI validation, GST/TDS splits, `UpiQrCard`, `AmountSummaryCardIndia` |
| **`react-libs-talent`** | [`skills/react-libs-talent/SKILL.md`](./skills/react-libs-talent/SKILL.md) | `@abeta.dev/talent` — `ProofOfWorkCertificate`, `CheckpointRunner`, `DiagnosticQuiz`, `PipelineKanban`, `MatchScoreGauge` |
| **`react-libs-auth`** | [`skills/react-libs-auth/SKILL.md`](./skills/react-libs-auth/SKILL.md) | `@abeta.dev/auth` (`./core`, `./react`, `.`) — Headless cookie refresh mutex, CSRF, epoch invalidation & auth UI forms |

Machine-readable LLM context is mirrored at root **[`llms.txt`](./llms.txt)** and served live at [`https://abeta-dev.github.io/react-libs/llms.txt`](https://abeta-dev.github.io/react-libs/llms.txt) (full single-file spec at [`llms-full.txt`](https://abeta-dev.github.io/react-libs/llms-full.txt)).

---

## 🌐 Abeta Full-Stack Ecosystem

`@abeta.dev/*` React packages pair natively with the **Abeta Go & Observability Ecosystem**:

| Repository | Architectural Role | Live Portal | Registry / Reference |
| :--- | :--- | :--- | :--- |
| **[`Abeta-dev/react-libs`](https://github.com/Abeta-dev/react-libs)** | Modular React 19 UI design system (`@abeta.dev/ui`), India FinTech (`@abeta.dev/india`), talent credentials (`@abeta.dev/talent`), and headless auth (`@abeta.dev/auth`) | [`abeta-dev.github.io/react-libs`](https://abeta-dev.github.io/react-libs/) | [`npmjs.com/org/abeta.dev`](https://www.npmjs.com/package/@abeta.dev/ui) |
| **[`abeta-dev/go-libs`](https://github.com/abeta-dev/go-libs)** | Foundational zero-business-logic Go primitives: HTTP/Gin middleware, resilience, concurrency, PostgreSQL, RBAC, and OpenTelemetry | [`abeta-dev.github.io/go-libs`](https://abeta-dev.github.io/go-libs/) | [`pkg.go.dev/github.com/abeta-dev/go-libs`](https://pkg.go.dev/github.com/abeta-dev/go-libs) |
| **[`abeta-dev/go-fintech-india`](https://github.com/abeta-dev/go-fintech-india)** | Zero-float Indian fintech & statutory compliance primitives in Go (`paise`, `gst`, `tds`, `pan`, `gstin`, `aadhaar`, `ifsc`, `upi`, `emvqr`) | [`abeta-dev.github.io/go-fintech-india`](https://abeta-dev.github.io/go-fintech-india/) | [`pkg.go.dev/github.com/abeta-dev/go-fintech-india`](https://pkg.go.dev/github.com/abeta-dev/go-fintech-india) |
| **[`abeta-dev/go-app-kit`](https://github.com/abeta-dev/go-app-kit)** | Go application-layer accelerators composing `go-libs` and `go-fintech-india` (`audit`, `export`, `notifications`, `outbox`, `pdf` GST invoices) | [`abeta-dev.github.io/go-app-kit`](https://abeta-dev.github.io/go-app-kit/) | [`pkg.go.dev/github.com/abeta-dev/go-app-kit`](https://pkg.go.dev/github.com/abeta-dev/go-app-kit) |
| **[`abeta-dev/cloud-native-observability`](https://github.com/abeta-dev/cloud-native-observability)** | Production LGTM observability stack (Loki, Grafana, Tempo, Prometheus, OTel), Terraform IaC, ArgoCD GitOps, and SRE SLO alerting | [`abeta-dev.github.io/cloud-native-observability`](https://abeta-dev.github.io/cloud-native-observability/) | [`github.com/abeta-dev/cloud-native-observability`](https://github.com/abeta-dev/cloud-native-observability) |

---

## Community & Contributing

- **[Migration Guide: Upgrading to v0.21.0](./MIGRATION.md#upgrading-to-v0210)**: Full `@abeta.dev/ui` exports & CSS delivery, zero-bloat `@abeta.dev/india`, `llms.txt`, and starter templates.
- **[Live Storybook & Workflows](https://abeta-dev.github.io/react-libs/)**: Interactive component catalog, tokens, and enterprise blueprints.
- **[AI Agent Index (llms.txt)](https://abeta-dev.github.io/react-libs/llms.txt)**: Machine-readable ecosystem guide ([`llms-full.txt`](https://abeta-dev.github.io/react-libs/llms-full.txt)).
- **[Quality Standards & Scorecard](./QUALITY_STANDARDS_AND_AUDIT_SCORECARD.md)**: Perpetual quality parameters, security invariants, and audit scorecard.
- **[Code of Conduct](./CODE_OF_CONDUCT.md)**: We are committed to providing a friendly, safe, and welcoming environment for all contributors.
- **[Security Policy](./SECURITY.md)**: Guidelines for reporting security vulnerabilities responsibly.
- **[Contributing Guide](./CONTRIBUTING.md)**: Step-by-step instructions for adding components, writing tests, and filing pull requests.

## License

[MIT](./LICENSE) © abeta-dev (abeta.dev)
