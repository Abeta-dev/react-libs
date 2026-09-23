/**
 * @file whatsapp.ts — WhatsApp Client Communication & Deep-Linking Utilities.
 * Enables 1-tap direct WhatsApp communication via wa.me and native app protocols
 * without requiring expensive third-party messaging gateway quotas.
 */

import { cleanPhoneNumber } from "../../../src/lib/validators";

/**
 * Normalizes any phone number into an international format ready for WhatsApp.
 * Default country prefix is 91 (India) if a 10-digit number is provided.
 */
export function formatPhoneForWhatsApp(phone: string, defaultCountryCode = '91'): string {
  if (!phone) return '';
  const digits = cleanPhoneNumber(phone);
  if (!digits) return '';

  if (digits.length === 10) {
    return `${defaultCountryCode}${digits}`;
  }
  return digits;
}

/**
 * Generates an HTTPS web click-to-chat URL: https://wa.me/<phone>?text=<encoded>
 */
export function generateWhatsAppUrl(phone?: string, message?: string, defaultCountryCode = '91'): string {
  const cleanPhone = phone ? formatPhoneForWhatsApp(phone, defaultCountryCode) : '';
  const encodedText = message ? encodeURIComponent(message) : '';

  if (cleanPhone && encodedText) {
    return `https://wa.me/${cleanPhone}?text=${encodedText}`;
  }
  if (cleanPhone) {
    return `https://wa.me/${cleanPhone}`;
  }
  if (encodedText) {
    return `https://wa.me/?text=${encodedText}`;
  }
  return 'https://wa.me/';
}

/**
 * Generates a native mobile app intent URL: whatsapp://send?phone=<phone>&text=<encoded>
 */
export function generateWhatsAppAppUrl(phone?: string, message?: string, defaultCountryCode = '91'): string {
  const cleanPhone = phone ? formatPhoneForWhatsApp(phone, defaultCountryCode) : '';
  const encodedText = message ? encodeURIComponent(message) : '';

  const params: string[] = [];
  if (cleanPhone) params.push(`phone=${cleanPhone}`);
  if (encodedText) params.push(`text=${encodedText}`);

  return params.length > 0 ? `whatsapp://send?${params.join('&')}` : 'whatsapp://send';
}

/**
 * Opens WhatsApp in a new browser tab or launches the native app on supported devices.
 */
export function openWhatsApp(phone?: string, message?: string, defaultCountryCode = '91'): void {
  const url = generateWhatsAppUrl(phone, message, defaultCountryCode);
  if (typeof window !== 'undefined') {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}

/**
 * Replaces placeholders like {{name}} or {{amount}} in a WhatsApp message template string.
 */
export function formatWhatsAppTemplate(
  template: string,
  variables: Record<string, string | number | undefined | null>
): string {
  const map = new Map<string, string | number | undefined | null>(Object.entries(variables));
  return template.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, key: string) => {
    const val = map.get(key);
    return val !== undefined && val !== null ? String(val) : '';
  });
}
