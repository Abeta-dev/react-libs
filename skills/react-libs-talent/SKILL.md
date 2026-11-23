---
name: react-libs-talent
description: Implementation guide for @abeta.dev/talent (v0.22.0) — ProofOfWorkCertificate, CheckpointRunner, DiagnosticQuiz, PipelineKanban, ProofOfWorkCard, MatchScoreGauge, RadarSweep, and SalaryRangeDisplay for React 19.
---

# `@abeta.dev/talent` Skill (`v0.22.0`)

## Installation

```bash
npm install @abeta.dev/talent @abeta.dev/ui
```

Add `@source "../node_modules/@abeta.dev/talent";` to your Tailwind CSS v4 stylesheet (or import `@abeta.dev/ui/style.css` without Tailwind).

## Exported Components (`'use client'`)

| Component | Key Props & Capabilities |
| :--- | :--- |
| `ProofOfWorkCertificate` | Required: `certificateId`, `recipientName`, `projectTitle`. Built-in `@media print` single-page PDF layout, hydration-safe date rendering, Web Share API + clipboard fallback. |
| `CheckpointRunner` | Sequential hands-on milestone runner with runnable command snippets, expandable hints, evidence capture, and progress tracking. |
| `DiagnosticQuiz` | Multi-step interactive skills assessment modal with radio accessibility and weighted track recommendations. |
| `PipelineKanban` | Multi-stage candidate evaluation / hiring pipeline board. |
| `ProofOfWorkCard` (`MetricVerificationCard`) | Compact verifiable project/metric summary card. |
| `MatchScoreGauge` | Radial percentage match gauge for candidate/role scoring. |
| `RadarSweep` | Multi-axis competency radar visualization. |
| `SalaryRangeDisplay` (`MetricRangeDisplay`, `CompensationRangeDisplay`) | Visual compensation/range indicator bar. |

## Optional Enhancements

- Install optional peer `canvas-confetti` to enable celebration bursts on quiz/checkpoint completion.
