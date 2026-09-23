import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { LineItemsCard, LineItem } from "../line-items-card";

describe("LineItemsCard", () => {
  const sampleItems: LineItem[] = [
    {
      id: "item-1",
      name: "High Density Polyethylene Granules",
      hsn_code: "39011010",
      ordered_qty: 100,
      unit: "KG",
      base_price: 150,
      total_tax: 2700,
      total_amount: 17700,
      bill_status: "BILLED",
      ean_code: "8901234567890",
    },
  ];

  it("renders line items with HSN, quantity, unit rate, tax, and total amount", () => {
    const { container } = render(<LineItemsCard items={sampleItems} showBillStatus={true} />);

    expect(screen.getByText("High Density Polyethylene Granules")).toBeInTheDocument();
    expect(screen.getByText("39011010")).toBeInTheDocument();
    expect(screen.getByText("100 KG")).toBeInTheDocument();
    expect(screen.getByText("BILLED")).toBeInTheDocument();
    expect(screen.getByText("EAN: 8901234567890")).toBeInTheDocument();
    expect(screen.getByText("$150.00")).toBeInTheDocument();
    expect(screen.getByText("$2,700.00")).toBeInTheDocument();

    // Verify row total and footer total
    const totals = screen.getAllByText("$17,700.00");
    expect(totals).toHaveLength(2);

    const tbody = container.querySelector("tbody");
    expect(tbody).toBeInTheDocument();
    expect(within(tbody!).getByText("$17,700.00")).toBeInTheDocument();
  });

  it("displays empty message when items array is empty", () => {
    const { rerender } = render(<LineItemsCard items={[]} />);
    expect(screen.getByText("No line items available.")).toBeInTheDocument();

    rerender(<LineItemsCard items={[]} emptyMessage="Custom empty inventory" />);
    expect(screen.getByText("Custom empty inventory")).toBeInTheDocument();
  });

  it("computes line totals dynamically when total_amount is not explicitly set", () => {
    render(
      <LineItemsCard
        items={[
          {
            id: "comp-1",
            item_name: "Industrial Steel Fasteners",
            qty: 25,
            unit_price: 40,
            unit: "PCS",
          },
        ]}
      />
    );
    expect(screen.getByText("Industrial Steel Fasteners")).toBeInTheDocument();
    expect(screen.getByText("25 PCS")).toBeInTheDocument();
    expect(screen.getByText("$40.00")).toBeInTheDocument();
    // 25 * 40 = 1000 appears in line row and footer grand total
    const thousandTotals = screen.getAllByText("$1,000.00");
    expect(thousandTotals).toHaveLength(2);
  });

  it("calculates and displays grand total sum across multiple items in footer", () => {
    const multiItems: LineItem[] = [
      { id: "1", name: "Item A", ordered_qty: 10, base_price: 100, total_amount: 1000 },
      { id: "2", name: "Item B", ordered_qty: 5, base_price: 200, total_amount: 1000 },
    ];

    const { container } = render(<LineItemsCard items={multiItems} />);
    const tfoot = container.querySelector("tfoot");
    expect(tfoot).toBeInTheDocument();
    expect(within(tfoot!).getByText("Total")).toBeInTheDocument();
    // Footer grand total: 1000 + 1000 = 2000
    expect(within(tfoot!).getByText("$2,000.00")).toBeInTheDocument();
  });

  it("renders custom footerLabel and custom footerTotal when provided", () => {
    render(
      <LineItemsCard
        items={sampleItems}
        footerLabel="Final Invoice Total"
        footerTotal={99999.5}
      />
    );

    expect(screen.getByText("Final Invoice Total")).toBeInTheDocument();
    expect(screen.getByText("$99,999.50")).toBeInTheDocument();
  });

  it("renders quantity breakdown columns when showQtyBreakdown is true", () => {
    const breakdownItems: LineItem[] = [
      {
        id: "bd-1",
        name: "Polymer Resin",
        ordered_qty: 100,
        accepted_qty: 85,
        rejected_qty: 15,
        unit: "L",
      },
    ];

    render(<LineItemsCard items={breakdownItems} showQtyBreakdown={true} />);

    expect(screen.getByRole("columnheader", { name: /accepted/i })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /rejected/i })).toBeInTheDocument();
    expect(screen.getByText("85")).toBeInTheDocument();
    expect(screen.getByText("15")).toBeInTheDocument();
  });

  it("renders bill status badges with corresponding styling for various statuses", () => {
    const statusItems: LineItem[] = [
      { id: "s1", name: "Item 1", bill_status: "RECEIVED" },
      { id: "s2", name: "Item 2", bill_status: "BILLED" },
      { id: "s3", name: "Item 3", bill_status: "PARTIALLY_BILLED" },
      { id: "s4", name: "Item 4", bill_status: "CANCELLED" },
      { id: "s5", name: "Item 5", bill_status: "PENDING_REVIEW" },
      { id: "s6", name: "Item 6" }, // missing status
    ];

    render(<LineItemsCard items={statusItems} showBillStatus={true} />);

    expect(screen.getByText("RECEIVED")).toBeInTheDocument();
    expect(screen.getByText("BILLED")).toBeInTheDocument();
    expect(screen.getByText("PARTIALLY BILLED")).toBeInTheDocument();
    expect(screen.getByText("CANCELLED")).toBeInTheDocument();
    expect(screen.getByText("PENDING REVIEW")).toBeInTheDocument();
  });

  it("applies maskFormatter to format currency values when provided", () => {
    const customMask = (val: string) => `HIDDEN (${val.length} chars)`;

    render(
      <LineItemsCard
        items={sampleItems}
        maskFormatter={customMask}
      />
    );

    // All currency values should pass through the mask formatter
    expect(screen.getAllByText(/^HIDDEN/)).not.toHaveLength(0);
  });

  it("handles fallback field values gracefully (hsn_sac_code, missing tax, missing name)", () => {
    const fallbackItem: LineItem[] = [
      {
        id: "fallback-1",
        hsn_sac_code: "998311",
        qty: 2,
        unit_price: 50,
      },
    ];

    render(<LineItemsCard items={fallbackItem} />);

    // item.name and item.item_name are missing -> "—"
    expect(screen.getByText("998311")).toBeInTheDocument();
    // Tax is missing -> renders "—"
    const dashes = screen.getAllByText("—");
    expect(dashes.length).toBeGreaterThanOrEqual(1);
  });

  it("passes through custom className and HTML container attributes", () => {
    render(
      <LineItemsCard
        items={sampleItems}
        className="custom-line-items"
        data-testid="line-items-container"
        id="order-lines"
      />
    );

    const container = screen.getByTestId("line-items-container");
    expect(container).toHaveClass("custom-line-items");
    expect(container).toHaveClass("rounded-xl");
    expect(container).toHaveAttribute("id", "order-lines");
  });
});
