import * as React from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';

export interface AppSplashScreenProps {
  title?: string;
  subtitle?: string;
  message?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function AppSplashScreen({
  title = 'Welcome',
  subtitle,
  message = 'Initializing workspace...',
  icon,
  className,
}: AppSplashScreenProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center bg-background text-foreground select-none p-4",
        className
      )}
    >
      <div className="relative flex flex-col items-center text-center max-w-sm w-full animate-in fade-in duration-300">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shadow-lg mb-4">
          {icon || <Sparkles className="w-8 h-8" />}
        </div>

        <h1 className="text-2xl font-bold tracking-tight mb-1 text-foreground">
          {title}
        </h1>

        {subtitle && (
          <p className="text-xs text-muted-foreground font-medium mb-6">
            {subtitle}
          </p>
        )}

        <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-muted border border-border mt-4">
          <Loader2 className="w-4 h-4 animate-spin text-primary shrink-0" />
          <span className="text-xs font-medium text-foreground">
            {message}
          </span>
        </div>
      </div>
    </div>
  );
}
