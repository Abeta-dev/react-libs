import { useState } from "react";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@abeta.dev/ui";
import { AmountSummaryCardIndia, UpiQrCard } from "@abeta.dev/india/react";
import {
  CheckpointRunner,
  ProofOfWorkCertificate,
  type CheckpointItem,
} from "@abeta.dev/talent";

const INITIAL_CHECKPOINTS: CheckpointItem[] = [
  {
    id: "cp-1",
    title: "Install @abeta.dev/ui, @abeta.dev/india, and @abeta.dev/talent",
    command: "npm i @abeta.dev/ui @abeta.dev/india @abeta.dev/talent",
    completed: true,
  },
  {
    id: "cp-2",
    title: "Import precompiled @abeta.dev/ui/style.css in src/main.tsx",
    command: 'import "@abeta.dev/ui/style.css";',
    completed: true,
  },
  {
    id: "cp-3",
    title: "Verify production build",
    command: "npm run build",
    evidenceRequired: true,
    hint: "Paste the Vite bundle summary or commit hash after running npm run build.",
    completed: false,
  },
];

export function App() {
  const [activeView, setActiveView] = useState<"fintech" | "talent">("fintech");
  const [checkpoints, setCheckpoints] = useState<CheckpointItem[]>(INITIAL_CHECKPOINTS);

  function handleToggleCheckpoint(id: string, evidence?: string) {
    setCheckpoints((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed, evidence: evidence ?? item.evidence }
          : item
      )
    );
  }

  return (
    <main className="starter-shell">
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <CardTitle>Abeta React Ecosystem — Vite + React 19 Starter</CardTitle>
              <CardDescription>
                Zero-Tailwind setup powered by precompiled @abeta.dev/ui/style.css
              </CardDescription>
            </div>
            <Badge variant="secondary">v0.21.0</Badge>
          </div>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button
            type="button"
            size="sm"
            variant={activeView === "fintech" ? "default" : "outline"}
            debounceSec={false}
            onClick={() => setActiveView("fintech")}
          >
            India FinTech (@abeta.dev/india)
          </Button>
          <Button
            type="button"
            size="sm"
            variant={activeView === "talent" ? "default" : "outline"}
            debounceSec={false}
            onClick={() => setActiveView("talent")}
          >
            Talent & Credentials (@abeta.dev/talent)
          </Button>
        </CardContent>
      </Card>

      {activeView === "fintech" ? (
        <section className="starter-grid">
          <AmountSummaryCardIndia
            baseAmount={85000}
            gstRate={18}
            isIntraState={true}
            tdsPercentage={2}
            transportCost={1200}
            isUrgent
            urgentLabel="Instant UPI Settlement"
          />
          <UpiQrCard
            upiId="merchant@okhdfcbank"
            payeeName="Abeta Commerce Pvt Ltd"
            amount={99800}
            transactionNote="Invoice #INV-2026-409"
            badgeLabel="0% Commission Direct UPI"
          />
        </section>
      ) : (
        <section className="space-y-6">
          <CheckpointRunner
            checkpoints={checkpoints}
            onToggleCheckpoint={handleToggleCheckpoint}
            title="Starter Onboarding Checkpoints"
          />
          <ProofOfWorkCertificate
            certificateId="POW-2026-0210"
            recipientName="Aarav Sharma"
            recipientHandle="@aarav"
            projectTitle="React 19 Enterprise Design System Integration"
            issuerName="Abeta Engineering Academy"
            issueDate="2026-11-20"
            skills={["React 19", "Vite", "TypeScript", "India GST/UPI"]}
            verificationUrl="https://verify.abeta.dev/cert/POW-2026-0210"
            showActions
          />
        </section>
      )}
    </main>
  );
}
