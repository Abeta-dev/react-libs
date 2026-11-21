#!/usr/bin/env node
/**
 * Build all 5 publishable tarballs (@abeta.dev/ui, @abeta.dev/india,
 * @abeta.dev/talent, @abeta.dev/auth, and root @abeta.dev/react-libs) and
 * install them into fresh, non-workspace consumer fixtures.
 *
 * This catches exports, CSS asset packaging, directive boundaries, or
 * dependency relationships hidden by npm workspace links. It intentionally
 * uses local tarballs + npm overrides so registry credentials and unpublished
 * versions are never needed for verification.
 */

import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { basename, join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = resolve(process.cwd());
const scratch = mkdtempSync(join(tmpdir(), 'react-libs-packed-consumer-'));
const tarballs = join(scratch, 'tarballs');
const indiaFixture = join(scratch, 'fixture-india-backend');
const fullFixture = join(scratch, 'fixture-full-react');

function run(command, args, cwd = root) {
  const result = spawnSync(command, args, { cwd, encoding: 'utf8', stdio: 'pipe' });
  if (result.status !== 0) {
    if (result.stdout) process.stderr.write(result.stdout);
    if (result.stderr) process.stderr.write(result.stderr);
    throw new Error(`${command} ${args.join(' ')} failed with exit code ${result.status}`);
  }
  return result.stdout;
}

function pack(cwd) {
  const output = run('npm', ['pack', '--ignore-scripts', '--json', '--pack-destination', tarballs], cwd);
  const result = JSON.parse(output);
  if (!Array.isArray(result) || !result[0]?.filename) {
    throw new Error(`npm pack returned no tarball for ${cwd}`);
  }
  return join(tarballs, result[0].filename);
}

function readPackageJson(relativePath) {
  return JSON.parse(readFileSync(join(root, relativePath), 'utf8'));
}

try {
  mkdirSync(tarballs);

  const uiTarball = pack(join(root, 'packages/ui'));
  const indiaTarball = pack(join(root, 'packages/india'));
  const talentTarball = pack(join(root, 'packages/talent'));
  const authTarball = pack(join(root, 'packages/auth'));
  const rootTarball = pack(root);

  const uiPackage = readPackageJson('packages/ui/package.json');
  const indiaPackage = readPackageJson('packages/india/package.json');
  const talentPackage = readPackageJson('packages/talent/package.json');
  const authPackage = readPackageJson('packages/auth/package.json');
  const rootPackage = readPackageJson('package.json');

  // ── Fixture 1: Zero-bloat pure backend consumer of @abeta.dev/india ────────
  // Installs ONLY @abeta.dev/india (no @abeta.dev/ui, no react) to prove that
  // Node.js / RSC / Edge consumers can validate GSTIN and compute GST splits
  // with zero React or UI dependency bloat.
  mkdirSync(indiaFixture);
  writeFileSync(
    join(indiaFixture, 'package.json'),
    `${JSON.stringify(
      {
        name: 'packed-india-backend-consumer',
        private: true,
        type: 'module',
        dependencies: {
          [indiaPackage.name]: `file:${indiaTarball}`,
        },
      },
      null,
      2
    )}\n`
  );

  run('npm', ['install', '--ignore-scripts', '--no-audit', '--no-fund'], indiaFixture);

  writeFileSync(
    join(indiaFixture, 'verify.mjs'),
    `import { existsSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const indiaPkgName = ${JSON.stringify(indiaPackage.name)};

// 1. Assert zero React / @abeta.dev/ui bloat in node_modules
if (existsSync(join(process.cwd(), 'node_modules', 'react'))) {
  throw new Error(\`Zero-bloat regression: \${indiaPkgName} unexpectedly pulled in "react".\`);
}
if (existsSync(join(process.cwd(), 'node_modules', '@abeta.dev', 'ui'))) {
  throw new Error(\`Zero-bloat regression: \${indiaPkgName} unexpectedly pulled in "@abeta.dev/ui".\`);
}

// 2. Assert pure ESM import and runtime execution in Node.js
const india = await import(indiaPkgName);
if (typeof india.validateGSTIN !== 'function') {
  throw new Error(\`\${indiaPkgName} did not export validateGSTIN.\`);
}
const validGstinError = india.validateGSTIN('27AAPFU0939F1ZV');
if (validGstinError !== undefined) {
  throw new Error(\`validateGSTIN('27AAPFU0939F1ZV') unexpectedly returned error: \${validGstinError}\`);
}
const invalidGstinError = india.validateGSTIN('INVALID');
if (typeof invalidGstinError !== 'string' || invalidGstinError.length === 0) {
  throw new Error(\`validateGSTIN('INVALID') did not return a validation message.\`);
}

const calculateGst = india.calculateGSTSplit ?? india.calculateGstSplit;
if (typeof calculateGst !== 'function') {
  throw new Error(\`\${indiaPkgName} did not export calculateGSTSplit.\`);
}
const split = calculateGst(1000, 18, false);
if (
  !split ||
  split.baseAmount !== 1000 ||
  split.totalTax !== 180 ||
  split.igstAmount !== 180 ||
  split.cgstAmount !== 0 ||
  split.sgstAmount !== 0 ||
  split.totalPayable !== 1180
) {
  throw new Error(\`Unexpected GST split result: \${JSON.stringify(split)}\`);
}

// 3. Assert dist/index.js (ESM) and dist/index.cjs (CJS) have NO 'use client' directive
const esmEntry = fileURLToPath(import.meta.resolve(indiaPkgName));
const cjsEntry = require.resolve(indiaPkgName);
for (const [format, entryPath] of [['ESM', esmEntry], ['CJS', cjsEntry]]) {
  const source = readFileSync(entryPath, 'utf8');
  if (/['"]use client['"]/.test(source)) {
    throw new Error(\`\${indiaPkgName} (\${format}: \${entryPath}) unexpectedly contains a 'use client' directive.\`);
  }
}

console.log('✅ Fixture 1 passed: pure backend @abeta.dev/india verified (zero bloat, no client directive).');
`
  );
  run('node', ['verify.mjs'], indiaFixture);

  // ── Fixture 2: Full React consumer of all 5 tarballs ───────────────────────
  // Maps all 4 scoped packages in BOTH dependencies and overrides to local
  // file: tarballs so npm resolves unpublished monorepo versions cleanly
  // without attempting to fetch them from registry.npmjs.org.
  mkdirSync(fullFixture);
  const localScopedTarballs = {
    [uiPackage.name]: `file:${uiTarball}`,
    [indiaPackage.name]: `file:${indiaTarball}`,
    [talentPackage.name]: `file:${talentTarball}`,
    [authPackage.name]: `file:${authTarball}`,
  };

  writeFileSync(
    join(fullFixture, 'package.json'),
    `${JSON.stringify(
      {
        name: 'packed-react-libs-full-consumer',
        private: true,
        type: 'module',
        // Install peer dependencies explicitly: package managers do not guarantee an
        // external consumer has optional peers, but importing the root and UI barrels
        // loads every externally-declared module. Local tarball entries come last so
        // they always take precedence over any scoped package listed in peers.
        dependencies: {
          ...uiPackage.peerDependencies,
          ...indiaPackage.peerDependencies,
          ...talentPackage.peerDependencies,
          ...authPackage.peerDependencies,
          ...rootPackage.peerDependencies,
          ...localScopedTarballs,
          [rootPackage.name]: `file:${rootTarball}`,
        },
        overrides: {
          ...localScopedTarballs,
        },
      },
      null,
      2
    )}\n`
  );

  run('npm', ['install', '--ignore-scripts', '--no-audit', '--no-fund'], fullFixture);

  writeFileSync(
    join(fullFixture, 'verify.mjs'),
    `import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const uiPkgName = ${JSON.stringify(uiPackage.name)};
const indiaPkgName = ${JSON.stringify(indiaPackage.name)};
const talentPkgName = ${JSON.stringify(talentPackage.name)};
const authPkgName = ${JSON.stringify(authPackage.name)};
const rootPkgName = ${JSON.stringify(rootPackage.name)};

const startsWithClientDirective = (source) =>
  ["'", '"'].some((quote) => source.trimStart().startsWith(\`\${quote}use client\${quote}\`));
const containsClientDirective = (source) => /['"]use client['"]/.test(source);

// 1. Verify runtime ESM imports across all 5 packages
const importTargets = [
  uiPkgName,
  \`\${uiPkgName}/utils\`,
  \`\${uiPkgName}/button\`,
  \`\${uiPkgName}/dialog\`,
  \`\${uiPkgName}/hooks/use-toast\`,
  indiaPkgName,
  \`\${indiaPkgName}/react\`,
  talentPkgName,
  authPkgName,
  \`\${authPkgName}/core\`,
  \`\${authPkgName}/react\`,
  \`\${authPkgName}/core/use-click-backpressure\`,
  rootPkgName,
  \`\${rootPkgName}/auth\`,
];

for (const specifier of importTargets) {
  await import(specifier);
}
console.log(\`✅ Fixture 2 imports passed across all \${importTargets.length} subpaths.\`);

// 2. Verify @abeta.dev/ui CSS exports resolve and ship design tokens
for (const cssSubpath of [\`\${uiPkgName}/style.css\`, \`\${uiPkgName}/theme.css\`]) {
  const cssPath = require.resolve(cssSubpath);
  const cssContent = readFileSync(cssPath, 'utf8');
  if (!cssContent.includes('--primary')) {
    throw new Error(\`CSS export "\${cssSubpath}" (\${cssPath}) is missing required "--primary" design token.\`);
  }
}
console.log('✅ Fixture 2 CSS exports passed (@abeta.dev/ui/style.css and theme.css contain --primary).');

// 3. Verify directive boundaries on BOTH ESM and CJS outputs
const clientEntrypoints = [
  uiPkgName,
  \`\${uiPkgName}/button\`,
  \`\${uiPkgName}/dialog\`,
  \`\${uiPkgName}/hooks/use-toast\`,
  \`\${indiaPkgName}/react\`,
  talentPkgName,
  authPkgName,
  \`\${authPkgName}/react\`,
  \`\${authPkgName}/core/use-click-backpressure\`,
  rootPkgName,
  \`\${rootPkgName}/auth\`,
];

const universalEntrypoints = [
  \`\${uiPkgName}/utils\`,
  indiaPkgName,
  \`\${authPkgName}/core\`,
];

for (const specifier of clientEntrypoints) {
  const esmPath = fileURLToPath(import.meta.resolve(specifier));
  const cjsPath = require.resolve(specifier);
  for (const [format, filePath] of [['ESM', esmPath], ['CJS', cjsPath]]) {
    const source = readFileSync(filePath, 'utf8');
    if (!startsWithClientDirective(source)) {
      throw new Error(\`Client entrypoint "\${specifier}" (\${format}: \${filePath}) is missing a leading 'use client' directive.\`);
    }
  }
}

for (const specifier of universalEntrypoints) {
  const esmPath = fileURLToPath(import.meta.resolve(specifier));
  const cjsPath = require.resolve(specifier);
  for (const [format, filePath] of [['ESM', esmPath], ['CJS', cjsPath]]) {
    const source = readFileSync(filePath, 'utf8');
    if (containsClientDirective(source)) {
      throw new Error(\`Universal/server entrypoint "\${specifier}" (\${format}: \${filePath}) unexpectedly contains a 'use client' directive.\`);
    }
  }
}

console.log('✅ Fixture 2 directive boundaries passed across all 5 packages (ESM & CJS).');
`
  );
  run('node', ['verify.mjs'], fullFixture);

  const verifiedTarballs = [uiTarball, indiaTarball, talentTarball, authTarball, rootTarball].map((t) => basename(t));
  console.log(`✅ Packed external consumers verified all 5 tarballs: ${verifiedTarballs.join(', ')}.`);
} finally {
  rmSync(scratch, { recursive: true, force: true });
}
