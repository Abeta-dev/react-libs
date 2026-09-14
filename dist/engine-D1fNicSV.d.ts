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

export { type AnalyticsAdapter as A, type ComponentContext as C, type PageContext as P, SessionManager as S, type AnalyticsEvent as a, type AnalyticsConfig as b, AnalyticsEngine as c, AnalyticsQueue as d, type AnalyticsQueueOptions as e, getAnalyticsEngine as f, generateUUID as g, initAnalytics as i };
