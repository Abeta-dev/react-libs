import type { Meta, StoryObj } from "@storybook/react";
import { MetricTicker, type TickerItem } from "./metric-ticker";

const meta: Meta<typeof MetricTicker> = {
  title: "Core UI Primitives/Data Display/MetricTicker",
  component: MetricTicker,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "An animated continuous looping marquee ticker for streaming live operational metrics and KPI pulses. " +
          "Pauses automatically on hover or keyboard focus, respects reduced motion preferences, and supports highlight styling.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MetricTicker>;

const sampleMetrics: TickerItem[] = [
  { id: "1", label: "Active Purchase Orders", value: "482" },
  { id: "2", label: "Gross GMV (MTD)", value: "$1,842,000", highlight: true },
  { id: "3", label: "Avg Dispatch SLA", value: "2.4 hrs" },
  { id: "4", label: "On-Time Delivery", value: "99.2%", highlight: true },
  { id: "5", label: "Quality Pass Rate", value: "98.7%" },
  { id: "6", label: "Open ASN Discrepancies", value: "3" },
  { id: "7", label: "Active Suppliers", value: "1,240" },
  { id: "8", label: "Pending Invoices", value: "12" },
];

export const Default: Story = {
  args: {
    items: sampleMetrics,
    speedSeconds: 30,
  },
  render: (args) => (
    <div className="w-full py-8 bg-slate-950">
      <MetricTicker {...args} />
    </div>
  ),
};

export const HighlightedOnly: Story = {
  args: {
    items: [
      { id: "h1", label: "System Health", value: "100% Nominal", highlight: true },
      { id: "h2", label: "API Response P99", value: "42ms", highlight: true },
      { id: "h3", label: "Orders/Min", value: "340", highlight: true },
      { id: "h4", label: "Zero Severity Incidents", value: "34 Days", highlight: true },
    ],
    speedSeconds: 20,
  },
  render: (args) => (
    <div className="w-full py-8 bg-slate-900">
      <MetricTicker {...args} />
    </div>
  ),
};

export const FastTicker: Story = {
  args: {
    items: sampleMetrics,
    speedSeconds: 12,
  },
  render: (args) => (
    <div className="w-full py-8 bg-slate-950">
      <MetricTicker {...args} />
    </div>
  ),
};

export const SlowAmbientTicker: Story = {
  args: {
    items: sampleMetrics,
    speedSeconds: 60,
  },
  render: (args) => (
    <div className="w-full py-8 bg-slate-950">
      <MetricTicker {...args} />
    </div>
  ),
};
