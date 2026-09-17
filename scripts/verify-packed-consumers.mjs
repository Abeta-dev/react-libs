#!/usr/bin/env node
/**
 * Build both publishable tarballs and install them into a fresh, non-workspace
 * fixture. This catches exports or dependency relationships hidden by npm
 * workspace links. The root fixture deliberately omits @abeta.dev/auth, proving
 * the root package's auth subpath has no registry/runtime dependency.
 */

import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { basename, join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = resolve(process.cwd());
const scratch = mkdtempSync(join(tmpdir(), 'react-libs-packed-consumer-'));
const tarballs = join(scratch, 'tarballs');
const fixture = join(scratch, 'fixture');

function run(command, args, cwd = root) {
  const result = spawnSync(command, args, { cwd, encoding: 'utf8', stdio: 'pipe' });
  if (result.status !== 0) {
    process.stderr.write(result.stdout);
    process.stderr.write(result.stderr);
    throw new Error(`${command} ${args.join(' ')} failed with exit code ${result.status}`);
  }
  return result.stdout;
}

function pack(cwd) {
  const output = run('npm', ['pack', '--ignore-scripts', '--json', '--pack-destination', tarballs], cwd);
  const result = JSON.parse(output);
  if (!Array.isArray(result) || !result[0]?.filename) throw new Error(`npm pack returned no tarball for ${cwd}`);
  return join(tarballs, result[0].filename);
}

try {
  mkdirSync(tarballs);
  const authTarball = pack(join(root, 'packages/auth'));
  const rootTarball = pack(root);
  const authPackage = JSON.parse(readFileSync(join(root, 'packages/auth/package.json'), 'utf8'));
  const rootPackage = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));

  mkdirSync(fixture);
  writeFileSync(join(fixture, 'package.json'), `${JSON.stringify({
    name: 'packed-react-libs-consumer',
    private: true,
    type: 'module',
    // Install peer dependencies explicitly: package managers do not guarantee an
    // external consumer has optional peers, but importing the root barrel loads
    // every externally-declared module.
    dependencies: {
      ...rootPackage.peerDependencies,
      ...authPackage.peerDependencies,
      [rootPackage.name]: `file:${rootTarball}`,
    },
  }, null, 2)}\n`);
  run('npm', ['install', '--ignore-scripts', '--no-audit', '--no-fund'], fixture);
  run('node', ['--input-type=module', '--eval', `
    await import(${JSON.stringify(rootPackage.name)});
    const auth = await import(${JSON.stringify(`${rootPackage.name}/auth`)});
    if (typeof auth.AuthClient !== 'function') throw new Error('Bundled root auth entrypoint is incomplete.');
    console.log('Packed external consumer imports passed.');
  `], fixture);
  run('node', ['--input-type=module', '--eval', `
    import { readFileSync } from 'node:fs';
    import { createRequire } from 'node:module';
    const require = createRequire(import.meta.url);
    const rootEntry = require.resolve(${JSON.stringify(rootPackage.name)});
    const rootManifest = JSON.parse(readFileSync(new URL('../package.json', new URL('file://' + rootEntry)).pathname, 'utf8'));
    if (rootManifest.dependencies?.[${JSON.stringify(authPackage.name)}]) throw new Error('Root package still declares a registry auth dependency.');
    const auth = readFileSync(require.resolve(${JSON.stringify(`${rootPackage.name}/auth`)}), 'utf8');
    const hasClientDirective = (source) => [String.fromCharCode(34), String.fromCharCode(39)].some((quote) => source.trimStart().startsWith(quote + 'use client' + quote));
    if (!hasClientDirective(auth)) throw new Error('Bundled root auth output is missing its client directive.');
    if (/from ['\\\"]@abeta\\.dev\\/auth|require\\(['\\\"]@abeta\\.dev\\/auth/.test(auth)) throw new Error('Bundled root auth output imports the registry package.');
    console.log('Packed self-contained auth assertions passed.');
  `], fixture);
  console.log(`✅ Packed external consumer verified self-contained ${basename(rootTarball)}; standalone ${basename(authTarball)} was packed separately.`);
} finally {
  rmSync(scratch, { recursive: true, force: true });
}
