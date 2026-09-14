'use client';

// src/india/components/amount-summary-card-india.tsx
import * as React2 from "react";
import { Coins, Sparkles, ShieldCheck } from "lucide-react";

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

// src/components/ui/data-display/badge.tsx
import { cva } from "class-variance-authority";
import { jsx as jsx2 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsx2("span", { className: cn(badgeVariants({ variant }), className), ...props });
}

// src/india/tax.ts
function calculateGSTSplit(amount, taxRate = 18, isIntraState = true, isTaxInclusive = false) {
  const rate = Math.max(0, taxRate);
  let baseAmount = 0;
  let totalTax = 0;
  if (isTaxInclusive) {
    baseAmount = amount / (1 + rate / 100);
    totalTax = amount - baseAmount;
  } else {
    baseAmount = amount;
    totalTax = amount * (rate / 100);
  }
  let cgstAmount = 0;
  let sgstAmount = 0;
  let igstAmount = 0;
  if (isIntraState) {
    cgstAmount = totalTax / 2;
    sgstAmount = totalTax / 2;
  } else {
    igstAmount = totalTax;
  }
  return {
    baseAmount,
    totalTax,
    cgstAmount,
    sgstAmount,
    igstAmount,
    totalPayable: baseAmount + totalTax
  };
}
function calculateTDS(baseAmount, tdsPercentage) {
  if (tdsPercentage <= 0) return 0;
  return baseAmount * (tdsPercentage / 100);
}

// src/india/constants.ts
function formatLakhs(value, currencySymbol = "\u20B9") {
  const inLakhs = value / 1e5;
  return `${currencySymbol}${inLakhs.toLocaleString("en-IN", { maximumFractionDigits: 2 })}L`;
}
function formatCrores(value, currencySymbol = "\u20B9") {
  const inCrores = value / 1e7;
  return `${currencySymbol}${inCrores.toLocaleString("en-IN", { maximumFractionDigits: 2 })}Cr`;
}

// src/india/components/amount-summary-card-india.tsx
import { Fragment, jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
function formatINRCurrency(value) {
  return "\u20B9" + Math.round(value).toLocaleString("en-IN");
}
var AmountSummaryCardIndia = React2.forwardRef(
  ({
    baseAmount = 0,
    gstRate = 18,
    isIntraState = true,
    isTaxInclusive = false,
    transportCost = 0,
    tdsPercentage = 0,
    netPayable: netPayableOverride,
    isUrgent = false,
    urgentLabel = "Urgent Payout",
    size = "default",
    className,
    ...props
  }, ref) => {
    const isSm = size === "sm";
    const gst = React2.useMemo(() => {
      return calculateGSTSplit(baseAmount, gstRate, isIntraState, isTaxInclusive);
    }, [baseAmount, gstRate, isIntraState, isTaxInclusive]);
    const tdsAmount = React2.useMemo(() => {
      return calculateTDS(gst.baseAmount, tdsPercentage);
    }, [gst.baseAmount, tdsPercentage]);
    const calculatedPayable = Math.max(
      0,
      gst.baseAmount + gst.totalTax + transportCost - tdsAmount
    );
    const totalPayable = netPayableOverride !== void 0 ? netPayableOverride : calculatedPayable;
    const highValueHint = React2.useMemo(() => {
      if (totalPayable >= 1e7) {
        return formatCrores(totalPayable);
      }
      if (totalPayable >= 1e5) {
        return formatLakhs(totalPayable);
      }
      return null;
    }, [totalPayable]);
    return /* @__PURE__ */ jsxs2(
      Card,
      {
        ref,
        className: cn(
          "relative overflow-hidden border-border/80 shadow-sm",
          isSm ? "p-3.5" : "p-5",
          className
        ),
        ...props,
        children: [
          /* @__PURE__ */ jsxs2(CardHeader, { className: "p-0 pb-3 flex flex-row items-center justify-between border-b border-border/60", children: [
            /* @__PURE__ */ jsxs2(CardTitle, { className: cn("flex items-center gap-2 font-semibold text-foreground", isSm ? "text-sm" : "text-base"), children: [
              /* @__PURE__ */ jsx3(Coins, { className: "w-4 h-4 text-primary", "aria-hidden": "true" }),
              /* @__PURE__ */ jsx3("span", { children: "Tax & Amount Summary (INR)" })
            ] }),
            /* @__PURE__ */ jsxs2("div", { className: "flex items-center gap-1.5", children: [
              isUrgent && /* @__PURE__ */ jsxs2(Badge, { variant: "destructive", className: "animate-pulse text-[11px] px-2 py-0.5", children: [
                /* @__PURE__ */ jsx3(Sparkles, { className: "w-3 h-3 mr-1", "aria-hidden": "true" }),
                urgentLabel
              ] }),
              /* @__PURE__ */ jsx3(Badge, { variant: "outline", className: "text-[10px] text-muted-foreground", children: isIntraState ? "Intra-State GST" : "Inter-State IGST" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs2(CardContent, { className: "p-0 pt-3 space-y-2.5 text-xs sm:text-sm", children: [
            /* @__PURE__ */ jsxs2("div", { className: "flex items-center justify-between text-muted-foreground", children: [
              /* @__PURE__ */ jsx3("span", { children: "Taxable Value (Base)" }),
              /* @__PURE__ */ jsx3("span", { className: "font-medium text-foreground", children: formatINRCurrency(gst.baseAmount) })
            ] }),
            isIntraState ? /* @__PURE__ */ jsxs2(Fragment, { children: [
              /* @__PURE__ */ jsxs2("div", { className: "flex items-center justify-between pl-2 text-muted-foreground/90 text-xs", children: [
                /* @__PURE__ */ jsx3("span", { children: `CGST (${gstRate / 2}%)` }),
                /* @__PURE__ */ jsx3("span", { children: formatINRCurrency(gst.cgstAmount) })
              ] }),
              /* @__PURE__ */ jsxs2("div", { className: "flex items-center justify-between pl-2 text-muted-foreground/90 text-xs", children: [
                /* @__PURE__ */ jsx3("span", { children: `SGST (${gstRate / 2}%)` }),
                /* @__PURE__ */ jsx3("span", { children: formatINRCurrency(gst.sgstAmount) })
              ] })
            ] }) : /* @__PURE__ */ jsxs2("div", { className: "flex items-center justify-between pl-2 text-muted-foreground/90 text-xs", children: [
              /* @__PURE__ */ jsx3("span", { children: `IGST (${gstRate}%)` }),
              /* @__PURE__ */ jsx3("span", { children: formatINRCurrency(gst.igstAmount) })
            ] }),
            transportCost > 0 && /* @__PURE__ */ jsxs2("div", { className: "flex items-center justify-between text-muted-foreground", children: [
              /* @__PURE__ */ jsx3("span", { children: "Freight / Transport Charges" }),
              /* @__PURE__ */ jsx3("span", { className: "font-medium text-foreground", children: formatINRCurrency(transportCost) })
            ] }),
            tdsAmount > 0 && /* @__PURE__ */ jsxs2("div", { className: "flex items-center justify-between text-destructive", children: [
              /* @__PURE__ */ jsxs2("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsx3(ShieldCheck, { className: "w-3.5 h-3.5", "aria-hidden": "true" }),
                /* @__PURE__ */ jsx3("span", { children: `Less: TDS u/s IT Act (${tdsPercentage}%)` })
              ] }),
              /* @__PURE__ */ jsx3("span", { className: "font-medium", children: `-${formatINRCurrency(tdsAmount)}` })
            ] }),
            /* @__PURE__ */ jsxs2("div", { className: "pt-2 border-t border-border/80 flex items-baseline justify-between", children: [
              /* @__PURE__ */ jsxs2("div", { children: [
                /* @__PURE__ */ jsx3("div", { className: "font-semibold text-foreground text-sm sm:text-base", children: "Net Payable" }),
                highValueHint && /* @__PURE__ */ jsx3("div", { className: "text-[11px] text-muted-foreground font-mono", children: `Approx. ${highValueHint}` })
              ] }),
              /* @__PURE__ */ jsx3("div", { className: "text-right", children: /* @__PURE__ */ jsx3("div", { className: "text-base sm:text-lg font-bold tracking-tight text-primary font-mono", children: formatINRCurrency(totalPayable) }) })
            ] })
          ] })
        ]
      }
    );
  }
);
AmountSummaryCardIndia.displayName = "AmountSummaryCardIndia";
export {
  AmountSummaryCardIndia
};
//# sourceMappingURL=index.js.map