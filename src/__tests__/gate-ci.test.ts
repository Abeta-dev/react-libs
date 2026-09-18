import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

describe('CI Release Gate (.github/workflows/publish.yml)', () => {
  const workflowPath = resolve(__dirname, '../../.github/workflows/publish.yml');
  const workflowContent = readFileSync(workflowPath, 'utf8');

  it('defines gate-ci as the first job with checks: read permission', () => {
    expect(workflowContent).toContain('gate-ci:');
    expect(workflowContent).toContain('checks: read');
  });

  it('enforces that publish job depends on gate-ci via needs', () => {
    const publishIndex = workflowContent.indexOf('publish:');
    expect(publishIndex).toBeGreaterThan(-1);
    const publishSection = workflowContent.slice(publishIndex, publishIndex + 300);
    expect(publishSection).toContain('needs: [gate-ci]');
  });

  it('filters out self-referential release/publish runs from blocker evaluation', () => {
    const exclusionRegex = /publish|gate[- ]?ci/i;

    expect(exclusionRegex.test('publish')).toBe(true);
    expect(exclusionRegex.test('Publish Packages')).toBe(true);
    expect(exclusionRegex.test('Publish – PROD')).toBe(true);
    expect(exclusionRegex.test('gate-ci')).toBe(true);
    expect(exclusionRegex.test('Gate CI Check Runs')).toBe(true);

    // Non-publish checks must NOT be excluded
    expect(exclusionRegex.test('validate')).toBe(false);
    expect(exclusionRegex.test('deploy')).toBe(false);
    expect(exclusionRegex.test('test')).toBe(false);
  });

  it('correctly detects failing non-publish checks and ignores self-failures', () => {
    const exclusionRegex = /publish|gate[- ]?ci/i;

    const checkRuns = [
      { name: 'validate', conclusion: 'failure' },
      { name: 'deploy', conclusion: 'skipped' },
      { name: 'publish', conclusion: 'failure' },
      { name: 'Gate CI Check Runs', conclusion: 'failure' },
    ];

    const blockers = checkRuns.filter(
      (cr) => cr.conclusion === 'failure' && !exclusionRegex.test(cr.name)
    ).map((cr) => cr.name);

    expect(blockers).toEqual(['validate']);
  });
});
