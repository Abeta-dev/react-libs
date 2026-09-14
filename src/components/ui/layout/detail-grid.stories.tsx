import type { Meta, StoryObj } from "@storybook/react";
import { DetailGrid } from "./detail-grid";
import { Card, CardHeader, CardTitle, CardContent } from "./card";
import { DollarSign, ShoppingCart, TrendingUp, AlertCircle } from "lucide-react";

const meta: Meta<typeof DetailGrid> = {
  title: "Layout/DetailGrid",
  component: DetailGrid,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A responsive grid container optimized for metric dashboards and entity detail views. " +
          "Supports 1, 2, 3, or 4 column responsive presets with standardized gap spacing.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DetailGrid>;

function DemoCard({
  title,
  value,
  subtext,
  icon,
}: {
  title: string;
  value: string;
  subtext: string;
  icon: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          {title}
        </CardTitle>
        <div className="text-slate-400">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{value}</div>
        <p className="text-xs text-slate-500 mt-1">{subtext}</p>
      </CardContent>
    </Card>
  );
}

export const ThreeColumnsDefault: Story = {
  args: {
    columns: 3,
  },
  render: (args) => (
    <div className="max-w-6xl mx-auto">
      <DetailGrid {...args}>
        <DemoCard
          title="Total Invoiced"
          value="$128,450"
          subtext="+14.2% from last month"
          icon={<DollarSign className="h-4 w-4" />}
        />
        <DemoCard
          title="Open Purchase Orders"
          value="42 POs"
          subtext="6 awaiting dispatch"
          icon={<ShoppingCart className="h-4 w-4" />}
        />
        <DemoCard
          title="Fulfillment Score"
          value="99.4%"
          subtext="Top 5% of vendor tier"
          icon={<TrendingUp className="h-4 w-4" />}
        />
      </DetailGrid>
    </div>
  ),
};

export const TwoColumns: Story = {
  args: {
    columns: 2,
  },
  render: (args) => (
    <div className="max-w-4xl mx-auto">
      <DetailGrid {...args}>
        <DemoCard
          title="Pending Settlement"
          value="$45,210"
          subtext="Scheduled for transfer on Friday"
          icon={<DollarSign className="h-4 w-4" />}
        />
        <DemoCard
          title="Active Quality Flags"
          value="2 Issues"
          subtext="Requires vendor corrective action"
          icon={<AlertCircle className="h-4 w-4 text-amber-500" />}
        />
      </DetailGrid>
    </div>
  ),
};

export const FourColumns: Story = {
  args: {
    columns: 4,
  },
  render: (args) => (
    <div className="max-w-7xl mx-auto">
      <DetailGrid {...args}>
        <DemoCard
          title="Total Orders"
          value="1,420"
          subtext="+22 this week"
          icon={<ShoppingCart className="h-4 w-4" />}
        />
        <DemoCard
          title="Gross Revenue"
          value="$384,900"
          subtext="+8.6% MoM"
          icon={<DollarSign className="h-4 w-4" />}
        />
        <DemoCard
          title="On-Time Delivery"
          value="98.8%"
          subtext="Above SLA benchmark"
          icon={<TrendingUp className="h-4 w-4" />}
        />
        <DemoCard
          title="Dispute Cases"
          value="0"
          subtext="Clean record for 90d"
          icon={<AlertCircle className="h-4 w-4 text-emerald-500" />}
        />
      </DetailGrid>
    </div>
  ),
};

export const SingleColumn: Story = {
  args: {
    columns: 1,
  },
  render: (args) => (
    <div className="max-w-2xl mx-auto">
      <DetailGrid {...args}>
        <DemoCard
          title="Primary Distribution Hub"
          value="Zone B - Bengaluru Dock"
          subtext="Operational hours: 06:00 - 22:00 IST"
          icon={<TrendingUp className="h-4 w-4" />}
        />
        <DemoCard
          title="Secondary Transit Center"
          value="Zone D - Mumbai Air Cargo"
          subtext="Operational hours: 24/7"
          icon={<ShoppingCart className="h-4 w-4" />}
        />
      </DetailGrid>
    </div>
  ),
};
