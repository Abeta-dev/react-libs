"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/lib/analytics/index.ts
var analytics_exports = {};
__export(analytics_exports, {
  AnalyticsEngine: () => AnalyticsEngine,
  AnalyticsQueue: () => AnalyticsQueue,
  ConsoleAdapter: () => ConsoleAdapter,
  DomTracker: () => DomTracker,
  GoogleAnalyticsAdapter: () => GoogleAnalyticsAdapter,
  HttpAdapter: () => HttpAdapter,
  MixpanelAdapter: () => MixpanelAdapter,
  SessionManager: () => SessionManager,
  generateUUID: () => generateUUID,
  getAnalyticsEngine: () => getAnalyticsEngine,
  initAnalytics: () => initAnalytics
});
module.exports = __toCommonJS(analytics_exports);

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
    const count = (this.componentInteractionCounts.get(componentId) ?? 0) + 1;
    this.componentInteractionCounts.set(componentId, count);
    return count;
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AnalyticsEngine,
  AnalyticsQueue,
  ConsoleAdapter,
  DomTracker,
  GoogleAnalyticsAdapter,
  HttpAdapter,
  MixpanelAdapter,
  SessionManager,
  generateUUID,
  getAnalyticsEngine,
  initAnalytics
});
//# sourceMappingURL=index.cjs.map