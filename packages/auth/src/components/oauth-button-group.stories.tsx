import type { Meta, StoryObj } from '@storybook/react';
import { OAuthButtonGroup } from './oauth-button-group';
import { AuthProvider } from '../context/auth-context';
import { MockAuthAdapter } from '../core/mock-adapter';

const meta: Meta<typeof OAuthButtonGroup> = {
  title: 'Authentication/OAuthButtonGroup',
  component: OAuthButtonGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Responsive OAuth provider button group supporting stacked and grid layouts, PKCE state verification, ' +
          'redirect URL domain restriction, and seamless single sign-on orchestration.',
      },
    },
  },
  decorators: [
    (Story) => (
      <AuthProvider adapter={new MockAuthAdapter({ latencyMs: 250 })}>
        <div className="w-[340px] p-4">
          <Story />
        </div>
      </AuthProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof OAuthButtonGroup>;

/** Stacked layout featuring Google and LinkedIn. */
export const StackedDefault: Story = {
  args: {
    providers: ['google', 'linkedin'],
    layout: 'stack',
  },
};

/** 2x2 grid layout with all modern enterprise providers. */
export const GridAllProviders: Story = {
  args: {
    providers: ['google', 'microsoft', 'github', 'apple'],
    layout: 'grid',
  },
};

/** Horizontal icon-only row for compact login headers. */
export const IconOnlyRow: Story = {
  args: {
    providers: ['google', 'github', 'microsoft', 'apple'],
    iconOnly: true,
  },
};
