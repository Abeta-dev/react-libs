import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { OnboardingNotice } from "../onboarding-notice";

describe("OnboardingNotice", () => {
  it("renders default tone info with role='status' and Info icon when no tone specified", () => {
    const { container } = render(
      <OnboardingNotice message="Please verify your registered business address." />
    );

    const notice = screen.getByRole("status");
    expect(notice).toBeInTheDocument();
    expect(notice).toHaveTextContent("Please verify your registered business address.");
    expect(notice.className).toContain("bg-slate-50");
    expect(notice.className).toContain("border-slate-200");

    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("renders warning tone with AlertTriangle icon and amber styling", () => {
    render(
      <OnboardingNotice
        tone="warning"
        message="Tax ID (GSTIN) verification is pending reviewer approval."
      />
    );

    const notice = screen.getByRole("status");
    expect(notice).toBeInTheDocument();
    expect(notice).toHaveTextContent("Tax ID (GSTIN) verification is pending reviewer approval.");
    expect(notice.className).toContain("border-amber-200");
    expect(notice.className).toContain("bg-amber-50");
    expect(notice.className).toContain("text-amber-800");
  });

  it("renders success tone with CheckCircle2 icon and emerald styling", () => {
    render(
      <OnboardingNotice
        tone="success"
        message="Bank account and IFSC code verified successfully."
      />
    );

    const notice = screen.getByRole("status");
    expect(notice).toBeInTheDocument();
    expect(notice).toHaveTextContent("Bank account and IFSC code verified successfully.");
    expect(notice.className).toContain("border-emerald-200");
    expect(notice.className).toContain("bg-emerald-50");
    expect(notice.className).toContain("text-emerald-800");
  });

  it("renders error tone with role='alert', AlertCircle icon, and rose styling", () => {
    render(
      <OnboardingNotice
        tone="error"
        message="PAN document upload rejected due to illegible signature."
      />
    );

    const alertNotice = screen.getByRole("alert");
    expect(alertNotice).toBeInTheDocument();
    expect(alertNotice).toHaveTextContent("PAN document upload rejected due to illegible signature.");
    expect(alertNotice.className).toContain("border-rose-200");
    expect(alertNotice.className).toContain("bg-rose-50");
    expect(alertNotice.className).toContain("text-rose-800");
  });

  it("renders children content when message prop is not provided", () => {
    const handleAction = vi.fn();
    render(
      <OnboardingNotice tone="info">
        <div data-testid="custom-content" className="flex flex-col gap-1">
          <span className="font-semibold">Step 2 of 4: Director KYC</span>
          <span>Upload Aadhaar or passport scan to proceed.</span>
          <button
            type="button"
            className="self-start underline mt-1"
            onClick={handleAction}
          >
            Upload Document
          </button>
        </div>
      </OnboardingNotice>
    );

    expect(screen.getByTestId("custom-content")).toBeInTheDocument();
    expect(screen.getByText("Step 2 of 4: Director KYC")).toBeInTheDocument();

    const uploadBtn = screen.getByRole("button", { name: "Upload Document" });
    fireEvent.click(uploadBtn);
    expect(handleAction).toHaveBeenCalledTimes(1);
  });

  it("prioritizes message prop over children when message is present", () => {
    render(
      <OnboardingNotice message="Primary notice message">
        <span>Ignored fallback child</span>
      </OnboardingNotice>
    );

    expect(screen.getByText("Primary notice message")).toBeInTheDocument();
    expect(screen.queryByText("Ignored fallback child")).not.toBeInTheDocument();
  });

  it("handles dismissible onboarding notice pattern with persistent dismissal state", () => {
    function DismissibleOnboardingBanner() {
      const [dismissed, setDismissed] = React.useState(false);

      if (dismissed) {
        return <div data-testid="banner-dismissed">Notice dismissed</div>;
      }

      return (
        <div data-testid="banner-wrapper">
          <OnboardingNotice tone="info" message="Tip: Complete GST registration to unlock automated tax invoices." />
          <button
            type="button"
            aria-label="Dismiss notice"
            onClick={() => setDismissed(true)}
          >
            Dismiss
          </button>
        </div>
      );
    }

    render(<DismissibleOnboardingBanner />);

    expect(screen.getByText(/Complete GST registration/)).toBeInTheDocument();

    const dismissBtn = screen.getByRole("button", { name: "Dismiss notice" });
    fireEvent.click(dismissBtn);

    expect(screen.getByTestId("banner-dismissed")).toBeInTheDocument();
    expect(screen.queryByText(/Complete GST registration/)).not.toBeInTheDocument();
  });

  it("supports multi-step onboarding progression with tone and message transitions", () => {
    function OnboardingFlow() {
      const [step, setStep] = React.useState<"pending" | "processing" | "approved" | "failed">("pending");

      const stepConfig = {
        pending: { tone: "warning" as const, text: "Awaiting documents" },
        processing: { tone: "info" as const, text: "Verification in progress" },
        approved: { tone: "success" as const, text: "Account activated" },
        failed: { tone: "error" as const, text: "Verification failed" },
      }[step];

      return (
        <div>
          <OnboardingNotice tone={stepConfig.tone} message={stepConfig.text} />
          <button type="button" onClick={() => setStep("processing")}>Process</button>
          <button type="button" onClick={() => setStep("approved")}>Approve</button>
          <button type="button" onClick={() => setStep("failed")}>Reject</button>
        </div>
      );
    }

    render(<OnboardingFlow />);

    // Initial: warning (role="status")
    expect(screen.getByRole("status")).toHaveTextContent("Awaiting documents");

    // Next: processing (role="status")
    fireEvent.click(screen.getByRole("button", { name: "Process" }));
    expect(screen.getByRole("status")).toHaveTextContent("Verification in progress");

    // Next: approved (role="status")
    fireEvent.click(screen.getByRole("button", { name: "Approve" }));
    expect(screen.getByRole("status")).toHaveTextContent("Account activated");

    // Next: failed (role="alert")
    fireEvent.click(screen.getByRole("button", { name: "Reject" }));
    expect(screen.getByRole("alert")).toHaveTextContent("Verification failed");
  });

  it("passes through HTML attributes, test IDs, and custom class names", () => {
    render(
      <OnboardingNotice
        tone="info"
        message="Notice with custom attributes"
        data-testid="onboarding-notice-box"
        id="onboarding-step-1"
        className="custom-onboarding-class"
      />
    );

    const notice = screen.getByTestId("onboarding-notice-box");
    expect(notice).toBeInTheDocument();
    expect(notice).toHaveAttribute("id", "onboarding-step-1");
    expect(notice.className).toContain("custom-onboarding-class");
  });
});
