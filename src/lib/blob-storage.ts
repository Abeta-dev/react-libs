/**
 * Cloud Blob Storage utilities — agnostic file storage client for web applications.
 *
 * Flow:
 *   1. After login, the app calls fetchBlobStorageConfig() once.
 *   2. fetchBlobStorageConfig() hits the backend's authenticated GET /api/config endpoint.
 *   3. The backend returns storage credentials securely from environment configuration.
 *   4. Credentials are cached in memory for the active browser session.
 *   5. uploadFileToStorage / downloadFileFromStorage use the cached config to manage files.
 *
 * For SSR or multi-tenant environments:
 *   Use `BlobStorageClient` or `createBlobStorageClient()` to instantiate per-tenant or
 *   per-request client instances with isolated credentials, avoiding cross-tenant SSR pollution.
 */

/** Shape returned by the backend GET /api/config endpoint for storage. */
export interface BlobStorageConfig {
  storageBaseUrl: string;
  storageSecretKey?: string | undefined;
}

/** Provider function to retrieve authentication token dynamically */
export type TokenProvider = () => string | Promise<string>;

/** Configuration options for initializing a BlobStorageClient. */
export interface BlobStorageClientOptions {
  /** Backend API base URL for storage config endpoints */
  apiBase?: string | undefined;
  /** Optional pre-configured storage credentials */
  config?: BlobStorageConfig | null | undefined;
  /** Optional bearer token for authentication */
  token?: string | undefined;
  /** Optional dynamic token provider function (e.g. for rotating tokens or async auth) */
  tokenProvider?: TokenProvider | undefined;
  /** Optional fetch credentials mode (e.g. 'include' or 'same-origin' for HttpOnly cookie sessions) */
  credentials?: RequestCredentials | undefined;
}

/** Result shape returned after a successful upload. */
export interface BlobUploadResult {
  /** Publicly accessible Blob URL */
  url: string;
  /** UUID filename as stored by storage backend */
  fileName: string;
  /** Original filename provided at upload time */
  originalName: string;
}

/**
 * Sanitize destination folder path to mitigate Directory Traversal (CWE-22).
 * Strips null bytes, backslashes, directory traversal sequences ('..'),
 * and limits characters to safe directory naming conventions.
 */
export function sanitizeStoragePath(path: string): string {
  if (!path) return "";
  const segments = path
    .replace(/\0/g, "")
    .split(/[/\\]+/)
    .filter((segment) => segment !== "" && segment !== "." && segment !== "..")
    .map((segment) => segment.replace(/[^a-zA-Z0-9_-]/g, ""))
    .filter((segment) => segment.length > 0);

  return segments.join("/");
}

/**
 * BlobStorageClient encapsulates storage credentials and API base configuration,
 * preventing cross-tenant SSR pollution in multi-tenant or server-side rendering environments.
 */
export class BlobStorageClient {
  private _config: BlobStorageConfig | null = null;
  private _apiBase: string = "";
  private _token?: string | undefined;
  private _tokenProvider?: TokenProvider | undefined;
  private _credentials?: RequestCredentials | undefined;

  constructor(options?: BlobStorageClientOptions) {
    if (options?.apiBase) {
      this.setApiBase(options.apiBase);
    }
    if (options?.config) {
      this._config = { ...options.config };
    }
    if (options?.token) {
      this._token = options.token;
    }
    if (options?.tokenProvider) {
      this._tokenProvider = options.tokenProvider;
    }
    if (options?.credentials) {
      this._credentials = options.credentials;
    }
  }

  /** Get the configured backend base URL */
  public get apiBase(): string {
    return this._apiBase;
  }

  /** Get the configured backend base URL */
  public getApiBase(): string {
    return this._apiBase;
  }

  /** Get the currently cached storage configuration, or null if uninitialized */
  public get config(): BlobStorageConfig | null {
    return this._config ? { ...this._config } : null;
  }

  /** Get the currently cached storage configuration, or null if uninitialized */
  public getConfig(): BlobStorageConfig | null {
    return this._config ? { ...this._config } : null;
  }

  /**
   * Set the backend base URL for storage config/upload/download calls.
   */
  public setApiBase(base: string): void {
    this._apiBase = base.replace(/\/$/, ""); // strip trailing slash
  }

  /** Alias for backward compatibility */
  public setBlobStorageApiBase(base: string): void {
    this.setApiBase(base);
  }

  /** Explicitly set or override authentication token */
  public setToken(token?: string): void {
    this._token = token;
  }

  /** Explicitly set or update dynamic token provider */
  public setTokenProvider(provider?: TokenProvider): void {
    this._tokenProvider = provider;
  }

  /** Explicitly set or update request credentials mode */
  public setCredentials(credentials?: RequestCredentials): void {
    this._credentials = credentials;
  }

  /** Explicitly set or override storage configuration */
  public setConfig(config: BlobStorageConfig | null): void {
    this._config = config ? { ...config } : null;
  }

  /**
   * Fetch storage config from the backend's authenticated /api/config endpoint.
   * Caches the result in memory on this instance so subsequent calls are instant.
   *
   * @param apiBase  - Override base URL (defaults to this instance's apiBase)
   * @param token    - Optional JWT (defaults to instance token, tokenProvider, or localStorage "auth_jwt")
   */
  public async fetchConfig(
    apiBase?: string,
    token?: string
  ): Promise<BlobStorageConfig> {
    if (this._config) return this._config;

    const base = apiBase ?? this._apiBase;
    let jwt = token ?? this._token;

    if (!jwt && this._tokenProvider) {
      try {
        jwt = await this._tokenProvider();
      } catch (err) {
        throw new Error(
          `fetchBlobStorageConfig: tokenProvider failed: ${err instanceof Error ? err.message : String(err)}`
        );
      }
    }

    if (!jwt && typeof window !== "undefined") {
      jwt = localStorage.getItem("auth_jwt") ?? localStorage.getItem("jwt") ?? "";
    }

    const headers: Record<string, string> = {};
    if (jwt) {
      headers.Authorization = `Bearer ${jwt}`;
    }

    const fetchOptions: RequestInit = {
      headers,
    };
    if (this._credentials) {
      fetchOptions.credentials = this._credentials;
    }

    const res = await fetch(`${base}/api/config`, fetchOptions);

    if (!res.ok) {
      throw new Error(
        `fetchBlobStorageConfig: /api/config returned ${res.status} (base: "${base}")`
      );
    }

    const json = (await res.json()) as {
      storage_base_url?: string;
      storage_secret_key?: string;
    };

    this._config = {
      storageBaseUrl: json.storage_base_url || "",
      storageSecretKey: json.storage_secret_key || undefined,
    };
    return this._config;
  }

  /** Resolve auth token from instance, provider, or storage */
  private async resolveToken(token?: string): Promise<string> {
    if (token) return token;
    if (this._token) return this._token;
    if (this._tokenProvider) {
      try {
        return (await this._tokenProvider()) || "";
      } catch {
        return "";
      }
    }
    if (typeof window !== "undefined") {
      return localStorage.getItem("auth_jwt") ?? localStorage.getItem("jwt") ?? "";
    }
    return "";
  }

  /** Alias for backward compatibility */
  public async fetchBlobStorageConfig(
    apiBase?: string,
    token?: string
  ): Promise<BlobStorageConfig> {
    return this.fetchConfig(apiBase, token);
  }

  /** Call this on logout or tenant switch to wipe cached secrets from this instance. */
  public clearConfig(): void {
    this._config = null;
  }

  /** Alias for backward compatibility */
  public clearBlobStorageConfig(): void {
    this.clearConfig();
  }

  /**
   * Upload a file to Blob Storage directly using this client's credentials.
   *
   * @param file       - File to upload
   * @param folderPath - Destination folder / bucket (e.g. "documents", "attachments")
   * @param apiBase    - Optional backend base URL override
   */
  public async uploadFile(
    file: File,
    folderPath: string,
    apiBase?: string
  ): Promise<BlobUploadResult> {
    const { storageBaseUrl, storageSecretKey } = await this.fetchConfig(apiBase);

    const safeFolderPath = sanitizeStoragePath(folderPath);
    const form = new FormData();
    form.append("folderPath", safeFolderPath);
    form.append("file", file);

    const headers: Record<string, string> = {};
    if (storageSecretKey) {
      headers.secretkey = storageSecretKey;
    }
    const authToken = await this.resolveToken();
    if (authToken) {
      headers.Authorization = `Bearer ${authToken}`;
    }

    const res = await fetch(`${storageBaseUrl}/api/admin/upload_file`, {
      method: "POST",
      headers,
      body: form,
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
      originalName: item.originalName || item.original_name,
    };
  }

  /** Alias for backward compatibility */
  public async uploadFileToStorage(
    file: File,
    folderPath: string,
    apiBase?: string
  ): Promise<BlobUploadResult> {
    return this.uploadFile(file, folderPath, apiBase);
  }

  /**
   * Download a file from Blob Storage directly.
   *
   * @param fileName    - UUID filename stored in DB
   * @param folder      - Bucket folder
   * @param displayName - Filename shown in the browser's Save As dialog
   * @param apiBase     - Optional backend base URL override
   */
  public async downloadFile(
    fileName: string,
    folder: string,
    displayName?: string,
    apiBase?: string
  ): Promise<void> {
    const { storageBaseUrl, storageSecretKey } = await this.fetchConfig(apiBase);

    const safeFolder = sanitizeStoragePath(folder);
    const safeFileName = fileName.replace(/\0/g, "").replace(/[^a-zA-Z0-9._-]/g, "");
    if (!safeFileName) {
      throw new Error("Invalid storage fileName parameter");
    }

    const filePath = safeFolder ? `${safeFolder}/${safeFileName}` : safeFileName;
    const qs = new URLSearchParams({ filePath, fileName: safeFileName });

    const headers: Record<string, string> = {};
    if (storageSecretKey) {
      headers.secretkey = storageSecretKey;
    }
    const authToken = await this.resolveToken();
    if (authToken) {
      headers.Authorization = `Bearer ${authToken}`;
    }

    const res = await fetch(`${storageBaseUrl}/api/admin/download_file?${qs}`, {
      headers,
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

  /** Alias for backward compatibility */
  public async downloadFileFromStorage(
    fileName: string,
    folder: string,
    displayName?: string,
    apiBase?: string
  ): Promise<void> {
    return this.downloadFile(fileName, folder, displayName, apiBase);
  }
}

/** Factory function to create a new BlobStorageClient instance. */
export function createBlobStorageClient(
  options?: BlobStorageClientOptions
): BlobStorageClient {
  return new BlobStorageClient(options);
}

// Global default instance for backward-compatible top-level functional API
const defaultClient = new BlobStorageClient();

/** Access the default BlobStorageClient singleton instance. */
export function getDefaultBlobStorageClient(): BlobStorageClient {
  return defaultClient;
}

/**
 * Set the backend base URL for storage config/upload/download calls on the default client.
 * Call this once at app startup before any upload/download occurs.
 */
export function setBlobStorageApiBase(base: string): void {
  defaultClient.setApiBase(base);
}

/**
 * Fetch storage config using the default client.
 * Caches the result in memory so subsequent calls are instant.
 *
 * @param apiBase  - Override base URL (defaults to the value set via setBlobStorageApiBase)
 * @param token    - Optional JWT; falls back to localStorage "auth_jwt"
 */
export async function fetchBlobStorageConfig(
  apiBase?: string,
  token?: string
): Promise<BlobStorageConfig> {
  return defaultClient.fetchConfig(apiBase, token);
}

/** Call this on logout to wipe the cached secret from the default client. */
export function clearBlobStorageConfig(): void {
  defaultClient.clearConfig();
}

/**
 * Upload a file to Blob Storage using the default client.
 *
 * @param file       - File to upload
 * @param folderPath - Destination folder / bucket (e.g. "documents", "attachments")
 * @param apiBase    - Optional backend base URL (defaults to relative path)
 */
export async function uploadFileToStorage(
  file: File,
  folderPath: string,
  apiBase?: string
): Promise<BlobUploadResult> {
  return defaultClient.uploadFile(file, folderPath, apiBase);
}

/**
 * Download a file from Blob Storage using the default client.
 *
 * @param fileName    - UUID filename stored in DB
 * @param folder      - Bucket folder
 * @param displayName - Filename shown in the browser's Save As dialog
 * @param apiBase     - Optional backend base URL
 */
export async function downloadFileFromStorage(
  fileName: string,
  folder: string,
  displayName?: string,
  apiBase?: string
): Promise<void> {
  return defaultClient.downloadFile(fileName, folder, displayName, apiBase);
}
