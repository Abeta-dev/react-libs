import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ProgressRing } from './progress-ring';

/**
 * Circular progress ring with threshold-aware coloring, SVG smooth transitions, and optional centered label.
 */
const meta = {
  title: 'Core UI Primitives/Feedback & States/ProgressRing',
  component: ProgressRing,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'SVG-based circular progress indicator with automatic semantic coloring: ' +
          'emerald (&ge;80%), amber (&ge;50%), and rose (&lt;50%). Supports custom color overrides, ' +
          'variable stroke widths, and centered percentage labels.',
      },
    },
  },
  argTypes: {
    percentage: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Completion percentage (0 to 100).',
      table: { category: 'State' },
    },
    size: {
      control: { type: 'number', min: 24, max: 200, step: 8 },
      description: 'Outer diameter in pixels.',
      table: { category: 'Appearance', defaultValue: { summary: '80' } },
    },
    strokeWidth: {
      control: { type: 'number', min: 2, max: 20, step: 1 },
      description: 'Width of the stroke ring.',
      table: { category: 'Appearance', defaultValue: { summary: '8' } },
    },
    showLabel: {
      control: 'boolean',
      description: 'Display percentage value in the center.',
      table: { category: 'Appearance', defaultValue: { summary: 'false' } },
    },
    color: {
      control: 'color',
      description: 'Optional custom color override.',
      table: { category: 'Appearance' },
    },
  },
  args: {
    percentage: 75,
    size: 80,
    strokeWidth: 8,
    showLabel: true,
  },
} satisfies Meta<typeof ProgressRing>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Standard progress ring at 75%.
 */
export const Default: Story = {
  render: (args) => (
    <div className="p-6 flex items-center justify-center">
      <ProgressRing {...args} />
    </div>
  ),
};

/**
 * Automatic semantic color thresholds (&lt;50% rose, 50-79% amber, &ge;80% emerald).
 */
export const SemanticThresholds: Story = {
  render: () => (
    <div className="p-6 flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <ProgressRing percentage={32} showLabel size={80} strokeWidth={8} />
        <span className="text-xs font-semibold text-rose-500">Critical (32%)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ProgressRing percentage={65} showLabel size={80} strokeWidth={8} />
        <span className="text-xs font-semibold text-amber-500">In Progress (65%)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ProgressRing percentage={94} showLabel size={80} strokeWidth={8} />
        <span className="text-xs font-semibold text-emerald-500">Complete (94%)</span>
      </div>
    </div>
  ),
};

/**
 * Scale variations from compact mini badge to high-visibility dashboard display.
 */
export const SizeVariations: Story = {
  render: () => (
    <div className="p-6 flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <ProgressRing percentage={85} size={40} strokeWidth={4} showLabel />
        <span className="text-xs text-muted-foreground">Small (40px)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ProgressRing percentage={85} size={80} strokeWidth={8} showLabel />
        <span className="text-xs text-muted-foreground">Medium (80px)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ProgressRing percentage={85} size={120} strokeWidth={12} showLabel />
        <span className="text-xs text-muted-foreground">Large (120px)</span>
      </div>
    </div>
  ),
};

/**
 * Custom color overrides using brand hex values.
 */
export const CustomColorOverrides: Story = {
  render: () => (
    <div className="p-6 flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <ProgressRing percentage={70} color="#6366f1" size={80} strokeWidth={8} showLabel />
        <span className="text-xs text-muted-foreground">Indigo (#6366f1)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ProgressRing percentage={70} color="#ec4899" size={80} strokeWidth={8} showLabel />
        <span className="text-xs text-muted-foreground">Pink (#ec4899)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ProgressRing percentage={70} color="#06b6d4" size={80} strokeWidth={8} showLabel />
        <span className="text-xs text-muted-foreground">Cyan (#06b6d4)</span>
      </div>
    </div>
  ),
};

/**
 * Interactive slider allowing real-time inspection of stroke animations and color transitions.
 */
export const InteractiveSlider: Story = {
  render: () => {
    const [val, setVal] = React.useState(68);
    return (
      <div className="p-6 flex flex-col items-center gap-6 w-72">
        <ProgressRing percentage={val} size={96} strokeWidth={9} showLabel />
        <div className="w-full space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Progress</span>
            <span className="font-mono font-semibold">{val}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={val}
            onChange={(e) => setVal(Number(e.target.value))}
            className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
          />
        </div>
      </div>
    );
  },
};
