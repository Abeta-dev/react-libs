import type { Meta, StoryObj } from '@storybook/react';
import { ForgotPasswordForm } from './forgot-password-form';
import { AuthProvider } from '../context/auth-context';
import { MockAuthAdapter } from '../core/mock-adapter';

const meta: Meta<typeof ForgotPasswordForm> = {
  title: 'Enterprise Authentication/ForgotPasswordForm',
  component: ForgotPasswordForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Self-service password recovery form. Validates email format, handles loading state with animated spinner, ' +
          'announces errors to screen readers via role="alert", and returns success confirmation state.',
      },
    },
  },
  decorators: [
    (Story) => (
      <AuthProvider adapter={new MockAuthAdapter({ latencyMs: 300 })}>
        <div className="w-[380px] p-6 bg-card border rounded-xl shadow-sm">
          <Story />
        </div>
      </AuthProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ForgotPasswordForm>;

/** Standard password reset request form. */
export const Default: Story = {
  args: {
    onSuccess: () => alert('Password reset link sent to your email!'),
    onBackToSignIn: () => alert('Back to Sign In'),
  },
};
