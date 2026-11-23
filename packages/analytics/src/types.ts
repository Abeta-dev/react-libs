export interface ComponentContext {
  id: string;
  name: string;
  type: string;
  interaction: "click" | "change" | "submit";
  interactionCount: number;
}

export interface PageContext {
  url: string;
  path: string;
  title: string;
  referrer: string;
}

export interface AnalyticsEvent {
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

export interface AnalyticsAdapter {
  name: string;
  onInit?(config: AnalyticsConfig): Promise<void> | void;
  track(event: AnalyticsEvent): Promise<void> | void;
  trackBatch?(events: AnalyticsEvent[]): Promise<void> | void;
  identify?(userId: string, traits?: Record<string, unknown>): Promise<void> | void;
  reset?(): Promise<void> | void;
}

export interface AnalyticsConfig {
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
