import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { generateUUID, SessionManager } from "../session";

describe("Analytics SessionManager", () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("generateUUID", () => {
    it("generates valid UUID v4 strings with default crypto.randomUUID", () => {
      const uuid = generateUUID();
      const uuidV4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      expect(uuid).toMatch(uuidV4Regex);
    });

    it("falls back to crypto.getRandomValues when randomUUID is unavailable", () => {
      const originalRandomUUID = crypto.randomUUID;
      // Remove randomUUID to exercise getRandomValues branch
      (crypto as unknown as { randomUUID: unknown }).randomUUID = undefined;

      const uuid = generateUUID();
      const uuidV4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      expect(uuid).toMatch(uuidV4Regex);

      (crypto as unknown as { randomUUID: unknown }).randomUUID = originalRandomUUID;
    });

    it("falls back to timestamp-based UUID when crypto is completely unavailable", () => {
      vi.stubGlobal("crypto", undefined);

      const uuid = generateUUID();
      expect(uuid).toMatch(/^00000000-0000-4000-8000-[0-9a-f]{12}$/i);

      vi.unstubAllGlobals();
    });
  });

  describe("Anonymous ID persistence & storage fallbacks", () => {
    it("persists and reuses anonymousId in localStorage", () => {
      const session1 = new SessionManager("test_prefix");
      const anon1 = session1.getAnonymousId();
      expect(anon1).toBeTruthy();

      const session2 = new SessionManager("test_prefix");
      expect(session2.getAnonymousId()).toBe(anon1);
    });

    it("falls back gracefully when localStorage throws during anonymousId initialization", () => {
      const getItemSpy = vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
        throw new Error("SecurityError: localStorage disabled");
      });

      const session = new SessionManager("test_err_prefix");
      expect(session.getAnonymousId()).toBeTruthy();

      getItemSpy.mockRestore();
    });

    it("falls back gracefully when localStorage throws during clearUserId", () => {
      const session = new SessionManager("test_clear_prefix");
      session.setUserId("user_abc");

      const setItemSpy = vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
        throw new Error("QuotaExceededError");
      });

      expect(() => session.clearUserId()).not.toThrow();
      expect(session.getUserId()).toBeUndefined();

      setItemSpy.mockRestore();
    });
  });

  describe("Session ID lifecycle and expiration", () => {
    it("tracks and rolls over sessionId when inactive for longer than timeout", () => {
      vi.useFakeTimers();
      const timeoutMs = 5000;
      const session = new SessionManager("test_prefix", timeoutMs);
      const initialSessionId = session.getSessionId();

      // Advance within timeout
      vi.advanceTimersByTime(2000);
      expect(session.getSessionId()).toBe(initialSessionId);

      // Advance beyond timeout
      vi.advanceTimersByTime(6000);
      const newSessionId = session.getSessionId();
      expect(newSessionId).not.toBe(initialSessionId);

      vi.useRealTimers();
    });

    it("clears component interaction counts when session rolls over due to timeout", () => {
      vi.useFakeTimers();
      const timeoutMs = 3000;
      const session = new SessionManager("test_expire", timeoutMs);

      expect(session.incrementComponentInteraction("nav_btn")).toBe(1);
      expect(session.incrementComponentInteraction("nav_btn")).toBe(2);

      // Exceed timeout to trigger rollover
      vi.advanceTimersByTime(4000);
      session.getSessionId();

      // Counts should have been reset back to 1
      expect(session.incrementComponentInteraction("nav_btn")).toBe(1);

      vi.useRealTimers();
    });

    it("restores existing valid session from sessionStorage on initialization", () => {
      const now = Date.now();
      window.sessionStorage.setItem("restore_prefix_session_id", "existing-session-uuid");
      window.sessionStorage.setItem("restore_prefix_last_active", now.toString());

      const session = new SessionManager("restore_prefix", 60000);
      expect(session.getSessionId()).toBe("existing-session-uuid");
    });

    it("generates a new session on init if stored session is expired", () => {
      const past = Date.now() - 120000; // 2 mins ago
      window.sessionStorage.setItem("exp_prefix_session_id", "old-expired-session");
      window.sessionStorage.setItem("exp_prefix_last_active", past.toString());

      const session = new SessionManager("exp_prefix", 60000); // 1 min timeout
      expect(session.getSessionId()).not.toBe("old-expired-session");
    });

    it("generates a new session on init if stored lastActive timestamp is corrupted / NaN", () => {
      window.sessionStorage.setItem("nan_prefix_session_id", "corrupted-session");
      window.sessionStorage.setItem("nan_prefix_last_active", "not-a-number");

      const session = new SessionManager("nan_prefix", 60000);
      expect(session.getSessionId()).not.toBe("corrupted-session");
    });

    it("handles sessionStorage exceptions in loadOrCreateSessionId gracefully", () => {
      const getItemSpy = vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
        throw new DOMException("PrivateBrowsing", "SecurityError");
      });

      const session = new SessionManager("throw_prefix");
      expect(session.getSessionId()).toBeTruthy();

      getItemSpy.mockRestore();
    });

    it("handles sessionStorage exceptions in touchSession gracefully", () => {
      const session = new SessionManager("touch_err_prefix");
      const setItemSpy = vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
        throw new Error("QuotaExceeded");
      });

      expect(() => session.touchSession()).not.toThrow();

      setItemSpy.mockRestore();
    });
  });

  describe("User identity and session reset", () => {
    it("increments component interaction counts sequentially", () => {
      const session = new SessionManager();
      expect(session.incrementComponentInteraction("btn_1")).toBe(1);
      expect(session.incrementComponentInteraction("btn_1")).toBe(2);
      expect(session.incrementComponentInteraction("btn_2")).toBe(1);
    });

    it("handles user identity and resets correctly", () => {
      const session = new SessionManager();
      session.setUserId("user_123");
      expect(session.getUserId()).toBe("user_123");

      const oldAnon = session.getAnonymousId();
      session.clearUserId();
      expect(session.getUserId()).toBeUndefined();
      expect(session.getAnonymousId()).not.toBe(oldAnon);
    });

    it("renews pageId on navigation", () => {
      const session = new SessionManager();
      const p1 = session.getActivePageId();
      const p2 = session.renewPageId();
      expect(p2).not.toBe(p1);
      expect(session.getActivePageId()).toBe(p2);
    });

    it("completely resets state and clears sessionStorage items on reset()", () => {
      const session = new SessionManager("reset_full_prefix");
      session.setUserId("usr_active");
      session.incrementComponentInteraction("cmp_1");

      const oldSessionId = session.getSessionId();
      const oldPageId = session.getActivePageId();

      session.reset();

      expect(window.sessionStorage.getItem("reset_full_prefix_session_id")).toBeNull();
      expect(window.sessionStorage.getItem("reset_full_prefix_last_active")).toBeNull();
      expect(session.getUserId()).toBeUndefined();
      expect(session.getActivePageId()).not.toBe(oldPageId);
      expect(session.incrementComponentInteraction("cmp_1")).toBe(1);
      expect(session.getSessionId()).not.toBe(oldSessionId);
    });

    it("handles sessionStorage.removeItem throwing in reset() safely", () => {
      const session = new SessionManager("reset_err_prefix");
      const removeItemSpy = vi.spyOn(Storage.prototype, "removeItem").mockImplementation(() => {
        throw new Error("Permission Denied");
      });

      expect(() => session.reset()).not.toThrow();

      removeItemSpy.mockRestore();
    });
  });
});
