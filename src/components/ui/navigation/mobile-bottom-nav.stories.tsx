import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MobileBottomNav, type MobileBottomNavProps, type MobileNavItem } from './mobile-bottom-nav';
import { Home, Package, FileText, User, Bell, Settings, BarChart2 } from 'lucide-react';

/**
 * Mobile-first bottom navigation bar.
 *
 * Provides primary view switching with haptic feedback, badges, and responsive touch targets.
 * Optimized for PWA mobile viewports with safe area padding.
 */
const standardItems: MobileNavItem[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'orders', label: 'Orders', icon: Package, badge: 4 },
  { id: 'invoices', label: 'Invoices', icon: FileText },
  { id: 'profile', label: 'Profile', icon: User },
];

const meta = {
  title: 'Navigation/MobileBottomNav',
  component: MobileBottomNav,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Fixed mobile bottom navigation bar with iOS safe-area support, subtle haptic taps, ' +
          'active indicator states, numeric/string notification badges, and overflow action drawer trigger.',
      },
    },
  },
  argTypes: {
    activeId: {
      control: 'text',
      description: 'The id of the currently active navigation item.',
      table: { category: 'State' },
    },
    onChange: {
      action: 'tabChanged',
      description: 'Fired when a navigation button is clicked.',
      table: { category: 'Events' },
    },
  },
  args: {
    items: standardItems,
    activeId: 'home',
    onChange: () => {},
  },
} satisfies Meta<typeof MobileBottomNav>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Interactive wrapper managing tab selection and rendering in a mobile viewport container.
 */
function MobileNavStoryPreview({
  initialActive = 'home',
  items = standardItems,
  moreAction,
  className,
}: {
  initialActive?: string;
  items?: MobileNavItem[];
  moreAction?: MobileBottomNavProps['moreAction'];
  className?: string;
}) {
  const [active, setActive] = React.useState(initialActive);

  const navProps: MobileBottomNavProps = {
    items,
    activeId: active,
    onChange: setActive,
    className: `relative bottom-auto left-auto right-auto md:flex w-full border-t border-border shadow-lg ${className || ''}`,
    ...(moreAction ? { moreAction } : {}),
  };

  return (
    <div className="w-[360px] h-[520px] rounded-3xl border-4 border-slate-800 dark:border-slate-700 bg-background shadow-2xl flex flex-col justify-between overflow-hidden relative">
      {/* Mobile status bar mockup */}
      <div className="px-5 pt-3 pb-2 flex items-center justify-between text-xs font-semibold text-muted-foreground border-b border-border/40">
        <span>9:41</span>
        <div className="w-16 h-3 bg-muted rounded-full" />
        <span>5G 100%</span>
      </div>

      {/* Screen content */}
      <div className="flex-1 p-5 flex flex-col items-center justify-center text-center">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">Active View</span>
        <h3 className="text-xl font-bold capitalize text-foreground">{active}</h3>
        <p className="text-xs text-muted-foreground mt-2 max-w-[200px]">
          Tap bottom navigation items to switch tabs with haptic feedback.
        </p>
      </div>

      {/* Bottom Nav positioned inside frame */}
      <div className="relative w-full">
        <MobileBottomNav {...navProps} />
      </div>
    </div>
  );
}

/**
 * Default mobile bottom bar with 4 items.
 */
export const Default: Story = {
  render: () => <MobileNavStoryPreview initialActive="home" />,
};

/**
 * Items with numeric and high-count notification badges.
 */
export const WithBadges: Story = {
  render: () => {
    const badgedItems: MobileNavItem[] = [
      { id: 'dashboard', label: 'Dashboard', icon: Home },
      { id: 'shipments', label: 'Shipments', icon: Package, badge: 12 },
      { id: 'alerts', label: 'Alerts', icon: Bell, badge: '99+' },
      { id: 'reports', label: 'Reports', icon: BarChart2 },
    ];
    return <MobileNavStoryPreview items={badgedItems} initialActive="shipments" />;
  },
};

/**
 * Includes a dedicated "More" action button for opening overflow drawers.
 */
export const WithMoreAction: Story = {
  render: () => {
    return (
      <MobileNavStoryPreview
        initialActive="home"
        moreAction={{
          label: 'More',
          onClick: () => alert('Triggered More Options Drawer'),
        }}
      />
    );
  },
};

/**
 * Minimal configuration with 3 core routes.
 */
export const ThreeItems: Story = {
  render: () => {
    const minimalItems: MobileNavItem[] = [
      { id: 'feed', label: 'Feed', icon: Home },
      { id: 'inventory', label: 'Inventory', icon: Package },
      { id: 'settings', label: 'Settings', icon: Settings },
    ];
    return <MobileNavStoryPreview items={minimalItems} initialActive="feed" />;
  },
};
