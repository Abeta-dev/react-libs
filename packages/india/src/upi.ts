/**
 * @file upi.ts — Pure India Unified Payments Interface (UPI) Utilities
 * NPCI-compliant payment URI formatting, UPI ID validation, and transaction parameter parsing.
 * 
 * 100% Pure: Zero React or DOM dependencies.
 * Safe for Node.js, Server Actions, Edge runtimes, and client bundles.
 */

export interface UpiPayOptions {
  /** Merchant or Payee Virtual Payment Address (e.g. merchant@upi, user@okhdfcbank) */
  upiId: string;
  /** Payee Name / Institute / Merchant Business Name (pn param) */
  payeeName?: string | undefined;
  /** Transaction amount in INR (am param) */
  amount?: number | undefined;
  /** Transaction note or purpose (tn param, max 120 chars) */
  transactionNote?: string | undefined;
  /** Currency code, standard is INR (cu param) */
  currency?: string | undefined;
  /** Transaction Reference ID (tr param) */
  transactionRef?: string | undefined;
  /** Merchant Category Code (mc param) */
  merchantCode?: string | undefined;
  /** Reference URL (url param) */
  refUrl?: string | undefined;
}

export interface UpiValidationResult {
  isValid: boolean;
  error?: string | undefined;
}

/**
 * Standard NPCI UPI VPA Pattern:
 * Alphanumeric, dots, hyphens, underscores followed by @ and a valid PSP handle.
 * Minimum 3 characters before @, minimum 2 characters after @.
 */
const UPI_ID_REGEX = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;

/**
 * Validates whether a given string is a valid NPCI UPI VPA format.
 */
export function validateUpiId(upiId: string): UpiValidationResult {
  if (!upiId || typeof upiId !== 'string') {
    return { isValid: false, error: 'UPI ID cannot be empty' };
  }

  const trimmed = upiId.trim();
  if (trimmed.length < 5) {
    return { isValid: false, error: 'UPI ID is too short (min 5 characters)' };
  }

  if (trimmed.length > 256) {
    return { isValid: false, error: 'UPI ID exceeds maximum length (256 characters)' };
  }

  if (!trimmed.includes('@')) {
    return { isValid: false, error: 'UPI ID must contain an "@" symbol (e.g. username@bank)' };
  }

  const parts = trimmed.split('@');
  if (parts.length !== 2) {
    return { isValid: false, error: 'UPI ID can contain only one "@" symbol' };
  }

  const [handle, psp] = parts;
  if (!handle || handle.length < 2) {
    return { isValid: false, error: 'Invalid username prefix before @' };
  }

  if (!psp || psp.length < 2) {
    return { isValid: false, error: 'Invalid bank/PSP handle after @' };
  }

  if (!UPI_ID_REGEX.test(trimmed)) {
    return { isValid: false, error: 'UPI ID contains invalid characters. Use letters, numbers, periods, hyphens, and underscores only.' };
  }

  return { isValid: true };
}

/**
 * Generates an NPCI-compliant `upi://pay` URI string.
 * This deep link triggers any installed UPI app on mobile devices (GPay, PhonePe, Paytm, BHIM, etc.).
 */
export function generateUpiPayUri({
  upiId,
  payeeName,
  amount,
  transactionNote,
  currency = 'INR',
  transactionRef,
  merchantCode,
  refUrl,
}: UpiPayOptions): string {
  const cleanUpi = upiId.trim();
  const params: string[] = [`pa=${encodeURIComponent(cleanUpi)}`];

  if (payeeName) {
    params.push(`pn=${encodeURIComponent(payeeName.trim())}`);
  }

  if (merchantCode) {
    params.push(`mc=${encodeURIComponent(merchantCode.trim())}`);
  }

  if (transactionRef) {
    params.push(`tr=${encodeURIComponent(transactionRef.trim())}`);
  }

  if (transactionNote) {
    // Truncate note to 120 characters per NPCI standard
    const cleanNote = transactionNote.trim().slice(0, 120);
    params.push(`tn=${encodeURIComponent(cleanNote)}`);
  }

  if (typeof amount === 'number' && amount > 0) {
    params.push(`am=${amount.toFixed(2)}`);
  }

  params.push(`cu=${encodeURIComponent(currency.trim().toUpperCase())}`);

  if (refUrl) {
    params.push(`url=${encodeURIComponent(refUrl.trim())}`);
  }

  return `upi://pay?${params.join('&')}`;
}

/**
 * Parses an existing `upi://pay` URI back into structured parameters.
 */
export function parseUpiPayUri(uri: string): UpiPayOptions | null {
  if (!uri || !uri.startsWith('upi://pay?')) {
    return null;
  }

  try {
    const queryString = uri.replace('upi://pay?', '');
    const searchParams = new URLSearchParams(queryString);

    const upiId = searchParams.get('pa');
    if (!upiId) return null;

    const payeeName = searchParams.get('pn') || undefined;
    const amountStr = searchParams.get('am');
    const amount = amountStr ? parseFloat(amountStr) : undefined;
    const transactionNote = searchParams.get('tn') || undefined;
    const currency = searchParams.get('cu') || 'INR';
    const transactionRef = searchParams.get('tr') || undefined;
    const merchantCode = searchParams.get('mc') || undefined;
    const refUrl = searchParams.get('url') || undefined;

    return {
      upiId,
      payeeName,
      amount: amount && !isNaN(amount) ? amount : undefined,
      transactionNote,
      currency,
      transactionRef,
      merchantCode,
      refUrl,
    };
  } catch {
    return null;
  }
}
