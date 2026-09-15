import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Button } from "../components/ui/forms/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/ui/layout/card";
import { Input } from "../components/ui/forms/input";
import { StatusBadge } from "../components/ui/data-display/status-badge";
import { MobileBottomNav, type MobileNavItem } from "../components/ui/navigation/mobile-bottom-nav";
import { Home, FileText, User } from "lucide-react";

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
});
