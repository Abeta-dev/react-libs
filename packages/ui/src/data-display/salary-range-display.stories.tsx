import type { Meta, StoryObj } from "@storybook/react";
import { SalaryRangeDisplay } from "./salary-range-display";

const meta: Meta<typeof SalaryRangeDisplay> = {
  title: "Domain & Talent Lab/SalaryRangeDisplay",
  component: SalaryRangeDisplay,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A compensation and financial bracket indicator supporting compact badge and expanded card variants, " +
          "with detailed breakdown components for fixed pay, variable incentive, and equity.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SalaryRangeDisplay>;

export const DefaultBadge: Story = {
  args: {
    min: 120,
    max: 160,
    currencySymbol: "$",
    unit: "k",
    period: "/yr",
    variant: "badge",
  },
};

export const MinOnlyBadge: Story = {
  args: {
    min: 150,
    currencySymbol: "$",
    unit: "k",
    period: "/yr",
    variant: "badge",
  },
};

export const MaxOnlyBadge: Story = {
  args: {
    max: 220,
    currencySymbol: "€",
    unit: "k",
    period: "/yr",
    variant: "badge",
  },
};

export const CompetitiveBadge: Story = {
  args: {
    variant: "badge",
  },
};

export const CardWithBreakdown: Story = {
  args: {
    min: 140,
    max: 190,
    currencySymbol: "$",
    unit: "k",
    period: "/yr",
    label: "Annual Compensation Package",
    variant: "card",
    breakdown: {
      fixed: 140,
      variable: 35,
      equity: 15,
    },
  },
  render: (args) => (
    <div className="w-[420px]">
      <SalaryRangeDisplay {...args} />
    </div>
  ),
};

export const CardWithCustomBreakdownItems: Story = {
  args: {
    min: 80,
    max: 120,
    currencySymbol: "₹",
    unit: "L",
    period: "/yr",
    label: "Vendor Retainer Scope",
    variant: "card",
    items: [
      {
        label: "Fixed Monthly",
        value: "₹75L",
        colorClass: "text-slate-800 dark:text-slate-200",
      },
      {
        label: "SLA Incentives",
        value: "₹25L",
        colorClass: "text-emerald-600 dark:text-emerald-400",
      },
      {
        label: "Quarterly Bonus",
        value: "₹20L",
        colorClass: "text-indigo-600 dark:text-indigo-400",
      },
    ],
  },
  render: (args) => (
    <div className="w-[440px]">
      <SalaryRangeDisplay {...args} />
    </div>
  ),
};
