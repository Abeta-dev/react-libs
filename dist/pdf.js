'use client';

// src/components/ui/data-display/pdf-viewer.tsx
import * as React4 from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Loader2 as Loader22, ChevronLeft, ChevronRight, Download, FileWarning, ZoomIn, ZoomOut, RotateCw, Maximize, Printer } from "lucide-react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// src/components/ui/forms/button.tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";

// src/lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// src/components/ui/forms/button.tsx
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover-elevate active-elevate-2",
  {
    variants: {
      variant: {
        default: (
          // @replit: no hover, and add primary border
          "bg-primary text-primary-foreground border border-primary-border"
        ),
        destructive: "bg-destructive text-destructive-foreground shadow-sm border-destructive-border",
        outline: "border border-button-outline shadow-xs active:shadow-none",
        // filled with lower opacity — clear distinction from the default primary button
        secondary: "border bg-primary/10 text-primary border-primary/20 hover:bg-primary/15",
        // @replit no hover, transparent border
        ghost: "border border-transparent",
        link: "text-primary underline underline-offset-4 hover:opacity-80"
      },
      size: {
        // @replit changed sizes
        default: "min-h-9 px-4 py-2",
        sm: "min-h-8 rounded-md px-3 text-xs",
        lg: "min-h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
var Button = React.forwardRef(
  ({ className, variant, size, asChild = false, isLoading = false, loadingText, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(
      Comp,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        disabled: disabled || isLoading,
        ...props,
        children: isLoading ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin shrink-0" }),
          loadingText ?? children
        ] }) : children
      }
    );
  }
);
Button.displayName = "Button";

// src/components/ui/layout/card.tsx
import * as React2 from "react";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var Card = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx2(
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
var CardHeader = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx2(
  "div",
  {
    ref,
    className: cn("flex flex-col space-y-1 p-5 border-b border-border/60", className),
    ...props
  }
));
CardHeader.displayName = "CardHeader";
var CardTitle = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx2(
  "div",
  {
    ref,
    className: cn("font-semibold leading-none tracking-tight", className),
    ...props
  }
));
CardTitle.displayName = "CardTitle";
var CardDescription = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx2(
  "div",
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
CardDescription.displayName = "CardDescription";
var CardContent = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx2("div", { ref, className: cn("p-5", className), ...props }));
CardContent.displayName = "CardContent";
var CardSeparator = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx2(
  "div",
  {
    ref,
    className: cn("-mx-0 h-px bg-border/60", className),
    role: "separator",
    ...props
  }
));
CardSeparator.displayName = "CardSeparator";
var CardFooter = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx2(
  "div",
  {
    ref,
    className: cn("flex items-center p-5 border-t border-border/60", className),
    ...props
  }
));
CardFooter.displayName = "CardFooter";
var StandardCard = React2.forwardRef(
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
  }, ref) => /* @__PURE__ */ jsxs2(Card, { ref, className, ...props, children: [
    /* @__PURE__ */ jsxs2(CardHeader, { className: "gap-3 sm:flex-row sm:items-start sm:justify-between sm:space-y-0", children: [
      /* @__PURE__ */ jsxs2("div", { className: "min-w-0 flex-1 space-y-1", children: [
        /* @__PURE__ */ jsxs2("div", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ jsx2(CardTitle, { className: "text-base", children: title }),
          badge
        ] }),
        description && /* @__PURE__ */ jsx2(CardDescription, { children: description })
      ] }),
      headerActions && /* @__PURE__ */ jsx2("div", { className: "flex shrink-0 flex-wrap items-center gap-2", children: headerActions })
    ] }),
    /* @__PURE__ */ jsx2(CardContent, { className: contentClassName, children }),
    (footer || actions) && /* @__PURE__ */ jsxs2(
      CardFooter,
      {
        className: cn(
          "justify-between gap-3 flex-col sm:flex-row sm:items-center",
          footerClassName
        ),
        children: [
          footer ? /* @__PURE__ */ jsx2("div", { className: "min-w-0 flex-1 text-sm text-muted-foreground", children: footer }) : /* @__PURE__ */ jsx2("div", {}),
          actions && /* @__PURE__ */ jsx2("div", { className: "flex shrink-0 flex-wrap items-center gap-2", children: actions })
        ]
      }
    )
  ] })
);
StandardCard.displayName = "StandardCard";

// src/components/ui/feedback/error-boundary.tsx
import * as React3 from "react";

// src/components/ui/feedback/error-state.tsx
import { AlertTriangle } from "lucide-react";
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
function ErrorState({
  title,
  description,
  actionLabel,
  onAction,
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxs3(
    Card,
    {
      className: cn("px-6 py-10 text-center", className),
      ...props,
      children: [
        /* @__PURE__ */ jsx3("div", { className: "mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400", children: /* @__PURE__ */ jsx3(AlertTriangle, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsx3("h3", { className: "text-base font-semibold text-slate-900 dark:text-slate-100", children: title }),
        description ? /* @__PURE__ */ jsx3("p", { className: "mx-auto mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400", children: description }) : null,
        actionLabel && onAction ? /* @__PURE__ */ jsx3(Button, { className: "mt-4", onClick: onAction, children: actionLabel }) : null
      ]
    }
  );
}

// src/components/ui/feedback/error-boundary.tsx
import { jsx as jsx4 } from "react/jsx-runtime";
function areResetKeysDifferent(prevKeys = [], nextKeys = []) {
  if (prevKeys.length !== nextKeys.length) return true;
  return prevKeys.some((k, i) => !Object.is(k, nextKeys[i]));
}
var ErrorBoundary = class extends React3.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error
    };
  }
  componentDidCatch(error, errorInfo) {
    this.props.onError?.(error, errorInfo);
  }
  componentDidUpdate(prevProps) {
    if (this.state.hasError && prevProps.resetKeys && this.props.resetKeys && areResetKeysDifferent(prevProps.resetKeys, this.props.resetKeys)) {
      this.resetErrorBoundary();
    }
  }
  resetErrorBoundary = () => {
    this.props.onReset?.();
    this.setState({
      hasError: false,
      error: null
    });
  };
  render() {
    const { hasError, error } = this.state;
    const { fallback, children } = this.props;
    if (hasError && error) {
      if (typeof fallback === "function") {
        return fallback({
          error,
          resetErrorBoundary: this.resetErrorBoundary
        });
      }
      if (fallback !== void 0) {
        return fallback;
      }
      return /* @__PURE__ */ jsx4(
        ErrorState,
        {
          title: "Something went wrong",
          description: error.message || "An unexpected error occurred while rendering this component.",
          actionLabel: "Try again",
          onAction: this.resetErrorBoundary
        }
      );
    }
    return children ?? null;
  }
};

// src/components/ui/data-display/pdf-viewer.tsx
import { Fragment as Fragment2, jsx as jsx5, jsxs as jsxs4 } from "react/jsx-runtime";
if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
}
function PdfViewer({
  file,
  className,
  maxWidth = 800,
  scale = 1,
  showDownload = false,
  showPrint = false,
  onLoadSuccess,
  onLoadError
}) {
  const [numPages, setNumPages] = React4.useState(null);
  const [pageNumber, setPageNumber] = React4.useState(1);
  const [error, setError] = React4.useState(null);
  const [currentScale, setCurrentScale] = React4.useState(scale);
  const [rotation, setRotation] = React4.useState(0);
  React4.useEffect(() => {
    setCurrentScale(scale);
  }, [scale]);
  const prevFileRef = React4.useRef(file);
  React4.useEffect(() => {
    if (prevFileRef.current !== file) {
      prevFileRef.current = file;
      setPageNumber(1);
      setError(null);
      setNumPages(null);
    }
  }, [file]);
  function handleDocumentLoadSuccess({ numPages: numPages2 }) {
    setNumPages(numPages2);
    setPageNumber(1);
    setError(null);
    onLoadSuccess?.(numPages2);
  }
  function handleDocumentLoadError(err) {
    setError(err);
    onLoadError?.(err);
  }
  function handleDownload() {
    if (typeof file === "string") {
      const a = document.createElement("a");
      a.href = file;
      a.download = file.split("/").pop() || "document.pdf";
      a.click();
    } else {
      const url = URL.createObjectURL(file);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1e3);
    }
  }
  function handlePrint() {
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    let blobUrl = null;
    if (typeof file === "string") {
      iframe.src = file;
    } else {
      blobUrl = URL.createObjectURL(file);
      iframe.src = blobUrl;
    }
    const cleanup = () => {
      setTimeout(() => {
        if (iframe.parentNode) {
          iframe.parentNode.removeChild(iframe);
        }
        if (blobUrl) URL.revokeObjectURL(blobUrl);
      }, 1e3);
    };
    const triggerPrint = () => {
      try {
        iframe.contentWindow?.print();
      } finally {
        cleanup();
      }
    };
    iframe.onload = () => setTimeout(triggerPrint, 100);
    iframe.onerror = cleanup;
    document.body.appendChild(iframe);
  }
  return /* @__PURE__ */ jsxs4(Card, { className: cn("relative flex flex-col items-center overflow-hidden bg-muted/20", className), children: [
    !error && /* @__PURE__ */ jsxs4("div", { className: "absolute top-2 right-2 z-10 flex items-center gap-1 bg-background/80 backdrop-blur-md p-1 rounded-md border shadow-sm", children: [
      /* @__PURE__ */ jsx5(Button, { variant: "ghost", size: "icon", onClick: () => setCurrentScale((s) => Math.max(s - 0.2, 0.5)), className: "h-7 w-7", "aria-label": "Zoom Out", title: "Zoom Out", children: /* @__PURE__ */ jsx5(ZoomOut, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ jsx5(Button, { variant: "ghost", size: "icon", onClick: () => setCurrentScale(1), className: "h-7 w-7", "aria-label": "Reset Zoom", title: "Fit Page", children: /* @__PURE__ */ jsx5(Maximize, { className: "h-3.5 w-3.5" }) }),
      /* @__PURE__ */ jsx5(Button, { variant: "ghost", size: "icon", onClick: () => setCurrentScale((s) => Math.min(s + 0.2, 3)), className: "h-7 w-7", "aria-label": "Zoom In", title: "Zoom In", children: /* @__PURE__ */ jsx5(ZoomIn, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ jsx5("div", { className: "w-px h-4 bg-border mx-1" }),
      /* @__PURE__ */ jsx5(Button, { variant: "ghost", size: "icon", onClick: () => setRotation((r) => (r + 90) % 360), className: "h-7 w-7", "aria-label": "Rotate", title: "Rotate", children: /* @__PURE__ */ jsx5(RotateCw, { className: "h-4 w-4" }) }),
      showDownload && /* @__PURE__ */ jsxs4(Fragment2, { children: [
        /* @__PURE__ */ jsx5("div", { className: "w-px h-4 bg-border mx-1" }),
        /* @__PURE__ */ jsx5(Button, { variant: "ghost", size: "icon", onClick: handleDownload, className: "h-7 w-7 text-primary hover:text-primary hover:bg-primary/10", "aria-label": "Download", title: "Download", children: /* @__PURE__ */ jsx5(Download, { className: "h-4 w-4" }) })
      ] }),
      showPrint && /* @__PURE__ */ jsxs4(Fragment2, { children: [
        !showDownload && /* @__PURE__ */ jsx5("div", { className: "w-px h-4 bg-border mx-1" }),
        /* @__PURE__ */ jsx5(Button, { variant: "ghost", size: "icon", onClick: handlePrint, className: "h-7 w-7 text-primary hover:text-primary hover:bg-primary/10", "aria-label": "Print", title: "Print", children: /* @__PURE__ */ jsx5(Printer, { className: "h-4 w-4" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx5("div", { className: "w-full flex justify-center p-4 overflow-auto shrink-0 max-h-[70vh]", children: error ? /* @__PURE__ */ jsxs4("div", { className: "h-48 w-full max-w-sm flex flex-col items-center justify-center text-center p-6 space-y-3", children: [
      /* @__PURE__ */ jsx5(FileWarning, { className: "w-10 h-10 text-destructive" }),
      /* @__PURE__ */ jsxs4("div", { children: [
        /* @__PURE__ */ jsx5("p", { className: "font-semibold text-foreground", children: "Failed to load PDF" }),
        /* @__PURE__ */ jsx5("p", { className: "text-sm text-muted-foreground", children: error.message })
      ] })
    ] }) : /* @__PURE__ */ jsx5(
      ErrorBoundary,
      {
        onError: (err) => {
          setError(err);
          onLoadError?.(err);
        },
        fallback: ({ error: err }) => /* @__PURE__ */ jsxs4("div", { className: "h-48 w-full max-w-sm flex flex-col items-center justify-center text-center p-6 space-y-3", children: [
          /* @__PURE__ */ jsx5(FileWarning, { className: "w-10 h-10 text-destructive" }),
          /* @__PURE__ */ jsxs4("div", { children: [
            /* @__PURE__ */ jsx5("p", { className: "font-semibold text-foreground", children: "Failed to load PDF" }),
            /* @__PURE__ */ jsx5("p", { className: "text-sm text-muted-foreground", children: err.message })
          ] })
        ] }),
        children: /* @__PURE__ */ jsx5(
          Document,
          {
            file,
            onLoadSuccess: handleDocumentLoadSuccess,
            onLoadError: handleDocumentLoadError,
            loading: /* @__PURE__ */ jsxs4("div", { className: "h-64 flex flex-col items-center justify-center space-y-4", children: [
              /* @__PURE__ */ jsx5(Loader22, { className: "h-8 w-8 animate-spin text-primary" }),
              /* @__PURE__ */ jsx5("p", { className: "text-sm text-muted-foreground", children: "Loading Document..." })
            ] }),
            error: null,
            className: "shadow-sm border border-border",
            children: /* @__PURE__ */ jsx5(
              Page,
              {
                pageNumber,
                scale: currentScale,
                rotate: rotation,
                width: maxWidth,
                renderAnnotationLayer: true,
                renderTextLayer: true,
                loading: /* @__PURE__ */ jsx5("div", { className: "h-[500px] w-[400px] bg-muted animate-pulse" })
              }
            )
          }
        )
      }
    ) }),
    numPages && numPages > 1 && !error && /* @__PURE__ */ jsxs4("div", { className: "w-full border-t bg-background p-3 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs4(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: () => setPageNumber((p) => Math.max(p - 1, 1)),
          disabled: pageNumber <= 1,
          children: [
            /* @__PURE__ */ jsx5(ChevronLeft, { className: "h-4 w-4 mr-1" }),
            " Previous"
          ]
        }
      ),
      /* @__PURE__ */ jsxs4("p", { className: "text-sm text-muted-foreground font-medium", children: [
        "Page ",
        pageNumber,
        " of ",
        numPages
      ] }),
      /* @__PURE__ */ jsxs4(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: () => setPageNumber((p) => Math.min(p + 1, numPages)),
          disabled: pageNumber >= numPages,
          children: [
            "Next ",
            /* @__PURE__ */ jsx5(ChevronRight, { className: "h-4 w-4 ml-1" })
          ]
        }
      )
    ] })
  ] });
}
export {
  PdfViewer
};
//# sourceMappingURL=pdf.js.map