"use client";

import * as React from "react";

export interface LocalFirstStoreOptions<T> {
  key: string;
  initialValue: T;
  version?: number;
  onMigrate?: (oldData: unknown, oldVersion: number) => T;
}

export interface LocalFirstStoreResult<T> {
  data: T;
  setData: (updater: T | ((prev: T) => T)) => void;
  resetData: () => void;
  exportJson: (fileName?: string) => void;
  importJson: (file: File) => Promise<boolean>;
  isHydrated: boolean;
}

/**
 * useLocalFirstStore
 *
 * Generic, isomorphic, event-driven reactive state hook for local-first
 * and offline-first React applications. Synchronizes instantly across
 * components in the same tab and across browser tabs via storage events.
 */
export function useLocalFirstStore<T>({
  key,
  initialValue,
  version = 1,
  onMigrate,
}: LocalFirstStoreOptions<T>): LocalFirstStoreResult<T> {
  const [data, setDataInternal] = React.useState<T>(initialValue);
  const [isHydrated, setIsHydrated] = React.useState(false);

  const onMigrateRef = React.useRef(onMigrate);
  React.useEffect(() => {
    onMigrateRef.current = onMigrate;
  }, [onMigrate]);

  const eventName = `local-store-change:${key}`;

  // Read stored data on initial mount
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const raw = window.localStorage.getItem(key);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object" && "_v" in parsed && "_data" in parsed) {
          if (parsed._v === version) {
            setDataInternal(parsed._data as T);
          } else if (onMigrateRef.current) {
            const migrated = onMigrateRef.current(parsed._data, parsed._v);
            setDataInternal(migrated);
            window.localStorage.setItem(key, JSON.stringify({ _v: version, _data: migrated }));
          } else {
            setDataInternal(parsed._data as T);
          }
        } else {
          setDataInternal(parsed as T);
        }
      }
    } catch (e) {
      console.warn(`[useLocalFirstStore] Failed to read key "${key}":`, e);
    } finally {
      setIsHydrated(true);
    }
  }, [key, version]);

  // Listen for storage events (cross-tab) and custom events (same-tab)
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const handleStorage = (e: StorageEvent) => {
      if (e.key === key) {
        if (!e.newValue) {
          setDataInternal(initialValue);
          return;
        }
        try {
          const parsed = JSON.parse(e.newValue);
          const nextData = parsed && typeof parsed === "object" && "_data" in parsed ? parsed._data : parsed;
          setDataInternal(nextData as T);
        } catch {
          // ignore parsing error
        }
      }
    };

    const handleCustomEvent = (e: Event) => {
      const customEvent = e as CustomEvent<T>;
      if (customEvent.detail !== undefined) {
        setDataInternal(customEvent.detail);
      }
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener(eventName, handleCustomEvent);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener(eventName, handleCustomEvent);
    };
  }, [key, eventName, initialValue]);

  // Set data with synchronous write and event broadcast
  const setData = React.useCallback(
    (updater: T | ((prev: T) => T)) => {
      setDataInternal((prev) => {
        const next = typeof updater === "function" ? (updater as (prev: T) => T)(prev) : updater;

        if (typeof window !== "undefined") {
          try {
            window.localStorage.setItem(key, JSON.stringify({ _v: version, _data: next }));
            window.dispatchEvent(new CustomEvent(eventName, { detail: next }));
          } catch (e) {
            console.error(`[useLocalFirstStore] Failed to persist key "${key}":`, e);
          }
        }

        return next;
      });
    },
    [key, version, eventName]
  );

  // Reset to initial state
  const resetData = React.useCallback(() => {
    setData(initialValue);
  }, [initialValue, setData]);

  // Export as downloadable JSON
  const exportJson = React.useCallback(
    (fileName?: string) => {
      if (typeof window === "undefined") return;
      const safeName = (fileName || `${key}-backup.json`).replace(/[^a-zA-Z0-9._-]/g, "_");
      const json = JSON.stringify({ key, version, exportedAt: new Date().toISOString(), data }, null, 2);
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = safeName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },
    [key, version, data]
  );

  // Import from JSON file
  const importJson = React.useCallback(
    async (file: File): Promise<boolean> => {
      try {
        const text = await file.text();
        const parsed = JSON.parse(text);
        if (parsed && typeof parsed === "object") {
          const importedData = "data" in parsed ? parsed.data : parsed;
          setData(importedData as T);
          return true;
        }
        return false;
      } catch (e) {
        console.error(`[useLocalFirstStore] Import failed for "${key}":`, e);
        return false;
      }
    },
    [key, setData]
  );

  return {
    data,
    setData,
    resetData,
    exportJson,
    importJson,
    isHydrated,
  };
}
