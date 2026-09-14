import type { Meta, StoryObj } from '@storybook/react';
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from './empty';
import { Button } from '../forms/button';
import { PackageSearch, SearchX, FileText, Plus, RefreshCw } from 'lucide-react';

/**
 * Composable modular empty-state primitives following atomic slot composition.
 */
const meta = {
  title: 'Feedback/Empty',
  component: Empty,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Composable subcomponents (`Empty`, `EmptyHeader`, `EmptyMedia`, `EmptyTitle`, ' +
          '`EmptyDescription`, `EmptyContent`) for assembling flexible zero-state placeholders.',
      },
    },
  },
} satisfies Meta<typeof Empty>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Fully composed empty state with icon, title, description, and primary CTA.
 */
export const Default: Story = {
  render: () => (
    <div className="w-[480px] p-4">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <PackageSearch className="w-5 h-5 text-muted-foreground" />
          </EmptyMedia>
          <EmptyTitle>No Orders Found</EmptyTitle>
          <EmptyDescription>
            You have not received any purchase orders in the current fiscal quarter. New orders will appear here automatically.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button size="sm" className="gap-2">
            <Plus className="w-4 h-4" /> Create Requisition
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  ),
};

/**
 * Filtered search zero-results view with clear filters action.
 */
export const SearchNoResults: Story = {
  render: () => (
    <div className="w-[480px] p-4">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <SearchX className="w-5 h-5 text-muted-foreground" />
          </EmptyMedia>
          <EmptyTitle>No Matching Results</EmptyTitle>
          <EmptyDescription>
            We couldn't find any vendor catalogs matching your keyword filters. Try broadening your search terms.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button variant="outline" size="sm" className="gap-2">
            <RefreshCw className="w-3.5 h-3.5" /> Reset Filters
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  ),
};

/**
 * Document repository zero-state.
 */
export const NoDocuments: Story = {
  render: () => (
    <div className="w-[480px] p-4">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <FileText className="w-5 h-5 text-muted-foreground" />
          </EmptyMedia>
          <EmptyTitle>No Invoices Uploaded</EmptyTitle>
          <EmptyDescription>
            Attach compliance certifications or tax clearances to proceed with supplier onboarding.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button size="sm" className="gap-2">
            Upload Tax Clearance
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  ),
};

/**
 * Minimal configuration with title and description only (no media icon or content button).
 */
export const Minimal: Story = {
  render: () => (
    <div className="w-[440px] p-4">
      <Empty>
        <EmptyHeader>
          <EmptyTitle>No Activity Logged</EmptyTitle>
          <EmptyDescription>
            Recent user actions and system changes will be tracked and displayed here in chronological order.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  ),
};

/**
 * Contained inside an inline dashboard card.
 */
export const InCardContainer: Story = {
  render: () => (
    <div className="w-[520px] rounded-xl border border-border bg-card p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h4 className="text-sm font-semibold text-foreground">Recent Shipments</h4>
        <span className="text-xs text-muted-foreground font-mono">0 records</span>
      </div>
      <Empty className="py-8">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <PackageSearch className="w-5 h-5 text-muted-foreground" />
          </EmptyMedia>
          <EmptyTitle>No Active Shipments</EmptyTitle>
          <EmptyDescription>
            Shipments in transit will display tracking numbers and carrier updates here.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  ),
};
