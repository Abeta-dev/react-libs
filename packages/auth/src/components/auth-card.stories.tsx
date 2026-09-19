import type { Meta, StoryObj } from '@storybook/react';
import { AuthCard } from './auth-card';
import { AuthProvider } from '../context/auth-context';
import { MockAuthAdapter } from '../core/mock-adapter';

const meta: Meta<typeof AuthCard> = {
  title: 'Authentication/AuthCard',
  component: AuthCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Unified authentication container supporting seamless switching between Sign In, Sign Up, Forgot Password, and OTP modes. ' +
          'Includes accessible tablist controls, state persistence, error boundary isolation, and OAuth button grouping.',
      },
    },
  },
  decorators: [
    (Story) => (
      <AuthProvider adapter={new MockAuthAdapter({ latencyMs: 250 })}>
        <div className="w-[440px] p-2">
          <Story />
        </div>
      </AuthProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AuthCard>;

/** Complete out-of-the-box authentication card with Sign In and Sign Up tabs. */
export const Default: Story = {
  args: {
    title: 'Vendor Cloud Portal',
    subtitle: 'Manage purchase orders, invoices, and supplier compliance.',
    providers: ['google', 'microsoft', 'github'],
    onSuccess: (session) => alert(`Authentication successful! Welcome, ${session.user.name}`),
  },
};

/** Pre-set to Registration / Sign Up view. */
export const SignUpMode: Story = {
  args: {
    initialMode: 'signUp',
    title: 'Create Supplier Account',
    subtitle: 'Join over 5,000 verified enterprise partners.',
    providers: ['google', 'linkedin'],
    signUpProps: {
      termsUrl: 'https://example.com/terms',
      privacyUrl: 'https://example.com/privacy',
    },
  },
};

/** Standalone Forgot Password mode. */
export const ForgotPasswordMode: Story = {
  args: {
    initialMode: 'forgotPassword',
    title: 'Account Recovery',
    subtitle: 'Enter your registered corporate email to reset access.',
  },
};

/** Two-Factor OTP code verification mode. */
export const OtpVerificationMode: Story = {
  args: {
    initialMode: 'otp',
    otpEmail: 'billing@apexlogistics.com',
    title: 'Two-Factor Verification',
    subtitle: 'Enter the 6-digit passcode sent to your device.',
  },
};
