import type { Meta, StoryObj } from "@storybook/react";
import { AmountSummaryCardIndia } from "./amount-summary-card-india";

/**
 * India-specific tax invoice & settlement amount breakdown card.
 * Handles Indian GST calculation (CGST + SGST for intra-state, IGST for inter-state),
 * TDS deductions under Section 194C/194J, freight / transport costs, and lakh/crore Indian currency formatting.
 */
const meta: Meta<typeof AmountSummaryCardIndia> = {
  title: "India Primitives/AmountSummaryCardIndia",
  component: AmountSummaryCardIndia,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Comprehensive Indian financial settlement card. Computes dual GST splits, TDS withholding deductions, " +
          "freight surcharges, and renders verified compliance badges with Lakhs/Crores verbalization.",
      },
    },
  },
  argTypes: {
    baseAmount: { control: { type: "number", min: 0, step: 1000 } },
    gstRate: { control: { type: "select" }, options: [0, 5, 12, 18, 28] },
    isIntraState: { control: "boolean" },
    isTaxInclusive: { control: "boolean" },
    transportCost: { control: { type: "number", min: 0, step: 500 } },
    tdsPercentage: { control: { type: "select" }, options: [0, 1, 2, 5, 10] },
    isUrgent: { control: "boolean" },
    size: { control: { type: "inline-radio" }, options: ["default", "sm"] },
  },
};

export default meta;
type Story = StoryObj<typeof AmountSummaryCardIndia>;

/** Standard Intra-State invoice with 18% GST split into 9% CGST and 9% SGST. */
export const IntraStateGST: Story = {
  args: {
    baseAmount: 250000,
    gstRate: 18,
    isIntraState: true,
    isTaxInclusive: false,
    transportCost: 3500,
    tdsPercentage: 0,
    isUrgent: false,
  },
  render: (args) => (
    <div className="w-[380px]">
      <AmountSummaryCardIndia {...args} />
    </div>
  ),
};

/** Inter-State B2B transaction subject to 18% IGST. */
export const InterStateIGST: Story = {
  args: {
    baseAmount: 850000,
    gstRate: 18,
    isIntraState: false,
    isTaxInclusive: false,
    transportCost: 12000,
    tdsPercentage: 0,
    isUrgent: false,
  },
  render: (args) => (
    <div className="w-[380px]">
      <AmountSummaryCardIndia {...args} />
    </div>
  ),
};

/** Enterprise contract with 2% TDS deduction under Sec 194C and urgent payout flag. */
export const EnterpriseWithTDS: Story = {
  args: {
    baseAmount: 1500000,
    gstRate: 18,
    isIntraState: true,
    isTaxInclusive: false,
    transportCost: 25000,
    tdsPercentage: 2,
    isUrgent: true,
    urgentLabel: "Priority T+0 Settlement",
  },
  render: (args) => (
    <div className="w-[380px]">
      <AmountSummaryCardIndia {...args} />
    </div>
  ),
};

/** Tax-inclusive pricing (e.g. retail or FMCG supply) with small compact footprint. */
export const CompactTaxInclusive: Story = {
  args: {
    baseAmount: 48500,
    gstRate: 12,
    isIntraState: true,
    isTaxInclusive: true,
    size: "sm",
  },
  render: (args) => (
    <div className="w-[340px]">
      <AmountSummaryCardIndia {...args} />
    </div>
  ),
};
