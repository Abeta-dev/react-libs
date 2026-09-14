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

// src/index.ts
var src_exports = {};
__export(src_exports, {
  Accordion: () => Accordion,
  AccordionContent: () => AccordionContent,
  AccordionItem: () => AccordionItem,
  AccordionTrigger: () => AccordionTrigger,
  ActiveFilterBadge: () => ActiveFilterBadge,
  Alert: () => Alert,
  AlertDescription: () => AlertDescription,
  AlertDialog: () => AlertDialog,
  AlertDialogAction: () => AlertDialogAction,
  AlertDialogCancel: () => AlertDialogCancel,
  AlertDialogContent: () => AlertDialogContent,
  AlertDialogDescription: () => AlertDialogDescription,
  AlertDialogFooter: () => AlertDialogFooter,
  AlertDialogHeader: () => AlertDialogHeader,
  AlertDialogOverlay: () => AlertDialogOverlay,
  AlertDialogPortal: () => AlertDialogPortal,
  AlertDialogTitle: () => AlertDialogTitle,
  AlertDialogTrigger: () => AlertDialogTrigger,
  AlertTitle: () => AlertTitle,
  AmountSummaryCard: () => AmountSummaryCard,
  AnalyticsEngine: () => AnalyticsEngine,
  AnalyticsQueue: () => AnalyticsQueue,
  AppSplashScreen: () => AppSplashScreen,
  AspectRatio: () => AspectRatio,
  AsyncSelect: () => AsyncSelect,
  Avatar: () => Avatar,
  AvatarFallback: () => AvatarFallback,
  AvatarGroup: () => AvatarGroup,
  AvatarImage: () => AvatarImage,
  Badge: () => Badge,
  Banner: () => Banner,
  BilingualTooltip: () => BilingualTooltip,
  Breadcrumb: () => Breadcrumb,
  BreadcrumbEllipsis: () => BreadcrumbEllipsis,
  BreadcrumbItem: () => BreadcrumbItem,
  BreadcrumbLink: () => BreadcrumbLink,
  BreadcrumbList: () => BreadcrumbList,
  BreadcrumbPage: () => BreadcrumbPage,
  BreadcrumbSeparator: () => BreadcrumbSeparator,
  Button: () => Button,
  ButtonGroup: () => ButtonGroup,
  ButtonGroupSeparator: () => ButtonGroupSeparator,
  ButtonGroupText: () => ButtonGroupText,
  Calendar: () => Calendar,
  Card: () => Card,
  CardContent: () => CardContent,
  CardDescription: () => CardDescription,
  CardFooter: () => CardFooter,
  CardHeader: () => CardHeader,
  CardSeparator: () => CardSeparator,
  CardTitle: () => CardTitle,
  Carousel: () => Carousel,
  CarouselContent: () => CarouselContent,
  CarouselDots: () => CarouselDots,
  CarouselItem: () => CarouselItem,
  CarouselNext: () => CarouselNext,
  CarouselPrevious: () => CarouselPrevious,
  ChartContainer: () => ChartContainer,
  ChartLegend: () => ChartLegend,
  ChartLegendContent: () => ChartLegendContent,
  ChartStyle: () => ChartStyle,
  ChartTooltip: () => ChartTooltip,
  ChartTooltipContent: () => ChartTooltipContent,
  Checkbox: () => Checkbox,
  Collapsible: () => Collapsible,
  CollapsibleCard: () => CollapsibleCard,
  CollapsibleCardContent: () => CollapsibleCardContent,
  CollapsibleCardTrigger: () => CollapsibleCardTrigger,
  CollapsibleContent: () => CollapsibleContent2,
  CollapsibleTrigger: () => CollapsibleTrigger2,
  Combobox: () => Combobox,
  Command: () => Command,
  CommandDialog: () => CommandDialog,
  CommandEmpty: () => CommandEmpty,
  CommandGroup: () => CommandGroup,
  CommandInput: () => CommandInput,
  CommandItem: () => CommandItem,
  CommandList: () => CommandList,
  CommandSeparator: () => CommandSeparator,
  CommandShortcut: () => CommandShortcut,
  CompensationRangeDisplay: () => CompensationRangeDisplay,
  ConfirmDialog: () => ConfirmDialog,
  ConsoleAdapter: () => ConsoleAdapter,
  ContextMenu: () => ContextMenu,
  ContextMenuCheckboxItem: () => ContextMenuCheckboxItem,
  ContextMenuContent: () => ContextMenuContent,
  ContextMenuGroup: () => ContextMenuGroup,
  ContextMenuItem: () => ContextMenuItem,
  ContextMenuLabel: () => ContextMenuLabel,
  ContextMenuPortal: () => ContextMenuPortal,
  ContextMenuRadioGroup: () => ContextMenuRadioGroup,
  ContextMenuRadioItem: () => ContextMenuRadioItem,
  ContextMenuSeparator: () => ContextMenuSeparator,
  ContextMenuShortcut: () => ContextMenuShortcut,
  ContextMenuSub: () => ContextMenuSub,
  ContextMenuSubContent: () => ContextMenuSubContent,
  ContextMenuSubTrigger: () => ContextMenuSubTrigger,
  ContextMenuTrigger: () => ContextMenuTrigger,
  CopyButton: () => CopyButton,
  CreateEntityPanel: () => CreateEntityPanel,
  DEFAULT_LANGUAGES: () => DEFAULT_LANGUAGES,
  DataTable: () => DataTable,
  DataTablePagination: () => DataTablePagination,
  DatePickerWithRange: () => DatePickerWithRange,
  DetailGrid: () => DetailGrid,
  Dialog: () => Dialog,
  DialogClose: () => DialogClose,
  DialogContent: () => DialogContent,
  DialogDescription: () => DialogDescription,
  DialogFooter: () => DialogFooter,
  DialogHeader: () => DialogHeader,
  DialogOverlay: () => DialogOverlay,
  DialogPortal: () => DialogPortal,
  DialogTitle: () => DialogTitle,
  DialogTrigger: () => DialogTrigger,
  DomTracker: () => DomTracker,
  Drawer: () => Drawer,
  DrawerClose: () => DrawerClose,
  DrawerContent: () => DrawerContent,
  DrawerDescription: () => DrawerDescription,
  DrawerFooter: () => DrawerFooter,
  DrawerHeader: () => DrawerHeader,
  DrawerOverlay: () => DrawerOverlay,
  DrawerPortal: () => DrawerPortal,
  DrawerTitle: () => DrawerTitle,
  DrawerTrigger: () => DrawerTrigger,
  DropdownMenu: () => DropdownMenu,
  DropdownMenuCheckboxItem: () => DropdownMenuCheckboxItem,
  DropdownMenuContent: () => DropdownMenuContent,
  DropdownMenuGroup: () => DropdownMenuGroup,
  DropdownMenuItem: () => DropdownMenuItem,
  DropdownMenuLabel: () => DropdownMenuLabel,
  DropdownMenuPortal: () => DropdownMenuPortal,
  DropdownMenuRadioGroup: () => DropdownMenuRadioGroup,
  DropdownMenuRadioItem: () => DropdownMenuRadioItem,
  DropdownMenuSeparator: () => DropdownMenuSeparator,
  DropdownMenuShortcut: () => DropdownMenuShortcut,
  DropdownMenuSub: () => DropdownMenuSub,
  DropdownMenuSubContent: () => DropdownMenuSubContent,
  DropdownMenuSubTrigger: () => DropdownMenuSubTrigger,
  DropdownMenuTrigger: () => DropdownMenuTrigger,
  Empty: () => Empty,
  EmptyContent: () => EmptyContent,
  EmptyDescription: () => EmptyDescription,
  EmptyHeader: () => EmptyHeader,
  EmptyMedia: () => EmptyMedia,
  EmptyState: () => EmptyState,
  EmptyTitle: () => EmptyTitle,
  ErrorBoundary: () => ErrorBoundary,
  ErrorState: () => ErrorState,
  Field: () => Field,
  FieldContent: () => FieldContent,
  FieldDescription: () => FieldDescription,
  FieldError: () => FieldError,
  FieldGroup: () => FieldGroup,
  FieldLabel: () => FieldLabel,
  FieldLegend: () => FieldLegend,
  FieldSeparator: () => FieldSeparator,
  FieldSet: () => FieldSet,
  FieldTitle: () => FieldTitle,
  FileUpload: () => FileUpload,
  FilterSelect: () => FilterSelect,
  Form: () => Form,
  FormControl: () => FormControl,
  FormDescription: () => FormDescription,
  FormField: () => FormField,
  FormItem: () => FormItem,
  FormLabel: () => FormLabel,
  FormMessage: () => FormMessage,
  GoogleAnalyticsAdapter: () => GoogleAnalyticsAdapter,
  HoverCard: () => HoverCard,
  HoverCardContent: () => HoverCardContent,
  HoverCardTrigger: () => HoverCardTrigger,
  HttpAdapter: () => HttpAdapter,
  ImageViewer: () => ImageViewer,
  ImpersonationBanner: () => ImpersonationBanner,
  InfoList: () => InfoList,
  Input: () => Input,
  InputGroup: () => InputGroup,
  InputGroupAddon: () => InputGroupAddon,
  InputGroupButton: () => InputGroupButton,
  InputGroupInput: () => InputGroupInput,
  InputGroupText: () => InputGroupText,
  InputGroupTextarea: () => InputGroupTextarea,
  InputOTP: () => InputOTP,
  InputOTPGroup: () => InputOTPGroup,
  InputOTPSeparator: () => InputOTPSeparator,
  InputOTPSlot: () => InputOTPSlot,
  InstallPwaBanner: () => InstallPwaBanner,
  Item: () => Item9,
  ItemActions: () => ItemActions,
  ItemContent: () => ItemContent,
  ItemDescription: () => ItemDescription,
  ItemFooter: () => ItemFooter,
  ItemGroup: () => ItemGroup,
  ItemHeader: () => ItemHeader,
  ItemMedia: () => ItemMedia,
  ItemSeparator: () => ItemSeparator,
  ItemTitle: () => ItemTitle,
  KPICard: () => KPICard,
  Kbd: () => Kbd,
  KbdGroup: () => KbdGroup,
  KbdShortcut: () => KbdShortcut,
  Label: () => Label,
  LanguageToggle: () => LanguageToggle,
  LineItemsCard: () => LineItemsCard,
  LoadingState: () => LoadingState,
  MatchScoreGauge: () => MatchScoreGauge,
  Menubar: () => Menubar,
  MenubarCheckboxItem: () => MenubarCheckboxItem,
  MenubarContent: () => MenubarContent,
  MenubarGroup: () => MenubarGroup,
  MenubarItem: () => MenubarItem,
  MenubarLabel: () => MenubarLabel,
  MenubarMenu: () => MenubarMenu,
  MenubarPortal: () => MenubarPortal,
  MenubarRadioGroup: () => MenubarRadioGroup,
  MenubarRadioItem: () => MenubarRadioItem,
  MenubarSeparator: () => MenubarSeparator,
  MenubarShortcut: () => MenubarShortcut,
  MenubarSub: () => MenubarSub,
  MenubarSubContent: () => MenubarSubContent,
  MenubarSubTrigger: () => MenubarSubTrigger,
  MenubarTrigger: () => MenubarTrigger,
  MetricCard: () => KPICard,
  MetricGrid: () => DetailGrid,
  MetricRangeDisplay: () => MetricRangeDisplay,
  MetricTicker: () => MetricTicker,
  MetricVerificationCard: () => MetricVerificationCard,
  MixpanelAdapter: () => MixpanelAdapter,
  MobileBottomNav: () => MobileBottomNav,
  MultiSelect: () => MultiSelect,
  NavigationMenu: () => NavigationMenu,
  NavigationMenuContent: () => NavigationMenuContent,
  NavigationMenuIndicator: () => NavigationMenuIndicator,
  NavigationMenuItem: () => NavigationMenuItem,
  NavigationMenuLink: () => NavigationMenuLink,
  NavigationMenuList: () => NavigationMenuList,
  NavigationMenuTrigger: () => NavigationMenuTrigger,
  NavigationMenuViewport: () => NavigationMenuViewport,
  OnboardingNotice: () => OnboardingNotice,
  OnboardingPanel: () => OnboardingPanel,
  PageHeader: () => PageHeader,
  PageHeaderSkeleton: () => PageHeaderSkeleton,
  Pagination: () => Pagination,
  PaginationContent: () => PaginationContent,
  PaginationEllipsis: () => PaginationEllipsis,
  PaginationItem: () => PaginationItem,
  PaginationLink: () => PaginationLink,
  PaginationNext: () => PaginationNext,
  PaginationPrevious: () => PaginationPrevious,
  PaymentLedger: () => PaymentLedger,
  PersonaDropdown: () => PersonaDropdown,
  PipelineKanban: () => PipelineKanban,
  Popover: () => Popover,
  PopoverAnchor: () => PopoverAnchor,
  PopoverClose: () => PopoverClose,
  PopoverContent: () => PopoverContent,
  PopoverTrigger: () => PopoverTrigger,
  Progress: () => Progress,
  ProgressRing: () => ProgressRing,
  ProofOfWorkCard: () => ProofOfWorkCard,
  QuotaCard: () => QuotaCard,
  REGEX_BANK_ACCOUNT: () => REGEX_BANK_ACCOUNT,
  REGEX_EMAIL: () => REGEX_EMAIL,
  REGEX_PHONE: () => REGEX_PHONE,
  REGEX_POSTAL_CODE: () => REGEX_POSTAL_CODE,
  REGEX_ROUTING_CODE: () => REGEX_ROUTING_CODE,
  REGEX_TAX_ID: () => REGEX_TAX_ID,
  REGEX_URL: () => REGEX_URL,
  RadarSweep: () => RadarSweep,
  RadioGroup: () => RadioGroup,
  RadioGroupItem: () => RadioGroupItem,
  ResizableHandle: () => ResizableHandle,
  ResizablePanel: () => ResizablePanel,
  ResizablePanelGroup: () => ResizablePanelGroup,
  RoleEmptyState: () => RoleEmptyState,
  SalaryRangeDisplay: () => SalaryRangeDisplay,
  ScrollArea: () => ScrollArea,
  ScrollBar: () => ScrollBar,
  SearchField: () => SearchField,
  Select: () => Select,
  SelectContent: () => SelectContent,
  SelectGroup: () => SelectGroup,
  SelectItem: () => SelectItem,
  SelectLabel: () => SelectLabel,
  SelectScrollDownButton: () => SelectScrollDownButton,
  SelectScrollUpButton: () => SelectScrollUpButton,
  SelectSeparator: () => SelectSeparator,
  SelectTrigger: () => SelectTrigger,
  SelectValue: () => SelectValue,
  Separator: () => Separator,
  SessionManager: () => SessionManager,
  Sheet: () => Sheet,
  SheetClose: () => SheetClose,
  SheetContent: () => SheetContent,
  SheetDescription: () => SheetDescription,
  SheetFooter: () => SheetFooter,
  SheetHeader: () => SheetHeader,
  SheetOverlay: () => SheetOverlay,
  SheetPortal: () => SheetPortal,
  SheetTitle: () => SheetTitle,
  SheetTrigger: () => SheetTrigger,
  Sidebar: () => Sidebar,
  SidebarContent: () => SidebarContent,
  SidebarFooter: () => SidebarFooter,
  SidebarGroup: () => SidebarGroup,
  SidebarGroupAction: () => SidebarGroupAction,
  SidebarGroupContent: () => SidebarGroupContent,
  SidebarGroupLabel: () => SidebarGroupLabel,
  SidebarHeader: () => SidebarHeader,
  SidebarInput: () => SidebarInput,
  SidebarInset: () => SidebarInset,
  SidebarMenu: () => SidebarMenu,
  SidebarMenuAction: () => SidebarMenuAction,
  SidebarMenuBadge: () => SidebarMenuBadge,
  SidebarMenuButton: () => SidebarMenuButton,
  SidebarMenuItem: () => SidebarMenuItem,
  SidebarMenuSkeleton: () => SidebarMenuSkeleton,
  SidebarMenuSub: () => SidebarMenuSub,
  SidebarMenuSubButton: () => SidebarMenuSubButton,
  SidebarMenuSubItem: () => SidebarMenuSubItem,
  SidebarProvider: () => SidebarProvider,
  SidebarRail: () => SidebarRail,
  SidebarSeparator: () => SidebarSeparator,
  SidebarTrigger: () => SidebarTrigger,
  Skeleton: () => Skeleton,
  SkeletonList: () => SkeletonList,
  SkillTagCloud: () => SkillTagCloud,
  Slider: () => Slider,
  Sonner: () => Toaster,
  SonnerToaster: () => Toaster,
  Spinner: () => Spinner,
  StandardCard: () => StandardCard,
  StatGrid: () => DetailGrid,
  StatusBadge: () => StatusBadge,
  Stepper: () => Stepper,
  Switch: () => Switch,
  Table: () => Table,
  TableBody: () => TableBody,
  TableCaption: () => TableCaption,
  TableCell: () => TableCell,
  TableFooter: () => TableFooter,
  TableHead: () => TableHead,
  TableHeader: () => TableHeader,
  TableRow: () => TableRow,
  Tabs: () => Tabs,
  TabsContent: () => TabsContent,
  TabsList: () => TabsList,
  TabsTrigger: () => TabsTrigger,
  Textarea: () => Textarea,
  Timeline: () => Timeline,
  Toast: () => Toast,
  ToastAction: () => ToastAction,
  ToastClose: () => ToastClose,
  ToastDescription: () => ToastDescription,
  ToastProvider: () => ToastProvider,
  ToastTitle: () => ToastTitle,
  ToastViewport: () => ToastViewport,
  Toaster: () => Toaster2,
  Toggle: () => Toggle,
  ToggleGroup: () => ToggleGroup,
  ToggleGroupItem: () => ToggleGroupItem,
  Tooltip: () => Tooltip2,
  TooltipArrow: () => TooltipArrow,
  TooltipContent: () => TooltipContent,
  TooltipProvider: () => TooltipProvider,
  TooltipTrigger: () => TooltipTrigger,
  Typography: () => Typography,
  VALIDATION_MESSAGES: () => VALIDATION_MESSAGES,
  VALIDATION_MESSAGES_HI: () => VALIDATION_MESSAGES_HI,
  WorkspaceBanner: () => WorkspaceBanner,
  avatarVariants: () => avatarVariants,
  badgeVariants: () => badgeVariants,
  buttonGroupVariants: () => buttonGroupVariants,
  buttonVariants: () => buttonVariants,
  cleanPhoneNumber: () => cleanPhoneNumber,
  clearBlobStorageConfig: () => clearBlobStorageConfig,
  cn: () => cn,
  downloadFileFromStorage: () => downloadFileFromStorage,
  downloadFileSecurely: () => downloadFileSecurely,
  downloadFromBackend: () => downloadFromBackend,
  exportData: () => exportData,
  exportToCSV: () => exportToCSV,
  fetchBlobStorageConfig: () => fetchBlobStorageConfig,
  filterCitiesByState: () => filterCitiesByState,
  formatBytes: () => formatBytes,
  formatCurrency: () => formatCurrency,
  formatDate: () => formatDate,
  formatDateTime: () => formatDateTime,
  formatFileSize: () => formatFileSize,
  formatLocalizedDate: () => formatLocalizedDate,
  formatLocalizedDateTime: () => formatLocalizedDateTime,
  formatLocalizedNumber: () => formatLocalizedNumber,
  formatNumber: () => formatNumber,
  formatPercent: () => formatPercent,
  formatQuantity: () => formatQuantity,
  formatRelativeTime: () => formatRelativeTime,
  formatWeight: () => formatWeight,
  generateUUID: () => generateUUID,
  getAnalyticsEngine: () => getAnalyticsEngine,
  getPlatformInfo: () => getPlatformInfo,
  initAnalytics: () => initAnalytics,
  isValidEmail: () => isValidEmail,
  isValidPhone: () => isValidPhone,
  maskSensitiveValue: () => maskSensitiveValue,
  nativeShare: () => nativeShare,
  navigationMenuTriggerStyle: () => navigationMenuTriggerStyle,
  reducer: () => reducer,
  runConfettiAnimation: () => runConfettiAnimation,
  setBlobStorageApiBase: () => setBlobStorageApiBase,
  setGlobalAuditLogger: () => setGlobalAuditLogger,
  toCityOptions: () => toCityOptions,
  toStateOptions: () => toStateOptions,
  toast: () => toast,
  toggleVariants: () => toggleVariants,
  triggerEmeraldConfetti: () => triggerEmeraldConfetti,
  triggerGovernanceConfetti: () => triggerGovernanceConfetti,
  triggerHaptic: () => triggerHaptic,
  triggerMicroConfetti: () => triggerMicroConfetti,
  triggerSuccessConfetti: () => triggerSuccessConfetti,
  typographyVariants: () => typographyVariants,
  uploadFileToStorage: () => uploadFileToStorage,
  useDebounce: () => useDebounce,
  useErrorBoundary: () => useErrorBoundary,
  useFormField: () => useFormField,
  useIsMobile: () => useIsMobile,
  useLocalStorage: () => useLocalStorage,
  useOfflineQueue: () => useOfflineQueue,
  usePWAInstall: () => usePWAInstall,
  usePlatform: () => usePlatform,
  useSidebar: () => useSidebar,
  useToast: () => useToast,
  validateBankAccount: () => validateBankAccount,
  validateDateRange: () => validateDateRange,
  validateEmail: () => validateEmail,
  validatePassword: () => validatePassword,
  validatePhone: () => validatePhone,
  validatePositiveNumber: () => validatePositiveNumber,
  validatePostalCode: () => validatePostalCode,
  validateRequired: () => validateRequired,
  validateRoutingCode: () => validateRoutingCode,
  validateTaxId: () => validateTaxId,
  validateTimeRange: () => validateTimeRange,
  validateUrl: () => validateUrl,
  withAuditTrail: () => withAuditTrail,
  withErrorBoundary: () => withErrorBoundary
});
module.exports = __toCommonJS(src_exports);

// src/lib/utils.ts
var import_clsx = require("clsx");
var import_tailwind_merge = require("tailwind-merge");
function cn(...inputs) {
  return (0, import_tailwind_merge.twMerge)((0, import_clsx.clsx)(inputs));
}

// src/lib/formatters.ts
function formatCurrency(amount, currency = "USD", locale = "en-US") {
  const value = typeof amount === "string" ? parseFloat(amount) : amount;
  if (value == null || isNaN(value)) return "\u2014";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}
function formatNumber(value, options, locale = "en-US") {
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (num == null || isNaN(num)) return "\u2014";
  return new Intl.NumberFormat(locale, options).format(num);
}
function formatDate(date, options, locale = "en-US") {
  if (!date) return "\u2014";
  const d = typeof date === "string" ? new Date(date) : date;
  if (!d || typeof d.getTime !== "function" || isNaN(d.getTime())) return "\u2014";
  return d.toLocaleDateString(locale, options ?? {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
function formatDateTime(date, locale = "en-US") {
  if (!date) return "\u2014";
  const d = typeof date === "string" ? new Date(date) : date;
  if (!d || typeof d.getTime !== "function" || isNaN(d.getTime())) return "\u2014";
  return d.toLocaleString(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });
}
function formatRelativeTime(date) {
  if (!date) return "\u2014";
  const d = typeof date === "string" ? new Date(date) : date;
  if (!d || typeof d.getTime !== "function" || isNaN(d.getTime())) return "\u2014";
  const diffMs = d.getTime() - Date.now();
  const diffSec = Math.round(diffMs / 1e3);
  const diffMin = Math.round(diffSec / 60);
  const diffHr = Math.round(diffMin / 60);
  const diffDay = Math.round(diffHr / 24);
  if (Math.abs(diffSec) < 60) return "just now";
  if (Math.abs(diffMin) < 60)
    return diffMin > 0 ? `in ${diffMin}m` : `${Math.abs(diffMin)}m ago`;
  if (Math.abs(diffHr) < 24)
    return diffHr > 0 ? `in ${diffHr}h` : `${Math.abs(diffHr)}h ago`;
  if (Math.abs(diffDay) <= 7)
    return diffDay > 0 ? `in ${diffDay}d` : `${Math.abs(diffDay)}d ago`;
  return formatDate(d);
}
function formatWeight(value, unit = "kg", locale = "en-US") {
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (num == null || isNaN(num)) return "\u2014";
  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 3
  }).format(num);
  return `${formatted} ${unit}`;
}
function formatQuantity(value, unit, locale = "en-US") {
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (num == null || isNaN(num)) return "\u2014";
  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(num);
  return unit ? `${formatted} ${unit}` : formatted;
}
function formatFileSize(bytes) {
  if (bytes == null || isNaN(bytes)) return "\u2014";
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const val = bytes / Math.pow(1024, i);
  return `${val.toFixed(i > 0 ? 1 : 0)} ${units[Math.min(i, units.length - 1)]}`;
}
function formatPercent(value, isRatio = true, decimals = 1) {
  if (value == null || isNaN(value)) return "\u2014";
  const pct = isRatio ? value * 100 : value;
  return `${pct.toFixed(decimals)}%`;
}
function formatLocalizedDate(date, locale = "en-US") {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  if (!d || typeof d.getTime !== "function" || isNaN(d.getTime())) return date?.toString?.() ?? "";
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(d);
}
function formatLocalizedDateTime(date, locale = "en-US") {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  if (!d || typeof d.getTime !== "function" || isNaN(d.getTime())) return date?.toString?.() ?? "";
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  }).format(d);
}
function formatLocalizedNumber(value, locale = "en-US") {
  if (value == null || isNaN(value)) return "";
  return new Intl.NumberFormat(locale, {
    maximumFractionDigits: 2
  }).format(value);
}
function formatBytes(bytes, decimals = 1) {
  if (!bytes || bytes <= 0) return "0 B";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(k)), sizes.length - 1);
  const unit = sizes[Number(i)] || "B";
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${unit}`;
}

// src/lib/export-utils.ts
async function exportData(data, filename, format2 = "csv", options = {}) {
  if (!data || !data.length) {
    console.warn("exportData: empty data array \u2014 nothing to export");
    return;
  }
  const keys = options.columns ? options.columns.map((c) => c.key) : Object.keys(data[0] ?? {});
  const headers = options.columns ? options.columns.map((c) => c.header) : keys;
  if (format2 === "csv") {
    const sanitizeCell = (val) => {
      if (val == null) return '""';
      const str = String(val);
      const isFormula = /^[=+\-@\t\r]/.test(str);
      const isNumber = !isNaN(Number(str)) && str.trim() !== "";
      const safeStr = isFormula && !isNumber ? `'${str}` : str;
      return `"${safeStr.replace(/"/g, '""')}"`;
    };
    const rows = [
      headers.map((h) => sanitizeCell(h)).join(","),
      ...data.map(
        (row) => keys.map((k) => {
          return sanitizeCell(row[k]);
        }).join(",")
      )
    ];
    triggerDownload(new Blob([rows.join("\n")], { type: "text/csv;charset=utf-8" }), `${filename}.csv`);
    return;
  }
  if (format2 === "xlsx") {
    let XLSX;
    try {
      const moduleName = "xlsx";
      const xlsxModule = await import(
        /* @vite-ignore */
        moduleName
      );
      XLSX = xlsxModule.default || xlsxModule;
    } catch {
      throw new Error(
        'XLSX export requires the "xlsx" package. Please install it: npm install xlsx'
      );
    }
    const wsData = [headers, ...data.map((row) => keys.map((k) => row[k]))];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, `${filename}.xlsx`);
    return;
  }
  if (format2 === "pdf") {
    let jsPDF;
    let autoTable;
    try {
      const jsPdfPkg = "jspdf";
      const autoTablePkg = "jspdf-autotable";
      const [jsPDFModule, autoTableModule] = await Promise.all([
        import(
          /* @vite-ignore */
          jsPdfPkg
        ),
        import(
          /* @vite-ignore */
          autoTablePkg
        )
      ]);
      jsPDF = jsPDFModule.default || jsPDFModule;
      autoTable = autoTableModule.default || autoTableModule;
    } catch {
      throw new Error(
        'PDF export requires "jspdf" and "jspdf-autotable" packages. Please install them: npm install jspdf jspdf-autotable'
      );
    }
    const orientation = options.pdfOrientation ?? "landscape";
    const doc = new jsPDF(orientation);
    const title = options.pdfTitle ?? filename.replace(/_/g, " ").toUpperCase();
    doc.text(title, 14, 15);
    autoTable(doc, {
      head: [headers],
      // eslint-disable-next-line security/detect-object-injection
      body: data.map((row) => keys.map((k) => row[k] == null ? "" : String(row[k]))),
      startY: 20,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [15, 23, 42] }
    });
    doc.save(`${filename}.pdf`);
  }
}
async function downloadFileSecurely(endpoint, filename, queryParams = {}, tokenKey = "auth_jwt", signalOrApiBase, apiBaseParam) {
  const signal = signalOrApiBase instanceof AbortSignal ? signalOrApiBase : void 0;
  const apiBase = typeof signalOrApiBase === "string" ? signalOrApiBase : apiBaseParam;
  const token = typeof window !== "undefined" ? localStorage.getItem(tokenKey) || localStorage.getItem("jwt") || "" : "";
  if (!token) throw new Error("Not authenticated \u2014 please log in again.");
  const base = apiBase ?? "";
  const fullEndpoint = endpoint.startsWith("http") ? endpoint : `${base}${endpoint}`;
  const response = await fetch(`${fullEndpoint}?${new URLSearchParams(queryParams).toString()}`, {
    method: "GET",
    headers: { "Authorization": `Bearer ${token}` },
    ...signal ? { signal } : {}
  });
  if (!response.ok) throw new Error(`Download failed: ${response.statusText}`);
  const blob = await response.blob();
  if (typeof window !== "undefined" && typeof document !== "undefined") {
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  }
}
var downloadFromBackend = downloadFileSecurely;
function exportToCSV(data, filename) {
  void exportData(data, filename, "csv");
}
function triggerDownload(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    if (a.parentNode) {
      a.parentNode.removeChild(a);
    }
    URL.revokeObjectURL(url);
  }, 200);
}

// src/lib/validators.ts
var REGEX_EMAIL = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
var REGEX_PHONE = /^\+?[1-9]\d{6,14}$/;
var REGEX_POSTAL_CODE = /^[A-Za-z0-9\s-]{3,10}$/;
var REGEX_TAX_ID = /^[A-Za-z0-9\s-]{6,20}$/;
var REGEX_BANK_ACCOUNT = /^[A-Za-z0-9]{6,34}$/;
var REGEX_ROUTING_CODE = /^[A-Za-z0-9]{4,11}$/;
var REGEX_URL = /^https?:\/\/[^\s/$.?#].[^\s]*$/i;
var VALIDATION_MESSAGES = {
  email: "Enter a valid email address",
  phone: "Enter a valid international phone number",
  postalCode: "Enter a valid postal or ZIP code",
  taxId: "Enter a valid tax identification number",
  bankAccount: "Enter a valid bank account or IBAN number",
  routingCode: "Enter a valid routing code or SWIFT/BIC",
  url: "Enter a valid URL (e.g. https://example.com)"
};
var VALIDATION_MESSAGES_HI = {
  email: "\u0915\u0943\u092A\u092F\u093E \u090F\u0915 \u0935\u0948\u0927 \u0908\u092E\u0947\u0932 \u092A\u0924\u093E \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902 (\u0909\u0926\u093E. user@example.com)",
  phone: "\u0915\u0943\u092A\u092F\u093E \u090F\u0915 \u0935\u0948\u0927 \u0905\u0902\u0924\u0930\u094D\u0930\u093E\u0937\u094D\u091F\u094D\u0930\u0940\u092F \u092B\u093C\u094B\u0928 \u0928\u0902\u092C\u0930 \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902",
  postalCode: "\u0915\u0943\u092A\u092F\u093E \u090F\u0915 \u0935\u0948\u0927 \u092A\u093F\u0928 \u092F\u093E \u092A\u094B\u0938\u094D\u091F\u0932 \u0915\u094B\u0921 \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902",
  taxId: "\u0915\u0943\u092A\u092F\u093E \u090F\u0915 \u0935\u0948\u0927 \u0915\u0930 \u092A\u0939\u091A\u093E\u0928 \u0938\u0902\u0916\u094D\u092F\u093E (Tax ID) \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902",
  bankAccount: "\u0915\u0943\u092A\u092F\u093E \u090F\u0915 \u0935\u0948\u0927 \u092C\u0948\u0902\u0915 \u0916\u093E\u0924\u093E \u092F\u093E IBAN \u0938\u0902\u0916\u094D\u092F\u093E \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902",
  routingCode: "\u0915\u0943\u092A\u092F\u093E \u090F\u0915 \u0935\u0948\u0927 \u0930\u0942\u091F\u093F\u0902\u0917 \u0915\u094B\u0921 \u092F\u093E SWIFT/BIC \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902",
  url: "\u0915\u0943\u092A\u092F\u093E \u090F\u0915 \u0935\u0948\u0927 URL \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902 (\u0909\u0926\u093E. https://example.com)"
};
function cleanPhoneNumber(phone) {
  if (!phone || typeof phone !== "string") return "";
  let digits = phone.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) {
    digits = digits.slice(2);
  }
  if (digits.length === 11 && digits.startsWith("0")) {
    digits = digits.slice(1);
  }
  return digits;
}
function isValidEmail(email) {
  if (!email || typeof email !== "string") return false;
  const trimmed = email.trim();
  if (trimmed.length < 5 || trimmed.length > 254) return false;
  return REGEX_EMAIL.test(trimmed);
}
function isValidPhone(phone, mode = "INTL") {
  const cleaned = cleanPhoneNumber(phone);
  if (!cleaned) return false;
  if (mode === "IN") {
    return cleaned.length === 10 && /^[6-9]\d{9}$/.test(cleaned);
  }
  return cleaned.length >= 7 && cleaned.length <= 15;
}
function validateEmail(value, options = {}) {
  const v = value.trim();
  const lang = options.language ?? "en";
  if (!v) return lang === "hi" ? "\u0908\u092E\u0947\u0932 \u092A\u0924\u093E \u0906\u0935\u0936\u094D\u092F\u0915 \u0939\u0948" : "Email address is required";
  if (!REGEX_EMAIL.test(v)) {
    return lang === "hi" ? VALIDATION_MESSAGES_HI.email : VALIDATION_MESSAGES.email;
  }
}
function validatePhone(value, options = {}) {
  const v = value.trim().replace(/[\s()-]/g, "");
  const lang = options.language ?? "en";
  if (!v) return lang === "hi" ? "\u092B\u093C\u094B\u0928 \u0928\u0902\u092C\u0930 \u0906\u0935\u0936\u094D\u092F\u0915 \u0939\u0948" : "Phone number is required";
  if (!REGEX_PHONE.test(v)) {
    return lang === "hi" ? VALIDATION_MESSAGES_HI.phone : VALIDATION_MESSAGES.phone;
  }
}
function validatePostalCode(value, options = {}) {
  const v = value.trim();
  const lang = options.language ?? "en";
  if (!v) return lang === "hi" ? "\u092A\u094B\u0938\u094D\u091F\u0932 \u0915\u094B\u0921 \u0906\u0935\u0936\u094D\u092F\u0915 \u0939\u0948" : "Postal code is required";
  if (!REGEX_POSTAL_CODE.test(v)) {
    return lang === "hi" ? VALIDATION_MESSAGES_HI.postalCode : VALIDATION_MESSAGES.postalCode;
  }
}
function validateTaxId(value, options = {}) {
  const v = value.trim();
  const lang = options.language ?? "en";
  if (!v) return lang === "hi" ? "\u091F\u0948\u0915\u094D\u0938 \u0906\u0908\u0921\u0940 \u0906\u0935\u0936\u094D\u092F\u0915 \u0939\u0948" : "Tax ID is required";
  if (!REGEX_TAX_ID.test(v)) {
    return lang === "hi" ? VALIDATION_MESSAGES_HI.taxId : VALIDATION_MESSAGES.taxId;
  }
}
function validateBankAccount(value, options = {}) {
  const v = value.trim().replace(/\s/g, "");
  const lang = options.language ?? "en";
  if (!v) return lang === "hi" ? "\u092C\u0948\u0902\u0915 \u0916\u093E\u0924\u093E \u0938\u0902\u0916\u094D\u092F\u093E \u0906\u0935\u0936\u094D\u092F\u0915 \u0939\u0948" : "Bank account number is required";
  if (!REGEX_BANK_ACCOUNT.test(v)) {
    return lang === "hi" ? VALIDATION_MESSAGES_HI.bankAccount : VALIDATION_MESSAGES.bankAccount;
  }
}
function validateRoutingCode(value, options = {}) {
  const v = value.trim();
  const lang = options.language ?? "en";
  if (!v) return lang === "hi" ? "\u0930\u0942\u091F\u093F\u0902\u0917 \u0915\u094B\u0921 \u0906\u0935\u0936\u094D\u092F\u0915 \u0939\u0948" : "Routing code is required";
  if (!REGEX_ROUTING_CODE.test(v)) {
    return lang === "hi" ? VALIDATION_MESSAGES_HI.routingCode : VALIDATION_MESSAGES.routingCode;
  }
}
function validateUrl(value, options = {}) {
  const v = value.trim();
  const lang = options.language ?? "en";
  if (!v) return lang === "hi" ? "URL \u0906\u0935\u0936\u094D\u092F\u0915 \u0939\u0948" : "URL is required";
  if (!REGEX_URL.test(v)) {
    return lang === "hi" ? VALIDATION_MESSAGES_HI.url : VALIDATION_MESSAGES.url;
  }
}
function validatePassword(password, options = {}) {
  const { minLength = 8, language = "en" } = options;
  const pass = password || "";
  if (pass.length < minLength) {
    return {
      isValid: false,
      error: language === "hi" ? `\u092A\u093E\u0938\u0935\u0930\u094D\u0921 \u0915\u092E \u0938\u0947 \u0915\u092E ${minLength} \u0905\u0915\u094D\u0937\u0930\u094B\u0902 \u0915\u093E \u0939\u094B\u0928\u093E \u091A\u093E\u0939\u093F\u090F\u0964` : `Password must be at least ${minLength} characters long.`,
      strength: "weak"
    };
  }
  const hasLetters = /[a-zA-Z]/.test(pass);
  const hasNumbers = /\d/.test(pass);
  const hasSpecial = /[^a-zA-Z0-9]/.test(pass);
  if (!hasLetters || !hasNumbers) {
    return {
      isValid: false,
      error: language === "hi" ? "\u092A\u093E\u0938\u0935\u0930\u094D\u0921 \u092E\u0947\u0902 \u0915\u092E \u0938\u0947 \u0915\u092E \u090F\u0915 \u0905\u0915\u094D\u0937\u0930 \u0914\u0930 \u090F\u0915 \u0905\u0902\u0915 \u0939\u094B\u0928\u093E \u091A\u093E\u0939\u093F\u090F\u0964" : "Password must contain at least one letter and one number.",
      strength: "weak"
    };
  }
  let strength = "weak";
  if (pass.length >= 10 && hasSpecial) {
    strength = "strong";
  } else if (pass.length >= 8 && hasLetters && hasNumbers) {
    strength = "medium";
  }
  return { isValid: true, strength };
}
function validateRequired(value, fieldName, minLength = 1, maxLength, options = {}) {
  const { language = "en" } = options;
  const trimmed = (value || "").trim();
  if (!trimmed || trimmed.length < minLength) {
    let errorMsg = `${fieldName} is required.`;
    if (minLength > 1) {
      errorMsg = language === "hi" ? `${fieldName} \u0915\u092E \u0938\u0947 \u0915\u092E ${minLength} \u0905\u0915\u094D\u0937\u0930\u094B\u0902 \u0915\u093E \u0939\u094B\u0928\u093E \u091A\u093E\u0939\u093F\u090F\u0964` : `${fieldName} must be at least ${minLength} characters long.`;
    } else if (language === "hi") {
      errorMsg = `${fieldName} \u0906\u0935\u0936\u094D\u092F\u0915 \u0939\u0948\u0964`;
    }
    return {
      isValid: false,
      error: errorMsg,
      value: trimmed
    };
  }
  if (maxLength && trimmed.length > maxLength) {
    return {
      isValid: false,
      error: language === "hi" ? `${fieldName} ${maxLength} \u0905\u0915\u094D\u0937\u0930\u094B\u0902 \u0938\u0947 \u0905\u0927\u093F\u0915 \u0928\u0939\u0940\u0902 \u0939\u094B \u0938\u0915\u0924\u093E\u0964` : `${fieldName} cannot exceed ${maxLength} characters.`,
      value: trimmed
    };
  }
  return { isValid: true, value: trimmed };
}
function checkZeroBound(num, fieldName, allowZero, language) {
  if (allowZero) {
    if (num < 0) {
      return language === "hi" ? `${fieldName} 0 \u092F\u093E \u0909\u0938\u0938\u0947 \u0905\u0927\u093F\u0915 \u0939\u094B\u0928\u093E \u091A\u093E\u0939\u093F\u090F\u0964` : `${fieldName} must be 0 or greater.`;
    }
    return null;
  }
  if (num <= 0) {
    return language === "hi" ? `${fieldName} 0 \u0938\u0947 \u0905\u0927\u093F\u0915 \u0939\u094B\u0928\u093E \u091A\u093E\u0939\u093F\u090F\u0964` : `${fieldName} must be greater than 0.`;
  }
  return null;
}
function checkMinMaxBound(num, fieldName, min, max, language = "en") {
  if (min !== void 0 && num < min) {
    return language === "hi" ? `${fieldName} \u0915\u092E \u0938\u0947 \u0915\u092E ${min} \u0939\u094B\u0928\u093E \u091A\u093E\u0939\u093F\u090F\u0964` : `${fieldName} must be at least ${min}.`;
  }
  if (max !== void 0 && num > max) {
    return language === "hi" ? `${fieldName} ${max} \u0938\u0947 \u0905\u0927\u093F\u0915 \u0928\u0939\u0940\u0902 \u0939\u094B \u0938\u0915\u0924\u093E\u0964` : `${fieldName} cannot exceed ${max}.`;
  }
  return null;
}
function checkNumberBounds(num, fieldName, options) {
  const { allowZero = false, min, max, language = "en" } = options;
  const zeroErr = checkZeroBound(num, fieldName, allowZero, language);
  if (zeroErr) return zeroErr;
  return checkMinMaxBound(num, fieldName, min, max, language);
}
function validatePositiveNumber(value, fieldName, options = {}) {
  const { language = "en" } = options;
  const num = typeof value === "number" ? value : parseFloat(String(value));
  if (Number.isNaN(num)) {
    return {
      isValid: false,
      error: language === "hi" ? `${fieldName} \u090F\u0915 \u0935\u0948\u0927 \u0938\u0902\u0916\u094D\u092F\u093E \u0939\u094B\u0928\u0940 \u091A\u093E\u0939\u093F\u090F\u0964` : `${fieldName} must be a valid number.`,
      numberValue: 0
    };
  }
  const boundError = checkNumberBounds(num, fieldName, options);
  if (boundError) {
    return {
      isValid: false,
      error: boundError,
      numberValue: num
    };
  }
  return { isValid: true, numberValue: num };
}
function validateDateRange(startDate, endDate, options = {}) {
  const { language = "en" } = options;
  if (!startDate) {
    return { isValid: false, error: language === "hi" ? "\u092A\u094D\u0930\u093E\u0930\u0902\u092D \u0924\u093F\u0925\u093F \u0906\u0935\u0936\u094D\u092F\u0915 \u0939\u0948\u0964" : "Start date is required." };
  }
  if (!endDate) {
    return { isValid: false, error: language === "hi" ? "\u0938\u092E\u093E\u092A\u094D\u0924\u093F \u0924\u093F\u0925\u093F \u0906\u0935\u0936\u094D\u092F\u0915 \u0939\u0948\u0964" : "End date is required." };
  }
  if (startDate > endDate) {
    return {
      isValid: false,
      error: language === "hi" ? "\u0938\u092E\u093E\u092A\u094D\u0924\u093F \u0924\u093F\u0925\u093F \u092A\u094D\u0930\u093E\u0930\u0902\u092D \u0924\u093F\u0925\u093F \u0915\u0947 \u092C\u093E\u0926 \u092F\u093E \u092C\u0930\u093E\u092C\u0930 \u0939\u094B\u0928\u0940 \u091A\u093E\u0939\u093F\u090F\u0964" : "End date must be on or after the start date."
    };
  }
  return { isValid: true };
}
function validateTimeRange(startTime, endTime, options = {}) {
  const { language = "en" } = options;
  if (!startTime) {
    return { isValid: false, error: language === "hi" ? "\u092A\u094D\u0930\u093E\u0930\u0902\u092D \u0938\u092E\u092F \u0906\u0935\u0936\u094D\u092F\u0915 \u0939\u0948\u0964" : "Start time is required." };
  }
  if (!endTime) {
    return { isValid: false, error: language === "hi" ? "\u0938\u092E\u093E\u092A\u094D\u0924\u093F \u0938\u092E\u092F \u0906\u0935\u0936\u094D\u092F\u0915 \u0939\u0948\u0964" : "End time is required." };
  }
  if (startTime >= endTime) {
    return {
      isValid: false,
      error: language === "hi" ? "\u0938\u092E\u093E\u092A\u094D\u0924\u093F \u0938\u092E\u092F \u092A\u094D\u0930\u093E\u0930\u0902\u092D \u0938\u092E\u092F \u0915\u0947 \u092C\u093E\u0926 \u0939\u094B\u0928\u093E \u091A\u093E\u0939\u093F\u090F\u0964" : "End time must be chronologically after the start time."
    };
  }
  return { isValid: true };
}

// src/lib/locations.ts
function filterCitiesByState(cities, stateCode) {
  if (!stateCode) return [];
  return cities.filter((c) => c.stateCode === stateCode).sort((a, b) => a.name.localeCompare(b.name));
}
function toStateOptions(states, placeholder = "Select State") {
  return [
    { value: "", label: placeholder },
    ...states.map((s) => ({ value: s.code, label: s.name }))
  ];
}
function toCityOptions(cities, placeholder = "Select City") {
  return [
    { value: "", label: placeholder },
    ...cities.map((c) => ({ value: c.name, label: c.name }))
  ];
}

// src/lib/blob-storage.ts
var _config = null;
var _apiBase = "";
function setBlobStorageApiBase(base) {
  _apiBase = base.replace(/\/$/, "");
}
async function fetchBlobStorageConfig(apiBase, token) {
  if (_config) return _config;
  const base = apiBase ?? _apiBase;
  const jwt = token ?? (typeof window !== "undefined" ? localStorage.getItem("auth_jwt") ?? localStorage.getItem("jwt") ?? "" : "");
  const res = await fetch(`${base}/api/config`, {
    headers: { Authorization: `Bearer ${jwt}` }
  });
  if (!res.ok) {
    throw new Error(
      `fetchBlobStorageConfig: /api/config returned ${res.status} (base: "${base}")`
    );
  }
  const json = await res.json();
  _config = {
    storageBaseUrl: json.storage_base_url || "",
    storageSecretKey: json.storage_secret_key || ""
  };
  return _config;
}
function clearBlobStorageConfig() {
  _config = null;
}
async function uploadFileToStorage(file, folderPath, apiBase) {
  const { storageBaseUrl, storageSecretKey } = await fetchBlobStorageConfig(apiBase);
  const form = new FormData();
  form.append("folderPath", folderPath);
  form.append("file", file);
  const res = await fetch(`${storageBaseUrl}/api/admin/upload_file`, {
    method: "POST",
    headers: { secretkey: storageSecretKey },
    body: form
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Storage upload failed (${res.status}): ${text}`);
  }
  const json = await res.json();
  if (!json?.data?.length) {
    throw new Error("Storage upload succeeded but no file data in response");
  }
  const item = json.data[0];
  return {
    url: item.url || item.file_url,
    fileName: item.fileName || item.file_name,
    originalName: item.originalName || item.original_name
  };
}
async function downloadFileFromStorage(fileName, folder, displayName, apiBase) {
  const { storageBaseUrl, storageSecretKey } = await fetchBlobStorageConfig(apiBase);
  const filePath = `${folder}/${fileName}`;
  const qs = new URLSearchParams({ filePath, fileName });
  const res = await fetch(`${storageBaseUrl}/api/admin/download_file?${qs}`, {
    headers: { secretkey: storageSecretKey }
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Storage download failed (${res.status}): ${text}`);
  }
  const blob = await res.blob();
  if (typeof window !== "undefined" && typeof document !== "undefined") {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = displayName || fileName;
    document.body.appendChild(a);
    a.click();
    if (a.parentNode) {
      a.parentNode.removeChild(a);
    }
    window.URL.revokeObjectURL(url);
  }
}

// src/lib/masking.ts
function maskSensitiveValue(value, options = {}) {
  const {
    isMasked = false,
    maskPattern = "\u2022\u2022\u2022\u2022\u2022\u2022",
    dataType = "FINANCIAL_DATA",
    formatAsCurrency = true
  } = options;
  if (value === void 0 || value === null) {
    return isMasked ? maskPattern : "\u2014";
  }
  if (isMasked) {
    return maskPattern;
  }
  if (typeof value === "number") {
    if (formatAsCurrency && dataType === "FINANCIAL_DATA") {
      return formatCurrency(value);
    }
    return formatNumber(value);
  }
  return String(value);
}

// src/lib/telemetry.tsx
var React = __toESM(require("react"), 1);
var import_jsx_runtime = require("react/jsx-runtime");
var globalAuditLogger = null;
function setGlobalAuditLogger(logger) {
  globalAuditLogger = logger;
}
function withAuditTrail(WrappedComponent) {
  const ComponentWithAudit = React.forwardRef(
    function WithAuditTrail(props, ref) {
      const { actionName, entityId, entityType, auditLogger, onClick, ...rest } = props;
      const handleClick = React.useCallback(
        (e) => {
          const payload = {
            actionName,
            entityType: entityType ?? "Unknown",
            ...entityId !== void 0 ? { entityId } : {},
            timestamp: (/* @__PURE__ */ new Date()).toISOString()
          };
          const logger = auditLogger || globalAuditLogger;
          if (logger) {
            try {
              const res = logger(payload);
              if (res instanceof Promise) {
                res.catch(() => {
                });
              }
            } catch {
            }
          }
          if (onClick && typeof onClick === "function") {
            onClick(e);
          }
        },
        [actionName, entityType, entityId, auditLogger, onClick]
      );
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WrappedComponent, { ...rest, ref, onClick: handleClick });
    }
  );
  ComponentWithAudit.displayName = `withAuditTrail(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;
  return ComponentWithAudit;
}

// src/lib/analytics/session.ts
function generateUUID() {
  if (typeof crypto !== "undefined") {
    if (typeof crypto.randomUUID === "function") {
      return crypto.randomUUID();
    }
    if (typeof crypto.getRandomValues === "function") {
      const bytes = new Uint8Array(16);
      crypto.getRandomValues(bytes);
      bytes[6] = (bytes[6] ?? 0) & 15 | 64;
      bytes[8] = (bytes[8] ?? 0) & 63 | 128;
      const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
      return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
    }
  }
  const time = Date.now().toString(16).padStart(12, "0");
  return `00000000-0000-4000-8000-${time.slice(-12)}`;
}
var SessionManager = class {
  prefix;
  sessionTimeoutMs;
  anonymousId;
  sessionId;
  lastActiveTimestamp;
  activePageId;
  userId;
  componentInteractionCounts = /* @__PURE__ */ new Map();
  constructor(prefix = "va_analytics", sessionTimeoutMs = 30 * 60 * 1e3) {
    this.prefix = prefix;
    this.sessionTimeoutMs = sessionTimeoutMs;
    this.anonymousId = this.loadOrCreateAnonymousId();
    this.lastActiveTimestamp = Date.now();
    this.sessionId = this.loadOrCreateSessionId();
    this.activePageId = generateUUID();
  }
  loadOrCreateAnonymousId() {
    const key = `${this.prefix}_anon_id`;
    if (typeof window !== "undefined" && window.localStorage) {
      try {
        const stored = window.localStorage.getItem(key);
        if (stored) return stored;
        const newId = generateUUID();
        window.localStorage.setItem(key, newId);
        return newId;
      } catch {
      }
    }
    return generateUUID();
  }
  loadOrCreateSessionId() {
    const sessionKey = `${this.prefix}_session_id`;
    const lastActiveKey = `${this.prefix}_last_active`;
    if (typeof window !== "undefined" && window.sessionStorage) {
      try {
        const storedSession = window.sessionStorage.getItem(sessionKey);
        const storedLastActive = window.sessionStorage.getItem(lastActiveKey);
        const now = Date.now();
        if (storedSession && storedLastActive) {
          const lastActive = parseInt(storedLastActive, 10);
          if (!isNaN(lastActive) && now - lastActive < this.sessionTimeoutMs) {
            this.lastActiveTimestamp = now;
            window.sessionStorage.setItem(lastActiveKey, now.toString());
            return storedSession;
          }
        }
        const newSessionId = generateUUID();
        window.sessionStorage.setItem(sessionKey, newSessionId);
        window.sessionStorage.setItem(lastActiveKey, now.toString());
        return newSessionId;
      } catch {
      }
    }
    return generateUUID();
  }
  touchSession() {
    const now = Date.now();
    if (now - this.lastActiveTimestamp >= this.sessionTimeoutMs) {
      this.sessionId = generateUUID();
      this.componentInteractionCounts.clear();
    }
    this.lastActiveTimestamp = now;
    if (typeof window !== "undefined" && window.sessionStorage) {
      try {
        window.sessionStorage.setItem(`${this.prefix}_session_id`, this.sessionId);
        window.sessionStorage.setItem(`${this.prefix}_last_active`, now.toString());
      } catch {
      }
    }
    return this.sessionId;
  }
  getSessionId() {
    return this.touchSession();
  }
  getAnonymousId() {
    return this.anonymousId;
  }
  getActivePageId() {
    return this.activePageId;
  }
  renewPageId() {
    this.activePageId = generateUUID();
    return this.activePageId;
  }
  getUserId() {
    return this.userId;
  }
  setUserId(userId) {
    this.userId = userId;
  }
  clearUserId() {
    this.userId = void 0;
    this.anonymousId = generateUUID();
    if (typeof window !== "undefined" && window.localStorage) {
      try {
        window.localStorage.setItem(`${this.prefix}_anon_id`, this.anonymousId);
      } catch {
      }
    }
  }
  incrementComponentInteraction(componentId) {
    const count2 = (this.componentInteractionCounts.get(componentId) ?? 0) + 1;
    this.componentInteractionCounts.set(componentId, count2);
    return count2;
  }
  reset() {
    this.clearUserId();
    this.sessionId = generateUUID();
    this.activePageId = generateUUID();
    this.componentInteractionCounts.clear();
    if (typeof window !== "undefined" && window.sessionStorage) {
      try {
        window.sessionStorage.removeItem(`${this.prefix}_session_id`);
        window.sessionStorage.removeItem(`${this.prefix}_last_active`);
      } catch {
      }
    }
  }
};

// src/lib/analytics/queue.ts
var AnalyticsQueue = class {
  adapters;
  batchSize;
  flushIntervalMs;
  maxOfflineQueue;
  storageKey;
  onError;
  memoryQueue = [];
  flushTimer = null;
  isFlushing = false;
  constructor(options) {
    this.adapters = options.adapters;
    this.batchSize = options.batchSize ?? 10;
    this.flushIntervalMs = options.flushIntervalMs ?? 5e3;
    this.maxOfflineQueue = options.maxOfflineQueue ?? 1e3;
    this.storageKey = `${options.storagePrefix ?? "va_analytics"}_offline_queue`;
    this.onError = options.onError;
    this.startPeriodicFlush();
    this.registerLifecycleListeners();
  }
  startPeriodicFlush() {
    if (typeof window === "undefined" || this.flushIntervalMs <= 0) return;
    this.flushTimer = setInterval(() => {
      this.flush().catch((err) => this.onError?.(err));
    }, this.flushIntervalMs);
  }
  registerLifecycleListeners() {
    if (typeof window === "undefined") return;
    window.addEventListener("online", () => {
      this.flush().catch((err) => this.onError?.(err));
    });
    const handleUnload = () => {
      this.persistMemoryQueueToStorage();
    };
    window.addEventListener("pagehide", handleUnload);
    window.addEventListener("beforeunload", handleUnload);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        this.flush().catch((err) => this.onError?.(err));
      }
    });
  }
  enqueue(event) {
    this.memoryQueue.push(event);
    if (this.memoryQueue.length >= this.batchSize) {
      this.flush().catch((err) => this.onError?.(err));
    }
  }
  readStorageQueue() {
    if (typeof window === "undefined" || !window.localStorage) return [];
    try {
      const raw = window.localStorage.getItem(this.storageKey);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  writeStorageQueue(events) {
    if (typeof window === "undefined" || !window.localStorage) return;
    try {
      const trimmed = events.slice(-this.maxOfflineQueue);
      window.localStorage.setItem(this.storageKey, JSON.stringify(trimmed));
    } catch {
    }
  }
  clearStorageQueue() {
    if (typeof window === "undefined" || !window.localStorage) return;
    try {
      window.localStorage.removeItem(this.storageKey);
    } catch {
    }
  }
  persistMemoryQueueToStorage() {
    if (this.memoryQueue.length === 0) return;
    const existing = this.readStorageQueue();
    const combined = [...existing, ...this.memoryQueue];
    this.memoryQueue = [];
    this.writeStorageQueue(combined);
  }
  pendingFlushPromise = null;
  async flush() {
    if (this.isFlushing) {
      return this.pendingFlushPromise ?? Promise.resolve();
    }
    this.isFlushing = true;
    this.pendingFlushPromise = this.executeDrainLoop();
    try {
      await this.pendingFlushPromise;
    } finally {
      this.isFlushing = false;
      this.pendingFlushPromise = null;
    }
  }
  async executeDrainLoop() {
    while (this.memoryQueue.length > 0 || this.readStorageQueue().length > 0) {
      const storedEvents = this.readStorageQueue();
      const eventsToFlush = [...storedEvents, ...this.memoryQueue];
      this.memoryQueue = [];
      this.clearStorageQueue();
      if (eventsToFlush.length === 0 || this.adapters.length === 0) {
        return;
      }
      const isOnline = typeof navigator === "undefined" || navigator.onLine !== false;
      if (!isOnline) {
        this.writeStorageQueue(eventsToFlush);
        return;
      }
      const failedAdapters = [];
      await Promise.all(
        this.adapters.map(async (adapter) => {
          try {
            if (typeof adapter.trackBatch === "function") {
              await adapter.trackBatch(eventsToFlush);
            } else {
              await Promise.all(eventsToFlush.map((e) => adapter.track(e)));
            }
          } catch (err) {
            failedAdapters.push(adapter);
            this.onError?.(err);
          }
        })
      );
      if (failedAdapters.length === this.adapters.length && this.adapters.length > 0) {
        this.writeStorageQueue(eventsToFlush);
        return;
      }
    }
  }
  getPendingCount() {
    return this.memoryQueue.length + this.readStorageQueue().length;
  }
  destroy() {
    if (this.flushTimer) {
      clearInterval(this.flushTimer);
      this.flushTimer = null;
    }
    this.persistMemoryQueueToStorage();
  }
};

// src/lib/analytics/dom-tracker.ts
var DomTracker = class {
  onInteraction;
  maskPatterns;
  isListening = false;
  handleClickBound = this.handleClick.bind(this);
  handleChangeBound = this.handleChange.bind(this);
  handleSubmitBound = this.handleSubmit.bind(this);
  constructor(options) {
    this.onInteraction = options.onInteraction;
    this.maskPatterns = options.maskPatterns ?? [
      /password/i,
      /secret/i,
      /token/i,
      /aadhaar/i,
      /pan/i,
      /ssn/i,
      /credit[-_]?card/i,
      /cvv/i
    ];
  }
  start() {
    if (typeof document === "undefined" || this.isListening) return;
    document.addEventListener("click", this.handleClickBound, true);
    document.addEventListener("change", this.handleChangeBound, true);
    document.addEventListener("submit", this.handleSubmitBound, true);
    this.isListening = true;
  }
  stop() {
    if (typeof document === "undefined" || !this.isListening) return;
    document.removeEventListener("click", this.handleClickBound, true);
    document.removeEventListener("change", this.handleChangeBound, true);
    document.removeEventListener("submit", this.handleSubmitBound, true);
    this.isListening = false;
  }
  isSensitiveElement(el) {
    if (el.hasAttribute("data-track-ignore")) return true;
    if (el instanceof HTMLInputElement) {
      if (el.type === "password" || el.type === "hidden") return true;
      const name = el.name || el.id || "";
      for (const pattern of this.maskPatterns) {
        if (pattern.test(name)) return true;
      }
    }
    return false;
  }
  findTrackableElement(target) {
    if (!target || !(target instanceof HTMLElement)) return null;
    if (target.closest("[data-track-ignore]")) return null;
    const trackable = target.closest(
      "button, a[href], input, select, textarea, [role='button'], [role='tab'], [role='menuitem'], [data-track-name]"
    );
    if (trackable && this.isSensitiveElement(trackable)) {
      return null;
    }
    return trackable;
  }
  getElementAccessibleName(el) {
    const explicitName = el.getAttribute("data-track-name");
    if (explicitName) return explicitName;
    const ariaLabel = el.getAttribute("aria-label");
    if (ariaLabel) return ariaLabel.trim();
    if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
      if (el.placeholder) return el.placeholder.trim();
      if (el.name) return el.name;
    }
    const innerText = el.innerText || el.textContent;
    if (innerText && innerText.trim()) {
      return innerText.trim().replace(/\s+/g, " ").slice(0, 80);
    }
    return el.tagName.toLowerCase();
  }
  collectJourneyMetadata(el) {
    const metadata = {};
    const area = el.closest("[data-track-area]");
    if (area) {
      const journey = area.getAttribute("data-track-area-journey");
      const step = area.getAttribute("data-track-area-step");
      const rawMeta = area.getAttribute("data-track-area-metadata");
      if (journey) metadata.journey = journey;
      if (step) metadata.step = step;
      if (rawMeta) {
        try {
          Object.assign(metadata, JSON.parse(rawMeta));
        } catch {
        }
      }
    }
    const elMeta = el.getAttribute("data-track-metadata");
    if (elMeta) {
      try {
        Object.assign(metadata, JSON.parse(elMeta));
      } catch {
      }
    }
    return metadata;
  }
  resolveComponentContext(el, interaction) {
    let componentId = el.getAttribute("data-component-id");
    if (!componentId) {
      componentId = `cmp_${generateUUID().slice(0, 12)}`;
      el.setAttribute("data-component-id", componentId);
    }
    const name = this.getElementAccessibleName(el);
    const type = el.getAttribute("role") || el.tagName.toLowerCase();
    return {
      id: componentId,
      name,
      type,
      interaction,
      interactionCount: 1
      // Will be incremented by session manager
    };
  }
  handleClick(event) {
    const el = this.findTrackableElement(event.target);
    if (!el) return;
    const component = this.resolveComponentContext(el, "click");
    const metadata = this.collectJourneyMetadata(el);
    this.onInteraction(component, metadata);
  }
  handleChange(event) {
    const el = this.findTrackableElement(event.target);
    if (!el) return;
    const component = this.resolveComponentContext(el, "change");
    const metadata = this.collectJourneyMetadata(el);
    this.onInteraction(component, metadata);
  }
  handleSubmit(event) {
    const form = event.target instanceof HTMLFormElement ? event.target : null;
    if (!form || form.hasAttribute("data-track-ignore")) return;
    let formId = form.getAttribute("data-component-id");
    if (!formId) {
      formId = `form_${generateUUID().slice(0, 12)}`;
      form.setAttribute("data-component-id", formId);
    }
    const formName = form.getAttribute("data-track-name") || form.getAttribute("name") || form.getAttribute("id") || "form";
    const component = {
      id: formId,
      name: formName,
      type: "form",
      interaction: "submit",
      interactionCount: 1
    };
    const metadata = this.collectJourneyMetadata(form);
    this.onInteraction(component, metadata);
  }
};

// src/lib/analytics/engine.ts
var AnalyticsEngine = class {
  config;
  sessionManager;
  queue;
  domTracker;
  globalMetadata = {};
  originalPushState;
  originalReplaceState;
  popStateListener;
  isInitialized = false;
  constructor(config = {}) {
    this.config = config;
    this.globalMetadata = { ...config.globalMetadata || {} };
    this.sessionManager = new SessionManager(
      config.storagePrefix,
      config.sessionTimeoutMs
    );
    this.queue = new AnalyticsQueue({
      adapters: config.adapters || [],
      batchSize: config.batchSize,
      flushIntervalMs: config.flushIntervalMs,
      maxOfflineQueue: config.maxOfflineQueue,
      storagePrefix: config.storagePrefix,
      onError: config.onError
    });
    if (config.autoTrackDom !== false) {
      this.domTracker = new DomTracker({
        onInteraction: (component, metadata) => {
          this.handleDomInteraction(component, metadata);
        },
        maskPatterns: config.maskPatterns
      });
      this.domTracker.start();
    }
    if (config.autoTrackPages !== false) {
      this.setupPageTracking();
    }
    if (config.adapters) {
      config.adapters.forEach((adapter) => {
        try {
          const res = adapter.onInit?.(config);
          if (res instanceof Promise) {
            res.catch((err) => config.onError?.(err));
          }
        } catch (err) {
          config.onError?.(err);
        }
      });
    }
    this.isInitialized = true;
  }
  getCurrentPageContext() {
    if (typeof window === "undefined") {
      return {
        url: "",
        path: "",
        title: "",
        referrer: ""
      };
    }
    return {
      url: window.location.href,
      path: window.location.pathname + window.location.search,
      title: document.title || "",
      referrer: document.referrer || ""
    };
  }
  setupPageTracking() {
    if (typeof window === "undefined" || !window.history) return;
    this.trackPageView();
    if (this.config.patchHistory === true) {
      this.originalPushState = window.history.pushState;
      const originalPush = this.originalPushState;
      window.history.pushState = (...args) => {
        originalPush.apply(window.history, args);
        this.sessionManager.renewPageId();
        this.trackPageView();
      };
      this.originalReplaceState = window.history.replaceState;
      const originalReplace = this.originalReplaceState;
      window.history.replaceState = (...args) => {
        originalReplace.apply(window.history, args);
        this.sessionManager.renewPageId();
        this.trackPageView();
      };
    }
    this.popStateListener = () => {
      this.sessionManager.renewPageId();
      this.trackPageView();
    };
    window.addEventListener("popstate", this.popStateListener);
  }
  handleDomInteraction(component, interactionMetadata) {
    const interactionCount = this.sessionManager.incrementComponentInteraction(
      component.id
    );
    const enrichedComponent = {
      ...component,
      interactionCount
    };
    this.track(
      `component_${component.interaction}`,
      interactionMetadata,
      enrichedComponent
    );
  }
  track(eventName, metadata = {}, component) {
    const event = {
      eventId: generateUUID(),
      eventName,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      sessionId: this.sessionManager.getSessionId(),
      pageId: this.sessionManager.getActivePageId(),
      anonymousId: this.sessionManager.getAnonymousId(),
      userId: this.sessionManager.getUserId(),
      component,
      page: this.getCurrentPageContext(),
      metadata: {
        ...this.globalMetadata,
        ...metadata
      }
    };
    this.queue.enqueue(event);
    return event;
  }
  trackPageView(customPage, metadata = {}) {
    const page = {
      ...this.getCurrentPageContext(),
      ...customPage || {}
    };
    const event = {
      eventId: generateUUID(),
      eventName: "page_view",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      sessionId: this.sessionManager.getSessionId(),
      pageId: this.sessionManager.getActivePageId(),
      anonymousId: this.sessionManager.getAnonymousId(),
      userId: this.sessionManager.getUserId(),
      page,
      metadata: {
        ...this.globalMetadata,
        ...metadata
      }
    };
    this.queue.enqueue(event);
    return event;
  }
  identify(userId, traits) {
    this.sessionManager.setUserId(userId);
    this.track("user_identify", {
      identifiedUserId: userId,
      ...traits || {}
    });
    if (this.config.adapters) {
      this.config.adapters.forEach((adapter) => {
        try {
          const res = adapter.identify?.(userId, traits);
          if (res instanceof Promise) {
            res.catch((err) => this.config.onError?.(err));
          }
        } catch (err) {
          this.config.onError?.(err);
        }
      });
    }
  }
  logout() {
    this.track("user_logout");
    this.queue.flush().catch((err) => this.config.onError?.(err));
    this.sessionManager.clearUserId();
    if (this.config.adapters) {
      this.config.adapters.forEach((adapter) => {
        try {
          const res = adapter.reset?.();
          if (res instanceof Promise) {
            res.catch((err) => this.config.onError?.(err));
          }
        } catch (err) {
          this.config.onError?.(err);
        }
      });
    }
  }
  reset() {
    this.logout();
    this.sessionManager.reset();
  }
  setGlobalMetadata(metadata) {
    Object.assign(this.globalMetadata, metadata);
  }
  clearGlobalMetadata(keys) {
    if (!keys) {
      this.globalMetadata = {};
    } else {
      const keysToDrop = new Set(keys);
      this.globalMetadata = Object.fromEntries(
        Object.entries(this.globalMetadata).filter(([k]) => !keysToDrop.has(k))
      );
    }
  }
  addAdapter(adapter) {
    if (!this.config.adapters) {
      this.config.adapters = [];
    }
    this.config.adapters.push(adapter);
    try {
      const res = adapter.onInit?.(this.config);
      if (res instanceof Promise) {
        res.catch((err) => this.config.onError?.(err));
      }
    } catch (err) {
      this.config.onError?.(err);
    }
  }
  async flush() {
    await this.queue.flush();
  }
  getSessionManager() {
    return this.sessionManager;
  }
  getQueue() {
    return this.queue;
  }
  destroy() {
    if (!this.isInitialized) return;
    this.domTracker?.stop();
    this.queue.destroy();
    if (typeof window !== "undefined") {
      if (window.history) {
        if (this.originalPushState) {
          window.history.pushState = this.originalPushState;
          this.originalPushState = void 0;
        }
        if (this.originalReplaceState) {
          window.history.replaceState = this.originalReplaceState;
          this.originalReplaceState = void 0;
        }
      }
      if (this.popStateListener) {
        window.removeEventListener("popstate", this.popStateListener);
        this.popStateListener = void 0;
      }
    }
    this.isInitialized = false;
  }
};
var globalAnalyticsEngine = null;
function initAnalytics(config) {
  if (globalAnalyticsEngine) {
    globalAnalyticsEngine.destroy();
  }
  globalAnalyticsEngine = new AnalyticsEngine(config);
  return globalAnalyticsEngine;
}
function getAnalyticsEngine() {
  return globalAnalyticsEngine;
}

// src/lib/analytics/adapters/http.ts
var HttpAdapter = class {
  name = "http";
  endpoint;
  headers;
  getHeaders;
  credentials;
  constructor(options) {
    this.endpoint = options.endpoint;
    this.headers = {
      "Content-Type": "application/json",
      ...options.headers || {}
    };
    this.getHeaders = options.getHeaders;
    this.credentials = options.credentials;
  }
  async resolveHeaders() {
    let customHeaders = {};
    if (this.getHeaders) {
      customHeaders = await this.getHeaders();
    }
    return {
      ...this.headers,
      ...customHeaders
    };
  }
  async track(event) {
    await this.trackBatch([event]);
  }
  async trackBatch(events) {
    if (events.length === 0) return;
    const payload = JSON.stringify({ events });
    const headers = await this.resolveHeaders();
    const response = await fetch(this.endpoint, {
      method: "POST",
      headers,
      body: payload,
      ...this.credentials !== void 0 ? { credentials: this.credentials } : {},
      keepalive: true
    });
    if (!response.ok) {
      throw new Error(`HttpAdapter delivery failed: HTTP ${response.status} ${response.statusText}`);
    }
  }
};

// src/lib/analytics/adapters/console.ts
var ConsoleAdapter = class {
  name = "console";
  prefix;
  logLevel;
  constructor(options = {}) {
    this.prefix = options.prefix ?? "[Analytics]";
    this.logLevel = options.logLevel ?? "info";
  }
  track(event) {
    const logger = console[this.logLevel] || console.log;
    logger(
      `${this.prefix} ${event.eventName}`,
      {
        component: event.component?.name,
        page: event.page.path,
        user: event.userId ?? event.anonymousId,
        metadata: event.metadata
      },
      event
    );
  }
  trackBatch(events) {
    const logger = console[this.logLevel] || console.log;
    logger(`${this.prefix} Flushed Batch (${events.length} events):`, events);
  }
  identify(userId, traits) {
    const logger = console[this.logLevel] || console.log;
    logger(`${this.prefix} Identify User: ${userId}`, traits);
  }
  reset() {
    const logger = console[this.logLevel] || console.log;
    logger(`${this.prefix} Reset Identity`);
  }
};

// src/lib/analytics/adapters/mixpanel.ts
var MixpanelAdapter = class {
  name = "mixpanel";
  customClient;
  constructor(options = {}) {
    this.customClient = options.client;
  }
  getClient() {
    if (this.customClient) return this.customClient;
    if (typeof window !== "undefined" && window.mixpanel) {
      return window.mixpanel;
    }
    return void 0;
  }
  track(event) {
    const client = this.getClient();
    if (!client) return;
    const properties = {
      $current_url: event.page.url,
      distinct_id: event.userId ?? event.anonymousId,
      session_id: event.sessionId,
      page_id: event.pageId,
      page_path: event.page.path,
      page_title: event.page.title,
      component_id: event.component?.id,
      component_name: event.component?.name,
      component_type: event.component?.type,
      interaction: event.component?.interaction,
      interaction_count: event.component?.interactionCount,
      ...event.metadata
    };
    client.track(event.eventName, properties);
  }
  trackBatch(events) {
    events.forEach((event) => this.track(event));
  }
  identify(userId, traits) {
    const client = this.getClient();
    if (!client) return;
    client.identify(userId);
    if (traits && client.people && typeof client.people.set === "function") {
      client.people.set(traits);
    }
  }
  reset() {
    const client = this.getClient();
    if (client && typeof client.reset === "function") {
      client.reset();
    }
  }
};

// src/lib/analytics/adapters/google.ts
var GoogleAnalyticsAdapter = class {
  name = "google_analytics";
  measurementId;
  constructor(options = {}) {
    this.measurementId = options.measurementId;
  }
  gtag(command, ...args) {
    if (typeof window !== "undefined") {
      if (typeof window.gtag === "function") {
        window.gtag(command, ...args);
      } else if (Array.isArray(window.dataLayer)) {
        window.dataLayer.push([command, ...args]);
      }
    }
  }
  track(event) {
    if (event.eventName === "page_view") {
      this.gtag("event", "page_view", {
        page_location: event.page.url,
        page_path: event.page.path,
        page_title: event.page.title,
        page_id: event.pageId,
        session_id: event.sessionId,
        send_to: this.measurementId,
        ...event.metadata
      });
      return;
    }
    this.gtag("event", event.eventName, {
      event_category: event.component?.type ?? "ui_interaction",
      event_label: event.component?.name ?? event.component?.id,
      component_id: event.component?.id,
      component_type: event.component?.type,
      interaction: event.component?.interaction,
      interaction_count: event.component?.interactionCount,
      page_id: event.pageId,
      session_id: event.sessionId,
      send_to: this.measurementId,
      ...event.metadata
    });
  }
  trackBatch(events) {
    events.forEach((event) => this.track(event));
  }
  identify(userId, traits) {
    this.gtag("set", {
      user_id: userId,
      user_properties: traits
    });
  }
  reset() {
    this.gtag("set", {
      user_id: null
    });
  }
};

// src/lib/platform.ts
function getPlatformInfo() {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return {
      isIOS: false,
      isAndroid: false,
      isMobile: false,
      isStandalone: false,
      platformName: "desktop",
      hasTouch: false
    };
  }
  const userAgent = navigator.userAgent || "";
  const platform = navigator.platform || "";
  const isIOS = /iPad|iPhone|iPod/.test(userAgent) || platform === "MacIntel" && navigator.maxTouchPoints > 1;
  const isAndroid = /Android/.test(userAgent);
  const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  const isStandalone = typeof window.matchMedia === "function" && window.matchMedia("(display-mode: standalone)").matches || navigator.standalone === true || typeof document !== "undefined" && document.referrer.includes("android-app://");
  const isMobile = isIOS || isAndroid || window.innerWidth < 768;
  let platformName = "desktop";
  if (isIOS) {
    platformName = "ios";
  } else if (isAndroid) {
    platformName = "android";
  }
  return {
    isIOS,
    isAndroid,
    isMobile,
    isStandalone,
    platformName,
    hasTouch
  };
}
function triggerHaptic(type = "light") {
  if (typeof window === "undefined" || typeof navigator === "undefined" || !navigator.vibrate) {
    return;
  }
  try {
    switch (type) {
      case "light":
      case "selection":
        navigator.vibrate(10);
        break;
      case "medium":
        navigator.vibrate(20);
        break;
      case "heavy":
        navigator.vibrate(35);
        break;
      case "success":
        navigator.vibrate([10, 30, 20]);
        break;
      case "warning":
        navigator.vibrate([15, 40, 15]);
        break;
      case "error":
        navigator.vibrate([25, 50, 25, 50, 25]);
        break;
    }
  } catch {
  }
}
async function nativeShare(data) {
  if (typeof window === "undefined" || typeof navigator === "undefined" || !navigator.share) {
    return false;
  }
  try {
    await navigator.share(data);
    return true;
  } catch {
    return false;
  }
}

// src/hooks/use-mobile.tsx
var React2 = __toESM(require("react"), 1);
var MOBILE_BREAKPOINT = 768;
function useIsMobile() {
  const subscribe2 = React2.useCallback((callback) => {
    if (typeof window === "undefined" || !window.matchMedia) {
      return () => {
      };
    }
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    mql.addEventListener("change", callback);
    return () => mql.removeEventListener("change", callback);
  }, []);
  const getSnapshot2 = () => {
    return typeof window !== "undefined" ? window.innerWidth < MOBILE_BREAKPOINT : false;
  };
  const getServerSnapshot2 = () => {
    return false;
  };
  return React2.useSyncExternalStore(subscribe2, getSnapshot2, getServerSnapshot2);
}

// src/hooks/use-debounce.ts
var import_react = require("react");
function useDebounce(value, delay = 400) {
  const [debouncedValue, setDebouncedValue] = (0, import_react.useState)(value);
  (0, import_react.useEffect)(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}

// src/hooks/use-local-storage.ts
var import_react2 = require("react");
function useLocalStorage(key, initialValue) {
  const initialValueRef = (0, import_react2.useRef)(initialValue);
  (0, import_react2.useEffect)(() => {
    initialValueRef.current = initialValue;
  }, [initialValue]);
  const readValue = (0, import_react2.useCallback)(() => {
    if (typeof window === "undefined") return initialValueRef.current;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValueRef.current;
    } catch {
      return initialValueRef.current;
    }
  }, [key]);
  const [storedValue, setStoredValue] = (0, import_react2.useState)(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });
  const storedValueRef = (0, import_react2.useRef)(storedValue);
  (0, import_react2.useEffect)(() => {
    storedValueRef.current = storedValue;
  }, [storedValue]);
  const setValue = (0, import_react2.useCallback)(
    (value) => {
      try {
        const current = typeof window === "undefined" ? storedValueRef.current : readValue();
        const newValue = typeof value === "function" ? value(current) : value;
        setStoredValue(newValue);
        storedValueRef.current = newValue;
        if (typeof window !== "undefined") {
          try {
            window.localStorage.setItem(key, JSON.stringify(newValue));
            window.dispatchEvent(new Event("local-storage"));
          } catch (err) {
            console.warn(`useLocalStorage: could not persist "${key}"`, err);
          }
        }
      } catch (err) {
        console.warn(`useLocalStorage: could not set "${key}"`, err);
      }
    },
    [key, readValue]
  );
  (0, import_react2.useEffect)(() => {
    const handleStorage = (e) => {
      if (e.key === key) {
        setStoredValue(readValue());
      }
    };
    const handleLocalStorage = () => {
      setStoredValue(readValue());
    };
    window.addEventListener("storage", handleStorage);
    window.addEventListener("local-storage", handleLocalStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("local-storage", handleLocalStorage);
    };
  }, [key, readValue]);
  return [storedValue, setValue];
}

// src/hooks/use-toast.ts
var React3 = __toESM(require("react"), 1);
var TOAST_LIMIT = 1;
var TOAST_REMOVE_DELAY = 1e3;
var count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}
var toastTimeouts = /* @__PURE__ */ new Map();
var addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId
    });
  }, TOAST_REMOVE_DELAY);
  toastTimeouts.set(toastId, timeout);
};
var reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT)
      };
    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map(
          (t) => t.id === action.toast.id ? { ...t, ...action.toast } : t
        )
      };
    case "DISMISS_TOAST": {
      const { toastId } = action;
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast2) => {
          addToRemoveQueue(toast2.id);
        });
      }
      return {
        ...state,
        toasts: state.toasts.map(
          (t) => t.id === toastId || toastId === void 0 ? {
            ...t,
            open: false
          } : t
        )
      };
    }
    case "REMOVE_TOAST":
      if (action.toastId === void 0) {
        return {
          ...state,
          toasts: []
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId)
      };
  }
};
var listeners = /* @__PURE__ */ new Set();
var memoryState = { toasts: [] };
function dispatch(action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener();
  });
}
function toast({ ...props }) {
  const id = genId();
  const update = (props2) => dispatch({
    type: "UPDATE_TOAST",
    toast: { ...props2, id }
  });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });
  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      }
    }
  });
  return {
    id,
    dismiss,
    update
  };
}
function subscribe(listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
function getSnapshot() {
  return memoryState;
}
var SERVER_SNAPSHOT = { toasts: [] };
function getServerSnapshot() {
  return SERVER_SNAPSHOT;
}
function useToast() {
  const state = React3.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return {
    ...state,
    toast,
    dismiss: (toastId) => dispatch({ type: "DISMISS_TOAST", toastId })
  };
}

// src/hooks/use-platform.ts
var import_react3 = require("react");
function usePlatform() {
  const [platformInfo, setPlatformInfo] = (0, import_react3.useState)(getPlatformInfo);
  (0, import_react3.useEffect)(() => {
    const updateInfo = () => {
      setPlatformInfo(getPlatformInfo());
    };
    window.addEventListener("resize", updateInfo);
    if (typeof window.matchMedia === "function") {
      const mediaQuery = window.matchMedia("(display-mode: standalone)");
      const handleMediaChange = () => updateInfo();
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener("change", handleMediaChange);
      } else if ("addListener" in mediaQuery) {
        mediaQuery.addListener(handleMediaChange);
      }
      return () => {
        window.removeEventListener("resize", updateInfo);
        if (mediaQuery.removeEventListener) {
          mediaQuery.removeEventListener("change", handleMediaChange);
        } else if ("removeListener" in mediaQuery) {
          mediaQuery.removeListener(handleMediaChange);
        }
      };
    }
    return () => {
      window.removeEventListener("resize", updateInfo);
    };
  }, []);
  return {
    ...platformInfo,
    triggerHaptic,
    nativeShare
  };
}

// src/hooks/use-pwa-install.ts
var import_react4 = require("react");
function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = (0, import_react4.useState)(null);
  const [canInstall, setCanInstall] = (0, import_react4.useState)(false);
  const [isInstalled, setIsInstalled] = (0, import_react4.useState)(() => {
    if (typeof window === "undefined") return false;
    return typeof window.matchMedia === "function" && window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
  });
  const [isIOS] = (0, import_react4.useState)(() => {
    if (typeof window === "undefined") return false;
    const ua = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(ua) && !window.MSStream;
  });
  (0, import_react4.useEffect)(() => {
    if (typeof window === "undefined") return;
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setCanInstall(true);
    };
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setCanInstall(false);
      setDeferredPrompt(null);
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);
  const promptInstall = (0, import_react4.useCallback)(async () => {
    if (!deferredPrompt) {
      return { outcome: "unsupported" };
    }
    try {
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === "accepted") {
        setCanInstall(false);
      }
      setDeferredPrompt(null);
      return { outcome: choiceResult.outcome };
    } catch {
      setDeferredPrompt(null);
      return { outcome: "dismissed" };
    }
  }, [deferredPrompt]);
  return {
    canInstall,
    isInstalled,
    isIOS,
    promptInstall
  };
}

// src/hooks/use-offline-queue.ts
var import_react5 = require("react");
function isIndexedDBAvailable() {
  try {
    return typeof window !== "undefined" && "indexedDB" in window && window.indexedDB !== null;
  } catch {
    return false;
  }
}
function openDB(dbName, storeName) {
  return new Promise((resolve, reject) => {
    if (!isIndexedDBAvailable()) {
      return reject(new Error("IndexedDB unavailable"));
    }
    try {
      const req = window.indexedDB.open(dbName, 1);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, { keyPath: "id" });
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error || new Error("Failed to open IndexedDB"));
    } catch (err) {
      reject(err);
    }
  });
}
function getLocalFallback(key) {
  try {
    if (typeof localStorage === "undefined") return [];
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function setLocalFallback(key, items) {
  try {
    if (typeof localStorage === "undefined") return;
    localStorage.setItem(key, JSON.stringify(items));
  } catch {
  }
}
async function fetchItemsFromDB(dbName, storeName) {
  const db = await openDB(dbName, storeName);
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readonly");
    const store = tx.objectStore(storeName);
    const req = store.getAll();
    req.onsuccess = () => resolve(req.result || []);
    req.onerror = () => reject(req.error || new Error("Failed to read store"));
  });
}
function useOfflineQueue(options = {}) {
  const {
    dbName = "react_libs_offline",
    storeName = "mutation_queue",
    syncHandler,
    maxRetries = 5,
    autoSyncOnOnline = true
  } = options;
  const fallbackKey = `${dbName}_${storeName}_fallback`;
  const [isOnline, setIsOnline] = (0, import_react5.useState)(
    typeof navigator !== "undefined" ? navigator.onLine : true
  );
  const [queue, setQueue] = (0, import_react5.useState)([]);
  const [isSyncing, setIsSyncing] = (0, import_react5.useState)(false);
  const isSyncingRef = (0, import_react5.useRef)(false);
  const refreshQueue = (0, import_react5.useCallback)(async () => {
    try {
      const items = await fetchItemsFromDB(dbName, storeName);
      setQueue(items);
    } catch {
      setQueue(getLocalFallback(fallbackKey));
    }
  }, [dbName, storeName, fallbackKey]);
  (0, import_react5.useEffect)(() => {
    let mounted = true;
    fetchItemsFromDB(dbName, storeName).then((items) => {
      if (mounted) setQueue(items);
    }).catch(() => {
      if (mounted) setQueue(getLocalFallback(fallbackKey));
    });
    return () => {
      mounted = false;
    };
  }, [dbName, storeName, fallbackKey]);
  const enqueue = (0, import_react5.useCallback)(
    async (item) => {
      const fullItem = {
        ...item,
        timestamp: item.timestamp || Date.now(),
        retryCount: item.retryCount || 0
      };
      try {
        const db = await openDB(dbName, storeName);
        await new Promise((resolve, reject) => {
          const tx = db.transaction(storeName, "readwrite");
          const store = tx.objectStore(storeName);
          const req = store.put(fullItem);
          req.onsuccess = () => resolve();
          req.onerror = () => reject(req.error);
        });
      } catch {
        const existing = getLocalFallback(fallbackKey);
        const updated = existing.filter((x) => x.id !== fullItem.id);
        updated.push(fullItem);
        setLocalFallback(fallbackKey, updated);
      }
      await refreshQueue();
    },
    [dbName, storeName, fallbackKey, refreshQueue]
  );
  const remove = (0, import_react5.useCallback)(
    async (id) => {
      try {
        const db = await openDB(dbName, storeName);
        await new Promise((resolve, reject) => {
          const tx = db.transaction(storeName, "readwrite");
          const store = tx.objectStore(storeName);
          const req = store.delete(id);
          req.onsuccess = () => resolve();
          req.onerror = () => reject(req.error);
        });
      } catch {
        const existing = getLocalFallback(fallbackKey);
        setLocalFallback(fallbackKey, existing.filter((x) => x.id !== id));
      }
      await refreshQueue();
    },
    [dbName, storeName, fallbackKey, refreshQueue]
  );
  const clear = (0, import_react5.useCallback)(async () => {
    try {
      const db = await openDB(dbName, storeName);
      await new Promise((resolve, reject) => {
        const tx = db.transaction(storeName, "readwrite");
        const store = tx.objectStore(storeName);
        const req = store.clear();
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      });
    } catch {
      setLocalFallback(fallbackKey, []);
    }
    await refreshQueue();
  }, [dbName, storeName, fallbackKey, refreshQueue]);
  const flushQueue = (0, import_react5.useCallback)(async () => {
    if (!syncHandler || isSyncingRef.current || typeof navigator !== "undefined" && !navigator.onLine) {
      return { successCount: 0, failedCount: 0 };
    }
    isSyncingRef.current = true;
    setIsSyncing(true);
    let currentItems = [];
    try {
      currentItems = await fetchItemsFromDB(dbName, storeName);
    } catch {
      currentItems = getLocalFallback(fallbackKey);
    }
    let successCount = 0;
    let failedCount = 0;
    for (const item of currentItems) {
      try {
        const ok = await syncHandler(item);
        if (ok) {
          await remove(item.id);
          successCount++;
        } else {
          item.retryCount = (item.retryCount || 0) + 1;
          if (item.retryCount >= maxRetries) {
            await remove(item.id);
          } else {
            await enqueue(item);
          }
          failedCount++;
        }
      } catch {
        failedCount++;
      }
    }
    isSyncingRef.current = false;
    setIsSyncing(false);
    await refreshQueue();
    return { successCount, failedCount };
  }, [dbName, storeName, fallbackKey, syncHandler, maxRetries, remove, enqueue, refreshQueue]);
  (0, import_react5.useEffect)(() => {
    if (typeof window === "undefined") return;
    const handleOnline = () => {
      setIsOnline(true);
      if (autoSyncOnOnline) {
        flushQueue();
      }
    };
    const handleOffline = () => {
      setIsOnline(false);
    };
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [autoSyncOnOnline, flushQueue]);
  return {
    isOnline,
    pendingCount: queue.length,
    isSyncing,
    queue,
    enqueue,
    remove,
    clear,
    flushQueue
  };
}

// src/components/ui/forms/async-select.tsx
var React6 = __toESM(require("react"), 1);

// src/components/ui/overlays/command.tsx
var React5 = __toESM(require("react"), 1);
var import_cmdk = require("cmdk");
var import_lucide_react2 = require("lucide-react");

// src/components/ui/overlays/dialog.tsx
var React4 = __toESM(require("react"), 1);
var DialogPrimitive = __toESM(require("@radix-ui/react-dialog"), 1);
var import_lucide_react = require("lucide-react");
var import_jsx_runtime2 = require("react/jsx-runtime");
var Dialog = DialogPrimitive.Root;
var DialogTrigger = DialogPrimitive.Trigger;
var DialogPortal = DialogPrimitive.Portal;
var DialogClose = DialogPrimitive.Close;
var DialogOverlay = React4.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
  DialogPrimitive.Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
var DialogContent = React4.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(DialogPortal, { children: [
  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(DialogOverlay, {}),
  /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
    DialogPrimitive.Content,
    {
      ref,
      "aria-describedby": props["aria-describedby"] ?? void 0,
      className: cn(
        "fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border bg-background p-6 shadow-lg sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_lucide_react.X, { className: "h-4 w-4" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = DialogPrimitive.Content.displayName;
var DialogHeader = ({
  className,
  ...props
}) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
  "div",
  {
    className: cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    ),
    ...props
  }
);
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({
  className,
  ...props
}) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
  "div",
  {
    className: cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    ),
    ...props
  }
);
DialogFooter.displayName = "DialogFooter";
var DialogTitle = React4.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
  DialogPrimitive.Title,
  {
    ref,
    className: cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    ),
    ...props
  }
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
var DialogDescription = React4.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
  DialogPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

// src/components/ui/overlays/command.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
var Command = React5.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
  import_cmdk.Command,
  {
    ref,
    className: cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-white dark:bg-slate-950 text-popover-foreground",
      className
    ),
    ...props
  }
));
Command.displayName = import_cmdk.Command.displayName;
var CommandDialog = ({ children, ...props }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Dialog, { ...props, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(DialogContent, { className: "overflow-hidden p-0", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(DialogTitle, { className: "sr-only", children: "Command Menu" }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(DialogDescription, { className: "sr-only", children: "Search for commands and settings" }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Command, { className: "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5", children })
  ] }) });
};
var CommandInput = React5.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex items-center border-b px-3", "cmdk-input-wrapper": "", children: [
  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_lucide_react2.Search, { className: "mr-2 h-4 w-4 shrink-0 opacity-50" }),
  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    import_cmdk.Command.Input,
    {
      ref,
      className: cn(
        "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props
    }
  )
] }));
CommandInput.displayName = import_cmdk.Command.Input.displayName;
var CommandList = React5.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
  import_cmdk.Command.List,
  {
    ref,
    className: cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className),
    ...props
  }
));
CommandList.displayName = import_cmdk.Command.List.displayName;
var CommandEmpty = React5.forwardRef((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
  import_cmdk.Command.Empty,
  {
    ref,
    className: "py-6 text-center text-sm",
    ...props
  }
));
CommandEmpty.displayName = import_cmdk.Command.Empty.displayName;
var CommandGroup = React5.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
  import_cmdk.Command.Group,
  {
    ref,
    className: cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className
    ),
    ...props
  }
));
CommandGroup.displayName = import_cmdk.Command.Group.displayName;
var CommandSeparator = React5.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
  import_cmdk.Command.Separator,
  {
    ref,
    className: cn("-mx-1 h-px bg-border", className),
    ...props
  }
));
CommandSeparator.displayName = import_cmdk.Command.Separator.displayName;
var CommandItem = React5.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
  import_cmdk.Command.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      className
    ),
    ...props
  }
));
CommandItem.displayName = import_cmdk.Command.Item.displayName;
var CommandShortcut = ({
  className,
  ...props
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    "span",
    {
      className: cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      ),
      ...props
    }
  );
};
CommandShortcut.displayName = "CommandShortcut";

// src/components/ui/forms/async-select.tsx
var import_lucide_react3 = require("lucide-react");
var import_jsx_runtime4 = require("react/jsx-runtime");
function AsyncSelect({
  value,
  onChange,
  fetchFn,
  getOptionLabel,
  getOptionStringValue,
  getOptionValue,
  placeholder = "Search...",
  searchPlaceholder = "Type to search...",
  emptyMessage = "No results found.",
  className,
  debounceMs = 300
}) {
  const [open, setOpen] = React6.useState(false);
  const [query, setQuery] = React6.useState("");
  const [loading, setLoading] = React6.useState(false);
  const [options, setOptions] = React6.useState([]);
  const containerRef = React6.useRef(null);
  const latestRequestIdRef = React6.useRef(0);
  const fetchFnRef = React6.useRef(fetchFn);
  fetchFnRef.current = fetchFn;
  const getOptionLabelRef = React6.useRef(getOptionLabel);
  getOptionLabelRef.current = getOptionLabel;
  const getOptionValueRef = React6.useRef(getOptionValue);
  getOptionValueRef.current = getOptionValue;
  const getOptionStringValueRef = React6.useRef(getOptionStringValue);
  getOptionStringValueRef.current = getOptionStringValue;
  const optionsRef = React6.useRef(options);
  optionsRef.current = options;
  const getOptionSafeString = React6.useCallback(
    (option) => {
      if (getOptionStringValueRef.current) {
        return getOptionStringValueRef.current(option);
      }
      const label = getOptionLabelRef.current(option);
      if (typeof label === "string") {
        return label;
      }
      if (typeof label === "number") {
        return String(label);
      }
      return getOptionValueRef.current(option);
    },
    []
  );
  const syncQueryWithSelection = React6.useCallback(
    (opts) => {
      if (value) {
        const match = opts.find((o) => getOptionValueRef.current(o) === value);
        if (match) {
          setQuery(getOptionSafeString(match));
        }
      } else {
        setQuery("");
      }
    },
    [value, getOptionSafeString]
  );
  React6.useEffect(() => {
    let active = true;
    if (!open) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const requestId = ++latestRequestIdRef.current;
    const timeout = setTimeout(async () => {
      try {
        const results = await fetchFnRef.current(query);
        if (active && requestId === latestRequestIdRef.current) {
          setOptions(results);
        }
      } catch (err) {
        if (active && requestId === latestRequestIdRef.current) {
          console.error("AsyncSelect fetch error:", err);
        }
      } finally {
        if (active && requestId === latestRequestIdRef.current) {
          setLoading(false);
        }
      }
    }, debounceMs);
    return () => {
      active = false;
      clearTimeout(timeout);
    };
  }, [query, open, debounceMs]);
  React6.useEffect(() => {
    if (!open) {
      if (optionsRef.current.length > 0) {
        syncQueryWithSelection(optionsRef.current);
      } else if (!value) {
        setQuery("");
      }
    }
  }, [value, open, syncQueryWithSelection]);
  React6.useEffect(() => {
    if (!open) return;
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
        syncQueryWithSelection(optionsRef.current);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [open, syncQueryWithSelection]);
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: cn("relative w-full z-50", className), ref: containerRef, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Command, { shouldFilter: false, className: "overflow-visible bg-transparent border rounded-md", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      CommandInput,
      {
        placeholder: searchPlaceholder || placeholder,
        value: query,
        onValueChange: (v) => {
          setQuery(v);
          if (!open) setOpen(true);
        },
        onFocus: () => {
          setOpen(true);
          if (value) setQuery("");
        },
        className: "border-none focus:ring-0 w-full"
      }
    ),
    open && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "absolute top-full z-[100] w-full mt-1 rounded-md border border-border bg-popover text-popover-foreground shadow-md outline-none", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(CommandList, { className: "max-h-60 overflow-y-auto w-full p-1", children: [
      loading && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "py-6 text-center text-sm", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_lucide_react3.Loader2, { className: "h-4 w-4 animate-spin mx-auto text-muted-foreground" }) }),
      !loading && options.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(CommandEmpty, { children: emptyMessage }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(CommandGroup, { children: !loading && options.map((option) => {
        const optVal = getOptionValue(option);
        return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
          CommandItem,
          {
            value: optVal,
            onSelect: () => {
              onChange(optVal, option);
              setOpen(false);
              setQuery(getOptionSafeString(option));
            },
            className: "cursor-pointer",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                import_lucide_react3.Check,
                {
                  className: cn(
                    "mr-2 h-4 w-4 flex-shrink-0",
                    value === optVal ? "opacity-100" : "opacity-0"
                  )
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "truncate w-full", children: getOptionLabel(option) })
            ]
          },
          optVal
        );
      }) })
    ] }) })
  ] }) });
}

// src/components/ui/forms/button.tsx
var React7 = __toESM(require("react"), 1);
var import_react_slot = require("@radix-ui/react-slot");
var import_class_variance_authority = require("class-variance-authority");
var import_lucide_react4 = require("lucide-react");
var import_jsx_runtime5 = require("react/jsx-runtime");
var buttonVariants = (0, import_class_variance_authority.cva)(
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
var Button = React7.forwardRef(
  ({ className, variant, size, asChild = false, isLoading = false, loadingText, children, disabled, ...props }, ref) => {
    const Comp = asChild ? import_react_slot.Slot : "button";
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      Comp,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        disabled: disabled || isLoading,
        ...props,
        children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_jsx_runtime5.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_lucide_react4.Loader2, { className: "h-4 w-4 animate-spin shrink-0" }),
          loadingText ?? children
        ] }) : children
      }
    );
  }
);
Button.displayName = "Button";

// src/components/ui/forms/button-group.tsx
var import_react_slot2 = require("@radix-ui/react-slot");
var import_class_variance_authority2 = require("class-variance-authority");

// src/components/ui/layout/separator.tsx
var React8 = __toESM(require("react"), 1);
var SeparatorPrimitive = __toESM(require("@radix-ui/react-separator"), 1);
var import_jsx_runtime6 = require("react/jsx-runtime");
var Separator = React8.forwardRef(
  ({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
    SeparatorPrimitive.Root,
    {
      ref,
      decorative,
      orientation,
      className: cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      ),
      ...props
    }
  )
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

// src/components/ui/forms/button-group.tsx
var import_jsx_runtime7 = require("react/jsx-runtime");
var buttonGroupVariants = (0, import_class_variance_authority2.cva)(
  "flex w-fit items-stretch has-[>[data-slot=button-group]]:gap-2 [&>*]:focus-visible:relative [&>*]:focus-visible:z-10 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-md [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1",
  {
    variants: {
      orientation: {
        horizontal: "[&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none",
        vertical: "flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none"
      }
    },
    defaultVariants: {
      orientation: "horizontal"
    }
  }
);
function ButtonGroup({
  className,
  orientation,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
    "div",
    {
      role: "group",
      "data-slot": "button-group",
      "data-orientation": orientation,
      className: cn(buttonGroupVariants({ orientation }), className),
      ...props
    }
  );
}
function ButtonGroupText({
  className,
  asChild = false,
  ...props
}) {
  const mergedClass = cn(
    "bg-muted shadow-xs flex items-center gap-2 rounded-md border px-4 text-sm font-medium [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none",
    className
  );
  if (asChild) {
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_react_slot2.Slot, { className: mergedClass, ...props });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: mergedClass, ...props });
}
function ButtonGroupSeparator({
  className,
  orientation = "vertical",
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
    Separator,
    {
      "data-slot": "button-group-separator",
      orientation,
      className: cn(
        "bg-input relative !m-0 self-stretch data-[orientation=vertical]:h-auto",
        className
      ),
      ...props
    }
  );
}

// src/components/ui/forms/checkbox.tsx
var React9 = __toESM(require("react"), 1);
var CheckboxPrimitive = __toESM(require("@radix-ui/react-checkbox"), 1);
var import_lucide_react5 = require("lucide-react");
var import_jsx_runtime8 = require("react/jsx-runtime");
var Checkbox = React9.forwardRef(({ className, style, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
  CheckboxPrimitive.Root,
  {
    ref,
    className: cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background",
      // Smooth bg colour transition on check/uncheck
      "transition-colors duration-150",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "disabled:cursor-not-allowed disabled:opacity-50",
      // Checked & indeterminate both fill with primary colour
      "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      "data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground",
      "inline-flex items-center justify-center",
      className
    ),
    style: { minHeight: "1rem", minWidth: "1rem", ...style },
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
      CheckboxPrimitive.Indicator,
      {
        forceMount: true,
        className: cn(
          "flex items-center justify-center text-current",
          "transition-opacity duration-150",
          "opacity-0 data-[state=checked]:opacity-100 data-[state=indeterminate]:opacity-100"
        ),
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
            import_lucide_react5.Check,
            {
              className: "h-3 w-3 data-[state=indeterminate]:hidden",
              strokeWidth: 3
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
            import_lucide_react5.Minus,
            {
              className: "hidden h-3 w-3 data-[state=indeterminate]:block",
              strokeWidth: 3
            }
          )
        ]
      }
    )
  }
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

// src/components/ui/forms/combobox.tsx
var React11 = __toESM(require("react"), 1);
var import_lucide_react6 = require("lucide-react");

// src/components/ui/core/popover.tsx
var React10 = __toESM(require("react"), 1);
var PopoverPrimitive = __toESM(require("@radix-ui/react-popover"), 1);
var import_jsx_runtime9 = require("react/jsx-runtime");
var Popover = PopoverPrimitive.Root;
var PopoverTrigger = PopoverPrimitive.Trigger;
var PopoverAnchor = PopoverPrimitive.Anchor;
var PopoverClose = PopoverPrimitive.Close;
var PopoverContent = React10.forwardRef(({ className, align = "start", sideOffset = 4, side, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(PopoverPrimitive.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
  PopoverPrimitive.Content,
  {
    ref,
    align,
    sideOffset,
    ...side !== void 0 ? { side } : {},
    className: cn(
      "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
      "data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95",
      "data-[side=bottom]:slide-in-from-top-2",
      "data-[side=left]:slide-in-from-right-2",
      "data-[side=right]:slide-in-from-left-2",
      "data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
) }));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

// src/components/ui/forms/combobox.tsx
var import_jsx_runtime10 = require("react/jsx-runtime");
var Combobox = React11.forwardRef(
  ({
    value: valueProp,
    defaultValue,
    options = [],
    onChange,
    placeholder = "Select an option",
    disabled = false,
    emptyText = "No options found.",
    searchPlaceholder,
    triggerClassName,
    contentClassName
  }, ref) => {
    const [open, setOpen] = React11.useState(false);
    const [uncontrolledValue, setUncontrolledValue] = React11.useState(defaultValue);
    const isControlled = valueProp !== void 0;
    const value = isControlled ? valueProp : uncontrolledValue;
    const selectedOption = options.find((option) => option.value === value);
    const handleSelect = (optionValue) => {
      if (!isControlled) {
        setUncontrolledValue(optionValue);
      }
      onChange?.(optionValue);
      setOpen(false);
    };
    return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(Popover, { modal: false, open, onOpenChange: setOpen, children: [
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(
        Button,
        {
          ref,
          type: "button",
          variant: "outline",
          role: "combobox",
          "aria-expanded": open,
          disabled,
          className: cn(
            "w-full justify-between bg-white font-normal text-left dark:bg-slate-950 dark:border-slate-800",
            !selectedOption && "text-slate-500 dark:text-slate-400",
            triggerClassName
          ),
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { className: "truncate", children: selectedOption?.label ?? placeholder }),
            /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_lucide_react6.ChevronsUpDown, { className: "ml-2 h-4 w-4 shrink-0 opacity-50" })
          ]
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
        PopoverContent,
        {
          align: "start",
          className: cn(
            "w-[var(--radix-popover-trigger-width)] p-0",
            contentClassName
          ),
          onWheel: (e) => e.stopPropagation(),
          onTouchMove: (e) => e.stopPropagation(),
          children: /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(Command, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
              CommandInput,
              {
                placeholder: searchPlaceholder ?? `Search ${placeholder.toLowerCase()}...`
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(CommandList, { className: "max-h-72 overflow-y-auto", children: [
              /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(CommandEmpty, { children: emptyText }),
              /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(CommandGroup, { children: options.map((option) => /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(
                CommandItem,
                {
                  value: option.label,
                  ...option.disabled !== void 0 ? { disabled: option.disabled } : {},
                  onSelect: () => handleSelect(option.value),
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
                      import_lucide_react6.Check,
                      {
                        className: cn(
                          "mr-2 h-4 w-4",
                          value === option.value ? "opacity-100" : "opacity-0"
                        )
                      }
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { className: "truncate", children: option.label })
                  ]
                },
                option.value
              )) })
            ] })
          ] })
        }
      )
    ] });
  }
);
Combobox.displayName = "Combobox";

// src/components/ui/forms/field.tsx
var React13 = __toESM(require("react"), 1);
var import_react6 = require("react");
var import_class_variance_authority4 = require("class-variance-authority");

// src/components/ui/forms/label.tsx
var React12 = __toESM(require("react"), 1);
var LabelPrimitive = __toESM(require("@radix-ui/react-label"), 1);
var import_class_variance_authority3 = require("class-variance-authority");
var import_jsx_runtime11 = require("react/jsx-runtime");
var labelVariants = (0, import_class_variance_authority3.cva)(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
var Label = React12.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
  LabelPrimitive.Root,
  {
    ref,
    className: cn(labelVariants(), className),
    ...props
  }
));
Label.displayName = LabelPrimitive.Root.displayName;

// src/components/ui/forms/field.tsx
var import_jsx_runtime12 = require("react/jsx-runtime");
var FieldSet = React13.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
  "fieldset",
  {
    ref,
    "data-slot": "field-set",
    className: cn(
      "flex flex-col gap-6",
      "has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3",
      className
    ),
    ...props
  }
));
FieldSet.displayName = "FieldSet";
var FieldLegend = React13.forwardRef(({ className, variant = "legend", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
  "legend",
  {
    ref,
    "data-slot": "field-legend",
    "data-variant": variant,
    className: cn(
      "mb-1.5 font-medium",
      "data-[variant=legend]:text-base",
      "data-[variant=label]:text-sm",
      className
    ),
    ...props
  }
));
FieldLegend.displayName = "FieldLegend";
var FieldGroup = React13.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
  "div",
  {
    ref,
    "data-slot": "field-group",
    className: cn(
      "group/field-group @container/field-group flex w-full flex-col gap-5 data-[slot=checkbox-group]:gap-3 [&>[data-slot=field-group]]:gap-4",
      className
    ),
    ...props
  }
));
FieldGroup.displayName = "FieldGroup";
var fieldVariants = (0, import_class_variance_authority4.cva)(
  "group/field data-[invalid=true]:text-destructive flex w-full gap-3",
  {
    variants: {
      orientation: {
        vertical: ["flex-col [&>*]:w-full [&>.sr-only]:w-auto"],
        horizontal: [
          "flex-row items-center",
          "[&>[data-slot=field-label]]:flex-auto",
          "has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px has-[>[data-slot=field-content]]:items-start"
        ],
        responsive: [
          "@md/field-group:flex-row @md/field-group:items-center @md/field-group:[&>*]:w-auto flex-col [&>*]:w-full [&>.sr-only]:w-auto",
          "@md/field-group:[&>[data-slot=field-label]]:flex-auto",
          "@md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px"
        ]
      }
    },
    defaultVariants: {
      orientation: "vertical"
    }
  }
);
var Field = React13.forwardRef(({ className, orientation = "vertical", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
  "div",
  {
    ref,
    role: "group",
    "data-slot": "field",
    "data-orientation": orientation,
    className: cn(fieldVariants({ orientation }), className),
    ...props
  }
));
Field.displayName = "Field";
var FieldContent = React13.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
  "div",
  {
    ref,
    "data-slot": "field-content",
    className: cn(
      "group/field-content flex flex-1 flex-col gap-1.5 leading-snug",
      className
    ),
    ...props
  }
));
FieldContent.displayName = "FieldContent";
var FieldLabel = React13.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
  Label,
  {
    ref,
    "data-slot": "field-label",
    className: cn(
      "group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50",
      "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border [&>[data-slot=field]]:p-4",
      "has-data-[state=checked]:bg-primary/5 has-data-[state=checked]:border-primary dark:has-data-[state=checked]:bg-primary/10",
      className
    ),
    ...props
  }
));
FieldLabel.displayName = "FieldLabel";
var FieldTitle = React13.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
  "div",
  {
    ref,
    "data-slot": "field-title",
    className: cn(
      "flex w-fit items-center gap-2 text-sm font-medium leading-snug group-data-[disabled=true]/field:opacity-50",
      className
    ),
    ...props
  }
));
FieldTitle.displayName = "FieldTitle";
var FieldDescription = React13.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
  "p",
  {
    ref,
    "data-slot": "field-description",
    className: cn(
      "text-muted-foreground text-sm font-normal leading-normal group-has-[[data-orientation=horizontal]]/field:text-balance",
      "nth-last-2:-mt-1 last:mt-0 [[data-variant=legend]+&]:-mt-1.5",
      "[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",
      className
    ),
    ...props
  }
));
FieldDescription.displayName = "FieldDescription";
var FieldSeparator = React13.forwardRef(({ children, className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(
  "div",
  {
    ref,
    "data-slot": "field-separator",
    "data-content": !!children,
    className: cn(
      "relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(Separator, { className: "absolute inset-0 top-1/2" }),
      children && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
        "span",
        {
          className: "bg-background text-muted-foreground relative mx-auto block w-fit px-2",
          "data-slot": "field-separator-content",
          children
        }
      )
    ]
  }
));
FieldSeparator.displayName = "FieldSeparator";
var FieldError = React13.forwardRef(({ className, children, errors, ...props }, ref) => {
  const content = (0, import_react6.useMemo)(() => {
    if (children) {
      return children;
    }
    if (!errors) {
      return null;
    }
    if (errors?.length === 1 && errors[0]?.message) {
      return errors[0].message;
    }
    return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("ul", { className: "ml-4 flex list-disc flex-col gap-1", children: errors.map(
      (error, index) => error?.message && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("li", { children: error.message }, index)
    ) });
  }, [children, errors]);
  if (!content) {
    return null;
  }
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
    "div",
    {
      ref,
      role: "alert",
      "data-slot": "field-error",
      className: cn("text-destructive text-sm font-normal", className),
      ...props,
      children: content
    }
  );
});
FieldError.displayName = "FieldError";

// src/components/ui/forms/file-upload.tsx
var React14 = __toESM(require("react"), 1);
var import_lucide_react7 = require("lucide-react");
var import_jsx_runtime13 = require("react/jsx-runtime");
var FileUpload = React14.forwardRef(
  ({
    className,
    value: valueProp,
    defaultValue,
    onChange,
    accept,
    maxSize = 10 * 1024 * 1024,
    // 10MB default
    maxFiles = 5,
    multiple = true,
    disabled = false,
    label = "Click or drag files to upload",
    description = "SVG, PNG, JPG, or PDF up to 10MB",
    error: externalError,
    ...props
  }, ref) => {
    const isControlled = valueProp !== void 0;
    const [uncontrolledValue, setUncontrolledValue] = React14.useState(defaultValue ?? []);
    const value = isControlled ? valueProp : uncontrolledValue;
    const inputRef = React14.useRef(null);
    const createdUrlsRef = React14.useRef(/* @__PURE__ */ new Set());
    const [isDragging, setIsDragging] = React14.useState(false);
    const [errorMessage, setErrorMessage] = React14.useState(null);
    const activeError = externalError || errorMessage;
    const updateFiles = React14.useCallback(
      (nextFiles) => {
        if (!isControlled) {
          setUncontrolledValue(nextFiles);
        }
        onChange?.(nextFiles);
      },
      [isControlled, onChange]
    );
    const processFiles = React14.useCallback(
      (newRawFiles) => {
        setErrorMessage(null);
        const incoming = Array.from(newRawFiles);
        if (!multiple && incoming.length > 1) {
          setErrorMessage("Only single file upload is allowed");
          return;
        }
        if (value.length + incoming.length > maxFiles) {
          setErrorMessage(`You can only upload up to ${maxFiles} files`);
          return;
        }
        const validFiles = [];
        for (const file of incoming) {
          if (maxSize && file.size > maxSize) {
            setErrorMessage(`File "${file.name}" exceeds max allowed size of ${formatBytes(maxSize)}`);
            return;
          }
          const isImage = file.type.startsWith("image/");
          const previewUrl = isImage ? URL.createObjectURL(file) : void 0;
          if (previewUrl) {
            createdUrlsRef.current.add(previewUrl);
          }
          validFiles.push({
            id: typeof crypto !== "undefined" && typeof crypto.randomUUID === "function" ? crypto.randomUUID() : `${file.name}-${file.lastModified}-${file.size}-${Date.now()}`,
            file,
            previewUrl,
            progress: 100
          });
        }
        const updated = multiple ? [...value, ...validFiles] : validFiles;
        updateFiles(updated);
      },
      [value, updateFiles, maxSize, maxFiles, multiple]
    );
    const handleDragOver = (e) => {
      e.preventDefault();
      if (!disabled) setIsDragging(true);
    };
    const handleDragLeave = (e) => {
      e.preventDefault();
      setIsDragging(false);
    };
    const handleDrop = (e) => {
      e.preventDefault();
      setIsDragging(false);
      if (disabled) return;
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        processFiles(e.dataTransfer.files);
      }
    };
    const handleFileInputChange = (e) => {
      if (e.target.files && e.target.files.length > 0) {
        processFiles(e.target.files);
        e.target.value = "";
      }
    };
    const handleRemove = (id, e) => {
      e.stopPropagation();
      const itemToRemove = value.find((f) => f.id === id);
      if (itemToRemove?.previewUrl) {
        URL.revokeObjectURL(itemToRemove.previewUrl);
      }
      const updated = value.filter((f) => f.id !== id);
      updateFiles(updated);
    };
    React14.useEffect(() => {
      const currentUrls = new Set(value.map((item) => item.previewUrl).filter(Boolean));
      createdUrlsRef.current.forEach((url) => {
        if (!currentUrls.has(url)) {
          URL.revokeObjectURL(url);
          createdUrlsRef.current.delete(url);
        }
      });
    }, [value]);
    React14.useEffect(() => {
      const urls = createdUrlsRef.current;
      return () => {
        urls.forEach((url) => {
          URL.revokeObjectURL(url);
        });
        urls.clear();
      };
    }, []);
    return /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { ref, className: cn("w-full space-y-3", className), ...props, children: [
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
        "input",
        {
          ref: inputRef,
          type: "file",
          "aria-label": label,
          accept,
          multiple,
          disabled,
          onChange: handleFileInputChange,
          className: "sr-only",
          tabIndex: -1,
          "data-testid": "file-upload-input"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(
        "div",
        {
          onClick: () => !disabled && inputRef.current?.click(),
          onDragOver: handleDragOver,
          onDragLeave: handleDragLeave,
          onDrop: handleDrop,
          role: "button",
          tabIndex: disabled ? -1 : 0,
          "aria-disabled": disabled,
          onKeyDown: (e) => {
            if ((e.key === "Enter" || e.key === " ") && !disabled) {
              e.preventDefault();
              inputRef.current?.click();
            }
          },
          className: cn(
            "relative flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg transition-colors cursor-pointer text-center",
            "bg-muted/20 hover:bg-muted/40 border-border hover:border-primary/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            isDragging && "border-primary bg-primary/5 ring-2 ring-primary/20",
            disabled && "opacity-50 cursor-not-allowed hover:bg-muted/20 hover:border-border",
            activeError && "border-destructive/50 hover:border-destructive"
          ),
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "p-3 bg-muted rounded-full mb-3 text-muted-foreground", children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_lucide_react7.UploadCloud, { className: "h-6 w-6" }) }),
            /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: "text-sm font-medium text-foreground", children: label }),
            description && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: "text-xs text-muted-foreground mt-1", children: description })
          ]
        }
      ),
      (() => {
        const fileCountSuffix = value.length === 1 ? "" : "s";
        const liveAnnouncement = value.length > 0 ? `${value.length} file${fileCountSuffix} uploaded.` : "No files uploaded.";
        return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
          "div",
          {
            "aria-live": "polite",
            "aria-atomic": "true",
            className: "sr-only",
            role: "status",
            children: liveAnnouncement
          }
        );
      })(),
      activeError && /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(
        "div",
        {
          role: "alert",
          "aria-live": "polite",
          className: "flex items-center gap-1.5 text-xs text-destructive",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_lucide_react7.AlertCircle, { className: "h-3.5 w-3.5 shrink-0" }),
            /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("span", { children: activeError })
          ]
        }
      ),
      value.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("ul", { className: "space-y-2 pt-1", "aria-label": "Uploaded files", "aria-live": "polite", children: value.map((item) => /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(
        "li",
        {
          className: "flex items-center justify-between p-2.5 rounded-md border border-border bg-card text-card-foreground shadow-xs text-sm",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "flex items-center gap-3 min-w-0 pr-2", children: [
              item.previewUrl ? /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
                "img",
                {
                  src: item.previewUrl,
                  alt: item.file.name,
                  className: "h-9 w-9 rounded object-cover border border-border shrink-0"
                }
              ) : /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "h-9 w-9 rounded bg-muted flex items-center justify-center text-muted-foreground shrink-0", children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_lucide_react7.FileText, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "min-w-0", children: [
                /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: "font-medium text-foreground truncate", children: item.file.name }),
                /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: "text-xs text-muted-foreground", children: formatBytes(item.file.size) })
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "flex items-center gap-2 shrink-0", children: [
              /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_lucide_react7.CheckCircle2, { className: "h-4 w-4 text-emerald-500" }),
              /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
                "button",
                {
                  type: "button",
                  onClick: (e) => handleRemove(item.id, e),
                  disabled,
                  "aria-label": `Remove ${item.file.name}`,
                  className: "p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors",
                  children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_lucide_react7.X, { className: "h-4 w-4" })
                }
              )
            ] })
          ]
        },
        item.id
      )) })
    ] });
  }
);
FileUpload.displayName = "FileUpload";

// src/components/ui/forms/filter-select.tsx
var React16 = __toESM(require("react"), 1);

// src/components/ui/forms/select.tsx
var React15 = __toESM(require("react"), 1);
var SelectPrimitive = __toESM(require("@radix-ui/react-select"), 1);
var import_lucide_react8 = require("lucide-react");
var import_jsx_runtime14 = require("react/jsx-runtime");
var Select = SelectPrimitive.Root;
var SelectGroup = SelectPrimitive.Group;
var SelectValue = SelectPrimitive.Value;
var SelectTrigger = React15.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
  SelectPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background",
      // Smooth border/ring transition on focus + open
      "transition-colors duration-150",
      "data-[placeholder]:text-muted-foreground",
      "focus:outline-none focus:ring-1 focus:ring-ring",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "[&>span]:truncate [&>span]:pr-2 [&>span]:min-w-0 flex-grow text-left gap-2",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_lucide_react8.ChevronDown, { className: "h-4 w-4 shrink-0 opacity-50 transition-transform duration-200 data-[state=open]:rotate-180" }) })
    ]
  }
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
var SelectScrollUpButton = React15.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
  SelectPrimitive.ScrollUpButton,
  {
    ref,
    className: cn(
      "flex cursor-default items-center justify-center py-1",
      className
    ),
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_lucide_react8.ChevronUp, { className: "h-4 w-4" })
  }
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
var SelectScrollDownButton = React15.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
  SelectPrimitive.ScrollDownButton,
  {
    ref,
    className: cn(
      "flex cursor-default items-center justify-center py-1",
      className
    ),
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_lucide_react8.ChevronDown, { className: "h-4 w-4" })
  }
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
var SelectContent = React15.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(SelectPrimitive.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
  SelectPrimitive.Content,
  {
    ref,
    className: cn(
      "relative z-[100] max-h-60 min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border",
      // Use CSS var for background — NOT hardcoded bg-white
      "bg-popover text-popover-foreground shadow-md",
      // Open / close animations
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
      "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
      "data-[side=right]:slide-in-from-left-2 data-[side=top]:-translate-y-1",
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    ),
    style: {
      ...position === "popper" && {
        width: "var(--radix-select-trigger-width)",
        minWidth: "var(--radix-select-trigger-width)"
      },
      ...props.style
    },
    position,
    ...props,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(SelectScrollUpButton, {}),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
        SelectPrimitive.Viewport,
        {
          className: cn(
            "p-1",
            position === "popper" && "w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(SelectScrollDownButton, {})
    ]
  }
) }));
SelectContent.displayName = SelectPrimitive.Content.displayName;
var SelectLabel = React15.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
  SelectPrimitive.Label,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", className),
    ...props
  }
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
var SelectItem = React15.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
  SelectPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none",
      // Smooth bg transition on hover/focus
      "transition-colors duration-100",
      "focus:bg-accent focus:text-accent-foreground",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      "[&>span]:truncate",
      // Optional generic truncation rule
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_lucide_react8.Check, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(SelectPrimitive.ItemText, { children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "truncate w-full pr-1", children }) })
    ]
  }
));
SelectItem.displayName = SelectPrimitive.Item.displayName;
var SelectSeparator = React15.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
  SelectPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

// src/components/ui/forms/filter-select.tsx
var import_jsx_runtime15 = require("react/jsx-runtime");
function FilterSelect({
  value,
  onChange,
  options,
  placeholder,
  className,
  id,
  disabled
}) {
  const safeValue = value === "" ? "_empty" : value;
  const handleValueChange = React16.useCallback((v) => {
    if (onChange) {
      onChange(v === "_empty" ? "" : v);
    }
  }, [onChange]);
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(
    Select,
    {
      ...safeValue !== void 0 ? { value: safeValue } : {},
      onValueChange: handleValueChange,
      ...disabled !== void 0 ? { disabled } : {},
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(SelectTrigger, { id, className: cn("bg-white", className), children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(SelectValue, { placeholder }) }),
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(SelectContent, { children: options?.length ? options?.map((option) => {
          const optValue = option.value === "" ? "_empty" : option.value;
          return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(SelectItem, { value: optValue, children: option.label }, optValue);
        }) : /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(SelectItem, { value: "_empty", disabled: true, children: "No options available" }) })
      ]
    }
  );
}

// src/components/ui/forms/form.tsx
var React17 = __toESM(require("react"), 1);
var import_react_slot3 = require("@radix-ui/react-slot");
var import_react_hook_form = require("react-hook-form");
var import_jsx_runtime16 = require("react/jsx-runtime");
var Form = import_react_hook_form.FormProvider;
var FormFieldContext = React17.createContext(null);
var FormField = ({
  ...props
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(FormFieldContext.Provider, { value: { name: props.name }, children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_react_hook_form.Controller, { ...props }) });
};
var useFormField = () => {
  const fieldContext = React17.useContext(FormFieldContext);
  const itemContext = React17.useContext(FormItemContext);
  const { getFieldState, formState } = (0, import_react_hook_form.useFormContext)();
  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }
  if (!itemContext) {
    throw new Error("useFormField should be used within <FormItem>");
  }
  const fieldState = getFieldState(fieldContext.name, formState);
  const { id } = itemContext;
  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState
  };
};
var FormItemContext = React17.createContext(null);
var FormItem = React17.forwardRef(({ className, ...props }, ref) => {
  const id = React17.useId();
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(FormItemContext.Provider, { value: { id }, children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("div", { ref, className: cn("space-y-2", className), ...props }) });
});
FormItem.displayName = "FormItem";
var FormLabel = React17.forwardRef(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
    Label,
    {
      ref,
      className: cn(error && "text-destructive", className),
      htmlFor: formItemId,
      ...props
    }
  );
});
FormLabel.displayName = "FormLabel";
var FormControl = React17.forwardRef(({ "aria-describedby": ariaDescribedBy, ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
  const defaultDescribedBy = !error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`;
  const fullDescribedBy = ariaDescribedBy ? `${ariaDescribedBy} ${defaultDescribedBy}` : defaultDescribedBy;
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
    import_react_slot3.Slot,
    {
      ref,
      id: formItemId,
      "aria-describedby": fullDescribedBy,
      "aria-invalid": !!error,
      ...props
    }
  );
});
FormControl.displayName = "FormControl";
var FormDescription = React17.forwardRef(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
    "p",
    {
      ref,
      id: formDescriptionId,
      className: cn("text-[0.8rem] text-muted-foreground", className),
      ...props
    }
  );
});
FormDescription.displayName = "FormDescription";
var FormMessage = React17.forwardRef(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message ?? "") : children;
  if (!body) {
    return null;
  }
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
    "p",
    {
      ref,
      id: formMessageId,
      className: cn("text-[0.8rem] font-medium text-destructive", className),
      ...props,
      children: body
    }
  );
});
FormMessage.displayName = "FormMessage";

// src/components/ui/forms/input.tsx
var React18 = __toESM(require("react"), 1);
var import_jsx_runtime17 = require("react/jsx-runtime");
var Input = React18.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
      "input",
      {
        type,
        className: cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "read-only:bg-muted/40 read-only:cursor-default read-only:focus-visible:ring-0 read-only:select-none",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";

// src/components/ui/forms/input-group.tsx
var import_class_variance_authority5 = require("class-variance-authority");

// src/components/ui/forms/textarea.tsx
var React19 = __toESM(require("react"), 1);
var import_jsx_runtime18 = require("react/jsx-runtime");
var Textarea = React19.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
    "textarea",
    {
      className: cn(
        "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm",
        // Smooth border/ring colour transition on focus
        "transition-colors duration-150",
        "placeholder:text-muted-foreground",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        "disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ref,
      ...props
    }
  );
});
Textarea.displayName = "Textarea";

// src/components/ui/forms/input-group.tsx
var import_jsx_runtime19 = require("react/jsx-runtime");
function InputGroup({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
    "div",
    {
      "data-slot": "input-group",
      role: "group",
      className: cn(
        "group/input-group border-input dark:bg-input/30 shadow-xs relative flex w-full items-center rounded-md border outline-none transition-[color,box-shadow]",
        "h-9 has-[>textarea]:h-auto",
        // Variants based on alignment.
        "has-[>[data-align=inline-start]]:[&>input]:pl-2",
        "has-[>[data-align=inline-end]]:[&>input]:pr-2",
        "has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-start]]:[&>input]:pb-3",
        "has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-end]]:[&>input]:pt-3",
        // Focus state.
        "has-[[data-slot=input-group-control]:focus-visible]:ring-ring has-[[data-slot=input-group-control]:focus-visible]:ring-1",
        // Error state.
        "has-[[data-slot][aria-invalid=true]]:ring-destructive/20 has-[[data-slot][aria-invalid=true]]:border-destructive dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40",
        className
      ),
      ...props
    }
  );
}
var inputGroupAddonVariants = (0, import_class_variance_authority5.cva)(
  "text-muted-foreground flex h-auto cursor-text select-none items-center justify-center gap-2 py-1.5 text-sm font-medium group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-4",
  {
    variants: {
      align: {
        "inline-start": "order-first pl-3 has-[>button]:ml-[-0.45rem] has-[>kbd]:ml-[-0.35rem]",
        "inline-end": "order-last pr-3 has-[>button]:mr-[-0.4rem] has-[>kbd]:mr-[-0.35rem]",
        "block-start": "[.border-b]:pb-3 order-first w-full justify-start px-3 pt-3 group-has-[>input]/input-group:pt-2.5",
        "block-end": "[.border-t]:pt-3 order-last w-full justify-start px-3 pb-3 group-has-[>input]/input-group:pb-2.5"
      }
    },
    defaultVariants: {
      align: "inline-start"
    }
  }
);
function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
    "div",
    {
      role: "group",
      "data-slot": "input-group-addon",
      "data-align": align,
      className: cn(inputGroupAddonVariants({ align }), className),
      onClick: (e) => {
        if (e.target.closest("button")) {
          return;
        }
        const control = e.currentTarget.parentElement?.querySelector(
          "[data-slot=input-group-control]"
        );
        control?.focus();
      },
      ...props
    }
  );
}
var inputGroupButtonVariants = (0, import_class_variance_authority5.cva)(
  "flex items-center gap-2 text-sm shadow-none",
  {
    variants: {
      size: {
        xs: "h-6 gap-1 rounded-[calc(var(--radius)-5px)] px-2 has-[>svg]:px-2 [&>svg:not([class*='size-'])]:size-3.5",
        sm: "h-8 gap-1.5 rounded-md px-2.5 has-[>svg]:px-2.5",
        "icon-xs": "size-6 rounded-[calc(var(--radius)-5px)] p-0 has-[>svg]:p-0",
        "icon-sm": "size-8 p-0 has-[>svg]:p-0"
      }
    },
    defaultVariants: {
      size: "xs"
    }
  }
);
function InputGroupButton({
  className,
  type = "button",
  variant = "ghost",
  size = "xs",
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
    Button,
    {
      type,
      "data-size": size,
      variant,
      className: cn(inputGroupButtonVariants({ size }), className),
      ...props
    }
  );
}
function InputGroupText({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
    "span",
    {
      className: cn(
        "text-muted-foreground flex items-center gap-2 text-sm [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none",
        className
      ),
      ...props
    }
  );
}
function InputGroupInput({
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
    Input,
    {
      "data-slot": "input-group-control",
      className: cn(
        "flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0 dark:bg-transparent",
        className
      ),
      ...props
    }
  );
}
function InputGroupTextarea({
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
    Textarea,
    {
      "data-slot": "input-group-control",
      className: cn(
        "flex-1 resize-none rounded-none border-0 bg-transparent py-3 shadow-none focus-visible:ring-0 dark:bg-transparent",
        className
      ),
      ...props
    }
  );
}

// src/components/ui/forms/input-otp.tsx
var React20 = __toESM(require("react"), 1);
var import_input_otp = require("input-otp");
var import_lucide_react9 = require("lucide-react");
var import_jsx_runtime20 = require("react/jsx-runtime");
var InputOTP = React20.forwardRef(({ className, containerClassName, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
  import_input_otp.OTPInput,
  {
    ref,
    containerClassName: cn(
      "flex items-center gap-2 has-[:disabled]:opacity-50",
      containerClassName
    ),
    className: cn("disabled:cursor-not-allowed", className),
    inputMode: "numeric",
    pattern: "[0-9]*",
    ...props
  }
));
InputOTP.displayName = "InputOTP";
var InputOTPGroup = React20.forwardRef(({ className, ...props }, ref) => (
  // gap-2 creates spacing between individual OTP slots
  /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("div", { ref, className: cn("flex items-center gap-2", className), ...props })
));
InputOTPGroup.displayName = "InputOTPGroup";
var InputOTPSlot = React20.forwardRef(({ index, className, ...props }, ref) => {
  const inputOTPContext = React20.useContext(import_input_otp.OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index] ?? {};
  return /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(
    "div",
    {
      ref,
      className: cn(
        // Standalone cell: each slot has its own complete border + rounded corners
        "relative flex h-12 w-11 items-center justify-center",
        "rounded-md border-2 border-input bg-background text-base font-semibold",
        "shadow-sm transition-all duration-150",
        isActive && "border-primary ring-2 ring-primary/20 z-10",
        className
      ),
      ...props,
      children: [
        char,
        hasFakeCaret && /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("div", { className: "pointer-events-none absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("div", { className: "h-5 w-0.5 animate-caret-blink bg-foreground duration-1000" }) })
      ]
    }
  );
});
InputOTPSlot.displayName = "InputOTPSlot";
var InputOTPSeparator = React20.forwardRef(({ ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("div", { ref, role: "separator", ...props, children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_lucide_react9.Minus, {}) }));
InputOTPSeparator.displayName = "InputOTPSeparator";

// src/components/ui/forms/multi-select.tsx
var React21 = __toESM(require("react"), 1);
var import_lucide_react10 = require("lucide-react");

// src/components/ui/data-display/badge.tsx
var import_class_variance_authority6 = require("class-variance-authority");
var import_jsx_runtime21 = require("react/jsx-runtime");
var badgeVariants = (0, import_class_variance_authority6.cva)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("span", { className: cn(badgeVariants({ variant }), className), ...props });
}

// src/components/ui/forms/multi-select.tsx
var import_jsx_runtime22 = require("react/jsx-runtime");
var MultiSelect = React21.forwardRef(
  ({
    options,
    value: valueProp,
    defaultValue,
    onChange,
    placeholder = "Select options...",
    searchPlaceholder = "Search options...",
    maxCount = 3,
    disabled = false,
    className,
    error,
    ...props
  }, ref) => {
    const isControlled = valueProp !== void 0;
    const [uncontrolledValue, setUncontrolledValue] = React21.useState(defaultValue ?? []);
    const value = isControlled ? valueProp : uncontrolledValue;
    const [isOpen, setIsOpen] = React21.useState(false);
    const [searchQuery, setSearchQuery] = React21.useState("");
    const [activeIndex, setActiveIndex] = React21.useState(-1);
    const generatedId = React21.useId();
    const listboxId = `${generatedId}-listbox`;
    const searchInputId = `${generatedId}-search`;
    const containerRef = React21.useRef(null);
    const triggerRef = React21.useRef(null);
    const searchInputRef = React21.useRef(null);
    const updateValue = React21.useCallback(
      (nextValue) => {
        if (!isControlled) {
          setUncontrolledValue(nextValue);
        }
        onChange?.(nextValue);
      },
      [isControlled, onChange]
    );
    React21.useEffect(() => {
      if (!isOpen) {
        setActiveIndex(-1);
      }
    }, [isOpen]);
    React21.useEffect(() => {
      const handleClickOutside = (event) => {
        if (containerRef.current && !containerRef.current.contains(event.target)) {
          setIsOpen(false);
          setActiveIndex(-1);
        }
      };
      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      }
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isOpen]);
    const filteredOptions = React21.useMemo(() => {
      if (!searchQuery.trim()) return options;
      return options.filter(
        (opt) => opt.label.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }, [options, searchQuery]);
    const moveActiveIndex = (direction) => {
      if (filteredOptions.length === 0) return;
      setActiveIndex((prev) => {
        let next = prev + direction;
        if (next < 0) next = filteredOptions.length - 1;
        if (next >= filteredOptions.length) next = 0;
        return next;
      });
    };
    const handleCloseAndRestoreFocus = () => {
      setIsOpen(false);
      setActiveIndex(-1);
      triggerRef.current?.focus();
    };
    const handleToggle = (optionValue) => {
      if (disabled) return;
      const isSelected = value.includes(optionValue);
      const nextValue = isSelected ? value.filter((v) => v !== optionValue) : [...value, optionValue];
      updateValue(nextValue);
    };
    const handleRemoveTag = (optionValue, e) => {
      e.stopPropagation();
      if (disabled) return;
      updateValue(value.filter((v) => v !== optionValue));
    };
    const handleClearAll = (e) => {
      e.stopPropagation();
      if (disabled) return;
      updateValue([]);
    };
    const handleSelectAll = () => {
      if (disabled) return;
      const enabledValues = options.filter((o) => !o.disabled).map((o) => o.value);
      updateValue(enabledValues);
    };
    const selectedOptions = options.filter((o) => value.includes(o.value));
    const visibleTags = selectedOptions.slice(0, maxCount);
    const hiddenCount = selectedOptions.length - maxCount;
    const handleEnterOrSpace = (e) => {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        setActiveIndex(0);
        return;
      }
      const activeOpt = filteredOptions[activeIndex];
      if (activeIndex >= 0 && activeOpt && !activeOpt.disabled) {
        handleToggle(activeOpt.value);
      } else {
        setIsOpen(false);
      }
    };
    const handleArrowKey = (e, direction) => {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        setActiveIndex(direction === 1 ? 0 : filteredOptions.length - 1);
      } else {
        moveActiveIndex(direction);
      }
    };
    const handleTriggerKeyDown = (e) => {
      if (disabled) return;
      if (e.key === "Enter" || e.key === " ") {
        handleEnterOrSpace(e);
      } else if (e.key === "ArrowDown") {
        handleArrowKey(e, 1);
      } else if (e.key === "ArrowUp") {
        handleArrowKey(e, -1);
      } else if (e.key === "Escape") {
        e.preventDefault();
        handleCloseAndRestoreFocus();
      }
    };
    const currentActiveOption = filteredOptions[activeIndex];
    const activeOptionId = isOpen && activeIndex >= 0 && currentActiveOption ? `${generatedId}-option-${activeIndex}` : void 0;
    return /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { ref, className: cn("relative w-full", className), ...props, children: [
      /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { ref: containerRef, className: "relative", children: [
        /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(
          "div",
          {
            ref: triggerRef,
            role: "combobox",
            "aria-expanded": isOpen,
            "aria-haspopup": "listbox",
            "aria-controls": listboxId,
            "aria-activedescendant": activeOptionId,
            "aria-disabled": disabled,
            "aria-label": props["aria-label"] || placeholder,
            tabIndex: disabled ? -1 : 0,
            onClick: () => {
              if (!disabled) {
                setIsOpen((prev) => !prev);
              }
            },
            onKeyDown: handleTriggerKeyDown,
            className: cn(
              "flex min-h-9 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs transition-colors",
              "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer",
              disabled && "cursor-not-allowed opacity-50 bg-muted",
              error && "border-destructive focus-visible:ring-destructive"
            ),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("div", { className: "flex flex-wrap items-center gap-1.5 min-w-0 pr-2", children: selectedOptions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("span", { className: "text-muted-foreground", children: placeholder }) : /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(import_jsx_runtime22.Fragment, { children: [
                visibleTags.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(
                  Badge,
                  {
                    variant: "secondary",
                    className: "gap-1 py-0.5 px-2 text-xs font-normal",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("span", { children: opt.label }),
                      /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
                        "button",
                        {
                          type: "button",
                          onClick: (e) => handleRemoveTag(opt.value, e),
                          disabled,
                          "aria-label": `Remove ${opt.label}`,
                          className: "rounded-full hover:bg-muted-foreground/20 p-0.5",
                          children: /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_lucide_react10.X, { className: "h-3 w-3" })
                        }
                      )
                    ]
                  },
                  opt.value
                )),
                hiddenCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(Badge, { variant: "outline", className: "text-xs font-normal", children: [
                  "+",
                  hiddenCount,
                  " more"
                ] })
              ] }) }),
              /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { className: "flex items-center gap-1 shrink-0 text-muted-foreground", children: [
                selectedOptions.length > 0 && !disabled && /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
                  "button",
                  {
                    type: "button",
                    onClick: handleClearAll,
                    "aria-label": "Clear all selections",
                    className: "rounded p-0.5 hover:bg-muted hover:text-foreground",
                    children: /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_lucide_react10.X, { className: "h-3.5 w-3.5" })
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_lucide_react10.ChevronsUpDown, { className: "h-4 w-4 opacity-50" })
              ] })
            ]
          }
        ),
        isOpen && /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { className: "absolute z-50 mt-1 w-full rounded-md border border-border bg-popover text-popover-foreground shadow-md outline-none animate-in fade-in-0 zoom-in-95", children: [
          /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { className: "flex items-center border-b border-border px-3 py-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_lucide_react10.Search, { className: "mr-2 h-4 w-4 shrink-0 opacity-50" }),
            /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
              "input",
              {
                ref: searchInputRef,
                id: searchInputId,
                type: "text",
                "aria-label": searchPlaceholder || "Search options",
                value: searchQuery,
                onChange: (e) => setSearchQuery(e.target.value),
                onKeyDown: (e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    moveActiveIndex(1);
                  } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    moveActiveIndex(-1);
                  } else if (e.key === "Enter") {
                    const opt = filteredOptions[activeIndex];
                    if (activeIndex >= 0 && opt && !opt.disabled) {
                      e.preventDefault();
                      handleToggle(opt.value);
                    }
                  } else if (e.key === "Escape") {
                    e.preventDefault();
                    handleCloseAndRestoreFocus();
                  }
                },
                placeholder: searchPlaceholder,
                className: "flex h-6 w-full rounded-md bg-transparent text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { className: "flex items-center justify-between border-b border-border/50 px-3 py-1.5 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("span", { children: [
              selectedOptions.length,
              " of ",
              options.length,
              " selected"
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
                "button",
                {
                  type: "button",
                  onClick: handleSelectAll,
                  className: "hover:text-foreground hover:underline",
                  children: "Select All"
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
                "button",
                {
                  type: "button",
                  onClick: handleClearAll,
                  className: "hover:text-foreground hover:underline",
                  children: "Clear"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
            "ul",
            {
              id: listboxId,
              role: "listbox",
              "aria-label": placeholder || "Options",
              "aria-multiselectable": "true",
              className: "max-h-60 overflow-y-auto p-1 text-sm",
              children: filteredOptions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("li", { role: "presentation", className: "py-6 text-center text-xs text-muted-foreground", children: "No options found." }) : filteredOptions.map((option, idx) => {
                const isSelected = value.includes(option.value);
                const isCurrentActive = activeIndex === idx;
                return /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(
                  "li",
                  {
                    id: `${generatedId}-option-${idx}`,
                    role: "option",
                    tabIndex: -1,
                    "aria-selected": isSelected,
                    "aria-disabled": option.disabled,
                    onMouseEnter: () => setActiveIndex(idx),
                    onClick: () => !option.disabled && handleToggle(option.value),
                    onKeyDown: (e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        if (!option.disabled) handleToggle(option.value);
                      }
                    },
                    className: cn(
                      "relative flex items-center justify-between rounded-sm px-2 py-1.5 text-sm cursor-pointer select-none transition-colors",
                      "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:outline-none",
                      (isSelected || isCurrentActive) && "bg-accent/50 font-medium",
                      option.disabled && "pointer-events-none opacity-50"
                    ),
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("span", { children: option.label }),
                      isSelected && /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_lucide_react10.Check, { className: "h-4 w-4 text-primary" })
                    ]
                  },
                  option.value
                );
              })
            }
          )
        ] })
      ] }),
      typeof error === "string" && /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("p", { className: "mt-1 text-xs text-destructive", children: error })
    ] });
  }
);
MultiSelect.displayName = "MultiSelect";

// src/components/ui/forms/radio-group.tsx
var React22 = __toESM(require("react"), 1);
var RadioGroupPrimitive = __toESM(require("@radix-ui/react-radio-group"), 1);
var import_lucide_react11 = require("lucide-react");
var import_jsx_runtime23 = require("react/jsx-runtime");
var RadioGroup = React22.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
    RadioGroupPrimitive.Root,
    {
      className: cn("grid gap-2", className),
      ...props,
      ref
    }
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;
var RadioGroupItem = React22.forwardRef(({ className, style, ...props }, ref) => {
  return /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
    RadioGroupPrimitive.Item,
    {
      ref,
      className: cn(
        "aspect-square h-4 w-4 shrink-0 rounded-full border border-primary text-primary ring-offset-background",
        "transition-colors duration-150",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "flex items-center justify-center",
        className
      ),
      style: { minHeight: "1rem", minWidth: "1rem", ...style },
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
        RadioGroupPrimitive.Indicator,
        {
          forceMount: true,
          className: cn(
            "flex items-center justify-center",
            "transition-all duration-150",
            "scale-0 opacity-0",
            "data-[state=checked]:scale-100 data-[state=checked]:opacity-100"
          ),
          children: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(import_lucide_react11.Circle, { className: "h-2.5 w-2.5 fill-primary" })
        }
      )
    }
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

// src/components/ui/forms/search-field.tsx
var React23 = __toESM(require("react"), 1);
var import_lucide_react12 = require("lucide-react");
var import_jsx_runtime24 = require("react/jsx-runtime");
var SearchField = React23.forwardRef(
  ({ className, value, onChange, onClear, showClear = true, ...props }, ref) => {
    const hasValue = Boolean(value && String(value).length > 0);
    return /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("div", { className: "relative w-full", children: [
      /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_lucide_react12.Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" }),
      /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
        Input,
        {
          ref,
          value,
          onChange,
          className: cn("pl-9", hasValue && showClear && "pr-9", className),
          ...props
        }
      ),
      hasValue && showClear && /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
        "button",
        {
          type: "button",
          onClick: (e) => {
            e.preventDefault();
            onClear?.();
          },
          className: "absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-slate-300",
          "aria-label": "Clear search",
          children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_lucide_react12.X, { className: "h-3.5 w-3.5" })
        }
      )
    ] });
  }
);
SearchField.displayName = "SearchField";

// src/components/ui/forms/skill-tag-cloud.tsx
var React24 = __toESM(require("react"), 1);
var import_lucide_react13 = require("lucide-react");
var import_jsx_runtime25 = require("react/jsx-runtime");
function SkillTagCloud({
  tags = [],
  onAddTag,
  onRemoveTag,
  readOnly = false,
  maxTags,
  placeholder = "Add skill (e.g. Go, React, Python)...",
  categoryLabel,
  className,
  ...props
}) {
  const [inputValue, setInputValue] = React24.useState("");
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      onAddTag?.(inputValue.trim());
      setInputValue("");
    }
  };
  const handleAdd = () => {
    if (inputValue.trim()) {
      onAddTag?.(inputValue.trim());
      setInputValue("");
    }
  };
  const getLevelVariant = (level) => {
    switch (level) {
      case "Expert":
        return "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800";
      case "Advanced":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800";
      case "Intermediate":
        return "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-800";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700";
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("div", { className: cn("space-y-2.5", className), ...props, children: [
    categoryLabel ? /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("span", { className: "text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: categoryLabel }) : null,
    /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("div", { className: "flex flex-wrap items-center gap-1.5", children: [
      tags.map((tag, idx) => /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(
        "span",
        {
          className: cn(
            "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
            getLevelVariant(tag.level)
          ),
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("span", { children: tag.name }),
            tag.level ? /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("span", { className: "text-[10px] opacity-75 font-semibold", children: [
              "\u2022 ",
              tag.level
            ] }) : null,
            !readOnly && onRemoveTag ? /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
              "button",
              {
                type: "button",
                onClick: () => onRemoveTag(tag),
                className: "hover:opacity-75 focus:outline-none",
                "aria-label": `Remove ${tag.name}`,
                children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_lucide_react13.X, { className: "h-3 w-3" })
              }
            ) : null
          ]
        },
        tag.id || `${tag.name}-${idx}`
      )),
      tags.length === 0 && readOnly && /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("span", { className: "text-xs text-slate-400 italic", children: "No skills listed" })
    ] }),
    !readOnly && (!maxTags || tags.length < maxTags) && /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("div", { className: "flex items-center gap-2 max-w-sm pt-1", children: [
      /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
        Input,
        {
          value: inputValue,
          onChange: (e) => setInputValue(e.target.value),
          onKeyDown: handleKeyDown,
          placeholder,
          className: "h-8 text-xs"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(
        Button,
        {
          type: "button",
          size: "sm",
          variant: "outline",
          onClick: handleAdd,
          disabled: !inputValue.trim(),
          className: "h-8 shrink-0 px-2.5",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_lucide_react13.Plus, { className: "h-3.5 w-3.5 mr-1" }),
            "Add"
          ]
        }
      )
    ] })
  ] });
}

// src/components/ui/forms/slider.tsx
var React25 = __toESM(require("react"), 1);
var SliderPrimitive = __toESM(require("@radix-ui/react-slider"), 1);
var import_jsx_runtime26 = require("react/jsx-runtime");
var Slider = React25.forwardRef(
  ({
    className,
    value,
    defaultValue,
    thumbLabels,
    getThumbAriaLabel,
    ...props
  }, ref) => {
    const thumbCount = (value ?? defaultValue ?? [0]).length;
    const thumbClass = cn(
      "block h-4 w-4 rounded-full border border-primary/50 bg-background shadow",
      "transition-all duration-150",
      "hover:border-primary hover:shadow-[0_0_0_3px_hsl(var(--primary)/0.15)]",
      "active:scale-95",
      "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
      "disabled:pointer-events-none disabled:opacity-50",
      "cursor-grab active:cursor-grabbing"
    );
    return /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)(
      SliderPrimitive.Root,
      {
        ref,
        ...value !== void 0 ? { value } : {},
        ...defaultValue !== void 0 ? { defaultValue } : {},
        className: cn(
          "relative flex w-full touch-none select-none items-center",
          "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-5 data-[orientation=vertical]:flex-col",
          className
        ),
        ...props,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
            SliderPrimitive.Track,
            {
              className: cn(
                "relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20",
                "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
              ),
              children: /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
                SliderPrimitive.Range,
                {
                  className: cn(
                    "absolute h-full bg-primary transition-all duration-150",
                    "data-[orientation=vertical]:w-full"
                  )
                }
              )
            }
          ),
          Array.from({ length: thumbCount }).map((_, i) => {
            const ariaLabel = getThumbAriaLabel?.(i) ?? // eslint-disable-next-line security/detect-object-injection
            thumbLabels?.[i] ?? (thumbCount === 1 ? "Slider value" : `Slider value ${i + 1}`);
            return /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
              SliderPrimitive.Thumb,
              {
                className: thumbClass,
                "aria-label": ariaLabel
              },
              i
            );
          })
        ]
      }
    );
  }
);
Slider.displayName = SliderPrimitive.Root.displayName;

// src/components/ui/forms/switch.tsx
var React26 = __toESM(require("react"), 1);
var SwitchPrimitives = __toESM(require("@radix-ui/react-switch"), 1);
var import_jsx_runtime27 = require("react/jsx-runtime");
var Switch = React26.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
  SwitchPrimitives.Root,
  {
    className: cn(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    ),
    ...props,
    ref,
    children: /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
      SwitchPrimitives.Thumb,
      {
        className: cn(
          "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
        )
      }
    )
  }
));
Switch.displayName = SwitchPrimitives.Root.displayName;

// src/components/ui/forms/toggle.tsx
var React27 = __toESM(require("react"), 1);
var TogglePrimitive = __toESM(require("@radix-ui/react-toggle"), 1);
var import_class_variance_authority7 = require("class-variance-authority");
var import_jsx_runtime28 = require("react/jsx-runtime");
var toggleVariants = (0, import_class_variance_authority7.cva)(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground"
      },
      size: {
        default: "h-9 px-2 min-w-9",
        sm: "h-8 px-1.5 min-w-8",
        lg: "h-10 px-2.5 min-w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
var Toggle = React27.forwardRef(({ className, variant, size, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
  TogglePrimitive.Root,
  {
    ref,
    className: cn(toggleVariants({ variant, size, className })),
    ...props
  }
));
Toggle.displayName = TogglePrimitive.Root.displayName;

// src/components/ui/forms/toggle-group.tsx
var React28 = __toESM(require("react"), 1);
var ToggleGroupPrimitive = __toESM(require("@radix-ui/react-toggle-group"), 1);
var import_jsx_runtime29 = require("react/jsx-runtime");
var ToggleGroupContext = React28.createContext({
  size: "default",
  variant: "default"
});
var ToggleGroup = React28.forwardRef(({ className, variant, size, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
  ToggleGroupPrimitive.Root,
  {
    ref,
    className: cn("flex items-center justify-center gap-1", className),
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(ToggleGroupContext.Provider, { value: { variant, size }, children })
  }
));
ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;
var ToggleGroupItem = React28.forwardRef(({ className, children, variant, size, ...props }, ref) => {
  const context = React28.useContext(ToggleGroupContext);
  return /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
    ToggleGroupPrimitive.Item,
    {
      ref,
      className: cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size
        }),
        className
      ),
      ...props,
      children
    }
  );
});
ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

// src/components/ui/layout/aspect-ratio.tsx
var AspectRatioPrimitive = __toESM(require("@radix-ui/react-aspect-ratio"), 1);
var AspectRatio = AspectRatioPrimitive.Root;

// src/components/ui/layout/card.tsx
var React29 = __toESM(require("react"), 1);
var import_jsx_runtime30 = require("react/jsx-runtime");
var Card = React29.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
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
var CardHeader = React29.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
  "div",
  {
    ref,
    className: cn("flex flex-col space-y-1 p-5 border-b border-border/60", className),
    ...props
  }
));
CardHeader.displayName = "CardHeader";
var CardTitle = React29.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
  "div",
  {
    ref,
    className: cn("font-semibold leading-none tracking-tight", className),
    ...props
  }
));
CardTitle.displayName = "CardTitle";
var CardDescription = React29.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
  "div",
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
CardDescription.displayName = "CardDescription";
var CardContent = React29.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("div", { ref, className: cn("p-5", className), ...props }));
CardContent.displayName = "CardContent";
var CardSeparator = React29.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
  "div",
  {
    ref,
    className: cn("-mx-0 h-px bg-border/60", className),
    role: "separator",
    ...props
  }
));
CardSeparator.displayName = "CardSeparator";
var CardFooter = React29.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
  "div",
  {
    ref,
    className: cn("flex items-center p-5 border-t border-border/60", className),
    ...props
  }
));
CardFooter.displayName = "CardFooter";
var StandardCard = React29.forwardRef(
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
  }, ref) => /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)(Card, { ref, className, ...props, children: [
    /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)(CardHeader, { className: "gap-3 sm:flex-row sm:items-start sm:justify-between sm:space-y-0", children: [
      /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)("div", { className: "min-w-0 flex-1 space-y-1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)("div", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(CardTitle, { className: "text-base", children: title }),
          badge
        ] }),
        description && /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(CardDescription, { children: description })
      ] }),
      headerActions && /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("div", { className: "flex shrink-0 flex-wrap items-center gap-2", children: headerActions })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(CardContent, { className: contentClassName, children }),
    (footer || actions) && /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)(
      CardFooter,
      {
        className: cn(
          "justify-between gap-3 flex-col sm:flex-row sm:items-center",
          footerClassName
        ),
        children: [
          footer ? /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("div", { className: "min-w-0 flex-1 text-sm text-muted-foreground", children: footer }) : /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("div", {}),
          actions && /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("div", { className: "flex shrink-0 flex-wrap items-center gap-2", children: actions })
        ]
      }
    )
  ] })
);
StandardCard.displayName = "StandardCard";

// src/components/ui/layout/detail-grid.tsx
var import_jsx_runtime31 = require("react/jsx-runtime");
function getGridColClass(columns) {
  switch (columns) {
    case 1:
      return "grid-cols-1";
    case 2:
      return "grid-cols-1 md:grid-cols-2";
    case 4:
      return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
    default:
      return "grid-cols-1 md:grid-cols-2 xl:grid-cols-3";
  }
}
function DetailGrid({ columns = 3, className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
    "div",
    {
      className: cn("grid gap-4", getGridColClass(columns), className),
      ...props
    }
  );
}

// src/components/ui/layout/page-header.tsx
var import_jsx_runtime32 = require("react/jsx-runtime");
function PageHeader({
  title,
  description,
  breadcrumbs,
  actions,
  badge,
  className
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)("div", { className: cn("flex flex-col gap-1 pb-4", className), children: [
    breadcrumbs && /* @__PURE__ */ (0, import_jsx_runtime32.jsx)("div", { className: "mb-1 text-sm text-muted-foreground", children: breadcrumbs }),
    /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)("div", { className: "flex items-start justify-between gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)("div", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime32.jsx)("h1", { className: "truncate text-xl font-semibold tracking-tight text-foreground sm:text-2xl", children: title }),
          badge
        ] }),
        description && /* @__PURE__ */ (0, import_jsx_runtime32.jsx)("p", { className: "mt-1 text-sm text-muted-foreground line-clamp-2", children: description })
      ] }),
      actions && /* @__PURE__ */ (0, import_jsx_runtime32.jsx)("div", { className: "flex shrink-0 flex-wrap items-center gap-2", children: actions })
    ] })
  ] });
}
function PageHeaderSkeleton() {
  return /* @__PURE__ */ (0, import_jsx_runtime32.jsx)("div", { className: "flex flex-col gap-1 pb-4", children: /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)("div", { className: "flex items-start justify-between gap-4", children: [
    /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)("div", { className: "flex-1 space-y-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime32.jsx)("div", { className: "h-7 w-48 rounded-md bg-muted animate-pulse" }),
      /* @__PURE__ */ (0, import_jsx_runtime32.jsx)("div", { className: "h-4 w-72 rounded bg-muted animate-pulse" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime32.jsx)("div", { className: "h-9 w-24 rounded-md bg-muted animate-pulse" })
  ] }) });
}

// src/components/ui/layout/resizable.tsx
var import_lucide_react14 = require("lucide-react");
var import_react_resizable_panels = require("react-resizable-panels");
var import_jsx_runtime33 = require("react/jsx-runtime");
var ResizablePanelGroup = ({
  className,
  direction,
  orientation = direction,
  ...props
}) => /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
  import_react_resizable_panels.Group,
  {
    className: cn(
      "flex h-full w-full data-[panel-group-direction=vertical]:flex-col data-[orientation=vertical]:flex-col",
      className
    ),
    orientation,
    ...props
  }
);
var ResizablePanel = import_react_resizable_panels.Panel;
var ResizableHandle = ({
  withHandle,
  className,
  ...props
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
    import_react_resizable_panels.Separator,
    {
      className: cn(
        "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90",
        className
      ),
      ...props,
      children: withHandle && /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("div", { className: "z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border", children: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(import_lucide_react14.GripVertical, { className: "h-2.5 w-2.5" }) })
    }
  );
};

// src/components/ui/layout/scroll-area.tsx
var React30 = __toESM(require("react"), 1);
var ScrollAreaPrimitive = __toESM(require("@radix-ui/react-scroll-area"), 1);
var import_jsx_runtime34 = require("react/jsx-runtime");
var ScrollArea = React30.forwardRef(({ className, children, orientation = "vertical", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)(
  ScrollAreaPrimitive.Root,
  {
    ref,
    className: cn("relative overflow-hidden", className),
    ...props,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(ScrollAreaPrimitive.Viewport, { className: "h-full w-full rounded-[inherit]", children }),
      (orientation === "vertical" || orientation === "both") && /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(ScrollBar, { orientation: "vertical" }),
      (orientation === "horizontal" || orientation === "both") && /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(ScrollBar, { orientation: "horizontal" }),
      /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(ScrollAreaPrimitive.Corner, {})
    ]
  }
));
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;
var ScrollBar = React30.forwardRef(({ className, orientation = "vertical", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
  ScrollAreaPrimitive.ScrollAreaScrollbar,
  {
    ref,
    orientation,
    className: cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    ),
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(ScrollAreaPrimitive.ScrollAreaThumb, { className: "relative flex-1 rounded-full bg-border" })
  }
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

// src/components/ui/data-display/ActiveFilterBadge.tsx
var import_lucide_react15 = require("lucide-react");
var import_jsx_runtime35 = require("react/jsx-runtime");
function ActiveFilterBadge({
  label,
  onClear,
  className
}) {
  if (!label) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime35.jsxs)(
    "div",
    {
      className: cn(
        "flex items-center gap-2 mb-4 p-2 bg-blue-50/80 border border-blue-200 rounded-md text-sm text-blue-900 animate-in fade-in slide-in-from-top-2 dark:bg-blue-950/40 dark:border-blue-800 dark:text-blue-200",
        className
      ),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime35.jsxs)("span", { className: "font-medium flex-1", children: [
          "Showing: ",
          label
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
          Button,
          {
            type: "button",
            variant: "ghost",
            size: "sm",
            className: "h-6 w-6 p-0 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-blue-600 dark:text-blue-300 rounded-full shrink-0",
            onClick: onClear,
            "aria-label": "Clear filter",
            children: /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(import_lucide_react15.X, { className: "h-3.5 w-3.5" })
          }
        )
      ]
    }
  );
}

// src/components/ui/data-display/accordion.tsx
var React31 = __toESM(require("react"), 1);
var AccordionPrimitive = __toESM(require("@radix-ui/react-accordion"), 1);
var import_lucide_react16 = require("lucide-react");
var import_jsx_runtime36 = require("react/jsx-runtime");
var RADIX_STYLE_ID = "radix-ui-animations";
if (typeof document !== "undefined" && !document.getElementById(RADIX_STYLE_ID)) {
  const style = document.createElement("style");
  style.id = RADIX_STYLE_ID;
  style.textContent = `
    @keyframes accordion-down { from { height: 0 } to { height: var(--radix-accordion-content-height) } }
    @keyframes accordion-up   { from { height: var(--radix-accordion-content-height) } to { height: 0 } }
    [data-radix-accordion-content][data-state=open]   { animation: accordion-down 0.2s ease-out }
    [data-radix-accordion-content][data-state=closed]  { animation: accordion-up 0.2s ease-out }
  `;
  document.head.appendChild(style);
}
var Accordion = AccordionPrimitive.Root;
var AccordionItem = React31.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(
  AccordionPrimitive.Item,
  {
    ref,
    className: cn("border-b border-border/70 last:border-b-0", className),
    ...props
  }
));
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = React31.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(AccordionPrimitive.Header, { className: "flex", children: /* @__PURE__ */ (0, import_jsx_runtime36.jsxs)(
  AccordionPrimitive.Trigger,
  {
    ref,
    className: cn(
      // Layout
      "flex flex-1 items-center justify-between py-4 text-sm font-medium text-left",
      // Hover: background highlight instead of underline (more convention-friendly)
      "rounded-sm transition-colors duration-150",
      "hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
      // Chevron rotates 180° when open
      "[&[data-state=open]>svg]:rotate-180",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(import_lucide_react16.ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" })
    ]
  }
) }));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;
var AccordionContent = React31.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(
  AccordionPrimitive.Content,
  {
    ref,
    className: "overflow-hidden text-sm text-muted-foreground",
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime36.jsx)("div", { className: cn("pb-4 pt-0 leading-relaxed", className), children })
  }
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

// src/components/ui/data-display/amount-summary-card.tsx
var import_lucide_react17 = require("lucide-react");
var import_jsx_runtime37 = require("react/jsx-runtime");
function calculateItemTax(item, isTaxInclusive) {
  const qty = Number(item.totalQuantity) || 0;
  const price = Number(item.targetPrice) || 0;
  let rate = 0;
  if (item.taxRate !== void 0) {
    rate = Number(item.taxRate);
  } else if (item.tax_rate !== void 0) {
    rate = Number(item.tax_rate);
  }
  if (isTaxInclusive) {
    const totalPrice = qty * price;
    const taxPerUnit2 = rate > 0 ? price * (rate / (100 + rate)) : 0;
    const totalTax = qty * taxPerUnit2;
    return { base: totalPrice - totalTax, totalTax };
  }
  const base = qty * price;
  const taxPerUnit = price * (rate / 100);
  return { base, totalTax: qty * taxPerUnit };
}
function calculateItemsTotals(items, isTaxInclusive) {
  let calcBase = 0;
  let calcTax = 0;
  for (const item of items) {
    const { base, totalTax } = calculateItemTax(item, isTaxInclusive);
    calcBase += base;
    calcTax += totalTax;
  }
  return { calcBase, calcTax };
}
function computeAmounts({
  baseAmount,
  taxAmount,
  taxes,
  shippingCost,
  transportCost,
  withholdingPercentage,
  tdsPercentage,
  deductions,
  netPayable,
  isTaxInclusive,
  items
}) {
  let finalBaseAmount = baseAmount ?? 0;
  let finalTaxAmount = taxAmount ?? 0;
  if (items && items.length > 0) {
    const computed = calculateItemsTotals(items, isTaxInclusive ?? false);
    if (baseAmount === void 0) finalBaseAmount = computed.calcBase;
    if (taxAmount === void 0 && (!taxes || taxes.length === 0)) finalTaxAmount = computed.calcTax;
  }
  const effectiveShipping = shippingCost ?? transportCost ?? 0;
  const effectiveWithholdingPct = withholdingPercentage ?? tdsPercentage ?? 0;
  const withholdingAmount = finalBaseAmount * (effectiveWithholdingPct / 100);
  let totalTaxFromList = 0;
  if (taxes && taxes.length > 0) {
    totalTaxFromList = taxes.reduce((acc, t) => acc + t.amount, 0);
  } else {
    totalTaxFromList = finalTaxAmount;
  }
  let totalDeductions = withholdingAmount;
  if (deductions && deductions.length > 0) {
    totalDeductions += deductions.reduce((acc, d) => acc + d.amount, 0);
  }
  const totalValue = netPayable !== void 0 ? netPayable : finalBaseAmount + totalTaxFromList + effectiveShipping - totalDeductions;
  return {
    finalBaseAmount,
    finalTaxAmount,
    effectiveShipping,
    effectiveWithholdingPct,
    withholdingAmount,
    totalValue
  };
}
function TaxBreakdownSection({ taxes, finalTaxAmount, taxLabel, fmt }) {
  if (taxes && taxes.length > 0) {
    return /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(import_jsx_runtime37.Fragment, { children: taxes.map((tax, idx) => /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)(
      "div",
      {
        className: "flex justify-between items-center py-1 border-b border-dashed border-border",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("span", { className: "text-[11px] font-medium text-muted-foreground", children: tax.label }),
          /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)("span", { className: "font-semibold text-primary", children: [
            "+",
            fmt(tax.amount)
          ] })
        ]
      },
      idx
    )) });
  }
  if (finalTaxAmount > 0) {
    return /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)("div", { className: "flex justify-between items-center py-1 border-b border-dashed border-border", children: [
      /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("span", { className: "text-[11px] font-medium text-muted-foreground", children: taxLabel }),
      /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)("span", { className: "font-semibold text-primary", children: [
        "+",
        fmt(finalTaxAmount)
      ] })
    ] });
  }
  return null;
}
function TotalPayableSection({ isUrgent, urgentLabel, isSm, totalValue, fmt }) {
  return /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)(import_jsx_runtime37.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)(
      "div",
      {
        className: cn(
          "mt-2 p-3.5 rounded-xl border flex justify-between items-center shadow-xs transition-all",
          isUrgent ? "bg-destructive text-destructive-foreground border-destructive" : "bg-card border-border text-card-foreground"
        ),
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)("div", { className: "space-y-0.5", children: [
            /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("span", { className: "text-[9px] uppercase tracking-wider text-muted-foreground font-bold block", children: "Total Payable" }),
            /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("span", { className: "text-[9px] text-muted-foreground block leading-tight", children: "Inclusive of taxes & deductions" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("div", { className: "text-right", children: /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(
            "span",
            {
              className: cn(
                "font-extrabold tracking-tight block text-emerald-400",
                isSm ? "text-sm" : "text-base"
              ),
              children: fmt(totalValue)
            }
          ) })
        ]
      }
    ),
    isUrgent && /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)(Badge, { className: "bg-rose-500/10 text-rose-600 hover:bg-rose-500/15 border border-rose-500/20 w-full justify-center py-1 rounded-lg text-[10px] font-semibold flex items-center gap-1 mt-1", children: [
      /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(import_lucide_react17.Sparkles, { className: "h-3 w-3 animate-pulse text-rose-500" }),
      /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("span", { children: urgentLabel ?? "Urgent Priority Settlement" })
    ] })
  ] });
}
function AmountSummaryCard({
  baseAmount,
  taxAmount,
  taxLabel = "Tax",
  taxes,
  shippingCost,
  transportCost,
  withholdingPercentage,
  tdsPercentage,
  deductions,
  isUrgent = false,
  urgentLabel,
  netPayable,
  isTaxInclusive = false,
  items,
  size = "default",
  maskFormatter,
  className,
  ...props
}) {
  const {
    finalBaseAmount,
    finalTaxAmount,
    effectiveShipping,
    effectiveWithholdingPct,
    withholdingAmount,
    totalValue
  } = computeAmounts({
    baseAmount,
    taxAmount,
    taxes,
    shippingCost,
    transportCost,
    withholdingPercentage,
    tdsPercentage,
    deductions,
    netPayable,
    isTaxInclusive,
    items
  });
  const isSm = size === "sm";
  const fmt = (num) => {
    if (maskFormatter) return maskFormatter(formatCurrency(num));
    return formatCurrency(num);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)(
    Card,
    {
      className: cn(
        "rounded-xl border border-border bg-card shadow-xs",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(
          CardHeader,
          {
            className: cn(
              "border-b border-border",
              isSm ? "px-3 py-2" : "px-4.5 py-3"
            ),
            children: /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)(CardTitle, { className: "text-xs font-semibold text-foreground flex items-center gap-1.5", children: [
              /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(import_lucide_react17.Coins, { className: "h-3.5 w-3.5 text-primary" }),
              /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("span", { children: "Amount Summary" })
            ] })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)(CardContent, { className: isSm ? "p-3 space-y-2" : "p-4.5 space-y-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)("div", { className: "space-y-0.5 text-xs", children: [
            /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)("div", { className: "flex justify-between items-center py-1 border-b border-dashed border-border", children: [
              /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("span", { className: "text-[11px] font-medium text-muted-foreground", children: "Base Cost" }),
              /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("span", { className: "font-semibold text-foreground", children: fmt(finalBaseAmount) })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(
              TaxBreakdownSection,
              {
                taxes,
                finalTaxAmount,
                taxLabel,
                fmt
              }
            ),
            effectiveShipping > 0 && /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)("div", { className: "flex justify-between items-center py-1 border-b border-dashed border-border", children: [
              /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("span", { className: "text-[11px] font-medium text-muted-foreground", children: "Logistics & Shipping" }),
              /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)("span", { className: "font-semibold text-foreground", children: [
                "+",
                fmt(effectiveShipping)
              ] })
            ] }),
            effectiveWithholdingPct > 0 && /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)("div", { className: "flex justify-between items-center py-1 border-b border-dashed border-border", children: [
              /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)("span", { className: "text-[11px] font-medium text-muted-foreground", children: [
                "Withholding (",
                effectiveWithholdingPct,
                "%)"
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)("span", { className: "font-semibold text-rose-600 dark:text-rose-400", children: [
                "-",
                fmt(withholdingAmount)
              ] })
            ] }),
            deductions && deductions.map((d, idx) => /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)(
              "div",
              {
                className: "flex justify-between items-center py-1 border-b border-dashed border-border",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("span", { className: "text-[11px] font-medium text-muted-foreground", children: d.label }),
                  /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)("span", { className: "font-semibold text-rose-600 dark:text-rose-400", children: [
                    "-",
                    fmt(d.amount)
                  ] })
                ]
              },
              idx
            ))
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(
            TotalPayableSection,
            {
              isUrgent,
              urgentLabel,
              isSm,
              totalValue,
              fmt
            }
          )
        ] })
      ]
    }
  );
}

// src/components/ui/data-display/avatar.tsx
var React32 = __toESM(require("react"), 1);
var AvatarPrimitive = __toESM(require("@radix-ui/react-avatar"), 1);
var import_class_variance_authority8 = require("class-variance-authority");
var import_jsx_runtime38 = require("react/jsx-runtime");
var avatarVariants = (0, import_class_variance_authority8.cva)(
  "relative flex shrink-0 overflow-hidden rounded-full",
  {
    variants: {
      size: {
        xs: "h-6 w-6 text-[10px]",
        sm: "h-8 w-8 text-xs",
        default: "h-10 w-10 text-sm",
        lg: "h-14 w-14 text-base",
        xl: "h-20 w-20 text-lg"
      }
    },
    defaultVariants: { size: "default" }
  }
);
var Avatar = React32.forwardRef(({ className, size, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
  AvatarPrimitive.Root,
  {
    ref,
    className: cn(avatarVariants({ size }), className),
    ...props
  }
));
Avatar.displayName = AvatarPrimitive.Root.displayName;
var AvatarImage = React32.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
  AvatarPrimitive.Image,
  {
    ref,
    className: cn("aspect-square h-full w-full object-cover", className),
    ...props
  }
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;
var AvatarFallback = React32.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
  AvatarPrimitive.Fallback,
  {
    ref,
    className: cn(
      "flex h-full w-full items-center justify-center rounded-full",
      "bg-muted font-medium text-muted-foreground select-none",
      // Inherit font-size from parent Avatar size token
      "text-[1em]",
      className
    ),
    ...props
  }
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;
function AvatarGroup({
  className,
  max,
  children,
  ...props
}) {
  const childArray = React32.Children.toArray(children);
  const visible = max ? childArray.slice(0, max) : childArray;
  const overflow = max ? childArray.length - max : 0;
  return /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)(
    "div",
    {
      className: cn("flex items-center -space-x-2.5 rtl:space-x-reverse", className),
      ...props,
      children: [
        visible.map(
          (child, i) => React32.isValidElement(child) ? React32.cloneElement(child, {
            key: i,
            className: cn(
              child.props.className,
              // Ring creates a gap between overlapping avatars
              "ring-2 ring-background"
            )
          }) : child
        ),
        overflow > 0 && /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)(
          "div",
          {
            className: cn(
              avatarVariants({ size: "default" }),
              "ring-2 ring-background bg-muted text-muted-foreground",
              "flex items-center justify-center text-xs font-medium"
            ),
            children: [
              "+",
              overflow
            ]
          }
        )
      ]
    }
  );
}

// src/components/ui/data-display/bilingual-tooltip.tsx
var import_jsx_runtime39 = require("react/jsx-runtime");
function getSafeLookup(map, key) {
  if (!map) return void 0;
  if (key in map) return map[key];
  const entries = Object.entries(map);
  const found = entries.find(([k]) => k.toLowerCase() === key.toLowerCase());
  return found ? found[1] : void 0;
}
function BilingualTooltip({
  active,
  payload,
  label,
  language = "en",
  locale = "en-US",
  labelMap,
  translations,
  dictionary,
  formatCurrency: formatCurrency2 = false,
  currencySymbol = "$",
  formatPercent: formatPercent2 = false,
  formatter
}) {
  if (!active || !payload || payload.length === 0) return null;
  const translate = (key) => {
    const custom = getSafeLookup(labelMap, key) ?? getSafeLookup(translations, key);
    if (custom) return custom;
    if (dictionary && language && dictionary[language]) {
      const dictTranslation = getSafeLookup(dictionary[language], key);
      if (dictTranslation) return dictTranslation;
    }
    return key;
  };
  const translateLabel = (lbl) => {
    if (!lbl) return "";
    return translate(lbl);
  };
  const formatVal = (val, name) => {
    if (formatter) return formatter(val, name);
    if (formatCurrency2 && typeof val === "number") {
      return `${currencySymbol}${val.toLocaleString(locale, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      })}`;
    }
    if (formatPercent2 && typeof val === "number") {
      return `${val.toFixed(1)}%`;
    }
    if (typeof val === "number") {
      return formatNumber(val, void 0, locale);
    }
    return String(val);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)("div", { className: "rounded-lg border border-border bg-card p-2.5 shadow-md min-w-[140px] text-xs", children: [
    label !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime39.jsx)("p", { className: "font-semibold text-muted-foreground mb-1.5 border-b border-border pb-1 text-xs", children: translateLabel(label) }),
    payload.map((entry, i) => /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)("div", { className: "flex items-center gap-1.5 mt-1", children: [
      /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(
        "span",
        {
          className: cn("w-2.5 h-2.5 rounded-full shrink-0", !entry.color && !entry.fill && "bg-muted-foreground"),
          style: { backgroundColor: entry.color || entry.fill }
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime39.jsx)("span", { className: "text-muted-foreground flex-1 text-xs", children: translate(entry.name) }),
      /* @__PURE__ */ (0, import_jsx_runtime39.jsx)("span", { className: "font-bold text-foreground text-xs", children: formatVal(entry.value, entry.name) })
    ] }, i))
  ] });
}

// src/components/ui/data-display/carousel.tsx
var React33 = __toESM(require("react"), 1);
var import_embla_carousel_react = __toESM(require("embla-carousel-react"), 1);
var import_lucide_react18 = require("lucide-react");
var import_jsx_runtime40 = require("react/jsx-runtime");
var CarouselContext = React33.createContext(null);
function useCarousel() {
  const context = React33.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}
var Carousel = React33.forwardRef(
  ({
    orientation = "horizontal",
    opts,
    setApi,
    showDots = true,
    showArrows = true,
    dotsPosition,
    plugins,
    className,
    children,
    ...props
  }, ref) => {
    const serializedOpts = JSON.stringify(opts);
    const stableOpts = React33.useMemo(() => opts, [serializedOpts]);
    const [carouselRef, api] = (0, import_embla_carousel_react.default)(
      {
        ...stableOpts,
        axis: orientation === "horizontal" ? "x" : "y"
      },
      plugins
    );
    const [canScrollPrev, setCanScrollPrev] = React33.useState(false);
    const [canScrollNext, setCanScrollNext] = React33.useState(false);
    const [selectedIndex, setSelectedIndex] = React33.useState(0);
    const [scrollSnaps, setScrollSnaps] = React33.useState([]);
    const resolvedDotsPosition = dotsPosition ?? (orientation === "vertical" ? "right" : "bottom");
    const scrollTo = React33.useCallback(
      (index) => api?.scrollTo(index),
      [api]
    );
    const onSelect = React33.useCallback((api2) => {
      if (!api2) return;
      setCanScrollPrev(api2.canScrollPrev());
      setCanScrollNext(api2.canScrollNext());
      setSelectedIndex(api2.selectedScrollSnap());
    }, []);
    const onInit = React33.useCallback((api2) => {
      if (!api2) return;
      setScrollSnaps(api2.scrollSnapList());
    }, []);
    const scrollPrev = React33.useCallback(() => {
      api?.scrollPrev();
    }, [api]);
    const scrollNext = React33.useCallback(() => {
      api?.scrollNext();
    }, [api]);
    const handleKeyDown = React33.useCallback(
      (event) => {
        if (orientation === "horizontal") {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            scrollPrev();
          } else if (event.key === "ArrowRight") {
            event.preventDefault();
            scrollNext();
          }
          return;
        }
        if (event.key === "ArrowUp") {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowDown") {
          event.preventDefault();
          scrollNext();
        }
      },
      [orientation, scrollPrev, scrollNext]
    );
    React33.useEffect(() => {
      if (!api || !setApi) {
        return;
      }
      setApi(api);
    }, [api, setApi]);
    React33.useEffect(() => {
      if (!api) return;
      onInit(api);
      onSelect(api);
      api.on("reInit", onInit);
      api.on("reInit", onSelect);
      api.on("select", onSelect);
      return () => {
        api.off("reInit", onInit);
        api.off("reInit", onSelect);
        api.off("select", onSelect);
      };
    }, [api, onInit, onSelect]);
    const contextValue = React33.useMemo(
      () => ({
        carouselRef,
        api,
        opts: stableOpts,
        showDots,
        showArrows,
        dotsPosition: resolvedDotsPosition,
        orientation: orientation || (stableOpts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
        selectedIndex,
        scrollSnaps,
        scrollTo
      }),
      [
        carouselRef,
        api,
        stableOpts,
        showDots,
        showArrows,
        resolvedDotsPosition,
        orientation,
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
        selectedIndex,
        scrollSnaps,
        scrollTo
      ]
    );
    return /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(CarouselContext.Provider, { value: contextValue, children: /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)(
      "div",
      {
        ref,
        onKeyDownCapture: handleKeyDown,
        className: cn("relative focus-visible:outline-hidden", className),
        role: "region",
        "aria-roledescription": "carousel",
        "aria-label": props["aria-label"] || "Carousel",
        tabIndex: props.tabIndex ?? 0,
        ...props,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("span", { className: "sr-only", "aria-live": "polite", "aria-atomic": "true", children: `Slide ${selectedIndex + 1} of ${scrollSnaps.length || 1}` }),
          children
        ]
      }
    ) });
  }
);
Carousel.displayName = "Carousel";
var CarouselContent = React33.forwardRef(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();
  return /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
    "div",
    {
      ref: carouselRef,
      className: cn("overflow-hidden", orientation === "vertical" && "h-full"),
      children: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
        "div",
        {
          ref,
          className: cn(
            "flex h-full",
            orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
            className
          ),
          ...props
        }
      )
    }
  );
});
CarouselContent.displayName = "CarouselContent";
var CarouselItem = React33.forwardRef(({ className, ...props }, ref) => {
  const { orientation } = useCarousel();
  return /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
    "div",
    {
      ref,
      role: "group",
      "aria-roledescription": "slide",
      className: cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      ),
      ...props
    }
  );
});
CarouselItem.displayName = "CarouselItem";
var CarouselPrevious = React33.forwardRef(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev, showArrows } = useCarousel();
  const Icon2 = orientation === "horizontal" ? import_lucide_react18.ArrowLeft : import_lucide_react18.ArrowUp;
  if (!showArrows) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)(
    Button,
    {
      ref,
      variant,
      size,
      className: cn(
        "absolute  h-8 w-8 rounded-full",
        orientation === "horizontal" ? "-left-12 top-1/2 -translate-y-1/2" : "-top-12 left-1/2 -translate-x-1/2",
        className
      ),
      disabled: !canScrollPrev,
      onClick: scrollPrev,
      ...props,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(Icon2, { className: "h-4 w-4" }),
        /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("span", { className: "sr-only", children: "Previous slide" })
      ]
    }
  );
});
CarouselPrevious.displayName = "CarouselPrevious";
var CarouselNext = React33.forwardRef(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext, showArrows } = useCarousel();
  const Icon2 = orientation === "horizontal" ? import_lucide_react18.ArrowRight : import_lucide_react18.ArrowDown;
  if (!showArrows) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)(
    Button,
    {
      ref,
      variant,
      size,
      className: cn(
        "absolute h-8 w-8 rounded-full",
        orientation === "horizontal" ? "-right-12 top-1/2 -translate-y-1/2" : "-bottom-12 left-1/2 -translate-x-1/2",
        className
      ),
      disabled: !canScrollNext,
      onClick: scrollNext,
      ...props,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(Icon2, { className: "h-4 w-4" }),
        /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("span", { className: "sr-only", children: "Next slide" })
      ]
    }
  );
});
CarouselNext.displayName = "CarouselNext";
var CarouselDots = React33.forwardRef(({ className, ...props }, ref) => {
  const { selectedIndex, scrollSnaps, scrollTo, showDots, orientation, dotsPosition } = useCarousel();
  if (!showDots) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
    "div",
    {
      ref,
      className: cn(
        "flex",
        orientation === "horizontal" || dotsPosition === "bottom" ? "justify-center gap-1.5 pt-4" : "absolute top-1/2 -translate-y-1/2 flex-col gap-2",
        orientation === "vertical" && dotsPosition === "left" && "-left-8",
        orientation === "vertical" && dotsPosition === "right" && "-right-8",
        className
      ),
      ...props,
      children: scrollSnaps.map((_, i) => {
        const isHorizontal = orientation === "horizontal" || dotsPosition === "bottom";
        const isActive = i === selectedIndex;
        let sizingClass = "";
        if (isActive) {
          sizingClass = isHorizontal ? "w-4 bg-primary" : "h-4 bg-primary";
        } else {
          sizingClass = isHorizontal ? "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60" : "h-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60";
        }
        return /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
          "button",
          {
            type: "button",
            onClick: () => scrollTo(i),
            "aria-label": `Go to slide ${i + 1}`,
            "aria-current": isActive ? "true" : void 0,
            className: cn(
              "rounded-full transition-all duration-200",
              isHorizontal ? "h-1.5" : "w-1.5",
              sizingClass
            )
          },
          i
        );
      })
    }
  );
});
CarouselDots.displayName = "CarouselDots";

// src/components/ui/data-display/chart.tsx
var React35 = __toESM(require("react"), 1);
var import_recharts = require("recharts");

// src/components/ui/feedback/error-boundary.tsx
var React34 = __toESM(require("react"), 1);

// src/components/ui/feedback/error-state.tsx
var import_lucide_react19 = require("lucide-react");
var import_jsx_runtime41 = require("react/jsx-runtime");
function ErrorState({
  title,
  description,
  actionLabel,
  onAction,
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime41.jsxs)(
    Card,
    {
      className: cn("px-6 py-10 text-center", className),
      ...props,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("div", { className: "mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400", children: /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(import_lucide_react19.AlertTriangle, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("h3", { className: "text-base font-semibold text-slate-900 dark:text-slate-100", children: title }),
        description ? /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("p", { className: "mx-auto mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400", children: description }) : null,
        actionLabel && onAction ? /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(Button, { className: "mt-4", onClick: onAction, children: actionLabel }) : null
      ]
    }
  );
}

// src/components/ui/feedback/error-boundary.tsx
var import_jsx_runtime42 = require("react/jsx-runtime");
function areResetKeysDifferent(prevKeys = [], nextKeys = []) {
  if (prevKeys.length !== nextKeys.length) return true;
  return prevKeys.some((k, i) => !Object.is(k, nextKeys[i]));
}
var ErrorBoundary = class extends React34.Component {
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
      return /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(
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
function withErrorBoundary(Component2, errorBoundaryProps) {
  const Wrapped = React34.forwardRef((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(ErrorBoundary, { ...errorBoundaryProps, children: /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(Component2, { ...props, ref }) }));
  Wrapped.displayName = `withErrorBoundary(${Component2.displayName || Component2.name || "Component"})`;
  return Wrapped;
}
function useErrorBoundary() {
  const [error, setError] = React34.useState(null);
  if (error) {
    throw error;
  }
  return {
    showBoundary: (err) => setError(err),
    resetBoundary: () => setError(null)
  };
}

// src/components/ui/data-display/chart.tsx
var import_jsx_runtime43 = require("react/jsx-runtime");
var THEMES = { light: "", dark: ".dark" };
var ChartContext = React35.createContext(null);
function useChart() {
  const context = React35.useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }
  return context;
}
var ChartContainer = React35.forwardRef(({ id, className, children, config, fallback, onError, ...props }, ref) => {
  const uniqueId = React35.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;
  const contextValue = React35.useMemo(() => ({ config }), [config]);
  return /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(ChartContext.Provider, { value: contextValue, children: /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)(
    "div",
    {
      "data-chart": chartId,
      ref,
      className: cn(
        // eslint-disable-next-line design-tokens/no-hardcoded-colors
        "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(ChartStyle, { id: chartId, config }),
        /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(ErrorBoundary, { fallback, onError, children: /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(import_recharts.ResponsiveContainer, { children }) })
      ]
    }
  ) });
});
ChartContainer.displayName = "Chart";
var ChartStyle = ({ id, config }) => {
  const colorConfig = Object.entries(config).filter(
    ([, itemConfig]) => Boolean("theme" in itemConfig && itemConfig.theme || "color" in itemConfig && itemConfig.color)
  );
  if (!colorConfig.length) {
    return null;
  }
  return /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(
    "style",
    {
      dangerouslySetInnerHTML: {
        __html: Object.entries(THEMES).map(
          ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig.map(([key, itemConfig]) => {
            const color = ("theme" in itemConfig && itemConfig.theme ? (
              // eslint-disable-next-line security/detect-object-injection
              itemConfig.theme[theme]
            ) : void 0) || ("color" in itemConfig ? itemConfig.color : void 0);
            return color ? `  --color-${key}: ${color};` : null;
          }).filter(Boolean).join("\n")}
}
`
        ).join("\n")
      }
    }
  );
};
var ChartTooltip = import_recharts.Tooltip;
var ChartTooltipContent = React35.forwardRef(
  ({
    active,
    payload,
    className,
    indicator = "dot",
    hideLabel = false,
    hideIndicator = false,
    label,
    labelFormatter,
    labelClassName,
    formatter,
    color,
    nameKey,
    labelKey
  }, ref) => {
    const { config } = useChart();
    const tooltipLabel = React35.useMemo(() => {
      if (hideLabel || !payload?.length) {
        return null;
      }
      const [item] = payload;
      const key = `${labelKey || item?.dataKey || item?.name || "value"}`;
      const itemConfig = getPayloadConfigFromPayload(config, item, key);
      const value = !labelKey && typeof label === "string" ? config[label]?.label || label : itemConfig?.label;
      if (labelFormatter) {
        return /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("div", { className: cn("font-medium", labelClassName), children: labelFormatter(value, payload) });
      }
      if (!value) {
        return null;
      }
      return /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("div", { className: cn("font-medium", labelClassName), children: value });
    }, [
      label,
      labelFormatter,
      payload,
      hideLabel,
      labelClassName,
      config,
      labelKey
    ]);
    if (!active || !payload?.length) {
      return null;
    }
    const nestLabel = payload.length === 1 && indicator !== "dot";
    return /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)(
      "div",
      {
        ref,
        className: cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
          className
        ),
        children: [
          !nestLabel ? tooltipLabel : null,
          /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("div", { className: "grid gap-1.5", children: payload.filter((item) => item && item.type !== "none").map((item, index) => {
            const key = `${nameKey || item.name || item.dataKey || "value"}`;
            const itemConfig = getPayloadConfigFromPayload(config, item, key);
            const indicatorColor = color || item.payload?.fill || item.color;
            const itemKey = (typeof item.dataKey === "function" ? void 0 : item.dataKey) || item.name || index;
            return /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(
              "div",
              {
                className: cn(
                  "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                  indicator === "dot" && "items-center"
                ),
                children: formatter && item?.value !== void 0 && item.name ? formatter(item.value, item.name, item, index, item.payload) : /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)(import_jsx_runtime43.Fragment, { children: [
                  itemConfig?.icon ? /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(itemConfig.icon, {}) : !hideIndicator && /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(
                    "div",
                    {
                      className: cn(
                        "shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]",
                        {
                          "h-2.5 w-2.5": indicator === "dot",
                          "w-1": indicator === "line",
                          "w-0 border-[1.5px] border-dashed bg-transparent": indicator === "dashed",
                          "my-0.5": nestLabel && indicator === "dashed"
                        }
                      ),
                      style: {
                        "--color-bg": indicatorColor,
                        "--color-border": indicatorColor
                      }
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)(
                    "div",
                    {
                      className: cn(
                        "flex flex-1 justify-between leading-none",
                        nestLabel ? "items-end" : "items-center"
                      ),
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)("div", { className: "grid gap-1.5", children: [
                          nestLabel ? tooltipLabel : null,
                          /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("span", { className: "text-muted-foreground", children: itemConfig?.label || item.name })
                        ] }),
                        item.value !== void 0 && item.value !== null && /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("span", { className: "font-mono font-medium tabular-nums text-foreground", children: item.value.toLocaleString() })
                      ]
                    }
                  )
                ] })
              },
              itemKey
            );
          }) })
        ]
      }
    );
  }
);
ChartTooltipContent.displayName = "ChartTooltip";
var ChartLegend = import_recharts.Legend;
var ChartLegendContent = React35.forwardRef(
  ({ className, hideIcon = false, payload, verticalAlign = "bottom", nameKey }, ref) => {
    const { config } = useChart();
    if (!payload?.length) {
      return null;
    }
    return /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(
      "div",
      {
        ref,
        className: cn(
          "flex items-center justify-center gap-4",
          verticalAlign === "top" ? "pb-3" : "pt-3",
          className
        ),
        children: payload.filter((item) => item && item.type !== "none").map((item, index) => {
          const key = `${nameKey || item.dataKey || "value"}`;
          const itemConfig = getPayloadConfigFromPayload(config, item, key);
          const itemKey = item.value || (typeof item.dataKey === "function" ? void 0 : item.dataKey) || index;
          return /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)(
            "div",
            {
              className: cn(
                "flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground"
              ),
              children: [
                itemConfig?.icon && !hideIcon ? /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(itemConfig.icon, {}) : /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(
                  "div",
                  {
                    className: "h-2 w-2 shrink-0 rounded-[2px]",
                    style: {
                      backgroundColor: item.color
                    }
                  }
                ),
                itemConfig?.label
              ]
            },
            itemKey
          );
        })
      }
    );
  }
);
ChartLegendContent.displayName = "ChartLegend";
function getPayloadConfigFromPayload(config, payload, key) {
  if (typeof payload !== "object" || payload === null) {
    return void 0;
  }
  const payloadPayload = "payload" in payload && typeof payload.payload === "object" && payload.payload !== null ? payload.payload : void 0;
  let configLabelKey = key;
  if (key in payload && // eslint-disable-next-line security/detect-object-injection
  typeof payload[key] === "string") {
    configLabelKey = payload[key];
  } else if (payloadPayload && key in payloadPayload && // eslint-disable-next-line security/detect-object-injection
  typeof payloadPayload[key] === "string") {
    configLabelKey = payloadPayload[key];
  }
  return configLabelKey in config ? (
    // eslint-disable-next-line security/detect-object-injection
    config[configLabelKey]
  ) : config[key];
}

// src/components/ui/data-display/collapsible.tsx
var CollapsiblePrimitive = __toESM(require("@radix-ui/react-collapsible"), 1);
var import_lucide_react20 = require("lucide-react");
var import_jsx_runtime44 = require("react/jsx-runtime");
var COLLAPSIBLE_STYLE_ID = "collapsible-animations";
if (typeof document !== "undefined" && !document.getElementById(COLLAPSIBLE_STYLE_ID)) {
  const style = document.createElement("style");
  style.id = COLLAPSIBLE_STYLE_ID;
  style.textContent = `
    @keyframes collapsible-down {
      from { height: 0; opacity: 0 }
      to   { height: var(--radix-collapsible-content-height); opacity: 1 }
    }
    @keyframes collapsible-up {
      from { height: var(--radix-collapsible-content-height); opacity: 1 }
      to   { height: 0; opacity: 0 }
    }
    [data-radix-collapsible-content][data-state=open]   {
      animation: collapsible-down 0.2s ease-out;
    }
    [data-radix-collapsible-content][data-state=closed] {
      animation: collapsible-up 0.2s ease-out;
    }
  `;
  document.head.appendChild(style);
}
var Collapsible = CollapsiblePrimitive.Root;
var CollapsibleTrigger2 = CollapsiblePrimitive.CollapsibleTrigger;
var CollapsibleContent2 = CollapsiblePrimitive.CollapsibleContent;
function CollapsibleCard({
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(
    CollapsiblePrimitive.Root,
    {
      className: cn("rounded-lg border border-border/70 bg-card overflow-hidden", className),
      ...props
    }
  );
}
function CollapsibleCardTrigger({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime44.jsxs)(
    CollapsiblePrimitive.Trigger,
    {
      className: cn(
        "flex w-full items-center justify-between px-4 py-3",
        "text-sm font-medium text-left",
        "hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        "transition-colors duration-150",
        // Chevron rotates when open
        "[&[data-state=open]>svg]:rotate-180",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(import_lucide_react20.ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" })
      ]
    }
  );
}
function CollapsibleCardContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(
    CollapsiblePrimitive.Content,
    {
      className: cn("overflow-hidden border-t border-border/60 text-sm text-muted-foreground", className),
      ...props
    }
  );
}

// src/components/ui/data-display/data-table.tsx
var React37 = __toESM(require("react"), 1);
var import_lucide_react21 = require("lucide-react");

// src/components/ui/data-display/table.tsx
var React36 = __toESM(require("react"), 1);
var import_jsx_runtime45 = require("react/jsx-runtime");
var Table = React36.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("div", { className: "relative w-full overflow-auto", children: /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(
  "table",
  {
    ref,
    className: cn("w-full caption-bottom text-sm", className),
    ...props
  }
) }));
Table.displayName = "Table";
var TableHeader = React36.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(
  "thead",
  {
    ref,
    className: cn("[&_tr]:border-b [&_tr]:border-border/60 bg-muted/30", className),
    ...props
  }
));
TableHeader.displayName = "TableHeader";
var TableBody = React36.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(
  "tbody",
  {
    ref,
    className: cn("[&_tr:last-child]:border-0", className),
    ...props
  }
));
TableBody.displayName = "TableBody";
var TableFooter = React36.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(
  "tfoot",
  {
    ref,
    className: cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    ),
    ...props
  }
));
TableFooter.displayName = "TableFooter";
var TableRow = React36.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(
  "tr",
  {
    ref,
    className: cn(
      "border-b border-border/60 transition-colors hover:bg-muted/40 data-[state=selected]:bg-primary/5 min-h-[56px]",
      className
    ),
    ...props
  }
));
TableRow.displayName = "TableRow";
var TableHead = React36.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(
  "th",
  {
    ref,
    className: cn(
      "h-10 px-4 text-left align-middle text-xs font-semibold uppercase tracking-wider text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    ),
    ...props
  }
));
TableHead.displayName = "TableHead";
var TableCell = React36.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(
  "td",
  {
    ref,
    className: cn(
      "p-3 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    ),
    ...props
  }
));
TableCell.displayName = "TableCell";
var TableCaption = React36.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(
  "caption",
  {
    ref,
    className: cn("mt-4 text-sm text-muted-foreground", className),
    ...props
  }
));
TableCaption.displayName = "TableCaption";

// src/components/ui/feedback/skeleton.tsx
var import_jsx_runtime46 = require("react/jsx-runtime");
function Skeleton({
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(
    "div",
    {
      "aria-hidden": "true",
      className: cn(
        "animate-pulse rounded-md bg-muted/80",
        className
      ),
      ...props
    }
  );
}

// src/components/ui/data-display/data-table.tsx
var import_jsx_runtime47 = require("react/jsx-runtime");
function SortIcon({ active, direction }) {
  if (!active || !direction) return /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(import_lucide_react21.ChevronsUpDown, { className: "ml-1 h-3.5 w-3.5 opacity-40" });
  return direction === "asc" ? /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(import_lucide_react21.ChevronUp, { className: "ml-1 h-3.5 w-3.5 text-primary" }) : /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(import_lucide_react21.ChevronDown, { className: "ml-1 h-3.5 w-3.5 text-primary" });
}
function getAriaSort(colKey, sortKey, sortDirection, isSortable) {
  if (!isSortable) return void 0;
  if (sortKey === colKey) {
    if (sortDirection === "asc") return "ascending";
    if (sortDirection === "desc") return "descending";
    return "none";
  }
  return "none";
}
function renderCellValue(value) {
  if (value == null) return "\u2014";
  if (typeof value === "string" || typeof value === "number") return value;
  if (typeof value === "boolean") return String(value);
  if (React37.isValidElement(value)) return value;
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}
function DataTableInternal({
  columns,
  data,
  rowKey,
  isLoading = false,
  emptyMessage = "No results found.",
  emptyIcon,
  skeletonRows = 8,
  pagination,
  sortKey,
  sortDirection,
  onSort,
  className,
  hoverable = true,
  onRowClick,
  caption,
  ...props
}, ref) {
  function handleSort(key) {
    if (!onSort) return;
    if (sortKey !== key) {
      onSort(key, "asc");
    } else if (sortDirection === "asc") {
      onSort(key, "desc");
    } else {
      onSort(key, null);
    }
  }
  const totalPages = pagination ? Math.ceil(pagination.total / pagination.pageSize) : 0;
  return /* @__PURE__ */ (0, import_jsx_runtime47.jsxs)("div", { ref, className: cn("w-full", className), ...props, children: [
    /* @__PURE__ */ (0, import_jsx_runtime47.jsx)("div", { className: "rounded-md border", children: /* @__PURE__ */ (0, import_jsx_runtime47.jsxs)(Table, { "aria-busy": isLoading, children: [
      caption ? /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(TableCaption, { children: caption }) : null,
      /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(TableRow, { className: "hover:bg-transparent", children: columns.map((col) => {
        const isSortable = Boolean(col.sortable && onSort);
        const sortState = getAriaSort(col.key, sortKey, sortDirection, isSortable);
        return /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(
          TableHead,
          {
            "aria-sort": sortState,
            className: col.headerClassName,
            children: isSortable ? /* @__PURE__ */ (0, import_jsx_runtime47.jsxs)(
              "button",
              {
                type: "button",
                onClick: () => handleSort(col.key),
                className: "inline-flex items-center gap-1 font-medium hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded select-none cursor-pointer text-left",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime47.jsx)("span", { children: col.header }),
                  /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(
                    SortIcon,
                    {
                      active: sortKey === col.key,
                      direction: sortKey === col.key ? sortDirection ?? null : null
                    }
                  )
                ]
              }
            ) : /* @__PURE__ */ (0, import_jsx_runtime47.jsx)("div", { className: "flex items-center", children: col.header })
          },
          col.key
        );
      }) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime47.jsxs)(TableBody, { children: [
        isLoading && Array.from({ length: skeletonRows }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(TableRow, { className: "hover:bg-transparent", children: columns.map((col) => /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(TableCell, { className: col.className, children: /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(Skeleton, { className: "h-4 w-full rounded" }) }, col.key)) }, i)),
        !isLoading && data.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(TableRow, { className: "hover:bg-transparent", children: /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(TableCell, { colSpan: columns.length, children: /* @__PURE__ */ (0, import_jsx_runtime47.jsxs)("div", { className: "flex flex-col items-center justify-center gap-2 py-12 text-muted-foreground", children: [
          emptyIcon ?? /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(
            "svg",
            {
              className: "h-10 w-10 opacity-30",
              fill: "none",
              stroke: "currentColor",
              viewBox: "0 0 24 24",
              children: /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 1.5,
                  d: "M3 10h18M3 14h18M8 4h8a2 2 0 012 2v12a2 2 0 01-2 2H8a2 2 0 01-2-2V6a2 2 0 012-2z"
                }
              )
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime47.jsx)("p", { className: "text-sm", children: emptyMessage })
        ] }) }) }),
        !isLoading && data.length > 0 && data.map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(
          TableRow,
          {
            className: cn(
              hoverable && "cursor-default",
              onRowClick && "cursor-pointer"
            ),
            onClick: onRowClick ? () => onRowClick(row) : void 0,
            "data-state": void 0,
            children: columns.map((col) => /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(TableCell, { className: col.className, children: col.cell ? col.cell(row, i) : renderCellValue(row[col.key]) }, col.key))
          },
          rowKey ? rowKey(row, i) : i
        ))
      ] })
    ] }) }),
    pagination && totalPages > 1 && /* @__PURE__ */ (0, import_jsx_runtime47.jsxs)("div", { className: "mt-3 flex items-center justify-between gap-2 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ (0, import_jsx_runtime47.jsxs)("span", { className: "shrink-0 tabular-nums", children: [
        Math.min((pagination.page - 1) * pagination.pageSize + 1, pagination.total),
        "\u2013",
        Math.min(pagination.page * pagination.pageSize, pagination.total),
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime47.jsxs)("span", { className: "hidden sm:inline", children: [
          "of ",
          pagination.total
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime47.jsxs)("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(
          "button",
          {
            type: "button",
            onClick: () => pagination.onPageChange(pagination.page - 1),
            disabled: pagination.page <= 1,
            "aria-label": "Previous page",
            className: "rounded px-2 py-1 text-xs font-medium hover:bg-muted disabled:pointer-events-none disabled:opacity-40 h-8",
            children: "\u2190"
          }
        ),
        (() => {
          const window2 = 5;
          const half = Math.floor(window2 / 2);
          let start = Math.max(1, pagination.page - half);
          const end = Math.min(totalPages, start + window2 - 1);
          if (end - start < window2 - 1) start = Math.max(1, end - window2 + 1);
          const pages = [];
          if (start > 1) {
            pages.push(1);
            if (start > 2) pages.push("\u2026");
          }
          for (let p = start; p <= end; p++) pages.push(p);
          if (end < totalPages) {
            if (end < totalPages - 1) {
              pages.push("\u2026");
            }
            pages.push(totalPages);
          }
          return pages.map(
            (p, i) => p === "\u2026" ? /* @__PURE__ */ (0, import_jsx_runtime47.jsx)("span", { className: "px-1 text-xs select-none", children: "\u2026" }, `ellipsis-${i}`) : /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(
              "button",
              {
                type: "button",
                onClick: () => pagination.onPageChange(p),
                "aria-label": `Page ${p}`,
                "aria-current": p === pagination.page ? "page" : void 0,
                className: cn(
                  "rounded px-2.5 py-1 text-xs font-medium h-8 min-w-[32px]",
                  p === pagination.page ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                ),
                children: p
              },
              p
            )
          );
        })(),
        /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(
          "button",
          {
            type: "button",
            onClick: () => pagination.onPageChange(pagination.page + 1),
            disabled: pagination.page >= totalPages,
            "aria-label": "Next page",
            className: "rounded px-2 py-1 text-xs font-medium hover:bg-muted disabled:pointer-events-none disabled:opacity-40 h-8",
            children: "\u2192"
          }
        )
      ] })
    ] })
  ] });
}
var DataTable = React37.forwardRef(DataTableInternal);
DataTable.displayName = "DataTable";

// src/components/ui/data-display/image-viewer.tsx
var React38 = __toESM(require("react"), 1);
var import_lucide_react22 = require("lucide-react");
var import_jsx_runtime48 = require("react/jsx-runtime");
function ImageViewer({
  file,
  className,
  alt = "Image preview",
  scale = 1,
  showDownload = false,
  onLoadSuccess,
  onLoadError
}) {
  const [error, setError] = React38.useState(null);
  const [currentScale, setCurrentScale] = React38.useState(scale);
  const [rotation, setRotation] = React38.useState(0);
  const [isLoading, setIsLoading] = React38.useState(true);
  const [imageSrc, setImageSrc] = React38.useState("");
  const imgRef = React38.useRef(null);
  const hasLoadedSrcRef = React38.useRef(null);
  React38.useEffect(() => {
    if (imageSrc && imgRef.current?.complete && hasLoadedSrcRef.current !== imageSrc) {
      hasLoadedSrcRef.current = imageSrc;
      setIsLoading(false);
      onLoadSuccess?.();
    }
  }, [imageSrc, onLoadSuccess]);
  React38.useEffect(() => {
    setCurrentScale(scale);
  }, [scale]);
  React38.useEffect(() => {
    setIsLoading(true);
    setError(null);
    hasLoadedSrcRef.current = null;
    if (typeof file === "string") {
      setImageSrc(file);
    } else if (file instanceof File) {
      if (!file.type.startsWith("image/")) {
        setError("Provided file is not an image.");
        setIsLoading(false);
        return;
      }
      const url = URL.createObjectURL(file);
      setImageSrc(url);
      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setError("Invalid file format.");
      setIsLoading(false);
    }
  }, [file]);
  function handleImageLoad() {
    hasLoadedSrcRef.current = imageSrc;
    setIsLoading(false);
    onLoadSuccess?.();
  }
  function handleImageError(e) {
    setIsLoading(false);
    setError("Failed to load image.");
    onLoadError?.(e.nativeEvent);
  }
  function handleDownload() {
    const a = document.createElement("a");
    a.href = imageSrc;
    if (typeof file === "string") {
      a.download = file.split("/").pop() || "image.png";
    } else {
      a.download = file.name || "image.png";
    }
    a.click();
  }
  return /* @__PURE__ */ (0, import_jsx_runtime48.jsxs)(Card, { className: cn("relative flex flex-col items-center overflow-hidden bg-muted/20", className), children: [
    !error && !isLoading && /* @__PURE__ */ (0, import_jsx_runtime48.jsxs)("div", { className: "absolute top-2 right-2 z-10 flex items-center gap-1 bg-background/80 backdrop-blur-md p-1 rounded-md border shadow-sm", children: [
      /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(Button, { variant: "ghost", size: "icon", onClick: () => setCurrentScale((s) => Math.max(s - 0.2, 0.2)), className: "h-7 w-7", "aria-label": "Zoom Out", title: "Zoom Out", children: /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(import_lucide_react22.ZoomOut, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(Button, { variant: "ghost", size: "icon", onClick: () => setCurrentScale(1), className: "h-7 w-7", "aria-label": "Reset Zoom", title: "Fit Page", children: /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(import_lucide_react22.Maximize, { className: "h-3.5 w-3.5" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(Button, { variant: "ghost", size: "icon", onClick: () => setCurrentScale((s) => Math.min(s + 0.5, 5)), className: "h-7 w-7", "aria-label": "Zoom In", title: "Zoom In", children: /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(import_lucide_react22.ZoomIn, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime48.jsx)("div", { className: "w-px h-4 bg-border mx-1" }),
      /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(Button, { variant: "ghost", size: "icon", onClick: () => setRotation((r) => (r + 90) % 360), className: "h-7 w-7", "aria-label": "Rotate", title: "Rotate", children: /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(import_lucide_react22.RotateCw, { className: "h-4 w-4" }) }),
      showDownload && /* @__PURE__ */ (0, import_jsx_runtime48.jsxs)(import_jsx_runtime48.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime48.jsx)("div", { className: "w-px h-4 bg-border mx-1" }),
        /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(Button, { variant: "ghost", size: "icon", onClick: handleDownload, className: "h-7 w-7 text-primary hover:text-primary hover:bg-primary/10", "aria-label": "Download", title: "Download", children: /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(import_lucide_react22.Download, { className: "h-4 w-4" }) })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime48.jsx)("div", { className: "w-full h-full flex justify-center items-center p-4 overflow-auto shrink-0 min-h-[300px] max-h-[70vh]", children: error ? /* @__PURE__ */ (0, import_jsx_runtime48.jsxs)("div", { className: "h-48 w-full max-w-sm flex flex-col items-center justify-center text-center p-6 space-y-3", children: [
      /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(import_lucide_react22.Image, { className: "w-10 h-10 text-destructive/50" }),
      /* @__PURE__ */ (0, import_jsx_runtime48.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime48.jsx)("p", { className: "font-semibold text-foreground", children: "Failed to load Image" }),
        /* @__PURE__ */ (0, import_jsx_runtime48.jsx)("p", { className: "text-sm text-muted-foreground", children: error })
      ] })
    ] }) : /* @__PURE__ */ (0, import_jsx_runtime48.jsxs)("div", { className: "relative w-full h-full flex justify-center items-center overflow-hidden", children: [
      isLoading && /* @__PURE__ */ (0, import_jsx_runtime48.jsxs)("div", { className: "absolute inset-0 flex flex-col items-center justify-center space-y-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(import_lucide_react22.Loader2, { className: "h-8 w-8 animate-spin text-primary" }),
        /* @__PURE__ */ (0, import_jsx_runtime48.jsx)("p", { className: "text-sm text-muted-foreground", children: "Loading Image..." })
      ] }),
      imageSrc && /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(
        "div",
        {
          style: {
            transform: `scale(${currentScale}) rotate(${rotation}deg)`,
            transition: "transform 0.2s ease-in-out"
          },
          className: "flex justify-center items-center origin-center",
          children: /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(
            "img",
            {
              ref: imgRef,
              src: imageSrc,
              alt,
              onLoad: handleImageLoad,
              onError: handleImageError,
              className: cn(
                "max-w-full max-h-full object-contain pointer-events-none shadow-sm border border-border"
              ),
              style: { opacity: isLoading ? 0 : 1, transition: "opacity 0.2s" }
            }
          )
        }
      )
    ] }) })
  ] });
}

// src/components/ui/data-display/info-list.tsx
var import_jsx_runtime49 = require("react/jsx-runtime");
function InfoList({ items, className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime49.jsx)("div", { className: cn("space-y-3", className), ...props, children: items.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime49.jsxs)(
    "div",
    {
      className: "flex flex-col gap-1 border-b border-slate-100 pb-3 last:border-b-0 last:pb-0 dark:border-slate-800",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime49.jsx)("span", { className: "text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: item.label }),
        /* @__PURE__ */ (0, import_jsx_runtime49.jsx)("span", { className: "text-sm font-medium text-slate-900 dark:text-slate-100", children: item.value }),
        item.hint ? /* @__PURE__ */ (0, import_jsx_runtime49.jsx)("span", { className: "text-xs text-slate-400", children: item.hint }) : null
      ]
    },
    index
  )) });
}

// src/components/ui/data-display/kpi-card.tsx
var React39 = __toESM(require("react"), 1);
var import_lucide_react23 = require("lucide-react");
var import_jsx_runtime50 = require("react/jsx-runtime");
function getToneStyle(tone) {
  switch (tone) {
    case "info":
      return "border-indigo-200/60 bg-indigo-50/20 dark:border-indigo-900/40 dark:bg-indigo-950/20";
    case "success":
      return "border-emerald-200/60 bg-emerald-50/20 dark:border-emerald-900/40 dark:bg-emerald-950/20";
    case "warning":
      return "border-amber-200/60 bg-amber-50/20 dark:border-amber-900/40 dark:bg-amber-950/20";
    case "danger":
      return "border-rose-200/60 bg-rose-50/20 dark:border-rose-900/40 dark:bg-rose-950/20";
    case "accent":
      return "border-purple-200/60 bg-purple-50/20 dark:border-purple-900/40 dark:bg-purple-950/20";
    default:
      return "";
  }
}
var KPICard = React39.forwardRef(
  ({
    title,
    label,
    value,
    description,
    change,
    changePeriod,
    icon,
    prefix,
    suffix,
    variant = "default",
    tone = "default",
    warning,
    className,
    ...props
  }, ref) => {
    const displayTitle = title || label || "";
    const isPositive = typeof change === "number" && change > 0;
    const isNegative = typeof change === "number" && change < 0;
    const isZero = typeof change === "number" && change === 0;
    const renderIcon = () => {
      if (!icon) return null;
      if (typeof icon === "function") {
        const IconComp = icon;
        return /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(IconComp, { className: "h-5 w-5" });
      }
      return icon;
    };
    return /* @__PURE__ */ (0, import_jsx_runtime50.jsxs)(
      Card,
      {
        ref,
        className: cn(
          "transition-all",
          variant === "outline" && "border-2",
          variant === "ghost" && "border-transparent bg-muted/30 shadow-none",
          getToneStyle(tone),
          className
        ),
        ...props,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime50.jsxs)(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(CardTitle, { className: "text-sm font-medium text-muted-foreground", children: displayTitle }),
            icon && /* @__PURE__ */ (0, import_jsx_runtime50.jsx)("div", { className: "p-2 rounded-lg bg-muted text-muted-foreground flex items-center justify-center", children: renderIcon() })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime50.jsxs)(CardContent, { className: "space-y-1", children: [
            /* @__PURE__ */ (0, import_jsx_runtime50.jsxs)("div", { className: "text-2xl font-bold tracking-tight text-foreground flex items-baseline gap-0.5", children: [
              prefix && /* @__PURE__ */ (0, import_jsx_runtime50.jsx)("span", { className: "text-xl font-normal text-muted-foreground", children: prefix }),
              /* @__PURE__ */ (0, import_jsx_runtime50.jsx)("span", { children: value }),
              suffix && /* @__PURE__ */ (0, import_jsx_runtime50.jsx)("span", { className: "text-sm font-normal text-muted-foreground ml-1", children: suffix })
            ] }),
            (typeof change === "number" || description || changePeriod) && /* @__PURE__ */ (0, import_jsx_runtime50.jsxs)("div", { className: "flex items-center gap-1.5 pt-1 text-xs", children: [
              typeof change === "number" && /* @__PURE__ */ (0, import_jsx_runtime50.jsxs)(
                "div",
                {
                  className: cn(
                    "flex items-center gap-0.5 font-medium px-1.5 py-0.5 rounded",
                    isPositive && "text-emerald-700 bg-emerald-500/10 dark:text-emerald-400",
                    isNegative && "text-rose-700 bg-rose-500/10 dark:text-rose-400",
                    isZero && "text-muted-foreground bg-muted"
                  ),
                  children: [
                    isPositive && /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(import_lucide_react23.TrendingUp, { className: "h-3.5 w-3.5" }),
                    isNegative && /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(import_lucide_react23.TrendingDown, { className: "h-3.5 w-3.5" }),
                    isZero && /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(import_lucide_react23.Minus, { className: "h-3.5 w-3.5" }),
                    /* @__PURE__ */ (0, import_jsx_runtime50.jsx)("span", { children: isPositive ? `+${change}%` : `${change}%` })
                  ]
                }
              ),
              (changePeriod || description) && /* @__PURE__ */ (0, import_jsx_runtime50.jsx)("span", { className: "text-muted-foreground truncate", children: changePeriod || description })
            ] }),
            warning && /* @__PURE__ */ (0, import_jsx_runtime50.jsxs)("div", { className: "mt-2 flex items-center gap-1.5 text-xs font-medium text-amber-600 dark:text-amber-400", children: [
              /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(import_lucide_react23.AlertTriangle, { className: "h-3.5 w-3.5 shrink-0" }),
              /* @__PURE__ */ (0, import_jsx_runtime50.jsx)("span", { className: "truncate", children: warning })
            ] })
          ] })
        ]
      }
    );
  }
);
KPICard.displayName = "KPICard";

// src/components/ui/data-display/line-items-card.tsx
var import_jsx_runtime51 = require("react/jsx-runtime");
function getBillStatusStyle(status) {
  switch (status) {
    case "RECEIVED":
      return "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 border-none";
    case "BILLED":
      return "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 border-none";
    case "PARTIALLY_BILLED":
      return "bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300 border-none";
    case "CANCELLED":
      return "bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border-none";
    default:
      return "bg-slate-100 text-slate-700";
  }
}
function LineItemsCard({
  items = [],
  showBillStatus = false,
  showQtyBreakdown = false,
  footerLabel = "Total",
  footerTotal,
  emptyMessage = "No line items available.",
  isIntraState: _isIntraState = true,
  maskFormatter,
  className,
  ...props
}) {
  const fmt = (val) => {
    const formatted = formatCurrency(val ?? 0);
    if (maskFormatter) return maskFormatter(formatted);
    return formatted;
  };
  const grandTotal = footerTotal !== void 0 ? footerTotal : items.reduce((sum, it) => sum + (it.total_amount ?? (it.ordered_qty ?? it.qty ?? 0) * (it.base_price ?? it.unit_price ?? 0)), 0);
  if (items.length === 0) {
    return /* @__PURE__ */ (0, import_jsx_runtime51.jsx)("div", { className: "py-8 text-center text-xs text-slate-400", children: emptyMessage });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime51.jsx)("div", { className: cn("overflow-x-auto rounded-xl border border-slate-200/80 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900", className), ...props, children: /* @__PURE__ */ (0, import_jsx_runtime51.jsxs)("table", { className: "w-full text-xs text-left border-collapse", children: [
    /* @__PURE__ */ (0, import_jsx_runtime51.jsx)("thead", { className: "bg-slate-50 border-b border-slate-200/80 dark:bg-slate-950 dark:border-slate-800", children: /* @__PURE__ */ (0, import_jsx_runtime51.jsxs)("tr", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime51.jsx)("th", { className: "px-4 py-3 font-semibold text-slate-500 uppercase tracking-wide min-w-[140px]", children: "Item" }),
      /* @__PURE__ */ (0, import_jsx_runtime51.jsx)("th", { className: "px-3 py-3 font-semibold text-slate-500 uppercase tracking-wide", children: "HSN" }),
      /* @__PURE__ */ (0, import_jsx_runtime51.jsx)("th", { className: "px-3 py-3 font-semibold text-slate-500 uppercase tracking-wide text-right", children: "Qty" }),
      showQtyBreakdown && /* @__PURE__ */ (0, import_jsx_runtime51.jsxs)(import_jsx_runtime51.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime51.jsx)("th", { className: "px-3 py-3 font-semibold text-slate-500 uppercase tracking-wide text-right text-emerald-600", children: "Accepted" }),
        /* @__PURE__ */ (0, import_jsx_runtime51.jsx)("th", { className: "px-3 py-3 font-semibold text-slate-500 uppercase tracking-wide text-right text-rose-600", children: "Rejected" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime51.jsx)("th", { className: "px-3 py-3 font-semibold text-slate-500 uppercase tracking-wide text-right", children: "Unit Rate" }),
      /* @__PURE__ */ (0, import_jsx_runtime51.jsx)("th", { className: "px-3 py-3 font-semibold text-slate-500 uppercase tracking-wide text-right", children: "Tax" }),
      /* @__PURE__ */ (0, import_jsx_runtime51.jsx)("th", { className: "px-4 py-3 font-semibold text-slate-500 uppercase tracking-wide text-right", children: "Total" }),
      showBillStatus && /* @__PURE__ */ (0, import_jsx_runtime51.jsx)("th", { className: "px-3 py-3 font-semibold text-slate-500 uppercase tracking-wide text-center", children: "Bill Status" })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime51.jsx)("tbody", { className: "divide-y divide-slate-100 dark:divide-slate-800", children: items.map((item, idx) => {
      const qty = item.ordered_qty ?? item.qty ?? 0;
      const unitRate = item.base_price ?? item.unit_price ?? 0;
      const lineTotal = item.total_amount ?? qty * unitRate;
      return /* @__PURE__ */ (0, import_jsx_runtime51.jsxs)("tr", { className: "hover:bg-slate-50/50 dark:hover:bg-slate-800/40", children: [
        /* @__PURE__ */ (0, import_jsx_runtime51.jsxs)("td", { className: "px-4 py-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime51.jsx)("div", { className: "font-semibold text-slate-900 dark:text-slate-100", children: item.name || item.item_name || "\u2014" }),
          item.ean_code && /* @__PURE__ */ (0, import_jsx_runtime51.jsxs)("span", { className: "text-[10px] text-slate-400", children: [
            "EAN: ",
            item.ean_code
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime51.jsx)("td", { className: "px-3 py-3 font-mono text-slate-600 dark:text-slate-300", children: item.hsn_sac_code || item.hsn_code || "\u2014" }),
        /* @__PURE__ */ (0, import_jsx_runtime51.jsxs)("td", { className: "px-3 py-3 text-right font-semibold text-slate-800 dark:text-slate-200", children: [
          qty,
          " ",
          item.unit
        ] }),
        showQtyBreakdown && /* @__PURE__ */ (0, import_jsx_runtime51.jsxs)(import_jsx_runtime51.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime51.jsx)("td", { className: "px-3 py-3 text-right font-semibold text-emerald-600", children: item.accepted_qty ?? qty }),
          /* @__PURE__ */ (0, import_jsx_runtime51.jsx)("td", { className: "px-3 py-3 text-right font-semibold text-rose-600", children: item.rejected_qty ?? 0 })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime51.jsx)("td", { className: "px-3 py-3 text-right font-mono text-slate-700 dark:text-slate-300", children: fmt(unitRate) }),
        /* @__PURE__ */ (0, import_jsx_runtime51.jsx)("td", { className: "px-3 py-3 text-right font-mono text-slate-500", children: item.total_tax ? fmt(item.total_tax) : "\u2014" }),
        /* @__PURE__ */ (0, import_jsx_runtime51.jsx)("td", { className: "px-4 py-3 text-right font-bold font-mono text-slate-900 dark:text-slate-100", children: fmt(lineTotal) }),
        showBillStatus && /* @__PURE__ */ (0, import_jsx_runtime51.jsx)("td", { className: "px-3 py-3 text-center", children: item.bill_status ? /* @__PURE__ */ (0, import_jsx_runtime51.jsx)(
          "span",
          {
            className: cn(
              "inline-block rounded px-2 py-0.5 text-[10px] font-bold",
              getBillStatusStyle(item.bill_status)
            ),
            children: item.bill_status.replace("_", " ")
          }
        ) : /* @__PURE__ */ (0, import_jsx_runtime51.jsx)("span", { className: "text-slate-300", children: "\u2014" }) })
      ] }, item.id || idx);
    }) }),
    /* @__PURE__ */ (0, import_jsx_runtime51.jsx)("tfoot", { className: "border-t-2 border-slate-200 bg-slate-50/80 font-bold dark:border-slate-700 dark:bg-slate-950", children: /* @__PURE__ */ (0, import_jsx_runtime51.jsxs)("tr", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime51.jsx)("td", { colSpan: showQtyBreakdown ? 5 : 3, className: "px-4 py-3 text-slate-800 dark:text-slate-200", children: footerLabel }),
      /* @__PURE__ */ (0, import_jsx_runtime51.jsx)("td", { colSpan: showBillStatus ? 3 : 2, className: "px-4 py-3 text-right text-sm font-extrabold text-indigo-600 dark:text-indigo-400 font-mono", children: fmt(grandTotal) })
    ] }) })
  ] }) });
}

// src/components/ui/data-display/match-score-gauge.tsx
var import_jsx_runtime52 = require("react/jsx-runtime");
function MatchScoreGauge({
  score,
  label = "Match Score",
  sublabel,
  size = 110,
  strokeWidth = 9,
  showGrade = true,
  className,
  ...props
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(100, Math.max(0, score));
  const strokeDashoffset = circumference - clamped / 100 * circumference;
  let color = "text-rose-500 stroke-rose-500";
  let grade = "C";
  if (clamped >= 85) {
    color = "text-emerald-500 stroke-emerald-500";
    grade = "A+";
  } else if (clamped >= 70) {
    color = "text-indigo-500 stroke-indigo-500";
    grade = "A";
  } else if (clamped >= 50) {
    color = "text-amber-500 stroke-amber-500";
    grade = "B";
  }
  const roundedScore = Math.round(clamped);
  return /* @__PURE__ */ (0, import_jsx_runtime52.jsxs)(
    "div",
    {
      role: "meter",
      "aria-valuenow": roundedScore,
      "aria-valuemin": 0,
      "aria-valuemax": 100,
      "aria-label": props["aria-label"] || label || "Match Score",
      className: cn("inline-flex flex-col items-center justify-center text-center", className),
      ...props,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime52.jsxs)("div", { className: "relative inline-flex items-center justify-center", style: { width: size, height: size }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime52.jsxs)("svg", { width: size, height: size, className: "transform -rotate-90", children: [
            /* @__PURE__ */ (0, import_jsx_runtime52.jsx)("title", { children: `${label}: ${roundedScore}%` }),
            /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(
              "circle",
              {
                className: "text-slate-100 dark:text-slate-800",
                strokeWidth,
                stroke: "currentColor",
                fill: "transparent",
                r: radius,
                cx: size / 2,
                cy: size / 2
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(
              "circle",
              {
                className: cn(color, "transition-all duration-1000 ease-out"),
                strokeWidth,
                strokeDasharray: circumference,
                strokeDashoffset,
                strokeLinecap: "round",
                fill: "transparent",
                r: radius,
                cx: size / 2,
                cy: size / 2
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime52.jsxs)("div", { className: "absolute flex flex-col items-center justify-center", children: [
            /* @__PURE__ */ (0, import_jsx_runtime52.jsxs)("span", { className: "text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100", children: [
              Math.round(clamped),
              "%"
            ] }),
            showGrade ? /* @__PURE__ */ (0, import_jsx_runtime52.jsxs)("span", { className: "text-[10px] font-bold uppercase tracking-wider text-slate-400", children: [
              "Grade ",
              grade
            ] }) : null
          ] })
        ] }),
        label ? /* @__PURE__ */ (0, import_jsx_runtime52.jsx)("span", { className: "mt-2 text-xs font-semibold text-slate-700 dark:text-slate-300", children: label }) : null,
        sublabel ? /* @__PURE__ */ (0, import_jsx_runtime52.jsx)("span", { className: "text-[11px] text-slate-400 leading-tight", children: sublabel }) : null
      ]
    }
  );
}

// src/components/ui/data-display/metric-ticker.tsx
var React40 = __toESM(require("react"), 1);
var import_jsx_runtime53 = require("react/jsx-runtime");
function MetricTicker({
  items = [],
  speedSeconds = 30,
  className,
  ...props
}) {
  const [isPaused, setIsPaused] = React40.useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = React40.useState(false);
  React40.useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (event) => {
      setPrefersReducedMotion(event.matches);
    };
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(handler);
      return () => mediaQuery.removeListener(handler);
    }
  }, []);
  const duplicatedItems = [...items, ...items];
  return /* @__PURE__ */ (0, import_jsx_runtime53.jsx)(
    "div",
    {
      role: "region",
      "aria-label": props["aria-label"] || "Metrics ticker",
      tabIndex: props.tabIndex ?? 0,
      onMouseEnter: () => setIsPaused(true),
      onMouseLeave: () => setIsPaused(false),
      onFocus: () => setIsPaused(true),
      onBlur: () => setIsPaused(false),
      className: cn(
        "group overflow-hidden border-y border-indigo-500/20 bg-indigo-950/20 py-2 backdrop-blur-xs select-none",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        className
      ),
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime53.jsx)(
        "div",
        {
          className: cn(
            "flex w-max gap-8 animate-[marquee_linear_infinite]",
            "group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]",
            "hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]",
            "motion-reduce:animate-none motion-reduce:transform-none"
          ),
          style: {
            animationDuration: `${speedSeconds}s`,
            animationPlayState: isPaused ? "paused" : void 0,
            animationName: prefersReducedMotion ? "none" : void 0
          },
          children: duplicatedItems.map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime53.jsxs)(
            "div",
            {
              className: "flex items-center gap-2 text-xs font-semibold text-slate-400",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime53.jsxs)("span", { children: [
                  item.label,
                  ":"
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime53.jsx)(
                  "span",
                  {
                    className: cn(
                      "font-bold text-slate-200",
                      item.highlight && "text-indigo-400 font-extrabold"
                    ),
                    children: item.value
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime53.jsx)("span", { className: "text-slate-600 ml-3", children: "\u2022" })
              ]
            },
            item.id || `${item.label}-${idx}`
          ))
        }
      )
    }
  );
}

// src/components/ui/data-display/quota-card.tsx
var import_lucide_react24 = require("lucide-react");

// src/components/ui/feedback/progress.tsx
var React41 = __toESM(require("react"), 1);
var ProgressPrimitive = __toESM(require("@radix-ui/react-progress"), 1);
var import_class_variance_authority9 = require("class-variance-authority");
var import_jsx_runtime54 = require("react/jsx-runtime");
var SHIMMER_STYLE_ID = "progress-shimmer";
if (typeof document !== "undefined" && !document.getElementById(SHIMMER_STYLE_ID)) {
  const style = document.createElement("style");
  style.id = SHIMMER_STYLE_ID;
  style.textContent = `
    @keyframes progress-shimmer {
      0%   { transform: translateX(-100%) skewX(-15deg); }
      100% { transform: translateX(200%)  skewX(-15deg); }
    }
    .progress-shimmer::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(255,255,255,0.25) 50%,
        transparent 100%
      );
      animation: progress-shimmer 1.6s ease-in-out infinite;
    }
  `;
  document.head.appendChild(style);
}
var progressVariants = (0, import_class_variance_authority9.cva)(
  "relative h-2 w-full overflow-hidden rounded-full",
  {
    variants: {
      variant: {
        default: "bg-primary/20",
        success: "bg-emerald-200 dark:bg-emerald-900/40",
        warning: "bg-amber-200  dark:bg-amber-900/40",
        danger: "bg-red-200    dark:bg-red-900/40"
      }
    },
    defaultVariants: { variant: "default" }
  }
);
var indicatorVariants = (0, import_class_variance_authority9.cva)(
  "h-full w-full flex-1 transition-all duration-500 ease-in-out",
  {
    variants: {
      variant: {
        default: "bg-primary",
        success: "bg-emerald-500 dark:bg-emerald-400",
        warning: "bg-amber-500  dark:bg-amber-400",
        danger: "bg-red-500    dark:bg-red-400"
      }
    },
    defaultVariants: { variant: "default" }
  }
);
var Progress = React41.forwardRef(({ className, value, variant, shimmer = false, showLabel = false, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("div", { className: cn("flex items-center gap-2", showLabel && "gap-3"), children: [
  /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(
    ProgressPrimitive.Root,
    {
      ref,
      className: cn(progressVariants({ variant }), "flex-1", className),
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(
        ProgressPrimitive.Indicator,
        {
          className: cn(
            indicatorVariants({ variant }),
            shimmer && "progress-shimmer relative"
          ),
          style: { transform: `translateX(-${100 - (value || 0)}%)` }
        }
      )
    }
  ),
  showLabel && /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("span", { className: "w-9 shrink-0 text-right text-xs tabular-nums text-muted-foreground", children: [
    Math.round(value || 0),
    "%"
  ] })
] }));
Progress.displayName = ProgressPrimitive.Root.displayName;

// src/components/ui/data-display/quota-card.tsx
var import_jsx_runtime55 = require("react/jsx-runtime");
function QuotaCard({
  title,
  used,
  total,
  unitLabel = "units",
  actionLabel = "Upgrade",
  onAction,
  isLoading = false,
  description,
  formatPercentage,
  icon,
  className,
  ...props
}) {
  const percentage = Math.min(100, Math.max(0, total > 0 ? used / total * 100 : 0));
  const remaining = Math.max(0, total - used);
  const badgeText = formatPercentage ? formatPercentage(percentage) : `${Math.round(percentage)}% used`;
  return /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)(Card, { className: cn("p-4.5 space-y-3.5", className), ...props, children: [
    /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)("div", { className: "flex items-start justify-between gap-3", children: [
      /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("h4", { className: "text-sm font-semibold text-slate-900 dark:text-slate-100", children: title }),
        /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("p", { className: "text-xs text-slate-500 dark:text-slate-400", children: description ?? `${remaining} of ${total} ${unitLabel} remaining` })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("span", { className: "rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-bold text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800", children: badgeText })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(Progress, { value: percentage, className: "h-2" }),
    onAction ? /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("div", { className: "pt-1", children: /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)(
      Button,
      {
        size: "sm",
        variant: "outline",
        onClick: onAction,
        disabled: isLoading,
        className: "w-full text-xs font-semibold",
        children: [
          icon ?? /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(import_lucide_react24.Sparkles, { className: "h-3.5 w-3.5 mr-1.5 text-amber-500" }),
          actionLabel
        ]
      }
    ) }) : null
  ] });
}

// src/components/ui/data-display/payment-ledger.tsx
var import_lucide_react25 = require("lucide-react");
var import_jsx_runtime56 = require("react/jsx-runtime");
function getBillBadgeStyle(status) {
  switch (status) {
    case "BILLED":
      return "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300";
    case "PARTIALLY_BILLED":
      return "bg-violet-100 text-violet-800 dark:bg-violet-950/50 dark:text-violet-300";
    case "RECEIVED":
      return "bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300";
    case "CANCELLED":
      return "bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400";
    case "SETTLED":
      return "bg-blue-100 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300";
    default:
      return "bg-slate-100 text-slate-600";
  }
}
function PaymentLedger({
  ledgerEntries = [],
  totalDR = 0,
  totalCR = 0,
  net: _net = 0,
  netLabel = "Net Payable",
  showFooter = true,
  onReferenceClick,
  onGRNClick,
  onInvoiceClick: _onInvoiceClick,
  maskFormatter,
  className,
  ...props
}) {
  const entries = [...ledgerEntries || []];
  entries.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const activeEntries = entries.filter(
    (e) => (e.status || "").toUpperCase() !== "CANCELLED" && (e.bill_status || "").toUpperCase() !== "CANCELLED"
  );
  const activeDR = activeEntries.filter((e) => e.type === "DR").reduce((s, e) => s + e.amount, 0);
  const activeCR = activeEntries.filter((e) => e.type === "CR").reduce((s, e) => s + e.amount, 0);
  const effectiveDR = activeDR > 0 ? activeDR : totalDR;
  const effectiveCR = activeCR > 0 ? activeCR : totalCR;
  const effectiveNet = effectiveDR - effectiveCR;
  const fmt = (val) => {
    const formatted = formatCurrency(val);
    if (maskFormatter) return maskFormatter(formatted);
    return formatted;
  };
  if (entries.length === 0) {
    return /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)("div", { className: "py-16 flex flex-col items-center justify-center text-center", children: [
      /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(import_lucide_react25.Wallet, { className: "w-12 h-12 text-slate-300 dark:text-slate-600 mb-3" }),
      /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("p", { className: "text-slate-700 dark:text-slate-200 font-semibold text-base", children: "Ledger is empty" }),
      /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("p", { className: "text-xs text-slate-400 mt-1 max-w-sm", children: "Bills and payment vouchers will appear here once processed." })
    ] });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)("div", { className: cn("space-y-4", className), ...props, children: [
    /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("div", { className: "overflow-x-auto rounded-xl border border-slate-200/80 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900", children: /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)("table", { className: "w-full text-xs text-left border-collapse", children: [
      /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("thead", { className: "bg-slate-50 border-b border-slate-200/80 dark:bg-slate-950 dark:border-slate-800", children: /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)("tr", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("th", { className: "px-4 py-3 font-semibold text-slate-500 uppercase tracking-wide", children: "Date" }),
        /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("th", { className: "px-4 py-3 font-semibold text-slate-500 uppercase tracking-wide", children: "Description / Reference" }),
        /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("th", { className: "px-3 py-3 font-semibold text-slate-500 uppercase tracking-wide text-center", children: "Type" }),
        /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("th", { className: "px-4 py-3 font-semibold text-slate-500 uppercase tracking-wide text-right", children: "Debit (DR)" }),
        /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("th", { className: "px-4 py-3 font-semibold text-slate-500 uppercase tracking-wide text-right", children: "Credit (CR)" }),
        /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("th", { className: "px-3 py-3 font-semibold text-slate-500 uppercase tracking-wide text-center", children: "Status" })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("tbody", { className: "divide-y divide-slate-100 dark:divide-slate-800", children: entries.map((entry, idx) => {
        const isCancelled = (entry.status || "").toUpperCase() === "CANCELLED" || (entry.bill_status || "").toUpperCase() === "CANCELLED";
        return /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)(
          "tr",
          {
            className: cn(
              "hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors",
              isCancelled && "opacity-45 bg-slate-50/30 line-through"
            ),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("td", { className: "px-4 py-3 whitespace-nowrap text-slate-600 dark:text-slate-300 font-mono", children: formatDate(entry.date) }),
              /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("td", { className: "px-4 py-3", children: /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)("div", { className: "font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-1.5", children: [
                /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("span", { children: entry.description }),
                (entry.reference_id || entry.grn_id) && (onReferenceClick || onGRNClick) && /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      const refId = entry.reference_id || entry.grn_id;
                      if (onReferenceClick) onReferenceClick(refId);
                      else if (onGRNClick) onGRNClick(refId);
                    },
                    className: "text-indigo-600 hover:text-indigo-800 dark:text-indigo-400",
                    children: /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(import_lucide_react25.ExternalLink, { className: "h-3 w-3 inline" })
                  }
                )
              ] }) }),
              /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("td", { className: "px-3 py-3 text-center", children: /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(
                "span",
                {
                  className: cn(
                    "inline-block rounded px-2 py-0.5 text-[10px] font-extrabold",
                    entry.type === "DR" ? "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300" : "bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300"
                  ),
                  children: entry.type
                }
              ) }),
              /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("td", { className: "px-4 py-3 text-right font-mono font-semibold text-slate-800 dark:text-slate-200", children: entry.type === "DR" ? fmt(entry.amount) : "\u2014" }),
              /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("td", { className: "px-4 py-3 text-right font-mono font-semibold text-slate-800 dark:text-slate-200", children: entry.type === "CR" ? fmt(entry.amount) : "\u2014" }),
              /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("td", { className: "px-3 py-3 text-center", children: entry.bill_status || entry.status ? /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(
                "span",
                {
                  className: cn(
                    "inline-block rounded px-2 py-0.5 text-[10px] font-bold",
                    getBillBadgeStyle(entry.bill_status || entry.status || "")
                  ),
                  children: (entry.bill_status || entry.status)?.replace("_", " ")
                }
              ) : "Active" })
            ]
          },
          entry.key || idx
        );
      }) })
    ] }) }),
    showFooter && /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)("div", { className: "grid grid-cols-1 gap-3 sm:grid-cols-3", children: [
      /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)("div", { className: "rounded-xl border border-slate-200/80 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900 shadow-xs", children: [
        /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("span", { className: "text-[11px] font-semibold uppercase tracking-wider text-slate-400 block", children: "Total Debits (DR)" }),
        /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("span", { className: "text-base font-extrabold text-slate-900 dark:text-slate-100 font-mono", children: fmt(effectiveDR) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)("div", { className: "rounded-xl border border-slate-200/80 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900 shadow-xs", children: [
        /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("span", { className: "text-[11px] font-semibold uppercase tracking-wider text-slate-400 block", children: "Total Credits (CR)" }),
        /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("span", { className: "text-base font-extrabold text-slate-900 dark:text-slate-100 font-mono", children: fmt(effectiveCR) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)("div", { className: "rounded-xl border border-indigo-200/80 bg-indigo-50/50 p-3.5 dark:border-indigo-900/50 dark:bg-indigo-950/40 shadow-xs", children: [
        /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("span", { className: "text-[11px] font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block", children: netLabel }),
        /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("span", { className: "text-base font-extrabold text-indigo-700 dark:text-indigo-300 font-mono", children: fmt(effectiveNet) })
      ] })
    ] })
  ] });
}

// src/components/ui/data-display/pipeline-kanban.tsx
var import_lucide_react26 = require("lucide-react");
var import_jsx_runtime57 = require("react/jsx-runtime");
function PipelineKanban({
  columns = [],
  onCardClick,
  onAddCard,
  emptyMessage = "No items",
  className,
  ...props
}) {
  const getHeaderTone = (tone) => {
    switch (tone) {
      case "emerald":
        return "border-emerald-500 text-emerald-700 dark:text-emerald-300";
      case "amber":
        return "border-amber-500 text-amber-700 dark:text-amber-300";
      case "rose":
        return "border-rose-500 text-rose-700 dark:text-rose-300";
      case "purple":
        return "border-purple-500 text-purple-700 dark:text-purple-300";
      case "indigo":
        return "border-indigo-500 text-indigo-700 dark:text-indigo-300";
      default:
        return "border-slate-400 text-slate-700 dark:text-slate-300";
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime57.jsx)(
    "div",
    {
      className: cn("flex gap-4 overflow-x-auto pb-4 custom-scrollbar", className),
      ...props,
      children: columns.map((col) => {
        const displayCount = col.count !== void 0 ? col.count : col.items.length;
        const colEmptyMessage = col.emptyMessage ?? emptyMessage;
        return /* @__PURE__ */ (0, import_jsx_runtime57.jsxs)(
          "div",
          {
            className: "flex flex-col min-w-[280px] max-w-[320px] shrink-0 rounded-xl border border-slate-200/80 bg-slate-50/50 p-3 dark:border-slate-800 dark:bg-slate-900/40",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime57.jsxs)("div", { className: "flex items-center justify-between pb-3 mb-2 border-b border-slate-200/60 dark:border-slate-800", children: [
                /* @__PURE__ */ (0, import_jsx_runtime57.jsxs)("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime57.jsx)(
                    "span",
                    {
                      className: cn(
                        "border-l-[3px] pl-2 font-bold text-xs uppercase tracking-wider",
                        getHeaderTone(col.tone)
                      ),
                      children: col.title
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("span", { className: "rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300", children: displayCount })
                ] }),
                onAddCard && /* @__PURE__ */ (0, import_jsx_runtime57.jsx)(
                  "button",
                  {
                    type: "button",
                    onClick: () => onAddCard(col.id),
                    className: "rounded p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-800",
                    "aria-label": `Add item to ${col.title}`,
                    children: /* @__PURE__ */ (0, import_jsx_runtime57.jsx)(import_lucide_react26.Plus, { className: "h-3.5 w-3.5" })
                  }
                )
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime57.jsxs)("div", { className: "space-y-2.5 flex-1 min-h-32", children: [
                col.items.map((item) => {
                  const metricBadge = item.scoreLabel ?? (item.score !== void 0 ? `${item.score}%` : null);
                  return /* @__PURE__ */ (0, import_jsx_runtime57.jsxs)(
                    "div",
                    {
                      role: "button",
                      tabIndex: 0,
                      onClick: () => onCardClick?.(item, col.id),
                      onKeyDown: (e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          onCardClick?.(item, col.id);
                        }
                      },
                      className: "cursor-pointer rounded-lg border border-slate-200/80 bg-white p-3 shadow-2xs transition-all hover:border-indigo-400 hover:shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:border-slate-800 dark:bg-slate-900",
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime57.jsxs)("div", { className: "flex items-start justify-between gap-2", children: [
                          /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("h5", { className: "text-xs font-bold text-slate-900 dark:text-slate-100 line-clamp-1", children: item.title }),
                          metricBadge ? /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("span", { className: "rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-extrabold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300", children: metricBadge }) : null
                        ] }),
                        item.subtitle ? /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("p", { className: "mt-1 text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1", children: item.subtitle }) : null,
                        item.tag ? /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("div", { className: "mt-2 flex items-center justify-between", children: /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("span", { className: "rounded bg-slate-100 px-1.5 py-0.5 text-[9px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300", children: item.tag }) }) : null
                      ]
                    },
                    item.id
                  );
                }),
                col.items.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("div", { className: "flex h-24 items-center justify-center rounded-lg border border-dashed border-slate-200 text-center text-xs text-slate-400 dark:border-slate-800", children: colEmptyMessage })
              ] })
            ]
          },
          col.id
        );
      })
    }
  );
}

// src/components/ui/data-display/proof-of-work-card.tsx
var import_lucide_react27 = require("lucide-react");
var import_jsx_runtime58 = require("react/jsx-runtime");
function ProofOfWorkCard({
  item,
  className,
  ...props
}) {
  const getIcon = () => {
    if (item.icon) return item.icon;
    switch (item.type) {
      case "github":
        return /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(import_lucide_react27.GitPullRequest, { className: "h-4 w-4 text-purple-500" });
      case "certificate":
        return /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(import_lucide_react27.Award, { className: "h-4 w-4 text-amber-500" });
      default:
        return /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(import_lucide_react27.ShieldCheck, { className: "h-4 w-4 text-emerald-500" });
    }
  };
  const metricBadge = item.metricLabel ?? (item.score !== void 0 ? `${item.score}/${item.maxScore ?? 100}` : null);
  return /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)(Card, { className: cn("p-4 space-y-2.5 transition-all duration-200 hover:border-indigo-400 dark:hover:border-indigo-500", className), ...props, children: [
    /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)("div", { className: "flex items-start justify-between gap-3", children: [
      /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("div", { className: "flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800", children: getIcon() }),
        /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)("h4", { className: "text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-1.5", children: [
            /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("span", { children: item.title }),
            item.verified && /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(import_lucide_react27.CheckCircle2, { className: "h-3.5 w-3.5 text-emerald-500 inline shrink-0" })
          ] }),
          item.type ? /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("span", { className: "text-[11px] font-medium text-slate-400 capitalize", children: item.type.replace(/_/g, " ") }) : null
        ] })
      ] }),
      metricBadge ? /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("span", { className: "rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800", children: metricBadge }) : null
    ] }),
    item.description ? /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("p", { className: "text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed", children: item.description }) : null,
    /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)("div", { className: "flex items-center justify-between pt-1", children: [
      /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("div", { className: "flex flex-wrap gap-1", children: item.tags?.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(
        "span",
        {
          className: "rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300",
          children: tag
        },
        tag
      )) }),
      item.linkUrl && /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)(
        "a",
        {
          href: item.linkUrl,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("span", { children: item.linkLabel ?? "View Artifact" }),
            /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(import_lucide_react27.ExternalLink, { className: "h-3 w-3" })
          ]
        }
      )
    ] })
  ] });
}
var MetricVerificationCard = ProofOfWorkCard;

// src/components/ui/data-display/radar-sweep.tsx
var import_jsx_runtime59 = require("react/jsx-runtime");
function RadarSweep({
  size = 320,
  blips = [],
  isScanning = true,
  statusText = "AI Radar Active",
  className,
  "aria-label": ariaLabel,
  ...props
}) {
  const countSuffix = blips.length === 1 ? "" : "s";
  const defaultStatus = statusText ? `${statusText}, ${blips.length} target${countSuffix} detected` : "Radar sweep display";
  const accessibleLabel = ariaLabel || defaultStatus;
  const getBlipColor = (tone) => {
    switch (tone) {
      case "emerald":
        return "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]";
      case "amber":
        return "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]";
      case "rose":
        return "bg-rose-400 shadow-[0_0_8px_rgba(248,113,113,0.8)]";
      case "indigo":
        return "bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.8)]";
      case "purple":
        return "bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.8)]";
      case "cyan":
        return "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]";
      default:
        return "bg-primary shadow-[0_0_8px_var(--primary)]";
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(
    "div",
    {
      className: cn("relative flex flex-col items-center justify-center p-4", className),
      ...props,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(
          "div",
          {
            role: "img",
            "aria-label": accessibleLabel,
            className: "relative overflow-hidden rounded-full border border-indigo-500/20 bg-slate-950/80 shadow-2xl backdrop-blur-md",
            style: { width: size, height: size },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { className: "absolute inset-[15%] rounded-full border border-indigo-500/15" }),
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { className: "absolute inset-[35%] rounded-full border border-indigo-500/15" }),
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { className: "absolute inset-[55%] rounded-full border border-indigo-500/15" }),
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { className: "absolute inset-[75%] rounded-full border border-indigo-500/15" }),
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { className: "absolute left-1/2 top-0 bottom-0 w-px bg-indigo-500/15 -translate-x-1/2" }),
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { className: "absolute top-1/2 left-0 right-0 h-px bg-indigo-500/15 -translate-y-1/2" }),
              isScanning && /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
                "div",
                {
                  className: "absolute inset-0 origin-center animate-[spin_4s_linear_infinite]",
                  style: {
                    background: "conic-gradient(from 0deg at 50% 50%, transparent 0deg, color-mix(in srgb, var(--primary) 25%, transparent) 60deg, transparent 60.1deg)"
                  }
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { className: "absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_10px_var(--primary)]" }),
              blips.map((blip) => /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(
                "div",
                {
                  className: "group absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10",
                  style: { left: `${blip.x}%`, top: `${blip.y}%` },
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
                      "div",
                      {
                        className: cn(
                          "h-2.5 w-2.5 rounded-full transition-transform hover:scale-150",
                          getBlipColor(blip.tone),
                          blip.pulse && "animate-ping"
                        )
                      }
                    ),
                    blip.label ? /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 hidden whitespace-nowrap rounded bg-slate-900/90 px-1.5 py-0.5 text-[10px] font-semibold text-white shadow-md group-hover:inline-block border border-slate-700", children: blip.label }) : null
                  ]
                },
                blip.id
              ))
            ]
          }
        ),
        statusText ? /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { className: "mt-3 flex items-center gap-2 text-xs font-semibold tracking-wide text-indigo-600 dark:text-indigo-400", children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { className: "h-2 w-2 rounded-full bg-emerald-500 animate-pulse" }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { children: statusText })
        ] }) : null
      ]
    }
  );
}

// src/components/ui/data-display/salary-range-display.tsx
var import_jsx_runtime60 = require("react/jsx-runtime");
function formatRangeString(min, max, currency = "$", unit = "") {
  if (min !== void 0 && max !== void 0) {
    return `${currency}${min}${unit} - ${currency}${max}${unit}`;
  }
  if (min !== void 0) {
    return `${currency}${min}${unit}+`;
  }
  if (max !== void 0) {
    return `Up to ${currency}${max}${unit}`;
  }
  return "Competitive";
}
function resolveBreakdownItems(items, breakdown, currencySymbol = "$", effectiveUnit = "") {
  if (items && items.length > 0) return items;
  if (breakdown?.items && breakdown.items.length > 0) return breakdown.items;
  if (!breakdown) return [];
  const list = [];
  const fixed = breakdown.fixed;
  if (fixed !== void 0) {
    list.push({
      label: "Fixed",
      value: `${currencySymbol}${fixed}${effectiveUnit}`,
      colorClass: "text-slate-800 dark:text-slate-200"
    });
  }
  const variable = breakdown.variable;
  if (variable !== void 0) {
    list.push({
      label: "Variable",
      value: `${currencySymbol}${variable}${effectiveUnit}`,
      colorClass: "text-indigo-600 dark:text-indigo-400"
    });
  }
  const equity = breakdown.equity;
  if (equity !== void 0) {
    list.push({
      label: "Equity",
      value: `${currencySymbol}${equity}${effectiveUnit}`,
      colorClass: "text-purple-600 dark:text-purple-400"
    });
  }
  return list;
}
function SalaryRangeDisplay({
  min,
  max,
  currencySymbol = "$",
  unit = "",
  period = "yr",
  label = "Compensation Range",
  breakdown,
  items,
  variant = "badge",
  className,
  ...props
}) {
  const formattedRange = formatRangeString(min, max, currencySymbol, unit);
  if (variant === "badge") {
    return /* @__PURE__ */ (0, import_jsx_runtime60.jsxs)(
      "span",
      {
        className: cn(
          "inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 border border-emerald-200/60 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800",
          className
        ),
        ...props,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime60.jsx)("span", { children: formattedRange }),
          period ? /* @__PURE__ */ (0, import_jsx_runtime60.jsx)("span", { className: "text-[10px] font-medium opacity-75", children: period }) : null
        ]
      }
    );
  }
  const resolvedItems = resolveBreakdownItems(items, breakdown, currencySymbol, unit);
  return /* @__PURE__ */ (0, import_jsx_runtime60.jsxs)(
    "div",
    {
      className: cn(
        "rounded-xl border border-slate-200/80 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 shadow-xs space-y-2",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime60.jsxs)("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ (0, import_jsx_runtime60.jsx)("span", { className: "text-xs font-semibold text-slate-500 dark:text-slate-400", children: label }),
          /* @__PURE__ */ (0, import_jsx_runtime60.jsxs)("span", { className: "text-sm font-extrabold text-emerald-600 dark:text-emerald-400", children: [
            formattedRange,
            " ",
            period
          ] })
        ] }),
        resolvedItems.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime60.jsx)(
          "div",
          {
            className: cn(
              "grid gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-center",
              resolvedItems.length === 2 ? "grid-cols-2" : "grid-cols-3"
            ),
            children: resolvedItems.map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime60.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime60.jsx)("span", { className: "block text-[10px] uppercase font-bold text-slate-400", children: item.label }),
              /* @__PURE__ */ (0, import_jsx_runtime60.jsx)("span", { className: cn("text-xs font-bold", item.colorClass ?? "text-slate-800 dark:text-slate-200"), children: item.value })
            ] }, idx))
          }
        ) : null
      ]
    }
  );
}
var MetricRangeDisplay = SalaryRangeDisplay;
var CompensationRangeDisplay = SalaryRangeDisplay;

// src/components/ui/data-display/status-badge.tsx
var import_jsx_runtime61 = require("react/jsx-runtime");
var STATUS_CONFIG = {
  // ── Generic ───────────────────────────────────────────────────────────
  pending: { label: "Pending", dot: "bg-amber-400", bg: "bg-amber-50  dark:bg-amber-950/30", text: "text-amber-700  dark:text-amber-400", border: "border-amber-200  dark:border-amber-800" },
  active: { label: "Active", dot: "bg-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/30", text: "text-emerald-700 dark:text-emerald-400", border: "border-emerald-200 dark:border-emerald-800" },
  inactive: { label: "Inactive", dot: "bg-slate-400", bg: "bg-slate-100  dark:bg-slate-800/50", text: "text-slate-600  dark:text-slate-400", border: "border-slate-200  dark:border-slate-700" },
  // Suspended: orange — account is blocked/frozen (not just idle like inactive)
  suspended: { label: "Suspended", dot: "bg-orange-500", bg: "bg-orange-50  dark:bg-orange-950/30", text: "text-orange-700 dark:text-orange-400", border: "border-orange-200 dark:border-orange-800" },
  draft: { label: "Draft", dot: "bg-slate-400", bg: "bg-slate-100  dark:bg-slate-800/50", text: "text-slate-600  dark:text-slate-400", border: "border-slate-200  dark:border-slate-700" },
  completed: { label: "Completed", dot: "bg-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/30", text: "text-emerald-700 dark:text-emerald-400", border: "border-emerald-200 dark:border-emerald-800" },
  cancelled: { label: "Cancelled", dot: "bg-red-400", bg: "bg-red-50     dark:bg-red-950/30", text: "text-red-700    dark:text-red-400", border: "border-red-200    dark:border-red-800" },
  rejected: { label: "Rejected", dot: "bg-red-500", bg: "bg-red-50     dark:bg-red-950/30", text: "text-red-700    dark:text-red-400", border: "border-red-200    dark:border-red-800" },
  approved: { label: "Approved", dot: "bg-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/30", text: "text-emerald-700 dark:text-emerald-400", border: "border-emerald-200 dark:border-emerald-800" },
  in_progress: { label: "In Progress", dot: "bg-blue-500", bg: "bg-blue-50    dark:bg-blue-950/30", text: "text-blue-700   dark:text-blue-400", border: "border-blue-200   dark:border-blue-800" },
  overdue: { label: "Overdue", dot: "bg-red-500", bg: "bg-red-50     dark:bg-red-950/30", text: "text-red-700    dark:text-red-400", border: "border-red-200    dark:border-red-800" },
  on_hold: { label: "On Hold", dot: "bg-orange-400", bg: "bg-orange-50  dark:bg-orange-950/30", text: "text-orange-700 dark:text-orange-400", border: "border-orange-200 dark:border-orange-800" },
  // ── Order / PO ────────────────────────────────────────────────────────
  confirmed: { label: "Confirmed", dot: "bg-blue-500", bg: "bg-blue-50    dark:bg-blue-950/30", text: "text-blue-700   dark:text-blue-400", border: "border-blue-200   dark:border-blue-800" },
  dispatched: { label: "Dispatched", dot: "bg-indigo-500", bg: "bg-indigo-50  dark:bg-indigo-950/30", text: "text-indigo-700 dark:text-indigo-400", border: "border-indigo-200 dark:border-indigo-800" },
  delivered: { label: "Delivered", dot: "bg-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/30", text: "text-emerald-700 dark:text-emerald-400", border: "border-emerald-200 dark:border-emerald-800" },
  partially_delivered: { label: "Partial Delivery", dot: "bg-amber-400", bg: "bg-amber-50   dark:bg-amber-950/30", text: "text-amber-700  dark:text-amber-400", border: "border-amber-200  dark:border-amber-800" },
  returned: { label: "Returned", dot: "bg-orange-500", bg: "bg-orange-50  dark:bg-orange-950/30", text: "text-orange-700 dark:text-orange-400", border: "border-orange-200 dark:border-orange-800" },
  // ── Payment ───────────────────────────────────────────────────────────
  paid: { label: "Paid", dot: "bg-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/30", text: "text-emerald-700 dark:text-emerald-400", border: "border-emerald-200 dark:border-emerald-800" },
  unpaid: { label: "Unpaid", dot: "bg-red-400", bg: "bg-red-50     dark:bg-red-950/30", text: "text-red-700    dark:text-red-400", border: "border-red-200    dark:border-red-800" },
  overdue_payment: { label: "Overdue", dot: "bg-red-600", bg: "bg-red-50     dark:bg-red-950/30", text: "text-red-800    dark:text-red-300", border: "border-red-300    dark:border-red-700" },
  partially_paid: { label: "Partially Paid", dot: "bg-amber-400", bg: "bg-amber-50   dark:bg-amber-950/30", text: "text-amber-700  dark:text-amber-400", border: "border-amber-200  dark:border-amber-800" },
  // ── GRN ───────────────────────────────────────────────────────────────
  accepted: { label: "Accepted", dot: "bg-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/30", text: "text-emerald-700 dark:text-emerald-400", border: "border-emerald-200 dark:border-emerald-800" },
  partially_accepted: { label: "Partial Accept", dot: "bg-amber-400", bg: "bg-amber-50   dark:bg-amber-950/30", text: "text-amber-700  dark:text-amber-400", border: "border-amber-200  dark:border-amber-800" },
  grn_pending: { label: "GRN Pending", dot: "bg-amber-400", bg: "bg-amber-50   dark:bg-amber-950/30", text: "text-amber-700  dark:text-amber-400", border: "border-amber-200  dark:border-amber-800" },
  // ── RFQ ───────────────────────────────────────────────────────────────
  open: { label: "Open", dot: "bg-blue-500", bg: "bg-blue-50    dark:bg-blue-950/30", text: "text-blue-700   dark:text-blue-400", border: "border-blue-200   dark:border-blue-800" },
  closed: { label: "Closed", dot: "bg-slate-500", bg: "bg-slate-100  dark:bg-slate-800/50", text: "text-slate-600  dark:text-slate-400", border: "border-slate-200  dark:border-slate-700" },
  awarded: { label: "Awarded", dot: "bg-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/30", text: "text-emerald-700 dark:text-emerald-400", border: "border-emerald-200 dark:border-emerald-800" },
  expired: { label: "Expired", dot: "bg-slate-400", bg: "bg-slate-100  dark:bg-slate-800/50", text: "text-slate-600  dark:text-slate-400", border: "border-slate-200  dark:border-slate-700" },
  // ── Dispute ───────────────────────────────────────────────────────────
  under_review: { label: "Under Review", dot: "bg-purple-500", bg: "bg-purple-50  dark:bg-purple-950/30", text: "text-purple-700 dark:text-purple-400", border: "border-purple-200 dark:border-purple-800" },
  resolved: { label: "Resolved", dot: "bg-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/30", text: "text-emerald-700 dark:text-emerald-400", border: "border-emerald-200 dark:border-emerald-800" },
  escalated: { label: "Escalated", dot: "bg-red-600", bg: "bg-red-50     dark:bg-red-950/30", text: "text-red-800    dark:text-red-300", border: "border-red-300    dark:border-red-700" },
  // ── Document ──────────────────────────────────────────────────────────
  uploaded: { label: "Uploaded", dot: "bg-blue-400", bg: "bg-blue-50    dark:bg-blue-950/30", text: "text-blue-700   dark:text-blue-400", border: "border-blue-200   dark:border-blue-800" },
  verified: { label: "Verified", dot: "bg-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/30", text: "text-emerald-700 dark:text-emerald-400", border: "border-emerald-200 dark:border-emerald-800" },
  expired_doc: { label: "Expired", dot: "bg-red-400", bg: "bg-red-50     dark:bg-red-950/30", text: "text-red-700    dark:text-red-400", border: "border-red-200    dark:border-red-800" }
};
function StatusBadge({
  status,
  label,
  className,
  showDot = true,
  size = "default"
}) {
  const config = STATUS_CONFIG[status];
  if (!config) {
    return /* @__PURE__ */ (0, import_jsx_runtime61.jsxs)(
      "span",
      {
        className: cn(
          "inline-flex items-center gap-1.5 rounded-full border px-2.5 font-medium",
          size === "sm" ? "py-0.5 text-xs" : "py-1 text-xs",
          "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800/50 dark:text-slate-400 dark:border-slate-700",
          className
        ),
        children: [
          showDot && /* @__PURE__ */ (0, import_jsx_runtime61.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0" }),
          label ?? status
        ]
      }
    );
  }
  return /* @__PURE__ */ (0, import_jsx_runtime61.jsxs)(
    "span",
    {
      className: cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 font-medium",
        size === "sm" ? "py-0.5 text-xs" : "py-1 text-xs",
        config.bg,
        config.text,
        config.border,
        className
      ),
      children: [
        showDot && /* @__PURE__ */ (0, import_jsx_runtime61.jsx)("span", { className: cn("h-1.5 w-1.5 rounded-full shrink-0", config.dot) }),
        label ?? config.label
      ]
    }
  );
}

// src/components/ui/data-display/timeline.tsx
var React42 = __toESM(require("react"), 1);
var import_lucide_react28 = require("lucide-react");
var import_jsx_runtime62 = require("react/jsx-runtime");
function renderTimelineIcon(item, status) {
  if (item.icon) {
    return item.icon;
  }
  if (status === "success") {
    return /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(import_lucide_react28.CheckCircle2, { className: "h-3.5 w-3.5" });
  }
  if (status === "warning" || status === "destructive") {
    return /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(import_lucide_react28.AlertCircle, { className: "h-3.5 w-3.5" });
  }
  if (status === "info") {
    return /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(import_lucide_react28.Info, { className: "h-3.5 w-3.5" });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(import_lucide_react28.Circle, { className: "h-2 w-2 fill-current" });
}
var Timeline = React42.forwardRef(
  ({ items, className, ...props }, ref) => {
    return /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(
      "div",
      {
        ref,
        role: "feed",
        "aria-label": "Activity timeline",
        className: cn("relative space-y-6 pl-6", className),
        ...props,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime62.jsx)("div", { className: "absolute left-2.5 top-3 bottom-3 w-[2px] -translate-x-1/2 bg-border" }),
          items.map((item, index) => {
            const status = item.status || "default";
            return /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(
              "div",
              {
                className: "relative flex items-start group",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(
                    "div",
                    {
                      className: cn(
                        "absolute -left-6 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-background border ring-4 ring-background z-10",
                        status === "default" && "border-border text-muted-foreground",
                        status === "success" && "border-emerald-500 text-emerald-500",
                        status === "warning" && "border-amber-500 text-amber-500",
                        status === "destructive" && "border-destructive text-destructive",
                        status === "info" && "border-blue-500 text-blue-500"
                      ),
                      children: renderTimelineIcon(item, status)
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)("div", { className: "flex-1 space-y-1", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)("div", { className: "flex items-center justify-between gap-2", children: [
                      /* @__PURE__ */ (0, import_jsx_runtime62.jsx)("h4", { className: "text-sm font-medium text-foreground leading-tight", children: item.title }),
                      item.timestamp && /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)("span", { className: "flex items-center gap-1 text-xs text-muted-foreground whitespace-nowrap", children: [
                        /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(import_lucide_react28.Clock, { className: "h-3 w-3" }),
                        item.timestamp
                      ] })
                    ] }),
                    item.description && /* @__PURE__ */ (0, import_jsx_runtime62.jsx)("div", { className: "text-xs text-muted-foreground leading-relaxed", children: item.description })
                  ] })
                ]
              },
              item.id || index
            );
          })
        ]
      }
    );
  }
);
Timeline.displayName = "Timeline";

// src/components/ui/navigation/breadcrumb.tsx
var React43 = __toESM(require("react"), 1);
var import_react_slot4 = require("@radix-ui/react-slot");
var import_lucide_react29 = require("lucide-react");
var import_jsx_runtime63 = require("react/jsx-runtime");
var Breadcrumb = React43.forwardRef(({ ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime63.jsx)("nav", { ref, "aria-label": "breadcrumb", ...props }));
Breadcrumb.displayName = "Breadcrumb";
var BreadcrumbList = React43.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime63.jsx)(
  "ol",
  {
    ref,
    className: cn(
      "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
      className
    ),
    ...props
  }
));
BreadcrumbList.displayName = "BreadcrumbList";
var BreadcrumbItem = React43.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime63.jsx)(
  "li",
  {
    ref,
    className: cn("inline-flex items-center gap-1.5", className),
    ...props
  }
));
BreadcrumbItem.displayName = "BreadcrumbItem";
var BreadcrumbLink = React43.forwardRef(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? import_react_slot4.Slot : "a";
  return /* @__PURE__ */ (0, import_jsx_runtime63.jsx)(
    Comp,
    {
      ref,
      className: cn("transition-colors hover:text-foreground", className),
      ...props
    }
  );
});
BreadcrumbLink.displayName = "BreadcrumbLink";
var BreadcrumbPage = React43.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime63.jsx)(
  "span",
  {
    ref,
    role: "link",
    "aria-disabled": "true",
    "aria-current": "page",
    className: cn("font-normal text-foreground", className),
    ...props
  }
));
BreadcrumbPage.displayName = "BreadcrumbPage";
var BreadcrumbSeparator = ({
  children,
  className,
  ...props
}) => /* @__PURE__ */ (0, import_jsx_runtime63.jsx)(
  "li",
  {
    role: "presentation",
    "aria-hidden": "true",
    className: cn("[&>svg]:w-3.5 [&>svg]:h-3.5", className),
    ...props,
    children: children ?? /* @__PURE__ */ (0, import_jsx_runtime63.jsx)(import_lucide_react29.ChevronRight, {})
  }
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";
var BreadcrumbEllipsis = ({
  className,
  ...props
}) => /* @__PURE__ */ (0, import_jsx_runtime63.jsxs)(
  "span",
  {
    role: "presentation",
    "aria-hidden": "true",
    className: cn("flex h-9 w-9 items-center justify-center", className),
    ...props,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime63.jsx)(import_lucide_react29.MoreHorizontal, { className: "h-4 w-4" }),
      /* @__PURE__ */ (0, import_jsx_runtime63.jsx)("span", { className: "sr-only", children: "More" })
    ]
  }
);
BreadcrumbEllipsis.displayName = "BreadcrumbElipssis";

// src/components/ui/navigation/menubar.tsx
var React44 = __toESM(require("react"), 1);
var MenubarPrimitive = __toESM(require("@radix-ui/react-menubar"), 1);
var import_lucide_react30 = require("lucide-react");
var import_jsx_runtime64 = require("react/jsx-runtime");
function MenubarMenu({
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(MenubarPrimitive.Menu, { ...props });
}
function MenubarGroup({
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(MenubarPrimitive.Group, { ...props });
}
function MenubarPortal({
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(MenubarPrimitive.Portal, { ...props });
}
function MenubarRadioGroup({
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(MenubarPrimitive.RadioGroup, { ...props });
}
function MenubarSub({
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(MenubarPrimitive.Sub, { "data-slot": "menubar-sub", ...props });
}
var Menubar = React44.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(
  MenubarPrimitive.Root,
  {
    ref,
    className: cn(
      "flex h-9 items-center space-x-1 rounded-md border bg-background p-1 shadow-sm",
      className
    ),
    ...props
  }
));
Menubar.displayName = MenubarPrimitive.Root.displayName;
var MenubarTrigger = React44.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(
  MenubarPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center rounded-sm px-3 py-1 text-sm font-medium outline-none",
      // Phase 5 fix: explicit hover state (previously only focus/open were styled)
      "hover:bg-accent hover:text-accent-foreground",
      "focus:bg-accent focus:text-accent-foreground",
      "data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      className
    ),
    ...props
  }
));
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName;
var MenubarSubTrigger = React44.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime64.jsxs)(
  MenubarPrimitive.SubTrigger,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(import_lucide_react30.ChevronRight, { className: "ml-auto h-4 w-4" })
    ]
  }
));
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName;
var MenubarSubContent = React44.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(
  MenubarPrimitive.SubContent,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-menubar-content-transform-origin]",
      className
    ),
    ...props
  }
));
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName;
var MenubarContent = React44.forwardRef(
  ({ className, align = "start", alignOffset = -4, sideOffset = 8, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(MenubarPrimitive.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(
    MenubarPrimitive.Content,
    {
      ref,
      align,
      alignOffset,
      sideOffset,
      className: cn(
        "z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-menubar-content-transform-origin]",
        className
      ),
      ...props
    }
  ) })
);
MenubarContent.displayName = MenubarPrimitive.Content.displayName;
var MenubarItem = React44.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(
  MenubarPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
MenubarItem.displayName = MenubarPrimitive.Item.displayName;
var MenubarCheckboxItem = React44.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime64.jsxs)(
  MenubarPrimitive.CheckboxItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...checked !== void 0 ? { checked } : {},
    ...props,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime64.jsx)("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(MenubarPrimitive.ItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(import_lucide_react30.Check, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName;
var MenubarRadioItem = React44.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime64.jsxs)(
  MenubarPrimitive.RadioItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime64.jsx)("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(MenubarPrimitive.ItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(import_lucide_react30.Circle, { className: "h-4 w-4 fill-current" }) }) }),
      children
    ]
  }
));
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName;
var MenubarLabel = React44.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(
  MenubarPrimitive.Label,
  {
    ref,
    className: cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
MenubarLabel.displayName = MenubarPrimitive.Label.displayName;
var MenubarSeparator = React44.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(
  MenubarPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName;
var MenubarShortcut = ({
  className,
  ...props
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(
    "span",
    {
      className: cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      ),
      ...props
    }
  );
};
MenubarShortcut.displayname = "MenubarShortcut";

// src/components/ui/navigation/navigation-menu.tsx
var React45 = __toESM(require("react"), 1);
var NavigationMenuPrimitive = __toESM(require("@radix-ui/react-navigation-menu"), 1);
var import_class_variance_authority10 = require("class-variance-authority");
var import_lucide_react31 = require("lucide-react");
var import_jsx_runtime65 = require("react/jsx-runtime");
var NavigationMenu = React45.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime65.jsxs)(
  NavigationMenuPrimitive.Root,
  {
    ref,
    className: cn(
      "relative z-10 flex max-w-max flex-1 items-center justify-center",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ (0, import_jsx_runtime65.jsx)(NavigationMenuViewport, {})
    ]
  }
));
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;
var NavigationMenuList = React45.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime65.jsx)(
  NavigationMenuPrimitive.List,
  {
    ref,
    className: cn(
      "group flex flex-1 list-none items-center justify-center space-x-1",
      className
    ),
    ...props
  }
));
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;
var NavigationMenuItem = NavigationMenuPrimitive.Item;
var navigationMenuTriggerStyle = (0, import_class_variance_authority10.cva)(
  "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=open]:text-accent-foreground data-[state=open]:bg-accent/50 data-[state=open]:hover:bg-accent data-[state=open]:focus:bg-accent"
);
var NavigationMenuTrigger = React45.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime65.jsxs)(
  NavigationMenuPrimitive.Trigger,
  {
    ref,
    className: cn(navigationMenuTriggerStyle(), "group", className),
    ...props,
    children: [
      children,
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime65.jsx)(
        import_lucide_react31.ChevronDown,
        {
          className: "relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180",
          "aria-hidden": "true"
        }
      )
    ]
  }
));
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;
var NavigationMenuContent = React45.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime65.jsx)(
  NavigationMenuPrimitive.Content,
  {
    ref,
    className: cn(
      "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto ",
      className
    ),
    ...props
  }
));
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;
var NavigationMenuLink = NavigationMenuPrimitive.Link;
var NavigationMenuViewport = React45.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime65.jsx)("div", { className: cn("absolute left-0 top-full flex justify-center"), children: /* @__PURE__ */ (0, import_jsx_runtime65.jsx)(
  NavigationMenuPrimitive.Viewport,
  {
    className: cn(
      "origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]",
      className
    ),
    ref,
    ...props
  }
) }));
NavigationMenuViewport.displayName = NavigationMenuPrimitive.Viewport.displayName;
var NavigationMenuIndicator = React45.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime65.jsx)(
  NavigationMenuPrimitive.Indicator,
  {
    ref,
    className: cn(
      "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
      className
    ),
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime65.jsx)("div", { className: "relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" })
  }
));
NavigationMenuIndicator.displayName = NavigationMenuPrimitive.Indicator.displayName;

// src/components/ui/navigation/onboarding-panel.tsx
var import_lucide_react33 = require("lucide-react");

// src/components/ui/navigation/stepper.tsx
var React46 = __toESM(require("react"), 1);
var import_lucide_react32 = require("lucide-react");
var import_jsx_runtime66 = require("react/jsx-runtime");
function renderStepMarker(step, index, isCompleted) {
  if (step.isError) {
    return /* @__PURE__ */ (0, import_jsx_runtime66.jsx)(import_lucide_react32.AlertCircle, { className: "h-4 w-4" });
  }
  if (isCompleted) {
    return /* @__PURE__ */ (0, import_jsx_runtime66.jsx)(import_lucide_react32.Check, { className: "h-4 w-4 stroke-[2.5]" });
  }
  if (step.icon) {
    return step.icon;
  }
  return index + 1;
}
function getCircleVariantClass(isCompleted, isActive, isUpcoming, isError) {
  if (isError) return "border-destructive bg-destructive text-destructive-foreground";
  if (isCompleted) return "border-primary bg-primary text-primary-foreground";
  if (isActive) return "border-primary bg-background text-primary ring-2 ring-primary/20 ring-offset-2";
  if (isUpcoming) return "border-border bg-muted text-muted-foreground";
  return "";
}
function StepLabelContent({
  title,
  description,
  isActive,
  isError,
  isVertical
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime66.jsxs)(
    "div",
    {
      className: cn(
        "flex flex-col",
        isVertical ? "min-w-0 pb-6" : "mt-2 px-1 max-w-[140px]"
      ),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime66.jsx)(
          "span",
          {
            className: cn(
              "text-xs font-medium truncate",
              isActive ? "text-foreground font-semibold" : "text-muted-foreground",
              isError && "text-destructive font-semibold"
            ),
            children: title
          }
        ),
        description && /* @__PURE__ */ (0, import_jsx_runtime66.jsx)("span", { className: "text-[11px] text-muted-foreground mt-0.5 line-clamp-2 leading-tight", children: description })
      ]
    }
  );
}
function StepRow({
  step,
  index,
  activeStep,
  stepsCount,
  isVertical,
  clickable,
  onStepClick,
  renderStepMarker: renderStepMarker2
}) {
  const isCompleted = index < activeStep;
  const isActive = index === activeStep;
  const isUpcoming = index > activeStep;
  const isError = Boolean(step.isError);
  const isClickable = Boolean(clickable && onStepClick && !isError);
  const isLast = index === stepsCount - 1;
  const currentLabel = isActive ? " (current step)" : "";
  const accessibleLabel = isClickable ? `${step.title}${currentLabel}` : void 0;
  const handleKeyDown = (e) => {
    if (!isClickable) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onStepClick?.(index);
    }
  };
  const showHorizontalLine = !isLast && !isVertical;
  return /* @__PURE__ */ (0, import_jsx_runtime66.jsxs)(
    "div",
    {
      "aria-current": isActive ? "step" : void 0,
      className: cn(
        "relative flex",
        isVertical ? "flex-row items-start gap-4" : "flex-1 flex-col items-center text-center",
        showHorizontalLine && "after:content-[''] after:absolute after:top-4 after:left-[50%] after:w-full after:h-[2px] after:-translate-y-1/2 after:bg-border after:z-0",
        showHorizontalLine && isCompleted && "after:bg-primary"
      ),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime66.jsx)(
          "div",
          {
            role: isClickable ? "button" : void 0,
            tabIndex: isClickable ? 0 : void 0,
            "aria-current": isActive ? "step" : void 0,
            "aria-label": accessibleLabel,
            onClick: () => isClickable && onStepClick?.(index),
            onKeyDown: handleKeyDown,
            className: cn(
              "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-semibold transition-all select-none",
              isClickable && "cursor-pointer hover:ring-2 hover:ring-ring hover:ring-offset-2",
              getCircleVariantClass(isCompleted, isActive, isUpcoming, isError)
            ),
            children: renderStepMarker2(step, index, isCompleted)
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime66.jsx)(
          StepLabelContent,
          {
            title: step.title,
            description: step.description,
            isActive,
            isError,
            isVertical
          }
        ),
        isVertical && !isLast && /* @__PURE__ */ (0, import_jsx_runtime66.jsx)(
          "div",
          {
            className: cn(
              "absolute left-4 top-8 -bottom-4 w-[2px] -translate-x-1/2 bg-border",
              isCompleted && "bg-primary"
            )
          }
        )
      ]
    }
  );
}
var Stepper = React46.forwardRef(
  ({
    steps,
    activeStep = 0,
    orientation = "horizontal",
    clickable = false,
    onStepClick,
    className,
    ...props
  }, ref) => {
    const isVertical = orientation === "vertical";
    return /* @__PURE__ */ (0, import_jsx_runtime66.jsx)(
      "div",
      {
        ref,
        role: "navigation",
        "aria-label": "Progress Stepper",
        className: cn(
          "w-full",
          isVertical ? "flex flex-col space-y-4" : "flex items-start justify-between",
          className
        ),
        ...props,
        children: steps.map((step, index) => /* @__PURE__ */ (0, import_jsx_runtime66.jsx)(
          StepRow,
          {
            step,
            index,
            activeStep,
            stepsCount: steps.length,
            isVertical,
            clickable,
            onStepClick,
            renderStepMarker
          },
          index
        ))
      }
    );
  }
);
Stepper.displayName = "Stepper";

// src/components/ui/navigation/onboarding-panel.tsx
var import_jsx_runtime67 = require("react/jsx-runtime");
function OnboardingPanel({
  activeStep,
  steps,
  title,
  subtitle,
  isFirstStep = false,
  isLastStep = false,
  nextDisabled = false,
  nextLabel,
  nextLoading = false,
  onBack,
  onContinue,
  onStepChange,
  onLogout,
  children,
  scrollContainerRef,
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime67.jsx)(
    "section",
    {
      className: cn(
        "flex min-h-screen w-full items-center justify-center p-3 sm:p-4 lg:p-6",
        className
      ),
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime67.jsxs)("div", { className: "flex h-[calc(100vh-2rem)] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900", children: [
        /* @__PURE__ */ (0, import_jsx_runtime67.jsx)("div", { className: "shrink-0 border-b border-slate-100 bg-slate-50/50 px-6 py-4 dark:border-slate-800 dark:bg-slate-950/40", children: /* @__PURE__ */ (0, import_jsx_runtime67.jsx)(
          Stepper,
          {
            steps,
            activeStep,
            onStepClick: onStepChange
          }
        ) }),
        /* @__PURE__ */ (0, import_jsx_runtime67.jsxs)(
          "div",
          {
            ref: scrollContainerRef,
            className: "min-h-0 flex-1 overflow-y-auto custom-scrollbar px-6 py-6 sm:px-8 space-y-4",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime67.jsxs)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime67.jsx)("h1", { className: "text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100", children: title }),
                subtitle ? /* @__PURE__ */ (0, import_jsx_runtime67.jsx)("p", { className: "text-xs text-slate-500 dark:text-slate-400 mt-1", children: subtitle }) : null
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime67.jsx)("div", { className: "pt-2", children })
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime67.jsxs)("footer", { className: "flex shrink-0 items-center justify-end gap-2 border-t border-slate-100 bg-slate-50/80 px-6 py-3.5 dark:border-slate-800 dark:bg-slate-950", children: [
          onLogout ? /* @__PURE__ */ (0, import_jsx_runtime67.jsxs)(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              onClick: onLogout,
              className: "mr-auto text-rose-600 hover:bg-rose-50 hover:text-rose-700 dark:text-rose-400 dark:hover:bg-rose-950/50",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime67.jsx)(import_lucide_react33.LogOut, { className: "h-3.5 w-3.5 mr-1.5" }),
                "Logout"
              ]
            }
          ) : null,
          onBack && /* @__PURE__ */ (0, import_jsx_runtime67.jsxs)(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              onClick: onBack,
              disabled: isFirstStep,
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime67.jsx)(import_lucide_react33.ArrowLeft, { className: "h-3.5 w-3.5 mr-1.5" }),
                "Back"
              ]
            }
          ),
          onContinue && /* @__PURE__ */ (0, import_jsx_runtime67.jsxs)(
            Button,
            {
              type: "button",
              size: "sm",
              onClick: onContinue,
              disabled: nextDisabled || nextLoading,
              className: "min-w-28",
              children: [
                nextLoading ? /* @__PURE__ */ (0, import_jsx_runtime67.jsx)(import_lucide_react33.Loader2, { className: "h-3.5 w-3.5 mr-1.5 animate-spin" }) : null,
                nextLabel || (isLastStep ? "Submit & Finish" : "Save & Continue"),
                !nextLoading && /* @__PURE__ */ (0, import_jsx_runtime67.jsx)(import_lucide_react33.ArrowRight, { className: "h-3.5 w-3.5 ml-1.5" })
              ]
            }
          )
        ] })
      ] })
    }
  );
}

// src/components/ui/navigation/pagination.tsx
var React47 = __toESM(require("react"), 1);
var import_lucide_react34 = require("lucide-react");
var import_jsx_runtime68 = require("react/jsx-runtime");
var Pagination = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime68.jsx)(
  "nav",
  {
    role: "navigation",
    "aria-label": "pagination",
    className: cn("mx-auto flex w-full justify-center", className),
    ...props
  }
);
Pagination.displayName = "Pagination";
var PaginationContent = React47.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime68.jsx)(
  "ul",
  {
    ref,
    className: cn("flex flex-row items-center gap-1", className),
    ...props
  }
));
PaginationContent.displayName = "PaginationContent";
var PaginationItem = React47.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime68.jsx)("li", { ref, className: cn("", className), ...props }));
PaginationItem.displayName = "PaginationItem";
var PaginationLink = ({
  className,
  isActive,
  size = "icon",
  ...props
}) => {
  const commonClasses = cn(
    buttonVariants({
      variant: isActive ? "outline" : "ghost",
      size
    }),
    isActive ? "border-emerald-600 text-emerald-600 bg-emerald-50 hover:bg-emerald-100 hover:text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-500" : "",
    className
  );
  if ("href" in props && props.href !== void 0) {
    return (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ (0, import_jsx_runtime68.jsx)(
        "a",
        {
          "aria-current": isActive ? "page" : void 0,
          className: commonClasses,
          ...props
        }
      )
    );
  }
  const { type = "button", ...buttonProps } = props;
  return /* @__PURE__ */ (0, import_jsx_runtime68.jsx)(
    "button",
    {
      type,
      "aria-current": isActive ? "page" : void 0,
      className: commonClasses,
      ...buttonProps
    }
  );
};
PaginationLink.displayName = "PaginationLink";
var PaginationPrevious = ({
  className,
  showText = true,
  ...props
}) => /* @__PURE__ */ (0, import_jsx_runtime68.jsxs)(
  PaginationLink,
  {
    "aria-label": "Go to previous page",
    size: showText ? "default" : "icon",
    className: cn(showText ? "gap-1 pl-2.5" : "", className),
    ...props,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime68.jsx)(import_lucide_react34.ChevronLeft, { className: "h-4 w-4" }),
      showText && /* @__PURE__ */ (0, import_jsx_runtime68.jsx)("span", { children: "Previous" })
    ]
  }
);
PaginationPrevious.displayName = "PaginationPrevious";
var PaginationNext = ({
  className,
  showText = true,
  ...props
}) => /* @__PURE__ */ (0, import_jsx_runtime68.jsxs)(
  PaginationLink,
  {
    "aria-label": "Go to next page",
    size: showText ? "default" : "icon",
    className: cn(showText ? "gap-1 pr-2.5" : "", className),
    ...props,
    children: [
      showText && /* @__PURE__ */ (0, import_jsx_runtime68.jsx)("span", { children: "Next" }),
      /* @__PURE__ */ (0, import_jsx_runtime68.jsx)(import_lucide_react34.ChevronRight, { className: "h-4 w-4" })
    ]
  }
);
PaginationNext.displayName = "PaginationNext";
var PaginationEllipsis = ({
  className,
  ...props
}) => /* @__PURE__ */ (0, import_jsx_runtime68.jsxs)(
  "span",
  {
    "aria-hidden": true,
    className: cn("flex h-9 w-9 items-center justify-center", className),
    ...props,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime68.jsx)(import_lucide_react34.MoreHorizontal, { className: "h-4 w-4" }),
      /* @__PURE__ */ (0, import_jsx_runtime68.jsx)("span", { className: "sr-only", children: "More pages" })
    ]
  }
);
PaginationEllipsis.displayName = "PaginationEllipsis";
function DataTablePagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage = 10,
  onPageChange,
  showText = true
}) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("ellipsis");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("ellipsis");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("ellipsis");
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push("ellipsis");
        pages.push(totalPages);
      }
    }
    return pages;
  };
  return /* @__PURE__ */ (0, import_jsx_runtime68.jsxs)("div", { className: cn("flex items-center justify-between px-4 py-3 bg-card text-card-foreground border-t border-border", !showText && "sm:justify-center"), children: [
    showText && /* @__PURE__ */ (0, import_jsx_runtime68.jsxs)("div", { className: "hidden sm:flex flex-1 text-sm text-muted-foreground", children: [
      "Showing ",
      /* @__PURE__ */ (0, import_jsx_runtime68.jsx)("span", { className: "font-medium text-foreground mx-1", children: totalItems === 0 ? 0 : startItem }),
      " to ",
      /* @__PURE__ */ (0, import_jsx_runtime68.jsx)("span", { className: "font-medium text-foreground mx-1", children: endItem }),
      " of ",
      /* @__PURE__ */ (0, import_jsx_runtime68.jsx)("span", { className: "font-medium text-foreground mx-1", children: totalItems }),
      " results"
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime68.jsx)("div", { className: "flex items-center justify-between sm:justify-end flex-1 sm:flex-none", children: /* @__PURE__ */ (0, import_jsx_runtime68.jsx)(Pagination, { children: /* @__PURE__ */ (0, import_jsx_runtime68.jsxs)(PaginationContent, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime68.jsx)(PaginationItem, { children: /* @__PURE__ */ (0, import_jsx_runtime68.jsx)(
        PaginationPrevious,
        {
          disabled: currentPage <= 1,
          onClick: () => {
            if (currentPage > 1) onPageChange(currentPage - 1);
          },
          className: currentPage <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer",
          showText
        }
      ) }),
      getPageNumbers().map((page, i) => /* @__PURE__ */ (0, import_jsx_runtime68.jsx)(PaginationItem, { className: "hidden md:flex", children: page === "ellipsis" ? /* @__PURE__ */ (0, import_jsx_runtime68.jsx)(PaginationEllipsis, {}) : /* @__PURE__ */ (0, import_jsx_runtime68.jsx)(
        PaginationLink,
        {
          isActive: currentPage === page,
          onClick: () => {
            onPageChange(page);
          },
          children: page
        }
      ) }, page === "ellipsis" ? `ellipsis-${i}` : `page-${page}`)),
      /* @__PURE__ */ (0, import_jsx_runtime68.jsx)(PaginationItem, { children: /* @__PURE__ */ (0, import_jsx_runtime68.jsx)(
        PaginationNext,
        {
          disabled: currentPage >= totalPages || totalPages === 0,
          onClick: () => {
            if (currentPage < totalPages) onPageChange(currentPage + 1);
          },
          className: currentPage >= totalPages || totalPages === 0 ? "pointer-events-none opacity-50" : "cursor-pointer",
          showText
        }
      ) })
    ] }) }) })
  ] });
}

// src/components/ui/navigation/persona-dropdown.tsx
var import_lucide_react36 = require("lucide-react");

// src/components/ui/overlays/dropdown-menu.tsx
var React48 = __toESM(require("react"), 1);
var DropdownMenuPrimitive = __toESM(require("@radix-ui/react-dropdown-menu"), 1);
var import_lucide_react35 = require("lucide-react");
var import_jsx_runtime69 = require("react/jsx-runtime");
var DropdownMenu = DropdownMenuPrimitive.Root;
var DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
var DropdownMenuGroup = DropdownMenuPrimitive.Group;
var DropdownMenuPortal = DropdownMenuPrimitive.Portal;
var DropdownMenuSub = DropdownMenuPrimitive.Sub;
var DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;
var DropdownMenuSubTrigger = React48.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime69.jsxs)(
  DropdownMenuPrimitive.SubTrigger,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ (0, import_jsx_runtime69.jsx)(import_lucide_react35.ChevronRight, { className: "ml-auto" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
var DropdownMenuSubContent = React48.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime69.jsx)(
  DropdownMenuPrimitive.SubContent,
  {
    ref,
    className: cn(
      // Phase 5 fix: bg-popover instead of hardcoded bg-white/slate-950
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
var DropdownMenuContent = React48.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime69.jsx)(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime69.jsx)(
  DropdownMenuPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      // Phase 5 fix: bg-popover instead of hardcoded bg-white/slate-950
      "z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
var DropdownMenuItem = React48.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime69.jsx)(
  DropdownMenuPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
var DropdownMenuCheckboxItem = React48.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime69.jsxs)(
  DropdownMenuPrimitive.CheckboxItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...checked !== void 0 ? { checked } : {},
    ...props,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime69.jsx)("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime69.jsx)(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime69.jsx)(import_lucide_react35.Check, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
var DropdownMenuRadioItem = React48.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime69.jsxs)(
  DropdownMenuPrimitive.RadioItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime69.jsx)("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime69.jsx)(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime69.jsx)(import_lucide_react35.Circle, { className: "h-2.5 w-2.5 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
var DropdownMenuLabel = React48.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime69.jsx)(
  DropdownMenuPrimitive.Label,
  {
    ref,
    className: cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
var DropdownMenuSeparator = React48.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime69.jsx)(
  DropdownMenuPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;
var DropdownMenuShortcut = ({
  className,
  ...props
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime69.jsx)(
    "span",
    {
      className: cn("ml-auto text-xs tracking-widest opacity-60", className),
      ...props
    }
  );
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

// src/components/ui/navigation/persona-dropdown.tsx
var import_jsx_runtime70 = require("react/jsx-runtime");
function PersonaDropdown({
  personas = [],
  activePersonaId,
  onSelectPersona,
  triggerLabel,
  className
}) {
  const activePersona = personas.find((p) => p.id === activePersonaId);
  return /* @__PURE__ */ (0, import_jsx_runtime70.jsxs)(DropdownMenu, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime70.jsx)(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime70.jsxs)(
      Button,
      {
        variant: "outline",
        size: "sm",
        className: cn(
          "h-8 gap-2 rounded-full border-slate-200 bg-white/80 px-3 text-xs font-semibold backdrop-blur-xs hover:bg-white dark:border-slate-800 dark:bg-slate-900",
          className
        ),
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime70.jsx)("div", { className: "flex h-4 w-4 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400", children: activePersona?.icon || /* @__PURE__ */ (0, import_jsx_runtime70.jsx)(import_lucide_react36.User, { className: "h-3 w-3" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime70.jsx)("span", { className: "font-bold text-slate-800 dark:text-slate-200", children: triggerLabel || activePersona?.title || "Select Role" }),
          /* @__PURE__ */ (0, import_jsx_runtime70.jsx)(import_lucide_react36.ChevronDown, { className: "h-3.5 w-3.5 text-slate-400" })
        ]
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime70.jsxs)(DropdownMenuContent, { align: "end", className: "w-64 p-1.5", children: [
      /* @__PURE__ */ (0, import_jsx_runtime70.jsx)(DropdownMenuLabel, { className: "px-2 py-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider", children: "Switch Persona / View" }),
      /* @__PURE__ */ (0, import_jsx_runtime70.jsx)(DropdownMenuSeparator, {}),
      personas.map((persona) => {
        const isSelected = persona.id === activePersonaId;
        return /* @__PURE__ */ (0, import_jsx_runtime70.jsxs)(
          DropdownMenuItem,
          {
            onClick: () => onSelectPersona(persona.id),
            className: cn(
              "flex items-start gap-2.5 p-2 rounded-lg cursor-pointer",
              isSelected && "bg-indigo-50/70 dark:bg-indigo-950/40"
            ),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime70.jsx)("div", { className: "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 mt-0.5", children: persona.icon || /* @__PURE__ */ (0, import_jsx_runtime70.jsx)(import_lucide_react36.User, { className: "h-3.5 w-3.5" }) }),
              /* @__PURE__ */ (0, import_jsx_runtime70.jsxs)("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ (0, import_jsx_runtime70.jsxs)("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime70.jsx)("span", { className: "text-xs font-bold text-slate-900 dark:text-slate-100", children: persona.title }),
                  isSelected && /* @__PURE__ */ (0, import_jsx_runtime70.jsx)(import_lucide_react36.Check, { className: "h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" })
                ] }),
                persona.subtitle && /* @__PURE__ */ (0, import_jsx_runtime70.jsx)("p", { className: "text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1", children: persona.subtitle })
              ] })
            ]
          },
          persona.id
        );
      })
    ] })
  ] });
}

// src/components/ui/navigation/sidebar.tsx
var React51 = __toESM(require("react"), 1);
var import_react_slot5 = require("@radix-ui/react-slot");
var import_class_variance_authority12 = require("class-variance-authority");
var import_lucide_react38 = require("lucide-react");

// src/components/ui/overlays/sheet.tsx
var React49 = __toESM(require("react"), 1);
var SheetPrimitive = __toESM(require("@radix-ui/react-dialog"), 1);
var import_class_variance_authority11 = require("class-variance-authority");
var import_lucide_react37 = require("lucide-react");
var import_jsx_runtime71 = require("react/jsx-runtime");
var Sheet = SheetPrimitive.Root;
var SheetTrigger = SheetPrimitive.Trigger;
var SheetClose = SheetPrimitive.Close;
var SheetPortal = SheetPrimitive.Portal;
var SheetOverlay = React49.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime71.jsx)(
  SheetPrimitive.Overlay,
  {
    className: cn("fixed inset-0 z-50 bg-black/80", className),
    ...props,
    ref
  }
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;
var sheetVariants = (0, import_class_variance_authority11.cva)(
  "fixed z-50 gap-4 bg-white dark:bg-slate-950 p-6 shadow-lg transition-transform ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b",
        bottom: "inset-x-0 bottom-0 border-t",
        left: "inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
);
var SheetContent = React49.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime71.jsxs)(SheetPortal, { children: [
  /* @__PURE__ */ (0, import_jsx_runtime71.jsx)(SheetOverlay, {}),
  /* @__PURE__ */ (0, import_jsx_runtime71.jsxs)(
    SheetPrimitive.Content,
    {
      ref,
      "aria-describedby": props["aria-describedby"] ?? void 0,
      className: cn(sheetVariants({ side }), className),
      ...props,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime71.jsxs)(SheetPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary", children: [
          /* @__PURE__ */ (0, import_jsx_runtime71.jsx)(import_lucide_react37.X, { className: "h-4 w-4" }),
          /* @__PURE__ */ (0, import_jsx_runtime71.jsx)("span", { className: "sr-only", children: "Close" })
        ] }),
        children
      ]
    }
  )
] }));
SheetContent.displayName = SheetPrimitive.Content.displayName;
var SheetHeader = ({
  className,
  ...props
}) => /* @__PURE__ */ (0, import_jsx_runtime71.jsx)(
  "div",
  {
    className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
    ...props
  }
);
SheetHeader.displayName = "SheetHeader";
var SheetFooter = ({
  className,
  ...props
}) => /* @__PURE__ */ (0, import_jsx_runtime71.jsx)(
  "div",
  {
    className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
    ...props
  }
);
SheetFooter.displayName = "SheetFooter";
var SheetTitle = React49.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime71.jsx)(
  SheetPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold text-foreground", className),
    ...props
  }
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;
var SheetDescription = React49.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime71.jsx)(
  SheetPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

// src/components/ui/overlays/tooltip.tsx
var React50 = __toESM(require("react"), 1);
var TooltipPrimitive = __toESM(require("@radix-ui/react-tooltip"), 1);
var import_jsx_runtime72 = require("react/jsx-runtime");
var TooltipProvider = TooltipPrimitive.Provider;
var Tooltip2 = TooltipPrimitive.Root;
var TooltipTrigger = TooltipPrimitive.Trigger;
var TooltipArrow = React50.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(
  TooltipPrimitive.Arrow,
  {
    ref,
    className: cn("fill-primary", className),
    ...props
  }
));
TooltipArrow.displayName = "TooltipArrow";
var TooltipContent = React50.forwardRef(({ className, sideOffset = 6, showArrow = false, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(TooltipPrimitive.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)(
  TooltipPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      // Phase 5 fix: added shadow-sm, slight rounding-increase, consistent padding
      "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground shadow-sm",
      "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
      "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props,
    children: [
      children,
      showArrow && /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(TooltipArrow, {})
    ]
  }
) }));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

// src/components/ui/navigation/sidebar.tsx
var import_jsx_runtime73 = require("react/jsx-runtime");
var SIDEBAR_COOKIE_NAME = "sidebar_state";
var SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
var SIDEBAR_WIDTH = "16rem";
var SIDEBAR_WIDTH_MOBILE = "18rem";
var SIDEBAR_WIDTH_ICON = "3rem";
var SIDEBAR_KEYBOARD_SHORTCUT = "b";
var SidebarContext = React51.createContext(null);
function useSidebar() {
  const context = React51.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
}
var SidebarProvider = React51.forwardRef(function SidebarProvider2({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}, ref) {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React51.useState(false);
  const [_open, _setOpen] = React51.useState(() => {
    if (typeof document !== "undefined") {
      const match = document.cookie.match(
        new RegExp(`(?:^|; )${SIDEBAR_COOKIE_NAME}=([^;]*)`)
      );
      if (match && match[1]) {
        return match[1] === "true";
      }
    }
    return defaultOpen;
  });
  const open = openProp ?? _open;
  React51.useEffect(() => {
    if (typeof document !== "undefined") {
      const match = document.cookie.match(
        new RegExp(`(?:^|; )${SIDEBAR_COOKIE_NAME}=([^;]*)`)
      );
      if (match && match[1]) {
        const cookieVal = match[1] === "true";
        _setOpen((prev) => prev !== cookieVal ? cookieVal : prev);
      }
    }
  }, []);
  const setOpen = React51.useCallback(
    (value) => {
      if (setOpenProp) {
        const openState = typeof value === "function" ? value(openProp ?? false) : value;
        setOpenProp(openState);
        if (typeof document !== "undefined") {
          document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
        }
      } else {
        _setOpen((prev) => {
          const openState = typeof value === "function" ? value(prev) : value;
          if (typeof document !== "undefined") {
            document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
          }
          return openState;
        });
      }
    },
    [setOpenProp, openProp]
  );
  const toggleSidebar = React51.useCallback(() => {
    return isMobile ? setOpenMobile((open2) => !open2) : setOpen((open2) => !open2);
  }, [isMobile, setOpen, setOpenMobile]);
  React51.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);
  const state = open ? "expanded" : "collapsed";
  const contextValue = React51.useMemo(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(SidebarContext.Provider, { value: contextValue, children: /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(TooltipProvider, { delayDuration: 0, children: /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(
    "div",
    {
      ref,
      "data-slot": "sidebar-wrapper",
      style: {
        "--sidebar-width": SIDEBAR_WIDTH,
        "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
        ...style
      },
      className: cn(
        "group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full",
        className
      ),
      ...props,
      children
    }
  ) }) });
});
SidebarProvider.displayName = "SidebarProvider";
var Sidebar = React51.forwardRef(function Sidebar2({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  ...props
}, ref) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();
  if (collapsible === "none") {
    return /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(
      "div",
      {
        ref,
        "data-slot": "sidebar",
        className: cn(
          "bg-sidebar text-sidebar-foreground flex h-full w-[var(--sidebar-width)] flex-col",
          className
        ),
        ...props,
        children
      }
    );
  }
  if (isMobile) {
    return /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(Sheet, { open: openMobile, onOpenChange: setOpenMobile, ...props, children: /* @__PURE__ */ (0, import_jsx_runtime73.jsxs)(
      SheetContent,
      {
        ref,
        "data-sidebar": "sidebar",
        "data-slot": "sidebar",
        "data-mobile": "true",
        className: "bg-sidebar text-sidebar-foreground w-[var(--sidebar-width)] p-0 [&>button]:hidden",
        style: {
          "--sidebar-width": SIDEBAR_WIDTH_MOBILE
        },
        side,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime73.jsxs)(SheetHeader, { className: "sr-only", children: [
            /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(SheetTitle, { children: "Sidebar" }),
            /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(SheetDescription, { children: "Displays the mobile sidebar." })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime73.jsx)("div", { className: "flex h-full w-full flex-col", children })
        ]
      }
    ) });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime73.jsxs)(
    "div",
    {
      ref,
      className: "group peer text-sidebar-foreground hidden md:block",
      "data-state": state,
      "data-collapsible": state === "collapsed" ? collapsible : "",
      "data-variant": variant,
      "data-side": side,
      "data-slot": "sidebar",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(
          "div",
          {
            "data-slot": "sidebar-gap",
            className: cn(
              "relative w-[var(--sidebar-width)] bg-transparent transition-[width] duration-200 ease-linear",
              "group-data-[collapsible=offcanvas]:w-0",
              "group-data-[side=right]:rotate-180",
              variant === "floating" || variant === "inset" ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+var(--spacing-4))]" : "group-data-[collapsible=icon]:w-[var(--sidebar-width-icon)]"
            )
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(
          "div",
          {
            "data-slot": "sidebar-container",
            className: cn(
              "fixed inset-y-0 z-10 hidden h-svh w-[var(--sidebar-width)] transition-[left,right,width] duration-200 ease-linear md:flex",
              side === "left" ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]" : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
              // Adjust the padding for floating and inset variants.
              variant === "floating" || variant === "inset" ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+var(--spacing-4)+2px)]" : "group-data-[collapsible=icon]:w-[var(--sidebar-width-icon)] group-data-[side=left]:border-r group-data-[side=right]:border-l",
              className
            ),
            ...props,
            children: /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(
              "div",
              {
                "data-sidebar": "sidebar",
                "data-slot": "sidebar-inner",
                className: "bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm",
                children
              }
            )
          }
        )
      ]
    }
  );
});
Sidebar.displayName = "Sidebar";
var SidebarTrigger = React51.forwardRef(function SidebarTrigger2({ className, onClick, ...props }, ref) {
  const { toggleSidebar } = useSidebar();
  return /* @__PURE__ */ (0, import_jsx_runtime73.jsxs)(
    Button,
    {
      ref,
      "data-sidebar": "trigger",
      "data-slot": "sidebar-trigger",
      variant: "ghost",
      size: "icon",
      className: cn("h-7 w-7", className),
      onClick: (event) => {
        onClick?.(event);
        toggleSidebar();
      },
      ...props,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(import_lucide_react38.PanelLeftIcon, {}),
        /* @__PURE__ */ (0, import_jsx_runtime73.jsx)("span", { className: "sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
});
SidebarTrigger.displayName = "SidebarTrigger";
var SidebarRail = React51.forwardRef(function SidebarRail2({ className, ...props }, ref) {
  const { toggleSidebar } = useSidebar();
  return /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(
    "button",
    {
      ref,
      "data-sidebar": "rail",
      "data-slot": "sidebar-rail",
      "aria-label": "Toggle Sidebar",
      tabIndex: -1,
      onClick: toggleSidebar,
      title: "Toggle Sidebar",
      className: cn(
        "hover:after:bg-sidebar-border absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] sm:flex",
        "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "hover:group-data-[collapsible=offcanvas]:bg-sidebar group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className
      ),
      ...props
    }
  );
});
SidebarRail.displayName = "SidebarRail";
var SidebarInset = React51.forwardRef(function SidebarInset2({ className, ...props }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(
    "main",
    {
      ref,
      "data-slot": "sidebar-inset",
      className: cn(
        "bg-background relative flex w-full flex-1 flex-col",
        "md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
        className
      ),
      ...props
    }
  );
});
SidebarInset.displayName = "SidebarInset";
var SidebarInput = React51.forwardRef(function SidebarInput2({ className, ...props }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(
    Input,
    {
      ref,
      "data-slot": "sidebar-input",
      "data-sidebar": "input",
      className: cn("bg-background h-8 w-full shadow-none", className),
      ...props
    }
  );
});
SidebarInput.displayName = "SidebarInput";
var SidebarHeader = React51.forwardRef(function SidebarHeader2({ className, ...props }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(
    "div",
    {
      ref,
      "data-slot": "sidebar-header",
      "data-sidebar": "header",
      className: cn("flex flex-col gap-2 p-2", className),
      ...props
    }
  );
});
SidebarHeader.displayName = "SidebarHeader";
var SidebarFooter = React51.forwardRef(function SidebarFooter2({ className, ...props }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(
    "div",
    {
      ref,
      "data-slot": "sidebar-footer",
      "data-sidebar": "footer",
      className: cn("flex flex-col gap-2 p-2", className),
      ...props
    }
  );
});
SidebarFooter.displayName = "SidebarFooter";
var SidebarSeparator = React51.forwardRef(function SidebarSeparator2({ className, ...props }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(
    Separator,
    {
      ref,
      "data-slot": "sidebar-separator",
      "data-sidebar": "separator",
      className: cn("bg-sidebar-border mx-2 w-auto", className),
      ...props
    }
  );
});
SidebarSeparator.displayName = "SidebarSeparator";
var SidebarContent = React51.forwardRef(function SidebarContent2({ className, ...props }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(
    "div",
    {
      ref,
      "data-slot": "sidebar-content",
      "data-sidebar": "content",
      className: cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className
      ),
      ...props
    }
  );
});
SidebarContent.displayName = "SidebarContent";
var SidebarGroup = React51.forwardRef(function SidebarGroup2({ className, ...props }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(
    "div",
    {
      ref,
      "data-slot": "sidebar-group",
      "data-sidebar": "group",
      className: cn("relative flex w-full min-w-0 flex-col p-2", className),
      ...props
    }
  );
});
SidebarGroup.displayName = "SidebarGroup";
var SidebarGroupLabel = React51.forwardRef(function SidebarGroupLabel2({ className, asChild = false, ...props }, ref) {
  const Comp = asChild ? import_react_slot5.Slot : "div";
  return /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(
    Comp,
    {
      ref,
      "data-slot": "sidebar-group-label",
      "data-sidebar": "group-label",
      className: cn(
        "text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        className
      ),
      ...props
    }
  );
});
SidebarGroupLabel.displayName = "SidebarGroupLabel";
var SidebarGroupAction = React51.forwardRef(function SidebarGroupAction2({ className, asChild = false, ...props }, ref) {
  const Comp = asChild ? import_react_slot5.Slot : "button";
  return /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(
    Comp,
    {
      ref,
      "data-slot": "sidebar-group-action",
      "data-sidebar": "group-action",
      className: cn(
        "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 md:after:hidden",
        "group-data-[collapsible=icon]:hidden",
        className
      ),
      ...props
    }
  );
});
SidebarGroupAction.displayName = "SidebarGroupAction";
var SidebarGroupContent = React51.forwardRef(function SidebarGroupContent2({ className, ...props }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(
    "div",
    {
      ref,
      "data-slot": "sidebar-group-content",
      "data-sidebar": "group-content",
      className: cn("w-full text-sm", className),
      ...props
    }
  );
});
SidebarGroupContent.displayName = "SidebarGroupContent";
var SidebarMenu = React51.forwardRef(function SidebarMenu2({ className, ...props }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(
    "ul",
    {
      ref,
      "data-slot": "sidebar-menu",
      "data-sidebar": "menu",
      className: cn("flex w-full min-w-0 flex-col gap-1", className),
      ...props
    }
  );
});
SidebarMenu.displayName = "SidebarMenu";
var SidebarMenuItem = React51.forwardRef(function SidebarMenuItem2({ className, ...props }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(
    "li",
    {
      ref,
      "data-slot": "sidebar-menu-item",
      "data-sidebar": "menu-item",
      className: cn("group/menu-item relative", className),
      ...props
    }
  );
});
SidebarMenuItem.displayName = "SidebarMenuItem";
var sidebarMenuButtonVariants = (0, import_class_variance_authority12.cva)(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:w-8! group-data-[collapsible=icon]:h-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline: "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
var SidebarMenuButton = React51.forwardRef(function SidebarMenuButton2({
  asChild = false,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  ...props
}, ref) {
  const Comp = asChild ? import_react_slot5.Slot : "button";
  const { isMobile, state } = useSidebar();
  const button = /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(
    Comp,
    {
      ref,
      "data-slot": "sidebar-menu-button",
      "data-sidebar": "menu-button",
      "data-size": size,
      "data-active": isActive,
      className: cn(sidebarMenuButtonVariants({ variant, size }), className),
      ...props
    }
  );
  if (!tooltip) {
    return button;
  }
  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip
    };
  }
  return /* @__PURE__ */ (0, import_jsx_runtime73.jsxs)(Tooltip2, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(TooltipTrigger, { asChild: true, children: button }),
    /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(
      TooltipContent,
      {
        side: "right",
        align: "center",
        hidden: state !== "collapsed" || isMobile,
        ...tooltip
      }
    )
  ] });
});
SidebarMenuButton.displayName = "SidebarMenuButton";
var SidebarMenuAction = React51.forwardRef(function SidebarMenuAction2({ className, asChild = false, showOnHover = false, ...props }, ref) {
  const Comp = asChild ? import_react_slot5.Slot : "button";
  return /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(
    Comp,
    {
      ref,
      "data-slot": "sidebar-menu-action",
      "data-sidebar": "menu-action",
      className: cn(
        "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground peer-hover/menu-button:text-sidebar-accent-foreground absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 md:after:hidden",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        showOnHover && "peer-data-[active=true]/menu-button:text-sidebar-accent-foreground group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 md:opacity-0",
        className
      ),
      ...props
    }
  );
});
SidebarMenuAction.displayName = "SidebarMenuAction";
var SidebarMenuBadge = React51.forwardRef(function SidebarMenuBadge2({ className, ...props }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(
    "div",
    {
      ref,
      "data-slot": "sidebar-menu-badge",
      "data-sidebar": "menu-badge",
      className: cn(
        "text-sidebar-foreground pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums select-none",
        "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        className
      ),
      ...props
    }
  );
});
SidebarMenuBadge.displayName = "SidebarMenuBadge";
var SidebarMenuSkeleton = React51.forwardRef(function SidebarMenuSkeleton2({ className, showIcon = false, ...props }, ref) {
  const [width, setWidth] = React51.useState("70%");
  React51.useEffect(() => {
    setWidth(`${Math.floor(Math.random() * 40) + 50}%`);
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime73.jsxs)(
    "div",
    {
      ref,
      "data-slot": "sidebar-menu-skeleton",
      "data-sidebar": "menu-skeleton",
      className: cn("flex h-8 items-center gap-2 rounded-md px-2", className),
      ...props,
      children: [
        showIcon && /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(
          Skeleton,
          {
            className: "size-4 rounded-md",
            "data-sidebar": "menu-skeleton-icon"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(
          Skeleton,
          {
            className: "h-4 max-w-[var(--skeleton-width)] flex-1",
            "data-sidebar": "menu-skeleton-text",
            style: {
              "--skeleton-width": width
            }
          }
        )
      ]
    }
  );
});
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton";
var SidebarMenuSub = React51.forwardRef(function SidebarMenuSub2({ className, ...props }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(
    "ul",
    {
      ref,
      "data-slot": "sidebar-menu-sub",
      "data-sidebar": "menu-sub",
      className: cn(
        "border-sidebar-border mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5",
        "group-data-[collapsible=icon]:hidden",
        className
      ),
      ...props
    }
  );
});
SidebarMenuSub.displayName = "SidebarMenuSub";
var SidebarMenuSubItem = React51.forwardRef(function SidebarMenuSubItem2({ className, ...props }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(
    "li",
    {
      ref,
      "data-slot": "sidebar-menu-sub-item",
      "data-sidebar": "menu-sub-item",
      className: cn("group/menu-sub-item relative", className),
      ...props
    }
  );
});
SidebarMenuSubItem.displayName = "SidebarMenuSubItem";
var SidebarMenuSubButton = React51.forwardRef(function SidebarMenuSubButton2({ asChild = false, size = "md", isActive = false, className, ...props }, ref) {
  const Comp = asChild ? import_react_slot5.Slot : "a";
  return /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(
    Comp,
    {
      ref,
      "data-slot": "sidebar-menu-sub-button",
      "data-sidebar": "menu-sub-button",
      "data-size": size,
      "data-active": isActive,
      className: cn(
        "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground [&>svg]:text-sidebar-accent-foreground flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 outline outline-2 outline-transparent outline-offset-2 focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
        "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
        size === "sm" && "text-xs",
        size === "md" && "text-sm",
        "group-data-[collapsible=icon]:hidden",
        className
      ),
      ...props
    }
  );
});
SidebarMenuSubButton.displayName = "SidebarMenuSubButton";

// src/components/ui/navigation/tabs.tsx
var React52 = __toESM(require("react"), 1);
var TabsPrimitive = __toESM(require("@radix-ui/react-tabs"), 1);
var import_jsx_runtime74 = require("react/jsx-runtime");
var Tabs = TabsPrimitive.Root;
var TabsList = React52.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime74.jsx)(
  TabsPrimitive.List,
  {
    ref,
    className: cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    ),
    ...props
  }
));
TabsList.displayName = TabsPrimitive.List.displayName;
var TabsTrigger = React52.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime74.jsx)(
  TabsPrimitive.Trigger,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
var TabsContent = React52.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime74.jsx)(
  TabsPrimitive.Content,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props
  }
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

// src/components/ui/navigation/mobile-bottom-nav.tsx
var import_lucide_react39 = require("lucide-react");
var import_jsx_runtime75 = require("react/jsx-runtime");
function MobileBottomNav({
  items,
  activeId,
  onChange,
  moreAction,
  className
}) {
  const handleSelect = (id) => {
    triggerHaptic("light");
    onChange(id);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime75.jsxs)(
    "nav",
    {
      "aria-label": "Mobile Navigation",
      className: cn(
        "fixed bottom-0 left-0 right-0 z-40 md:hidden",
        "bg-background/95 backdrop-blur-md border-t border-border",
        "flex items-center justify-around px-2 py-1 select-none",
        "pb-[env(safe-area-inset-bottom,0px)]",
        className
      ),
      children: [
        items.map((item) => {
          const Icon2 = item.icon;
          const isActive = activeId === item.id;
          return /* @__PURE__ */ (0, import_jsx_runtime75.jsxs)(
            "button",
            {
              type: "button",
              onClick: () => handleSelect(item.id),
              "aria-current": isActive ? "page" : void 0,
              className: cn(
                "flex flex-col items-center justify-center flex-1 min-w-0 py-1.5 px-1 relative rounded-lg transition-colors",
                isActive ? "text-primary font-semibold" : "text-muted-foreground hover:text-foreground font-normal"
              ),
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime75.jsxs)("div", { className: "relative", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime75.jsx)(Icon2, { className: cn("w-5 h-5 transition-transform", isActive && "scale-110") }),
                  item.badge !== void 0 && item.badge !== null && item.badge !== 0 && /* @__PURE__ */ (0, import_jsx_runtime75.jsx)("span", { className: "absolute -top-1.5 -right-2 min-w-4 h-4 px-1 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center", children: item.badge })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime75.jsx)("span", { className: "text-[10px] truncate max-w-[64px] mt-1 leading-none", children: item.label })
              ]
            },
            item.id
          );
        }),
        moreAction && /* @__PURE__ */ (0, import_jsx_runtime75.jsxs)(
          "button",
          {
            type: "button",
            onClick: () => {
              triggerHaptic("light");
              moreAction.onClick();
            },
            className: "flex flex-col items-center justify-center flex-1 min-w-0 py-1.5 px-1 relative rounded-lg transition-colors text-muted-foreground hover:text-foreground",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime75.jsx)(import_lucide_react39.MoreHorizontal, { className: "w-5 h-5" }),
              /* @__PURE__ */ (0, import_jsx_runtime75.jsx)("span", { className: "text-[10px] truncate max-w-[64px] mt-1 leading-none", children: moreAction.label || "More" })
            ]
          }
        )
      ]
    }
  );
}

// src/components/ui/overlays/alert-dialog.tsx
var React53 = __toESM(require("react"), 1);
var AlertDialogPrimitive = __toESM(require("@radix-ui/react-alert-dialog"), 1);
var import_jsx_runtime76 = require("react/jsx-runtime");
var AlertDialog = AlertDialogPrimitive.Root;
var AlertDialogTrigger = AlertDialogPrimitive.Trigger;
var AlertDialogPortal = AlertDialogPrimitive.Portal;
var AlertDialogOverlay = React53.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime76.jsx)(
  AlertDialogPrimitive.Overlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80",
      className
    ),
    ...props,
    ref
  }
));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;
var AlertDialogContent = React53.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime76.jsxs)(AlertDialogPortal, { children: [
  /* @__PURE__ */ (0, import_jsx_runtime76.jsx)(AlertDialogOverlay, {}),
  /* @__PURE__ */ (0, import_jsx_runtime76.jsx)(
    AlertDialogPrimitive.Content,
    {
      ref,
      "aria-describedby": props["aria-describedby"] ?? void 0,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white dark:bg-slate-950 p-6 shadow-lg sm:rounded-lg",
        className
      ),
      ...props
    }
  )
] }));
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;
var AlertDialogHeader = ({
  className,
  ...props
}) => /* @__PURE__ */ (0, import_jsx_runtime76.jsx)(
  "div",
  {
    className: cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    ),
    ...props
  }
);
AlertDialogHeader.displayName = "AlertDialogHeader";
var AlertDialogFooter = ({
  className,
  ...props
}) => /* @__PURE__ */ (0, import_jsx_runtime76.jsx)(
  "div",
  {
    className: cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    ),
    ...props
  }
);
AlertDialogFooter.displayName = "AlertDialogFooter";
var AlertDialogTitle = React53.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime76.jsx)(
  AlertDialogPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold", className),
    ...props
  }
));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;
var AlertDialogDescription = React53.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime76.jsx)(
  AlertDialogPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;
var AlertDialogAction = React53.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime76.jsx)(
  AlertDialogPrimitive.Action,
  {
    ref,
    className: cn(buttonVariants(), className),
    ...props
  }
));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;
var AlertDialogCancel = React53.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime76.jsx)(
  AlertDialogPrimitive.Cancel,
  {
    ref,
    className: cn(
      buttonVariants({ variant: "outline" }),
      "mt-2 sm:mt-0",
      className
    ),
    ...props
  }
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

// src/components/ui/overlays/confirm-dialog.tsx
var import_lucide_react40 = require("lucide-react");
var import_jsx_runtime77 = require("react/jsx-runtime");
function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "default",
  isLoading = false,
  onConfirm
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime77.jsx)(AlertDialog, { open, onOpenChange, children: /* @__PURE__ */ (0, import_jsx_runtime77.jsxs)(AlertDialogContent, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime77.jsxs)(AlertDialogHeader, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime77.jsx)(AlertDialogTitle, { children: title }),
      description ? /* @__PURE__ */ (0, import_jsx_runtime77.jsx)(AlertDialogDescription, { children: description }) : /* @__PURE__ */ (0, import_jsx_runtime77.jsx)(AlertDialogDescription, { className: "sr-only", children: "Please confirm this action." })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime77.jsxs)(AlertDialogFooter, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime77.jsx)(AlertDialogCancel, { disabled: isLoading, children: cancelLabel }),
      /* @__PURE__ */ (0, import_jsx_runtime77.jsxs)(
        AlertDialogAction,
        {
          onClick: (e) => {
            e.preventDefault();
            onConfirm();
          },
          disabled: isLoading,
          className: cn(
            "inline-flex items-center gap-2",
            variant === "destructive" ? "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500" : "bg-primary text-primary-foreground hover:bg-primary/90"
          ),
          children: [
            isLoading && /* @__PURE__ */ (0, import_jsx_runtime77.jsx)(import_lucide_react40.Loader2, { className: "h-4 w-4 animate-spin" }),
            confirmLabel
          ]
        }
      )
    ] })
  ] }) });
}

// src/components/ui/overlays/context-menu.tsx
var React54 = __toESM(require("react"), 1);
var ContextMenuPrimitive = __toESM(require("@radix-ui/react-context-menu"), 1);
var import_lucide_react41 = require("lucide-react");
var import_jsx_runtime78 = require("react/jsx-runtime");
var ContextMenu = ContextMenuPrimitive.Root;
var ContextMenuTrigger = ContextMenuPrimitive.Trigger;
var ContextMenuGroup = ContextMenuPrimitive.Group;
var ContextMenuPortal = ContextMenuPrimitive.Portal;
var ContextMenuSub = ContextMenuPrimitive.Sub;
var ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;
var ContextMenuSubTrigger = React54.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime78.jsxs)(
  ContextMenuPrimitive.SubTrigger,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ (0, import_jsx_runtime78.jsx)(import_lucide_react41.ChevronRight, { className: "ml-auto h-4 w-4" })
    ]
  }
));
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName;
var ContextMenuSubContent = React54.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime78.jsx)(
  ContextMenuPrimitive.SubContent,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-context-menu-content-transform-origin]",
      className
    ),
    ...props
  }
));
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName;
var ContextMenuContent = React54.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime78.jsx)(ContextMenuPrimitive.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime78.jsx)(
  ContextMenuPrimitive.Content,
  {
    ref,
    className: cn(
      "z-50 max-h-[--radix-context-menu-content-available-height] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-context-menu-content-transform-origin]",
      className
    ),
    ...props
  }
) }));
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName;
var ContextMenuItem = React54.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime78.jsx)(
  ContextMenuPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName;
var ContextMenuCheckboxItem = React54.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime78.jsxs)(
  ContextMenuPrimitive.CheckboxItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...checked !== void 0 ? { checked } : {},
    ...props,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime78.jsx)("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime78.jsx)(ContextMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime78.jsx)(import_lucide_react41.Check, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
ContextMenuCheckboxItem.displayName = ContextMenuPrimitive.CheckboxItem.displayName;
var ContextMenuRadioItem = React54.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime78.jsxs)(
  ContextMenuPrimitive.RadioItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime78.jsx)("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime78.jsx)(ContextMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime78.jsx)(import_lucide_react41.Circle, { className: "h-4 w-4 fill-current" }) }) }),
      children
    ]
  }
));
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName;
var ContextMenuLabel = React54.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime78.jsx)(
  ContextMenuPrimitive.Label,
  {
    ref,
    className: cn(
      "px-2 py-1.5 text-sm font-semibold text-foreground",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName;
var ContextMenuSeparator = React54.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime78.jsx)(
  ContextMenuPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-border", className),
    ...props
  }
));
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName;
var ContextMenuShortcut = ({
  className,
  ...props
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime78.jsx)(
    "span",
    {
      className: cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      ),
      ...props
    }
  );
};
ContextMenuShortcut.displayName = "ContextMenuShortcut";

// src/components/ui/overlays/create-entity-panel.tsx
var import_lucide_react42 = require("lucide-react");
var import_jsx_runtime79 = require("react/jsx-runtime");
function getSheetSizeClass(size) {
  switch (size) {
    case "sm":
      return "sm:max-w-md";
    case "lg":
      return "sm:max-w-xl";
    case "xl":
      return "sm:max-w-2xl";
    default:
      return "sm:max-w-lg";
  }
}
function CreateEntityPanel({
  open,
  onOpenChange,
  title,
  description,
  icon,
  onSave,
  isSaving = false,
  saveLabel = "Save & Apply",
  cancelLabel = "Cancel",
  readOnly = false,
  children,
  size = "default"
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime79.jsx)(Sheet, { open, onOpenChange, children: /* @__PURE__ */ (0, import_jsx_runtime79.jsxs)(
    SheetContent,
    {
      className: cn(
        "flex flex-col h-full overflow-hidden p-0",
        getSheetSizeClass(size)
      ),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime79.jsx)(SheetHeader, { className: "border-b border-slate-100 px-6 py-5 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40", children: /* @__PURE__ */ (0, import_jsx_runtime79.jsxs)("div", { className: "flex items-center gap-3", children: [
          icon ? /* @__PURE__ */ (0, import_jsx_runtime79.jsx)("div", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900", children: icon }) : null,
          /* @__PURE__ */ (0, import_jsx_runtime79.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime79.jsx)(SheetTitle, { className: "text-base font-bold text-slate-900 dark:text-slate-100", children: title }),
            description ? /* @__PURE__ */ (0, import_jsx_runtime79.jsx)(SheetDescription, { className: "text-xs text-slate-500 dark:text-slate-400 mt-0.5", children: description }) : null
          ] })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime79.jsx)("div", { className: "flex-1 overflow-y-auto custom-scrollbar px-6 py-5", children }),
        /* @__PURE__ */ (0, import_jsx_runtime79.jsxs)(SheetFooter, { className: "border-t border-slate-100 bg-slate-50/80 px-6 py-4 dark:border-slate-800 dark:bg-slate-950 flex flex-row items-center justify-end gap-2.5", children: [
          /* @__PURE__ */ (0, import_jsx_runtime79.jsx)(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              onClick: () => onOpenChange(false),
              disabled: isSaving,
              children: cancelLabel
            }
          ),
          !readOnly && onSave && /* @__PURE__ */ (0, import_jsx_runtime79.jsxs)(
            Button,
            {
              type: "button",
              size: "sm",
              onClick: onSave,
              disabled: isSaving,
              children: [
                isSaving && /* @__PURE__ */ (0, import_jsx_runtime79.jsx)(import_lucide_react42.Loader2, { className: "h-3.5 w-3.5 mr-1.5 animate-spin" }),
                saveLabel
              ]
            }
          )
        ] })
      ]
    }
  ) });
}

// src/components/ui/overlays/drawer.tsx
var React55 = __toESM(require("react"), 1);
var import_vaul = require("vaul");
var import_jsx_runtime80 = require("react/jsx-runtime");
var Drawer = ({
  shouldScaleBackground = true,
  ...props
}) => /* @__PURE__ */ (0, import_jsx_runtime80.jsx)(
  import_vaul.Drawer.Root,
  {
    shouldScaleBackground,
    ...props
  }
);
Drawer.displayName = "Drawer";
var DrawerTrigger = import_vaul.Drawer.Trigger;
var DrawerPortal = import_vaul.Drawer.Portal;
var DrawerClose = import_vaul.Drawer.Close;
var DrawerOverlay = React55.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime80.jsx)(
  import_vaul.Drawer.Overlay,
  {
    ref,
    className: cn("fixed inset-0 z-50 bg-black/80", className),
    ...props
  }
));
DrawerOverlay.displayName = import_vaul.Drawer.Overlay.displayName;
var DrawerContent = React55.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime80.jsxs)(DrawerPortal, { children: [
  /* @__PURE__ */ (0, import_jsx_runtime80.jsx)(DrawerOverlay, {}),
  /* @__PURE__ */ (0, import_jsx_runtime80.jsxs)(
    import_vaul.Drawer.Content,
    {
      ref,
      "aria-describedby": props["aria-describedby"] ?? void 0,
      className: cn(
        // Phase 5 fix: bg-background (theme-aware) instead of hardcoded bg-white/slate-950
        "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[12px] border bg-background",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime80.jsx)("div", { className: "mx-auto mt-4 h-1.5 w-12 rounded-full bg-muted-foreground/30" }),
        children
      ]
    }
  )
] }));
DrawerContent.displayName = "DrawerContent";
var DrawerHeader = ({
  className,
  ...props
}) => /* @__PURE__ */ (0, import_jsx_runtime80.jsx)(
  "div",
  {
    className: cn("grid gap-1.5 p-4 text-center sm:text-left", className),
    ...props
  }
);
DrawerHeader.displayName = "DrawerHeader";
var DrawerFooter = ({
  className,
  ...props
}) => /* @__PURE__ */ (0, import_jsx_runtime80.jsx)(
  "div",
  {
    className: cn("mt-auto flex flex-col gap-2 p-4", className),
    ...props
  }
);
DrawerFooter.displayName = "DrawerFooter";
var DrawerTitle = React55.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime80.jsx)(
  import_vaul.Drawer.Title,
  {
    ref,
    className: cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    ),
    ...props
  }
));
DrawerTitle.displayName = import_vaul.Drawer.Title.displayName;
var DrawerDescription = React55.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime80.jsx)(
  import_vaul.Drawer.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DrawerDescription.displayName = import_vaul.Drawer.Description.displayName;

// src/components/ui/overlays/hover-card.tsx
var React56 = __toESM(require("react"), 1);
var HoverCardPrimitive = __toESM(require("@radix-ui/react-hover-card"), 1);
var import_jsx_runtime81 = require("react/jsx-runtime");
var HoverCard = HoverCardPrimitive.Root;
var HoverCardTrigger = HoverCardPrimitive.Trigger;
var HoverCardContent = React56.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime81.jsx)(
  HoverCardPrimitive.Content,
  {
    ref,
    align,
    sideOffset,
    className: cn(
      "z-50 w-64 rounded-md border bg-white dark:bg-slate-950 p-4 text-popover-foreground shadow-md outline-none",
      className
    ),
    ...props
  }
));
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName;

// src/components/ui/feedback/alert.tsx
var React57 = __toESM(require("react"), 1);
var import_class_variance_authority13 = require("class-variance-authority");
var import_lucide_react43 = require("lucide-react");
var import_jsx_runtime82 = require("react/jsx-runtime");
var alertVariants = (0, import_class_variance_authority13.cva)(
  // Base: icon absolutely positioned at left, text padded away from icon
  "relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-3.5 [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        // Default: subtle bordered card, neutral
        default: "bg-muted/40 border-border text-foreground [&>svg]:text-foreground",
        // Info: blue tint
        info: "bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-950/30 dark:border-blue-800 dark:text-blue-100 [&>svg]:text-blue-600 dark:[&>svg]:text-blue-400",
        // Success: green tint
        success: "bg-emerald-50 border-emerald-200 text-emerald-900 dark:bg-emerald-950/30 dark:border-emerald-800 dark:text-emerald-100 [&>svg]:text-emerald-600 dark:[&>svg]:text-emerald-400",
        // Warning: amber tint
        warning: "bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-950/30 dark:border-amber-800 dark:text-amber-100 [&>svg]:text-amber-600 dark:[&>svg]:text-amber-400",
        // Destructive: red tint (was just border coloring before)
        destructive: "bg-red-50 border-red-200 text-red-900 dark:bg-red-950/30 dark:border-red-800 dark:text-red-100 [&>svg]:text-red-600 dark:[&>svg]:text-red-400"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
var Alert = React57.forwardRef(({ className, variant, onDismiss, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime82.jsxs)(
  "div",
  {
    ref,
    role: "alert",
    className: cn(alertVariants({ variant }), onDismiss && "pr-10", className),
    ...props,
    children: [
      children,
      onDismiss && /* @__PURE__ */ (0, import_jsx_runtime82.jsx)(
        "button",
        {
          type: "button",
          onClick: onDismiss,
          "aria-label": "Dismiss alert",
          className: cn(
            "absolute right-3 top-3 rounded p-0.5 opacity-60 transition-opacity hover:opacity-100",
            "focus:outline-none focus:ring-1 focus:ring-ring"
          ),
          children: /* @__PURE__ */ (0, import_jsx_runtime82.jsx)(import_lucide_react43.X, { className: "h-3.5 w-3.5" })
        }
      )
    ]
  }
));
Alert.displayName = "Alert";
var AlertTitle = React57.forwardRef(({ className, ...props }, ref) => (
  // eslint-disable-next-line jsx-a11y/heading-has-content
  /* @__PURE__ */ (0, import_jsx_runtime82.jsx)(
    "h5",
    {
      ref,
      className: cn("mb-1 font-semibold leading-snug tracking-tight", className),
      ...props
    }
  )
));
AlertTitle.displayName = "AlertTitle";
var AlertDescription = React57.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime82.jsx)(
  "div",
  {
    ref,
    className: cn("text-sm leading-relaxed opacity-90 [&_p]:leading-relaxed", className),
    ...props
  }
));
AlertDescription.displayName = "AlertDescription";

// src/components/ui/feedback/app-splash-screen.tsx
var import_lucide_react44 = require("lucide-react");
var import_jsx_runtime83 = require("react/jsx-runtime");
function AppSplashScreen({
  title = "Welcome",
  subtitle,
  message = "Initializing workspace...",
  icon,
  className
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime83.jsx)(
    "div",
    {
      className: cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center bg-background text-foreground select-none p-4",
        className
      ),
      children: /* @__PURE__ */ (0, import_jsx_runtime83.jsxs)("div", { className: "relative flex flex-col items-center text-center max-w-sm w-full animate-in fade-in duration-300", children: [
        /* @__PURE__ */ (0, import_jsx_runtime83.jsx)("div", { className: "w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shadow-lg mb-4", children: icon || /* @__PURE__ */ (0, import_jsx_runtime83.jsx)(import_lucide_react44.Sparkles, { className: "w-8 h-8" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime83.jsx)("h1", { className: "text-2xl font-bold tracking-tight mb-1 text-foreground", children: title }),
        subtitle && /* @__PURE__ */ (0, import_jsx_runtime83.jsx)("p", { className: "text-xs text-muted-foreground font-medium mb-6", children: subtitle }),
        /* @__PURE__ */ (0, import_jsx_runtime83.jsxs)("div", { className: "flex items-center gap-2.5 px-4 py-2 rounded-full bg-muted border border-border mt-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime83.jsx)(import_lucide_react44.Loader2, { className: "w-4 h-4 animate-spin text-primary shrink-0" }),
          /* @__PURE__ */ (0, import_jsx_runtime83.jsx)("span", { className: "text-xs font-medium text-foreground", children: message })
        ] })
      ] })
    }
  );
}

// src/components/ui/feedback/banner.tsx
var React58 = __toESM(require("react"), 1);
var import_lucide_react45 = require("lucide-react");
var import_jsx_runtime84 = require("react/jsx-runtime");
var Banner = React58.forwardRef(
  ({
    variant = "info",
    icon,
    title,
    children,
    action,
    dismissible = false,
    onClose,
    sticky = false,
    className,
    ...props
  }, ref) => {
    const [isVisible, setIsVisible] = React58.useState(true);
    const handleDismiss = () => {
      setIsVisible(false);
      onClose?.();
    };
    if (!isVisible) return null;
    function getBannerIcon() {
      if (icon) return icon;
      switch (variant) {
        case "info":
          return /* @__PURE__ */ (0, import_jsx_runtime84.jsx)(import_lucide_react45.Info, { className: "h-4 w-4 text-blue-600 dark:text-blue-400" });
        case "success":
          return /* @__PURE__ */ (0, import_jsx_runtime84.jsx)(import_lucide_react45.CheckCircle2, { className: "h-4 w-4 text-emerald-600 dark:text-emerald-400" });
        case "warning":
          return /* @__PURE__ */ (0, import_jsx_runtime84.jsx)(import_lucide_react45.AlertTriangle, { className: "h-4 w-4 text-amber-600 dark:text-amber-400" });
        case "destructive":
          return /* @__PURE__ */ (0, import_jsx_runtime84.jsx)(import_lucide_react45.AlertCircle, { className: "h-4 w-4 text-rose-600 dark:text-rose-400" });
        default:
          return /* @__PURE__ */ (0, import_jsx_runtime84.jsx)(import_lucide_react45.Info, { className: "h-4 w-4" });
      }
    }
    return /* @__PURE__ */ (0, import_jsx_runtime84.jsxs)(
      "aside",
      {
        ref,
        role: "region",
        "aria-label": title || "Notification banner",
        className: cn(
          "w-full px-4 py-3 border-b text-sm transition-all flex items-center justify-between gap-3",
          sticky && "sticky top-0 z-40 backdrop-blur-md",
          variant === "default" && "bg-muted/80 text-foreground border-border",
          variant === "info" && "bg-blue-50/90 text-blue-950 border-blue-200 dark:bg-blue-950/40 dark:text-blue-100 dark:border-blue-800",
          variant === "success" && "bg-emerald-50/90 text-emerald-950 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-100 dark:border-emerald-800",
          variant === "warning" && "bg-amber-50/90 text-amber-950 border-amber-200 dark:bg-amber-950/40 dark:text-amber-100 dark:border-amber-800",
          variant === "destructive" && "bg-rose-50/90 text-rose-950 border-rose-200 dark:bg-rose-950/40 dark:text-rose-100 dark:border-rose-800",
          className
        ),
        ...props,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime84.jsxs)("div", { className: "flex items-center gap-3 min-w-0", children: [
            /* @__PURE__ */ (0, import_jsx_runtime84.jsx)("div", { className: "shrink-0", children: getBannerIcon() }),
            /* @__PURE__ */ (0, import_jsx_runtime84.jsxs)("div", { className: "min-w-0 text-xs sm:text-sm", children: [
              title && /* @__PURE__ */ (0, import_jsx_runtime84.jsx)("span", { className: "font-semibold mr-1.5", children: title }),
              /* @__PURE__ */ (0, import_jsx_runtime84.jsx)("span", { className: "opacity-90", children })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime84.jsxs)("div", { className: "flex items-center gap-2 shrink-0", children: [
            action && /* @__PURE__ */ (0, import_jsx_runtime84.jsx)(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: action.onClick,
                className: "h-7 text-xs bg-background/80 hover:bg-background",
                children: action.label
              }
            ),
            dismissible && /* @__PURE__ */ (0, import_jsx_runtime84.jsx)(
              "button",
              {
                type: "button",
                onClick: handleDismiss,
                "aria-label": "Dismiss banner",
                className: "p-1 rounded hover:bg-black/5 dark:hover:bg-white/10 opacity-70 hover:opacity-100 transition-opacity",
                children: /* @__PURE__ */ (0, import_jsx_runtime84.jsx)(import_lucide_react45.X, { className: "h-4 w-4" })
              }
            )
          ] })
        ]
      }
    );
  }
);
Banner.displayName = "Banner";

// src/components/ui/feedback/copy-button.tsx
var React59 = __toESM(require("react"), 1);
var import_lucide_react46 = require("lucide-react");
var import_jsx_runtime85 = require("react/jsx-runtime");
var CopyButton = React59.forwardRef(
  ({
    value,
    timeout = 2e3,
    onCopy,
    showText = false,
    copiedText = "Copied!",
    defaultText = "Copy",
    variant = "ghost",
    size = "icon",
    className,
    ...props
  }, ref) => {
    const [hasCopied, setHasCopied] = React59.useState(false);
    const isMountedRef = React59.useRef(true);
    React59.useEffect(() => {
      isMountedRef.current = true;
      return () => {
        isMountedRef.current = false;
      };
    }, []);
    const handleCopy = async (e) => {
      e.stopPropagation();
      try {
        await navigator.clipboard.writeText(value);
        if (isMountedRef.current) {
          setHasCopied(true);
          onCopy?.();
        }
      } catch (err) {
        if (isMountedRef.current) {
          console.error("Failed to copy text: ", err);
        }
      }
    };
    React59.useEffect(() => {
      if (!hasCopied) return;
      const timer = setTimeout(() => {
        setHasCopied(false);
      }, timeout);
      return () => clearTimeout(timer);
    }, [hasCopied, timeout]);
    return /* @__PURE__ */ (0, import_jsx_runtime85.jsxs)(
      Button,
      {
        ref,
        type: "button",
        variant,
        size: showText ? "sm" : size,
        onClick: handleCopy,
        "aria-label": hasCopied ? copiedText : defaultText,
        className: cn(
          "transition-colors",
          hasCopied && "text-emerald-600 dark:text-emerald-400",
          className
        ),
        ...props,
        children: [
          hasCopied ? /* @__PURE__ */ (0, import_jsx_runtime85.jsx)(import_lucide_react46.Check, { className: "h-4 w-4 stroke-[2.5]" }) : /* @__PURE__ */ (0, import_jsx_runtime85.jsx)(import_lucide_react46.Copy, { className: "h-4 w-4" }),
          showText && /* @__PURE__ */ (0, import_jsx_runtime85.jsx)("span", { className: "ml-1.5", children: hasCopied ? copiedText : defaultText }),
          /* @__PURE__ */ (0, import_jsx_runtime85.jsx)("span", { className: "sr-only", "aria-live": "polite", "aria-atomic": "true", children: hasCopied ? copiedText : "" })
        ]
      }
    );
  }
);
CopyButton.displayName = "CopyButton";

// src/components/ui/feedback/empty.tsx
var import_class_variance_authority14 = require("class-variance-authority");
var import_jsx_runtime86 = require("react/jsx-runtime");
function Empty({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime86.jsx)(
    "div",
    {
      "data-slot": "empty",
      className: cn(
        "flex min-w-0 flex-1 flex-col items-center justify-center gap-6 text-balance rounded-lg border-dashed p-6 text-center md:p-12",
        className
      ),
      ...props
    }
  );
}
function EmptyHeader({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime86.jsx)(
    "div",
    {
      "data-slot": "empty-header",
      className: cn(
        "flex max-w-sm flex-col items-center gap-2 text-center",
        className
      ),
      ...props
    }
  );
}
var emptyMediaVariants = (0, import_class_variance_authority14.cva)(
  "mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "bg-muted text-foreground flex size-10 shrink-0 items-center justify-center rounded-lg [&_svg:not([class*='size-'])]:size-6"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function EmptyMedia({
  className,
  variant = "default",
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime86.jsx)(
    "div",
    {
      "data-slot": "empty-icon",
      "data-variant": variant,
      className: cn(emptyMediaVariants({ variant, className })),
      ...props
    }
  );
}
function EmptyTitle({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime86.jsx)(
    "div",
    {
      "data-slot": "empty-title",
      className: cn("text-lg font-medium tracking-tight", className),
      ...props
    }
  );
}
function EmptyDescription({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime86.jsx)(
    "div",
    {
      "data-slot": "empty-description",
      className: cn(
        "text-muted-foreground [&>a:hover]:text-primary text-sm/relaxed [&>a]:underline [&>a]:underline-offset-4",
        className
      ),
      ...props
    }
  );
}
function EmptyContent({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime86.jsx)(
    "div",
    {
      "data-slot": "empty-content",
      className: cn(
        "flex w-full min-w-0 max-w-sm flex-col items-center gap-4 text-balance text-sm",
        className
      ),
      ...props
    }
  );
}

// src/components/ui/feedback/empty-state.tsx
var import_lucide_react47 = require("lucide-react");
var import_jsx_runtime87 = require("react/jsx-runtime");
function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  actionIcon,
  onAction,
  bordered = true,
  className
}) {
  const renderIcon = () => {
    if (!icon) return /* @__PURE__ */ (0, import_jsx_runtime87.jsx)(import_lucide_react47.FolderSearch, { className: "w-8 h-8 text-muted-foreground/60" });
    if (typeof icon === "function") {
      const IconComponent = icon;
      return /* @__PURE__ */ (0, import_jsx_runtime87.jsx)(IconComponent, { className: "w-8 h-8 text-muted-foreground/60" });
    }
    return icon;
  };
  return /* @__PURE__ */ (0, import_jsx_runtime87.jsxs)(
    "div",
    {
      className: cn(
        "flex flex-col items-center justify-center py-16 px-6 text-center rounded-xl",
        bordered && "border-2 border-dashed border-border/60 bg-muted/20",
        className
      ),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime87.jsx)("div", { className: "flex items-center justify-center w-14 h-14 rounded-full bg-muted mb-4 text-muted-foreground", children: renderIcon() }),
        /* @__PURE__ */ (0, import_jsx_runtime87.jsx)("h3", { className: "text-base font-semibold text-foreground mb-1", children: title }),
        description ? /* @__PURE__ */ (0, import_jsx_runtime87.jsx)("p", { className: "text-sm text-muted-foreground max-w-sm mb-6 leading-relaxed", children: description }) : null,
        actionLabel && onAction && /* @__PURE__ */ (0, import_jsx_runtime87.jsxs)(Button, { onClick: onAction, className: "gap-2", children: [
          actionIcon,
          actionLabel
        ] })
      ]
    }
  );
}

// src/components/ui/feedback/impersonation-banner.tsx
var import_lucide_react48 = require("lucide-react");
var import_jsx_runtime88 = require("react/jsx-runtime");
function ImpersonationBanner({
  impersonatedUser,
  onEndImpersonation,
  isLoading = false,
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime88.jsxs)(
    "div",
    {
      role: "alert",
      className: cn(
        "sticky top-0 z-50 flex items-center justify-between border-b border-amber-300 bg-amber-500 px-4 py-2 text-slate-950 shadow-md",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime88.jsxs)("div", { className: "flex items-center gap-2.5 min-w-0", children: [
          /* @__PURE__ */ (0, import_jsx_runtime88.jsx)(import_lucide_react48.UserCheck, { className: "h-4 w-4 shrink-0 text-slate-950" }),
          /* @__PURE__ */ (0, import_jsx_runtime88.jsxs)("p", { className: "text-xs font-semibold truncate", children: [
            "Impersonating: ",
            /* @__PURE__ */ (0, import_jsx_runtime88.jsx)("span", { className: "underline", children: impersonatedUser.name || impersonatedUser.email }),
            impersonatedUser.role ? ` (${impersonatedUser.role})` : "",
            impersonatedUser.orgName ? ` \u2022 ${impersonatedUser.orgName}` : ""
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime88.jsxs)(
          Button,
          {
            type: "button",
            size: "sm",
            variant: "outline",
            onClick: onEndImpersonation,
            disabled: isLoading,
            className: "h-7 border-slate-900/40 bg-slate-950 text-white hover:bg-slate-900 text-xs shrink-0 ml-3",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime88.jsx)(import_lucide_react48.LogOut, { className: "h-3 w-3 mr-1" }),
              "Exit Impersonation"
            ]
          }
        )
      ]
    }
  );
}

// src/components/ui/feedback/install-pwa-banner.tsx
var React60 = __toESM(require("react"), 1);
var import_lucide_react49 = require("lucide-react");
var import_jsx_runtime89 = require("react/jsx-runtime");
function InstallPwaBanner({
  appName = "App",
  appDescription = "Add to your home screen for quick offline access and high-speed loading.",
  appIcon,
  storageKey = "pwa_install_banner_dismissed",
  className,
  onInstall,
  onDismiss
}) {
  const { isIOS, isStandalone } = usePlatform();
  const [deferredPrompt, setDeferredPrompt] = React60.useState(null);
  const [isDismissed, setIsDismissed] = React60.useState(false);
  const [showIosGuide, setShowIosGuide] = React60.useState(false);
  React60.useEffect(() => {
    try {
      if (typeof sessionStorage !== "undefined" && sessionStorage.getItem(storageKey)) {
        setIsDismissed(true);
      }
    } catch {
    }
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, [storageKey]);
  if (isStandalone || isDismissed) return null;
  if (!deferredPrompt && !isIOS) return null;
  const handleInstall = async () => {
    triggerHaptic("medium");
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setDeferredPrompt(null);
        onInstall?.();
      }
    } else if (isIOS) {
      setShowIosGuide(!showIosGuide);
    }
  };
  const handleDismiss = () => {
    triggerHaptic("light");
    setIsDismissed(true);
    try {
      if (typeof sessionStorage !== "undefined") {
        sessionStorage.setItem(storageKey, "true");
      }
    } catch {
    }
    onDismiss?.();
  };
  return /* @__PURE__ */ (0, import_jsx_runtime89.jsxs)(
    "aside",
    {
      "aria-label": `Install ${appName} Banner`,
      className: cn(
        "fixed bottom-20 md:bottom-6 right-4 left-4 md:left-auto md:w-96 z-40",
        "bg-background/95 backdrop-blur-md border border-border rounded-2xl shadow-xl p-4 transition-all",
        className
      ),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime89.jsxs)("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime89.jsx)("div", { className: "w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0", children: appIcon || /* @__PURE__ */ (0, import_jsx_runtime89.jsx)(import_lucide_react49.Smartphone, { className: "w-5 h-5" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime89.jsxs)("div", { className: "flex-1 min-w-0 pr-1", children: [
            /* @__PURE__ */ (0, import_jsx_runtime89.jsxs)("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ (0, import_jsx_runtime89.jsxs)("h4", { className: "text-sm font-bold text-foreground leading-tight", children: [
                "Install ",
                appName
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime89.jsxs)("span", { className: "text-[10px] bg-primary/15 text-primary font-semibold px-1.5 py-0.5 rounded-full flex items-center gap-0.5", children: [
                /* @__PURE__ */ (0, import_jsx_runtime89.jsx)(import_lucide_react49.Sparkles, { className: "w-2.5 h-2.5" }),
                " PWA"
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime89.jsx)("p", { className: "text-xs text-muted-foreground mt-1 leading-relaxed", children: appDescription }),
            /* @__PURE__ */ (0, import_jsx_runtime89.jsxs)("div", { className: "mt-3 flex items-center gap-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime89.jsxs)(
                Button,
                {
                  size: "sm",
                  onClick: handleInstall,
                  className: "gap-1.5 text-xs font-semibold h-8 rounded-lg shadow-sm",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime89.jsx)(import_lucide_react49.Download, { className: "w-3.5 h-3.5" }),
                    isIOS ? "How to Install" : "Install Now"
                  ]
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime89.jsx)(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  onClick: handleDismiss,
                  className: "text-xs text-muted-foreground hover:text-foreground h-8",
                  children: "Not now"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime89.jsx)(
            "button",
            {
              onClick: handleDismiss,
              "aria-label": "Dismiss banner",
              className: "text-muted-foreground hover:text-foreground p-1 rounded-lg transition-colors -mr-1 -mt-1",
              children: /* @__PURE__ */ (0, import_jsx_runtime89.jsx)(import_lucide_react49.X, { className: "w-4 h-4" })
            }
          )
        ] }),
        showIosGuide && /* @__PURE__ */ (0, import_jsx_runtime89.jsxs)("div", { className: "mt-3 pt-3 border-t border-border/60 text-xs text-muted-foreground space-y-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime89.jsx)("p", { className: "font-semibold text-foreground flex items-center gap-1", children: "Install on iOS Safari:" }),
          /* @__PURE__ */ (0, import_jsx_runtime89.jsxs)("ol", { className: "list-decimal list-inside space-y-1 pl-1", children: [
            /* @__PURE__ */ (0, import_jsx_runtime89.jsxs)("li", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ (0, import_jsx_runtime89.jsx)("span", { children: "1. Tap the Share button" }),
              /* @__PURE__ */ (0, import_jsx_runtime89.jsx)(import_lucide_react49.Share, { className: "w-3.5 h-3.5 inline text-primary" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime89.jsxs)("li", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ (0, import_jsx_runtime89.jsx)("span", { children: "2. Scroll down & select" }),
              /* @__PURE__ */ (0, import_jsx_runtime89.jsxs)("span", { className: "font-medium text-foreground flex items-center gap-1 bg-muted px-1.5 py-0.5 rounded", children: [
                /* @__PURE__ */ (0, import_jsx_runtime89.jsx)(import_lucide_react49.PlusSquare, { className: "w-3.5 h-3.5" }),
                " Add to Home Screen"
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime89.jsxs)("li", { children: [
              "3. Tap ",
              /* @__PURE__ */ (0, import_jsx_runtime89.jsx)("strong", { children: "Add" }),
              " in the top-right corner"
            ] })
          ] })
        ] })
      ]
    }
  );
}

// src/components/ui/feedback/loading-state.tsx
var import_lucide_react50 = require("lucide-react");
var import_jsx_runtime90 = require("react/jsx-runtime");
function LoadingState({
  label = "Loading data...",
  spinnerSize = 28,
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime90.jsxs)(
    Card,
    {
      className: cn(
        "flex min-h-48 flex-col items-center justify-center gap-3 px-6 py-10 text-slate-500 dark:text-slate-400",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime90.jsx)(
          import_lucide_react50.Loader2,
          {
            className: "animate-spin text-indigo-600 dark:text-indigo-400",
            style: { width: spinnerSize, height: spinnerSize }
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime90.jsx)("p", { className: "text-sm font-medium", children: label })
      ]
    }
  );
}

// src/components/ui/feedback/onboarding-notice.tsx
var import_lucide_react51 = require("lucide-react");
var import_jsx_runtime91 = require("react/jsx-runtime");
function getNoticeStyle(tone) {
  switch (tone) {
    case "error":
      return "border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-300";
    case "success":
      return "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300";
    case "warning":
      return "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-300";
    default:
      return "border-slate-200 bg-slate-50 text-slate-800 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-200";
  }
}
function renderNoticeIcon(tone) {
  switch (tone) {
    case "error":
      return /* @__PURE__ */ (0, import_jsx_runtime91.jsx)(import_lucide_react51.AlertCircle, { className: "mt-0.5 h-4 w-4 shrink-0" });
    case "success":
      return /* @__PURE__ */ (0, import_jsx_runtime91.jsx)(import_lucide_react51.CheckCircle2, { className: "mt-0.5 h-4 w-4 shrink-0" });
    case "warning":
      return /* @__PURE__ */ (0, import_jsx_runtime91.jsx)(import_lucide_react51.AlertTriangle, { className: "mt-0.5 h-4 w-4 shrink-0" });
    default:
      return /* @__PURE__ */ (0, import_jsx_runtime91.jsx)(import_lucide_react51.Info, { className: "mt-0.5 h-4 w-4 shrink-0" });
  }
}
function OnboardingNotice({
  message,
  tone = "info",
  children,
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime91.jsxs)(
    "div",
    {
      className: cn(
        "flex items-start gap-2.5 rounded-lg border px-3.5 py-2.5 text-xs font-medium leading-relaxed shadow-xs",
        getNoticeStyle(tone),
        className
      ),
      role: tone === "error" ? "alert" : "status",
      ...props,
      children: [
        renderNoticeIcon(tone),
        /* @__PURE__ */ (0, import_jsx_runtime91.jsx)("div", { className: "flex-1", children: message || children })
      ]
    }
  );
}

// src/components/ui/feedback/progress-ring.tsx
var import_jsx_runtime92 = require("react/jsx-runtime");
function getProgressColor(clamped) {
  if (clamped >= 80) return "text-emerald-500";
  if (clamped >= 50) return "text-amber-500";
  return "text-rose-500";
}
function getProgressBgColor(clamped) {
  if (clamped >= 80) return "text-emerald-100 dark:text-emerald-950/60";
  if (clamped >= 50) return "text-amber-100 dark:text-amber-950/60";
  return "text-rose-100 dark:text-rose-950/60";
}
function ProgressRing({
  percentage,
  size = 80,
  strokeWidth = 8,
  className,
  color: colorOverride,
  showLabel = false,
  ...props
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(100, Math.max(0, percentage));
  const strokeDashoffset = circumference - clamped / 100 * circumference;
  const autoColor = getProgressColor(clamped);
  const color = colorOverride ?? autoColor;
  const bgColor = getProgressBgColor(clamped);
  const isCustomColor = Boolean(
    colorOverride && /^#|^rgb|^hsl|^var\(/i.test(colorOverride)
  );
  const strokeColor = isCustomColor ? colorOverride : "currentColor";
  const progressCircleClass = isCustomColor ? void 0 : color;
  const roundedPercentage = Math.round(clamped);
  return /* @__PURE__ */ (0, import_jsx_runtime92.jsxs)(
    "div",
    {
      role: "progressbar",
      "aria-valuenow": roundedPercentage,
      "aria-valuemin": 0,
      "aria-valuemax": 100,
      "aria-label": props["aria-label"] || "Progress",
      className: cn("relative inline-flex items-center justify-center", className),
      ...props,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime92.jsxs)("svg", { width: size, height: size, className: "transform -rotate-90", children: [
          /* @__PURE__ */ (0, import_jsx_runtime92.jsx)("title", { children: `Progress: ${roundedPercentage}%` }),
          /* @__PURE__ */ (0, import_jsx_runtime92.jsx)(
            "circle",
            {
              className: bgColor,
              strokeWidth,
              stroke: "currentColor",
              fill: "transparent",
              r: radius,
              cx: size / 2,
              cy: size / 2
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime92.jsx)(
            "circle",
            {
              className: cn(progressCircleClass, "transition-all duration-1000 ease-in-out"),
              strokeWidth,
              strokeDasharray: circumference,
              strokeDashoffset,
              strokeLinecap: "round",
              stroke: strokeColor,
              fill: "transparent",
              r: radius,
              cx: size / 2,
              cy: size / 2
            }
          )
        ] }),
        showLabel ? /* @__PURE__ */ (0, import_jsx_runtime92.jsxs)("span", { className: "absolute text-xs font-bold text-slate-800 dark:text-slate-200", children: [
          Math.round(clamped),
          "%"
        ] }) : null
      ]
    }
  );
}

// src/components/ui/feedback/role-empty-state.tsx
var import_react7 = require("react");
var import_lucide_react52 = require("lucide-react");
var import_jsx_runtime93 = require("react/jsx-runtime");
function RoleEmptyState({
  title = "Nothing here yet",
  subtitle = "Get started by completing the action above.",
  icon: Icon2 = import_lucide_react52.Search,
  actionLabel,
  onAction,
  isPrimary = false,
  loadingMs = 0,
  helpTitle = "Need Help?",
  helpDescription = "Tutorials and documentation for this section.",
  helpLinks = []
}) {
  const [loadingComplete, setLoadingComplete] = (0, import_react7.useState)(false);
  const [prevLoadingMs, setPrevLoadingMs] = (0, import_react7.useState)(loadingMs);
  if (prevLoadingMs !== loadingMs) {
    setPrevLoadingMs(loadingMs);
    setLoadingComplete(false);
  }
  const [isHelpOpen, setIsHelpOpen] = (0, import_react7.useState)(false);
  const isLoading = loadingMs > 0 && !loadingComplete;
  (0, import_react7.useEffect)(() => {
    if (loadingMs <= 0) return;
    const t = setTimeout(() => setLoadingComplete(true), loadingMs);
    return () => clearTimeout(t);
  }, [loadingMs]);
  if (isLoading) {
    return /* @__PURE__ */ (0, import_jsx_runtime93.jsxs)("div", { className: "flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-border rounded-xl bg-muted/30 min-h-[300px]", children: [
      /* @__PURE__ */ (0, import_jsx_runtime93.jsx)(Skeleton, { className: "w-20 h-20 rounded-full mb-4" }),
      /* @__PURE__ */ (0, import_jsx_runtime93.jsx)(Skeleton, { className: "h-6 w-48 mb-2" }),
      /* @__PURE__ */ (0, import_jsx_runtime93.jsx)(Skeleton, { className: "h-4 w-64 mb-6" }),
      /* @__PURE__ */ (0, import_jsx_runtime93.jsx)(Skeleton, { className: "h-10 w-32 rounded-md" })
    ] });
  }
  const handleAction = onAction ?? (() => setIsHelpOpen(true));
  return /* @__PURE__ */ (0, import_jsx_runtime93.jsxs)(import_jsx_runtime93.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime93.jsxs)("div", { className: "flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-border rounded-xl bg-muted/30 min-h-[300px] animate-in fade-in duration-500", children: [
      /* @__PURE__ */ (0, import_jsx_runtime93.jsx)("div", { className: "bg-muted p-4 rounded-full mb-4", children: /* @__PURE__ */ (0, import_jsx_runtime93.jsx)(Icon2, { className: "w-12 h-12 text-muted-foreground opacity-50" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime93.jsx)("h3", { className: "text-lg font-semibold text-foreground mb-1", children: title }),
      /* @__PURE__ */ (0, import_jsx_runtime93.jsx)("p", { className: "text-sm text-muted-foreground max-w-sm mb-6", children: subtitle }),
      actionLabel && /* @__PURE__ */ (0, import_jsx_runtime93.jsxs)(
        Button,
        {
          variant: isPrimary ? "default" : "outline",
          className: isPrimary ? "" : "text-foreground gap-2",
          onClick: handleAction,
          children: [
            !isPrimary && /* @__PURE__ */ (0, import_jsx_runtime93.jsx)(import_lucide_react52.BookOpen, { className: "w-4 h-4" }),
            actionLabel
          ]
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime93.jsx)(Sheet, { open: isHelpOpen, onOpenChange: setIsHelpOpen, children: /* @__PURE__ */ (0, import_jsx_runtime93.jsxs)(SheetContent, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime93.jsxs)(SheetHeader, { className: "mb-6", children: [
        /* @__PURE__ */ (0, import_jsx_runtime93.jsx)(SheetTitle, { className: "text-xl text-foreground", children: helpTitle }),
        /* @__PURE__ */ (0, import_jsx_runtime93.jsx)(SheetDescription, { children: helpDescription })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime93.jsxs)("div", { className: "space-y-6", children: [
        /* @__PURE__ */ (0, import_jsx_runtime93.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime93.jsxs)("h4", { className: "font-semibold text-foreground mb-3 text-sm flex items-center gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime93.jsx)(import_lucide_react52.PlayCircle, { className: "w-4 h-4 text-indigo-500" }),
            "Video Tutorials"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime93.jsxs)("div", { className: "group relative rounded-lg overflow-hidden cursor-pointer border border-border", children: [
            /* @__PURE__ */ (0, import_jsx_runtime93.jsxs)("div", { className: "aspect-video bg-muted flex items-center justify-center relative", children: [
              /* @__PURE__ */ (0, import_jsx_runtime93.jsx)(import_lucide_react52.PlayCircle, { className: "w-10 h-10 text-foreground opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all" }),
              /* @__PURE__ */ (0, import_jsx_runtime93.jsx)("div", { className: "absolute bottom-2 right-2 bg-background/80 text-foreground text-[10px] px-1.5 py-0.5 rounded", children: "2:45" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime93.jsxs)("div", { className: "p-3 bg-card", children: [
              /* @__PURE__ */ (0, import_jsx_runtime93.jsx)("p", { className: "text-sm font-medium text-foreground line-clamp-1", children: "Getting Started Guide" }),
              /* @__PURE__ */ (0, import_jsx_runtime93.jsx)("p", { className: "text-xs text-muted-foreground mt-1", children: "Learn the basics in 3 minutes" })
            ] })
          ] })
        ] }),
        helpLinks.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime93.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime93.jsxs)("h4", { className: "font-semibold text-foreground mb-3 text-sm flex items-center gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime93.jsx)(import_lucide_react52.FileText, { className: "w-4 h-4 text-blue-500" }),
            "Documentation"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime93.jsx)("div", { className: "space-y-2", children: helpLinks.map((link) => /* @__PURE__ */ (0, import_jsx_runtime93.jsxs)(
            "a",
            {
              href: link.href,
              className: "flex items-center justify-between p-3 rounded-md bg-muted/50 hover:bg-muted transition-colors border border-border group",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime93.jsx)("span", { className: "text-sm text-foreground font-medium", children: link.label }),
                /* @__PURE__ */ (0, import_jsx_runtime93.jsx)(import_lucide_react52.ExternalLink, { className: "w-3.5 h-3.5 text-muted-foreground group-hover:text-primary" })
              ]
            },
            link.href
          )) })
        ] })
      ] })
    ] }) })
  ] });
}

// src/components/ui/feedback/skeleton-list.tsx
var import_jsx_runtime94 = require("react/jsx-runtime");
function SkeletonList({ count: count2 = 5 }) {
  return /* @__PURE__ */ (0, import_jsx_runtime94.jsxs)("div", { className: "space-y-4 w-full p-4 border border-slate-200 shadow-sm rounded-lg bg-white", children: [
    /* @__PURE__ */ (0, import_jsx_runtime94.jsxs)("div", { className: "flex items-center gap-4 mb-6", children: [
      /* @__PURE__ */ (0, import_jsx_runtime94.jsx)(Skeleton, { className: "h-10 w-64 bg-slate-100" }),
      /* @__PURE__ */ (0, import_jsx_runtime94.jsx)(Skeleton, { className: "h-10 w-32 bg-slate-100" }),
      /* @__PURE__ */ (0, import_jsx_runtime94.jsx)(Skeleton, { className: "h-10 w-32 bg-slate-100" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime94.jsx)("div", { className: "space-y-3", children: Array.from({ length: count2 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime94.jsx)("div", { className: "flex items-center gap-4 border-b border-slate-100 pb-3", children: /* @__PURE__ */ (0, import_jsx_runtime94.jsx)(Skeleton, { className: "h-12 w-full bg-slate-50" }) }, i)) })
  ] });
}

// src/components/ui/feedback/sonner.tsx
var import_next_themes = require("next-themes");
var import_sonner = require("sonner");
var import_jsx_runtime95 = require("react/jsx-runtime");
var Toaster = ({ ...props }) => {
  const { theme = "system" } = (0, import_next_themes.useTheme)();
  const sonnerTheme = theme === "dark" || theme === "light" || theme === "system" ? theme : "system";
  return /* @__PURE__ */ (0, import_jsx_runtime95.jsx)(
    import_sonner.Toaster,
    {
      theme: sonnerTheme,
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};

// src/components/ui/feedback/spinner.tsx
var import_lucide_react53 = require("lucide-react");
var import_jsx_runtime96 = require("react/jsx-runtime");
function Spinner({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime96.jsx)(
    import_lucide_react53.Loader2Icon,
    {
      role: "status",
      "aria-label": "Loading",
      className: cn("size-4 animate-spin", className),
      ...props
    }
  );
}

// src/components/ui/feedback/success-micro-interaction.tsx
var import_canvas_confetti = __toESM(require("canvas-confetti"), 1);
var randomInRange = (min, max) => Math.random() * (max - min) + min;
function runConfettiAnimation(options) {
  const {
    duration = 2e3,
    intervalMs = 250,
    baseParticleCount = 50,
    colors,
    startVelocity = 30,
    spread = 360,
    ticks = 60,
    zIndex = 100,
    disableForReducedMotion,
    getOrigins = (rnd) => [
      { x: rnd(0.1, 0.3), y: Math.random() - 0.2 },
      { x: rnd(0.7, 0.9), y: Math.random() - 0.2 }
    ]
  } = options;
  const animationEnd = Date.now() + duration;
  const baseDefaults = {
    startVelocity,
    spread,
    ticks,
    zIndex,
    disableForReducedMotion
  };
  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();
    if (timeLeft <= 0) {
      clearInterval(interval);
      return;
    }
    const particleCount = baseParticleCount * (timeLeft / duration);
    const origins = getOrigins(randomInRange);
    for (const origin of origins) {
      (0, import_canvas_confetti.default)({
        ...baseDefaults,
        particleCount,
        origin,
        colors
      });
    }
  }, intervalMs);
  return interval;
}
var triggerSuccessConfetti = () => {
  return runConfettiAnimation({
    duration: 2e3,
    baseParticleCount: 50,
    startVelocity: 30,
    colors: ["#10b981", "#3b82f6", "#f59e0b"]
  });
};
var triggerMicroConfetti = (x, y) => {
  (0, import_canvas_confetti.default)({
    particleCount: 30,
    spread: 60,
    origin: { x, y },
    colors: ["#10b981", "#3b82f6", "#f59e0b"],
    disableForReducedMotion: true
  });
};
var triggerEmeraldConfetti = () => {
  return runConfettiAnimation({
    duration: 2500,
    baseParticleCount: 75,
    startVelocity: 45,
    colors: ["#059669", "#10b981", "#34d399", "#6ee7b7"]
  });
};
var triggerGovernanceConfetti = () => {
  return runConfettiAnimation({
    duration: 2e3,
    baseParticleCount: 40,
    startVelocity: 25,
    colors: ["#d97706", "#fbbf24", "#fcd34d", "#1e3a8a", "#1e40af"],
    getOrigins: (rnd) => [{ x: rnd(0.2, 0.8), y: -0.1 }]
  });
};

// src/components/ui/feedback/toast.tsx
var React61 = __toESM(require("react"), 1);
var ToastPrimitives = __toESM(require("@radix-ui/react-toast"), 1);
var import_class_variance_authority15 = require("class-variance-authority");
var import_lucide_react54 = require("lucide-react");
var import_jsx_runtime97 = require("react/jsx-runtime");
var ToastProvider = ToastPrimitives.Provider;
var ToastViewport = React61.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime97.jsx)(
  ToastPrimitives.Viewport,
  {
    ref,
    className: cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    ),
    ...props
  }
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;
var toastVariants = (0, import_class_variance_authority15.cva)(
  "group pointer-events-auto relative flex w-full items-center justify-between overflow-hidden rounded-lg border shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none",
  {
    variants: {
      variant: {
        // Phase 4 fix: use bg-card (theme aware) instead of hardcoded bg-white/slate-950
        default: "border bg-card text-card-foreground px-4 py-3 pr-10",
        destructive: "destructive group border-red-600 bg-red-600 text-white px-4 py-3 pr-10",
        success: "group border-emerald-600 bg-emerald-600 text-white px-4 py-3 pr-10",
        warning: "group border-amber-500 bg-amber-500 text-amber-950 px-4 py-3 pr-10",
        info: "group border-blue-600 bg-blue-600 text-white px-4 py-3 pr-10"
      }
    },
    defaultVariants: { variant: "default" }
  }
);
var Toast = React61.forwardRef(({ className, variant, ...props }, ref) => {
  return /* @__PURE__ */ (0, import_jsx_runtime97.jsx)(
    ToastPrimitives.Root,
    {
      ref,
      className: cn(toastVariants({ variant }), className),
      ...props
    }
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;
var ToastAction = React61.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime97.jsx)(
  ToastPrimitives.Action,
  {
    ref,
    className: cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className
    ),
    ...props
  }
));
ToastAction.displayName = ToastPrimitives.Action.displayName;
var ToastClose = React61.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime97.jsx)(
  ToastPrimitives.Close,
  {
    ref,
    className: cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-60 transition-opacity hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-100 group-[.destructive]:hover:text-white group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600 group-[.success]:text-emerald-100 group-[.success]:hover:text-white group-[.warning]:text-amber-100 group-[.warning]:hover:text-white group-[.info]:text-blue-100 group-[.info]:hover:text-white",
      className
    ),
    "toast-close": "",
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime97.jsx)(import_lucide_react54.X, { className: "h-4 w-4" })
  }
));
ToastClose.displayName = ToastPrimitives.Close.displayName;
var ToastTitle = React61.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime97.jsx)(
  ToastPrimitives.Title,
  {
    ref,
    className: cn("text-sm font-semibold", className),
    ...props
  }
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;
var ToastDescription = React61.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime97.jsx)(
  ToastPrimitives.Description,
  {
    ref,
    className: cn("text-sm opacity-90", className),
    ...props
  }
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

// src/components/ui/feedback/toaster.tsx
var import_jsx_runtime98 = require("react/jsx-runtime");
function Toaster2() {
  const { toasts } = useToast();
  return /* @__PURE__ */ (0, import_jsx_runtime98.jsxs)(ToastProvider, { children: [
    toasts.map(function({ id, title, description, action, ...props }) {
      return /* @__PURE__ */ (0, import_jsx_runtime98.jsxs)(Toast, { ...props, children: [
        /* @__PURE__ */ (0, import_jsx_runtime98.jsxs)("div", { className: "grid gap-0.5 flex-1 min-w-0", children: [
          title && /* @__PURE__ */ (0, import_jsx_runtime98.jsx)(ToastTitle, { children: title }),
          description && /* @__PURE__ */ (0, import_jsx_runtime98.jsx)(ToastDescription, { children: description })
        ] }),
        action,
        /* @__PURE__ */ (0, import_jsx_runtime98.jsx)(ToastClose, {})
      ] }, id);
    }),
    /* @__PURE__ */ (0, import_jsx_runtime98.jsx)(ToastViewport, {})
  ] });
}

// src/components/ui/feedback/workspace-banner.tsx
var import_jsx_runtime99 = require("react/jsx-runtime");
function WorkspaceBanner({
  title,
  subtitle,
  icon: Icon2,
  gradientClassName = "from-indigo-600 to-indigo-800",
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime99.jsx)(
    "div",
    {
      className: cn(
        "rounded-xl bg-gradient-to-r px-5 py-4 text-white shadow-sm",
        gradientClassName,
        className
      ),
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime99.jsxs)("div", { className: "flex items-center gap-3", children: [
        Icon2 ? /* @__PURE__ */ (0, import_jsx_runtime99.jsx)("div", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 backdrop-blur-xs", children: /* @__PURE__ */ (0, import_jsx_runtime99.jsx)(Icon2, { className: "h-5 w-5 text-white" }) }) : null,
        /* @__PURE__ */ (0, import_jsx_runtime99.jsxs)("div", { className: "space-y-0.5 min-w-0", children: [
          /* @__PURE__ */ (0, import_jsx_runtime99.jsx)("h2", { className: "text-lg font-semibold tracking-tight truncate", children: title }),
          subtitle ? /* @__PURE__ */ (0, import_jsx_runtime99.jsx)("p", { className: "text-sm text-white/80 line-clamp-1", children: subtitle }) : null
        ] })
      ] })
    }
  );
}

// src/components/ui/core/calendar.tsx
var React62 = __toESM(require("react"), 1);
var import_lucide_react55 = require("lucide-react");
var import_react_day_picker = require("react-day-picker");
var import_jsx_runtime100 = require("react/jsx-runtime");
var CalendarContext = React62.createContext(null);
function useCalendarContext() {
  const context = React62.useContext(CalendarContext);
  if (!context) {
    throw new Error("Calendar subcomponents must be used within a Calendar");
  }
  return context;
}
function CalendarMonthCaption({
  calendarMonth,
  displayIndex: _displayIndex,
  className,
  ...captionProps
}) {
  const [openMonth, setOpenMonth] = React62.useState(false);
  const [openYear, setOpenYear] = React62.useState(false);
  const selectedYearRef = React62.useRef(null);
  const { goToMonth } = (0, import_react_day_picker.useDayPicker)();
  const {
    baseYear,
    startMonth: propStartMonth,
    endMonth: propEndMonth,
    setDirection
  } = useCalendarContext();
  const displayMonth = calendarMonth.date;
  const currentYear = displayMonth.getFullYear();
  const currentMonth = displayMonth.getMonth();
  const minYear = propStartMonth ? propStartMonth.getFullYear() : baseYear - 100;
  const maxYear = propEndMonth ? propEndMonth.getFullYear() : baseYear + 100;
  const startYear = React62.useMemo(
    () => Math.max(baseYear - 100, minYear),
    [baseYear, minYear]
  );
  const endYear = React62.useMemo(
    () => Math.min(baseYear + 100, maxYear),
    [baseYear, maxYear]
  );
  const years = React62.useMemo(
    () => Array.from(
      { length: endYear - startYear + 1 },
      (_, i) => startYear + i
    ),
    [startYear, endYear]
  );
  const months = React62.useMemo(
    () => Array.from({ length: 12 }).map((_, i) => ({
      label: new Date(0, i).toLocaleString("en-US", {
        month: "long"
      }),
      value: i
    })),
    []
  );
  React62.useEffect(() => {
    if (openYear) {
      const timer = setTimeout(() => {
        selectedYearRef.current?.scrollIntoView({
          block: "center",
          behavior: "smooth"
        });
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [openYear]);
  return /* @__PURE__ */ (0, import_jsx_runtime100.jsxs)("div", { className: cn("flex items-center gap-2 pl-1", className), ...captionProps, children: [
    /* @__PURE__ */ (0, import_jsx_runtime100.jsxs)(
      Popover,
      {
        open: openMonth,
        onOpenChange: (val) => {
          setOpenMonth(val);
          if (val) setOpenYear(false);
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime100.jsx)(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime100.jsxs)(
            "button",
            {
              type: "button",
              className: "h-8 px-2 text-sm font-semibold hover:bg-accent rounded-md flex items-center gap-1",
              children: [
                months[currentMonth]?.label,
                /* @__PURE__ */ (0, import_jsx_runtime100.jsx)(import_lucide_react55.ChevronDown, { className: "h-3 w-3 opacity-60" })
              ]
            }
          ) }),
          /* @__PURE__ */ (0, import_jsx_runtime100.jsx)(PopoverContent, { forceMount: true, className: "w-48 p-2 z-50", children: /* @__PURE__ */ (0, import_jsx_runtime100.jsx)("div", { className: "grid grid-cols-3 gap-2", children: months.map((m) => /* @__PURE__ */ (0, import_jsx_runtime100.jsx)(
            "button",
            {
              type: "button",
              onClick: () => {
                if (m.value !== currentMonth) {
                  setDirection(
                    m.value > currentMonth ? "next" : "prev"
                  );
                  goToMonth(new Date(currentYear, m.value, 1));
                }
                setOpenMonth(false);
              },
              className: cn(
                "text-sm p-2 rounded-md transition-colors",
                currentMonth === m.value ? "bg-primary text-primary-foreground hover:bg-primary" : "hover:bg-accent"
              ),
              children: m.label.slice(0, 3)
            },
            m.value
          )) }) })
        ]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime100.jsxs)(
      Popover,
      {
        open: openYear,
        onOpenChange: (val) => {
          setOpenYear(val);
          if (val) setOpenMonth(false);
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime100.jsx)(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime100.jsxs)(
            "button",
            {
              type: "button",
              className: "h-8 px-2 text-sm font-semibold hover:bg-accent rounded-md flex items-center gap-1",
              children: [
                currentYear,
                /* @__PURE__ */ (0, import_jsx_runtime100.jsx)(import_lucide_react55.ChevronDown, { className: "h-3 w-3 opacity-60" })
              ]
            }
          ) }),
          /* @__PURE__ */ (0, import_jsx_runtime100.jsx)(
            PopoverContent,
            {
              forceMount: true,
              className: "w-56 h-60 overflow-y-auto p-2 z-50",
              children: /* @__PURE__ */ (0, import_jsx_runtime100.jsx)("div", { className: "grid grid-cols-3 gap-2", children: years.map((year) => /* @__PURE__ */ (0, import_jsx_runtime100.jsx)(
                "button",
                {
                  type: "button",
                  ref: year === currentYear ? selectedYearRef : null,
                  onClick: () => {
                    if (year !== currentYear) {
                      setDirection(year > currentYear ? "next" : "prev");
                    }
                    goToMonth(new Date(year, currentMonth, 1));
                    setOpenYear(false);
                  },
                  className: cn(
                    "text-sm p-2 rounded-md transition-colors",
                    year === currentYear ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                  ),
                  children: year
                },
                year
              )) })
            }
          )
        ]
      }
    )
  ] });
}
function CalendarWeeks({
  className,
  style,
  children,
  ...weekProps
}) {
  const { weeksRef, height } = useCalendarContext();
  return /* @__PURE__ */ (0, import_jsx_runtime100.jsx)(
    "tbody",
    {
      ref: weeksRef,
      className,
      ...weekProps,
      style: {
        ...style,
        height,
        overflow: "hidden",
        transition: "height 220ms cubic-bezier(0.4, 0, 0.2, 1)"
      },
      children
    }
  );
}
function CalendarMonthComponent({
  children,
  calendarMonth: _calendarMonth,
  displayIndex: _displayIndex,
  className,
  ...monthProps
}) {
  const { direction } = useCalendarContext();
  return /* @__PURE__ */ (0, import_jsx_runtime100.jsx)(
    "div",
    {
      ...monthProps,
      className: cn(
        "flex flex-col gap-2 calendar-month-wrapper",
        direction && `rdp-month direction-${direction}`,
        className
      ),
      children
    }
  );
}
function CalendarChevron({
  orientation,
  className,
  ...chevronProps
}) {
  const { setDirection } = useCalendarContext();
  const Icon2 = orientation === "left" ? import_lucide_react55.ChevronLeft : import_lucide_react55.ChevronRight;
  return /* @__PURE__ */ (0, import_jsx_runtime100.jsx)(
    Icon2,
    {
      ...chevronProps,
      className: cn("h-4 w-4 cursor-pointer", className),
      onClick: () => setDirection(orientation === "left" ? "prev" : "next")
    }
  );
}
var defaultComponents = {
  MonthCaption: CalendarMonthCaption,
  Weeks: CalendarWeeks,
  Month: CalendarMonthComponent,
  Chevron: CalendarChevron
};
function Calendar({
  className,
  classNames,
  showOutsideDays = false,
  showTodayDot = true,
  components,
  ...props
}) {
  const [direction, setDirection] = React62.useState(null);
  const [baseYear] = React62.useState(() => (/* @__PURE__ */ new Date()).getFullYear());
  const weeksRef = React62.useRef(null);
  const [height, setHeight] = React62.useState(void 0);
  React62.useEffect(() => {
    if (weeksRef.current) {
      const newHeight = weeksRef.current.offsetHeight;
      setHeight(newHeight);
    }
    if (direction) {
      const timer = setTimeout(() => {
        setDirection(null);
      }, 220);
      return () => clearTimeout(timer);
    }
  }, [direction]);
  const contextValue = React62.useMemo(
    () => ({
      direction,
      setDirection,
      baseYear,
      startMonth: props.startMonth,
      endMonth: props.endMonth,
      weeksRef,
      height
    }),
    [direction, baseYear, height, props.startMonth, props.endMonth]
  );
  const mergedComponents = React62.useMemo(
    () => ({
      ...defaultComponents,
      ...components
    }),
    [components]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime100.jsx)(CalendarContext.Provider, { value: contextValue, children: /* @__PURE__ */ (0, import_jsx_runtime100.jsx)(
    import_react_day_picker.DayPicker,
    {
      showOutsideDays,
      className: cn("p-3 select-none relative", className),
      classNames: {
        months: "flex flex-col sm:flex-row gap-4",
        month_caption: "flex justify-start w-full pt-1 items-center calendar-month-caption mb-2",
        nav: "space-x-1 flex items-center absolute right-3 top-3 z-10",
        button_previous: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 rounded-full bg-transparent p-0 text-muted-foreground hover:text-foreground"
        ),
        button_next: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 rounded-full bg-transparent p-0 text-muted-foreground hover:text-foreground"
        ),
        month_grid: "w-full border-collapse mt-1",
        weekdays: "grid grid-cols-7",
        weekday: "text-muted-foreground text-[0.75rem] font-normal text-center h-10 w-9 flex items-center justify-center",
        week: "grid grid-cols-7",
        day: "relative flex items-center justify-center p-0 h-9 w-9",
        day_button: cn(
          "relative rdp-day_button h-9 w-9 rounded-full p-0 text-sm font-normal transition-colors",
          "hover:bg-accent hover:text-accent-foreground",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/30"
        ),
        selected: "rdp-selected [&>button]:!bg-primary [&>button]:!text-primary-foreground [&>button]:rounded-full",
        today: cn("rdp-today font-medium", showTodayDot && "rdp-today-dot"),
        outside: "opacity-30",
        disabled: "text-muted-foreground opacity-30 pointer-events-none",
        hidden: "invisible",
        ...classNames
      },
      components: mergedComponents,
      formatters: {
        formatWeekdayName: (date) => date.toLocaleDateString("en-US", { weekday: "narrow" }),
        ...props.formatters
      },
      startMonth: props.startMonth || new Date((/* @__PURE__ */ new Date()).getFullYear() - 100, 0),
      endMonth: props.endMonth || new Date((/* @__PURE__ */ new Date()).getFullYear() + 100, 11),
      ...props
    }
  ) });
}
Calendar.displayName = "Calendar";

// src/components/ui/core/date-range-picker.tsx
var React63 = __toESM(require("react"), 1);
var import_date_fns = require("date-fns");
var import_lucide_react56 = require("lucide-react");
var import_jsx_runtime101 = require("react/jsx-runtime");
function isSameDateRange(a, b) {
  if (a === b) return true;
  if (!a && !b) return true;
  if (!a || !b) return false;
  const fromEqual = !a.from && !b.from || Boolean(a.from) && Boolean(b.from) && a.from.getTime() === b.from.getTime();
  const toEqual = !a.to && !b.to || Boolean(a.to) && Boolean(b.to) && a.to.getTime() === b.to.getTime();
  return fromEqual && toEqual;
}
var DatePickerWithRange = React63.forwardRef(function DatePickerWithRange2({
  className,
  date,
  defaultDate,
  setDate,
  onSelect,
  variant = "outline",
  placeholder = "Pick a date range",
  triggerClassName,
  calendarClassName,
  cancelLabel = "Cancel",
  applyLabel = "Apply Range",
  align = "start",
  numberOfMonths = 2,
  disabled,
  defaultMonth,
  showOutsideDays = false,
  triggerAriaLabel,
  dialogAriaLabel = "Date range picker",
  ...props
}, ref) {
  const [isOpen, setIsOpen] = React63.useState(false);
  const [internalDate, setInternalDate] = React63.useState(
    defaultDate
  );
  const [tempDate, setTempDate] = React63.useState(
    date !== void 0 ? date : internalDate
  );
  const datePickerID = React63.useId();
  const activeDate = date !== void 0 ? date : internalDate;
  const prevDefaultDateRef = React63.useRef(defaultDate);
  const prevDateRef = React63.useRef(date);
  React63.useEffect(() => {
    const wasControlled = prevDateRef.current !== void 0;
    prevDateRef.current = date;
    if (date === void 0) {
      if (wasControlled || !isSameDateRange(prevDefaultDateRef.current, defaultDate)) {
        prevDefaultDateRef.current = defaultDate;
        setInternalDate(defaultDate);
      }
    }
  }, [date, defaultDate]);
  React63.useEffect(() => {
    if (isOpen) {
      setTempDate(activeDate);
    }
  }, [isOpen, activeDate]);
  const handleApply = () => {
    if (setDate) setDate(tempDate);
    if (!date) setInternalDate(tempDate);
    if (onSelect) onSelect(tempDate);
    setIsOpen(false);
  };
  const computedTriggerAriaLabel = React63.useMemo(() => {
    if (triggerAriaLabel) return triggerAriaLabel;
    if (activeDate?.from && activeDate?.to) {
      return `Selected date range from ${(0, import_date_fns.format)(activeDate.from, "MMMM d, yyyy")} to ${(0, import_date_fns.format)(activeDate.to, "MMMM d, yyyy")}`;
    }
    if (activeDate?.from) {
      return `Selected start date ${(0, import_date_fns.format)(activeDate.from, "MMMM d, yyyy")}`;
    }
    return placeholder;
  }, [triggerAriaLabel, activeDate, placeholder]);
  const activeDateLabel = React63.useMemo(() => {
    if (activeDate?.from && activeDate?.to) {
      return /* @__PURE__ */ (0, import_jsx_runtime101.jsxs)(import_jsx_runtime101.Fragment, { children: [
        (0, import_date_fns.format)(activeDate.from, "LLL dd, y"),
        " -",
        " ",
        (0, import_date_fns.format)(activeDate.to, "LLL dd, y")
      ] });
    }
    if (activeDate?.from) {
      return (0, import_date_fns.format)(activeDate.from, "LLL dd, y");
    }
    return /* @__PURE__ */ (0, import_jsx_runtime101.jsx)("span", { children: placeholder });
  }, [activeDate, placeholder]);
  const resolvedDefaultMonth = defaultMonth ?? tempDate?.from ?? activeDate?.from;
  return /* @__PURE__ */ (0, import_jsx_runtime101.jsx)("div", { ref, className: cn("grid gap-2", className), ...props, children: /* @__PURE__ */ (0, import_jsx_runtime101.jsxs)(Popover, { open: isOpen, onOpenChange: setIsOpen, children: [
    /* @__PURE__ */ (0, import_jsx_runtime101.jsx)(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime101.jsxs)(
      Button,
      {
        id: `date-${datePickerID}`,
        variant,
        className: cn(
          "w-[300px] justify-start text-left font-normal",
          !activeDate && "text-muted-foreground",
          triggerClassName
        ),
        "aria-label": computedTriggerAriaLabel,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime101.jsx)(import_lucide_react56.Calendar, { className: "mr-2 h-4 w-4" }),
          activeDateLabel
        ]
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime101.jsxs)(
      PopoverContent,
      {
        forceMount: true,
        className: "w-auto p-0",
        align,
        "aria-label": dialogAriaLabel,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime101.jsx)(
            Calendar,
            {
              showOutsideDays,
              ...calendarClassName ? { className: calendarClassName } : {},
              mode: "range",
              ...resolvedDefaultMonth ? { defaultMonth: resolvedDefaultMonth } : {},
              ...tempDate ? { selected: tempDate } : {},
              onSelect: setTempDate,
              numberOfMonths,
              ...disabled ? { disabled } : {}
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime101.jsxs)("div", { className: "p-3 border-t flex justify-end gap-2 bg-muted/30", children: [
            /* @__PURE__ */ (0, import_jsx_runtime101.jsx)(Button, { variant: "ghost", size: "sm", onClick: () => setIsOpen(false), children: cancelLabel }),
            /* @__PURE__ */ (0, import_jsx_runtime101.jsxs)(Button, { size: "sm", onClick: handleApply, className: "gap-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime101.jsx)(import_lucide_react56.Check, { className: "w-4 h-4" }),
              " ",
              applyLabel
            ] })
          ] })
        ]
      }
    )
  ] }) });
});
DatePickerWithRange.displayName = "DatePickerWithRange";

// src/components/ui/core/item.tsx
var import_react_slot6 = require("@radix-ui/react-slot");
var import_class_variance_authority16 = require("class-variance-authority");
var import_jsx_runtime102 = require("react/jsx-runtime");
function ItemGroup({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime102.jsx)(
    "div",
    {
      role: "list",
      "data-slot": "item-group",
      className: cn("group/item-group flex flex-col", className),
      ...props
    }
  );
}
function ItemSeparator({
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime102.jsx)(
    Separator,
    {
      "data-slot": "item-separator",
      orientation: "horizontal",
      className: cn("my-0", className),
      ...props
    }
  );
}
var itemVariants = (0, import_class_variance_authority16.cva)(
  "group/item [a]:hover:bg-accent/50 focus-visible:border-ring focus-visible:ring-ring/50 [a]:transition-colors flex flex-wrap items-center rounded-md border border-transparent text-sm outline-none transition-colors duration-100 focus-visible:ring-[3px]",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border-border",
        muted: "bg-muted/50"
      },
      size: {
        default: "gap-4 p-4 ",
        sm: "gap-2.5 px-4 py-3"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Item9({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? import_react_slot6.Slot : "div";
  return /* @__PURE__ */ (0, import_jsx_runtime102.jsx)(
    Comp,
    {
      "data-slot": "item",
      "data-variant": variant,
      "data-size": size,
      className: cn(itemVariants({ variant, size, className })),
      ...props
    }
  );
}
var itemMediaVariants = (0, import_class_variance_authority16.cva)(
  "flex shrink-0 items-center justify-center gap-2 group-has-[[data-slot=item-description]]/item:translate-y-0.5 group-has-[[data-slot=item-description]]/item:self-start [&_svg]:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "bg-muted size-8 rounded-sm border [&_svg:not([class*='size-'])]:size-4",
        image: "size-10 overflow-hidden rounded-sm [&_img]:size-full [&_img]:object-cover"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function ItemMedia({
  className,
  variant = "default",
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime102.jsx)(
    "div",
    {
      "data-slot": "item-media",
      "data-variant": variant,
      className: cn(itemMediaVariants({ variant, className })),
      ...props
    }
  );
}
function ItemContent({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime102.jsx)(
    "div",
    {
      "data-slot": "item-content",
      className: cn(
        "flex flex-1 flex-col gap-1 [&+[data-slot=item-content]]:flex-none",
        className
      ),
      ...props
    }
  );
}
function ItemTitle({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime102.jsx)(
    "div",
    {
      "data-slot": "item-title",
      className: cn(
        "flex w-fit items-center gap-2 text-sm font-medium leading-snug",
        className
      ),
      ...props
    }
  );
}
function ItemDescription({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime102.jsx)(
    "p",
    {
      "data-slot": "item-description",
      className: cn(
        "text-muted-foreground line-clamp-2 text-balance text-sm font-normal leading-normal",
        "[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",
        className
      ),
      ...props
    }
  );
}
function ItemActions({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime102.jsx)(
    "div",
    {
      "data-slot": "item-actions",
      className: cn("flex items-center gap-2", className),
      ...props
    }
  );
}
function ItemHeader({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime102.jsx)(
    "div",
    {
      "data-slot": "item-header",
      className: cn(
        "flex basis-full items-center justify-between gap-2",
        className
      ),
      ...props
    }
  );
}
function ItemFooter({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime102.jsx)(
    "div",
    {
      "data-slot": "item-footer",
      className: cn(
        "flex basis-full items-center justify-between gap-2",
        className
      ),
      ...props
    }
  );
}

// src/components/ui/core/kbd.tsx
var React64 = __toESM(require("react"), 1);
var import_jsx_runtime103 = require("react/jsx-runtime");
function Kbd({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime103.jsx)(
    "kbd",
    {
      "data-slot": "kbd",
      className: cn(
        // Base: muted pill
        "bg-muted text-muted-foreground pointer-events-none inline-flex h-5 w-fit min-w-5",
        "select-none items-center justify-center gap-1 rounded-sm px-1.5",
        "font-sans text-xs font-medium leading-none",
        "[&_svg:not([class*='size-'])]:size-3",
        // Inside tooltips: invert colours
        "[[data-slot=tooltip-content]_&]:bg-background/20 [[data-slot=tooltip-content]_&]:text-background",
        "dark:[[data-slot=tooltip-content]_&]:bg-background/10",
        className
      ),
      ...props
    }
  );
}
function KbdGroup({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime103.jsx)(
    "kbd",
    {
      "data-slot": "kbd-group",
      className: cn("inline-flex items-center gap-1", className),
      ...props
    }
  );
}
function isMac() {
  if (typeof window === "undefined") return false;
  return /Mac|iPhone|iPad|iPod/.test(navigator.platform) || /Mac/.test(navigator.userAgent);
}
function KbdShortcut({ keys, meta = false, os, className }) {
  const resolvedOs = os ?? (isMac() ? "mac" : "windows");
  const isMacOs = resolvedOs === "mac";
  const allKeys = [
    ...meta ? [isMacOs ? "\u2318" : "Ctrl"] : [],
    ...keys
  ];
  return /* @__PURE__ */ (0, import_jsx_runtime103.jsx)(
    "span",
    {
      "data-slot": "kbd-shortcut",
      className: cn("inline-flex items-center gap-1 font-sans", className),
      children: allKeys.map((key, i) => /* @__PURE__ */ (0, import_jsx_runtime103.jsxs)(React64.Fragment, { children: [
        i > 0 && /* @__PURE__ */ (0, import_jsx_runtime103.jsx)(
          "span",
          {
            "aria-hidden": "true",
            className: "text-muted-foreground text-[10px] select-none leading-none",
            children: "+"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime103.jsx)(Kbd, { children: key })
      ] }, i))
    }
  );
}

// src/components/ui/core/language-toggle.tsx
var import_lucide_react57 = require("lucide-react");
var import_jsx_runtime104 = require("react/jsx-runtime");
var DEFAULT_LANGUAGES = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "es", name: "Spanish", nativeName: "Espa\xF1ol" },
  { code: "fr", name: "French", nativeName: "Fran\xE7ais" },
  { code: "de", name: "German", nativeName: "Deutsch" },
  { code: "ja", name: "Japanese", nativeName: "\u65E5\u672C\u8A9E" },
  { code: "zh", name: "Chinese", nativeName: "\u4E2D\u6587" }
];
function LanguageToggle({
  language,
  setLanguage,
  languages = DEFAULT_LANGUAGES,
  className
}) {
  const fallbackLanguage = languages[0] ?? {
    code: language,
    name: String(language).toUpperCase(),
    nativeName: String(language).toUpperCase()
  };
  const current = languages.find((l) => l.code === language) ?? fallbackLanguage;
  return /* @__PURE__ */ (0, import_jsx_runtime104.jsxs)(DropdownMenu, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime104.jsx)(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime104.jsxs)(
      Button,
      {
        variant: "outline",
        size: "sm",
        className: `gap-1.5 ${className ?? ""}`,
        "aria-label": `Language: ${current.name}. Click to change.`,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime104.jsx)(import_lucide_react57.Globe, { className: "h-4 w-4 shrink-0" }),
          /* @__PURE__ */ (0, import_jsx_runtime104.jsx)("span", { className: "font-semibold text-xs tracking-wide", children: current.code.toUpperCase() }),
          /* @__PURE__ */ (0, import_jsx_runtime104.jsx)(import_lucide_react57.ChevronDown, { className: "h-3.5 w-3.5 opacity-50 transition-transform duration-200 group-data-[state=open]:rotate-180 shrink-0" })
        ]
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime104.jsx)(DropdownMenuContent, { align: "end", className: "w-[200px]", children: languages.map((lang) => /* @__PURE__ */ (0, import_jsx_runtime104.jsx)(
      DropdownMenuItem,
      {
        onClick: () => setLanguage(lang.code),
        className: language === lang.code ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted/60",
        children: /* @__PURE__ */ (0, import_jsx_runtime104.jsxs)("span", { className: "inline-flex items-center gap-2.5 w-full", children: [
          /* @__PURE__ */ (0, import_jsx_runtime104.jsx)("kbd", { className: "rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] font-semibold leading-none text-muted-foreground shrink-0", children: lang.code.toUpperCase() }),
          /* @__PURE__ */ (0, import_jsx_runtime104.jsxs)("span", { className: "flex flex-col gap-0.5 min-w-0", children: [
            /* @__PURE__ */ (0, import_jsx_runtime104.jsx)("span", { className: "text-sm leading-none", children: lang.nativeName ?? lang.name }),
            lang.nativeName && lang.nativeName !== lang.name && /* @__PURE__ */ (0, import_jsx_runtime104.jsx)("span", { className: "text-xs text-muted-foreground leading-none", children: lang.name })
          ] })
        ] })
      },
      lang.code
    )) })
  ] });
}

// src/components/ui/core/typography.tsx
var import_class_variance_authority17 = require("class-variance-authority");
var import_jsx_runtime105 = require("react/jsx-runtime");
var typographyVariants = (0, import_class_variance_authority17.cva)("text-foreground font-sans", {
  variants: {
    variant: {
      h1: "font-display scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      h2: "font-display scroll-m-20 text-3xl font-semibold tracking-tight",
      h3: "font-display scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "font-display scroll-m-20 text-xl font-semibold tracking-tight",
      lead: "text-lg text-muted-foreground",
      p: "leading-7 [&:not(:first-child)]:mt-4",
      small: "text-sm font-medium leading-none",
      muted: "text-sm text-muted-foreground",
      caption: "text-xs text-muted-foreground",
      code: "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-foreground"
    }
  },
  defaultVariants: {
    variant: "p"
  }
});
var defaultTagByVariant = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  lead: "p",
  p: "p",
  small: "small",
  muted: "p",
  caption: "span",
  code: "code"
};
var Typography = ({
  as,
  variant = "p",
  className,
  children,
  ...props
}) => {
  const Comp = as ?? defaultTagByVariant[variant];
  return /* @__PURE__ */ (0, import_jsx_runtime105.jsx)(
    Comp,
    {
      "data-slot": "typography",
      className: cn(typographyVariants({ variant }), className),
      ...props,
      children
    }
  );
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  ActiveFilterBadge,
  Alert,
  AlertDescription,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertTitle,
  AmountSummaryCard,
  AnalyticsEngine,
  AnalyticsQueue,
  AppSplashScreen,
  AspectRatio,
  AsyncSelect,
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
  Badge,
  Banner,
  BilingualTooltip,
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  Calendar,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardSeparator,
  CardTitle,
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
  Checkbox,
  Collapsible,
  CollapsibleCard,
  CollapsibleCardContent,
  CollapsibleCardTrigger,
  CollapsibleContent,
  CollapsibleTrigger,
  Combobox,
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
  CompensationRangeDisplay,
  ConfirmDialog,
  ConsoleAdapter,
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuPortal,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
  CopyButton,
  CreateEntityPanel,
  DEFAULT_LANGUAGES,
  DataTable,
  DataTablePagination,
  DatePickerWithRange,
  DetailGrid,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  DomTracker,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyState,
  EmptyTitle,
  ErrorBoundary,
  ErrorState,
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
  FileUpload,
  FilterSelect,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  GoogleAnalyticsAdapter,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  HttpAdapter,
  ImageViewer,
  ImpersonationBanner,
  InfoList,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
  InstallPwaBanner,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
  KPICard,
  Kbd,
  KbdGroup,
  KbdShortcut,
  Label,
  LanguageToggle,
  LineItemsCard,
  LoadingState,
  MatchScoreGauge,
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarPortal,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
  MetricCard,
  MetricGrid,
  MetricRangeDisplay,
  MetricTicker,
  MetricVerificationCard,
  MixpanelAdapter,
  MobileBottomNav,
  MultiSelect,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  OnboardingNotice,
  OnboardingPanel,
  PageHeader,
  PageHeaderSkeleton,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaymentLedger,
  PersonaDropdown,
  PipelineKanban,
  Popover,
  PopoverAnchor,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
  Progress,
  ProgressRing,
  ProofOfWorkCard,
  QuotaCard,
  REGEX_BANK_ACCOUNT,
  REGEX_EMAIL,
  REGEX_PHONE,
  REGEX_POSTAL_CODE,
  REGEX_ROUTING_CODE,
  REGEX_TAX_ID,
  REGEX_URL,
  RadarSweep,
  RadioGroup,
  RadioGroupItem,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  RoleEmptyState,
  SalaryRangeDisplay,
  ScrollArea,
  ScrollBar,
  SearchField,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  Separator,
  SessionManager,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  Skeleton,
  SkeletonList,
  SkillTagCloud,
  Slider,
  Sonner,
  SonnerToaster,
  Spinner,
  StandardCard,
  StatGrid,
  StatusBadge,
  Stepper,
  Switch,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  Timeline,
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  Toaster,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Typography,
  VALIDATION_MESSAGES,
  VALIDATION_MESSAGES_HI,
  WorkspaceBanner,
  avatarVariants,
  badgeVariants,
  buttonGroupVariants,
  buttonVariants,
  cleanPhoneNumber,
  clearBlobStorageConfig,
  cn,
  downloadFileFromStorage,
  downloadFileSecurely,
  downloadFromBackend,
  exportData,
  exportToCSV,
  fetchBlobStorageConfig,
  filterCitiesByState,
  formatBytes,
  formatCurrency,
  formatDate,
  formatDateTime,
  formatFileSize,
  formatLocalizedDate,
  formatLocalizedDateTime,
  formatLocalizedNumber,
  formatNumber,
  formatPercent,
  formatQuantity,
  formatRelativeTime,
  formatWeight,
  generateUUID,
  getAnalyticsEngine,
  getPlatformInfo,
  initAnalytics,
  isValidEmail,
  isValidPhone,
  maskSensitiveValue,
  nativeShare,
  navigationMenuTriggerStyle,
  reducer,
  runConfettiAnimation,
  setBlobStorageApiBase,
  setGlobalAuditLogger,
  toCityOptions,
  toStateOptions,
  toast,
  toggleVariants,
  triggerEmeraldConfetti,
  triggerGovernanceConfetti,
  triggerHaptic,
  triggerMicroConfetti,
  triggerSuccessConfetti,
  typographyVariants,
  uploadFileToStorage,
  useDebounce,
  useErrorBoundary,
  useFormField,
  useIsMobile,
  useLocalStorage,
  useOfflineQueue,
  usePWAInstall,
  usePlatform,
  useSidebar,
  useToast,
  validateBankAccount,
  validateDateRange,
  validateEmail,
  validatePassword,
  validatePhone,
  validatePositiveNumber,
  validatePostalCode,
  validateRequired,
  validateRoutingCode,
  validateTaxId,
  validateTimeRange,
  validateUrl,
  withAuditTrail,
  withErrorBoundary
});
//# sourceMappingURL=index.cjs.map