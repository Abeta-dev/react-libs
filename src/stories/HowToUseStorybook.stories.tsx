import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/layout/card';
import { Badge } from '../components/ui/data-display/badge';
import {
  Palette,
  Sliders,
  ShieldCheck,
  Smartphone,
  PlayCircle,
  FolderTree,
  Sparkles,
} from 'lucide-react';

const meta: Meta = {
  title: 'Foundations & Docs/How to Use Storybook',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Comprehensive guide for developers and designers on leveraging the full power of Storybook 10: ' +
          '6-tier sidebar navigation, live controls, 4-theme switching, accessibility audits, responsive viewports, ' +
          'interactive testing, and production code recipes from living workflows.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Guide: Story = {
  render: () => <GuideDoc />,
};

function GuideDoc() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8 max-w-5xl mx-auto space-y-10">
      {/* Header */}
      <header className="border-b pb-6 space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
            Developer & Designer Manual
          </Badge>
          <Badge variant="outline">Storybook 10 + Tailwind v4</Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">How to Use the Storybook Workspace</h1>
        <p className="text-muted-foreground text-sm max-w-3xl leading-relaxed">
          Welcome to the <strong>@abeta.dev/react-libs</strong> component workbench. This workspace hosts 120 production-grade
          components, full India compliance primitives, and enterprise authentication modules. Follow this guide to explore,
          test, customize, and prototype efficiently.
        </p>
      </header>

      {/* Grid of Key Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Sidebar Taxonomy */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                <FolderTree className="h-5 w-5" />
              </div>
              <CardTitle className="text-base">1. 6-Tier Sidebar Hierarchy</CardTitle>
            </div>
            <CardDescription className="text-xs">
              Every component is organized into our clean, strict 6-tier system taxonomy.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-xs text-muted-foreground leading-relaxed">
            <p>
              The left sidebar follows our strict 6-tier architecture hierarchy:
            </p>
            <ul className="list-disc pl-4 space-y-1.5 text-foreground">
              <li>
                <strong>Tier 1 — Foundations &amp; Docs:</strong> Design tokens (colors, typography, radius scales), Storybook manual, and live Vitest performance dashboard.
              </li>
              <li>
                <strong>Tier 2 — Living Enterprise Workflows:</strong> Production-grade full-page composite workflows (Vendor Onboarding &amp; KYC, Procurement Settlement, Multi-Tenant Admin, and Interactive Workbench).
              </li>
              <li>
                <strong>Tier 3 — Core UI Primitives &amp; Layout:</strong> Atomic primitives (Calendar, Kbd, Typography, Item, Popover) and layout containers (Card, PageHeader, Resizable, AspectRatio, ScrollArea, Separator).
              </li>
              <li>
                <strong>Tier 4 — Forms &amp; Inputs:</strong> 23 accessible form components (Buttons, Inputs, Selects, Combobox, MultiSelect, Checkbox, RadioGroup, Switch, Slider, InputOTP, FileUpload, Form, Field, Label).
              </li>
              <li>
                <strong>Tier 5 — Data Display &amp; Feedback:</strong> Dense visualizations (DataTable, Charts, KPICard, MetricTicker, Timeline, PaymentLedger) and feedback systems (Sonner, Radix Toasters, Alerts, Skeletons).
              </li>
              <li>
                <strong>Tier 6 — Domain &amp; Regional Primitives:</strong> India Statutory Compliance (AmountSummaryCardIndia, UpiQrCard, GST/TDS calculators), Enterprise Authentication (@abeta.dev/auth), and Talent Lab.
              </li>
            </ul>
            <div className="pt-2">
              <span className="bg-muted px-2 py-1 rounded font-mono text-[11px]">Pro-tip: Press &apos;/&apos; to search anywhere</span>
            </div>
          </CardContent>
        </Card>

        {/* Card 2: Interactive Controls */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                <Sliders className="h-5 w-5" />
              </div>
              <CardTitle className="text-base">2. Live Props &amp; Controls Panel</CardTitle>
            </div>
            <CardDescription className="text-xs">
              Test components with different props in real-time without writing code.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-xs text-muted-foreground leading-relaxed">
            <p>
              When viewing any story in the <strong>Canvas</strong> tab, open the bottom or side panel to reveal the <strong>Controls</strong> tab.
            </p>
            <div className="p-3 rounded-lg border bg-muted/20 space-y-2">
              <div className="flex justify-between">
                <span className="font-semibold text-foreground">Booleans</span>
                <span>Toggle loading, disabled, or active states</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-foreground">Enums / Variants</span>
                <span>Select button sizes, badge intents, card layouts</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-foreground">Numbers &amp; Sliders</span>
                <span>Adjust GST rates, TDS percentages, timeouts</span>
              </div>
            </div>
            <p>
              Controls are fully typed and reflect the exact TypeScript props exported by the library.
            </p>
          </CardContent>
        </Card>

        {/* Card 3: Multi-Tenant Theme Switching */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400">
                <Palette className="h-5 w-5" />
              </div>
              <CardTitle className="text-base">3. 4-Theme Dropdown Selector</CardTitle>
            </div>
            <CardDescription className="text-xs">
              Seamlessly switch between brand palettes and dark mode with instant reactivity.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-xs text-muted-foreground leading-relaxed">
            <p>
              In the top Storybook toolbar, click the <strong>Theme Selector dropdown</strong> to test across our 4 pre-calibrated enterprise themes:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-foreground">
              <div className="p-2.5 border rounded-md bg-emerald-50/50 dark:bg-emerald-950/50 border-emerald-300">
                <strong>Light (Emerald):</strong> Default enterprise banking &amp; vendor portal theme.
              </div>
              <div className="p-2.5 border rounded-md bg-emerald-900/40 dark:bg-emerald-950/80 border-emerald-600">
                <strong>Dark (Emerald):</strong> High-contrast banking dark mode (applies <code className="text-xs bg-muted px-1 py-0.5 rounded">.dark</code>).
              </div>
              <div className="p-2.5 border rounded-md bg-orange-50/50 dark:bg-orange-950/50 border-orange-300">
                <strong>Light (Orange):</strong> High-energy logistics and marketplace theme (applies <code className="text-xs bg-muted px-1 py-0.5 rounded">.theme-orange</code>).
              </div>
              <div className="p-2.5 border rounded-md bg-orange-900/40 dark:bg-orange-950/80 border-orange-600">
                <strong>Dark (Orange):</strong> Dark mode with warm amber &amp; orange highlights (applies <code className="text-xs bg-muted px-1 py-0.5 rounded">.dark.theme-orange</code>).
              </div>
            </div>
            <p>
              All components consume semantic CSS custom properties and adapt instantly without manual style overrides.
            </p>
          </CardContent>
        </Card>

        {/* Card 4: Accessibility Audits */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <CardTitle className="text-base">4. Accessibility (a11y) Addon</CardTitle>
            </div>
            <CardDescription className="text-xs">
              Every component is continuously tested for WCAG 2.2 AA compliance.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-xs text-muted-foreground leading-relaxed">
            <p>
              Open the <strong>Accessibility</strong> tab in the addon panel to view automated axe-core audit results:
            </p>
            <ul className="list-disc pl-4 space-y-1 text-foreground">
              <li><strong>Color Contrast:</strong> Minimum 4.5:1 ratio for normal text.</li>
              <li><strong>Aria Attributes:</strong> Correct roles, labels, and aria-describedby links.</li>
              <li><strong>Keyboard Trapping:</strong> Esc closes modals, Tab cycles focus cleanly.</li>
              <li><strong>Touch Targets:</strong> Minimum 44×44px interactive regions on mobile.</li>
            </ul>
          </CardContent>
        </Card>

        {/* Card 5: Responsive Viewports */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-cyan-50 text-cyan-600 dark:bg-cyan-950 dark:text-cyan-400">
                <Smartphone className="h-5 w-5" />
              </div>
              <CardTitle className="text-base">5. Viewport Breakpoints</CardTitle>
            </div>
            <CardDescription className="text-xs">
              Test fluid responsiveness across common device profiles.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-xs text-muted-foreground leading-relaxed">
            <p>
              Click the <strong>Viewport icon</strong> in the top toolbar to switch display sizes:
            </p>
            <div className="space-y-1.5 font-mono text-[11px]">
              <div className="flex justify-between border-b pb-1">
                <span>Small Mobile (375px)</span>
                <span className="text-muted-foreground">iPhone SE / Mini</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span>Large Mobile (414px)</span>
                <span className="text-muted-foreground">iPhone 14 / Pixel 7</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span>Tablet (768px)</span>
                <span className="text-muted-foreground">iPad / Surface</span>
              </div>
              <div className="flex justify-between">
                <span>Desktop (1280px+)</span>
                <span className="text-muted-foreground">Standard HD viewport</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card 6: Interactive Testing */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-pink-50 text-pink-600 dark:bg-pink-950 dark:text-pink-400">
                <PlayCircle className="h-5 w-5" />
              </div>
              <CardTitle className="text-base">6. Interaction Testing (Play Functions)</CardTitle>
            </div>
            <CardDescription className="text-xs">
              Watch automated interactions execute step-by-step.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-xs text-muted-foreground leading-relaxed">
            <p>
              Stories equipped with <code className="bg-muted px-1.5 py-0.5 rounded">play</code> functions (such as Toaster, LoginForm, and SearchField)
              simulate user clicks and keyboard input automatically.
            </p>
            <p>
              Switch to the <strong>Interactions</strong> tab to step through the test timeline, pause at any checkpoint, or inspect DOM assertions.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Living Enterprise Workflows & Code Recipes Highlight */}
      <div className="p-6 rounded-2xl border bg-card/60 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-primary text-primary-foreground">
            <Sparkles className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Living Enterprise Workflows &amp; Code Recipes</h2>
            <p className="text-xs text-muted-foreground">
              Production blueprints combining forms, overlays, India tax compliance, and telemetry into full-stack recipes.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border bg-muted/20 space-y-2">
            <div className="font-semibold text-xs text-foreground flex items-center gap-1.5">
              <span>🏢</span> Vendor Onboarding &amp; KYC
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              4-step statutory registration with live GSTIN/PAN/IFSC checksum verification, bilingual English/Hindi toggle, and file upload mocks.
            </p>
          </div>

          <div className="p-4 rounded-xl border bg-muted/20 space-y-2">
            <div className="font-semibold text-xs text-foreground flex items-center gap-1.5">
              <span>📑</span> Procurement &amp; Invoicing
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              3-way PO/GRN matching, real-time GST dual-splits (CGST/SGST vs IGST), TDS withholding under Section 194C/J, running AP ledger, and dynamic UPI QR standees.
            </p>
          </div>

          <div className="p-4 rounded-xl border bg-muted/20 space-y-2">
            <div className="font-semibold text-xs text-foreground flex items-center gap-1.5">
              <span>🛡️</span> Multi-Tenant Administration
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Enterprise workspace switcher, live vendor admin impersonation with safe exit banners, quota consumption gauges, and payload audit trails.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-dashed bg-muted/10 space-y-2">
          <div className="text-xs font-bold text-foreground">How to Copy Production Code Recipes:</div>
          <ol className="list-decimal pl-5 text-xs text-muted-foreground space-y-1">
            <li>
              Select any workflow under <strong>Living Enterprise Workflows</strong> or open the <strong>Playground → Interactive Workbench</strong>.
            </li>
            <li>
              Click the <strong>Docs</strong> tab in the top navigation or click the <strong>&lt;&gt; Show Code</strong> button at the bottom right of the canvas.
            </li>
            <li>
              Copy the complete component recipe into your application. All imports cleanly reference public subpaths (<code className="bg-muted px-1 py-0.5 rounded text-[11px]">@abeta.dev/react-libs</code>, <code className="bg-muted px-1 py-0.5 rounded text-[11px]">@abeta.dev/react-libs/india</code>, and <code className="bg-muted px-1 py-0.5 rounded text-[11px]">@abeta.dev/react-libs/auth</code>).
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
