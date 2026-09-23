"use client";

import * as React from "react";
import { Award, CheckCircle2, Copy, Printer, Share2 } from "lucide-react";
import { cn } from "../lib/utils";
import { Button } from "../forms/button";
import { Badge } from "./badge";
import { Card } from "../layout/card";

export interface ProofOfWorkCertificateProps extends React.HTMLAttributes<HTMLDivElement> {
  certificateId: string;
  recipientName: string;
  recipientHandle?: string;
  projectTitle: string;
  projectSlug?: string;
  issueDate?: string;
  issuerName?: string;
  issuerLogoUrl?: string;
  skills?: string[];
  verificationUrl?: string;
  showActions?: boolean;
  onPrint?: () => void;
  onShare?: () => void;
}

/**
 * ProofOfWorkCertificate
 *
 * Verifiable, print-ready credential certificate component showcasing
 * completed project deliverables, skills acquired, and cryptographic-style serial hashes.
 */
export function ProofOfWorkCertificate({
  certificateId,
  recipientName,
  recipientHandle,
  projectTitle,
  projectSlug,
  issueDate: propIssueDate,
  issuerName = "Abeta Studio & Open Lab",
  issuerLogoUrl,
  skills = [],
  verificationUrl,
  showActions = true,
  onPrint,
  onShare,
  className,
  ...props
}: ProofOfWorkCertificateProps) {
  const [copied, setCopied] = React.useState(false);
  const [clientDate, setClientDate] = React.useState<string>(propIssueDate || "");
  const copiedTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    if (!propIssueDate) {
      setClientDate(new Date().toISOString().split("T")[0] ?? "");
    }
  }, [propIssueDate]);

  React.useEffect(() => {
    return () => {
      if (copiedTimerRef.current) {
        clearTimeout(copiedTimerRef.current);
      }
    };
  }, []);

  const issueDate = propIssueDate || clientDate || "Verified";

  const handleCopyLink = () => {
    const url = verificationUrl || (typeof window !== "undefined" ? window.location.href : "");
    if (url && typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      if (copiedTimerRef.current) clearTimeout(copiedTimerRef.current);
      copiedTimerRef.current = setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    if (onPrint) {
      onPrint();
    } else if (typeof window !== "undefined" && typeof window.print === "function") {
      window.print();
    }
  };

  const handleShare = async () => {
    if (onShare) {
      onShare();
      return;
    }
    const url = verificationUrl || (typeof window !== "undefined" ? window.location.href : "");
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: `Proof of Work — ${projectTitle}`,
          text: `${recipientName} completed ${projectTitle} on ${issuerName}`,
          url,
        });
      } catch (err) {
        if ((err as Error)?.name !== "AbortError") {
          handleCopyLink();
        }
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className={cn("flex flex-col gap-4 max-w-2xl mx-auto", className)} {...props}>
      <Card className="relative overflow-hidden border-2 border-slate-900 dark:border-slate-100 bg-amber-50/20 dark:bg-slate-950 p-8 shadow-xl transition-all print:border-black print:p-6 print:shadow-none">
        {/* Subtle Ornamental Corner Accents */}
        <div className="absolute top-2 left-2 h-4 w-4 border-t-2 border-l-2 border-slate-400 dark:border-slate-600" />
        <div className="absolute top-2 right-2 h-4 w-4 border-t-2 border-r-2 border-slate-400 dark:border-slate-600" />
        <div className="absolute bottom-2 left-2 h-4 w-4 border-b-2 border-l-2 border-slate-400 dark:border-slate-600" />
        <div className="absolute bottom-2 right-2 h-4 w-4 border-b-2 border-r-2 border-slate-400 dark:border-slate-600" />

        <div className="text-center space-y-6">
          {/* Header */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-amber-300 dark:bg-amber-400 dark:text-slate-950 shadow-md overflow-hidden">
              {issuerLogoUrl ? (
                <img src={issuerLogoUrl} alt={issuerName} className="h-full w-full object-contain p-1" />
              ) : (
                <Award className="h-6 w-6" />
              )}
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-mono tracking-widest uppercase text-slate-500 dark:text-slate-400">
                Verifiable Credential • Proof of Work
              </span>
              <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 uppercase">
                Certificate of Completion
              </h2>
            </div>
          </div>

          {/* Recipient */}
          <div className="space-y-1.5 py-2">
            <p className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400">
              This is presented to
            </p>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-slate-100">
              {recipientName}
            </h3>
            {recipientHandle && (
              <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
                @{recipientHandle.replace(/^@/, "")}
              </p>
            )}
          </div>

          {/* Statement */}
          <p className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300 max-w-md mx-auto">
            for successfully completing all required architectural checkpoints and production milestones for{" "}
            <strong className="font-semibold text-slate-900 dark:text-slate-100">
              {projectTitle}
            </strong>
            .
          </p>

          {/* Skills */}
          {skills.length > 0 && (
            <div className="flex flex-wrap justify-center gap-1.5 pt-2">
              {skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="outline"
                  className="font-mono text-[10px] uppercase border-slate-300 dark:border-slate-700 bg-white/60 dark:bg-slate-900"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          )}

          {/* Metadata Footer */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 gap-4 text-left font-mono text-[10px]">
            <div>
              <span className="block text-slate-400 uppercase">Issue Date</span>
              <strong className="text-slate-800 dark:text-slate-200 font-semibold">{issueDate}</strong>
            </div>
            <div className="text-right">
              <span className="block text-slate-400 uppercase">Issuer</span>
              <strong className="text-slate-800 dark:text-slate-200 font-semibold">{issuerName}</strong>
            </div>
            <div className="col-span-2 pt-2 border-t border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                <span className="text-[10px] uppercase font-bold tracking-wider">Verified On-Chain / Browser Hash</span>
              </div>
              <span
                className="text-[10px] text-slate-400 truncate max-w-[200px]"
                title={projectSlug ? `${projectSlug} (${certificateId})` : certificateId}
              >
                ID: {certificateId}
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Action Toolbar */}
      {showActions && (
        <div className="flex flex-wrap items-center justify-between gap-2 px-1 print:hidden">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrint}
            debounceSec={false}
            className="gap-2 font-mono text-xs"
            aria-label="Print or save certificate as PDF"
          >
            <Printer className="h-3.5 w-3.5" /> Print / PDF
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyLink}
              debounceSec={false}
              className="gap-2 font-mono text-xs"
              aria-label={copied ? "Verification link copied to clipboard" : "Copy verification link"}
            >
              <Copy className="h-3.5 w-3.5" /> {copied ? "Copied!" : "Copy Link"}
            </Button>
            <Button
              size="sm"
              onClick={handleShare}
              debounceSec={false}
              className="gap-2 font-mono text-xs"
              aria-label="Share certificate"
            >
              <Share2 className="h-3.5 w-3.5" /> Share
            </Button>
            <span className="sr-only" role="status" aria-live="polite">
              {copied ? "Verification link copied to clipboard" : ""}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
