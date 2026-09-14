# Enterprise Application Integration Recipe
## Complete Architecture: Root Bootstrap, Cascading Theming, Behavioral Analytics & Composite Workflows

This production recipe demonstrates how to integrate `@umesh0492/react-libs` into an enterprise-grade web application (such as Next.js 15 App Router or React 19 Single Page Applications). It covers everything from global CSS layer configuration to behavioral analytics, multi-brand theming, and an end-to-end composite feature page.

---

### Table of Contents

1. [Architectural Overview](#1-architectural-overview)
2. [Step 1: Root Configuration & Global Bootstrap](#step-2-root-configuration--global-bootstrap)
   - [CSS Layering & Tailwind v4 Integration](#css-layering--tailwind-v4-integration)
   - [Behavioral Analytics Initialization](#behavioral-analytics-initialization)
   - [Mounting Global Feedback Toasters](#mounting-global-feedback-toasters)
3. [Step 2: Theming & Multi-Brand Token Scoping](#step-3-theming--multi-brand-token-scoping)
   - [Root Tokens & Dark Mode (.dark Class)](#root-tokens--dark-mode-dark-class)
   - [Multi-Tenant / Multi-Brand Container Scoping (.theme-orange)](#multi-tenant--multi-brand-container-scoping-theme-orange)
4. [Step 3: Behavioral Analytics & DOM Delegation](#step-4-behavioral-analytics--dom-delegation)
   - [Route Transition Tracking with `<PageViewTracker />`](#route-transition-tracking-with-pageviewtracker-)
   - [Scoped Interactive Click Clusters with `<TrackArea />`](#scoped-interactive-click-clusters-with-trackarea-)
   - [Typed Domain Event Dispatching with `useAnalytics()`](#typed-domain-event-dispatching-with-useanalytics)
5. [Step 4: Composite Feature Example (`InvoiceListPage`)](#step-5-composite-feature-example-invoicelistpage)
   - [Architecture: Server Cache vs Client UI State](#architecture-server-cache-vs-client-ui-state)
   - [Complete Production TypeScript Implementation](#complete-production-typescript-implementation)
6. [Production Verification & Checklist](#6-production-verification--checklist)

---

## 1. Architectural Overview

`@umesh0492/react-libs` is structured into clean architectural boundaries to prevent bundling overhead, eliminate CSS specificity conflicts, and ensure high-throughput execution across both client and server runtimes:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                   Application Root                                     │
│  ┌─────────────────────────┐  ┌───────────────────────────┐  ┌──────────────────────┐  │
│  │  @layer react-libs CSS  │  │    AnalyticsProvider      │  │   Global Toaster     │  │
│  │ (Tailwind v4 Encaps.)   │  │ (Queue, HTTP/Console Dst) │  │  (Radix / Sonner)    │  │
│  └─────────────────────────┘  └───────────────────────────┘  └──────────────────────┘  │
└───────────────────────────────────────────┬────────────────────────────────────────────┘
                                            │
               ┌────────────────────────────┴────────────────────────────┐
               ▼                                                         ▼
┌───────────────────────────────┐                       ┌────────────────────────────────┐
│   Server Cache (Remote API)   │                       │    Client State (Local/Zustand)│
│  - Query/Mutation lifecycle   │                       │  - Sorting & Pagination State  │
│  - Network cache validation   │                       │  - Active Modal Selection      │
│  - Skeletons & empty states   │                       │  - Brand Theme Overrides       │
└──────────────┬────────────────┘                       └────────────────┬───────────────┘
               │                                                         │
               └────────────────────────────┬────────────────────────────┘
                                            │
                                            ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                            Composite Feature Page (e.g. Invoices)                      │
│  ┌──────────────────────┐  ┌───────────────────────────┐  ┌─────────────────────────┐  │
│  │ <TrackArea area=..>  │  │        <DataTable>        │  │ <AmountSummaryCardIndia>│  │
│  │ Scoped DOM events    │  │ Strongly typed columns    │  │ GST & TDS calculation   │  │
│  └──────────────────────┘  └───────────────────────────┘  └─────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### Module Boundaries & Subpath Exports

| Import Path | Runtime | Purpose & Responsibility |
|---|---|---|
| `@umesh0492/react-libs` | Universal / Client | Core design primitives, forms, layout, overlays, feedback, and data-display components. |
| `@umesh0492/react-libs/style.css` | CSS | Complete pre-built design token definitions and component styles wrapped in `@layer react-libs`. |
| `@umesh0492/react-libs/analytics` | Pure TypeScript | Engine core, queue buffer, DOM event delegation, and destination adapters (`HttpAdapter`, `ConsoleAdapter`). |
| `@umesh0492/react-libs/analytics/react` | React 19 Client | React bindings: `AnalyticsProvider`, `useAnalytics()`, `TrackArea`, and `PageViewTracker`. |
| `@umesh0492/react-libs/india` | Pure TypeScript | Pure statutory compliance functions: GST calculators, TDS splitters, PAN/GSTIN/IFSC validators. Zero DOM/React deps. |
| `@umesh0492/react-libs/india/react` | React 19 Client | Specialized Indian enterprise UI components (`AmountSummaryCardIndia`). |

---

## 2. Root Configuration & Global Bootstrap

The root layout mounts global styling, provides the analytics engine with queue batching and adapters, and displays floating toast notifications.

### CSS Layering & Tailwind v4 Integration

`@umesh0492/react-libs/style.css` is encapsulated inside `@layer react-libs`. This ensures:
1. All component styles and CSS variables load deterministically.
2. Your application-level Tailwind v4 utilities can override any component class without requiring `!important`.
3. Multi-brand CSS variables are fully inherited by nested DOM trees.

In your application root CSS file (e.g., `src/index.css` or `app/globals.css`):

```css
@import "tailwindcss";
@import "@umesh0492/react-libs/style.css";

/* Optional custom application overrides live in standard cascade layers */
@layer utilities {
  .custom-shell-shadow {
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.05), 0 8px 10px -6px rgb(0 0 0 / 0.01);
  }
}
```

### Behavioral Analytics Initialization

The behavioral analytics layer provides automatic DOM interaction capture, unhandled error logging, and queued batching with offline `localStorage` fallback.

```tsx
// app/providers.tsx or src/providers.tsx
"use client";

import * as React from "react";
import { AnalyticsProvider } from "@umesh0492/react-libs/analytics/react";
import {
  HttpAdapter,
  ConsoleAdapter,
  type AnalyticsConfig,
} from "@umesh0492/react-libs/analytics";
import { Toaster, SonnerToaster } from "@umesh0492/react-libs";

interface AppProvidersProps {
  children: React.ReactNode;
  authToken?: string;
}

export function AppProviders({ children, authToken }: AppProvidersProps) {
  // Memoize analytics configuration
  const analyticsConfig = React.useMemo<AnalyticsConfig>(() => {
    const isDev = process.env.NODE_ENV === "development";

    return {
      appId: "enterprise-portal-v2",
      batchSize: 15,            // Send events in batches of 15
      flushIntervalMs: 5000,     // Or flush every 5 seconds
      sessionTimeoutMs: 1800000, // 30 minutes inactivity timeout
      maxOfflineQueue: 1000,     // Bounded localStorage fallback buffer
      autoTrackDom: true,        // Automatic click, submit, and change delegation
      autoTrackPages: false,     // Managed explicitly via <PageViewTracker /> for client routers
      adapters: [
        // 1. Enterprise backend ingestion endpoint
        new HttpAdapter({
          endpoint: "/api/v1/telemetry/events",
          headers: {
            "X-Client-Platform": "web-dashboard",
          },
          getHeaders: async () => {
            return authToken ? { Authorization: `Bearer ${authToken}` } : {};
          },
        }),
        // 2. Developer console logging in non-production environments
        ...(isDev ? [new ConsoleAdapter()] : []),
      ],
      globalMetadata: {
        environment: process.env.NODE_ENV,
        release: "2026.09.1",
        locale: "en-IN",
      },
      onError: (err) => {
        console.error("[Analytics Engine Failure]", err);
      },
    };
  }, [authToken]);

  return (
    <AnalyticsProvider config={analyticsConfig}>
      {children}
      {/* Primary Radix UI Toast Manager */}
      <Toaster />
      {/* High-density Sonner Toast Manager */}
      <SonnerToaster position="bottom-right" richColors />
    </AnalyticsProvider>
  );
}
```

### Mounting Global Feedback Toasters

In your root layout (`app/layout.tsx` or `src/App.tsx`):

```tsx
// app/layout.tsx
import "@umesh0492/react-libs/style.css";
import "./globals.css";
import { AppProviders } from "./providers";

export const metadata = {
  title: "Enterprise Vendor Portal",
  description: "Secure, compliant invoice processing & statutory clearance",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
```

---

## 3. Theming & Multi-Brand Token Scoping

### Root Tokens & Dark Mode (`.dark` Class)

The design system is governed by design tokens defined in `theme.css` via `@theme inline`. The library exposes semantic color tokens:
- `--color-primary`, `--color-primary-foreground`, `--color-primary-border`
- `--color-background`, `--color-foreground`
- `--color-card`, `--color-card-foreground`, `--color-card-border`
- `--color-muted`, `--color-muted-foreground`
- `--color-border`, `--color-ring`

Dark mode is activated simply by adding the `.dark` class to the `<html>` or root container. All tokens switch seamlessly:

```tsx
// Example theme toggle button
import { Button } from "@umesh0492/react-libs";

export function ThemeToggle() {
  const toggleDark = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <Button variant="outline" size="sm" onClick={toggleDark}>
      Toggle Dark Mode
    </Button>
  );
}
```

### Multi-Tenant / Multi-Brand Container Scoping (`.theme-orange`)

Enterprise platforms frequently host sub-brands or co-branded partner workspaces. Rather than rebuilding styles or mounting multiple CSS stylesheets, `@umesh0492/react-libs` uses **CSS Variable Container Scoping**.

By applying `.theme-orange` (or creating a custom `.theme-[name]` class) to any container element, all descendant primitives (`Button`, `Badge`, `DataTable` highlights, `AmountSummaryCardIndia`) immediately inherit the accent palette:

```tsx
export function MultiBrandDemo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {/* Default Emerald Enterprise Palette */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-foreground">Standard Brand Workspace</h3>
        <p className="text-sm text-muted-foreground mt-1 mb-4">
          Default Emerald primary palette active.
        </p>
        <Button variant="default">Primary Action</Button>
      </div>

      {/* Scoped Accent Palette: .theme-orange */}
      <div className="theme-orange rounded-xl border border-border bg-card p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-foreground">Partner Brand Workspace</h3>
        <p className="text-sm text-muted-foreground mt-1 mb-4">
          Orange primary palette scoped exclusively to this card and its descendants.
        </p>
        <Button variant="default">Scoped Accent Action</Button>
      </div>
    </div>
  );
}
```

---

## 4. Behavioral Analytics & DOM Delegation

### Route Transition Tracking with `<PageViewTracker />`

Mount `<PageViewTracker />` inside feature views or router layouts to emit canonical page view telemetry when users transition between routes:

```tsx
"use client";

import { PageViewTracker } from "@umesh0492/react-libs/analytics/react";

export function InvoiceRouteHeader() {
  return (
    <PageViewTracker
      pageTitle="Invoice Processing & Reconciliation"
      path="/finance/invoices"
      metadata={{
        section: "billing_operations",
        complianceRegion: "IN",
      }}
    />
  );
}
```

### Scoped Interactive Click Clusters with `<TrackArea />`

To understand user drop-offs within complex workflows, wrap sections in `<TrackArea>`. The global `DomTracker` delegates click and change events, automatically attributing the parent `area` or `journey` and contextual metadata to every button or input interaction:

```tsx
import { TrackArea } from "@umesh0492/react-libs/analytics/react";
import { Button } from "@umesh0492/react-libs";

export function InvoiceActionBar() {
  return (
    <TrackArea
      area="invoice-management"
      step="action_bar"
      metadata={{ source: "bulk_table_header" }}
      className="flex items-center gap-3"
    >
      {/* Clicks on these buttons automatically bubble up with:
          journey: "invoice-management"
          step: "action_bar"
          metadata: { source: "bulk_table_header" } */}
      <Button variant="outline" data-track-name="export_csv_btn">
        Export CSV
      </Button>
      <Button variant="default" data-track-name="create_invoice_btn">
        New Invoice
      </Button>
    </TrackArea>
  );
}
```

> [!TIP]
> **Automatic PII Redaction**: Elements with sensitive identifiers (such as `/password/`, `/token/`, `/pan/`, or `/aadhaar/`) are automatically redacted by the internal DOM tracker. You can also explicitly suppress tracking on sensitive elements by adding `data-track-ignore`.

### Typed Domain Event Dispatching with `useAnalytics()`

For explicit business logic transitions (e.g. status changes, downloads, statutory clearances), use the `useAnalytics` hook:

```tsx
import { useAnalytics } from "@umesh0492/react-libs/analytics/react";

export function useInvoiceTelemetry() {
  const { track, identify } = useAnalytics();

  const trackInvoiceApproval = (invoiceId: string, netPayable: number) => {
    track("invoice_approved", {
      invoiceId,
      netPayable,
      currency: "INR",
      approvedAt: new Date().toISOString(),
    });
  };

  const syncUserIdentity = (userId: string, role: string, orgId: string) => {
    identify(userId, { role, orgId });
  };

  return { trackInvoiceApproval, syncUserIdentity };
}
```

---

## 5. Composite Feature Example (`InvoiceListPage`)

The following complete, production-ready component illustrates the clean architectural separation between:
1. **Server State Cache**: Handles network fetching, caching, loading skeletons, and remote pagination.
2. **Client UI State**: Handles user sorting, page selection, active modal state, and toast feedback.

### Complete Production TypeScript Implementation

```tsx
// src/features/invoices/InvoiceListPage.tsx
"use client";

import * as React from "react";
import {
  DataTable,
  type DataTableColumn,
  type SortDirection,
  Button,
  Badge,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  useToast,
  formatCurrency,
  formatDate,
} from "@umesh0492/react-libs";
import { AmountSummaryCardIndia } from "@umesh0492/react-libs/india/react";
import { TrackArea, PageViewTracker, useAnalytics } from "@umesh0492/react-libs/analytics/react";
import { FileSpreadsheet, Plus, CheckCircle2, AlertCircle } from "lucide-react";

// ─── 1. Domain Entities & Type Contracts ──────────────────────────────────────

export type InvoiceStatus = "draft" | "pending_approval" | "paid" | "rejected";

export interface Invoice extends Record<string, unknown> {
  id: string;
  invoiceNumber: string;
  vendorName: string;
  vendorGstin: string;
  issueDate: string;
  dueDate: string;
  baseAmount: number;
  gstRate: number;
  isIntraState: boolean;
  tdsPercentage: number;
  transportCost: number;
  status: InvoiceStatus;
  isUrgent: boolean;
}

// ─── 2. Mock Server Cache Hook (e.g. TanStack Query Adapter) ───────────────────

interface InvoicesQueryResponse {
  data: Invoice[];
  total: number;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

function useInvoicesQuery(page: number, pageSize: number): InvoicesQueryResponse {
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState<Invoice[]>([]);

  React.useEffect(() => {
    let mounted = true;
    setIsLoading(true);

    const timer = setTimeout(() => {
      if (!mounted) return;
      setData([
        {
          id: "inv-001",
          invoiceNumber: "INV-2026-0891",
          vendorName: "Apex Infra Tech Logistics Ltd",
          vendorGstin: "27AAACA1234A1Z5",
          issueDate: "2026-09-10T10:30:00Z",
          dueDate: "2026-10-10T00:00:00Z",
          baseAmount: 1850000,
          gstRate: 18,
          isIntraState: true,
          tdsPercentage: 2,
          transportCost: 45000,
          status: "pending_approval",
          isUrgent: true,
        },
        {
          id: "inv-002",
          invoiceNumber: "INV-2026-0892",
          vendorName: "CloudScale Systems India Pvt",
          vendorGstin: "29AABCB5678B1Z2",
          issueDate: "2026-09-11T14:15:00Z",
          dueDate: "2026-10-11T00:00:00Z",
          baseAmount: 720000,
          gstRate: 18,
          isIntraState: false,
          tdsPercentage: 10,
          transportCost: 0,
          status: "paid",
          isUrgent: false,
        },
        {
          id: "inv-003",
          invoiceNumber: "INV-2026-0893",
          vendorName: "Karnataka Electrical Supplies",
          vendorGstin: "29AACC1234D1Z8",
          issueDate: "2026-09-12T09:00:00Z",
          dueDate: "2026-09-26T00:00:00Z",
          baseAmount: 450000,
          gstRate: 12,
          isIntraState: true,
          tdsPercentage: 1,
          transportCost: 12000,
          status: "draft",
          isUrgent: false,
        },
      ]);
      setIsLoading(false);
    }, 600);

    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, [page, pageSize]);

  return {
    data,
    total: 3,
    isLoading,
    error: null,
    refetch: async () => {},
  };
}

// ─── 3. Feature Page Component ────────────────────────────────────────────────

export function InvoiceListPage() {
  // Client UI State
  const [page, setPage] = React.useState(1);
  const [sortKey, setSortKey] = React.useState<string | undefined>("issueDate");
  const [sortDir, setSortDir] = React.useState<SortDirection>("desc");
  const [selectedInvoice, setSelectedInvoice] = React.useState<Invoice | null>(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isApproving, setIsApproving] = React.useState(false);

  // External hooks
  const { toast } = useToast();
  const { track } = useAnalytics();

  // Server state query
  const pageSize = 10;
  const { data: invoices, total, isLoading } = useInvoicesQuery(page, pageSize);

  // Sorting handler
  const handleSort = (key: string, direction: SortDirection) => {
    setSortKey(key);
    setSortDir(direction);
    track("invoices_table_sorted", { key, direction });
  };

  // Approval action handler
  const handleApproveInvoice = async () => {
    if (!selectedInvoice) return;
    setIsApproving(true);

    try {
      // Simulate remote API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Dispatch business domain analytics event
      track("invoice_approved", {
        invoiceId: selectedInvoice.id,
        invoiceNumber: selectedInvoice.invoiceNumber,
        vendorGstin: selectedInvoice.vendorGstin,
        taxableBase: selectedInvoice.baseAmount,
        gstRate: selectedInvoice.gstRate,
        isUrgent: selectedInvoice.isUrgent,
      });

      // Show floating notification
      toast({
        title: "Invoice Successfully Approved",
        description: `Invoice ${selectedInvoice.invoiceNumber} approved for statutory settlement.`,
      });

      setIsDialogOpen(false);
    } catch {
      toast({
        title: "Approval Failed",
        description: "Unable to clear invoice. Please verify statutory parameters.",
        variant: "destructive",
      });
    } finally {
      setIsApproving(false);
    }
  };

  // ─── 4. Table Columns Definition ─────────────────────────────────────────────

  const columns: DataTableColumn<Invoice>[] = [
    {
      key: "invoiceNumber",
      header: "Invoice #",
      sortable: true,
      cell: (row) => (
        <div className="flex items-center gap-2">
          <span className="font-mono font-semibold text-foreground">{row.invoiceNumber}</span>
          {row.isUrgent && (
            <Badge variant="destructive" className="text-[10px] uppercase tracking-wider px-1.5 py-0">
              Urgent
            </Badge>
          )}
        </div>
      ),
    },
    {
      key: "vendorName",
      header: "Vendor & GSTIN",
      sortable: true,
      cell: (row) => (
        <div>
          <div className="font-medium text-foreground">{row.vendorName}</div>
          <div className="font-mono text-xs text-muted-foreground">{row.vendorGstin}</div>
        </div>
      ),
    },
    {
      key: "issueDate",
      header: "Issued",
      sortable: true,
      cell: (row) => formatDate(row.issueDate),
    },
    {
      key: "baseAmount",
      header: "Taxable Value (INR)",
      sortable: true,
      headerClassName: "text-right",
      className: "text-right font-mono font-medium",
      cell: (row) => formatCurrency(row.baseAmount, "INR", "en-IN"),
    },
    {
      key: "status",
      header: "Status",
      cell: (row) => {
        const variantMap: Record<InvoiceStatus, "default" | "secondary" | "outline" | "destructive"> = {
          draft: "outline",
          pending_approval: "secondary",
          paid: "default",
          rejected: "destructive",
        };
        return (
          <Badge variant={variantMap[row.status]}>
            {row.status.replace("_", " ").toUpperCase()}
          </Badge>
        );
      },
    },
    {
      key: "id",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      cell: (row) => (
        <Button
          variant="outline"
          size="sm"
          data-track-name={`inspect_invoice_${row.invoiceNumber}`}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedInvoice(row);
            setIsDialogOpen(true);
          }}
        >
          Inspect & Tax Split
        </Button>
      ),
    },
  ];

  return (
    <TrackArea
      area="invoice-management"
      step="invoice_list_view"
      className="space-y-6 p-6 max-w-7xl mx-auto"
    >
      {/* Route Transition Analytics Observer */}
      <PageViewTracker
        pageTitle="Vendor Invoices & Reconciliation"
        path="/invoices"
        metadata={{ portal: "vendor_ops", fiscalYear: "2026-27" }}
      />

      {/* Header & Global Action Cluster */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Vendor Invoices
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage tax-compliant Indian invoices with automated CGST/SGST/IGST and TDS splits.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            data-track-name="export_all_invoices"
            onClick={() => {
              track("invoices_exported_csv", { totalRecords: total });
              toast({
                title: "Export Initiated",
                description: "Your CSV download will begin shortly.",
              });
            }}
          >
            <FileSpreadsheet className="w-4 h-4 mr-2" />
            Export CSV
          </Button>

          <Button
            variant="default"
            data-track-name="create_new_invoice"
            onClick={() => {
              track("create_invoice_clicked");
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Invoice
          </Button>
        </div>
      </div>

      {/* Multi-Tenant Accent Scoping Demonstration */}
      <div className="theme-orange rounded-xl border border-primary/20 bg-primary/5 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-primary" />
          <div className="text-xs sm:text-sm">
            <span className="font-semibold text-foreground">Brand Scoped Container: </span>
            <span className="text-muted-foreground">
              This card utilizes <code className="font-mono text-primary font-bold">.theme-orange</code>.
              All child buttons, links, and badges adapt to the secondary partner color scheme.
            </span>
          </div>
        </div>
        <Button variant="default" size="sm">
          Partner Sync
        </Button>
      </div>

      {/* Primary Data Table */}
      <div className="bg-card rounded-lg shadow-sm border border-border">
        <DataTable
          columns={columns}
          data={invoices}
          isLoading={isLoading}
          skeletonRows={3}
          sortKey={sortKey}
          sortDirection={sortDir}
          onSort={handleSort}
          pagination={{
            page,
            pageSize,
            total,
            onPageChange: (newPage) => {
              setPage(newPage);
              track("invoices_page_changed", { page: newPage });
            },
          }}
          onRowClick={(row) => {
            setSelectedInvoice(row);
            setIsDialogOpen(true);
          }}
        />
      </div>

      {/* Statutory Inspection & Tax Breakdown Modal */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Statutory Tax Clearance & Verification</DialogTitle>
            <DialogDescription>
              Verify statutory compliance, GST split, and TDS deductions before clearing payout for{" "}
              <span className="font-mono font-medium text-foreground">
                {selectedInvoice?.invoiceNumber}
              </span>.
            </DialogDescription>
          </DialogHeader>

          {selectedInvoice && (
            <div className="py-3 space-y-4">
              {/* Region-Specific Tax Calculation Card */}
              <AmountSummaryCardIndia
                baseAmount={selectedInvoice.baseAmount}
                gstRate={selectedInvoice.gstRate}
                isIntraState={selectedInvoice.isIntraState}
                tdsPercentage={selectedInvoice.tdsPercentage}
                transportCost={selectedInvoice.transportCost}
                isUrgent={selectedInvoice.isUrgent}
                urgentLabel="Urgent Disbursement"
              />

              <div className="rounded-lg bg-muted/40 p-3 text-xs text-muted-foreground space-y-1">
                <div className="flex justify-between">
                  <span>Vendor GSTIN:</span>
                  <span className="font-mono font-medium text-foreground">
                    {selectedInvoice.vendorGstin}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>GST Rule Applied:</span>
                  <span className="font-medium text-foreground">
                    {selectedInvoice.isIntraState ? "Intra-State (CGST + SGST)" : "Inter-State (IGST)"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Withholding Section:</span>
                  <span className="font-medium text-foreground">
                    Section 194C / 194J ({selectedInvoice.tdsPercentage}% TDS)
                  </span>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="flex items-center justify-between sm:justify-between pt-2 border-t border-border">
            <Button
              variant="ghost"
              disabled={isApproving}
              onClick={() => setIsDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              isLoading={isApproving}
              loadingText="Authorizing..."
              onClick={handleApproveInvoice}
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Authorize Settlement
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TrackArea>
  );
}
```

---

## 6. Production Verification & Checklist

Before shipping your application integration to production, verify the following checks:

### 1. Style & CSS Layering Check
- [ ] `@import "@umesh0492/react-libs/style.css";` is present at the very top of your global CSS file.
- [ ] Confirm `@layer react-libs` is present in your build output to ensure that application utility classes override library styles cleanly without `!important`.

### 2. Behavioral Analytics Telemetry Check
- [ ] Open your browser's Network DevTools and inspect interactions.
- [ ] Verify that clicking buttons inside `<TrackArea area="invoice-management">` sends batched payloads containing `component.name`, `journey: "invoice-management"`, and session identifiers.
- [ ] Verify that PII patterns (passwords, PANs, Aadhaar numbers) are never transmitted in the event payload.

### 3. Subpath Import Safety
- [ ] Ensure non-DOM server code imports pure utilities from `@umesh0492/react-libs/india` and `@umesh0492/react-libs/analytics`.
- [ ] Ensure client components mounting UI elements use `@umesh0492/react-libs/india/react` and `@umesh0492/react-libs/analytics/react`.
- [ ] Verify that PDF viewer logic is isolated to `@umesh0492/react-libs/pdf` to preserve Node.js SSR stability.

### 4. Accessibility & Responsive Verification
- [ ] Keyboard navigation: Verify that `DataTable` headers can be sorted via `Enter` or `Space` keys.
- [ ] Modals: Verify that `<Dialog>` traps focus properly and dismisses via `Esc` key.
- [ ] High contrast: Test both light and dark mode (`.dark` class on `html`) to verify text legibility and contrast ratios.
