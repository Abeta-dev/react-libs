'use client';

// src/components/ui/data-display/data-table.tsx
import * as React2 from "react";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";

// src/components/ui/data-display/table.tsx
import * as React from "react";

// src/lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// src/components/ui/data-display/table.tsx
import { jsx } from "react/jsx-runtime";
var Table = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { className: "relative w-full overflow-auto", children: /* @__PURE__ */ jsx(
  "table",
  {
    ref,
    className: cn("w-full caption-bottom text-sm", className),
    ...props
  }
) }));
Table.displayName = "Table";
var TableHeader = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "thead",
  {
    ref,
    className: cn("[&_tr]:border-b [&_tr]:border-border/60 bg-muted/30", className),
    ...props
  }
));
TableHeader.displayName = "TableHeader";
var TableBody = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "tbody",
  {
    ref,
    className: cn("[&_tr:last-child]:border-0", className),
    ...props
  }
));
TableBody.displayName = "TableBody";
var TableFooter = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
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
var TableRow = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
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
var TableHead = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
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
var TableCell = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
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
var TableCaption = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "caption",
  {
    ref,
    className: cn("mt-4 text-sm text-muted-foreground", className),
    ...props
  }
));
TableCaption.displayName = "TableCaption";

// src/components/ui/feedback/skeleton.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
function Skeleton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx2(
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
import { jsx as jsx3, jsxs } from "react/jsx-runtime";
function SortIcon({ active, direction }) {
  if (!active || !direction) return /* @__PURE__ */ jsx3(ChevronsUpDown, { className: "ml-1 h-3.5 w-3.5 opacity-40" });
  return direction === "asc" ? /* @__PURE__ */ jsx3(ChevronUp, { className: "ml-1 h-3.5 w-3.5 text-primary" }) : /* @__PURE__ */ jsx3(ChevronDown, { className: "ml-1 h-3.5 w-3.5 text-primary" });
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
  if (React2.isValidElement(value)) return value;
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
  return /* @__PURE__ */ jsxs("div", { ref, className: cn("w-full", className), ...props, children: [
    /* @__PURE__ */ jsx3("div", { className: "rounded-md border", children: /* @__PURE__ */ jsxs(Table, { "aria-busy": isLoading, children: [
      caption ? /* @__PURE__ */ jsx3(TableCaption, { children: caption }) : null,
      /* @__PURE__ */ jsx3(TableHeader, { children: /* @__PURE__ */ jsx3(TableRow, { className: "hover:bg-transparent", children: columns.map((col) => {
        const isSortable = Boolean(col.sortable && onSort);
        const sortState = getAriaSort(col.key, sortKey, sortDirection, isSortable);
        return /* @__PURE__ */ jsx3(
          TableHead,
          {
            "aria-sort": sortState,
            className: col.headerClassName,
            children: isSortable ? /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: () => handleSort(col.key),
                className: "inline-flex items-center gap-1 font-medium hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded select-none cursor-pointer text-left",
                children: [
                  /* @__PURE__ */ jsx3("span", { children: col.header }),
                  /* @__PURE__ */ jsx3(
                    SortIcon,
                    {
                      active: sortKey === col.key,
                      direction: sortKey === col.key ? sortDirection ?? null : null
                    }
                  )
                ]
              }
            ) : /* @__PURE__ */ jsx3("div", { className: "flex items-center", children: col.header })
          },
          col.key
        );
      }) }) }),
      /* @__PURE__ */ jsxs(TableBody, { children: [
        isLoading && Array.from({ length: skeletonRows }).map((_, i) => /* @__PURE__ */ jsx3(TableRow, { className: "hover:bg-transparent", children: columns.map((col) => /* @__PURE__ */ jsx3(TableCell, { className: col.className, children: /* @__PURE__ */ jsx3(Skeleton, { className: "h-4 w-full rounded" }) }, col.key)) }, i)),
        !isLoading && data.length === 0 && /* @__PURE__ */ jsx3(TableRow, { className: "hover:bg-transparent", children: /* @__PURE__ */ jsx3(TableCell, { colSpan: columns.length, children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center gap-2 py-12 text-muted-foreground", children: [
          emptyIcon ?? /* @__PURE__ */ jsx3(
            "svg",
            {
              className: "h-10 w-10 opacity-30",
              fill: "none",
              stroke: "currentColor",
              viewBox: "0 0 24 24",
              children: /* @__PURE__ */ jsx3(
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
          /* @__PURE__ */ jsx3("p", { className: "text-sm", children: emptyMessage })
        ] }) }) }),
        !isLoading && data.length > 0 && data.map((row, i) => /* @__PURE__ */ jsx3(
          TableRow,
          {
            className: cn(
              hoverable && "cursor-default",
              onRowClick && "cursor-pointer"
            ),
            onClick: onRowClick ? () => onRowClick(row) : void 0,
            "data-state": void 0,
            children: columns.map((col) => /* @__PURE__ */ jsx3(TableCell, { className: col.className, children: col.cell ? col.cell(row, i) : renderCellValue(row[col.key]) }, col.key))
          },
          rowKey ? rowKey(row, i) : i
        ))
      ] })
    ] }) }),
    pagination && totalPages > 1 && /* @__PURE__ */ jsxs("div", { className: "mt-3 flex items-center justify-between gap-2 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxs("span", { className: "shrink-0 tabular-nums", children: [
        Math.min((pagination.page - 1) * pagination.pageSize + 1, pagination.total),
        "\u2013",
        Math.min(pagination.page * pagination.pageSize, pagination.total),
        " ",
        /* @__PURE__ */ jsxs("span", { className: "hidden sm:inline", children: [
          "of ",
          pagination.total
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsx3(
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
          const window = 5;
          const half = Math.floor(window / 2);
          let start = Math.max(1, pagination.page - half);
          const end = Math.min(totalPages, start + window - 1);
          if (end - start < window - 1) start = Math.max(1, end - window + 1);
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
            (p, i) => p === "\u2026" ? /* @__PURE__ */ jsx3("span", { className: "px-1 text-xs select-none", children: "\u2026" }, `ellipsis-${i}`) : /* @__PURE__ */ jsx3(
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
        /* @__PURE__ */ jsx3(
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
var DataTable = React2.forwardRef(DataTableInternal);
DataTable.displayName = "DataTable";
export {
  DataTable
};
//# sourceMappingURL=data-table.js.map