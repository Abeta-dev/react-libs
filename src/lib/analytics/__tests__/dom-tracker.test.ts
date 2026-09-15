import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { DomTracker } from "../dom-tracker";

describe("DomTracker Event Delegation", () => {
  let tracker: DomTracker;
  const onInteraction = vi.fn();

  beforeEach(() => {
    document.body.innerHTML = "";
    onInteraction.mockClear();
    tracker = new DomTracker({ onInteraction });
    tracker.start();
  });

  afterEach(() => {
    tracker.stop();
  });

  describe("Click interaction tracking & element resolution", () => {
    it("captures button clicks and derives accessible label", () => {
      const btn = document.createElement("button");
      btn.textContent = "Submit Form";
      document.body.appendChild(btn);

      btn.click();

      expect(onInteraction).toHaveBeenCalledTimes(1);
      const [comp] = onInteraction.mock.calls[0]!;
      expect(comp.name).toBe("Submit Form");
      expect(comp.interaction).toBe("click");
      expect(comp.id).toMatch(/^cmp_/);
    });

    it("reads explicit data-track-name and data-track-metadata", () => {
      const btn = document.createElement("button");
      btn.setAttribute("data-track-name", "custom_btn_action");
      btn.setAttribute(
        "data-track-metadata",
        JSON.stringify({ orderId: "ORD-99", amount: 1200 })
      );
      btn.textContent = "Ignored Text";
      document.body.appendChild(btn);

      btn.click();

      expect(onInteraction).toHaveBeenCalledTimes(1);
      const [comp, meta] = onInteraction.mock.calls[0]!;
      expect(comp.name).toBe("custom_btn_action");
      expect(meta).toEqual({ orderId: "ORD-99", amount: 1200 });
    });

    it("resolves parent trackable element when clicking nested child elements", () => {
      const btn = document.createElement("button");
      btn.setAttribute("data-track-name", "nested_parent_btn");

      const iconSpan = document.createElement("span");
      iconSpan.className = "icon";
      const labelStrong = document.createElement("strong");
      labelStrong.textContent = "Click Label";
      iconSpan.appendChild(labelStrong);
      btn.appendChild(iconSpan);
      document.body.appendChild(btn);

      labelStrong.dispatchEvent(new MouseEvent("click", { bubbles: true }));

      expect(onInteraction).toHaveBeenCalledTimes(1);
      const [comp] = onInteraction.mock.calls[0]!;
      expect(comp.name).toBe("nested_parent_btn");
      expect(comp.type).toBe("button");
    });

    it("tracks elements with role='button', role='tab', and role='menuitem'", () => {
      const tabEl = document.createElement("div");
      tabEl.setAttribute("role", "tab");
      tabEl.textContent = "Profile Tab";
      document.body.appendChild(tabEl);

      tabEl.dispatchEvent(new MouseEvent("click", { bubbles: true }));

      expect(onInteraction).toHaveBeenCalledTimes(1);
      const [comp] = onInteraction.mock.calls[0]!;
      expect(comp.name).toBe("Profile Tab");
      expect(comp.type).toBe("tab");

      const menuitem = document.createElement("div");
      menuitem.setAttribute("role", "menuitem");
      menuitem.textContent = "Export CSV";
      document.body.appendChild(menuitem);

      menuitem.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      expect(onInteraction).toHaveBeenCalledTimes(2);
      expect(onInteraction.mock.calls[1]?.[0]?.type).toBe("menuitem");
    });

    it("preserves existing data-component-id attribute", () => {
      const btn = document.createElement("button");
      btn.setAttribute("data-component-id", "my_static_btn_id");
      btn.textContent = "Apply";
      document.body.appendChild(btn);

      btn.click();

      expect(onInteraction).toHaveBeenCalledTimes(1);
      const [comp] = onInteraction.mock.calls[0]!;
      expect(comp.id).toBe("my_static_btn_id");
    });

    it("ignores clicks on non-interactive elements", () => {
      const div = document.createElement("div");
      div.textContent = "Plain non-clickable paragraph";
      document.body.appendChild(div);

      div.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      expect(onInteraction).not.toHaveBeenCalled();
    });

    it("ignores clicks on elements with data-track-ignore or nested within ignored container", () => {
      const ignoredContainer = document.createElement("div");
      ignoredContainer.setAttribute("data-track-ignore", "");

      const btn = document.createElement("button");
      btn.textContent = "Ignore Me";
      ignoredContainer.appendChild(btn);
      document.body.appendChild(ignoredContainer);

      btn.click();
      expect(onInteraction).not.toHaveBeenCalled();
    });
  });

  describe("Accessible name derivation", () => {
    it("uses aria-label if data-track-name is absent", () => {
      const btn = document.createElement("button");
      btn.setAttribute("aria-label", "Close modal");
      btn.textContent = "X";
      document.body.appendChild(btn);

      btn.click();

      expect(onInteraction).toHaveBeenCalledTimes(1);
      expect(onInteraction.mock.calls[0]?.[0]?.name).toBe("Close modal");
    });

    it("uses input placeholder or name", () => {
      const input = document.createElement("input");
      input.placeholder = "Search documents...";
      document.body.appendChild(input);

      input.dispatchEvent(new Event("change", { bubbles: true }));

      expect(onInteraction).toHaveBeenCalledTimes(1);
      expect(onInteraction.mock.calls[0]?.[0]?.name).toBe("Search documents...");

      const nameInput = document.createElement("input");
      nameInput.name = "organization_unit";
      document.body.appendChild(nameInput);

      nameInput.dispatchEvent(new Event("change", { bubbles: true }));
      expect(onInteraction.mock.calls[1]?.[0]?.name).toBe("organization_unit");
    });

    it("normalizes and truncates innerText to 80 characters", () => {
      const btn = document.createElement("button");
      btn.textContent = "   This is a   very long button label with multiple    spaces that should be normalized and capped at 80 characters total length ";
      document.body.appendChild(btn);

      btn.click();

      expect(onInteraction).toHaveBeenCalledTimes(1);
      const name = onInteraction.mock.calls[0]?.[0]?.name;
      expect(name?.length).toBeLessThanOrEqual(80);
      expect(name).not.toMatch(/\s{2,}/);
    });

    it("falls back to lowercase tag name when element has no text or attributes", () => {
      const btn = document.createElement("button");
      document.body.appendChild(btn);

      btn.click();

      expect(onInteraction).toHaveBeenCalledTimes(1);
      expect(onInteraction.mock.calls[0]?.[0]?.name).toBe("button");
    });
  });

  describe("Form submission tracking", () => {
    it("tracks form submission and identifies form by data-track-name", () => {
      const form = document.createElement("form");
      form.setAttribute("data-track-name", "checkout_form");
      document.body.appendChild(form);

      form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));

      expect(onInteraction).toHaveBeenCalledTimes(1);
      const [comp] = onInteraction.mock.calls[0]!;
      expect(comp.name).toBe("checkout_form");
      expect(comp.type).toBe("form");
      expect(comp.interaction).toBe("submit");
      expect(comp.id).toMatch(/^form_/);
    });

    it("resolves form name from name attribute, id attribute, or fallback 'form'", () => {
      const formWithName = document.createElement("form");
      formWithName.name = "signupForm";
      document.body.appendChild(formWithName);

      formWithName.dispatchEvent(new Event("submit", { bubbles: true }));
      expect(onInteraction.mock.calls[0]?.[0]?.name).toBe("signupForm");

      const formWithId = document.createElement("form");
      formWithId.id = "loginFormId";
      document.body.appendChild(formWithId);

      formWithId.dispatchEvent(new Event("submit", { bubbles: true }));
      expect(onInteraction.mock.calls[1]?.[0]?.name).toBe("loginFormId");

      const bareForm = document.createElement("form");
      document.body.appendChild(bareForm);

      bareForm.dispatchEvent(new Event("submit", { bubbles: true }));
      expect(onInteraction.mock.calls[2]?.[0]?.name).toBe("form");
    });

    it("ignores form submission when form has data-track-ignore attribute", () => {
      const form = document.createElement("form");
      form.setAttribute("data-track-ignore", "");
      document.body.appendChild(form);

      form.dispatchEvent(new Event("submit", { bubbles: true }));
      expect(onInteraction).not.toHaveBeenCalled();
    });

    it("ignores submit event if target is not an HTMLFormElement", () => {
      const div = document.createElement("div");
      document.body.appendChild(div);

      div.dispatchEvent(new Event("submit", { bubbles: true }));
      expect(onInteraction).not.toHaveBeenCalled();
    });
  });

  describe("Change events and sensitive masking", () => {
    it("tracks change events on select and textarea elements", () => {
      const select = document.createElement("select");
      select.setAttribute("data-track-name", "currency_selector");
      document.body.appendChild(select);

      select.dispatchEvent(new Event("change", { bubbles: true }));

      expect(onInteraction).toHaveBeenCalledTimes(1);
      const [comp] = onInteraction.mock.calls[0]!;
      expect(comp.interaction).toBe("change");
      expect(comp.name).toBe("currency_selector");

      const textarea = document.createElement("textarea");
      textarea.placeholder = "Enter invoice notes";
      document.body.appendChild(textarea);

      textarea.dispatchEvent(new Event("change", { bubbles: true }));
      expect(onInteraction).toHaveBeenCalledTimes(2);
      expect(onInteraction.mock.calls[1]?.[0]?.name).toBe("Enter invoice notes");
    });

    it("masks and ignores password fields and sensitive inputs", () => {
      const pwdInput = document.createElement("input");
      pwdInput.type = "password";
      document.body.appendChild(pwdInput);

      pwdInput.dispatchEvent(new Event("change", { bubbles: true }));
      expect(onInteraction).not.toHaveBeenCalled();

      const hiddenInput = document.createElement("input");
      hiddenInput.type = "hidden";
      document.body.appendChild(hiddenInput);

      hiddenInput.dispatchEvent(new Event("change", { bubbles: true }));
      expect(onInteraction).not.toHaveBeenCalled();
    });

    it("masks inputs with names matching default sensitive patterns (aadhaar, pan, ssn, credit-card, cvv)", () => {
      const sensitiveNames = [
        "user_aadhaar_number",
        "vendor_pan",
        "applicant_ssn",
        "credit-card-number",
        "card_cvv",
        "api_token",
        "client_secret",
      ];

      sensitiveNames.forEach((name) => {
        const input = document.createElement("input");
        input.name = name;
        document.body.appendChild(input);

        input.dispatchEvent(new Event("change", { bubbles: true }));
      });

      expect(onInteraction).not.toHaveBeenCalled();
    });

    it("supports custom mask patterns passed in constructor", () => {
      tracker.stop();
      const customTracker = new DomTracker({
        onInteraction,
        maskPatterns: [/custom_secret_key/i],
      });
      customTracker.start();

      const input = document.createElement("input");
      input.name = "custom_secret_key_123";
      document.body.appendChild(input);

      input.dispatchEvent(new Event("change", { bubbles: true }));
      expect(onInteraction).not.toHaveBeenCalled();

      customTracker.stop();
    });
  });

  describe("Track Area and metadata handling", () => {
    it("inherits contextual journey and step from parent track area", () => {
      const area = document.createElement("div");
      area.setAttribute("data-track-area", "");
      area.setAttribute("data-track-area-journey", "user_onboarding");
      area.setAttribute("data-track-area-step", "account_setup");
      area.setAttribute(
        "data-track-area-metadata",
        JSON.stringify({ accountType: "business" })
      );

      const btn = document.createElement("button");
      btn.textContent = "Next Step";
      area.appendChild(btn);
      document.body.appendChild(area);

      btn.click();

      expect(onInteraction).toHaveBeenCalledTimes(1);
      const [, meta] = onInteraction.mock.calls[0]!;
      expect(meta).toEqual({
        journey: "user_onboarding",
        step: "account_setup",
        accountType: "business",
      });
    });

    it("safely handles invalid JSON in track area or element metadata without crashing", () => {
      const area = document.createElement("div");
      area.setAttribute("data-track-area", "");
      area.setAttribute("data-track-area-metadata", "{malformed_json:");

      const btn = document.createElement("button");
      btn.setAttribute("data-track-metadata", "{also_malformed:");
      btn.textContent = "Proceed";
      area.appendChild(btn);
      document.body.appendChild(area);

      expect(() => btn.click()).not.toThrow();
      expect(onInteraction).toHaveBeenCalledTimes(1);
      const [, meta] = onInteraction.mock.calls[0]!;
      expect(meta).toEqual({});
    });
  });

  describe("Lifecycle and edge cases", () => {
    it("is safe to call start() and stop() multiple times", () => {
      expect(() => {
        tracker.start();
        tracker.start();
      }).not.toThrow();

      tracker.stop();
      expect(() => {
        tracker.stop();
        tracker.stop();
      }).not.toThrow();
    });

    it("does not track events after stop() is called", () => {
      tracker.stop();

      const btn = document.createElement("button");
      btn.textContent = "Click after stop";
      document.body.appendChild(btn);

      btn.click();
      expect(onInteraction).not.toHaveBeenCalled();
    });
  });
});
