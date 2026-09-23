import { useState, useEffect, useCallback, useRef } from 'react';

export interface BaseQueuedMutation {
  id: string;
  timestamp?: number;
  retryCount?: number;
}

export interface UseOfflineQueueOptions<T extends BaseQueuedMutation> {
  dbName?: string;
  storeName?: string;
  syncHandler?: (item: T) => Promise<boolean>;
  maxRetries?: number;
  autoSyncOnOnline?: boolean;
}

export interface OfflineQueueState<T extends BaseQueuedMutation> {
  isOnline: boolean;
  pendingCount: number;
  isSyncing: boolean;
  queue: T[];
  enqueue: (item: Omit<T, 'timestamp' | 'retryCount'> & Partial<BaseQueuedMutation>) => Promise<void>;
  remove: (id: string) => Promise<void>;
  clear: () => Promise<void>;
  flushQueue: () => Promise<{ successCount: number; failedCount: number }>;
  syncQueue?: () => Promise<{ successCount: number; failedCount: number }>;
}

function isIndexedDBAvailable(): boolean {
  try {
    return typeof window !== 'undefined' && 'indexedDB' in window && window.indexedDB !== null;
  } catch {
    return false;
  }
}

function openDB(dbName: string, storeName: string): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (!isIndexedDBAvailable()) {
      return reject(new Error('IndexedDB unavailable'));
    }

    try {
      const req = window.indexedDB.open(dbName, 1);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, { keyPath: 'id' });
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error || new Error('Failed to open IndexedDB'));
    } catch (err) {
      reject(err);
    }
  });
}

function getLocalFallback<T>(key: string): T[] {
  try {
    if (typeof localStorage === 'undefined') return [];
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function setLocalFallback<T>(key: string, items: T[]): void {
  try {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(key, JSON.stringify(items));
  } catch {
    // Ignore storage quota errors
  }
}

async function fetchItemsFromDB<T>(dbName: string, storeName: string): Promise<T[]> {
  const db = await openDB(dbName, storeName);
  return new Promise<T[]>((resolve, reject) => {
    const tx = db.transaction(storeName, 'readonly');
    const store = tx.objectStore(storeName);
    const req = store.getAll();
    req.onsuccess = () => resolve((req.result as T[]) || []);
    req.onerror = () => reject(req.error || new Error('Failed to read store'));
  });
}

function isOffline(): boolean {
  return typeof navigator !== 'undefined' && !navigator.onLine;
}

async function handleSyncFailure<T extends BaseQueuedMutation>(
  item: T,
  maxRetries: number,
  remove: (id: string) => Promise<void>,
  enqueue: (item: T) => Promise<void>
): Promise<void> {
  item.retryCount = (item.retryCount || 0) + 1;
  try {
    if (item.retryCount >= maxRetries) {
      await remove(item.id);
    } else {
      await enqueue(item);
    }
  } catch {
    // ignore error updating or removing item
  }
}

export function useOfflineQueue<T extends BaseQueuedMutation>(
  options: UseOfflineQueueOptions<T> = {}
): OfflineQueueState<T> {
  const {
    dbName = 'react_libs_offline',
    storeName = 'mutation_queue',
    syncHandler,
    maxRetries = 5,
    autoSyncOnOnline = true,
  } = options;

  const fallbackKey = `${dbName}_${storeName}_fallback`;

  const [isOnline, setIsOnline] = useState<boolean>(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [queue, setQueue] = useState<T[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const isSyncingRef = useRef(false);

  const refreshQueue = useCallback(async () => {
    try {
      const items = await fetchItemsFromDB<T>(dbName, storeName);
      setQueue(items);
    } catch {
      setQueue(getLocalFallback<T>(fallbackKey));
    }
  }, [dbName, storeName, fallbackKey]);

  useEffect(() => {
    let mounted = true;
    fetchItemsFromDB<T>(dbName, storeName)
      .then((items) => {
        if (mounted) setQueue(items);
      })
      .catch(() => {
        if (mounted) setQueue(getLocalFallback<T>(fallbackKey));
      });

    return () => {
      mounted = false;
    };
  }, [dbName, storeName, fallbackKey]);

  const enqueue = useCallback(
    async (item: Omit<T, 'timestamp' | 'retryCount'> & Partial<BaseQueuedMutation>) => {
      const fullItem: T = {
        ...item,
        timestamp: item.timestamp || Date.now(),
        retryCount: item.retryCount || 0,
      } as T;

      try {
        const db = await openDB(dbName, storeName);
        await new Promise<void>((resolve, reject) => {
          const tx = db.transaction(storeName, 'readwrite');
          const store = tx.objectStore(storeName);
          const req = store.put(fullItem);
          req.onsuccess = () => resolve();
          req.onerror = () => reject(req.error);
        });
      } catch {
        const existing = getLocalFallback<T>(fallbackKey);
        const updated = existing.filter((x) => x.id !== fullItem.id);
        updated.push(fullItem);
        setLocalFallback(fallbackKey, updated);
      }

      await refreshQueue();
    },
    [dbName, storeName, fallbackKey, refreshQueue]
  );

  const remove = useCallback(
    async (id: string) => {
      try {
        const db = await openDB(dbName, storeName);
        await new Promise<void>((resolve, reject) => {
          const tx = db.transaction(storeName, 'readwrite');
          const store = tx.objectStore(storeName);
          const req = store.delete(id);
          req.onsuccess = () => resolve();
          req.onerror = () => reject(req.error);
        });
      } catch {
        const existing = getLocalFallback<T>(fallbackKey);
        setLocalFallback(fallbackKey, existing.filter((x) => x.id !== id));
      }

      await refreshQueue();
    },
    [dbName, storeName, fallbackKey, refreshQueue]
  );

  const clear = useCallback(async () => {
    try {
      const db = await openDB(dbName, storeName);
      await new Promise<void>((resolve, reject) => {
        const tx = db.transaction(storeName, 'readwrite');
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

  const flushQueue = useCallback(async () => {
    if (!syncHandler || isSyncingRef.current || isOffline()) {
      return { successCount: 0, failedCount: 0 };
    }

    isSyncingRef.current = true;
    setIsSyncing(true);

    let currentItems: T[] = [];
    try {
      currentItems = await fetchItemsFromDB<T>(dbName, storeName);
    } catch {
      currentItems = getLocalFallback<T>(fallbackKey);
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
          await handleSyncFailure(item, maxRetries, remove, enqueue);
          failedCount++;
        }
      } catch {
        await handleSyncFailure(item, maxRetries, remove, enqueue);
        failedCount++;
      }
    }

    isSyncingRef.current = false;
    setIsSyncing(false);
    await refreshQueue();

    return { successCount, failedCount };
  }, [dbName, storeName, fallbackKey, syncHandler, maxRetries, remove, enqueue, refreshQueue]);

  // Online / Offline listener
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleOnline = () => {
      setIsOnline(true);
      if (autoSyncOnOnline) {
        flushQueue();
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
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
    flushQueue,
    syncQueue: flushQueue,
  };
}
