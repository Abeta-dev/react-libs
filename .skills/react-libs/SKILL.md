---
name: react-libs
description: Discover, import, build, and verify @abeta.dev React 19 UI primitives, India statutory tax/UPI tools, talent evaluation cards, and headless authentication.
---

# react-libs Agent Skill

Use this skill when developing, testing, importing, or auditing components from the `@abeta.dev` ecosystem (v0.22.0). This covers the four modular packages (`@abeta.dev/ui`, `@abeta.dev/india`, `@abeta.dev/talent`, `@abeta.dev/auth`) and the 100% backward-compatible legacy omnibus package `@abeta.dev/react-libs`.

- **AI Reference Docs**: `public/llms.txt` (`https://abeta-dev.github.io/react-libs/llms.txt`) and `public/llms-full.txt` (`https://abeta-dev.github.io/react-libs/llms-full.txt`).
- **Starter Templates**: `examples/nextjs-app-router` (Next.js App Router + Tailwind v4) and `examples/vite-react-19` (Vite + React 19 zero-Tailwind).

---

## 1. Package Selection Matrix

Select the most focused package to avoid unnecessary bundle bloat:

| Feature Needed | Recommended Package | Subpath / Entrypoint |
| :--- | :--- | :--- |
| **Buttons, Dialogs, Cards, Tables, Forms, Hooks** | `@abeta.dev/ui` | `@abeta.dev/ui` or micro-bundles like `@abeta.dev/ui/button`, `@abeta.dev/ui/card` |
| **RSC Class Utility (`cn`)** | `@abeta.dev/ui` | `@abeta.dev/ui/utils` (RSC/Server-safe) |
| **Isolated PDF Viewer (`PdfViewer`)** | `@abeta.dev/ui` | `@abeta.dev/ui/pdf` (Client-only, isolates `pdfjs-dist`) |
| **Imperative Toast Hook (`useToast`, `toast`)** | `@abeta.dev/ui` | `@abeta.dev/ui/hooks/use-toast` (`'use client'`) |
| **Tailwind v4 Tokens / Zero-Tailwind CSS** | `@abeta.dev/ui` | `@abeta.dev/ui/theme.css` / `@abeta.dev/ui/style.css` |
| **Zero-Bloat GSTIN, PAN, IFSC, Tax Splits, UPI URIs** | `@abeta.dev/india` | `@abeta.dev/india` (RSC/Server-safe) |
| **UPI QR Standee Card, GST Summary Card** | `@abeta.dev/india` | `@abeta.dev/india/react` (`'use client'`) |
| **Certificates, Checkpoints, Diagnostic Quiz, Kanban** | `@abeta.dev/talent` | `@abeta.dev/talent` (`'use client'`) |
| **Headless Auth Client, Cookie Refresh, Fetch** | `@abeta.dev/auth` | `@abeta.dev/auth/core` (Zero-React/Server) |
| **React Auth Providers, Hooks, AuthCard & Forms** | `@abeta.dev/auth` | `@abeta.dev/auth/react` & `@abeta.dev/auth` (`'use client'`) |
| **Existing / Legacy Application Code** | `@abeta.dev/react-libs` | `@abeta.dev/react-libs` (100% backward compatible) |

---

## 2. Quick Usage & Implementation Recipes

### A. Accessible UI Components (`@abeta.dev/ui`)
```tsx
"use client";

import { Button } from "@abeta.dev/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@abeta.dev/ui/card";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@abeta.dev/ui/dialog";

export function VendorActionCard() {
  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Vendor Action Required</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-3">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default">Approve Vendor</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Vendor Approval</DialogTitle>
            </DialogHeader>
            <p className="text-sm text-muted-foreground">
              Are you sure you want to approve this vendor for statutory billing?
            </p>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
```

### B. Zero-Bloat India Statutory Tax & UPI Payment QR (`@abeta.dev/india`)
```tsx
import { validateGSTIN, calculateGSTSplit, generateUpiPayUri } from "@abeta.dev/india";
import { UpiQrCard } from "@abeta.dev/india/react";

// 1. Pure statutory validation & tax calculation (RSC/Server-Safe):
export function processInvoice(gstin: string, amount: number, supplierState: string, buyerState: string) {
  const gstinError = validateGSTIN(gstin); // undefined if valid
  if (gstinError) throw new Error(gstinError);

  const isIntraState = supplierState === buyerState;
  const gst = calculateGSTSplit(amount, 18, isIntraState, false);
  const upiUri = generateUpiPayUri({
    upiId: "billing@okhdfcbank",
    payeeName: "Vendor Portal Settlement",
    amount: gst.totalPayable,
    transactionNote: `GSTIN ${gstin}`,
  });

  return {
    baseAmount: gst.baseAmount,
    cgstAmount: gst.cgstAmount,
    sgstAmount: gst.sgstAmount,
    igstAmount: gst.igstAmount,
    totalPayable: gst.totalPayable,
    upiUri,
  };
}

// 2. Interactive UPI Counter Standee Card (Client Component):
export function PaymentStandee({ upiId, payeeName, amount }: { upiId: string; payeeName: string; amount: number }) {
  return (
    <UpiQrCard
      upiId={upiId}
      payeeName={payeeName}
      amount={amount}
      transactionNote="Vendor Portal Settlement"
      badgeLabel="0% Commission Direct UPI"
    />
  );
}
```

### C. Verifiable Credential Display (`@abeta.dev/talent`)
```tsx
"use client";

import { ProofOfWorkCertificate } from "@abeta.dev/talent";

export function StudentCertificate() {
  return (
    <ProofOfWorkCertificate
      certificateId="POW-2026-9021"
      recipientName="Aarav Sharma"
      projectTitle="Advanced FinTech Engineering & Indian Tax Systems"
      issueDate="2026-11-20"
      issuerName="Abeta Technical Institute"
      verificationUrl="https://verify.abeta.dev/cert/POW-2026-9021"
      skills={["React 19", "Tailwind v4", "GSTIN Engine", "UPI NPCI"]}
      showActions
    />
  );
}
```

### D. Headless Session & Backpressure (`@abeta.dev/auth`)
```tsx
"use client";

import { useAuthClient, useAuthClientSnapshot } from "@abeta.dev/auth/react";
import { useClickBackpressure } from "@abeta.dev/auth";

export function UserProfileHeader() {
  const client = useAuthClient();
  const snapshot = useAuthClientSnapshot();
  const { execute: handleLogout, isPending } = useClickBackpressure(async () => {
    await client.logout();
  });

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div>
        <p className="font-medium">{snapshot.session?.user.email ?? "Guest"}</p>
        <span className="text-xs text-muted-foreground">{snapshot.status}</span>
      </div>
      <button
        type="button"
        onClick={() => void handleLogout()}
        disabled={isPending}
        aria-busy={isPending}
        className="px-3 py-1.5 text-sm bg-destructive text-destructive-foreground rounded"
      >
        {isPending ? "Signing out..." : "Sign Out"}
      </button>
    </div>
  );
}
```

---

## 3. Styling Setup in Consumer Applications

### Option A: Tailwind CSS v4 (Recommended — see `examples/nextjs-app-router`)
Import `@abeta.dev/ui/theme.css` and register `@source` for each installed `@abeta.dev/*` package:

```css
@import "tailwindcss";
@import "@abeta.dev/ui/theme.css";

/* Tell Tailwind CSS v4 to scan installed packages for utility classes */
@source "../node_modules/@abeta.dev/ui";
@source "../node_modules/@abeta.dev/india";
@source "../node_modules/@abeta.dev/talent";
@source "../node_modules/@abeta.dev/auth";
```

### Option B: Zero-Tailwind / Precompiled CSS (see `examples/vite-react-19`)
Import `@abeta.dev/ui/style.css` once at the application root (e.g., `src/main.tsx`):

```tsx
import "@abeta.dev/ui/style.css";
```

---

## 4. Development & Verification Workflow

Always verify changes using the standard verification pipeline:

```bash
# 1. Build packages
npm run build:packages
npm run build

# 2. Run unit & component tests
npm run test

# 3. Verify CI Truth Gate (Versioning, ATTW without ignore-rules, symbols, actions)
npm run check:truth

# 4. Check bundle size budgets
npm run check:size

# 5. Check directive boundaries ('use client' vs universal)
npm run check:directives

# 6. Run SSR hydration smoke tests
npm run check:ssr
```

---

## 5. Critical Invariants & Rules for AI Agents

1. **Zero `--ignore-rules`**: Never use `--ignore-rules` when running `attw`. Dual ESM/CJS type resolution must pass cleanly.
2. **Directive Placement**:
   - Every file with React hooks or browser APIs must have `'use client';` at byte 0.
   - Pure server-safe utilities (`@abeta.dev/ui/utils`, `@abeta.dev/india`, `@abeta.dev/auth/core`) must never have `'use client'`.
3. **No Fabricated Documentation Numbers**:
   - Never write hardcoded test counts or bundle sizes into documentation. Run `node scripts/measure-metrics.mjs` to measure actual metrics.
4. **100% Backward Compatibility**:
   - Never remove or break existing re-exports in root `@abeta.dev/react-libs`.
5. **Keep `public/llms.txt` & `public/llms-full.txt` Accurate**:
   - Verify exact prop names and exports from source whenever updating AI reference files or starter templates under `examples/`.
