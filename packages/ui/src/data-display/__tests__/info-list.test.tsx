import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { InfoList, InfoItem } from "../info-list";

describe("InfoList", () => {
  const sampleItems: InfoItem[] = [
    { label: "Entity Legal Name", value: "Acme Global Solutions Inc", hint: "Verified via Registry" },
    { label: "Tax Identification", value: "US-8492019" },
  ];

  it("renders key-value items with hints", () => {
    render(<InfoList items={sampleItems} />);

    expect(screen.getByText("Entity Legal Name")).toBeInTheDocument();
    expect(screen.getByText("Acme Global Solutions Inc")).toBeInTheDocument();
    expect(screen.getByText("Verified via Registry")).toBeInTheDocument();
    expect(screen.getByText("Tax Identification")).toBeInTheDocument();
    expect(screen.getByText("US-8492019")).toBeInTheDocument();
  });

  it("renders an empty list gracefully when items array is empty", () => {
    render(<InfoList items={[]} data-testid="empty-info-list" />);
    const container = screen.getByTestId("empty-info-list");
    expect(container).toBeInTheDocument();
    expect(container.children).toHaveLength(0);
  });

  it("renders items with complex ReactNode / JSX elements for labels, values, and hints", () => {
    const complexItems: InfoItem[] = [
      {
        label: (
          <span data-testid="custom-label">
            Status <span className="text-red-500">*</span>
          </span>
        ),
        value: (
          <span data-testid="custom-badge" className="badge-active">
            Active Partner
          </span>
        ),
        hint: (
          <em data-testid="custom-hint">Updated 2 days ago</em>
        ),
      },
    ];

    render(<InfoList items={complexItems} />);

    expect(screen.getByTestId("custom-label")).toBeInTheDocument();
    expect(screen.getByTestId("custom-badge")).toHaveTextContent("Active Partner");
    expect(screen.getByTestId("custom-hint")).toHaveTextContent("Updated 2 days ago");
  });

  it("omits the hint element when hint is undefined or null", () => {
    const noHintItems: InfoItem[] = [
      { label: "Account ID", value: "ACC-9921" },
    ];

    const { container } = render(<InfoList items={noHintItems} />);
    const row = container.querySelector(".flex-col");
    expect(row).toBeInTheDocument();
    // Only label and value spans, no 3rd span
    const spans = row?.querySelectorAll("span");
    expect(spans?.length).toBe(2);
  });

  it("renders numeric zero values properly", () => {
    const zeroItems: InfoItem[] = [
      { label: "Pending Invoices", value: 0, hint: "0 pending approvals" },
    ];

    render(<InfoList items={zeroItems} />);
    expect(screen.getByText("Pending Invoices")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
    expect(screen.getByText("0 pending approvals")).toBeInTheDocument();
  });

  it("applies custom className and passes through HTML attributes", () => {
    render(
      <InfoList
        items={sampleItems}
        className="custom-list-class"
        data-testid="info-list-root"
        id="info-summary"
        aria-label="Account Summary"
      />
    );

    const root = screen.getByTestId("info-list-root");
    expect(root).toHaveClass("custom-list-class");
    expect(root).toHaveClass("space-y-3");
    expect(root).toHaveAttribute("id", "info-summary");
    expect(root).toHaveAttribute("aria-label", "Account Summary");
  });

  it("applies border utility classes across item rows with last-child border removal", () => {
    const items: InfoItem[] = [
      { label: "Row 1", value: "Val 1" },
      { label: "Row 2", value: "Val 2" },
      { label: "Row 3", value: "Val 3" },
    ];

    const { container } = render(<InfoList items={items} />);
    const rows = container.querySelectorAll(".flex-col");
    expect(rows.length).toBe(3);
    rows.forEach((row) => {
      expect(row.className).toContain("border-b");
      expect(row.className).toContain("last:border-b-0");
    });
  });

  it("renders multiple items maintaining exact order", () => {
    const items: InfoItem[] = [
      { label: "First Item", value: "1" },
      { label: "Second Item", value: "2" },
      { label: "Third Item", value: "3" },
    ];

    render(<InfoList items={items} />);
    const labels = screen.getAllByText(/Item/);
    expect(labels[0]).toHaveTextContent("First Item");
    expect(labels[1]).toHaveTextContent("Second Item");
    expect(labels[2]).toHaveTextContent("Third Item");
  });
});
