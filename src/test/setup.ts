import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Automatically cleanup DOM after each assertion
afterEach(() => {
    cleanup();
});

// SSR / Node environment polyfills
const globalScope = globalThis as unknown as { DOMMatrix?: typeof DOMMatrix };
if (typeof globalScope.DOMMatrix === 'undefined') {
  globalScope.DOMMatrix = class DOMMatrix {} as unknown as typeof DOMMatrix;
}

// JSDOM specific mocks
if (typeof window !== 'undefined') {
  // JSDOM does not implement matchMedia — mock it globally
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });

  // JSDOM does not implement ResizeObserver — mock it globally
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };

  // JSDOM does not implement IntersectionObserver
  global.IntersectionObserver = class IntersectionObserver {
    constructor(callback: IntersectionObserverCallback) {
      this.callback = callback;
    }
    callback: IntersectionObserverCallback;
    root = null;
    rootMargin = "";
    thresholds = [];
    observe() {
      this.callback(
        [{ isIntersecting: true, intersectionRatio: 1 } as unknown as IntersectionObserverEntry],
        this as unknown as IntersectionObserver,
      );
    }
    unobserve() {}
    disconnect() {}
    takeRecords() { return []; }
  };

  // cmdk (Command) calls scrollIntoView internally — mock it
  if (window.HTMLElement) {
    window.HTMLElement.prototype.scrollIntoView = () => {};
  }

  // Radix UI Select / Slider pointerCapture polyfills for JSDOM
  if (window.Element) {
    if (!window.Element.prototype.hasPointerCapture) {
      window.Element.prototype.hasPointerCapture = () => false;
    }
    if (!window.Element.prototype.setPointerCapture) {
      window.Element.prototype.setPointerCapture = () => {};
    }
    if (!window.Element.prototype.releasePointerCapture) {
      window.Element.prototype.releasePointerCapture = () => {};
    }
  }

  // Provide standard requestAnimationFrame fallback if not available in environment
  if (typeof window.requestAnimationFrame === "undefined") {
    window.requestAnimationFrame = (callback: FrameRequestCallback) => {
      return window.setTimeout(() => callback(performance.now()), 0);
    };
    window.cancelAnimationFrame = (id: number) => {
      clearTimeout(id);
    };
  }

  // Node 25+ enables experimental Web Storage without --localstorage-file, which
  // leaves window.localStorage/sessionStorage missing `.clear`/`.setItem` in JSDOM.
  // Install a spec-compliant Storage polyfill only when the native one is unusable.
  const hasWorkingStorage = (s: unknown): s is Storage =>
    Boolean(s && typeof (s as Storage).clear === 'function' && typeof (s as Storage).setItem === 'function');

  if (!hasWorkingStorage(window.localStorage) || !hasWorkingStorage(window.sessionStorage)) {
    const backingStores = new WeakMap<MemoryStorage, Map<string, string>>();
    class MemoryStorage implements Storage {
      constructor() {
        backingStores.set(this, new Map<string, string>());
      }
      get length(): number {
        return backingStores.get(this)?.size ?? 0;
      }
      clear(): void {
        backingStores.get(this)?.clear();
      }
      getItem(key: string): string | null {
        const val = backingStores.get(this)?.get(String(key));
        return val === undefined ? null : val;
      }
      key(index: number): string | null {
        if (index < 0) return null;
        const keys = Array.from(backingStores.get(this)?.keys() ?? []);
        return keys.at(index) ?? null;
      }
      removeItem(key: string): void {
        backingStores.get(this)?.delete(String(key));
      }
      setItem(key: string, value: string): void {
        backingStores.get(this)?.set(String(key), String(value));
      }
    }
    const local = new MemoryStorage();
    const session = new MemoryStorage();
    Object.defineProperty(globalThis, 'Storage', { configurable: true, writable: true, value: MemoryStorage });
    Object.defineProperty(window, 'Storage', { configurable: true, writable: true, value: MemoryStorage });
    Object.defineProperty(window, 'localStorage', { configurable: true, writable: true, value: local });
    Object.defineProperty(window, 'sessionStorage', { configurable: true, writable: true, value: session });
    Object.defineProperty(globalThis, 'localStorage', { configurable: true, writable: true, value: local });
    Object.defineProperty(globalThis, 'sessionStorage', { configurable: true, writable: true, value: session });
  }
}
