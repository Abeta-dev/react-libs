# Changelog

All notable changes to `@abeta.dev/ui` are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this package adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.21.0] - 2026-11-20

### Added
- Complete component barrel export in `@abeta.dev/ui`: all 110 client UI component modules (forms, layout, data-display, navigation, overlays, feedback, core), all 9 client hooks (`use-mobile`, `use-debounce`, `use-local-storage`, `use-toast`, `use-platform`, `use-pwa-install`, `use-offline-queue`, `use-click-backpressure`, `use-local-first-store`), and utility/platform helpers.
- Dedicated client-only `@abeta.dev/ui/pdf` subpath exporting `PdfViewer` cleanly isolated from SSR bundles (`pdfjs-dist` / `react-pdf` workers).
- Dedicated `@abeta.dev/ui/hooks/use-toast` subpath exporting `useToast`, `toast`, and `reducer` without shared hashed DTS chunks.
- First-class CSS and design token delivery:
  - `@abeta.dev/ui/theme.css` (and `./styles/theme.css` alias) for Tailwind CSS v4 `@theme inline` consumers.
  - `@abeta.dev/ui/style.css` (and `./dist/style.css` alias) precompiled standalone stylesheet encapsulated in `@layer abeta-ui` for zero-Tailwind applications.
- Expanded RSC-safe `@abeta.dev/ui/utils` subpath exporting `cn`, all formatters (`./lib/formatters`), and sensitive data masking (`./lib/masking`) with zero `'use client'` directive.
- Added `LICENSE`, rich npm `keywords`, `homepage`, `bugs`, `engines`, and clean `files` globs excluding sourcemaps from published tarballs.
- Comprehensive npm landing page documentation in `README.md` with Tailwind v4 and zero-Tailwind setup guides, Dark Mode examples, Next.js App Router & Vite quick starts, micro-bundle reference table, and `llms.txt` links.

### Changed
- Aliased Sonner toaster exports as `SonnerToaster` and `Sonner` to prevent export collisions with Radix `Toaster`.
- Exported named pagination primitives from `./navigation/pagination` to avoid `DataTablePaginationProps` collision with `./data-display/data-table`.
- Updated `tsup.config.ts` to cleanly clear `dist/` prior to parallel builds and deduplicate `'use client'` directives in standalone micro-bundles (`select`, `sheet`, `popover`, `tooltip`).

## [0.20.0] - 2026-11-10

### Changed
- Domain and author metadata transition to `abeta-dev <contact@abeta.dev>`.
- Refined design tokens documentation and audited color palettes to eliminate AI-slop color selections.
- Version bumped to 0.20.0 in synchronization with the monorepo release.

## [0.1.0] - 2026-09-24

### Added
- Initial standalone release of `@abeta.dev/ui` providing accessible Tailwind CSS v4 & Radix UI primitives.
- Subpath exports for Button, Dialog, Card, Badge, Input, DataTable, Table, Select, Form, Sheet, Drawer, Popover, Tooltip, Calendar, DateRangePicker, Command, Chart, Carousel, and pure headless utilities.
- Dual ESM and CommonJS bundles with TypeScript declarations and sourcemaps.
