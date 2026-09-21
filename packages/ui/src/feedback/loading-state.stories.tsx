import type { Meta, StoryObj } from '@storybook/react';
import { LoadingState } from './loading-state';

/**
 * Standard card-based loading placeholder with spinner and customizable label.
 */
const meta = {
  title: 'Core UI Primitives/Feedback & States/LoadingState',
  component: LoadingState,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Card-contained loading state with animated spinner and informative status message. ' +
          'Used while asynchronously fetching data tables, dashboard charts, or remote settings.',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Text displayed below the spinner.',
      table: { category: 'Content', defaultValue: { summary: 'Loading data...' } },
    },
    spinnerSize: {
      control: { type: 'number', min: 16, max: 64, step: 4 },
      description: 'Pixel diameter of the spinner icon.',
      table: { category: 'Appearance', defaultValue: { summary: '28' } },
    },
  },
  args: {
    label: 'Loading data...',
    spinnerSize: 28,
  },
} satisfies Meta<typeof LoadingState>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default loading indicator.
 */
export const Default: Story = {
  render: (args) => (
    <div className="w-[420px] p-4">
      <LoadingState {...args} />
    </div>
  ),
};

/**
 * Custom context-specific status label.
 */
export const CustomLabel: Story = {
  render: (args) => (
    <div className="w-[420px] p-4">
      <LoadingState
        {...args}
        label="Fetching supplier order history & invoices..."
      />
    </div>
  ),
};

/**
 * Compact version with smaller spinner for smaller cards or sidebar widgets.
 */
export const Compact: Story = {
  render: (args) => (
    <div className="w-[300px] p-4">
      <LoadingState
        {...args}
        spinnerSize={20}
        label="Verifying credentials..."
        className="min-h-32 py-6 px-4"
      />
    </div>
  ),
};

/**
 * Prominent large spinner for long-running batch processes or report generators.
 */
export const Large: Story = {
  render: (args) => (
    <div className="w-[500px] p-4">
      <LoadingState
        {...args}
        spinnerSize={48}
        label="Compiling quarterly GST tax reconciliation..."
        className="min-h-64 py-16"
      />
    </div>
  ),
};

/**
 * Simulated dashboard panel showing the loading state in context.
 */
export const InDashboardPanel: Story = {
  render: (args) => (
    <div className="w-[480px] rounded-xl border border-border bg-card p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div>
          <h4 className="text-sm font-semibold text-foreground">Purchase Order Pipeline</h4>
          <p className="text-xs text-muted-foreground">Active requisitions across regions</p>
        </div>
        <span className="text-xs text-muted-foreground font-mono">LIVE</span>
      </div>
      <LoadingState {...args} label="Streaming live vendor transactions..." />
    </div>
  ),
};
