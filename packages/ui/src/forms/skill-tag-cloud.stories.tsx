import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { SkillTagCloud, type SkillTag } from "./skill-tag-cloud";

const meta: Meta<typeof SkillTagCloud> = {
  title: "Core UI Primitives/Forms & Inputs/SkillTagCloud",
  component: SkillTagCloud,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "An interactive skill and capability tag manager. Displays color-coded proficiency badges " +
          "(Beginner, Intermediate, Advanced, Expert) with tag removal and an inline add form.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SkillTagCloud>;

const sampleTags: SkillTag[] = [
  { id: "1", name: "Distributed Systems", level: "Expert" },
  { id: "2", name: "TypeScript & React", level: "Expert" },
  { id: "3", name: "Go / Microservices", level: "Advanced" },
  { id: "4", name: "PostgreSQL & Prisma", level: "Advanced" },
  { id: "5", name: "Kafka Event Bus", level: "Intermediate" },
  { id: "6", name: "Kubernetes & Docker", level: "Intermediate" },
  { id: "7", name: "GraphQL Architecture", level: "Beginner" },
];

export const Default: Story = {
  args: {
    tags: sampleTags,
    categoryLabel: "Vendor Core Competencies",
  },
  render: (args) => (
    <div className="w-[520px] p-5 border rounded-xl bg-white dark:bg-slate-900">
      <SkillTagCloud {...args} />
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [tags, setTags] = React.useState<SkillTag[]>(sampleTags.slice(0, 4));

    const handleAddTag = (name: string) => {
      const newTag: SkillTag = {
        id: `tag-${Date.now()}`,
        name,
        level: "Intermediate",
      };
      setTags((prev) => [...prev, newTag]);
    };

    const handleRemoveTag = (tagToRemove: SkillTag) => {
      setTags((prev) => prev.filter((t) => t.id !== tagToRemove.id && t.name !== tagToRemove.name));
    };

    return (
      <div className="w-[520px] p-5 border rounded-xl bg-white dark:bg-slate-900 space-y-4">
        <SkillTagCloud
          tags={tags}
          onAddTag={handleAddTag}
          onRemoveTag={handleRemoveTag}
          categoryLabel="Manage Vendor Capabilities"
          placeholder="Type capability (e.g. AWS, Redis)..."
        />
      </div>
    );
  },
};

export const ReadOnly: Story = {
  args: {
    tags: sampleTags,
    readOnly: true,
    categoryLabel: "Verified Qualifications",
  },
  render: (args) => (
    <div className="w-[520px] p-5 border rounded-xl bg-white dark:bg-slate-900">
      <SkillTagCloud {...args} />
    </div>
  ),
};

export const MaxTagsReached: Story = {
  args: {
    tags: sampleTags.slice(0, 4),
    maxTags: 4,
    categoryLabel: "Top 4 Priority Tags (Capped)",
  },
  render: (args) => (
    <div className="w-[520px] p-5 border rounded-xl bg-white dark:bg-slate-900">
      <SkillTagCloud {...args} />
    </div>
  ),
};

export const EmptyReadOnly: Story = {
  args: {
    tags: [],
    readOnly: true,
    categoryLabel: "Certifications",
  },
  render: (args) => (
    <div className="w-[420px] p-5 border rounded-xl bg-white dark:bg-slate-900">
      <SkillTagCloud {...args} />
    </div>
  ),
};
