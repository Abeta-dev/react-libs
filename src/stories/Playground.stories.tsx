import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { toast } from 'sonner';
import { Toaster } from '../components/ui/feedback/sonner';
import { Button } from '../components/ui/forms/button';
import { Input } from '../components/ui/forms/input';
import { Label } from '../components/ui/forms/label';
import { Switch } from '../components/ui/forms/switch';
import { Slider } from '../components/ui/forms/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/forms/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/layout/card';
import { Badge } from '../components/ui/data-display/badge';
import { StatusBadge } from '../components/ui/data-display/status-badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/navigation/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/overlays/dialog';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../components/ui/overlays/sheet';
import { AmountSummaryCardIndia } from '../india/components/amount-summary-card-india';
import { UpiQrCard } from '../india/components/upi-qr-card';
import {
  Sparkles,
  SlidersHorizontal,
  Layers,
  Send,
  RefreshCw,
  Receipt,
  QrCode,
} from 'lucide-react';

const meta: Meta = {
  title: 'Playground/Interactive Workbench',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A live interactive sandbox where product designers and engineers can compose, test, and stress-test ' +
          'enterprise components in realistic application layouts. Combines forms, overlays, dynamic state changes, ' +
          'toasts, and Indian financial primitives in real-time.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const LiveWorkbench: Story = {
  render: () => <WorkbenchApp />,
};

function WorkbenchApp() {
  // Form State
  const [vendorName, setVendorName] = React.useState('Abeta Technologies Pvt Ltd');
  const [vendorGst, setVendorGst] = React.useState('27AAAAA0000A1Z5');
  const [tier, setTier] = React.useState('enterprise');
  const [urgency, setUrgency] = React.useState(false);
  const [creditLimit, setCreditLimit] = React.useState([50]);
  const [invoiceAmount, setInvoiceAmount] = React.useState(350000);
  const [gstRate, setGstRate] = React.useState(18);
  const [isIntraState, setIsIntraState] = React.useState(true);
  const [tdsRate, setTdsRate] = React.useState(2);
  const [activeTab, setActiveTab] = React.useState('supplier-portal');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleReset = () => {
    setVendorName('Abeta Technologies Pvt Ltd');
    setVendorGst('27AAAAA0000A1Z5');
    setTier('enterprise');
    setUrgency(false);
    setCreditLimit([50]);
    setInvoiceAmount(350000);
    setGstRate(18);
    setIsIntraState(true);
    setTdsRate(2);
    toast.info('Workbench reset to enterprise baseline state');
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Vendor profile & settlement terms synced successfully!', {
        description: `Reference ID: VEND-${Date.now().toString().slice(-6)} • Tier: ${tier.toUpperCase()}`,
      });
    }, 600);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Toaster richColors position="bottom-right" />

      {/* Workbench Header */}
      <header className="border-b bg-card px-6 py-4 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-30 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight">Enterprise Component Playground</h1>
              <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300">
                v0.17.0 Live
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Dynamic orchestration testing: Forms • Overlays • India Primitives • Feedback
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Button variant="outline" size="sm" onClick={handleReset} className="gap-1.5">
            <RefreshCw className="h-3.5 w-3.5" />
            Reset State
          </Button>
          <Button
            size="sm"
            onClick={handleSubmit}
            isLoading={isSubmitting}
            className="gap-1.5"
          >
            <Send className="h-3.5 w-3.5" />
            Simulate Payout
          </Button>
        </div>
      </header>

      {/* Main Grid Layout */}
      <div className="flex-1 p-6 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Controls & Forms (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Form Control Sandbox */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 text-primary" />
                  Live Controls Sandbox
                </CardTitle>
                <StatusBadge status="active" />
              </div>
              <CardDescription className="text-xs">
                Mutate control states below and observe synced downstream calculations.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="space-y-1.5">
                <Label htmlFor="wb-vendor-name">Organization Name</Label>
                <Input
                  id="wb-vendor-name"
                  value={vendorName}
                  onChange={(e) => setVendorName(e.target.value)}
                  placeholder="e.g. Acme Corp Pvt Ltd"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="wb-gstin">GSTIN (15-digit)</Label>
                  <Input
                    id="wb-gstin"
                    value={vendorGst}
                    onChange={(e) => setVendorGst(e.target.value.toUpperCase())}
                    placeholder="27AAAAA0000A1Z5"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="wb-tier">Vendor Tier</Label>
                  <Select value={tier} onValueChange={setTier}>
                    <SelectTrigger id="wb-tier">
                      <SelectValue placeholder="Select tier" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard Partner</SelectItem>
                      <SelectItem value="preferred">Preferred Supplier</SelectItem>
                      <SelectItem value="enterprise">Enterprise VIP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <div className="flex justify-between items-center text-xs">
                  <Label>Credit Limit Allocation: ₹{creditLimit[0]} Lakhs</Label>
                  <span className="text-muted-foreground font-mono">Max: ₹100L</span>
                </div>
                <Slider
                  value={creditLimit}
                  onValueChange={setCreditLimit}
                  min={5}
                  max={100}
                  step={5}
                />
              </div>

              <div className="flex items-center justify-between pt-2 border-t">
                <div className="space-y-0.5">
                  <Label htmlFor="wb-urgency" className="cursor-pointer">Priority T+0 Liquidity</Label>
                  <p className="text-xs text-muted-foreground">Flag for immediate automated settlement</p>
                </div>
                <Switch
                  id="wb-urgency"
                  checked={urgency}
                  onCheckedChange={setUrgency}
                />
              </div>
            </CardContent>
          </Card>

          {/* Overlays & Triggers Demonstration */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Layers className="h-4 w-4 text-primary" />
                Overlays & Feedback Portals
              </CardTitle>
              <CardDescription className="text-xs">
                Launch modals, side sheets, and toast notifications.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2.5">
              {/* Dialog Modal */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    Open Dialog Modal
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Supplier Agreement Verification</DialogTitle>
                    <DialogDescription>
                      You are configuring verified terms for <strong>{vendorName}</strong>.
                      All GST-compliant invoices will be settled under {urgency ? 'T+0 priority' : 'Net 30 days'}.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-2 space-y-2 text-xs text-muted-foreground">
                    <div className="flex justify-between border-b pb-1">
                      <span>GSTIN:</span>
                      <span className="font-mono text-foreground">{vendorGst}</span>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span>Credit Line:</span>
                      <span className="font-mono text-foreground">₹{creditLimit[0]} Lakhs</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Assigned Tier:</span>
                      <span className="font-medium text-foreground uppercase">{tier}</span>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={() => toast.success('Agreement terms confirmed!')}>
                      Confirm Terms
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* Side Sheet */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm">
                    Open Side Sheet
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Audit Trail & Event Log</SheetTitle>
                    <SheetDescription>
                      Real-time activity recorded in this workbench session.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-6 space-y-3 text-xs">
                    <div className="p-2.5 rounded-lg border bg-muted/30">
                      <div className="font-semibold text-foreground">GSTIN Validated</div>
                      <div className="text-muted-foreground">Checksum validated for state code 27 (Maharashtra).</div>
                    </div>
                    <div className="p-2.5 rounded-lg border bg-muted/30">
                      <div className="font-semibold text-foreground">Token Context Verified</div>
                      <div className="text-muted-foreground">Radius: 8px (default) • Theme: Tailwind v4 Tokens.</div>
                    </div>
                    <div className="p-2.5 rounded-lg border bg-muted/30">
                      <div className="font-semibold text-foreground">Performance Metric</div>
                      <div className="text-muted-foreground">Render cycle: 12.5ms P50 latency.</div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              {/* Toast Triggers */}
              <Button
                variant="secondary"
                size="sm"
                onClick={() => toast.error('Compliance Warning: Missing TAN Certificate', {
                  description: 'Form 16A submission required before end of quarter.',
                })}
              >
                Trigger Warning
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Dynamic Preview Tabs & India Primitives (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex items-center justify-between mb-2">
              <TabsList className="grid grid-cols-2 w-[340px]">
                <TabsTrigger value="supplier-portal" className="gap-2">
                  <Receipt className="h-4 w-4" />
                  Tax & Settlement
                </TabsTrigger>
                <TabsTrigger value="upi-payment" className="gap-2">
                  <QrCode className="h-4 w-4" />
                  UPI QR Standee
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Tab 1: Tax Settlement Breakdown */}
            <TabsContent value="supplier-portal" className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Receipt className="h-4 w-4 text-primary" />
                    Indian GST & TDS Calculation Simulation
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Real-time calculation with dual GST split and TDS withholding.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <Label className="text-xs">Base Amount (₹)</Label>
                      <Input
                        type="number"
                        value={invoiceAmount}
                        onChange={(e) => setInvoiceAmount(Number(e.target.value))}
                        step={10000}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">GST Rate (%)</Label>
                      <Select value={String(gstRate)} onValueChange={(v) => setGstRate(Number(v))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">5% GST</SelectItem>
                          <SelectItem value="12">12% GST</SelectItem>
                          <SelectItem value="18">18% GST</SelectItem>
                          <SelectItem value="28">28% GST</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">TDS Sec 194 (%)</Label>
                      <Select value={String(tdsRate)} onValueChange={(v) => setTdsRate(Number(v))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">0% (Nil)</SelectItem>
                          <SelectItem value="1">1% (Sec 194C Indiv)</SelectItem>
                          <SelectItem value="2">2% (Sec 194C Corp)</SelectItem>
                          <SelectItem value="5">5% (Sec 194J Pro)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 pt-1">
                    <label className="flex items-center gap-2 text-xs cursor-pointer">
                      <input
                        type="radio"
                        name="taxType"
                        checked={isIntraState}
                        onChange={() => setIsIntraState(true)}
                        className="accent-primary"
                      />
                      <span>Intra-State (CGST + SGST)</span>
                    </label>
                    <label className="flex items-center gap-2 text-xs cursor-pointer">
                      <input
                        type="radio"
                        name="taxType"
                        checked={!isIntraState}
                        onChange={() => setIsIntraState(false)}
                        className="accent-primary"
                      />
                      <span>Inter-State (IGST 100%)</span>
                    </label>
                  </div>

                  {/* Render the actual AmountSummaryCardIndia primitive */}
                  <div className="pt-2">
                    <AmountSummaryCardIndia
                      baseAmount={invoiceAmount}
                      gstRate={gstRate}
                      isIntraState={isIntraState}
                      tdsPercentage={tdsRate}
                      isUrgent={urgency}
                      urgentLabel="Priority T+0 Settlement"
                      transportCost={2500}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab 2: UPI Standee Generator */}
            <TabsContent value="upi-payment" className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <QrCode className="h-4 w-4 text-primary" />
                    Instant UPI Merchant Standee
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Dynamic QR generator conforming to NPCI UPI specifications.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center py-4">
                  <div className="w-[320px]">
                    <UpiQrCard
                      upiId="finance@okhdfcbank"
                      payeeName={vendorName}
                      amount={Math.round(invoiceAmount * (1 + gstRate / 100))}
                      badgeLabel="Zero Fee Corporate UPI"
                      transactionNote={`Inv ${vendorGst.slice(0, 10)}`}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
