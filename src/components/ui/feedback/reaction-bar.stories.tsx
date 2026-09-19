import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ReactionBar } from "./reaction-bar";

const meta: Meta<typeof ReactionBar> = {
  title: "Feedback/ReactionBar",
  component: ReactionBar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A floating or embedded social engagement bar featuring multi-clap applause, bookmarks, web sharing with clipboard fallback, and reading progress tracking.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ReactionBar>;

export const Default: Story = {
  args: {
    initialClaps: 24,
    maxClapsPerUser: 10,
    shareUrl: "https://abeta.dev/articles/distributed-consensus",
    shareTitle: "Distributed Consensus in TypeScript",
    showReadingProgress: false,
  },
  render: (args) => (
    <div className="w-[360px] p-6 bg-slate-100 dark:bg-slate-900 rounded-xl flex justify-center">
      <ReactionBar {...args} />
    </div>
  ),
};

export const ControlledBookmark: Story = {
  render: () => {
    const [bookmarked, setBookmarked] = React.useState(true);
    const [claps, setClaps] = React.useState(42);

    return (
      <div className="w-[400px] p-6 bg-slate-100 dark:bg-slate-900 rounded-xl flex flex-col items-center gap-4">
        <span className="text-xs font-mono text-slate-500">
          Bookmarked: {bookmarked ? "Yes" : "No"} • Total Claps: {claps}
        </span>
        <ReactionBar
          initialClaps={claps}
          isBookmarked={bookmarked}
          onClap={setClaps}
          onToggleBookmark={setBookmarked}
          shareUrl="https://abeta.dev/articles/controlled-bookmark"
        />
      </div>
    );
  },
};

export const InArticleFlow: Story = {
  render: () => {
    return (
      <div className="max-w-md p-6 bg-white dark:bg-slate-950 border rounded-xl space-y-4">
        <h3 className="font-bold text-lg">Pragmatic State Management</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Local-first architecture decouples immediate user experience from network latency.
          State changes happen instantaneously on the client and converge transparently via
          idempotent synchronization logs.
        </p>
        <div className="pt-4">
          <ReactionBar
            initialClaps={12}
            shareTitle="Pragmatic State Management"
            shareUrl="https://abeta.dev/articles/local-first"
          />
        </div>
      </div>
    );
  },
};
