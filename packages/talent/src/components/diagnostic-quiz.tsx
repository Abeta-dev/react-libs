"use client";

import * as React from "react";
import { ArrowLeft, ArrowRight, Trophy } from "lucide-react";
import { cn } from "@abeta.dev/ui";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@abeta.dev/ui";
import { Button } from "@abeta.dev/ui";
import { Badge } from "@abeta.dev/ui";

export interface QuizOption {
  label: string;
  description?: string;
  trackAffinity: string;
  weight?: number;
}

export interface QuizQuestion {
  id: string;
  title: string;
  category?: string;
  options: QuizOption[];
}

export interface DiagnosticQuizProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  questions: QuizQuestion[];
  onComplete: (recommendedTrack: string, scores: Record<string, number>) => void;
}

/**
 * DiagnosticQuiz
 *
 * Multi-step onboarding and diagnostic quiz dialog for classifying learners
 * or customers into tailored learning paths or product tracks.
 */
export function DiagnosticQuiz({
  open,
  onOpenChange,
  title = "Diagnostic Skills Assessment",
  description = "Answer a few questions to receive a tailored roadmap.",
  questions = [],
  onComplete,
}: DiagnosticQuizProps) {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [selectedAnswers, setSelectedAnswers] = React.useState<Map<number, number>>(() => new Map());
  const [result, setResult] = React.useState<string | null>(null);

  if (questions.length === 0) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md p-6 text-center">
          <DialogHeader>
            <DialogTitle>No Questions Available</DialogTitle>
            <DialogDescription>This assessment currently has no questions configured.</DialogDescription>
          </DialogHeader>
          <DialogFooter className="justify-center pt-4">
            <Button size="sm" onClick={() => onOpenChange(false)} debounceSec={false}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  const totalQuestions = Math.max(1, questions.length);
  const activeQuestion = questions.at(currentStep);
  const isLastQuestion = currentStep === questions.length - 1;
  const hasSelected = selectedAnswers.has(currentStep);

  const handleSelectOption = (index: number) => {
    setSelectedAnswers((prev) => {
      const next = new Map(prev);
      next.set(currentStep, index);
      return next;
    });
  };

  const handleNext = () => {
    if (isLastQuestion) {
      calculateResult();
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  const calculateResult = () => {
    const scores = new Map<string, number>();

    questions.forEach((q, qIndex) => {
      const optionIndex = selectedAnswers.get(qIndex);
      if (optionIndex !== undefined && optionIndex >= 0 && optionIndex < q.options.length) {
        const option = q.options.at(optionIndex);
        if (option) {
          const track = option.trackAffinity;
          const weight = option.weight ?? 1;
          scores.set(track, (scores.get(track) ?? 0) + weight);
        }
      }
    });

    let topTrack = questions.at(0)?.options.at(0)?.trackAffinity || "fullstack";
    let maxScore = -1;
    scores.forEach((score, track) => {
      if (score > maxScore) {
        maxScore = score;
        topTrack = track;
      }
    });

    setResult(topTrack);
    const scoreMap: Record<string, number> = {};
    scores.forEach((score, track) => {
      Object.assign(scoreMap, { [track]: score });
    });
    onComplete(topTrack, scoreMap);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setSelectedAnswers(new Map());
    setResult(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl p-6 sm:p-8">
        {!result ? (
          <>
            <DialogHeader className="space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="font-mono text-xs uppercase">
                  {title} • {currentStep + 1} of {totalQuestions}
                </Badge>
                {activeQuestion?.category && (
                  <span className="text-xs font-mono text-slate-400 uppercase">
                    {activeQuestion.category}
                  </span>
                )}
              </div>
              <DialogTitle className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                {activeQuestion?.title || "Assessment Question"}
              </DialogTitle>
              {description && <DialogDescription>{description}</DialogDescription>}
            </DialogHeader>

            {/* Step Progress Bar */}
            <div
              className="h-1 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden my-2"
              role="progressbar"
              aria-valuenow={Math.round(((currentStep + 1) / totalQuestions) * 100)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Quiz progress"
            >
              <div
                className="h-full bg-slate-900 dark:bg-slate-100 transition-all duration-300"
                style={{ width: `${Math.min(100, Math.round(((currentStep + 1) / totalQuestions) * 100))}%` }}
              />
            </div>

            {/* Options */}
            <div
              className="space-y-2.5 my-4"
              role="radiogroup"
              aria-label={activeQuestion?.title || "Quiz options"}
            >
              {activeQuestion?.options.map((opt, idx) => {
                const isSelected = selectedAnswers.get(currentStep) === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => handleSelectOption(idx)}
                    className={cn(
                      "w-full text-left p-4 rounded-lg border transition-all flex items-start gap-3",
                      isSelected
                        ? "border-slate-900 bg-slate-50 dark:border-slate-100 dark:bg-slate-900 ring-1 ring-slate-900 dark:ring-slate-100"
                        : "border-slate-200 hover:border-slate-400 dark:border-slate-800 dark:hover:border-slate-600 bg-white dark:bg-slate-950"
                    )}
                  >
                    <div
                      className={cn(
                        "h-5 w-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 font-mono text-xs",
                        isSelected
                          ? "border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-900"
                          : "border-slate-300 dark:border-slate-700"
                      )}
                    >
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {opt.label}
                      </p>
                      {opt.description && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          {opt.description}
                        </p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <DialogFooter className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePrev}
                disabled={currentStep === 0}
                debounceSec={false}
                className="gap-1.5 font-mono text-xs"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Back
              </Button>
              <Button
                size="sm"
                onClick={handleNext}
                disabled={!hasSelected}
                debounceSec={false}
                className="gap-1.5 font-mono text-xs"
              >
                {isLastQuestion ? "Complete & Recommend" : "Next"} <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </DialogFooter>
          </>
        ) : (
          <div className="text-center py-6 space-y-5">
            <DialogHeader className="text-center space-y-2">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 mx-auto">
                <Trophy className="h-7 w-7" />
              </div>
              <div className="space-y-1.5">
                <span className="text-xs font-mono uppercase text-slate-400">Diagnosis Complete</span>
                <DialogTitle className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  Recommended Track: <span className="capitalize">{result}</span>
                </DialogTitle>
                <DialogDescription className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                  Based on your experience, goals, and architectural preferences, this track will deliver the highest leverage.
                </DialogDescription>
              </div>
            </DialogHeader>

            <div className="flex justify-center gap-3 pt-4">
              <Button variant="outline" size="sm" onClick={handleReset} debounceSec={false} className="font-mono text-xs">
                Retake Quiz
              </Button>
              <Button size="sm" onClick={() => onOpenChange(false)} debounceSec={false} className="font-mono text-xs">
                Explore Curriculum
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
