import { defineConfig } from "tsup";

const EXTERNAL = [
  "react",
  "react/jsx-runtime",
  "react-dom",
  "react-dom/client",
  "@abeta.dev/ui",
  "clsx",
  "lucide-react",
  "qrcode",
];

export default defineConfig([
  {
    entry: ["src/index.ts"],
    format: ["cjs", "esm"],
    dts: true,
    clean: true,
    outDir: "dist",
    external: EXTERNAL,
  },
  {
    entry: {
      "react/index": "src/react/index.ts",
    },
    format: ["cjs", "esm"],
    dts: true,
    clean: false,
    outDir: "dist",
    banner: {
      js: '"use client";',
    },
    external: EXTERNAL,
  },
]);
