/**
 * @file platform.ts — Cross-Platform Detection & Native PWA Device APIs.
 *
 * Provides deterministic detection for iOS, Android, Desktop, and standalone PWA modes,
 * along with safe wrappers for native device capabilities (haptics, sharing).
 */

export interface PlatformInfo {
  isIOS: boolean;
  isAndroid: boolean;
  isMobile: boolean;
  isStandalone: boolean;
  platformName: 'ios' | 'android' | 'desktop';
  hasTouch: boolean;
}

export type HapticType = 'light' | 'medium' | 'heavy' | 'selection' | 'success' | 'warning' | 'error';

/**
 * Detect client OS, device form factor, and running display mode.
 * Safe for Server-Side Rendering (returns desktop defaults when DOM is unavailable).
 */
export function getPlatformInfo(): PlatformInfo {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return {
      isIOS: false,
      isAndroid: false,
      isMobile: false,
      isStandalone: false,
      platformName: 'desktop',
      hasTouch: false,
    };
  }

  const userAgent = navigator.userAgent || '';
  const platform = (navigator as unknown as { platform?: string }).platform || '';

  // Detect iOS (including iPadOS desktop Safari mode spoofing MacIntel with touch points)
  const isIOS =
    /iPad|iPhone|iPod/.test(userAgent) ||
    (platform === 'MacIntel' && navigator.maxTouchPoints > 1);

  // Detect Android
  const isAndroid = /Android/.test(userAgent);

  // Detect Touch capability
  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  // Detect Standalone PWA mode
  const isStandalone =
    (typeof window.matchMedia === 'function' && window.matchMedia('(display-mode: standalone)').matches) ||
    (navigator as unknown as { standalone?: boolean }).standalone === true ||
    (typeof document !== 'undefined' && document.referrer.includes('android-app://'));

  const isMobile = isIOS || isAndroid || window.innerWidth < 768;

  let platformName: 'ios' | 'android' | 'desktop' = 'desktop';
  if (isIOS) {
    platformName = 'ios';
  } else if (isAndroid) {
    platformName = 'android';
  }

  return {
    isIOS,
    isAndroid,
    isMobile,
    isStandalone,
    platformName,
    hasTouch,
  };
}

/**
 * Triggers safe vibration feedback on supported devices.
 */
export function triggerHaptic(type: HapticType = 'light'): void {
  if (typeof window === 'undefined' || typeof navigator === 'undefined' || !navigator.vibrate) {
    return;
  }

  try {
    switch (type) {
      case 'light':
      case 'selection':
        navigator.vibrate(10);
        break;
      case 'medium':
        navigator.vibrate(20);
        break;
      case 'heavy':
        navigator.vibrate(35);
        break;
      case 'success':
        navigator.vibrate([10, 30, 20]);
        break;
      case 'warning':
        navigator.vibrate([15, 40, 15]);
        break;
      case 'error':
        navigator.vibrate([25, 50, 25, 50, 25]);
        break;
    }
  } catch {
    // Ignore devices that block vibration without user interaction
  }
}

/**
 * Safe native Web Share API trigger with fallback.
 */
export async function nativeShare(data: { title: string; text?: string; url?: string }): Promise<boolean> {
  if (typeof window === 'undefined' || typeof navigator === 'undefined' || !navigator.share) {
    return false;
  }

  try {
    await navigator.share(data);
    return true;
  } catch {
    return false;
  }
}
