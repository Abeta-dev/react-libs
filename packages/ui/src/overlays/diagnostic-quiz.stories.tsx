import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DiagnosticQuiz, type QuizQuestion } from "./diagnostic-quiz";
import { Button } from "../forms/button";

const meta: Meta<typeof DiagnosticQuiz> = {
  title: "Domain & Talent Lab/DiagnosticQuiz",
  component: DiagnosticQuiz,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "An interactive multi-step assessment modal evaluating user responses to calculate and recommend tailored curriculum or skill tracks.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DiagnosticQuiz>;

const sampleQuestions: QuizQuestion[] = [
  {
    id: "q-1",
    title: "What is your primary architectural domain?",
    category: "Architecture",
    options: [
      {
        label: "Frontend & Design Systems",
        description: "Focusing on component contracts, responsive layout engines, and a11y standards.",
        trackAffinity: "frontend",
        weight: 3,
      },
      {
        label: "Distributed Backend & Data Systems",
        description: "Focusing on consensus protocols, event streaming, and database schema migrations.",
        trackAffinity: "backend",
        weight: 3,
      },
      {
        label: "Fullstack Product Delivery",
        description: "Building end-to-end features with Next.js, Edge APIs, and server components.",
        trackAffinity: "fullstack",
        weight: 3,
      },
    ],
  },
  {
    id: "q-2",
    title: "Which runtime language ecosystem do you leverage daily?",
    category: "Languages",
    options: [
      {
        label: "TypeScript & React",
        description: "Strict typing, functional UI composition, and modern build toolchains.",
        trackAffinity: "frontend",
        weight: 2,
      },
      {
        label: "Go & Rust",
        description: "Systems programming, concurrency primitives, and microsecond latency targets.",
        trackAffinity: "backend",
        weight: 2,
      },
      {
        label: "Node.js & Python",
        description: "Rapid service orchestration, AI/ML integrations, and scripting.",
        trackAffinity: "fullstack",
        weight: 2,
      },
    ],
  },
  {
    id: "q-3",
    title: "What is your highest-priority performance goal?",
    category: "Performance",
    options: [
      {
        label: "Sub-100ms INP and 0ms Layout Shifts",
        description: "Optimizing browser rendering pipelines and component tree lifecycles.",
        trackAffinity: "frontend",
        weight: 2,
      },
      {
        label: "High Throughput & P99 Latency SLA",
        description: "Zero-allocation deserialization, connection pooling, and CDC streams.",
        trackAffinity: "backend",
        weight: 2,
      },
      {
        label: "Time to Market with Clean Maintainability",
        description: "Monorepo efficiency, automated CI gates, and shared component libraries.",
        trackAffinity: "fullstack",
        weight: 2,
      },
    ],
  },
];

export const InteractiveModal: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    const [result, setResult] = React.useState<{ track: string; scores: Record<string, number> } | null>(null);

    return (
      <div className="p-8 flex flex-col items-center gap-4">
        <Button onClick={() => setOpen(true)} debounceSec={false}>
          Start Diagnostic Quiz
        </Button>
        {result && (
          <div className="p-4 rounded-lg border bg-muted/30 text-center space-y-1 font-mono text-xs">
            <p className="font-bold text-sm">Recommended: {result.track.toUpperCase()}</p>
            <p className="text-muted-foreground">Scores: {JSON.stringify(result.scores)}</p>
          </div>
        )}
        <DiagnosticQuiz
          open={open}
          onOpenChange={setOpen}
          title="Engineering Track Diagnostic"
          description="Answer a few targeted questions to evaluate your ideal curriculum path."
          questions={sampleQuestions}
          onComplete={(track, scores) => {
            setResult({ track, scores });
          }}
        />
      </div>
    );
  },
};

export const EmptyQuestions: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <div className="p-8 flex flex-col items-center gap-4">
        <Button onClick={() => setOpen(true)} debounceSec={false}>
          Open Empty Quiz
        </Button>
        <DiagnosticQuiz
          open={open}
          onOpenChange={setOpen}
          questions={[]}
          onComplete={() => {}}
        />
      </div>
    );
  },
};
