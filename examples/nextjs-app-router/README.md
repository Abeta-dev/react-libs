# Next.js App Router + Tailwind CSS v4 Starter (`@abeta.dev/*`)

Minimal runnable starter demonstrating the modular `@abeta.dev/*` ecosystem in Next.js App Router with Tailwind CSS v4:

- **Tailwind CSS v4 theming** via `@import "@abeta.dev/ui/theme.css";` and `@source` directives in `app/globals.css`.
- **React Server Component (`app/page.tsx`)** running zero-DOM Indian statutory validation (`validateGSTIN`) and GST/TDS calculations (`calculateGSTSplit`, `calculateTDS`) directly from `@abeta.dev/india`.
- **Client Component (`components/vendor-checkout.tsx`)** combining accessible primitives (`Button`, `Card`, `Badge`) from `@abeta.dev/ui` with `AmountSummaryCardIndia` and `UpiQrCard` from `@abeta.dev/india/react`.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
