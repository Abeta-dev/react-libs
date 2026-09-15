import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { WorkspaceBanner } from "../workspace-banner";
import { Building2, ShieldAlert } from "lucide-react";

describe("WorkspaceBanner", () => {
  it("renders title and subtitle with default gradient styling", () => {
    const { container } = render(
      <WorkspaceBanner
        title="Admin Control Tower"
        subtitle="Manage cross-organization policies and KYC approvals."
      />
    );

    expect(screen.getByText("Admin Control Tower")).toBeInTheDocument();
    expect(
      screen.getByText("Manage cross-organization policies and KYC approvals.")
    ).toBeInTheDocument();

    const bannerDiv = container.firstChild as HTMLElement;
    expect(bannerDiv.className).toContain("from-indigo-600");
    expect(bannerDiv.className).toContain("to-indigo-800");
  });

  it("renders without subtitle gracefully without empty paragraph", () => {
    const { container } = render(
      <WorkspaceBanner title="Vendor Headquarters" />
    );

    expect(screen.getByText("Vendor Headquarters")).toBeInTheDocument();
    expect(container.querySelector("p")).toBeNull();
  });

  it("renders with custom icon component in styled backdrop container", () => {
    const { container } = render(
      <WorkspaceBanner
        title="Mahavir Logistics"
        subtitle="Primary fulfillment hub"
        icon={Building2}
      />
    );

    const iconContainer = container.querySelector(".bg-white\\/15");
    expect(iconContainer).toBeInTheDocument();

    const svg = iconContainer?.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("omits icon container when icon prop is not provided", () => {
    const { container } = render(
      <WorkspaceBanner title="Minimal Workspace" />
    );

    expect(container.querySelector(".bg-white\\/15")).toBeNull();
  });

  it("applies custom gradientClassName overriding default styles", () => {
    const { container } = render(
      <WorkspaceBanner
        title="Security Quarantine Zone"
        subtitle="Restricted environment"
        icon={ShieldAlert}
        gradientClassName="from-amber-600 via-orange-600 to-rose-700"
      />
    );

    const bannerDiv = container.firstChild as HTMLElement;
    expect(bannerDiv.className).toContain("from-amber-600");
    expect(bannerDiv.className).toContain("via-orange-600");
    expect(bannerDiv.className).toContain("to-rose-700");
    expect(bannerDiv.className).not.toContain("from-indigo-600");
  });

  it("supports rich ReactNode elements for title and subtitle", () => {
    render(
      <WorkspaceBanner
        title={
          <span data-testid="rich-title" className="flex items-center gap-2">
            Enterprise Hub
            <span data-testid="env-badge" className="text-xs bg-emerald-500 text-white px-2 py-0.5 rounded">
              PROD-AP-SOUTH
            </span>
          </span>
        }
        subtitle={
          <span data-testid="rich-subtitle">
            Connected to <strong>GSTN Sandbox Gateway</strong>
          </span>
        }
      />
    );

    expect(screen.getByTestId("rich-title")).toBeInTheDocument();
    expect(screen.getByTestId("env-badge")).toHaveTextContent("PROD-AP-SOUTH");
    expect(screen.getByTestId("rich-subtitle")).toHaveTextContent("Connected to GSTN Sandbox Gateway");
  });

  it("handles dynamic organization and workspace switching", () => {
    const workspaces = [
      {
        id: "org-1",
        name: "Mahavir Packaging (North Zone)",
        desc: "Active GSTIN: 07AAAAA0000A1Z5",
        gradient: "from-blue-700 to-indigo-900",
      },
      {
        id: "org-2",
        name: "Apex Logistics Hub (South Zone)",
        desc: "Active GSTIN: 29BBBBB1111B2Z6",
        gradient: "from-emerald-700 to-teal-900",
      },
    ];

    function WorkspaceSwitcher() {
      const [activeIdx, setActiveIdx] = React.useState(0);
      const current = workspaces[activeIdx] ?? workspaces[0]!;

      return (
        <div>
          <WorkspaceBanner
            data-testid="org-banner"
            title={current.name}
            subtitle={current.desc}
            gradientClassName={current.gradient}
          />
          <button
            type="button"
            onClick={() => setActiveIdx(activeIdx === 0 ? 1 : 0)}
          >
            Switch Workspace
          </button>
        </div>
      );
    }

    render(<WorkspaceSwitcher />);

    expect(screen.getByText("Mahavir Packaging (North Zone)")).toBeInTheDocument();
    expect(screen.getByText("Active GSTIN: 07AAAAA0000A1Z5")).toBeInTheDocument();
    expect(screen.getByTestId("org-banner").className).toContain("from-blue-700");

    fireEvent.click(screen.getByRole("button", { name: "Switch Workspace" }));

    expect(screen.getByText("Apex Logistics Hub (South Zone)")).toBeInTheDocument();
    expect(screen.getByText("Active GSTIN: 29BBBBB1111B2Z6")).toBeInTheDocument();
    expect(screen.queryByText("Mahavir Packaging (North Zone)")).not.toBeInTheDocument();
    expect(screen.getByTestId("org-banner").className).toContain("from-emerald-700");
  });

  it("passes through HTML attributes, test IDs, and custom class names", () => {
    render(
      <WorkspaceBanner
        title="Custom Attributes Workspace"
        data-testid="workspace-banner-custom"
        id="banner-workspace-main"
        className="custom-border-shadow"
      />
    );

    const banner = screen.getByTestId("workspace-banner-custom");
    expect(banner).toBeInTheDocument();
    expect(banner).toHaveAttribute("id", "banner-workspace-main");
    expect(banner.className).toContain("custom-border-shadow");
  });
});
