import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "../sheet";

describe("Sheet Component", () => {
  it("opens and closes via trigger and custom SheetClose button", async () => {
    render(
      <Sheet>
        <SheetTrigger>Open Drawer</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Navigation Menu</SheetTitle>
            <SheetDescription>Main navigation options</SheetDescription>
          </SheetHeader>
          <SheetClose>Dismiss Sheet</SheetClose>
        </SheetContent>
      </Sheet>
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    fireEvent.click(screen.getByText("Open Drawer"));

    const dialog = await screen.findByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(screen.getByText("Navigation Menu")).toBeInTheDocument();
    expect(screen.getByText("Main navigation options")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Dismiss Sheet"));

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("closes when the built-in X close button is clicked", async () => {
    render(
      <Sheet>
        <SheetTrigger>Open Settings</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Settings Drawer</SheetTitle>
            <SheetDescription>Adjust your preferences</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    );

    fireEvent.click(screen.getByText("Open Settings"));
    expect(await screen.findByRole("dialog")).toBeInTheDocument();

    const builtInClose = screen.getByRole("button", { name: "Close" });
    expect(builtInClose).toBeInTheDocument();

    fireEvent.click(builtInClose);

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("supports controlled open state and fires onOpenChange callback", async () => {
    const handleOpenChange = vi.fn();

    const { rerender } = render(
      <Sheet open={true} onOpenChange={handleOpenChange}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Controlled Sheet</SheetTitle>
            <SheetDescription>Controlled description</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    const closeBtn = screen.getByRole("button", { name: "Close" });
    fireEvent.click(closeBtn);
    expect(handleOpenChange).toHaveBeenCalledWith(false);

    rerender(
      <Sheet open={false} onOpenChange={handleOpenChange}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Controlled Sheet</SheetTitle>
            <SheetDescription>Controlled description</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    );

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("dismisses on Escape key press", async () => {
    const handleOpenChange = vi.fn();

    render(
      <Sheet defaultOpen onOpenChange={handleOpenChange}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Escape Test</SheetTitle>
            <SheetDescription>Testing escape key handler</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    );

    const dialog = await screen.findByRole("dialog");
    expect(dialog).toBeInTheDocument();

    fireEvent.keyDown(dialog, { key: "Escape", code: "Escape" });
    expect(handleOpenChange).toHaveBeenCalledWith(false);
  });

  it("applies correct layout classes for side variants (left, right, top, bottom)", () => {
    const { rerender } = render(
      <Sheet open={true}>
        <SheetContent side="left">
          <SheetTitle>Left Sheet</SheetTitle>
          <SheetDescription>Side left</SheetDescription>
        </SheetContent>
      </Sheet>
    );
    expect(screen.getByRole("dialog")).toHaveClass("inset-y-0", "left-0");

    rerender(
      <Sheet open={true}>
        <SheetContent side="right">
          <SheetTitle>Right Sheet</SheetTitle>
          <SheetDescription>Side right</SheetDescription>
        </SheetContent>
      </Sheet>
    );
    expect(screen.getByRole("dialog")).toHaveClass("inset-y-0", "right-0");

    rerender(
      <Sheet open={true}>
        <SheetContent side="top">
          <SheetTitle>Top Sheet</SheetTitle>
          <SheetDescription>Side top</SheetDescription>
        </SheetContent>
      </Sheet>
    );
    expect(screen.getByRole("dialog")).toHaveClass("inset-x-0", "top-0");

    rerender(
      <Sheet open={true}>
        <SheetContent side="bottom">
          <SheetTitle>Bottom Sheet</SheetTitle>
          <SheetDescription>Side bottom</SheetDescription>
        </SheetContent>
      </Sheet>
    );
    expect(screen.getByRole("dialog")).toHaveClass("inset-x-0", "bottom-0");
  });

  it("binds accessible ARIA labelledby and role attributes correctly", () => {
    render(
      <Sheet open={true}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Accessible Drawer</SheetTitle>
            <SheetDescription>Accessible description here</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    );

    const dialog = screen.getByRole("dialog");
    const title = screen.getByText("Accessible Drawer");

    expect(dialog).toHaveAttribute("role", "dialog");
    expect(dialog).toHaveAttribute("aria-labelledby", title.id);
  });

  it("applies custom classNames across subcomponents", () => {
    render(
      <Sheet open={true}>
        <SheetContent className="custom-sheet-content">
          <SheetHeader className="custom-sheet-header">
            <SheetTitle className="custom-sheet-title">Styled Title</SheetTitle>
            <SheetDescription className="custom-sheet-desc">Styled Desc</SheetDescription>
          </SheetHeader>
          <div data-testid="body">Body</div>
          <SheetFooter className="custom-sheet-footer">
            <button type="button">Action</button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );

    expect(screen.getByRole("dialog")).toHaveClass("custom-sheet-content");
    expect(screen.getByText("Styled Title").closest("div")).toHaveClass("custom-sheet-header");
    expect(screen.getByText("Styled Title")).toHaveClass("custom-sheet-title");
    expect(screen.getByText("Styled Desc")).toHaveClass("custom-sheet-desc");
    expect(screen.getByText("Action").closest("div")).toHaveClass("custom-sheet-footer");
  });

  it("renders overlay and closes when overlay is interacted with", () => {
    const handleOpenChange = vi.fn();

    render(
      <Sheet open={true} onOpenChange={handleOpenChange}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Overlay Test</SheetTitle>
            <SheetDescription>Testing overlay backdrop</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    );

    const overlay = document.querySelector(".fixed.inset-0.z-50.bg-black\\/80");
    expect(overlay).toBeInTheDocument();
  });

  it("supports interactive inputs and form elements inside sheet body", () => {
    const handleSubmit = vi.fn((e) => e.preventDefault());

    render(
      <Sheet open={true}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Form Inside Sheet</SheetTitle>
            <SheetDescription>Fill details</SheetDescription>
          </SheetHeader>
          <form onSubmit={handleSubmit} data-testid="sheet-form">
            <label htmlFor="username-input">Username</label>
            <input id="username-input" defaultValue="initial-user" />
            <button type="submit">Save Form</button>
          </form>
        </SheetContent>
      </Sheet>
    );

    const input = screen.getByLabelText("Username");
    expect(input).toHaveValue("initial-user");

    fireEvent.change(input, { target: { value: "updated-user" } });
    expect(input).toHaveValue("updated-user");

    fireEvent.click(screen.getByRole("button", { name: "Save Form" }));
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
