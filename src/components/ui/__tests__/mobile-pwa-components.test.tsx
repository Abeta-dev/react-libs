import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AppSplashScreen } from "../feedback/app-splash-screen";
import { MobileBottomNav, type MobileNavItem } from "../navigation/mobile-bottom-nav";
import { Home, Users, Bell } from "lucide-react";

describe("Mobile & PWA UI Components", () => {
  it("renders AppSplashScreen with title, subtitle, and loading message", () => {
    render(
      <AppSplashScreen
        title="My Custom App"
        subtitle="Enterprise Operating System"
        message="Bootstrapping secure session..."
      />
    );

    expect(screen.getByText("My Custom App")).toBeDefined();
    expect(screen.getByText("Enterprise Operating System")).toBeDefined();
    expect(screen.getByText("Bootstrapping secure session...")).toBeDefined();
  });

  it("renders MobileBottomNav with active tab and badge", () => {
    const handleChange = vi.fn();
    const handleMore = vi.fn();

    const items: MobileNavItem[] = [
      { id: "home", label: "Home", icon: Home },
      { id: "users", label: "Users", icon: Users, badge: 3 },
      { id: "alerts", label: "Alerts", icon: Bell },
    ];

    render(
      <MobileBottomNav
        items={items}
        activeId="home"
        onChange={handleChange}
        moreAction={{ label: "More", onClick: handleMore }}
      />
    );

    expect(screen.getByText("Home")).toBeDefined();
    expect(screen.getByText("Users")).toBeDefined();
    expect(screen.getByText("3")).toBeDefined(); // badge
    expect(screen.getByText("More")).toBeDefined();

    fireEvent.click(screen.getByText("Users"));
    expect(handleChange).toHaveBeenCalledWith("users");

    fireEvent.click(screen.getByText("More"));
    expect(handleMore).toHaveBeenCalled();
  });
});
