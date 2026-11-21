# Changelog

All notable changes to `@abeta.dev/talent` are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this package adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.21.0] - 2026-11-20

### Changed
- Updated `@abeta.dev/ui` dependency to `^0.21.0` and synchronized version to `0.21.0`.
- Added high-intent npm discovery keywords, `homepage`, `bugs`, `engines` (`node >=20.0.0`), `LICENSE`, and excluded sourcemaps from published tarballs.
- Expanded `README.md` with Tailwind CSS v4 styling setup, component overview table, and copy-pasteable React examples for all exported talent and assessment widgets.

## [0.20.0] - 2026-11-10

### Changed
- Domain and author metadata transition to `abeta-dev <contact@abeta.dev>`.
- Updated `@abeta.dev/ui` dependency to `^0.20.0`.
- Version bumped to 0.20.0 in synchronization with the monorepo release.

## [0.1.0] - 2026-09-24

### Added
- Initial standalone release of `@abeta.dev/talent` providing career telemetry, assessment, and candidate verification UI.
- Components include CheckpointRunner, DiagnosticQuiz, ProofOfWorkCard, ProofOfWorkCertificate, PipelineKanban, MatchScoreGauge, RadarSweep, and SalaryRangeDisplay.
- Dual ESM and CommonJS bundles with TypeScript declarations and sourcemaps.
