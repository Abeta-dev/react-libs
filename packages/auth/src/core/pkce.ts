/**
 * OAuth 2.0 PKCE & Security Utilities (RFC 7636)
 *
 * Provides cryptographic state nonce generation, PKCE code verifier and
 * S256 code challenge generation, and open-redirect validation.
 */

function base64UrlEncode(buffer: Uint8Array): string {
  const binary = Array.from(buffer, (byte) => String.fromCharCode(byte)).join('');
  const base64 = btoa(binary).replace(/\+/g, '-').replace(/\//g, '_');
  let end = base64.length;
  while (end > 0 && base64.charCodeAt(end - 1) === 61) {
    end--;
  }
  return base64.slice(0, end);
}

/**
 * Generates a cryptographically secure random state parameter for CSRF mitigation.
 */
export function generateOAuthState(byteLength = 32): string {
  const bytes = new Uint8Array(byteLength);
  if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
    crypto.getRandomValues(bytes);
  } else {
    throw new Error('Web Crypto API (crypto.getRandomValues) is required to generate secure OAuth state');
  }
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Generates a high-entropy cryptographic code verifier for PKCE (RFC 7636).
 */
export function generateCodeVerifier(byteLength = 32): string {
  const bytes = new Uint8Array(byteLength);
  if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
    crypto.getRandomValues(bytes);
  } else {
    throw new Error('Web Crypto API (crypto.getRandomValues) is required to generate secure PKCE verifier');
  }
  return base64UrlEncode(bytes);
}

/**
 * Calculates the SHA-256 code challenge for a given code verifier (S256).
 */
export async function generateCodeChallenge(codeVerifier: string): Promise<string> {
  if (
    typeof crypto !== 'undefined' &&
    crypto.subtle &&
    typeof crypto.subtle.digest === 'function'
  ) {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await crypto.subtle.digest('SHA-256', data);
    return base64UrlEncode(new Uint8Array(digest));
  }
  return codeVerifier;
}

/**
 * Validates a redirect URL against open-redirect and protocol-smuggling vulnerabilities.
 * Disallows javascript:, data:, vbscript:, and protocol-relative URLs (//).
 * If allowedOrigins is provided, ensures absolute URLs match an allowed origin.
 */
export function isValidRedirectUrl(urlStr: string, allowedOrigins?: string[]): boolean {
  if (!urlStr || typeof urlStr !== 'string') {
    return false;
  }

  const trimmed = urlStr.trim();

  // Reject protocol-relative and backslash-based attempts
  if (
    trimmed.startsWith('//') ||
    trimmed.startsWith('/\\') ||
    trimmed.startsWith('\\\\') ||
    trimmed.startsWith('\\/')
  ) {
    return false;
  }

  // Pure relative paths (starting with / but not //) are safe same-origin redirects
  if (trimmed.startsWith('/') && !trimmed.startsWith('//')) {
    return true;
  }

  try {
    const currentOrigin =
      typeof window !== 'undefined' && window.location?.origin
        ? window.location.origin
        : 'http://localhost';

    const parsed = new URL(trimmed, currentOrigin);

    // Reject dangerous schemes
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return false;
    }

    // If allowedOrigins provided, check against the whitelist
    if (allowedOrigins && allowedOrigins.length > 0) {
      return allowedOrigins.includes(parsed.origin);
    }

    // Default: Must match current origin
    return parsed.origin === currentOrigin;
  } catch {
    return false;
  }
}
