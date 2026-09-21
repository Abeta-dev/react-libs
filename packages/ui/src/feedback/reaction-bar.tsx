"use client";

import * as React from "react";
import { Bookmark, Check, Flame, Share2 } from "lucide-react";
import { cn } from "../lib/utils";
import { Button } from "../forms/button";

export interface ReactionBarProps extends React.HTMLAttributes<HTMLDivElement> {
  claps?: number;
  initialClaps?: number;
  onClap?: (count: number) => void;
  maxClapsPerUser?: number;
  isBookmarked?: boolean;
  onToggleBookmark?: (bookmarked: boolean) => void;
  showReadingProgress?: boolean;
  scrollTargetRef?: React.RefObject<HTMLElement | null>;
  shareUrl?: string;
  shareTitle?: string;
  onShare?: () => void;
}

/**
 * ReactionBar
 *
 * Modern engagement bar for long-form articles, documentation pages,
 * and editorial posts featuring reading progress, applause, bookmarks, and share triggers.
 */
export function ReactionBar({
  claps: controlledClaps,
  initialClaps = 0,
  onClap,
  maxClapsPerUser = 50,
  isBookmarked: controlledBookmarked,
  onToggleBookmark,
  showReadingProgress = true,
  scrollTargetRef,
  shareUrl,
  shareTitle,
  onShare,
  className,
  ...props
}: ReactionBarProps) {
  const [internalClaps, setInternalClaps] = React.useState(initialClaps);
  const [userClapCount, setUserClapCount] = React.useState(0);
  const [internalBookmarked, setInternalBookmarked] = React.useState(false);
  const [readingProgress, setReadingProgress] = React.useState(0);
  const [copied, setCopied] = React.useState(false);
  const [animatingClap, setAnimatingClap] = React.useState(false);

  const clapTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const copyTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    return () => {
      if (clapTimerRef.current) clearTimeout(clapTimerRef.current);
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    };
  }, []);

  const claps = controlledClaps !== undefined ? controlledClaps : internalClaps;
  const isBookmarked = controlledBookmarked !== undefined ? controlledBookmarked : internalBookmarked;

  // Track window or element scroll progress
  React.useEffect(() => {
    if (!showReadingProgress || typeof window === "undefined") return;

    const handleScroll = () => {
      if (scrollTargetRef && scrollTargetRef.current) {
        const el = scrollTargetRef.current;
        const rect = el.getBoundingClientRect();
        const totalHeight = el.scrollHeight - window.innerHeight;
        if (totalHeight <= 0) {
          setReadingProgress(100);
          return;
        }
        const currentProgress = Math.min(100, Math.max(0, Math.round((-rect.top / totalHeight) * 100)));
        setReadingProgress(Number.isFinite(currentProgress) ? currentProgress : 0);
      } else {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight <= 0) {
          setReadingProgress(100);
          return;
        }
        const currentProgress = Math.min(100, Math.max(0, Math.round((window.scrollY / totalHeight) * 100)));
        setReadingProgress(Number.isFinite(currentProgress) ? currentProgress : 0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showReadingProgress, scrollTargetRef]);

  const handleClapClick = () => {
    if (userClapCount >= maxClapsPerUser) return;
    const nextClaps = claps + 1;
    setInternalClaps(nextClaps);
    setUserClapCount((prev) => prev + 1);
    setAnimatingClap(true);
    if (clapTimerRef.current) clearTimeout(clapTimerRef.current);
    clapTimerRef.current = setTimeout(() => setAnimatingClap(false), 600);
    onClap?.(nextClaps);
  };

  const handleBookmarkClick = () => {
    const next = !isBookmarked;
    if (controlledBookmarked === undefined) {
      setInternalBookmarked(next);
    }
    onToggleBookmark?.(next);
  };

  const copyToClipboard = (url: string) => {
    if (typeof navigator === "undefined" || !navigator.clipboard) return;
    navigator.clipboard.writeText(url);
    setCopied(true);
    if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    copyTimerRef.current = setTimeout(() => setCopied(false), 2000);
  };

  const handleShareClick = async () => {
    if (onShare) {
      onShare();
      return;
    }

    const url = shareUrl || (typeof window !== "undefined" ? window.location.href : "");
    const title = shareTitle || (typeof document !== "undefined" ? document.title : "");

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch (err) {
        if ((err as Error)?.name !== "AbortError") {
          copyToClipboard(url);
        }
      }
      return;
    }

    copyToClipboard(url);
  };

  return (
    <div
      className={cn(
        "relative flex items-center justify-between gap-4 p-2 sm:p-2.5 rounded-full border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md shadow-lg",
        className
      )}
      {...props}
    >
      {/* Optional Top Reading Progress Track */}
      {showReadingProgress && (
        <div
          className="absolute top-0 left-4 right-4 h-0.5 bg-slate-100 dark:bg-slate-800 overflow-hidden rounded-full"
          role="progressbar"
          aria-valuenow={readingProgress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Reading progress"
        >
          <div
            className="h-full bg-slate-900 dark:bg-slate-100 transition-all duration-150"
            style={{ width: `${readingProgress}%` }}
          />
        </div>
      )}

      {/* Claps / Applause */}
      <div className="flex items-center gap-1.5">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClapClick}
          disabled={userClapCount >= maxClapsPerUser}
          debounceSec={false}
          className={cn(
            "rounded-full h-8 px-3 gap-1.5 font-mono text-xs transition-transform",
            animatingClap && "scale-110 text-amber-500",
            userClapCount > 0 ? "text-slate-900 dark:text-slate-100" : "text-slate-500"
          )}
          aria-label={`Clap for this article (${claps} claps)`}
        >
          <Flame className={cn("h-4 w-4", userClapCount > 0 && "fill-current text-amber-500")} />
          <span>{claps}</span>
        </Button>

        {showReadingProgress && (
          <span className="hidden sm:inline-block font-mono text-[10px] text-slate-400 pl-1 border-l border-slate-200 dark:border-slate-800">
            {readingProgress}% read
          </span>
        )}
      </div>

      {/* Bookmark & Share Actions */}
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBookmarkClick}
          debounceSec={false}
          className={cn(
            "rounded-full h-8 w-8 p-0 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100",
            isBookmarked && "text-slate-900 dark:text-slate-100"
          )}
          aria-label={isBookmarked ? "Remove bookmark" : "Bookmark article"}
        >
          <Bookmark className={cn("h-4 w-4", isBookmarked && "fill-current text-indigo-600 dark:text-indigo-400")} />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleShareClick}
          debounceSec={false}
          className="rounded-full h-8 w-8 p-0 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
          aria-label={copied ? "Link copied to clipboard" : "Share article"}
        >
          {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Share2 className="h-4 w-4" />}
        </Button>
        <span className="sr-only" role="status" aria-live="polite">
          {copied ? "Link copied to clipboard" : ""}
        </span>
      </div>
    </div>
  );
}
