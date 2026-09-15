import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CreateEntityPanel } from "../create-entity-panel";

describe("CreateEntityPanel", () => {
  it("renders slide-over sheet with title, description, custom icon, and body children when open is true", () => {
    const handleClose = vi.fn();
    const customIcon = <span data-testid="custom-org-icon">Icon</span>;

    render(
      <CreateEntityPanel
        open={true}
        onOpenChange={handleClose}
        title="Create New Organization"
        description="Fill organization details"
        icon={customIcon}
      >
        <div data-testid="panel-content">Form Body Inputs</div>
      </CreateEntityPanel>
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Create New Organization")).toBeInTheDocument();
    expect(screen.getByText("Fill organization details")).toBeInTheDocument();
    expect(screen.getByTestId("custom-org-icon")).toBeInTheDocument();
    expect(screen.getByTestId("panel-content")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
  });

  it("does not render panel content when open is false", () => {
    render(
      <CreateEntityPanel
        open={false}
        onOpenChange={vi.fn()}
        title="Closed Panel Title"
      >
        <div>Should not be visible</div>
      </CreateEntityPanel>
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.queryByText("Closed Panel Title")).not.toBeInTheDocument();
    expect(screen.queryByText("Should not be visible")).not.toBeInTheDocument();
  });

  it("handles custom save and cancel labels and triggers onSave callback", () => {
    const handleSave = vi.fn();
    const handleClose = vi.fn();

    render(
      <CreateEntityPanel
        open={true}
        onOpenChange={handleClose}
        title="Edit Vendor"
        onSave={handleSave}
        saveLabel="Commit Changes"
        cancelLabel="Discard"
      >
        <div>Vendor fields</div>
      </CreateEntityPanel>
    );

    const saveButton = screen.getByRole("button", { name: "Commit Changes" });
    const cancelButton = screen.getByRole("button", { name: "Discard" });

    expect(saveButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();

    fireEvent.click(saveButton);
    expect(handleSave).toHaveBeenCalledTimes(1);

    fireEvent.click(cancelButton);
    expect(handleClose).toHaveBeenCalledWith(false);
  });

  it("calls onOpenChange(false) when the X close button is clicked", () => {
    const handleClose = vi.fn();

    render(
      <CreateEntityPanel
        open={true}
        onOpenChange={handleClose}
        title="Close Test"
      >
        <div>Content</div>
      </CreateEntityPanel>
    );

    const closeIconButton = screen.getByRole("button", { name: /close/i });
    expect(closeIconButton).toBeInTheDocument();

    fireEvent.click(closeIconButton);
    expect(handleClose).toHaveBeenCalledWith(false);
  });

  it("disables both save and cancel buttons and displays loading spinner when isSaving is true", () => {
    const handleSave = vi.fn();
    const handleClose = vi.fn();

    render(
      <CreateEntityPanel
        open={true}
        onOpenChange={handleClose}
        title="Saving State"
        onSave={handleSave}
        saveLabel="Save & Apply"
        cancelLabel="Cancel"
        isSaving={true}
      >
        <div>Saving form</div>
      </CreateEntityPanel>
    );

    const saveButton = screen.getByRole("button", { name: /save & apply/i });
    const cancelButton = screen.getByRole("button", { name: /cancel/i });

    expect(saveButton).toBeDisabled();
    expect(cancelButton).toBeDisabled();

    // Spinner svg exists inside save button
    const spinner = saveButton.querySelector(".animate-spin");
    expect(spinner).toBeInTheDocument();

    // Clicking disabled buttons does not trigger callbacks
    fireEvent.click(saveButton);
    expect(handleSave).not.toHaveBeenCalled();

    fireEvent.click(cancelButton);
    expect(handleClose).not.toHaveBeenCalled();
  });

  it("hides save button completely in readOnly mode while keeping cancel active", () => {
    const handleSave = vi.fn();
    const handleClose = vi.fn();

    render(
      <CreateEntityPanel
        open={true}
        onOpenChange={handleClose}
        title="Audit View"
        onSave={handleSave}
        saveLabel="Save Changes"
        readOnly={true}
      >
        <div>Read only information</div>
      </CreateEntityPanel>
    );

    expect(screen.queryByRole("button", { name: "Save Changes" })).not.toBeInTheDocument();

    const cancelButton = screen.getByRole("button", { name: "Cancel" });
    expect(cancelButton).toBeInTheDocument();
    fireEvent.click(cancelButton);
    expect(handleClose).toHaveBeenCalledWith(false);
  });

  it("does not render save button when onSave is not provided", () => {
    render(
      <CreateEntityPanel
        open={true}
        onOpenChange={vi.fn()}
        title="Info Only"
      >
        <div>Informational details</div>
      </CreateEntityPanel>
    );

    expect(screen.queryByRole("button", { name: /save/i })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
  });

  it("applies correct responsive max-width classes corresponding to size prop", () => {
    const { rerender } = render(
      <CreateEntityPanel
        open={true}
        onOpenChange={vi.fn()}
        title="Size sm"
        size="sm"
      >
        <div>sm content</div>
      </CreateEntityPanel>
    );
    expect(screen.getByRole("dialog")).toHaveClass("sm:max-w-md");

    rerender(
      <CreateEntityPanel
        open={true}
        onOpenChange={vi.fn()}
        title="Size lg"
        size="lg"
      >
        <div>lg content</div>
      </CreateEntityPanel>
    );
    expect(screen.getByRole("dialog")).toHaveClass("sm:max-w-xl");

    rerender(
      <CreateEntityPanel
        open={true}
        onOpenChange={vi.fn()}
        title="Size xl"
        size="xl"
      >
        <div>xl content</div>
      </CreateEntityPanel>
    );
    expect(screen.getByRole("dialog")).toHaveClass("sm:max-w-2xl");

    rerender(
      <CreateEntityPanel
        open={true}
        onOpenChange={vi.fn()}
        title="Size default"
        size="default"
      >
        <div>default content</div>
      </CreateEntityPanel>
    );
    expect(screen.getByRole("dialog")).toHaveClass("sm:max-w-lg");
  });

  it("dismisses panel when Escape key is pressed", () => {
    const handleClose = vi.fn();

    render(
      <CreateEntityPanel
        open={true}
        onOpenChange={handleClose}
        title="Escape Dismissal"
      >
        <div>Press Escape</div>
      </CreateEntityPanel>
    );

    const dialog = screen.getByRole("dialog");
    fireEvent.keyDown(dialog, { key: "Escape", code: "Escape" });
    expect(handleClose).toHaveBeenCalledWith(false);
  });
});
