import { defineConfig } from 'tsup';

/** Run after tsup.config.ts: it must never clean shared dist output. */
export default defineConfig({
  entry: { core: 'src/core/index.ts' },
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: false,
  splitting: false,
  external: ['react', 'react-dom', 'clsx'],
});
