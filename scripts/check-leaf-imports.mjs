#!/usr/bin/env node
/**
 * scripts/check-leaf-imports.mjs
 *
 * Automated Leaf-Import Hygiene & Subpath Bundle Isolation Gate.
 *
 * Verifies:
 * 1. Source Import Hygiene:
 *    - Zero imports from deprecated `@abeta.dev/react-libs` inside `packages/*` or `examples/*`.
 *    - Zero barrel re-entry imports (`./index`, `../index`, `../../index`) inside `packages/ui/src/`.
 * 2. Compiled Leaf-Bundle Isolation:
 *    - Lightweight UI leaf bundles never transitively pull heavy optional peers
 *      (`pdfjs-dist`, `react-pdf`, `recharts`, `xlsx`, `jspdf`, `canvas-confetti`,
 *       `embla-carousel`, `cmdk`, `vaul` — except `vaul` in `drawer`).
 *    - Pure server / RSC / headless bundles (`packages/ui/dist/utils`, `packages/india/dist/index`,
 *      `packages/auth/dist/core`, `dist/utils`, `dist/india/index`, `dist/analytics/index`)
 *      never import `react`, `react-dom`, or `@abeta.dev/ui`.
 */

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

const ROOT = resolve(process.cwd());

const HEAVY_OPTIONAL_PEERS = [
  'pdfjs-dist',
  'react-pdf',
  'recharts',
  'xlsx',
  'jspdf',
  'canvas-confetti',
  'embla-carousel',
  'cmdk',
  'vaul',
];

const UI_LEAF_BUNDLES = [
  { file: 'button.js', allow: [] },
  { file: 'dialog.js', allow: [] },
  { file: 'card.js', allow: [] },
  { file: 'badge.js', allow: [] },
  { file: 'input.js', allow: [] },
  { file: 'table.js', allow: [] },
  { file: 'select.js', allow: [] },
  { file: 'form.js', allow: [] },
  { file: 'sheet.js', allow: [] },
  { file: 'drawer.js', allow: ['vaul'] },
  { file: 'popover.js', allow: [] },
  { file: 'tooltip.js', allow: [] },
  { file: 'utils.js', allow: [] },
];

const SERVER_PURE_BUNDLES = [
  'packages/ui/dist/utils.js',
  'packages/ui/dist/utils.cjs',
  'packages/india/dist/index.js',
  'packages/india/dist/index.cjs',
  'packages/auth/dist/core.js',
  'packages/auth/dist/core.cjs',
  'dist/utils.js',
  'dist/utils.cjs',
  'dist/india/index.js',
  'dist/india/index.cjs',
  'dist/analytics/index.js',
  'dist/analytics/index.cjs',
];

let hasError = false;

function pass(msg) {
  console.log(`✅ [LEAF-GATE] ${msg}`);
}

function fail(msg) {
  console.error(`❌ [LEAF-GATE] ${msg}`);
  hasError = true;
}

function walkFiles(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir)) {
    if (entry === 'node_modules' || entry === 'dist' || entry === '.next' || entry === '__tests__') continue;
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      walkFiles(full, out);
    } else if (
      (entry.endsWith('.ts') || entry.endsWith('.tsx')) &&
      !entry.endsWith('.test.ts') &&
      !entry.endsWith('.test.tsx') &&
      !entry.endsWith('.stories.ts') &&
      !entry.endsWith('.stories.tsx')
    ) {
      out.push(full);
    }
  }
  return out;
}

function checkSourceImports() {
  console.log('🔍 [1/2] Checking Source Leaf-Import Hygiene across packages/* and examples/*...');

  const workspaceDirs = ['packages/ui/src', 'packages/india/src', 'packages/talent/src', 'packages/auth/src', 'examples'];
  const omnibusImportRe = /(?:from|import)\s+['"]@abeta\.dev\/react-libs['"/]/;
  const barrelReentryRe = /(?:from|import)\s+['"](?:\.\/index|\.\.\/index|\.\.\/\.\.\/index)['"]/;

  let checkedFiles = 0;

  for (const relDir of workspaceDirs) {
    const absDir = join(ROOT, relDir);
    const files = walkFiles(absDir);
    for (const file of files) {
      checkedFiles++;
      const relFile = relative(ROOT, file).replace(/\\/g, '/');
      const content = readFileSync(file, 'utf8');

      if (omnibusImportRe.test(content)) {
        fail(`${relFile} imports deprecated omnibus '@abeta.dev/react-libs'. Use scoped leaf packages instead.`);
      }

      if (relFile.startsWith('packages/ui/src/') && relFile !== 'packages/ui/src/index.ts') {
        if (barrelReentryRe.test(content)) {
          fail(`${relFile} re-enters the package barrel ('./index' / '../index'). Import sibling leaf modules directly.`);
        }
      }
    }
  }

  if (!hasError) {
    pass(`Scanned ${checkedFiles} workspace & example source files: 0 omnibus imports, 0 UI barrel re-entries.`);
  }
}

function checkCompiledLeafBundles() {
  console.log('\n🔍 [2/2] Checking Compiled Leaf-Bundle Isolation & Server Purity...');

  let leafChecked = 0;
  for (const baseDir of ['packages/ui/dist', 'dist']) {
    if (!existsSync(join(ROOT, baseDir))) continue;
    for (const { file, allow } of UI_LEAF_BUNDLES) {
      const fullPath = join(ROOT, baseDir, file);
      if (!existsSync(fullPath)) continue;
      leafChecked++;
      const content = readFileSync(fullPath, 'utf8');
      const leaked = HEAVY_OPTIONAL_PEERS.filter((peer) => !allow.includes(peer) && content.includes(peer));
      if (leaked.length > 0) {
        fail(`${baseDir}/${file} leaks heavy optional peer(s): ${leaked.join(', ')}`);
      }
    }
  }
  if (!hasError) {
    pass(`Verified ${leafChecked} compiled leaf bundles: 0 heavy optional peer leaks.`);
  }

  const esmReactRe = /from\s+['"]react(?:-dom)?['"/]/;
  const cjsReactRe = /require\(['"]react(?:-dom)?['"/]/;
  let serverChecked = 0;
  for (const relPath of SERVER_PURE_BUNDLES) {
    const fullPath = join(ROOT, relPath);
    if (!existsSync(fullPath)) {
      fail(`Expected compiled server/universal bundle missing: ${relPath} (run npm run build:packages && npm run build)`);
      continue;
    }
    serverChecked++;
    const content = readFileSync(fullPath, 'utf8');
    if (esmReactRe.test(content) || cjsReactRe.test(content) || content.includes('@abeta.dev/ui')) {
      fail(`${relPath} imports React/DOM or @abeta.dev/ui in a universal server-safe bundle!`);
    }
  }
  if (!hasError) {
    pass(`Verified ${serverChecked} compiled universal/server bundles: 0 React/DOM/UI leaks.`);
  }
}

checkSourceImports();
checkCompiledLeafBundles();

if (hasError) {
  console.error('\n❌ Leaf-Import CI Gate failed!');
  process.exit(1);
}
console.log('\n✨ Automated Leaf-Import CI Gate passed cleanly!');
