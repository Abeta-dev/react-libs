import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: ["src/index.ts"],
    format: ["cjs", "esm"],
    dts: true,
    clean: true,
    outDir: "dist",
  },
  {
    entry: ["src/react/index.ts"],
    format: ["cjs", "esm"],
    dts: true,
    clean: false,
    outDir: "dist/react",
    esbuildOptions(options) {
      options.banner = {
        js: '"use client";',
      };
    },
  }
]);
