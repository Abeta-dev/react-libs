import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { CheckpointRunner } from "./checkpoint-runner";

const meta: Meta<typeof CheckpointRunner> = {
  title: "Feedback/CheckpointRunner",
  component: CheckpointRunner,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "An interactive verification runner allowing engineers to step through commands, verify checkpoints, provide evidence, and track completion progress.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CheckpointRunner>;

const sampleCheckpoints = [
  {
    id: "cp-1",
    title: "Verify Clean Git Working Tree",
    command: "git status --porcelain",
    hint: "Make sure all untracked files are staged or stashed before running verification.",
    completed: true,
  },
  {
    id: "cp-2",
    title: "Execute Automated Test Suite & Coverage Thresholds",
    command: "npm test -- --coverage",
    hint: "Ensure coverage stays above 90% lines and 85% branches.",
    evidenceRequired: true,
    evidence: "vitest v4.1.2: 28 passed (100% coverage)",
    completed: true,
  },
  {
    id: "cp-3",
    title: "Validate Production Distribution Bundle Size",
    command: "npm run check:size",
    hint: "Check dist/index.js raw and gzip metrics against check-bundle-size.mjs limits.",
    evidenceRequired: true,
    completed: false,
  },
  {
    id: "cp-4",
    title: "Perform Accessibility Audit on Screen Reader Live Regions",
    command: "npx axe-core-cli http://localhost:6006",
    hint: "Ensure all aria-live, aria-busy, and role=progressbar attributes adhere to WCAG 2.2 AA.",
    evidenceRequired: true,
    completed: false,
  },
];

export const Interactive: Story = {
  render: () => {
    const [checkpoints, setCheckpoints] = React.useState(sampleCheckpoints);

    const handleToggle = (id: string, evidence?: string) => {
      setCheckpoints((prev) =>
        prev.map((cp) =>
          cp.id === id
            ? { ...cp, completed: !cp.completed, ...(evidence !== undefined ? { evidence } : {}) }
            : cp
        )
      );
    };

    const handleRunCommand = async (cmd: string) => {
      await new Promise((resolve) => setTimeout(resolve, 800));
      console.log(`Executed: ${cmd}`);
    };

    return (
      <div className="w-full max-w-xl p-4">
        <CheckpointRunner
          checkpoints={checkpoints}
          onToggleCheckpoint={handleToggle}
          onRunCommand={handleRunCommand}
        />
      </div>
    );
  },
};

export const AllCompleted: Story = {
  args: {
    checkpoints: sampleCheckpoints.map((cp) => ({ ...cp, completed: true })),
  },
  render: (args) => (
    <div className="w-full max-w-xl p-4">
      <CheckpointRunner {...args} />
    </div>
  ),
};
