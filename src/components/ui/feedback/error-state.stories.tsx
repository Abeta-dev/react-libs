import type { Meta, StoryObj } from '@storybook/react';
import { ErrorState } from './error-state';

/**
 * Centered error card with warning icon, title, description, and retry action.
 */
const meta = {
  title: 'Feedback/ErrorState',
  component: ErrorState,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Standardized card-based error state for failed API requests, query errors, ' +
          'or network failures. Supports retry callbacks and custom action labels.',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'The primary error heading.',
      table: { category: 'Content' },
    },
    description: {
      control: 'text',
      description: 'Explanatory description or resolution guidance.',
      table: { category: 'Content' },
    },
    actionLabel: {
      control: 'text',
      description: 'Label for the CTA retry button.',
      table: { category: 'Content' },
    },
    onAction: {
      action: 'actionClicked',
      description: 'Callback when the action button is clicked.',
      table: { category: 'Events' },
    },
  },
  args: {
    title: 'Failed to load data',
    description: 'An unexpected network error occurred while connecting to the server.',
    actionLabel: 'Try Again',
    onAction: () => {},
  },
} satisfies Meta<typeof ErrorState>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default error presentation with retry action.
 */
export const Default: Story = {
  render: (args) => (
    <div className="w-[460px] p-4">
      <ErrorState {...args} />
    </div>
  ),
};

/**
 * Specific network timeout error scenario.
 */
export const NetworkTimeout: Story = {
  render: (args) => (
    <div className="w-[460px] p-4">
      <ErrorState
        {...args}
        title="Gateway Connection Timeout"
        description="The payment verification service took too long to respond. Your previous changes were not lost."
        actionLabel="Retry Connection"
      />
    </div>
  ),
};

/**
 * Access denied or unrecoverable error without a retry action.
 */
export const WithoutAction: Story = {
  render: () => (
    <div className="w-[460px] p-4">
      <ErrorState
        title="Permission Denied"
        description="Your organization profile does not have clearance to export vendor audit logs."
      />
    </div>
  ),
};

/**
 * In-card layout embedded within a dashboard panel.
 */
export const InsideDashboardCard: Story = {
  render: (args) => (
    <div className="w-[500px] rounded-xl border border-border bg-card p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h4 className="text-sm font-semibold text-foreground">Monthly Invoicing Summary</h4>
        <span className="text-xs text-rose-500 font-medium">Sync Failed</span>
      </div>
      <ErrorState
        {...args}
        title="Invoice Pipeline Unavailable"
        description="Unable to compile invoice metrics for March 2026. Please check your data feed."
        actionLabel="Refresh Pipeline"
      />
    </div>
  ),
};
