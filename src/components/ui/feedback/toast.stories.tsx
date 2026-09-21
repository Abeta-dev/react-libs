import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Toast,
  ToastProvider,
  ToastViewport,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
} from './toast';
import { Button } from '../forms/button';
import { CheckCircle2, AlertTriangle, AlertCircle, Info } from 'lucide-react';

/**
 * Radix-based low-level toast notification primitives.
 *
 * For imperative toasts via hook or trigger functions, use Sonner/Toaster.
 * For accessible, headless-composed toast layouts, use these primitives directly.
 */
const meta = {
  title: 'Core UI Primitives/Feedback & States/Toast',
  component: Toast,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Accessible toast primitive built on Radix UI. Supports five semantic color variants ' +
          '(`default`, `destructive`, `success`, `warning`, `info`), action buttons, dismiss buttons, ' +
          'and swipe gestures.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'success', 'warning', 'info'],
      description: 'Semantic color style of the toast notification.',
      table: { category: 'Appearance', defaultValue: { summary: 'default' } },
    },
    open: {
      control: 'boolean',
      description: 'Controlled open state.',
      table: { category: 'State' },
    },
  },
  args: {
    variant: 'default',
    open: true,
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default neutral toast notification with title, description, and close button.
 */
export const Default: Story = {
  render: (args) => (
    <ToastProvider>
      <div className="w-[420px] p-4">
        <Toast {...args} className="relative">
          <div className="grid gap-1">
            <ToastTitle>Profile Updated</ToastTitle>
            <ToastDescription>Your company address details have been updated.</ToastDescription>
          </div>
          <ToastClose />
        </Toast>
      </div>
      <ToastViewport className="relative bottom-auto right-auto top-auto" />
    </ToastProvider>
  ),
};

/**
 * All five semantic variants displayed together.
 */
export const AllVariants: Story = {
  render: () => (
    <ToastProvider>
      <div className="w-[420px] p-4 space-y-3">
        <Toast open variant="default" className="relative">
          <div className="grid gap-1">
            <ToastTitle>Default Notification</ToastTitle>
            <ToastDescription>Standard informational message for neutral system updates.</ToastDescription>
          </div>
          <ToastClose />
        </Toast>

        <Toast open variant="success" className="relative">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="grid gap-1">
              <ToastTitle>Payment Successful</ToastTitle>
              <ToastDescription>Transaction #TX-9042 settled to primary vendor bank.</ToastDescription>
            </div>
          </div>
          <ToastClose />
        </Toast>

        <Toast open variant="warning" className="relative">
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="grid gap-1">
              <ToastTitle>Certificate Expiring</ToastTitle>
              <ToastDescription>GST certificate expires in 3 business days.</ToastDescription>
            </div>
          </div>
          <ToastClose />
        </Toast>

        <Toast open variant="destructive" className="relative">
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="grid gap-1">
              <ToastTitle>Submission Failed</ToastTitle>
              <ToastDescription>Could not verify PAN registration against tax portal.</ToastDescription>
            </div>
          </div>
          <ToastClose />
        </Toast>

        <Toast open variant="info" className="relative">
          <div className="flex items-start gap-2.5">
            <Info className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="grid gap-1">
              <ToastTitle>Maintenance Scheduled</ToastTitle>
              <ToastDescription>Platform upgrades commence Sunday 02:00 UTC.</ToastDescription>
            </div>
          </div>
          <ToastClose />
        </Toast>
      </div>
      <ToastViewport className="relative bottom-auto right-auto top-auto" />
    </ToastProvider>
  ),
};

/**
 * Toast with an interactive undo action and close button.
 */
export const WithAction: Story = {
  render: () => {
    const [open, setOpen] = React.useState(true);

    return (
      <ToastProvider>
        <div className="w-[440px] p-4 flex flex-col items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setOpen(true)}
            className="text-xs"
          >
            Re-open Toast
          </Button>

          <Toast
            open={open}
            onOpenChange={setOpen}
            className="relative"
          >
            <div className="grid gap-1">
              <ToastTitle>Item deleted</ToastTitle>
              <ToastDescription>Item removed from your procurement draft.</ToastDescription>
            </div>
            <ToastAction
              altText="Undo deletion"
              onClick={() => {
                alert('Item restored!');
                setOpen(false);
              }}
            >
              Undo
            </ToastAction>
            <ToastClose />
          </Toast>
        </div>
        <ToastViewport className="relative bottom-auto right-auto top-auto" />
      </ToastProvider>
    );
  },
};

/**
 * Interactive playground to trigger toasts on demand.
 */
export const InteractiveTrigger: Story = {
  render: () => {
    const [toasts, setToasts] = React.useState<Array<{ id: number; title: string; desc: string; variant: 'default' | 'success' | 'destructive' | 'warning' | 'info' }>>([]);

    const addToast = (variant: 'default' | 'success' | 'destructive' | 'warning' | 'info', title: string, desc: string) => {
      setToasts((prev) => [...prev, { id: Date.now(), title, desc, variant }]);
    };

    const removeToast = (id: number) => {
      setToasts((prev) => prev.filter((item) => item.id !== id));
    };

    return (
      <ToastProvider>
        <div className="w-[460px] p-6 space-y-4 text-center">
          <p className="text-xs text-muted-foreground">Click a button to spawn that toast variant:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Button size="sm" variant="outline" onClick={() => addToast('default', 'Notice', 'Neutral update')}>
              Default
            </Button>
            <Button size="sm" variant="outline" onClick={() => addToast('success', 'Saved', 'Record committed to database')}>
              Success
            </Button>
            <Button size="sm" variant="outline" onClick={() => addToast('warning', 'Warning', 'Storage limit reached')}>
              Warning
            </Button>
            <Button size="sm" variant="outline" onClick={() => addToast('destructive', 'Error', 'Failed to save changes')}>
              Destructive
            </Button>
            <Button size="sm" variant="outline" onClick={() => addToast('info', 'Info', 'New feature released')}>
              Info
            </Button>
          </div>

          <div className="space-y-2 pt-4">
            {toasts.map((t) => (
              <Toast
                key={t.id}
                variant={t.variant}
                className="relative"
                onOpenChange={(isOpen) => {
                  if (!isOpen) removeToast(t.id);
                }}
              >
                <div className="grid gap-1 text-left">
                  <ToastTitle>{t.title}</ToastTitle>
                  <ToastDescription>{t.desc}</ToastDescription>
                </div>
                <ToastClose />
              </Toast>
            ))}
          </div>
        </div>
        <ToastViewport className="relative bottom-auto right-auto top-auto" />
      </ToastProvider>
    );
  },
};
