import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { defineConfig } from 'tsup';

/** React-facing bundles are built first and own cleaning the output directory. */
export default defineConfig({
  entry: {
    index: 'src/index.ts',
    react: 'src/react.ts',
    'core/use-click-backpressure': 'src/core/use-click-backpressure.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  splitting: false,
  banner: { js: "'use client';" },
  external: ['react', 'react-dom', 'clsx'],
  async onSuccess() {
    for (const file of readdirSync('dist')) {
      if (!file.endsWith('.js') && !file.endsWith('.cjs')) continue;
      if (file === 'core.js' || file === 'core.cjs') continue;
      const fullPath = join('dist', file);
      const content = readFileSync(fullPath, 'utf8');
      const cleaned = content.replace(
        /^('use client';\r?\n(?:"use strict";\r?\n)?)(?:["']use client["'];?\r?\n?)/,
        '$1',
      );
      if (cleaned !== content) {
        writeFileSync(fullPath, cleaned, 'utf8');
      }
    }
  },
});
