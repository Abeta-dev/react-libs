# Changelog

All notable changes to `@abeta.dev/india` are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this package adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.22.0] - 2026-11-23

### Changed
- Verified pure server-safe packaging under the new Leaf-Import & Bundle-Isolation CI Gate (`scripts/check-leaf-imports.mjs`) and synchronized monorepo release version to `0.22.0`.

## [0.21.0] - 2026-11-20

### Changed
- Eliminated UI dependency bloat for pure Node.js/RSC installs by moving `@abeta.dev/ui` (`^0.21.0`) and `lucide-react` (`^0.577.0`) from `dependencies` to optional `peerDependencies` alongside optional `react` and `react-dom` peers.
- Updated package JSDoc headers in `src/index.ts` and `src/react/index.ts` to reference `@abeta.dev/india` and `@abeta.dev/india/react`.
- Added high-intent npm discovery keywords, `homepage`, `bugs`, `engines` (`node >=20.0.0`), `LICENSE`, and excluded sourcemaps from published tarballs.
- Expanded `README.md` with installation matrices, Tailwind CSS v4 setup, full statutory/tax/UPI/WhatsApp/location API tables, and runnable examples.

## [0.20.0] - 2026-11-10

### Changed
- Domain and author metadata transition to `abeta-dev <contact@abeta.dev>`.
- Updated `@abeta.dev/ui` dependency to `^0.20.0`.
- Version bumped to 0.20.0 in synchronization with the monorepo release.

## [0.1.0] - 2026-09-24

### Added
- Initial standalone release of `@abeta.dev/india` providing zero-DOM India statutory validation (GSTIN, PAN, IFSC), Lakhs/Crores currency formatters, and WhatsApp deep links.
- `@abeta.dev/india/react` subpath containing AmountSummaryCardIndia and UpiQrCard components.
- Dual ESM and CommonJS bundles with TypeScript declarations and sourcemaps.
