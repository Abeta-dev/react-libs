import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { PersonaDropdown, type PersonaOption } from "./persona-dropdown";
import { ShieldCheck, Truck, Receipt, CheckCircle } from "lucide-react";

const meta: Meta<typeof PersonaDropdown> = {
  title: "Navigation/PersonaDropdown",
  component: PersonaDropdown,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A role-switching dropdown menu component enabling users to alternate between operational personas " +
          "(e.g., Admin, Logistics, Finance, Quality Auditor) with customized permission scopes.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof PersonaDropdown>;

const samplePersonas: PersonaOption[] = [
  {
    id: "admin",
    title: "Vendor Administrator",
    subtitle: "Full organizational privileges and settings",
    icon: <ShieldCheck className="h-3.5 w-3.5 text-indigo-600" />,
  },
  {
    id: "logistics",
    title: "Logistics & Dispatcher",
    subtitle: "Manage ASNs, shipments, and delivery challans",
    icon: <Truck className="h-3.5 w-3.5 text-blue-600" />,
  },
  {
    id: "finance",
    title: "Finance & Accounts",
    subtitle: "Invoice creation, GST filings, and payment reconciliation",
    icon: <Receipt className="h-3.5 w-3.5 text-emerald-600" />,
  },
  {
    id: "quality",
    title: "QA / Compliance Auditor",
    subtitle: "Inspection reports and certificate renewals",
    icon: <CheckCircle className="h-3.5 w-3.5 text-amber-600" />,
  },
];

export const Default: Story = {
  args: {
    personas: samplePersonas,
    activePersonaId: "admin",
    onSelectPersona: (id) => console.log("Selected persona:", id),
  },
};

export const Interactive: Story = {
  render: () => {
    const [activeId, setActiveId] = React.useState("admin");
    const current = samplePersonas.find((p) => p.id === activeId);

    return (
      <div className="space-y-4 p-8 border rounded-xl bg-white dark:bg-slate-900 flex flex-col items-center">
        <PersonaDropdown
          personas={samplePersonas}
          activePersonaId={activeId}
          onSelectPersona={setActiveId}
        />
        <div className="text-xs text-slate-500 text-center">
          Active Role: <span className="font-bold text-slate-900 dark:text-slate-100">{current?.title}</span>
          <p className="text-[11px] text-slate-400 mt-0.5">{current?.subtitle}</p>
        </div>
      </div>
    );
  },
};

export const CustomTriggerLabel: Story = {
  args: {
    personas: samplePersonas,
    activePersonaId: "finance",
    triggerLabel: "Switch Operational Role",
    onSelectPersona: () => {},
  },
};
