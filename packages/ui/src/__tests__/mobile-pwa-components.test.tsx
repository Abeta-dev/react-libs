import * as React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { AppSplashScreen } from "../feedback/app-splash-screen";
import { MobileBottomNav, type MobileNavItem } from "../navigation/mobile-bottom-nav";
import { InstallPwaBanner } from "../feedback/install-pwa-banner";
import { Banner } from "../feedback/banner";
import { Home, Users, Bell, Package, Building2, WifiOff } from "lucide-react";

const mockPlatformState = {
  isIOS: false,
  isAndroid: false,
  isMobile: false,
  isStandalone: false,
  platformName: "desktop" as const,
  hasTouch: false,
  triggerHaptic: vi.fn(),
  nativeShare: vi.fn().mockResolvedValue(true),
};

vi.mock("../hooks/use-platform", () => ({
  usePlatform: () => mockPlatformState,
}));

describe("Mobile & PWA UI Components", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockPlatformState.isIOS = false;
    mockPlatformState.isAndroid = false;
    mockPlatformState.isMobile = false;
    mockPlatformState.isStandalone = false;
    sessionStorage.clear();
  });

  describe("AppSplashScreen", () => {
    it("renders default title, default loading message, and spin loader", () => {
      const { container } = render(<AppSplashScreen />);

      expect(screen.getByText("Welcome")).toBeInTheDocument();
      expect(screen.getByText("Initializing workspace...")).toBeInTheDocument();
      const spinner = container.querySelector(".animate-spin");
      expect(spinner).toBeInTheDocument();
    });

    it("renders custom branding, subtitle, custom icon, and custom class name", () => {
      render(
        <AppSplashScreen
          title="Mahavir Vendor OS"
          subtitle="Enterprise Supply Chain Network"
          message="Bootstrapping secure session..."
          icon={<Building2 data-testid="custom-splash-icon" className="w-8 h-8" />}
          className="custom-splash-bg"
        />
      );

      expect(screen.getByText("Mahavir Vendor OS")).toBeInTheDocument();
      expect(screen.getByText("Enterprise Supply Chain Network")).toBeInTheDocument();
      expect(screen.getByText("Bootstrapping secure session...")).toBeInTheDocument();
      expect(screen.getByTestId("custom-splash-icon")).toBeInTheDocument();
    });
  });

  describe("MobileBottomNav", () => {
    it("renders navigation tabs with active page indicator and click handler", () => {
      const handleChange = vi.fn();

      const items: MobileNavItem[] = [
        { id: "home", label: "Home", icon: Home },
        { id: "orders", label: "Orders", icon: Package },
        { id: "users", label: "Users", icon: Users },
      ];

      render(
        <MobileBottomNav
          items={items}
          activeId="orders"
          onChange={handleChange}
        />
      );

      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("Orders")).toBeInTheDocument();
      expect(screen.getByText("Users")).toBeInTheDocument();

      const ordersBtn = screen.getByRole("button", { name: /orders/i });
      expect(ordersBtn).toHaveAttribute("aria-current", "page");

      const homeBtn = screen.getByRole("button", { name: /home/i });
      expect(homeBtn).not.toHaveAttribute("aria-current");

      fireEvent.click(homeBtn);
      expect(handleChange).toHaveBeenCalledWith("home");
    });

    it("renders numeric badges, string badges, and suppresses zero or null badges", () => {
      const items: MobileNavItem[] = [
        { id: "home", label: "Home", icon: Home, badge: 0 },
        { id: "alerts", label: "Alerts", icon: Bell, badge: 7 },
        { id: "users", label: "Users", icon: Users, badge: "NEW" },
      ];

      render(
        <MobileBottomNav
          items={items}
          activeId="home"
          onChange={vi.fn()}
        />
      );

      expect(screen.getByText("7")).toBeInTheDocument();
      expect(screen.getByText("NEW")).toBeInTheDocument();
      expect(screen.queryByText("0")).not.toBeInTheDocument();
    });

    it("renders more action button with custom label and click callback", () => {
      const handleMore = vi.fn();
      const items: MobileNavItem[] = [
        { id: "home", label: "Home", icon: Home },
      ];

      render(
        <MobileBottomNav
          items={items}
          activeId="home"
          onChange={vi.fn()}
          moreAction={{ label: "More Options", onClick: handleMore }}
        />
      );

      const moreBtn = screen.getByRole("button", { name: /more options/i });
      expect(moreBtn).toBeInTheDocument();

      fireEvent.click(moreBtn);
      expect(handleMore).toHaveBeenCalledTimes(1);
    });
  });

  describe("InstallPwaBanner", () => {
    it("captures beforeinstallprompt and completes install flow", async () => {
      const handleInstall = vi.fn();
      const promptMock = vi.fn().mockResolvedValue(undefined);

      render(
        <InstallPwaBanner
          appName="Vendor Portal PWA"
          appDescription="Install for fast offline order processing."
          onInstall={handleInstall}
        />
      );

      // Initially not visible before event
      expect(screen.queryByText("Install Vendor Portal PWA")).not.toBeInTheDocument();

      // Dispatch beforeinstallprompt
      const fakePromptEvent = new Event("beforeinstallprompt") as any;
      fakePromptEvent.prompt = promptMock;
      fakePromptEvent.userChoice = Promise.resolve({ outcome: "accepted" });

      await act(async () => {
        window.dispatchEvent(fakePromptEvent);
      });

      expect(screen.getByText("Install Vendor Portal PWA")).toBeInTheDocument();
      expect(
        screen.getByText("Install for fast offline order processing.")
      ).toBeInTheDocument();

      const installBtn = screen.getByRole("button", { name: /Install Now/i });
      await act(async () => {
        fireEvent.click(installBtn);
      });

      expect(promptMock).toHaveBeenCalledTimes(1);
      expect(handleInstall).toHaveBeenCalledTimes(1);
    });

    it("persists dismissed state to sessionStorage under configured storageKey", async () => {
      const handleDismiss = vi.fn();

      render(
        <InstallPwaBanner
          appName="QuickCommerce"
          storageKey="test_pwa_dismissal_key"
          onDismiss={handleDismiss}
        />
      );

      // Dispatch beforeinstallprompt to make it visible
      const fakePromptEvent = new Event("beforeinstallprompt") as any;
      fakePromptEvent.prompt = vi.fn();
      fakePromptEvent.userChoice = Promise.resolve({ outcome: "dismissed" });

      await act(async () => {
        window.dispatchEvent(fakePromptEvent);
      });

      expect(screen.getByText("Install QuickCommerce")).toBeInTheDocument();

      const notNowBtn = screen.getByRole("button", { name: "Not now" });
      act(() => {
        fireEvent.click(notNowBtn);
      });

      expect(handleDismiss).toHaveBeenCalledTimes(1);
      expect(sessionStorage.getItem("test_pwa_dismissal_key")).toBe("true");
      expect(screen.queryByText("Install QuickCommerce")).not.toBeInTheDocument();
    });

    it("provides step-by-step iOS Safari installation guide when platform is iOS", () => {
      mockPlatformState.isIOS = true;

      render(<InstallPwaBanner appName="iOS Vendor App" />);

      // On iOS, banner renders without requiring beforeinstallprompt
      expect(screen.getByText("Install iOS Vendor App")).toBeInTheDocument();
      const howToInstallBtn = screen.getByRole("button", { name: "How to Install" });
      expect(howToInstallBtn).toBeInTheDocument();

      // Guide initially hidden
      expect(screen.queryByText("Install on iOS Safari:")).not.toBeInTheDocument();

      // Click to toggle guide
      fireEvent.click(howToInstallBtn);
      expect(screen.getByText("Install on iOS Safari:")).toBeInTheDocument();
      expect(screen.getByText("1. Tap the Share button")).toBeInTheDocument();
      expect(screen.getByText("Add to Home Screen")).toBeInTheDocument();

      // Click again to close guide
      fireEvent.click(howToInstallBtn);
      expect(screen.queryByText("Install on iOS Safari:")).not.toBeInTheDocument();
    });

    it("respects standalone mode and suppresses prompt when already installed", async () => {
      mockPlatformState.isStandalone = true;

      render(<InstallPwaBanner appName="Already Installed App" />);

      // Dispatch beforeinstallprompt
      const fakePromptEvent = new Event("beforeinstallprompt") as any;
      await act(async () => {
        window.dispatchEvent(fakePromptEvent);
      });

      expect(screen.queryByText("Install Already Installed App")).not.toBeInTheDocument();
    });
  });

  describe("Network Status & Offline Recovery Banners", () => {
    it("handles online and offline network status transitions with feedback banners", () => {
      function NetworkStatusNotifier() {
        const [isOnline, setIsOnline] = React.useState(true);
        const [dismissed, setDismissed] = React.useState(false);

        React.useEffect(() => {
          const handleOnline = () => {
            setIsOnline(true);
            setDismissed(false);
          };
          const handleOffline = () => {
            setIsOnline(false);
            setDismissed(false);
          };

          window.addEventListener("online", handleOnline);
          window.addEventListener("offline", handleOffline);

          return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
          };
        }, []);

        if (dismissed) return null;

        if (!isOnline) {
          return (
            <Banner
              variant="destructive"
              icon={<WifiOff className="h-4 w-4" />}
              title="You are currently offline."
              action={{ label: "Retry", onClick: () => setIsOnline(true) }}
              dismissible
              onClose={() => setDismissed(true)}
            >
              Changes are saved locally and will synchronize once your internet connection is restored.
            </Banner>
          );
        }

        return (
          <Banner
            variant="success"
            title="Online"
            dismissible
            onClose={() => setDismissed(true)}
          >
            Connection active. Real-time ERP sync enabled.
          </Banner>
        );
      }

      render(<NetworkStatusNotifier />);

      // Initial state: Online banner
      expect(screen.getByText("Online")).toBeInTheDocument();

      // Transition to offline
      act(() => {
        window.dispatchEvent(new Event("offline"));
      });

      expect(screen.getByText("You are currently offline.")).toBeInTheDocument();
      expect(
        screen.getByText(/Changes are saved locally and will synchronize/)
      ).toBeInTheDocument();

      // Click Retry to recover
      const retryBtn = screen.getByRole("button", { name: "Retry" });
      act(() => {
        fireEvent.click(retryBtn);
      });

      expect(screen.getByText("Online")).toBeInTheDocument();
      expect(screen.queryByText("You are currently offline.")).not.toBeInTheDocument();
    });
  });
});
