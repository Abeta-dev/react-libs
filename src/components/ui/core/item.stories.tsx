import type { Meta, StoryObj } from "@storybook/react";
import {
  Item,
  ItemMedia,
  ItemContent,
  ItemActions,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
  ItemDescription,
  ItemHeader,
  ItemFooter,
} from "./item";
import { Button } from "../forms/button";
import { FileText, ChevronRight, CheckCircle2, AlertTriangle, ArrowUpRight } from "lucide-react";

const meta: Meta<typeof Item> = {
  title: "Core/Item",
  component: Item,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Composable list item primitives for notification feeds, search results, and activity timelines. " +
          "Includes ItemMedia, ItemContent, ItemTitle, ItemDescription, ItemActions, ItemHeader, ItemFooter, and ItemGroup.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Item>;

export const Default: Story = {
  render: () => (
    <div className="w-[420px]">
      <Item variant="outline">
        <ItemMedia variant="icon">
          <FileText className="text-indigo-600" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Tax Invoice #INV-2026-8491</ItemTitle>
          <ItemDescription>
            Submitted by Alpha Logistics. Awaiting accounts payable approval.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </ItemActions>
      </Item>
    </div>
  ),
};

export const GroupWithSeparators: Story = {
  render: () => (
    <div className="w-[440px] border rounded-xl bg-white dark:bg-slate-900 overflow-hidden">
      <ItemGroup>
        <Item>
          <ItemMedia variant="icon">
            <CheckCircle2 className="text-emerald-500" />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Goods Receipt Confirmed</ItemTitle>
            <ItemDescription>
              GRN #9910 verified at Mumbai Hub. All 120 units accepted.
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <span className="text-xs font-semibold text-slate-400">10m ago</span>
          </ItemActions>
        </Item>

        <ItemSeparator />

        <Item>
          <ItemMedia variant="icon">
            <AlertTriangle className="text-amber-500" />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>ASN Discrepancy Flagged</ItemTitle>
            <ItemDescription>
              Pallet #4 reported short quantity (18 received vs 20 ordered).
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <span className="text-xs font-semibold text-slate-400">1h ago</span>
          </ItemActions>
        </Item>

        <ItemSeparator />

        <Item>
          <ItemMedia variant="icon">
            <FileText className="text-indigo-500" />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>E-Way Bill Generated</ItemTitle>
            <ItemDescription>
              Shipment in transit towards Bangalore distribution center.
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <span className="text-xs font-semibold text-slate-400">3h ago</span>
          </ItemActions>
        </Item>
      </ItemGroup>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="w-[420px] space-y-3">
      <Item variant="default" className="border">
        <ItemMedia variant="icon">
          <FileText className="text-slate-600" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Default Variant</ItemTitle>
          <ItemDescription>Transparent background with subtle border.</ItemDescription>
        </ItemContent>
      </Item>

      <Item variant="outline">
        <ItemMedia variant="icon">
          <FileText className="text-indigo-600" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Outline Variant</ItemTitle>
          <ItemDescription>Distinct border container boundary.</ItemDescription>
        </ItemContent>
      </Item>

      <Item variant="muted">
        <ItemMedia variant="icon">
          <FileText className="text-purple-600" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Muted Variant</ItemTitle>
          <ItemDescription>Shaded background for secondary lists.</ItemDescription>
        </ItemContent>
      </Item>
    </div>
  ),
};

export const SmallDense: Story = {
  render: () => (
    <div className="w-[380px]">
      <Item variant="outline" size="sm">
        <ItemMedia variant="icon">
          <FileText className="h-3.5 w-3.5 text-indigo-500" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="text-xs font-bold">ASN-2026-1049</ItemTitle>
          <ItemDescription className="text-[11px]">En route to Delhi facility</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm" className="h-6 px-2 text-[10px]">
            View
          </Button>
        </ItemActions>
      </Item>
    </div>
  ),
};

export const WithHeaderAndFooter: Story = {
  render: () => (
    <div className="w-[440px]">
      <Item variant="outline">
        <ItemHeader>
          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">
            Purchase Requisition
          </span>
          <span className="text-xs text-slate-400">PO-48201</span>
        </ItemHeader>
        <ItemMedia variant="icon">
          <FileText className="text-indigo-600" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Precision CNC Lathe Accessories</ItemTitle>
          <ItemDescription>
            High accuracy chucks and tooling fixtures for Q4 factory expansion.
          </ItemDescription>
        </ItemContent>
        <ItemFooter>
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Total: $42,500
          </span>
          <Button variant="link" size="sm" className="h-auto p-0 gap-1 text-xs text-indigo-600">
            <span>Details</span>
            <ArrowUpRight className="h-3 w-3" />
          </Button>
        </ItemFooter>
      </Item>
    </div>
  ),
};
