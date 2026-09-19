import type { Meta, StoryObj } from '@storybook/react';
import { SignUpForm } from './signup-form';
import { AuthProvider } from '../context/auth-context';
import { MockAuthAdapter } from '../core/mock-adapter';

const meta: Meta<typeof SignUpForm> = {
  title: 'Authentication/SignUpForm',
  component: SignUpForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Accessible user registration form featuring full name input, password strength meter (role="meter" with ARIA attributes), ' +
          'terms of service compliance check, sanitized legal URLs, and click backpressure prevention.',
      },
    },
  },
  decorators: [
    (Story) => (
      <AuthProvider adapter={new MockAuthAdapter({ latencyMs: 350 })}>
        <div className="w-[420px] p-6 bg-card border rounded-xl shadow-sm">
          <Story />
        </div>
      </AuthProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SignUpForm>;

/** Standard registration form with password strength indicator and terms checkbox. */
export const Default: Story = {
  args: {
    termsUrl: 'https://example.com/terms',
    privacyUrl: 'https://example.com/privacy',
    onSuccess: (session) => alert(`Welcome, ${session.user.name}! Account created.`),
    onSignInClick: () => alert('Navigate to Sign In'),
  },
};

/** Custom submit label for enterprise vendor registration. */
export const EnterpriseVendorOnboarding: Story = {
  args: {
    submitLabel: 'Register Organization Account',
    termsUrl: 'https://example.com/vendor-terms',
    privacyUrl: 'https://example.com/vendor-privacy',
  },
};
