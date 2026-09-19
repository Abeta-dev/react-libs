import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { CheckpointRunner, CheckpointItem } from "../checkpoint-runner";

describe("CheckpointRunner", () => {
  const checkpoints: CheckpointItem[] = [
    {
      id: "cp-1",
      title: "Run Unit Tests",
      command: "npm test",
      completed: true,
      hint: "Ensure all test suites pass before proceeding.",
    },
    {
      id: "cp-2",
      title: "Verify Evidence Output",
      evidenceRequired: true,
      completed: false,
      evidence: "initial-hash-123",
      hint: "Paste the git commit hash.",
    },
    {
      id: "cp-3",
      title: "Deploy Artifact",
      command: "npm run deploy",
      completed: false,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders checkpoint title, badges, and progress bar with accessible roles", () => {
    render(
      <CheckpointRunner
        checkpoints={checkpoints}
        title="Production Verification"
        description="Verify all release checkpoints."
      />
    );

    expect(screen.getByText("Production Verification")).toBeInTheDocument();
    expect(screen.getByText("Verify all release checkpoints.")).toBeInTheDocument();
    expect(screen.getByText("1/3 Done")).toBeInTheDocument();

    const progressbar = screen.getByRole("progressbar");
    expect(progressbar).toHaveAttribute("aria-valuenow", "33");
    expect(progressbar).toHaveAttribute("aria-valuemin", "0");
    expect(progressbar).toHaveAttribute("aria-valuemax", "100");
  });

  it("toggles checkpoint completion and preserves initial evidence if unedited", () => {
    const onToggle = vi.fn();
    render(
      <CheckpointRunner
        checkpoints={checkpoints}
        onToggleCheckpoint={onToggle}
      />
    );

    // Verify button on cp-2 with initial evidence
    const verifyButtons = screen.getAllByRole("button", { name: /verify/i });
    fireEvent.click(verifyButtons[0]!); // first uncompleted checkpoint is cp-2

    expect(onToggle).toHaveBeenCalledWith("cp-2", "initial-hash-123");
  });

  it("updates evidence and passes edited evidence on verify", () => {
    const onToggle = vi.fn();
    render(
      <CheckpointRunner
        checkpoints={checkpoints}
        onToggleCheckpoint={onToggle}
      />
    );

    const input = screen.getByLabelText(/verification evidence \/ output:/i);
    fireEvent.change(input, { target: { value: "commit-abc-999" } });

    const verifyButtons = screen.getAllByRole("button", { name: /verify/i });
    fireEvent.click(verifyButtons[0]!);

    expect(onToggle).toHaveBeenCalledWith("cp-2", "commit-abc-999");
  });

  it("toggles hints open and closed", () => {
    render(<CheckpointRunner checkpoints={checkpoints} />);

    expect(screen.queryByText("Ensure all test suites pass before proceeding.")).not.toBeInTheDocument();

    const hintButtons = screen.getAllByRole("button", { name: /toggle hint/i });
    fireEvent.click(hintButtons[0]!);

    expect(screen.getByText("Ensure all test suites pass before proceeding.")).toBeInTheDocument();

    // Toggle off
    fireEvent.click(hintButtons[0]!);
    expect(screen.queryByText("Ensure all test suites pass before proceeding.")).not.toBeInTheDocument();
  });

  it("copies command to clipboard with accessible feedback", () => {
    vi.useFakeTimers();
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: { writeText },
    });

    render(<CheckpointRunner checkpoints={checkpoints} />);

    const copyBtn = screen.getAllByRole("button", { name: /copy command/i })[0];
    fireEvent.click(copyBtn!);

    expect(writeText).toHaveBeenCalledWith("npm test");

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    vi.useRealTimers();
  });

  it("executes command asynchronously when onRunCommand is provided", async () => {
    const onRun = vi.fn().mockResolvedValue("done");
    render(
      <CheckpointRunner
        checkpoints={checkpoints}
        onRunCommand={onRun}
      />
    );

    const runBtn = screen.getAllByRole("button", { name: /run command in environment/i })[0];
    await act(async () => {
      fireEvent.click(runBtn!);
    });

    expect(onRun).toHaveBeenCalledWith("npm test");
  });
});
