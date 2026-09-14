import { useState, useEffect } from 'react';
import { getPlatformInfo, type PlatformInfo, triggerHaptic, nativeShare, type HapticType } from '../lib/platform';

export function usePlatform(): PlatformInfo & {
  triggerHaptic: (type?: HapticType) => void;
  nativeShare: (data: { title: string; text?: string; url?: string }) => Promise<boolean>;
} {
  const [platformInfo, setPlatformInfo] = useState<PlatformInfo>(getPlatformInfo);

  useEffect(() => {
    const updateInfo = () => {
      setPlatformInfo(getPlatformInfo());
    };

    window.addEventListener('resize', updateInfo);

    if (typeof window.matchMedia === 'function') {
      const mediaQuery = window.matchMedia('(display-mode: standalone)');
      const handleMediaChange = () => updateInfo();

      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleMediaChange);
      } else if ('addListener' in mediaQuery) {
        (mediaQuery as unknown as { addListener: (cb: () => void) => void }).addListener(handleMediaChange);
      }

      return () => {
        window.removeEventListener('resize', updateInfo);
        if (mediaQuery.removeEventListener) {
          mediaQuery.removeEventListener('change', handleMediaChange);
        } else if ('removeListener' in mediaQuery) {
          (mediaQuery as unknown as { removeListener: (cb: () => void) => void }).removeListener(handleMediaChange);
        }
      };
    }

    return () => {
      window.removeEventListener('resize', updateInfo);
    };
  }, []);

  return {
    ...platformInfo,
    triggerHaptic,
    nativeShare,
  };
}
