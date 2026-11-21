#!/usr/bin/env node
/**
 * packages/ui/scripts/build-css.mjs
 *
 * Standalone CSS Architecture Build Script for @abeta.dev/ui:
 * 1. Copies src/styles/theme.css -> dist/theme.css for Tailwind CSS v4 consumers.
 * 2. Compiles src/styles/tailwind-bundle.css -> dist/style.css using @tailwindcss/cli with --minify.
 * 3. Appends dist/index.css (extracted by tsup for component styles such as calendar.css) if present.
 * 4. Encapsulates dist/style.css inside @layer abeta-ui { ... }.
 * 5. Verifies dist/style.css and dist/theme.css exist and contain --primary, --background, and flex.
 */

import { execSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync, appendFileSync, statSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PKG_ROOT = join(__dirname, '..');
const MONOREPO_ROOT = join(PKG_ROOT, '..', '..');
const INPUT_CSS = join(PKG_ROOT, 'src', 'styles', 'tailwind-bundle.css');
const DIST_DIR = join(PKG_ROOT, 'dist');
const OUTPUT_CSS = join(DIST_DIR, 'style.css');
const INDEX_CSS = join(DIST_DIR, 'index.css');
const THEME_CSS = join(PKG_ROOT, 'src', 'styles', 'theme.css');
const OUTPUT_THEME_CSS = join(DIST_DIR, 'theme.css');

async function buildCss() {
  console.log('🎨 Starting @abeta.dev/ui CSS bundle build...');

  if (!existsSync(DIST_DIR)) {
    mkdirSync(DIST_DIR, { recursive: true });
  }

  // 1. Copy modular theme tokens for Tailwind v4 @source consumers
  if (!existsSync(THEME_CSS)) {
    console.error(`❌ Theme CSS file not found at ${THEME_CSS}`);
    process.exit(1);
  }
  console.log(`🎨 Emitting modular theme tokens ${THEME_CSS} -> ${OUTPUT_THEME_CSS}...`);
  writeFileSync(OUTPUT_THEME_CSS, readFileSync(THEME_CSS, 'utf8'), 'utf8');

  if (!existsSync(INPUT_CSS)) {
    console.error(`❌ Input CSS file not found at ${INPUT_CSS}`);
    process.exit(1);
  }

  // 2. Run @tailwindcss/cli to build tailwind-bundle.css -> dist/style.css
  const monorepoCli = join(MONOREPO_ROOT, 'node_modules', '.bin', 'tailwindcss');
  const pkgCli = join(PKG_ROOT, 'node_modules', '.bin', 'tailwindcss');
  const cliCommand = existsSync(monorepoCli)
    ? `"${monorepoCli}"`
    : existsSync(pkgCli)
      ? `"${pkgCli}"`
      : 'npx --yes @tailwindcss/cli';

  console.log(`⚡ Compiling ${INPUT_CSS} -> ${OUTPUT_CSS}...`);
  try {
    execSync(`${cliCommand} -i "${INPUT_CSS}" -o "${OUTPUT_CSS}" --minify`, {
      cwd: PKG_ROOT,
      stdio: ['ignore', 'inherit', 'inherit'],
    });
  } catch (error) {
    console.error('❌ Tailwind CLI compilation failed:', error.message);
    process.exit(1);
  }

  // 3. Append dist/index.css if extracted by tsup
  if (existsSync(INDEX_CSS)) {
    console.log('📦 Found dist/index.css, appending extracted styles to dist/style.css...');
    const indexCssContent = readFileSync(INDEX_CSS, 'utf8');
    if (indexCssContent.trim().length > 0) {
      appendFileSync(OUTPUT_CSS, `\n/* Component styles extracted by tsup */\n${indexCssContent}\n`);
    }
  } else {
    console.log('ℹ️  No dist/index.css found to append.');
  }

  // 4. Encapsulate entire bundle inside @layer abeta-ui
  console.log('🛡️  Encapsulating dist/style.css in @layer abeta-ui...');
  const compiledCss = readFileSync(OUTPUT_CSS, 'utf8');
  const layeredCss = `@layer abeta-ui {\n${compiledCss}\n}\n`;
  writeFileSync(OUTPUT_CSS, layeredCss, 'utf8');

  // 5. Verify dist/style.css and dist/theme.css
  if (!existsSync(OUTPUT_CSS)) {
    console.error(`❌ Output file ${OUTPUT_CSS} does not exist.`);
    process.exit(1);
  }
  if (!existsSync(OUTPUT_THEME_CSS)) {
    console.error(`❌ Output file ${OUTPUT_THEME_CSS} does not exist.`);
    process.exit(1);
  }

  const styleStats = statSync(OUTPUT_CSS);
  const styleSizeKb = (styleStats.size / 1024).toFixed(2);
  const styleContent = readFileSync(OUTPUT_CSS, 'utf8');

  const themeStats = statSync(OUTPUT_THEME_CSS);
  const themeSizeKb = (themeStats.size / 1024).toFixed(2);
  const themeContent = readFileSync(OUTPUT_THEME_CSS, 'utf8');

  if (!styleContent.startsWith('@layer abeta-ui')) {
    console.error('❌ Verification failed: dist/style.css is not encapsulated in @layer abeta-ui');
    process.exit(1);
  }

  if (!styleContent.trim().endsWith('}')) {
    console.error('❌ Verification failed: dist/style.css does not properly close the @layer block');
    process.exit(1);
  }

  const styleChecks = ['--primary', '--background', 'flex'];
  const missingStyle = styleChecks.filter((token) => !styleContent.includes(token));
  if (missingStyle.length > 0) {
    console.error(`❌ Verification failed: dist/style.css missing expected tokens/utilities (${missingStyle.join(', ')})`);
    process.exit(1);
  }

  const themeChecks = ['--primary', '--background'];
  const missingTheme = themeChecks.filter((token) => !themeContent.includes(token));
  if (missingTheme.length > 0) {
    console.error(`❌ Verification failed: dist/theme.css missing expected tokens (${missingTheme.join(', ')})`);
    process.exit(1);
  }

  if (styleStats.size < 10000) {
    console.error(`❌ Verification failed: dist/style.css size is suspiciously small (${styleSizeKb} KB)`);
    process.exit(1);
  }

  console.log(`✅ dist/style.css and dist/theme.css successfully generated and verified!`);
  console.log(`   dist/style.css: ${styleSizeKb} KB (${styleStats.size.toLocaleString()} bytes) [@layer abeta-ui]`);
  console.log(`   dist/theme.css: ${themeSizeKb} KB (${themeStats.size.toLocaleString()} bytes)`);
  console.log(`   Verified tokens & utilities: ${styleChecks.join(', ')} present.`);

  process.exit(0);
}

buildCss();
