import { describe, it, expect } from "vitest";
import {
  validateGSTIN,
  validatePAN,
  validatePhoneIN,
  validateIFSC,
  validateBankAccountIN,
  validateFSSAI,
  validatePincode,
  VALIDATION_MESSAGES_IN,
  VALIDATION_MESSAGES_IN_HI,
} from "../validators";

describe("India Validators Defensive & Runtime Robustness", () => {
  describe("validateGSTIN", () => {
    it("validates correct GSTIN", () => {
      expect(validateGSTIN("27AADCA1234D1Z5")).toBeUndefined();
      expect(validateGSTIN("29AADCA1234D1ZA")).toBeUndefined();
    });

    it("returns error on invalid GSTIN", () => {
      expect(validateGSTIN("INVALID")).toBe(VALIDATION_MESSAGES_IN.gstin);
      expect(validateGSTIN("INVALID", { language: "hi" })).toBe(VALIDATION_MESSAGES_IN_HI.gstin);
    });

    it("defensively handles empty string, null, and undefined without throwing", () => {
      expect(validateGSTIN("")).toBe("GST Number is required");
      expect(validateGSTIN("   ")).toBe("GST Number is required");
      expect(validateGSTIN(null as unknown as string)).toBe("GST Number is required");
      expect(validateGSTIN(undefined)).toBe("GST Number is required");
      expect(validateGSTIN(undefined, { language: "hi" })).toBe("GST नंबर आवश्यक है");
    });
  });

  describe("validatePAN", () => {
    it("validates correct PAN", () => {
      expect(validatePAN("AADCA1234D")).toBeUndefined();
    });

    it("returns error on invalid PAN", () => {
      expect(validatePAN("INVALID")).toBe(VALIDATION_MESSAGES_IN.pan);
      expect(validatePAN("INVALID", { language: "hi" })).toBe(VALIDATION_MESSAGES_IN_HI.pan);
    });

    it("defensively handles empty string, null, and undefined without throwing", () => {
      expect(validatePAN("")).toBe("PAN Number is required");
      expect(validatePAN("   ")).toBe("PAN Number is required");
      expect(validatePAN(null as unknown as string)).toBe("PAN Number is required");
      expect(validatePAN(undefined)).toBe("PAN Number is required");
      expect(validatePAN(undefined, { language: "hi" })).toBe("PAN नंबर आवश्यक है");
    });
  });

  describe("validatePhoneIN", () => {
    it("validates correct Indian phone numbers", () => {
      expect(validatePhoneIN("9876543210")).toBeUndefined();
      expect(validatePhoneIN("+91 98765 43210")).toBeUndefined();
      expect(validatePhoneIN("09876543210")).toBeUndefined();
    });

    it("returns error on invalid phone numbers", () => {
      expect(validatePhoneIN("12345")).toBe(VALIDATION_MESSAGES_IN.phone);
      expect(validatePhoneIN("5876543210")).toBe(VALIDATION_MESSAGES_IN.phone);
      expect(validatePhoneIN("12345", { language: "hi" })).toBe(VALIDATION_MESSAGES_IN_HI.phone);
    });

    it("defensively handles empty string, null, and undefined without throwing", () => {
      expect(validatePhoneIN("")).toBe("Phone number is required");
      expect(validatePhoneIN("   ")).toBe("Phone number is required");
      expect(validatePhoneIN(null as unknown as string)).toBe("Phone number is required");
      expect(validatePhoneIN(undefined)).toBe("Phone number is required");
      expect(validatePhoneIN(undefined, { language: "hi" })).toBe("फ़ोन नंबर आवश्यक है");
    });
  });

  describe("validateIFSC", () => {
    it("validates correct IFSC", () => {
      expect(validateIFSC("HDFC0001234")).toBeUndefined();
      expect(validateIFSC("sbin0000123")).toBeUndefined(); // case insensitive trim & uppercase
    });

    it("returns error on invalid IFSC", () => {
      expect(validateIFSC("HDFC1001234")).toBe(VALIDATION_MESSAGES_IN.ifsc); // 5th char not 0
      expect(validateIFSC("BADIFSC")).toBe(VALIDATION_MESSAGES_IN.ifsc);
      expect(validateIFSC("BADIFSC", { language: "hi" })).toBe(VALIDATION_MESSAGES_IN_HI.ifsc);
    });

    it("defensively handles empty string, null, and undefined without throwing", () => {
      expect(validateIFSC("")).toBe("IFSC code is required");
      expect(validateIFSC("   ")).toBe("IFSC code is required");
      expect(validateIFSC(null as unknown as string)).toBe("IFSC code is required");
      expect(validateIFSC(undefined)).toBe("IFSC code is required");
      expect(validateIFSC(undefined, { language: "hi" })).toBe("IFSC कोड आवश्यक है");
    });
  });

  describe("validateBankAccountIN", () => {
    it("validates correct Indian bank account numbers", () => {
      expect(validateBankAccountIN("123456789012")).toBeUndefined();
      expect(validateBankAccountIN("1234 5678 9012")).toBeUndefined();
    });

    it("returns error on invalid bank accounts", () => {
      expect(validateBankAccountIN("1234")).toBe(VALIDATION_MESSAGES_IN.bankAccount);
      expect(validateBankAccountIN("1234", { language: "hi" })).toBe(VALIDATION_MESSAGES_IN_HI.bankAccount);
    });

    it("defensively handles empty string, null, and undefined without throwing", () => {
      expect(validateBankAccountIN("")).toBe("Account number is required");
      expect(validateBankAccountIN("   ")).toBe("Account number is required");
      expect(validateBankAccountIN(null as unknown as string)).toBe("Account number is required");
      expect(validateBankAccountIN(undefined)).toBe("Account number is required");
      expect(validateBankAccountIN(undefined, { language: "hi" })).toBe("बैंक खाता संख्या आवश्यक है");
    });
  });

  describe("validateFSSAI", () => {
    it("validates correct 14-digit FSSAI numbers", () => {
      expect(validateFSSAI("12345678901234")).toBeUndefined();
    });

    it("returns undefined for empty, null, or undefined as FSSAI is optional", () => {
      expect(validateFSSAI("")).toBeUndefined();
      expect(validateFSSAI("   ")).toBeUndefined();
      expect(validateFSSAI(null as unknown as string)).toBeUndefined();
      expect(validateFSSAI(undefined)).toBeUndefined();
    });

    it("returns error on invalid FSSAI numbers", () => {
      expect(validateFSSAI("12345")).toBe(VALIDATION_MESSAGES_IN.fssai);
      expect(validateFSSAI("12345", { language: "hi" })).toBe(VALIDATION_MESSAGES_IN_HI.fssai);
    });
  });

  describe("validatePincode", () => {
    it("validates correct 6-digit pincode", () => {
      expect(validatePincode("400001")).toBeUndefined();
      expect(validatePincode("110001")).toBeUndefined();
    });

    it("returns error on invalid pincode", () => {
      expect(validatePincode("011001")).toBe(VALIDATION_MESSAGES_IN.pincode); // starts with 0
      expect(validatePincode("12345")).toBe(VALIDATION_MESSAGES_IN.pincode);
      expect(validatePincode("12345", { language: "hi" })).toBe(VALIDATION_MESSAGES_IN_HI.pincode);
    });

    it("defensively handles empty string, null, and undefined without throwing", () => {
      expect(validatePincode("")).toBe("Pincode is required");
      expect(validatePincode("   ")).toBe("Pincode is required");
      expect(validatePincode(null as unknown as string)).toBe("Pincode is required");
      expect(validatePincode(undefined)).toBe("Pincode is required");
      expect(validatePincode(undefined, { language: "hi" })).toBe("पिनकोड आवश्यक है");
    });
  });
});
