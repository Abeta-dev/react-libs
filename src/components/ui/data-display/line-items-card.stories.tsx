import type { Meta, StoryObj } from "@storybook/react";
import { LineItemsCard, type LineItem } from "./line-items-card";

const meta: Meta<typeof LineItemsCard> = {
  title: "Data Display/LineItemsCard",
  component: LineItemsCard,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A structured line-items card table for purchase orders, invoices, and delivery challans. " +
          "Supports quantity acceptance/rejection breakdown, billing status tags, tax details, and custom footers.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof LineItemsCard>;

const sampleItems: LineItem[] = [
  {
    id: "item-1",
    name: "Industrial Grade Sensor Module - Model X2",
    ean_code: "8901030456123",
    hsn_sac_code: "854231",
    ordered_qty: 100,
    unit: "pcs",
    unit_price: 250,
    total_tax: 4500,
    total_amount: 29500,
    bill_status: "BILLED",
    accepted_qty: 98,
    rejected_qty: 2,
  },
  {
    id: "item-2",
    name: "Heavy-Duty Cable Assembly (5m shielded)",
    ean_code: "8901030789456",
    hsn_sac_code: "854442",
    ordered_qty: 50,
    unit: "units",
    unit_price: 120,
    total_tax: 1080,
    total_amount: 7080,
    bill_status: "RECEIVED",
    accepted_qty: 50,
    rejected_qty: 0,
  },
  {
    id: "item-3",
    name: "Precision Aluminum Mounting Bracket",
    ean_code: "8901030321789",
    hsn_sac_code: "761699",
    ordered_qty: 200,
    unit: "pcs",
    unit_price: 45,
    total_tax: 1620,
    total_amount: 10620,
    bill_status: "PARTIALLY_BILLED",
    accepted_qty: 190,
    rejected_qty: 10,
  },
  {
    id: "item-4",
    name: "Microcontroller Board v3 (Deprecating)",
    ean_code: "8901030654321",
    hsn_sac_code: "854231",
    ordered_qty: 20,
    unit: "pcs",
    unit_price: 310,
    total_tax: 1116,
    total_amount: 7316,
    bill_status: "CANCELLED",
    accepted_qty: 0,
    rejected_qty: 20,
  },
];

export const Default: Story = {
  args: {
    items: sampleItems.slice(0, 3),
    footerLabel: "Total (Excl. Cancelled)",
  },
  render: (args) => (
    <div className="max-w-4xl mx-auto">
      <LineItemsCard {...args} />
    </div>
  ),
};

export const WithBillStatus: Story = {
  args: {
    items: sampleItems,
    showBillStatus: true,
    footerLabel: "Grand Total",
  },
  render: (args) => (
    <div className="max-w-4xl mx-auto">
      <LineItemsCard {...args} />
    </div>
  ),
};

export const WithQuantityBreakdown: Story = {
  args: {
    items: sampleItems.slice(0, 3),
    showQtyBreakdown: true,
    footerLabel: "Approved Total",
  },
  render: (args) => (
    <div className="max-w-5xl mx-auto">
      <LineItemsCard {...args} />
    </div>
  ),
};

export const CompleteInspectionView: Story = {
  args: {
    items: sampleItems,
    showBillStatus: true,
    showQtyBreakdown: true,
    footerLabel: "Total Payable",
  },
  render: (args) => (
    <div className="max-w-6xl mx-auto">
      <LineItemsCard {...args} />
    </div>
  ),
};

export const Empty: Story = {
  args: {
    items: [],
    emptyMessage: "No goods received notes or line items found for this invoice.",
  },
  render: (args) => (
    <div className="max-w-2xl mx-auto border rounded-xl p-6 bg-white dark:bg-slate-900">
      <LineItemsCard {...args} />
    </div>
  ),
};
