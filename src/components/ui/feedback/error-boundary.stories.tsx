import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ErrorBoundary, withErrorBoundary, type FallbackProps } from './error-boundary';
import { Button } from '../forms/button';
import { AlertTriangle, RefreshCcw, Terminal } from 'lucide-react';

/**
 * React Error Boundary container.
 *
 * Catches unhandled JavaScript render exceptions in child component trees,
 * logs diagnostic errors, and presents resilient fallback recovery states.
 */
const meta = {
  title: 'Feedback/ErrorBoundary',
  component: ErrorBoundary,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Standard React error boundary. By default, renders the `ErrorState` component with ' +
          'a "Try again" retry handler. Also supports custom function fallbacks, static fallback nodes, ' +
          'and `withErrorBoundary` HOC wrapper.',
      },
    },
  },
} satisfies Meta<typeof ErrorBoundary>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Test component that can throw an intentional runtime error on trigger.
 */
function BuggyCounter({
  onResetTrigger,
}: {
  onResetTrigger?: () => void;
}) {
  const [shouldExplode, setShouldExplode] = React.useState(false);

  if (shouldExplode) {
    throw new Error('SimulationError: Database cluster connection timed out [ETIMEDOUT 5432]');
  }

  return (
    <div className="p-6 rounded-xl border border-border bg-card text-card-foreground shadow-sm flex flex-col items-center gap-4 text-center">
      <div className="space-y-1">
        <h4 className="text-sm font-semibold text-foreground">Operational Component</h4>
        <p className="text-xs text-muted-foreground">
          Click the button below to simulate an uncaught client-side render crash.
        </p>
      </div>
      <Button
        variant="destructive"
        size="sm"
        onClick={() => setShouldExplode(true)}
        className="gap-2"
      >
        <AlertTriangle className="w-4 h-4" /> Crash This Component
      </Button>
      {onResetTrigger && (
        <span className="text-[10px] text-muted-foreground">Bound to reset handler</span>
      )}
    </div>
  );
}

/**
 * Default error boundary catching a crash and rendering the default `ErrorState` card with "Try again".
 */
export const Default: Story = {
  render: () => {
    const [boundaryKey, setBoundaryKey] = React.useState(0);

    return (
      <div className="w-[480px] p-4">
        <ErrorBoundary
          key={boundaryKey}
          onReset={() => setBoundaryKey((k) => k + 1)}
        >
          <BuggyCounter />
        </ErrorBoundary>
      </div>
    );
  },
};

/**
 * Custom fallback render function receiving `error` and `resetErrorBoundary`.
 */
export const CustomFallbackFunction: Story = {
  render: () => {
    const [boundaryKey, setBoundaryKey] = React.useState(0);

    const customFallback = ({ error, resetErrorBoundary }: FallbackProps) => (
      <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6 space-y-4">
        <div className="flex items-center gap-2 text-destructive font-semibold text-sm">
          <Terminal className="w-5 h-5" />
          <span>Diagnostic Crash Report</span>
        </div>
        <pre className="text-xs bg-slate-950 text-emerald-400 p-3 rounded-lg overflow-x-auto font-mono">
          {error.message}
        </pre>
        <div className="flex justify-end gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={resetErrorBoundary}
            className="gap-1.5 text-xs"
          >
            <RefreshCcw className="w-3.5 h-3.5" /> Recover & Re-mount
          </Button>
        </div>
      </div>
    );

    return (
      <div className="w-[520px] p-4">
        <ErrorBoundary
          key={boundaryKey}
          fallback={customFallback}
          onReset={() => setBoundaryKey((k) => k + 1)}
        >
          <BuggyCounter />
        </ErrorBoundary>
      </div>
    );
  },
};

/**
 * Custom static ReactNode fallback.
 */
export const StaticNodeFallback: Story = {
  render: () => {
    const staticFallback = (
      <div className="p-6 rounded-xl border border-amber-300 bg-amber-50 dark:bg-amber-950/40 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-center text-sm font-medium">
        Widget temporarily unavailable. Maintenance in progress.
      </div>
    );

    return (
      <div className="w-[480px] p-4">
        <ErrorBoundary fallback={staticFallback}>
          <BuggyCounter />
        </ErrorBoundary>
      </div>
    );
  },
};

/**
 * Wrapping components cleanly via `withErrorBoundary` Higher-Order Component.
 */
const SafeWrappedCounter = withErrorBoundary(BuggyCounter);

export const HocWrappedComponent: Story = {
  render: () => {
    return (
      <div className="w-[480px] p-4">
        <SafeWrappedCounter />
      </div>
    );
  },
};
