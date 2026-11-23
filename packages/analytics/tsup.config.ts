import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { defineConfig } from "tsup";

const EXTERNAL = [
  /^react(\/.+)?$/,
  /^react-dom(\/.+)?$/,
];

export default defineConfig([
  // 1. Pure Universal / Server / Node Analytics Core (Zero 'use client', zero React)
  {
    entry: ["src/index.ts"],
    format: ["cjs", "esm"],
    dts: true,
    clean: true,
    splitting: false,
    outDir: "dist",
    external: EXTERNAL,
  },
  // 2. React Client Provider, Hooks & Declarative Trackers ('use client')
  {
    entry: {
      "react/index": "src/react/index.ts",
    },
    format: ["cjs", "esm"],
    dts: true,
    clean: false,
    splitting: false,
    outDir: "dist",
    banner: {
      js: "'use client';",
    },
    external: EXTERNAL,
    async onSuccess() {
      for (const rel of ["react/index.js", "react/index.cjs"]) {
        const fullPath = join("dist", rel);
        const content = readFileSync(fullPath, "utf8");
        const cleaned = content.replace(
          /^('use client';\r?\n(?:"use strict";\r?\n)?)(?:["']use client["'];?\r?\n?)/,
          "$1",
        );
        if (cleaned !== content) {
          writeFileSync(fullPath, cleaned, "utf8");
        }
      }
    },
  },
]);
