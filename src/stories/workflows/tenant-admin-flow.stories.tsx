/* eslint-disable sonarjs/no-hardcoded-ip */
import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { toast } from "sonner";
import { Toaster as SonnerToaster } from "../../components/ui/feedback/sonner";
import { WorkspaceBanner } from "../../components/ui/feedback/workspace-banner";
import { ImpersonationBanner } from "../../components/ui/feedback/impersonation-banner";
import { QuotaCard } from "../../components/ui/data-display/quota-card";
import { DataTable, type DataTableColumn, type SortDirection } from "../../components/ui/data-display/data-table";
import { Badge } from "../../components/ui/data-display/badge";
import { Button } from "../../components/ui/forms/button";
import { Input } from "../../components/ui/forms/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/forms/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/layout/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/overlays/dialog";
import { formatDate } from "../../lib/formatters";
import {
  Building2,
  Shield,
  UserCheck,
  Search,
  RefreshCw,
  Eye,
  Key,
  Database,
  Users,
  Server,
  Copy,
  Check,
} from "lucide-react";

const meta: Meta = {
  title: "Living Enterprise Workflows/Multi-Tenant Administration Flow",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Production-grade SaaS Multi-Tenant Administration Console for enterprise procurement networks. " +
          "Features global workspace environment management, live vendor admin impersonation with safe exit banners, " +
          "quota monitoring with reactive upgrade triggers, and an enterprise audit trail with interactive payload inspection " +
          "and instant Sonner toast alerts.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <TenantAdminWorkflow />,
};

interface TenantInfo {
  id: string;
  name: string;
  region: string;
  tier: string;
  activeVendors: number;
}

const AVAILABLE_TENANTS: TenantInfo[] = [
  {
    id: "tnt-bom-01",
    name: "Bharat Logistics & Supply Chain Hub",
    region: "Asia Pacific (Mumbai, ap-south-1)",
    tier: "Enterprise Tier 1",
    activeVendors: 1420,
  },
  {
    id: "tnt-pnq-02",
    name: "Tata Corus Manufacturing AP Hub",
    region: "Asia Pacific (Pune, ap-south-2)",
    tier: "Enterprise Tier 2",
    activeVendors: 860,
  },
  {
    id: "tnt-amd-03",
    name: "Adani Maritime & Terminal Network",
    region: "Asia Pacific (Gujarat, ap-west-1)",
    tier: "Government Sovereign Cluster",
    activeVendors: 2100,
  },
];

interface AuditRecord extends Record<string, unknown> {
  id: string;
  timestamp: string;
  action: string;
  actor: string;
  targetVendor: string;
  severity: "INFO" | "WARNING" | "CRITICAL";
  ipAddress: string;
  details: string;
  payload: Record<string, unknown>;
}

const INITIAL_AUDIT_LOGS: AuditRecord[] = [
  {
    id: "evt-9041",
    timestamp: "2026-09-21T07:45:12Z",
    action: "GSTIN_VALIDATION_FAILURE",
    actor: "system.kyc-bot@abeta.dev",
    targetVendor: "Precision Forgings Ltd",
    severity: "CRITICAL",
    ipAddress: "13.234.112.45",
    details: "GSTIN checksum mismatch against CBIC portal for state code 27",
    payload: {
      error_code: "CBIC_CHK_ERR_04",
      attempted_gstin: "27AAAPF9901M1Z8",
      registered_pan: "AAAPF9901M",
      auto_quarantine: true,
    },
  },
  {
    id: "evt-9040",
    timestamp: "2026-09-21T07:22:04Z",
    action: "API_KEY_ROTATED",
    actor: "security-officer@tnt-bom.internal",
    targetVendor: "Platform System Core",
    severity: "WARNING",
    ipAddress: "10.0.4.192",
    details: "Production B2B Invoicing Webhook secret rotated by Infosec admin",
    payload: {
      key_alias: "wh_sec_prod_inv_v2",
      fingerprint: "SHA256:4f8e...90a1",
      ttl_days: 90,
    },
  },
  {
    id: "evt-9039",
    timestamp: "2026-09-21T06:55:40Z",
    action: "BANK_ACCOUNT_MODIFIED",
    actor: "rajesh.s@acmeindustrial.com",
    targetVendor: "Acme Industrial Corp",
    severity: "WARNING",
    ipAddress: "49.36.128.91",
    details: "Beneficiary bank account updated to HDFC Pimpri Branch (Pending dual approval)",
    payload: {
      old_account: "•••• •••• 1928",
      new_account: "•••• •••• 1726",
      ifsc: "HDFC0001234",
      approval_stage: "L2_CFO_PENDING",
    },
  },
  {
    id: "evt-9038",
    timestamp: "2026-09-21T06:12:18Z",
    action: "IMPERSONATION_STARTED",
    actor: "superadmin.anita@abeta.dev",
    targetVendor: "Acme Industrial Corp",
    severity: "INFO",
    ipAddress: "14.139.110.2",
    details: "SuperAdmin initiated vendor impersonation session for support ticket #TKT-8819",
    payload: {
      ticket_id: "TKT-8819",
      target_user: "rajesh.s@acmeindustrial.com",
      session_ttl_mins: 30,
    },
  },
  {
    id: "evt-9037",
    timestamp: "2026-09-21T05:40:02Z",
    action: "INVOICE_SETTLED_UPI",
    actor: "ap-finance@bharatlogistics.in",
    targetVendor: "Acme Industrial Corp",
    severity: "INFO",
    ipAddress: "103.21.144.10",
    details: "Settled PO-2026-IND-4491 of ₹17,73,810 via direct NPCI UPI switch",
    payload: {
      invoice_number: "INV/2026/8821",
      utr: "629810482910",
      upi_id: "acme.industrial@okhdfcbank",
    },
  },
  {
    id: "evt-9036",
    timestamp: "2026-09-21T04:19:33Z",
    action: "MSME_DISPUTE_FILED",
    actor: "accounts@supreme-valves.co.in",
    targetVendor: "Supreme Industrial Valves",
    severity: "WARNING",
    ipAddress: "157.34.82.11",
    details: "MSME Samadhaan pre-dispute notice generated for invoice aging > 45 days",
    payload: {
      days_overdue: 48,
      claim_amount_inr: 840000,
      samadhaan_case_ref: "MSME-MH-2026-441",
    },
  },
  {
    id: "evt-9035",
    timestamp: "2026-09-21T03:05:51Z",
    action: "QUOTA_THRESHOLD_ALERT",
    actor: "billing-daemon@abeta.dev",
    targetVendor: "Platform Invoicing Gateway",
    severity: "CRITICAL",
    ipAddress: "127.0.0.1",
    details: "Statutory Verification Credits reached 97% of monthly allocation",
    payload: {
      consumed: 4850,
      allocated: 5000,
      threshold: "95%",
    },
  },
  {
    id: "evt-9034",
    timestamp: "2026-09-21T02:11:15Z",
    action: "VENDOR_ONBOARDING_APPROVED",
    actor: "compliance.cell@bharatlogistics.in",
    targetVendor: "Kalyani Precision Gears Pvt Ltd",
    severity: "INFO",
    ipAddress: "115.112.80.34",
    details: "Vendor dossier approved following e-KYC and statutory document audit",
    payload: {
      vendor_id: "VEN-IND-2026-491028",
      gstin: "27AAACK1092P1Z3",
      assigned_risk_rating: "LOW",
    },
  },
];

interface ImpersonationState {
  isActive: boolean;
  user: {
    name: string;
    email: string;
    role: string;
    orgName: string;
  };
}

function TenantAdminWorkflow() {
  const [currentTenantId, setCurrentTenantId] = React.useState<string>("tnt-bom-01");
  const [impersonation, setImpersonation] = React.useState<ImpersonationState>({
    isActive: true,
    user: {
      name: "Rajesh Sharma",
      email: "rajesh.s@acmeindustrial.com",
      role: "Lead Vendor Admin",
      orgName: "Acme Industrial Corp",
    },
  });

  // Quota usage states
  const [quotas, setQuotas] = React.useState({
    invoicingApi: { used: 84200, total: 100000 },
    vendorSlots: { used: 184, total: 250 },
    verificationCredits: { used: 4850, total: 5000 },
    documentStorage: { used: 78, total: 100 },
  });

  // Audit table state
  const [auditLogs, setAuditLogs] = React.useState<AuditRecord[]>(INITIAL_AUDIT_LOGS);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [severityFilter, setSeverityFilter] = React.useState<string>("ALL");
  const [sortKey, setSortKey] = React.useState<string>("timestamp");
  const [sortDir, setSortDir] = React.useState<SortDirection>("desc");
  const [inspectedRecord, setInspectedRecord] = React.useState<AuditRecord | null>(null);
  const [copiedPayload, setCopiedPayload] = React.useState(false);

  const activeTenant = AVAILABLE_TENANTS.find((t) => t.id === currentTenantId) || AVAILABLE_TENANTS[0]!;

  // Quota action handlers
  const handleUpgradeApiQuota = () => {
    setQuotas((prev) => ({
      ...prev,
      invoicingApi: { ...prev.invoicingApi, total: prev.invoicingApi.total + 50000 },
    }));
    toast.success("API Invoicing Quota Increased!", {
      description: "Added +50,000 requests to the tenant monthly allocation.",
    });
  };

  const handleAddVendorSlots = () => {
    setQuotas((prev) => ({
      ...prev,
      vendorSlots: { ...prev.vendorSlots, total: prev.vendorSlots.total + 50 },
    }));
    toast.success("Vendor Onboarding Slots Expanded!", {
      description: "Allocated +50 new active enterprise vendor licenses.",
    });
  };

  const handleRenewVerificationCredits = () => {
    setQuotas((prev) => ({
      ...prev,
      verificationCredits: { used: 0, total: 10000 },
    }));
    toast.success("Statutory Verification Credits Auto-Renewed!", {
      description: "Reset consumption & added 10,000 fresh GSTIN/PAN/IFSC verification credits.",
    });
  };

  const handleExpandStorage = () => {
    setQuotas((prev) => ({
      ...prev,
      documentStorage: { ...prev.documentStorage, total: prev.documentStorage.total + 50 },
    }));
    toast.success("Document S3 Vault Expanded!", {
      description: "Provisioned +50 GB AES-256 encrypted storage on AWS ap-south-1.",
    });
  };

  // Impersonation handlers
  const handleExitImpersonation = () => {
    setImpersonation((prev) => ({ ...prev, isActive: false }));
    toast.info("Terminated Vendor Impersonation Session", {
      description: `Returned to platform SuperAdmin context for ${activeTenant.name}.`,
    });
  };

  const handleStartImpersonation = (vendorName: string, email: string) => {
    setImpersonation({
      isActive: true,
      user: {
        name: vendorName,
        email: email,
        role: "Vendor Authorized Signatory",
        orgName: vendorName,
      },
    });
    toast.warning(`Now Impersonating ${vendorName}`, {
      description: `Active session established as ${email}. Actions will be logged in the audit trail.`,
    });
  };

  // Revoke token
  const handleRevokeToken = (record: AuditRecord) => {
    toast.error(`Security Token Revoked for ${record.targetVendor}`, {
      description: `Target IP ${record.ipAddress} terminated. Requires re-authentication via Entra ID / MFA.`,
    });
  };

  // Filtered and sorted audit records
  const filteredRecords = React.useMemo(() => {
    return auditLogs.filter((rec) => {
      const matchesSearch =
        rec.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rec.actor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rec.targetVendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rec.details.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSeverity =
        severityFilter === "ALL" || rec.severity === severityFilter;

      return matchesSearch && matchesSeverity;
    });
  }, [auditLogs, searchQuery, severityFilter]);

  const sortedRecords = React.useMemo(() => {
    if (!sortKey || !sortDir) return filteredRecords;
    return [...filteredRecords].sort((a, b) => {
      const valA = a[sortKey];
      const valB = b[sortKey];
      if (typeof valA === "string" && typeof valB === "string") {
        return sortDir === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }
      return 0;
    });
  }, [filteredRecords, sortKey, sortDir]);

  const handleSort = (key: string, direction: SortDirection) => {
    setSortKey(key);
    setSortDir(direction);
  };

  const handleCopyPayload = () => {
    if (inspectedRecord && navigator.clipboard) {
      navigator.clipboard.writeText(JSON.stringify(inspectedRecord.payload, null, 2));
      setCopiedPayload(true);
      toast.success("Payload JSON copied to clipboard!");
      setTimeout(() => setCopiedPayload(false), 2000);
    }
  };

  // DataTable columns
  const columns: DataTableColumn<AuditRecord>[] = [
    {
      key: "timestamp",
      header: "Timestamp (UTC)",
      sortable: true,
      cell: (row) => (
        <span className="font-mono text-[11px] text-muted-foreground whitespace-nowrap">
          {formatDate(row.timestamp)} • {row.timestamp.slice(11, 19)}
        </span>
      ),
    },
    {
      key: "action",
      header: "Event Action",
      sortable: true,
      cell: (row) => (
        <div className="space-y-0.5">
          <span className="font-mono text-xs font-bold text-foreground">
            {row.action}
          </span>
          <p className="text-[11px] text-muted-foreground line-clamp-1 max-w-xs">
            {row.details}
          </p>
        </div>
      ),
    },
    {
      key: "actor",
      header: "Actor / IP",
      cell: (row) => (
        <div className="space-y-0.5">
          <span className="font-medium text-xs text-foreground block truncate max-w-[160px]">
            {row.actor}
          </span>
          <span className="font-mono text-[10px] text-muted-foreground">
            {row.ipAddress}
          </span>
        </div>
      ),
    },
    {
      key: "targetVendor",
      header: "Target Entity",
      sortable: true,
      cell: (row) => (
        <span className="font-semibold text-xs text-primary">
          {row.targetVendor}
        </span>
      ),
    },
    {
      key: "severity",
      header: "Severity",
      sortable: true,
      cell: (row) => {
        if (row.severity === "CRITICAL") {
          return (
            <Badge variant="destructive" className="font-bold text-[10px] uppercase">
              Critical
            </Badge>
          );
        }
        if (row.severity === "WARNING") {
          return (
            <Badge variant="outline" className="border-amber-500/50 bg-amber-500/10 text-amber-700 dark:text-amber-400 font-bold text-[10px] uppercase">
              Warning
            </Badge>
          );
        }
        return (
          <Badge variant="secondary" className="font-medium text-[10px] uppercase">
            Info
          </Badge>
        );
      },
    },
    {
      key: "actions",
      header: "Actions",
      cell: (row) => (
        <div className="flex items-center gap-1.5 whitespace-nowrap">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setInspectedRecord(row)}
            className="h-7 px-2 text-[11px] gap-1"
            title="Inspect Event Payload"
          >
            <Eye className="w-3 h-3 text-primary" />
            <span>Inspect</span>
          </Button>

          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleStartImpersonation(row.targetVendor, row.actor)}
            className="h-7 px-2 text-[11px] gap-1 text-slate-700 dark:text-slate-300"
            title="Impersonate Vendor Signatory"
          >
            <UserCheck className="w-3 h-3 text-indigo-500" />
            <span>Impersonate</span>
          </Button>

          {row.severity === "CRITICAL" && (
            <Button
              size="sm"
              variant="destructive"
              onClick={() => handleRevokeToken(row)}
              className="h-7 px-2 text-[11px] gap-1"
              title="Revoke Compromised Session"
            >
              <Key className="w-3 h-3" />
              <span>Revoke</span>
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/70 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 transition-colors">
      <SonnerToaster />

      {/* Sticky Vendor Impersonation Banner */}
      {impersonation.isActive && (
        <ImpersonationBanner
          impersonatedUser={impersonation.user}
          onEndImpersonation={handleExitImpersonation}
        />
      )}

      <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6">
        {/* Workspace Banner */}
        <WorkspaceBanner
          title={
            <div className="flex flex-wrap items-center gap-2">
              <span>{activeTenant.name}</span>
              <Badge variant="outline" className="border-white/30 text-white font-mono text-[11px]">
                {activeTenant.tier}
              </Badge>
            </div>
          }
          subtitle={`Tenant ID: ${activeTenant.id.toUpperCase()} • Region: ${activeTenant.region} • ${activeTenant.activeVendors} Connected Entities`}
          icon={Building2}
          gradientClassName="from-indigo-700 via-indigo-800 to-slate-900"
        />

        {/* Global Controls Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold text-muted-foreground">Switch Tenant Cluster:</span>
            <Select
              value={currentTenantId}
              onValueChange={(val) => {
                setCurrentTenantId(val);
                const selected = AVAILABLE_TENANTS.find((t) => t.id === val);
                toast.info(`Switched Workspace to ${selected?.name}`);
              }}
            >
              <SelectTrigger className="w-[280px] h-8 text-xs">
                <SelectValue placeholder="Select active tenant" />
              </SelectTrigger>
              <SelectContent>
                {AVAILABLE_TENANTS.map((t) => (
                  <SelectItem key={t.id} value={t.id} className="text-xs">
                    {t.name} ({t.id.toUpperCase()})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-1.5 inline-block" />
              Cluster Status: Operational
            </Badge>

            {!impersonation.isActive && (
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleStartImpersonation("Acme Industrial Corp", "rajesh.s@acmeindustrial.com")
                }
                className="text-xs h-8 gap-1.5"
              >
                <UserCheck className="w-3.5 h-3.5 text-indigo-500" />
                <span>Impersonate Vendor</span>
              </Button>
            )}
          </div>
        </div>

        {/* Quota & Usage Metrics Grid */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
              Tenant Resource Quotas & Operational Limits
            </h3>
            <span className="text-xs text-muted-foreground">Billing Cycle: Sep 2026</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* API Invoicing Quota */}
            <QuotaCard
              title="API Invoicing Calls"
              used={quotas.invoicingApi.used}
              total={quotas.invoicingApi.total}
              unitLabel="calls"
              actionLabel="Increase Quota"
              onAction={handleUpgradeApiQuota}
              description={`${quotas.invoicingApi.used.toLocaleString()} of ${quotas.invoicingApi.total.toLocaleString()} API hits`}
            />

            {/* Active Vendor Slots */}
            <QuotaCard
              title="Active Vendor Slots"
              used={quotas.vendorSlots.used}
              total={quotas.vendorSlots.total}
              unitLabel="vendors"
              actionLabel="Add Slots (+50)"
              onAction={handleAddVendorSlots}
              icon={<Users className="w-3.5 h-3.5 mr-1 text-primary" />}
              description={`${quotas.vendorSlots.used} of ${quotas.vendorSlots.total} vendor licenses`}
            />

            {/* Statutory Verification Credits (Warning State) */}
            <QuotaCard
              title="GST/PAN e-KYC Credits"
              used={quotas.verificationCredits.used}
              total={quotas.verificationCredits.total}
              unitLabel="checks"
              actionLabel="Auto-Renew (+10k)"
              onAction={handleRenewVerificationCredits}
              formatPercentage={(pct) => `${Math.round(pct)}% (Action Required)`}
              description={`${quotas.verificationCredits.used} of ${quotas.verificationCredits.total} credits`}
              className="border-amber-400/60 dark:border-amber-500/40 bg-amber-50/20 dark:bg-amber-950/10"
            />

            {/* Document Vault Storage */}
            <QuotaCard
              title="Encrypted Document Vault"
              used={quotas.documentStorage.used}
              total={quotas.documentStorage.total}
              unitLabel="GB"
              actionLabel="Expand S3 (+50GB)"
              onAction={handleExpandStorage}
              icon={<Database className="w-3.5 h-3.5 mr-1 text-indigo-500" />}
              description={`${quotas.documentStorage.used} GB of ${quotas.documentStorage.total} GB capacity`}
            />
          </div>
        </div>

        {/* Audit Log Data Table Card */}
        <Card className="border-slate-200/80 dark:border-slate-800 shadow-sm">
          <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  <CardTitle className="text-base font-bold">
                    Enterprise Immutable Audit Trail
                  </CardTitle>
                </div>
                <CardDescription className="text-xs">
                  Real-time event ledger tracking statutory compliance, key rotation, and tenant operations
                </CardDescription>
              </div>

              {/* Table Search & Severity Filter */}
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-muted-foreground" />
                  <Input
                    placeholder="Search logs by keyword..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-8 pl-8 text-xs w-[200px] sm:w-[240px]"
                  />
                </div>

                <Select value={severityFilter} onValueChange={setSeverityFilter}>
                  <SelectTrigger className="h-8 text-xs w-[120px]">
                    <SelectValue placeholder="Severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">All Severities</SelectItem>
                    <SelectItem value="CRITICAL">Critical</SelectItem>
                    <SelectItem value="WARNING">Warning</SelectItem>
                    <SelectItem value="INFO">Info</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchQuery("");
                    setSeverityFilter("ALL");
                    setAuditLogs(INITIAL_AUDIT_LOGS);
                    toast.info("Audit logs refreshed from Kafka cluster.");
                  }}
                  className="h-8 px-2 text-xs"
                  title="Reload audit records"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-4">
            <DataTable
              columns={columns}
              data={sortedRecords}
              sortKey={sortKey}
              sortDirection={sortDir}
              onSort={handleSort}
              emptyMessage="No audit events matched your search filters."
            />
          </CardContent>
        </Card>
      </div>

      {/* Audit Event Payload Inspector Dialog */}
      <Dialog
        open={Boolean(inspectedRecord)}
        onOpenChange={(open) => !open && setInspectedRecord(null)}
      >
        <DialogContent className="max-w-lg p-6">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="font-mono text-xs text-primary border-primary/30">
                {inspectedRecord?.id}
              </Badge>
              <DialogTitle className="text-base font-bold">
                {inspectedRecord?.action}
              </DialogTitle>
            </div>
            <DialogDescription className="text-xs text-muted-foreground mt-1">
              Event recorded at {inspectedRecord?.timestamp} by {inspectedRecord?.actor}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 my-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
              <p className="font-semibold text-slate-800 dark:text-slate-200">
                {inspectedRecord?.details}
              </p>
              <div className="flex items-center gap-4 text-muted-foreground text-[11px]">
                <span>Target: {inspectedRecord?.targetVendor}</span>
                <span>Source IP: {inspectedRecord?.ipAddress}</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[11px] uppercase tracking-wider text-slate-500">
                  Raw Event JSON Payload
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleCopyPayload}
                  className="h-6 text-[11px] gap-1 px-2 text-primary"
                >
                  {copiedPayload ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedPayload ? "Copied" : "Copy JSON"}</span>
                </Button>
              </div>

              <pre className="p-3 rounded-lg bg-slate-950 text-emerald-400 font-mono text-[11px] overflow-x-auto max-h-56 border border-slate-800">
                {JSON.stringify(inspectedRecord?.payload, null, 2)}
              </pre>
            </div>
          </div>

          <DialogFooter className="sm:justify-end">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setInspectedRecord(null)}
            >
              Close Inspector
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
