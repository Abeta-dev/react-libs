import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { MetricTicker, MetricTickerItem } from "../metric-ticker";

describe("MetricTicker", () => {
  const sampleItems: MetricTickerItem[] = [
    { id: "1", label: "MRR", value: "$124,500", highlight: true },
    { id: "2", label: "Active Nodes", value: "482" },
    { id: "3", label: "Uptime", value: "99.99%" },
  ];

  it("renders metric ticker with accessible region and label", () => {
    render(<MetricTicker items={sampleItems} aria-label="Live System Metrics" />);

    const region = screen.getByRole("region", { name: "Live System Metrics" });
    expect(region).toBeInTheDocument();
  });

  it("renders duplicate list with aria-hidden to prevent screen reader duplication", () => {
    const { container } = render(<MetricTicker items={sampleItems} />);

    // Screen reader accessible items (ignoring aria-hidden nodes)
    const accessibleMrr = screen.getByText("MRR:", { ignore: '[aria-hidden="true"] *' });
    expect(accessibleMrr).toBeInTheDocument();

    // Verify aria-hidden container exists and holds the duplicate items
    const ariaHiddenDiv = container.querySelector('div[aria-hidden="true"]') as HTMLElement;
    expect(ariaHiddenDiv).not.toBeNull();
    expect(ariaHiddenDiv).toHaveClass("flex", "gap-8");

    // All sample item labels appear in the aria-hidden section
    const hiddenScope = within(ariaHiddenDiv);
    expect(hiddenScope.getByText("MRR:")).toBeInTheDocument();
    expect(hiddenScope.getByText("$124,500")).toBeInTheDocument();
    expect(hiddenScope.getByText("Active Nodes:")).toBeInTheDocument();
    expect(hiddenScope.getByText("Uptime:")).toBeInTheDocument();
  });

  it("pauses marquee animation on mouse enter and resumes on mouse leave", () => {
    const { container } = render(<MetricTicker items={sampleItems} speedSeconds={15} />);
    const region = screen.getByRole("region");
    const animatedTrack = container.querySelector(".animate-\\[marquee_linear_infinite\\]") as HTMLElement;

    expect(animatedTrack.style.animationPlayState).toBe("");

    // Mouse enter pauses
    fireEvent.mouseEnter(region);
    expect(animatedTrack.style.animationPlayState).toBe("paused");

    // Mouse leave resumes
    fireEvent.mouseLeave(region);
    expect(animatedTrack.style.animationPlayState).toBe("");
  });

  it("pauses marquee animation on focus and resumes on blur", () => {
    const { container } = render(<MetricTicker items={sampleItems} />);
    const region = screen.getByRole("region");
    const animatedTrack = container.querySelector(".animate-\\[marquee_linear_infinite\\]") as HTMLElement;

    // Focus pauses
    fireEvent.focus(region);
    expect(animatedTrack.style.animationPlayState).toBe("paused");

    // Blur resumes
    fireEvent.blur(region);
    expect(animatedTrack.style.animationPlayState).toBe("");
  });

  it("applies highlight styling when highlight is true", () => {
    render(<MetricTicker items={sampleItems} />);
    const mrrVals = screen.getAllByText("$124,500");
    expect(mrrVals).toHaveLength(2); // One accessible, one aria-hidden duplicate
    expect(mrrVals[0]?.className).toContain("text-indigo-400");
    expect(mrrVals[0]?.className).toContain("font-extrabold");

    const uptimeVals = screen.getAllByText("99.99%");
    expect(uptimeVals[0]?.className).not.toContain("text-indigo-400");
  });
});
