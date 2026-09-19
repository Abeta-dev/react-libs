import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

/**
 * Visual reference for all design tokens used by @abeta.dev/react-libs.
 * Every value maps to a CSS custom property defined in src/styles/theme.css.
 * Components consume these tokens via Tailwind v4 utility classes and CSS variables.
 * Override them in your app's :root to re-theme across light and dark modes.
 */
const meta = {
  title: 'Overview & Docs/Design Tokens',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'All design tokens are CSS custom properties defined in `theme.css`. ' +
          'Colors use HSL channel variables (e.g. `--primary: 142.1 76.2% 28%`) mapped into ' +
          'Tailwind v4 inline theme utilities (`--color-primary`). Override HSL variables at `:root` ' +
          'to apply custom brand colors across all components automatically.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function Swatch({ token, label, description }: { token: string; label: string; description?: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 120 }}>
      <div
        style={{
          height: 60,
          width: '100%',
          borderRadius: 10,
          border: '1px solid var(--color-border, rgba(0,0,0,0.12))',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          background: `var(${token})`,
        }}
      />
      <code style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--color-foreground, #374151)', lineHeight: 1.4 }}>
        {token}
      </code>
      <span style={{ fontSize: 11, color: 'var(--color-muted-foreground, #6b7280)', fontWeight: 500 }}>{label}</span>
      {description && <span style={{ fontSize: 10, color: 'var(--color-muted-foreground, #9ca3af)' }}>{description}</span>}
    </div>
  );
}

function BorderSwatch({ token, label }: { token: string; label: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 130 }}>
      <div
        style={{
          height: 60,
          width: '100%',
          borderRadius: 10,
          border: `2px solid var(${token})`,
          background: 'var(--color-background)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 11,
          fontWeight: 600,
          color: 'var(--color-foreground)',
        }}
      >
        Border Demo
      </div>
      <code style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--color-foreground, #374151)', lineHeight: 1.4 }}>
        {token}
      </code>
      <span style={{ fontSize: 11, color: 'var(--color-muted-foreground, #6b7280)' }}>{label}</span>
    </div>
  );
}

function RadiusSwatch({ token, label, px }: { token: string; label: string; px: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}>
      <div
        style={{
          height: 64,
          width: 64,
          background: 'var(--color-primary)',
          borderRadius: `var(${token})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--color-primary-foreground)',
          fontSize: 11,
          fontWeight: 700,
        }}
      >
        {px}
      </div>
      <code style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--color-foreground, #374151)', textAlign: 'center' }}>
        {token}
      </code>
      <span style={{ fontSize: 11, color: 'var(--color-muted-foreground, #9ca3af)' }}>{label}</span>
    </div>
  );
}

function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 40 }}>
      <h2
        style={{
          fontSize: 16,
          fontWeight: 700,
          color: 'var(--color-foreground, #111827)',
          margin: '0 0 4px',
          paddingBottom: 10,
          borderBottom: '1px solid var(--color-border, #e5e7eb)',
        }}
      >
        {title}
      </h2>
      {description && <p style={{ fontSize: 12, color: 'var(--color-muted-foreground, #6b7280)', margin: '6px 0 16px' }}>{description}</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: description ? 0 : 16 }}>
        {children}
      </div>
    </section>
  );
}

function ShadowRow({ token, label, shadow }: { token: string; label: string; shadow: string }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: '12px 0',
        borderBottom: '1px solid var(--color-border, #e5e7eb)',
      }}
    >
      <div
        style={{
          height: 44,
          width: 80,
          borderRadius: 'var(--radius, 8px)',
          background: 'var(--color-card, #ffffff)',
          boxShadow: shadow,
          flexShrink: 0,
        }}
      />
      <div>
        <code style={{ fontSize: 12, fontWeight: 700, fontFamily: 'monospace', color: 'var(--color-foreground, #111827)' }}>
          {token}
        </code>
        <p style={{ margin: '2px 0 0', fontSize: 11, color: 'var(--color-muted-foreground, #6b7280)' }}>{label}</p>
      </div>
    </div>
  );
}

// ─── Main Story ────────────────────────────────────────────────────────────────

/** Complete visual directory of all design tokens consumed by @abeta.dev/react-libs. */
export const Palette: Story = {
  render: () => (
    <div
      style={{
        fontFamily: "var(--font-sans, 'Inter', sans-serif)",
        background: 'var(--color-background, #ffffff)',
        color: 'var(--color-foreground, #111827)',
        padding: '24px',
        maxWidth: 960,
        margin: '0 auto',
      }}
    >
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ margin: '0 0 6px', fontSize: 24, fontWeight: 800, letterSpacing: '-0.3px' }}>
          Design Tokens & Theme Reference
        </h1>
        <p style={{ margin: 0, fontSize: 13, color: 'var(--color-muted-foreground, #6b7280)' }}>
          All visual values in <strong>@abeta.dev/react-libs</strong> are bound to CSS custom properties.
          Components dynamically adapt between Default Emerald, Brand Orange, and Dark mode palettes.
        </p>
      </div>

      <Section
        title="Brand & Interactive Primaries"
        description="Core brand action colors. Calibrated to 28% lightness for WCAG 2.1 AA contrast ratio >= 4.5:1."
      >
        <Swatch token="--color-primary" label="primary" description="Brand action color" />
        <Swatch token="--color-primary-foreground" label="primary-foreground" description="Text on primary bg" />
        <Swatch token="--color-secondary" label="secondary" description="Secondary actions" />
        <Swatch token="--color-secondary-foreground" label="secondary-foreground" description="Text on secondary" />
        <Swatch token="--color-accent" label="accent" description="Interactive highlights" />
        <Swatch token="--color-accent-foreground" label="accent-foreground" description="Text on accent" />
      </Section>

      <Section title="Surfaces & Backgrounds" description="Neutral background and elevation levels for canvas and overlays.">
        <Swatch token="--color-background" label="background" description="Canvas root background" />
        <Swatch token="--color-foreground" label="foreground" description="Primary body text" />
        <Swatch token="--color-muted" label="muted" description="Muted surfaces & tags" />
        <Swatch token="--color-muted-foreground" label="muted-foreground" description="Secondary metadata text" />
        <Swatch token="--color-card" label="card" description="Card container surface" />
        <Swatch token="--color-card-foreground" label="card-foreground" description="Card heading & body" />
        <Swatch token="--color-popover" label="popover" description="Popover & dropdown surface" />
        <Swatch token="--color-popover-foreground" label="popover-foreground" description="Popover content" />
      </Section>

      <Section title="Dedicated Border Tokens" description="Specialized border tokens declared in theme.css for high-density components.">
        <BorderSwatch token="--color-border" label="Standard component border" />
        <BorderSwatch token="--color-primary-border" label="Primary accent border" />
        <BorderSwatch token="--color-accent-border" label="Accent border" />
        <BorderSwatch token="--color-card-border" label="Card boundary border" />
        <BorderSwatch token="--color-input" label="Input field border" />
        <BorderSwatch token="--color-ring" label="Focus ring outline" />
      </Section>

      <Section title="Semantic Status" description="Feedback, validation errors, and destructive actions.">
        <Swatch token="--color-destructive" label="destructive" description="Errors and deletions" />
        <Swatch token="--color-destructive-foreground" label="destructive-foreground" description="Text on destructive" />
      </Section>

      <Section
        title="Sidebar System"
        description="Dedicated sidebar tokens enabling independent dark/light contrast styling for side navigation."
      >
        <Swatch token="--color-sidebar" label="sidebar" />
        <Swatch token="--color-sidebar-foreground" label="sidebar-foreground" />
        <Swatch token="--color-sidebar-primary" label="sidebar-primary" />
        <Swatch token="--color-sidebar-primary-foreground" label="sidebar-primary-fg" />
        <Swatch token="--color-sidebar-accent" label="sidebar-accent" />
        <Swatch token="--color-sidebar-accent-foreground" label="sidebar-accent-fg" />
        <Swatch token="--color-sidebar-border" label="sidebar-border" />
        <Swatch token="--color-sidebar-ring" label="sidebar-ring" />
      </Section>

      <Section title="Chart Palette" description="Accessible Okabe-Ito inspired color palette for data visualizations.">
        <Swatch token="--color-chart-1" label="chart-1" />
        <Swatch token="--color-chart-2" label="chart-2" />
        <Swatch token="--color-chart-3" label="chart-3" />
        <Swatch token="--color-chart-4" label="chart-4" />
        <Swatch token="--color-chart-5" label="chart-5" />
      </Section>

      <Section title="Border Radius Scale" description="Computed from base --radius: 0.5rem (8px).">
        <RadiusSwatch token="--radius-sm" label="radius-sm" px="4px" />
        <RadiusSwatch token="--radius-md" label="radius-md" px="6px" />
        <RadiusSwatch token="--radius" label="radius (base)" px="8px" />
        <RadiusSwatch token="--radius-lg" label="radius-lg" px="8px" />
        <RadiusSwatch token="--radius-xl" label="radius-xl" px="12px" />
      </Section>

      <Section title="Typography Families & Display Scale" description="Declared in theme.css: font-sans (Inter) and font-display (Outfit).">
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ padding: '16px', borderRadius: 'var(--radius, 8px)', border: '1px solid var(--color-border)', background: 'var(--color-card)' }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-primary)' }}>--font-display: 'Outfit', sans-serif</span>
            <h3 style={{ fontFamily: "var(--font-display, 'Outfit', sans-serif)", fontSize: 28, margin: '6px 0 0', fontWeight: 800 }}>
              The Quick Brown Fox Jumps Over The Lazy Dog
            </h3>
          </div>
          <div style={{ padding: '16px', borderRadius: 'var(--radius, 8px)', border: '1px solid var(--color-border)', background: 'var(--color-card)' }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-primary)' }}>--font-sans: 'Inter', sans-serif</span>
            <p style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)", fontSize: 15, margin: '6px 0 0', lineHeight: 1.6 }}>
              Production-grade, highly performant React 19 component library with strict TypeScript types, atomic exports, and zero dependency leakage.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Elevation & Micro-Interactions" description="Hover and active elevation utilities declared in theme.css.">
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          <div
            className="hover-elevate cursor-pointer"
            style={{
              padding: '16px 20px',
              borderRadius: 'var(--radius, 8px)',
              border: '1px solid var(--color-border)',
              background: 'var(--color-card)',
              minWidth: 200,
            }}
          >
            <div style={{ fontWeight: 700, fontSize: 13 }}>.hover-elevate</div>
            <div style={{ fontSize: 11, color: 'var(--color-muted-foreground)', marginTop: 4 }}>
              Hover to test elevation lift and shadow bloom
            </div>
          </div>
          <div
            className="active-elevate-2 cursor-pointer"
            style={{
              padding: '16px 20px',
              borderRadius: 'var(--radius, 8px)',
              border: '1px solid var(--color-border)',
              background: 'var(--color-card)',
              minWidth: 200,
            }}
          >
            <div style={{ fontWeight: 700, fontSize: 13 }}>.active-elevate-2</div>
            <div style={{ fontSize: 11, color: 'var(--color-muted-foreground)', marginTop: 4 }}>
              Click to test tactile depressed state
            </div>
          </div>
        </div>
      </Section>

      <section style={{ marginBottom: 40 }}>
        <h2
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: 'var(--color-foreground, #111827)',
            margin: '0 0 4px',
            paddingBottom: 10,
            borderBottom: '1px solid var(--color-border, #e5e7eb)',
          }}
        >
          Shadow Scale
        </h2>
        <p style={{ fontSize: 12, color: 'var(--color-muted-foreground, #6b7280)', margin: '6px 0 16px' }}>
          Standard elevation shadows used for cards, popovers, and overlays.
        </p>
        <div style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)', borderRadius: 12, padding: '0 20px' }}>
          <ShadowRow token="shadow-sm" label="Subtle — inputs, badges" shadow="0 1px 2px rgba(0,0,0,0.05)" />
          <ShadowRow token="shadow" label="Default — cards" shadow="0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)" />
          <ShadowRow token="shadow-md" label="Medium — dropdowns, popovers" shadow="0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.06)" />
          <ShadowRow token="shadow-lg" label="Large — dialogs, sheets" shadow="0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)" />
          <ShadowRow token="shadow-xl" label="X-Large — command palette" shadow="0 20px 25px rgba(0,0,0,0.1), 0 8px 10px rgba(0,0,0,0.04)" />
        </div>
      </section>

      <section
        style={{
          background: 'var(--color-card)',
          border: '1px solid var(--color-border)',
          borderRadius: 12,
          padding: '20px 24px',
        }}
      >
        <h3 style={{ margin: '0 0 8px', fontSize: 14, fontWeight: 700, color: 'var(--color-primary)' }}>
          💡 How to Re-Theme in Your Application
        </h3>
        <p style={{ fontSize: 12, color: 'var(--color-muted-foreground)', marginBottom: 12 }}>
          In Tailwind v4, `@theme inline` binds utilities to HSL channel variables. Override the underlying channels in your app's CSS:
        </p>
        <pre
          style={{
            background: '#111827',
            color: '#f9fafb',
            borderRadius: 8,
            padding: '14px 18px',
            fontSize: 12,
            fontFamily: 'monospace',
            overflow: 'auto',
            margin: 0,
          }}
        >
          {`:root {
  /* Override brand primary HSL channels (e.g. Vibrant Orange Accent) */
  --primary: 24.6 95% 53.1%;
  --primary-foreground: 0 0% 100%;

  /* Override sidebar branding independently */
  --sidebar: 20 14% 4%;
  --sidebar-primary: 24.6 95% 53.1%;
  --sidebar-primary-foreground: 0 0% 100%;
}

.dark {
  --color-background: 224 71% 4%;
  --color-primary: 24.6 95% 53.1%;
}`}
        </pre>
      </section>
    </div>
  ),
};
