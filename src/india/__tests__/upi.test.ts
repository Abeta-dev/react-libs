import { describe, it, expect } from "vitest";
import {
  validateUpiId,
  generateUpiPayUri,
  parseUpiPayUri,
} from "../upi";

describe("India UPI Utilities (NPCI Standards)", () => {
  describe("validateUpiId", () => {
    it("validates standard NPCI VPAs across leading Indian PSPs", () => {
      expect(validateUpiId("merchant@okhdfcbank").isValid).toBe(true);
      expect(validateUpiId("coaching99@paytm").isValid).toBe(true);
      expect(validateUpiId("director.kumar@ybl").isValid).toBe(true);
      expect(validateUpiId("tuition_academy@icici").isValid).toBe(true);
      expect(validateUpiId("school-fees@sbi").isValid).toBe(true);
      expect(validateUpiId("student123@axl").isValid).toBe(true);
    });

    it("detects invalid UPI IDs", () => {
      expect(validateUpiId("").isValid).toBe(false);
      expect(validateUpiId("invalid").isValid).toBe(false);
      expect(validateUpiId("@okhdfcbank").isValid).toBe(false);
      expect(validateUpiId("user@").isValid).toBe(false);
      expect(validateUpiId("user@@paytm").isValid).toBe(false);
      expect(validateUpiId("user space@ybl").isValid).toBe(false);
    });
  });

  describe("generateUpiPayUri", () => {
    it("generates a valid basic upi://pay URI", () => {
      const uri = generateUpiPayUri({
        upiId: "academy@upi",
      });
      expect(uri).toBe("upi://pay?pa=academy%40upi&cu=INR");
    });

    it("generates a full upi://pay URI with all parameters properly encoded", () => {
      const uri = generateUpiPayUri({
        upiId: "coaching@hdfcbank",
        payeeName: "Apex Classes",
        amount: 2500,
        transactionNote: "Class 10 Term Fee",
        transactionRef: "TXN123456",
        merchantCode: "8211",
      });

      expect(uri).toContain("pa=coaching%40hdfcbank");
      expect(uri).toContain("pn=Apex%20Classes");
      expect(uri).toContain("am=2500.00");
      expect(uri).toContain("cu=INR");
      expect(uri).toContain("tn=Class%2010%20Term%20Fee");
      expect(uri).toContain("tr=TXN123456");
      expect(uri).toContain("mc=8211");
    });
  });

  describe("parseUpiPayUri", () => {
    it("round-trips generation and parsing accurately", () => {
      const original = {
        upiId: "shiksha@icici",
        payeeName: "Shiksha Kendra",
        amount: 1500,
        transactionNote: "Registration Fee",
      };

      const uri = generateUpiPayUri(original);
      const parsed = parseUpiPayUri(uri);

      expect(parsed).not.toBeNull();
      expect(parsed?.upiId).toBe("shiksha@icici");
      expect(parsed?.payeeName).toBe("Shiksha Kendra");
      expect(parsed?.amount).toBe(1500);
      expect(parsed?.transactionNote).toBe("Registration Fee");
      expect(parsed?.currency).toBe("INR");
    });

    it("returns null for malformed URIs", () => {
      expect(parseUpiPayUri("https://example.com")).toBeNull();
      expect(parseUpiPayUri("upi://invalid")).toBeNull();
      expect(parseUpiPayUri("")).toBeNull();
    });
  });
});
