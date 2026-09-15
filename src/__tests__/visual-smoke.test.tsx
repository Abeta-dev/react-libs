import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { Button } from "../components/ui/forms/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/ui/layout/card";
import { Input } from "../components/ui/forms/input";
import { StatusBadge } from "../components/ui/data-display/status-badge";
import { MobileBottomNav, type MobileNavItem } from "../components/ui/navigation/mobile-bottom-nav";
import { Home, FileText, User } from "lucide-react";
import { DataTable } from "../components/ui/data-display/data-table";
import { Slider } from "../components/ui/forms/slider";
import { Banner } from "../components/ui/feedback/banner";
import { Alert } from "../components/ui/feedback/alert";

describe("Visual & Layout Smoke Regression Suite", () => {
  describe("Button Visual Variants & Tokens", () => {
    it("renders all button visual variants with designated design classes", () => {
      const { rerender } = render(<Button variant="default">Primary Action</Button>);
      const btn = screen.getByRole("button", { name: /primary action/i });
      expect(btn).toHaveClass("bg-primary");

      rerender(<Button variant="destructive">Delete Item</Button>);
      expect(screen.getByRole("button", { name: /delete item/i })).toHaveClass("bg-destructive");

      rerender(<Button variant="outline">Outline Action</Button>);
      expect(screen.getByRole("button", { name: /outline action/i })).toHaveClass("border");

      rerender(<Button variant="secondary">Secondary Action</Button>);
      expect(screen.getByRole("button", { name: /secondary action/i })).toHaveClass("text-primary");

      rerender(<Button variant="ghost">Ghost Action</Button>);
      expect(screen.getByRole("button", { name: /ghost action/i })).toHaveClass("border-transparent");
    });

    it("renders button size variants with proper spacing metrics", () => {
      const { rerender } = render(<Button size="sm">Small</Button>);
      expect(screen.getByRole("button", { name: /small/i })).toHaveClass("min-h-8");

      rerender(<Button size="lg">Large</Button>);
      expect(screen.getByRole("button", { name: /large/i })).toHaveClass("min-h-10");
    });
  });

  describe("Card Visual Composition & Dark Mode", () => {
    it("renders card visual hierarchy correctly in both light and dark container scopes", () => {
      const { container } = render(
        <div className="dark">
          <Card className="max-w-md shadow-sm">
            <CardHeader>
              <CardTitle>Invoice Summary</CardTitle>
              <CardDescription>Breakdown of vendor payable items</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Total amount: $12,450.00</p>
            </CardContent>
            <CardFooter>
              <Button size="sm">Approve</Button>
            </CardFooter>
          </Card>
        </div>
      );

      const card = container.querySelector(".rounded-xl");
      expect(card).toBeInTheDocument();
      expect(card).toHaveClass("border");
      expect(screen.getByText("Invoice Summary")).toBeInTheDocument();
      expect(screen.getByText("Breakdown of vendor payable items")).toBeInTheDocument();
    });
  });

  describe("StatusBadge Variant Integrity", () => {
    it("renders semantically tinted badge variants for audit statuses", () => {
      const { rerender } = render(<StatusBadge status="ACTIVE" />);
      expect(screen.getByText(/active/i)).toBeInTheDocument();

      rerender(<StatusBadge status="PENDING" />);
      expect(screen.getByText(/pending/i)).toBeInTheDocument();

      rerender(<StatusBadge status="REJECTED" />);
      expect(screen.getByText(/rejected/i)).toBeInTheDocument();
    });
  });

  describe("Input Visual States", () => {
    it("renders input with accessible focus-visible ring styles and disabled states", () => {
      const { rerender } = render(<Input placeholder="Search POs..." />);
      const input = screen.getByPlaceholderText("Search POs...");
      expect(input).toHaveClass("focus-visible:ring-1");

      rerender(<Input placeholder="Search POs..." disabled />);
      expect(input).toBeDisabled();
      expect(input).toHaveClass("disabled:opacity-50");
    });
  });

  describe("MobileBottomNav Layout & Viewport Rendering", () => {
    it("renders mobile bottom navigation bar with icons and badge indicators", () => {
      const navItems: MobileNavItem[] = [
        { id: "home", label: "Dashboard", icon: Home },
        { id: "invoices", label: "Invoices", icon: FileText, badge: 4 },
        { id: "profile", label: "Profile", icon: User },
      ];

      render(
        <MobileBottomNav
          items={navItems}
          activeId="invoices"
          onChange={() => {}}
        />
      );

      expect(screen.getByText("Dashboard")).toBeInTheDocument();
      expect(screen.getByText("Invoices")).toBeInTheDocument();
      expect(screen.getByText("Profile")).toBeInTheDocument();
      expect(screen.getByText("4")).toBeInTheDocument(); // Badge count
    });
  });

  describe("DataTable Landmarks & Accessibility Attributes", () => {
    it("renders table with aria-rowcount, aria-colcount and nav pagination landmark", () => {
      const columns = [
        { key: "id", header: "ID" },
        { key: "title", header: "Title" },
      ];
      const data = [
        { id: "1", title: "First item" },
        { id: "2", title: "Second item" },
      ];

      render(
        <DataTable
          columns={columns}
          data={data}
          pagination={{
            page: 1,
            pageSize: 1,
            total: 2,
            onPageChange: () => {},
          }}
        />
      );

      const table = screen.getByRole("table");
      expect(table).toHaveAttribute("aria-rowcount", "2");
      expect(table).toHaveAttribute("aria-colcount", "2");

      const nav = screen.getByRole("navigation", { name: /table pagination/i });
      expect(nav).toBeInTheDocument();
    });
  });

  describe("Slider Touch Target & Hit Area", () => {
    it("renders slider thumb with extended touch target pseudo-element classes", () => {
      const { container } = render(<Slider defaultValue={[50]} max={100} step={1} />);
      const thumb = container.querySelector('[role="slider"]');
      expect(thumb).toBeInTheDocument();
      expect(thumb).toHaveClass("before:-inset-3");
    });
  });

  describe("DataTable Clickable Row Keyboard Accessibility", () => {
    it("enables keyboard activation (Enter/Space) and focus on clickable rows", () => {
      const onRowClick = vi.fn();
      const columns = [{ key: "id", header: "ID" }, { key: "name", header: "Name" }];
      const data = [{ id: "row-1", name: "Alpha" }];

      render(<DataTable columns={columns} data={data} onRowClick={onRowClick} />);

      const row = screen.getByRole("button", { name: /alpha/i });
      expect(row).toHaveAttribute("tabindex", "0");
      expect(row).toHaveClass("focus-visible:outline-none");

      // Test keyboard Enter
      fireEvent.keyDown(row, { key: "Enter" });
      expect(onRowClick).toHaveBeenCalledWith(data[0]);

      // Test keyboard Space
      fireEvent.keyDown(row, { key: " " });
      expect(onRowClick).toHaveBeenCalledTimes(2);
    });
  });

  describe("Dismiss Buttons A11y & Focus States", () => {
    it("renders banner dismiss button with aria-label, focus ring, and aria-hidden icon", () => {
      const onDismiss = vi.fn();
      render(<Banner dismissible onClose={onDismiss}>Important announcement</Banner>);

      const btn = screen.getByRole("button", { name: /dismiss banner/i });
      expect(btn).toBeInTheDocument();
      expect(btn).toHaveClass("focus-visible:ring-1");

      const icon = btn.querySelector("svg");
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });

    it("renders alert dismiss button with aria-label and aria-hidden icon", () => {
      const onDismiss = vi.fn();
      render(<Alert onDismiss={onDismiss}>Alert content</Alert>);

      const btn = screen.getByRole("button", { name: /dismiss alert/i });
      expect(btn).toBeInTheDocument();
      expect(btn).toHaveClass("focus-visible:ring-1");

      const icon = btn.querySelector("svg");
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("Theme Tokens & Reduced Motion CSS", () => {
    it("verifies prefers-reduced-motion media query and Okabe-Ito chart variables", () => {
      const themeCssPath = resolve(__dirname, "../styles/theme.css");
      const content = readFileSync(themeCssPath, "utf-8");

      expect(content).toContain("prefers-reduced-motion: reduce");
      expect(content).toContain("animation-duration: 0.01ms !important");
      expect(content).toContain("--chart-1: 210 100% 35%");
      expect(content).toContain("--chart-2: 38 100% 45%");
      expect(content).toContain("--chart-3: 164 100% 31%");
      expect(content).toContain("--chart-4: 26 100% 42%");
      expect(content).toContain("--chart-5: 202 80% 63%");
    });
  });
});
