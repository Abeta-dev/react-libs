import { ClassValue } from 'clsx';
import * as React$1 from 'react';
import { C as ComponentContext, A as AnalyticsAdapter, a as AnalyticsEvent } from './engine-D1fNicSV.js';
export { b as AnalyticsConfig, c as AnalyticsEngine, d as AnalyticsQueue, e as AnalyticsQueueOptions, P as PageContext, S as SessionManager, g as generateUUID, f as getAnalyticsEngine, i as initAnalytics } from './engine-D1fNicSV.js';
import * as class_variance_authority_types from 'class-variance-authority/types';
import * as ToastPrimitives from '@radix-ui/react-toast';
import { VariantProps } from 'class-variance-authority';
import * as react_jsx_runtime from 'react/jsx-runtime';
import { Button, ButtonProps } from './button.js';
export { buttonVariants } from './button.js';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as LabelPrimitive from '@radix-ui/react-label';
import * as _radix_ui_react_slot from '@radix-ui/react-slot';
import * as react_hook_form from 'react-hook-form';
import { FieldValues, FieldPath, ControllerProps } from 'react-hook-form';
import { Input } from './input.js';
import * as input_otp from 'input-otp';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import * as SelectPrimitive from '@radix-ui/react-select';
import * as SliderPrimitive from '@radix-ui/react-slider';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import * as AspectRatioPrimitive from '@radix-ui/react-aspect-ratio';
export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardSeparator, CardTitle, StandardCard, StandardCardProps } from './card.js';
import { Separator as Separator$1, Panel, Group } from 'react-resizable-panels';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
export { Badge, BadgeProps, badgeVariants } from './badge.js';
import useEmblaCarousel, { UseEmblaCarouselType } from 'embla-carousel-react';
import * as recharts from 'recharts';
import { LegendPayload, Tooltip as Tooltip$1, TooltipPayloadEntry } from 'recharts';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
export { DataTable, DataTableColumn, DataTablePaginationProps, DataTableProps, SortDirection } from './data-table.js';
import * as MenubarPrimitive from '@radix-ui/react-menubar';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { DialogProps } from '@radix-ui/react-dialog';
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';
export { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger } from './dialog.js';
import * as vaul from 'vaul';
import { Drawer as Drawer$1 } from 'vaul';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { LucideIcon, LucideProps } from 'lucide-react';
import { Toaster as Toaster$2 } from 'sonner';
import { DayPicker, DateRange } from 'react-day-picker';
import * as PopoverPrimitive from '@radix-ui/react-popover';

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

/**
 * @umesh0492/react-libs — Export Utilities
 *
 * Client-side CSV, XLSX, and PDF export from in-memory data arrays.
 * Framework-agnostic — no React dependencies.
 *
 * For large/server-side exports, use downloadFileSecurely() (or downloadFromBackend()) instead to stream
 * the file through the platform's Express proxy.
 *
 * Optional Peer Dependencies: xlsx, jspdf, jspdf-autotable
 * These packages are optional and only required when exporting to XLSX or PDF.
 */
type ExportFormat = "csv" | "xlsx" | "pdf";
interface ExportColumn {
    /** Column display header */
    header: string;
    /** Key in each data row object */
    key: string;
}
interface ExportOptions {
    columns?: ExportColumn[];
    /** PDF page orientation (default: landscape) */
    pdfOrientation?: "portrait" | "landscape";
    /** PDF title text (default: filename) */
    pdfTitle?: string;
}
/**
 * Export data from an in-memory array to CSV, XLSX, or PDF.
 *
 * @example
 * exportData(records, "records-report", "xlsx", {
 *   columns: [
 *     { header: "ID",        key: "id" },
 *     { header: "Name",      key: "name" },
 *     { header: "Amount",    key: "amount" },
 *   ]
 * })
 */
declare function exportData(data: Record<string, unknown>[], filename: string, format?: ExportFormat, options?: ExportOptions): Promise<void>;
/**
 * Download a file from the backend securely via fetch with Authorization header.
 * Framework-neutral — does not assume Vite or any specific bundler.
 *
 * @example
 * await downloadFileSecurely("/api/export/data", "data_export", { status: "active" })
 */
declare function downloadFileSecurely(endpoint: string, filename: string, queryParams?: Record<string, string>, tokenKey?: string, signal?: AbortSignal, apiBase?: string): Promise<void>;
declare function downloadFileSecurely(endpoint: string, filename: string, queryParams?: Record<string, string>, tokenKey?: string, apiBase?: string): Promise<void>;
/** Backward-compatible alias for downloadFileSecurely */
declare const downloadFromBackend: typeof downloadFileSecurely;
/** Backward-compatible shorthand */
declare function exportToCSV(data: Record<string, unknown>[], filename: string): void;

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

/**
 * @file locations.ts
 * Generic geographical region, state, and city helper utilities.
 *
 * Provides type contracts and helper utilities for building cascade state/province
 * and city/locality select controls across any country or custom geography.
 */
/**
 * Generic administrative region/state/province definition.
 */
interface RegionState {
    /** Standard region code (e.g. ISO 3166-2 division code). */
    code: string;
    /** Human-readable region name. */
    name: string;
}
/**
 * Generic city or locality subdivision definition.
 */
interface RegionCity {
    /** Locality or city name. */
    name: string;
    /** Parent state/division code. */
    stateCode: string;
}
/**
 * Option format compatible with Select, AsyncSelect, and FilterSelect components.
 */
interface RegionOption {
    value: string;
    label: string;
}
/**
 * Generic utility to filter localities/cities by parent division code, sorted alphabetically.
 */
declare function filterCitiesByState<T extends RegionCity>(cities: T[], stateCode: string): T[];
/**
 * Generic utility to convert region/state arrays into Select-compatible options.
 */
declare function toStateOptions<T extends RegionState>(states: T[], placeholder?: string): RegionOption[];
/**
 * Generic utility to convert locality/city arrays into Select-compatible options.
 */
declare function toCityOptions<T extends RegionCity>(cities: T[], placeholder?: string): RegionOption[];

/**
 * Cloud Blob Storage utilities — agnostic file storage client for web applications.
 *
 * Flow:
 *   1. After login, the app calls fetchBlobStorageConfig() once.
 *   2. fetchBlobStorageConfig() hits the backend's authenticated GET /api/config endpoint.
 *   3. The backend returns storage credentials securely from environment configuration.
 *   4. Credentials are cached in memory for the active browser session.
 *   5. uploadFileToStorage / downloadFileFromStorage use the cached config to manage files.
 */
/** Shape returned by the backend GET /api/config endpoint for storage. */
interface BlobStorageConfig {
    storageBaseUrl: string;
    storageSecretKey: string;
}
/**
 * Set the backend base URL for storage config/upload/download calls.
 * Call this once at app startup before any upload/download occurs.
 */
declare function setBlobStorageApiBase(base: string): void;
/**
 * Fetch storage config from the backend's authenticated /api/config endpoint.
 * Caches the result in memory so subsequent calls are instant.
 *
 * @param apiBase  - Override base URL (defaults to the value set via setBlobStorageApiBase)
 * @param token    - Optional JWT; falls back to localStorage "auth_jwt"
 */
declare function fetchBlobStorageConfig(apiBase?: string, token?: string): Promise<BlobStorageConfig>;
/** Call this on logout to wipe the cached secret from memory. */
declare function clearBlobStorageConfig(): void;
/** Result shape returned after a successful upload. */
interface BlobUploadResult {
    /** Publicly accessible Blob URL */
    url: string;
    /** UUID filename as stored by storage backend */
    fileName: string;
    /** Original filename provided at upload time */
    originalName: string;
}
/**
 * Upload a file to Blob Storage directly from the browser.
 *
 * The secret key is retrieved from the backend via /api/config (authenticated) and
 * cached in memory — it is never hardcoded in the frontend bundle.
 *
 * @param file       - File to upload
 * @param folderPath - Destination folder / bucket (e.g. "documents", "attachments")
 * @param apiBase    - Optional backend base URL (defaults to relative path)
 */
declare function uploadFileToStorage(file: File, folderPath: string, apiBase?: string): Promise<BlobUploadResult>;
/**
 * Download a file from Blob Storage directly in the browser.
 *
 * @param fileName    - UUID filename stored in DB
 * @param folder      - Bucket folder
 * @param displayName - Filename shown in the browser's Save As dialog
 * @param apiBase     - Optional backend base URL
 */
declare function downloadFileFromStorage(fileName: string, folder: string, displayName?: string, apiBase?: string): Promise<void>;

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

interface AuditTrailPayload {
    actionName: string;
    entityId?: string | undefined;
    entityType?: string | undefined;
    userId?: string | undefined;
    userName?: string | undefined;
    role?: string | undefined;
    timestamp?: string | undefined;
    [key: string]: unknown;
}
type AuditLogger = (payload: AuditTrailPayload) => Promise<void> | void;
declare function setGlobalAuditLogger(logger: AuditLogger | null): void;
interface WithAuditTrailProps {
    actionName: string;
    entityId?: string | undefined;
    entityType?: string | undefined;
    auditLogger?: AuditLogger | undefined;
    onClick?: ((e: React$1.MouseEvent) => void) | undefined;
    [key: string]: unknown;
}
/**
 * Higher-Order Component that wraps any clickable element to emit an audit telemetry event.
 */
declare function withAuditTrail<P extends object, Ref = unknown>(WrappedComponent: React$1.ComponentType<P>): React$1.ForwardRefExoticComponent<React$1.PropsWithoutRef<P & WithAuditTrailProps> & React$1.RefAttributes<Ref>>;

interface DomTrackerOptions {
    onInteraction: (component: ComponentContext, interactionMetadata: Record<string, unknown>) => void;
    maskPatterns?: RegExp[] | undefined;
}
declare class DomTracker {
    private onInteraction;
    private maskPatterns;
    private isListening;
    private handleClickBound;
    private handleChangeBound;
    private handleSubmitBound;
    constructor(options: DomTrackerOptions);
    start(): void;
    stop(): void;
    private isSensitiveElement;
    private findTrackableElement;
    private getElementAccessibleName;
    private collectJourneyMetadata;
    private resolveComponentContext;
    private handleClick;
    private handleChange;
    private handleSubmit;
}

interface HttpAdapterOptions {
    endpoint: string;
    headers?: Record<string, string> | undefined;
    getHeaders?: (() => Record<string, string> | Promise<Record<string, string>>) | undefined;
    credentials?: RequestCredentials | undefined;
}
declare class HttpAdapter implements AnalyticsAdapter {
    name: string;
    private endpoint;
    private headers;
    private getHeaders?;
    private credentials?;
    constructor(options: HttpAdapterOptions);
    private resolveHeaders;
    track(event: AnalyticsEvent): Promise<void>;
    trackBatch(events: AnalyticsEvent[]): Promise<void>;
}

interface ConsoleAdapterOptions {
    prefix?: string;
    logLevel?: "debug" | "info" | "log";
}
declare class ConsoleAdapter implements AnalyticsAdapter {
    name: string;
    private prefix;
    private logLevel;
    constructor(options?: ConsoleAdapterOptions);
    track(event: AnalyticsEvent): void;
    trackBatch(events: AnalyticsEvent[]): void;
    identify(userId: string, traits?: Record<string, unknown>): void;
    reset(): void;
}

interface MixpanelClient {
    track(eventName: string, properties?: Record<string, unknown>): void;
    identify(uniqueId: string): void;
    people?: {
        set(properties: Record<string, unknown>): void;
    };
    reset(): void;
}
interface MixpanelAdapterOptions {
    client?: MixpanelClient | undefined;
}
declare global {
    interface Window {
        mixpanel?: MixpanelClient;
    }
}
declare class MixpanelAdapter implements AnalyticsAdapter {
    name: string;
    private customClient?;
    constructor(options?: MixpanelAdapterOptions);
    private getClient;
    track(event: AnalyticsEvent): void;
    trackBatch(events: AnalyticsEvent[]): void;
    identify(userId: string, traits?: Record<string, unknown>): void;
    reset(): void;
}

interface GoogleAnalyticsAdapterOptions {
    measurementId?: string | undefined;
}
declare global {
    interface Window {
        gtag?: (command: string, ...args: unknown[]) => void;
        dataLayer?: unknown[][];
    }
}
declare class GoogleAnalyticsAdapter implements AnalyticsAdapter {
    name: string;
    private measurementId?;
    constructor(options?: GoogleAnalyticsAdapterOptions);
    private gtag;
    track(event: AnalyticsEvent): void;
    trackBatch(events: AnalyticsEvent[]): void;
    identify(userId: string, traits?: Record<string, unknown>): void;
    reset(): void;
}

/**
 * @file platform.ts — Cross-Platform Detection & Native PWA Device APIs.
 *
 * Provides deterministic detection for iOS, Android, Desktop, and standalone PWA modes,
 * along with safe wrappers for native device capabilities (haptics, sharing).
 */
interface PlatformInfo {
    isIOS: boolean;
    isAndroid: boolean;
    isMobile: boolean;
    isStandalone: boolean;
    platformName: 'ios' | 'android' | 'desktop';
    hasTouch: boolean;
}
type HapticType = 'light' | 'medium' | 'heavy' | 'selection' | 'success' | 'warning' | 'error';
/**
 * Detect client OS, device form factor, and running display mode.
 * Safe for Server-Side Rendering (returns desktop defaults when DOM is unavailable).
 */
declare function getPlatformInfo(): PlatformInfo;
/**
 * Triggers safe vibration feedback on supported devices.
 */
declare function triggerHaptic(type?: HapticType): void;
/**
 * Safe native Web Share API trigger with fallback.
 */
declare function nativeShare(data: {
    title: string;
    text?: string;
    url?: string;
}): Promise<boolean>;

declare function useIsMobile(): boolean;

/**
 * useDebounce — delays updating a value until after a specified delay.
 * Use for search inputs to avoid firing a request on every keystroke.
 *
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds (default: 400ms)
 *
 * @example
 * const debouncedSearch = useDebounce(searchQuery, 400)
 * useEffect(() => { fetchResults(debouncedSearch) }, [debouncedSearch])
 */
declare function useDebounce<T>(value: T, delay?: number): T;

/**
 * useLocalStorage — typed localStorage state that syncs across tabs.
 *
 * @param key - localStorage key
 * @param initialValue - default value if key doesn't exist
 *
 * @example
 * const [theme, setTheme] = useLocalStorage("theme", "light")
 */
declare function useLocalStorage<T>(key: string, initialValue: T): readonly [T, (value: T | ((prev: T) => T)) => void];

declare const ToastProvider: React$1.FC<ToastPrimitives.ToastProviderProps>;
declare const ToastViewport: React$1.ForwardRefExoticComponent<Omit<ToastPrimitives.ToastViewportProps & React$1.RefAttributes<HTMLOListElement>, "ref"> & React$1.RefAttributes<HTMLOListElement>>;
declare const Toast$1: React$1.ForwardRefExoticComponent<Omit<ToastPrimitives.ToastProps & React$1.RefAttributes<HTMLLIElement>, "ref"> & VariantProps<(props?: ({
    variant?: "info" | "success" | "warning" | "default" | "destructive" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string> & React$1.RefAttributes<HTMLLIElement>>;
declare const ToastAction: React$1.ForwardRefExoticComponent<Omit<ToastPrimitives.ToastActionProps & React$1.RefAttributes<HTMLButtonElement>, "ref"> & React$1.RefAttributes<HTMLButtonElement>>;
declare const ToastClose: React$1.ForwardRefExoticComponent<Omit<ToastPrimitives.ToastCloseProps & React$1.RefAttributes<HTMLButtonElement>, "ref"> & React$1.RefAttributes<HTMLButtonElement>>;
declare const ToastTitle: React$1.ForwardRefExoticComponent<Omit<ToastPrimitives.ToastTitleProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const ToastDescription: React$1.ForwardRefExoticComponent<Omit<ToastPrimitives.ToastDescriptionProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
type ToastProps = React$1.ComponentPropsWithoutRef<typeof Toast$1>;
type ToastActionElement = React$1.ReactElement<typeof ToastAction>;

type ToasterToast = ToastProps & {
    id: string;
    title?: React$1.ReactNode;
    description?: React$1.ReactNode;
    action?: ToastActionElement;
};
type Action = {
    type: "ADD_TOAST";
    toast: ToasterToast;
} | {
    type: "UPDATE_TOAST";
    toast: Partial<ToasterToast>;
} | {
    type: "DISMISS_TOAST";
    toastId?: ToasterToast["id"] | undefined;
} | {
    type: "REMOVE_TOAST";
    toastId?: ToasterToast["id"] | undefined;
};
interface State {
    toasts: ToasterToast[];
}
declare const reducer: (state: State, action: Action) => State;
type Toast = Omit<ToasterToast, "id">;
declare function toast({ ...props }: Toast): {
    id: string;
    dismiss: () => void;
    update: (props: ToasterToast) => void;
};
declare function useToast(): {
    toast: typeof toast;
    dismiss: (toastId?: string) => void;
    toasts: ToasterToast[];
};

declare function usePlatform(): PlatformInfo & {
    triggerHaptic: (type?: HapticType) => void;
    nativeShare: (data: {
        title: string;
        text?: string;
        url?: string;
    }) => Promise<boolean>;
};

interface BeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    readonly userChoice: Promise<{
        outcome: 'accepted' | 'dismissed';
        platform: string;
    }>;
    prompt(): Promise<void>;
}
interface PWAInstallResult {
    canInstall: boolean;
    isInstalled: boolean;
    isIOS: boolean;
    promptInstall: () => Promise<{
        outcome: 'accepted' | 'dismissed' | 'unsupported';
    }>;
}
declare function usePWAInstall(): PWAInstallResult;

interface BaseQueuedMutation {
    id: string;
    timestamp?: number;
    retryCount?: number;
}
interface UseOfflineQueueOptions<T extends BaseQueuedMutation> {
    dbName?: string;
    storeName?: string;
    syncHandler?: (item: T) => Promise<boolean>;
    maxRetries?: number;
    autoSyncOnOnline?: boolean;
}
interface OfflineQueueState<T extends BaseQueuedMutation> {
    isOnline: boolean;
    pendingCount: number;
    isSyncing: boolean;
    queue: T[];
    enqueue: (item: Omit<T, 'timestamp' | 'retryCount'> & Partial<BaseQueuedMutation>) => Promise<void>;
    remove: (id: string) => Promise<void>;
    clear: () => Promise<void>;
    flushQueue: () => Promise<{
        successCount: number;
        failedCount: number;
    }>;
}
declare function useOfflineQueue<T extends BaseQueuedMutation>(options?: UseOfflineQueueOptions<T>): OfflineQueueState<T>;

interface AsyncSelectProps<T> {
    value: string;
    onChange: (value: string, item: T | null) => void;
    fetchFn: (query: string) => Promise<T[]>;
    getOptionLabel: (option: T) => React$1.ReactNode;
    getOptionStringValue?: (option: T) => string;
    getOptionValue: (option: T) => string;
    placeholder?: string;
    searchPlaceholder?: string;
    emptyMessage?: string;
    className?: string;
    debounceMs?: number;
}
declare function AsyncSelect<T>({ value, onChange, fetchFn, getOptionLabel, getOptionStringValue, getOptionValue, placeholder, searchPlaceholder, emptyMessage, className, debounceMs, }: AsyncSelectProps<T>): react_jsx_runtime.JSX.Element;

declare const Separator: React$1.ForwardRefExoticComponent<Omit<SeparatorPrimitive.SeparatorProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;

declare const buttonGroupVariants: (props?: ({
    orientation?: "horizontal" | "vertical" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare function ButtonGroup({ className, orientation, ...props }: React.ComponentProps<"div"> & VariantProps<typeof buttonGroupVariants>): react_jsx_runtime.JSX.Element;
declare function ButtonGroupText({ className, asChild, ...props }: React.ComponentProps<"div"> & {
    asChild?: boolean;
}): react_jsx_runtime.JSX.Element;
declare function ButtonGroupSeparator({ className, orientation, ...props }: React.ComponentProps<typeof Separator>): react_jsx_runtime.JSX.Element;

declare const Checkbox: React$1.ForwardRefExoticComponent<Omit<CheckboxPrimitive.CheckboxProps & React$1.RefAttributes<HTMLButtonElement>, "ref"> & React$1.RefAttributes<HTMLButtonElement>>;

interface ComboboxOption {
    value: string;
    label: string;
    disabled?: boolean;
}
interface ComboboxProps {
    value?: string;
    defaultValue?: string;
    options: ComboboxOption[];
    onChange?: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    emptyText?: string;
    searchPlaceholder?: string;
    triggerClassName?: string;
    contentClassName?: string;
}
declare const Combobox: React$1.ForwardRefExoticComponent<ComboboxProps & React$1.RefAttributes<HTMLButtonElement>>;

declare const FieldSet: React$1.ForwardRefExoticComponent<Omit<React$1.DetailedHTMLProps<React$1.FieldsetHTMLAttributes<HTMLFieldSetElement>, HTMLFieldSetElement>, "ref"> & React$1.RefAttributes<HTMLFieldSetElement>>;
declare const FieldLegend: React$1.ForwardRefExoticComponent<Omit<React$1.ClassAttributes<HTMLLegendElement> & React$1.HTMLAttributes<HTMLLegendElement> & {
    variant?: "legend" | "label";
}, "ref"> & React$1.RefAttributes<HTMLLegendElement>>;
declare const FieldGroup: React$1.ForwardRefExoticComponent<Omit<React$1.DetailedHTMLProps<React$1.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const Field: React$1.ForwardRefExoticComponent<Omit<React$1.ClassAttributes<HTMLDivElement> & React$1.HTMLAttributes<HTMLDivElement> & VariantProps<(props?: ({
    orientation?: "horizontal" | "vertical" | "responsive" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const FieldContent: React$1.ForwardRefExoticComponent<Omit<React$1.DetailedHTMLProps<React$1.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const FieldLabel: React$1.ForwardRefExoticComponent<Omit<Omit<LabelPrimitive.LabelProps & React$1.RefAttributes<HTMLLabelElement>, "ref"> & VariantProps<(props?: class_variance_authority_types.ClassProp | undefined) => string> & React$1.RefAttributes<HTMLLabelElement>, "ref"> & React$1.RefAttributes<HTMLLabelElement>>;
declare const FieldTitle: React$1.ForwardRefExoticComponent<Omit<React$1.DetailedHTMLProps<React$1.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const FieldDescription: React$1.ForwardRefExoticComponent<Omit<React$1.DetailedHTMLProps<React$1.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>, "ref"> & React$1.RefAttributes<HTMLParagraphElement>>;
declare const FieldSeparator: React$1.ForwardRefExoticComponent<Omit<React$1.ClassAttributes<HTMLDivElement> & React$1.HTMLAttributes<HTMLDivElement> & {
    children?: React$1.ReactNode;
}, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const FieldError: React$1.ForwardRefExoticComponent<Omit<React$1.ClassAttributes<HTMLDivElement> & React$1.HTMLAttributes<HTMLDivElement> & {
    errors?: Array<{
        message?: string;
    } | undefined>;
}, "ref"> & React$1.RefAttributes<HTMLDivElement>>;

interface FileItem {
    id: string;
    file: File;
    previewUrl?: string | undefined;
    progress?: number | undefined;
    error?: string | undefined;
}
interface FileUploadProps extends Omit<React$1.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
    value?: FileItem[] | undefined;
    defaultValue?: FileItem[] | undefined;
    onChange?: ((files: FileItem[]) => void) | undefined;
    accept?: string | undefined;
    maxSize?: number | undefined;
    maxFiles?: number | undefined;
    multiple?: boolean | undefined;
    disabled?: boolean | undefined;
    label?: string | undefined;
    description?: string | undefined;
    error?: string | undefined;
}
declare const FileUpload: React$1.ForwardRefExoticComponent<FileUploadProps & React$1.RefAttributes<HTMLDivElement>>;

interface FilterOption {
    value: string;
    label: string;
}
interface FilterSelectProps {
    /** The currently selected value */
    value?: string | undefined;
    /** Function to call when the value changes */
    onChange?: ((value: string) => void) | undefined;
    /** The list of options to display */
    options: FilterOption[];
    /** Optional placeholder text when no value is selected */
    placeholder?: string | undefined;
    /** Optional custom CSS classes for the trigger */
    className?: string | undefined;
    /** Optional id or name for the select */
    id?: string | undefined;
    /** Optional disabled state */
    disabled?: boolean | undefined;
}
/**
 * FilterSelect component for consistent dropdown filtering across data views.
 */
declare function FilterSelect({ value, onChange, options, placeholder, className, id, disabled, }: FilterSelectProps): react_jsx_runtime.JSX.Element;

declare const Form: <TFieldValues extends FieldValues, TContext = any, TTransformedValues = TFieldValues>(props: react_hook_form.FormProviderProps<TFieldValues, TContext, TTransformedValues>) => React$1.JSX.Element;
declare const FormField: <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({ ...props }: ControllerProps<TFieldValues, TName>) => react_jsx_runtime.JSX.Element;
declare const useFormField: () => {
    invalid: boolean;
    isDirty: boolean;
    isTouched: boolean;
    isValidating: boolean;
    error?: react_hook_form.FieldError;
    id: string;
    name: string;
    formItemId: string;
    formDescriptionId: string;
    formMessageId: string;
};
declare const FormItem: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLDivElement> & React$1.RefAttributes<HTMLDivElement>>;
declare const FormLabel: React$1.ForwardRefExoticComponent<Omit<LabelPrimitive.LabelProps & React$1.RefAttributes<HTMLLabelElement>, "ref"> & React$1.RefAttributes<HTMLLabelElement>>;
declare const FormControl: React$1.ForwardRefExoticComponent<Omit<_radix_ui_react_slot.SlotProps & React$1.RefAttributes<HTMLElement>, "ref"> & React$1.RefAttributes<HTMLElement>>;
declare const FormDescription: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLParagraphElement> & React$1.RefAttributes<HTMLParagraphElement>>;
declare const FormMessage: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLParagraphElement> & React$1.RefAttributes<HTMLParagraphElement>>;

declare function InputGroup({ className, ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare const inputGroupAddonVariants: (props?: ({
    align?: "inline-end" | "inline-start" | "block-end" | "block-start" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare function InputGroupAddon({ className, align, ...props }: React$1.ComponentProps<"div"> & VariantProps<typeof inputGroupAddonVariants>): react_jsx_runtime.JSX.Element;
declare const inputGroupButtonVariants: (props?: ({
    size?: "sm" | "xs" | "icon-xs" | "icon-sm" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare function InputGroupButton({ className, type, variant, size, ...props }: Omit<React$1.ComponentProps<typeof Button>, "size"> & VariantProps<typeof inputGroupButtonVariants>): react_jsx_runtime.JSX.Element;
declare function InputGroupText({ className, ...props }: React$1.ComponentProps<"span">): react_jsx_runtime.JSX.Element;
declare function InputGroupInput({ className, ...props }: React$1.ComponentProps<"input">): react_jsx_runtime.JSX.Element;
declare function InputGroupTextarea({ className, ...props }: React$1.ComponentProps<"textarea">): react_jsx_runtime.JSX.Element;

declare const InputOTP: React$1.ForwardRefExoticComponent<(Omit<Omit<React$1.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "maxLength" | "textAlign" | "onComplete" | "pushPasswordManagerStrategy" | "pasteTransformer" | "containerClassName" | "noScriptCSSFallback"> & {
    value?: string;
    onChange?: (newValue: string) => unknown;
    maxLength: number;
    textAlign?: "left" | "center" | "right";
    onComplete?: (...args: any[]) => unknown;
    pushPasswordManagerStrategy?: "increase-width" | "none";
    pasteTransformer?: (pasted: string) => string;
    containerClassName?: string;
    noScriptCSSFallback?: string | null;
} & {
    render: (props: input_otp.RenderProps) => React$1.ReactNode;
    children?: never;
} & React$1.RefAttributes<HTMLInputElement>, "ref"> | Omit<Omit<React$1.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "maxLength" | "textAlign" | "onComplete" | "pushPasswordManagerStrategy" | "pasteTransformer" | "containerClassName" | "noScriptCSSFallback"> & {
    value?: string;
    onChange?: (newValue: string) => unknown;
    maxLength: number;
    textAlign?: "left" | "center" | "right";
    onComplete?: (...args: any[]) => unknown;
    pushPasswordManagerStrategy?: "increase-width" | "none";
    pasteTransformer?: (pasted: string) => string;
    containerClassName?: string;
    noScriptCSSFallback?: string | null;
} & {
    render?: never;
    children: React$1.ReactNode;
} & React$1.RefAttributes<HTMLInputElement>, "ref">) & React$1.RefAttributes<HTMLInputElement>>;
declare const InputOTPGroup: React$1.ForwardRefExoticComponent<Omit<React$1.DetailedHTMLProps<React$1.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const InputOTPSlot: React$1.ForwardRefExoticComponent<Omit<React$1.DetailedHTMLProps<React$1.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & {
    index: number;
} & React$1.RefAttributes<HTMLDivElement>>;
declare const InputOTPSeparator: React$1.ForwardRefExoticComponent<Omit<React$1.DetailedHTMLProps<React$1.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;

declare const Label: React$1.ForwardRefExoticComponent<Omit<LabelPrimitive.LabelProps & React$1.RefAttributes<HTMLLabelElement>, "ref"> & VariantProps<(props?: class_variance_authority_types.ClassProp | undefined) => string> & React$1.RefAttributes<HTMLLabelElement>>;

interface Option {
    label: string;
    value: string;
    disabled?: boolean;
}
interface MultiSelectProps extends Omit<React$1.HTMLAttributes<HTMLDivElement>, "value" | "defaultValue" | "onChange"> {
    options: Option[];
    value?: string[];
    defaultValue?: string[];
    onChange?: (value: string[]) => void;
    placeholder?: string;
    searchPlaceholder?: string;
    maxCount?: number;
    disabled?: boolean;
    className?: string;
    error?: boolean | string;
}
declare const MultiSelect: React$1.ForwardRefExoticComponent<MultiSelectProps & React$1.RefAttributes<HTMLDivElement>>;

declare const RadioGroup: React$1.ForwardRefExoticComponent<Omit<RadioGroupPrimitive.RadioGroupProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const RadioGroupItem: React$1.ForwardRefExoticComponent<Omit<RadioGroupPrimitive.RadioGroupItemProps & React$1.RefAttributes<HTMLButtonElement>, "ref"> & React$1.RefAttributes<HTMLButtonElement>>;

interface SearchFieldProps extends React$1.ComponentProps<typeof Input> {
    onClear?: () => void;
    showClear?: boolean;
}
declare const SearchField: React$1.ForwardRefExoticComponent<Omit<SearchFieldProps, "ref"> & React$1.RefAttributes<HTMLInputElement>>;

declare const Select: React$1.FC<SelectPrimitive.SelectProps>;
declare const SelectGroup: React$1.ForwardRefExoticComponent<SelectPrimitive.SelectGroupProps & React$1.RefAttributes<HTMLDivElement>>;
declare const SelectValue: React$1.ForwardRefExoticComponent<SelectPrimitive.SelectValueProps & React$1.RefAttributes<HTMLSpanElement>>;
declare const SelectTrigger: React$1.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectTriggerProps & React$1.RefAttributes<HTMLButtonElement>, "ref"> & React$1.RefAttributes<HTMLButtonElement>>;
declare const SelectScrollUpButton: React$1.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectScrollUpButtonProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const SelectScrollDownButton: React$1.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectScrollDownButtonProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const SelectContent: React$1.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectContentProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const SelectLabel: React$1.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectLabelProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const SelectItem: React$1.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectItemProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const SelectSeparator: React$1.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectSeparatorProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;

interface SkillTag {
    id?: string;
    name: string;
    level?: "Beginner" | "Intermediate" | "Advanced" | "Expert";
    verified?: boolean;
}
interface SkillTagCloudProps extends React$1.HTMLAttributes<HTMLDivElement> {
    tags: SkillTag[];
    onAddTag?: (name: string) => void;
    onRemoveTag?: (tag: SkillTag) => void;
    readOnly?: boolean;
    maxTags?: number;
    placeholder?: string;
    categoryLabel?: string;
}
declare function SkillTagCloud({ tags, onAddTag, onRemoveTag, readOnly, maxTags, placeholder, categoryLabel, className, ...props }: SkillTagCloudProps): react_jsx_runtime.JSX.Element;

declare const Slider: React$1.ForwardRefExoticComponent<Omit<SliderPrimitive.SliderProps & React$1.RefAttributes<HTMLSpanElement>, "ref"> & {
    thumbLabels?: string[];
    getThumbAriaLabel?: (index: number) => string;
} & React$1.RefAttributes<HTMLSpanElement>>;

declare const Switch: React$1.ForwardRefExoticComponent<Omit<SwitchPrimitives.SwitchProps & React$1.RefAttributes<HTMLButtonElement>, "ref"> & React$1.RefAttributes<HTMLButtonElement>>;

declare const Textarea: React$1.ForwardRefExoticComponent<Omit<React$1.DetailedHTMLProps<React$1.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>, "ref"> & React$1.RefAttributes<HTMLTextAreaElement>>;

declare const toggleVariants: (props?: ({
    variant?: "default" | "outline" | null | undefined;
    size?: "default" | "sm" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const Toggle: React$1.ForwardRefExoticComponent<Omit<TogglePrimitive.ToggleProps & React$1.RefAttributes<HTMLButtonElement>, "ref"> & VariantProps<(props?: ({
    variant?: "default" | "outline" | null | undefined;
    size?: "default" | "sm" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string> & React$1.RefAttributes<HTMLButtonElement>>;

declare const ToggleGroup: React$1.ForwardRefExoticComponent<((Omit<ToggleGroupPrimitive.ToggleGroupSingleProps & React$1.RefAttributes<HTMLDivElement>, "ref"> | Omit<ToggleGroupPrimitive.ToggleGroupMultipleProps & React$1.RefAttributes<HTMLDivElement>, "ref">) & VariantProps<(props?: ({
    variant?: "default" | "outline" | null | undefined;
    size?: "default" | "sm" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string>) & React$1.RefAttributes<HTMLDivElement>>;
declare const ToggleGroupItem: React$1.ForwardRefExoticComponent<Omit<ToggleGroupPrimitive.ToggleGroupItemProps & React$1.RefAttributes<HTMLButtonElement>, "ref"> & VariantProps<(props?: ({
    variant?: "default" | "outline" | null | undefined;
    size?: "default" | "sm" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string> & React$1.RefAttributes<HTMLButtonElement>>;

declare const AspectRatio: React$1.ForwardRefExoticComponent<AspectRatioPrimitive.AspectRatioProps & React$1.RefAttributes<HTMLDivElement>>;

interface DetailGridProps extends React$1.HTMLAttributes<HTMLDivElement> {
    columns?: 1 | 2 | 3 | 4;
    children: React$1.ReactNode;
}
declare function DetailGrid({ columns, className, ...props }: DetailGridProps): react_jsx_runtime.JSX.Element;

interface PageHeaderProps {
    title: React$1.ReactNode;
    description?: React$1.ReactNode;
    /** Slot for breadcrumbs or back button */
    breadcrumbs?: React$1.ReactNode;
    /** Action buttons rendered on the right */
    actions?: React$1.ReactNode;
    className?: string;
    /** Optional badge/status next to title */
    badge?: React$1.ReactNode;
}
/**
 * PageHeader — standard top-of-page layout used on every page.
 *
 * Usage:
 * ```tsx
 * <PageHeader
 *   title="Purchase Orders"
 *   description="Manage and track all purchase orders"
 *   actions={<Button>Create PO</Button>}
 *   breadcrumbs={<Breadcrumb>...</Breadcrumb>}
 * />
 * ```
 */
declare function PageHeader({ title, description, breadcrumbs, actions, badge, className, }: PageHeaderProps): react_jsx_runtime.JSX.Element;
/**
 * PageHeaderSkeleton — loading placeholder matching PageHeader dimensions.
 */
declare function PageHeaderSkeleton(): react_jsx_runtime.JSX.Element;

interface ResizablePanelGroupProps extends Omit<React$1.ComponentProps<typeof Group>, "orientation"> {
    direction?: "horizontal" | "vertical";
    orientation?: "horizontal" | "vertical";
}
declare const ResizablePanelGroup: ({ className, direction, orientation, ...props }: ResizablePanelGroupProps) => react_jsx_runtime.JSX.Element;
declare const ResizablePanel: typeof Panel;
declare const ResizableHandle: ({ withHandle, className, ...props }: React$1.ComponentProps<typeof Separator$1> & {
    withHandle?: boolean;
}) => react_jsx_runtime.JSX.Element;

/**
 * ScrollArea — wraps content with a custom-styled scrollbar.
 *
 * Phase 5 fix: Now renders BOTH a vertical and horizontal scrollbar by default.
 * Pass `orientation` to `ScrollBar` directly for single-axis control.
 * Set `scrollHideDelay` on the root to control auto-hide behaviour.
 */
declare const ScrollArea: React$1.ForwardRefExoticComponent<Omit<ScrollAreaPrimitive.ScrollAreaProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & {
    /** Which scrollbars to show. Default: 'vertical' */
    orientation?: "vertical" | "horizontal" | "both";
} & React$1.RefAttributes<HTMLDivElement>>;
declare const ScrollBar: React$1.ForwardRefExoticComponent<Omit<ScrollAreaPrimitive.ScrollAreaScrollbarProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;

interface ActiveFilterBadgeProps {
    label: string;
    onClear: () => void;
    className?: string;
}
declare function ActiveFilterBadge({ label, onClear, className, }: ActiveFilterBadgeProps): react_jsx_runtime.JSX.Element | null;

declare const Accordion: React$1.ForwardRefExoticComponent<(AccordionPrimitive.AccordionSingleProps | AccordionPrimitive.AccordionMultipleProps) & React$1.RefAttributes<HTMLDivElement>>;
declare const AccordionItem: React$1.ForwardRefExoticComponent<Omit<AccordionPrimitive.AccordionItemProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const AccordionTrigger: React$1.ForwardRefExoticComponent<Omit<AccordionPrimitive.AccordionTriggerProps & React$1.RefAttributes<HTMLButtonElement>, "ref"> & React$1.RefAttributes<HTMLButtonElement>>;
declare const AccordionContent: React$1.ForwardRefExoticComponent<Omit<AccordionPrimitive.AccordionContentProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;

interface AmountSummaryItem {
    totalQuantity?: number | string;
    targetPrice?: number | string;
    taxRate?: number;
    /** @deprecated Use `taxRate` instead. */
    tax_rate?: number;
}
interface AmountSummaryTaxItem {
    label: string;
    amount: number;
    rate?: number;
}
interface AmountSummaryDeductionItem {
    label: string;
    amount: number;
    rate?: number;
}
interface AmountSummaryCardProps extends React$1.HTMLAttributes<HTMLDivElement> {
    baseAmount?: number | undefined;
    /** Direct single tax amount or list of individual tax components */
    taxAmount?: number | undefined;
    taxLabel?: string | undefined;
    taxes?: AmountSummaryTaxItem[] | undefined;
    shippingCost?: number | undefined;
    /** @deprecated Alias for `shippingCost` */
    transportCost?: number | undefined;
    /** Percentage of tax or withholding deduction */
    withholdingPercentage?: number | undefined;
    /** @deprecated Alias for `withholdingPercentage` */
    tdsPercentage?: number | undefined;
    /** Custom deductions list */
    deductions?: AmountSummaryDeductionItem[] | undefined;
    /** Flag to indicate urgent processing */
    isUrgent?: boolean | undefined;
    urgentLabel?: string | undefined;
    /** Explicit net payable override */
    netPayable?: number | undefined;
    isTaxInclusive?: boolean | undefined;
    items?: AmountSummaryItem[] | undefined;
    size?: "sm" | "default" | undefined;
    maskFormatter?: ((val: number | string) => string) | undefined;
}
declare function AmountSummaryCard({ baseAmount, taxAmount, taxLabel, taxes, shippingCost, transportCost, withholdingPercentage, tdsPercentage, deductions, isUrgent, urgentLabel, netPayable, isTaxInclusive, items, size, maskFormatter, className, ...props }: AmountSummaryCardProps): react_jsx_runtime.JSX.Element;

declare const avatarVariants: (props?: ({
    size?: "default" | "sm" | "lg" | "xs" | "xl" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const Avatar: React$1.ForwardRefExoticComponent<Omit<AvatarPrimitive.AvatarProps & React$1.RefAttributes<HTMLSpanElement>, "ref"> & VariantProps<(props?: ({
    size?: "default" | "sm" | "lg" | "xs" | "xl" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string> & React$1.RefAttributes<HTMLSpanElement>>;
declare const AvatarImage: React$1.ForwardRefExoticComponent<Omit<AvatarPrimitive.AvatarImageProps & React$1.RefAttributes<HTMLImageElement>, "ref"> & React$1.RefAttributes<HTMLImageElement>>;
declare const AvatarFallback: React$1.ForwardRefExoticComponent<Omit<AvatarPrimitive.AvatarFallbackProps & React$1.RefAttributes<HTMLSpanElement>, "ref"> & React$1.RefAttributes<HTMLSpanElement>>;
/**
 * AvatarGroup — Stacks multiple Avatar components with a ring gap so the
 * borders don't visually merge.
 *
 * @example
 * <AvatarGroup>
 *   <Avatar><AvatarImage src="..." /></Avatar>
 *   <Avatar><AvatarFallback>AB</AvatarFallback></Avatar>
 * </AvatarGroup>
 */
declare function AvatarGroup({ className, max, children, ...props }: React$1.ComponentProps<"div"> & {
    max?: number;
}): react_jsx_runtime.JSX.Element;

interface BilingualTooltipProps {
    active?: boolean;
    payload?: Array<{
        name: string;
        value: number | string;
        color?: string;
        fill?: string;
    }>;
    label?: string;
    /** Active language code (e.g., "en", "es", "hi", "fr"). Defaults to "en". */
    language?: string;
    /** Configurable locale for numeric/currency formatting. Defaults to "en-US". */
    locale?: string;
    /** Direct key-to-label mapping for the current view/language. */
    labelMap?: Record<string, string>;
    /** Direct translations mapping for the current active language. */
    translations?: Record<string, string>;
    /**
     * Multi-language dictionary mapping language codes to key-value translation records.
     * Example: `{ es: { Month: "Mes", Amount: "Cantidad" } }`
     */
    dictionary?: Record<string, Record<string, string>>;
    /** Whether to format numeric values with the currency symbol and locale formatting. */
    formatCurrency?: boolean;
    /** Currency symbol to prefix when formatCurrency is enabled. Defaults to "$". */
    currencySymbol?: string;
    /** Whether to format numeric values as a percentage with one decimal place. */
    formatPercent?: boolean;
    /** Optional custom value formatter function. */
    formatter?: (value: number | string, name: string) => string;
}
declare function BilingualTooltip({ active, payload, label, language, locale, labelMap, translations, dictionary, formatCurrency, currencySymbol, formatPercent, formatter, }: BilingualTooltipProps): react_jsx_runtime.JSX.Element | null;

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];
type CarouselProps = {
    opts?: CarouselOptions;
    plugins?: CarouselPlugin;
    orientation?: "horizontal" | "vertical";
    setApi?: (api: CarouselApi) => void;
    showDots?: boolean;
    showArrows?: boolean;
    dotsPosition?: "bottom" | "left" | "right";
};
declare const Carousel: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLDivElement> & CarouselProps & React$1.RefAttributes<HTMLDivElement>>;
declare const CarouselContent: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLDivElement> & React$1.RefAttributes<HTMLDivElement>>;
declare const CarouselItem: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLDivElement> & React$1.RefAttributes<HTMLDivElement>>;
declare const CarouselPrevious: React$1.ForwardRefExoticComponent<Omit<ButtonProps & React$1.RefAttributes<HTMLButtonElement>, "ref"> & React$1.RefAttributes<HTMLButtonElement>>;
declare const CarouselNext: React$1.ForwardRefExoticComponent<Omit<ButtonProps & React$1.RefAttributes<HTMLButtonElement>, "ref"> & React$1.RefAttributes<HTMLButtonElement>>;
/**
 * CarouselDots — Pagination dot indicators below the carousel.
 * Each dot is a clickable circle; the active slide's dot is filled.
 *
 * @example
 * <Carousel setApi={setApi}>
 *   ...
 *   <CarouselDots />
 * </Carousel>
 */
declare const CarouselDots: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLDivElement> & React$1.RefAttributes<HTMLDivElement>>;

interface FallbackProps {
    error: Error;
    resetErrorBoundary: () => void;
}
type FallbackRender = (props: FallbackProps) => React$1.ReactNode;
interface ErrorBoundaryProps {
    children?: React$1.ReactNode | undefined;
    fallback?: React$1.ReactNode | FallbackRender | undefined;
    onError?: ((error: Error, errorInfo: React$1.ErrorInfo) => void) | undefined;
    onReset?: (() => void) | undefined;
    resetKeys?: unknown[] | undefined;
}
interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}
declare class ErrorBoundary extends React$1.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps);
    static getDerivedStateFromError(error: Error): ErrorBoundaryState;
    componentDidCatch(error: Error, errorInfo: React$1.ErrorInfo): void;
    componentDidUpdate(prevProps: ErrorBoundaryProps): void;
    resetErrorBoundary: () => void;
    render(): string | number | bigint | boolean | react_jsx_runtime.JSX.Element | Iterable<React$1.ReactNode> | Promise<string | number | bigint | boolean | React$1.ReactPortal | React$1.ReactElement<unknown, string | React$1.JSXElementConstructor<any>> | Iterable<React$1.ReactNode> | null | undefined> | null | undefined;
}
/**
 * HOC to wrap components with an ErrorBoundary while preserving refs.
 */
declare function withErrorBoundary<P extends object, Ref = unknown>(Component: React$1.ComponentType<P>, errorBoundaryProps?: Omit<ErrorBoundaryProps, "children">): React$1.ForwardRefExoticComponent<React$1.PropsWithoutRef<P> & React$1.RefAttributes<Ref>>;
/**
 * Hook to imperatively trigger an ErrorBoundary boundary from event handlers or async calls.
 */
declare function useErrorBoundary(): {
    showBoundary: (err: Error) => void;
    resetBoundary: () => void;
};

declare const THEMES: {
    readonly light: "";
    readonly dark: ".dark";
};
type ChartConfig = {
    [k in string]: {
        label?: React$1.ReactNode;
        icon?: React$1.ComponentType;
    } & ({
        color?: string;
        theme?: never;
    } | {
        color?: never;
        theme: Record<keyof typeof THEMES, string>;
    });
};
type ChartContainerProps = Omit<React$1.ComponentProps<"div">, "onError"> & {
    config: ChartConfig;
    children: React$1.ReactElement;
    fallback?: React$1.ReactNode | FallbackRender | undefined;
    onError?: ((error: Error, errorInfo: React$1.ErrorInfo) => void) | undefined;
};
declare const ChartContainer: React$1.ForwardRefExoticComponent<Omit<ChartContainerProps, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const ChartStyle: ({ id, config }: {
    id: string;
    config: ChartConfig;
}) => react_jsx_runtime.JSX.Element | null;
declare const ChartTooltip: typeof Tooltip$1;
interface ChartTooltipContentProps extends Omit<React$1.ComponentProps<"div">, "color"> {
    active?: boolean;
    payload?: TooltipPayloadEntry[];
    className?: string;
    indicator?: "line" | "dot" | "dashed";
    hideLabel?: boolean;
    hideIndicator?: boolean;
    label?: React$1.ReactNode;
    labelFormatter?: (label: React$1.ReactNode, payload: TooltipPayloadEntry[]) => React$1.ReactNode;
    labelClassName?: string;
    formatter?: (value: unknown, name: unknown, item: TooltipPayloadEntry, index: number, payload: unknown) => React$1.ReactNode;
    color?: string;
    nameKey?: string;
    labelKey?: string;
}
declare const ChartTooltipContent: React$1.ForwardRefExoticComponent<Omit<ChartTooltipContentProps, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const ChartLegend: React$1.MemoExoticComponent<(outsideProps: recharts.LegendProps) => React$1.ReactPortal | null>;
interface ChartLegendContentProps extends React$1.ComponentProps<"div"> {
    payload?: Array<LegendPayload & {
        id?: string | number;
        [key: string]: unknown;
    }>;
    verticalAlign?: "top" | "middle" | "bottom";
    hideIcon?: boolean;
    nameKey?: string;
}
declare const ChartLegendContent: React$1.ForwardRefExoticComponent<Omit<ChartLegendContentProps, "ref"> & React$1.RefAttributes<HTMLDivElement>>;

declare const Collapsible: React$1.ForwardRefExoticComponent<CollapsiblePrimitive.CollapsibleProps & React$1.RefAttributes<HTMLDivElement>>;
declare const CollapsibleTrigger: React$1.ForwardRefExoticComponent<CollapsiblePrimitive.CollapsibleTriggerProps & React$1.RefAttributes<HTMLButtonElement>>;
declare const CollapsibleContent: React$1.ForwardRefExoticComponent<CollapsiblePrimitive.CollapsibleContentProps & React$1.RefAttributes<HTMLDivElement>>;
/**
 * CollapsibleCard — A bordered, rounded card that reveals content on click.
 * Used for expandable sections like "Advanced filters", "Technical details", etc.
 */
declare function CollapsibleCard({ className, ...props }: React$1.ComponentProps<typeof CollapsiblePrimitive.Root>): react_jsx_runtime.JSX.Element;
/**
 * CollapsibleCardTrigger — Styled trigger row with hover highlight and an
 * auto-rotating chevron. Always expands downward.
 */
declare function CollapsibleCardTrigger({ className, children, ...props }: React$1.ComponentProps<typeof CollapsiblePrimitive.Trigger>): react_jsx_runtime.JSX.Element;
/**
 * CollapsibleCardContent — Animated content area with a top divider.
 */
declare function CollapsibleCardContent({ className, ...props }: React$1.ComponentProps<typeof CollapsiblePrimitive.Content>): react_jsx_runtime.JSX.Element;

interface ImageViewerProps {
    /** The URL or File object of the image to render */
    file: string | File;
    /** Optional class for the outer container */
    className?: string;
    /** Text description of the image for accessibility */
    alt?: string;
    /** Initial scale of the Image */
    scale?: number;
    /** Whether to show a transparent internal download button */
    showDownload?: boolean;
    /** Callback when loading succeeds */
    onLoadSuccess?: () => void;
    /** Callback when loading fails */
    onLoadError?: (error: string | Event) => void;
}
declare function ImageViewer({ file, className, alt, scale, showDownload, onLoadSuccess, onLoadError, }: ImageViewerProps): react_jsx_runtime.JSX.Element;

interface InfoItem {
    label: React$1.ReactNode;
    value: React$1.ReactNode;
    hint?: React$1.ReactNode;
}
interface InfoListProps extends React$1.HTMLAttributes<HTMLDivElement> {
    items: InfoItem[];
}
declare function InfoList({ items, className, ...props }: InfoListProps): react_jsx_runtime.JSX.Element;

type KPICardTone = "default" | "info" | "success" | "warning" | "danger" | "accent";
interface KPICardProps extends Omit<React$1.HTMLAttributes<HTMLDivElement>, "title"> {
    title?: React$1.ReactNode;
    label?: React$1.ReactNode;
    value: React$1.ReactNode;
    description?: React$1.ReactNode;
    change?: number;
    changePeriod?: string;
    icon?: React$1.ComponentType<{
        className?: string;
    }> | React$1.ReactNode;
    prefix?: string;
    suffix?: string;
    variant?: "default" | "outline" | "ghost";
    tone?: KPICardTone;
    warning?: React$1.ReactNode;
}
declare const KPICard: React$1.ForwardRefExoticComponent<KPICardProps & React$1.RefAttributes<HTMLDivElement>>;

interface LineItem {
    id?: string;
    name?: string;
    item_name?: string;
    ean_code?: string;
    hsn_sac_code?: string;
    hsn_code?: string;
    ordered_qty?: number;
    qty?: number;
    received_qty?: number;
    rejected_qty?: number;
    accepted_qty?: number;
    unit?: string;
    base_price?: number;
    unit_price?: number;
    tax_per_unit?: number;
    sgst_rate?: number;
    cgst_rate?: number;
    igst_rate?: number;
    total_tax?: number;
    total_amount?: number;
    bill_status?: string;
}
interface LineItemsCardProps extends React$1.HTMLAttributes<HTMLDivElement> {
    items: LineItem[];
    showBillStatus?: boolean;
    showQtyBreakdown?: boolean;
    footerLabel?: string;
    footerTotal?: number;
    emptyMessage?: string;
    isIntraState?: boolean;
    maskFormatter?: (val: string) => string;
}
declare function LineItemsCard({ items, showBillStatus, showQtyBreakdown, footerLabel, footerTotal, emptyMessage, isIntraState: _isIntraState, maskFormatter, className, ...props }: LineItemsCardProps): react_jsx_runtime.JSX.Element;

interface MatchScoreGaugeProps extends React$1.HTMLAttributes<HTMLDivElement> {
    score: number;
    label?: string;
    sublabel?: string;
    size?: number;
    strokeWidth?: number;
    showGrade?: boolean;
}
declare function MatchScoreGauge({ score, label, sublabel, size, strokeWidth, showGrade, className, ...props }: MatchScoreGaugeProps): react_jsx_runtime.JSX.Element;

interface TickerItem {
    id?: string;
    label: string;
    value: string | number;
    highlight?: boolean;
}
interface MetricTickerProps extends React$1.HTMLAttributes<HTMLDivElement> {
    items: TickerItem[];
    speedSeconds?: number;
}
declare function MetricTicker({ items, speedSeconds, className, ...props }: MetricTickerProps): react_jsx_runtime.JSX.Element;

interface QuotaCardProps extends React$1.HTMLAttributes<HTMLDivElement> {
    title: string;
    used: number;
    total: number;
    /** Label describing the quota units (e.g., "units", "credits", "requests"). Defaults to "units". */
    unitLabel?: string;
    /** Action button CTA text. Defaults to "Upgrade". */
    actionLabel?: string;
    /** Callback fired when the action button is clicked. If omitted, no button is rendered. */
    onAction?: () => void;
    /** Shows a loading state on the action button. */
    isLoading?: boolean;
    /** Optional custom subtitle/description overriding the default "X of Y units remaining". */
    description?: React$1.ReactNode;
    /** Optional formatter for the badge text (e.g., (pct) => `${pct}% consumed`). */
    formatPercentage?: (percentage: number) => string;
    /** Optional custom icon for the action button. Defaults to `<Sparkles />`. */
    icon?: React$1.ReactNode;
}
declare function QuotaCard({ title, used, total, unitLabel, actionLabel, onAction, isLoading, description, formatPercentage, icon, className, ...props }: QuotaCardProps): react_jsx_runtime.JSX.Element;

interface LedgerEntry {
    key?: string;
    reference_id?: string;
    reference_number?: string;
    grn_id?: string;
    grn_number?: string;
    invoice_id?: string;
    date: string;
    description: string;
    type: "DR" | "CR";
    amount: number;
    bill_status?: string;
    status?: string;
}
interface PaymentLedgerProps extends React$1.HTMLAttributes<HTMLDivElement> {
    ledgerEntries: LedgerEntry[];
    totalDR?: number;
    totalCR?: number;
    net?: number;
    netLabel?: string;
    showFooter?: boolean;
    onReferenceClick?: (referenceId: string) => void;
    onGRNClick?: (grnId: string) => void;
    onInvoiceClick?: (invoiceId: string) => void;
    maskFormatter?: (val: string) => string;
}
declare function PaymentLedger({ ledgerEntries, totalDR, totalCR, net: _net, netLabel, showFooter, onReferenceClick, onGRNClick, onInvoiceClick: _onInvoiceClick, maskFormatter, className, ...props }: PaymentLedgerProps): react_jsx_runtime.JSX.Element;

interface KanbanCardItem {
    id: string;
    title: string;
    subtitle?: string;
    tag?: string;
    score?: number;
    /** Optional custom score/metric badge label (e.g., "94%", "$50k", "Priority High"). Overrides score display. */
    scoreLabel?: string;
    avatarUrl?: string;
    /** Optional arbitrary metadata attached to the card item. */
    metadata?: Record<string, unknown>;
}
interface KanbanColumn {
    id: string;
    title: string;
    /**
     * Explicit count for the column badge (useful for paginated/virtualized stage items).
     * If omitted, defaults to `items.length`.
     */
    count?: number;
    items: KanbanCardItem[];
    tone?: "default" | "indigo" | "emerald" | "amber" | "rose" | "purple";
    /** Optional empty state label when the column has 0 items. Defaults to "No items". */
    emptyMessage?: string;
}
interface PipelineKanbanProps extends React$1.HTMLAttributes<HTMLDivElement> {
    columns: KanbanColumn[];
    onCardClick?: (item: KanbanCardItem, columnId: string) => void;
    onAddCard?: (columnId: string) => void;
    /** Global empty state message for columns with 0 items. Defaults to "No items". */
    emptyMessage?: string;
}
declare function PipelineKanban({ columns, onCardClick, onAddCard, emptyMessage, className, ...props }: PipelineKanbanProps): react_jsx_runtime.JSX.Element;

interface ProofOfWorkItem {
    id?: string;
    title: string;
    type?: "github" | "live_project" | "certificate" | "architecture" | string;
    description?: string;
    linkUrl?: string;
    /** Custom call-to-action link label. Defaults to "View Artifact". */
    linkLabel?: string;
    /** Numeric score or rating (e.g., 96). Rendered with maxScore if metricLabel is not specified. */
    score?: number;
    /** Maximum scale for score (e.g., 100 or 5). Defaults to 100. */
    maxScore?: number;
    /** Explicit metric text badge (e.g., "98/100", "Top 1%", "Grade A"). Overrides score display. */
    metricLabel?: string;
    /** Whether the verification mark should be displayed beside the title. */
    verified?: boolean;
    tags?: string[];
    /** Optional custom icon to replace the default category icon. */
    icon?: React$1.ReactNode;
}
interface ProofOfWorkCardProps extends React$1.HTMLAttributes<HTMLDivElement> {
    item: ProofOfWorkItem;
}
declare function ProofOfWorkCard({ item, className, ...props }: ProofOfWorkCardProps): react_jsx_runtime.JSX.Element;
/** Generic alias for ProofOfWorkCard with customizable metrics. */
type MetricVerificationItem = ProofOfWorkItem;
type MetricVerificationCardProps = ProofOfWorkCardProps;
declare const MetricVerificationCard: typeof ProofOfWorkCard;

interface RadarBlip {
    id: string;
    x: number;
    y: number;
    label?: string;
    tone?: "primary" | "emerald" | "amber" | "rose" | "indigo" | "purple" | "cyan";
    pulse?: boolean;
}
interface RadarSweepProps extends React$1.HTMLAttributes<HTMLDivElement> {
    size?: number;
    blips?: RadarBlip[];
    isScanning?: boolean;
    statusText?: string;
}
declare function RadarSweep({ size, blips, isScanning, statusText, className, "aria-label": ariaLabel, ...props }: RadarSweepProps): react_jsx_runtime.JSX.Element;

interface MetricRangeBreakdownItem {
    label: string;
    value: number | string;
    colorClass?: string;
}
interface SalaryRangeBreakdown {
    fixed?: number;
    variable?: number;
    equity?: number;
    items?: MetricRangeBreakdownItem[];
}
interface SalaryRangeDisplayProps extends React$1.HTMLAttributes<HTMLDivElement> {
    /** Minimum range value. */
    min?: number;
    /** Maximum range value. */
    max?: number;
    /** Currency symbol prefix (e.g., "$", "€", "£"). Defaults to "$". */
    currencySymbol?: string;
    /** Unit suffix for range values (e.g., "k", "M"). */
    unit?: string;
    /** Frequency/period suffix (e.g., "yr", "mo", "hr"). Defaults to "yr". */
    period?: string;
    /** Card header label. Defaults to "Compensation Range". */
    label?: string;
    /** Breakdown components (fixed, variable, equity, or custom items). */
    breakdown?: SalaryRangeBreakdown;
    /** Generic list of breakdown items. */
    items?: MetricRangeBreakdownItem[];
    /** Visual variant: inline compact badge or detailed card container. Defaults to "badge". */
    variant?: "badge" | "card";
}
declare function SalaryRangeDisplay({ min, max, currencySymbol, unit, period, label, breakdown, items, variant, className, ...props }: SalaryRangeDisplayProps): react_jsx_runtime.JSX.Element;
/** Generic alias for SalaryRangeDisplay to display any metric or compensation range. */
type MetricRangeDisplayProps = SalaryRangeDisplayProps;
declare const MetricRangeDisplay: typeof SalaryRangeDisplay;
type CompensationRangeDisplayProps = SalaryRangeDisplayProps;
declare const CompensationRangeDisplay: typeof SalaryRangeDisplay;

type StatusValue = "pending" | "active" | "inactive" | "suspended" | "draft" | "completed" | "cancelled" | "rejected" | "approved" | "in_progress" | "overdue" | "on_hold" | "confirmed" | "dispatched" | "delivered" | "partially_delivered" | "returned" | "paid" | "unpaid" | "overdue_payment" | "partially_paid" | "accepted" | "partially_accepted" | "grn_pending" | "open" | "closed" | "awarded" | "expired" | "under_review" | "resolved" | "escalated" | "uploaded" | "verified" | "expired_doc";
interface StatusBadgeProps {
    status: StatusValue | string;
    /** Override the display label */
    label?: string;
    className?: string;
    /** Show the color dot indicator (default: true) */
    showDot?: boolean;
    size?: "sm" | "default";
}
/**
 * StatusBadge — platform-wide consistent status indicator.
 *
 * Usage:
 * ```tsx
 * <StatusBadge status="pending" />
 * <StatusBadge status="confirmed" label="PO Confirmed" />
 * <StatusBadge status="rejected" size="sm" />
 * ```
 */
declare function StatusBadge({ status, label, className, showDot, size, }: StatusBadgeProps): react_jsx_runtime.JSX.Element;

declare const Table: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLTableElement> & React$1.RefAttributes<HTMLTableElement>>;
declare const TableHeader: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLTableSectionElement> & React$1.RefAttributes<HTMLTableSectionElement>>;
declare const TableBody: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLTableSectionElement> & React$1.RefAttributes<HTMLTableSectionElement>>;
declare const TableFooter: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLTableSectionElement> & React$1.RefAttributes<HTMLTableSectionElement>>;
declare const TableRow: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLTableRowElement> & React$1.RefAttributes<HTMLTableRowElement>>;
declare const TableHead: React$1.ForwardRefExoticComponent<React$1.ThHTMLAttributes<HTMLTableCellElement> & React$1.RefAttributes<HTMLTableCellElement>>;
declare const TableCell: React$1.ForwardRefExoticComponent<React$1.TdHTMLAttributes<HTMLTableCellElement> & React$1.RefAttributes<HTMLTableCellElement>>;
declare const TableCaption: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLTableCaptionElement> & React$1.RefAttributes<HTMLTableCaptionElement>>;

interface TimelineItem {
    id?: string;
    title: string;
    description?: React$1.ReactNode;
    timestamp?: string;
    status?: "default" | "success" | "warning" | "destructive" | "info";
    icon?: React$1.ReactNode;
}
interface TimelineProps extends React$1.HTMLAttributes<HTMLDivElement> {
    items: TimelineItem[];
}
declare const Timeline: React$1.ForwardRefExoticComponent<TimelineProps & React$1.RefAttributes<HTMLDivElement>>;

declare const Breadcrumb: React$1.ForwardRefExoticComponent<Omit<React$1.DetailedHTMLProps<React$1.HTMLAttributes<HTMLElement>, HTMLElement>, "ref"> & {
    separator?: React$1.ReactNode;
} & React$1.RefAttributes<HTMLElement>>;
declare const BreadcrumbList: React$1.ForwardRefExoticComponent<Omit<React$1.DetailedHTMLProps<React$1.OlHTMLAttributes<HTMLOListElement>, HTMLOListElement>, "ref"> & React$1.RefAttributes<HTMLOListElement>>;
declare const BreadcrumbItem: React$1.ForwardRefExoticComponent<Omit<React$1.DetailedHTMLProps<React$1.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>, "ref"> & React$1.RefAttributes<HTMLLIElement>>;
declare const BreadcrumbLink: React$1.ForwardRefExoticComponent<Omit<React$1.DetailedHTMLProps<React$1.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, "ref"> & {
    asChild?: boolean;
} & React$1.RefAttributes<HTMLAnchorElement>>;
declare const BreadcrumbPage: React$1.ForwardRefExoticComponent<Omit<React$1.DetailedHTMLProps<React$1.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "ref"> & React$1.RefAttributes<HTMLSpanElement>>;
declare const BreadcrumbSeparator: {
    ({ children, className, ...props }: React$1.ComponentProps<"li">): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const BreadcrumbEllipsis: {
    ({ className, ...props }: React$1.ComponentProps<"span">): react_jsx_runtime.JSX.Element;
    displayName: string;
};

declare function MenubarMenu({ ...props }: React$1.ComponentProps<typeof MenubarPrimitive.Menu>): react_jsx_runtime.JSX.Element;
declare function MenubarGroup({ ...props }: React$1.ComponentProps<typeof MenubarPrimitive.Group>): react_jsx_runtime.JSX.Element;
declare function MenubarPortal({ ...props }: React$1.ComponentProps<typeof MenubarPrimitive.Portal>): react_jsx_runtime.JSX.Element;
declare function MenubarRadioGroup({ ...props }: React$1.ComponentProps<typeof MenubarPrimitive.RadioGroup>): react_jsx_runtime.JSX.Element;
declare function MenubarSub({ ...props }: React$1.ComponentProps<typeof MenubarPrimitive.Sub>): react_jsx_runtime.JSX.Element;
declare const Menubar: React$1.ForwardRefExoticComponent<Omit<MenubarPrimitive.MenubarProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const MenubarTrigger: React$1.ForwardRefExoticComponent<Omit<MenubarPrimitive.MenubarTriggerProps & React$1.RefAttributes<HTMLButtonElement>, "ref"> & React$1.RefAttributes<HTMLButtonElement>>;
declare const MenubarSubTrigger: React$1.ForwardRefExoticComponent<Omit<MenubarPrimitive.MenubarSubTriggerProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & {
    inset?: boolean;
} & React$1.RefAttributes<HTMLDivElement>>;
declare const MenubarSubContent: React$1.ForwardRefExoticComponent<Omit<MenubarPrimitive.MenubarSubContentProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const MenubarContent: React$1.ForwardRefExoticComponent<Omit<MenubarPrimitive.MenubarContentProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const MenubarItem: React$1.ForwardRefExoticComponent<Omit<MenubarPrimitive.MenubarItemProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & {
    inset?: boolean;
} & React$1.RefAttributes<HTMLDivElement>>;
declare const MenubarCheckboxItem: React$1.ForwardRefExoticComponent<Omit<MenubarPrimitive.MenubarCheckboxItemProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const MenubarRadioItem: React$1.ForwardRefExoticComponent<Omit<MenubarPrimitive.MenubarRadioItemProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const MenubarLabel: React$1.ForwardRefExoticComponent<Omit<MenubarPrimitive.MenubarLabelProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & {
    inset?: boolean;
} & React$1.RefAttributes<HTMLDivElement>>;
declare const MenubarSeparator: React$1.ForwardRefExoticComponent<Omit<MenubarPrimitive.MenubarSeparatorProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const MenubarShortcut: {
    ({ className, ...props }: React$1.HTMLAttributes<HTMLSpanElement>): react_jsx_runtime.JSX.Element;
    displayname: string;
};

declare const NavigationMenu: React$1.ForwardRefExoticComponent<Omit<NavigationMenuPrimitive.NavigationMenuProps & React$1.RefAttributes<HTMLElement>, "ref"> & React$1.RefAttributes<HTMLElement>>;
declare const NavigationMenuList: React$1.ForwardRefExoticComponent<Omit<NavigationMenuPrimitive.NavigationMenuListProps & React$1.RefAttributes<HTMLUListElement>, "ref"> & React$1.RefAttributes<HTMLUListElement>>;
declare const NavigationMenuItem: React$1.ForwardRefExoticComponent<NavigationMenuPrimitive.NavigationMenuItemProps & React$1.RefAttributes<HTMLLIElement>>;
declare const navigationMenuTriggerStyle: (props?: class_variance_authority_types.ClassProp | undefined) => string;
declare const NavigationMenuTrigger: React$1.ForwardRefExoticComponent<Omit<NavigationMenuPrimitive.NavigationMenuTriggerProps & React$1.RefAttributes<HTMLButtonElement>, "ref"> & React$1.RefAttributes<HTMLButtonElement>>;
declare const NavigationMenuContent: React$1.ForwardRefExoticComponent<Omit<NavigationMenuPrimitive.NavigationMenuContentProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const NavigationMenuLink: React$1.ForwardRefExoticComponent<NavigationMenuPrimitive.NavigationMenuLinkProps & React$1.RefAttributes<HTMLAnchorElement>>;
declare const NavigationMenuViewport: React$1.ForwardRefExoticComponent<Omit<NavigationMenuPrimitive.NavigationMenuViewportProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const NavigationMenuIndicator: React$1.ForwardRefExoticComponent<Omit<NavigationMenuPrimitive.NavigationMenuIndicatorProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;

interface StepItem {
    title: string;
    description?: string | undefined;
    icon?: React$1.ReactNode | undefined;
    isError?: boolean | undefined;
}
interface StepperProps extends React$1.HTMLAttributes<HTMLDivElement> {
    steps: StepItem[];
    activeStep: number;
    onStepClick?: ((stepIndex: number) => void) | undefined;
    orientation?: "horizontal" | "vertical" | undefined;
    clickable?: boolean | undefined;
}
declare const Stepper: React$1.ForwardRefExoticComponent<StepperProps & React$1.RefAttributes<HTMLDivElement>>;

interface OnboardingPanelProps extends Omit<React$1.HTMLAttributes<HTMLElement>, "title"> {
    activeStep: number;
    steps: StepItem[];
    title: React$1.ReactNode;
    subtitle?: React$1.ReactNode | undefined;
    isFirstStep?: boolean | undefined;
    isLastStep?: boolean | undefined;
    nextDisabled?: boolean | undefined;
    nextLabel?: string | undefined;
    nextLoading?: boolean | undefined;
    onBack?: (() => void) | undefined;
    onContinue?: (() => void) | undefined;
    onStepChange?: ((stepIndex: number) => void) | undefined;
    onLogout?: (() => void) | undefined;
    children: React$1.ReactNode;
    scrollContainerRef?: React$1.RefObject<HTMLDivElement | null> | undefined;
}
declare function OnboardingPanel({ activeStep, steps, title, subtitle, isFirstStep, isLastStep, nextDisabled, nextLabel, nextLoading, onBack, onContinue, onStepChange, onLogout, children, scrollContainerRef, className, ...props }: OnboardingPanelProps): react_jsx_runtime.JSX.Element;

declare const Pagination: {
    ({ className, ...props }: React$1.ComponentProps<"nav">): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const PaginationContent: React$1.ForwardRefExoticComponent<Omit<React$1.DetailedHTMLProps<React$1.HTMLAttributes<HTMLUListElement>, HTMLUListElement>, "ref"> & React$1.RefAttributes<HTMLUListElement>>;
declare const PaginationItem: React$1.ForwardRefExoticComponent<Omit<React$1.DetailedHTMLProps<React$1.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>, "ref"> & React$1.RefAttributes<HTMLLIElement>>;
type PaginationLinkProps = {
    isActive?: boolean;
} & Pick<ButtonProps, "size"> & (({
    href: string;
} & React$1.ComponentProps<"a">) | ({
    href?: undefined;
} & React$1.ComponentProps<"button">));
declare const PaginationLink: {
    ({ className, isActive, size, ...props }: PaginationLinkProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};
type PaginationPreviousProps = {
    showText?: boolean;
} & PaginationLinkProps;
declare const PaginationPrevious: {
    ({ className, showText, ...props }: PaginationPreviousProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};
type PaginationNextProps = {
    showText?: boolean;
} & PaginationLinkProps;
declare const PaginationNext: {
    ({ className, showText, ...props }: PaginationNextProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const PaginationEllipsis: {
    ({ className, ...props }: React$1.ComponentProps<"span">): react_jsx_runtime.JSX.Element;
    displayName: string;
};
interface DataTablePaginationProps {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage?: number;
    onPageChange: (page: number) => void;
    showText?: boolean;
}
type StandalonePaginationProps = DataTablePaginationProps;
declare function DataTablePagination({ currentPage, totalPages, totalItems, itemsPerPage, onPageChange, showText, }: DataTablePaginationProps): react_jsx_runtime.JSX.Element;

interface PersonaOption {
    id: string;
    title: string;
    subtitle?: string;
    icon?: React$1.ReactNode;
    badge?: string;
}
interface PersonaDropdownProps {
    personas: PersonaOption[];
    activePersonaId?: string;
    onSelectPersona: (personaId: string) => void;
    triggerLabel?: string;
    className?: string;
}
declare function PersonaDropdown({ personas, activePersonaId, onSelectPersona, triggerLabel, className, }: PersonaDropdownProps): react_jsx_runtime.JSX.Element;

declare const TooltipProvider: React$1.FC<TooltipPrimitive.TooltipProviderProps>;
declare const Tooltip: React$1.FC<TooltipPrimitive.TooltipProps>;
declare const TooltipTrigger: React$1.ForwardRefExoticComponent<TooltipPrimitive.TooltipTriggerProps & React$1.RefAttributes<HTMLButtonElement>>;
declare const TooltipArrow: React$1.ForwardRefExoticComponent<Omit<TooltipPrimitive.TooltipArrowProps & React$1.RefAttributes<SVGSVGElement>, "ref"> & React$1.RefAttributes<SVGSVGElement>>;
declare const TooltipContent: React$1.ForwardRefExoticComponent<Omit<TooltipPrimitive.TooltipContentProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & {
    /** Show the directional arrow (default: true) */
    showArrow?: boolean;
} & React$1.RefAttributes<HTMLDivElement>>;

type SidebarContextProps = {
    state: "expanded" | "collapsed";
    open: boolean;
    setOpen: (open: boolean) => void;
    openMobile: boolean;
    setOpenMobile: (open: boolean) => void;
    isMobile: boolean;
    toggleSidebar: () => void;
};
declare function useSidebar(): SidebarContextProps;
/**
 * Props for the {@link SidebarProvider} component.
 *
 * In SSR frameworks (like Next.js App Router), `defaultOpen` must be set from the server-read cookie
 * (`cookies().get('sidebar_state')`) to avoid hydration mismatch if the cookie state differs from the default.
 */
interface SidebarProviderProps extends React$1.ComponentProps<"div"> {
    /**
     * Initial open state of the sidebar.
     *
     * In SSR frameworks (like Next.js App Router), `defaultOpen` must be set from the server-read cookie
     * (`cookies().get('sidebar_state')`) to avoid hydration mismatch if the cookie state differs from the default.
     *
     * @default true
     */
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}
/**
 * State provider for the Sidebar component and context.
 *
 * In SSR frameworks (like Next.js App Router), `defaultOpen` must be set from the server-read cookie
 * (`cookies().get('sidebar_state')`) to avoid hydration mismatch if the cookie state differs from the default.
 */
declare const SidebarProvider: React$1.ForwardRefExoticComponent<Omit<SidebarProviderProps, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const Sidebar: React$1.ForwardRefExoticComponent<Omit<React$1.ClassAttributes<HTMLDivElement> & React$1.HTMLAttributes<HTMLDivElement> & {
    side?: "left" | "right";
    variant?: "sidebar" | "floating" | "inset";
    collapsible?: "offcanvas" | "icon" | "none";
}, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const SidebarTrigger: React$1.ForwardRefExoticComponent<Omit<ButtonProps & React$1.RefAttributes<HTMLButtonElement>, "ref"> & React$1.RefAttributes<HTMLButtonElement>>;
declare const SidebarRail: React$1.ForwardRefExoticComponent<Omit<React$1.DetailedHTMLProps<React$1.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref"> & React$1.RefAttributes<HTMLButtonElement>>;
declare const SidebarInset: React$1.ForwardRefExoticComponent<Omit<React$1.DetailedHTMLProps<React$1.HTMLAttributes<HTMLElement>, HTMLElement>, "ref"> & React$1.RefAttributes<HTMLElement>>;
declare const SidebarInput: React$1.ForwardRefExoticComponent<Omit<Omit<React$1.DetailedHTMLProps<React$1.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "ref"> & React$1.RefAttributes<HTMLInputElement>, "ref"> & React$1.RefAttributes<HTMLInputElement>>;
declare const SidebarHeader: React$1.ForwardRefExoticComponent<Omit<React$1.DetailedHTMLProps<React$1.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const SidebarFooter: React$1.ForwardRefExoticComponent<Omit<React$1.DetailedHTMLProps<React$1.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const SidebarSeparator: React$1.ForwardRefExoticComponent<Omit<Omit<SeparatorPrimitive.SeparatorProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const SidebarContent: React$1.ForwardRefExoticComponent<Omit<React$1.DetailedHTMLProps<React$1.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const SidebarGroup: React$1.ForwardRefExoticComponent<Omit<React$1.DetailedHTMLProps<React$1.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const SidebarGroupLabel: React$1.ForwardRefExoticComponent<Omit<React$1.ClassAttributes<HTMLDivElement> & React$1.HTMLAttributes<HTMLDivElement> & {
    asChild?: boolean;
}, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const SidebarGroupAction: React$1.ForwardRefExoticComponent<Omit<React$1.ClassAttributes<HTMLButtonElement> & React$1.ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean;
}, "ref"> & React$1.RefAttributes<HTMLButtonElement>>;
declare const SidebarGroupContent: React$1.ForwardRefExoticComponent<Omit<React$1.DetailedHTMLProps<React$1.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const SidebarMenu: React$1.ForwardRefExoticComponent<Omit<React$1.DetailedHTMLProps<React$1.HTMLAttributes<HTMLUListElement>, HTMLUListElement>, "ref"> & React$1.RefAttributes<HTMLUListElement>>;
declare const SidebarMenuItem: React$1.ForwardRefExoticComponent<Omit<React$1.DetailedHTMLProps<React$1.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>, "ref"> & React$1.RefAttributes<HTMLLIElement>>;
declare const SidebarMenuButton: React$1.ForwardRefExoticComponent<Omit<React$1.ClassAttributes<HTMLButtonElement> & React$1.ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean;
    isActive?: boolean;
    tooltip?: string | React$1.ComponentProps<typeof TooltipContent>;
} & VariantProps<(props?: ({
    variant?: "default" | "outline" | null | undefined;
    size?: "default" | "sm" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string>, "ref"> & React$1.RefAttributes<HTMLButtonElement>>;
declare const SidebarMenuAction: React$1.ForwardRefExoticComponent<Omit<React$1.ClassAttributes<HTMLButtonElement> & React$1.ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean;
    showOnHover?: boolean;
}, "ref"> & React$1.RefAttributes<HTMLButtonElement>>;
declare const SidebarMenuBadge: React$1.ForwardRefExoticComponent<Omit<React$1.DetailedHTMLProps<React$1.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const SidebarMenuSkeleton: React$1.ForwardRefExoticComponent<Omit<React$1.ClassAttributes<HTMLDivElement> & React$1.HTMLAttributes<HTMLDivElement> & {
    showIcon?: boolean;
}, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const SidebarMenuSub: React$1.ForwardRefExoticComponent<Omit<React$1.DetailedHTMLProps<React$1.HTMLAttributes<HTMLUListElement>, HTMLUListElement>, "ref"> & React$1.RefAttributes<HTMLUListElement>>;
declare const SidebarMenuSubItem: React$1.ForwardRefExoticComponent<Omit<React$1.DetailedHTMLProps<React$1.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>, "ref"> & React$1.RefAttributes<HTMLLIElement>>;
declare const SidebarMenuSubButton: React$1.ForwardRefExoticComponent<Omit<React$1.ClassAttributes<HTMLAnchorElement> & React$1.AnchorHTMLAttributes<HTMLAnchorElement> & {
    asChild?: boolean;
    size?: "sm" | "md";
    isActive?: boolean;
}, "ref"> & React$1.RefAttributes<HTMLAnchorElement>>;

declare const Tabs: React$1.ForwardRefExoticComponent<TabsPrimitive.TabsProps & React$1.RefAttributes<HTMLDivElement>>;
declare const TabsList: React$1.ForwardRefExoticComponent<Omit<TabsPrimitive.TabsListProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const TabsTrigger: React$1.ForwardRefExoticComponent<Omit<TabsPrimitive.TabsTriggerProps & React$1.RefAttributes<HTMLButtonElement>, "ref"> & React$1.RefAttributes<HTMLButtonElement>>;
declare const TabsContent: React$1.ForwardRefExoticComponent<Omit<TabsPrimitive.TabsContentProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;

interface MobileNavItem {
    id: string;
    label: string;
    icon: React$1.ComponentType<{
        className?: string;
    }>;
    badge?: number | string;
}
interface MobileBottomNavProps {
    items: MobileNavItem[];
    activeId: string;
    onChange: (id: string) => void;
    moreAction?: {
        label?: string;
        onClick: () => void;
    };
    className?: string;
}
declare function MobileBottomNav({ items, activeId, onChange, moreAction, className, }: MobileBottomNavProps): react_jsx_runtime.JSX.Element;

declare const AlertDialog: React$1.FC<AlertDialogPrimitive.AlertDialogProps>;
declare const AlertDialogTrigger: React$1.ForwardRefExoticComponent<AlertDialogPrimitive.AlertDialogTriggerProps & React$1.RefAttributes<HTMLButtonElement>>;
declare const AlertDialogPortal: React$1.FC<AlertDialogPrimitive.AlertDialogPortalProps>;
declare const AlertDialogOverlay: React$1.ForwardRefExoticComponent<Omit<AlertDialogPrimitive.AlertDialogOverlayProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const AlertDialogContent: React$1.ForwardRefExoticComponent<Omit<AlertDialogPrimitive.AlertDialogContentProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const AlertDialogHeader: {
    ({ className, ...props }: React$1.HTMLAttributes<HTMLDivElement>): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const AlertDialogFooter: {
    ({ className, ...props }: React$1.HTMLAttributes<HTMLDivElement>): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const AlertDialogTitle: React$1.ForwardRefExoticComponent<Omit<AlertDialogPrimitive.AlertDialogTitleProps & React$1.RefAttributes<HTMLHeadingElement>, "ref"> & React$1.RefAttributes<HTMLHeadingElement>>;
declare const AlertDialogDescription: React$1.ForwardRefExoticComponent<Omit<AlertDialogPrimitive.AlertDialogDescriptionProps & React$1.RefAttributes<HTMLParagraphElement>, "ref"> & React$1.RefAttributes<HTMLParagraphElement>>;
declare const AlertDialogAction: React$1.ForwardRefExoticComponent<Omit<AlertDialogPrimitive.AlertDialogActionProps & React$1.RefAttributes<HTMLButtonElement>, "ref"> & React$1.RefAttributes<HTMLButtonElement>>;
declare const AlertDialogCancel: React$1.ForwardRefExoticComponent<Omit<AlertDialogPrimitive.AlertDialogCancelProps & React$1.RefAttributes<HTMLButtonElement>, "ref"> & React$1.RefAttributes<HTMLButtonElement>>;

declare const Command: React$1.ForwardRefExoticComponent<Omit<{
    children?: React$1.ReactNode;
} & Pick<Pick<React$1.DetailedHTMLProps<React$1.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof React$1.HTMLAttributes<HTMLDivElement>> & {
    ref?: React$1.Ref<HTMLDivElement>;
} & {
    asChild?: boolean;
}, "key" | "asChild" | keyof React$1.HTMLAttributes<HTMLDivElement>> & {
    label?: string;
    shouldFilter?: boolean;
    filter?: (value: string, search: string, keywords?: string[]) => number;
    defaultValue?: string;
    value?: string;
    onValueChange?: (value: string) => void;
    loop?: boolean;
    disablePointerSelection?: boolean;
    vimBindings?: boolean;
} & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const CommandDialog: ({ children, ...props }: DialogProps) => react_jsx_runtime.JSX.Element;
declare const CommandInput: React$1.ForwardRefExoticComponent<Omit<Omit<Pick<Pick<React$1.DetailedHTMLProps<React$1.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "key" | keyof React$1.InputHTMLAttributes<HTMLInputElement>> & {
    ref?: React$1.Ref<HTMLInputElement>;
} & {
    asChild?: boolean;
}, "key" | "asChild" | keyof React$1.InputHTMLAttributes<HTMLInputElement>>, "type" | "value" | "onChange"> & {
    value?: string;
    onValueChange?: (search: string) => void;
} & React$1.RefAttributes<HTMLInputElement>, "ref"> & React$1.RefAttributes<HTMLInputElement>>;
declare const CommandList: React$1.ForwardRefExoticComponent<Omit<{
    children?: React$1.ReactNode;
} & Pick<Pick<React$1.DetailedHTMLProps<React$1.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof React$1.HTMLAttributes<HTMLDivElement>> & {
    ref?: React$1.Ref<HTMLDivElement>;
} & {
    asChild?: boolean;
}, "key" | "asChild" | keyof React$1.HTMLAttributes<HTMLDivElement>> & {
    label?: string;
} & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const CommandEmpty: React$1.ForwardRefExoticComponent<Omit<{
    children?: React$1.ReactNode;
} & Pick<Pick<React$1.DetailedHTMLProps<React$1.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof React$1.HTMLAttributes<HTMLDivElement>> & {
    ref?: React$1.Ref<HTMLDivElement>;
} & {
    asChild?: boolean;
}, "key" | "asChild" | keyof React$1.HTMLAttributes<HTMLDivElement>> & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const CommandGroup: React$1.ForwardRefExoticComponent<Omit<{
    children?: React$1.ReactNode;
} & Omit<Pick<Pick<React$1.DetailedHTMLProps<React$1.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof React$1.HTMLAttributes<HTMLDivElement>> & {
    ref?: React$1.Ref<HTMLDivElement>;
} & {
    asChild?: boolean;
}, "key" | "asChild" | keyof React$1.HTMLAttributes<HTMLDivElement>>, "value" | "heading"> & {
    heading?: React$1.ReactNode;
    value?: string;
    forceMount?: boolean;
} & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const CommandSeparator: React$1.ForwardRefExoticComponent<Omit<Pick<Pick<React$1.DetailedHTMLProps<React$1.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof React$1.HTMLAttributes<HTMLDivElement>> & {
    ref?: React$1.Ref<HTMLDivElement>;
} & {
    asChild?: boolean;
}, "key" | "asChild" | keyof React$1.HTMLAttributes<HTMLDivElement>> & {
    alwaysRender?: boolean;
} & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const CommandItem: React$1.ForwardRefExoticComponent<Omit<{
    children?: React$1.ReactNode;
} & Omit<Pick<Pick<React$1.DetailedHTMLProps<React$1.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof React$1.HTMLAttributes<HTMLDivElement>> & {
    ref?: React$1.Ref<HTMLDivElement>;
} & {
    asChild?: boolean;
}, "key" | "asChild" | keyof React$1.HTMLAttributes<HTMLDivElement>>, "value" | "onSelect" | "disabled"> & {
    disabled?: boolean;
    onSelect?: (value: string) => void;
    value?: string;
    keywords?: string[];
    forceMount?: boolean;
} & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const CommandShortcut: {
    ({ className, ...props }: React$1.HTMLAttributes<HTMLSpanElement>): react_jsx_runtime.JSX.Element;
    displayName: string;
};

interface ConfirmDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    variant?: "default" | "destructive";
    isLoading?: boolean;
    onConfirm: () => void;
}
/**
 * ConfirmDialog — reusable "Are you sure?" pattern.
 *
 * Usage:
 * ```tsx
 * <ConfirmDialog
 *   open={open}
 *   onOpenChange={setOpen}
 *   title="Delete Record?"
 *   description="This action cannot be undone."
 *   variant="destructive"
 *   confirmLabel="Delete"
 *   isLoading={isDeleting}
 *   onConfirm={handleDelete}
 * />
 * ```
 */
declare function ConfirmDialog({ open, onOpenChange, title, description, confirmLabel, cancelLabel, variant, isLoading, onConfirm, }: ConfirmDialogProps): react_jsx_runtime.JSX.Element;

declare const ContextMenu: React$1.FC<ContextMenuPrimitive.ContextMenuProps>;
declare const ContextMenuTrigger: React$1.ForwardRefExoticComponent<ContextMenuPrimitive.ContextMenuTriggerProps & React$1.RefAttributes<HTMLSpanElement>>;
declare const ContextMenuGroup: React$1.ForwardRefExoticComponent<ContextMenuPrimitive.ContextMenuGroupProps & React$1.RefAttributes<HTMLDivElement>>;
declare const ContextMenuPortal: React$1.FC<ContextMenuPrimitive.ContextMenuPortalProps>;
declare const ContextMenuSub: React$1.FC<ContextMenuPrimitive.ContextMenuSubProps>;
declare const ContextMenuRadioGroup: React$1.ForwardRefExoticComponent<ContextMenuPrimitive.ContextMenuRadioGroupProps & React$1.RefAttributes<HTMLDivElement>>;
declare const ContextMenuSubTrigger: React$1.ForwardRefExoticComponent<Omit<ContextMenuPrimitive.ContextMenuSubTriggerProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & {
    inset?: boolean;
} & React$1.RefAttributes<HTMLDivElement>>;
declare const ContextMenuSubContent: React$1.ForwardRefExoticComponent<Omit<ContextMenuPrimitive.ContextMenuSubContentProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const ContextMenuContent: React$1.ForwardRefExoticComponent<Omit<ContextMenuPrimitive.ContextMenuContentProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const ContextMenuItem: React$1.ForwardRefExoticComponent<Omit<ContextMenuPrimitive.ContextMenuItemProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & {
    inset?: boolean;
} & React$1.RefAttributes<HTMLDivElement>>;
declare const ContextMenuCheckboxItem: React$1.ForwardRefExoticComponent<Omit<ContextMenuPrimitive.ContextMenuCheckboxItemProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const ContextMenuRadioItem: React$1.ForwardRefExoticComponent<Omit<ContextMenuPrimitive.ContextMenuRadioItemProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const ContextMenuLabel: React$1.ForwardRefExoticComponent<Omit<ContextMenuPrimitive.ContextMenuLabelProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & {
    inset?: boolean;
} & React$1.RefAttributes<HTMLDivElement>>;
declare const ContextMenuSeparator: React$1.ForwardRefExoticComponent<Omit<ContextMenuPrimitive.ContextMenuSeparatorProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const ContextMenuShortcut: {
    ({ className, ...props }: React$1.HTMLAttributes<HTMLSpanElement>): react_jsx_runtime.JSX.Element;
    displayName: string;
};

interface CreateEntityPanelProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: React$1.ReactNode;
    description?: React$1.ReactNode;
    icon?: React$1.ReactNode;
    onSave?: () => void;
    isSaving?: boolean;
    saveLabel?: string;
    cancelLabel?: string;
    readOnly?: boolean;
    children: React$1.ReactNode;
    size?: "default" | "sm" | "lg" | "xl";
}
declare function CreateEntityPanel({ open, onOpenChange, title, description, icon, onSave, isSaving, saveLabel, cancelLabel, readOnly, children, size, }: CreateEntityPanelProps): react_jsx_runtime.JSX.Element;

declare const Drawer: {
    ({ shouldScaleBackground, ...props }: React$1.ComponentProps<typeof Drawer$1.Root>): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const DrawerTrigger: React$1.ForwardRefExoticComponent<DialogPrimitive.DialogTriggerProps & React$1.RefAttributes<HTMLButtonElement>>;
declare const DrawerPortal: typeof vaul.Portal;
declare const DrawerClose: React$1.ForwardRefExoticComponent<DialogPrimitive.DialogCloseProps & React$1.RefAttributes<HTMLButtonElement>>;
declare const DrawerOverlay: React$1.ForwardRefExoticComponent<Omit<Omit<DialogPrimitive.DialogOverlayProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const DrawerContent: React$1.ForwardRefExoticComponent<Omit<Omit<DialogPrimitive.DialogContentProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const DrawerHeader: {
    ({ className, ...props }: React$1.HTMLAttributes<HTMLDivElement>): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const DrawerFooter: {
    ({ className, ...props }: React$1.HTMLAttributes<HTMLDivElement>): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const DrawerTitle: React$1.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogTitleProps & React$1.RefAttributes<HTMLHeadingElement>, "ref"> & React$1.RefAttributes<HTMLHeadingElement>>;
declare const DrawerDescription: React$1.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogDescriptionProps & React$1.RefAttributes<HTMLParagraphElement>, "ref"> & React$1.RefAttributes<HTMLParagraphElement>>;

declare const DropdownMenu: React$1.FC<DropdownMenuPrimitive.DropdownMenuProps>;
declare const DropdownMenuTrigger: React$1.ForwardRefExoticComponent<DropdownMenuPrimitive.DropdownMenuTriggerProps & React$1.RefAttributes<HTMLButtonElement>>;
declare const DropdownMenuGroup: React$1.ForwardRefExoticComponent<DropdownMenuPrimitive.DropdownMenuGroupProps & React$1.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuPortal: React$1.FC<DropdownMenuPrimitive.DropdownMenuPortalProps>;
declare const DropdownMenuSub: React$1.FC<DropdownMenuPrimitive.DropdownMenuSubProps>;
declare const DropdownMenuRadioGroup: React$1.ForwardRefExoticComponent<DropdownMenuPrimitive.DropdownMenuRadioGroupProps & React$1.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuSubTrigger: React$1.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuSubTriggerProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & {
    inset?: boolean;
} & React$1.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuSubContent: React$1.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuSubContentProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuContent: React$1.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuContentProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuItem: React$1.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuItemProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & {
    inset?: boolean;
} & React$1.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuCheckboxItem: React$1.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuCheckboxItemProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuRadioItem: React$1.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuRadioItemProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuLabel: React$1.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuLabelProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & {
    inset?: boolean;
} & React$1.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuSeparator: React$1.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuSeparatorProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuShortcut: {
    ({ className, ...props }: React$1.HTMLAttributes<HTMLSpanElement>): react_jsx_runtime.JSX.Element;
    displayName: string;
};

declare const HoverCard: React$1.FC<HoverCardPrimitive.HoverCardProps>;
declare const HoverCardTrigger: React$1.ForwardRefExoticComponent<HoverCardPrimitive.HoverCardTriggerProps & React$1.RefAttributes<HTMLAnchorElement>>;
declare const HoverCardContent: React$1.ForwardRefExoticComponent<Omit<HoverCardPrimitive.HoverCardContentProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;

declare const Sheet: React$1.FC<DialogPrimitive.DialogProps>;
declare const SheetTrigger: React$1.ForwardRefExoticComponent<DialogPrimitive.DialogTriggerProps & React$1.RefAttributes<HTMLButtonElement>>;
declare const SheetClose: React$1.ForwardRefExoticComponent<DialogPrimitive.DialogCloseProps & React$1.RefAttributes<HTMLButtonElement>>;
declare const SheetPortal: React$1.FC<DialogPrimitive.DialogPortalProps>;
declare const SheetOverlay: React$1.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogOverlayProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const sheetVariants: (props?: ({
    side?: "left" | "right" | "bottom" | "top" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface SheetContentProps extends React$1.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>, VariantProps<typeof sheetVariants> {
}
declare const SheetContent: React$1.ForwardRefExoticComponent<SheetContentProps & React$1.RefAttributes<HTMLDivElement>>;
declare const SheetHeader: {
    ({ className, ...props }: React$1.HTMLAttributes<HTMLDivElement>): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const SheetFooter: {
    ({ className, ...props }: React$1.HTMLAttributes<HTMLDivElement>): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const SheetTitle: React$1.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogTitleProps & React$1.RefAttributes<HTMLHeadingElement>, "ref"> & React$1.RefAttributes<HTMLHeadingElement>>;
declare const SheetDescription: React$1.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogDescriptionProps & React$1.RefAttributes<HTMLParagraphElement>, "ref"> & React$1.RefAttributes<HTMLParagraphElement>>;

declare const Alert: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLDivElement> & VariantProps<(props?: ({
    variant?: "info" | "success" | "warning" | "default" | "destructive" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string> & {
    /** Show an ✕ dismiss button */
    onDismiss?: () => void;
} & React$1.RefAttributes<HTMLDivElement>>;
declare const AlertTitle: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLHeadingElement> & React$1.RefAttributes<HTMLParagraphElement>>;
declare const AlertDescription: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLParagraphElement> & React$1.RefAttributes<HTMLParagraphElement>>;

interface AppSplashScreenProps {
    title?: string;
    subtitle?: string;
    message?: string;
    icon?: React$1.ReactNode;
    className?: string;
}
declare function AppSplashScreen({ title, subtitle, message, icon, className, }: AppSplashScreenProps): react_jsx_runtime.JSX.Element;

interface BannerProps extends React$1.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "info" | "success" | "warning" | "destructive";
    icon?: React$1.ReactNode;
    title?: string;
    action?: {
        label: string;
        onClick: () => void;
    };
    dismissible?: boolean;
    onClose?: () => void;
    sticky?: boolean;
}
declare const Banner: React$1.ForwardRefExoticComponent<BannerProps & React$1.RefAttributes<HTMLDivElement>>;

interface CopyButtonProps extends Omit<ButtonProps, "onClick"> {
    value: string;
    timeout?: number;
    onCopy?: () => void;
    showText?: boolean;
    copiedText?: string;
    defaultText?: string;
}
declare const CopyButton: React$1.ForwardRefExoticComponent<CopyButtonProps & React$1.RefAttributes<HTMLButtonElement>>;

declare function Empty({ className, ...props }: React.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function EmptyHeader({ className, ...props }: React.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare const emptyMediaVariants: (props?: ({
    variant?: "default" | "icon" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare function EmptyMedia({ className, variant, ...props }: React.ComponentProps<"div"> & VariantProps<typeof emptyMediaVariants>): react_jsx_runtime.JSX.Element;
declare function EmptyTitle({ className, ...props }: React.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function EmptyDescription({ className, ...props }: React.ComponentProps<"p">): react_jsx_runtime.JSX.Element;
declare function EmptyContent({ className, ...props }: React.ComponentProps<"div">): react_jsx_runtime.JSX.Element;

interface EmptyStateProps {
    icon?: React$1.ReactNode | React$1.ComponentType<{
        className?: string;
    }>;
    title: React$1.ReactNode;
    description?: React$1.ReactNode;
    actionLabel?: React$1.ReactNode;
    actionIcon?: React$1.ReactNode;
    onAction?: () => void;
    bordered?: boolean;
    className?: string;
}
declare function EmptyState({ icon, title, description, actionLabel, actionIcon, onAction, bordered, className, }: EmptyStateProps): react_jsx_runtime.JSX.Element;

interface ErrorStateProps extends Omit<React$1.HTMLAttributes<HTMLDivElement>, "title"> {
    title: React$1.ReactNode;
    description?: React$1.ReactNode;
    actionLabel?: React$1.ReactNode;
    onAction?: () => void;
}
declare function ErrorState({ title, description, actionLabel, onAction, className, ...props }: ErrorStateProps): react_jsx_runtime.JSX.Element;

interface ImpersonationBannerProps extends React$1.HTMLAttributes<HTMLDivElement> {
    impersonatedUser: {
        name?: string;
        email?: string;
        role?: string;
        orgName?: string;
    };
    onEndImpersonation: () => void;
    isLoading?: boolean;
}
declare function ImpersonationBanner({ impersonatedUser, onEndImpersonation, isLoading, className, ...props }: ImpersonationBannerProps): react_jsx_runtime.JSX.Element;

interface InstallPwaBannerProps {
    appName?: string;
    appDescription?: string;
    appIcon?: React$1.ReactNode;
    storageKey?: string;
    className?: string;
    onInstall?: () => void;
    onDismiss?: () => void;
}
declare function InstallPwaBanner({ appName, appDescription, appIcon, storageKey, className, onInstall, onDismiss, }: InstallPwaBannerProps): react_jsx_runtime.JSX.Element | null;

interface LoadingStateProps extends React$1.HTMLAttributes<HTMLDivElement> {
    label?: string;
    spinnerSize?: number;
}
declare function LoadingState({ label, spinnerSize, className, ...props }: LoadingStateProps): react_jsx_runtime.JSX.Element;

type OnboardingNoticeTone = "error" | "info" | "success" | "warning";
interface OnboardingNoticeProps extends React$1.HTMLAttributes<HTMLDivElement> {
    message?: React$1.ReactNode;
    tone?: OnboardingNoticeTone;
    children?: React$1.ReactNode;
}
declare function OnboardingNotice({ message, tone, children, className, ...props }: OnboardingNoticeProps): react_jsx_runtime.JSX.Element;

declare const progressVariants: (props?: ({
    variant?: "success" | "warning" | "default" | "danger" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface ProgressProps extends React$1.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>, VariantProps<typeof progressVariants> {
    /** Show a shimmer animation over the progress bar */
    shimmer?: boolean;
    /** Show a percentage label to the right of the bar */
    showLabel?: boolean;
}
declare const Progress: React$1.ForwardRefExoticComponent<ProgressProps & React$1.RefAttributes<HTMLDivElement>>;

interface ProgressRingProps extends React$1.HTMLAttributes<HTMLDivElement> {
    percentage: number;
    size?: number;
    strokeWidth?: number;
    color?: string;
    showLabel?: boolean;
}
declare function ProgressRing({ percentage, size, strokeWidth, className, color: colorOverride, showLabel, ...props }: ProgressRingProps): react_jsx_runtime.JSX.Element;

interface RoleEmptyStateProps {
    /** Main title text */
    title?: string;
    /** Subtitle / description text */
    subtitle?: string;
    /** Lucide icon to display */
    icon?: LucideIcon;
    /** CTA button label. If omitted, no button is shown */
    actionLabel?: string;
    /** CTA click handler. Defaults to opening the help Sheet */
    onAction?: () => void;
    /** Use a primary (filled) button style for the CTA */
    isPrimary?: boolean;
    /** Show a skeleton loading state for `loadingMs` milliseconds. Defaults to 0 (no artificial delay). */
    loadingMs?: number;
    /** Help sheet title */
    helpTitle?: string;
    /** Help sheet description */
    helpDescription?: string;
    /** Optional additional help links to render in the sheet */
    helpLinks?: {
        label: string;
        href: string;
    }[];
}
/**
 * RoleEmptyState — A rich empty-state card with optional skeleton loader,
 * contextual CTA button, and a slide-out help Sheet with video/docs links.
 *
 * Designed to be fully portable: all role-specific text is supplied via props.
 * In consuming applications, wrap it once per role in a `RoleEmptyState` factory component
 * that reads `useAuth` and calls this with the appropriate props.
 */
declare function RoleEmptyState({ title, subtitle, icon: Icon, actionLabel, onAction, isPrimary, loadingMs, helpTitle, helpDescription, helpLinks, }: RoleEmptyStateProps): react_jsx_runtime.JSX.Element;

/**
 * Skeleton — pulsing placeholder for loading states.
 *
 * Uses `bg-muted` by default. The pulse animation is handled
 * by Tailwind's `animate-pulse` which already uses CSS keyframes.
 *
 * Phase 4 fix: increased contrast slightly using `bg-muted` (was already correct)
 * and ensured `rounded-md` is always applied. Added `aria-hidden="true"` for screen readers.
 */
declare function Skeleton({ className, ...props }: React$1.HTMLAttributes<HTMLDivElement>): react_jsx_runtime.JSX.Element;

declare function SkeletonList({ count }: {
    count?: number;
}): react_jsx_runtime.JSX.Element;

type ToasterProps = React.ComponentProps<typeof Toaster$2>;
declare const Toaster$1: ({ ...props }: ToasterProps) => react_jsx_runtime.JSX.Element;

declare function Spinner({ className, ...props }: LucideProps): react_jsx_runtime.JSX.Element;

interface ConfettiCannonOptions {
    duration?: number;
    intervalMs?: number;
    baseParticleCount?: number;
    colors: string[];
    startVelocity?: number;
    spread?: number;
    ticks?: number;
    zIndex?: number;
    disableForReducedMotion?: boolean;
    getOrigins?: (random: (min: number, max: number) => number) => Array<{
        x: number;
        y: number;
    }>;
}
/**
 * Reusable animated confetti runner that orchestrates periodic particle bursts over a duration.
 */
declare function runConfettiAnimation(options: ConfettiCannonOptions): ReturnType<typeof setInterval>;
/**
 * Trigger a celebration confetti cannon with emerald, blue, and amber particles.
 */
declare const triggerSuccessConfetti: () => number;
/**
 * Trigger an immediate localized micro confetti burst at given screen coordinates.
 */
declare const triggerMicroConfetti: (x: number, y: number) => void;
/**
 * Trigger an emerald green themed confetti celebration.
 */
declare const triggerEmeraldConfetti: () => number;
/**
 * Trigger a corporate navy and gold cascading confetti celebration.
 */
declare const triggerGovernanceConfetti: () => number;

declare function Toaster(): react_jsx_runtime.JSX.Element;

interface WorkspaceBannerProps extends Omit<React$1.HTMLAttributes<HTMLDivElement>, "title"> {
    title: React$1.ReactNode;
    subtitle?: React$1.ReactNode;
    icon?: React$1.ComponentType<{
        className?: string;
    }>;
    gradientClassName?: string;
}
declare function WorkspaceBanner({ title, subtitle, icon: Icon, gradientClassName, className, ...props }: WorkspaceBannerProps): react_jsx_runtime.JSX.Element;

type CalendarProps = React$1.ComponentProps<typeof DayPicker> & {
    showTodayDot?: boolean;
};
declare function Calendar({ className, classNames, showOutsideDays, showTodayDot, components, ...props }: CalendarProps): react_jsx_runtime.JSX.Element;
declare namespace Calendar {
    var displayName: string;
}

declare const Popover: React$1.FC<PopoverPrimitive.PopoverProps>;
declare const PopoverTrigger: React$1.ForwardRefExoticComponent<PopoverPrimitive.PopoverTriggerProps & React$1.RefAttributes<HTMLButtonElement>>;
declare const PopoverAnchor: React$1.ForwardRefExoticComponent<PopoverPrimitive.PopoverAnchorProps & React$1.RefAttributes<HTMLDivElement>>;
declare const PopoverClose: React$1.ForwardRefExoticComponent<PopoverPrimitive.PopoverCloseProps & React$1.RefAttributes<HTMLButtonElement>>;
declare const PopoverContent: React$1.ForwardRefExoticComponent<Omit<PopoverPrimitive.PopoverContentProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;

type CalendarComponentProps = React$1.ComponentProps<typeof Calendar>;
type PopoverContentProps = React$1.ComponentProps<typeof PopoverContent>;
interface DatePickerWithRangeProps extends Omit<React$1.HTMLAttributes<HTMLDivElement>, "onSelect"> {
    date?: DateRange | undefined;
    defaultDate?: DateRange | undefined;
    setDate?: ((date: DateRange | undefined) => void) | undefined;
    onSelect?: ((date: DateRange | undefined) => void) | undefined;
    variant?: ButtonProps["variant"] | undefined;
    placeholder?: string | undefined;
    triggerClassName?: string | undefined;
    calendarClassName?: string | undefined;
    cancelLabel?: string | undefined;
    applyLabel?: string | undefined;
    align?: PopoverContentProps["align"] | undefined;
    numberOfMonths?: number | undefined;
    disabled?: CalendarComponentProps["disabled"] | undefined;
    defaultMonth?: Date | undefined;
    showOutsideDays?: CalendarComponentProps["showOutsideDays"] | undefined;
    triggerAriaLabel?: string | undefined;
    dialogAriaLabel?: string | undefined;
}
declare const DatePickerWithRange: React$1.ForwardRefExoticComponent<DatePickerWithRangeProps & React$1.RefAttributes<HTMLDivElement>>;

declare function ItemGroup({ className, ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function ItemSeparator({ className, ...props }: React$1.ComponentProps<typeof Separator>): react_jsx_runtime.JSX.Element;
declare const itemVariants: (props?: ({
    variant?: "default" | "outline" | "muted" | null | undefined;
    size?: "default" | "sm" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare function Item({ className, variant, size, asChild, ...props }: React$1.ComponentProps<"div"> & VariantProps<typeof itemVariants> & {
    asChild?: boolean;
}): react_jsx_runtime.JSX.Element;
declare const itemMediaVariants: (props?: ({
    variant?: "image" | "default" | "icon" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare function ItemMedia({ className, variant, ...props }: React$1.ComponentProps<"div"> & VariantProps<typeof itemMediaVariants>): react_jsx_runtime.JSX.Element;
declare function ItemContent({ className, ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function ItemTitle({ className, ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function ItemDescription({ className, ...props }: React$1.ComponentProps<"p">): react_jsx_runtime.JSX.Element;
declare function ItemActions({ className, ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function ItemHeader({ className, ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function ItemFooter({ className, ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;

/**
 * Kbd — A single keyboard key pill.
 *
 * @example
 * <Kbd>⌘</Kbd>  →  renders a single ⌘ key badge
 */
declare function Kbd({ className, ...props }: React$1.ComponentProps<"kbd">): react_jsx_runtime.JSX.Element;
/**
 * KbdGroup — Wraps multiple Kbd pills and a + separator into one row.
 *
 * @example
 * <KbdGroup><Kbd>⌘</Kbd><Kbd>K</Kbd></KbdGroup>
 */
declare function KbdGroup({ className, ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
interface KbdShortcutProps {
    /**
     * The key(s) to display, e.g. `["K"]` or `["Shift", "P"]`.
     * Each key renders as its own pill.
     */
    keys: string[];
    /**
     * When true, prepends the platform modifier:
     *   - macOS  → ⌘
     *   - Windows / Linux → Ctrl
     */
    meta?: boolean;
    /**
     * Explicit OS override. Auto-detected from `navigator.platform` when omitted.
     */
    os?: "mac" | "windows" | "linux";
    className?: string;
}
/**
 * KbdShortcut — OS-aware keyboard shortcut renderer.
 * Every key gets its own <Kbd> pill, separated by a `+` glyph.
 *
 * @example
 * // Renders [⌘] + [K] on mac  /  [Ctrl] + [K] on windows
 * <KbdShortcut keys={["K"]} meta />
 *
 * @example
 * // Explicit OS
 * <KbdShortcut keys={["Shift", "P"]} meta os="windows" />
 */
declare function KbdShortcut({ keys, meta, os, className }: KbdShortcutProps): react_jsx_runtime.JSX.Element;

interface LanguageOption<T extends string = string> {
    code: T;
    name: string;
    nativeName?: string;
}
type SupportedLanguage = "en" | "es" | "fr" | "de" | "ja" | "zh" | (string & {});
declare const DEFAULT_LANGUAGES: LanguageOption[];
interface LanguageToggleProps<T extends string = string> {
    language: T;
    setLanguage: (lang: T) => void;
    languages?: LanguageOption<T>[];
    className?: string;
}
/**
 * LanguageToggle — portable language-switcher dropdown.
 *
 * Configurable with custom languages list or defaults to standard international locales.
 *
 * Usage:
 * ```tsx
 * <LanguageToggle language={language} setLanguage={setLanguage} />
 * ```
 */
declare function LanguageToggle<T extends string = string>({ language, setLanguage, languages, className, }: LanguageToggleProps<T>): react_jsx_runtime.JSX.Element;

declare const typographyVariants: (props?: ({
    variant?: "caption" | "code" | "h1" | "h2" | "h3" | "h4" | "p" | "small" | "muted" | "lead" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type TypographyVariant = NonNullable<VariantProps<typeof typographyVariants>["variant"]>;
type TypographyOwnProps = Omit<VariantProps<typeof typographyVariants>, "variant"> & {
    as?: React$1.ElementType;
    variant?: TypographyVariant;
    children?: React$1.ReactNode;
};
type TypographyProps<T extends React$1.ElementType> = TypographyOwnProps & Omit<React$1.ComponentPropsWithoutRef<T>, keyof TypographyOwnProps>;
type TypographyComponent = <T extends React$1.ElementType = "p">(props: TypographyProps<T>) => React$1.ReactElement | null;
declare const Typography: TypographyComponent;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger, ActiveFilterBadge, type ActiveFilterBadgeProps, Alert, AlertDescription, AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, AlertDialogPortal, AlertDialogTitle, AlertDialogTrigger, AlertTitle, AmountSummaryCard, type AmountSummaryCardProps, type AmountSummaryDeductionItem, type AmountSummaryItem, type AmountSummaryTaxItem, AnalyticsAdapter, AnalyticsEvent, type AppLocale, AppSplashScreen, type AppSplashScreenProps, AspectRatio, AsyncSelect, type AsyncSelectProps, type AuditLogger, type AuditTrailPayload, Avatar, AvatarFallback, AvatarGroup, AvatarImage, Banner, type BannerProps, type BaseQueuedMutation, type BeforeInstallPromptEvent, BilingualTooltip, type BilingualTooltipProps, type BlobStorageConfig, type BlobUploadResult, Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, Button, ButtonGroup, ButtonGroupSeparator, ButtonGroupText, ButtonProps, Calendar, type CalendarProps, Carousel, type CarouselApi, CarouselContent, CarouselDots, CarouselItem, CarouselNext, CarouselPrevious, type ChartConfig, ChartContainer, type ChartContainerProps, ChartLegend, ChartLegendContent, type ChartLegendContentProps, ChartStyle, ChartTooltip, ChartTooltipContent, type ChartTooltipContentProps, Checkbox, Collapsible, CollapsibleCard, CollapsibleCardContent, CollapsibleCardTrigger, CollapsibleContent, CollapsibleTrigger, Combobox, type ComboboxOption, type ComboboxProps, Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut, CompensationRangeDisplay, type CompensationRangeDisplayProps, ComponentContext, type ConfettiCannonOptions, ConfirmDialog, type ConfirmDialogProps, ConsoleAdapter, type ConsoleAdapterOptions, ContextMenu, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuGroup, ContextMenuItem, ContextMenuLabel, ContextMenuPortal, ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuShortcut, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger, CopyButton, type CopyButtonProps, CreateEntityPanel, type CreateEntityPanelProps, DEFAULT_LANGUAGES, DataTablePagination, DatePickerWithRange, type DatePickerWithRangeProps, type DateValue, DetailGrid, type DetailGridProps, DomTracker, type DomTrackerOptions, Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerPortal, DrawerTitle, DrawerTrigger, DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger, Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyState, type EmptyStateProps, EmptyTitle, ErrorBoundary, type ErrorBoundaryProps, type ErrorBoundaryState, ErrorState, type ErrorStateProps, type ExportColumn, type ExportFormat, type ExportOptions, type FallbackProps, type FallbackRender, Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet, FieldTitle, type FileItem, FileUpload, type FileUploadProps, type FilterOption, FilterSelect, type FilterSelectProps, Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, GoogleAnalyticsAdapter, type GoogleAnalyticsAdapterOptions, type HapticType, HoverCard, HoverCardContent, HoverCardTrigger, HttpAdapter, type HttpAdapterOptions, ImageViewer, type ImageViewerProps, ImpersonationBanner, type ImpersonationBannerProps, type InfoItem, InfoList, type InfoListProps, Input, InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText, InputGroupTextarea, InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot, InstallPwaBanner, type InstallPwaBannerProps, Item, ItemActions, ItemContent, ItemDescription, ItemFooter, ItemGroup, ItemHeader, ItemMedia, ItemSeparator, ItemTitle, KPICard, type KPICardProps, type KPICardTone, type KanbanCardItem, type KanbanColumn, Kbd, KbdGroup, KbdShortcut, Label, type LanguageOption, LanguageToggle, type LanguageToggleProps, type LedgerEntry, type LineItem, LineItemsCard, type LineItemsCardProps, LoadingState, type LoadingStateProps, type MaskOptions, MatchScoreGauge, type MatchScoreGaugeProps, Menubar, MenubarCheckboxItem, MenubarContent, MenubarGroup, MenubarItem, MenubarLabel, MenubarMenu, MenubarPortal, MenubarRadioGroup, MenubarRadioItem, MenubarSeparator, MenubarShortcut, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger, KPICard as MetricCard, type KPICardProps as MetricCardProps, DetailGrid as MetricGrid, type DetailGridProps as MetricGridProps, type MetricRangeBreakdownItem, MetricRangeDisplay, type MetricRangeDisplayProps, MetricTicker, type MetricTickerProps, MetricVerificationCard, type MetricVerificationCardProps, type MetricVerificationItem, MixpanelAdapter, type MixpanelAdapterOptions, type MixpanelClient, MobileBottomNav, type MobileBottomNavProps, type MobileNavItem, MultiSelect, type MultiSelectProps, NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, NavigationMenuViewport, type NumericValue, type OfflineQueueState, OnboardingNotice, type OnboardingNoticeProps, type OnboardingNoticeTone, OnboardingPanel, type OnboardingPanelProps, type Option, type PWAInstallResult, PageHeader, type PageHeaderProps, PageHeaderSkeleton, Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, type PaginationLinkProps, PaginationNext, type PaginationNextProps, PaginationPrevious, type PaginationPreviousProps, PaymentLedger, type PaymentLedgerProps, PersonaDropdown, type PersonaDropdownProps, type PersonaOption, PipelineKanban, type PipelineKanbanProps, type PlatformInfo, Popover, PopoverAnchor, PopoverClose, PopoverContent, PopoverTrigger, Progress, ProgressRing, type ProgressRingProps, ProofOfWorkCard, type ProofOfWorkCardProps, type ProofOfWorkItem, QuotaCard, type QuotaCardProps, REGEX_BANK_ACCOUNT, REGEX_EMAIL, REGEX_PHONE, REGEX_POSTAL_CODE, REGEX_ROUTING_CODE, REGEX_TAX_ID, REGEX_URL, type RadarBlip, RadarSweep, type RadarSweepProps, RadioGroup, RadioGroupItem, type RegionCity, type RegionOption, type RegionState, ResizableHandle, ResizablePanel, ResizablePanelGroup, type ResizablePanelGroupProps, RoleEmptyState, type RoleEmptyStateProps, type SalaryRangeBreakdown, SalaryRangeDisplay, type SalaryRangeDisplayProps, ScrollArea, ScrollBar, SearchField, type SearchFieldProps, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, SelectValue, type SensitiveDataType, Separator, Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetOverlay, SheetPortal, SheetTitle, SheetTrigger, Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInput, SidebarInset, SidebarMenu, SidebarMenuAction, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, SidebarMenuSkeleton, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarProvider, type SidebarProviderProps, SidebarRail, SidebarSeparator, SidebarTrigger, Skeleton, SkeletonList, type SkillTag, SkillTagCloud, type SkillTagCloudProps, Slider, Toaster$1 as Sonner, Toaster$1 as SonnerToaster, Spinner, type StandalonePaginationProps, DetailGrid as StatGrid, type DetailGridProps as StatGridProps, StatusBadge, type StatusBadgeProps, type StatusValue, type StepItem, Stepper, type StepperProps, type SupportedLanguage, Switch, Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow, Tabs, TabsContent, TabsList, TabsTrigger, Textarea, type TickerItem, Timeline, type TimelineItem, type TimelineProps, Toast$1 as Toast, ToastAction, type ToastActionElement, ToastClose, ToastDescription, type ToastProps, ToastProvider, ToastTitle, ToastViewport, Toaster, Toggle, ToggleGroup, ToggleGroupItem, Tooltip, TooltipArrow, TooltipContent, TooltipProvider, TooltipTrigger, Typography, type UseOfflineQueueOptions, VALIDATION_MESSAGES, VALIDATION_MESSAGES_HI, type ValidationLanguage, type ValidationOptions, type ValidationResult, type WithAuditTrailProps, WorkspaceBanner, type WorkspaceBannerProps, avatarVariants, buttonGroupVariants, cleanPhoneNumber, clearBlobStorageConfig, cn, downloadFileFromStorage, downloadFileSecurely, downloadFromBackend, exportData, exportToCSV, fetchBlobStorageConfig, filterCitiesByState, formatBytes, formatCurrency, formatDate, formatDateTime, formatFileSize, formatLocalizedDate, formatLocalizedDateTime, formatLocalizedNumber, formatNumber, formatPercent, formatQuantity, formatRelativeTime, formatWeight, getPlatformInfo, isValidEmail, isValidPhone, maskSensitiveValue, nativeShare, navigationMenuTriggerStyle, reducer, runConfettiAnimation, setBlobStorageApiBase, setGlobalAuditLogger, toCityOptions, toStateOptions, toast, toggleVariants, triggerEmeraldConfetti, triggerGovernanceConfetti, triggerHaptic, triggerMicroConfetti, triggerSuccessConfetti, typographyVariants, uploadFileToStorage, useDebounce, useErrorBoundary, useFormField, useIsMobile, useLocalStorage, useOfflineQueue, usePWAInstall, usePlatform, useSidebar, useToast, validateBankAccount, validateDateRange, validateEmail, validatePassword, validatePhone, validatePositiveNumber, validatePostalCode, validateRequired, validateRoutingCode, validateTaxId, validateTimeRange, validateUrl, withAuditTrail, withErrorBoundary };
