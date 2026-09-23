import type { Meta, StoryObj } from '@storybook/react';
import { AppSplashScreen } from './app-splash-screen';
import { Building2, Database, ShieldCheck, Zap } from 'lucide-react';

/**
 * Fullscreen application bootstrap / splash screen.
 *
 * Displayed while service workers initialize, authentication tokens are validated,
 * or offline IndexedDB caches are populated.
 */
const meta = {
  title: 'Core UI Primitives/Feedback & States/AppSplashScreen',
  component: AppSplashScreen,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'PWA loading & splash screen. Can be rendered fullscreen on startup or contained inside ' +
          'a frame during lazy-loaded module bootstrapping. Fully dark-mode aware.',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'The primary headline or application name.',
      table: { category: 'Content', defaultValue: { summary: 'Welcome' } },
    },
    subtitle: {
      control: 'text',
      description: 'Secondary descriptor or enterprise tenant name.',
      table: { category: 'Content' },
    },
    message: {
      control: 'text',
      description: 'The status message accompanying the spinner.',
      table: { category: 'Content', defaultValue: { summary: 'Initializing workspace...' } },
    },
  },
  args: {
    title: 'Vendor Portal',
    subtitle: 'Enterprise Supply Chain Cloud',
    message: 'Initializing workspace...',
  },
} satisfies Meta<typeof AppSplashScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Contained default splash preview simulating mobile/tablet app boot.
 */
export const Default: Story = {
  render: (args) => (
    <div className="relative h-[500px] w-full max-w-sm rounded-2xl border border-border shadow-2xl overflow-hidden">
      <AppSplashScreen
        {...args}
        className="relative inset-auto h-full w-full"
      />
    </div>
  ),
};

/**
 * Enterprise multi-tenant authentication splash screen with custom icon.
 */
export const EnterpriseAuth: Story = {
  render: (args) => (
    <div className="relative h-[500px] w-full max-w-sm rounded-2xl border border-border shadow-2xl overflow-hidden">
      <AppSplashScreen
        {...args}
        title="Acme Logistics OS"
        subtitle="Tenant: US-East-1 • High Security"
        message="Verifying cryptographic session tokens..."
        icon={<ShieldCheck className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />}
        className="relative inset-auto h-full w-full"
      />
    </div>
  ),
};

/**
 * Offline synchronization splash screen.
 */
export const OfflineDataSync: Story = {
  render: (args) => (
    <div className="relative h-[500px] w-full max-w-sm rounded-2xl border border-border shadow-2xl overflow-hidden">
      <AppSplashScreen
        {...args}
        title="Catalog Cache"
        subtitle="PWA Offline Resilience Engine"
        message="Syncing 1,420 product records..."
        icon={<Database className="w-8 h-8 text-blue-600 dark:text-blue-400" />}
        className="relative inset-auto h-full w-full"
      />
    </div>
  ),
};

/**
 * High-speed rapid startup splash.
 */
export const FastBoot: Story = {
  render: (args) => (
    <div className="relative h-[500px] w-full max-w-sm rounded-2xl border border-border shadow-2xl overflow-hidden">
      <AppSplashScreen
        {...args}
        title="Quick Order Mobile"
        subtitle="Version 3.4.0 (Build 902)"
        message="Connecting to nearby edge node..."
        icon={<Zap className="w-8 h-8 text-amber-500" />}
        className="relative inset-auto h-full w-full"
      />
    </div>
  ),
};

/**
 * Fullscreen layout matching native app launch experience.
 */
export const FullscreenLaunch: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: (args) => (
    <div className="relative min-h-screen w-full">
      <AppSplashScreen
        {...args}
        title="Global Supplier Network"
        subtitle="Connected Enterprise Suite"
        message="Loading encrypted workspace assets..."
        icon={<Building2 className="w-8 h-8 text-primary" />}
      />
    </div>
  ),
};
