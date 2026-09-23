import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { SearchField } from "./search-field";
import { Button } from "./button";
import { Filter, SlidersHorizontal } from "lucide-react";

const meta: Meta<typeof SearchField> = {
  title: "Core UI Primitives/Forms & Inputs/SearchField",
  component: SearchField,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "An enhanced search input field featuring a search icon prefix and an optional quick-clear button.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SearchField>;

export const Default: Story = {
  args: {
    placeholder: "Search vendors, invoices, or PO numbers...",
  },
  render: (args) => (
    <div className="w-[360px]">
      <SearchField {...args} />
    </div>
  ),
};

export const WithValue: Story = {
  args: {
    value: "Acme Logistics Global",
    placeholder: "Search...",
    showClear: true,
  },
  render: (args) => (
    <div className="w-[360px]">
      <SearchField {...args} />
    </div>
  ),
};

export const InteractiveControlled: Story = {
  render: () => {
    const [query, setQuery] = React.useState("Precision Tech");

    return (
      <div className="w-[380px] space-y-3">
        <SearchField
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onClear={() => setQuery("")}
          placeholder="Type to filter results..."
        />
        <p className="text-xs text-slate-500">
          Current query: <span className="font-semibold text-slate-900 dark:text-slate-100">{query || "—"}</span>
        </p>
      </div>
    );
  },
};

export const WithoutClearButton: Story = {
  args: {
    value: "Fixed Query Example",
    showClear: false,
    placeholder: "Search...",
  },
  render: (args) => (
    <div className="w-[360px]">
      <SearchField {...args} />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    value: "Read-only filter query",
    disabled: true,
  },
  render: (args) => (
    <div className="w-[360px]">
      <SearchField {...args} />
    </div>
  ),
};

export const InToolbar: Story = {
  render: () => {
    const [search, setSearch] = React.useState("");

    return (
      <div className="flex items-center gap-3 w-[560px] p-3 border rounded-xl bg-white dark:bg-slate-900">
        <SearchField
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onClear={() => setSearch("")}
          placeholder="Filter supplier catalog..."
        />
        <Button variant="outline" size="sm" className="shrink-0 gap-1.5 text-xs">
          <Filter className="h-3.5 w-3.5 text-slate-500" />
          Filter
        </Button>
        <Button variant="outline" size="sm" className="shrink-0 gap-1.5 text-xs">
          <SlidersHorizontal className="h-3.5 w-3.5 text-slate-500" />
          View
        </Button>
      </div>
    );
  },
};
