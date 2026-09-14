import type { Meta, StoryObj } from '@storybook/react';
import { WorkspaceBanner } from './workspace-banner';
import { Building2, ShieldCheck, Sparkles, Cpu, Layers } from 'lucide-react';

/**
 * Gradient workspace header banner.
 *
 * Provides visual tenant and workspace identity across the top of multi-tenant dashboards.
 */
const meta = {
  title: 'Feedback/WorkspaceBanner',
  component: WorkspaceBanner,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Prominent branded header banner with gradient backdrops, frosted icon badges, ' +
          'and clean typography for workspace, department, or tenant context.',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'The name of the workspace or active organization.',
      table: { category: 'Content' },
    },
    subtitle: {
      control: 'text',
      description: 'Secondary workspace metadata or environment badge.',
      table: { category: 'Content' },
    },
    gradientClassName: {
      control: 'text',
      description: 'Tailwind gradient classes for background styling.',
      table: { category: 'Appearance', defaultValue: { summary: 'from-indigo-600 to-indigo-800' } },
    },
  },
  args: {
    title: 'Acme Global Logistics',
    subtitle: 'Primary Production Workspace • US-East Region',
    icon: Building2,
    gradientClassName: 'from-indigo-600 to-indigo-800',
  },
} satisfies Meta<typeof WorkspaceBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default indigo brand gradient.
 */
export const Default: Story = {
  render: (args) => (
    <div className="w-[600px] p-4">
      <WorkspaceBanner {...args} />
    </div>
  ),
};

/**
 * Emerald and teal gradient for security, trust, or compliance hubs.
 */
export const ComplianceVault: Story = {
  render: (args) => (
    <div className="w-[600px] p-4">
      <WorkspaceBanner
        {...args}
        title="Compliance & Audit Vault"
        subtitle="SOC-2 Type II Certified Workspace • ISO 27001 Active"
        icon={ShieldCheck}
        gradientClassName="from-emerald-600 to-teal-800"
      />
    </div>
  ),
};

/**
 * Sunset purple-rose gradient for innovation or AI tool suites.
 */
export const AiSuite: Story = {
  render: (args) => (
    <div className="w-[600px] p-4">
      <WorkspaceBanner
        {...args}
        title="Procurement AI Studio"
        subtitle="Automated Invoice Reconciliation & Smart Vendor Matching"
        icon={Sparkles}
        gradientClassName="from-purple-600 via-pink-600 to-rose-600"
      />
    </div>
  ),
};

/**
 * Dark slate monochrome gradient for technical or developer workspaces.
 */
export const DeveloperWorkspace: Story = {
  render: (args) => (
    <div className="w-[600px] p-4">
      <WorkspaceBanner
        {...args}
        title="API Integration Sandbox"
        subtitle="Staging Environment • Latency 14ms"
        icon={Cpu}
        gradientClassName="from-slate-800 to-slate-950"
      />
    </div>
  ),
};

/**
 * Minimal variant without an icon.
 */
export const MinimalWithoutIcon: Story = {
  render: () => (
    <div className="w-[600px] p-4">
      <WorkspaceBanner
        title="Standard Vendor Workspace"
        subtitle="Direct Vendor Portal #4928"
        gradientClassName="from-blue-600 to-cyan-700"
      />
    </div>
  ),
};

/**
 * Embedded at the top of an administrative workspace view.
 */
export const InPageHeader: Story = {
  render: (args) => (
    <div className="w-[640px] rounded-2xl border border-border bg-card p-6 shadow-sm space-y-6">
      <WorkspaceBanner
        {...args}
        title="Supply Chain Central"
        subtitle="Active Organization: Enterprise Multi-Tier Supply"
        icon={Layers}
        gradientClassName="from-blue-700 to-indigo-900"
      />
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="rounded-xl border border-border p-4 bg-muted/30">
          <p className="text-xs text-muted-foreground">Active Orders</p>
          <p className="text-xl font-bold text-foreground mt-1">128</p>
        </div>
        <div className="rounded-xl border border-border p-4 bg-muted/30">
          <p className="text-xs text-muted-foreground">Pending Approval</p>
          <p className="text-xl font-bold text-foreground mt-1">14</p>
        </div>
        <div className="rounded-xl border border-border p-4 bg-muted/30">
          <p className="text-xs text-muted-foreground">Fulfillment Rate</p>
          <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">99.4%</p>
        </div>
      </div>
    </div>
  ),
};
