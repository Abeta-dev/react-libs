import type { Meta, StoryObj } from '@storybook/react';
import {
  triggerSuccessConfetti,
  triggerMicroConfetti,
  triggerEmeraldConfetti,
  triggerGovernanceConfetti,
} from './success-micro-interaction';
import { Button } from '../forms/button';
import { Sparkles, CheckCircle2, ShieldCheck, MousePointerClick } from 'lucide-react';

/**
 * Celebratory micro-interactions and particle effects.
 *
 * Provides multi-color confetti cannons, milestone celebrations, and localized
 * click-to-burst micro-interactions for rewarding user achievements.
 */
const meta = {
  title: 'Core UI Primitives/Feedback & States/SuccessMicroInteraction',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Celebratory micro-interactions powered by `canvas-confetti`. ' +
          'Includes general success celebrations, localized click-origin bursts, ' +
          'emerald green sustainability/ESG milestones, and corporate navy & gold achievements.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Full interactive gallery providing immediate controls for every celebration style.
 */
export const InteractiveGallery: Story = {
  render: () => (
    <div className="w-[540px] p-6 rounded-2xl border border-border bg-card shadow-lg space-y-6">
      <div className="border-b border-border pb-4">
        <h3 className="text-base font-bold text-foreground flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          Success Micro-Interactions
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          Trigger delightful celebration animations upon task completions, onboarding milestones, or contract signatures.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          onClick={() => triggerSuccessConfetti()}
          className="h-14 flex flex-col items-center justify-center gap-1 border-primary/20 hover:border-primary hover:bg-primary/5"
        >
          <div className="flex items-center gap-1.5 text-xs font-semibold text-primary">
            <CheckCircle2 className="w-3.5 h-3.5" /> General Success
          </div>
          <span className="text-[10px] text-muted-foreground">Emerald, Blue & Amber</span>
        </Button>

        <Button
          variant="outline"
          onClick={() => triggerEmeraldConfetti()}
          className="h-14 flex flex-col items-center justify-center gap-1 border-emerald-500/20 hover:border-emerald-500 hover:bg-emerald-500/5"
        >
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <Sparkles className="w-3.5 h-3.5" /> Emerald Milestone
          </div>
          <span className="text-[10px] text-muted-foreground">Four-Tier Emerald Burst</span>
        </Button>

        <Button
          variant="outline"
          onClick={() => triggerGovernanceConfetti()}
          className="h-14 flex flex-col items-center justify-center gap-1 border-amber-500/20 hover:border-amber-500 hover:bg-amber-500/5"
        >
          <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 dark:text-amber-400">
            <ShieldCheck className="w-3.5 h-3.5" /> Corporate Governance
          </div>
          <span className="text-[10px] text-muted-foreground">Navy & Gold Cascade</span>
        </Button>

        <Button
          variant="outline"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = (rect.left + rect.width / 2) / window.innerWidth;
            const y = (rect.top + rect.height / 2) / window.innerHeight;
            triggerMicroConfetti(x, y);
          }}
          className="h-14 flex flex-col items-center justify-center gap-1 border-indigo-500/20 hover:border-indigo-500 hover:bg-indigo-500/5"
        >
          <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
            <MousePointerClick className="w-3.5 h-3.5" /> Local Button Burst
          </div>
          <span className="text-[10px] text-muted-foreground">Originates at button</span>
        </Button>
      </div>
    </div>
  ),
};

/**
 * Multi-color general success cannon (emerald, blue, and amber).
 */
export const StandardSuccess: Story = {
  render: () => (
    <div className="p-8 flex flex-col items-center gap-4 text-center">
      <p className="text-sm text-muted-foreground">Standard confirmation celebration for saving changes or closing tickets.</p>
      <Button onClick={() => triggerSuccessConfetti()} size="lg" className="gap-2 shadow-md">
        <CheckCircle2 className="w-4 h-4" /> Trigger Success Cannon
      </Button>
    </div>
  ),
};

/**
 * Emerald themed confetti for ESG compliance, payouts, or green milestones.
 */
export const EmeraldCelebration: Story = {
  render: () => (
    <div className="p-8 flex flex-col items-center gap-4 text-center">
      <p className="text-sm text-muted-foreground">High-density emerald particles for verified green supplier audits.</p>
      <Button
        onClick={() => triggerEmeraldConfetti()}
        size="lg"
        className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-md"
      >
        <Sparkles className="w-4 h-4" /> Trigger Emerald Cannon
      </Button>
    </div>
  ),
};

/**
 * Corporate navy and gold cascade for high-value contract closures and approvals.
 */
export const GovernanceCelebration: Story = {
  render: () => (
    <div className="p-8 flex flex-col items-center gap-4 text-center">
      <p className="text-sm text-muted-foreground">Cascading gold and deep blue confetti descending from the top of the screen.</p>
      <Button
        onClick={() => triggerGovernanceConfetti()}
        size="lg"
        className="gap-2 bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/30 shadow-md"
      >
        <ShieldCheck className="w-4 h-4 text-amber-400" /> Trigger Governance Cascade
      </Button>
    </div>
  ),
};

/**
 * Interactive canvas where clicking anywhere triggers a localized particle burst at that coordinate.
 */
export const ClickToBurstCanvas: Story = {
  render: () => {
    return (
      <button
        type="button"
        onClick={(e) => {
          const x = e.clientX / window.innerWidth;
          const y = e.clientY / window.innerHeight;
          triggerMicroConfetti(x, y);
        }}
        className="w-[500px] h-[300px] rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 flex flex-col items-center justify-center text-center p-6 cursor-crosshair select-none hover:border-primary/50 transition-colors"
      >
        <MousePointerClick className="w-8 h-8 text-primary mb-2 animate-bounce" />
        <h4 className="text-sm font-bold text-foreground">Interactive Click Canvas</h4>
        <p className="text-xs text-muted-foreground mt-1 max-w-xs">
          Click anywhere inside this area to fire a localized micro-burst originating precisely from your cursor.
        </p>
      </button>
    );
  },
};
