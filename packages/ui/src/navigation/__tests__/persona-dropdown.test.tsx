import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { PersonaDropdown } from "../persona-dropdown";

describe("PersonaDropdown", () => {
  const personas = [
    {
      id: "workspace_admin",
      title: "Workspace Admin",
      subtitle: "Full administration authority",
      icon: <span data-testid="admin-icon">ADM</span>,
    },
    {
      id: "project_member",
      title: "Project Member",
      subtitle: "Standard project access",
    },
    {
      id: "billing_auditor",
      title: "Billing Auditor",
      subtitle: "Read only financial access",
    },
  ];

  it("renders trigger label with active persona title", () => {
    render(
      <PersonaDropdown
        personas={personas}
        activePersonaId="workspace_admin"
        onSelectPersona={vi.fn()}
      />
    );

    expect(screen.getByText("Workspace Admin")).toBeInTheDocument();
    expect(screen.getByTestId("admin-icon")).toBeInTheDocument();
  });

  it("renders custom triggerLabel when provided", () => {
    render(
      <PersonaDropdown
        personas={personas}
        activePersonaId="workspace_admin"
        triggerLabel="Switch Workspace Role"
        onSelectPersona={vi.fn()}
      />
    );

    expect(screen.getByText("Switch Workspace Role")).toBeInTheDocument();
    expect(screen.queryByText("Workspace Admin")).not.toBeInTheDocument();
  });

  it("renders 'Select Role' fallback when activePersonaId is undefined", () => {
    render(
      <PersonaDropdown
        personas={personas}
        onSelectPersona={vi.fn()}
      />
    );

    expect(screen.getByText("Select Role")).toBeInTheDocument();
  });

  it("opens menu on trigger click and displays all persona options and subtitles", async () => {
    render(
      <PersonaDropdown
        personas={personas}
        activePersonaId="workspace_admin"
        onSelectPersona={vi.fn()}
      />
    );

    expect(screen.queryByRole("menu")).not.toBeInTheDocument();

    const trigger = screen.getByRole("button", { name: /workspace admin/i });
    fireEvent.pointerDown(trigger);
    fireEvent.pointerUp(trigger);
    fireEvent.click(trigger);

    const menu = await screen.findByRole("menu");
    expect(menu).toBeInTheDocument();
    expect(screen.getByText("Switch Persona / View")).toBeInTheDocument();
    expect(screen.getByText("Full administration authority")).toBeInTheDocument();
    expect(screen.getByText("Project Member")).toBeInTheDocument();
    expect(screen.getByText("Standard project access")).toBeInTheDocument();
    expect(screen.getByText("Billing Auditor")).toBeInTheDocument();
    expect(screen.getByText("Read only financial access")).toBeInTheDocument();
  });

  it("invokes onSelectPersona callback with persona id when an option is clicked", async () => {
    const handleSelect = vi.fn();

    render(
      <PersonaDropdown
        personas={personas}
        activePersonaId="workspace_admin"
        onSelectPersona={handleSelect}
      />
    );

    const trigger = screen.getByRole("button", { name: /workspace admin/i });
    fireEvent.pointerDown(trigger);
    fireEvent.pointerUp(trigger);
    fireEvent.click(trigger);

    const memberOption = await screen.findByText("Project Member");
    const menuItem = memberOption.closest("[role='menuitem']");
    expect(menuItem).toBeInTheDocument();

    if (menuItem) {
      fireEvent.pointerDown(menuItem);
      fireEvent.pointerUp(menuItem);
      fireEvent.click(menuItem);
    }

    expect(handleSelect).toHaveBeenCalledWith("project_member");

    await waitFor(() => {
      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });
  });

  it("highlights the currently active persona and displays check icon", async () => {
    render(
      <PersonaDropdown
        personas={personas}
        activePersonaId="workspace_admin"
        onSelectPersona={vi.fn()}
      />
    );

    const trigger = screen.getByRole("button", { name: /workspace admin/i });
    fireEvent.pointerDown(trigger);
    fireEvent.pointerUp(trigger);
    fireEvent.click(trigger);

    await screen.findByRole("menu");

    const adminOption = screen.getAllByText("Workspace Admin")[1]?.closest("[role='menuitem']");
    expect(adminOption).toHaveClass("bg-indigo-50/70");

    const checkSvg = adminOption?.querySelector(".lucide-check");
    expect(checkSvg).toBeInTheDocument();

    const memberOption = screen.getByText("Project Member").closest("[role='menuitem']");
    expect(memberOption?.querySelector(".lucide-check")).not.toBeInTheDocument();
  });

  it("supports keyboard interactions: opens on Enter and dismisses on Escape", async () => {
    render(
      <PersonaDropdown
        personas={personas}
        activePersonaId="workspace_admin"
        onSelectPersona={vi.fn()}
      />
    );

    const trigger = screen.getByRole("button", { name: /workspace admin/i });
    fireEvent.keyDown(trigger, { key: "Enter", code: "Enter" });
    fireEvent.click(trigger);

    const menu = await screen.findByRole("menu");
    expect(menu).toBeInTheDocument();

    fireEvent.keyDown(menu, { key: "Escape", code: "Escape" });

    await waitFor(() => {
      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });
  });

  it("applies custom className to the trigger button", () => {
    render(
      <PersonaDropdown
        personas={personas}
        activePersonaId="workspace_admin"
        onSelectPersona={vi.fn()}
        className="custom-persona-btn"
      />
    );

    const trigger = screen.getByRole("button", { name: /workspace admin/i });
    expect(trigger).toHaveClass("custom-persona-btn");
  });

  it("handles empty personas list gracefully", () => {
    render(
      <PersonaDropdown
        personas={[]}
        onSelectPersona={vi.fn()}
      />
    );

    expect(screen.getByText("Select Role")).toBeInTheDocument();
  });
});
