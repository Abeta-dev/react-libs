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
});
