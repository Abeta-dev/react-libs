import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = join(__dirname, '..', '..');
const DIST_STYLE_CSS = join(ROOT, 'dist', 'style.css');

describe('CSS Layer Encapsulation (@layer react-libs)', () => {

  it('dist/style.css exists and is non-empty', () => {
    expect(existsSync(DIST_STYLE_CSS)).toBe(true);
    const stats = statSync(DIST_STYLE_CSS);
    expect(stats.size).toBeGreaterThan(10000);
  });

  it('dist/style.css starts with or contains @layer react-libs {', () => {
    const content = readFileSync(DIST_STYLE_CSS, 'utf8');
    const hasLayerDeclaration =
      content.startsWith('@layer react-libs') || content.includes('@layer react-libs {');
    expect(hasLayerDeclaration).toBe(true);
  });

  it('dist/style.css properly closes the @layer block', () => {
    const content = readFileSync(DIST_STYLE_CSS, 'utf8');
    const trimmed = content.trim();
    expect(trimmed.endsWith('}')).toBe(true);
  });

  it('preserves utility classes like flex within the layer', () => {
    const content = readFileSync(DIST_STYLE_CSS, 'utf8');
    expect(content).toContain('flex');
  });

  it('preserves theme CSS variables like --background and --primary within the layer', () => {
    const content = readFileSync(DIST_STYLE_CSS, 'utf8');
    expect(content).toContain('--background');
    expect(content).toContain('--primary');
  });
});
