import { defineConfig } from "tsup";

const EXTERNAL = [
  "react",
  "react/jsx-runtime",
  "react-dom",
  "react-dom/client",
  "@abeta.dev/ui",
  "clsx",
  "lucide-react",
  "canvas-confetti",
];

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  banner: {
    js: "'use client';",
  },
  external: EXTERNAL,
});
