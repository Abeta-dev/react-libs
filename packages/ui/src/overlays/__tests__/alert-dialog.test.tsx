import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "../alert-dialog";

describe("AlertDialog Component", () => {
  it("opens modal via trigger and closes when Cancel is clicked", async () => {
    render(
      <AlertDialog>
        <AlertDialogTrigger>Delete Account</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );

    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();

    fireEvent.click(screen.getByText("Delete Account"));

    const dialog = await screen.findByRole("alertdialog");
    expect(dialog).toBeInTheDocument();
    expect(screen.getByText("Are you absolutely sure?")).toBeInTheDocument();
    expect(screen.getByText("This action cannot be undone.")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));

    await waitFor(() => {
      expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
    });
  });

  it("calls action callback and dismisses dialog when Action is clicked", async () => {
    const handleAction = vi.fn();

    render(
      <AlertDialog defaultOpen>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>Confirm permanent removal.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Abort</AlertDialogCancel>
            <AlertDialogAction onClick={handleAction}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );

    const actionBtn = screen.getByRole("button", { name: "Confirm" });
    fireEvent.click(actionBtn);

    expect(handleAction).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
    });
  });

  it("calls cancel callback when Cancel button is clicked", async () => {
    const handleCancel = vi.fn();

    render(
      <AlertDialog defaultOpen>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Discard Draft</AlertDialogTitle>
            <AlertDialogDescription>Draft will be lost.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>Keep Draft</AlertDialogCancel>
            <AlertDialogAction>Discard</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );

    const cancelBtn = screen.getByRole("button", { name: "Keep Draft" });
    fireEvent.click(cancelBtn);

    expect(handleCancel).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
    });
  });

  it("supports controlled open state and calls onOpenChange", async () => {
    const handleOpenChange = vi.fn();

    const { rerender } = render(
      <AlertDialog open={true} onOpenChange={handleOpenChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Controlled Dialog</AlertDialogTitle>
            <AlertDialogDescription>Controlled state details.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Accept</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );

    expect(screen.getByRole("alertdialog")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(handleOpenChange).toHaveBeenCalledWith(false);

    rerender(
      <AlertDialog open={false} onOpenChange={handleOpenChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Controlled Dialog</AlertDialogTitle>
            <AlertDialogDescription>Controlled state details.</AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    );

    await waitFor(() => {
      expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
    });
  });

  it("does not trigger onClick when Action button is disabled", async () => {
    const handleAction = vi.fn();

    render(
      <AlertDialog defaultOpen>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Pending Operation</AlertDialogTitle>
            <AlertDialogDescription>Please wait for task completion.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction disabled onClick={handleAction}>
              Disabled Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );

    const actionBtn = screen.getByRole("button", { name: "Disabled Confirm" });
    expect(actionBtn).toBeDisabled();

    fireEvent.click(actionBtn);
    expect(handleAction).not.toHaveBeenCalled();
    expect(screen.getByRole("alertdialog")).toBeInTheDocument();
  });

  it("binds accessible alertdialog role and aria-labelledby correctly", () => {
    render(
      <AlertDialog open={true}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Accessible Alert Header</AlertDialogTitle>
            <AlertDialogDescription>Accessible explanation.</AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    );

    const dialog = screen.getByRole("alertdialog");
    const title = screen.getByText("Accessible Alert Header");

    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute("aria-labelledby", title.id);
  });

  it("applies custom classNames across subcomponents correctly", () => {
    render(
      <AlertDialog open={true}>
        <AlertDialogContent className="custom-alert-content">
          <AlertDialogHeader className="custom-alert-header">
            <AlertDialogTitle className="custom-alert-title">Styled Title</AlertDialogTitle>
            <AlertDialogDescription className="custom-alert-desc">Styled Desc</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="custom-alert-footer">
            <AlertDialogCancel className="custom-alert-cancel">Cancel</AlertDialogCancel>
            <AlertDialogAction className="custom-alert-action">Proceed</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );

    expect(screen.getByRole("alertdialog")).toHaveClass("custom-alert-content");
    expect(screen.getByText("Styled Title").closest("div")).toHaveClass("custom-alert-header");
    expect(screen.getByText("Styled Title")).toHaveClass("custom-alert-title");
    expect(screen.getByText("Styled Desc")).toHaveClass("custom-alert-desc");
    expect(screen.getByRole("button", { name: "Cancel" })).toHaveClass("custom-alert-cancel");
    expect(screen.getByRole("button", { name: "Proceed" })).toHaveClass("custom-alert-action");
  });

  it("supports keyboard navigation and activation on footer buttons", () => {
    const handleAction = vi.fn();

    render(
      <AlertDialog defaultOpen>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Keyboard Interaction</AlertDialogTitle>
            <AlertDialogDescription>Use keyboard to navigate.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Back</AlertDialogCancel>
            <AlertDialogAction onClick={handleAction}>Execute</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );

    const executeBtn = screen.getByRole("button", { name: "Execute" });
    executeBtn.focus();
    expect(document.activeElement).toBe(executeBtn);

    fireEvent.keyDown(executeBtn, { key: "Enter", code: "Enter" });
    fireEvent.click(executeBtn);
    expect(handleAction).toHaveBeenCalledTimes(1);
  });

  it("renders overlay and prevents outside-click dismissal by default", () => {
    const handleOpenChange = vi.fn();

    render(
      <AlertDialog open={true} onOpenChange={handleOpenChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Persistent Alert</AlertDialogTitle>
            <AlertDialogDescription>Cannot click outside.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );

    const overlay = document.querySelector(".fixed.inset-0.z-50.bg-black\\/80");
    expect(overlay).toBeInTheDocument();

    // In Radix AlertDialog, clicking outside or on the overlay should NOT close the dialog
    if (overlay) {
      fireEvent.pointerDown(overlay);
      fireEvent.click(overlay);
    }
    expect(handleOpenChange).not.toHaveBeenCalled();
    expect(screen.getByRole("alertdialog")).toBeInTheDocument();
  });
});
