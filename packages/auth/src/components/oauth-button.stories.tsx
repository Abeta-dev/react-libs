import type { Meta, StoryObj } from '@storybook/react';
import { OAuthButton } from './oauth-button';

const meta: Meta<typeof OAuthButton> = {
  title: 'Authentication/OAuthButton',
  component: OAuthButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Provider-branded OAuth sign-in button. Includes high-fidelity SVG logos for Google, GitHub, Apple, LinkedIn, ' +
          'and Microsoft, with built-in debouncing, click backpressure, and loading states.',
      },
    },
  },
  argTypes: {
    provider: {
      control: 'select',
      options: ['google', 'linkedin', 'github', 'apple', 'microsoft'],
    },
    variant: {
      control: 'select',
      options: ['outline', 'brand', 'secondary'],
    },
    isLoading: { control: 'boolean' },
    iconOnly: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof OAuthButton>;

/** Google OAuth button in standard outline style. */
export const Google: Story = {
  args: {
    provider: 'google',
    variant: 'outline',
  },
};

/** GitHub OAuth button with brand variant styling. */
export const GitHubBrand: Story = {
  args: {
    provider: 'github',
    variant: 'brand',
  },
};

/** Apple ID sign-in button. */
export const Apple: Story = {
  args: {
    provider: 'apple',
    variant: 'brand',
  },
};

/** Microsoft Entra / Office 365 button. */
export const Microsoft: Story = {
  args: {
    provider: 'microsoft',
    variant: 'outline',
  },
};

/** All 5 supported providers displayed in a row. */
export const AllProviders: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-[280px]">
      <OAuthButton provider="google" onClick={() => alert('Google auth')} />
      <OAuthButton provider="github" onClick={() => alert('GitHub auth')} />
      <OAuthButton provider="microsoft" onClick={() => alert('Microsoft auth')} />
      <OAuthButton provider="apple" onClick={() => alert('Apple auth')} />
      <OAuthButton provider="linkedin" onClick={() => alert('LinkedIn auth')} />
    </div>
  ),
};

/** Compact icon-only row for minimal headers or dense modals. */
export const IconOnlyRow: Story = {
  render: () => (
    <div className="flex gap-3">
      <OAuthButton provider="google" iconOnly onClick={() => alert('Google')} />
      <OAuthButton provider="github" iconOnly onClick={() => alert('GitHub')} />
      <OAuthButton provider="microsoft" iconOnly onClick={() => alert('Microsoft')} />
      <OAuthButton provider="apple" iconOnly onClick={() => alert('Apple')} />
      <OAuthButton provider="linkedin" iconOnly onClick={() => alert('LinkedIn')} />
    </div>
  ),
};
