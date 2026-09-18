# @abeta.dev/react-libs

> **Enterprise B2B Design System & Application Engine for React 19.**  
> Built for multi-tenant vendor portals, procurement dashboards, statutory compliance, and financial workflows.
> Combines accessible Tailwind CSS v4 & Radix UI primitives, India statutory validation (GSTIN, PAN, IFSC), pluggable behavioral telemetry, and offline-resilient PWA mutations into isolated, tree-shakeable subpaths.

[![Version](https://img.shields.io/badge/version-0.16.0-blue)](https://www.npmjs.com/package/@abeta.dev/react-libs)
[![Tests](https://img.shields.io/badge/tests-passing-brightgreen)](#testing)
[![React](https://img.shields.io/badge/react-19-blue)](https://react.dev)
[![Tailwind](https://img.shields.io/badge/tailwind-v4-38bdf8)](https://tailwindcss.com)
[![Storybook](https://img.shields.io/badge/storybook-10.x-ff4785)](https://react-libs.abeta.dev)

---

## Table of Contents

1. [Installation](#installation)
2. [Quick Start & Imports](#quick-start--imports)
   - [Enterprise Integration Recipe](docs/recipes/full-app-integration.md)
   - [Subpath Reference Table](#subpath-reference-table)
   - [Tree-Shaking Scope & Standalone Primitives](#tree-shaking-scope--standalone-primitives)
   - [SSR Compatibility & Hydration Architecture](#ssr-compatibility--hydration-architecture)
   - [Dedicated Client Subpath for PdfViewer](#dedicated-client-subpath-for-pdfviewer)
   - [Dual ESM & CommonJS Support](#dual-esm--commonjs-support)
3. [Styling & CSS Delivery](#styling--css-delivery)
4. [Component Reference](#component-reference)
5. [Composite Components](#composite-components)
   - [PdfViewer (Client Subpath)](#pdfviewer-client-subpath)
6. [Pluggable Behavioral Analytics](#pluggable-behavioral-analytics)
7. [Hooks](#hooks)
8. [Formatters](#formatters)
9. [Responsive Design](#responsive-design)
10. [Testing](#testing)
11. [Publishing](#publishing)
12. [Architecture & Accessibility](#architecture--accessibility)

---

## Enterprise Architecture & Subpath Matrix

`@abeta.dev/react-libs` addresses the complete domain stack required to power multi-tenant vendor portals, procurement suites, and compliance engines. Rather than imposing a heavy monolithic dependency, every domain capability is isolated into **strictly decoupled subpaths** so consumers only bundle what they import:

```
┌────────────────────────────────────────────────────────────────────────┐
│                   @abeta.dev/react-libs Module Matrix                  │
├────────────────────────────────────────────────────────────────────────┤
│ 1. Core UI Layer (@abeta.dev/react-libs)                               │
│    Accessible, themeable Tailwind v4 components, layouts & data tables │
├────────────────────────────────────────────────────────────────────────┤
│ 2. Standalone Primitives (/button, /card, /dialog, /data-table, etc.)  │
│    Micro-bundle entry points for strict per-route dashboard budgets    │
├────────────────────────────────────────────────────────────────────────┤
│ 3. India Statutory Compliance & Regional Logic (/india)                │
│    Zero-DOM GSTIN, PAN, IFSC, Lakhs/Crores, and WhatsApp tools         │
├────────────────────────────────────────────────────────────────────────┤
│ 4. Behavioral Analytics & Event Telemetry (/analytics)                 │
│    Headless audit log tracker, batch queue & DOM auto-capture          │
├────────────────────────────────────────────────────────────────────────┤
│ 5. Pure Headless Utilities (/utils)                                    │
│    Universal string formatters, masks & validators (RSC / Server-safe) │
└────────────────────────────────────────────────────────────────────────┘
```

---

## Installation

Install `@abeta.dev/react-libs` directly from [npm](https://www.npmjs.com/package/@abeta.dev/react-libs):

```bash
npm install @abeta.dev/react-libs
```

### Peer Dependencies
Ensure your project has React 18 or 19 installed:

```bash
npm install react@^19.0.0 react-dom@^19.0.0
# Or for React 18 projects:
# npm install react@^18.2.0 react-dom@^18.2.0
```

---

## Quick Start & Imports

No complex path mapping or bundler alias configurations are required in your application. All components, utilities, and formatters are accessible through standard, tree-shakable package entry points.

### Subpath Reference Table

The library exposes dedicated entry points for UI components, server-safe utilities, client-only features, domain compliance, analytics, hooks, and stylesheets:

| Subpath / Export | Module Formats | SSR / RSC Compatibility | Purpose & Contents |
|---|---|---|---|
| `@abeta.dev/react-libs` | ESM (`import`), CJS (`require`) | **Client Components** (`'use client'`) | Primary UI component library (accessible Tailwind UI components, primitives, forms, dialogs, charts, error boundaries, and hooks). SSR-compatible with browser APIs guarded inside lifecycle hooks. |
| `@abeta.dev/react-libs/utils` | ESM (`import`), CJS (`require`) | **RSC & Server-Safe** | Pure utility helpers, formatters, universal validators, masking, and `cn`. Zero DOM and zero React dependencies; safe in Next.js Server Components, Server Actions, Route Handlers, and Edge runtimes. |
| `@abeta.dev/react-libs/india` | ESM (`import`), CJS (`require`) | **RSC & Server-Safe** | Dedicated domain subpath containing India compliance logic: GSTIN, PAN, IFSC, FSSAI, and Pincode validators, GST tax calculation splits, regional constants (`INDIA_STATES`, `INDIA_CITIES`), and pure NPCI UPI payment URI generators (`generateUpiPayUri`, `validateUpiId`, `parseUpiPayUri`). |
| `@abeta.dev/react-libs/india/react` | ESM (`import`), CJS (`require`) | **Client Component** (`'use client'`) | Interactive regional components (e.g. `AmountSummaryCardIndia`, `UpiQrCard` counter standee). |
| `@abeta.dev/react-libs/analytics` | ESM (`import`), CJS (`require`) | **RSC & Server-Safe** | Pure behavioral analytics tracking engine, DOM auto-tracking, batching pipeline, and destination adapters. Zero React hooks. |
| `@abeta.dev/react-libs/analytics/react` | ESM (`import`), CJS (`require`) | **Client Components** (`'use client'`) | React integration layer for analytics: `AnalyticsProvider`, `useAnalytics`, `TrackArea`, and `PageViewTracker`. |
| `@abeta.dev/react-libs/pdf` | ESM (`import`), CJS (`require`) | **Client-Only** (`'use client'`) | Dedicated client subpath for `PdfViewer`. Isolated from root to prevent Node SSR from executing browser-only PDF workers (`pdfjs-dist`). |
| `@abeta.dev/react-libs/hooks/use-toast` | ESM (`import`), CJS (`require`) | **Client Hook** (`'use client'`) | Standalone imperative toast notification hook (`useToast`, `toast`). |
| `@abeta.dev/react-libs/button` | ESM (`import`), CJS (`require`) | **Client Component** (`'use client'`) | Standalone Button with Radix Slot polymorphism (asChild), custom loading spinners, and micro-interaction states. |
| `@abeta.dev/react-libs/dialog` | ESM (`import`), CJS (`require`) | **Client Component** (`'use client'`) | Standalone Dialog primitive with isolated Radix Dialog dependency. |
| `@abeta.dev/react-libs/card` | ESM (`import`), CJS (`require`) | **Client Component** (`'use client'`) | Standalone Card primitive with zero Radix dependency overhead. |
| `@abeta.dev/react-libs/badge` | ESM (`import`), CJS (`require`) | **Client Component** (`'use client'`) | Standalone Badge primitive with zero Radix dependency overhead. |
| `@abeta.dev/react-libs/input` | ESM (`import`), CJS (`require`) | **Client Component** (`'use client'`) | Standalone Input primitive with zero Radix dependency overhead. |
| `@abeta.dev/react-libs/data-table` | ESM (`import`), CJS (`require`) | **Client Component** (`'use client'`) | Standalone DataTable component with high-performance client-side sorting, multi-column search, pagination, and skeleton loading. |
| `@abeta.dev/react-libs/charts` | ESM (`import`), CJS (`require`) | **Client Component** (`'use client'`) | Standalone Chart container and tooltip primitives (`ChartContainer`, `ChartTooltip`, `ChartLegend`), isolating Recharts peer dependency. |
| `@abeta.dev/react-libs/command` | ESM (`import`), CJS (`require`) | **Client Component** (`'use client'`) | Standalone Command palette primitives (`Command`, `CommandInput`, `CommandList`), isolating cmdk peer dependency. |
| `@abeta.dev/react-libs/drawer` | ESM (`import`), CJS (`require`) | **Client Component** (`'use client'`) | Standalone Drawer overlay primitives (`Drawer`, `DrawerContent`, `DrawerHeader`), isolating Vaul peer dependency. |
| `@abeta.dev/react-libs/carousel` | ESM (`import`), CJS (`require`) | **Client Component** (`'use client'`) | Standalone Carousel primitives (`Carousel`, `CarouselContent`, `CarouselItem`), isolating Embla Carousel peer dependency. |
| `@abeta.dev/react-libs/calendar` | ESM (`import`), CJS (`require`) | **Client Component** (`'use client'`) | Standalone Calendar date picker primitive (`Calendar`), isolating react-day-picker peer dependency. |
| `@abeta.dev/react-libs/date-picker` | ESM (`import`), CJS (`require`) | **Client Component** (`'use client'`) | Standalone DateRangePicker primitive (`DateRangePicker`), isolating react-day-picker and date-fns peer dependencies. |
| `@abeta.dev/react-libs/form` | ESM (`import`), CJS (`require`) | **Client Component** (`'use client'`) | Standalone Form field and form context primitives (`Form`, `FormField`, `FormItem`, `FormLabel`), isolating react-hook-form peer dependency. |
| `@abeta.dev/react-libs/style.css` | CSS | N/A | Standalone pre-compiled stylesheet with all Tailwind utility classes and design tokens. |
| `@abeta.dev/react-libs/styles/theme.css` | CSS | N/A | Design system theme variables and color tokens for Tailwind CSS v4 projects (`@import`). |

### Tree-Shaking Scope & Standalone Primitives

Modern bundlers (Vite, Next.js, Rollup, Webpack 5) automatically perform dead-code elimination and tree-shake unreferenced components from the primary entry point (`@abeta.dev/react-libs`).

For consumer environments with strict per-route bundle budgets, zero optional peer dependencies, or legacy bundlers without deep tree-shaking, high-frequency primitives and heavy components provide **dedicated standalone entry points** with zero barrel overhead:
- `@abeta.dev/react-libs/button` (Micro-bundle: ~2.5 KB)
- `@abeta.dev/react-libs/dialog` (Micro-bundle: ~3.3 KB)
- `@abeta.dev/react-libs/card` (Micro-bundle: ~3.7 KB)
- `@abeta.dev/react-libs/badge` (Micro-bundle: ~1.6 KB)
- `@abeta.dev/react-libs/input` (Micro-bundle: ~1.1 KB)
- `@abeta.dev/react-libs/data-table` (Isolated data table: ~12.6 KB)
- `@abeta.dev/react-libs/charts` (Isolates `recharts` peer dependency)
- `@abeta.dev/react-libs/command` (Isolates `cmdk` peer dependency)
- `@abeta.dev/react-libs/drawer` (Isolates `vaul` peer dependency)
- `@abeta.dev/react-libs/carousel` (Isolates `embla-carousel-react` peer dependency)
- `@abeta.dev/react-libs/calendar` (Isolates `react-day-picker` peer dependency)
- `@abeta.dev/react-libs/date-picker` (Isolates `react-day-picker` + `date-fns` peer dependencies)
- `@abeta.dev/react-libs/form` (Isolates `react-hook-form` peer dependency)

All other UI components are imported directly from `@abeta.dev/react-libs`, relying on modern ESM bundler tree-shaking.

### SSR Compatibility & Hydration Architecture

The primary package entry point (`@abeta.dev/react-libs`) is engineered for broad SSR and RSC compatibility:
- **Zero Module-Level DOM Access**: No browser globals (`window`, `document`, `navigator`, `localStorage`) are evaluated during module evaluation or import, preventing Node.js SSR crashes.
- **SSR & RSC Architecture**: Interactive components carry explicit `'use client'` boundaries for React Server Component frameworks (such as Next.js App Router). Zero-DOM pure utilities reside in `@abeta.dev/react-libs/utils` and run safely in Server Components, Server Actions, and Edge runtimes.
- **Client Effects Isolation**: All interactive browser logic (event listeners, DOM measurements, post-mount fallbacks) is scoped inside `useEffect` or client event handlers to prevent hydration mismatches. For zero-flash SSR with components like `Sidebar`, pass server cookie values directly to `defaultOpen`.

### Dedicated Client Subpath for PdfViewer

Components with browser-only dependencies—specifically `PdfViewer`, which relies on `pdfjs-dist` and web workers—are isolated into a dedicated client subpath:

```tsx
"use client"; // Next.js App Router client component directive

import { PdfViewer } from "@abeta.dev/react-libs/pdf";

export function ContractViewer() {
  return (
    <PdfViewer
      url="/agreements/sample-agreement.pdf"
      title="Sample Agreement & Terms"
    />
  );
}
```

> [!IMPORTANT]
> **Why is `PdfViewer` isolated?**  
> PDF rendering engines require browser APIs (`DOMMatrix`, Canvas rendering context, `window.URL.createObjectURL`) and web workers (`pdf.worker.mjs`). Isolating `PdfViewer` under `@abeta.dev/react-libs/pdf` prevents Node.js SSR environments from executing browser-only PDF workers or encountering `DOMMatrix is not defined` errors during server compilation.

### Dual ESM & CommonJS Support

The package ships with first-class dual build support for modern ECMAScript Modules (`import`) and legacy CommonJS (`require`):

```tsx
// Modern ESM (Vite, Next.js, Remix, Webpack 5, tsx)
import { Button, Card } from "@abeta.dev/react-libs";
import { cn, formatCurrency } from "@abeta.dev/react-libs/utils";
import { PdfViewer } from "@abeta.dev/react-libs/pdf";
import { initAnalytics } from "@abeta.dev/react-libs/analytics";
```

```javascript
// CommonJS (Node.js runtime, legacy tooling, Jest)
const { Button, Card } = require("@abeta.dev/react-libs");
const { cn, formatCurrency } = require("@abeta.dev/react-libs/utils");
const { PdfViewer } = require("@abeta.dev/react-libs/pdf");
const { initAnalytics } = require("@abeta.dev/react-libs/analytics");
```

### Server-Safe Pure Utilities Subpath (`/utils`)

`@abeta.dev/react-libs/utils` provides pure helper functions with **zero DOM and zero React dependencies**. It is guaranteed to execute safely inside React Server Components, Server Actions, Route Handlers, Node.js scripts, and Edge workers:

```tsx
import { cn, formatCurrency, formatDate, isValidEmail, maskEmail } from "@abeta.dev/react-libs/utils";

// Pure functions safe in React Server Components, Server Actions, and Node.js
export async function ServerSummaryCard({ user, balance }: { user: { email: string }, balance: number }) {
  return (
    <div className={cn("p-4 rounded-lg border", "bg-muted/50")}>
      <p>{maskEmail(user.email)}</p>
      <p>{formatCurrency(balance)}</p>
    </div>
  );
}
```

### Standard UI Component Imports

```tsx
import { Button, Dialog, Card } from "@abeta.dev/react-libs";

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
import { generateUpiPayUri, validateUpiId } from "@abeta.dev/react-libs/india";

// Validate and generate standard NPCI URI
if (validateUpiId("merchant@icici")) {
  const upiUri = generateUpiPayUri({
    payeeVpa: "merchant@icici",
    payeeName: "Vendor Billing",
    amount: 1499.00,
    transactionNote: "Invoice #1042",
  });
}
```

Interactive client components (`'use client'`):

```tsx
import { UpiQrCard } from "@abeta.dev/react-libs/india/react";

export function CheckoutStandee() {
  return (
    <UpiQrCard
      payeeVpa="merchant@icici"
      payeeName="Vendor Billing"
      amount={1499}
      transactionNote="Invoice #1042"
    />
  );
}
```

---

## Styling & CSS Delivery

The library provides two delivery strategies for styling and design tokens depending on your build system and Tailwind version:

### 1. For Tailwind CSS v4 Applications
Import the design system theme directly into your global CSS stylesheet (e.g. `src/index.css` or `src/globals.css`):

```css
@import "tailwindcss";
@import "@abeta.dev/react-libs/theme.css";
```

This registers all semantic design tokens (`--primary`, `--muted`, `--border`, etc.) directly with Tailwind v4's `@theme` directive, giving you instant access to semantic utility classes like `bg-primary`, `text-muted`, and `border-border`.

### 2. For Standard CSS / Tailwind CSS v3 / Vite Applications
If your project uses Tailwind CSS v3, Vite, Webpack, Create React App, or standard plain CSS without Tailwind v4, import the pre-compiled distribution stylesheet at your application's root entry point (e.g. `main.tsx`, `App.tsx`, or `_app.tsx`):

```tsx
import "@abeta.dev/react-libs/style.css";
```

> [!TIP]
> **CSS Cascade Layer Isolation (`@layer react-libs`)**:
> `dist/style.css` is encapsulated in `@layer react-libs { ... }` per the W3C CSS Cascading and Inheritance Level 5 specification. Because unlayered styles have higher precedence than layered styles in the CSS cascade, your application's custom CSS classes and local Tailwind utilities will naturally override library styles without specificity wars or `!important`.
>
> If your application uses multiple cascade layers, `@abeta.dev/react-libs/styles/theme.css` pre-declares the standard layer ordering preset:
> ```css
> @layer reset, base, react-libs, components, utilities, overrides;
> ```

> [!NOTE]
> `@abeta.dev/react-libs/dist/style.css` contains all pre-compiled Tailwind utility classes and design tokens. It requires zero PostCSS or Tailwind build plugins on the consumer end, making it plug-and-play in any React project.

### Brand Tokens & CSS Variables

All color, spacing, typography, and border-radius tokens are defined via semantic CSS variables:

| Token | Light | Dark | Usage |
|---|---|---|---|
| `--primary` | `hsl(142 76% 36%)` | `hsl(142 71% 45%)` | Primary brand green — buttons, active states |
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

> Interactive documentation & stories: [Storybook Playground](https://react-libs.abeta.dev) · Comprehensive guide: [WIKI.md](./WIKI.md) · Architecture Recipe: [Enterprise App Integration](docs/recipes/full-app-integration.md)

> [!NOTE]
> **SSR Compatibility**: Root `@abeta.dev/react-libs` UI components are tagged with `'use client'` directives and guard browser APIs to avoid server hydration mismatches in Next.js App Router and Remix. Pure utilities under `@abeta.dev/react-libs/utils` run safely in server contexts with zero DOM/React dependencies. Browser-only components such as `PdfViewer` are exported through dedicated client subpaths (`@abeta.dev/react-libs/pdf`) to prevent server runtime issues.

All standard UI components are directly importable from `@abeta.dev/react-libs` (with client-only subpaths noted):

| Domain | Component | Notes |
|---|---|---|
| **Forms** | `Button` | Accessible button with `isLoading`, `loadingText`, variants (`default`, `destructive`, `outline`, `ghost`, `secondary`, `link`) |
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
| | `Card` | Structured surface container (`CardHeader`, `CardContent`, `CardFooter`) |
| | `DataTable` | Feature-rich table with client/server sorting, skeleton loading, pagination, and empty states |
| | `Table` | Primitive semantic table building blocks (`TableHeader`, `TableRow`, `TableCell`) |
| | `PdfViewer` | Multi-page interactive PDF document viewer with zoom, pagination, rotation, and printing. *Imported via `@abeta.dev/react-libs/pdf` (client-only subpath).* |
| | `Chart` | Themed Recharts wrapper for responsive analytics visualizations |
| | `Accordion` | Accessible collapsible accordion panels |
| | `Collapsible` | Expandable content section |
| | `Carousel` | Touch-friendly Embla-powered carousel slider |
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
| **Navigation** | `Sidebar` | Collapsible desktop and mobile application sidebar |
| | `Stepper` | Multi-step wizard and workflow progression indicator |
| | `NavigationMenu` | Top-level dropdown navigation header |
| | `Breadcrumb` | Hierarchy pathway navigation trail |
| | `Tabs` | Tabbed navigation container (`TabsList`, `TabsTrigger`, `TabsContent`) |
| | `Menubar` | Desktop-style menu bar (File / Edit / View) |
| | `Pagination` | Accessible pagination controls with page jumpers |
| **Feedback** | `Banner` | System announcement banner with call-to-action and dismiss controls |
| | `CopyButton` | 1-click clipboard copy button with checkmark feedback animation |
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
| **Regional & India** | `AmountSummaryCardIndia` | B2B invoice amount breakdown with CGST/SGST/IGST tax splits. *Imported via `@abeta.dev/react-libs/india/react`.* |
| | `UpiQrCard` | Dynamic NPCI-compliant UPI payment counter standee card with high-density QR code, amount entry, and offline PNG download. *Imported via `@abeta.dev/react-libs/india/react`.* |

---

## Composite Components

### Button — Loading State

```tsx
import { Button } from "@abeta.dev/react-libs";

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
import { ConfirmDialog } from "@abeta.dev/react-libs";

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
import { StatusBadge } from "@abeta.dev/react-libs";

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
import { DataTable, StatusBadge, formatCurrency } from "@abeta.dev/react-libs";

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

import { PdfViewer } from "@abeta.dev/react-libs/pdf";

export function InvoiceViewer() {
  return (
    <div className="h-[700px] w-full max-w-4xl border rounded-lg overflow-hidden">
      <PdfViewer
        url="/documents/invoice-1042.pdf"
        title="Invoice #1042"
        onLoadSuccess={({ numPages }) => console.log(`Loaded ${numPages} pages`)}
      />
    </div>
  );
}
```

> **Isolation Note**: `PdfViewer` is exported from `@abeta.dev/react-libs/pdf` to keep browser-only PDF workers (`pdfjs-dist`) isolated from root imports, ensuring server-side rendering in Node.js, Next.js, and Remix does not crash on missing canvas or web worker APIs.

---

## Pluggable Behavioral Analytics

The library includes a client behavioral analytics engine with automated DOM tracking, batching, offline resilience, and pluggable destination adapters.

> [!TIP]
> For a complete, production-ready recipe showing how to configure `AnalyticsProvider`, route tracking with `<PageViewTracker />`, click scoping with `<TrackArea />`, and multi-brand theming, see [Enterprise Integration Recipe](docs/recipes/full-app-integration.md).

```tsx
import {
  initAnalytics,
  ConsoleAdapter,
  trackEvent,
  AnalyticsProvider,
  useAnalytics,
} from "@abeta.dev/react-libs/analytics";

// Initialize analytics globally
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
import { useDebounce, useLocalStorage, useIsMobile } from "@abeta.dev/react-libs";
```

| Hook | Description |
|---|---|
| `useDebounce(value, delay)` | Debounces rapidly changing values before triggering expensive effects or API queries |
| `useLocalStorage<T>(key, default)` | Syncs state with browser `localStorage` and listens to cross-tab updates |
| `useIsMobile(breakpoint?)` | Detects whether the viewport width is below mobile threshold (< 768px by default) |

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
} from "@abeta.dev/react-libs";
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

## Publishing

Publishing to npm is automated via GitHub Actions on semantic tag pushes:

```bash
# 1. Bump version
npm version patch # or minor / major

# 2. Push commit and tag to trigger CI publish workflow
git push && git push --tags
```

### Manual Publishing
To build and publish manually:

```bash
npm run build
npm publish --access public
```

---

## Architecture & Accessibility

- **Radix UI Primitives**: Built upon headless, fully accessible primitives managing focus traps, ARIA attributes, and keyboard navigation according to WCAG 2.1 AA specifications. Automated regression tests via `axe-core` verify 0 violations across all interactive widgets.
- **SSR Compatibility**: Root UI components avoid top-level browser globals during module evaluation, guarding interactive code within client hooks and event handlers. Pure utilities in `@abeta.dev/react-libs/utils` feature zero DOM and zero React dependencies for native Server Component execution. Browser-only components like `PdfViewer` reside in isolated client subpaths.
- **Dual ESM & CommonJS**: Full dual module support (`import` and `require`) with TypeScript declaration files (`.d.ts` and `.d.cts`) and subpath type mappings across modern module loaders, verified with `@arethetypeswrong/cli`.
- **Domain Subpath Isolation**: Preserves all Indian compliance logic (`@abeta.dev/react-libs/india`) while leaving the root package and `/utils` domain-neutral.
- **Static Zero-Runtime CSS Delivery**: CSS tokens and component styles compile into static stylesheets (`theme.css` and `dist/style.css`), eliminating runtime `<style>` injection and satisfying strict Content Security Policies (`CSP`).
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

## Community & Contributing

- **[Migration Guide](./MIGRATION.md)**: Upgrading to v0.16.0.
- **[Quality Standards & Scorecard](./QUALITY_STANDARDS_AND_AUDIT_SCORECARD.md)**: Perpetual quality parameters, security invariants, and audit scorecard.
- **[Code of Conduct](./CODE_OF_CONDUCT.md)**: We are committed to providing a friendly, safe, and welcoming environment for all contributors.
- **[Security Policy](./SECURITY.md)**: Guidelines for reporting security vulnerabilities responsibly.
- **[Contributing Guide](./CONTRIBUTING.md)**: Step-by-step instructions for adding components, writing tests, and filing pull requests.

## License

[MIT](./LICENSE) © Umesh Gupta (abeta.dev)
