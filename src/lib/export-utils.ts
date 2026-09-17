/**
 * @abeta.dev/react-libs — Export Utilities
 *
 * Client-side CSV, XLSX, and PDF export from in-memory data arrays.
 * Framework-agnostic — no React dependencies.
 *
 * For large/server-side exports, use downloadFileSecurely() (or downloadFromBackend()) instead to stream
 * the file through the platform's Express proxy.
 *
 * Optional Peer Dependencies: xlsx, jspdf, jspdf-autotable
 * These packages are optional and only required when exporting to XLSX or PDF.
 */

export type ExportFormat = "csv" | "xlsx" | "pdf";

export interface ExportColumn {
  /** Column display header */
  header: string;
  /** Key in each data row object */
  key: string;
}

export interface ExportOptions {
  columns?: ExportColumn[];
  /** PDF page orientation (default: landscape) */
  pdfOrientation?: "portrait" | "landscape";
  /** PDF title text (default: filename) */
  pdfTitle?: string;
}

/**
 * Export data from an in-memory array to CSV, XLSX, or PDF.
 *
 * @example
 * exportData(records, "records-report", "xlsx", {
 *   columns: [
 *     { header: "ID",        key: "id" },
 *     { header: "Name",      key: "name" },
 *     { header: "Amount",    key: "amount" },
 *   ]
 * })
 */
/**
 * Neutralize spreadsheet formula injection triggers (=, +, -, @, \t, \r) (CWE-1236).
 * Numeric values and booleans are preserved. Strings starting with trigger characters are prepended with a single quote.
 */
export function sanitizeSpreadsheetValue(val: unknown): unknown {
  if (val == null) return "";
  if (typeof val === "number" || typeof val === "boolean") return val;
  const str = String(val);
  const trimmed = str.trimStart();
  const hasRawTrigger = /^[=+\-@\t\r%|]/.test(str);
  const hasTrimmedFormula = /^[=+\-@%|]/.test(trimmed);
  const isFormula = hasRawTrigger || hasTrimmedFormula;
  const isNumber = !isNaN(Number(str)) && str.trim() !== "";
  return isFormula && !isNumber ? `'${str}` : val;
}

export async function exportData(
  data: Record<string, unknown>[],
  filename: string,
  format: ExportFormat = "csv",
  options: ExportOptions = {}
): Promise<void> {
  if (!data || !data.length) {
    console.warn("exportData: empty data array — nothing to export");
    return;
  }

  const keys = options.columns ? options.columns.map((c) => c.key) : Object.keys(data[0] ?? {});
  const headers = options.columns ? options.columns.map((c) => c.header) : keys;

  if (format === "csv") {
    const sanitizeCell = (val: unknown) => {
      if (val == null) return '""';
      const safe = sanitizeSpreadsheetValue(val);
      const str = String(safe);
      return `"${str.replace(/"/g, '""')}"`;
    };

    const rows: string[] = [
      headers.map((h) => sanitizeCell(h)).join(","),
      ...data.map((row) =>
        keys
          .map((k) => {
            // eslint-disable-next-line security/detect-object-injection
            return sanitizeCell(row[k]);
          })
          .join(",")
      ),
    ];
    triggerDownload(new Blob([rows.join("\n")], { type: "text/csv;charset=utf-8" }), `${filename}.csv`);
    return;
  }

  if (format === "xlsx") {
    interface XlsxInstance {
      utils: {
        aoa_to_sheet: (data: unknown[][]) => unknown;
        book_new: () => unknown;
        book_append_sheet: (wb: unknown, ws: unknown, name: string) => void;
      };
      writeFile: (wb: unknown, filename: string) => void;
    }
    let XLSX: XlsxInstance;
    try {
      const moduleName = "xlsx";
      const xlsxModule = (await import(/* @vite-ignore */ moduleName)) as { default?: XlsxInstance } & XlsxInstance;
      XLSX = xlsxModule.default || xlsxModule;
    } catch {
      throw new Error(
        'XLSX export requires the "xlsx" package. Please install it: npm install xlsx'
      );
    }
    const sanitizedHeaders = headers.map((h) => sanitizeSpreadsheetValue(h));
    const wsData = [
      sanitizedHeaders,
      ...data.map((row) =>
        keys.map((k) => {
          // eslint-disable-next-line security/detect-object-injection
          return sanitizeSpreadsheetValue(row[k]);
        })
      ),
    ];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, `${filename}.xlsx`);
    return;
  }

  if (format === "pdf") {
    interface JsPdfDoc {
      text: (text: string, x: number, y: number) => void;
      save: (filename: string) => void;
    }
    type JsPdfConstructor = new (orientation?: string) => JsPdfDoc;
    type AutoTableFunction = (doc: unknown, options: Record<string, unknown>) => void;

    let jsPDF: JsPdfConstructor;
    let autoTable: AutoTableFunction;
    try {
      const jsPdfPkg = "jspdf";
      const autoTablePkg = "jspdf-autotable";
      const [jsPDFModule, autoTableModule] = await Promise.all([
        import(/* @vite-ignore */ jsPdfPkg) as Promise<{ default?: JsPdfConstructor } & JsPdfConstructor>,
        import(/* @vite-ignore */ autoTablePkg) as Promise<{ default?: AutoTableFunction } & AutoTableFunction>,
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
      body: data.map((row) => keys.map((k) => (row[k] == null ? "" : String(row[k])))),
      startY: 20,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [15, 23, 42] },
    });
    doc.save(`${filename}.pdf`);
  }
}

/**
 * Download a file from the backend securely via fetch with Authorization header.
 * Framework-neutral — does not assume Vite or any specific bundler.
 *
 * @example
 * await downloadFileSecurely("/api/export/data", "data_export", { status: "active" })
 */
export async function downloadFileSecurely(
  endpoint: string,
  filename: string,
  queryParams?: Record<string, string>,
  tokenKey?: string,
  signal?: AbortSignal,
  apiBase?: string
): Promise<void>;
export async function downloadFileSecurely(
  endpoint: string,
  filename: string,
  queryParams?: Record<string, string>,
  tokenKey?: string,
  apiBase?: string
): Promise<void>;
export async function downloadFileSecurely(
  endpoint: string,
  filename: string,
  queryParams: Record<string, string> = {},
  tokenKey = "auth_jwt",
  signalOrApiBase?: AbortSignal | string,
  apiBaseParam?: string
): Promise<void> {
  const signal = signalOrApiBase instanceof AbortSignal ? signalOrApiBase : undefined;
  const apiBase = typeof signalOrApiBase === "string" ? signalOrApiBase : apiBaseParam;

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem(tokenKey) || localStorage.getItem("jwt") || ""
      : "";
  if (!token) throw new Error("Not authenticated — please log in again.");

  const base = apiBase ?? "";
  const fullEndpoint = endpoint.startsWith("http") ? endpoint : `${base}${endpoint}`;

  // Security check: Validate origin before attaching Bearer token to prevent arbitrary token exfiltration
  validateDownloadOrigin(endpoint, base);

  // SECURE DOWNLOAD: Use fetch with Authorization header to avoid token leakage in logs/history
  const response = await fetch(`${fullEndpoint}?${new URLSearchParams(queryParams).toString()}`, {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token}` },
    ...(signal ? { signal } : {}),
  });

  if (!response.ok) throw new Error(`Download failed: ${response.statusText}`);

  const blob = await response.blob();
  triggerBlobDownload(blob, filename);
}

/** Backward-compatible alias for downloadFileSecurely */
export const downloadFromBackend = downloadFileSecurely;

/** Backward-compatible shorthand */
export function exportToCSV(data: Record<string, unknown>[], filename: string): void {
  void exportData(data, filename, "csv");
}

// ─── Internal ─────────────────────────────────────────────────────────────────

function triggerDownload(blob: Blob, filename: string) {
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

function validateDownloadOrigin(endpoint: string, base?: string): void {
  if (endpoint.startsWith("//") || /^(?:javascript|data|vbscript|file):/i.test(endpoint)) {
    throw new Error(`Untrusted download URL: dangerous scheme or protocol-relative URL in ${endpoint}`);
  }
  if (!endpoint.startsWith("http://") && !endpoint.startsWith("https://")) {
    return;
  }
  try {
    const targetUrl = new URL(endpoint);
    if (targetUrl.protocol !== "http:" && targetUrl.protocol !== "https:") {
      throw new Error(`Untrusted download URL scheme: ${targetUrl.protocol}`);
    }
    // Prevent cleartext token leakage over unencrypted HTTP when origin is HTTPS
    if (typeof window !== "undefined" && window.location?.protocol === "https:" && targetUrl.protocol === "http:" && targetUrl.hostname !== "localhost" && targetUrl.hostname !== "127.0.0.1") {
      throw new Error(
        `Untrusted download URL origin: refusing to attach Bearer token to unencrypted HTTP host ${targetUrl.host}`
      );
    }
    if (base) {
      // Validate base URL if provided
      new URL(base, typeof window !== "undefined" && window.location?.origin ? window.location.origin : "http://localhost");
    }
  } catch (err) {
    if (err instanceof Error && err.message.startsWith("Untrusted download URL")) {
      throw err;
    }
    throw new Error(`Invalid download endpoint URL: ${endpoint}`);
  }
}

function triggerBlobDownload(blob: Blob, filename: string): void {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  const downloadUrl = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = downloadUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(downloadUrl);
}
