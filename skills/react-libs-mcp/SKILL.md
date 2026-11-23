---
name: react-libs-mcp
description: Use when connecting AI agents, IDEs, RAG pipelines, or external context graphs to @abeta.dev/* via @abeta.dev/mcp (v0.22.0).
---

# `@abeta.dev/mcp` (`v0.22.0`)

## Zero-Config MCP Registration

```json
{
  "mcpServers": {
    "abeta-react-libs": {
      "command": "npx",
      "args": ["-y", "@abeta.dev/mcp"]
    }
  }
}
```

## Available Tools & Resources

- Tools: `abeta_list_packages`, `abeta_lookup_symbol`, `abeta_check_rsc_boundary`, `abeta_search_rag`, `abeta_traverse_context_graph`.
- Resources: `abeta://llms.txt`, `abeta://registry.json`, `abeta://context-graph.json`, `abeta://rag-chunks.jsonl`.
- Use `--remote` to pull live artifacts from `https://abeta-dev.github.io/react-libs/` instead of the bundled offline snapshot.
