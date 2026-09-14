import type { Meta, StoryObj } from '@storybook/react';
import { ImpersonationBanner } from './impersonation-banner';

/**
 * Top alert banner indicating that an administrator is actively impersonating another user.
 */
const meta = {
  title: 'Feedback/ImpersonationBanner',
  component: ImpersonationBanner,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'High-visibility amber banner fixed or sticky at the top of the viewport when a super-admin ' +
          'or support agent impersonates a customer or vendor account. Provides immediate exit action.',
      },
    },
  },
  argTypes: {
    impersonatedUser: {
      description: 'The user account currently being impersonated.',
      table: { category: 'User Context' },
    },
    onEndImpersonation: {
      action: 'exitImpersonationClicked',
      description: 'Callback to terminate the impersonation session.',
      table: { category: 'Events' },
    },
    isLoading: {
      control: 'boolean',
      description: 'Disables exit button while session termination is in-flight.',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
  },
  args: {
    impersonatedUser: {
      name: 'Sarah Jenkins',
      email: 'sarah.j@acmesupplies.com',
      role: 'Procurement Director',
      orgName: 'Acme Global Supplies',
    },
    onEndImpersonation: () => {},
    isLoading: false,
  },
} satisfies Meta<typeof ImpersonationBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Standard impersonation banner with full user profile details.
 */
export const Default: Story = {
  render: (args) => (
    <div className="w-full">
      <ImpersonationBanner {...args} />
    </div>
  ),
};

/**
 * Account without display name, falling back to email address.
 */
export const EmailFallback: Story = {
  render: (args) => (
    <div className="w-full">
      <ImpersonationBanner
        {...args}
        impersonatedUser={{
          email: 'finance-lead@partnerlogistics.org',
          role: 'Finance Auditor',
          orgName: 'Partner Logistics',
        }}
      />
    </div>
  ),
};

/**
 * Session termination in-flight state with disabled exit button.
 */
export const LoadingState: Story = {
  render: (args) => (
    <div className="w-full">
      <ImpersonationBanner
        {...args}
        isLoading={true}
        impersonatedUser={{
          name: 'Vikram Patel',
          email: 'vikram@hindustantrading.in',
          role: 'Vendor Admin',
          orgName: 'Hindustan Trading Co.',
        }}
      />
    </div>
  ),
};

/**
 * In-context preview mounted at the top of an application page frame.
 */
export const InPageContext: Story = {
  render: (args) => (
    <div className="w-full min-h-[400px] bg-background border border-border rounded-xl overflow-hidden flex flex-col">
      <ImpersonationBanner {...args} className="sticky top-0 relative" />
      <div className="p-6 space-y-4 flex-1">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <h2 className="text-lg font-bold text-foreground">Vendor Dashboard</h2>
          <span className="text-xs bg-muted px-2.5 py-1 rounded-full text-muted-foreground font-mono">
            Read/Write Delegated Session
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          You are currently experiencing the platform exactly as Sarah Jenkins sees it.
          Actions performed here will be logged under your administrator audit trail.
        </p>
      </div>
    </div>
  ),
};
