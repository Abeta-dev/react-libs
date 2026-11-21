---
name: react-libs
description: Umbrella router and integration guide for the Abeta React Ecosystem (@abeta.dev/ui, @abeta.dev/india, @abeta.dev/talent, @abeta.dev/auth, v0.21.0). Use when selecting scoped React 19 packages, configuring Tailwind CSS v4 themes, preserving RSC vs 'use client' boundaries, or running react-libs CI truth gates.
---

# `react-libs` Umbrella Skill (`v0.21.0`)

Monorepo packages (`npm` `@abeta.dev/*` & GitHub Packages `@abeta-dev/*`, React `^18.2.0 || ^19.0.0`, Tailwind CSS v4, Node.js `>= 20.0.0`).

- **Live Storybook**: `https://abeta-dev.github.io/react-libs/`
- **AI Context Index**: `https://abeta-dev.github.io/react-libs/llms.txt` (`llms-full.txt`)

## When to Use

- Choosing which of the 4 modular scoped packages (`@abeta.dev/ui`, `@abeta.dev/india`, `@abeta.dev/talent`, `@abeta.dev/auth`) fits a React 19 / Next.js App Router / Vite requirement
- Setting up Tailwind CSS v4 (`@abeta.dev/ui/theme.css` + `@source`) or zero-Tailwind (`@abeta.dev/ui/style.css`) styling
- Maintaining strict RSC purity vs `'use client'` module boundaries
- Contributing to `Abeta-dev/react-libs` and passing all 6 CI truth gates

## Subskill Routing

| Domain | Subskill | Package & Scope |
| :--- | :--- | :--- |
| **Core UI Design System** | [`react-libs-ui`](../react-libs-ui/SKILL.md) | `@abeta.dev/ui` — 111 accessible Radix UI + Tailwind v4 components, 9 hooks, RSC `./utils`, isolated `./pdf`, `./theme.css`, `./style.css`, 18 micro-bundles |
| **India Statutory & FinTech** | [`react-libs-india`](../react-libs-india/SKILL.md) | `@abeta.dev/india` & `@abeta.dev/india/react` — Zero-bloat RSC GSTIN/PAN/IFSC/FSSAI/Pincode validators, `calculateGSTSplit`, `calculateTDS`, NPCI UPI URIs, `UpiQrCard`, `AmountSummaryCardIndia` |
| **Talent & Verifiable Credentials** | [`react-libs-talent`](../react-libs-talent/SKILL.md) | `@abeta.dev/talent` — `ProofOfWorkCertificate`, `CheckpointRunner`, `DiagnosticQuiz`, `PipelineKanban`, `ProofOfWorkCard`, `MatchScoreGauge`, `RadarSweep`, `SalaryRangeDisplay` |
| **Headless & UI Authentication** | [`react-libs-auth`](../react-libs-auth/SKILL.md) | `@abeta.dev/auth/core`, `@abeta.dev/auth/react`, `@abeta.dev/auth` — Cookie-backed `AuthClient`, single-flight refresh mutex, CSRF, epoch invalidation, `AuthCard`, `LoginForm`, `OAuthButtonGroup` |

## Universal Styling Setup

- **Tailwind CSS v4 apps**:
  ```css
  @import "tailwindcss";
  @import "@abeta.dev/ui/theme.css";
  @source "../node_modules/@abeta.dev/ui";
  @source "../node_modules/@abeta.dev/india";
  @source "../node_modules/@abeta.dev/talent";
  @source "../node_modules/@abeta.dev/auth";
  ```
- **Zero-Tailwind apps**:
  ```tsx
  import "@abeta.dev/ui/style.css";
  ```

## CI Truth Gates & Verification

- `npm run build:packages && npm run build` — Build all 4 scoped packages + legacy omnibus + CSS bundles
- `npm run check:types && npm run --prefix packages/auth check:types` — Zero TypeScript errors
- `npm run lint` — ESLint with `--max-warnings 0`
- `npm run check:truth && npm run check:types-packages` — Version parity, directives, symbol inventory, metrics, and `@arethetypeswrong/cli` across root and all 4 scoped packages (**zero `--ignore-rules`**)
- `npm run check:directives && npm run check:size` — Directive boundaries, SSR smoke tests, and bundle size budgets
- `npm run verify:packed-consumers` — Packed tarball verification across pure backend `@abeta.dev/india` and full 5-package React consumer fixtures
- `npm run test` & `npm run build-storybook` — Full Vitest suite + Storybook static build
