#!/usr/bin/env node
/**
 * scripts/verify-directives.mjs
 *
 * Verifies directive placement and universal module safety:
 * 1. 'use client'; must be the literal first token of client entry points:
 *    - dist/index.js
 *    - dist/pdf.js
 *    - dist/hooks/use-toast.js
 *    - dist/india/react/index.js
 * 2. 'use client' must be ABSENT from universal/server modules:
 *    - dist/utils.js
 *    - dist/analytics/index.js
 *    - dist/india/index.js
 * 3. No stray hashed DTS chunk files (e.g., use-toast-*.d.ts) are present in dist.
 */

import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DIST_DIR = join(ROOT, 'dist');

const CLIENT_FILES = [
  'dist/index.js',
  'dist/index.cjs',
  'dist/pdf.js',
  'dist/pdf.cjs',
  'dist/hooks/use-toast.js',
  'dist/hooks/use-toast.cjs',
  'dist/india/react/index.js',
  'dist/india/react/index.cjs',
  'dist/analytics/react/index.js',
  'dist/analytics/react/index.cjs',
  'dist/button.js',
  'dist/button.cjs',
  'dist/dialog.js',
  'dist/dialog.cjs',
  'dist/card.js',
  'dist/card.cjs',
  'dist/badge.js',
  'dist/badge.cjs',
  'dist/input.js',
  'dist/input.cjs',
  'dist/data-table.js',
  'dist/data-table.cjs',
  'dist/charts.js',
  'dist/charts.cjs',
  'dist/command.js',
  'dist/command.cjs',
  'dist/drawer.js',
  'dist/drawer.cjs',
  'dist/carousel.js',
  'dist/carousel.cjs',
  'dist/calendar.js',
  'dist/calendar.cjs',
  'dist/date-picker.js',
  'dist/date-picker.cjs',
  'dist/form.js',
  'dist/form.cjs',
  'dist/auth.js',
  'dist/auth.cjs',
];

const UNIVERSAL_FILES = [
  'dist/utils.js',
  'dist/utils.cjs',
  'dist/analytics/index.js',
  'dist/analytics/index.cjs',
  'dist/india/index.js',
  'dist/india/index.cjs',
];

let failed = false;

console.log('🔍 Verifying module directives and packaging integrity...\n');

// 1. Verify Client Entry Points
for (const relPath of CLIENT_FILES) {
  const fullPath = join(ROOT, relPath);
  if (!existsSync(fullPath)) {
    console.error(`❌ [MISSING] File does not exist: ${relPath}`);
    failed = true;
    continue;
  }

  const content = readFileSync(fullPath, 'utf8');
  const trimmed = content.trimStart();

  if (trimmed.startsWith("'use client';") || trimmed.startsWith('"use client";')) {
    console.log(`✅ [CLIENT]  ${relPath} has 'use client' as literal first token.`);
  } else {
    console.error(`❌ [DIRECTIVE ERROR] ${relPath} does NOT start with 'use client';`);
    const preview = content.slice(0, 60).replace(/\n/g, '\\n');
    console.error(`   Actual start: "${preview}..."`);
    failed = true;
  }

  // Detect duplicate directives (e.g. injected banner + source directive)
  const occurrences = (content.match(/['"]use client['"]/g) || []).length;
  if (occurrences > 1) {
    console.error(`❌ [DUPLICATE DIRECTIVE] ${relPath} contains ${occurrences} 'use client' directives!`);
    failed = true;
  }
}

console.log('');

// 2. Verify Universal / Server Modules (zero 'use client' directive)
for (const relPath of UNIVERSAL_FILES) {
  const fullPath = join(ROOT, relPath);
  if (!existsSync(fullPath)) {
    console.error(`❌ [MISSING] File does not exist: ${relPath}`);
    failed = true;
    continue;
  }

  const content = readFileSync(fullPath, 'utf8');

  if (content.includes('use client')) {
    console.error(`❌ [LEAK ERROR] 'use client' directive leaked into universal module: ${relPath}`);
    failed = true;
  } else {
    console.log(`✅ [SERVER]  ${relPath} is free of 'use client' directives.`);
  }
}

console.log('');

// 3. Verify No Stray DTS Chunks in dist/
if (existsSync(DIST_DIR)) {
  const distFiles = readdirSync(DIST_DIR);
  const strayChunks = distFiles.filter((f) => /^use-toast-[A-Za-z0-9_-]+\.d\.(c)?ts$/.test(f));

  if (strayChunks.length > 0) {
    console.error(`❌ [DTS CHUNK ERROR] Stray hashed DTS chunks found in dist/: ${strayChunks.join(', ')}`);
    failed = true;
  } else {
    console.log('✅ [DTS]     No stray hashed DTS chunks found in dist/.');
  }
}

// 4. Verify Built CSS Artifacts in dist/
const CSS_FILES = ['dist/style.css'];
for (const relPath of CSS_FILES) {
  const fullPath = join(ROOT, relPath);
  if (!existsSync(fullPath)) {
    console.error(`❌ [MISSING] File does not exist: ${relPath}`);
    failed = true;
  } else {
    console.log(`✅ [CSS]     ${relPath} exists and is verified.`);
  }
}

// 5. Verify Scoped Monorepo Package Directives & CSS (when workspace packages are built)
const SCOPED_CHECKS = [
  {
    pkg: '@abeta.dev/ui',
    distDir: 'packages/ui/dist',
    clientFiles: [
      'packages/ui/dist/index.js',
      'packages/ui/dist/index.cjs',
      'packages/ui/dist/pdf.js',
      'packages/ui/dist/pdf.cjs',
      'packages/ui/dist/hooks/use-toast.js',
      'packages/ui/dist/hooks/use-toast.cjs',
    ],
    universalFiles: ['packages/ui/dist/utils.js', 'packages/ui/dist/utils.cjs'],
    cssFiles: ['packages/ui/dist/style.css', 'packages/ui/dist/theme.css'],
  },
  {
    pkg: '@abeta.dev/india',
    distDir: 'packages/india/dist',
    clientFiles: ['packages/india/dist/react/index.js', 'packages/india/dist/react/index.cjs'],
    universalFiles: ['packages/india/dist/index.js', 'packages/india/dist/index.cjs'],
    cssFiles: [],
  },
  {
    pkg: '@abeta.dev/talent',
    distDir: 'packages/talent/dist',
    clientFiles: ['packages/talent/dist/index.js', 'packages/talent/dist/index.cjs'],
    universalFiles: [],
    cssFiles: [],
  },
  {
    pkg: '@abeta.dev/auth',
    distDir: 'packages/auth/dist',
    clientFiles: [
      'packages/auth/dist/index.js',
      'packages/auth/dist/index.cjs',
      'packages/auth/dist/react.js',
      'packages/auth/dist/react.cjs',
    ],
    universalFiles: ['packages/auth/dist/core.js', 'packages/auth/dist/core.cjs'],
    cssFiles: [],
  },
  {
    pkg: '@abeta.dev/analytics',
    distDir: 'packages/analytics/dist',
    clientFiles: ['packages/analytics/dist/react/index.js', 'packages/analytics/dist/react/index.cjs'],
    universalFiles: ['packages/analytics/dist/index.js', 'packages/analytics/dist/index.cjs'],
    cssFiles: [],
  },
  {
    pkg: '@abeta.dev/mcp',
    distDir: 'packages/mcp/dist',
    clientFiles: [],
    universalFiles: ['packages/mcp/dist/index.js', 'packages/mcp/dist/index.cjs'],
    cssFiles: [],
  },
];

for (const scope of SCOPED_CHECKS) {
  if (!existsSync(join(ROOT, scope.distDir))) continue;
  console.log(`\n📦 Verifying ${scope.pkg} directives & outputs...`);

  for (const relPath of scope.clientFiles) {
    const fullPath = join(ROOT, relPath);
    if (!existsSync(fullPath)) {
      console.error(`❌ [MISSING] ${relPath}`);
      failed = true;
      continue;
    }
    const content = readFileSync(fullPath, 'utf8');
    const trimmed = content.trimStart();
    if (!trimmed.startsWith("'use client';") && !trimmed.startsWith('"use client";')) {
      console.error(`❌ [DIRECTIVE ERROR] ${relPath} does NOT start with 'use client';`);
      failed = true;
    } else if ((content.match(/['"]use client['"]/g) || []).length > 1) {
      console.error(`❌ [DUPLICATE DIRECTIVE] ${relPath} contains duplicate 'use client' directives!`);
      failed = true;
    } else {
      console.log(`✅ [CLIENT]  ${relPath} verified.`);
    }
  }

  for (const relPath of scope.universalFiles) {
    const fullPath = join(ROOT, relPath);
    if (!existsSync(fullPath)) {
      console.error(`❌ [MISSING] ${relPath}`);
      failed = true;
      continue;
    }
    const content = readFileSync(fullPath, 'utf8');
    if (content.includes('use client')) {
      console.error(`❌ [LEAK ERROR] 'use client' leaked into server-safe module: ${relPath}`);
      failed = true;
    } else {
      console.log(`✅ [SERVER]  ${relPath} is free of 'use client' directives.`);
    }
  }

  for (const relPath of scope.cssFiles) {
    if (!existsSync(join(ROOT, relPath))) {
      console.error(`❌ [MISSING CSS] ${relPath}`);
      failed = true;
    } else {
      console.log(`✅ [CSS]     ${relPath} exists and is verified.`);
    }
  }
}

console.log('');

if (failed) {
  console.error('❌ Directive and packaging verification failed!\n');
  process.exit(1);
}

console.log('✨ All directives and packaging assertions passed successfully!\n');
process.exit(0);
