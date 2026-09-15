import { describe, it, expect, vi } from "vitest";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { OnboardingPanel } from "../onboarding-panel";

describe("OnboardingPanel", () => {
  const steps = [
    { title: "Entity Details" },
    { title: "Tax & Bank" },
    { title: "Review" },
  ];

  it("renders stepper, title, subtitle, and children", () => {
    const { container } = render(
      <OnboardingPanel
        activeStep={1}
        steps={steps}
        title="Tax & Bank Verification"
        subtitle="Fill your verified banking details"
      >
        <div data-testid="step-body">Step 2 Form Body</div>
      </OnboardingPanel>
    );

    expect(container.querySelector("section")).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: /progress stepper/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1, name: "Tax & Bank Verification" })).toBeInTheDocument();
    expect(screen.getByText("Fill your verified banking details")).toBeInTheDocument();
    expect(screen.getByTestId("step-body")).toBeInTheDocument();
  });

  it("calls onContinue and onBack callbacks when buttons are clicked", () => {
    const handleContinue = vi.fn();
    const handleBack = vi.fn();

    render(
      <OnboardingPanel
        activeStep={1}
        steps={steps}
        title="Details"
        onContinue={handleContinue}
        onBack={handleBack}
      >
        <div>Content</div>
      </OnboardingPanel>
    );

    const continueBtn = screen.getByRole("button", { name: /save & continue/i });
    const backBtn = screen.getByRole("button", { name: /back/i });

    fireEvent.click(continueBtn);
    expect(handleContinue).toHaveBeenCalledTimes(1);

    fireEvent.click(backBtn);
    expect(handleBack).toHaveBeenCalledTimes(1);
  });

  it("disables back button when isFirstStep is true", () => {
    const handleBack = vi.fn();

    render(
      <OnboardingPanel
        activeStep={0}
        steps={steps}
        title="First Step"
        isFirstStep={true}
        onBack={handleBack}
      >
        <div>First Step Content</div>
      </OnboardingPanel>
    );

    const backBtn = screen.getByRole("button", { name: /back/i });
    expect(backBtn).toBeDisabled();

    fireEvent.click(backBtn);
    expect(handleBack).not.toHaveBeenCalled();
  });

  it("renders 'Submit & Finish' on the last step", () => {
    const handleContinue = vi.fn();

    render(
      <OnboardingPanel
        activeStep={2}
        steps={steps}
        title="Final Review"
        isLastStep={true}
        onContinue={handleContinue}
      >
        <div>Review Content</div>
      </OnboardingPanel>
    );

    const submitBtn = screen.getByRole("button", { name: /submit & finish/i });
    expect(submitBtn).toBeInTheDocument();

    fireEvent.click(submitBtn);
    expect(handleContinue).toHaveBeenCalledTimes(1);
  });

  it("renders custom nextLabel when provided", () => {
    render(
      <OnboardingPanel
        activeStep={1}
        steps={steps}
        title="Custom Label"
        nextLabel="Proceed to Verification"
        onContinue={vi.fn()}
      >
        <div>Content</div>
      </OnboardingPanel>
    );

    expect(screen.getByRole("button", { name: /proceed to verification/i })).toBeInTheDocument();
  });

  it("disables continue button and renders spinner when nextLoading is true", () => {
    const handleContinue = vi.fn();

    render(
      <OnboardingPanel
        activeStep={1}
        steps={steps}
        title="Loading Operation"
        nextLoading={true}
        onContinue={handleContinue}
      >
        <div>Content</div>
      </OnboardingPanel>
    );

    const continueBtn = screen.getByRole("button", { name: /save & continue/i });
    expect(continueBtn).toBeDisabled();

    const spinner = continueBtn.querySelector(".animate-spin");
    expect(spinner).toBeInTheDocument();

    fireEvent.click(continueBtn);
    expect(handleContinue).not.toHaveBeenCalled();
  });

  it("disables continue button when nextDisabled is true", () => {
    const handleContinue = vi.fn();

    render(
      <OnboardingPanel
        activeStep={1}
        steps={steps}
        title="Incomplete Step"
        nextDisabled={true}
        onContinue={handleContinue}
      >
        <div>Fill required fields</div>
      </OnboardingPanel>
    );

    const continueBtn = screen.getByRole("button", { name: /save & continue/i });
    expect(continueBtn).toBeDisabled();

    fireEvent.click(continueBtn);
    expect(handleContinue).not.toHaveBeenCalled();
  });

  it("renders logout button and handles click when onLogout is provided", () => {
    const handleLogout = vi.fn();

    const { rerender } = render(
      <OnboardingPanel
        activeStep={1}
        steps={steps}
        title="With Logout"
        onLogout={handleLogout}
      >
        <div>Content</div>
      </OnboardingPanel>
    );

    const logoutBtn = screen.getByRole("button", { name: /logout/i });
    expect(logoutBtn).toBeInTheDocument();

    fireEvent.click(logoutBtn);
    expect(handleLogout).toHaveBeenCalledTimes(1);

    // When onLogout is omitted, logout button is not rendered
    rerender(
      <OnboardingPanel
        activeStep={1}
        steps={steps}
        title="Without Logout"
      >
        <div>Content</div>
      </OnboardingPanel>
    );

    expect(screen.queryByRole("button", { name: /logout/i })).not.toBeInTheDocument();
  });

  it("omits navigation buttons when callbacks are not provided", () => {
    render(
      <OnboardingPanel
        activeStep={1}
        steps={steps}
        title="No Buttons"
      >
        <div>Content without footer actions</div>
      </OnboardingPanel>
    );

    expect(screen.queryByRole("button", { name: /back/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /save & continue/i })).not.toBeInTheDocument();
  });

  it("forwards scrollContainerRef and applies custom className and props", () => {
    const scrollRef = React.createRef<HTMLDivElement>();

    render(
      <OnboardingPanel
        activeStep={0}
        steps={steps}
        title="Ref Test"
        scrollContainerRef={scrollRef}
        className="custom-panel-wrapper"
        data-testid="onboarding-root"
      >
        <div>Scrollable content</div>
      </OnboardingPanel>
    );

    expect(screen.getByTestId("onboarding-root")).toHaveClass("custom-panel-wrapper");
    expect(scrollRef.current).not.toBeNull();
    expect(scrollRef.current).toHaveClass("overflow-y-auto");
  });
});
