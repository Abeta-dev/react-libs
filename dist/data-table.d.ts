import * as React from 'react';

type SortDirection = "asc" | "desc" | null;
interface DataTableColumn<T, K extends keyof T = keyof T> {
    key: (K & string) | (string & {});
    header: string;
    /** Render a custom cell for this column */
    cell?: (row: T, index: number) => React.ReactNode;
    /** If true, column header is clickable for sorting */
    sortable?: boolean;
    className?: string;
    headerClassName?: string;
}
interface DataTablePaginationProps {
    page: number;
    pageSize: number;
    total: number;
    onPageChange: (page: number) => void;
}
interface DataTableProps<T> extends React.HTMLAttributes<HTMLDivElement> {
    columns: DataTableColumn<T>[];
    data: T[];
    /** Row key extractor — defaults to index if not provided */
    rowKey?: ((row: T, index: number) => string | number) | undefined;
    isLoading?: boolean | undefined;
    emptyMessage?: string | undefined;
    emptyIcon?: React.ReactNode | undefined;
    /** Number of skeleton rows to show while loading */
    skeletonRows?: number | undefined;
    pagination?: DataTablePaginationProps | undefined;
    /** Current sort state */
    sortKey?: string | undefined;
    sortDirection?: SortDirection | undefined;
    onSort?: ((key: string, direction: SortDirection) => void) | undefined;
    className?: string | undefined;
    /** Highlight rows on hover (default: true) */
    hoverable?: boolean | undefined;
    /** Callback when a row is clicked */
    onRowClick?: ((row: T) => void) | undefined;
    /** Optional table caption */
    caption?: string | undefined;
}
declare const DataTable: <T extends Record<string, unknown>>(props: DataTableProps<T> & React.RefAttributes<HTMLDivElement>) => React.ReactElement | null;

export { DataTable, type DataTableColumn, type DataTablePaginationProps, type DataTableProps, type SortDirection };
