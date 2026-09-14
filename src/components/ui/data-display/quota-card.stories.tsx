import type { Meta, StoryObj } from "@storybook/react";
import { QuotaCard } from "./quota-card";
import { Database, Zap, HardDrive } from "lucide-react";

const meta: Meta<typeof QuotaCard> = {
  title: "Data Display/QuotaCard",
  component: QuotaCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A capacity and usage tracker card with progress bar indicator, " +
          "used/remaining summary, and an optional call-to-action button for tier upgrades.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof QuotaCard>;

export const Default: Story = {
  args: {
    title: "Monthly API Requests",
    used: 7240,
    total: 10000,
    unitLabel: "requests",
    actionLabel: "Upgrade Limit",
    onAction: () => console.log("Upgrade clicked"),
  },
  render: (args) => (
    <div className="w-[380px]">
      <QuotaCard {...args} />
    </div>
  ),
};

export const CriticalThreshold: Story = {
  args: {
    title: "Document OCR Extraction",
    used: 940,
    total: 1000,
    unitLabel: "pages",
    actionLabel: "Buy 500 Add-on Pages",
    icon: <Zap className="h-3.5 w-3.5 mr-1.5 text-amber-500" />,
    onAction: () => console.log("Add-on clicked"),
  },
  render: (args) => (
    <div className="w-[380px]">
      <QuotaCard {...args} />
    </div>
  ),
};

export const FullyConsumed: Story = {
  args: {
    title: "Cloud Storage Quota",
    used: 50,
    total: 50,
    unitLabel: "GB",
    actionLabel: "Expand to 200 GB",
    icon: <HardDrive className="h-3.5 w-3.5 mr-1.5 text-rose-500" />,
    onAction: () => console.log("Storage upgrade clicked"),
  },
  render: (args) => (
    <div className="w-[380px]">
      <QuotaCard {...args} />
    </div>
  ),
};

export const LoadingActionState: Story = {
  args: {
    title: "Monthly Invoices Processed",
    used: 480,
    total: 500,
    unitLabel: "invoices",
    actionLabel: "Processing Order...",
    isLoading: true,
    onAction: () => {},
  },
  render: (args) => (
    <div className="w-[380px]">
      <QuotaCard {...args} />
    </div>
  ),
};

export const DisplayOnlyNoAction: Story = {
  args: {
    title: "Concurrent Worker Threads",
    used: 14,
    total: 32,
    unitLabel: "threads",
    description: "Allocated by enterprise provisioning agreement",
    formatPercentage: (pct) => `${Math.round(pct)}% utilized`,
  },
  render: (args) => (
    <div className="w-[380px]">
      <QuotaCard {...args} />
    </div>
  ),
};

export const QuotaDashboardGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-[780px]">
      <QuotaCard
        title="Webhooks Dispatched"
        used={14200}
        total={50000}
        unitLabel="events"
        actionLabel="View Logs"
        icon={<Database className="h-3.5 w-3.5 mr-1.5 text-indigo-500" />}
        onAction={() => {}}
      />
      <QuotaCard
        title="Active Team Seats"
        used={8}
        total={10}
        unitLabel="seats"
        actionLabel="Invite Member"
        onAction={() => {}}
      />
    </div>
  ),
};
