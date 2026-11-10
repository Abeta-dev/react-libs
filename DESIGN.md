# DESIGN.md — Design System & Craft Specification

> **@abeta.dev Design System Architecture**  
> **Source of Truth:** `src/styles/theme.css` & `src/styles/tailwind-bundle.css`  
> **Foundation:** React 19, Tailwind CSS v4 (`@theme inline`), Radix UI Headless Primitives  
> **Standards Compliance:** WCAG 2.1 AA / WCAG 2.2, Section 508, Impeccable Craft Guidelines

---

## 1. Design System Philosophy

The `@abeta.dev` design system is engineered specifically for mission-critical enterprise platforms, supply chain hubs, and regulatory financial interfaces. The philosophy rests upon four core pillars:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              Core Design System Pillars                                │
├────────────────────────┬────────────────────────┬──────────────────────────────────────┤
│ 1. Zero-Runtime CSS    │ 2. Uncompromising a11y │ 3. Radix UI Primitives               │
│ Pure CSS variables &   │ Strict WCAG 2.1 AA+    │ Headless, accessible focus management│
│ compile-time Tailwind  │ Contrast >= 4.5:1      │ Keyboard traps, ARIA roles,          │
│ custom properties.     │ Reduced-motion support │ Screen reader live regions.          │
├────────────────────────┴────────────────────────┴──────────────────────────────────────┤
│ 4. Anti-Slop Discipline & Craft Rigor                                                  │
│ Rejection of generic AI purple/indigo gradients and tacky bounce easings.              │
│ Intentional, high-contrast, professional slate/neutral surfaces with refined accents. │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

1. **Zero-Runtime Overhead**: Styles are compiled ahead-of-time through Tailwind CSS v4's `@theme` engine. No runtime CSS-in-JS emotion/styled-components overhead, ensuring sub-millisecond layout passes and pure RSC compatibility.
2. **Accessible by Construction (WCAG 2.1 AA)**: High-contrast ratios (minimum 4.5:1 for body copy and 3:1 for large UI targets), mandatory focus rings (`focus-visible:ring-2 focus-visible:ring-ring`), and native ARIA labeling.
3. **Radix Headless Foundations**: Complex interactive behaviors (dialogs, dropdowns, popovers, sheets, tooltips, select menus) use Radix UI headless components, guaranteeing robust keyboard navigation, focus trap cycles, and portal mounting.
4. **Anti-Slop Craft Integrity**: Verified with `impeccable detect` to eliminate placeholder assets, broken image boxes, generic violet/indigo AI gradients, and elastic bounce easings in favor of purposeful, brand-aligned aesthetics.

---

## 2. Design Tokens & Tailwind CSS v4 Configuration

All design variables are declared in `src/styles/theme.css` using the Tailwind CSS v4 `@theme inline` directive, exposing reactive CSS custom properties directly to utility classes.

### `@theme inline` Specification

```css
@layer reset, base, react-libs, components, utilities, overrides;

@theme inline {
  --spacing-page: var(--page-padding);

  /* Radius Tokens */
  --radius-sm: calc(var(--radius) - 4px); /* 4px */
  --radius-md: calc(var(--radius) - 2px); /* 6px */
  --radius-lg: var(--radius);             /* 8px */
  --radius-xl: calc(var(--radius) + 4px); /* 12px */

  /* Semantic Color Mappings */
  --color-background: hsl(var(--background));
  --color-foreground: hsl(var(--foreground));
  --color-card: hsl(var(--card));
  --color-card-foreground: hsl(var(--card-foreground));
  --color-popover: hsl(var(--popover));
  --color-popover-foreground: hsl(var(--popover-foreground));
  --color-primary: hsl(var(--primary));
  --color-primary-foreground: hsl(var(--primary-foreground));
  --color-secondary: hsl(var(--secondary));
  --color-secondary-foreground: hsl(var(--secondary-foreground));
  --color-muted: hsl(var(--muted));
  --color-muted-foreground: hsl(var(--muted-foreground));
  --color-accent: hsl(var(--accent));
  --color-accent-foreground: hsl(var(--accent-foreground));
  --color-destructive: hsl(var(--destructive));
  --color-destructive-foreground: hsl(var(--destructive-foreground));
  --color-border: hsl(var(--border));
  --color-input: hsl(var(--input));
  --color-ring: hsl(var(--ring));

  /* Okabe-Ito Colorblind-Safe Data Visualization */
  --color-chart-1: hsl(var(--chart-1));
  --color-chart-2: hsl(var(--chart-2));
  --color-chart-3: hsl(var(--chart-3));
  --color-chart-4: hsl(var(--chart-4));
  --color-chart-5: hsl(var(--chart-5));

  /* Typography Fonts */
  --font-sans: 'Inter', sans-serif;
  --font-display: 'Outfit', sans-serif;
}
```

---

## 3. Semantic Color Roles & Palettes

The color architecture separates chromatic identity from structural surfaces. Hues are expressed in HSL format for effortless opacity compounding (`bg-primary/10`).

### Semantic Color Roles

| Semantic Role | Token Class | Intended Usage | Contrast Safeguard |
| :--- | :--- | :--- | :--- |
| **Neutral Surface** | `bg-background`, `bg-card` | Core layout background, cards, tables, panels. | Tested against `foreground` for >10:1 contrast. |
| **Neutral Text** | `text-foreground`, `text-muted-foreground` | Primary copy, secondary hints, table metadata. | Secondary copy maintains >= 4.5:1 ratio. |
| **Primary Brand** | `bg-primary`, `text-primary-foreground` | Primary buttons, active tabs, progress bars, focused rings. | Calibrated to 28% lightness in light mode for >= 4.5:1 against white. |
| **Destructive** | `bg-destructive`, `text-destructive` | Danger buttons, critical error alerts, revocation actions. | Bright crimson calibrated for immediate visibility and AA contrast. |
| **Muted & Secondary** | `bg-secondary`, `bg-muted` | Inactive tabs, disabled field backgrounds, pill badges. | Subtle tonal separation without harsh borders. |
| **Borders & Dividers** | `border-border`, `border-input` | Card boundaries, table row separators, input strokes. | Subtle, calibrated at ~91% lightness in light, ~17.5% in dark. |

### Color Mode Token Matrix

```css
/* ─── Light Mode Tokens (:root) ─── */
:root {
  --background: 210 20% 98%;           /* #F8FAFC - Soft cool slate */
  --foreground: 222.2 84% 4.9%;        /* #020817 - Deep navy ink */
  --card: 0 0% 100%;                   /* Pure white card surface */
  --card-foreground: 222.2 84% 4.9%;
  --card-border: 214.3 31.8% 91.4%;

  /* Primary Emerald Brand Theme (28% lightness ensures WCAG 2.1 AA >= 4.5:1) */
  --primary: 142.1 76.2% 28%;
  --primary-foreground: 355.7 100% 97.3%;
  --primary-border: 142.1 76.2% 22%;

  --secondary: 210 40% 96.1%;
  --secondary-foreground: 222.2 47.4% 11.2%;
  --muted: 210 40% 96.1%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 96.1%;
  --accent-foreground: 222.2 47.4% 11.2%;

  --destructive: 0 84% 45%;
  --destructive-foreground: 210 40% 98%;

  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 142.1 76.2% 28%;
  --radius: 0.5rem;                    /* 8px base radius */
}

/* ─── Dark Mode Tokens (.dark) ─── */
.dark {
  --background: 222.2 84% 4.9%;        /* Slate-950 deep canvas */
  --foreground: 210 40% 98%;           /* Crisp high-contrast text */
  --card: 222.2 84% 4.9%;              /* Elevated dark surface */
  --card-foreground: 210 40% 98%;
  --card-border: 217.2 32.6% 17.5%;

  /* Dark mode emerald recalibrated to 45.3% lightness for dark canvas */
  --primary: 142.1 70.6% 45.3%;
  --primary-foreground: 144.9 80.4% 10%;
  --primary-border: 142.1 70.6% 35%;

  --secondary: 217.2 32.6% 17.5%;
  --secondary-foreground: 210 40% 98%;
  --muted: 217.2 32.6% 17.5%;
  --muted-foreground: 215 20.2% 65.1%;
  --accent: 217.2 32.6% 17.5%;
  --accent-foreground: 210 40% 98%;

  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 222.2 84% 4.9%;

  --border: 217.2 32.6% 17.5%;
  --input: 217.2 32.6% 17.5%;
  --ring: 142.1 70.6% 45.3%;
}
```

### Data Visualization: Okabe-Ito Colorblind Accessible Palette

Charts use the universally accessible Okabe-Ito palette, ensuring distinct legibility for deuteranopia, protanopia, and tritanopia:

* `--chart-1`: Cobalt Blue (`#0072b2` / `210 100% 35%`)
* `--chart-2`: Amber Orange (`#e69f00` / `38 100% 45%`)
* `--chart-3`: Teal Green (`#009e73` / `164 100% 31%`)
* `--chart-4`: Vermillion Red (`#d55e00` / `26 100% 42%`)
* `--chart-5`: Sky Blue (`#56b4e9` / `202 80% 63%`)

---

## 4. Typography Scale & Hierarchy

The typography system pairs **Inter** for high-density legibility in tables and UI controls with **Outfit** for marketing and workspace display titles. Monospace tabular data (GSTIN, PAN, transaction hashes) uses **JetBrains Mono** or `font-mono` with tabular numbers (`tabular-nums`).

| Token | Class | Size / Line Height | Tracking | Primary Usage |
| :--- | :--- | :--- | :--- | :--- |
| `text-xs` | `text-xs` | 12px / 16px (0.75rem) | `tracking-normal` | Form helper text, timestamp badges, table meta |
| `text-sm` | `text-sm` | 14px / 20px (0.875rem) | `tracking-normal` | Standard body text, button labels, table cells |
| `text-base` | `text-base` | 16px / 24px (1.000rem) | `tracking-normal` | Modal body text, card descriptions, inputs |
| `text-lg` | `text-lg` | 18px / 28px (1.125rem) | `tracking-tight` | Section headings, dialog titles, workspace banner titles |
| `text-xl` | `text-xl` | 20px / 28px (1.250rem) | `tracking-tight` | Metric card values, drawer headers |
| `text-2xl` | `text-2xl` | 24px / 32px (1.500rem) | `tracking-tight` | Page headers, overview titles |
| `text-3xl` | `text-3xl` | 30px / 36px (1.875rem) | `tracking-tight` | Dashboard hero statistics |
| `text-4xl` | `text-4xl` | 36px / 40px (2.250rem) | `tracking-tighter` | Portal landing hero banners |

---

## 5. Spacing Rhythm & Density

The layout rhythm is anchored to a strict **4px base grid** (`0.25rem = 4px`).

```
Scale:    1    2    3    4    6    8    10   12   16   20   24
Pixels:  4px  8px 12px 16px 24px 32px 40px 48px 64px 80px 96px
```

* **Micro-Spacing (4px - 8px)**: Gap between button icon and label (`gap-2`), input field internal icon padding (`pl-9`), badge padding (`px-2.5 py-0.5`).
* **Component-Spacing (12px - 16px)**: Form field stacks (`space-y-4`), card internal padding (`p-4` or `p-6`), table cell padding (`py-3.5 px-4`).
* **Layout-Spacing (24px - 32px)**: Grid column gaps (`gap-6`), page section stacking (`space-y-8`), page global padding (`--page-padding: 1.5rem`).

---

## 6. Motion Curves & Micro-Interactions

### Motion Philosophy: Smooth Deceleration Over Elasticity
In enterprise workflows, animations must communicate state transitions without drawing undue attention or feeling frivolous.
* **Strict Rule**: Avoid bounce and elastic easing (`animate-bounce`). Real physical objects in professional software decelerate smoothly into place.
* **Preferred Curves**: Smooth ease-out (`cubic-bezier(0, 0, 0.2, 1)`) and cubic deceleration (`cubic-bezier(0.16, 1, 0.3, 1)` / quart/quint).
* **Duration Range**: Fast micro-interactions: 100ms-150ms. Sheet and modal slides: 200ms-300ms.

### Radix UI Primitive Keyframes

```css
/* Dialog / Alert Dialog Overlay */
@keyframes radix-overlay-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes radix-overlay-out {
  from { opacity: 1; }
  to { opacity: 0; }
}

/* Modal Content Transition */
@keyframes radix-content-in {
  from { opacity: 0; transform: translate(-50%, -48%) scale(0.95); }
  to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
}
@keyframes radix-content-out {
  from { opacity: 1; transform: translate(-50%, -50%) scale(1); }
  to { opacity: 0; transform: translate(-50%, -48%) scale(0.95); }
}

/* Popover & Tooltip Pop */
@keyframes radix-popup-in {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
@keyframes radix-popup-out {
  from { opacity: 1; transform: scale(1); }
  to { opacity: 0; transform: scale(0.95); }
}

/* Side Sheet Slides */
@keyframes radix-sheet-in-right {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}
@keyframes radix-sheet-out-right {
  from { transform: translateX(0); }
  to { transform: translateX(100%); }
}
```

### Elevation & Hover Physics
Interactive cards and clickable items use subtle single-pixel elevation with fast ease transitions:

```css
.hover-elevate {
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.hover-elevate:hover {
  transform: translateY(-1px);
}
.active-elevate-2:active {
  transform: translateY(0);
}
```

### Accessibility: Reduced Motion Override
Every animation and transition respects operating system accessibility preferences:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 7. Anti-Slop Discipline & Craft Invariants

All code, stories, and templates must adhere to the Impeccable Craft Standards:

1. **No Broken Images**: Do not ship `<img src="#" />` or unpopulated image tags. Use semantic SVG placeholders or complete data URIs (`data:image/svg+xml;utf8,...`).
2. **No AI Purple/Indigo Gradients**: Do not apply generic `from-indigo-600 to-indigo-800` or violet-to-cyan gradients. Use intentional palettes such as `from-slate-900 to-slate-800`, `from-emerald-700 to-teal-900`, or brand primary tokens.
3. **No Bounce Easing**: Replace `animate-bounce` with smooth cubic ease transitions (`transition-transform duration-300 ease-out`) or subtle contextual pulses (`animate-pulse`).
4. **Verification**: Run `/Users/umesh/.gemini/config/skills/impeccable/scripts/impeccable detect --json src/ packages/` to enforce zero warnings before every release.
