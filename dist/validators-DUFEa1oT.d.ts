/**
 * @file validators.ts — Universal field validation patterns & helpers.
 *
 * All regex constants are exported so consuming apps can use them in
 * custom form libraries (react-hook-form, zod, yup) or plain validation
 * functions. Each constant is paired with a descriptive error message.
 */
type ValidationLanguage = 'en' | 'hi';
/** Standard email address (RFC 5322 compatible, safe from ReDoS backtracking) */
declare const REGEX_EMAIL: RegExp;
/** International phone number (E.164 compatible: optional +, 7 to 15 digits) */
declare const REGEX_PHONE: RegExp;
/** Universal postal / ZIP code (3 to 10 alphanumeric characters with optional hyphens/spaces) */
declare const REGEX_POSTAL_CODE: RegExp;
/** Generic tax identification number (EIN, VAT, ABN, etc.: 6 to 20 alphanumeric characters) */
declare const REGEX_TAX_ID: RegExp;
/** International Bank Account / IBAN number (6 to 34 alphanumeric characters) */
declare const REGEX_BANK_ACCOUNT: RegExp;
/** Bank routing transit code / SWIFT / BIC (4 to 11 alphanumeric characters) */
declare const REGEX_ROUTING_CODE: RegExp;
/** Web URL (http or https) */
declare const REGEX_URL: RegExp;
declare const VALIDATION_MESSAGES: {
    readonly email: "Enter a valid email address";
    readonly phone: "Enter a valid international phone number";
    readonly postalCode: "Enter a valid postal or ZIP code";
    readonly taxId: "Enter a valid tax identification number";
    readonly bankAccount: "Enter a valid bank account or IBAN number";
    readonly routingCode: "Enter a valid routing code or SWIFT/BIC";
    readonly url: "Enter a valid URL (e.g. https://example.com)";
};
declare const VALIDATION_MESSAGES_HI: {
    readonly email: "कृपया एक वैध ईमेल पता दर्ज करें (उदा. user@example.com)";
    readonly phone: "कृपया एक वैध अंतर्राष्ट्रीय फ़ोन नंबर दर्ज करें";
    readonly postalCode: "कृपया एक वैध पिन या पोस्टल कोड दर्ज करें";
    readonly taxId: "कृपया एक वैध कर पहचान संख्या (Tax ID) दर्ज करें";
    readonly bankAccount: "कृपया एक वैध बैंक खाता या IBAN संख्या दर्ज करें";
    readonly routingCode: "कृपया एक वैध रूटिंग कोड या SWIFT/BIC दर्ज करें";
    readonly url: "कृपया एक वैध URL दर्ज करें (उदा. https://example.com)";
};
/**
 * Extracts digits from a phone string and normalizes Indian mobile numbers.
 * Handles '+91', leading '0', spaces, hyphens, and brackets.
 */
declare function cleanPhoneNumber(phone: string): string;
/**
 * Fast RFC-5322 regex check for email.
 */
declare function isValidEmail(email: string): boolean;
/**
 * Fast boolean phone check. Supports 'IN' (10 digits starting 6-9) or 'INTL' (7-15 digits).
 */
declare function isValidPhone(phone: string, mode?: 'IN' | 'INTL'): boolean;
interface ValidationOptions {
    language?: ValidationLanguage;
}
/** Returns undefined if valid, or an error string if invalid. */
declare function validateEmail(value: string, options?: ValidationOptions): string | undefined;
declare function validatePhone(value: string, options?: ValidationOptions): string | undefined;
declare function validatePostalCode(value: string, options?: ValidationOptions): string | undefined;
declare function validateTaxId(value: string, options?: ValidationOptions): string | undefined;
declare function validateBankAccount(value: string, options?: ValidationOptions): string | undefined;
declare function validateRoutingCode(value: string, options?: ValidationOptions): string | undefined;
declare function validateUrl(value: string, options?: ValidationOptions): string | undefined;
interface ValidationResult {
    isValid: boolean;
    error?: string;
}
/**
 * Validates passwords for account authentication and creation.
 */
declare function validatePassword(password: string, options?: {
    minLength?: number;
    language?: ValidationLanguage;
}): ValidationResult & {
    strength: 'weak' | 'medium' | 'strong';
};
/**
 * Validates a required text field with minimum and maximum length bounds.
 */
declare function validateRequired(value: string | null | undefined, fieldName: string, minLength?: number, maxLength?: number, options?: {
    language?: ValidationLanguage;
}): ValidationResult & {
    value: string;
};
/**
 * Validates a positive numeric value (e.g., fee amount, capacity, price).
 */
declare function validatePositiveNumber(value: number | string, fieldName: string, options?: {
    allowZero?: boolean;
    min?: number;
    max?: number;
    language?: ValidationLanguage;
}): ValidationResult & {
    numberValue: number;
};
/**
 * Validates that a date range is chronological (startDate <= endDate).
 */
declare function validateDateRange(startDate: string, endDate: string, options?: {
    language?: ValidationLanguage;
}): ValidationResult;
/**
 * Validates that a time range is chronological (startTime < endTime).
 */
declare function validateTimeRange(startTime: string, endTime: string, options?: {
    language?: ValidationLanguage;
}): ValidationResult;

export { REGEX_BANK_ACCOUNT as R, type ValidationLanguage as V, REGEX_EMAIL as a, REGEX_PHONE as b, cleanPhoneNumber as c, REGEX_POSTAL_CODE as d, REGEX_ROUTING_CODE as e, REGEX_TAX_ID as f, REGEX_URL as g, VALIDATION_MESSAGES as h, VALIDATION_MESSAGES_HI as i, type ValidationOptions as j, type ValidationResult as k, isValidEmail as l, isValidPhone as m, validateDateRange as n, validateEmail as o, validatePassword as p, validatePhone as q, validatePositiveNumber as r, validatePostalCode as s, validateRequired as t, validateRoutingCode as u, validateBankAccount as v, validateTaxId as w, validateTimeRange as x, validateUrl as y };
