# @abeta.dev/talent

[![npm version](https://img.shields.io/npm/v/@abeta.dev/talent.svg)](https://www.npmjs.com/package/@abeta.dev/talent)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![React 18 / 19](https://img.shields.io/badge/react-18%20%7C%2019-blue)](https://react.dev)
[![Tailwind CSS v4](https://img.shields.io/badge/tailwind-v4-38bdf8)](https://tailwindcss.com)
[![Storybook](https://img.shields.io/badge/Storybook-Live%20Docs-ff4785)](https://abeta-dev.github.io/react-libs/)

Interactive assessment, candidate evaluation, verifiable proof-of-work certificates, hands-on checkpoint runners, diagnostic quizzes, and hiring pipeline Kanban components for React 19 & Tailwind CSS v4.

---

## Installation

```bash
npm install @abeta.dev/talent
```

Ensure compatible React peers are installed:

```bash
npm install react@^19.0.0 react-dom@^19.0.0
# Optional celebration effects:
npm install canvas-confetti
```

---

## Tailwind CSS v4 Styling Setup

Import `@abeta.dev/ui`'s Tailwind CSS v4 theme tokens and register both `@abeta.dev/ui` and `@abeta.dev/talent` as `@source` directories in your global stylesheet (e.g. `src/index.css` or `app/globals.css`):

```css
@import "tailwindcss";
@import "@abeta.dev/ui/theme.css";
@source "../node_modules/@abeta.dev/ui/dist";
@source "../node_modules/@abeta.dev/talent/dist";
```

---

## Component Overview

| Component | Description |
| :--- | :--- |
| `ProofOfWorkCertificate` | Verifiable, print/PDF-ready credential certificate with `@media print` styling, hydration-safe issue date rendering, skill badges, share/copy link actions, and serial hash footer. |
| `CheckpointRunner` | Interactive milestone & hands-on lab verification runner with progress bar (`role="progressbar"`), copyable/runnable terminal commands, toggleable hints, and evidence submission. |
| `DiagnosticQuiz` | Multi-step onboarding & diagnostic skills assessment modal that scores weighted track affinities and returns the recommended learning or role track. |
| `PipelineKanban` | Horizontal hiring & evaluation stage board with color-coded column tones, explicit stage counts, score badges, keyboard navigation, and empty-state customization. |
| `MatchScoreGauge` | Circular SVG match-score ring with smooth stroke animation, automatic grade badges (`A+`, `A`, `B`, `C`), and accessible `role="meter"` attributes. |
| `RadarSweep` | Animated talent/candidate radar scanner with concentric rings, pulsing target blips, hover tooltips, and live status indicator. |
| `SalaryRangeDisplay` | Compensation range badge or detailed breakdown card supporting fixed, variable, equity, or custom compensation items. |
| `ProofOfWorkCard` (`MetricVerificationCard`) | Compact verified deliverable / portfolio artifact card with category icons, metric scores, skill tags, and external artifact links. |

---

## Usage Examples

### Print & PDF-Ready `ProofOfWorkCertificate`

Includes built-in `print:` Tailwind utilities so `window.print()` produces a crisp single-page PDF certificate without navigation chrome or action buttons.

```tsx
"use client";

import { ProofOfWorkCertificate } from "@abeta.dev/talent";

export function CertificatePage() {
  return (
    <ProofOfWorkCertificate
      certificateId="ABETA-POW-2026-9F42A"
      recipientName="Ananya Deshmukh"
      recipientHandle="@ananya-builds"
      projectTitle="Distributed Multi-Tenant Ledger Engine"
      issuerName="Abeta Studio & Open Lab"
      issueDate="2026-11-20"
      skills={["TypeScript", "React 19", "PostgreSQL", "Event Sourcing"]}
      verificationUrl="https://verify.abeta.dev/ABETA-POW-2026-9F42A"
      showActions
    />
  );
}
```

### Hands-On `CheckpointRunner`

```tsx
"use client";

import * as React from "react";
import { CheckpointRunner, type CheckpointItem } from "@abeta.dev/talent";

export function LabCheckpoints() {
  const [checkpoints, setCheckpoints] = React.useState<CheckpointItem[]>([
    {
      id: "cp-1",
      title: "Run schema migrations & seed fixtures",
      command: "npm run db:migrate && npm run db:seed",
      hint: "Ensure Docker Postgres is running on port 5432.",
      completed: true,
    },
    {
      id: "cp-2",
      title: "Pass integration test suite with zero warnings",
      command: "npm run test:integration",
      evidenceRequired: true,
      completed: false,
    },
  ]);

  const handleToggle = (id: string, evidence?: string) => {
    setCheckpoints((prev) =>
      prev.map((cp) =>
        cp.id === id ? { ...cp, completed: !cp.completed, evidence } : cp
      )
    );
  };

  return (
    <CheckpointRunner
      title="Backend Reliability Lab"
      checkpoints={checkpoints}
      onToggleCheckpoint={handleToggle}
      onRunCommand={async (cmd) => {
        console.log("Executing:", cmd);
      }}
    />
  );
}
```

### Multi-Step `DiagnosticQuiz`

```tsx
"use client";

import * as React from "react";
import { DiagnosticQuiz, type QuizQuestion } from "@abeta.dev/talent";

const QUESTIONS: QuizQuestion[] = [
  {
    id: "q1",
    category: "Architecture",
    title: "Which engineering problem excites you most?",
    options: [
      {
        label: "Design systems & micro-interactions",
        description: "Accessible UI primitives, tokens, and Core Web Vitals",
        trackAffinity: "frontend",
        weight: 2,
      },
      {
        label: "High-throughput APIs & distributed queues",
        description: "Idempotency, event streaming, and SQL tuning",
        trackAffinity: "backend",
        weight: 2,
      },
    ],
  },
];

export function TrackPlacementModal() {
  const [open, setOpen] = React.useState(true);

  return (
    <DiagnosticQuiz
      open={open}
      onOpenChange={setOpen}
      title="Engineering Track Diagnostic"
      questions={QUESTIONS}
      onComplete={(track, scores) => {
        console.log("Recommended track:", track, scores);
      }}
    />
  );
}
```

### Hiring & Evaluation `PipelineKanban`

```tsx
"use client";

import { PipelineKanban, type KanbanColumn } from "@abeta.dev/talent";

const COLUMNS: KanbanColumn[] = [
  {
    id: "screen",
    title: "Technical Screen",
    tone: "indigo",
    items: [
      {
        id: "cand-1",
        title: "Kabir Verma",
        subtitle: "Staff Frontend Engineer",
        tag: "React 19",
        score: 92,
      },
    ],
  },
  {
    id: "offer",
    title: "Final Offer",
    tone: "emerald",
    items: [
      {
        id: "cand-2",
        title: "Meera Nair",
        subtitle: "Distributed Systems Engineer",
        tag: "Go / Postgres",
        scoreLabel: "Top 5%",
      },
    ],
  },
];

export function HiringPipeline() {
  return (
    <PipelineKanban
      columns={COLUMNS}
      onCardClick={(item, colId) => console.log("Selected:", item.id, colId)}
      onAddCard={(colId) => console.log("Add candidate to:", colId)}
    />
  );
}
```

### `MatchScoreGauge`, `RadarSweep`, `SalaryRangeDisplay` & `ProofOfWorkCard`

```tsx
"use client";

import {
  MatchScoreGauge,
  RadarSweep,
  SalaryRangeDisplay,
  ProofOfWorkCard,
} from "@abeta.dev/talent";

export function CandidateProfileTelemetry() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="flex flex-col items-center gap-4">
        <MatchScoreGauge
          score={91}
          label="Role Fit"
          sublabel="Senior Full-Stack"
          showGrade
        />

        <SalaryRangeDisplay
          variant="card"
          label="Target Compensation"
          min={32}
          max={45}
          currencySymbol="₹"
          unit="L"
          period="yr"
          breakdown={{ fixed: 32, variable: 5, equity: 8 }}
        />

        <ProofOfWorkCard
          item={{
            title: "Zero-Downtime Postgres Partitioning PR",
            type: "github",
            description: "Partitioned 180M invoice rows with sub-20ms P95 latency.",
            score: 98,
            verified: true,
            tags: ["PostgreSQL", "Performance"],
            linkUrl: "https://github.com/Abeta-dev/react-libs",
          }}
        />
      </div>

      <RadarSweep
        size={280}
        statusText="Talent Match Radar Active"
        blips={[
          { id: "b1", x: 35, y: 28, label: "Staff FE (94%)", tone: "emerald", pulse: true },
          { id: "b2", x: 68, y: 60, label: "Systems (88%)", tone: "indigo" },
        ]}
      />
    </div>
  );
}
```

---

## Documentation & Ecosystem

- **Interactive Storybook**: [https://abeta-dev.github.io/react-libs/](https://abeta-dev.github.io/react-libs/)
- **LLM / AI Agent Reference (`llms.txt`)**: [https://abeta-dev.github.io/react-libs/llms.txt](https://abeta-dev.github.io/react-libs/llms.txt)
- **Source & Issues**: [github.com/Abeta-dev/react-libs](https://github.com/Abeta-dev/react-libs)
- **Sibling Packages**: `@abeta.dev/ui` · `@abeta.dev/india` · `@abeta.dev/auth`

## License

MIT © [abeta-dev](./LICENSE)
