import type { Meta, StoryObj } from '@storybook/react';
import { LoginForm } from './login-form';
import { AuthProvider } from '../context/auth-context';
import { MockAuthAdapter, DEFAULT_MOCK_PASSWORD } from '../core/mock-adapter';

const meta: Meta<typeof LoginForm> = {
  title: 'Enterprise Authentication/LoginForm',
  component: LoginForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Accessible login form featuring real-time email syntax verification, password visibility toggle (WCAG 44px touch target), ' +
          'click backpressure / debounce lock, and seamless AuthAdapter integration with aria-describedby field validation.',
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
type Story = StoryObj<typeof LoginForm>;

/** Default login form with email & password validation and remember-me toggle. */
export const Default: Story = {
  args: {
    onSuccess: (session) => alert(`Signed in as: ${session.user.name} (${session.user.email})`),
    onError: (err) => console.error('Sign in error:', err),
    onForgotPasswordClick: () => alert('Navigate to Forgot Password'),
    onSignUpClick: () => alert('Navigate to Sign Up'),
  },
};

/** Pre-filled credentials showing quick test login (alex@example.com / Password123!). */
export const PreFilledCredentials: Story = {
  args: {
    defaultValues: {
      email: 'alex@example.com',
      password: DEFAULT_MOCK_PASSWORD,
      rememberMe: true,
    },
    onSuccess: (session) => alert(`Signed in as: ${session.user.name}`),
  },
};

/** Simplified login without remember-me checkbox or forgot password link. */
export const Minimal: Story = {
  args: {
    showRememberMe: false,
    showForgotPassword: false,
    submitLabel: 'Proceed to Vendor Portal',
  },
};
