/* eslint-disable sonarjs/cognitive-complexity, sonarjs/pseudo-random */
import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { toast } from "sonner";
import { Toaster as SonnerToaster } from "../../components/ui/feedback/sonner";
import { LineItemsCard, type LineItem } from "../../components/ui/data-display/line-items-card";
import { AmountSummaryCardIndia } from "../../india/components/amount-summary-card-india";
import { PaymentLedger, type LedgerEntry } from "../../components/ui/data-display/payment-ledger";
import { UpiQrCard } from "../../india/components/upi-qr-card";
import { StatusBadge } from "../../components/ui/data-display/status-badge";
import { Badge } from "../../components/ui/data-display/badge";
import { Button } from "../../components/ui/forms/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/layout/card";
import { Switch } from "../../components/ui/forms/switch";
import { Label } from "../../components/ui/forms/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/overlays/dialog";
import { exportData } from "../../lib/export-utils";
import { formatCurrency, formatDate } from "../../lib/formatters";
import { calculateGSTSplit, calculateTDS } from "../../india/tax";
import {
  Receipt,
  FileSpreadsheet,
  QrCode,
  CheckCircle2,
  AlertTriangle,
  Building,
  Calendar,
  Truck,
  RotateCcw,
  SlidersHorizontal,
  CreditCard,
  Hash,
} from "lucide-react";

const meta: Meta = {
  title: "Living Enterprise Workflows/Procurement & Invoicing Settlement Flow",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Production-grade Accounts Payable & Procurement 3-Way Matching and Settlement Flow. " +
          "Compares purchase orders, goods receipt notes (GRN), and vendor invoices with HSN codes, " +
          "calculates Indian GST splits (Intra vs Inter-State) and TDS deductions in real-time, tracks " +
          "running AP ledger balances, settles via dynamic NPCI UPI QR code, and exports audits to Excel/CSV.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <ProcurementInvoicingWorkflow />,
};

interface ProcurementItem extends LineItem {
  id: string;
  name: string;
  hsn_code: string;
  ordered_qty: number;
  received_qty: number;
  accepted_qty: number;
  rejected_qty: number;
  unit: string;
  unit_price: number;
  bill_status: string;
  rejection_reason?: string;
}

const INITIAL_ITEMS: ProcurementItem[] = [
  {
    id: "item-1",
    name: "Precision CNC Lathe Spindles (Grade A)",
    hsn_code: "8466",
    ordered_qty: 50,
    received_qty: 50,
    accepted_qty: 48,
    rejected_qty: 2,
    unit: "PCS",
    unit_price: 18500,
    bill_status: "PARTIALLY_BILLED",
    rejection_reason: "Runout tolerance deviation beyond 5 microns",
  },
  {
    id: "item-2",
    name: "High-Tensile Flange Hex Bolts M16x65",
    hsn_code: "7318",
    ordered_qty: 1200,
    received_qty: 1200,
    accepted_qty: 1200,
    rejected_qty: 0,
    unit: "BOX",
    unit_price: 145,
    bill_status: "BILLED",
  },
  {
    id: "item-3",
    name: "Industrial Nitrile Hydraulic Seal Kits",
    hsn_code: "8484",
    ordered_qty: 80,
    received_qty: 80,
    accepted_qty: 75,
    rejected_qty: 5,
    unit: "SET",
    unit_price: 3200,
    bill_status: "PARTIALLY_BILLED",
    rejection_reason: "Surface micro-fractures in batch #SL-99",
  },
  {
    id: "item-4",
    name: "EPDM Heavy-Duty Conveyor Belt Roll 15m",
    hsn_code: "4010",
    ordered_qty: 10,
    received_qty: 10,
    accepted_qty: 10,
    rejected_qty: 0,
    unit: "ROLL",
    unit_price: 24000,
    bill_status: "BILLED",
  },
];

const INITIAL_LEDGER_ENTRIES: LedgerEntry[] = [
  {
    key: "entry-1",
    reference_id: "ADV-2026-091",
    date: "2026-09-02T10:30:00Z",
    description: "Advance mobilization payment to Acme Industrial Corp",
    type: "DR",
    amount: 300000,
    bill_status: "BILLED",
    status: "ACTIVE",
  },
  {
    key: "entry-2",
    grn_id: "GRN-9021-A",
    reference_id: "GRN-9021-A",
    date: "2026-09-14T14:15:00Z",
    description: "Goods Receipt Note: Machinery Parts received at Bhiwandi WH",
    type: "CR",
    amount: 1542000,
    bill_status: "RECEIVED",
    status: "ACTIVE",
  },
  {
    key: "entry-3",
    reference_id: "DN-2026-004",
    date: "2026-09-15T11:00:00Z",
    description: "Debit Note: Quality rejection of 2 Spindles & 5 Seals",
    type: "DR",
    amount: 53000,
    bill_status: "BILLED",
    status: "ACTIVE",
  },
];

function ProcurementInvoicingWorkflow() {
  const [items, setItems] = React.useState<ProcurementItem[]>(INITIAL_ITEMS);
  const [ledgerEntries, setLedgerEntries] = React.useState<LedgerEntry[]>(INITIAL_LEDGER_ENTRIES);
  const [isIntraState, setIsIntraState] = React.useState(true);
  const [tdsPercentage, setTdsPercentage] = React.useState<number>(1);
  const [transportCost, setTransportCost] = React.useState<number>(8500);
  const [isUrgentPayout, setIsUrgentPayout] = React.useState(false);
  const [isSettling, setIsSettling] = React.useState(false);
  const [showUpiModal, setShowUpiModal] = React.useState(false);
  const [isSettled, setIsSettled] = React.useState(false);
  const [isExporting, setIsExporting] = React.useState(false);

  // Compute total ordered vs accepted values
  const totalOrderedAmount = React.useMemo(() => {
    return items.reduce((sum, it) => sum + it.ordered_qty * it.unit_price, 0);
  }, [items]);

  const acceptedSubtotal = React.useMemo(() => {
    return items.reduce((sum, it) => sum + it.accepted_qty * it.unit_price, 0);
  }, [items]);

  const rejectedTotalValue = React.useMemo(() => {
    return items.reduce((sum, it) => sum + it.rejected_qty * it.unit_price, 0);
  }, [items]);

  // Tax computation
  const gstRate = 18;
  const gstSplit = React.useMemo(() => {
    return calculateGSTSplit(acceptedSubtotal, gstRate, isIntraState, false);
  }, [acceptedSubtotal, gstRate, isIntraState]);

  const tdsAmount = React.useMemo(() => {
    return calculateTDS(gstSplit.baseAmount, tdsPercentage);
  }, [gstSplit.baseAmount, tdsPercentage]);

  const finalNetPayable = Math.max(
    0,
    gstSplit.baseAmount + gstSplit.totalTax + transportCost - tdsAmount
  );

  // Line items prepared for LineItemsCard with total tax and amounts
  const lineItemsForCard: LineItem[] = React.useMemo(() => {
    return items.map((it) => {
      const lineTaxRate = gstRate / 100;
      const lineTax = (it.accepted_qty * it.unit_price) * lineTaxRate;
      const lineTotal = (it.accepted_qty * it.unit_price) + lineTax;

      return {
        id: it.id,
        name: it.name,
        hsn_code: it.hsn_code,
        ordered_qty: it.ordered_qty,
        qty: it.ordered_qty,
        received_qty: it.received_qty,
        accepted_qty: it.accepted_qty,
        rejected_qty: it.rejected_qty,
        unit: it.unit,
        unit_price: it.unit_price,
        base_price: it.unit_price,
        total_tax: lineTax,
        total_amount: lineTotal,
        bill_status: it.bill_status,
      };
    });
  }, [items, gstRate]);

  // Adjust tolerance / accept all items
  const handleAcceptAll = () => {
    setItems((prev) =>
      prev.map((it) => ({
        ...it,
        accepted_qty: it.received_qty,
        rejected_qty: 0,
        bill_status: "BILLED",
      }))
    );
    toast.success("All items marked as 100% Accepted under tolerance exception.");
  };

  const handleResetRejections = () => {
    setItems(INITIAL_ITEMS);
    toast.info("Reverted quantities to original Quality Inspection (QA) report.");
  };

  // Ledger Reference drilldown
  const handleLedgerRefClick = (refId: string) => {
    toast.info(`Inspecting Voucher #${refId}`, {
      description: "Linked ERP Reference: SAP ECC / Indian Compliance Ledger verified.",
    });
  };

  // Export to Excel / CSV
  const handleExportReconciliation = async () => {
    setIsExporting(true);
    try {
      const exportRows = items.map((it) => ({
        "Item Description": it.name,
        "HSN Code": it.hsn_code,
        "Ordered Qty": it.ordered_qty,
        "Received Qty": it.received_qty,
        "Accepted Qty": it.accepted_qty,
        "Rejected Qty": it.rejected_qty,
        "Unit": it.unit,
        "Unit Rate (INR)": it.unit_price,
        "Accepted Subtotal (INR)": it.accepted_qty * it.unit_price,
        "GST Rate": `${gstRate}%`,
        "GST Type": isIntraState ? "Intra-State (CGST+SGST)" : "Inter-State (IGST)",
        "Bill Status": it.bill_status,
        "Rejection Reason": it.rejection_reason || "None",
      }));

      await exportData(exportRows, "PO-2026-IND-4491-3-Way-Reconciliation", "csv", {
        columns: [
          { header: "Item Description", key: "Item Description" },
          { header: "HSN Code", key: "HSN Code" },
          { header: "Ordered Qty", key: "Ordered Qty" },
          { header: "Received Qty", key: "Received Qty" },
          { header: "Accepted Qty", key: "Accepted Qty" },
          { header: "Rejected Qty", key: "Rejected Qty" },
          { header: "Unit Rate (INR)", key: "Unit Rate (INR)" },
          { header: "Accepted Subtotal (INR)", key: "Accepted Subtotal (INR)" },
          { header: "GST Type", key: "GST Type" },
          { header: "Bill Status", key: "Bill Status" },
          { header: "Rejection Reason", key: "Rejection Reason" },
        ],
      });

      toast.success("Reconciliation Export Downloaded", {
        description: "Generated PO-2026-IND-4491-3-Way-Reconciliation.csv with sanitized values.",
      });
    } catch {
      toast.error("Export encountered an issue.");
    } finally {
      setIsExporting(false);
    }
  };

  // Simulate UPI Settlement
  const handleConfirmUpiSettlement = () => {
    setIsSettling(true);
    setTimeout(() => {
      setIsSettling(false);
      setShowUpiModal(false);
      setIsSettled(true);

      const settlementVoucherId = `UPI-PAY-${Math.floor(100000 + Math.random() * 900000)}`;

      // Append settlement record to ledger
      const newEntry: LedgerEntry = {
        key: `entry-${Date.now()}`,
        reference_id: settlementVoucherId,
        date: new Date().toISOString(),
        description: `Instant NPCI UPI Settlement to Acme Industrial Corp (${settlementVoucherId})`,
        type: "DR",
        amount: finalNetPayable,
        bill_status: "SETTLED",
        status: "SETTLED",
      };

      setLedgerEntries((prev) => [...prev, newEntry]);

      toast.success(`Payment of ${formatCurrency(finalNetPayable)} Settled via UPI!`, {
        description: `NPCI UTR: 629810482910 • Settled to acme.industrial@okhdfcbank`,
      });
    }, 1500);
  };

  const poStatus = isSettled
    ? "PAID"
    : rejectedTotalValue > 0
    ? "DISPUTED"
    : "VERIFIED";

  const poStatusLabel = isSettled
    ? "Settled via UPI"
    : rejectedTotalValue > 0
    ? "Variance Detected (QA Rejection)"
    : "3-Way Match Verified";

  return (
    <div className="min-h-screen bg-slate-50/70 dark:bg-slate-950 p-4 sm:p-8 font-sans text-slate-900 dark:text-slate-100 transition-colors">
      <SonnerToaster />

      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Metadata Card */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="font-mono text-xs font-bold text-primary border-primary/30">
                  <Receipt className="w-3.5 h-3.5 mr-1" />
                  PO-2026-IND-4491
                </Badge>
                <StatusBadge status={poStatus} label={poStatusLabel} />
                {isUrgentPayout && (
                  <Badge variant="destructive" className="animate-pulse text-[10px]">
                    Priority AP Settlement
                  </Badge>
                )}
              </div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-slate-50">
                Procurement 3-Way Matching & Settlement
              </h1>
              <p className="text-xs text-muted-foreground">
                Reconciliation of Purchase Order (PO), Material Goods Receipt (GRN), and Tax Invoice
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-2.5">
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportReconciliation}
                disabled={isExporting}
                className="text-xs font-semibold gap-1.5 h-9"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                <span>{isExporting ? "Exporting..." : "Export to Excel"}</span>
              </Button>

              <Button
                size="sm"
                onClick={() => setShowUpiModal(true)}
                disabled={isSettled}
                className="text-xs font-bold gap-1.5 h-9 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 shadow-sm"
              >
                <QrCode className="w-4 h-4" />
                <span>{isSettled ? "Invoice Paid" : "Pay via UPI"}</span>
              </Button>
            </div>
          </div>

          {/* PO & Vendor Details Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="space-y-0.5">
              <span className="text-muted-foreground flex items-center gap-1">
                <Building className="w-3.5 h-3.5" /> Vendor Legal Entity
              </span>
              <p className="font-bold text-slate-800 dark:text-slate-200">Acme Industrial Corp Pvt Ltd</p>
              <p className="font-mono text-[11px] text-primary">GSTIN: 27AABCU9603R1ZM</p>
            </div>

            <div className="space-y-0.5">
              <span className="text-muted-foreground flex items-center gap-1">
                <Hash className="w-3.5 h-3.5" /> Reference Numbers
              </span>
              <p className="font-semibold">Invoice: INV/2026/8821</p>
              <p className="font-mono text-[11px] text-muted-foreground">GRN: GRN-9021-A</p>
            </div>

            <div className="space-y-0.5">
              <span className="text-muted-foreground flex items-center gap-1">
                <Truck className="w-3.5 h-3.5" /> Delivery Hub
              </span>
              <p className="font-semibold">Bhiwandi Central WH</p>
              <p className="text-[11px] text-muted-foreground">Zone AP-West, Maharashtra</p>
            </div>

            <div className="space-y-0.5">
              <span className="text-muted-foreground flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> PO Value & Terms
              </span>
              <p className="font-semibold">{formatCurrency(totalOrderedAmount)} (Net 30)</p>
              <p className="text-[11px] text-muted-foreground">Dated: {formatDate("2026-09-14")}</p>
            </div>
          </div>
        </div>

        {/* 3-Way Match Line Items Card */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                1. 3-Way Physical Inspection & Quantity Matching
              </h3>
              <p className="text-xs text-muted-foreground">
                Ordered vs Received vs Accepted with statutory Indian HSN classification
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleAcceptAll}
                className="text-xs h-7 gap-1"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Accept All under Tolerance</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleResetRejections}
                className="text-xs h-7 gap-1 text-muted-foreground"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset QA Defects</span>
              </Button>
            </div>
          </div>

          <LineItemsCard
            items={lineItemsForCard}
            showQtyBreakdown={true}
            showBillStatus={true}
            footerLabel="Accepted Taxable Subtotal (Base)"
            footerTotal={acceptedSubtotal}
            isIntraState={isIntraState}
          />

          {rejectedTotalValue > 0 && (
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-800 dark:text-amber-300">
              <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400" />
              <span>
                <strong>Quality Exception Detected:</strong> 2 Spindles and 5 Hydraulic Seals were rejected
                during QA inspection. A deduction credit note of{" "}
                <span className="font-mono font-bold">{formatCurrency(rejectedTotalValue)}</span> has been
                factored into the net settlement.
              </span>
            </div>
          )}
        </div>

        {/* Tax Breakdown & Settlement Configuration */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Controls column */}
          <Card className="lg:col-span-5 border-slate-200/80 dark:border-slate-800 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-primary" />
                <CardTitle className="text-sm font-semibold">Statutory Tax & Settlement Controls</CardTitle>
              </div>
              <CardDescription className="text-xs">
                Toggle Indian GST classification and statutory TDS deductions
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 text-xs">
              {/* Intra vs Inter-state Toggle */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                <div className="space-y-0.5">
                  <Label htmlFor="intraStateSwitch" className="font-semibold block cursor-pointer">
                    {isIntraState ? "Intra-State GST (MH to MH)" : "Inter-State IGST (Outside MH)"}
                  </Label>
                  <p className="text-[11px] text-muted-foreground">
                    {isIntraState ? "CGST (9%) + SGST (9%)" : "IGST (18%)"}
                  </p>
                </div>
                <Switch
                  id="intraStateSwitch"
                  checked={isIntraState}
                  onCheckedChange={setIsIntraState}
                />
              </div>

              {/* TDS Withholding Selection */}
              <div className="space-y-1.5">
                <Label className="font-semibold block">TDS Deduction (Sec 194C / 194J)</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    type="button"
                    variant={tdsPercentage === 0 ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTdsPercentage(0)}
                    className="text-xs h-8"
                  >
                    0% (Exempt)
                  </Button>
                  <Button
                    type="button"
                    variant={tdsPercentage === 1 ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTdsPercentage(1)}
                    className="text-xs h-8"
                  >
                    1% (Contract)
                  </Button>
                  <Button
                    type="button"
                    variant={tdsPercentage === 2 ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTdsPercentage(2)}
                    className="text-xs h-8"
                  >
                    2% (Technical)
                  </Button>
                </div>
              </div>

              {/* Freight Charges */}
              <div className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200/60 dark:border-slate-800">
                <div>
                  <span className="font-semibold block">Freight & Cartage</span>
                  <span className="text-[11px] text-muted-foreground">Bhiwandi Delivery Dock</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Button
                    variant={transportCost === 0 ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setTransportCost(0)}
                    className="h-6 text-[11px] px-2"
                  >
                    ₹0
                  </Button>
                  <Button
                    variant={transportCost === 8500 ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setTransportCost(8500)}
                    className="h-6 text-[11px] px-2"
                  >
                    ₹8,500
                  </Button>
                </div>
              </div>

              {/* Urgent Payout Switch */}
              <div className="flex items-center justify-between pt-1">
                <div className="space-y-0.5">
                  <Label htmlFor="urgentSwitch" className="font-semibold block cursor-pointer">
                    Urgent MSME Payout Flag
                  </Label>
                  <p className="text-[11px] text-muted-foreground">Prioritizes immediate RTGS / UPI settlement</p>
                </div>
                <Switch
                  id="urgentSwitch"
                  checked={isUrgentPayout}
                  onCheckedChange={setIsUrgentPayout}
                />
              </div>
            </CardContent>
          </Card>

          {/* AmountSummaryCardIndia presentation */}
          <div className="lg:col-span-7">
            <AmountSummaryCardIndia
              baseAmount={acceptedSubtotal}
              gstRate={18}
              isIntraState={isIntraState}
              transportCost={transportCost}
              tdsPercentage={tdsPercentage}
              isUrgent={isUrgentPayout}
              urgentLabel="Fast-Track Settlement"
            />
          </div>
        </div>

        {/* Running Payment Ledger */}
        <div className="space-y-3">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
              2. Accounts Payable (AP) Running Settlement Ledger
            </h3>
            <p className="text-xs text-muted-foreground">
              Real-time balance tracking of PO advances, goods receipts, and quality debit notes
            </p>
          </div>

          <PaymentLedger
            ledgerEntries={ledgerEntries}
            showFooter={true}
            netLabel="Pending AP Settlement Balance"
            onReferenceClick={handleLedgerRefClick}
            onGRNClick={handleLedgerRefClick}
          />
        </div>
      </div>

      {/* Pay via UPI Settlement Modal */}
      <Dialog open={showUpiModal} onOpenChange={setShowUpiModal}>
        <DialogContent className="max-w-md p-6">
          <DialogHeader className="text-center sm:text-center items-center">
            <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-1">
              <CreditCard className="w-5 h-5" />
            </div>
            <DialogTitle className="text-base sm:text-lg font-extrabold">
              NPCI Direct UPI Settlement
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Scan dynamic QR via any UPI app or simulate direct gateway confirmation
            </DialogDescription>
          </DialogHeader>

          <div className="my-2">
            <UpiQrCard
              upiId="acme.industrial@okhdfcbank"
              payeeName="Acme Industrial Corp Pvt Ltd"
              amount={finalNetPayable}
              transactionNote="PO-2026-IND-4491 Settlement"
              showStandee={true}
              size={160}
            />
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowUpiModal(false)}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleConfirmUpiSettlement}
              disabled={isSettling}
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
            >
              {isSettling ? (
                <>
                  <span className="w-3.5 h-3.5 rounded-full border-2 border-white/40 border-t-white animate-spin mr-1.5" />
                  <span>Processing UTR...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-1" />
                  <span>Simulate Payment Success</span>
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
