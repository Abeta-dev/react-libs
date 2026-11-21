import {
  calculateGSTSplit,
  calculateTDS,
  formatLakhs,
  validateGSTIN,
} from "@abeta.dev/india";
import { VendorCheckout } from "../components/vendor-checkout";

export default function HomePage() {
  // Runs purely on the server (React Server Component) — zero client JS for statutory logic.
  const vendorName = "Abeta Logistics Pvt Ltd";
  const gstin = "27AADCA1234D1Z5";
  const gstinError = validateGSTIN(gstin);
  const baseAmount = 125000;
  const gstRate = 18;
  const tdsPercentage = 2;

  const gst = calculateGSTSplit(baseAmount, gstRate, true, false);
  const tdsAmount = calculateTDS(gst.baseAmount, tdsPercentage);
  const netPayable = Math.max(0, gst.totalPayable - tdsAmount);

  return (
    <main className="mx-auto max-w-5xl px-6 py-12 space-y-8">
      <header className="space-y-2 border-b border-border pb-6">
        <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
          Next.js App Router · Tailwind CSS v4 · RSC + Client Boundary
        </p>
        <h1 className="text-3xl font-bold tracking-tight">
          Vendor Settlement Checkout
        </h1>
        <p className="text-sm text-muted-foreground">
          Server-verified GSTIN{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
            {gstin}
          </code>{" "}
          ({gstinError ?? "Valid"}) · Server-computed Net Payable:{" "}
          <strong className="text-foreground">
            ₹{Math.round(netPayable).toLocaleString("en-IN")} ({formatLakhs(netPayable)})
          </strong>
        </p>
      </header>

      <VendorCheckout
        vendorName={vendorName}
        gstin={gstin}
        upiId="billing@okhdfcbank"
        baseAmount={baseAmount}
        gstRate={gstRate}
        tdsPercentage={tdsPercentage}
        serverNetPayable={netPayable}
      />
    </main>
  );
}
