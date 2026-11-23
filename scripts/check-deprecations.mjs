#!/usr/bin/env node
/**
 * scripts/check-deprecations.mjs
 *
 * Strict Deprecation Window & Sunset CI Gate.
 *
 * Verifies:
 * 1. deprecations.json exists and every entry has valid SemVer deprecatedSince,
 *    removeIn, replacement, and migrationDoc fields.
 * 2. Every deprecation honors the minimum grace window (>= minMinorWindow minors
 *    or a higher major release).
 * 3. Strict sunset enforcement: fails if current package.json version >= removeIn
 *    while an entry is still marked status === "active".
 * 4. Coverage enforcement: every @deprecated JSDoc occurrence in src/ and packages/
 *    (excluding dist/ and tests) is accounted for in deprecations.json.
 */

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

const ROOT = resolve(process.cwd());
const REGISTRY_PATH = join(ROOT, 'deprecations.json');
const PACKAGE_JSON_PATH = join(ROOT, 'package.json');

let hasError = false;

function pass(msg) {
  console.log(`✅ [DEPRECATION] ${msg}`);
}

function warn(msg) {
  console.warn(`⚠️  [DEPRECATION] ${msg}`);
}

function fail(msg) {
  console.error(`❌ [DEPRECATION] ${msg}`);
  hasError = true;
}

function parseSemver(ver) {
  const core = String(ver || '').trim().split('-')[0];
  const m = /^(\d+)\.(\d+)\.(\d+)$/.exec(core);
  if (!m) return null;
  return { major: Number(m[1]), minor: Number(m[2]), patch: Number(m[3]) };
}

function compareSemver(a, b) {
  if (a.major !== b.major) return a.major - b.major;
  if (a.minor !== b.minor) return a.minor - b.minor;
  return a.patch - b.patch;
}

function globToRegex(pattern) {
  const escaped = pattern
    .replace(/[.+^${}()|[\]\\]/g, '\\$&')
    .replace(/\*\*\//g, '(?:.+/)?')
    .replace(/\*\*/g, '.*')
    .replace(/\*/g, '[^/]*');
  return new RegExp(`^${escaped}$`);
}

function walkTsFiles(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir)) {
    if (entry === 'node_modules' || entry === 'dist' || entry === '__tests__' || entry === 'stories') continue;
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      walkTsFiles(full, out);
    } else if (
      (entry.endsWith('.ts') || entry.endsWith('.tsx')) &&
      !entry.endsWith('.test.ts') &&
      !entry.endsWith('.test.tsx') &&
      !entry.endsWith('.stories.ts') &&
      !entry.endsWith('.stories.tsx') &&
      !entry.endsWith('.d.ts')
    ) {
      out.push(full);
    }
  }
  return out;
}

function run() {
  console.log('🕰️  Running Strict Deprecation Window & Sunset Gate...\n');

  if (!existsSync(REGISTRY_PATH)) {
    fail('deprecations.json not found at repository root.');
    process.exit(1);
  }

  const pkg = JSON.parse(readFileSync(PACKAGE_JSON_PATH, 'utf8'));
  const current = parseSemver(pkg.version);
  if (!current) {
    fail(`Invalid root package.json version: ${pkg.version}`);
    process.exit(1);
  }

  const registry = JSON.parse(readFileSync(REGISTRY_PATH, 'utf8'));
  const minMinorWindow = registry.policy?.minMinorWindow ?? 2;
  const entries = Array.isArray(registry.entries) ? registry.entries : [];

  if (entries.length === 0) {
    fail('deprecations.json contains 0 entries while root package.json is marked deprecated.');
  }

  const compiledGlobs = [];
  const seenIds = new Set();

  for (const entry of entries) {
    if (!entry.id || seenIds.has(entry.id)) {
      fail(`Duplicate or missing deprecation id: ${entry.id}`);
      continue;
    }
    seenIds.add(entry.id);

    const since = parseSemver(entry.deprecatedSince);
    const removeIn = parseSemver(entry.removeIn);

    if (!since) fail(`[${entry.id}] invalid deprecatedSince SemVer: "${entry.deprecatedSince}"`);
    if (!removeIn) fail(`[${entry.id}] invalid removeIn SemVer: "${entry.removeIn}"`);
    if (!entry.replacement) fail(`[${entry.id}] missing replacement guidance`);
    if (!entry.migrationDoc) fail(`[${entry.id}] missing migrationDoc anchor`);

    const docFile = String(entry.migrationDoc || '').split('#')[0];
    if (docFile && !existsSync(join(ROOT, docFile))) {
      fail(`[${entry.id}] migrationDoc target file does not exist: ${docFile}`);
    }

    if (since && removeIn) {
      if (compareSemver(removeIn, since) <= 0) {
        fail(`[${entry.id}] removeIn (${entry.removeIn}) must be strictly greater than deprecatedSince (${entry.deprecatedSince})`);
      } else if (removeIn.major === since.major && removeIn.minor - since.minor < minMinorWindow) {
        fail(
          `[${entry.id}] deprecation window too short (${entry.deprecatedSince} -> ${entry.removeIn}); minimum is ${minMinorWindow} minor releases or next major.`
        );
      }

      if (entry.status === 'active') {
        if (compareSemver(current, removeIn) >= 0) {
          fail(
            `[${entry.id}] SUNSET EXPIRED! Current version ${pkg.version} >= removeIn ${entry.removeIn}. Remove "${entry.symbol}" or formally extend the sunset window.`
          );
        } else if (current.major === removeIn.major && removeIn.minor - current.minor <= 1) {
          warn(`[${entry.id}] "${entry.symbol}" approaches sunset in v${entry.removeIn} (current: v${pkg.version}).`);
        } else {
          pass(
            `[${entry.id}] ${entry.symbol} (since v${entry.deprecatedSince}, sunset v${entry.removeIn}) -> ${entry.replacement}`
          );
        }
      } else if (entry.status === 'removed') {
        pass(`[${entry.id}] ${entry.symbol} marked removed.`);
      } else {
        fail(`[${entry.id}] invalid status "${entry.status}" (expected "active" or "removed").`);
      }
    }

    for (const pattern of entry.fileGlobs || []) {
      compiledGlobs.push(globToRegex(pattern));
    }
  }

  // Verify every @deprecated tag in src/ and packages/ is covered by deprecations.json
  const sourceFiles = [
    ...walkTsFiles(join(ROOT, 'src')),
    ...walkTsFiles(join(ROOT, 'packages')),
  ];

  let deprecatedFileCount = 0;
  for (const file of sourceFiles) {
    const content = readFileSync(file, 'utf8');
    if (!content.includes('@deprecated')) continue;
    deprecatedFileCount++;
    const rel = relative(ROOT, file).replace(/\\/g, '/');
    const covered = compiledGlobs.some((re) => re.test(rel));
    if (!covered) {
      fail(`Untracked @deprecated annotation in "${rel}". Register a sunset window in deprecations.json.`);
    }
  }

  // Verify package.json "deprecated" field is tracked if present
  if (pkg.deprecated) {
    const covered = compiledGlobs.some((re) => re.test('package.json'));
    if (!covered) {
      fail('Root package.json declares "deprecated" but is not tracked in deprecations.json.');
    }
  }

  if (!hasError) {
    pass(`All ${deprecatedFileCount} source files with @deprecated annotations are tracked with valid sunset windows.`);
    console.log('\n✨ Deprecation Window & Sunset Gate passed cleanly!');
    process.exit(0);
  } else {
    console.error('\n❌ Deprecation Window & Sunset Gate failed!');
    process.exit(1);
  }
}

run();
