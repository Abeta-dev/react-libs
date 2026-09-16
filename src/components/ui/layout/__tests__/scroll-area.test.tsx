import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ScrollArea, ScrollBar } from "../scroll-area";

describe("ScrollArea Component Hierarchy", () => {
  it("renders vertical scrollbar by default with viewport children", () => {
    const { container } = render(
      <ScrollArea type="always" data-testid="scroll-area-root" className="h-40 w-40">
        <div>Scrollable Content</div>
      </ScrollArea>
    );

    expect(screen.getByText("Scrollable Content")).toBeInTheDocument();
    const root = screen.getByTestId("scroll-area-root");
    expect(root).toHaveClass("relative", "overflow-hidden", "h-40", "w-40");

    // Default orientation is vertical: check vertical scrollbar presence
    const verticalBar = container.querySelector('[data-orientation="vertical"]');
    expect(verticalBar).toBeInTheDocument();

    // Horizontal scrollbar should NOT be rendered when orientation is vertical
    const horizontalBar = container.querySelector('[data-orientation="horizontal"]');
    expect(horizontalBar).not.toBeInTheDocument();
  });

  it("renders only horizontal scrollbar when orientation='horizontal'", () => {
    const { container } = render(
      <ScrollArea type="always" orientation="horizontal" className="w-40">
        <div>Wide Content</div>
      </ScrollArea>
    );

    const horizontalBar = container.querySelector('[data-orientation="horizontal"]');
    expect(horizontalBar).toBeInTheDocument();

    const verticalBar = container.querySelector('[data-orientation="vertical"]');
    expect(verticalBar).not.toBeInTheDocument();
  });

  it("renders both scrollbars when orientation='both'", () => {
    const { container } = render(
      <ScrollArea type="always" orientation="both">
        <div>2D Content</div>
      </ScrollArea>
    );

    const verticalBar = container.querySelector('[data-orientation="vertical"]');
    const horizontalBar = container.querySelector('[data-orientation="horizontal"]');
    expect(verticalBar).toBeInTheDocument();
    expect(horizontalBar).toBeInTheDocument();
  });

  it("forwards ref to ScrollArea root DOM element", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <ScrollArea ref={ref}>
        <div>Ref Content</div>
      </ScrollArea>
    );

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current?.className).toContain("relative overflow-hidden");
  });

  it("renders standalone ScrollBar with vertical and horizontal styles", () => {
    const { container, rerender } = render(
      <ScrollArea type="always" orientation="vertical">
        <div>Custom Bar Content</div>
      </ScrollArea>
    );

    const verticalBar = container.querySelector('[data-orientation="vertical"]');
    expect(verticalBar?.className).toContain("h-full w-2.5");

    rerender(
      <ScrollArea type="always" orientation="horizontal">
        <div>Custom Bar Content</div>
      </ScrollArea>
    );

    const horizontalBar = container.querySelector('[data-orientation="horizontal"]');
    expect(horizontalBar?.className).toContain("h-2.5 flex-col");
  });

  it("forwards ref and renders custom className on standalone ScrollBar", () => {
    const scrollBarRef = React.createRef<HTMLDivElement>();
    render(
      <ScrollArea type="always" orientation="vertical">
        <div>Content</div>
        <ScrollBar ref={scrollBarRef} orientation="vertical" className="custom-scrollbar-class" />
      </ScrollArea>
    );

    expect(scrollBarRef.current).toBeInstanceOf(HTMLDivElement);
    expect(scrollBarRef.current?.className).toContain("custom-scrollbar-class");
  });
});
