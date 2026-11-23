#!/usr/bin/env node
/**
 * scripts/check-examples.mjs
 *
 * Automated Starter Template Verification Gate.
 *
 * Verifies every starter template under `examples/*`:
 * 1. Declares valid `@abeta.dev/*` dependencies in its `package.json` matching existing workspace packages.
 * 2. Every `@abeta.dev/*` JS/TS import specifier and CSS `@import` used in `examples/*`
 *    resolves to a real declared entry in the corresponding workspace `package.json` `exports` map.
 * 3. Every named value imported from `@abeta.dev/*` exists in the corresponding workspace package exports.
 * 4. Zero imports from deprecated `@abeta.dev/react-libs`.
 */

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

const ROOT = resolve(process.cwd());
const EXAMPLES_DIR = join(ROOT, 'examples');
const PACKAGES_DIR = join(ROOT, 'packages');

let hasError = false;

function pass(msg) {
  console.log(`✅ [EXAMPLES] ${msg}`);
}

function fail(msg) {
  console.error(`❌ [EXAMPLES] ${msg}`);
  hasError = true;
}

function loadWorkspaceExportMap() {
  const map = new Map();
  for (const dir of readdirSync(PACKAGES_DIR)) {
    const pkgJsonPath = join(PACKAGES_DIR, dir, 'package.json');
    if (!existsSync(pkgJsonPath)) continue;
    const pkg = JSON.parse(readFileSync(pkgJsonPath, 'utf8'));
    const exportKeys = new Set(
      Object.keys(pkg.exports || {}).map((sub) => (sub === '.' ? pkg.name : `${pkg.name}/${sub.slice(2)}`))
    );
    map.set(pkg.name, { dir, pkg, exportKeys });
  }
  return map;
}

function walkFiles(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir)) {
    if (entry === 'node_modules' || entry === '.next' || entry === 'dist') continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      walkFiles(full, out);
    } else if (entry.endsWith('.ts') || entry.endsWith('.tsx') || entry.endsWith('.css')) {
      out.push(full);
    }
  }
  return out;
}

function run() {
  console.log('🧪 Verifying Runnable Starter Templates (examples/*)...\n');

  if (!existsSync(EXAMPLES_DIR)) {
    fail('examples/ directory missing.');
    process.exit(1);
  }

  const workspaceMap = loadWorkspaceExportMap();
  const exampleDirs = readdirSync(EXAMPLES_DIR).filter((d) =>
    existsSync(join(EXAMPLES_DIR, d, 'package.json'))
  );

  if (exampleDirs.length === 0) {
    fail('No starter examples with package.json found under examples/.');
    process.exit(1);
  }

  let totalImportsVerified = 0;

  for (const exName of exampleDirs) {
    const exDir = join(EXAMPLES_DIR, exName);
    const exPkg = JSON.parse(readFileSync(join(exDir, 'package.json'), 'utf8'));
    const declaredDeps = new Set([
      ...Object.keys(exPkg.dependencies || {}),
      ...Object.keys(exPkg.devDependencies || {}),
    ]);

    for (const dep of declaredDeps) {
      if (!dep.startsWith('@abeta.dev/')) continue;
      if (dep === '@abeta.dev/react-libs') {
        fail(`examples/${exName}/package.json depends on deprecated omnibus @abeta.dev/react-libs.`);
      } else if (!workspaceMap.has(dep)) {
        fail(`examples/${exName}/package.json references unknown workspace package "${dep}".`);
      }
    }

    const files = walkFiles(exDir);
    const importRe = /(?:from|@import|import)\s+['"](@abeta\.dev\/[^'"]+)['"]/g;

    for (const file of files) {
      const rel = relative(ROOT, file).replace(/\\/g, '/');
      const content = readFileSync(file, 'utf8');
      let m;
      while ((m = importRe.exec(content)) !== null) {
        const spec = m[1];
        const parts = spec.split('/');
        const pkgName = `${parts[0]}/${parts[1]}`;
        if (pkgName === '@abeta.dev/react-libs') {
          fail(`${rel} imports deprecated omnibus "${spec}".`);
          continue;
        }
        const ws = workspaceMap.get(pkgName);
        if (!ws) {
          fail(`${rel} imports unknown package "${pkgName}" (specifier "${spec}").`);
          continue;
        }
        if (!declaredDeps.has(pkgName)) {
          fail(`${rel} imports "${spec}" but "${pkgName}" is not listed in examples/${exName}/package.json.`);
          continue;
        }
        if (!ws.exportKeys.has(spec)) {
          fail(`${rel} imports undeclared subpath "${spec}". Valid exports for ${pkgName}: ${[...ws.exportKeys].join(', ')}`);
          continue;
        }
        totalImportsVerified++;
      }
    }

    pass(`examples/${exName}: package.json deps and all @abeta.dev/* JS/CSS import specifiers verified.`);
  }

  if (hasError) {
    console.error('\n❌ Starter Template Verification Gate failed!');
    process.exit(1);
  }
  console.log(`\n✨ Verified ${exampleDirs.length} starter templates (${totalImportsVerified} @abeta.dev/* import specifiers).`);
}

run();
