interface ComponentContext {
    id: string;
    name: string;
    type: string;
    interaction: "click" | "change" | "submit";
    interactionCount: number;
}
interface PageContext {
    url: string;
    path: string;
    title: string;
    referrer: string;
}
interface AnalyticsEvent {
    eventId: string;
    eventName: string;
    timestamp: string;
    sessionId: string;
    pageId: string;
    anonymousId: string;
    userId?: string | undefined;
    component?: ComponentContext | undefined;
    page: PageContext;
    metadata: Record<string, unknown>;
}
interface AnalyticsAdapter {
    name: string;
    onInit?(config: AnalyticsConfig): Promise<void> | void;
    track(event: AnalyticsEvent): Promise<void> | void;
    trackBatch?(events: AnalyticsEvent[]): Promise<void> | void;
    identify?(userId: string, traits?: Record<string, unknown>): Promise<void> | void;
    reset?(): Promise<void> | void;
}
interface AnalyticsConfig {
    appId?: string | undefined;
    adapters?: AnalyticsAdapter[] | undefined;
    batchSize?: number | undefined;
    flushIntervalMs?: number | undefined;
    sessionTimeoutMs?: number | undefined;
    maxOfflineQueue?: number | undefined;
    storagePrefix?: string | undefined;
    globalMetadata?: Record<string, unknown> | undefined;
    autoTrackDom?: boolean | undefined;
    autoTrackPages?: boolean | undefined;
    /**
     * @warning Monkey-patching window.history.pushState/replaceState can cause conflicts with client-side routers (Next.js App Router, Remix, React Router). Defaults to false.
     */
    patchHistory?: boolean | undefined;
    maskPatterns?: RegExp[] | undefined;
    onError?: ((error: unknown) => void) | undefined;
}

declare function generateUUID(): string;
declare class SessionManager {
    private prefix;
    private sessionTimeoutMs;
    private anonymousId;
    private sessionId;
    private lastActiveTimestamp;
    private activePageId;
    private userId?;
    private componentInteractionCounts;
    constructor(prefix?: string, sessionTimeoutMs?: number);
    private loadOrCreateAnonymousId;
    private loadOrCreateSessionId;
    touchSession(): string;
    getSessionId(): string;
    getAnonymousId(): string;
    getActivePageId(): string;
    renewPageId(): string;
    getUserId(): string | undefined;
    setUserId(userId: string): void;
    clearUserId(): void;
    incrementComponentInteraction(componentId: string): number;
    reset(): void;
}

interface AnalyticsQueueOptions {
    adapters: AnalyticsAdapter[];
    batchSize?: number | undefined;
    flushIntervalMs?: number | undefined;
    maxOfflineQueue?: number | undefined;
    storagePrefix?: string | undefined;
    onError?: ((err: unknown) => void) | undefined;
}
declare class AnalyticsQueue {
    private adapters;
    private batchSize;
    private flushIntervalMs;
    private maxOfflineQueue;
    private storageKey;
    private onError?;
    private memoryQueue;
    private flushTimer;
    private isFlushing;
    constructor(options: AnalyticsQueueOptions);
    private startPeriodicFlush;
    private registerLifecycleListeners;
    enqueue(event: AnalyticsEvent): void;
    private readStorageQueue;
    private writeStorageQueue;
    private clearStorageQueue;
    private persistMemoryQueueToStorage;
    private pendingFlushPromise;
    flush(): Promise<void>;
    private executeDrainLoop;
    getPendingCount(): number;
    destroy(): void;
}

interface DomTrackerOptions {
    onInteraction: (component: ComponentContext, interactionMetadata: Record<string, unknown>) => void;
    maskPatterns?: RegExp[] | undefined;
}
declare class DomTracker {
    private onInteraction;
    private maskPatterns;
    private isListening;
    private handleClickBound;
    private handleChangeBound;
    private handleSubmitBound;
    constructor(options: DomTrackerOptions);
    start(): void;
    stop(): void;
    private isSensitiveElement;
    private findTrackableElement;
    private getElementAccessibleName;
    private collectJourneyMetadata;
    private resolveComponentContext;
    private handleClick;
    private handleChange;
    private handleSubmit;
}

declare class AnalyticsEngine {
    private config;
    private sessionManager;
    private queue;
    private domTracker?;
    private globalMetadata;
    private originalPushState?;
    private originalReplaceState?;
    private popStateListener?;
    private isInitialized;
    constructor(config?: AnalyticsConfig);
    private getCurrentPageContext;
    private setupPageTracking;
    private handleDomInteraction;
    track(eventName: string, metadata?: Record<string, unknown>, component?: ComponentContext): AnalyticsEvent;
    trackPageView(customPage?: Partial<PageContext>, metadata?: Record<string, unknown>): AnalyticsEvent;
    identify(userId: string, traits?: Record<string, unknown>): void;
    logout(): void;
    reset(): void;
    setGlobalMetadata(metadata: Record<string, unknown>): void;
    clearGlobalMetadata(keys?: string[]): void;
    addAdapter(adapter: AnalyticsAdapter): void;
    flush(): Promise<void>;
    getSessionManager(): SessionManager;
    getQueue(): AnalyticsQueue;
    destroy(): void;
}
declare function initAnalytics(config?: AnalyticsConfig): AnalyticsEngine;
declare function getAnalyticsEngine(): AnalyticsEngine | null;

interface HttpAdapterOptions {
    endpoint: string;
    headers?: Record<string, string> | undefined;
    getHeaders?: (() => Record<string, string> | Promise<Record<string, string>>) | undefined;
    credentials?: RequestCredentials | undefined;
}
declare class HttpAdapter implements AnalyticsAdapter {
    name: string;
    private endpoint;
    private headers;
    private getHeaders?;
    private credentials?;
    constructor(options: HttpAdapterOptions);
    private resolveHeaders;
    track(event: AnalyticsEvent): Promise<void>;
    trackBatch(events: AnalyticsEvent[]): Promise<void>;
}

interface ConsoleAdapterOptions {
    prefix?: string;
    logLevel?: "debug" | "info" | "log";
}
declare class ConsoleAdapter implements AnalyticsAdapter {
    name: string;
    private prefix;
    private logLevel;
    constructor(options?: ConsoleAdapterOptions);
    track(event: AnalyticsEvent): void;
    trackBatch(events: AnalyticsEvent[]): void;
    identify(userId: string, traits?: Record<string, unknown>): void;
    reset(): void;
}

interface MixpanelClient {
    track(eventName: string, properties?: Record<string, unknown>): void;
    identify(uniqueId: string): void;
    people?: {
        set(properties: Record<string, unknown>): void;
    };
    reset(): void;
}
interface MixpanelAdapterOptions {
    client?: MixpanelClient | undefined;
}
declare global {
    interface Window {
        mixpanel?: MixpanelClient;
    }
}
declare class MixpanelAdapter implements AnalyticsAdapter {
    name: string;
    private customClient?;
    constructor(options?: MixpanelAdapterOptions);
    private getClient;
    track(event: AnalyticsEvent): void;
    trackBatch(events: AnalyticsEvent[]): void;
    identify(userId: string, traits?: Record<string, unknown>): void;
    reset(): void;
}

interface GoogleAnalyticsAdapterOptions {
    measurementId?: string | undefined;
}
declare global {
    interface Window {
        gtag?: (command: string, ...args: unknown[]) => void;
        dataLayer?: unknown[][];
    }
}
declare class GoogleAnalyticsAdapter implements AnalyticsAdapter {
    name: string;
    private measurementId?;
    constructor(options?: GoogleAnalyticsAdapterOptions);
    private gtag;
    track(event: AnalyticsEvent): void;
    trackBatch(events: AnalyticsEvent[]): void;
    identify(userId: string, traits?: Record<string, unknown>): void;
    reset(): void;
}

export { type AnalyticsAdapter, type AnalyticsConfig, AnalyticsEngine, type AnalyticsEvent, AnalyticsQueue, type AnalyticsQueueOptions, type ComponentContext, ConsoleAdapter, type ConsoleAdapterOptions, DomTracker, type DomTrackerOptions, GoogleAnalyticsAdapter, type GoogleAnalyticsAdapterOptions, HttpAdapter, type HttpAdapterOptions, MixpanelAdapter, type MixpanelAdapterOptions, type MixpanelClient, type PageContext, SessionManager, generateUUID, getAnalyticsEngine, initAnalytics };
