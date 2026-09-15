import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { DetailGrid, StatGrid, MetricGrid } from "../detail-grid";

describe("DetailGrid", () => {
  it("renders with default 3-column configuration", () => {
    const { container } = render(
      <DetailGrid>
        <div>Card 1</div>
        <div>Card 2</div>
        <div>Card 3</div>
      </DetailGrid>
    );

    expect(screen.getByText("Card 1")).toBeInTheDocument();
    expect(screen.getByText("Card 2")).toBeInTheDocument();
    expect(screen.getByText("Card 3")).toBeInTheDocument();

    const grid = container.firstChild as HTMLElement;
    expect(grid).toHaveClass("grid");
    expect(grid).toHaveClass("gap-4");
    expect(grid).toHaveClass("grid-cols-1");
    expect(grid).toHaveClass("md:grid-cols-2");
    expect(grid).toHaveClass("xl:grid-cols-3");
  });

  it("applies 1-column layout class when columns is 1", () => {
    const { container } = render(
      <DetailGrid columns={1}>
        <div>Single Full Width Card</div>
      </DetailGrid>
    );

    const grid = container.firstChild as HTMLElement;
    expect(grid).toHaveClass("grid-cols-1");
    expect(grid.className).not.toContain("md:grid-cols-2");
    expect(grid.className).not.toContain("xl:grid-cols-3");
  });

  it("applies 2-column layout classes when columns is 2", () => {
    const { container } = render(
      <DetailGrid columns={2}>
        <div>Card A</div>
        <div>Card B</div>
      </DetailGrid>
    );

    const grid = container.firstChild as HTMLElement;
    expect(grid).toHaveClass("grid-cols-1");
    expect(grid).toHaveClass("md:grid-cols-2");
    expect(grid.className).not.toContain("xl:grid-cols-3");
  });

  it("applies 4-column layout responsive classes when columns is 4", () => {
    const { container } = render(
      <DetailGrid columns={4}>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
        <div>Item 4</div>
      </DetailGrid>
    );

    const grid = container.firstChild as HTMLElement;
    expect(grid).toHaveClass("grid-cols-1");
    expect(grid).toHaveClass("sm:grid-cols-2");
    expect(grid).toHaveClass("lg:grid-cols-4");
  });

  it("supports StatGrid and MetricGrid export aliases with identical behavior", () => {
    const { container: statContainer } = render(
      <StatGrid columns={2} data-testid="stat-grid">
        <div>Stat Card</div>
      </StatGrid>
    );
    const statEl = statContainer.firstChild as HTMLElement;
    expect(statEl).toHaveClass("md:grid-cols-2");
    expect(screen.getByText("Stat Card")).toBeInTheDocument();

    const { container: metricContainer } = render(
      <MetricGrid columns={4} data-testid="metric-grid">
        <div>Metric Card</div>
      </MetricGrid>
    );
    const metricEl = metricContainer.firstChild as HTMLElement;
    expect(metricEl).toHaveClass("lg:grid-cols-4");
    expect(screen.getByText("Metric Card")).toBeInTheDocument();
  });

  it("passes through custom className, aria attributes, style, and id", () => {
    render(
      <DetailGrid
        columns={3}
        className="bg-slate-50 p-6 rounded-2xl"
        data-testid="styled-detail-grid"
        id="dashboard-grid"
        aria-label="Vendor Dashboard Metrics"
      >
        <div>Content</div>
      </DetailGrid>
    );

    const grid = screen.getByTestId("styled-detail-grid");
    expect(grid).toHaveClass("bg-slate-50");
    expect(grid).toHaveClass("p-6");
    expect(grid).toHaveClass("rounded-2xl");
    expect(grid).toHaveClass("grid");
    expect(grid).toHaveAttribute("id", "dashboard-grid");
    expect(grid).toHaveAttribute("aria-label", "Vendor Dashboard Metrics");
  });

  it("renders arbitrary React children including fragments and conditionals", () => {
    const showExtra = true;
    const hideExtra = false;
    render(
      <DetailGrid columns={2} data-testid="fragment-grid">
        <>
          <div>Fragment Child 1</div>
          <div>Fragment Child 2</div>
        </>
        {showExtra ? <div>Conditional Child</div> : null}
        {hideExtra ? <div>Hidden Child</div> : null}
      </DetailGrid>
    );

    expect(screen.getByText("Fragment Child 1")).toBeInTheDocument();
    expect(screen.getByText("Fragment Child 2")).toBeInTheDocument();
    expect(screen.getByText("Conditional Child")).toBeInTheDocument();
    expect(screen.queryByText("Hidden Child")).not.toBeInTheDocument();
  });
});
