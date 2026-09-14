"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/utils.ts
var utils_exports = {};
__export(utils_exports, {
  REGEX_BANK_ACCOUNT: () => REGEX_BANK_ACCOUNT,
  REGEX_EMAIL: () => REGEX_EMAIL,
  REGEX_PHONE: () => REGEX_PHONE,
  REGEX_POSTAL_CODE: () => REGEX_POSTAL_CODE,
  REGEX_ROUTING_CODE: () => REGEX_ROUTING_CODE,
  REGEX_TAX_ID: () => REGEX_TAX_ID,
  REGEX_URL: () => REGEX_URL,
  VALIDATION_MESSAGES: () => VALIDATION_MESSAGES,
  VALIDATION_MESSAGES_HI: () => VALIDATION_MESSAGES_HI,
  cleanPhoneNumber: () => cleanPhoneNumber,
  cn: () => cn,
  formatBytes: () => formatBytes,
  formatCurrency: () => formatCurrency,
  formatDate: () => formatDate,
  formatDateTime: () => formatDateTime,
  formatFileSize: () => formatFileSize,
  formatLocalizedDate: () => formatLocalizedDate,
  formatLocalizedDateTime: () => formatLocalizedDateTime,
  formatLocalizedNumber: () => formatLocalizedNumber,
  formatNumber: () => formatNumber,
  formatPercent: () => formatPercent,
  formatQuantity: () => formatQuantity,
  formatRelativeTime: () => formatRelativeTime,
  formatWeight: () => formatWeight,
  isValidEmail: () => isValidEmail,
  isValidPhone: () => isValidPhone,
  maskSensitiveValue: () => maskSensitiveValue,
  validateBankAccount: () => validateBankAccount,
  validateDateRange: () => validateDateRange,
  validateEmail: () => validateEmail,
  validatePassword: () => validatePassword,
  validatePhone: () => validatePhone,
  validatePositiveNumber: () => validatePositiveNumber,
  validatePostalCode: () => validatePostalCode,
  validateRequired: () => validateRequired,
  validateRoutingCode: () => validateRoutingCode,
  validateTaxId: () => validateTaxId,
  validateTimeRange: () => validateTimeRange,
  validateUrl: () => validateUrl
});
module.exports = __toCommonJS(utils_exports);

// src/lib/utils.ts
var import_clsx = require("clsx");
var import_tailwind_merge = require("tailwind-merge");
function cn(...inputs) {
  return (0, import_tailwind_merge.twMerge)((0, import_clsx.clsx)(inputs));
}

// src/lib/formatters.ts
function formatCurrency(amount, currency = "USD", locale = "en-US") {
  const value = typeof amount === "string" ? parseFloat(amount) : amount;
  if (value == null || isNaN(value)) return "\u2014";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}
function formatNumber(value, options, locale = "en-US") {
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (num == null || isNaN(num)) return "\u2014";
  return new Intl.NumberFormat(locale, options).format(num);
}
function formatDate(date, options, locale = "en-US") {
  if (!date) return "\u2014";
  const d = typeof date === "string" ? new Date(date) : date;
  if (!d || typeof d.getTime !== "function" || isNaN(d.getTime())) return "\u2014";
  return d.toLocaleDateString(locale, options ?? {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
function formatDateTime(date, locale = "en-US") {
  if (!date) return "\u2014";
  const d = typeof date === "string" ? new Date(date) : date;
  if (!d || typeof d.getTime !== "function" || isNaN(d.getTime())) return "\u2014";
  return d.toLocaleString(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });
}
function formatRelativeTime(date) {
  if (!date) return "\u2014";
  const d = typeof date === "string" ? new Date(date) : date;
  if (!d || typeof d.getTime !== "function" || isNaN(d.getTime())) return "\u2014";
  const diffMs = d.getTime() - Date.now();
  const diffSec = Math.round(diffMs / 1e3);
  const diffMin = Math.round(diffSec / 60);
  const diffHr = Math.round(diffMin / 60);
  const diffDay = Math.round(diffHr / 24);
  if (Math.abs(diffSec) < 60) return "just now";
  if (Math.abs(diffMin) < 60)
    return diffMin > 0 ? `in ${diffMin}m` : `${Math.abs(diffMin)}m ago`;
  if (Math.abs(diffHr) < 24)
    return diffHr > 0 ? `in ${diffHr}h` : `${Math.abs(diffHr)}h ago`;
  if (Math.abs(diffDay) <= 7)
    return diffDay > 0 ? `in ${diffDay}d` : `${Math.abs(diffDay)}d ago`;
  return formatDate(d);
}
function formatWeight(value, unit = "kg", locale = "en-US") {
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (num == null || isNaN(num)) return "\u2014";
  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 3
  }).format(num);
  return `${formatted} ${unit}`;
}
function formatQuantity(value, unit, locale = "en-US") {
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (num == null || isNaN(num)) return "\u2014";
  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(num);
  return unit ? `${formatted} ${unit}` : formatted;
}
function formatFileSize(bytes) {
  if (bytes == null || isNaN(bytes)) return "\u2014";
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const val = bytes / Math.pow(1024, i);
  return `${val.toFixed(i > 0 ? 1 : 0)} ${units[Math.min(i, units.length - 1)]}`;
}
function formatPercent(value, isRatio = true, decimals = 1) {
  if (value == null || isNaN(value)) return "\u2014";
  const pct = isRatio ? value * 100 : value;
  return `${pct.toFixed(decimals)}%`;
}
function formatLocalizedDate(date, locale = "en-US") {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  if (!d || typeof d.getTime !== "function" || isNaN(d.getTime())) return date?.toString?.() ?? "";
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(d);
}
function formatLocalizedDateTime(date, locale = "en-US") {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  if (!d || typeof d.getTime !== "function" || isNaN(d.getTime())) return date?.toString?.() ?? "";
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  }).format(d);
}
function formatLocalizedNumber(value, locale = "en-US") {
  if (value == null || isNaN(value)) return "";
  return new Intl.NumberFormat(locale, {
    maximumFractionDigits: 2
  }).format(value);
}
function formatBytes(bytes, decimals = 1) {
  if (!bytes || bytes <= 0) return "0 B";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(k)), sizes.length - 1);
  const unit = sizes[Number(i)] || "B";
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${unit}`;
}

// src/lib/validators.ts
var REGEX_EMAIL = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
var REGEX_PHONE = /^\+?[1-9]\d{6,14}$/;
var REGEX_POSTAL_CODE = /^[A-Za-z0-9\s-]{3,10}$/;
var REGEX_TAX_ID = /^[A-Za-z0-9\s-]{6,20}$/;
var REGEX_BANK_ACCOUNT = /^[A-Za-z0-9]{6,34}$/;
var REGEX_ROUTING_CODE = /^[A-Za-z0-9]{4,11}$/;
var REGEX_URL = /^https?:\/\/[^\s/$.?#].[^\s]*$/i;
var VALIDATION_MESSAGES = {
  email: "Enter a valid email address",
  phone: "Enter a valid international phone number",
  postalCode: "Enter a valid postal or ZIP code",
  taxId: "Enter a valid tax identification number",
  bankAccount: "Enter a valid bank account or IBAN number",
  routingCode: "Enter a valid routing code or SWIFT/BIC",
  url: "Enter a valid URL (e.g. https://example.com)"
};
var VALIDATION_MESSAGES_HI = {
  email: "\u0915\u0943\u092A\u092F\u093E \u090F\u0915 \u0935\u0948\u0927 \u0908\u092E\u0947\u0932 \u092A\u0924\u093E \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902 (\u0909\u0926\u093E. user@example.com)",
  phone: "\u0915\u0943\u092A\u092F\u093E \u090F\u0915 \u0935\u0948\u0927 \u0905\u0902\u0924\u0930\u094D\u0930\u093E\u0937\u094D\u091F\u094D\u0930\u0940\u092F \u092B\u093C\u094B\u0928 \u0928\u0902\u092C\u0930 \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902",
  postalCode: "\u0915\u0943\u092A\u092F\u093E \u090F\u0915 \u0935\u0948\u0927 \u092A\u093F\u0928 \u092F\u093E \u092A\u094B\u0938\u094D\u091F\u0932 \u0915\u094B\u0921 \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902",
  taxId: "\u0915\u0943\u092A\u092F\u093E \u090F\u0915 \u0935\u0948\u0927 \u0915\u0930 \u092A\u0939\u091A\u093E\u0928 \u0938\u0902\u0916\u094D\u092F\u093E (Tax ID) \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902",
  bankAccount: "\u0915\u0943\u092A\u092F\u093E \u090F\u0915 \u0935\u0948\u0927 \u092C\u0948\u0902\u0915 \u0916\u093E\u0924\u093E \u092F\u093E IBAN \u0938\u0902\u0916\u094D\u092F\u093E \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902",
  routingCode: "\u0915\u0943\u092A\u092F\u093E \u090F\u0915 \u0935\u0948\u0927 \u0930\u0942\u091F\u093F\u0902\u0917 \u0915\u094B\u0921 \u092F\u093E SWIFT/BIC \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902",
  url: "\u0915\u0943\u092A\u092F\u093E \u090F\u0915 \u0935\u0948\u0927 URL \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902 (\u0909\u0926\u093E. https://example.com)"
};
function cleanPhoneNumber(phone) {
  if (!phone || typeof phone !== "string") return "";
  let digits = phone.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) {
    digits = digits.slice(2);
  }
  if (digits.length === 11 && digits.startsWith("0")) {
    digits = digits.slice(1);
  }
  return digits;
}
function isValidEmail(email) {
  if (!email || typeof email !== "string") return false;
  const trimmed = email.trim();
  if (trimmed.length < 5 || trimmed.length > 254) return false;
  return REGEX_EMAIL.test(trimmed);
}
function isValidPhone(phone, mode = "INTL") {
  const cleaned = cleanPhoneNumber(phone);
  if (!cleaned) return false;
  if (mode === "IN") {
    return cleaned.length === 10 && /^[6-9]\d{9}$/.test(cleaned);
  }
  return cleaned.length >= 7 && cleaned.length <= 15;
}
function validateEmail(value, options = {}) {
  const v = value.trim();
  const lang = options.language ?? "en";
  if (!v) return lang === "hi" ? "\u0908\u092E\u0947\u0932 \u092A\u0924\u093E \u0906\u0935\u0936\u094D\u092F\u0915 \u0939\u0948" : "Email address is required";
  if (!REGEX_EMAIL.test(v)) {
    return lang === "hi" ? VALIDATION_MESSAGES_HI.email : VALIDATION_MESSAGES.email;
  }
}
function validatePhone(value, options = {}) {
  const v = value.trim().replace(/[\s()-]/g, "");
  const lang = options.language ?? "en";
  if (!v) return lang === "hi" ? "\u092B\u093C\u094B\u0928 \u0928\u0902\u092C\u0930 \u0906\u0935\u0936\u094D\u092F\u0915 \u0939\u0948" : "Phone number is required";
  if (!REGEX_PHONE.test(v)) {
    return lang === "hi" ? VALIDATION_MESSAGES_HI.phone : VALIDATION_MESSAGES.phone;
  }
}
function validatePostalCode(value, options = {}) {
  const v = value.trim();
  const lang = options.language ?? "en";
  if (!v) return lang === "hi" ? "\u092A\u094B\u0938\u094D\u091F\u0932 \u0915\u094B\u0921 \u0906\u0935\u0936\u094D\u092F\u0915 \u0939\u0948" : "Postal code is required";
  if (!REGEX_POSTAL_CODE.test(v)) {
    return lang === "hi" ? VALIDATION_MESSAGES_HI.postalCode : VALIDATION_MESSAGES.postalCode;
  }
}
function validateTaxId(value, options = {}) {
  const v = value.trim();
  const lang = options.language ?? "en";
  if (!v) return lang === "hi" ? "\u091F\u0948\u0915\u094D\u0938 \u0906\u0908\u0921\u0940 \u0906\u0935\u0936\u094D\u092F\u0915 \u0939\u0948" : "Tax ID is required";
  if (!REGEX_TAX_ID.test(v)) {
    return lang === "hi" ? VALIDATION_MESSAGES_HI.taxId : VALIDATION_MESSAGES.taxId;
  }
}
function validateBankAccount(value, options = {}) {
  const v = value.trim().replace(/\s/g, "");
  const lang = options.language ?? "en";
  if (!v) return lang === "hi" ? "\u092C\u0948\u0902\u0915 \u0916\u093E\u0924\u093E \u0938\u0902\u0916\u094D\u092F\u093E \u0906\u0935\u0936\u094D\u092F\u0915 \u0939\u0948" : "Bank account number is required";
  if (!REGEX_BANK_ACCOUNT.test(v)) {
    return lang === "hi" ? VALIDATION_MESSAGES_HI.bankAccount : VALIDATION_MESSAGES.bankAccount;
  }
}
function validateRoutingCode(value, options = {}) {
  const v = value.trim();
  const lang = options.language ?? "en";
  if (!v) return lang === "hi" ? "\u0930\u0942\u091F\u093F\u0902\u0917 \u0915\u094B\u0921 \u0906\u0935\u0936\u094D\u092F\u0915 \u0939\u0948" : "Routing code is required";
  if (!REGEX_ROUTING_CODE.test(v)) {
    return lang === "hi" ? VALIDATION_MESSAGES_HI.routingCode : VALIDATION_MESSAGES.routingCode;
  }
}
function validateUrl(value, options = {}) {
  const v = value.trim();
  const lang = options.language ?? "en";
  if (!v) return lang === "hi" ? "URL \u0906\u0935\u0936\u094D\u092F\u0915 \u0939\u0948" : "URL is required";
  if (!REGEX_URL.test(v)) {
    return lang === "hi" ? VALIDATION_MESSAGES_HI.url : VALIDATION_MESSAGES.url;
  }
}
function validatePassword(password, options = {}) {
  const { minLength = 8, language = "en" } = options;
  const pass = password || "";
  if (pass.length < minLength) {
    return {
      isValid: false,
      error: language === "hi" ? `\u092A\u093E\u0938\u0935\u0930\u094D\u0921 \u0915\u092E \u0938\u0947 \u0915\u092E ${minLength} \u0905\u0915\u094D\u0937\u0930\u094B\u0902 \u0915\u093E \u0939\u094B\u0928\u093E \u091A\u093E\u0939\u093F\u090F\u0964` : `Password must be at least ${minLength} characters long.`,
      strength: "weak"
    };
  }
  const hasLetters = /[a-zA-Z]/.test(pass);
  const hasNumbers = /\d/.test(pass);
  const hasSpecial = /[^a-zA-Z0-9]/.test(pass);
  if (!hasLetters || !hasNumbers) {
    return {
      isValid: false,
      error: language === "hi" ? "\u092A\u093E\u0938\u0935\u0930\u094D\u0921 \u092E\u0947\u0902 \u0915\u092E \u0938\u0947 \u0915\u092E \u090F\u0915 \u0905\u0915\u094D\u0937\u0930 \u0914\u0930 \u090F\u0915 \u0905\u0902\u0915 \u0939\u094B\u0928\u093E \u091A\u093E\u0939\u093F\u090F\u0964" : "Password must contain at least one letter and one number.",
      strength: "weak"
    };
  }
  let strength = "weak";
  if (pass.length >= 10 && hasSpecial) {
    strength = "strong";
  } else if (pass.length >= 8 && hasLetters && hasNumbers) {
    strength = "medium";
  }
  return { isValid: true, strength };
}
function validateRequired(value, fieldName, minLength = 1, maxLength, options = {}) {
  const { language = "en" } = options;
  const trimmed = (value || "").trim();
  if (!trimmed || trimmed.length < minLength) {
    let errorMsg = `${fieldName} is required.`;
    if (minLength > 1) {
      errorMsg = language === "hi" ? `${fieldName} \u0915\u092E \u0938\u0947 \u0915\u092E ${minLength} \u0905\u0915\u094D\u0937\u0930\u094B\u0902 \u0915\u093E \u0939\u094B\u0928\u093E \u091A\u093E\u0939\u093F\u090F\u0964` : `${fieldName} must be at least ${minLength} characters long.`;
    } else if (language === "hi") {
      errorMsg = `${fieldName} \u0906\u0935\u0936\u094D\u092F\u0915 \u0939\u0948\u0964`;
    }
    return {
      isValid: false,
      error: errorMsg,
      value: trimmed
    };
  }
  if (maxLength && trimmed.length > maxLength) {
    return {
      isValid: false,
      error: language === "hi" ? `${fieldName} ${maxLength} \u0905\u0915\u094D\u0937\u0930\u094B\u0902 \u0938\u0947 \u0905\u0927\u093F\u0915 \u0928\u0939\u0940\u0902 \u0939\u094B \u0938\u0915\u0924\u093E\u0964` : `${fieldName} cannot exceed ${maxLength} characters.`,
      value: trimmed
    };
  }
  return { isValid: true, value: trimmed };
}
function checkZeroBound(num, fieldName, allowZero, language) {
  if (allowZero) {
    if (num < 0) {
      return language === "hi" ? `${fieldName} 0 \u092F\u093E \u0909\u0938\u0938\u0947 \u0905\u0927\u093F\u0915 \u0939\u094B\u0928\u093E \u091A\u093E\u0939\u093F\u090F\u0964` : `${fieldName} must be 0 or greater.`;
    }
    return null;
  }
  if (num <= 0) {
    return language === "hi" ? `${fieldName} 0 \u0938\u0947 \u0905\u0927\u093F\u0915 \u0939\u094B\u0928\u093E \u091A\u093E\u0939\u093F\u090F\u0964` : `${fieldName} must be greater than 0.`;
  }
  return null;
}
function checkMinMaxBound(num, fieldName, min, max, language = "en") {
  if (min !== void 0 && num < min) {
    return language === "hi" ? `${fieldName} \u0915\u092E \u0938\u0947 \u0915\u092E ${min} \u0939\u094B\u0928\u093E \u091A\u093E\u0939\u093F\u090F\u0964` : `${fieldName} must be at least ${min}.`;
  }
  if (max !== void 0 && num > max) {
    return language === "hi" ? `${fieldName} ${max} \u0938\u0947 \u0905\u0927\u093F\u0915 \u0928\u0939\u0940\u0902 \u0939\u094B \u0938\u0915\u0924\u093E\u0964` : `${fieldName} cannot exceed ${max}.`;
  }
  return null;
}
function checkNumberBounds(num, fieldName, options) {
  const { allowZero = false, min, max, language = "en" } = options;
  const zeroErr = checkZeroBound(num, fieldName, allowZero, language);
  if (zeroErr) return zeroErr;
  return checkMinMaxBound(num, fieldName, min, max, language);
}
function validatePositiveNumber(value, fieldName, options = {}) {
  const { language = "en" } = options;
  const num = typeof value === "number" ? value : parseFloat(String(value));
  if (Number.isNaN(num)) {
    return {
      isValid: false,
      error: language === "hi" ? `${fieldName} \u090F\u0915 \u0935\u0948\u0927 \u0938\u0902\u0916\u094D\u092F\u093E \u0939\u094B\u0928\u0940 \u091A\u093E\u0939\u093F\u090F\u0964` : `${fieldName} must be a valid number.`,
      numberValue: 0
    };
  }
  const boundError = checkNumberBounds(num, fieldName, options);
  if (boundError) {
    return {
      isValid: false,
      error: boundError,
      numberValue: num
    };
  }
  return { isValid: true, numberValue: num };
}
function validateDateRange(startDate, endDate, options = {}) {
  const { language = "en" } = options;
  if (!startDate) {
    return { isValid: false, error: language === "hi" ? "\u092A\u094D\u0930\u093E\u0930\u0902\u092D \u0924\u093F\u0925\u093F \u0906\u0935\u0936\u094D\u092F\u0915 \u0939\u0948\u0964" : "Start date is required." };
  }
  if (!endDate) {
    return { isValid: false, error: language === "hi" ? "\u0938\u092E\u093E\u092A\u094D\u0924\u093F \u0924\u093F\u0925\u093F \u0906\u0935\u0936\u094D\u092F\u0915 \u0939\u0948\u0964" : "End date is required." };
  }
  if (startDate > endDate) {
    return {
      isValid: false,
      error: language === "hi" ? "\u0938\u092E\u093E\u092A\u094D\u0924\u093F \u0924\u093F\u0925\u093F \u092A\u094D\u0930\u093E\u0930\u0902\u092D \u0924\u093F\u0925\u093F \u0915\u0947 \u092C\u093E\u0926 \u092F\u093E \u092C\u0930\u093E\u092C\u0930 \u0939\u094B\u0928\u0940 \u091A\u093E\u0939\u093F\u090F\u0964" : "End date must be on or after the start date."
    };
  }
  return { isValid: true };
}
function validateTimeRange(startTime, endTime, options = {}) {
  const { language = "en" } = options;
  if (!startTime) {
    return { isValid: false, error: language === "hi" ? "\u092A\u094D\u0930\u093E\u0930\u0902\u092D \u0938\u092E\u092F \u0906\u0935\u0936\u094D\u092F\u0915 \u0939\u0948\u0964" : "Start time is required." };
  }
  if (!endTime) {
    return { isValid: false, error: language === "hi" ? "\u0938\u092E\u093E\u092A\u094D\u0924\u093F \u0938\u092E\u092F \u0906\u0935\u0936\u094D\u092F\u0915 \u0939\u0948\u0964" : "End time is required." };
  }
  if (startTime >= endTime) {
    return {
      isValid: false,
      error: language === "hi" ? "\u0938\u092E\u093E\u092A\u094D\u0924\u093F \u0938\u092E\u092F \u092A\u094D\u0930\u093E\u0930\u0902\u092D \u0938\u092E\u092F \u0915\u0947 \u092C\u093E\u0926 \u0939\u094B\u0928\u093E \u091A\u093E\u0939\u093F\u090F\u0964" : "End time must be chronologically after the start time."
    };
  }
  return { isValid: true };
}

// src/lib/masking.ts
function maskSensitiveValue(value, options = {}) {
  const {
    isMasked = false,
    maskPattern = "\u2022\u2022\u2022\u2022\u2022\u2022",
    dataType = "FINANCIAL_DATA",
    formatAsCurrency = true
  } = options;
  if (value === void 0 || value === null) {
    return isMasked ? maskPattern : "\u2014";
  }
  if (isMasked) {
    return maskPattern;
  }
  if (typeof value === "number") {
    if (formatAsCurrency && dataType === "FINANCIAL_DATA") {
      return formatCurrency(value);
    }
    return formatNumber(value);
  }
  return String(value);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  REGEX_BANK_ACCOUNT,
  REGEX_EMAIL,
  REGEX_PHONE,
  REGEX_POSTAL_CODE,
  REGEX_ROUTING_CODE,
  REGEX_TAX_ID,
  REGEX_URL,
  VALIDATION_MESSAGES,
  VALIDATION_MESSAGES_HI,
  cleanPhoneNumber,
  cn,
  formatBytes,
  formatCurrency,
  formatDate,
  formatDateTime,
  formatFileSize,
  formatLocalizedDate,
  formatLocalizedDateTime,
  formatLocalizedNumber,
  formatNumber,
  formatPercent,
  formatQuantity,
  formatRelativeTime,
  formatWeight,
  isValidEmail,
  isValidPhone,
  maskSensitiveValue,
  validateBankAccount,
  validateDateRange,
  validateEmail,
  validatePassword,
  validatePhone,
  validatePositiveNumber,
  validatePostalCode,
  validateRequired,
  validateRoutingCode,
  validateTaxId,
  validateTimeRange,
  validateUrl
});
//# sourceMappingURL=utils.cjs.map