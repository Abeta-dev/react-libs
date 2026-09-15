/**
 * @file validators.ts — India statutory validation patterns & helpers.
 *
 * Provides regex constants and validator functions for Indian business identifiers
 * including GSTIN, PAN, IFSC, Mobile numbers, FSSAI, and PIN codes.
 */

import { cleanPhoneNumber, type ValidationLanguage } from "../lib/validators";

export { cleanPhoneNumber };

export const REGEX_GSTIN = /^\d{2}[A-Z]{5}\d{4}[A-Z][1-9A-Z]Z[\dA-Z]$/;
export const REGEX_PAN = /^[A-Z]{5}\d{4}[A-Z]$/;
export const REGEX_PHONE_IN = /^[6-9]\d{9}$/;
export const REGEX_IFSC = /^[A-Z]{4}0[A-Z\d]{6}$/;
export const REGEX_BANK_ACCOUNT_IN = /^\d{9,18}$/;
export const REGEX_FSSAI = /^\d{14}$/;
export const REGEX_PINCODE = /^[1-9]\d{5}$/;

export const VALIDATION_MESSAGES_IN = {
  gstin: "Enter a valid 15-character GSTIN (e.g. 27AADCA1234D1Z5)",
  pan: "Enter a valid 10-character PAN (e.g. AADCA1234D)",
  phone: "Enter a valid 10-digit Indian mobile number",
  ifsc: "Enter a valid IFSC code (e.g. HDFC0001234)",
  bankAccount: "Account number must be 9–18 digits",
  fssai: "FSSAI license must be exactly 14 digits",
  pincode: "Enter a valid 6-digit pincode",
} as const;

export const VALIDATION_MESSAGES_IN_HI = {
  gstin: "कृपया एक वैध 15-अक्षरों का GSTIN दर्ज करें (उदा. 27AADCA1234D1Z5)",
  pan: "कृपया एक वैध 10-अक्षरों का PAN दर्ज करें (उदा. AADCA1234D)",
  phone: "भारतीय मोबाइल नंबर 10 अंकों का और 6, 7, 8 या 9 से शुरू होना चाहिए",
  ifsc: "कृपया एक वैध IFSC कोड दर्ज करें (उदा. HDFC0001234)",
  bankAccount: "बैंक खाता संख्या 9 से 18 अंकों की होनी चाहिए",
  fssai: "FSSAI लाइसेंस संख्या ठीक 14 अंकों की होनी चाहिए",
  pincode: "कृपया एक वैध 6-अंकों का पिनकोड दर्ज करें",
} as const;

export interface IndiaValidationOptions {
  language?: ValidationLanguage;
}

export function validateGSTIN(value?: string | null, options: IndiaValidationOptions = {}): string | undefined {
  const v = typeof value === 'string' ? value.trim().toUpperCase() : '';
  const lang = options.language ?? 'en';
  if (!v) return lang === 'hi' ? "GST नंबर आवश्यक है" : "GST Number is required";
  if (!REGEX_GSTIN.test(v)) return lang === 'hi' ? VALIDATION_MESSAGES_IN_HI.gstin : VALIDATION_MESSAGES_IN.gstin;
}

export function validatePAN(value?: string | null, options: IndiaValidationOptions = {}): string | undefined {
  const v = typeof value === 'string' ? value.trim().toUpperCase() : '';
  const lang = options.language ?? 'en';
  if (!v) return lang === 'hi' ? "PAN नंबर आवश्यक है" : "PAN Number is required";
  if (!REGEX_PAN.test(v)) return lang === 'hi' ? VALIDATION_MESSAGES_IN_HI.pan : VALIDATION_MESSAGES_IN.pan;
}

export function validatePhoneIN(value?: string | null, options: IndiaValidationOptions = {}): string | undefined {
  const raw = typeof value === 'string' ? value.trim() : '';
  const lang = options.language ?? 'en';
  if (!raw) return lang === 'hi' ? "फ़ोन नंबर आवश्यक है" : "Phone number is required";
  
  const cleaned = cleanPhoneNumber(raw);
  if (!cleaned || cleaned.length !== 10 || !REGEX_PHONE_IN.test(cleaned)) {
    return lang === 'hi' ? VALIDATION_MESSAGES_IN_HI.phone : VALIDATION_MESSAGES_IN.phone;
  }
}

export function validateIFSC(value?: string | null, options: IndiaValidationOptions = {}): string | undefined {
  const v = typeof value === 'string' ? value.trim().toUpperCase() : '';
  const lang = options.language ?? 'en';
  if (!v) return lang === 'hi' ? "IFSC कोड आवश्यक है" : "IFSC code is required";
  if (!REGEX_IFSC.test(v)) return lang === 'hi' ? VALIDATION_MESSAGES_IN_HI.ifsc : VALIDATION_MESSAGES_IN.ifsc;
}

export function validateBankAccountIN(value?: string | null, options: IndiaValidationOptions = {}): string | undefined {
  const v = typeof value === 'string' ? value.trim().replace(/\s/g, "") : '';
  const lang = options.language ?? 'en';
  if (!v) return lang === 'hi' ? "बैंक खाता संख्या आवश्यक है" : "Account number is required";
  if (!REGEX_BANK_ACCOUNT_IN.test(v)) return lang === 'hi' ? VALIDATION_MESSAGES_IN_HI.bankAccount : VALIDATION_MESSAGES_IN.bankAccount;
}

export function validateFSSAI(value?: string | null, options: IndiaValidationOptions = {}): string | undefined {
  const v = typeof value === 'string' ? value.trim() : '';
  if (!v) return undefined;
  const lang = options.language ?? 'en';
  if (!REGEX_FSSAI.test(v)) return lang === 'hi' ? VALIDATION_MESSAGES_IN_HI.fssai : VALIDATION_MESSAGES_IN.fssai;
}

export function validatePincode(value?: string | null, options: IndiaValidationOptions = {}): string | undefined {
  const v = typeof value === 'string' ? value.trim() : '';
  const lang = options.language ?? 'en';
  if (!v) return lang === 'hi' ? "पिनकोड आवश्यक है" : "Pincode is required";
  if (!REGEX_PINCODE.test(v)) return lang === 'hi' ? VALIDATION_MESSAGES_IN_HI.pincode : VALIDATION_MESSAGES_IN.pincode;
}

