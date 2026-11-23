# @abeta.dev/mcp

Zero-dependency **Model Context Protocol (MCP)** server for the `@abeta.dev/*` React ecosystem. Gives Claude Desktop, Cursor, Windsurf, VS Code Copilot, Antigravity, and custom agent pipelines instant live tools for symbol discovery, RSC vs `'use client'` boundary verification, RAG recipe search, and JSON-LD context graph traversal.

## Zero-Config Quickstart

Add to your MCP client config (`claude_desktop_config.json`, `.cursor/mcp.json`, or Windsurf):

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

- **Offline-first by default:** Ships with the exact version-matched `registry.json`, `context-graph.json`, `rag-chunks.jsonl`, and `llms.txt` bundled in `dist/data/` (`<25ms` startup, zero network required).
- **Live remote mode:** Pass `--remote` (`args: ["-y", "@abeta.dev/mcp", "--remote"]`) to pull the latest published graph directly from `https://abeta-dev.github.io/react-libs/`.

## Exposed MCP Tools

| Tool | Purpose |
| :--- | :--- |
| `abeta_list_packages` | List all `@abeta.dev/*` packages, versions, roles, install commands, and exported subpaths |
| `abeta_lookup_symbol` | Look up any component, hook, validator, or function and return exact `importPath`, `runtime`, and canonical URN |
| `abeta_check_rsc_boundary` | Check whether an import specifier is pure RSC/Node-safe, requires `'use client'`, isolates a browser worker, or is a CSS asset |
| `abeta_search_rag` | Ranked search over pre-chunked, URN-linked RAG records (`rag-chunks.jsonl`) with optional `packageName` and `category` filters |
| `abeta_traverse_context_graph` | Traverse 1–2 hops from any canonical URN or `importPath` in `context-graph.json` |

## Exposed MCP Resources

- `abeta://llms.txt` (`text/markdown`)
- `abeta://registry.json` (`application/json`)
- `abeta://context-graph.json` (`application/ld+json`)
- `abeta://rag-chunks.jsonl` (`application/x-ndjson`)

## Programmatic Usage

```ts
import { loadBundledKnowledge, lookupSymbol, checkRscBoundary } from "@abeta.dev/mcp";

const knowledge = loadBundledKnowledge();
console.log(lookupSymbol(knowledge, "calculateGSTSplit"));
console.log(checkRscBoundary(knowledge, "@abeta.dev/ui/pdf"));
```

## License

MIT © [Abeta-dev](https://github.com/Abeta-dev/react-libs)
