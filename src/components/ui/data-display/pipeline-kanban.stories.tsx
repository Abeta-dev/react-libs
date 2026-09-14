import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { PipelineKanban, type KanbanColumn, type KanbanCardItem } from "./pipeline-kanban";

const meta: Meta<typeof PipelineKanban> = {
  title: "Data Display/PipelineKanban",
  component: PipelineKanban,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A multi-column kanban board for tracking candidate pipelines, vendor verification stages, " +
          "and order fulfillment lifecycles. Supports colored column tone indicators, count badges, score badges, and add-card actions.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof PipelineKanban>;

const columnApplied: KanbanColumn = {
  id: "col-applied",
  title: "New Applications",
  tone: "indigo",
  items: [
    {
      id: "c-1",
      title: "Alpha Electronics Ltd",
      subtitle: "Semiconductor Components",
      tag: "Tier 2 Supplier",
      score: 88,
    },
    {
      id: "c-2",
      title: "Pacific Precision Tech",
      subtitle: "CNC Machining & Tooling",
      tag: "ISO 9001",
      score: 92,
    },
    {
      id: "c-3",
      title: "Zenith Packaging Solutions",
      subtitle: "Corrugated & Eco-board",
      tag: "FSC Certified",
      score: 79,
    },
  ],
};

const columnReview: KanbanColumn = {
  id: "col-review",
  title: "Compliance Review",
  tone: "amber",
  items: [
    {
      id: "c-4",
      title: "Apex Logistics Network",
      subtitle: "Cold Chain Freight",
      tag: "GDP Certified",
      scoreLabel: "Pending KYC",
    },
    {
      id: "c-5",
      title: "Beacon Chemical Industries",
      subtitle: "Specialty Polymers",
      tag: "REACH Compliant",
      score: 95,
    },
  ],
};

const columnAudit: KanbanColumn = {
  id: "col-audit",
  title: "Facility Audit",
  tone: "purple",
  items: [
    {
      id: "c-6",
      title: "Omni Sensor Systems",
      subtitle: "IoT & Telemetry Hardware",
      tag: "On-site Scheduled",
      scoreLabel: "Audit: Oct 2",
    },
  ],
};

const columnApproved: KanbanColumn = {
  id: "col-approved",
  title: "Approved Partners",
  tone: "emerald",
  items: [
    {
      id: "c-7",
      title: "Vanguard Metals Corp",
      subtitle: "Sheet Metal & Stamping",
      tag: "Active Vendor",
      score: 99,
    },
    {
      id: "c-8",
      title: "Quantum Solar Fabricators",
      subtitle: "Photovoltaic Modules",
      tag: "Preferred",
      score: 96,
    },
  ],
};

const defaultColumns: KanbanColumn[] = [
  columnApplied,
  columnReview,
  columnAudit,
  columnApproved,
];

export const Default: Story = {
  args: {
    columns: defaultColumns,
  },
  render: (args) => (
    <div className="w-full max-w-7xl mx-auto p-4 bg-slate-100/60 dark:bg-slate-950 rounded-2xl">
      <PipelineKanban {...args} />
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [cols, setCols] = React.useState<KanbanColumn[]>(defaultColumns);
    const [selectedCard, setSelectedCard] = React.useState<string | null>(null);

    const handleCardClick = (item: KanbanCardItem, columnId: string) => {
      setSelectedCard(`${item.title} (in ${columnId})`);
    };

    const handleAddCard = (columnId: string) => {
      const newCard: KanbanCardItem = {
        id: `card-${Date.now()}`,
        title: `Quick Supplier #${(Date.now() % 900) + 100}`,
        subtitle: "Newly added vendor inquiry",
        tag: "Fast Track",
        score: 85,
      };
      setCols((prev) =>
        prev.map((c) =>
          c.id === columnId ? { ...c, items: [newCard, ...c.items] } : c
        )
      );
    };

    return (
      <div className="w-full max-w-7xl mx-auto space-y-4">
        {selectedCard && (
          <div className="p-3 text-xs bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 rounded-lg border border-indigo-200">
            Selected: <span className="font-bold">{selectedCard}</span>
          </div>
        )}
        <PipelineKanban
          columns={cols}
          onCardClick={handleCardClick}
          onAddCard={handleAddCard}
        />
      </div>
    );
  },
};

export const WithEmptyColumns: Story = {
  args: {
    columns: [
      columnApplied,
      {
        id: "col-empty-1",
        title: "Under Escalation",
        tone: "rose",
        items: [],
        emptyMessage: "No escalated suppliers",
      },
      columnApproved,
    ],
  },
  render: (args) => (
    <div className="w-full max-w-5xl mx-auto p-4 bg-slate-100/60 dark:bg-slate-950 rounded-2xl">
      <PipelineKanban {...args} />
    </div>
  ),
};
