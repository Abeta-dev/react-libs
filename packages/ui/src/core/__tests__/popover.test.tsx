import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
  PopoverAnchor,
} from "../popover";

describe("Popover Component", () => {
  it("toggles open and closed when trigger is clicked and manages aria-expanded", async () => {
    render(
      <Popover>
        <PopoverTrigger>Toggle Details</PopoverTrigger>
        <PopoverContent>
          <div data-testid="popover-body">Popover Information</div>
        </PopoverContent>
      </Popover>
    );

    const trigger = screen.getByRole("button", { name: "Toggle Details" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveAttribute("aria-haspopup", "dialog");
    expect(screen.queryByTestId("popover-body")).not.toBeInTheDocument();

    fireEvent.click(trigger);

    const body = await screen.findByTestId("popover-body");
    expect(body).toBeInTheDocument();
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    fireEvent.click(trigger);

    await waitFor(() => {
      expect(screen.queryByTestId("popover-body")).not.toBeInTheDocument();
      expect(trigger).toHaveAttribute("aria-expanded", "false");
    });
  });

  it("closes when PopoverClose button is clicked", async () => {
    render(
      <Popover>
        <PopoverTrigger>Open Dialog</PopoverTrigger>
        <PopoverContent>
          <div>Panel Content</div>
          <PopoverClose>Dismiss</PopoverClose>
        </PopoverContent>
      </Popover>
    );

    fireEvent.click(screen.getByRole("button", { name: "Open Dialog" }));
    expect(await screen.findByText("Panel Content")).toBeInTheDocument();

    const closeBtn = screen.getByRole("button", { name: "Dismiss" });
    fireEvent.click(closeBtn);

    await waitFor(() => {
      expect(screen.queryByText("Panel Content")).not.toBeInTheDocument();
    });
  });

  it("closes when clicking outside target area", async () => {
    render(
      <div>
        <button type="button" data-testid="outside-button">
          Outside Area
        </button>
        <Popover>
          <PopoverTrigger>Filter Options</PopoverTrigger>
          <PopoverContent>
            <div data-testid="filter-box">Filter Controls</div>
          </PopoverContent>
        </Popover>
      </div>
    );

    fireEvent.click(screen.getByRole("button", { name: "Filter Options" }));
    expect(await screen.findByTestId("filter-box")).toBeInTheDocument();

    const outsideTarget = screen.getByTestId("outside-button");
    fireEvent.pointerDown(outsideTarget);
    fireEvent.pointerUp(outsideTarget);
    fireEvent.click(outsideTarget);

    await waitFor(() => {
      expect(screen.queryByTestId("filter-box")).not.toBeInTheDocument();
    });
  });

  it("closes on Escape key press", async () => {
    render(
      <Popover>
        <PopoverTrigger>Open Menu</PopoverTrigger>
        <PopoverContent>
          <div data-testid="popover-content">Interactive Content</div>
        </PopoverContent>
      </Popover>
    );

    fireEvent.click(screen.getByRole("button", { name: "Open Menu" }));
    const content = await screen.findByTestId("popover-content");
    expect(content).toBeInTheDocument();

    fireEvent.keyDown(content, { key: "Escape", code: "Escape" });

    await waitFor(() => {
      expect(screen.queryByTestId("popover-content")).not.toBeInTheDocument();
    });
  });

  it("supports controlled open state and fires onOpenChange callback", async () => {
    const handleOpenChange = vi.fn();

    const { rerender } = render(
      <Popover open={true} onOpenChange={handleOpenChange}>
        <PopoverTrigger>Controlled Trigger</PopoverTrigger>
        <PopoverContent>
          <div data-testid="controlled-content">Controlled Panel</div>
        </PopoverContent>
      </Popover>
    );

    expect(screen.getByTestId("controlled-content")).toBeInTheDocument();

    const trigger = screen.getByRole("button", { name: "Controlled Trigger" });
    fireEvent.click(trigger);
    expect(handleOpenChange).toHaveBeenCalledWith(false);

    rerender(
      <Popover open={false} onOpenChange={handleOpenChange}>
        <PopoverTrigger>Controlled Trigger</PopoverTrigger>
        <PopoverContent>
          <div data-testid="controlled-content">Controlled Panel</div>
        </PopoverContent>
      </Popover>
    );

    await waitFor(() => {
      expect(screen.queryByTestId("controlled-content")).not.toBeInTheDocument();
    });
  });

  it("applies custom classNames to PopoverContent", async () => {
    render(
      <Popover defaultOpen>
        <PopoverTrigger>Styling Trigger</PopoverTrigger>
        <PopoverContent className="custom-test-popover bg-slate-100">
          <div>Styled Content</div>
        </PopoverContent>
      </Popover>
    );

    const contentWrapper = await screen.findByText("Styled Content");
    const popoverContainer = contentWrapper.closest(".custom-test-popover");
    expect(popoverContainer).toBeInTheDocument();
    expect(popoverContainer).toHaveClass("bg-slate-100");
  });

  it("passes align, sideOffset, and side props correctly", async () => {
    render(
      <Popover defaultOpen>
        <PopoverTrigger>Props Trigger</PopoverTrigger>
        <PopoverContent align="center" sideOffset={12} side="bottom">
          <div data-testid="aligned-content">Aligned Content</div>
        </PopoverContent>
      </Popover>
    );

    const content = await screen.findByTestId("aligned-content");
    const container = content.closest("[data-radix-popper-content-wrapper]");
    expect(container).toBeInTheDocument();
  });

  it("renders with PopoverAnchor as positioning boundary", async () => {
    render(
      <Popover defaultOpen>
        <PopoverAnchor asChild>
          <div data-testid="custom-anchor">Anchor Reference</div>
        </PopoverAnchor>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>
          <div data-testid="anchored-content">Anchored Content</div>
        </PopoverContent>
      </Popover>
    );

    expect(screen.getByTestId("custom-anchor")).toBeInTheDocument();
    expect(await screen.findByTestId("anchored-content")).toBeInTheDocument();
  });

  it("handles form submission and user input within popover body", async () => {
    const handleSubmit = vi.fn((e) => e.preventDefault());

    render(
      <Popover defaultOpen>
        <PopoverTrigger>Open Form</PopoverTrigger>
        <PopoverContent>
          <form onSubmit={handleSubmit} data-testid="popover-form">
            <label htmlFor="search-box">Search Query</label>
            <input id="search-box" placeholder="Type here..." />
            <button type="submit">Apply Filter</button>
          </form>
        </PopoverContent>
      </Popover>
    );

    const input = screen.getByLabelText("Search Query");
    fireEvent.change(input, { target: { value: "Engineering" } });
    expect(input).toHaveValue("Engineering");

    fireEvent.click(screen.getByRole("button", { name: "Apply Filter" }));
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
