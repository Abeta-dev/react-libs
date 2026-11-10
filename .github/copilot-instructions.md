# GitHub Copilot Instructions — @abeta.dev

> Guidelines for GitHub Copilot completions, code generation, and chat in the `@abeta.dev` monorepo.

---

## 1. Project Context & Package Architecture

This repository is an enterprise B2B React 19 design system and business engine organized as an npm workspace monorepo:

* **`@abeta.dev/ui` (`packages/ui`)**: 111 accessible Tailwind CSS v4 + Radix UI primitives (Button, Dialog, Card, Input, DataTable, Sheet, Drawer, Tooltip, Calendar, Form, Carousel, etc.).
* **`@abeta.dev/india` (`packages/india`)**: Indian statutory tax/invoicing (GSTIN, PAN, IFSC, FSSAI), Lakhs/Crores formatters, NPCI UPI payment URI/QR generation, and bilingual React FinTech cards.
* **`@abeta.dev/talent` (`packages/talent`)**: Candidate evaluation, diagnostic quizzes, checkpoint runners, and `ProofOfWorkCertificate` credential cards.
* **`@abeta.dev/auth` (`packages/auth`)**: Headless authentication client (`@abeta.dev/auth/core`) with HttpOnly cookie refresh, CSRF protection, and React provider (`@abeta.dev/auth/react`).
* **`@abeta.dev/react-libs` (Root `.`)**: Legacy omnibus package providing 100% backward compatibility for all existing imports.

---

## 2. Preferred Code Patterns & Import Conventions

### Modular Package Imports (Recommended for Greenfield Code)
```tsx
// UI components & standalone primitives
import { Button } from "@abeta.dev/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@abeta.dev/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@abeta.dev/ui/dialog";
import { cn } from "@abeta.dev/ui/utils";

// India statutory validation & FinTech
import { validateGSTIN, calculateGstSplit, generateUpiPayUri } from "@abeta.dev/india";
import { UpiQrCard, AmountSummaryCardIndia } from "@abeta.dev/india/react";

// Talent & verification
import { ProofOfWorkCertificate, CheckpointRunner } from "@abeta.dev/talent";

// Auth & session lifecycle
import { AuthClientProvider, useAuthClientSnapshot } from "@abeta.dev/auth/react";
```

### Legacy Omnibus Imports (Supported for Backward Compatibility)
```tsx
import { Button, Card, Dialog } from "@abeta.dev/react-libs";
import { validateGSTIN } from "@abeta.dev/react-libs/india";
import { UpiQrCard } from "@abeta.dev/react-libs/india/react";
import { useToast, toast } from "@abeta.dev/react-libs/hooks/use-toast";
```

---

## 3. Styling & Tailwind CSS v4 Rules

* **CSS-First Configuration**: Tailwind v4 is configured via CSS custom properties in `src/styles/theme.css`. Never suggest `tailwind.config.js`.
* **Theme Tokens**: Use semantic tokens: `bg-background`, `text-foreground`, `bg-primary`, `text-primary-foreground`, `border-border`, `bg-muted`, `text-destructive`.
* **Class Merging**: Always use `cn(...)` (`clsx` + `tailwind-merge`):
  ```tsx
  <div className={cn("rounded-md border bg-card p-4 text-card-foreground shadow-sm", className)} />
  ```
* **No Inline Styles**: Never generate inline `style={{ ... }}` for static layout, spacing, or color.

---

## 4. Accessibility (WCAG 2.2 AA) Standards

* **Dynamic IDs**: Always use `const id = React.useId()` to link `<label htmlFor={id}>` with `<input id={id}>` and error messages via `aria-describedby={`${id}-error`}`.
* **Loading Spinners & Busy States**: When buttons or actions are pending, display a spinner and set `aria-busy="true"`.
* **Alert Roles**: Ensure form error messages have `role="alert"`.
* **Radix UI Polymorphism**: Interactive primitives should support `asChild` via `@radix-ui/react-slot`.

---

## 5. Directives & SSR Hydration Guardrails

* Put `'use client';` as the literal line 1 of any component that:
  - Uses React hooks (`useState`, `useEffect`, `useCallback`, etc.).
  - Accesses browser APIs (`window`, `document`, `navigator`).
  - Implements interactive Radix UI primitives.
* Never put `'use client';` in pure utilities, math functions, or statutory validation files.
* Guard browser API access inside `useEffect` or post-mount hydration flags to avoid SSR hydration mismatches.
