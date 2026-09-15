"use client";

import * as React from "react";
import { UploadCloud, X, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "../../../lib/utils";
import { formatBytes } from "../../../lib/formatters";

export interface FileItem {
  id: string;
  file: File;
  previewUrl?: string | undefined;
  progress?: number | undefined;
  error?: string | undefined;
}

export interface FileUploadProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  value?: FileItem[] | undefined;
  defaultValue?: FileItem[] | undefined;
  onChange?: ((files: FileItem[]) => void) | undefined;
  accept?: string | undefined;
  maxSize?: number | undefined; // in bytes
  maxFiles?: number | undefined;
  multiple?: boolean | undefined;
  disabled?: boolean | undefined;
  label?: string | undefined;
  description?: string | undefined;
  error?: string | undefined;
}

function isFileTypeAccepted(file: File, accept?: string): boolean {
  if (!accept) return true;
  const acceptedTypes = accept
    .split(",")
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean);

  if (acceptedTypes.length === 0) return true;

  const fileName = file.name.toLowerCase();
  const fileType = file.type.toLowerCase();

  return acceptedTypes.some((pattern) => {
    if (pattern.startsWith(".")) {
      return fileName.endsWith(pattern);
    }
    if (pattern.endsWith("/*")) {
      const mainType = pattern.split("/")[0];
      return fileType.startsWith(`${mainType}/`);
    }
    return fileType === pattern;
  });
}

function validateFile(file: File, accept?: string, maxSize?: number): string | null {
  if (accept && !isFileTypeAccepted(file, accept)) {
    return `File "${file.name}" is not an accepted file type`;
  }
  if (maxSize && file.size > maxSize) {
    return `File "${file.name}" exceeds max allowed size of ${formatBytes(maxSize)}`;
  }
  return null;
}

function createFileItem(file: File, createdUrls: Set<string>): FileItem {
  const isImage = file.type.startsWith("image/");
  const previewUrl = isImage ? URL.createObjectURL(file) : undefined;
  if (previewUrl) {
    createdUrls.add(previewUrl);
  }

  return {
    id: typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `${file.name}-${file.lastModified}-${file.size}-${Date.now()}`,
    file,
    previewUrl,
    progress: 100,
  };
}

export const FileUpload = React.forwardRef<HTMLDivElement, FileUploadProps>(
  (
    {
      className,
      value: valueProp,
      defaultValue,
      onChange,
      accept,
      maxSize = 10 * 1024 * 1024, // 10MB default
      maxFiles = 5,
      multiple = true,
      disabled = false,
      label = "Click or drag files to upload",
      description = "SVG, PNG, JPG, or PDF up to 10MB",
      error: externalError,
      ...props
    },
    ref
  ) => {
    const isControlled = valueProp !== undefined;
    const [uncontrolledValue, setUncontrolledValue] = React.useState<FileItem[]>(defaultValue ?? []);
    const value = isControlled ? valueProp : uncontrolledValue;

    const inputRef = React.useRef<HTMLInputElement>(null);
    const createdUrlsRef = React.useRef<Set<string>>(new Set());
    const [isDragging, setIsDragging] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

    const activeError = externalError || errorMessage;

    const updateFiles = React.useCallback(
      (nextFiles: FileItem[]) => {
        if (!isControlled) {
          setUncontrolledValue(nextFiles);
        }
        onChange?.(nextFiles);
      },
      [isControlled, onChange]
    );

    const processFiles = React.useCallback(
      (newRawFiles: FileList | File[]) => {
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

        const validFiles: FileItem[] = [];

        for (const file of incoming) {
          const fileErr = validateFile(file, accept, maxSize);
          if (fileErr) {
            setErrorMessage(fileErr);
            return;
          }
          validFiles.push(createFileItem(file, createdUrlsRef.current));
        }

        const updated = multiple ? [...value, ...validFiles] : validFiles;
        updateFiles(updated);
      },
      [value, updateFiles, maxSize, maxFiles, multiple, accept]
    );

    const handleDragEnter = (e: React.DragEvent) => {
      e.preventDefault();
      if (!disabled) setIsDragging(true);
    };

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      if (!disabled) setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (disabled) return;
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        processFiles(e.dataTransfer.files);
      }
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        processFiles(e.target.files);
        e.target.value = ""; // Reset to allow re-uploading same file
      }
    };

    const handleRemove = (id: string, e: React.MouseEvent) => {
      e.stopPropagation();
      const itemToRemove = value.find((f) => f.id === id);
      if (itemToRemove?.previewUrl) {
        URL.revokeObjectURL(itemToRemove.previewUrl);
      }
      const updated = value.filter((f) => f.id !== id);
      updateFiles(updated);
    };

    // When value changes, revoke any created URLs that are no longer present
    React.useEffect(() => {
      const currentUrls = new Set(value.map((item) => item.previewUrl).filter(Boolean) as string[]);
      createdUrlsRef.current.forEach((url) => {
        if (!currentUrls.has(url)) {
          URL.revokeObjectURL(url);
          createdUrlsRef.current.delete(url);
        }
      });
    }, [value]);

    // Clean up all remaining created object URLs on unmount
    React.useEffect(() => {
      const urls = createdUrlsRef.current;
      return () => {
        urls.forEach((url) => {
          URL.revokeObjectURL(url);
        });
        urls.clear();
      };
    }, []);

    return (
      <div ref={ref} className={cn("w-full space-y-3", className)} {...props}>
        <input
          ref={inputRef}
          type="file"
          aria-label={label}
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={handleFileInputChange}
          className="sr-only"
          tabIndex={-1}
          data-testid="file-upload-input"
        />

        <div
          onClick={() => !disabled && inputRef.current?.click()}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-disabled={disabled}
          onKeyDown={(e) => {
            if ((e.key === "Enter" || e.key === " ") && !disabled) {
              e.preventDefault();
              inputRef.current?.click();
            }
          }}
          className={cn(
            "relative flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg transition-colors cursor-pointer text-center",
            "bg-muted/20 hover:bg-muted/40 border-border hover:border-primary/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            isDragging && "border-primary bg-primary/5 ring-2 ring-primary/20",
            disabled && "opacity-50 cursor-not-allowed hover:bg-muted/20 hover:border-border",
            activeError && "border-destructive/50 hover:border-destructive"
          )}
        >
          <div className="p-3 bg-muted rounded-full mb-3 text-muted-foreground">
            <UploadCloud className="h-6 w-6" />
          </div>

          <p className="text-sm font-medium text-foreground">{label}</p>
          {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
        </div>

        {/* Live status announcement for screen readers */}
        {(() => {
          const fileCountSuffix = value.length === 1 ? "" : "s";
          const liveAnnouncement = value.length > 0
            ? `${value.length} file${fileCountSuffix} uploaded.`
            : "No files uploaded.";
          return (
            <div
              aria-live="polite"
              aria-atomic="true"
              className="sr-only"
              role="status"
            >
              {liveAnnouncement}
            </div>
          );
        })()}

        {activeError && (
          <div
            role="alert"
            aria-live="polite"
            className="flex items-center gap-1.5 text-xs text-destructive"
          >
            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
            <span>{activeError}</span>
          </div>
        )}

        {value.length > 0 && (
          <ul className="space-y-2 pt-1" aria-label="Uploaded files" aria-live="polite">
            {value.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between p-2.5 rounded-md border border-border bg-card text-card-foreground shadow-xs text-sm"
              >
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  {item.previewUrl ? (
                    <img
                      src={item.previewUrl}
                      alt={item.file.name}
                      className="h-9 w-9 rounded object-cover border border-border shrink-0"
                    />
                  ) : (
                    <div className="h-9 w-9 rounded bg-muted flex items-center justify-center text-muted-foreground shrink-0">
                      <FileText className="h-4 w-4" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="font-medium text-foreground truncate">{item.file.name}</p>
                    <p className="text-xs text-muted-foreground">{formatBytes(item.file.size)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <button
                    type="button"
                    onClick={(e) => handleRemove(item.id, e)}
                    disabled={disabled}
                    aria-label={`Remove ${item.file.name}`}
                    className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
);

FileUpload.displayName = "FileUpload";
