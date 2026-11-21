/**
 * @module @abeta.dev/ui
 * Accessible, high-performance React 19 UI component primitives built with
 * Tailwind CSS v4 and Radix UI.
 */

// ─── Utilities & Lib Helpers ─────────────────────────────────────────────────
export * from "./utils";
export * from "./lib/platform";

// ─── Hooks ───────────────────────────────────────────────────────────────────
export * from "./hooks/use-mobile";
export * from "./hooks/use-debounce";
export * from "./hooks/use-local-storage";
export * from "./hooks/use-toast";
export * from "./hooks/use-platform";
export * from "./hooks/use-pwa-install";
export * from "./hooks/use-offline-queue";
export * from "./hooks/use-click-backpressure";
export * from "./hooks/use-local-first-store";

// ─── Forms & Inputs ──────────────────────────────────────────────────────────
export * from "./forms/async-select";
export * from "./forms/button";
export * from "./forms/button-group";
export * from "./forms/checkbox";
export * from "./forms/combobox";
export * from "./forms/field";
export * from "./forms/file-upload";
export * from "./forms/filter-select";
export * from "./forms/form";
export * from "./forms/input";
export * from "./forms/input-group";
export * from "./forms/input-otp";
export * from "./forms/label";
export * from "./forms/multi-select";
export * from "./forms/radio-group";
export * from "./forms/search-field";
export * from "./forms/select";
export * from "./forms/skill-tag-cloud";
export * from "./forms/slider";
export * from "./forms/switch";
export * from "./forms/textarea";
export * from "./forms/toggle";
export * from "./forms/toggle-group";

// ─── Layout & Page Primitives ────────────────────────────────────────────────
export * from "./layout/aspect-ratio";
export * from "./layout/card";
export * from "./layout/detail-grid";
export * from "./layout/page-header";
export * from "./layout/resizable";
export * from "./layout/scroll-area";
export * from "./layout/separator";

// ─── Data Display & Enterprise Composites ───────────────────────────────────
export * from "./data-display/ActiveFilterBadge";
export * from "./data-display/accordion";
export * from "./data-display/amount-summary-card";
export * from "./data-display/avatar";
export * from "./data-display/badge";
export * from "./data-display/bilingual-tooltip";
export * from "./data-display/carousel";
export * from "./data-display/chart";
export * from "./data-display/collapsible";
export * from "./data-display/data-table";
export * from "./data-display/image-viewer";
export * from "./data-display/info-list";
export * from "./data-display/kpi-card";
export * from "./data-display/line-items-card";
export * from "./data-display/match-score-gauge";
export * from "./data-display/metric-ticker";
export * from "./data-display/payment-ledger";
// Note: PdfViewer is exported exclusively via '@abeta.dev/ui/pdf' to safeguard Node.js SSR environments from DOMMatrix evaluation.
export * from "./data-display/pipeline-kanban";
export * from "./data-display/proof-of-work-card";
export * from "./data-display/proof-of-work-certificate";
export * from "./data-display/quota-card";
export * from "./data-display/radar-sweep";
export * from "./data-display/salary-range-display";
export * from "./data-display/status-badge";
export * from "./data-display/table";
export * from "./data-display/timeline";

// ─── Navigation ──────────────────────────────────────────────────────────────
export * from "./navigation/breadcrumb";
export * from "./navigation/menubar";
export * from "./navigation/mobile-bottom-nav";
export * from "./navigation/navigation-menu";
export * from "./navigation/onboarding-panel";
export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  DataTablePagination,
  type PaginationLinkProps,
  type PaginationPreviousProps,
  type PaginationNextProps,
  type StandalonePaginationProps,
} from "./navigation/pagination";
export * from "./navigation/persona-dropdown";
export * from "./navigation/sidebar";
export * from "./navigation/stepper";
export * from "./navigation/tabs";

// ─── Overlays & Drawers ──────────────────────────────────────────────────────
export * from "./overlays/alert-dialog";
export * from "./overlays/command";
export * from "./overlays/confirm-dialog";
export * from "./overlays/context-menu";
export * from "./overlays/create-entity-panel";
export * from "./overlays/diagnostic-quiz";
export * from "./overlays/dialog";
export * from "./overlays/drawer";
export * from "./overlays/dropdown-menu";
export * from "./overlays/hover-card";
export * from "./overlays/sheet";
export * from "./overlays/tooltip";

// ─── Feedback, Loading & Status ──────────────────────────────────────────────
export * from "./feedback/alert";
export * from "./feedback/app-splash-screen";
export * from "./feedback/banner";
export * from "./feedback/checkpoint-runner";
export * from "./feedback/copy-button";
export * from "./feedback/empty";
export * from "./feedback/empty-state";
export * from "./feedback/error-boundary";
export * from "./feedback/error-state";
export * from "./feedback/impersonation-banner";
export * from "./feedback/install-pwa-banner";
export * from "./feedback/loading-state";
export * from "./feedback/onboarding-notice";
export * from "./feedback/progress";
export * from "./feedback/progress-ring";
export * from "./feedback/reaction-bar";
export * from "./feedback/role-empty-state";
export * from "./feedback/skeleton";
export * from "./feedback/skeleton-list";
export { Toaster as SonnerToaster, Toaster as Sonner } from "./feedback/sonner";
export * from "./feedback/spinner";
export * from "./feedback/success-micro-interaction";
export * from "./feedback/toast";
export * from "./feedback/toaster";
export * from "./feedback/workspace-banner";

// ─── Core & Primitives ───────────────────────────────────────────────────────
export * from "./core/calendar";
export * from "./core/date-range-picker";
export * from "./core/item";
export * from "./core/kbd";
export * from "./core/language-toggle";
export * from "./core/popover";
export * from "./core/typography";
