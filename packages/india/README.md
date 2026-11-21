# @abeta.dev/india

[![npm version](https://img.shields.io/npm/v/@abeta.dev/india.svg)](https://www.npmjs.com/package/@abeta.dev/india)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![RSC Safe](https://img.shields.io/badge/RSC%20%2F%20Node.js-Zero--DOM-emerald)](https://www.npmjs.com/package/@abeta.dev/india)
[![Storybook](https://img.shields.io/badge/Storybook-Live%20Docs-ff4785)](https://abeta-dev.github.io/react-libs/)

India statutory validation (GSTIN, PAN, IFSC, FSSAI, Pincode, Mobile), GST/TDS invoicing calculators, NPCI UPI payment URI helpers, regional location datasets, WhatsApp deep links, and optional React 19 FinTech standee & tax components.

> **Zero UI Bloat for Backend & RSC Installs**: The root entrypoint `@abeta.dev/india` has **zero** React, DOM, or `@abeta.dev/ui` runtime imports. `@abeta.dev/ui`, `lucide-react`, `react`, and `react-dom` are **optional peer dependencies** — only install them if you import interactive components from `@abeta.dev/india/react`.

---

## Installation

### Pure Node.js, React Server Components (RSC), Edge, or Backend

```bash
npm install @abeta.dev/india
```

### With React UI Components (`@abeta.dev/india/react`)

Install the optional UI peer dependencies alongside React 18 or 19:

```bash
npm install @abeta.dev/india @abeta.dev/ui lucide-react react react-dom
```

---

## Entry-Point Matrix

| Entrypoint | Runtime | `'use client'` | Purpose |
| :--- | :--- | :---: | :--- |
| `@abeta.dev/india` | Node.js, RSC, Edge, Browser | No | Statutory validators, GST/TDS tax split, NPCI UPI URIs, Lakhs/Crores formatters, Indian states/cities, WhatsApp links |
| `@abeta.dev/india/react` | Browser / React 18 & 19 | Yes | Interactive FinTech & bilingual React components (`UpiQrCard`, `AmountSummaryCardIndia`, `LanguageToggle`, `BilingualTooltip`) |

---

## Tailwind CSS v4 Styling Setup (`@abeta.dev/india/react`)

When rendering React components from `@abeta.dev/india/react`, import the `@abeta.dev/ui` Tailwind CSS v4 theme tokens and register both packages as `@source` directories in your global stylesheet (e.g. `src/index.css` or `app/globals.css`):

```css
@import "tailwindcss";
@import "@abeta.dev/ui/theme.css";
@source "../node_modules/@abeta.dev/ui/dist";
@source "../node_modules/@abeta.dev/india/dist";
```

---

## Complete API Reference

### 1. Statutory Validators (`@abeta.dev/india`)

All statutory validators accept an optional `{ language?: 'en' | 'hi' }` option for bilingual English/Hindi error messages. Each returns `undefined` when valid or a human-readable error string when invalid (except `validateUpiId`, which returns `{ isValid: boolean; error?: string }`).

| Export | Signature | Description |
| :--- | :--- | :--- |
| `validateGSTIN` | `(value?, options?) => string \| undefined` | Validates 15-character GSTIN (`27AADCA1234D1Z5`) |
| `validatePAN` | `(value?, options?) => string \| undefined` | Validates 10-character PAN (`AADCA1234D`) |
| `validateIFSC` | `(value?, options?) => string \| undefined` | Validates 11-character RBI IFSC code (`HDFC0001234`) |
| `validateFSSAI` | `(value?, options?) => string \| undefined` | Validates optional 14-digit FSSAI license number |
| `validatePincode` | `(value?, options?) => string \| undefined` | Validates 6-digit Indian PIN code (`110001`) |
| `validatePhoneIN` | `(value?, options?) => string \| undefined` | Normalizes `+91`/`0` prefixes and validates 10-digit Indian mobile numbers (`[6-9]\d{9}`) |
| `validateBankAccountIN` | `(value?, options?) => string \| undefined` | Validates 9–18 digit Indian bank account numbers |
| `cleanPhoneNumber` | `(phone: string) => string` | Strips non-digits and normalizes leading `91` / `0` prefixes |
| `validateUpiId` | `(upiId: string) => UpiValidationResult` | Validates NPCI UPI VPA syntax (`merchant@icici`), returning `{ isValid, error? }` |

Raw regex patterns (`REGEX_GSTIN`, `REGEX_PAN`, `REGEX_PHONE_IN`, `REGEX_IFSC`, `REGEX_BANK_ACCOUNT_IN`, `REGEX_FSSAI`, `REGEX_PINCODE`) and bilingual message maps (`VALIDATION_MESSAGES_IN`, `VALIDATION_MESSAGES_IN_HI`) are also exported for custom form schemas (Zod, React Hook Form, Yup).

### 2. Tax & Currency Calculations (`@abeta.dev/india`)

| Export | Signature | Description |
| :--- | :--- | :--- |
| `calculateGSTSplit` | `(amount, taxRate = 18, isIntraState = true, isTaxInclusive = false) => GSTCalculationResult` | Computes `{ baseAmount, totalTax, cgstAmount, sgstAmount, igstAmount, totalPayable }` for intra-state (CGST/SGST) or inter-state (IGST) invoicing |
| `calculateTDS` | `(baseAmount: number, tdsPercentage: number) => number` | Computes Tax Deducted at Source (TDS) under IT Act sections (e.g. 194C / 194J) |
| `formatLakhs` | `(value: number, currencySymbol = "₹") => string` | Formats INR amounts in Lakhs (`₹2.5L`) |
| `formatCrores` | `(value: number, currencySymbol = "₹") => string` | Formats INR amounts in Crores (`₹1.25Cr`) |

### 3. NPCI UPI Utilities (`@abeta.dev/india`)

| Export | Signature | Description |
| :--- | :--- | :--- |
| `validateUpiId` | `(upiId: string) => UpiValidationResult` | Validates NPCI VPA format (`handle@psp`) |
| `generateUpiPayUri` | `(options: UpiPayOptions) => string` | Builds NPCI-compliant `upi://pay?pa=...&pn=...&am=...&cu=INR` payment deep links |
| `parseUpiPayUri` | `(uri: string) => UpiPayOptions \| null` | Parses a `upi://pay?...` URI back into typed payment parameters |

### 4. WhatsApp Deep Links (`@abeta.dev/india`)

| Export | Signature | Description |
| :--- | :--- | :--- |
| `formatPhoneForWhatsApp` | `(phone: string, defaultCountryCode = "91") => string` | Normalizes a phone number into international digits (`919876543210`) |
| `generateWhatsAppUrl` | `(phone?, message?, defaultCountryCode = "91") => string` | Generates an HTTPS `https://wa.me/...` click-to-chat URL |
| `generateWhatsAppAppUrl` | `(phone?, message?, defaultCountryCode = "91") => string` | Generates a native `whatsapp://send?...` mobile intent URI |
| `openWhatsApp` | `(phone?, message?, defaultCountryCode = "91") => void` | Opens WhatsApp in a new browser tab (`noopener,noreferrer`) when `window` is defined |
| `formatWhatsAppTemplate` | `(template: string, variables: Record<string, ...>) => string` | Interpolates `{{variable}}` placeholders in WhatsApp invoice or reminder templates |

### 5. Locations & Regional Presets (`@abeta.dev/india`)

| Export | Signature / Type | Description |
| :--- | :--- | :--- |
| `INDIA_STATES` | `IndiaState[]` | All 36 Indian States and Union Territories (`ISO 3166-2:IN` codes) |
| `INDIA_CITIES` | `IndiaCity[]` | Major commercial and industrial cities mapped to `stateCode` |
| `getCitiesForState` | `(stateCode: string) => IndiaCity[]` | Alphabetically sorted cities for a given state code |
| `getStateOptions` | `(placeholder = "Select State") => RegionOption[]` | Ready-to-bind `{ value, label }` select options for states/UTs |
| `getCityOptions` | `(stateCode: string, placeholder = "Select City") => RegionOption[]` | Ready-to-bind `{ value, label }` select options for cities in a state |
| `isMetroCity` | `(cityName: string) => boolean` | Returns `true` for major Indian metro cities (Delhi, Mumbai, Bengaluru, Chennai, Hyderabad, Kolkata, Pune, Ahmedabad) |
| `INDIAN_LANGUAGES` | `IndianLanguageOption[]` | Scheduled Indian language presets with native script labels (`English`, `हिन्दी`, `বাংলা`, `తెలుగు`, `मराठी`, `தமிழ்`, `ગુજરાતી`, `ಕನ್ನಡ`, `മലയാളം`, `ਪੰਜਾਬੀ`) |

### 6. Interactive React Components (`@abeta.dev/india/react`)

| Component | Purpose |
| :--- | :--- |
| `UpiQrCard` | Printable counter standee or compact live UPI QR code with SVG rendering, 400px PNG download, VPA copy pill, and GPay/PhonePe/Paytm/BHIM badges |
| `AmountSummaryCardIndia` | GST/IGST tax breakdown card with freight charges, TDS deduction, urgent payout badge, and automatic Lakhs/Crores contextual hints |
| `LanguageToggle` | Compact English / Hindi (`हिंदी`) toggle button |
| `BilingualTooltip` | Hover tooltip rendering side-by-side English and Hindi helper copy |

---

## Usage Examples

### Server / RSC / Node.js Compliance, GST & UPI

```ts
import {
  validateGSTIN,
  validatePAN,
  validateIFSC,
  validateUpiId,
  calculateGSTSplit,
  calculateTDS,
  formatLakhs,
  generateUpiPayUri,
  parseUpiPayUri,
  generateWhatsAppUrl,
  formatWhatsAppTemplate,
  getStateOptions,
  getCityOptions,
} from "@abeta.dev/india";

// 1. Bilingual statutory validation (returns undefined when valid)
const gstinErr = validateGSTIN("27AADCA1234D1Z5"); // undefined
const panErrHi = validatePAN("INVALID", { language: "hi" });
// => "कृपया एक वैध 10-अक्षरों का PAN दर्ज करें (उदा. AADCA1234D)"
const ifscErr = validateIFSC("HDFC0001234"); // undefined

// 2. Intra-state GST split & TDS deduction
const gst = calculateGSTSplit(125_000, 18, true, false);
// => { baseAmount: 125000, totalTax: 22500, cgstAmount: 11250, sgstAmount: 11250, igstAmount: 0, totalPayable: 147500 }
const tds = calculateTDS(gst.baseAmount, 2); // 2500
const summary = formatLakhs(gst.totalPayable - tds); // "₹1.45L"

// 3. NPCI UPI deep-link generation & parsing
const vpaCheck = validateUpiId("billing@icici");
if (vpaCheck.isValid) {
  const uri = generateUpiPayUri({
    upiId: "billing@icici",
    payeeName: "Acme Industrial Supplies",
    amount: 145_000,
    transactionNote: "Invoice #INV-2026-042",
    transactionRef: "INV-2026-042",
  });
  const parsed = parseUpiPayUri(uri);
  console.log(parsed?.upiId, parsed?.amount);
}

// 4. WhatsApp invoice reminder deep link
const msg = formatWhatsAppTemplate(
  "Hi {{vendor}}, invoice {{invoice}} for {{amount}} is ready.",
  { vendor: "Rohan", invoice: "INV-2026-042", amount: summary }
);
const waUrl = generateWhatsAppUrl("9876543210", msg);

// 5. Indian state & city dropdown options
const states = getStateOptions();
const maharashtraCities = getCityOptions("MH");
```

### Interactive FinTech & Bilingual Components (`@abeta.dev/india/react`)

```tsx
"use client";

import * as React from "react";
import {
  UpiQrCard,
  AmountSummaryCardIndia,
  LanguageToggle,
  BilingualTooltip,
} from "@abeta.dev/india/react";

export function InvoiceCheckoutPanel() {
  const [lang, setLang] = React.useState("en");

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <BilingualTooltip
            englishText="CGST & SGST apply for intra-state supply"
            hindiText="राज्य के भीतर आपूर्ति पर CGST और SGST लागू होता है"
          >
            <span className="text-sm font-medium underline decoration-dotted">
              {lang === "hi" ? "कर विवरण" : "Tax Summary"}
            </span>
          </BilingualTooltip>
          <LanguageToggle onLanguageChange={setLang} />
        </div>

        <AmountSummaryCardIndia
          baseAmount={125_000}
          gstRate={18}
          isIntraState
          transportCost={3_500}
          tdsPercentage={2}
          isUrgent
          urgentLabel="Priority Settlement"
        />
      </div>

      <UpiQrCard
        upiId="billing@icici"
        payeeName="Acme Industrial Supplies"
        amount={148_500}
        transactionNote="Invoice #INV-2026-042"
        showStandee
      />
    </div>
  );
}
```

---

## Documentation & Ecosystem

- **Interactive Storybook**: [https://abeta-dev.github.io/react-libs/](https://abeta-dev.github.io/react-libs/)
- **LLM / AI Agent Reference (`llms.txt`)**: [https://abeta-dev.github.io/react-libs/llms.txt](https://abeta-dev.github.io/react-libs/llms.txt)
- **Source & Issues**: [github.com/Abeta-dev/react-libs](https://github.com/Abeta-dev/react-libs)
- **Sibling Packages**: `@abeta.dev/ui` · `@abeta.dev/talent` · `@abeta.dev/auth`

## License

MIT © [abeta-dev](./LICENSE)
