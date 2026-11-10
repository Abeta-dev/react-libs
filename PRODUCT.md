# PRODUCT.md — Product Overview & Ecosystem Architecture

> **@abeta.dev Monorepo Component & FinTech Suite**  
> **Repository:** `@abeta.dev/react-libs` (Omnibus) & `@abeta.dev/*` Scoped Packages  
> **Audience:** Product Managers, Design Engineers, Frontend Architects, and AI Pair Programmers

---

## 1. Product Vision & Mission

`@abeta.dev/react-libs` is an enterprise-grade React 19 UI component library, design system, and regional FinTech engine built for high-stakes B2B applications, vendor management portals, multi-tenant dashboards, and statutory compliance workflows.

Modern enterprise web applications frequently suffer from slow runtime CSS engines, fragmented component abstractions, inaccessible interactive elements, and generic "AI-slop" aesthetic choices. `@abeta.dev` solves these challenges by combining:

1. **Uncompromising Performance**: Zero-runtime CSS overhead using **Tailwind CSS v4** `@theme` custom properties and atomic, treeshakeable subpath exports.
2. **Universal Accessibility (a11y)**: Built on battle-tested **Radix UI headless primitives** adhering strictly to **WCAG 2.1 AA** and **WCAG 2.2** standards (focus rings, ARIA roles, full keyboard navigation, screen reader announcements).
3. **India Statutory & FinTech Engine**: Specialized, production-tested statutory validators, GST tax engines, and UPI payment interfaces designed for the Indian enterprise ecosystem.
4. **Security-First Architecture**: Headless authentication client with HttpOnly token rotation, single-flight refresh mutex, CSRF defenses, and strict Content Security Policy (CSP) compatibility.
5. **Craft & Anti-Slop Discipline**: Strict rejection of generic AI archetypes (such as purple/indigo gradients and tacky bounce easings), favoring intentional, brand-aligned, high-density enterprise interfaces verified by `impeccable detect`.

---

## 2. Monorepo Architecture & Package Topology

The repository operates as a high-performance **npm workspace monorepo** consisting of four domain-scoped modular packages alongside an omnibus root package for backward compatibility:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              @abeta.dev Architecture Matrix                           │
├────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                        │
│  ┌──────────────────────────┐  ┌──────────────────────────┐  ┌──────────────────────┐  │
│  │     @abeta.dev/ui        │  │     @abeta.dev/india     │  │   @abeta.dev/talent  │  │
│  │    (packages/ui)         │  │    (packages/india)      │  │  (packages/talent)   │  │
│  │  111 Accessible Primitives│  │  GST, PAN, UPI, Invoicing│  │  Quiz, Certificate,  │  │
│  │  Tailwind v4 + Radix UI  │  │  FinTech Standee Cards   │  │  Checkpoint Runners  │  │
│  └─────────────┬────────────┘  └─────────────┬────────────┘  └──────────┬───────────┘  │
│                │                             │                          │              │
│                └──────────────────────┬──────┴──────────────────────────┘              │
│                                       ▼                                                │
│                         ┌──────────────────────────┐                                   │
│                         │     @abeta.dev/auth      │                                   │
│                         │     (packages/auth)      │                                   │
│                         │  Headless Client + React │                                   │
│                         │  HttpOnly Cookies + CSRF │                                   │
│                         └─────────────┬────────────┘                                   │
│                                       │                                                │
│                                       ▼                                                │
│                     ┌───────────────────────────────────┐                              │
│                     │       @abeta.dev/react-libs       │                              │
│                     │       (Repository Root '.')       │                              │
│                     │  Omnibus Package (100% Backward   │                              │
│                     │  Compatible Legacy Re-Exports)    │                              │
│                     └───────────────────────────────────┘                              │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### Core Package Roles

| Package | Path | Purpose & Capabilities | Runtime Model |
| :--- | :--- | :--- | :--- |
| **`@abeta.dev/ui`** | `packages/ui` | 111 accessible Tailwind CSS v4 + Radix UI primitives (buttons, tables, dialogs, drawers, charts, cards, banners). | Client & Server (`'use client'` components + RSC-safe `./utils`) |
| **`@abeta.dev/india`** | `packages/india` | India statutory engine: GSTIN, PAN, IFSC, TAN, FSSAI validators, tax calculations, Lakhs/Crores formatters, and UPI QR standees. | Pure Node/RSC for root logic; interactive client components in `./react` |
| **`@abeta.dev/talent`** | `packages/talent` | Verified credentials, proof-of-work certificates (print-optimized), interactive quiz and checkpoint runners. | React 19 Client components |
| **`@abeta.dev/auth`** | `packages/auth` | Headless session lifecycle, token refresh mutex, Web Locks cross-tab sync, HttpOnly cookie support, and auth UI modals. | Headless core (zero React runtime) + React provider hooks |
| **`@abeta.dev/react-libs`**| Root (`.`) | Omnibus barrel providing complete backward compatibility with all historical imports. | Hybrid (Omnibus) |

---

## 3. Key Product Capabilities

### 1. High-Density Enterprise UI Primitives
* **Data Presentation**: Virtualized and paginated `DataTable` with faceted filters, server-side sorting, column visibility toggles, and CSV/Excel export triggers.
* **Forms & Validation**: Integrated with React Hook Form and Zod schemas, featuring accessible labels, field descriptions, inline validation states, and floating error summaries.
* **Overlays & Feedback**: Non-modal sheets, accessible dialogs, popovers, dismissible banners, and custom toasts powered by Sonner.
* **State Indicators**: Semantic badge variants, quota progress cards, metric diff indicators, and contextual loading skeletons.

### 2. Statutory India Compliance & FinTech
* **Statutory Checksum Verification**: Offline regex and MOD 36 checksum algorithms for GSTIN and PAN validation, preventing invalid data entry before API calls.
* **GST Split Calculations**: Deterministic calculation of CGST, SGST, and IGST breakdowns based on state code origin-destination logic.
* **Interactive UPI Payment Standee**: Dynamic SVG QR code rendering conforming to NPCI specification with bilingual (English/Hindi) payment headers and clipboard copy actions.
* **Currency Formatting**: Format numbers in Indian number numbering system (Lakhs and Crores) with appropriate currency symbol placement.

### 3. Enterprise Security & Session Resilience
* **Single-Flight Refresh Mutex**: Prevents race conditions when multiple concurrent client queries encounter expired short-lived access tokens.
* **Cross-Tab Synchronization**: Web Locks API and BroadcastChannel coordination to ensure single-tab refresh token consumption and instant cross-tab logout.
* **Click Backpressure**: Built-in hook protection against double-submission of high-value actions (payments, approvals, registrations).

---

## 4. Engineering Quality Truth Gates

Every build in `@abeta.dev` is validated against uncompromising quality gates:

1. **Strict TypeScript (Zero Any)**: Strict mode enabled across all packages. Every export provides full `.d.ts` declaration maps.
2. **Test Coverage & Verification**: >80% code coverage requirement across lines, branches, and functions with Vitest and `@testing-library/react`.
3. **SSR Smoke & Hydration Safety**: Automated SSR test runner ensuring zero hydration mismatch errors or window access crashes during server rendering.
4. **Bundle Size Enforcement**: Subpath micro-bundles tracked with strict size-limit budgets to prevent dependency leakage.
5. **Craft Verification (`impeccable detect`)**: Continuous scanning to catch placeholder images, broken assets, AI color palettes, and dated bounce easings before code reaches production.

---

## 5. Technology Stack & Prerequisites

* **UI Framework**: React 19 / React 18
* **Styling Engine**: Tailwind CSS v4 with custom property `@theme inline`
* **Headless Primitives**: Radix UI Primitives (`@radix-ui/react-*`)
* **Icons**: Lucide React (`lucide-react`)
* **Testing**: Vitest, `@testing-library/react`, JSDOM, V8 Coverage
* **Node Environment**: Node.js `>= 20.0.0`
* **Package Manager**: npm 11+ workspaces
