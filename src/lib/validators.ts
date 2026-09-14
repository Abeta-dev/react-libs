/**
 * @file validators.ts — Universal field validation patterns & helpers.
 *
 * All regex constants are exported so consuming apps can use them in
 * custom form libraries (react-hook-form, zod, yup) or plain validation
 * functions. Each constant is paired with a descriptive error message.
 */

export type ValidationLanguage = 'en' | 'hi';

// ─── Regex Patterns ──────────────────────────────────────────────────────────

/** Standard email address (RFC 5322 compatible, safe from ReDoS backtracking) */
export const REGEX_EMAIL = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

/** International phone number (E.164 compatible: optional +, 7 to 15 digits) */
export const REGEX_PHONE = /^\+?[1-9]\d{6,14}$/;

/** Universal postal / ZIP code (3 to 10 alphanumeric characters with optional hyphens/spaces) */
export const REGEX_POSTAL_CODE = /^[A-Za-z0-9\s-]{3,10}$/;

/** Generic tax identification number (EIN, VAT, ABN, etc.: 6 to 20 alphanumeric characters) */
export const REGEX_TAX_ID = /^[A-Za-z0-9\s-]{6,20}$/;

/** International Bank Account / IBAN number (6 to 34 alphanumeric characters) */
export const REGEX_BANK_ACCOUNT = /^[A-Za-z0-9]{6,34}$/;

/** Bank routing transit code / SWIFT / BIC (4 to 11 alphanumeric characters) */
export const REGEX_ROUTING_CODE = /^[A-Za-z0-9]{4,11}$/;

/** Web URL (http or https) */
export const REGEX_URL = /^https?:\/\/[^\s/$.?#].[^\s]*$/i;

// ─── Error Messages ───────────────────────────────────────────────────────────

export const VALIDATION_MESSAGES = {
  email: "Enter a valid email address",
  phone: "Enter a valid international phone number",
  postalCode: "Enter a valid postal or ZIP code",
  taxId: "Enter a valid tax identification number",
  bankAccount: "Enter a valid bank account or IBAN number",
  routingCode: "Enter a valid routing code or SWIFT/BIC",
  url: "Enter a valid URL (e.g. https://example.com)",
} as const;

export const VALIDATION_MESSAGES_HI = {
  email: "कृपया एक वैध ईमेल पता दर्ज करें (उदा. user@example.com)",
  phone: "कृपया एक वैध अंतर्राष्ट्रीय फ़ोन नंबर दर्ज करें",
  postalCode: "कृपया एक वैध पिन या पोस्टल कोड दर्ज करें",
  taxId: "कृपया एक वैध कर पहचान संख्या (Tax ID) दर्ज करें",
  bankAccount: "कृपया एक वैध बैंक खाता या IBAN संख्या दर्ज करें",
  routingCode: "कृपया एक वैध रूटिंग कोड या SWIFT/BIC दर्ज करें",
  url: "कृपया एक वैध URL दर्ज करें (उदा. https://example.com)",
} as const;

// ─── Normalizers & Quick Boolean Checkers ────────────────────────────────────

/**
 * Extracts digits from a phone string and normalizes Indian mobile numbers.
 * Handles '+91', leading '0', spaces, hyphens, and brackets.
 */
export function cleanPhoneNumber(phone: string): string {
  if (!phone || typeof phone !== 'string') return '';
  let digits = phone.replace(/\D/g, '');

  if (digits.length === 12 && digits.startsWith('91')) {
    digits = digits.slice(2);
  }
  if (digits.length === 11 && digits.startsWith('0')) {
    digits = digits.slice(1);
  }

  return digits;
}

/**
 * Fast RFC-5322 regex check for email.
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  const trimmed = email.trim();
  if (trimmed.length < 5 || trimmed.length > 254) return false;
  return REGEX_EMAIL.test(trimmed);
}

/**
 * Fast boolean phone check. Supports 'IN' (10 digits starting 6-9) or 'INTL' (7-15 digits).
 */
export function isValidPhone(phone: string, mode: 'IN' | 'INTL' = 'INTL'): boolean {
  const cleaned = cleanPhoneNumber(phone);
  if (!cleaned) return false;
  if (mode === 'IN') {
    return cleaned.length === 10 && /^[6-9]\d{9}$/.test(cleaned);
  }
  return cleaned.length >= 7 && cleaned.length <= 15;
}

// ─── Validator Functions ──────────────────────────────────────────────────────

export interface ValidationOptions {
  language?: ValidationLanguage;
}

/** Returns undefined if valid, or an error string if invalid. */

export function validateEmail(value: string, options: ValidationOptions = {}): string | undefined {
  const v = value.trim();
  const lang = options.language ?? 'en';
  if (!v) return lang === 'hi' ? 'ईमेल पता आवश्यक है' : 'Email address is required';
  if (!REGEX_EMAIL.test(v)) {
    return lang === 'hi' ? VALIDATION_MESSAGES_HI.email : VALIDATION_MESSAGES.email;
  }
}

export function validatePhone(value: string, options: ValidationOptions = {}): string | undefined {
  const v = value.trim().replace(/[\s()-]/g, "");
  const lang = options.language ?? 'en';
  if (!v) return lang === 'hi' ? 'फ़ोन नंबर आवश्यक है' : 'Phone number is required';
  if (!REGEX_PHONE.test(v)) {
    return lang === 'hi' ? VALIDATION_MESSAGES_HI.phone : VALIDATION_MESSAGES.phone;
  }
}

export function validatePostalCode(value: string, options: ValidationOptions = {}): string | undefined {
  const v = value.trim();
  const lang = options.language ?? 'en';
  if (!v) return lang === 'hi' ? 'पोस्टल कोड आवश्यक है' : 'Postal code is required';
  if (!REGEX_POSTAL_CODE.test(v)) {
    return lang === 'hi' ? VALIDATION_MESSAGES_HI.postalCode : VALIDATION_MESSAGES.postalCode;
  }
}

export function validateTaxId(value: string, options: ValidationOptions = {}): string | undefined {
  const v = value.trim();
  const lang = options.language ?? 'en';
  if (!v) return lang === 'hi' ? 'टैक्स आईडी आवश्यक है' : 'Tax ID is required';
  if (!REGEX_TAX_ID.test(v)) {
    return lang === 'hi' ? VALIDATION_MESSAGES_HI.taxId : VALIDATION_MESSAGES.taxId;
  }
}

export function validateBankAccount(value: string, options: ValidationOptions = {}): string | undefined {
  const v = value.trim().replace(/\s/g, "");
  const lang = options.language ?? 'en';
  if (!v) return lang === 'hi' ? 'बैंक खाता संख्या आवश्यक है' : 'Bank account number is required';
  if (!REGEX_BANK_ACCOUNT.test(v)) {
    return lang === 'hi' ? VALIDATION_MESSAGES_HI.bankAccount : VALIDATION_MESSAGES.bankAccount;
  }
}

export function validateRoutingCode(value: string, options: ValidationOptions = {}): string | undefined {
  const v = value.trim();
  const lang = options.language ?? 'en';
  if (!v) return lang === 'hi' ? 'रूटिंग कोड आवश्यक है' : 'Routing code is required';
  if (!REGEX_ROUTING_CODE.test(v)) {
    return lang === 'hi' ? VALIDATION_MESSAGES_HI.routingCode : VALIDATION_MESSAGES.routingCode;
  }
}

export function validateUrl(value: string, options: ValidationOptions = {}): string | undefined {
  const v = value.trim();
  const lang = options.language ?? 'en';
  if (!v) return lang === 'hi' ? 'URL आवश्यक है' : 'URL is required';
  if (!REGEX_URL.test(v)) {
    return lang === 'hi' ? VALIDATION_MESSAGES_HI.url : VALIDATION_MESSAGES.url;
  }
}

// ─── Extended Structural Form Validators ─────────────────────────────────────

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validates passwords for account authentication and creation.
 */
export function validatePassword(
  password: string,
  options: { minLength?: number; language?: ValidationLanguage } = {}
): ValidationResult & { strength: 'weak' | 'medium' | 'strong' } {
  const { minLength = 8, language = 'en' } = options;
  const pass = password || '';

  if (pass.length < minLength) {
    return {
      isValid: false,
      error: language === 'hi'
        ? `पासवर्ड कम से कम ${minLength} अक्षरों का होना चाहिए।`
        : `Password must be at least ${minLength} characters long.`,
      strength: 'weak'
    };
  }

  const hasLetters = /[a-zA-Z]/.test(pass);
  const hasNumbers = /\d/.test(pass);
  const hasSpecial = /[^a-zA-Z0-9]/.test(pass);

  if (!hasLetters || !hasNumbers) {
    return {
      isValid: false,
      error: language === 'hi'
        ? 'पासवर्ड में कम से कम एक अक्षर और एक अंक होना चाहिए।'
        : 'Password must contain at least one letter and one number.',
      strength: 'weak'
    };
  }

  let strength: 'weak' | 'medium' | 'strong' = 'weak';
  if (pass.length >= 10 && hasSpecial) {
    strength = 'strong';
  } else if (pass.length >= 8 && hasLetters && hasNumbers) {
    strength = 'medium';
  }
  return { isValid: true, strength };
}

/**
 * Validates a required text field with minimum and maximum length bounds.
 */
export function validateRequired(
  value: string | null | undefined,
  fieldName: string,
  minLength = 1,
  maxLength?: number,
  options: { language?: ValidationLanguage } = {}
): ValidationResult & { value: string } {
  const { language = 'en' } = options;
  const trimmed = (value || '').trim();

  if (!trimmed || trimmed.length < minLength) {
    let errorMsg = `${fieldName} is required.`;
    if (minLength > 1) {
      errorMsg = language === 'hi'
        ? `${fieldName} कम से कम ${minLength} अक्षरों का होना चाहिए।`
        : `${fieldName} must be at least ${minLength} characters long.`;
    } else if (language === 'hi') {
      errorMsg = `${fieldName} आवश्यक है।`;
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
      error: language === 'hi'
        ? `${fieldName} ${maxLength} अक्षरों से अधिक नहीं हो सकता।`
        : `${fieldName} cannot exceed ${maxLength} characters.`,
      value: trimmed
    };
  }

  return { isValid: true, value: trimmed };
}

function checkZeroBound(
  num: number,
  fieldName: string,
  allowZero: boolean,
  language: ValidationLanguage
): string | null {
  if (allowZero) {
    if (num < 0) {
      return language === 'hi' ? `${fieldName} 0 या उससे अधिक होना चाहिए।` : `${fieldName} must be 0 or greater.`;
    }
    return null;
  }
  if (num <= 0) {
    return language === 'hi' ? `${fieldName} 0 से अधिक होना चाहिए।` : `${fieldName} must be greater than 0.`;
  }
  return null;
}

function checkMinMaxBound(
  num: number,
  fieldName: string,
  min?: number,
  max?: number,
  language: ValidationLanguage = 'en'
): string | null {
  if (min !== undefined && num < min) {
    return language === 'hi' ? `${fieldName} कम से कम ${min} होना चाहिए।` : `${fieldName} must be at least ${min}.`;
  }
  if (max !== undefined && num > max) {
    return language === 'hi' ? `${fieldName} ${max} से अधिक नहीं हो सकता।` : `${fieldName} cannot exceed ${max}.`;
  }
  return null;
}

function checkNumberBounds(
  num: number,
  fieldName: string,
  options: { allowZero?: boolean; min?: number; max?: number; language?: ValidationLanguage }
): string | null {
  const { allowZero = false, min, max, language = 'en' } = options;
  const zeroErr = checkZeroBound(num, fieldName, allowZero, language);
  if (zeroErr) return zeroErr;
  return checkMinMaxBound(num, fieldName, min, max, language);
}

/**
 * Validates a positive numeric value (e.g., fee amount, capacity, price).
 */
export function validatePositiveNumber(
  value: number | string,
  fieldName: string,
  options: { allowZero?: boolean; min?: number; max?: number; language?: ValidationLanguage } = {}
): ValidationResult & { numberValue: number } {
  const { language = 'en' } = options;
  const num = typeof value === 'number' ? value : parseFloat(String(value));

  if (Number.isNaN(num)) {
    return {
      isValid: false,
      error: language === 'hi' ? `${fieldName} एक वैध संख्या होनी चाहिए।` : `${fieldName} must be a valid number.`,
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

/**
 * Validates that a date range is chronological (startDate <= endDate).
 */
export function validateDateRange(
  startDate: string,
  endDate: string,
  options: { language?: ValidationLanguage } = {}
): ValidationResult {
  const { language = 'en' } = options;
  if (!startDate) {
    return { isValid: false, error: language === 'hi' ? 'प्रारंभ तिथि आवश्यक है।' : 'Start date is required.' };
  }
  if (!endDate) {
    return { isValid: false, error: language === 'hi' ? 'समाप्ति तिथि आवश्यक है।' : 'End date is required.' };
  }
  if (startDate > endDate) {
    return {
      isValid: false,
      error: language === 'hi' ? 'समाप्ति तिथि प्रारंभ तिथि के बाद या बराबर होनी चाहिए।' : 'End date must be on or after the start date.'
    };
  }
  return { isValid: true };
}

/**
 * Validates that a time range is chronological (startTime < endTime).
 */
export function validateTimeRange(
  startTime: string,
  endTime: string,
  options: { language?: ValidationLanguage } = {}
): ValidationResult {
  const { language = 'en' } = options;
  if (!startTime) {
    return { isValid: false, error: language === 'hi' ? 'प्रारंभ समय आवश्यक है।' : 'Start time is required.' };
  }
  if (!endTime) {
    return { isValid: false, error: language === 'hi' ? 'समाप्ति समय आवश्यक है।' : 'End time is required.' };
  }
  if (startTime >= endTime) {
    return {
      isValid: false,
      error: language === 'hi' ? 'समाप्ति समय प्रारंभ समय के बाद होना चाहिए।' : 'End time must be chronologically after the start time.'
    };
  }
  return { isValid: true };
}


