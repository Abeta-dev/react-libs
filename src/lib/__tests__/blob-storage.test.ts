import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  setBlobStorageApiBase,
  fetchBlobStorageConfig,
  clearBlobStorageConfig,
  uploadFileToStorage,
  downloadFileFromStorage,
  sanitizeStoragePath,
  BlobStorageClient,
  createBlobStorageClient,
} from "../blob-storage";

describe("Blob Storage Utilities (Global Functions)", () => {
  beforeEach(() => {
    clearBlobStorageConfig();
    vi.restoreAllMocks();
    window.localStorage.clear();
  });

  it("fetches and caches storage configuration from /api/config", async () => {
    setBlobStorageApiBase("https://backend.example.com");
    window.localStorage.setItem("auth_jwt", "mock-token-xyz");

    const fetchSpy = vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        storage_base_url: "https://storage.example.com",
        storage_secret_key: "test-secret-key",
      }),
    } as Response);

    const config1 = await fetchBlobStorageConfig();
    expect(config1.storageBaseUrl).toBe("https://storage.example.com");
    expect(config1.storageSecretKey).toBe("test-secret-key");
    expect(fetchSpy).toHaveBeenCalledTimes(1);

    // Second call should hit the in-memory cache
    const config2 = await fetchBlobStorageConfig();
    expect(config2).toBe(config1);
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  it("throws descriptive error when config fetch fails", async () => {
    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: false,
      status: 500,
    } as Response);

    await expect(fetchBlobStorageConfig("https://api.test")).rejects.toThrow(
      "fetchBlobStorageConfig: /api/config returned 500"
    );
  });

  it("uploads file to storage and parses result", async () => {
    // 1. Config call
    vi.spyOn(global, "fetch")
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          storage_base_url: "https://storage.example.com",
          storage_secret_key: "secret",
        }),
      } as Response)
      // 2. Upload call
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          status_code: 200,
          data: [
            {
              url: "https://storage.example.com/docs/uuid-1234.pdf",
              fileName: "uuid-1234.pdf",
              originalName: "report.pdf",
            },
          ],
        }),
      } as Response);

    const file = new File(["dummy content"], "report.pdf", {
      type: "application/pdf",
    });
    const result = await uploadFileToStorage(file, "documents");

    expect(result.url).toBe("https://storage.example.com/docs/uuid-1234.pdf");
    expect(result.fileName).toBe("uuid-1234.pdf");
    expect(result.originalName).toBe("report.pdf");
  });

  it("downloads file and creates object URL anchor trigger", async () => {
    const mockBlob = new Blob(["test-data"], { type: "application/pdf" });

    vi.spyOn(global, "fetch")
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          storage_base_url: "https://storage.example.com",
          storage_secret_key: "secret",
        }),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        blob: async () => mockBlob,
      } as Response);

    const createObjectURL = vi
      .spyOn(URL, "createObjectURL")
      .mockReturnValue("blob:http://localhost/test-uuid");
    const revokeObjectURL = vi
      .spyOn(URL, "revokeObjectURL")
      .mockImplementation(() => {});

    await downloadFileFromStorage(
      "uuid-1234.pdf",
      "documents",
      "report-2026.pdf"
    );

    expect(createObjectURL).toHaveBeenCalledWith(mockBlob);
    expect(revokeObjectURL).toHaveBeenCalledWith(
      "blob:http://localhost/test-uuid"
    );
  });

  describe("sanitizeStoragePath (CWE-22 defense)", () => {
    it("strips directory traversal dots and leading/trailing slashes", () => {
      expect(sanitizeStoragePath("../../../etc/passwd")).toBe("etc/passwd");
      expect(sanitizeStoragePath("/documents/subfolder/")).toBe("documents/subfolder");
      expect(sanitizeStoragePath("..\\..\\malicious")).toBe("malicious");
      expect(sanitizeStoragePath("docs/../nested")).toBe("docs/nested");
      expect(sanitizeStoragePath("")).toBe("");
    });

    it("sanitizes folderPath passed to uploadFileToStorage", async () => {
      vi.spyOn(global, "fetch")
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            storage_base_url: "https://storage.example.com",
            storage_secret_key: "secret",
          }),
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            status_code: 200,
            data: [{ url: "https://storage.example.com/ok", fileName: "f.pdf", originalName: "f.pdf" }],
          }),
        } as Response);

      const file = new File(["test"], "f.pdf", { type: "application/pdf" });
      await uploadFileToStorage(file, "../../dangerous_folder/");

      const uploadCall = (global.fetch as any).mock.calls[1];
      const formData = uploadCall[1].body as FormData;
      expect(formData.get("folderPath")).toBe("dangerous_folder");
    });
  });
});

describe("BlobStorageClient Instance & Factory", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    window.localStorage.clear();
  });

  it("initializes with options and supports getters and setters", () => {
    const client = new BlobStorageClient({
      apiBase: "https://api.example.com/",
      token: "initial-token",
      config: {
        storageBaseUrl: "https://storage.example.com",
        storageSecretKey: "init-secret",
      },
    });

    expect(client.apiBase).toBe("https://api.example.com");
    expect(client.getApiBase()).toBe("https://api.example.com");
    expect(client.config).toEqual({
      storageBaseUrl: "https://storage.example.com",
      storageSecretKey: "init-secret",
    });
    expect(client.getConfig()).toEqual({
      storageBaseUrl: "https://storage.example.com",
      storageSecretKey: "init-secret",
    });

    client.setApiBase("https://new-api.example.com/");
    expect(client.apiBase).toBe("https://new-api.example.com");

    client.setBlobStorageApiBase("https://alias-api.example.com/");
    expect(client.apiBase).toBe("https://alias-api.example.com");

    client.setConfig({
      storageBaseUrl: "https://updated-storage.example.com",
      storageSecretKey: "updated-secret",
    });
    expect(client.config?.storageSecretKey).toBe("updated-secret");

    client.clearConfig();
    expect(client.config).toBeNull();
    expect(client.getConfig()).toBeNull();
  });

  it("creates an instance via createBlobStorageClient factory", () => {
    const client = createBlobStorageClient({
      apiBase: "https://factory.example.com",
    });
    expect(client).toBeInstanceOf(BlobStorageClient);
    expect(client.apiBase).toBe("https://factory.example.com");
  });

  it("fetches, caches, and authorizes with instance token", async () => {
    const client = createBlobStorageClient({
      apiBase: "https://tenant.example.com",
      token: "tenant-jwt-token",
    });

    const fetchSpy = vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        storage_base_url: "https://tenant-storage.example.com",
        storage_secret_key: "tenant-secret-key",
      }),
    } as Response);

    const config = await client.fetchConfig();
    expect(config.storageBaseUrl).toBe("https://tenant-storage.example.com");
    expect(config.storageSecretKey).toBe("tenant-secret-key");

    expect(fetchSpy).toHaveBeenCalledWith("https://tenant.example.com/api/config", {
      headers: { Authorization: "Bearer tenant-jwt-token" },
    });

    // Subsequent call should use instance cache
    const cachedConfig = await client.fetchBlobStorageConfig();
    expect(cachedConfig).toBe(config);
    expect(fetchSpy).toHaveBeenCalledTimes(1);

    // clearBlobStorageConfig clears cache
    client.clearBlobStorageConfig();
    expect(client.config).toBeNull();
  });

  it("throws error when instance fetchConfig fails", async () => {
    const client = createBlobStorageClient({
      apiBase: "https://broken.api.com",
    });

    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: false,
      status: 401,
    } as Response);

    await expect(client.fetchConfig()).rejects.toThrow(
      'fetchBlobStorageConfig: /api/config returned 401 (base: "https://broken.api.com")'
    );
  });

  it("uploads file using instance methods and aliases", async () => {
    const client = createBlobStorageClient({
      config: {
        storageBaseUrl: "https://storage.instance.com",
        storageSecretKey: "inst-secret",
      },
    });

    const fetchSpy = vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        data: [
          {
            url: "https://storage.instance.com/docs/file.pdf",
            fileName: "file-uuid.pdf",
            originalName: "file.pdf",
          },
        ],
      }),
    } as Response);

    const file = new File(["test file content"], "file.pdf", { type: "application/pdf" });
    const result = await client.uploadFileToStorage(file, "docs");

    expect(result.url).toBe("https://storage.instance.com/docs/file.pdf");
    expect(result.fileName).toBe("file-uuid.pdf");
    expect(result.originalName).toBe("file.pdf");

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    const [url, init] = fetchSpy.mock.calls[0] as [string, RequestInit | undefined];
    expect(url).toBe("https://storage.instance.com/api/admin/upload_file");
    expect((init?.headers as Record<string, string>).secretkey).toBe("inst-secret");
  });

  it("throws error when upload request returns HTTP error or empty data", async () => {
    const client = createBlobStorageClient({
      config: {
        storageBaseUrl: "https://storage.instance.com",
        storageSecretKey: "inst-secret",
      },
    });

    // 1. HTTP error
    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: false,
      status: 403,
      text: async () => "Forbidden bucket access",
    } as Response);

    const file = new File(["data"], "sample.txt", { type: "text/plain" });
    await expect(client.uploadFile(file, "uploads")).rejects.toThrow(
      "Storage upload failed (403): Forbidden bucket access"
    );

    // 2. Empty data error
    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: [] }),
    } as Response);

    await expect(client.uploadFile(file, "uploads")).rejects.toThrow(
      "Storage upload succeeded but no file data in response"
    );
  });

  it("downloads file and triggers anchor click using instance methods", async () => {
    const client = createBlobStorageClient({
      config: {
        storageBaseUrl: "https://storage.instance.com",
        storageSecretKey: "inst-secret",
      },
    });

    const mockBlob = new Blob(["sample content"], { type: "text/plain" });
    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      blob: async () => mockBlob,
    } as Response);

    const createObjectURL = vi
      .spyOn(URL, "createObjectURL")
      .mockReturnValue("blob:http://localhost/instance-uuid");
    const revokeObjectURL = vi
      .spyOn(URL, "revokeObjectURL")
      .mockImplementation(() => {});

    await client.downloadFileFromStorage(
      "doc-uuid.pdf",
      "invoices",
      "invoice-october.pdf"
    );

    expect(createObjectURL).toHaveBeenCalledWith(mockBlob);
    expect(revokeObjectURL).toHaveBeenCalledWith(
      "blob:http://localhost/instance-uuid"
    );
  });

  it("throws error when download request returns HTTP failure", async () => {
    const client = createBlobStorageClient({
      config: {
        storageBaseUrl: "https://storage.instance.com",
        storageSecretKey: "inst-secret",
      },
    });

    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: false,
      status: 404,
      text: async () => "File not found",
    } as Response);

    await expect(
      client.downloadFile("missing.pdf", "invoices")
    ).rejects.toThrow("Storage download failed (404): File not found");
  });

  it("prevents cross-tenant SSR pollution across isolated instances", async () => {
    const tenantA = createBlobStorageClient({
      apiBase: "https://tenant-a.api.com",
      config: {
        storageBaseUrl: "https://storage.tenant-a.com",
        storageSecretKey: "secret-tenant-a",
      },
    });

    const tenantB = createBlobStorageClient({
      apiBase: "https://tenant-b.api.com",
      config: {
        storageBaseUrl: "https://storage.tenant-b.com",
        storageSecretKey: "secret-tenant-b",
      },
    });

    expect(tenantA.apiBase).toBe("https://tenant-a.api.com");
    expect(tenantB.apiBase).toBe("https://tenant-b.api.com");

    expect(tenantA.config?.storageSecretKey).toBe("secret-tenant-a");
    expect(tenantB.config?.storageSecretKey).toBe("secret-tenant-b");

    // Clear tenant A config — tenant B is unaffected
    tenantA.clearConfig();
    expect(tenantA.config).toBeNull();
    expect(tenantB.config?.storageSecretKey).toBe("secret-tenant-b");

    // Mutate tenant B apiBase — tenant A is unaffected
    tenantB.setApiBase("https://tenant-b-updated.api.com");
    expect(tenantA.apiBase).toBe("https://tenant-a.api.com");
    expect(tenantB.apiBase).toBe("https://tenant-b-updated.api.com");
  });
});

