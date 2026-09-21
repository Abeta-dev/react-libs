import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { RadarSweep, RadarBlip } from "../radar-sweep";

describe("RadarSweep", () => {
  const sampleBlips: RadarBlip[] = [
    { id: "1", x: 45, y: 30, label: "Senior Go Engineer", tone: "emerald" },
    { id: "2", x: 70, y: 60, label: "Staff React Engineer", tone: "indigo" },
  ];

  it("renders status text and blip labels", () => {
    render(
      <RadarSweep blips={sampleBlips} statusText="Scanning for Job Matches..." />
    );

    expect(screen.getByText("Scanning for Job Matches...")).toBeInTheDocument();
    expect(screen.getByText("Senior Go Engineer")).toBeInTheDocument();
    expect(screen.getByText("Staff React Engineer")).toBeInTheDocument();
  });

  it("formats accessibility label correctly for 0, 1, and multiple targets", () => {
    // 0 targets (plural)
    const { rerender } = render(
      <RadarSweep blips={[]} statusText="Patrol" />
    );
    expect(screen.getByRole("img")).toHaveAttribute(
      "aria-label",
      "Patrol, 0 targets detected"
    );

    // 1 target (singular)
    rerender(
      <RadarSweep
        blips={[{ id: "single", x: 50, y: 50, label: "Solo Target" }]}
        statusText="Patrol"
      />
    );
    expect(screen.getByRole("img")).toHaveAttribute(
      "aria-label",
      "Patrol, 1 target detected"
    );

    // 2 targets (plural)
    rerender(
      <RadarSweep blips={sampleBlips} statusText="Patrol" />
    );
    expect(screen.getByRole("img")).toHaveAttribute(
      "aria-label",
      "Patrol, 2 targets detected"
    );
  });

  it("supports custom aria-label override and fallback when statusText is empty", () => {
    const { rerender } = render(
      <RadarSweep aria-label="Global Defense Radar" blips={sampleBlips} />
    );
    expect(screen.getByRole("img")).toHaveAttribute(
      "aria-label",
      "Global Defense Radar"
    );

    // When statusText is empty and no aria-label
    rerender(<RadarSweep statusText="" blips={sampleBlips} />);
    expect(screen.getByRole("img")).toHaveAttribute(
      "aria-label",
      "Radar sweep display"
    );
  });

  it("renders scanning animation cone when isScanning is true and omits it when false", () => {
    const { container, rerender } = render(
      <RadarSweep isScanning={true} />
    );
    let cone = container.querySelector(".animate-\\[spin_4s_linear_infinite\\]");
    expect(cone).toBeInTheDocument();

    rerender(<RadarSweep isScanning={false} />);
    cone = container.querySelector(".animate-\\[spin_4s_linear_infinite\\]");
    expect(cone).not.toBeInTheDocument();
  });

  it("applies correct tone styling for blips across emerald, amber, rose, purple, cyan, and default primary", () => {
    const tonedBlips: RadarBlip[] = [
      { id: "em", x: 10, y: 10, tone: "emerald" },
      { id: "am", x: 20, y: 20, tone: "amber" },
      { id: "ro", x: 30, y: 30, tone: "rose" },
      { id: "pu", x: 40, y: 40, tone: "purple" },
      { id: "cy", x: 50, y: 50, tone: "cyan" },
      { id: "pr", x: 60, y: 60 }, // default tone
    ];

    const { container } = render(<RadarSweep blips={tonedBlips} />);
    const dots = container.querySelectorAll(".group > div");

    expect(dots[0]!.className).toContain("bg-emerald-400");
    expect(dots[1]!.className).toContain("bg-amber-400");
    expect(dots[2]!.className).toContain("bg-rose-400");
    expect(dots[3]!.className).toContain("bg-purple-400");
    expect(dots[4]!.className).toContain("bg-cyan-400");
    expect(dots[5]!.className).toContain("bg-primary");
  });

  it("applies animate-ping when blip pulse is true and omits when false", () => {
    const pulseBlips: RadarBlip[] = [
      { id: "p1", x: 25, y: 25, pulse: true },
      { id: "p2", x: 75, y: 75, pulse: false },
    ];

    const { container } = render(<RadarSweep blips={pulseBlips} />);
    const dots = container.querySelectorAll(".group > div");

    expect(dots[0]!.className).toContain("animate-ping");
    expect(dots[1]!.className).not.toContain("animate-ping");
  });

  it("positions blips using percentage coordinates", () => {
    const placedBlips: RadarBlip[] = [
      { id: "loc1", x: 35, y: 82, label: "Point 1" },
    ];

    const { container } = render(<RadarSweep blips={placedBlips} />);
    const blipWrapper = container.querySelector(".group");

    expect(blipWrapper).toHaveStyle({ left: "35%", top: "82%" });
  });

  it("supports custom size and passes through container attributes and className", () => {
    render(
      <RadarSweep
        size={400}
        className="custom-radar-container"
        data-testid="custom-radar"
        statusText="Active Radar"
      />
    );

    const container = screen.getByTestId("custom-radar");
    expect(container).toHaveClass("custom-radar-container");

    const radarDisplay = screen.getByRole("img");
    expect(radarDisplay).toHaveStyle({ width: "400px", height: "400px" });
  });
});
