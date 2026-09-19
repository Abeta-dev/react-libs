import type { Meta, StoryObj } from "@storybook/react";
import { UpiQrCard } from "./upi-qr-card";

const meta: Meta<typeof UpiQrCard> = {
  title: "India Primitives/UpiQrCard",
  component: UpiQrCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof UpiQrCard>;

export const DefaultStandee: Story = {
  args: {
    upiId: "merchant@okhdfcbank",
    payeeName: "Apex Classes & Book Store",
    amount: 1500,
    badgeLabel: "0% Commission Direct UPI",
    transactionNote: "Term 1 Tuition Fee",
  },
  render: (args) => (
    <div className="w-[340px]">
      <UpiQrCard {...args} />
    </div>
  ),
};

export const OpenAmountStandee: Story = {
  args: {
    upiId: "shiksha.foundation@sbi",
    payeeName: "Shiksha Foundation Donation",
    badgeLabel: "Direct UPI Contribution",
  },
  render: (args) => (
    <div className="w-[340px]">
      <UpiQrCard {...args} />
    </div>
  ),
};

export const CompactQr: Story = {
  args: {
    upiId: "store@paytm",
    payeeName: "Campus Canteen",
    showStandee: false,
    size: 180,
  },
  render: (args) => (
    <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
      <UpiQrCard {...args} />
    </div>
  ),
};

export const InvalidVpaPlaceholder: Story = {
  args: {
    upiId: "invalid-vpa",
    payeeName: "Demo Merchant",
  },
  render: (args) => (
    <div className="w-[340px]">
      <UpiQrCard {...args} />
    </div>
  ),
};
