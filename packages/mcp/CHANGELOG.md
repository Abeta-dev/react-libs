# Changelog — `@abeta.dev/mcp`

All notable changes to `@abeta.dev/mcp` are documented here.

## [0.22.0] - 2026-11-23

### Added
- Initial release of `@abeta.dev/mcp` — zero-dependency stdio Model Context Protocol (MCP) server and programmatic query SDK for the `@abeta.dev/*` ecosystem.
- Ships bundled version-matched `registry.json`, `context-graph.json`, `rag-chunks.jsonl`, and `llms.txt` for `<25ms` offline startup, plus `--remote` live refresh from `https://abeta-dev.github.io/react-libs/`.
- Exposes 5 MCP tools (`abeta_list_packages`, `abeta_lookup_symbol`, `abeta_check_rsc_boundary`, `abeta_search_rag`, `abeta_traverse_context_graph`) and 4 MCP resources (`abeta://llms.txt`, `abeta://registry.json`, `abeta://context-graph.json`, `abeta://rag-chunks.jsonl`).
