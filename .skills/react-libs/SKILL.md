---
name: react-libs
description: Discover, import, build, and verify @abeta.dev React 19 UI primitives, India statutory tax/UPI tools, talent evaluation cards, and headless authentication.
---

# react-libs Agent Skill

Use this skill when developing, testing, importing, or auditing components from the `@abeta.dev` ecosystem. This covers the five-package monorepo consisting of `@abeta.dev/ui`, `@abeta.dev/india`, `@abeta.dev/talent`, `@abeta.dev/auth`, and the legacy omnibus package `@abeta.dev/react-libs`.

---

## 1. Package Selection Matrix

Select the most focused package to avoid unnecessary bundle bloat:

| Feature Needed | Recommended Package | Subpath / Entrypoint |
| :--- | :--- | :--- |
| **Buttons, Dialogs, Cards, Tables, Forms** | `@abeta.dev/ui` | `@abeta.dev/ui` or micro-bundles like `@abeta.dev/ui/button` |
| **GSTIN, PAN, IFSC, Tax Splits, Lakhs/Crores** | `@abeta.dev/india` | `@abeta.dev/india` (RSC/Server-safe) |
| **UPI QR Standee Card, Bilingual Cards** | `@abeta.dev/india` | `@abeta.dev/india/react` (`'use client'`) |
| **Cryptographic Certificates, Quizzes** | `@abeta.dev/talent` | `@abeta.dev/talent` |
| **Headless Auth Client, Cookie Refresh, Mutex** | `@abeta.dev/auth` | `@abeta.dev/auth/core` (Zero-DOM/Server) |
| **React Auth Provider, Session Hooks, Backpressure**| `@abeta.dev/auth` | `@abeta.dev/auth/react` (`'use client'`) |
| **Existing / Legacy Application Code** | `@abeta.dev/react-libs` | `@abeta.dev/react-libs` (100% backward compatible) |

---

## 2. Quick Usage & Implementation Recipes

### A. Accessible UI Components (`@abeta.dev/ui`)
```tsx
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

### B. India Statutory Tax & UPI Payment QR (`@abeta.dev/india`)
```tsx
import { validateGSTIN, calculateGstSplit, generateUpiPayUri } from "@abeta.dev/india";
import { UpiQrCard } from "@abeta.dev/india/react";

// 1. Pure statutory tax calculation (RSC/Server-Safe):
export function processInvoice(amount: number, supplierState: string, buyerState: string) {
  const isInterState = supplierState !== buyerState;
  const gst = calculateGstSplit(amount, 18, isInterState);
  return {
    netAmount: amount,
    cgst: gst.cgst,
    sgst: gst.sgst,
    igst: gst.igst,
    totalAmount: gst.total,
  };
}

// 2. Interactive UPI Counter Standee Card (Client Component):
export function PaymentStandee({ payeeVpa, payeeName, amount }: { payeeVpa: string; payeeName: string; amount: number }) {
  return (
    <UpiQrCard
      payeeVpa={payeeVpa}
      payeeName={payeeName}
      amount={amount}
      transactionNote="Vendor Portal Settlement"
      headerText="Scan & Pay via UPI"
      subHeaderText="Google Pay / PhonePe / Paytm / BHIM"
    />
  );
}
```

### C. Verifiable Credential Display (`@abeta.dev/talent`)
```tsx
import { ProofOfWorkCertificate } from "@abeta.dev/talent";

export function StudentCertificate() {
  return (
    <ProofOfWorkCertificate
      recipientName="Aarav Sharma"
      courseTitle="Advanced FinTech Engineering & Indian Tax Systems"
      issueDate="2026-03-31"
      issuerName="Abeta Technical Institute"
      verificationUrl="https://verify.abeta.dev/cert/AB-2026-9021"
      skills={["React 19", "Tailwind v4", "GSTIN Engine", "UPI NPCI"]}
    />
  );
}
```

### D. Session & Token Lifecycle (`@abeta.dev/auth`)
```tsx
import { AuthClientProvider, useAuthClientSnapshot, useClickBackpressure } from "@abeta.dev/auth/react";

export function UserProfileHeader() {
  const snapshot = useAuthClientSnapshot();
  const { isLocked, runWithBackpressure } = useClickBackpressure();

  const handleLogout = () => {
    runWithBackpressure(async () => {
      await fetch("/api/auth/logout", { method: "POST" });
      window.location.href = "/login";
    });
  };

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div>
        <p className="font-medium">{snapshot.user?.email || "Guest"}</p>
        <span className="text-xs text-muted-foreground">{snapshot.status}</span>
      </div>
      <button
        onClick={handleLogout}
        disabled={isLocked}
        aria-busy={isLocked}
        className="px-3 py-1.5 text-sm bg-destructive text-destructive-foreground rounded"
      >
        {isLocked ? "Signing out..." : "Sign Out"}
      </button>
    </div>
  );
}
```

---

## 3. Tailwind CSS v4 Setup in Consumer Applications

To use components styled with `@abeta.dev`, ensure your application's CSS entry point imports the theme and configures `@source`:

```css
@import "tailwindcss";
@import "@abeta.dev/react-libs/styles/theme.css";

/* Tell Tailwind CSS v4 to scan package node_modules for utility classes */
@source "../node_modules/@abeta.dev/ui";
@source "../node_modules/@abeta.dev/india";
@source "../node_modules/@abeta.dev/talent";
@source "../node_modules/@abeta.dev/auth";
```

Alternatively, link the precompiled stylesheet:
```tsx
import "@abeta.dev/react-libs/dist/style.css";
// Or from the UI package:
// import "@abeta.dev/ui/dist/style.css";
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

# 3. Verify CI Truth Gate (Versioning, ATT W without ignore-rules, symbols, actions)
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
   - Pure server-safe utilities must never have `'use client'`.
3. **No Fabricated Documentation Numbers**:
   - Never write hardcoded test counts or bundle sizes into documentation. Run `node scripts/measure-metrics.mjs` to measure actual metrics.
4. **100% Backward Compatibility**:
   - Never remove or break existing re-exports in root `@abeta.dev/react-libs`.
