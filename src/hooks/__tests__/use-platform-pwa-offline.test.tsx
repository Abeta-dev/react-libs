import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { usePlatform } from "../use-platform";
import { usePWAInstall } from "../use-pwa-install";
import { useOfflineQueue } from "../use-offline-queue";
import { triggerHaptic, nativeShare, getPlatformInfo } from "../../lib/platform";
import { openWhatsApp, generateWhatsAppUrl, generateWhatsAppAppUrl, formatWhatsAppTemplate } from "../../india/whatsapp";

describe("usePlatform, usePWAInstall, useOfflineQueue & Platform/WhatsApp utilities", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe("Platform & Device APIs", () => {
    it("detects running environment and handles haptic patterns", () => {
      const vibrateMock = vi.fn();
      Object.defineProperty(navigator, "vibrate", {
        value: vibrateMock,
        configurable: true,
        writable: true,
      });

      const { result } = renderHook(() => usePlatform());
      expect(typeof result.current.isIOS).toBe("boolean");
      expect(typeof result.current.isAndroid).toBe("boolean");
      expect(typeof result.current.isMobile).toBe("boolean");
      expect(typeof result.current.isStandalone).toBe("boolean");

      // Verify all haptic patterns
      const hapticTypes = ["light", "selection", "medium", "heavy", "success", "warning", "error"] as const;
      hapticTypes.forEach((t) => {
        triggerHaptic(t);
        result.current.triggerHaptic(t);
      });
      expect(vibrateMock).toHaveBeenCalled();

      // Unset vibrate and verify safe execution
      // @ts-expect-error test unset
      navigator.vibrate = undefined;
      expect(() => triggerHaptic("light")).not.toThrow();
    });

    it("evaluates platform detection correctly across devices", () => {
      const info = getPlatformInfo();
      expect(info).toHaveProperty("platformName");
      expect(info).toHaveProperty("hasTouch");
      expect(info).toHaveProperty("isStandalone");
    });

    it("handles SSR fallback behaviors when window or navigator is undefined", async () => {
      const originalWindow = global.window;
      const originalNavigator = global.navigator;

      try {
        // 1. Simulating SSR environment where window is undefined
        delete (global as Record<string, unknown>).window;

        const ssrPlatform = getPlatformInfo();
        expect(ssrPlatform).toEqual({
          isIOS: false,
          isAndroid: false,
          isMobile: false,
          isStandalone: false,
          platformName: "desktop",
          hasTouch: false,
        });

        expect(() => triggerHaptic("medium")).not.toThrow();
        expect(await nativeShare({ title: "SSR Test" })).toBe(false);

        // 2. Simulating environment where window is present but navigator is undefined
        (global as Record<string, unknown>).window = originalWindow;
        delete (global as Record<string, unknown>).navigator;

        const navUndefinedPlatform = getPlatformInfo();
        expect(navUndefinedPlatform).toEqual({
          isIOS: false,
          isAndroid: false,
          isMobile: false,
          isStandalone: false,
          platformName: "desktop",
          hasTouch: false,
        });

        expect(() => triggerHaptic("error")).not.toThrow();
        expect(await nativeShare({ title: "No Nav Test" })).toBe(false);
      } finally {
        global.window = originalWindow;
        global.navigator = originalNavigator;
      }
    });

    it("detects devices correctly across iOS, Android, macOS, and Windows", () => {
      const setDeviceEnv = ({
        userAgent,
        platform,
        maxTouchPoints = 0,
        innerWidth = 1024,
        hasTouch = false,
      }: {
        userAgent: string;
        platform: string;
        maxTouchPoints?: number;
        innerWidth?: number;
        hasTouch?: boolean;
      }) => {
        Object.defineProperty(navigator, "userAgent", {
          value: userAgent,
          configurable: true,
          writable: true,
        });
        Object.defineProperty(navigator, "platform", {
          value: platform,
          configurable: true,
          writable: true,
        });
        Object.defineProperty(navigator, "maxTouchPoints", {
          value: maxTouchPoints,
          configurable: true,
          writable: true,
        });
        Object.defineProperty(window, "innerWidth", {
          value: innerWidth,
          configurable: true,
          writable: true,
        });

        if (hasTouch) {
          (window as unknown as Record<string, unknown>).ontouchstart = () => {};
        } else {
          Reflect.deleteProperty(window, "ontouchstart");
        }
      };

      // 1. iOS iPhone
      setDeviceEnv({
        userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148",
        platform: "iPhone",
        maxTouchPoints: 5,
        innerWidth: 390,
        hasTouch: true,
      });
      const iPhoneInfo = getPlatformInfo();
      expect(iPhoneInfo.isIOS).toBe(true);
      expect(iPhoneInfo.isAndroid).toBe(false);
      expect(iPhoneInfo.isMobile).toBe(true);
      expect(iPhoneInfo.platformName).toBe("ios");
      expect(iPhoneInfo.hasTouch).toBe(true);

      // 2. iPadOS desktop Safari mode spoofing MacIntel with touch points
      setDeviceEnv({
        userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15",
        platform: "MacIntel",
        maxTouchPoints: 5,
        innerWidth: 1024,
      });
      const iPadOSInfo = getPlatformInfo();
      expect(iPadOSInfo.isIOS).toBe(true);
      expect(iPadOSInfo.isAndroid).toBe(false);
      expect(iPadOSInfo.isMobile).toBe(true);
      expect(iPadOSInfo.platformName).toBe("ios");
      expect(iPadOSInfo.hasTouch).toBe(true);

      // 3. Android phone
      setDeviceEnv({
        userAgent: "Mozilla/5.0 (Linux; Android 14; Pixel 8 Pro) AppleWebKit/537.36 Chrome/120.0 Mobile Safari/537.36",
        platform: "Linux armv8l",
        maxTouchPoints: 5,
        innerWidth: 412,
      });
      const androidInfo = getPlatformInfo();
      expect(androidInfo.isAndroid).toBe(true);
      expect(androidInfo.isIOS).toBe(false);
      expect(androidInfo.isMobile).toBe(true);
      expect(androidInfo.platformName).toBe("android");
      expect(androidInfo.hasTouch).toBe(true);

      // 4. macOS Desktop
      setDeviceEnv({
        userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
        platform: "MacIntel",
        maxTouchPoints: 0,
        innerWidth: 1440,
      });
      const macDesktopInfo = getPlatformInfo();
      expect(macDesktopInfo.isIOS).toBe(false);
      expect(macDesktopInfo.isAndroid).toBe(false);
      expect(macDesktopInfo.isMobile).toBe(false);
      expect(macDesktopInfo.platformName).toBe("desktop");
      expect(macDesktopInfo.hasTouch).toBe(false);

      // 5. Windows Desktop
      setDeviceEnv({
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
        platform: "Win32",
        maxTouchPoints: 0,
        innerWidth: 1920,
      });
      const winDesktopInfo = getPlatformInfo();
      expect(winDesktopInfo.isIOS).toBe(false);
      expect(winDesktopInfo.isAndroid).toBe(false);
      expect(winDesktopInfo.isMobile).toBe(false);
      expect(winDesktopInfo.platformName).toBe("desktop");
      expect(winDesktopInfo.hasTouch).toBe(false);

      // 6. Standalone PWA detection modes
      // MatchMedia display-mode: standalone
      vi.spyOn(window, "matchMedia").mockImplementation((query) => ({
        matches: query.includes("display-mode: standalone"),
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));
      expect(getPlatformInfo().isStandalone).toBe(true);

      // iOS standalone navigator property
      vi.spyOn(window, "matchMedia").mockReturnValue({
        matches: false,
        media: "",
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      });
      Object.defineProperty(navigator, "standalone", {
        value: true,
        configurable: true,
      });
      expect(getPlatformInfo().isStandalone).toBe(true);

      // Android TWA referrer
      Object.defineProperty(navigator, "standalone", {
        value: false,
        configurable: true,
      });
      Object.defineProperty(document, "referrer", {
        value: "android-app://com.example.twa",
        configurable: true,
      });
      expect(getPlatformInfo().isStandalone).toBe(true);
    });

    it("updates usePlatform hook when window resize occurs", () => {
      Object.defineProperty(window, "innerWidth", {
        value: 1200,
        configurable: true,
        writable: true,
      });
      Object.defineProperty(navigator, "userAgent", {
        value: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        configurable: true,
        writable: true,
      });
      Object.defineProperty(navigator, "platform", {
        value: "Win32",
        configurable: true,
        writable: true,
      });
      Object.defineProperty(navigator, "maxTouchPoints", {
        value: 0,
        configurable: true,
        writable: true,
      });

      const { result } = renderHook(() => usePlatform());
      expect(result.current.isMobile).toBe(false);

      // Resize window to mobile viewport width
      act(() => {
        Object.defineProperty(window, "innerWidth", {
          value: 480,
          configurable: true,
          writable: true,
        });
        window.dispatchEvent(new Event("resize"));
      });

      expect(result.current.isMobile).toBe(true);
    });

    it("handles nativeShare with supported and rejected states", async () => {
      // 1. When navigator.share is undefined
      // @ts-expect-error test unset
      delete navigator.share;
      const unsupported = await nativeShare({ title: "Test" });
      expect(unsupported).toBe(false);

      // 2. When navigator.share resolves successfully
      const shareMock = vi.fn().mockResolvedValue(undefined);
      Object.defineProperty(navigator, "share", {
        value: shareMock,
        configurable: true,
        writable: true,
      });
      const ok = await nativeShare({ title: "Test", url: "https://example.com" });
      expect(ok).toBe(true);

      // 3. When navigator.share rejects (e.g. user aborts)
      shareMock.mockRejectedValueOnce(new Error("AbortError"));
      const cancelled = await nativeShare({ title: "Test" });
      expect(cancelled).toBe(false);
    });
  });

  describe("WhatsApp utilities", () => {
    it("generates WhatsApp URLs and opens window", () => {
      const openMock = vi.fn();
      vi.spyOn(window, "open").mockImplementation(openMock);

      const url = generateWhatsAppUrl("+91 99999 11111", "Hello world");
      expect(url).toBe("https://wa.me/919999911111?text=Hello%20world");

      const emptyUrl = generateWhatsAppUrl();
      expect(emptyUrl).toBe("https://wa.me/");

      const appUrl = generateWhatsAppAppUrl("9999911111", "Test");
      expect(appUrl).toBe("whatsapp://send?phone=919999911111&text=Test");

      openWhatsApp("9999911111", "Testing");
      expect(openMock).toHaveBeenCalledWith(
        "https://wa.me/919999911111?text=Testing",
        "_blank",
        "noopener,noreferrer"
      );

      const formatted = formatWhatsAppTemplate("Hello {{name}}! Fee is {{fee}}.", {
        name: "Aman",
        fee: 5000,
      });
      expect(formatted).toBe("Hello Aman! Fee is 5000.");
    });
  });

  describe("usePWAInstall", () => {
    it("returns unsupported outcome when promptInstall is called before prompt event", async () => {
      const { result } = renderHook(() => usePWAInstall());
      expect(result.current.canInstall).toBe(false);

      let promptRes: { outcome: string } | undefined;
      await act(async () => {
        promptRes = await result.current.promptInstall();
      });

      expect(promptRes?.outcome).toBe("unsupported");
    });

    it("handles beforeinstallprompt and appinstalled events", async () => {
      const { result } = renderHook(() => usePWAInstall());
      expect(result.current.canInstall).toBe(false);

      // Mock BeforeInstallPromptEvent
      const promptMock = vi.fn().mockResolvedValue(undefined);
      const fakeEvent = new Event("beforeinstallprompt") as unknown as {
        preventDefault: () => void;
        prompt: () => Promise<void>;
        userChoice: Promise<{ outcome: string; platform: string }>;
      };
      const preventDefaultSpy = vi.spyOn(fakeEvent, "preventDefault");
      fakeEvent.prompt = promptMock;
      fakeEvent.userChoice = Promise.resolve({ outcome: "accepted", platform: "web" });

      await act(async () => {
        window.dispatchEvent(fakeEvent as unknown as Event);
      });

      expect(preventDefaultSpy).toHaveBeenCalled();
      expect(result.current.canInstall).toBe(true);

      // Trigger promptInstall
      let outcomeResult: { outcome: string } | undefined;
      await act(async () => {
        outcomeResult = await result.current.promptInstall();
      });

      expect(promptMock).toHaveBeenCalled();
      expect(outcomeResult?.outcome).toBe("accepted");
      expect(result.current.canInstall).toBe(false);

      // Trigger appinstalled
      await act(async () => {
        window.dispatchEvent(new Event("appinstalled"));
      });

      expect(result.current.isInstalled).toBe(true);
      expect(result.current.canInstall).toBe(false);
    });

    it("handles user dismissal of the install prompt and resets deferred prompt", async () => {
      const { result } = renderHook(() => usePWAInstall());

      const promptMock = vi.fn().mockResolvedValue(undefined);
      const fakeEvent = new Event("beforeinstallprompt") as unknown as {
        preventDefault: () => void;
        prompt: () => Promise<void>;
        userChoice: Promise<{ outcome: string; platform: string }>;
      };
      fakeEvent.prompt = promptMock;
      fakeEvent.userChoice = Promise.resolve({ outcome: "dismissed", platform: "web" });

      await act(async () => {
        window.dispatchEvent(fakeEvent as unknown as Event);
      });

      expect(result.current.canInstall).toBe(true);

      let outcomeResult: { outcome: string } | undefined;
      await act(async () => {
        outcomeResult = await result.current.promptInstall();
      });

      expect(outcomeResult?.outcome).toBe("dismissed");

      // Calling promptInstall a second time should now return unsupported
      let secondOutcome: { outcome: string } | undefined;
      await act(async () => {
        secondOutcome = await result.current.promptInstall();
      });
      expect(secondOutcome?.outcome).toBe("unsupported");
    });

    it("gracefully catches exceptions thrown during prompt execution", async () => {
      const { result } = renderHook(() => usePWAInstall());

      const fakeEvent = new Event("beforeinstallprompt") as unknown as {
        prompt: () => Promise<void>;
        userChoice: Promise<{ outcome: string; platform: string }>;
      };
      fakeEvent.prompt = vi.fn().mockRejectedValue(new Error("Browser prompt failure"));
      fakeEvent.userChoice = Promise.resolve({ outcome: "dismissed", platform: "web" });

      await act(async () => {
        window.dispatchEvent(fakeEvent as unknown as Event);
      });

      let outcomeResult: { outcome: string } | undefined;
      await act(async () => {
        outcomeResult = await result.current.promptInstall();
      });

      expect(outcomeResult?.outcome).toBe("dismissed");
    });

    it("removes beforeinstallprompt and appinstalled event listeners upon unmount", () => {
      const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");
      const { unmount } = renderHook(() => usePWAInstall());

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        "beforeinstallprompt",
        expect.any(Function)
      );
      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        "appinstalled",
        expect.any(Function)
      );
    });
  });

  describe("useOfflineQueue", () => {
    it("enqueues, counts, and clears mutations in fallback mode", async () => {
      const { result } = renderHook(() =>
        useOfflineQueue<{ id: string; action: string }>({
          dbName: "test_db",
          storeName: "test_store",
        })
      );

      expect(result.current.pendingCount).toBe(0);

      await act(async () => {
        await result.current.enqueue({ id: "mut-1", action: "save" });
      });

      expect(result.current.pendingCount).toBe(1);

      await act(async () => {
        await result.current.remove("mut-1");
      });

      expect(result.current.pendingCount).toBe(0);

      await act(async () => {
        await result.current.enqueue({ id: "mut-2", action: "save2" });
        await result.current.clear();
      });

      expect(result.current.pendingCount).toBe(0);
    });

    it("flushes queue with syncHandler and handles retry limits", async () => {
      const syncHandler = vi.fn().mockResolvedValueOnce(false).mockResolvedValueOnce(true);
      const { result } = renderHook(() =>
        useOfflineQueue<{ id: string; data: string }>({
          dbName: "test_flush_db",
          storeName: "test_flush_store",
          syncHandler,
          maxRetries: 2,
        })
      );

      await act(async () => {
        await result.current.enqueue({ id: "mut-sync", data: "payload", retryCount: 0 });
      });

      expect(result.current.pendingCount).toBe(1);

      // First flush: syncHandler returns false -> item retryCount incremented
      await act(async () => {
        const stats = await result.current.flushQueue();
        expect(stats.failedCount).toBe(1);
      });

      // Second flush: syncHandler returns true -> item removed
      await act(async () => {
        const stats = await result.current.flushQueue();
        expect(stats.successCount).toBe(1);
      });

      expect(result.current.pendingCount).toBe(0);
    });
  });
});
