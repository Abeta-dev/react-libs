# Continuous Automated Visual Regression Testing Recipe
## Visual Testing Architecture for `@umesh0492/react-libs` Storybook Stories

This recipe provides a battle-tested architecture for setting up and running continuous automated visual regression testing across all 100+ UI component stories in `@umesh0492/react-libs`.

---

### Table of Contents

1. [Architectural Overview](#1-architectural-overview)
2. [Option A: Playwright Component Snapshot Testing (Self-Hosted)](#2-option-a-playwright-component-snapshot-testing-self-hosted)
   - [Installation & Setup](#installation--setup)
   - [Playwright Storybook Test Runner Configuration](#playwright-storybook-test-runner-configuration)
   - [Visual Diff Test Specification](#visual-diff-test-specification)
3. [Option B: Chromatic Cloud Testing (Managed PR Review Gate)](#3-option-b-chromatic-cloud-testing-managed-pr-review-gate)
   - [GitHub Action Step for Chromatic](#github-action-step-for-chromatic)
4. [Mitigating Visual Flakiness & Best Practices](#4-mitigating-visual-flakiness--best-practices)
   - [Font Loading Determinism](#font-loading-determinism)
   - [Freezing CSS Animations & Micro-Interactions](#freezing-css-animations--micro-interactions)
   - [Dual Theme Testing (Light & Dark Modes)](#dual-theme-testing-light--dark-modes)
5. [CI Integration Workflow](#5-ci-integration-workflow)

---

## 1. Architectural Overview

With 100% of all UI components documented in Storybook CSF 3 stories and 130 passing unit test files, visual regression testing forms the final layer of defense against styling regressions:

```
  ┌────────────────────────────────────────────────────────┐
  │                 CI Quality Pipeline                    │
  ├────────────────────────────────────────────────────────┤
  │ 1. Static Gate: tsc --noEmit, eslint --max-warnings 0  │
  │ 2. Directive & Subpath Gate: check:directives, attw    │
  │ 3. Logic & Unit Tests: vitest run --coverage (890 tests)│
  │ 4. Static Storybook Compilation: npm run build-storybook│
  │ 5. Visual Regression Gate: Playwright / Chromatic Diffs│ ◄── Visual Testing
  └────────────────────────────────────────────────────────┘
```

---

## 2. Option A: Playwright Component Snapshot Testing (Self-Hosted)

For teams desiring zero third-party cloud dependencies, Playwright test-runner can serve the pre-built `storybook-static` directory locally inside CI and capture pixel-perfect snapshot diffs.

### Installation & Setup

```bash
npm install -D @playwright/test serve
npx playwright install --with-deps chromium
```

### Playwright Storybook Test Runner Configuration

Create `playwright.visual.config.ts`:

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e/visual',
  snapshotDir: './e2e/visual/__snapshots__',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [['html', { outputFolder: 'playwright-report' }], ['list']],
  use: {
    baseURL: 'http://localhost:6006',
    trace: 'on-first-retry',
    viewport: { width: 1280, height: 720 },
  },
  webServer: {
    command: 'npx serve -l 6006 storybook-static',
    port: 6006,
    reuseExistingServer: !process.env.CI,
    timeout: 30000,
  },
  projects: [
    {
      name: 'chromium-desktop',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
});
```

### Visual Diff Test Specification

Create `e2e/visual/storybook-visual.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Component Visual Snapshots', () => {
  test.beforeEach(async ({ page }) => {
    // Wait for Storybook iframe preview to settle
    await page.goto('/iframe.html?id=core-button--default&viewMode=story');
    await page.evaluate(() => document.fonts.ready);
  });

  test('Button renders correctly in light mode', async ({ page }) => {
    await page.goto('/iframe.html?id=core-button--default&viewMode=story');
    await page.waitForSelector('button');
    await expect(page.locator('#storybook-root')).toHaveScreenshot('button-default-light.png', {
      maxDiffPixelRatio: 0.01,
    });
  });

  test('Button renders correctly in dark mode', async ({ page }) => {
    await page.goto('/iframe.html?id=core-button--default&viewMode=story');
    await page.evaluate(() => document.documentElement.classList.add('dark'));
    await page.waitForSelector('button');
    await expect(page.locator('#storybook-root')).toHaveScreenshot('button-default-dark.png', {
      maxDiffPixelRatio: 0.01,
    });
  });

  test('DataTable renders correctly with sorting and borders', async ({ page }) => {
    await page.goto('/iframe.html?id=data-display-datatable--default&viewMode=story');
    await page.waitForSelector('table');
    await expect(page.locator('#storybook-root')).toHaveScreenshot('data-table-default.png', {
      maxDiffPixelRatio: 0.02,
    });
  });

  test('MobileBottomNav renders correctly on mobile viewport', async ({ page }) => {
    await page.goto('/iframe.html?id=navigation-mobilebottomnav--default&viewMode=story');
    await page.waitForSelector('nav');
    await expect(page.locator('#storybook-root')).toHaveScreenshot('mobile-bottom-nav.png', {
      maxDiffPixelRatio: 0.02,
    });
  });
});
```

---

## 3. Option B: Chromatic Cloud Testing (Managed PR Review Gate)

Chromatic is the official automated visual regression and component review tool created by the Storybook maintainers. It generates side-by-side visual diffs directly in GitHub pull requests.

### GitHub Action Step for Chromatic

In `.github/workflows/ci.yml`:

```yaml
      - name: Publish to Chromatic & Run Visual Regression
        uses: chromaui/action@v11
        if: github.event_name == 'pull_request'
        with:
          projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
          storybookBuildDir: storybook-static
          autoAcceptChanges: false
          exitZeroOnChanges: false
          onlyChanged: true
```

---

## 4. Mitigating Visual Flakiness & Best Practices

Visual regression test suites can suffer from flakiness if dynamic rendering behaviors are unmanaged. Implement the following guards:

### Font Loading Determinism

Ensure web fonts are completely decoded before capturing snapshots:

```typescript
await page.evaluate(() => document.fonts.ready);
```

### Freezing CSS Animations & Micro-Interactions

Disable transitions and endless spinner animations during snapshot tests by injecting a deterministic CSS reset into the preview:

```typescript
await page.addStyleTag({
  content: `
    *, *::before, *::after {
      animation-duration: 0s !important;
      animation-delay: 0s !important;
      transition-duration: 0s !important;
      transition-delay: 0s !important;
    }
  `,
});
```

### Dual Theme Testing (Light & Dark Modes)

Always capture snapshots in both light and dark mode variants (`.dark` class on root) to ensure contrast ratios and border visibility remain intact across theming changes.

---

## 5. CI Integration Workflow

Add the following npm script to `package.json` for running local or CI visual regression checks:

```json
"test:visual": "playwright test -c playwright.visual.config.ts",
"test:visual:update": "playwright test -c playwright.visual.config.ts --update-snapshots"
```
