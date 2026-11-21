---
name: react-libs-ui
description: Implementation guide for @abeta.dev/ui (v0.21.0) — 111 accessible React 19 Tailwind CSS v4 + Radix UI components, 9 hooks, RSC-safe ./utils, isolated ./pdf, micro-bundles, and ./theme.css / ./style.css delivery.
---

# `@abeta.dev/ui` Skill (`v0.21.0`)

## Installation

```bash
npm install @abeta.dev/ui
```

## Entrypoints & RSC Boundaries

| Subpath | Directive | Contents |
| :--- | :--- | :--- |
| `@abeta.dev/ui` | `'use client'` | Full barrel: 110 UI components, 9 hooks (`useDebounce`, `useLocalStorage`, `useLocalFirstStore`, `useOfflineQueue`, `useClickBackpressure`, `useIsMobile`, `useToast`, `usePlatform`, `usePwaInstall`), formatters & masking |
| `@abeta.dev/ui/utils` | **RSC / Server-Safe** | `cn`, currency/date/number/size formatters, and PII masking helpers (zero React/DOM) |
| `@abeta.dev/ui/pdf` | `'use client'` | Isolated `PdfViewer` (`file: string \| File`) keeping `pdfjs-dist` workers out of Node SSR |
| `@abeta.dev/ui/hooks/use-toast` | `'use client'` | Standalone imperative `useToast` and `toast` |
| `@abeta.dev/ui/theme.css` | CSS | Tailwind CSS v4 `@theme` design tokens, `:root` / `.dark` variables, and cascade layers |
| `@abeta.dev/ui/style.css` | CSS | Precompiled `@layer abeta-ui` stylesheet for non-Tailwind apps |
| Micro-bundles (`./button`, `./dialog`, `./card`, `./badge`, `./input`, `./data-table`, `./table`, `./select`, `./form`, `./sheet`, `./drawer`, `./popover`, `./tooltip`, `./calendar`, `./date-range-picker`, `./command`, `./chart`, `./carousel`) | `'use client'` | Tree-shaken single-component bundles isolating heavy optional peers (`recharts`, `cmdk`, `vaul`, `react-day-picker`, `react-hook-form`, `embla-carousel-react`) |

## Key Conventions

- Use `SonnerToaster` / `Sonner` (aliased) alongside Radix `Toaster` to prevent name collisions.
- Always pair Tailwind CSS v4 `@import "@abeta.dev/ui/theme.css"` with `@source "../node_modules/@abeta.dev/ui";` (or import `@abeta.dev/ui/style.css` in zero-Tailwind apps).
- Never bypass `DESIGN.md` semantic tokens (`--primary`, `--background`, `--muted-foreground`, `--destructive`) with uncalibrated indigo/purple AI-slop gradients or `animate-bounce`.
- Preserve WCAG 2.2 AA: `React.useId()` input/error pairing, `role="alert"` error banners, `aria-busy` on loading buttons, and zero `axe-core` violations.
