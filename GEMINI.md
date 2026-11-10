# GEMINI.md — Gemini CLI & Antigravity Agent Guidelines

> **Operational Guidelines for Google Gemini CLI, Antigravity, and Autonomous DeepMind Agents**  
> **Repository:** `@abeta.dev/react-libs` (Monorepo Workspace)  
> **Key Capabilities:** React 19 Design System, India Statutory Compliance, Talent Assessment, Headless Auth

---

## 1. System Execution Model & Behavioral Rules

As a Gemini CLI or Antigravity agent operating in this repository, you must observe the following core principles:

### Reactive Wakeup & Non-Polling Architecture
* **Do NOT poll in a loop**: When launching asynchronous background commands (`run_command` with backgrounding), long builds, or subagents (`invoke_subagent`), do NOT poll task status or sleep in a loop.
* **Reactive Resumption**: The Antigravity runtime automatically resumes agent execution when background tasks finish or when messages arrive from subagents.
* **Stop Calling Tools When Waiting**: Once an asynchronous task or subagent is launched, conclude your turn without further tool calls if you have no other independent tasks to perform. The system will wake you up immediately upon task completion.
* **No Shell Sleep Timers**: Never execute `sleep 5` or similar bash sleep commands to wait. If a delay or scheduled wake-up is required, use the designated `schedule` tool.

### Parallel Subagent Coordination
* When assigned large, multi-domain tasks (such as simultaneously refactoring `@abeta.dev/ui` components and running `@abeta.dev/india` statutory test suites), delegate isolated scopes to specialized subagents.
* Communicate results back to parent agents using `send_message` targeting the parent conversation ID.

### Strict File Editing Discipline
* When modifying existing files with `edit_file`, ensure the `Target` string matches the exact character sequence, indentation, and whitespace of the file.
* Keep edits targeted and avoid sweeping reformats of unrelated code to preserve git blame integrity and documentation comments.

---

## 2. Monorepo Structure & Package Invariants

The repository consists of 4 domain packages under `packages/*` and an omnibus root package:

```
react-libs/
├── packages/
│   ├── ui/       # @abeta.dev/ui (111 Tailwind v4 + Radix UI accessible primitives)
│   ├── india/    # @abeta.dev/india (GSTIN/PAN/IFSC/UPI domain & FinTech React cards)
│   ├── talent/   # @abeta.dev/talent (ProofOfWorkCertificate, CheckpointRunner, Quizzes)
│   └── auth/     # @abeta.dev/auth (Headless auth client, token refresh mutex, CSRF)
├── src/          # Root omnibus implementation (100% backward compatibility surface)
├── scripts/      # Truth gates and CI verification scripts
└── dist/         # Production build artifacts (ESM, CJS, DTS, CSS)
```

### Module Directives & Universal Packaging
* **Client Boundaries**: Every client component in `src/components/ui/` or `packages/ui/src/` that uses hooks (`useState`, `useEffect`, `useRef`), browser APIs, or Radix UI primitives must start with `'use client';` at byte 0.
* **Universal Purity**: Modules exported as server/RSC-safe (`packages/india/src/validators.ts`, `src/utils.ts`, `packages/auth/src/core/`) must NEVER contain `'use client'` anywhere in their source or compiled bundle.
* **Verification**: Run `npm run check:directives` and `npm run check:ssr` to verify SSR hydration safety and directive boundaries.

---

## 3. CI Invariants & Truth Gate Enforcement

Gemini and Antigravity agents must never bypass or disable CI truth gates. The following gates are enforced in GitHub Actions and local scripts:

### 1. Zero `--ignore-rules` Gate
* `@arethetypeswrong/cli` (`attw`) checks type definitions across all exported package subpaths.
* Agents must NEVER introduce `--ignore-rules` to bypass type definition issues in `package.json`, `.github/workflows/`, or `.attw.json`. Fix the underlying `.d.ts` or export mapping instead.

### 2. CI Truth Gate (`npm run check:truth`)
* Runs `scripts/docs-match-tree.mjs`.
* Checks:
  * Version synchronization across `package.json`, `README.md`, `CHANGELOG.md`, and git tags.
  * Directives check (head -c 40 includes `'use client'` on client modules, zero `'use client'` in universal modules).
  * Static workflow check: action versions must use pinned major tags (e.g. `actions/checkout@v4`, `actions/setup-node@v4`).
  * Symbol inventory gate: Every component referenced in documentation must exist in code.

### 3. P95 Performance SLA Gate (`npm run perf`)
* Enforces that 95% of synthetic component mount/render benchmarks complete in `<= 750ms` (`PERF_P95_THRESHOLD=750`).

### 4. Bundle Size Gate (`npm run check:size`)
* Protects client bundle budgets:
  * `dist/index.js` <= 530 KB raw (105 KB gzip)
  * `dist/utils.js` <= 20 KB raw (5 KB gzip)
  * `dist/india/index.js` <= 25 KB raw (8 KB gzip)
  * Standalone components (`button`, `card`, `dialog`, `badge`, `input`) <= 6-15 KB raw (2-5 KB gzip)

---

## 4. Key Agent Commands

```bash
# Build packages
npm run build:packages  # Build all workspace packages
npm run build           # Build root omnibus package and compile Tailwind v4 CSS

# Test & Validate
npm run test            # Run full Vitest suite with coverage
npm run check:truth     # Run CI Truth Gate
npm run check:size      # Verify bundle size limits
npm run check:directives# Verify 'use client' boundaries
npm run check:ssr       # Run SSR smoke tests
npm run lint            # Run ESLint (zero warnings allowed)
npm run check:types     # Run TypeScript type check
```

---

## 5. Backward Compatibility Guarantee

* `@abeta.dev/react-libs` is the legacy omnibus package. Even though developers are encouraged to use scoped packages (`@abeta.dev/ui`, etc.), **zero breaking changes are permitted in root exports**.
* When modifying or adding UI components, ensure that re-exports are updated in `src/index.ts` alongside any updates to `packages/ui`.
