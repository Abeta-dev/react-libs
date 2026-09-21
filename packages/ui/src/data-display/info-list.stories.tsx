import type { Meta, StoryObj } from "@storybook/react";
import { InfoList } from "./info-list";
import { StatusBadge } from "./status-badge";
import { Card, CardHeader, CardTitle, CardContent } from "../layout/card";

const meta: Meta<typeof InfoList> = {
  title: "Core UI Primitives/Data Display/InfoList",
  component: InfoList,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A key-value metadata list component for displaying entity attributes, " +
          "supporting labels, primary values, and descriptive sub-hints with consistent border dividers.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof InfoList>;

export const Default: Story = {
  args: {
    items: [
      {
        label: "Legal Business Name",
        value: "Acme Logistics Global Pvt Ltd",
      },
      {
        label: "Tax ID / GSTIN",
        value: "27AABCV1234F1Z8",
      },
      {
        label: "Primary Contact",
        value: "Siddharth Verma (VP Operations)",
      },
      {
        label: "Corporate Email",
        value: "operations@acmelogistics.com",
      },
    ],
  },
  render: (args) => (
    <div className="w-[380px] p-4 bg-white dark:bg-slate-900 rounded-lg border border-border">
      <InfoList {...args} />
    </div>
  ),
};

export const WithHints: Story = {
  args: {
    items: [
      {
        label: "Payment Terms",
        value: "Net 45 Days",
        hint: "Calculated from receipt and approval of verified invoice.",
      },
      {
        label: "Credit Limit",
        value: "$250,000 USD",
        hint: "Approved by finance committee on Q1 review.",
      },
      {
        label: "Fulfillment SLA",
        value: "99.2% On-Time",
        hint: "Target benchmark is 98.0% minimum over trailing 90 days.",
      },
    ],
  },
  render: (args) => (
    <div className="w-[420px] p-4 bg-white dark:bg-slate-900 rounded-lg border border-border">
      <InfoList {...args} />
    </div>
  ),
};

export const WithStatusAndBadges: Story = {
  args: {
    items: [
      {
        label: "Account Status",
        value: <StatusBadge status="verified" label="Verified Supplier" />,
        hint: "Completed KYC on Aug 12, 2026",
      },
      {
        label: "Compliance Rating",
        value: <span className="font-bold text-emerald-600 dark:text-emerald-400">Tier 1 (Preferred)</span>,
        hint: "Audit score: 98/100",
      },
      {
        label: "Portal Access",
        value: <span className="font-medium text-indigo-600 hover:underline cursor-pointer">vendor-portal.acme.com</span>,
      },
    ],
  },
  render: (args) => (
    <div className="w-[400px] p-4 bg-white dark:bg-slate-900 rounded-lg border border-border">
      <InfoList {...args} />
    </div>
  ),
};

export const CardWrapped: Story = {
  render: () => (
    <Card className="w-[440px]">
      <CardHeader>
        <CardTitle>Supplier Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <InfoList
          items={[
            {
              label: "Vendor ID",
              value: "VND-84920",
              hint: "System registered identifier",
            },
            {
              label: "Primary Warehouse",
              value: "Bangalore Distribution Hub, KA",
              hint: "Dock 4A - Temperature Controlled",
            },
            {
              label: "Agreement Validity",
              value: "Valid through Dec 31, 2027",
            },
          ]}
        />
      </CardContent>
    </Card>
  ),
};
