import { chmodSync, copyFileSync, existsSync, mkdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { defineConfig } from "tsup";

const PUBLIC_DIR = resolve("..", "..", "public");
const DATA_FILES = ["registry.json", "context-graph.json", "rag-chunks.jsonl", "llms.txt"];

export default defineConfig([
  // 1. Programmatic MCP Library (Universal Node ESM/CJS)
  {
    entry: {
      index: "src/index.ts",
    },
    format: ["esm", "cjs"],
    dts: true,
    clean: true,
    splitting: false,
    outDir: "dist",
    platform: "node",
    target: "node20",
  },
  // 2. Stdio CLI Binary (npx @abeta.dev/mcp)
  {
    entry: {
      cli: "src/cli.ts",
    },
    format: ["esm"],
    dts: false,
    clean: false,
    splitting: false,
    outDir: "dist",
    platform: "node",
    target: "node20",
    banner: {
      js: "#!/usr/bin/env node",
    },
    async onSuccess() {
      const dataOut = join("dist", "data");
      mkdirSync(dataOut, { recursive: true });
      for (const file of DATA_FILES) {
        const src = join(PUBLIC_DIR, file);
        if (existsSync(src)) {
          copyFileSync(src, join(dataOut, file));
        }
      }
      const cliPath = join("dist", "cli.js");
      if (existsSync(cliPath)) {
        chmodSync(cliPath, 0o755);
      }
    },
  },
]);
