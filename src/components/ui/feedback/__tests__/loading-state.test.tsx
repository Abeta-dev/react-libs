import * as React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { LoadingState } from "../loading-state";
import { SkeletonList } from "../skeleton-list";
import { Progress } from "../progress";

describe("LoadingState", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders default label and spinner when no props are provided", () => {
    const { container } = render(<LoadingState />);

    expect(screen.getByText("Loading data...")).toBeInTheDocument();
    const spinner = container.querySelector("svg");
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveStyle({ width: "28px", height: "28px" });
  });

  it("renders custom label and custom spinner size", () => {
    const { container } = render(
      <LoadingState label="Fetching invoices..." spinnerSize={48} />
    );

    expect(screen.getByText("Fetching invoices...")).toBeInTheDocument();
    const spinner = container.querySelector("svg");
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveStyle({ width: "48px", height: "48px" });
  });

  it("supports delayed loading display to prevent UI flicker on fast network responses", () => {
    vi.useFakeTimers();

    function DelayedLoader({ delayMs = 300 }: { delayMs?: number }) {
      const [showLoading, setShowLoading] = React.useState(false);
      const [data, setData] = React.useState<string | null>(null);

      React.useEffect(() => {
        const timer = setTimeout(() => {
          setShowLoading(true);
        }, delayMs);

        // Simulate async data load after 500ms
        const dataTimer = setTimeout(() => {
          setData("Invoices loaded");
          setShowLoading(false);
        }, 500);

        return () => {
          clearTimeout(timer);
          clearTimeout(dataTimer);
        };
      }, [delayMs]);

      if (data) {
        return <div data-testid="invoice-content">{data}</div>;
      }

      if (!showLoading) {
        return <div data-testid="initial-placeholder">Checking cache...</div>;
      }

      return <LoadingState label="Fetching remote records..." />;
    }

    render(<DelayedLoader delayMs={300} />);

    // Initially at 0ms: no LoadingState spinner rendered yet
    expect(screen.getByTestId("initial-placeholder")).toBeInTheDocument();
    expect(screen.queryByText("Fetching remote records...")).not.toBeInTheDocument();

    // Advance 200ms: still within delay threshold
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(screen.queryByText("Fetching remote records...")).not.toBeInTheDocument();

    // Advance past 300ms: LoadingState appears
    act(() => {
      vi.advanceTimersByTime(150);
    });
    expect(screen.getByText("Fetching remote records...")).toBeInTheDocument();

    // Advance to 500ms: Data resolves and LoadingState unmounts
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(screen.getByTestId("invoice-content")).toHaveTextContent("Invoices loaded");
    expect(screen.queryByText("Fetching remote records...")).not.toBeInTheDocument();
  });

  it("supports user cancellation triggers for long-running operations", () => {
    const handleCancel = vi.fn();

    function CancellableLoadingCard({ onCancel }: { onCancel: () => void }) {
      const [isCancelled, setIsCancelled] = React.useState(false);

      const triggerCancel = () => {
        setIsCancelled(true);
        onCancel();
      };

      if (isCancelled) {
        return <div data-testid="cancelled-state">Operation cancelled by user.</div>;
      }

      return (
        <div data-testid="loading-container">
          <LoadingState label="Processing GST returns (can take up to 2 minutes)..." />
          <button
            type="button"
            className="mt-2 text-sm text-rose-600 underline"
            onClick={triggerCancel}
          >
            Cancel Operation
          </button>
        </div>
      );
    }

    render(<CancellableLoadingCard onCancel={handleCancel} />);

    expect(
      screen.getByText("Processing GST returns (can take up to 2 minutes)...")
    ).toBeInTheDocument();

    const cancelBtn = screen.getByRole("button", { name: "Cancel Operation" });
    fireEvent.click(cancelBtn);

    expect(handleCancel).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId("cancelled-state")).toBeInTheDocument();
    expect(
      screen.queryByText("Processing GST returns (can take up to 2 minutes)...")
    ).not.toBeInTheDocument();
  });

  it("coordinates with Skeleton placeholders during progressive loading transitions", () => {
    function ProgressiveDataLoader() {
      const [phase, setPhase] = React.useState<"skeleton" | "loading" | "ready">("skeleton");

      return (
        <div>
          <button type="button" onClick={() => setPhase("loading")}>
            Start Sync
          </button>
          <button type="button" onClick={() => setPhase("ready")}>
            Finish Sync
          </button>

          {phase === "skeleton" && (
            <div data-testid="skeleton-view">
              <SkeletonList count={3} />
            </div>
          )}

          {phase === "loading" && (
            <div data-testid="spinner-view">
              <LoadingState label="Syncing bulk catalogue items..." />
            </div>
          )}

          {phase === "ready" && (
            <div data-testid="data-view">All 150 catalogue items synchronized.</div>
          )}
        </div>
      );
    }

    render(<ProgressiveDataLoader />);

    expect(screen.getByTestId("skeleton-view")).toBeInTheDocument();
    expect(screen.queryByTestId("spinner-view")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Start Sync" }));
    expect(screen.getByTestId("spinner-view")).toBeInTheDocument();
    expect(screen.queryByTestId("skeleton-view")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Finish Sync" }));
    expect(screen.getByTestId("data-view")).toHaveTextContent("All 150 catalogue items synchronized.");
  });

  it("integrates with determinate Progress indicators during file upload/sync states", () => {
    function ProgressLoader({ percent }: { percent: number }) {
      return (
        <div data-testid="progress-loader-container">
          <LoadingState label={`Uploading TDS certificate: ${percent}%`} />
          <Progress value={percent} showLabel />
        </div>
      );
    }

    const { rerender } = render(<ProgressLoader percent={25} />);
    expect(screen.getByText("Uploading TDS certificate: 25%")).toBeInTheDocument();
    expect(screen.getByText("25%")).toBeInTheDocument();

    rerender(<ProgressLoader percent={80} />);
    expect(screen.getByText("Uploading TDS certificate: 80%")).toBeInTheDocument();
    expect(screen.getByText("80%")).toBeInTheDocument();
  });

  it("handles loading timeout error recovery", () => {
    vi.useFakeTimers();

    function TimeoutLoader({ timeoutMs = 4000 }: { timeoutMs?: number }) {
      const [hasTimedOut, setHasTimedOut] = React.useState(false);

      React.useEffect(() => {
        const timer = setTimeout(() => {
          setHasTimedOut(true);
        }, timeoutMs);

        return () => clearTimeout(timer);
      }, [timeoutMs]);

      if (hasTimedOut) {
        return (
          <div data-testid="timeout-error">
            <p>Request timed out after {timeoutMs / 1000}s</p>
            <button type="button" onClick={() => setHasTimedOut(false)}>
              Retry Request
            </button>
          </div>
        );
      }

      return <LoadingState label="Waiting for server response..." />;
    }

    render(<TimeoutLoader timeoutMs={4000} />);
    expect(screen.getByText("Waiting for server response...")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(screen.getByText("Waiting for server response...")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(2500);
    });
    expect(screen.getByTestId("timeout-error")).toBeInTheDocument();
    expect(screen.queryByText("Waiting for server response...")).not.toBeInTheDocument();

    // User retries
    fireEvent.click(screen.getByRole("button", { name: "Retry Request" }));
    expect(screen.getByText("Waiting for server response...")).toBeInTheDocument();
  });

  it("passes through HTML attributes, test IDs, and custom class names", () => {
    render(
      <LoadingState
        label="Verifying authentication..."
        data-testid="loading-state-card"
        role="status"
        aria-live="polite"
        className="custom-loader-shadow border-indigo-500"
      />
    );

    const card = screen.getByTestId("loading-state-card");
    expect(card).toBeInTheDocument();
    expect(card).toHaveAttribute("role", "status");
    expect(card).toHaveAttribute("aria-live", "polite");
    expect(card.className).toContain("custom-loader-shadow");
    expect(card.className).toContain("border-indigo-500");
  });
});
