import { defineConfig } from 'tsup';

const CLIENT_EXTERNAL = [
  /^react(\/.+)?$/,
  /^react-dom(\/.+)?$/,
  /^date-fns(\/.+)?$/,
  /^pdfjs-dist(\/.+)?$/,
  'xlsx',
  'jspdf',
  'jspdf-autotable',
  /^react-pdf(\/.+)?$/,
  /^recharts(\/.+)?$/,
  'canvas-confetti',
  /^embla-carousel.*$/,
  'cmdk',
  'vaul',
  /^react-hook-form(\/.+)?$/,
  /^react-day-picker(\/.+)?$/,
  'next-themes',
  /^lucide-react(\/.+)?$/,
  'sonner',
  'input-otp',
  /^react-resizable-panels(\/.+)?$/,
  'class-variance-authority',
  'clsx',
  'tailwind-merge',
  /^@radix-ui\/.+/,
  '@abeta.dev/auth',
];

export default defineConfig([
  // 1. Client Components & Interactive Modules ('use client' banner)
  {
    entry: {
      index: 'src/index.ts',
      'india/react/index': 'src/india/react/index.ts',
      'analytics/react/index': 'src/lib/analytics/react/index.ts',
      pdf: 'src/components/ui/data-display/pdf-viewer.tsx',
      button: 'src/components/ui/forms/button.tsx',
      dialog: 'src/components/ui/overlays/dialog.tsx',
      card: 'src/components/ui/layout/card.tsx',
      badge: 'src/components/ui/data-display/badge.tsx',
      input: 'src/components/ui/forms/input.tsx',
      'data-table': 'src/components/ui/data-display/data-table.tsx',
      charts: 'src/components/ui/data-display/chart.tsx',
      command: 'src/components/ui/overlays/command.tsx',
      drawer: 'src/components/ui/overlays/drawer.tsx',
      carousel: 'src/components/ui/data-display/carousel.tsx',
      calendar: 'src/components/ui/core/calendar.tsx',
      'date-picker': 'src/components/ui/core/date-range-picker.tsx',
      form: 'src/components/ui/forms/form.tsx',
      auth: 'src/auth/index.ts',
    },
    format: ['esm', 'cjs'],
    dts: true,
    sourcemap: true,
    clean: false,
    splitting: false,
    banner: {
      js: "'use client';",
    },
    injectStyle: false,
    external: CLIENT_EXTERNAL,
  },
  // 2. Dedicated Hook Entry Point (Isolated build eliminates shared DTS chunks e.g. use-toast-[hash].d.ts)
  {
    entry: {
      'hooks/use-toast': 'src/hooks/use-toast.ts',
    },
    format: ['esm', 'cjs'],
    dts: true,
    sourcemap: true,
    clean: false,
    splitting: false,
    banner: {
      js: "'use client';",
    },
    injectStyle: false,
    external: CLIENT_EXTERNAL,
  },
  // 3. Universal / Server Modules (Pure Utilities, India Pure Domain & Universal Analytics, Zero Directive)
  {
    entry: {
      utils: 'src/utils.ts',
      'analytics/index': 'src/lib/analytics/index.ts',
      'india/index': 'src/india/index.ts',
    },
    format: ['esm', 'cjs'],
    dts: true,
    sourcemap: true,
    clean: false,
    splitting: false,
    injectStyle: false,
    external: CLIENT_EXTERNAL,
  },
]);

