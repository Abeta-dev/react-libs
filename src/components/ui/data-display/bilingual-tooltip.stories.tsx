import type { Meta, StoryObj } from "@storybook/react";
import { BilingualTooltip } from "./bilingual-tooltip";

const meta: Meta<typeof BilingualTooltip> = {
  title: "Data Display/BilingualTooltip",
  component: BilingualTooltip,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A multi-language tooltip designed for charts and data visualizations. " +
          "Supports direct translations, key mappings, locale-aware currency and percentage formatting.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof BilingualTooltip>;

const defaultPayload = [
  { name: "Revenue", value: 45200, color: "#6366f1" },
  { name: "Expenses", value: 28400, color: "#f43f5e" },
  { name: "Net Profit", value: 16800, color: "#10b981" },
];

export const Default: Story = {
  args: {
    active: true,
    label: "August 2026",
    payload: defaultPayload,
    language: "en",
    locale: "en-US",
  },
  render: (args) => (
    <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
      <BilingualTooltip {...args} />
    </div>
  ),
};

export const CurrencyFormatted: Story = {
  args: {
    active: true,
    label: "Q3 Earnings",
    payload: defaultPayload,
    formatCurrency: true,
    currencySymbol: "$",
    locale: "en-US",
  },
  render: (args) => (
    <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
      <BilingualTooltip {...args} />
    </div>
  ),
};

export const BilingualSpanish: Story = {
  args: {
    active: true,
    label: "August 2026",
    language: "es",
    dictionary: {
      es: {
        "August 2026": "Agosto 2026",
        Revenue: "Ingresos",
        Expenses: "Gastos",
        "Net Profit": "Beneficio Neto",
      },
    },
    payload: defaultPayload,
    formatCurrency: true,
    currencySymbol: "€",
    locale: "es-ES",
  },
  render: (args) => (
    <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
      <BilingualTooltip {...args} />
    </div>
  ),
};

export const BilingualHindi: Story = {
  args: {
    active: true,
    label: "Q3 Performance",
    language: "hi",
    translations: {
      "Q3 Performance": "तिमाही 3 प्रदर्शन",
      Revenue: "राजस्व",
      Expenses: "खर्च",
      "Net Profit": "शुद्ध लाभ",
    },
    payload: [
      { name: "Revenue", value: "₹45,20,000", color: "#6366f1" },
      { name: "Expenses", value: "₹28,40,000", color: "#f43f5e" },
      { name: "Net Profit", value: "₹16,80,000", color: "#10b981" },
    ],
  },
  render: (args) => (
    <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
      <BilingualTooltip {...args} />
    </div>
  ),
};

export const PercentFormatted: Story = {
  args: {
    active: true,
    label: "Conversion Rates",
    payload: [
      { name: "Vendor Acceptance", value: 94.6, color: "#10b981" },
      { name: "Catalog Compliance", value: 88.2, color: "#6366f1" },
      { name: "Return Rate", value: 3.4, color: "#f59e0b" },
    ],
    formatPercent: true,
  },
  render: (args) => (
    <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
      <BilingualTooltip {...args} />
    </div>
  ),
};

export const CustomFormatter: Story = {
  args: {
    active: true,
    label: "Dispatch Volume",
    payload: [
      { name: "Pallets Shipped", value: 1420, color: "#0ea5e9" },
      { name: "Truckloads", value: 38, color: "#8b5cf6" },
    ],
    formatter: (val, name) => `${val} units (${name.toLowerCase()})`,
  },
  render: (args) => (
    <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
      <BilingualTooltip {...args} />
    </div>
  ),
};
