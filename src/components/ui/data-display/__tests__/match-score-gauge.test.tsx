import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MatchScoreGauge } from "../match-score-gauge";

describe("MatchScoreGauge", () => {
  it("renders match percentage and grade", () => {
    render(<MatchScoreGauge score={92} label="ATS Match Score" />);

    expect(screen.getByText("92%")).toBeInTheDocument();
    expect(screen.getByText("Grade A+")).toBeInTheDocument();
    expect(screen.getByText("ATS Match Score")).toBeInTheDocument();
  });

  it("assigns correct grade and color classes across score tiers", () => {
    // Tier 1: >= 85 (Grade A+, emerald)
    const { rerender, container } = render(<MatchScoreGauge score={85} />);
    expect(screen.getByText("85%")).toBeInTheDocument();
    expect(screen.getByText("Grade A+")).toBeInTheDocument();
    let circles = container.querySelectorAll("circle");
    expect(circles[1]!.className.baseVal).toContain("stroke-emerald-500");

    // Tier 2: 70 - 84 (Grade A, indigo)
    rerender(<MatchScoreGauge score={70} />);
    expect(screen.getByText("70%")).toBeInTheDocument();
    expect(screen.getByText("Grade A")).toBeInTheDocument();
    circles = container.querySelectorAll("circle");
    expect(circles[1]!.className.baseVal).toContain("stroke-indigo-500");

    // Tier 3: 50 - 69 (Grade B, amber)
    rerender(<MatchScoreGauge score={50} />);
    expect(screen.getByText("50%")).toBeInTheDocument();
    expect(screen.getByText("Grade B")).toBeInTheDocument();
    circles = container.querySelectorAll("circle");
    expect(circles[1]!.className.baseVal).toContain("stroke-amber-500");

    // Tier 4: < 50 (Grade C, rose)
    rerender(<MatchScoreGauge score={49} />);
    expect(screen.getByText("49%")).toBeInTheDocument();
    expect(screen.getByText("Grade C")).toBeInTheDocument();
    circles = container.querySelectorAll("circle");
    expect(circles[1]!.className.baseVal).toContain("stroke-rose-500");
  });

  it("clamps negative scores to 0% and assigns Grade C", () => {
    render(<MatchScoreGauge score={-15} label="Clamped Low" />);
    const meter = screen.getByRole("meter");
    expect(meter).toHaveAttribute("aria-valuenow", "0");
    expect(screen.getByText("0%")).toBeInTheDocument();
    expect(screen.getByText("Grade C")).toBeInTheDocument();
  });

  it("clamps scores over 100 to 100% and assigns Grade A+", () => {
    render(<MatchScoreGauge score={150} label="Clamped High" />);
    const meter = screen.getByRole("meter");
    expect(meter).toHaveAttribute("aria-valuenow", "100");
    expect(screen.getByText("100%")).toBeInTheDocument();
    expect(screen.getByText("Grade A+")).toBeInTheDocument();
  });

  it("rounds fractional scores to nearest integer in percentage display and aria attribute", () => {
    render(<MatchScoreGauge score={84.6} />);
    const meter = screen.getByRole("meter");
    // 84.6 rounds to 85% for display and aria, while grade is evaluated on clamped (84.6 < 85 -> Grade A)
    expect(meter).toHaveAttribute("aria-valuenow", "85");
    expect(screen.getByText("85%")).toBeInTheDocument();
    expect(screen.getByText("Grade A")).toBeInTheDocument();
  });

  it("hides grade badge when showGrade is false", () => {
    render(<MatchScoreGauge score={95} showGrade={false} />);
    expect(screen.getByText("95%")).toBeInTheDocument();
    expect(screen.queryByText(/Grade/i)).not.toBeInTheDocument();
  });

  it("renders custom size, strokeWidth, label, and sublabel", () => {
    const { container } = render(
      <MatchScoreGauge
        score={80}
        size={160}
        strokeWidth={12}
        label="Technical Match"
        sublabel="Top 5% of candidate pool"
      />
    );

    expect(screen.getByText("Technical Match")).toBeInTheDocument();
    expect(screen.getByText("Top 5% of candidate pool")).toBeInTheDocument();

    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("width", "160");
    expect(svg).toHaveAttribute("height", "160");

    const circles = container.querySelectorAll("circle");
    expect(circles[0]).toHaveAttribute("stroke-width", "12");
    // radius = (160 - 12) / 2 = 74
    expect(circles[0]).toHaveAttribute("r", "74");
  });

  it("sets standard meter accessibility attributes and supports aria-label override", () => {
    render(
      <MatchScoreGauge
        score={65}
        aria-label="Custom Resume Compatibility"
        className="custom-gauge-class"
        data-testid="gauge-component"
      />
    );

    const meter = screen.getByRole("meter");
    expect(meter).toHaveAttribute("aria-valuemin", "0");
    expect(meter).toHaveAttribute("aria-valuemax", "100");
    expect(meter).toHaveAttribute("aria-valuenow", "65");
    expect(meter).toHaveAttribute("aria-label", "Custom Resume Compatibility");
    expect(meter).toHaveClass("custom-gauge-class");
  });
});
