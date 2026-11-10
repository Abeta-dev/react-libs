# CLAUDE.md — Claude Code Developer Guide

> **Developer Guidelines & Operational Procedures for Claude Code CLI**  
> **Repository:** `@abeta.dev/react-libs` (Omnibus) & `@abeta.dev/*` Workspace Monorepo  
> **Technologies:** React 19 / 18, TypeScript (Strict), Tailwind CSS v4, Radix UI Primitives, Vitest, Turborepo

---

## 1. Quick Commands Reference

### Building & Compiling
```bash
# Build root omnibus library and compile Tailwind CSS v4
npm run build

# Build all four scoped workspace packages (@abeta.dev/ui, /india, /talent, /auth)
npm run build:packages

# Rebuild only Tailwind CSS v4 theme and utility bundle
npm run build:css
```

### Testing & Verification
```bash
# Run full Vitest suite with coverage
npm run test

# Run a specific test file
npx vitest run src/components/ui/forms/__tests__/button.test.tsx

# Run SSR hydration smoke tests
npm run check:ssr

# Run visual snapshot/smoke tests
npm run test:visual

# Run performance benchmarking (P95 latency enforcement <= 750ms)
npm run perf
```

### Linting & Quality Truth Gates
```bash
# Typecheck root codebase
npm run check:types

# Typecheck auth package
npm run --prefix packages/auth check:types

# Lint with zero warnings tolerated
npm run lint

# Auto-fix linting issues
npm run lint:fix

# Run CI Truth Gate (verifies versioning, attw without ignore-rules, directives, symbol inventory)
npm run check:truth

# Check bundle size budgets against built artifacts
npm run check:size

# Verify 'use client' directives and universal module cleanliness
npm run check:directives
```

### Storybook
```bash
# Start Storybook development server on http://localhost:6006
npm run storybook

# Build static Storybook site
npm run build-storybook
```

---

## 2. Monorepo Architecture & Package Mapping

When writing new features, components, or bugfixes, always identify the appropriate package boundary:

| Package | Path | Responsibility | Primary Entrypoints |
| :--- | :--- | :--- | :--- |
| **`@abeta.dev/ui`** | `packages/ui` | 111 accessible Tailwind v4 + Radix UI primitives, forms, data tables, overlays, charts. | `@abeta.dev/ui`, `@abeta.dev/ui/button`, `@abeta.dev/ui/card`, etc. |
| **`@abeta.dev/india`** | `packages/india` | India statutory tax, GSTIN/PAN/IFSC/FSSAI validators, NPCI UPI QR code generation, bilingual cards. | `@abeta.dev/india` (RSC/Server), `@abeta.dev/india/react` (Client) |
| **`@abeta.dev/talent`** | `packages/talent` | Diagnostic quizzes, milestone checkpoint runners, verifiable certificates (`ProofOfWorkCertificate`). | `@abeta.dev/talent` |
| **`@abeta.dev/auth`** | `packages/auth` | Headless authentication client, session state, HttpOnly cookie refresh, CSRF protection, React hooks. | `@abeta.dev/auth/core` (Server/Zero-DOM), `@abeta.dev/auth/react` |
| **`@abeta.dev/react-libs`** | `.` (root) | Omnibus umbrella package preserving 100% backward compatibility for all legacy consumer imports. | `@abeta.dev/react-libs`, `@abeta.dev/react-libs/*` |

---

## 3. Strict Coding Standards & Conventions

### React 19 & Directive Placement
1. **Client Components**:
   - Any component utilizing React hooks (`useState`, `useEffect`, `useCallback`, etc.), browser globals (`window`, `document`, `navigator`), or Radix UI interactivity must include `'use client';` as the literal first line.
   - Never place comments or imports above `'use client';`.
2. **Universal / Server Modules**:
   - Utility functions, mathematical algorithms, string formatters, and statutory validators (`packages/india/src/validators.ts`, `src/utils.ts`) must NEVER include `'use client';`.
   - Keep universal modules pure, zero-DOM, and safe for Next.js React Server Components (RSC) and Node/Edge runtimes.
3. **Dedicated Subpaths for Heavy Peers**:
   - Heavy or optional dependencies (`recharts`, `pdfjs-dist`, `cmdk`, `vaul`, `react-day-picker`) must be encapsulated within dedicated subpaths (e.g. `@abeta.dev/ui/chart`, `@abeta.dev/ui/command`, `@abeta.dev/react-libs/pdf`) to avoid pulling unused peer dependencies into minimal bundles.

### Tailwind CSS v4 & Styling
1. **No `tailwind.config.js`**:
   - This project uses pure Tailwind CSS v4 with CSS-first configuration.
   - Design tokens and variables are defined in `src/styles/theme.css` (`--background`, `--foreground`, `--primary`, `--border`, `--radius`, etc.).
2. **Class Merging**:
   - Always merge Tailwind classes using the `cn(...)` utility helper (`clsx` + `tailwind-merge`):
     ```tsx
     import { cn } from "@/utils"; // or from "@abeta.dev/ui/utils"
     
     export function CustomCard({ className, ...props }: CardProps) {
       return <div className={cn("rounded-lg border bg-card p-6 text-card-foreground shadow-sm", className)} {...props} />;
     }
     ```
3. **No Inline CSS Styles**:
   - Avoid `style={{ ... }}` for layout or colors unless dynamically interpolating arbitrary user coordinates or CSS custom properties.

### Accessibility (WCAG 2.2 AA)
1. **Dynamic IDs with `React.useId()`**:
   - Never hardcode element IDs. Use `const id = React.useId()` to pair `<label htmlFor={id}>` with `<input id={id}>` and error descriptions via `aria-describedby={`${id}-error`}`.
2. **Accessible States**:
   - Set `aria-invalid={!!error}` on invalid inputs.
   - Render error messages with `role="alert"`.
   - Interactive buttons in asynchronous pending states must render a loading spinner and announce `aria-busy="true"`.
3. **Radix Primitives & Polymorphism**:
   - Use Radix UI primitives with the `asChild` prop to enable flexible component composition without invalid nested DOM elements (e.g. nested buttons or links).

---

## 4. 100% Backward Compatibility Mandate

* **Never Break Legacy Root Exports**:
  When introducing or refactoring a component in `@abeta.dev/ui`, ensure that it is exported in `src/index.ts` and that existing prop types, subpaths, and naming conventions remain completely intact.
* **Keep Subpath Maps Synced**:
  Both `package.json` `exports` and `typesVersions` must be updated in lockstep whenever an entry point is added or modified.
* **Dual ESM/CJS Output**:
  Every build must emit both ESM (`.js`, `.d.ts`) and CommonJS (`.cjs`, `.d.cts`) files.

---

## 5. Pre-Commit / Pre-PR Verification Workflow

Before concluding any Claude Code session or submitting a pull request, run the following sequence:

1. `npm run check:types` — Verify root TypeScript types cleanly.
2. `npm run lint` — Confirm zero ESLint errors and warnings.
3. `npm run test` — Run unit and component test suites.
4. `npm run build` — Verify ESM/CJS generation and Tailwind CSS compilation.
5. `npm run check:truth` — Run the CI Truth Gate:
   - Validates version alignment between `package.json`, `README.md`, and `CHANGELOG.md`.
   - Validates zero `--ignore-rules` in `@arethetypeswrong/cli`.
   - Validates `'use client'` presence and purity across all build artifacts.
   - Validates symbol inventory between docs and code.
6. `npm run check:size` — Ensure bundle sizes remain within defined limits.
