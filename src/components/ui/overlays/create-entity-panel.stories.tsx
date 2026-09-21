import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { CreateEntityPanel } from "./create-entity-panel";
import { Button } from "../forms/button";
import { Input } from "../forms/input";
import { Label } from "../forms/label";
import { Building2, Plus, FileSpreadsheet, Eye } from "lucide-react";

const meta: Meta<typeof CreateEntityPanel> = {
  title: "Core UI Primitives/Overlays & Dialogs/CreateEntityPanel",
  component: CreateEntityPanel,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A slide-over sheet drawer customized for creating or editing entities (e.g. vendors, invoices, purchase orders). " +
          "Contains a structured header with icon, scrollable form container, and fixed footer with Save/Cancel controls.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CreateEntityPanel>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <div className="p-8">
        <Button onClick={() => setOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add New Supplier
        </Button>
        <CreateEntityPanel
          open={open}
          onOpenChange={setOpen}
          title="Create New Supplier"
          description="Register a new commercial partner in your vendor directory."
          icon={<Building2 className="h-5 w-5 text-indigo-600" />}
          onSave={() => {
            alert("Supplier saved successfully!");
            setOpen(false);
          }}
          saveLabel="Create Supplier"
        >
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="sp-name">Legal Business Name</Label>
              <Input id="sp-name" placeholder="e.g. Zenith Tech Solutions" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="sp-code">Vendor Code</Label>
              <Input id="sp-code" placeholder="VND-84902" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="sp-email">Billing Email</Label>
              <Input id="sp-email" type="email" placeholder="billing@zenith.com" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="sp-tax">Tax ID / GSTIN</Label>
              <Input id="sp-tax" placeholder="29ABCDE1234F1Z5" />
            </div>
          </div>
        </CreateEntityPanel>
      </div>
    );
  },
};

export const SavingState: Story = {
  render: () => {
    const [open, setOpen] = React.useState(true);

    return (
      <div className="p-8">
        <Button onClick={() => setOpen(true)}>Open Saving Sheet</Button>
        <CreateEntityPanel
          open={open}
          onOpenChange={setOpen}
          title="Processing Purchase Order"
          description="Validating quantities against warehouse allocations..."
          icon={<FileSpreadsheet className="h-5 w-5 text-indigo-600" />}
          isSaving={true}
          saveLabel="Generating PO..."
          onSave={() => {}}
        >
          <div className="space-y-4 text-xs text-slate-500">
            <p>Creating purchase order PO-2026-9041 with 8 line items...</p>
          </div>
        </CreateEntityPanel>
      </div>
    );
  },
};

export const LargeSize: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <div className="p-8">
        <Button variant="outline" onClick={() => setOpen(true)} className="gap-2">
          <FileSpreadsheet className="h-4 w-4" />
          Create Detailed Contract (Large)
        </Button>
        <CreateEntityPanel
          open={open}
          onOpenChange={setOpen}
          size="lg"
          title="Master Service Agreement"
          description="Draft and configure commercial SLA clauses and credit caps."
          icon={<FileSpreadsheet className="h-5 w-5 text-indigo-600" />}
          onSave={() => setOpen(false)}
          saveLabel="Publish Agreement"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5 col-span-2">
              <Label htmlFor="doc-title">Agreement Title</Label>
              <Input id="doc-title" defaultValue="FY26 Global Logistics & Warehousing SLA" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="doc-eff">Effective Date</Label>
              <Input id="doc-eff" type="date" defaultValue="2026-10-01" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="doc-exp">Expiration Date</Label>
              <Input id="doc-exp" type="date" defaultValue="2027-09-30" />
            </div>
            <div className="space-y-1.5 col-span-2">
              <Label htmlFor="doc-cap">Annual Credit Cap ($)</Label>
              <Input id="doc-cap" type="number" defaultValue="500000" />
            </div>
          </div>
        </CreateEntityPanel>
      </div>
    );
  },
};

export const ReadOnly: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <div className="p-8">
        <Button variant="outline" onClick={() => setOpen(true)} className="gap-2">
          <Eye className="h-4 w-4" />
          View Vendor Profile (Read-Only)
        </Button>
        <CreateEntityPanel
          open={open}
          onOpenChange={setOpen}
          readOnly={true}
          title="Verified Vendor Record"
          description="Audit record locked against direct modifications."
          icon={<Building2 className="h-5 w-5 text-emerald-600" />}
          cancelLabel="Close"
        >
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
              <span className="font-semibold text-slate-500 block">Vendor ID:</span>
              <span className="font-mono font-bold text-slate-900 dark:text-slate-100">VND-99201-APPROVED</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
              <span className="font-semibold text-slate-500 block">Compliance Status:</span>
              <span className="font-bold text-emerald-600">Active - Zero Sanctions</span>
            </div>
          </div>
        </CreateEntityPanel>
      </div>
    );
  },
};
