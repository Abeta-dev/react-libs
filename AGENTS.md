# AGENTS.md — Master Agent & Engineering Handbook

> **Universal Multi-Agent Engineering Architecture & CI Invariant Standards**  
> **Repository:** `@abeta.dev/react-libs` (Omnibus) & Modular Workspace Packages (`@abeta.dev/ui`, `@abeta.dev/india`, `@abeta.dev/talent`, `@abeta.dev/auth`)  
> **Target Framework:** React 19 / React 18, Tailwind CSS v4, Radix UI Primitives, Node.js `>= 20.0.0`

---

## 1. Executive Architecture Overview

This repository is organized as a high-performance **npm workspace monorepo** containing four domain-scoped modular packages plus a legacy omnibus root package. Every AI coding agent (Claude Code, Gemini CLI, Cursor, GitHub Copilot, Antigravity) must adhere to the structural boundaries, export maps, and quality invariants established below.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                               @abeta.dev Monorepo Matrix                               │
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

---

## 2. Monorepo Package Topology

### 1. `@abeta.dev/ui` (`packages/ui`)
* **Role**: Primary UI design system layer.
* **Contents**: 111 accessible Tailwind CSS v4 + Radix UI primitives, data display cards, forms, tables, overlays, and charts.
* **Exports**:
  * `.` — Full UI component library barrel (client components).
  * `./utils` — Pure RSC-safe utility helpers (`cn`, `clsx`, `tailwind-merge`).
  * Standalone micro-bundles: `./button`, `./dialog`, `./card`, `./badge`, `./input`, `./data-table`, `./table`, `./select`, `./form`, `./sheet`, `./drawer`, `./popover`, `./tooltip`, `./calendar`, `./date-range-picker`, `./command`, `./chart`, `./carousel`.
* **Styling**: Tailwind CSS v4 token-driven architecture. The consumer app includes `@source "../node_modules/@abeta.dev/ui"` and `@import "@abeta.dev/ui/dist/style.css"` or uses the precompiled CSS.

### 2. `@abeta.dev/india` (`packages/india`)
* **Role**: India statutory compliance, invoicing, tax calculation, and regional FinTech components.
* **Subpaths**:
  * `.` (`@abeta.dev/india`) — **RSC & Server-Safe**: Zero-DOM statutory validators (`validateGSTIN`, `validatePAN`, `validateIFSC`, `validateFSSAI`, `validatePincode`), tax calculators (CGST, SGST, IGST splits), Indian currency formatters (Lakhs/Crores), and NPCI UPI payment URI generators (`generateUpiPayUri`, `validateUpiId`, `parseUpiPayUri`).
  * `./react` (`@abeta.dev/india/react`) — **Client Components** (`'use client'`): Interactive regional components, such as `AmountSummaryCardIndia` and `UpiQrCard` (counter standee with real-time QR generation and bilingual Hindi/English headers).

### 3. `@abeta.dev/talent` (`packages/talent`)
* **Role**: Talent evaluation, candidate assessment, diagnostic quizzes, and verifiable credentials.
* **Contents**:
  * `ProofOfWorkCertificate`: Cryptographically verifiable credential card with `@media print` single-page print stylesheet and hydration-safe date rendering.
  * `CheckpointRunner`: Multistage milestone assessment runner with local-first persistent state synchronization.
  * `QuizRunner`: Timed interactive evaluation with telemetry event callbacks.

### 4. `@abeta.dev/auth` (`packages/auth`)
* **Role**: Security-first, headless authentication and session lifecycle management.
* **Subpaths**:
  * `@abeta.dev/auth/core`: Pure TypeScript, zero React runtime, zero `'use client'`. Manages in-memory token snapshots, single-flight refresh mutex, HttpOnly cookie refresh, CSRF protection, and cross-tab session invalidation via Web Locks and BroadcastChannel.
  * `@abeta.dev/auth/react` (and `.`): React 19 client provider (`AuthClientProvider`), reactive snapshot subscriber (`useAuthClientSnapshot`), and click backpressure hook (`useClickBackpressure`).
  * Standalone UI components: `LoginForm`, `MfaChallengeModal`, `RoleGate`, `SessionExpiryBanner`.

### 5. `@abeta.dev/react-libs` (Repository Root `.`)
* **Role**: Omnibus backward-compatibility package.
* **Deprecation Notice**: While marked deprecated to guide greenfield projects to modular scoped packages, all legacy import paths are strictly preserved and tested with **zero breaking changes**:
  * `@abeta.dev/react-libs` (Root barrel)
  * `@abeta.dev/react-libs/utils` (Pure server-safe utilities)
  * `@abeta.dev/react-libs/india` & `@abeta.dev/react-libs/india/react`
  * `@abeta.dev/react-libs/analytics` & `@abeta.dev/react-libs/analytics/react`
  * `@abeta.dev/react-libs/pdf` (Client-only PDF viewer isolating `pdfjs-dist`)
  * `@abeta.dev/react-libs/hooks/use-toast`
  * `@abeta.dev/react-libs/auth`
  * Micro-bundle subpaths: `/button`, `/dialog`, `/card`, `/badge`, `/input`, `/data-table`, `/charts`, `/command`, `/drawer`, `/carousel`, `/calendar`, `/date-picker`, `/form`.

---

## 3. Strict CI Invariants & Truth Gates

Every pull request, commit, and agent operation is validated against six immutable verification gates in CI:

### Gate 1: Zero `--ignore-rules` in ATT W
* **Requirement**: `@arethetypeswrong/cli` (`attw`) must analyze all packed output artifacts without suppressing any type errors.
* **Invariant**: The flag `--ignore-rules` is strictly forbidden in `package.json`, `.github/workflows/`, and `.attw.json`.
* **Verification**: `npm run check:types-pkg` runs `attw --pack . --exclude-entrypoints ./dist/style.css ./theme.css ./styles/theme.css`.

### Gate 2: Directive Boundary Discipline & Clean DTS Packaging
* **Client Modules**:
  * Files in `CLIENT_FILES` (e.g. `dist/index.js`, `dist/pdf.js`, `dist/button.js`, `dist/india/react/index.js`) must begin with the literal string `'use client';` in their first 40 bytes.
  * Must not contain duplicate `'use client'` statements.
* **Universal / Server Modules**:
  * Files in `UNIVERSAL_FILES` (e.g. `dist/utils.js`, `dist/india/index.js`, `dist/analytics/index.js`) must NOT contain `'use client'` anywhere in their body.
* **Clean DTS Output**:
  * Build configs must not emit stray hashed type chunks (e.g. `use-toast-*.d.ts`).
* **Verification**: `node scripts/verify-directives.mjs`.

### Gate 3: CI Truth Gate (`docs-match-tree.mjs`)
* **Version Alignment**: Asserts that `package.json` version, `README.md` badges, and top entry in `CHANGELOG.md` match the target git tag or release version exactly.
* **Action Version Pinning**: All GitHub Actions in `.github/workflows/` must use pinned, legitimate major versions (`actions/checkout@v4`, `actions/setup-node@v4`, `actions/upload-pages-artifact@v3`, `actions/deploy-pages@v4`).
* **Engine Enforcement**: Asserts that docs do not advertise unsupported Node versions (< 20.0.0).
* **Verification**: `npm run check:truth`.

### Gate 4: Exported Symbol & Component Inventory Gate
* **Requirement**: Every component mentioned in `README.md` and every bullet under `### Added` in `CHANGELOG.md` must be cross-checked against actual TypeScript exports.
* **Invariant**: Fabricating or renaming symbols in documentation without corresponding implementation immediately halts CI.
* **Verification**: `node scripts/inventory-symbols.mjs`.

### Gate 5: P95 Performance Gate
* **Requirement**: Client component render, re-render, and mount cycles must satisfy strict performance SLAs.
* **Invariant**: P95 render latency must not exceed **750ms** across synthetic stress test matrices.
* **Verification**: `PERF_P95_THRESHOLD=750 npm run perf`.

### Gate 6: Bundle Size Budget Enforcement
* **Requirement**: Every generated artifact in `dist/` is capped by raw and gzipped size ceilings:
  * `dist/index.js`: Max Raw 530 KB, Max Gzip 105 KB
  * `dist/utils.js`: Max Raw 20 KB, Max Gzip 5 KB
  * `dist/india/index.js`: Max Raw 25 KB, Max Gzip 8 KB
  * Standalone Primitives (`button`, `card`, `badge`, `input`): Max Raw 6-8 KB, Max Gzip 2-3 KB
* **Verification**: `npm run check:size`.

---

## 4. Standard Operational Commands

| Command | Purpose |
| :--- | :--- |
| `npm run build` | Builds packages/auth, wipes root dist, compiles ESM/CJS bundles via tsup, and compiles Tailwind v4 CSS. |
| `npm run build:packages` | Compiles all four workspace packages (`@abeta.dev/ui`, `@abeta.dev/india`, `@abeta.dev/talent`, `@abeta.dev/auth`). |
| `npm run test` | Executes full Vitest test suite with V8 coverage report and json output. |
| `npm run check:truth` | Executes CI Truth Gate (`scripts/docs-match-tree.mjs`), validating versions, directives, attw, and inventory. |
| `npm run check:size` | Executes bundle size budget check against all built artifacts. |
| `npm run check:directives` | Verifies `'use client'` presence in client bundles and total absence in universal modules. |
| `npm run check:ssr` | Runs SSR hydration smoke tests (`src/__tests__/ssr-smoke.test.tsx`). |
| `npm run check:types` | Runs `tsc --noEmit` across root TypeScript configuration. |
| `npm run lint` | Runs ESLint with zero-warning tolerance (`--max-warnings 0`). |
| `npm run lint:fix` | Automatically fixes autofixable ESLint and formatting issues. |
| `npm run storybook` | Starts local Storybook dev server on port 6006. |
| `npm run build-storybook` | Compiles static Storybook documentation into `storybook-static/`. |

---

## 5. Architectural Conventions for AI Agents

1. **Directive First Rule**:
   * Any component importing React hooks (`useState`, `useEffect`, `useRef`, etc.) or accessing DOM APIs (`window`, `document`, `navigator`) must have `'use client';` at line 1.
   * Any utility file containing math, string formatting, or pure validation must NEVER contain `'use client'`.

2. **Tailwind CSS v4 Only**:
   * Do not create or reference `tailwind.config.js` or `tailwind.config.ts`.
   * Use CSS theme variables declared in `src/styles/theme.css` (`--primary`, `--background`, `--radius`, etc.).
   * Use the `cn(...)` utility (`clsx` + `tailwind-merge`) for all class merging.

3. **Accessibility First (WCAG 2.2 AA)**:
   * Always provide accessible labels, ARIA roles, and keyboard handlers.
   * Use `React.useId()` for dynamic element ID pairing between inputs and error messages.
   * Interactive buttons in loading states must show a spinner and announce `aria-busy="true"`.
   * Error banners must declare `role="alert"`.

4. **100% Backward Compatibility**:
   * When refactoring or adding features to `@abeta.dev/ui`, always ensure corresponding re-exports are maintained in root `src/index.ts` so `@abeta.dev/react-libs` consumers experience zero breakage.
   * Never modify existing export signatures without adding deprecation notices and backwards-compatible adapters.

5. **Documentation Metrics Truthfulness**:
   * Never hardcode test counts, component counts, or coverage percentages in documentation. They must be verifiable by `node scripts/measure-metrics.mjs`.
