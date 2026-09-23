"use client";

import * as React from "react";
import { Check, CheckCircle2, Circle, Copy, Terminal, Lightbulb, Play } from "lucide-react";
import { cn } from "../lib/utils";
import { Button } from "../forms/button";
import { Badge } from "../data-display/badge";
import { Card } from "../layout/card";

export interface CheckpointItem {
  id: string;
  title: string;
  command?: string;
  hint?: string;
  evidenceRequired?: boolean;
  completed?: boolean;
  evidence?: string;
}

export interface CheckpointRunnerProps extends React.HTMLAttributes<HTMLDivElement> {
  checkpoints: CheckpointItem[];
  onToggleCheckpoint?: (id: string, evidence?: string) => void;
  onRunCommand?: (command: string) => Promise<string | void> | void;
  title?: string;
  description?: string;
}

/**
 * CheckpointRunner
 *
 * Interactive step verification component for hands-on technical tutorials,
 * architectural labs, and course checkpoints.
 */
export function CheckpointRunner({
  checkpoints = [],
  onToggleCheckpoint,
  onRunCommand,
  title = "Hands-on Verification Checkpoints",
  description = "Complete each task and verify terminal output or code evidence.",
  className,
  ...props
}: CheckpointRunnerProps) {
  const [evidenceMap, setEvidenceMap] = React.useState<Record<string, string>>({});
  const [activeHintId, setActiveHintId] = React.useState<string | null>(null);
  const [copiedCmd, setCopiedCmd] = React.useState<string | null>(null);
  const [executingCmd, setExecutingCmd] = React.useState<string | null>(null);
  const copiedTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMountedRef = React.useRef(true);

  React.useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (copiedTimerRef.current) {
        clearTimeout(copiedTimerRef.current);
      }
    };
  }, []);

  const completedCount = checkpoints.filter((c) => c.completed).length;
  const progressPercent = checkpoints.length > 0 ? Math.round((completedCount / checkpoints.length) * 100) : 0;

  const handleCopy = (command: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(command);
      setCopiedCmd(command);
      if (copiedTimerRef.current) clearTimeout(copiedTimerRef.current);
      copiedTimerRef.current = setTimeout(() => {
        if (isMountedRef.current) setCopiedCmd(null);
      }, 2000);
    }
  };

  const handleRun = async (command: string) => {
    if (!onRunCommand) return;
    setExecutingCmd(command);
    try {
      await onRunCommand(command);
    } catch (e) {
      console.error(`[CheckpointRunner] Command execution failed: ${command}`, e);
    } finally {
      if (isMountedRef.current) {
        setExecutingCmd(null);
      }
    }
  };

  return (
    <Card className={cn("overflow-hidden border border-slate-200 dark:border-slate-800 p-6 space-y-5", className)} {...props}>
      {/* Header with Progress Meter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
            <Badge variant="secondary" className="font-mono text-xs">
              {completedCount}/{checkpoints.length} Done
            </Badge>
          </div>
          {description && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{description}</p>
          )}
        </div>

        <div className="w-full sm:w-36 flex flex-col gap-1">
          <div className="flex justify-between text-[11px] font-mono text-slate-500">
            <span>Progress</span>
            <span>{progressPercent}%</span>
          </div>
          <div
            className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden"
            role="progressbar"
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Checkpoint completion progress"
          >
            <div
              className="h-full bg-emerald-500 transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Checkpoints List */}
      <div className="space-y-3">
        {checkpoints.map((cp, idx) => {
          const isDone = Boolean(cp.completed);
          const evidenceInputId = `checkpoint-evidence-${cp.id}`;

          return (
            <div
              key={cp.id}
              className={cn(
                "p-3.5 rounded-lg border transition-all text-sm",
                isDone
                  ? "border-emerald-200 bg-emerald-50/40 dark:border-emerald-950 dark:bg-emerald-950/20"
                  : "border-slate-200 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/40"
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <button
                    type="button"
                    onClick={() => onToggleCheckpoint?.(cp.id, evidenceMap[cp.id] ?? cp.evidence)}
                    className="mt-0.5 shrink-0 text-slate-400 hover:text-emerald-600 transition-colors"
                    aria-label={`Mark checkpoint ${idx + 1} as ${isDone ? "incomplete" : "complete"}`}
                  >
                    {isDone ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <Circle className="h-4 w-4" />
                    )}
                  </button>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] text-slate-400">0{idx + 1}.</span>
                      <span
                        className={cn(
                          "font-medium",
                          isDone
                            ? "line-through text-slate-500 dark:text-slate-400"
                            : "text-slate-900 dark:text-slate-100"
                        )}
                      >
                        {cp.title}
                      </span>
                    </div>

                    {/* Runnable Command Snippet */}
                    {cp.command && (
                      <div className="mt-2 flex items-center gap-2 bg-slate-900 text-slate-100 dark:bg-slate-950 px-2.5 py-1.5 rounded font-mono text-xs max-w-full overflow-x-auto">
                        <Terminal className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                        <code className="flex-1 truncate">{cp.command}</code>
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleCopy(cp.command!)}
                            className="p-1 hover:text-emerald-300 transition-colors text-slate-400"
                            title="Copy command"
                            aria-label="Copy command"
                          >
                            {copiedCmd === cp.command ? (
                              <Check className="h-3 w-3 text-emerald-400" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                          </button>
                          {onRunCommand && (
                            <button
                              type="button"
                              onClick={() => handleRun(cp.command!)}
                              disabled={executingCmd === cp.command}
                              className="p-1 hover:text-emerald-300 transition-colors text-slate-400 disabled:opacity-50"
                              title="Run in environment"
                              aria-label="Run command in environment"
                            >
                              <Play className="h-3 w-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Hint */}
                    {cp.hint && activeHintId === cp.id && (
                      <div className="mt-2 text-xs bg-amber-50 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-900 p-2 rounded flex items-start gap-2">
                        <Lightbulb className="h-3.5 w-3.5 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
                        <span>{cp.hint}</span>
                      </div>
                    )}

                    {/* Evidence Input */}
                    {cp.evidenceRequired && !isDone && (
                      <div className="mt-2.5 space-y-1">
                        <label
                          htmlFor={evidenceInputId}
                          className="text-[11px] font-mono text-slate-500 uppercase"
                        >
                          Verification Evidence / Output:
                        </label>
                        <input
                          id={evidenceInputId}
                          type="text"
                          placeholder="e.g., commit hash, terminal response, test summary"
                          value={evidenceMap[cp.id] ?? cp.evidence ?? ""}
                          onChange={(e) =>
                            setEvidenceMap((prev) => ({ ...prev, [cp.id]: e.target.value }))
                          }
                          className="w-full text-xs font-mono px-2.5 py-1.5 rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  {cp.hint && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setActiveHintId(activeHintId === cp.id ? null : cp.id)}
                      debounceSec={false}
                      className="h-7 w-7 p-0 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                      aria-label="Toggle hint"
                    >
                      <Lightbulb className="h-3.5 w-3.5" />
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant={isDone ? "outline" : "default"}
                    onClick={() => onToggleCheckpoint?.(cp.id, evidenceMap[cp.id] ?? cp.evidence)}
                    debounceSec={false}
                    className="h-7 text-xs font-mono"
                  >
                    {isDone ? "Undo" : "Verify"}
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
