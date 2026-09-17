#!/usr/bin/env node
/**
 * Build both publishable tarballs and install them into a fresh, non-workspace
 * fixture. This catches exports or dependency relationships hidden by npm
 * workspace links. It intentionally uses local tarballs so registry credentials
 * are never needed for this verification.
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
      [authPackage.name]: `file:${authTarball}`,
      [rootPackage.name]: `file:${rootTarball}`,
    },
  }, null, 2)}\n`);
  run('npm', ['install', '--ignore-scripts', '--no-audit', '--no-fund'], fixture);
  run('node', ['--input-type=module', '--eval', `
    await import(${JSON.stringify(authPackage.name)});
    await import(${JSON.stringify(`${authPackage.name}/core/use-click-backpressure`)});
    await import(${JSON.stringify(rootPackage.name)});
    await import(${JSON.stringify(`${rootPackage.name}/auth`)});
    console.log('Packed external consumer imports passed.');
  `], fixture);
  console.log(`✅ Packed external consumer verified ${basename(authTarball)} and ${basename(rootTarball)}.`);
} finally {
  rmSync(scratch, { recursive: true, force: true });
}
