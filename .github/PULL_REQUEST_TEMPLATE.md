## Summary

<!-- Provide a concise summary of the changes introduced by this pull request, the problem addressed, and relevant motivation or context. -->

Closes # <!-- issue number (if applicable) -->

## Affected Packages

Please check all packages modified by this PR:

- [ ] `@abeta.dev/ui` (`packages/ui`) — Core UI design system, Tailwind CSS v4 tokens, hooks & utilities
- [ ] `@abeta.dev/india` (`packages/india`) — India statutory validators (GSTIN/PAN/IFSC/UPI), tax calculators & FinTech React cards
- [ ] `@abeta.dev/talent` (`packages/talent`) — Proof-of-Work certificates, checkpoints, diagnostic quizzes & pipeline kanban
- [ ] `@abeta.dev/auth` (`packages/auth`) — Headless cookie-backed auth client, React provider & auth UI forms
- [ ] `@abeta.dev/react-libs` (root `.`) — Legacy backward-compatible omnibus re-exports
- [ ] Docs / Storybook / Examples / CI & Tooling (`README.md`, `public/llms*.txt`, `examples/`, `.github/`)

## Type of Change

- [ ] 🐛 Bug fix (non-breaking change that fixes an issue)
- [ ] ✨ New feature (non-breaking change that adds functionality or a new component)
- [ ] 💥 Breaking change (fix or feature that would cause existing functionality to change)
- [ ] 📝 Documentation, Storybook, `llms.txt`, or starter template update
- [ ] ♻️ Refactoring / Performance / Bundle-size optimization
- [ ] ⚙️ CI/CD / Release / Packaging pipeline changes

## Verification & CI Truth Gates

Please ensure the applicable checks pass locally before requesting review:

- [ ] `npm run build:packages && npm run build` — All 4 scoped packages + root omnibus & CSS bundles build cleanly
- [ ] `npm run check:types && npm run --prefix packages/auth check:types` — Zero TypeScript errors (`tsc --noEmit`)
- [ ] `npm run lint` — ESLint passes with `--max-warnings 0`
- [ ] `npm run test` — Unit, integration, and accessibility tests pass and meet V8 coverage thresholds
- [ ] `npm run check:size` — All bundle size budgets pass
- [ ] `npm run check:directives` — Client/server `'use client'` boundaries & SSR smoke tests pass
- [ ] `npm run check:truth && npm run check:types-packages` — CI Truth Gate & `@arethetypeswrong/cli` pass across root and all 4 scoped packages with **zero `--ignore-rules`**
- [ ] `npm run verify:packed-consumers` — Packed tarballs verified in isolated external consumer fixtures
- [ ] `npm run build-storybook` — Storybook builds cleanly with zero unresolved module imports

## Architecture, Accessibility & Documentation Check

- [ ] **RSC & Directive Boundaries**: Server/universal modules (`utils`, `@abeta.dev/india`, `@abeta.dev/auth/core`) contain zero `'use client'` directives or DOM globals
- [ ] **Backward Compatibility**: Legacy `@abeta.dev/react-libs` exports remain non-breaking
- [ ] **WCAG 2.2 AA & Design Craft**: Keyboard navigation, focus rings, ARIA roles, `prefers-reduced-motion`, and design tokens (`DESIGN.md`) verified
- [ ] **Docs & AI Discovery Sync**: Updated package `README.md`, `CHANGELOG.md`, `MIGRATION.md`, Storybook stories, and `public/llms.txt` / `public/llms-full.txt` (if public APIs changed)

## Screenshots or Recordings (if applicable)

<!-- Attach light/dark mode screenshots or short recordings demonstrating visual or interaction changes. -->
