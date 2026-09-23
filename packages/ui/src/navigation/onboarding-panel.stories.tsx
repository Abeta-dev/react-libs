import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { OnboardingPanel } from "./onboarding-panel";
import type { StepItem } from "./stepper";
import { Input } from "../forms/input";
import { Label } from "../forms/label";

const meta: Meta<typeof OnboardingPanel> = {
  title: "Core UI Primitives/Navigation & Shell/OnboardingPanel",
  component: OnboardingPanel,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A full-height structured wizard layout combining a top Stepper header, scrollable step content body, " +
          "and sticky navigation footer with Back, Continue/Submit, and optional Logout actions.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof OnboardingPanel>;

const sampleSteps: StepItem[] = [
  { title: "Company Profile", description: "Basic business details" },
  { title: "Tax & Compliance", description: "GSTIN and registration" },
  { title: "Bank Account", description: "Payout & settlement details" },
  { title: "Review & Sign", description: "Agreement confirmation" },
];

export const Default: Story = {
  args: {
    activeStep: 0,
    steps: sampleSteps,
    title: "Step 1: Company Profile",
    subtitle: "Provide your registered corporate legal name and operating office address.",
    isFirstStep: true,
    isLastStep: false,
    onBack: () => {},
    onContinue: () => {},
    onLogout: () => {},
    children: (
      <div className="space-y-4 max-w-lg">
        <div className="space-y-1.5">
          <Label htmlFor="c-name">Registered Business Name</Label>
          <Input id="c-name" defaultValue="Acme Solutions Pvt Ltd" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="c-reg">Corporate Registration Number (CIN)</Label>
          <Input id="c-reg" defaultValue="U72200KA2020PTC123456" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="c-addr">Headquarters Address</Label>
          <Input id="c-addr" defaultValue="Indiranagar 100ft Rd, Bengaluru 560038" />
        </div>
      </div>
    ),
  },
  render: (args) => (
    <div className="bg-slate-100 dark:bg-slate-950 min-h-screen">
      <OnboardingPanel {...args} />
    </div>
  ),
};

export const InteractiveWizard: Story = {
  render: () => {
    const [step, setStep] = React.useState(0);

    const stepTitles = [
      "Step 1: Company Profile",
      "Step 2: Tax & Compliance",
      "Step 3: Bank Account Verification",
      "Step 4: Review & Final Submission",
    ];

    const stepSubtitles = [
      "Enter your organization's legal name and headquarters address.",
      "Upload and confirm your GSTIN, PAN, and incorporation filings.",
      "Add bank account details for electronic fund transfers and credit notes.",
      "Verify all provided data before transmitting to the vendor onboard team.",
    ];

    return (
      <div className="bg-slate-100 dark:bg-slate-950 min-h-screen">
        <OnboardingPanel
          activeStep={step}
          steps={sampleSteps}
          title={stepTitles[step]}
          subtitle={stepSubtitles[step]}
          isFirstStep={step === 0}
          isLastStep={step === sampleSteps.length - 1}
          onStepChange={setStep}
          onBack={() => setStep((prev) => Math.max(0, prev - 1))}
          onContinue={() => {
            if (step < sampleSteps.length - 1) {
              setStep((prev) => prev + 1);
            } else {
              alert("Onboarding successfully completed!");
            }
          }}
          onLogout={() => alert("Logged out")}
        >
          <div className="space-y-4 max-w-lg">
            {step === 0 && (
              <>
                <div className="space-y-1.5">
                  <Label htmlFor="w-name">Organization Name</Label>
                  <Input id="w-name" placeholder="Enter company name" defaultValue="Apex Precision Corp" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="w-website">Corporate Website</Label>
                  <Input id="w-website" placeholder="https://..." defaultValue="https://apexprecision.com" />
                </div>
              </>
            )}
            {step === 1 && (
              <>
                <div className="space-y-1.5">
                  <Label htmlFor="w-gst">GSTIN Identification</Label>
                  <Input id="w-gst" placeholder="29ABCDE1234F1Z5" defaultValue="29ABCDE1234F1Z5" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="w-pan">Permanent Account Number (PAN)</Label>
                  <Input id="w-pan" placeholder="ABCDE1234F" defaultValue="ABCDE1234F" />
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <div className="space-y-1.5">
                  <Label htmlFor="w-bank">Bank Name</Label>
                  <Input id="w-bank" defaultValue="HDFC Bank" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="w-acc">Account Number</Label>
                  <Input id="w-acc" defaultValue="50100234567890" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="w-ifsc">IFSC Code</Label>
                  <Input id="w-ifsc" defaultValue="HDFC0001234" />
                </div>
              </>
            )}
            {step === 3 && (
              <div className="p-4 border rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 space-y-2">
                <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                  Ready for Final Compliance Verification
                </p>
                <p className="text-xs text-emerald-700 dark:text-emerald-400">
                  All 3 sections have been completed with verified credentials. Click Submit to initiate supplier authorization.
                </p>
              </div>
            )}
          </div>
        </OnboardingPanel>
      </div>
    );
  },
};

export const LoadingSubmission: Story = {
  args: {
    activeStep: 3,
    steps: sampleSteps,
    title: "Step 4: Review & Sign",
    subtitle: "Transmitting encrypted records to ERP backend...",
    isFirstStep: false,
    isLastStep: true,
    nextLoading: true,
    nextLabel: "Submitting Application...",
    onBack: () => {},
    onContinue: () => {},
    children: (
      <div className="p-6 text-center text-sm text-slate-500">
        Submitting your onboarding packet to enterprise compliance officers...
      </div>
    ),
  },
  render: (args) => (
    <div className="bg-slate-100 dark:bg-slate-950 min-h-screen">
      <OnboardingPanel {...args} />
    </div>
  ),
};
