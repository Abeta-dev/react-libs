import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React from 'react';
import { c as AnalyticsEngine, a as AnalyticsEvent, P as PageContext, b as AnalyticsConfig } from '../../engine-D1fNicSV.js';

interface AnalyticsContextValue {
    engine: AnalyticsEngine | null;
    track: (eventName: string, metadata?: Record<string, unknown>) => AnalyticsEvent | undefined;
    trackPageView: (page?: Partial<PageContext>, metadata?: Record<string, unknown>) => AnalyticsEvent | undefined;
    identify: (userId: string, traits?: Record<string, unknown>) => void;
    setGlobalMetadata: (metadata: Record<string, unknown>) => void;
    logout: () => void;
}
interface AnalyticsProviderProps {
    children: React.ReactNode;
    config?: AnalyticsConfig;
    engine?: AnalyticsEngine;
    onError?: (err: unknown) => void;
}
declare function AnalyticsProvider({ children, config, engine: externalEngine, onError, }: AnalyticsProviderProps): react_jsx_runtime.JSX.Element;
declare function useAnalytics(): AnalyticsContextValue;

interface TrackAreaProps extends React.HTMLAttributes<HTMLDivElement> {
    journey?: string;
    /** Area/cluster identifier (alias for journey) */
    area?: string;
    step?: string;
    metadata?: Record<string, unknown>;
    children: React.ReactNode;
}
declare const TrackArea: React.ForwardRefExoticComponent<TrackAreaProps & React.RefAttributes<HTMLDivElement>>;

interface PageViewTrackerProps {
    pageTitle?: string;
    path?: string;
    metadata?: Record<string, unknown>;
}
declare function PageViewTracker({ pageTitle, path, metadata, }: PageViewTrackerProps): null;

export { type AnalyticsContextValue, AnalyticsProvider, type AnalyticsProviderProps, PageViewTracker, type PageViewTrackerProps, TrackArea, type TrackAreaProps, useAnalytics };
