'use client';

// src/components/ui/layout/card.tsx
import * as React from "react";

// src/lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// src/components/ui/layout/card.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var Card = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn(
      "rounded-xl border bg-card text-card-foreground shadow",
      className
    ),
    ...props
  }
));
Card.displayName = "Card";
var CardHeader = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("flex flex-col space-y-1 p-5 border-b border-border/60", className),
    ...props
  }
));
CardHeader.displayName = "CardHeader";
var CardTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("font-semibold leading-none tracking-tight", className),
    ...props
  }
));
CardTitle.displayName = "CardTitle";
var CardDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
CardDescription.displayName = "CardDescription";
var CardContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("p-5", className), ...props }));
CardContent.displayName = "CardContent";
var CardSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("-mx-0 h-px bg-border/60", className),
    role: "separator",
    ...props
  }
));
CardSeparator.displayName = "CardSeparator";
var CardFooter = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("flex items-center p-5 border-t border-border/60", className),
    ...props
  }
));
CardFooter.displayName = "CardFooter";
var StandardCard = React.forwardRef(
  ({
    className,
    title,
    description,
    badge,
    headerActions,
    children,
    footer,
    actions,
    contentClassName,
    footerClassName,
    ...props
  }, ref) => /* @__PURE__ */ jsxs(Card, { ref, className, ...props, children: [
    /* @__PURE__ */ jsxs(CardHeader, { className: "gap-3 sm:flex-row sm:items-start sm:justify-between sm:space-y-0", children: [
      /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1 space-y-1", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ jsx(CardTitle, { className: "text-base", children: title }),
          badge
        ] }),
        description && /* @__PURE__ */ jsx(CardDescription, { children: description })
      ] }),
      headerActions && /* @__PURE__ */ jsx("div", { className: "flex shrink-0 flex-wrap items-center gap-2", children: headerActions })
    ] }),
    /* @__PURE__ */ jsx(CardContent, { className: contentClassName, children }),
    (footer || actions) && /* @__PURE__ */ jsxs(
      CardFooter,
      {
        className: cn(
          "justify-between gap-3 flex-col sm:flex-row sm:items-center",
          footerClassName
        ),
        children: [
          footer ? /* @__PURE__ */ jsx("div", { className: "min-w-0 flex-1 text-sm text-muted-foreground", children: footer }) : /* @__PURE__ */ jsx("div", {}),
          actions && /* @__PURE__ */ jsx("div", { className: "flex shrink-0 flex-wrap items-center gap-2", children: actions })
        ]
      }
    )
  ] })
);
StandardCard.displayName = "StandardCard";
export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardSeparator,
  CardTitle,
  StandardCard
};
//# sourceMappingURL=card.js.map