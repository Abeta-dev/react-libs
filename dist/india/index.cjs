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

// src/india/index.ts
var india_exports = {};
__export(india_exports, {
  INDIAN_LANGUAGES: () => INDIAN_LANGUAGES,
  INDIA_CITIES: () => INDIA_CITIES,
  INDIA_STATES: () => INDIA_STATES,
  REGEX_BANK_ACCOUNT_IN: () => REGEX_BANK_ACCOUNT_IN,
  REGEX_FSSAI: () => REGEX_FSSAI,
  REGEX_GSTIN: () => REGEX_GSTIN,
  REGEX_IFSC: () => REGEX_IFSC,
  REGEX_PAN: () => REGEX_PAN,
  REGEX_PHONE_IN: () => REGEX_PHONE_IN,
  REGEX_PINCODE: () => REGEX_PINCODE,
  VALIDATION_MESSAGES_IN: () => VALIDATION_MESSAGES_IN,
  VALIDATION_MESSAGES_IN_HI: () => VALIDATION_MESSAGES_IN_HI,
  calculateGSTSplit: () => calculateGSTSplit,
  calculateTDS: () => calculateTDS,
  cleanPhoneNumber: () => cleanPhoneNumber,
  formatCrores: () => formatCrores,
  formatLakhs: () => formatLakhs,
  formatPhoneForWhatsApp: () => formatPhoneForWhatsApp,
  formatWhatsAppTemplate: () => formatWhatsAppTemplate,
  generateWhatsAppAppUrl: () => generateWhatsAppAppUrl,
  generateWhatsAppUrl: () => generateWhatsAppUrl,
  getCitiesForState: () => getCitiesForState,
  getCityOptions: () => getCityOptions,
  getStateOptions: () => getStateOptions,
  isMetroCity: () => isMetroCity,
  openWhatsApp: () => openWhatsApp,
  validateBankAccountIN: () => validateBankAccountIN,
  validateFSSAI: () => validateFSSAI,
  validateGSTIN: () => validateGSTIN,
  validateIFSC: () => validateIFSC,
  validatePAN: () => validatePAN,
  validatePhoneIN: () => validatePhoneIN,
  validatePincode: () => validatePincode
});
module.exports = __toCommonJS(india_exports);

// src/lib/validators.ts
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

// src/india/validators.ts
var REGEX_GSTIN = /^\d{2}[A-Z]{5}\d{4}[A-Z][1-9A-Z]Z[\dA-Z]$/;
var REGEX_PAN = /^[A-Z]{5}\d{4}[A-Z]$/;
var REGEX_PHONE_IN = /^[6-9]\d{9}$/;
var REGEX_IFSC = /^[A-Z]{4}0[A-Z\d]{6}$/;
var REGEX_BANK_ACCOUNT_IN = /^\d{9,18}$/;
var REGEX_FSSAI = /^\d{14}$/;
var REGEX_PINCODE = /^[1-9]\d{5}$/;
var VALIDATION_MESSAGES_IN = {
  gstin: "Enter a valid 15-character GSTIN (e.g. 27AADCA1234D1Z5)",
  pan: "Enter a valid 10-character PAN (e.g. AADCA1234D)",
  phone: "Enter a valid 10-digit Indian mobile number",
  ifsc: "Enter a valid IFSC code (e.g. HDFC0001234)",
  bankAccount: "Account number must be 9\u201318 digits",
  fssai: "FSSAI license must be exactly 14 digits",
  pincode: "Enter a valid 6-digit pincode"
};
var VALIDATION_MESSAGES_IN_HI = {
  gstin: "\u0915\u0943\u092A\u092F\u093E \u090F\u0915 \u0935\u0948\u0927 15-\u0905\u0915\u094D\u0937\u0930\u094B\u0902 \u0915\u093E GSTIN \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902 (\u0909\u0926\u093E. 27AADCA1234D1Z5)",
  pan: "\u0915\u0943\u092A\u092F\u093E \u090F\u0915 \u0935\u0948\u0927 10-\u0905\u0915\u094D\u0937\u0930\u094B\u0902 \u0915\u093E PAN \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902 (\u0909\u0926\u093E. AADCA1234D)",
  phone: "\u092D\u093E\u0930\u0924\u0940\u092F \u092E\u094B\u092C\u093E\u0907\u0932 \u0928\u0902\u092C\u0930 10 \u0905\u0902\u0915\u094B\u0902 \u0915\u093E \u0914\u0930 6, 7, 8 \u092F\u093E 9 \u0938\u0947 \u0936\u0941\u0930\u0942 \u0939\u094B\u0928\u093E \u091A\u093E\u0939\u093F\u090F",
  ifsc: "\u0915\u0943\u092A\u092F\u093E \u090F\u0915 \u0935\u0948\u0927 IFSC \u0915\u094B\u0921 \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902 (\u0909\u0926\u093E. HDFC0001234)",
  bankAccount: "\u092C\u0948\u0902\u0915 \u0916\u093E\u0924\u093E \u0938\u0902\u0916\u094D\u092F\u093E 9 \u0938\u0947 18 \u0905\u0902\u0915\u094B\u0902 \u0915\u0940 \u0939\u094B\u0928\u0940 \u091A\u093E\u0939\u093F\u090F",
  fssai: "FSSAI \u0932\u093E\u0907\u0938\u0947\u0902\u0938 \u0938\u0902\u0916\u094D\u092F\u093E \u0920\u0940\u0915 14 \u0905\u0902\u0915\u094B\u0902 \u0915\u0940 \u0939\u094B\u0928\u0940 \u091A\u093E\u0939\u093F\u090F",
  pincode: "\u0915\u0943\u092A\u092F\u093E \u090F\u0915 \u0935\u0948\u0927 6-\u0905\u0902\u0915\u094B\u0902 \u0915\u093E \u092A\u093F\u0928\u0915\u094B\u0921 \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902"
};
function validateGSTIN(value, options = {}) {
  const v = value.trim().toUpperCase();
  const lang = options.language ?? "en";
  if (!v) return lang === "hi" ? "GST \u0928\u0902\u092C\u0930 \u0906\u0935\u0936\u094D\u092F\u0915 \u0939\u0948" : "GST Number is required";
  if (!REGEX_GSTIN.test(v)) return lang === "hi" ? VALIDATION_MESSAGES_IN_HI.gstin : VALIDATION_MESSAGES_IN.gstin;
}
function validatePAN(value, options = {}) {
  const v = value.trim().toUpperCase();
  const lang = options.language ?? "en";
  if (!v) return lang === "hi" ? "PAN \u0928\u0902\u092C\u0930 \u0906\u0935\u0936\u094D\u092F\u0915 \u0939\u0948" : "PAN Number is required";
  if (!REGEX_PAN.test(v)) return lang === "hi" ? VALIDATION_MESSAGES_IN_HI.pan : VALIDATION_MESSAGES_IN.pan;
}
function validatePhoneIN(value, options = {}) {
  const raw = value.trim();
  const lang = options.language ?? "en";
  if (!raw) return lang === "hi" ? "\u092B\u093C\u094B\u0928 \u0928\u0902\u092C\u0930 \u0906\u0935\u0936\u094D\u092F\u0915 \u0939\u0948" : "Phone number is required";
  const cleaned = cleanPhoneNumber(raw);
  if (!cleaned || cleaned.length !== 10 || !REGEX_PHONE_IN.test(cleaned)) {
    return lang === "hi" ? VALIDATION_MESSAGES_IN_HI.phone : VALIDATION_MESSAGES_IN.phone;
  }
}
function validateIFSC(value, options = {}) {
  const v = value.trim().toUpperCase();
  const lang = options.language ?? "en";
  if (!v) return lang === "hi" ? "IFSC \u0915\u094B\u0921 \u0906\u0935\u0936\u094D\u092F\u0915 \u0939\u0948" : "IFSC code is required";
  if (!REGEX_IFSC.test(v)) return lang === "hi" ? VALIDATION_MESSAGES_IN_HI.ifsc : VALIDATION_MESSAGES_IN.ifsc;
}
function validateBankAccountIN(value, options = {}) {
  const v = value.trim().replace(/\s/g, "");
  const lang = options.language ?? "en";
  if (!v) return lang === "hi" ? "\u092C\u0948\u0902\u0915 \u0916\u093E\u0924\u093E \u0938\u0902\u0916\u094D\u092F\u093E \u0906\u0935\u0936\u094D\u092F\u0915 \u0939\u0948" : "Account number is required";
  if (!REGEX_BANK_ACCOUNT_IN.test(v)) return lang === "hi" ? VALIDATION_MESSAGES_IN_HI.bankAccount : VALIDATION_MESSAGES_IN.bankAccount;
}
function validateFSSAI(value, options = {}) {
  if (!value || !value.trim()) return void 0;
  const lang = options.language ?? "en";
  if (!REGEX_FSSAI.test(value.trim())) return lang === "hi" ? VALIDATION_MESSAGES_IN_HI.fssai : VALIDATION_MESSAGES_IN.fssai;
}
function validatePincode(value, options = {}) {
  const v = value.trim();
  const lang = options.language ?? "en";
  if (!v) return lang === "hi" ? "\u092A\u093F\u0928\u0915\u094B\u0921 \u0906\u0935\u0936\u094D\u092F\u0915 \u0939\u0948" : "Pincode is required";
  if (!REGEX_PINCODE.test(v)) return lang === "hi" ? VALIDATION_MESSAGES_IN_HI.pincode : VALIDATION_MESSAGES_IN.pincode;
}

// src/india/tax.ts
function calculateGSTSplit(amount, taxRate = 18, isIntraState = true, isTaxInclusive = false) {
  const rate = Math.max(0, taxRate);
  let baseAmount = 0;
  let totalTax = 0;
  if (isTaxInclusive) {
    baseAmount = amount / (1 + rate / 100);
    totalTax = amount - baseAmount;
  } else {
    baseAmount = amount;
    totalTax = amount * (rate / 100);
  }
  let cgstAmount = 0;
  let sgstAmount = 0;
  let igstAmount = 0;
  if (isIntraState) {
    cgstAmount = totalTax / 2;
    sgstAmount = totalTax / 2;
  } else {
    igstAmount = totalTax;
  }
  return {
    baseAmount,
    totalTax,
    cgstAmount,
    sgstAmount,
    igstAmount,
    totalPayable: baseAmount + totalTax
  };
}
function calculateTDS(baseAmount, tdsPercentage) {
  if (tdsPercentage <= 0) return 0;
  return baseAmount * (tdsPercentage / 100);
}

// src/india/constants.ts
var INDIAN_LANGUAGES = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "hi", name: "Hindi", nativeName: "\u0939\u093F\u0928\u094D\u0926\u0940" },
  { code: "bn", name: "Bengali", nativeName: "\u09AC\u09BE\u0982\u09B2\u09BE" },
  { code: "te", name: "Telugu", nativeName: "\u0C24\u0C46\u0C32\u0C41\u0C17\u0C41" },
  { code: "mr", name: "Marathi", nativeName: "\u092E\u0930\u093E\u0920\u0940" },
  { code: "ta", name: "Tamil", nativeName: "\u0BA4\u0BAE\u0BBF\u0BB4\u0BCD" },
  { code: "gu", name: "Gujarati", nativeName: "\u0A97\u0AC1\u0A9C\u0AB0\u0ABE\u0AA4\u0AC0" },
  { code: "kn", name: "Kannada", nativeName: "\u0C95\u0CA8\u0CCD\u0CA8\u0CA1" },
  { code: "ml", name: "Malayalam", nativeName: "\u0D2E\u0D32\u0D2F\u0D3E\u0D33\u0D02" },
  { code: "pa", name: "Punjabi", nativeName: "\u0A2A\u0A70\u0A1C\u0A3E\u0A2C\u0A40" }
];
function formatLakhs(value, currencySymbol = "\u20B9") {
  const inLakhs = value / 1e5;
  return `${currencySymbol}${inLakhs.toLocaleString("en-IN", { maximumFractionDigits: 2 })}L`;
}
function formatCrores(value, currencySymbol = "\u20B9") {
  const inCrores = value / 1e7;
  return `${currencySymbol}${inCrores.toLocaleString("en-IN", { maximumFractionDigits: 2 })}Cr`;
}

// src/india/locations.ts
var INDIA_STATES = [
  { code: "AP", name: "Andhra Pradesh" },
  { code: "AR", name: "Arunachal Pradesh" },
  { code: "AS", name: "Assam" },
  { code: "BR", name: "Bihar" },
  { code: "CG", name: "Chhattisgarh" },
  { code: "GA", name: "Goa" },
  { code: "GJ", name: "Gujarat" },
  { code: "HR", name: "Haryana" },
  { code: "HP", name: "Himachal Pradesh" },
  { code: "JH", name: "Jharkhand" },
  { code: "KA", name: "Karnataka" },
  { code: "KL", name: "Kerala" },
  { code: "MP", name: "Madhya Pradesh" },
  { code: "MH", name: "Maharashtra" },
  { code: "MN", name: "Manipur" },
  { code: "ML", name: "Meghalaya" },
  { code: "MZ", name: "Mizoram" },
  { code: "NL", name: "Nagaland" },
  { code: "OD", name: "Odisha" },
  { code: "PB", name: "Punjab" },
  { code: "RJ", name: "Rajasthan" },
  { code: "SK", name: "Sikkim" },
  { code: "TN", name: "Tamil Nadu" },
  { code: "TS", name: "Telangana" },
  { code: "TR", name: "Tripura" },
  { code: "UP", name: "Uttar Pradesh" },
  { code: "UK", name: "Uttarakhand" },
  { code: "WB", name: "West Bengal" },
  // Union Territories
  { code: "AN", name: "Andaman & Nicobar Islands" },
  { code: "CH", name: "Chandigarh" },
  { code: "DN", name: "Dadra & Nagar Haveli and Daman & Diu" },
  { code: "DL", name: "Delhi" },
  { code: "JK", name: "Jammu & Kashmir" },
  { code: "LA", name: "Ladakh" },
  { code: "LD", name: "Lakshadweep" },
  { code: "PY", name: "Puducherry" }
];
var INDIA_CITIES = [
  // Maharashtra
  { name: "Mumbai", stateCode: "MH" },
  { name: "Pune", stateCode: "MH" },
  { name: "Nagpur", stateCode: "MH" },
  { name: "Nashik", stateCode: "MH" },
  { name: "Aurangabad", stateCode: "MH" },
  { name: "Solapur", stateCode: "MH" },
  { name: "Kolhapur", stateCode: "MH" },
  { name: "Thane", stateCode: "MH" },
  // Karnataka
  { name: "Bengaluru", stateCode: "KA" },
  { name: "Mysuru", stateCode: "KA" },
  { name: "Hubballi", stateCode: "KA" },
  { name: "Mangaluru", stateCode: "KA" },
  { name: "Belagavi", stateCode: "KA" },
  // Gujarat
  { name: "Ahmedabad", stateCode: "GJ" },
  { name: "Surat", stateCode: "GJ" },
  { name: "Vadodara", stateCode: "GJ" },
  { name: "Rajkot", stateCode: "GJ" },
  { name: "Bhavnagar", stateCode: "GJ" },
  { name: "Jamnagar", stateCode: "GJ" },
  // Tamil Nadu
  { name: "Chennai", stateCode: "TN" },
  { name: "Coimbatore", stateCode: "TN" },
  { name: "Madurai", stateCode: "TN" },
  { name: "Tiruchirappalli", stateCode: "TN" },
  { name: "Salem", stateCode: "TN" },
  { name: "Erode", stateCode: "TN" },
  // Telangana
  { name: "Hyderabad", stateCode: "TS" },
  { name: "Warangal", stateCode: "TS" },
  { name: "Karimnagar", stateCode: "TS" },
  // Andhra Pradesh
  { name: "Visakhapatnam", stateCode: "AP" },
  { name: "Vijayawada", stateCode: "AP" },
  { name: "Guntur", stateCode: "AP" },
  { name: "Nellore", stateCode: "AP" },
  // Uttar Pradesh
  { name: "Lucknow", stateCode: "UP" },
  { name: "Kanpur", stateCode: "UP" },
  { name: "Agra", stateCode: "UP" },
  { name: "Varanasi", stateCode: "UP" },
  { name: "Meerut", stateCode: "UP" },
  { name: "Allahabad", stateCode: "UP" },
  { name: "Gorakhpur", stateCode: "UP" },
  { name: "Noida", stateCode: "UP" },
  { name: "Greater Noida", stateCode: "UP" },
  { name: "Ghaziabad", stateCode: "UP" },
  // Rajasthan
  { name: "Jaipur", stateCode: "RJ" },
  { name: "Jodhpur", stateCode: "RJ" },
  { name: "Udaipur", stateCode: "RJ" },
  { name: "Kota", stateCode: "RJ" },
  { name: "Bikaner", stateCode: "RJ" },
  // Punjab
  { name: "Ludhiana", stateCode: "PB" },
  { name: "Amritsar", stateCode: "PB" },
  { name: "Jalandhar", stateCode: "PB" },
  { name: "Patiala", stateCode: "PB" },
  // Haryana
  { name: "Gurugram", stateCode: "HR" },
  { name: "Faridabad", stateCode: "HR" },
  { name: "Panipat", stateCode: "HR" },
  { name: "Ambala", stateCode: "HR" },
  // Delhi
  { name: "New Delhi", stateCode: "DL" },
  { name: "Delhi", stateCode: "DL" },
  // Bihar
  { name: "Patna", stateCode: "BR" },
  { name: "Gaya", stateCode: "BR" },
  { name: "Muzaffarpur", stateCode: "BR" },
  // West Bengal
  { name: "Kolkata", stateCode: "WB" },
  { name: "Howrah", stateCode: "WB" },
  { name: "Siliguri", stateCode: "WB" },
  { name: "Durgapur", stateCode: "WB" },
  // Kerala
  { name: "Thiruvananthapuram", stateCode: "KL" },
  { name: "Kochi", stateCode: "KL" },
  { name: "Kozhikode", stateCode: "KL" },
  { name: "Thrissur", stateCode: "KL" },
  // Madhya Pradesh
  { name: "Bhopal", stateCode: "MP" },
  { name: "Indore", stateCode: "MP" },
  { name: "Jabalpur", stateCode: "MP" },
  { name: "Gwalior", stateCode: "MP" },
  // Odisha
  { name: "Bhubaneswar", stateCode: "OD" },
  { name: "Cuttack", stateCode: "OD" },
  // Assam
  { name: "Guwahati", stateCode: "AS" },
  // Jharkhand
  { name: "Ranchi", stateCode: "JH" },
  { name: "Jamshedpur", stateCode: "JH" },
  // Himachal Pradesh
  { name: "Shimla", stateCode: "HP" },
  { name: "Manali", stateCode: "HP" },
  // Chhattisgarh
  { name: "Raipur", stateCode: "CG" },
  // Goa
  { name: "Panaji", stateCode: "GA" },
  { name: "Margao", stateCode: "GA" },
  // Uttarakhand
  { name: "Dehradun", stateCode: "UK" },
  { name: "Haridwar", stateCode: "UK" },
  // Jammu & Kashmir
  { name: "Srinagar", stateCode: "JK" },
  { name: "Jammu", stateCode: "JK" },
  // Chandigarh
  { name: "Chandigarh", stateCode: "CH" },
  // Puducherry
  { name: "Puducherry", stateCode: "PY" }
];
var METRO_CITIES = /* @__PURE__ */ new Set([
  "Delhi",
  "New Delhi",
  "Mumbai",
  "Bengaluru",
  "Chennai",
  "Hyderabad",
  "Kolkata",
  "Pune",
  "Ahmedabad"
]);
function getCitiesForState(stateCode) {
  if (!stateCode) return [];
  return INDIA_CITIES.filter((c) => c.stateCode === stateCode).sort((a, b) => a.name.localeCompare(b.name));
}
function getStateOptions(placeholder = "Select State") {
  return [
    { value: "", label: placeholder },
    ...INDIA_STATES.map((s) => ({ value: s.code, label: s.name }))
  ];
}
function getCityOptions(stateCode, placeholder = "Select City") {
  return [
    { value: "", label: placeholder },
    ...getCitiesForState(stateCode).map((c) => ({ value: c.name, label: c.name }))
  ];
}
function isMetroCity(cityName) {
  return METRO_CITIES.has(cityName.trim());
}

// src/india/whatsapp.ts
function formatPhoneForWhatsApp(phone, defaultCountryCode = "91") {
  if (!phone) return "";
  const digits = cleanPhoneNumber(phone);
  if (!digits) return "";
  if (digits.length === 10) {
    return `${defaultCountryCode}${digits}`;
  }
  return digits;
}
function generateWhatsAppUrl(phone, message, defaultCountryCode = "91") {
  const cleanPhone = phone ? formatPhoneForWhatsApp(phone, defaultCountryCode) : "";
  const encodedText = message ? encodeURIComponent(message) : "";
  if (cleanPhone && encodedText) {
    return `https://wa.me/${cleanPhone}?text=${encodedText}`;
  }
  if (cleanPhone) {
    return `https://wa.me/${cleanPhone}`;
  }
  if (encodedText) {
    return `https://wa.me/?text=${encodedText}`;
  }
  return "https://wa.me/";
}
function generateWhatsAppAppUrl(phone, message, defaultCountryCode = "91") {
  const cleanPhone = phone ? formatPhoneForWhatsApp(phone, defaultCountryCode) : "";
  const encodedText = message ? encodeURIComponent(message) : "";
  const params = [];
  if (cleanPhone) params.push(`phone=${cleanPhone}`);
  if (encodedText) params.push(`text=${encodedText}`);
  return params.length > 0 ? `whatsapp://send?${params.join("&")}` : "whatsapp://send";
}
function openWhatsApp(phone, message, defaultCountryCode = "91") {
  const url = generateWhatsAppUrl(phone, message, defaultCountryCode);
  if (typeof window !== "undefined") {
    window.open(url, "_blank", "noopener,noreferrer");
  }
}
function formatWhatsAppTemplate(template, variables) {
  const map = new Map(Object.entries(variables));
  return template.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, key) => {
    const val = map.get(key);
    return val !== void 0 && val !== null ? String(val) : "";
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  INDIAN_LANGUAGES,
  INDIA_CITIES,
  INDIA_STATES,
  REGEX_BANK_ACCOUNT_IN,
  REGEX_FSSAI,
  REGEX_GSTIN,
  REGEX_IFSC,
  REGEX_PAN,
  REGEX_PHONE_IN,
  REGEX_PINCODE,
  VALIDATION_MESSAGES_IN,
  VALIDATION_MESSAGES_IN_HI,
  calculateGSTSplit,
  calculateTDS,
  cleanPhoneNumber,
  formatCrores,
  formatLakhs,
  formatPhoneForWhatsApp,
  formatWhatsAppTemplate,
  generateWhatsAppAppUrl,
  generateWhatsAppUrl,
  getCitiesForState,
  getCityOptions,
  getStateOptions,
  isMetroCity,
  openWhatsApp,
  validateBankAccountIN,
  validateFSSAI,
  validateGSTIN,
  validateIFSC,
  validatePAN,
  validatePhoneIN,
  validatePincode
});
//# sourceMappingURL=index.cjs.map