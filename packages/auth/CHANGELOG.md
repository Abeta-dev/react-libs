# Changelog

All notable changes to `@abeta.dev/auth` are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this package adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.2] - 2026-09-17

### Changed
- Added explicit package build lifecycle hooks and npm provenance configuration for the independently published workspace artifact.
- Established release verification that requires the root package to consume this exact version before it can publish.

## [0.2.1] - 2026-09-17

### Changed
- Published the backend-agnostic authentication workspace baseline used by `@abeta.dev/react-libs`.
