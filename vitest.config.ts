import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    // Controlled worker concurrency matching standard 2-vCPU CI runners to prevent process contention
    maxWorkers: 2,
    testTimeout: 20000,
    hookTimeout: 20000,
    setupFiles: ['./src/test/setup.ts'],
    include: [
      'src/**/__tests__/**/*.test.{ts,tsx}',
      'src/**/*.test.{ts,tsx}',
      'packages/auth/src/**/__tests__/**/*.test.{ts,tsx}',
      'packages/analytics/src/**/__tests__/**/*.test.{ts,tsx}',
      'packages/mcp/src/**/__tests__/**/*.test.{ts,tsx}',
    ],
    exclude: [
      'src/**/*.stories.{ts,tsx}',
      'node_modules/**',
    ],
    coverage: {
      provider: 'v8',
      clean: false,
      reporter: ['text', 'json-summary', 'html'],
      reportsDirectory: './coverage',
      include: [
        'src/components/ui/**',
        'src/lib/**',
        'src/hooks/**',
        'src/india/**',
        'src/utils.ts',
        'packages/auth/src/**',
        'packages/analytics/src/**',
        'packages/mcp/src/**',
      ],
      exclude: [
        'src/**/*.stories.{ts,tsx}',
        'src/stories/**',
        'src/test/**',
        'src/**/*.d.ts',
        'packages/mcp/src/cli.ts',
        '**/*.css',
        'node_modules/**',
      ],
      thresholds: {
        statements: 80,
        branches: 70,
        functions: 80,
        lines: 80,
      },
    },
  },
});