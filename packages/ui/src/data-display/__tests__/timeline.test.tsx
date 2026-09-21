import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Timeline, TimelineItem } from "../timeline";

describe("Timeline", () => {
  const sampleItems: TimelineItem[] = [
    {
      id: "event-1",
      title: "Deployment Completed",
      description: "Version 0.1.0 rolled out to production",
      timestamp: "10 mins ago",
      status: "success",
    },
    {
      id: "event-2",
      title: "Build Started",
      description: "GitHub Actions CI pipeline triggered",
      timestamp: "15 mins ago",
      status: "info",
    },
  ];

  it("renders timeline items with titles, descriptions, and timestamps", () => {
    render(<Timeline items={sampleItems} />);
    expect(screen.getByText("Deployment Completed")).toBeInTheDocument();
    expect(screen.getByText("Version 0.1.0 rolled out to production")).toBeInTheDocument();
    expect(screen.getByText("10 mins ago")).toBeInTheDocument();
    expect(screen.getByText("Build Started")).toBeInTheDocument();
    expect(screen.getByText("GitHub Actions CI pipeline triggered")).toBeInTheDocument();
    expect(screen.getByText("15 mins ago")).toBeInTheDocument();
  });

  it("renders an empty timeline container gracefully", () => {
    render(<Timeline items={[]} data-testid="empty-timeline" />);
    const feed = screen.getByTestId("empty-timeline");
    expect(feed).toBeInTheDocument();
    expect(feed).toHaveAttribute("role", "feed");
    expect(feed).toHaveAttribute("aria-label", "Activity timeline");
  });

  it("renders custom icons and custom ReactNode descriptions", () => {
    const customItems: TimelineItem[] = [
      {
        id: "custom-1",
        title: "Security Scan",
        icon: <span data-testid="custom-security-icon">🛡️</span>,
        description: (
          <div data-testid="custom-desc-content">
            <span className="font-bold">Passed</span> with 0 vulnerabilities
          </div>
        ),
      },
    ];

    render(<Timeline items={customItems} />);
    expect(screen.getByTestId("custom-security-icon")).toBeInTheDocument();
    expect(screen.getByTestId("custom-desc-content")).toBeInTheDocument();
    expect(screen.getByText(/0 vulnerabilities/i)).toBeInTheDocument();
  });

  it("applies proper status styling for default, success, warning, destructive, and info", () => {
    const statusItems: TimelineItem[] = [
      { id: "s-default", title: "Default Item", status: "default" },
      { id: "s-success", title: "Success Item", status: "success" },
      { id: "s-warning", title: "Warning Item", status: "warning" },
      { id: "s-destructive", title: "Destructive Item", status: "destructive" },
      { id: "s-info", title: "Info Item", status: "info" },
    ];

    const { container } = render(<Timeline items={statusItems} />);

    const markers = container.querySelectorAll(".rounded-full");
    expect(markers.length).toBe(5);

    expect(markers[0]!.className).toContain("border-border");
    expect(markers[0]!.className).toContain("text-muted-foreground");

    expect(markers[1]!.className).toContain("border-emerald-500");
    expect(markers[1]!.className).toContain("text-emerald-500");

    expect(markers[2]!.className).toContain("border-amber-500");
    expect(markers[2]!.className).toContain("text-amber-500");

    expect(markers[3]!.className).toContain("border-destructive");
    expect(markers[3]!.className).toContain("text-destructive");

    expect(markers[4]!.className).toContain("border-blue-500");
    expect(markers[4]!.className).toContain("text-blue-500");
  });

  it("handles items without timestamp, description, or id fallback index", () => {
    const minimalItems: TimelineItem[] = [
      { title: "Item without ID" },
      { title: "Second Item", status: "success" },
    ];

    render(<Timeline items={minimalItems} />);
    expect(screen.getByText("Item without ID")).toBeInTheDocument();
    expect(screen.getByText("Second Item")).toBeInTheDocument();
    // Neither should have clock timestamps rendered
    expect(screen.queryByText(/ago/i)).not.toBeInTheDocument();
  });

  it("forwards ref to the root feed element", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Timeline ref={ref} items={sampleItems} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toHaveAttribute("role", "feed");
  });

  it("supports custom className, aria attributes, and arbitrary HTML attributes", () => {
    render(
      <Timeline
        items={sampleItems}
        className="custom-timeline-class"
        data-testid="styled-timeline"
        aria-busy="false"
      />
    );

    const root = screen.getByTestId("styled-timeline");
    expect(root).toHaveClass("custom-timeline-class");
    expect(root).toHaveClass("space-y-6");
    expect(root).toHaveAttribute("aria-busy", "false");
  });

  it("renders continuous connector track in background", () => {
    const { container } = render(<Timeline items={sampleItems} />);
    const connector = container.querySelector(".w-\\[2px\\]");
    expect(connector).toBeInTheDocument();
    expect(connector).toHaveClass("bg-border");
  });
});
