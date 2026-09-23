import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "src/index.ts",
    "src/forms/button.tsx",
    "src/overlays/dialog.tsx",
    "src/layout/card.tsx",
    "src/data-display/badge.tsx",
    "src/forms/input.tsx",
    "src/data-display/data-table.tsx",
    "src/data-display/table.tsx",
    "src/forms/select.tsx",
    "src/forms/form.tsx",
    "src/overlays/sheet.tsx",
    "src/overlays/drawer.tsx",
    "src/core/popover.tsx",
    "src/overlays/tooltip.tsx",
    "src/core/calendar.tsx",
    "src/core/date-range-picker.tsx",
    "src/overlays/command.tsx",
    "src/data-display/chart.tsx",
    "src/data-display/carousel.tsx"
  ],
  format: ["cjs", "esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"],
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";'
    };
  }
});
