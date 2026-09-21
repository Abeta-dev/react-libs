import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ErrorState } from "../error-state";
import { ErrorBoundary } from "../error-boundary";

describe("ErrorState", () => {
  it("renders title, description and triggers action on click", () => {
    const handleRetry = vi.fn();
    render(
      <ErrorState
        title="Failed to load ledger"
        description="Could not connect to ERP gateway."
        actionLabel="Retry Connection"
        onAction={handleRetry}
      />
    );

    expect(screen.getByText("Failed to load ledger")).toBeInTheDocument();
    expect(screen.getByText("Could not connect to ERP gateway.")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Retry Connection" }));
    expect(handleRetry).toHaveBeenCalledTimes(1);
  });

  it("renders without description or action button gracefully", () => {
    const { container } = render(<ErrorState title="Service Temporarily Offline" />);

    expect(screen.getByText("Service Temporarily Offline")).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(container.querySelector("p")).toBeNull();
  });

  it("does not render action button if onAction is provided without actionLabel or vice versa", () => {
    const handleAction = vi.fn();
    const { rerender } = render(
      <ErrorState title="Partial Configuration" onAction={handleAction} />
    );
    expect(screen.queryByRole("button")).not.toBeInTheDocument();

    rerender(
      <ErrorState title="Partial Configuration" actionLabel="Unclickable Action" />
    );
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("supports rich ReactNode elements for title, description, and action label", () => {
    const handleAction = vi.fn();
    render(
      <ErrorState
        title={
          <span data-testid="custom-title">
            <strong>CRITICAL:</strong> Database Sync Halted
          </span>
        }
        description={
          <span data-testid="custom-desc">
            Failed with code: <code data-testid="error-code">ERR_POSTGRES_DISCONNECTED</code>
          </span>
        }
        actionLabel={<span data-testid="custom-btn-label">Reconnect DB</span>}
        onAction={handleAction}
      />
    );

    expect(screen.getByTestId("custom-title")).toBeInTheDocument();
    expect(screen.getByTestId("error-code")).toHaveTextContent("ERR_POSTGRES_DISCONNECTED");
    expect(screen.getByTestId("custom-btn-label")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button"));
    expect(handleAction).toHaveBeenCalledTimes(1);
  });

  it("supports interactive error recovery flow with retry attempts", () => {
    function StatefulRecovery() {
      const [status, setStatus] = React.useState<"error" | "recovering" | "success">("error");

      if (status === "success") {
        return <div data-testid="success-banner">Ledger sync restored successfully.</div>;
      }

      return (
        <ErrorState
          title={status === "recovering" ? "Attempting Reconnection..." : "Connection Lost"}
          description={
            status === "recovering"
              ? "Re-establishing socket handshake with ERP server..."
              : "Socket connection timed out after 30 seconds."
          }
          actionLabel={status === "recovering" ? "Retrying..." : "Retry Connection"}
          onAction={() => {
            setStatus("recovering");
            // Simulate recovery
            setStatus("success");
          }}
        />
      );
    }

    render(<StatefulRecovery />);
    expect(screen.getByText("Connection Lost")).toBeInTheDocument();

    const retryBtn = screen.getByRole("button", { name: "Retry Connection" });
    fireEvent.click(retryBtn);

    expect(screen.getByTestId("success-banner")).toHaveTextContent("Ledger sync restored successfully.");
    expect(screen.queryByText("Connection Lost")).not.toBeInTheDocument();
  });

  it("supports technical details and error code inspection for debugging and error diagnosis", () => {
    function ErrorWithDetails() {
      const [showDetails, setShowDetails] = React.useState(false);
      return (
        <ErrorState
          title="Payment Webhook Processing Failed"
          description={
            <span>
              The webhook payload could not be verified.{" "}
              <button
                type="button"
                className="underline font-semibold"
                onClick={() => setShowDetails((prev) => !prev)}
              >
                {showDetails ? "Hide technical details" : "View technical details"}
              </button>
              {showDetails ? (
                <span data-testid="stack-trace" className="block mt-2 font-mono text-xs">
                  SignatureMismatchError: HMAC SHA256 validation failed for webhook ID wh_98273
                </span>
              ) : null}
            </span>
          }
          actionLabel="Re-verify Webhook"
          onAction={vi.fn()}
        />
      );
    }

    render(<ErrorWithDetails />);

    expect(screen.getByText("Payment Webhook Processing Failed")).toBeInTheDocument();
    expect(screen.queryByTestId("stack-trace")).not.toBeInTheDocument();

    const toggleBtn = screen.getByRole("button", { name: "View technical details" });
    fireEvent.click(toggleBtn);

    expect(screen.getByTestId("stack-trace")).toHaveTextContent("SignatureMismatchError");
    expect(screen.getByRole("button", { name: "Hide technical details" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Hide technical details" }));
    expect(screen.queryByTestId("stack-trace")).not.toBeInTheDocument();
  });

  it("integrates seamlessly with ErrorBoundary as default fallback UI", () => {
    const onResetMock = vi.fn();
    let shouldThrow = true;

    function BuggyComponent() {
      if (shouldThrow) {
        throw new Error("Simulated runtime crash in GST calculation");
      }
      return <div data-testid="recovered-view">GST calculation rendered safely.</div>;
    }

    // Suppress expected console.error from error boundary catch
    const originalConsoleError = console.error;
    console.error = vi.fn();

    const { rerender } = render(
      <ErrorBoundary onReset={onResetMock}>
        <BuggyComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(screen.getByText("Simulated runtime crash in GST calculation")).toBeInTheDocument();

    // Now test recovery
    shouldThrow = false;
    const tryAgainBtn = screen.getByRole("button", { name: "Try again" });
    fireEvent.click(tryAgainBtn);

    expect(onResetMock).toHaveBeenCalledTimes(1);

    rerender(
      <ErrorBoundary onReset={onResetMock}>
        <BuggyComponent />
      </ErrorBoundary>
    );

    expect(screen.getByTestId("recovered-view")).toBeInTheDocument();
    expect(screen.queryByText("Something went wrong")).not.toBeInTheDocument();

    console.error = originalConsoleError;
  });

  it("passes through HTML attributes, test IDs, and custom class names", () => {
    render(
      <ErrorState
        title="Unauthorized Access"
        description="Your security clearance does not allow viewing this workspace."
        data-testid="error-state-card"
        role="alert"
        id="error-state-security"
        className="custom-error-border"
      />
    );

    const card = screen.getByTestId("error-state-card");
    expect(card).toBeInTheDocument();
    expect(card).toHaveAttribute("role", "alert");
    expect(card).toHaveAttribute("id", "error-state-security");
    expect(card.className).toContain("custom-error-border");
  });
});
