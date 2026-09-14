import * as React from 'react';
import { Smartphone, Download, X, Share, PlusSquare, Sparkles } from 'lucide-react';
import { Button } from '../forms/button';
import { usePlatform } from '../../../hooks/use-platform';
import type { BeforeInstallPromptEvent } from '../../../hooks/use-pwa-install';
import { triggerHaptic } from '../../../lib/platform';
import { cn } from '../../../lib/utils';

export interface InstallPwaBannerProps {
  appName?: string;
  appDescription?: string;
  appIcon?: React.ReactNode;
  storageKey?: string;
  className?: string;
  onInstall?: () => void;
  onDismiss?: () => void;
}

export function InstallPwaBanner({
  appName = 'App',
  appDescription = 'Add to your home screen for quick offline access and high-speed loading.',
  appIcon,
  storageKey = 'pwa_install_banner_dismissed',
  className,
  onInstall,
  onDismiss,
}: InstallPwaBannerProps) {
  const { isIOS, isStandalone } = usePlatform();
  const [deferredPrompt, setDeferredPrompt] = React.useState<BeforeInstallPromptEvent | null>(null);
  const [isDismissed, setIsDismissed] = React.useState(false);
  const [showIosGuide, setShowIosGuide] = React.useState(false);

  React.useEffect(() => {
    try {
      if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem(storageKey)) {
        setIsDismissed(true);
      }
    } catch {
      // Storage unavailable
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, [storageKey]);

  if (isStandalone || isDismissed) return null;
  if (!deferredPrompt && !isIOS) return null;

  const handleInstall = async () => {
    triggerHaptic('medium');
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        onInstall?.();
      }
    } else if (isIOS) {
      setShowIosGuide(!showIosGuide);
    }
  };

  const handleDismiss = () => {
    triggerHaptic('light');
    setIsDismissed(true);
    try {
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem(storageKey, 'true');
      }
    } catch {
      // Storage unavailable
    }
    onDismiss?.();
  };

  return (
    <aside
      aria-label={`Install ${appName} Banner`}
      className={cn(
        "fixed bottom-20 md:bottom-6 right-4 left-4 md:left-auto md:w-96 z-40",
        "bg-background/95 backdrop-blur-md border border-border rounded-2xl shadow-xl p-4 transition-all",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
          {appIcon || <Smartphone className="w-5 h-5" />}
        </div>

        <div className="flex-1 min-w-0 pr-1">
          <div className="flex items-center gap-1.5">
            <h4 className="text-sm font-bold text-foreground leading-tight">Install {appName}</h4>
            <span className="text-[10px] bg-primary/15 text-primary font-semibold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
              <Sparkles className="w-2.5 h-2.5" /> PWA
            </span>
          </div>

          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
            {appDescription}
          </p>

          <div className="mt-3 flex items-center gap-2">
            <Button
              size="sm"
              onClick={handleInstall}
              className="gap-1.5 text-xs font-semibold h-8 rounded-lg shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              {isIOS ? 'How to Install' : 'Install Now'}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDismiss}
              className="text-xs text-muted-foreground hover:text-foreground h-8"
            >
              Not now
            </Button>
          </div>
        </div>

        <button
          onClick={handleDismiss}
          aria-label="Dismiss banner"
          className="text-muted-foreground hover:text-foreground p-1 rounded-lg transition-colors -mr-1 -mt-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {showIosGuide && (
        <div className="mt-3 pt-3 border-t border-border/60 text-xs text-muted-foreground space-y-2">
          <p className="font-semibold text-foreground flex items-center gap-1">
            Install on iOS Safari:
          </p>
          <ol className="list-decimal list-inside space-y-1 pl-1">
            <li className="flex items-center gap-1.5">
              <span>1. Tap the Share button</span>
              <Share className="w-3.5 h-3.5 inline text-primary" />
            </li>
            <li className="flex items-center gap-1.5">
              <span>2. Scroll down & select</span>
              <span className="font-medium text-foreground flex items-center gap-1 bg-muted px-1.5 py-0.5 rounded">
                <PlusSquare className="w-3.5 h-3.5" /> Add to Home Screen
              </span>
            </li>
            <li>3. Tap <strong>Add</strong> in the top-right corner</li>
          </ol>
        </div>
      )}
    </aside>
  );
}
