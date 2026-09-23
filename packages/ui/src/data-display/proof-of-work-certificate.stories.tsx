import type { Meta, StoryObj } from "@storybook/react";
import { ProofOfWorkCertificate } from "./proof-of-work-certificate";

const meta: Meta<typeof ProofOfWorkCertificate> = {
  title: "Domain & Talent Lab/ProofOfWorkCertificate",
  component: ProofOfWorkCertificate,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A formal verifiable completion credential showcasing project accomplishments, cryptographic IDs, skills verified, and sharing capabilities.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProofOfWorkCertificate>;

export const Default: Story = {
  args: {
    certificateId: "POW-2026-8942",
    recipientName: "Alex Rivera",
    recipientHandle: "@arivera",
    projectTitle: "Distributed State & Consensus Primitives",
    projectSlug: "distributed-state-primitives",
    issueDate: "2026-09-18",
    issuerName: "Abeta Academy",
    skills: ["TypeScript", "Distributed Systems", "CRDTs", "WebSockets", "Vitest"],
    verificationUrl: "https://verify.abeta.dev/cert/POW-2026-8942",
    showActions: true,
  },
  render: (args) => (
    <div className="w-full max-w-2xl p-4">
      <ProofOfWorkCertificate {...args} />
    </div>
  ),
};

export const CustomBranding: Story = {
  args: {
    certificateId: "POW-ETH-1082",
    recipientName: "Elena Rostova",
    projectTitle: "EVM Smart Contract Hardening & Fuzzing",
    issueDate: "2026-08-15",
    issuerName: "Security Guild",
    issuerLogoUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=60",
    skills: ["Solidity", "Foundry", "Slither", "Formal Verification"],
    verificationUrl: "https://verify.securityguild.io/cert/POW-ETH-1082",
    showActions: true,
  },
  render: (args) => (
    <div className="w-full max-w-2xl p-4">
      <ProofOfWorkCertificate {...args} />
    </div>
  ),
};

export const WithoutActions: Story = {
  args: {
    certificateId: "POW-READONLY-001",
    recipientName: "Jordan Vance",
    projectTitle: "Production React 19 Architecture",
    issueDate: "2026-07-20",
    issuerName: "Frontend Engineering Lab",
    skills: ["React 19", "Next.js App Router", "Server Components"],
    showActions: false,
  },
  render: (args) => (
    <div className="w-full max-w-2xl p-4">
      <ProofOfWorkCertificate {...args} />
    </div>
  ),
};
