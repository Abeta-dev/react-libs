import type { Meta, StoryObj } from "@storybook/react";
import { ProofOfWorkCard } from "./proof-of-work-card";

const meta: Meta<typeof ProofOfWorkCard> = {
  title: "Data Display/ProofOfWorkCard",
  component: ProofOfWorkCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A verification card component for showcasing engineering artifacts, GitHub repositories, " +
          "cloud certifications, and system designs with verification badges, tags, and direct outbound links.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProofOfWorkCard>;

export const GitHubProject: Story = {
  args: {
    item: {
      id: "pow-1",
      title: "react-distributed-state",
      type: "github",
      description:
        "High-performance distributed state sync primitives with optimistic concurrency control and zero external runtime dependencies.",
      score: 95,
      maxScore: 100,
      verified: true,
      tags: ["TypeScript", "Turborepo", "React 19"],
      linkUrl: "https://github.com/example/react-distributed-state",
      linkLabel: "View Repository",
    },
  },
  render: (args) => (
    <div className="w-[420px]">
      <ProofOfWorkCard {...args} />
    </div>
  ),
};

export const LiveProductionProject: Story = {
  args: {
    item: {
      id: "pow-2",
      title: "Global Supply Mesh v4",
      type: "live_project",
      description:
        "High-throughput vendor portal microfrontend architecture processing $12M+ monthly GMV with sub-50ms TTFB across APAC nodes.",
      metricLabel: "100k+ MAU",
      verified: true,
      tags: ["Next.js", "Tailwind CSS", "Edge Runtime"],
      linkUrl: "https://portal.example.com",
      linkLabel: "Visit Live Portal",
    },
  },
  render: (args) => (
    <div className="w-[420px]">
      <ProofOfWorkCard {...args} />
    </div>
  ),
};

export const Certification: Story = {
  args: {
    item: {
      id: "pow-3",
      title: "AWS Solutions Architect Pro",
      type: "certificate",
      description:
        "Validated advanced technical expertise in designing secure, resilient, and high-performance cloud architectures on AWS.",
      metricLabel: "Top 1%",
      verified: true,
      tags: ["AWS", "Cloud Security", "Infrastructure"],
      linkUrl: "https://aws.amazon.com/verification",
      linkLabel: "Verify Credential",
    },
  },
  render: (args) => (
    <div className="w-[420px]">
      <ProofOfWorkCard {...args} />
    </div>
  ),
};

export const ArchitectureSpec: Story = {
  args: {
    item: {
      id: "pow-4",
      title: "Ledger Reconciliation Topology",
      type: "architecture",
      description:
        "Distributed double-entry transaction pipeline using Apache Kafka CDC with outbox pattern and automated mismatch failover.",
      metricLabel: "Design Review",
      verified: false,
      tags: ["Kafka", "CDC", "PostgreSQL"],
      linkUrl: "https://c4model.com",
      linkLabel: "Read RFC Document",
    },
  },
  render: (args) => (
    <div className="w-[420px]">
      <ProofOfWorkCard {...args} />
    </div>
  ),
};

export const PortfolioGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-[860px]">
      <ProofOfWorkCard
        item={{
          id: "grid-1",
          title: "portal-design-system",
          type: "github",
          description: "Accessible design primitives and Storybook documentation for enterprise procurement portals.",
          score: 98,
          verified: true,
          tags: ["Storybook", "Tailwind", "Radix"],
          linkUrl: "https://github.com",
        }}
      />
      <ProofOfWorkCard
        item={{
          id: "grid-2",
          title: "Certified Kubernetes Admin (CKA)",
          type: "certificate",
          description: "Cloud Native Computing Foundation certification in cluster configuration, networking, and service mesh management.",
          metricLabel: "Score 96%",
          verified: true,
          tags: ["Kubernetes", "Linux", "DevOps"],
          linkUrl: "https://cncf.io",
        }}
      />
    </div>
  ),
};
