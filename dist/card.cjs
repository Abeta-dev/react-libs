'use client';
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/components/ui/layout/card.tsx
var card_exports = {};
__export(card_exports, {
  Card: () => Card,
  CardContent: () => CardContent,
  CardDescription: () => CardDescription,
  CardFooter: () => CardFooter,
  CardHeader: () => CardHeader,
  CardSeparator: () => CardSeparator,
  CardTitle: () => CardTitle,
  StandardCard: () => StandardCard
});
module.exports = __toCommonJS(card_exports);
var React = __toESM(require("react"), 1);

// src/lib/utils.ts
var import_clsx = require("clsx");
var import_tailwind_merge = require("tailwind-merge");
function cn(...inputs) {
  return (0, import_tailwind_merge.twMerge)((0, import_clsx.clsx)(inputs));
}

// src/components/ui/layout/card.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var Card = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
var CardHeader = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
  "div",
  {
    ref,
    className: cn("flex flex-col space-y-1 p-5 border-b border-border/60", className),
    ...props
  }
));
CardHeader.displayName = "CardHeader";
var CardTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
  "div",
  {
    ref,
    className: cn("font-semibold leading-none tracking-tight", className),
    ...props
  }
));
CardTitle.displayName = "CardTitle";
var CardDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
  "div",
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
CardDescription.displayName = "CardDescription";
var CardContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref, className: cn("p-5", className), ...props }));
CardContent.displayName = "CardContent";
var CardSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
  "div",
  {
    ref,
    className: cn("-mx-0 h-px bg-border/60", className),
    role: "separator",
    ...props
  }
));
CardSeparator.displayName = "CardSeparator";
var CardFooter = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
  }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { ref, className, ...props, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { className: "gap-3 sm:flex-row sm:items-start sm:justify-between sm:space-y-0", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "min-w-0 flex-1 space-y-1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { className: "text-base", children: title }),
          badge
        ] }),
        description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: description })
      ] }),
      headerActions && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex shrink-0 flex-wrap items-center gap-2", children: headerActions })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { className: contentClassName, children }),
    (footer || actions) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      CardFooter,
      {
        className: cn(
          "justify-between gap-3 flex-col sm:flex-row sm:items-center",
          footerClassName
        ),
        children: [
          footer ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "min-w-0 flex-1 text-sm text-muted-foreground", children: footer }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {}),
          actions && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex shrink-0 flex-wrap items-center gap-2", children: actions })
        ]
      }
    )
  ] })
);
StandardCard.displayName = "StandardCard";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardSeparator,
  CardTitle,
  StandardCard
});
//# sourceMappingURL=card.cjs.map