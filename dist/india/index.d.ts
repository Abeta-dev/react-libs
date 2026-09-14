import { V as ValidationLanguage } from '../validators-DUFEa1oT.js';
export { c as cleanPhoneNumber } from '../validators-DUFEa1oT.js';

/**
 * @file validators.ts — India statutory validation patterns & helpers.
 *
 * Provides regex constants and validator functions for Indian business identifiers
 * including GSTIN, PAN, IFSC, Mobile numbers, FSSAI, and PIN codes.
 */

declare const REGEX_GSTIN: RegExp;
declare const REGEX_PAN: RegExp;
declare const REGEX_PHONE_IN: RegExp;
declare const REGEX_IFSC: RegExp;
declare const REGEX_BANK_ACCOUNT_IN: RegExp;
declare const REGEX_FSSAI: RegExp;
declare const REGEX_PINCODE: RegExp;
declare const VALIDATION_MESSAGES_IN: {
    readonly gstin: "Enter a valid 15-character GSTIN (e.g. 27AADCA1234D1Z5)";
    readonly pan: "Enter a valid 10-character PAN (e.g. AADCA1234D)";
    readonly phone: "Enter a valid 10-digit Indian mobile number";
    readonly ifsc: "Enter a valid IFSC code (e.g. HDFC0001234)";
    readonly bankAccount: "Account number must be 9–18 digits";
    readonly fssai: "FSSAI license must be exactly 14 digits";
    readonly pincode: "Enter a valid 6-digit pincode";
};
declare const VALIDATION_MESSAGES_IN_HI: {
    readonly gstin: "कृपया एक वैध 15-अक्षरों का GSTIN दर्ज करें (उदा. 27AADCA1234D1Z5)";
    readonly pan: "कृपया एक वैध 10-अक्षरों का PAN दर्ज करें (उदा. AADCA1234D)";
    readonly phone: "भारतीय मोबाइल नंबर 10 अंकों का और 6, 7, 8 या 9 से शुरू होना चाहिए";
    readonly ifsc: "कृपया एक वैध IFSC कोड दर्ज करें (उदा. HDFC0001234)";
    readonly bankAccount: "बैंक खाता संख्या 9 से 18 अंकों की होनी चाहिए";
    readonly fssai: "FSSAI लाइसेंस संख्या ठीक 14 अंकों की होनी चाहिए";
    readonly pincode: "कृपया एक वैध 6-अंकों का पिनकोड दर्ज करें";
};
interface IndiaValidationOptions {
    language?: ValidationLanguage;
}
declare function validateGSTIN(value: string, options?: IndiaValidationOptions): string | undefined;
declare function validatePAN(value: string, options?: IndiaValidationOptions): string | undefined;
declare function validatePhoneIN(value: string, options?: IndiaValidationOptions): string | undefined;
declare function validateIFSC(value: string, options?: IndiaValidationOptions): string | undefined;
declare function validateBankAccountIN(value: string, options?: IndiaValidationOptions): string | undefined;
declare function validateFSSAI(value: string, options?: IndiaValidationOptions): string | undefined;
declare function validatePincode(value: string, options?: IndiaValidationOptions): string | undefined;

/**
 * @file tax.ts — India GST and statutory deduction calculation utilities.
 */
interface GSTCalculationResult {
    baseAmount: number;
    totalTax: number;
    cgstAmount: number;
    sgstAmount: number;
    igstAmount: number;
    totalPayable: number;
}
/**
 * Calculates GST components based on rate, tax inclusivity, and intra vs inter-state trade.
 *
 * @param amount - Base cost (or tax-inclusive price)
 * @param taxRate - GST rate percentage (e.g. 18 for 18%)
 * @param isIntraState - True if intra-state (split CGST 50% / SGST 50%), false for inter-state (100% IGST)
 * @param isTaxInclusive - True if the provided amount already includes GST
 */
declare function calculateGSTSplit(amount: number, taxRate?: number, isIntraState?: boolean, isTaxInclusive?: boolean): GSTCalculationResult;
/**
 * Calculates Tax Deducted at Source (TDS) on base amount.
 */
declare function calculateTDS(baseAmount: number, tdsPercentage: number): number;

/**
 * @file constants.ts — India regional presets, scheduled languages, and financial helpers.
 */
interface IndianLanguageOption {
    code: string;
    name: string;
    nativeName: string;
}
/**
 * Standard Indian scheduled languages supported in multi-lingual enterprise UIs.
 */
declare const INDIAN_LANGUAGES: IndianLanguageOption[];
/**
 * Common Indian currency formatting units.
 */
declare function formatLakhs(value: number, currencySymbol?: string): string;
declare function formatCrores(value: number, currencySymbol?: string): string;

/**
 * @file locations.ts — India states, union territories, commercial cities, and selector helpers.
 *
 * Preserves battle-tested regional datasets for Indian enterprise applications.
 */
interface RegionState {
    code: string;
    name: string;
}
interface RegionCity {
    name: string;
    stateCode: string;
}
interface RegionOption {
    value: string;
    label: string;
}
type IndiaState = RegionState;
type IndiaCity = RegionCity;
/**
 * Reference dataset of Indian states and Union Territories (ISO 3166-2:IN).
 */
declare const INDIA_STATES: IndiaState[];
/**
 * Reference dataset of major commercial and industrial cities in India.
 */
declare const INDIA_CITIES: IndiaCity[];
/**
 * Filters cities by parent state/UT code, sorted alphabetically.
 */
declare function getCitiesForState(stateCode: string): IndiaCity[];
/**
 * Returns FilterSelect-compatible option objects for all Indian states.
 */
declare function getStateOptions(placeholder?: string): RegionOption[];
/**
 * Returns FilterSelect-compatible option objects for cities in a given state.
 */
declare function getCityOptions(stateCode: string, placeholder?: string): RegionOption[];
/**
 * Checks if a city is designated as a major Indian metro city.
 */
declare function isMetroCity(cityName: string): boolean;

/**
 * @file whatsapp.ts — WhatsApp Client Communication & Deep-Linking Utilities.
 * Enables 1-tap direct WhatsApp communication via wa.me and native app protocols
 * without requiring expensive third-party messaging gateway quotas.
 */
/**
 * Normalizes any phone number into an international format ready for WhatsApp.
 * Default country prefix is 91 (India) if a 10-digit number is provided.
 */
declare function formatPhoneForWhatsApp(phone: string, defaultCountryCode?: string): string;
/**
 * Generates an HTTPS web click-to-chat URL: https://wa.me/<phone>?text=<encoded>
 */
declare function generateWhatsAppUrl(phone?: string, message?: string, defaultCountryCode?: string): string;
/**
 * Generates a native mobile app intent URL: whatsapp://send?phone=<phone>&text=<encoded>
 */
declare function generateWhatsAppAppUrl(phone?: string, message?: string, defaultCountryCode?: string): string;
/**
 * Opens WhatsApp in a new browser tab or launches the native app on supported devices.
 */
declare function openWhatsApp(phone?: string, message?: string, defaultCountryCode?: string): void;
/**
 * Replaces placeholders like {{name}} or {{amount}} in a WhatsApp message template string.
 */
declare function formatWhatsAppTemplate(template: string, variables: Record<string, string | number | undefined | null>): string;

export { type GSTCalculationResult, INDIAN_LANGUAGES, INDIA_CITIES, INDIA_STATES, type IndiaCity, type IndiaState, type IndiaValidationOptions, type IndianLanguageOption, REGEX_BANK_ACCOUNT_IN, REGEX_FSSAI, REGEX_GSTIN, REGEX_IFSC, REGEX_PAN, REGEX_PHONE_IN, REGEX_PINCODE, type RegionCity, type RegionOption, type RegionState, VALIDATION_MESSAGES_IN, VALIDATION_MESSAGES_IN_HI, calculateGSTSplit, calculateTDS, formatCrores, formatLakhs, formatPhoneForWhatsApp, formatWhatsAppTemplate, generateWhatsAppAppUrl, generateWhatsAppUrl, getCitiesForState, getCityOptions, getStateOptions, isMetroCity, openWhatsApp, validateBankAccountIN, validateFSSAI, validateGSTIN, validateIFSC, validatePAN, validatePhoneIN, validatePincode };
