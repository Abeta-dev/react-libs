#!/usr/bin/env node
/**
 * Verify immutable release metadata for both published packages.
 *
 * The root package must name an exact @abeta.dev/auth workspace version so its
 * tarball can only be published after that matching auth artifact is available.
 */

import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve(process.cwd());

function readJson(relativePath) {
  const path = join(root, relativePath);
  if (!existsSync(path)) throw new Error(`${relativePath} not found`);
  return JSON.parse(readFileSync(path, 'utf8'));
}

function topChangelogVersion(relativePath) {
  const path = join(root, relativePath);
  if (!existsSync(path)) throw new Error(`${relativePath} not found`);
  const match = readFileSync(path, 'utf8').match(/^##\s+\[v?([0-9]+\.[0-9]+\.[0-9]+[^\]]*)\]/m);
  if (!match?.[1]) throw new Error(`${relativePath} has no release heading`);
  return match[1].trim();
}

function fail(message) {
  console.error(`❌ ${message}`);
  process.exit(1);
}

try {
  const rootPackage = readJson('package.json');
  const authPackage = readJson('packages/auth/package.json');
  const requiredAuthVersion = rootPackage.dependencies?.[authPackage.name];

  if (topChangelogVersion('CHANGELOG.md') !== rootPackage.version) {
    fail(`package.json version ${rootPackage.version} does not match the top CHANGELOG.md release.`);
  }
  if (topChangelogVersion('packages/auth/CHANGELOG.md') !== authPackage.version) {
    fail(`packages/auth/package.json version ${authPackage.version} does not match its top changelog release.`);
  }
  if (requiredAuthVersion !== authPackage.version) {
    fail(`${rootPackage.name} must depend on ${authPackage.name} with the exact workspace version ${authPackage.version}; found ${requiredAuthVersion ?? 'no dependency'}.`);
  }

  const refType = process.env.GITHUB_REF_TYPE;
  const refName = process.env.GITHUB_REF_NAME;
  const githubRef = process.env.GITHUB_REF ?? '';
  const isTagBuild = refType === 'tag' || githubRef.startsWith('refs/tags/') || Boolean(refName && /^v?\d+\.\d+\.\d+/.test(refName));
  if (isTagBuild && refName && refName.replace(/^v/, '') !== rootPackage.version) {
    fail(`Git tag ${refName} does not match root package version ${rootPackage.version}.`);
  }

  console.log(`✅ ${authPackage.name}@${authPackage.version} changelog and manifest agree.`);
  console.log(`✅ ${rootPackage.name}@${rootPackage.version} pins ${authPackage.name}@${authPackage.version}.`);
  if (isTagBuild && refName) console.log(`✅ Git tag ${refName} matches the root package version.`);
} catch (error) {
  fail(error instanceof Error ? error.message : String(error));
}
