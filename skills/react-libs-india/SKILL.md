---
name: react-libs-india
description: Implementation guide for @abeta.dev/india (v0.22.0) — zero-bloat RSC-safe India statutory validators (GSTIN, PAN, IFSC, FSSAI, Pincode, Phone, Bank), GST/TDS tax math, Lakhs/Crores formatting, NPCI UPI URIs, and @abeta.dev/india/react FinTech UI cards.
---

# `@abeta.dev/india` Skill (`v0.22.0`)

## Installation

```bash
# Pure Node.js / RSC / Server Actions (zero UI/React bloat):
npm install @abeta.dev/india

# Adding interactive FinTech React components (@abeta.dev/india/react):
npm install @abeta.dev/india @abeta.dev/ui lucide-react
```

## Entrypoints & Boundaries

1. **`@abeta.dev/india` (Zero-DOM, RSC & Server-Safe, Zero `'use client'`)**:
   - **Statutory Validators** (return `undefined` when valid, or localized `string` error message when invalid): `validateGSTIN`, `validatePAN`, `validateIFSC`, `validateFSSAI`, `validatePincode`, `validatePhoneIN`, `validateBankAccountIN`. Accept `{ language?: "en" | "hi" }`.
   - **Tax & Currency**: `calculateGSTSplit(amount, taxRate = 18, isIntraState = true, isTaxInclusive = false)` → `{ baseAmount, totalTax, cgstAmount, sgstAmount, igstAmount, totalPayable }`; `calculateTDS`; `formatLakhs`; `formatCrores`.
   - **NPCI UPI**: `generateUpiPayUri({ upiId, payeeName, amount, transactionNote })`, `validateUpiId(upiId)` → `{ isValid, error? }`, `parseUpiPayUri(uri)`.
   - **Regional Data & WhatsApp**: `INDIA_STATES`, `INDIA_CITIES`, `INDIAN_LANGUAGES`, WhatsApp deep-link builders.

2. **`@abeta.dev/india/react` (`'use client'`)**:
   - `AmountSummaryCardIndia` — Interactive GST breakdown card with CGST/SGST vs IGST display.
   - `UpiQrCard` — Retail/portal UPI counter standee card accepting `upiId`, `payeeName`, `amount`, `transactionNote`.
   - `LanguageToggle` & `BilingualTooltip` — English/Hindi regional UX helpers.

## Common Pitfalls to Avoid

- Pass `upiId` (NOT `payeeVpa`) to `generateUpiPayUri` and `UpiQrCard`.
- `validateGSTIN` returns `undefined` on success (form-validator convention), whereas `validateUpiId` returns `{ isValid: boolean, error?: string }`.
- Never import `@abeta.dev/india/react` inside React Server Components or Node-only workers; keep pure server logic on `@abeta.dev/india`.
