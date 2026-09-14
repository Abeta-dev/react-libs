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
    it("handles beforeinstallprompt and appinstalled events", async () => {
      const { result } = renderHook(() => usePWAInstall());
      expect(result.current.canInstall).toBe(false);

      // Mock BeforeInstallPromptEvent
      const promptMock = vi.fn().mockResolvedValue(undefined);
      const fakeEvent = new Event("beforeinstallprompt") as any;
      fakeEvent.prompt = promptMock;
      fakeEvent.userChoice = Promise.resolve({ outcome: "accepted", platform: "web" });

      await act(async () => {
        window.dispatchEvent(fakeEvent);
      });

      expect(result.current.canInstall).toBe(true);

      // Trigger promptInstall
      let outcomeResult: any;
      await act(async () => {
        outcomeResult = await result.current.promptInstall();
      });

      expect(promptMock).toHaveBeenCalled();
      expect(outcomeResult.outcome).toBe("accepted");

      // Trigger appinstalled
      await act(async () => {
        window.dispatchEvent(new Event("appinstalled"));
      });

      expect(result.current.isInstalled).toBe(true);
      expect(result.current.canInstall).toBe(false);
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
