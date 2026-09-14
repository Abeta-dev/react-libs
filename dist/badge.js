'use client';

// src/components/ui/data-display/badge.tsx
import { cva } from "class-variance-authority";

// src/lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// src/components/ui/data-display/badge.tsx
import { jsx } from "react/jsx-runtime";
var badgeVariants = cva(
  // @replit
  // Whitespace-nowrap: Badges should never wrap.
  "whitespace-nowrap inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover-elevate ",
  {
    variants: {
      variant: {
        default: (
          // @replit shadow-xs instead of shadow, no hover because we use hover-elevate
          "border-transparent bg-primary text-primary-foreground shadow-xs"
        ),
        secondary: (
          // @replit no hover because we use hover-elevate
          "border-transparent bg-secondary text-secondary-foreground"
        ),
        destructive: (
          // @replit shadow-xs instead of shadow, no hover because we use hover-elevate
          "border-transparent bg-destructive text-destructive-foreground shadow-xs"
        ),
        outline: "text-foreground border border-badge-outline"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ jsx("span", { className: cn(badgeVariants({ variant }), className), ...props });
}
export {
  Badge,
  badgeVariants
};
//# sourceMappingURL=badge.js.map