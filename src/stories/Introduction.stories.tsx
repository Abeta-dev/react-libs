import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

/**
 * react-lib component directory, architecture overview, and quick-reference guide.
 * Rendered as a TSX docs-only story to avoid Vite MDX transformation issues.
 */
const meta = {
  title: 'Foundations & Docs/Introduction',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '**@abeta.dev/react-libs** — UI component library for web applications. ' +
          '120 accessible components · Storybook 10 · Tailwind v4 · React 19 · Strict TypeScript',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Sub-components ────────────────────────────────────────────────────────────

function Badge({ children, accent }: { children: React.ReactNode; accent?: boolean | undefined }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap transition-colors ${
        accent
          ? 'border-primary bg-primary text-primary-foreground'
          : 'border-border bg-muted text-muted-foreground'
      }`}
    >
      {children}
    </span>
  );
}

function ComponentChip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-md border border-border bg-muted/60 px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted transition-colors">
      {label}
    </span>
  );
}

function Section({
  emoji,
  title,
  items,
  tierBadge,
}: {
  emoji: string;
  title: string;
  items: string[];
  tierBadge?: string;
}) {
  return (
    <div className="mb-6 last:mb-0">
      <div className="flex items-center gap-2 mb-2.5 flex-wrap">
        <span className="text-base rounded-lg p-1.5 bg-muted border border-border flex items-center justify-center leading-none">
          {emoji}
        </span>
        <span className="text-sm font-bold text-foreground">{title}</span>
        {tierBadge && (
          <span className="text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
            {tierBadge}
          </span>
        )}
        <span className="text-xs text-muted-foreground ml-auto">{items.length} components</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <ComponentChip key={item} label={item} />
        ))}
      </div>
    </div>
  );
}

function StatCard({
  value,
  label,
  sub,
  accent,
}: {
  value: string;
  label: string;
  sub?: string;
  accent?: boolean | string;
}) {
  return (
    <div className="flex-1 min-w-[130px] rounded-xl border border-border bg-card p-5 text-card-foreground shadow-xs">
      <div
        className={`text-2xl sm:text-3xl font-extrabold leading-none ${
          accent ? 'text-emerald-600 dark:text-emerald-400' : 'text-foreground'
        }`}
      >
        {value}
      </div>
      <div className="text-xs sm:text-sm font-semibold text-foreground mt-2">{label}</div>
      {sub && <div className="text-[11px] text-muted-foreground mt-0.5">{sub}</div>}
    </div>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="rounded-xl border border-border bg-muted/70 dark:bg-muted/30 p-4 text-xs font-mono text-foreground overflow-x-auto">
      <code>{children}</code>
    </pre>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-lg font-bold text-foreground mb-5 pb-3 border-b border-border flex items-center gap-2">
      {children}
    </h2>
  );
}

function QuickLink({
  href,
  label,
  subtitle,
  icon,
}: {
  href: string;
  label: string;
  subtitle: string;
  icon: string;
}) {
  return (
    <a
      href={href}
      className="group flex flex-col gap-1 rounded-xl border border-border bg-card p-4 transition-all hover:bg-muted/50 hover:border-primary/50 text-card-foreground shadow-xs no-underline"
    >
      <span className="text-2xl mb-1">{icon}</span>
      <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
        {label}
      </span>
      <span className="text-xs text-muted-foreground leading-snug">{subtitle}</span>
    </a>
  );
}


// ─── Main Story ────────────────────────────────────────────────────────────────

/** Component directory, 6-tier architecture, and enterprise workflows guide for @abeta.dev/react-libs. */
export const ComponentDirectory: Story = {
  render: () => (
    <div className="min-h-screen bg-background text-foreground p-6 sm:p-10 font-sans transition-colors duration-200">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* ── Hero ── */}
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-10 shadow-xs text-card-foreground">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              @abeta.dev/react-libs
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              <strong className="text-foreground">@abeta.dev/react-libs</strong> —
              Enterprise React 19 UI component system with strict TypeScript, Tailwind v4 design tokens,
              India statutory compliance primitives, and zero-peer tree-shakable subpaths.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 pt-4">
            {[
              { label: 'v0.17.0', accent: true },
              { label: '120 components' },
              { label: '6-Tier Architecture' },
              { label: '3 Living Workflows' },
              { label: '1,465 tests' },
              { label: '≥80% coverage' },
              { label: 'Storybook 10' },
              { label: 'Tailwind v4' },
              { label: 'React 19' },
              { label: 'TypeScript 5' },
            ].map(({ label, accent }) => (
              <Badge key={label} accent={accent}>
                {label}
              </Badge>
            ))}
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="flex flex-wrap gap-4">
          <StatCard value="120" label="Components" sub="Core, India & Auth" />
          <StatCard value="1,465" label="Tests" sub="Verified ≥80% Coverage" accent />
          <StatCard value="Passing" label="Test Suite" sub="Vitest unit tests" accent />
          <StatCard value="12.5ms" label="P50 Latency" sub="Median test time" />
          <StatCard value="301.3ms" label="P95 Latency" sub="CI Gate <= 750ms" accent />
          <StatCard value="511.1ms" label="P99 Latency" sub="99th percentile" />
        </div>

        {/* ── 6-Tier Architecture & Taxonomy ── */}
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xs text-card-foreground">
          <SectionTitle>🏛️ 6-Tier Architecture &amp; System Taxonomy</SectionTitle>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0 mb-6 leading-relaxed">
            The library follows a strict 6-tier architecture hierarchy designed for modularity, strict encapsulation,
            tree-shakability, and instant developer discoverability across Storybook and production applications:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-border bg-muted/30 space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                  Tier 1
                </span>
                <span className="text-sm font-bold text-foreground">Foundations &amp; Docs</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Design tokens (color palettes, radius scales, typography scales), Storybook workflow manuals,
                and real-time Vitest performance telemetry.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-border bg-muted/30 space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                  Tier 2
                </span>
                <span className="text-sm font-bold text-foreground">Living Enterprise Workflows</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Pre-assembled, full-page business scenarios with real-world state machines: Vendor Onboarding &amp; KYC,
                Procurement &amp; Invoicing Settlement, Multi-Tenant Administration, and the Interactive Workbench.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-border bg-muted/30 space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                  Tier 3
                </span>
                <span className="text-sm font-bold text-foreground">Core UI Primitives &amp; Layout</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Atomic framing primitives: PageHeader, Card, ResizablePanelGroup, AspectRatio, ScrollArea, Separator,
                along with fundamental utilities like Calendar, Kbd, and Typography.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-border bg-muted/30 space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                  Tier 4
                </span>
                <span className="text-sm font-bold text-foreground">Forms &amp; Input Controls</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                23 accessible form components: Button, Input, Select, Combobox, MultiSelect, Checkbox, RadioGroup,
                Switch, Slider, DateRangePicker, InputOTP, and FileUpload.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-border bg-muted/30 space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                  Tier 5
                </span>
                <span className="text-sm font-bold text-foreground">Data Display &amp; Feedback</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Data-dense displays: DataTable, Charts, KPICard, MetricTicker, Timeline, PaymentLedger, paired with
                Feedback systems (Sonner, Radix Toasters, Alerts, ProgressRings, Skeletons).
              </p>
            </div>

            <div className="p-4 rounded-xl border border-border bg-muted/30 space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                  Tier 6
                </span>
                <span className="text-sm font-bold text-foreground">Domain &amp; Regional Primitives</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                India Statutory Compliance (AmountSummaryCardIndia, UpiQrCard, GST/TDS calculators) and Enterprise
                Authentication (@abeta.dev/auth forms, AuthCard, OAuth buttons).
              </p>
            </div>
          </div>
        </div>

        {/* ── Living Enterprise Workflows Spotlight ── */}
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xs text-card-foreground">
          <SectionTitle>🚀 Living Enterprise Workflows (Interactive Blueprints)</SectionTitle>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0 mb-6 leading-relaxed">
            Unlike isolated UI atoms, these workflows represent full-stack, battle-tested composite journeys.
            Each workflow can be copied directly as a production recipe:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="?path=/story/living-enterprise-workflows-vendor-onboarding-kyc-flow--default"
              className="group p-5 rounded-xl border border-border bg-muted/20 hover:bg-muted/50 hover:border-primary/50 transition-all flex flex-col justify-between text-card-foreground no-underline"
            >
              <div className="space-y-2">
                <div className="text-2xl">🏢</div>
                <div className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                  Vendor Onboarding &amp; KYC Flow
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  4-step wizard with live GSTIN/PAN/IFSC validation, document upload simulation, English/Hindi language toggle,
                  and formal compliance confirmation.
                </p>
              </div>
              <span className="text-xs font-semibold text-primary pt-3 inline-flex items-center gap-1">
                Open Workflow &rarr;
              </span>
            </a>

            <a
              href="?path=/story/living-enterprise-workflows-procurement-invoicing-settlement-flow--default"
              className="group p-5 rounded-xl border border-border bg-muted/20 hover:bg-muted/50 hover:border-primary/50 transition-all flex flex-col justify-between text-card-foreground no-underline"
            >
              <div className="space-y-2">
                <div className="text-2xl">📑</div>
                <div className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                  Procurement &amp; Invoicing Settlement Flow
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  3-way PO/GRN invoice matching, dual GST splits (CGST/SGST/IGST), Section 194C/J TDS deductions, running AP ledger,
                  and instant UPI QR payments.
                </p>
              </div>
              <span className="text-xs font-semibold text-primary pt-3 inline-flex items-center gap-1">
                Open Workflow &rarr;
              </span>
            </a>

            <a
              href="?path=/story/living-enterprise-workflows-multi-tenant-administration-flow--default"
              className="group p-5 rounded-xl border border-border bg-muted/20 hover:bg-muted/50 hover:border-primary/50 transition-all flex flex-col justify-between text-card-foreground no-underline"
            >
              <div className="space-y-2">
                <div className="text-2xl">🛡️</div>
                <div className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                  Multi-Tenant Administration Flow
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Multi-workspace switcher, live vendor admin impersonation with security banners, quota consumption monitors,
                  and payload audit trails.
                </p>
              </div>
              <span className="text-xs font-semibold text-primary pt-3 inline-flex items-center gap-1">
                Open Workflow &rarr;
              </span>
            </a>
          </div>

          <div className="mt-4 p-4 rounded-xl border border-dashed border-border bg-muted/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-foreground">Interactive Component Workbench: </span>
              <span className="text-xs text-muted-foreground">
                Live sandbox to compose forms, credit limits, liquidity switches, and overlays in a multi-column dashboard.
              </span>
            </div>
            <a
              href="?path=/story/living-enterprise-workflows-interactive-workbench--live-workbench"
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors whitespace-nowrap no-underline"
            >
              Launch Workbench
            </a>
          </div>
        </div>

        {/* ── Component Domains ── */}
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xs text-card-foreground">
          <SectionTitle>🧩 Component Directory (120 Components Across Tiers)</SectionTitle>

          <Section
            emoji="⚙️"
            title="Core UI Primitives (7)"
            tierBadge="Tier 3"
            items={['Calendar', 'DateRangePicker', 'Item', 'Kbd', 'LanguageToggle', 'Popover', 'Typography']}
          />

          <Section
            emoji="📐"
            title="Layout Containers (7)"
            tierBadge="Tier 3"
            items={['AspectRatio', 'Card', 'DetailGrid', 'PageHeader', 'ResizablePanelGroup', 'ScrollArea', 'Separator']}
          />

          <Section
            emoji="🎨"
            title="Forms &amp; Input Controls (23)"
            tierBadge="Tier 4"
            items={[
              'AsyncSelect', 'Button', 'ButtonGroup', 'Checkbox', 'Combobox', 'Field', 'FileUpload',
              'FilterSelect', 'Form', 'Input', 'InputGroup', 'InputOtp', 'Label', 'MultiSelect',
              'RadioGroup', 'SearchField', 'Select', 'SkillTagCloud', 'Slider', 'Switch', 'Textarea',
              'Toggle', 'ToggleGroup',
            ]}
          />

          <Section
            emoji="📊"
            title="Data Display (27)"
            tierBadge="Tier 5"
            items={[
              'Accordion', 'ActiveFilterBadge', 'AmountSummaryCard', 'Avatar', 'Badge', 'BilingualTooltip',
              'Carousel', 'Chart', 'Collapsible', 'DataTable', 'ImageViewer', 'InfoList', 'KPICard',
              'LineItemsCard', 'MatchScoreGauge', 'MetricTicker', 'PaymentLedger', 'PdfViewer', 'PipelineKanban',
              'ProofOfWorkCard', 'ProofOfWorkCertificate', 'QuotaCard', 'RadarSweep', 'SalaryRangeDisplay',
              'StatusBadge', 'Table', 'Timeline',
            ]}
          />

          <Section
            emoji="💬"
            title="Feedback &amp; Notifications (25)"
            tierBadge="Tier 5"
            items={[
              'Alert', 'AppSplashScreen', 'Banner', 'CheckpointRunner', 'CopyButton', 'Empty',
              'EmptyState', 'ErrorBoundary', 'ErrorState', 'ImpersonationBanner', 'InstallPwaBanner',
              'LoadingState', 'OnboardingNotice', 'Progress', 'ProgressRing', 'ReactionBar',
              'RoleEmptyState', 'Skeleton', 'SkeletonList', 'Sonner', 'Spinner',
              'SuccessMicroInteraction', 'Toast', 'Toaster', 'WorkspaceBanner',
            ]}
          />

          <Section
            emoji="🖼️"
            title="Overlays &amp; Dialogs (12)"
            tierBadge="Tier 5"
            items={[
              'AlertDialog', 'Command', 'ConfirmDialog', 'ContextMenu', 'CreateEntityPanel',
              'DiagnosticQuiz', 'Dialog', 'Drawer', 'DropdownMenu', 'HoverCard', 'Sheet', 'Tooltip',
            ]}
          />

          <Section
            emoji="🧭"
            title="Navigation &amp; Shell (10)"
            tierBadge="Tier 5"
            items={[
              'Breadcrumb', 'Menubar', 'MobileBottomNav', 'NavigationMenu', 'OnboardingPanel',
              'Pagination', 'PersonaDropdown', 'Sidebar', 'Stepper', 'Tabs',
            ]}
          />

          <Section
            emoji="🇮🇳"
            title="India Statutory &amp; Regional UI (2)"
            tierBadge="Tier 6"
            items={['AmountSummaryCardIndia', 'UpiQrCard']}
          />

          <Section
            emoji="🔐"
            title="Enterprise Authentication (@abeta.dev/auth) (7)"
            tierBadge="Tier 6"
            items={[
              'AuthCard', 'LoginForm', 'SignUpForm', 'ForgotPasswordForm', 'OtpForm',
              'OAuthButton', 'OAuthButtonGroup',
            ]}
          />
        </div>

        {/* ── Installation ── */}
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xs text-card-foreground">
          <SectionTitle>📦 Installation</SectionTitle>

          <p className="text-xs sm:text-sm text-muted-foreground mt-0 mb-4">
            Install from npm:
          </p>

          <div className="mb-4">
            <CodeBlock>{`npm install @abeta.dev/react-libs`}</CodeBlock>
          </div>

          <div className="mb-4">
            <p className="text-xs font-semibold text-foreground mb-2">
              CSS — import once in your app root (e.g. index.css)
            </p>
            <CodeBlock>{`@import "@abeta.dev/react-libs/styles/theme.css";`}</CodeBlock>
          </div>

          <div>
            <p className="text-xs font-semibold text-foreground mb-2">
              Direct Imports — No bundler aliases needed
            </p>
            <CodeBlock>{`import { Button, Dialog, Card } from '@abeta.dev/react-libs';
import { cn, formatCurrency } from '@abeta.dev/react-libs/utils';
import { initAnalytics } from '@abeta.dev/react-libs/analytics';`}</CodeBlock>
          </div>
        </div>

        {/* ── Theming ── */}
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xs text-card-foreground">
          <SectionTitle>🎨 Theming &amp; Multi-Tenant Color Tokens</SectionTitle>

          <p className="text-xs sm:text-sm text-muted-foreground mt-0 mb-4 leading-relaxed">
            All components consume semantic CSS custom properties. Override them in your app&apos;s{' '}
            <code className="text-foreground font-mono">`:root`</code> or select one of our pre-calibrated themes.
            The library adapts automatically to both light and dark backgrounds.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-xs font-semibold text-foreground mb-2">
                Default Workspace (Emerald Theme)
              </p>
              <CodeBlock>{`:root {
  /* Calibrated enterprise banking emerald */
  --primary: 142.1 76.2% 28%; /* WCAG AA >= 4.5:1 */
  --primary-foreground: 0 0% 100%;
}`}</CodeBlock>
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground mb-2">
                Orange Accent Theme
              </p>
              <CodeBlock>{`:root {
  /* High-energy logistics & marketplace theme */
  --primary: 24.6 95% 53.1%;
  --primary-foreground: 0 0% 100%;
}`}</CodeBlock>
            </div>
          </div>

          <p className="text-xs text-muted-foreground mt-3">
            Full design token reference &rarr; <strong>Foundations &amp; Docs / Design Tokens</strong> in the sidebar.
          </p>
        </div>

        {/* ── Import Paths ── */}
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xs text-card-foreground">
          <SectionTitle>📍 Import Paths &amp; Tree-Shakable Subpaths</SectionTitle>
          <CodeBlock>{`// UI Components (from root package)
import {
  Button, Card, Badge, Dialog, Tabs,
  Spinner, EmptyState, RoleEmptyState,
  Calendar, DateRangePicker, LanguageToggle,
  ActiveFilterBadge, StatusBadge, useToast,
  ProofOfWorkCertificate, CheckpointRunner, ReactionBar, DiagnosticQuiz
} from '@abeta.dev/react-libs';

// India Statutory Compliance & Regional UI
import { UpiQrCard, AmountSummaryCardIndia } from '@abeta.dev/react-libs/india/react';
import { validateGSTIN, validatePAN, validateIFSC } from '@abeta.dev/react-libs/india';

// Enterprise Authentication Primitives
import { AuthCard, LoginForm, SignUpForm, OtpForm } from '@abeta.dev/react-libs/auth';

// Pure Utilities & Formatters (Server/RSC Safe, Zero Bundle Bloat)
import { cn, formatCurrency, formatDate, isValidEmail } from '@abeta.dev/react-libs/utils';

// Telemetry & Analytics Engine
import { initAnalytics, trackEvent } from '@abeta.dev/react-libs/analytics';

// Client-Only PDF Viewer Subpath
import { PdfViewer } from '@abeta.dev/react-libs/pdf';`}</CodeBlock>
        </div>

        {/* ── Quick Links ── */}
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xs text-card-foreground">
          <SectionTitle>🔗 Quick Links</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <QuickLink
              href="?path=/story/living-enterprise-workflows-vendor-onboarding-kyc-flow--default"
              icon="🚀"
              label="Living Enterprise Workflows"
              subtitle="Vendor onboarding, invoice settlement & tenant admin"
            />
            <QuickLink
              href="?path=/story/living-enterprise-workflows-interactive-workbench--live-workbench"
              icon="🛠️"
              label="Interactive Workbench"
              subtitle="Full component playground & scenario sandboxes"
            />
            <QuickLink
              href="?path=/story/foundations-docs-how-to-use-storybook--guide"
              icon="📘"
              label="Storybook Guide"
              subtitle="Controls, 4 themes, a11y & workflow guide"
            />
            <QuickLink
              href="?path=/story/foundations-docs-design-tokens--palette"
              icon="🎨"
              label="Design Tokens"
              subtitle="Semantic color, radius & typography reference"
            />
            <QuickLink
              href="?path=/story/foundations-docs-performance-dashboard--dashboard"
              icon="⚡"
              label="Performance Dashboard"
              subtitle="Live P50/P95/P99 latency across 1,465 tests"
            />
            <QuickLink
              href="https://github.com/Abeta-dev/react-libs"
              icon="📖"
              label="GitHub Repository"
              subtitle="Source code, issues & releases"
            />
          </div>
        </div>

        {/* ── Commands ── */}
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xs text-card-foreground">
          <SectionTitle>⌨️ Common Commands</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { cmd: 'npm run storybook', desc: 'Start Storybook 10 dev server (port 6006)' },
              { cmd: 'npm run build-storybook', desc: 'Build static Storybook for CI/deploy' },
              { cmd: 'npm test', desc: 'Run 1,465 tests with coverage verification' },
              { cmd: 'npm run perf', desc: 'Regenerate performance benchmark data' },
              { cmd: 'npm run build', desc: 'Build library & subpaths for release' },
              { cmd: 'npm run check:truth', desc: 'Validate all 26 CI truth gates' },
            ].map(({ cmd, desc }) => (
              <div
                key={cmd}
                className="rounded-xl border border-border bg-muted/40 p-3.5 space-y-1"
              >
                <code className="text-xs font-mono font-bold text-foreground">
                  {cmd}
                </code>
                <p className="text-xs text-muted-foreground mt-1 leading-snug">{desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  ),
};
