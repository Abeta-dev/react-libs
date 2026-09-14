import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { InstallPwaBanner, type InstallPwaBannerProps } from './install-pwa-banner';
import { ShieldCheck, Sparkles, Building2 } from 'lucide-react';
import { Button } from '../forms/button';

/**
 * PWA installation prompt banner.
 *
 * Prompts users to install the application to their home screen for offline access
 * and desktop/mobile app-like experience. Detects iOS Safari vs Chromium/Android browsers.
 */
const meta = {
  title: 'Feedback/InstallPwaBanner',
  component: InstallPwaBanner,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Prompts mobile and desktop users to install the progressive web application. ' +
          'Automatically listens for `beforeinstallprompt` on Chromium browsers and provides ' +
          'step-by-step instructions for iOS Safari users.',
      },
    },
  },
  argTypes: {
    appName: {
      control: 'text',
      description: 'The display name of the application.',
      table: { category: 'Content', defaultValue: { summary: 'App' } },
    },
    appDescription: {
      control: 'text',
      description: 'The description explaining why the user should install.',
      table: { category: 'Content' },
    },
    storageKey: {
      control: 'text',
      description: 'SessionStorage key used to persist dismissal state.',
      table: { category: 'Behavior', defaultValue: { summary: 'pwa_install_banner_dismissed' } },
    },
    onInstall: {
      action: 'installClicked',
      description: 'Callback invoked when installation is accepted.',
      table: { category: 'Events' },
    },
    onDismiss: {
      action: 'dismissClicked',
      description: 'Callback invoked when dismissed.',
      table: { category: 'Events' },
    },
  },
  args: {
    appName: 'Vendor Portal',
    appDescription: 'Add to your home screen for quick offline access and high-speed order tracking.',
    storageKey: 'storybook_pwa_banner_preview',
  },
} satisfies Meta<typeof InstallPwaBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Helper container that dispatches a synthetic `beforeinstallprompt` event
 * so that the banner mounts and displays in desktop/Storybook preview environments.
 */
function BannerStoryContainer(props: InstallPwaBannerProps) {
  const [mountedKey, setMountedKey] = React.useState(0);

  React.useEffect(() => {
    try {
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.removeItem(props.storageKey || 'pwa_install_banner_dismissed');
      }
    } catch {
      // ignore
    }

    const timer = setTimeout(() => {
      const promptEvent = new Event('beforeinstallprompt') as any;
      promptEvent.prompt = async () => {};
      promptEvent.userChoice = Promise.resolve({ outcome: 'accepted' });
      window.dispatchEvent(promptEvent);
    }, 50);

    return () => clearTimeout(timer);
  }, [mountedKey, props.storageKey]);

  return (
    <div className="w-full max-w-md p-4 flex flex-col items-center gap-4">
      <div className="w-full flex justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            try {
              if (typeof sessionStorage !== 'undefined') {
                sessionStorage.removeItem(props.storageKey || 'pwa_install_banner_dismissed');
              }
            } catch {
              // Ignore storage unavailable
            }
            setMountedKey((k) => k + 1);
          }}
          className="text-xs"
        >
          Reset Banner
        </Button>
      </div>
      <div className="relative w-full min-h-[160px] flex items-center justify-center">
        <InstallPwaBanner
          key={mountedKey}
          {...props}
          className="relative bottom-auto right-auto left-auto w-full md:w-full z-10"
        />
      </div>
    </div>
  );
}

/**
 * Standard banner prompt for modern browsers.
 */
export const Default: Story = {
  render: (args) => <BannerStoryContainer {...args} />,
};

/**
 * Custom branding with custom app title, description, and branded icon.
 */
export const CustomBranding: Story = {
  render: (args) => (
    <BannerStoryContainer
      {...args}
      appName="Partner Portal Pro"
      appDescription="Access RFQs, invoices, and shipment tracking on the go without app store downloads."
      appIcon={<Building2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
      storageKey="storybook_pwa_custom_branding"
    />
  ),
};

/**
 * Security and compliance themed banner.
 */
export const EnterpriseSecurity: Story = {
  render: (args) => (
    <BannerStoryContainer
      {...args}
      appName="Vendor Shield OS"
      appDescription="Install our zero-trust offline PWA for encrypted session resilience and biometrics."
      appIcon={<ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
      storageKey="storybook_pwa_enterprise_shield"
    />
  ),
};

/**
 * Demonstrates the interactive dismissal and reset lifecycle.
 */
export const Dismissible: Story = {
  render: (args) => (
    <BannerStoryContainer
      {...args}
      appName="Inventory Sync"
      appDescription="Dismissing this banner saves dismissal state in session storage."
      appIcon={<Sparkles className="w-5 h-5 text-amber-500" />}
      storageKey="storybook_pwa_dismiss_demo"
    />
  ),
};
