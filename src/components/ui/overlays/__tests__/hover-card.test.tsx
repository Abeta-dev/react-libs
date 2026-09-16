import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "../hover-card";

describe("HoverCard Component Hierarchy", () => {
  it("renders trigger and content in controlled open state", () => {
    render(
      <HoverCard open={true}>
        <HoverCardTrigger asChild>
          <a href="https://abeta.dev">Abeta Dev</a>
        </HoverCardTrigger>
        <HoverCardContent data-testid="hover-card-content">
          <p>Hover Card Information</p>
        </HoverCardContent>
      </HoverCard>
    );

    expect(screen.getByText("Abeta Dev")).toBeInTheDocument();
    const content = screen.getByTestId("hover-card-content");
    expect(content).toBeInTheDocument();
    expect(screen.getByText("Hover Card Information")).toBeInTheDocument();
    expect(content.className).toContain("z-50");
    expect(content.className).toContain("w-64");
  });

  it("applies default alignment and custom classNames", () => {
    render(
      <HoverCard open={true}>
        <HoverCardTrigger>Hover Me</HoverCardTrigger>
        <HoverCardContent
          data-testid="hover-card-content-default"
          className="custom-hover-class"
        >
          Default Content
        </HoverCardContent>
      </HoverCard>
    );

    const content = screen.getByTestId("hover-card-content-default");
    expect(content).toHaveAttribute("data-align", "center");
    expect(content.className).toContain("custom-hover-class");
    expect(content.className).toContain("z-50");
  });

  it("forwards ref to HoverCardContent DOM element", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <HoverCard open={true}>
        <HoverCardTrigger>Hover Target</HoverCardTrigger>
        <HoverCardContent ref={ref}>
          Ref Content
        </HoverCardContent>
      </HoverCard>
    );

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current?.textContent).toContain("Ref Content");
  });

  it("does not render content in DOM when open is false", () => {
    render(
      <HoverCard open={false}>
        <HoverCardTrigger>Hover Closed</HoverCardTrigger>
        <HoverCardContent data-testid="hover-card-content">
          Hidden Content
        </HoverCardContent>
      </HoverCard>
    );

    expect(screen.getByText("Hover Closed")).toBeInTheDocument();
    expect(screen.queryByTestId("hover-card-content")).not.toBeInTheDocument();
  });
});
