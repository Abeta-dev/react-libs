# Product

<!-- impeccable:product-schema 1 -->

> **@abeta.dev Modular React 19 UI, India Compliance, Talent, Auth, Analytics & MCP Suite**  
> **Scope:** Shared root product authority for `@abeta.dev/ui`, `@abeta.dev/india`, `@abeta.dev/talent`, `@abeta.dev/auth`, `@abeta.dev/analytics`, `@abeta.dev/mcp`, and legacy omnibus `@abeta.dev/react-libs`

## Platform

web

## Users

- **Frontend & Full-Stack Engineers** building React 18/19 B2B SaaS products, vendor management portals, multi-tenant operational dashboards, and Indian enterprise FinTech workflows (Next.js App Router, Vite, or non-Tailwind React hosts).
- **Backend / Node / RSC Engineers** who need offline Indian statutory validation, GST/TDS calculation, Indian currency formatting, and NPCI UPI URI generation (`@abeta.dev/india`), headless cookie-backed session clients (`@abeta.dev/auth/core`), or zero-React behavioral analytics (`@abeta.dev/analytics`) without pulling React or UI dependencies into server bundles.
- **Design Engineers, Product Managers & AI Coding Agents** consuming machine-readable package contracts (`llms.txt`, `public/llms-full.txt`, `public/context-graph.json`, `public/rag-chunks.jsonl`, `public/registry.json`, `skills/react-libs*/SKILL.md`, and `@abeta.dev/mcp`) and Storybook documentation to ship accessible, high-density interfaces without regressions.

## Product Purpose

`@abeta.dev/react-libs` and its modular `@abeta.dev/*` scoped packages eliminate the tradeoff between fast enterprise delivery, strict SSR/RSC correctness, WCAG accessibility, and Indian statutory domain readiness.

Success means teams can:
1. Adopt only the scoped domain package they need (`@abeta.dev/ui`, `@abeta.dev/india`, `@abeta.dev/talent`, `@abeta.dev/auth`, `@abeta.dev/analytics`, `@abeta.dev/mcp`) with dual ESM/CJS exports and zero-bloat peer boundaries, while legacy `@abeta.dev/react-libs` consumers keep 100% backward compatibility.
2. Ship both Tailwind CSS v4 (`@abeta.dev/ui/theme.css`) and zero-Tailwind (`@abeta.dev/ui/style.css` wrapped in `@layer abeta-ui`) apps cleanly without cascade collisions.
3. Rely on automated CI truth gates so documented symbols, bundle budgets, `'use client'` directives, leaf-import isolation, deprecation windows, starter templates, TypeScript module resolution (`attw` with zero `--ignore-rules`), and AI/RAG/context-graph discovery files never drift from published artifacts.

## Positioning

Unlike general-purpose UI kits that stop at generic form controls or require heavy runtime CSS-in-JS, `@abeta.dev/*` combines four capabilities in one strictly governed monorepo:

1. **Two-Tier RSC/Client Isolation:** Pure server/Node entrypoints (`@abeta.dev/ui/utils`, `@abeta.dev/india`, `@abeta.dev/auth/core`, `@abeta.dev/analytics`, `@abeta.dev/mcp`) are verified free of `'use client'` and browser globals, while heavy browser workers (`PdfViewer` in `./pdf`) are isolated behind dedicated subpaths.
2. **Production India Statutory & FinTech Primitives:** Offline checksum validators (GSTIN, PAN, IFSC, FSSAI, Pincode, Phone, Bank Account), deterministic CGST/SGST/IGST & TDS math, Lakhs/Crores formatting, and NPCI UPI QR/URI tooling with optional UI peer dependencies so Node backends install zero React bloat.
3. **Security-First Headless Session & Analytics Engines:** `@abeta.dev/auth/core` provides framework-agnostic HttpOnly cookie session lifecycle, single-flight refresh mutex, CSRF token coordination, cross-tab synchronization, and click backpressure alongside semantic-token React forms; `@abeta.dev/analytics` adds offline-queued event batching and pluggable adapters.
4. **Machine-Verified Truth Gates & AI/RAG/MCP-Native Discovery:** Automated CI gates (zero `--ignore-rules` `attw`, directive boundary enforcement, `docs-match-tree` including `llms.txt`, `SKILL.md`, `context-graph.json`, `rag-chunks.jsonl`, leaf-import isolation, strict deprecation windows, starter template checks, symbol inventory, P95 latency SLA, and 23 bundle budgets) paired with an offline-first stdio MCP server (`@abeta.dev/mcp`).

## Operating Context

- **Monorepo Topology:** npm workspace monorepo (`packages/ui`, `packages/india`, `packages/talent`, `packages/auth`, `packages/analytics`, `packages/mcp`) plus legacy omnibus root package (`.`), orchestrated via Turborepo and `tsup`.
- **Consumer Environments:** Next.js App Router (RSC + Tailwind CSS v4), Vite + React 19 (including zero-Tailwind hosts using precompiled `@layer` stylesheets), Node.js `>= 20.0.0` server/API runtimes, and MCP-compatible AI agents (`npx -y @abeta.dev/mcp`).
- **Documentation & Evaluation Rituals:** Interactive component catalog on GitHub Pages Storybook (`https://abeta-dev.github.io/react-libs/`), runnable starter apps under `examples/nextjs-app-router` and `examples/vite-react-19`, and local/CI verification via `npm run check:truth`, `npm run check:types-packages`, `npm run check:size`, `npm run check:ssr`, `npm run check:leaf-imports`, `npm run check:deprecations`, `npm run check:examples`, and `npm run verify:packed-consumers`.
- **Release & Supply-Chain Workflow:** Tag-driven dual publishing (`v*`) across all 7 packages to npm (with OIDC provenance) and GitHub Packages (`npm.pkg.github.com`) gated on latest green CI check-runs, CodeQL, Dependabot, and OpenSSF Scorecard.

## Capabilities and Constraints

### Monorepo Package Roles

| Package | Path | Role & Capabilities | Runtime Boundary |
| :--- | :--- | :--- | :--- |
| **`@abeta.dev/ui`** | `packages/ui` | Accessible Tailwind CSS v4 + Radix UI design system primitives (data tables, forms, dialogs, drawers, sheets, charts, cards, banners, hooks), dual CSS delivery (`./theme.css`, `./style.css`), isolated `./pdf` viewer, and 18 standalone micro-bundles. | Client components (`'use client'`), isolated `./pdf`, and RSC-safe `./utils` |
| **`@abeta.dev/india`** | `packages/india` | Offline statutory validators (GSTIN, PAN, IFSC, FSSAI, Pincode, Phone, Bank Account), GST split & TDS calculators, Lakhs/Crores formatters, Indian state/city/language datasets, WhatsApp links, NPCI UPI URI engine, and bilingual/UPI FinTech React cards. | Pure Node/RSC root (`.`, optional UI peers) + client `./react` |
| **`@abeta.dev/talent`** | `packages/talent` | Verifiable `ProofOfWorkCertificate` (print-optimized, hydration-safe), `CheckpointRunner`, `DiagnosticQuiz`, `PipelineKanban`, `ProofOfWorkCard`, `MatchScoreGauge` (configurable `thresholds`), `RadarSweep`, and `SalaryRangeDisplay`. | React 18/19 Client components |
| **`@abeta.dev/auth`** | `packages/auth` | Headless `AuthClient`, `createAuthenticatedFetch`, `TokenManager`, PKCE utilities, `MockAuthAdapter`, `useClickBackpressure`, React providers/hooks, and semantic-token drop-in auth UI cards/forms. | Pure TS `./core` (zero React) + client `.` and `./react` |
| **`@abeta.dev/analytics`** | `packages/analytics` | Behavioral `AnalyticsEngine`, offline-persisted `AnalyticsQueue`, `SessionManager`, `DomTracker`, pluggable vendor adapters (`ConsoleAdapter`, `HttpAdapter`, `GoogleAnalyticsAdapter`, `MixpanelAdapter`), and React trackers (`AnalyticsProvider`, `useAnalytics`, `TrackArea`, `PageViewTracker`). | Pure Node/RSC root (`.`, optional React peers) + client `./react` |
| **`@abeta.dev/mcp`** | `packages/mcp` | Zero-dependency offline-first stdio MCP server (`abeta-mcp`) and SDK exposing 5 tools (`abeta_list_packages`, `abeta_lookup_symbol`, `abeta_check_rsc_boundary`, `abeta_search_rag`, `abeta_traverse_context_graph`) and 4 resources. | Pure Node.js (`>= 20.0.0`) stdio CLI + ESM/CJS SDK |
| **`@abeta.dev/react-libs`** | Root (`.`) | Legacy omnibus package preserving 100% backward-compatible re-exports across all historical subpaths (formal sunset tracked in `deprecations.json`). | Hybrid (Omnibus) |

### Technical & Operational Constraints

- **Framework & Runtime:** React 18.2+ / React 19, Tailwind CSS v4 (`@theme` / `@layer`, no `tailwind.config.js`), TypeScript strict mode (`exactOptionalPropertyTypes` compatible), Node.js `>= 20.0.0`.
- **100% Backward Compatibility:** Legacy root `@abeta.dev/react-libs` exports must never break without deprecation notices and compatible adapters.
- **Immutable CI Gates:** Zero `--ignore-rules` in `attw`, zero ESLint warnings (`--max-warnings 0`), strict directive separation (`head -c 40` `'use client'` on client bundles, zero leaks in universal bundles), P95 render SLA (`<= 750ms`), and strict per-subpath raw/gzip size ceilings.
- **No Unmeasured Claims:** Documentation must never hardcode volatile test counts, coverage percentages, or unverified bundle sizes; `scripts/measure-metrics.mjs` enforces alignment with measured artifacts.

## Brand Commitments

- **Identity & Naming:** Published under the `@abeta.dev` scope by `Abeta-dev` under the MIT License; part of the broader Abeta Full-Stack Ecosystem alongside Go backend libraries (`go-libs`, `go-app-kit`).
- **Official Public Surface:** Storybook documentation and `llms.txt` / `llms-full.txt` hosted at `https://abeta-dev.github.io/react-libs/` and repository at `https://github.com/Abeta-dev/react-libs`.
- **Anti-Slop Craft Commitment:** Continuous automated hygiene enforced via `impeccable detect` (zero findings across `src/`, `packages/`, `examples/`) and strict separation between product truth (`PRODUCT.md`) and design system tokens (`DESIGN.md`).

## Evidence on Hand

Only verifiable repository and publication artifacts may be cited in documentation, release notes, or showcases:

- **Live Documentation & AI Indexes:** GitHub Pages Storybook (`https://abeta-dev.github.io/react-libs/`), [llms.txt](llms.txt), [public/llms.txt](public/llms.txt), [public/llms-full.txt](public/llms-full.txt), [public/context-graph.json](public/context-graph.json), [public/rag-chunks.jsonl](public/rag-chunks.jsonl), [public/registry.json](public/registry.json), and 8 portable Agent Skills ([skills/react-libs/SKILL.md](skills/react-libs/SKILL.md), `skills/react-libs-{ui,india,talent,auth,analytics,mcp}/SKILL.md`, [.skills/react-libs/SKILL.md](.skills/react-libs/SKILL.md)).
- **Published Packages:** Scoped packages on npm and GitHub Packages (`@abeta.dev/ui`, `@abeta.dev/india`, `@abeta.dev/talent`, `@abeta.dev/auth`, `@abeta.dev/analytics`, `@abeta.dev/mcp`, `@abeta.dev/react-libs`).
- **Runnable Starter Templates:** [examples/nextjs-app-router](examples/nextjs-app-router) (Next.js App Router + Tailwind CSS v4 + RSC `@abeta.dev/india`) and [examples/vite-react-19](examples/vite-react-19) (Vite + React 19 zero-Tailwind `@abeta.dev/ui/style.css`).
- **Automated Verification Evidence:** Vitest test & SSR hydration suite (`src/__tests__/ssr-smoke.test.tsx`), `scripts/docs-match-tree.mjs`, `scripts/check-bundle-size.mjs`, `scripts/verify-directives.mjs`, `scripts/verify-packed-consumers.mjs`, `attw` matrices, CodeQL, and OpenSSF Scorecard.
- **Explicit Absences (Do Not Fabricate):** No external customer logos, named enterprise case studies, user testimonials, SLA pricing tiers, or third-party benchmark comparisons are established on record. Future work must never invent them.

## Product Principles

1. **Modular by Default, Compatible Forever:** New adoption flows through focused `@abeta.dev/*` packages with minimal dependencies, while legacy `@abeta.dev/react-libs` consumers remain unbroken.
2. **Boundary Purity Over Convenience:** Server/RSC/Node code never imports browser or React hooks, client modules declare explicit `'use client'` headers, and heavy optional workers stay isolated on dedicated subpaths.
3. **Verifiable Truth Over Marketing Copy:** Every exported symbol, version badge, bundle size claim, and AI skill contract is enforced automatically in CI — if a check cannot prove it, documentation does not claim it.
4. **Domain Correctness Built In:** Statutory compliance (GSTIN/PAN/IFSC/UPI/GST split) and auth resilience (HttpOnly single-flight refresh, CSRF, backpressure) are treated as first-class primitives, not consumer boilerplate.
5. **Accessible, High-Density Craft:** Every interactive primitive ships with keyboard navigation, semantic ARIA states, and deterministic rendering without runtime CSS overhead or generic AI visual filler.

## Accessibility & Inclusion

- **Baseline Standard:** WCAG 2.1 AA and WCAG 2.2 AA compliance across interactive primitives via Radix UI headless foundations, semantic focus management, `React.useId()` error pairing, `role="alert"` live feedback, and `aria-busy` async states.
- **Automated Enforcement:** `eslint-plugin-jsx-a11y`, Storybook `@storybook/addon-a11y`, automated `axe-core` test assertions, and reduced-motion support (`@media (prefers-reduced-motion: reduce)`).
- **Regional & Bilingual Support:** `@abeta.dev/india/react` supports bilingual English/Hindi interfaces (`LanguageToggle`, `BilingualTooltip`, `UpiQrCard`, `AmountSummaryCardIndia`) and Indian numbering conventions (Lakhs/Crores, `₹` INR formatting).
