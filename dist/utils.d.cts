import { ClassValue } from 'clsx';
export { R as REGEX_BANK_ACCOUNT, a as REGEX_EMAIL, b as REGEX_PHONE, d as REGEX_POSTAL_CODE, e as REGEX_ROUTING_CODE, f as REGEX_TAX_ID, g as REGEX_URL, h as VALIDATION_MESSAGES, i as VALIDATION_MESSAGES_HI, V as ValidationLanguage, j as ValidationOptions, k as ValidationResult, c as cleanPhoneNumber, l as isValidEmail, m as isValidPhone, v as validateBankAccount, n as validateDateRange, o as validateEmail, p as validatePassword, q as validatePhone, r as validatePositiveNumber, s as validatePostalCode, t as validateRequired, u as validateRoutingCode, w as validateTaxId, x as validateTimeRange, y as validateUrl } from './validators-DUFEa1oT.cjs';

declare function cn(...inputs: ClassValue[]): string;

/**
 * @umesh0492/react-libs — Shared Formatters
 *
 * Consistent formatting utilities for currency, dates, weights, sizes, and times.
 * Use these instead of inline `toLocaleString` or manual format strings.
 */
type NumericValue = number | string | null | undefined;
type DateValue = Date | string | null | undefined;
type AppLocale = "en-US" | "en-GB" | "en-IN" | "de-DE" | "fr-FR" | "ja-JP" | (string & {});
/**
 * Format a number as currency. Defaults to USD / en-US, fully configurable to any ISO currency and BCP-47 locale.
 * @example formatCurrency(123456.78) → "$123,456.78"
 * @example formatCurrency(123456.78, "EUR", "de-DE") → "123.456,78 €"
 * @example formatCurrency(123456.78, "GBP", "en-GB") → "£123,456.78"
 */
declare function formatCurrency(amount: NumericValue, currency?: string, locale?: string): string;
/**
 * Format a number with locale-aware grouping (no currency symbol).
 * @example formatNumber(1234567) → "1,234,567"
 */
declare function formatNumber(value: NumericValue, options?: Intl.NumberFormatOptions, locale?: string): string;
/**
 * Format a date as "DD MMM YYYY" (e.g. "27 Mar 2026").
 */
declare function formatDate(date: DateValue, options?: Intl.DateTimeFormatOptions, locale?: string): string;
/**
 * Format a date as "DD MMM YYYY, HH:MM" (e.g. "27 Mar 2026, 14:32").
 */
declare function formatDateTime(date: DateValue, locale?: string): string;
/**
 * Format a date relative to now (e.g. "2 hours ago", "in 3 days").
 * Falls back to formatDate if more than 7 days away.
 */
declare function formatRelativeTime(date: DateValue): string;
/**
 * Format a weight value with unit.
 * @example formatWeight(12.5) → "12.5 kg"
 * @example formatWeight(1200, "g") → "1,200 g"
 */
declare function formatWeight(value: NumericValue, unit?: "kg" | "g" | "mt" | "lb", locale?: string): string;
/**
 * Format a quantity with optional unit.
 * @example formatQuantity(150, "boxes") → "150 boxes"
 */
declare function formatQuantity(value: NumericValue, unit?: string, locale?: string): string;
/**
 * Format a byte count as a human-readable file size.
 * @example formatFileSize(1234567) → "1.2 MB"
 */
declare function formatFileSize(bytes: number | null | undefined): string;
/**
 * Format a ratio (0–1) or percentage (0–100) as a percentage string.
 * @example formatPercent(0.856) → "85.6%"
 * @example formatPercent(85.6, false) → "85.6%"
 */
declare function formatPercent(value: number | null | undefined, isRatio?: boolean, decimals?: number): string;
/**
 * Format a date with locale awareness.
 * @example formatLocalizedDate("2026-03-27", "fr-FR") → "27 mars 2026"
 * @example formatLocalizedDate("2026-03-27", "hi-IN") → "२७ मार्च २०२६"
 */
declare function formatLocalizedDate(date: DateValue, locale?: AppLocale): string;
/**
 * Format a date+time with locale awareness.
 */
declare function formatLocalizedDateTime(date: DateValue, locale?: AppLocale): string;
/**
 * Format a number with locale-aware grouping.
 * @example formatLocalizedNumber(1234.5, "de-DE") → "1.234,5"
 */
declare function formatLocalizedNumber(value: number | null | undefined, locale?: AppLocale): string;
/**
 * Format bytes into human-readable size string (B, KB, MB, GB).
 * @example formatBytes(1048576) → "1 MB"
 */
declare function formatBytes(bytes: number, decimals?: number): string;

type SensitiveDataType = "FINANCIAL_DATA" | "CONTRACT_DATA" | "AUDIT_DATA" | "PII_DATA";
interface MaskOptions {
    isMasked?: boolean;
    maskPattern?: string;
    dataType?: SensitiveDataType;
    formatAsCurrency?: boolean;
}
/**
 * Pure utility function to mask sensitive values (financial, personal, or contract details).
 */
declare function maskSensitiveValue(value: string | number | undefined | null, options?: MaskOptions): string;

export { type AppLocale, type DateValue, type MaskOptions, type NumericValue, type SensitiveDataType, cn, formatBytes, formatCurrency, formatDate, formatDateTime, formatFileSize, formatLocalizedDate, formatLocalizedDateTime, formatLocalizedNumber, formatNumber, formatPercent, formatQuantity, formatRelativeTime, formatWeight, maskSensitiveValue };
