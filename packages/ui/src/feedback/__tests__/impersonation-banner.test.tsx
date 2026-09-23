import * as React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { ImpersonationBanner } from "../impersonation-banner";

describe("ImpersonationBanner", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders impersonated user information and exits impersonation", () => {
    const handleExit = vi.fn();
    render(
      <ImpersonationBanner
        impersonatedUser={{
          name: "Rajesh Sharma",
          email: "rajesh@mahavir.com",
          role: "Seller Admin",
          orgName: "Mahavir Packaging",
        }}
        onEndImpersonation={handleExit}
      />
    );

    expect(screen.getByText(/Rajesh Sharma/)).toBeInTheDocument();
    expect(screen.getByText(/Seller Admin/)).toBeInTheDocument();
    expect(screen.getByText(/Mahavir Packaging/)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Exit Impersonation/i }));
    expect(handleExit).toHaveBeenCalledTimes(1);
  });

  it("falls back to email when name is not provided", () => {
    const handleExit = vi.fn();
    render(
      <ImpersonationBanner
        impersonatedUser={{
          email: "ops-auditor@quickcommerce.in",
          role: "Compliance Auditor",
        }}
        onEndImpersonation={handleExit}
      />
    );

    expect(screen.getByText("ops-auditor@quickcommerce.in")).toBeInTheDocument();
    expect(screen.getByText(/Compliance Auditor/)).toBeInTheDocument();
  });

  it("renders cleanly when only name is provided, omitting empty parentheses or separators", () => {
    render(
      <ImpersonationBanner
        impersonatedUser={{
          name: "Priya Patel",
        }}
        onEndImpersonation={vi.fn()}
      />
    );

    expect(screen.getByText("Priya Patel")).toBeInTheDocument();
    const bannerText = screen.getByRole("alert").textContent || "";
    expect(bannerText).not.toContain("()");
    expect(bannerText).not.toContain("•");
  });

  it("disables exit button and prevents click invocation when isLoading is true", () => {
    const handleExit = vi.fn();
    render(
      <ImpersonationBanner
        impersonatedUser={{
          name: "Amit Kumar",
          orgName: "Acme Logistics",
        }}
        onEndImpersonation={handleExit}
        isLoading={true}
      />
    );

    const exitBtn = screen.getByRole("button", { name: /Exit Impersonation/i });
    expect(exitBtn).toBeDisabled();

    fireEvent.click(exitBtn);
    expect(handleExit).not.toHaveBeenCalled();
  });

  it("handles dynamic organization switching during active impersonation", () => {
    function ImpersonationWorkspace() {
      const [currentOrg, setCurrentOrg] = React.useState("Mahavir Packaging");

      return (
        <div>
          <ImpersonationBanner
            impersonatedUser={{
              name: "Rajesh Sharma",
              role: "Regional Manager",
              orgName: currentOrg,
            }}
            onEndImpersonation={vi.fn()}
          />
          <button
            type="button"
            onClick={() => setCurrentOrg("Apex Logistics Pvt Ltd")}
          >
            Switch to Apex
          </button>
        </div>
      );
    }

    render(<ImpersonationWorkspace />);
    expect(screen.getByText(/Mahavir Packaging/)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Switch to Apex" }));
    expect(screen.getByText(/Apex Logistics Pvt Ltd/)).toBeInTheDocument();
    expect(screen.queryByText(/Mahavir Packaging/)).not.toBeInTheDocument();
  });

  it("handles session countdown timer and auto-exit trigger", () => {
    vi.useFakeTimers();
    const handleExit = vi.fn();

    function ImpersonationWithTimer({
      durationSeconds,
      onExpire,
    }: {
      durationSeconds: number;
      onExpire: () => void;
    }) {
      const [secondsLeft, setSecondsLeft] = React.useState(durationSeconds);

      React.useEffect(() => {
        if (secondsLeft <= 0) {
          onExpire();
          return;
        }

        const interval = setInterval(() => {
          setSecondsLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
      }, [secondsLeft, onExpire]);

      return (
        <div>
          <ImpersonationBanner
            impersonatedUser={{
              name: "Security Officer",
              orgName: `Session remaining: ${secondsLeft}s`,
            }}
            onEndImpersonation={onExpire}
          />
        </div>
      );
    }

    render(
      <ImpersonationWithTimer durationSeconds={5} onExpire={handleExit} />
    );

    expect(screen.getByText(/Session remaining: 5s/)).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(screen.getByText(/Session remaining: 2s/)).toBeInTheDocument();
    expect(handleExit).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(handleExit).toHaveBeenCalledTimes(1);
  });

  it("verifies accessibility semantics, alert role, and icon rendering", () => {
    const { container } = render(
      <ImpersonationBanner
        impersonatedUser={{
          name: "Suresh Gupta",
          role: "Auditor",
        }}
        onEndImpersonation={vi.fn()}
      />
    );

    const alertRegion = screen.getByRole("alert");
    expect(alertRegion).toBeInTheDocument();
    expect(alertRegion).toHaveClass("sticky", "top-0");

    // Icons: UserCheck and LogOut
    const svgs = container.querySelectorAll("svg");
    expect(svgs.length).toBeGreaterThanOrEqual(2);
  });

  it("passes through HTML attributes, test IDs, and custom class names", () => {
    render(
      <ImpersonationBanner
        data-testid="custom-impersonation-banner"
        id="impersonation-header"
        className="custom-amber-theme"
        impersonatedUser={{
          name: "Vikas Verma",
        }}
        onEndImpersonation={vi.fn()}
      />
    );

    const banner = screen.getByTestId("custom-impersonation-banner");
    expect(banner).toBeInTheDocument();
    expect(banner).toHaveAttribute("id", "impersonation-header");
    expect(banner.className).toContain("custom-amber-theme");
  });
});
