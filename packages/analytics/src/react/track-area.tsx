import * as React from "react";

export interface TrackAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  journey?: string;
  /** Area/cluster identifier (alias for journey) */
  area?: string;
  step?: string;
  metadata?: Record<string, unknown>;
  children: React.ReactNode;
}

export const TrackArea = React.forwardRef<HTMLDivElement, TrackAreaProps>(
  ({ journey, area, step, metadata, className, children, ...props }, ref) => {
    const effectiveJourney = area ?? journey;
    return (
      <div
        ref={ref}
        data-track-area=""
        data-track-area-journey={effectiveJourney}
        data-track-area-step={step}
        data-track-area-metadata={metadata ? JSON.stringify(metadata) : undefined}
        className={className}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TrackArea.displayName = "TrackArea";
