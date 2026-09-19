import type { Meta, StoryObj } from '@storybook/react';
import { OtpForm } from './otp-form';
import { AuthProvider } from '../context/auth-context';
import { MockAuthAdapter } from '../core/mock-adapter';

const meta: Meta<typeof OtpForm> = {
  title: 'Authentication/OtpForm',
  component: OtpForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Accessible One-Time-Password verification form. Includes auto-focus advancement, paste handling for full codes, ' +
          'WCAG-compliant role="group" and per-digit aria-labels, and a stable 30s resend countdown timer.',
      },
    },
  },
  decorators: [
    (Story) => (
      <AuthProvider adapter={new MockAuthAdapter({ latencyMs: 250 })}>
        <div className="w-[380px] p-6 bg-card border rounded-xl shadow-sm">
          <Story />
        </div>
      </AuthProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof OtpForm>;

/** Standard 6-digit OTP code verification for two-factor authentication or passwordless login. */
export const SixDigitVerification: Story = {
  args: {
    email: 'user@example.com',
    length: 6,
    onSuccess: (session) => alert(`Code verified! Logged in as: ${session.user.name}`),
    onResendCode: () => alert('New OTP code dispatched to user@example.com'),
  },
};

/** 4-digit PIN verification code. */
export const FourDigitVerification: Story = {
  args: {
    email: 'finance@vendor.com',
    length: 4,
    onSuccess: (session) => alert(`PIN approved for session: ${session.accessToken}`),
  },
};
