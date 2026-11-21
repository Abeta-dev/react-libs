import { readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { defineConfig } from "tsup";

const EXTERNAL = [
  /^react(\/.+)?$/,
  /^react-dom(\/.+)?$/,
  /^date-fns(\/.+)?$/,
  /^pdfjs-dist(\/.+)?$/,
  "xlsx",
  "jspdf",
  "jspdf-autotable",
  /^react-pdf(\/.+)?$/,
  /^recharts(\/.+)?$/,
  "canvas-confetti",
  /^embla-carousel.*$/,
  "cmdk",
  "vaul",
  /^react-hook-form(\/.+)?$/,
  /^react-day-picker(\/.+)?$/,
  "next-themes",
  /^lucide-react(\/.+)?$/,
  "sonner",
  "input-otp",
  "qrcode",
  /^react-resizable-panels(\/.+)?$/,
  "class-variance-authority",
  "clsx",
  "tailwind-merge",
  /^@radix-ui\/.+/,
];

export default defineConfig((options) => {
  if (!options.watch) {
    rmSync("dist", { recursive: true, force: true });
  }

  return [
    // 1. Client Components & Interactive Modules ('use client' banner)
    {
      entry: {
        index: "src/index.ts",
        pdf: "src/data-display/pdf-viewer.tsx",
        button: "src/forms/button.tsx",
        dialog: "src/overlays/dialog.tsx",
        card: "src/layout/card.tsx",
        badge: "src/data-display/badge.tsx",
        input: "src/forms/input.tsx",
        "data-table": "src/data-display/data-table.tsx",
        table: "src/data-display/table.tsx",
        select: "src/forms/select.tsx",
        form: "src/forms/form.tsx",
        sheet: "src/overlays/sheet.tsx",
        drawer: "src/overlays/drawer.tsx",
        popover: "src/core/popover.tsx",
        tooltip: "src/overlays/tooltip.tsx",
        calendar: "src/core/calendar.tsx",
        "date-range-picker": "src/core/date-range-picker.tsx",
        command: "src/overlays/command.tsx",
        chart: "src/data-display/chart.tsx",
        carousel: "src/data-display/carousel.tsx",
      },
      format: ["esm", "cjs"],
      dts: true,
      sourcemap: true,
      clean: false,
      splitting: false,
      injectStyle: false,
      banner: {
        js: "'use client';",
      },
      external: EXTERNAL,
      async onSuccess() {
        for (const file of readdirSync("dist")) {
          if (!file.endsWith(".js") && !file.endsWith(".cjs")) continue;
          if (file === "utils.js" || file === "utils.cjs") continue;
          const fullPath = join("dist", file);
          const content = readFileSync(fullPath, "utf8");
          const cleaned = content.replace(
            /^('use client';\r?\n(?:"use strict";\r?\n)?)(?:["']use client["'];?)/,
            "$1",
          );
          if (cleaned !== content) {
            writeFileSync(fullPath, cleaned, "utf8");
          }
        }
      },
    },
    // 2. Dedicated Hook Entry Point (Isolated build eliminates shared DTS chunks e.g. use-toast-[hash].d.ts)
    {
      entry: {
        "hooks/use-toast": "src/hooks/use-toast.ts",
      },
      format: ["esm", "cjs"],
      dts: true,
      sourcemap: true,
      clean: false,
      splitting: false,
      injectStyle: false,
      banner: {
        js: "'use client';",
      },
      external: EXTERNAL,
    },
    // 3. Universal / Server-Safe Utilities (Zero 'use client' directive)
    {
      entry: {
        utils: "src/utils.ts",
      },
      format: ["esm", "cjs"],
      dts: true,
      sourcemap: true,
      clean: false,
      splitting: false,
      injectStyle: false,
      external: EXTERNAL,
    },
  ];
});
