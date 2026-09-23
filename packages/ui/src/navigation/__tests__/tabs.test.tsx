import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../tabs";

describe("Tabs Component", () => {
  it("renders default active tab and displays corresponding tabpanel content", () => {
    render(
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">Overview Details Panel</TabsContent>
        <TabsContent value="analytics">Analytics Dashboard Panel</TabsContent>
        <TabsContent value="reports">Reports Summary Panel</TabsContent>
      </Tabs>
    );

    const overviewTab = screen.getByRole("tab", { name: "Overview" });
    const analyticsTab = screen.getByRole("tab", { name: "Analytics" });

    expect(overviewTab).toHaveAttribute("data-state", "active");
    expect(overviewTab).toHaveAttribute("aria-selected", "true");
    expect(analyticsTab).toHaveAttribute("data-state", "inactive");
    expect(analyticsTab).toHaveAttribute("aria-selected", "false");

    expect(screen.getByText("Overview Details Panel")).toBeInTheDocument();
    expect(screen.queryByText("Analytics Dashboard Panel")).not.toBeInTheDocument();
  });

  it("switches active tab and invokes onValueChange when clicked with mouse", () => {
    const handleValueChange = vi.fn();

    render(
      <Tabs defaultValue="account" onValueChange={handleValueChange}>
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">Account Settings Here</TabsContent>
        <TabsContent value="password">Password Change Controls</TabsContent>
      </Tabs>
    );

    const passwordTab = screen.getByRole("tab", { name: "Password" });

    fireEvent.mouseDown(passwordTab);
    fireEvent.click(passwordTab);

    expect(passwordTab).toHaveAttribute("data-state", "active");
    expect(handleValueChange).toHaveBeenCalledWith("password");
    expect(screen.getByText("Password Change Controls")).toBeInTheDocument();
    expect(screen.queryByText("Account Settings Here")).not.toBeInTheDocument();
  });

  it("navigates with ArrowRight and ArrowLeft in horizontal mode", () => {
    const handleValueChange = vi.fn();

    render(
      <Tabs defaultValue="first" onValueChange={handleValueChange}>
        <TabsList>
          <TabsTrigger value="first">First</TabsTrigger>
          <TabsTrigger value="second">Second</TabsTrigger>
          <TabsTrigger value="third">Third</TabsTrigger>
        </TabsList>
        <TabsContent value="first">Content 1</TabsContent>
        <TabsContent value="second">Content 2</TabsContent>
        <TabsContent value="third">Content 3</TabsContent>
      </Tabs>
    );

    const firstTab = screen.getByRole("tab", { name: "First" });
    const secondTab = screen.getByRole("tab", { name: "Second" });

    fireEvent.focus(firstTab);
    fireEvent.keyDown(firstTab, { key: "ArrowRight", code: "ArrowRight" });
    fireEvent.focus(secondTab);

    expect(secondTab).toHaveAttribute("data-state", "active");
    expect(handleValueChange).toHaveBeenCalledWith("second");

    fireEvent.keyDown(secondTab, { key: "ArrowLeft", code: "ArrowLeft" });
    fireEvent.focus(firstTab);

    expect(firstTab).toHaveAttribute("data-state", "active");
    expect(handleValueChange).toHaveBeenCalledWith("first");
  });

  it("supports vertical orientation and navigates with ArrowDown and ArrowUp", () => {
    const handleValueChange = vi.fn();

    render(
      <Tabs defaultValue="general" orientation="vertical" onValueChange={handleValueChange}>
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        <TabsContent value="general">General Settings</TabsContent>
        <TabsContent value="security">Security Settings</TabsContent>
      </Tabs>
    );

    const list = screen.getByRole("tablist");
    expect(list).toHaveAttribute("aria-orientation", "vertical");

    const generalTab = screen.getByRole("tab", { name: "General" });
    const securityTab = screen.getByRole("tab", { name: "Security" });

    fireEvent.focus(generalTab);
    fireEvent.keyDown(generalTab, { key: "ArrowDown", code: "ArrowDown" });
    fireEvent.focus(securityTab);

    expect(securityTab).toHaveAttribute("data-state", "active");
    expect(handleValueChange).toHaveBeenCalledWith("security");

    fireEvent.keyDown(securityTab, { key: "ArrowUp", code: "ArrowUp" });
    fireEvent.focus(generalTab);

    expect(generalTab).toHaveAttribute("data-state", "active");
    expect(handleValueChange).toHaveBeenCalledWith("general");
  });

  it("does not activate disabled tab on click and maintains inactive state", () => {
    const handleValueChange = vi.fn();

    render(
      <Tabs defaultValue="tab1" onValueChange={handleValueChange}>
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2" disabled>Tab 2 Disabled</TabsTrigger>
          <TabsTrigger value="tab3">Tab 3</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Tab 1 Content</TabsContent>
        <TabsContent value="tab2">Tab 2 Content</TabsContent>
        <TabsContent value="tab3">Tab 3 Content</TabsContent>
      </Tabs>
    );

    const tab2 = screen.getByRole("tab", { name: "Tab 2 Disabled" });
    expect(tab2).toBeDisabled();
    expect(tab2).toHaveAttribute("data-disabled");

    fireEvent.mouseDown(tab2);
    fireEvent.click(tab2);

    expect(handleValueChange).not.toHaveBeenCalled();
    expect(tab2).toHaveAttribute("data-state", "inactive");
  });

  it("supports controlled value state and switches content when value prop changes", () => {
    const handleValueChange = vi.fn();

    const { rerender } = render(
      <Tabs value="active-tab" onValueChange={handleValueChange}>
        <TabsList>
          <TabsTrigger value="active-tab">Active</TabsTrigger>
          <TabsTrigger value="other-tab">Other</TabsTrigger>
        </TabsList>
        <TabsContent value="active-tab">Active Content</TabsContent>
        <TabsContent value="other-tab">Other Content</TabsContent>
      </Tabs>
    );

    expect(screen.getByText("Active Content")).toBeInTheDocument();
    expect(screen.queryByText("Other Content")).not.toBeInTheDocument();

    rerender(
      <Tabs value="other-tab" onValueChange={handleValueChange}>
        <TabsList>
          <TabsTrigger value="active-tab">Active</TabsTrigger>
          <TabsTrigger value="other-tab">Other</TabsTrigger>
        </TabsList>
        <TabsContent value="active-tab">Active Content</TabsContent>
        <TabsContent value="other-tab">Other Content</TabsContent>
      </Tabs>
    );

    expect(screen.queryByText("Active Content")).not.toBeInTheDocument();
    expect(screen.getByText("Other Content")).toBeInTheDocument();
  });

  it("supports manual activation mode requiring Enter or Space key press to activate tab", () => {
    const handleValueChange = vi.fn();

    render(
      <Tabs defaultValue="first" activationMode="manual" onValueChange={handleValueChange}>
        <TabsList>
          <TabsTrigger value="first">First</TabsTrigger>
          <TabsTrigger value="second">Second</TabsTrigger>
        </TabsList>
        <TabsContent value="first">First Panel</TabsContent>
        <TabsContent value="second">Second Panel</TabsContent>
      </Tabs>
    );

    const secondTab = screen.getByRole("tab", { name: "Second" });

    // Pressing Enter activates the tab
    fireEvent.keyDown(secondTab, { key: "Enter", code: "Enter" });
    expect(handleValueChange).toHaveBeenCalledWith("second");

    // Space key also activates
    const firstTab = screen.getByRole("tab", { name: "First" });
    fireEvent.keyDown(firstTab, { key: " ", code: "Space" });
    expect(handleValueChange).toHaveBeenCalledWith("first");
  });

  it("sets proper WAI-ARIA role and control linkage between tabs and tabpanels", () => {
    render(
      <Tabs defaultValue="inbox">
        <TabsList>
          <TabsTrigger value="inbox">Inbox</TabsTrigger>
        </TabsList>
        <TabsContent value="inbox">Inbox Messages</TabsContent>
      </Tabs>
    );

    const tablist = screen.getByRole("tablist");
    const tab = screen.getByRole("tab", { name: "Inbox" });
    const tabpanel = screen.getByRole("tabpanel");

    expect(tablist).toBeInTheDocument();
    expect(tab).toHaveAttribute("aria-controls", tabpanel.id);
    expect(tabpanel).toHaveAttribute("aria-labelledby", tab.id);
  });

  it("applies custom classNames across subcomponents correctly", () => {
    render(
      <Tabs defaultValue="styled" className="custom-tabs-root">
        <TabsList className="custom-tabs-list">
          <TabsTrigger value="styled" className="custom-tabs-trigger">
            Styled Tab
          </TabsTrigger>
        </TabsList>
        <TabsContent value="styled" className="custom-tabs-content">
          Styled Panel Content
        </TabsContent>
      </Tabs>
    );

    expect(screen.getByRole("tablist").parentElement).toHaveClass("custom-tabs-root");
    expect(screen.getByRole("tablist")).toHaveClass("custom-tabs-list");
    expect(screen.getByRole("tab", { name: "Styled Tab" })).toHaveClass("custom-tabs-trigger");
    expect(screen.getByRole("tabpanel")).toHaveClass("custom-tabs-content");
  });
});
