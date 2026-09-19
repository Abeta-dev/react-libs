import type { Meta, StoryObj } from '@storybook/react';
import { expect, within, userEvent } from 'storybook/test';
import { Toaster } from './toaster';
import { toast, useToast } from '../../../hooks/use-toast';
import { ToastAction } from './toast';
import { Button } from '../forms/button';

/**
 * The Radix UI based toast notification container.
 * Mount `<Toaster />` once in your app layout, then trigger notifications anywhere via `toast()` or `useToast()`.
 */
const meta = {
  title: 'Feedback/Toaster',
  component: Toaster,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Accessible, Radix-based toast notification system. Mount `<Toaster />` once at your root layout. ' +
          'Trigger toasts imperatively with `toast({ title, description, variant, action })` or using the `useToast` hook.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="min-h-[260px] flex flex-col items-center justify-center p-6">
        <Story />
        <Toaster />
      </div>
    ),
  ],
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

function ToastDemo() {
  const { toast: triggerToast } = useToast();

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm text-muted-foreground">
        Click below to dispatch Radix-driven toast notifications:
      </p>
      <div className="flex flex-wrap gap-2 justify-center">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            triggerToast({
              title: 'Purchase Order Created',
              description: 'PO #PO-98234 has been queued for buyer review.',
            });
          }}
        >
          Standard Toast
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => {
            triggerToast({
              variant: 'destructive',
              title: 'Settlement Failed',
              description: 'Bank verification timed out. Please re-enter IFSC details.',
              action: (
                <ToastAction altText="Try again" onClick={() => console.log('Retrying settlement')}>
                  Retry
                </ToastAction>
              ),
            });
          }}
        >
          Destructive with Action
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            triggerToast({
              title: 'GSTIN Verified',
              description: '27AAAAA0000A1Z5 successfully validated against GSTN gateway.',
            });
          }}
        >
          Compliance Verified
        </Button>
      </div>
    </div>
  );
}

/** Interactive trigger buttons dispatching standard and destructive toasts with actions. */
export const Interactive: Story = {
  render: () => <ToastDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const triggerBtn = canvas.getByRole('button', { name: /standard toast/i });
    await userEvent.click(triggerBtn);
    await new Promise((r) => setTimeout(r, 200));
    expect(canvas.getByRole('button', { name: /destructive with action/i })).toBeInTheDocument();
  },
};

/** Toast with action callback */
export const WithAction: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          title: 'Document deleted',
          description: 'TaxInvoice_AUG_2025.pdf was moved to trash.',
          action: (
            <ToastAction altText="Undo file deletion" onClick={() => console.log('Undo triggered')}>
              Undo
            </ToastAction>
          ),
        });
      }}
    >
      Delete Document
    </Button>
  ),
};
