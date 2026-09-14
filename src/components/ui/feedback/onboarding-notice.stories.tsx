import type { Meta, StoryObj } from '@storybook/react';
import { OnboardingNotice } from './onboarding-notice';

/**
 * Compact informational callout for onboarding steps and prerequisite guidance.
 */
const meta = {
  title: 'Feedback/OnboardingNotice',
  component: OnboardingNotice,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Subtle inline notice with four semantic tones (`info`, `success`, `warning`, `error`). ' +
          'Used to highlight requirements, verification progress, and actionable steps during setup flows.',
      },
    },
  },
  argTypes: {
    tone: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
      description: 'Visual semantic tone of the notice.',
      table: { category: 'Appearance', defaultValue: { summary: 'info' } },
    },
    message: {
      control: 'text',
      description: 'The notice message text or node.',
      table: { category: 'Content' },
    },
  },
  args: {
    tone: 'info',
    message: 'Complete your business entity profile to begin receiving purchase order requests.',
  },
} satisfies Meta<typeof OnboardingNotice>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default informational notice.
 */
export const Default: Story = {
  render: (args) => (
    <div className="w-[500px] p-4">
      <OnboardingNotice {...args} />
    </div>
  ),
};

/**
 * All four semantic tones displayed side-by-side.
 */
export const AllTones: Story = {
  render: () => (
    <div className="w-[500px] p-4 space-y-3">
      <OnboardingNotice
        tone="info"
        message="Tax withholding certificate must be renewed annually by December 31st."
      />
      <OnboardingNotice
        tone="success"
        message="Bank account and IFSC code have been verified successfully."
      />
      <OnboardingNotice
        tone="warning"
        message="Your GST registration number requires secondary approval from procurement compliance."
      />
      <OnboardingNotice
        tone="error"
        message="Invalid PAN or National ID provided. Please re-upload your document."
      />
    </div>
  ),
};

/**
 * Rich content passed as children with inline links and emphasized text.
 */
export const WithRichChildren: Story = {
  render: () => (
    <div className="w-[500px] p-4">
      <OnboardingNotice tone="warning">
        <span>
          Your business documents are pending compliance review. Expected turnaround time is 2 business days.{' '}
          <a
            href="#guidelines"
            className="underline font-semibold hover:opacity-80 inline-block"
            onClick={(e) => {
              e.preventDefault();
              alert('Viewing KYC Guidelines');
            }}
          >
            Review required documents checklist &rarr;
          </a>
        </span>
      </OnboardingNotice>
    </div>
  ),
};

/**
 * Embedded in an onboarding wizard card layout.
 */
export const InOnboardingCard: Story = {
  render: () => (
    <div className="w-[520px] rounded-xl border border-border bg-card p-6 shadow-sm space-y-4">
      <div className="border-b border-border pb-3">
        <h3 className="text-base font-semibold text-foreground">Step 2: Bank & Tax Information</h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          Enter payout details to ensure automated direct deposits.
        </p>
      </div>

      <OnboardingNotice
        tone="info"
        message="Ensure that the beneficiary account holder name matches your registered legal entity exactly."
      />

      <div className="space-y-3 pt-1">
        <div className="h-9 rounded-md border border-input bg-background/50 px-3 flex items-center text-xs text-muted-foreground">
          Bank Account Number
        </div>
        <div className="h-9 rounded-md border border-input bg-background/50 px-3 flex items-center text-xs text-muted-foreground">
          Routing / IFSC Code
        </div>
      </div>
    </div>
  ),
};
