# @abeta.dev/ui

> **Accessible, production-grade React 19 UI design system built with Tailwind CSS v4 and Radix UI.**  
> 111 component modules (406 runtime exports across forms, data tables, overlays, navigation, charts, and enterprise composites), 9 client hooks, RSC-safe utilities, dual ESM/CJS builds, and tree-shakeable micro-bundles.

[![npm version](https://img.shields.io/npm/v/@abeta.dev/ui.svg)](https://www.npmjs.com/package/@abeta.dev/ui)
[![React 19](https://img.shields.io/badge/react-18%20%7C%2019-149eca)](https://react.dev)
[![Tailwind CSS v4](https://img.shields.io/badge/tailwind-v4-38bdf8)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)
[![Storybook](https://img.shields.io/badge/storybook-docs-ff4785)](https://abeta-dev.github.io/react-libs/)

---

## Installation

```bash
npm install @abeta.dev/ui
```

Ensure React 18 or 19 is installed in your project:

```bash
npm install react@^19.0.0 react-dom@^19.0.0
```

> **Optional peer dependencies**: Heavy domain features (`recharts`, `cmdk`, `vaul`, `embla-carousel-react`, `react-day-picker`, `react-hook-form`, `react-pdf`, `next-themes`, `canvas-confetti`) are declared as **optional** peer dependencies. Install only the ones backing the components you use.

---

## Styling & CSS Setup

Choose **one** of two styling strategies depending on whether your app uses Tailwind CSS v4.

### Option 1: Tailwind CSS v4 (Recommended)

Import `@abeta.dev/ui/theme.css` in your global stylesheet (e.g. `app/globals.css` or `src/index.css`) and register `@abeta.dev/ui` with `@source` so Tailwind v4 scans component utility classes:

```css
@import "tailwindcss";
@import "@abeta.dev/ui/theme.css";
@source "../node_modules/@abeta.dev/ui";
```

This registers all semantic CSS tokens (`--primary`, `--background`, `--card`, `--muted`, `--destructive`, `--border`, `--chart-1..5`, `--sidebar-*`) with Tailwind v4's `@theme inline` directive and ships Radix UI overlay animations and `prefers-reduced-motion` accessibility rules.

### Option 2: Zero-Tailwind / Tailwind v3 / Plain CSS

If your application does not use Tailwind CSS v4, import the precompiled standalone stylesheet once at your app entry point (`src/main.tsx` or `app/layout.tsx`):

```tsx
import "@abeta.dev/ui/style.css";
```

`dist/style.css` is precompiled and encapsulated inside `@layer abeta-ui { ... }` so your application's own styles override component defaults cleanly without specificity wars or `!important`.

---

## Dark Mode & Brand Theming

Semantic tokens automatically switch when the `.dark` class is applied to `<html>` (or any container):

```tsx
// Toggle dark mode manually (or use next-themes with attribute="class")
document.documentElement.classList.toggle("dark");
```

With [`next-themes`](https://github.com/pacocoursey/next-themes) in Next.js App Router:

```tsx
"use client";

import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}
```

Override any token in `:root` / `.dark` or apply the built-in `.theme-orange` accent preset:

```css
:root {
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  --radius: 0.75rem;
}
```

---

## Framework Quick Starts

### Next.js App Router (RSC + Client Components)

Pure formatting, class merging, and masking helpers live in `@abeta.dev/ui/utils` with **zero `'use client'`** and **zero React/DOM runtime**, so they run directly in React Server Components, Server Actions, and Route Handlers:

```tsx
// app/invoices/page.tsx (React Server Component)
import { cn, formatCurrency, maskSensitiveValue } from "@abeta.dev/ui/utils";
import { InvoiceActions } from "./invoice-actions";

export default async function InvoicesPage() {
  return (
    <main className={cn("mx-auto max-w-4xl space-y-6 p-6")}>
      <h1 className="text-2xl font-semibold">Invoices</h1>
      <p>Total Due: {formatCurrency(48250, "USD", "en-US")}</p>
      <p>Account: {maskSensitiveValue("9876543210", { isMasked: true })}</p>
      <InvoiceActions />
    </main>
  );
}
```

```tsx
// app/invoices/invoice-actions.tsx
"use client";

import { Button } from "@abeta.dev/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@abeta.dev/ui/card";
import { useToast } from "@abeta.dev/ui/hooks/use-toast";

export function InvoiceActions() {
  const { toast } = useToast();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Action</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={() => toast({ title: "Invoice sent" })}>
          Send Reminder
        </Button>
      </CardContent>
    </Card>
  );
}
```

For browser-only PDF viewing (`pdfjs-dist` workers), import `PdfViewer` from the dedicated `@abeta.dev/ui/pdf` subpath inside a client component (or via `next/dynamic(..., { ssr: false })`):

```tsx
"use client";

import { PdfViewer } from "@abeta.dev/ui/pdf";

export function ContractPreview() {
  return <PdfViewer file="/contracts/msa.pdf" showDownload showPrint />;
}
```

### Vite + React 19

```tsx
// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@abeta.dev/ui/style.css"; // Or import ./index.css with Tailwind v4 theme.css
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

```tsx
// src/App.tsx
import { Badge, Button, Card, CardContent, CardHeader, CardTitle, DataTable, Toaster } from "@abeta.dev/ui";
import { useToast } from "@abeta.dev/ui/hooks/use-toast";

export default function App() {
  const { toast } = useToast();

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Vendor Orders</CardTitle>
          <Badge variant="secondary">Live</Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          <DataTable
            columns={[
              { key: "po", header: "PO #", sortable: true },
              { key: "vendor", header: "Vendor" },
            ]}
            data={[{ po: "PO-1042", vendor: "Acme Industrial" }]}
          />
          <Button onClick={() => toast({ title: "Synced orders" })}>
            Sync Now
          </Button>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
}
```

---

## Subpath Micro-Bundles & Exports

Every JavaScript subpath ships dual **ESM** (`import`) and **CommonJS** (`require`) with full TypeScript declarations (`.d.ts` & `.d.cts`), verified by `@arethetypeswrong/cli` with zero warnings.

| Subpath | Runtime / Directive | Gzip (ESM) | Contents |
|---|---|---|---|
| `@abeta.dev/ui` | Client (`'use client'`) | ~90.3 KB | Full barrel: 110 UI component modules (forms, layout, data-display, navigation, overlays, feedback, core), 9 hooks, formatters, masking & platform helpers. |
| `@abeta.dev/ui/utils` | **RSC & Server-Safe** | ~1.4 KB | Pure zero-DOM helpers: `cn`, `formatCurrency`, `formatNumber`, `formatDate`, `formatDateTime`, `formatRelativeTime`, `formatWeight`, `formatQuantity`, `formatFileSize`, `formatPercent`, `formatLocalizedDate`, `formatLocalizedDateTime`, `formatLocalizedNumber`, `formatBytes`, `maskSensitiveValue`. |
| `@abeta.dev/ui/pdf` | **Client-Only** (`'use client'`) | ~5.3 KB | Isolated `PdfViewer` subpath keeping `react-pdf` / `pdfjs-dist` browser workers out of Node.js SSR. |
| `@abeta.dev/ui/hooks/use-toast` | Client (`'use client'`) | ~1.0 KB | Standalone imperative toast hook (`useToast`, `toast`, `reducer`). |
| `@abeta.dev/ui/button` | Client (`'use client'`) | ~2.0 KB | `Button`, `buttonVariants` with loading spinners & `asChild`. |
| `@abeta.dev/ui/dialog` | Client (`'use client'`) | ~1.1 KB | Accessible Radix Dialog modal primitives. |
| `@abeta.dev/ui/card` | Client (`'use client'`) | ~1.0 KB | `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`. |
| `@abeta.dev/ui/badge` | Client (`'use client'`) | ~0.6 KB | `Badge`, `badgeVariants`. |
| `@abeta.dev/ui/input` | Client (`'use client'`) | ~0.6 KB | Accessible styled `Input` primitive. |
| `@abeta.dev/ui/data-table` | Client (`'use client'`) | ~3.3 KB | Sortable, paginated `DataTable` with skeleton loading states. |
| `@abeta.dev/ui/table` | Client (`'use client'`) | ~1.0 KB | Semantic HTML `Table` primitives. |
| `@abeta.dev/ui/select` | Client (`'use client'`) | ~1.7 KB | Accessible Radix `Select` dropdown primitives. |
| `@abeta.dev/ui/form` | Client (`'use client'`) | ~1.2 KB | `react-hook-form` accessible `Form` field context primitives. |
| `@abeta.dev/ui/sheet` | Client (`'use client'`) | ~1.2 KB | Slide-over `Sheet` panel primitives. |
| `@abeta.dev/ui/drawer` | Client (`'use client'`) | ~1.0 KB | Vaul touch-friendly `Drawer` overlay primitives. |
| `@abeta.dev/ui/popover` | Client (`'use client'`) | ~0.7 KB | Radix `Popover` primitives. |
| `@abeta.dev/ui/tooltip` | Client (`'use client'`) | ~0.8 KB | Radix `Tooltip` primitives. |
| `@abeta.dev/ui/calendar` | Client (`'use client'`) | ~4.8 KB | `react-day-picker` v9 `Calendar` primitive. |
| `@abeta.dev/ui/date-range-picker` | Client (`'use client'`) | ~5.9 KB | Composed `DateRangePicker` with presets & popover. |
| `@abeta.dev/ui/command` | Client (`'use client'`) | ~1.8 KB | `cmdk` command palette (`Command`, `CommandDialog`, `CommandInput`, `CommandList`). |
| `@abeta.dev/ui/chart` | Client (`'use client'`) | ~5.9 KB | Recharts `ChartContainer`, `ChartTooltip`, `ChartLegend` with Okabe-Ito tokens. |
| `@abeta.dev/ui/carousel` | Client (`'use client'`) | ~4.0 KB | Embla `Carousel` primitives. |
| `@abeta.dev/ui/theme.css` | CSS | ~2.3 KB | Tailwind CSS v4 `@theme inline` tokens, dark mode, and Radix animations (alias: `./styles/theme.css`). |
| `@abeta.dev/ui/style.css` | CSS | ~24.6 KB | Standalone precompiled `@layer abeta-ui` stylesheet for zero-Tailwind apps (alias: `./dist/style.css`). |

---

## Documentation & AI Discovery

- **Interactive Storybook**: [https://abeta-dev.github.io/react-libs/](https://abeta-dev.github.io/react-libs/)
- **LLM / AI Agent Index (`llms.txt`)**: [https://abeta-dev.github.io/react-libs/llms.txt](https://abeta-dev.github.io/react-libs/llms.txt)
- **Full API Reference for AI (`llms-full.txt`)**: [https://abeta-dev.github.io/react-libs/llms-full.txt](https://abeta-dev.github.io/react-libs/llms-full.txt)

## Companion Packages

- [`@abeta.dev/india`](https://www.npmjs.com/package/@abeta.dev/india) — India statutory compliance (GSTIN, PAN, IFSC, UPI QR) & FinTech cards
- [`@abeta.dev/talent`](https://www.npmjs.com/package/@abeta.dev/talent) — Proof-of-work certificates, checkpoint runners, diagnostic quizzes & hiring pipelines
- [`@abeta.dev/auth`](https://www.npmjs.com/package/@abeta.dev/auth) — Headless `AuthClient`, HttpOnly cookie refresh mutex, CSRF protection & auth forms

## License

[MIT](./LICENSE) © 2026 [abeta-dev](https://abeta.dev)
