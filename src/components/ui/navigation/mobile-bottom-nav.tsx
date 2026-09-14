import * as React from 'react';
import { MoreHorizontal } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { triggerHaptic } from '../../../lib/platform';

export interface MobileNavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number | string;
}

export interface MobileBottomNavProps {
  items: MobileNavItem[];
  activeId: string;
  onChange: (id: string) => void;
  moreAction?: {
    label?: string;
    onClick: () => void;
  };
  className?: string;
}

export function MobileBottomNav({
  items,
  activeId,
  onChange,
  moreAction,
  className,
}: MobileBottomNavProps) {
  const handleSelect = (id: string) => {
    triggerHaptic('light');
    onChange(id);
  };

  return (
    <nav
      aria-label="Mobile Navigation"
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40 md:hidden",
        "bg-background/95 backdrop-blur-md border-t border-border",
        "flex items-center justify-around px-2 py-1 select-none",
        "pb-[env(safe-area-inset-bottom,0px)]",
        className
      )}
    >
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeId === item.id;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => handleSelect(item.id)}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              "flex flex-col items-center justify-center flex-1 min-w-0 py-1.5 px-1 relative rounded-lg transition-colors",
              isActive
                ? "text-primary font-semibold"
                : "text-muted-foreground hover:text-foreground font-normal"
            )}
          >
            <div className="relative">
              <Icon className={cn("w-5 h-5 transition-transform", isActive && "scale-110")} />
              {item.badge !== undefined && item.badge !== null && item.badge !== 0 && (
                <span className="absolute -top-1.5 -right-2 min-w-4 h-4 px-1 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] truncate max-w-[64px] mt-1 leading-none">
              {item.label}
            </span>
          </button>
        );
      })}

      {moreAction && (
        <button
          type="button"
          onClick={() => {
            triggerHaptic('light');
            moreAction.onClick();
          }}
          className="flex flex-col items-center justify-center flex-1 min-w-0 py-1.5 px-1 relative rounded-lg transition-colors text-muted-foreground hover:text-foreground"
        >
          <MoreHorizontal className="w-5 h-5" />
          <span className="text-[10px] truncate max-w-[64px] mt-1 leading-none">
            {moreAction.label || 'More'}
          </span>
        </button>
      )}
    </nav>
  );
}
