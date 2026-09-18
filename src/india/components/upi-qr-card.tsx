"use client";

import * as React from "react";
import QRCode from "qrcode";
import { Download, QrCode as QrIcon, Check, Copy, ShieldCheck } from "lucide-react";
import { cn } from "../../lib/utils";
import { generateUpiPayUri, validateUpiId } from "../upi";

export interface UpiQrCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Merchant or Payee Virtual Payment Address (e.g. merchant@upi) */
  upiId: string;
  /** Payee or Merchant Business Name */
  payeeName?: string | undefined;
  /** Optional transaction amount in INR */
  amount?: number | undefined;
  /** Optional payment note */
  transactionNote?: string | undefined;
  /** Whether to render full counter standee mode or raw compact QR */
  showStandee?: boolean | undefined;
  /** QR Code display dimension in pixels (default: 180) */
  size?: number | undefined;
  /** Callback when downloadable PNG data URL is rendered */
  onDownloadReady?: ((dataUrl: string) => void) | undefined;
  /** Standee header badge label */
  badgeLabel?: string | undefined;
}

export const UpiQrCard = React.forwardRef<HTMLDivElement, UpiQrCardProps>(
  (
    {
      upiId,
      payeeName = "Merchant Store",
      amount,
      transactionNote,
      showStandee = true,
      size = 180,
      className,
      onDownloadReady,
      badgeLabel = "0% Commission Direct UPI",
      ...props
    },
    ref
  ) => {
    const [svgMarkup, setSvgMarkup] = React.useState<string>("");
    const [pngDataUrl, setPngDataUrl] = React.useState<string>("");
    const [copied, setCopied] = React.useState(false);

    const validation = React.useMemo(() => validateUpiId(upiId), [upiId]);

    const upiUri = React.useMemo(() => {
      if (!validation.isValid) return "";
      return generateUpiPayUri({
        upiId,
        payeeName,
        amount,
        transactionNote,
      });
    }, [upiId, payeeName, amount, transactionNote, validation.isValid]);

    React.useEffect(() => {
      if (!upiUri) {
        setSvgMarkup("");
        setPngDataUrl("");
        return;
      }

      let isMounted = true;

      // Generate SVG string for ultra-crisp vector rendering
      QRCode.toString(
        upiUri,
        {
          type: "svg",
          margin: 1,
          color: {
            dark: "#0f172a",
            light: "#ffffff",
          },
        },
        (err, svg) => {
          if (!err && isMounted && svg) {
            setSvgMarkup(svg);
          }
        }
      );

      // Generate high-resolution PNG data URL for downloading/printing
      QRCode.toDataURL(
        upiUri,
        {
          margin: 2,
          width: 400,
          color: {
            dark: "#0f172a",
            light: "#ffffff",
          },
        },
        (err, url) => {
          if (!err && isMounted && url) {
            setPngDataUrl(url);
            if (onDownloadReady) {
              onDownloadReady(url);
            }
          }
        }
      );

      return () => {
        isMounted = false;
      };
    }, [upiUri, onDownloadReady]);

    const handleCopyVPA = () => {
      if (!upiId) return;
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        navigator.clipboard.writeText(upiId.trim());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    };

    const handleDownload = () => {
      if (!pngDataUrl || typeof document === "undefined") return;
      const a = document.createElement("a");
      a.href = pngDataUrl;
      const safeName = (payeeName || "UPI").replace(/\s+/g, "_");
      a.download = `${safeName}_UPI_QR.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };

    if (!validation.isValid) {
      return (
        <div
          ref={ref}
          className={cn(
            "p-5 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex flex-col items-center justify-center text-center text-slate-400 text-xs",
            className
          )}
          {...props}
        >
          <QrIcon className="w-8 h-8 text-slate-300 dark:text-slate-600 mb-2" aria-hidden="true" />
          <span>Enter a valid UPI VPA to generate live payment QR</span>
        </div>
      );
    }

    if (!showStandee) {
      return (
        <div
          ref={ref}
          className={cn("flex flex-col items-center", className)}
          {...props}
        >
          {svgMarkup ? (
            <div
              className="w-full max-w-[200px] aspect-square rounded-xl overflow-hidden bg-white p-2 shadow-xs border border-slate-200 dark:border-slate-800"
              dangerouslySetInnerHTML={{ __html: svgMarkup }}
            />
          ) : (
            <div
              style={{ width: size, height: size }}
              className="bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse flex items-center justify-center text-xs text-slate-400"
            >
              Generating QR...
            </div>
          )}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          "relative bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-5 shadow-xl border border-indigo-500/30 flex flex-col items-center text-center overflow-hidden w-full max-w-xs mx-auto",
          className
        )}
        {...props}
      >
        {/* Top Operational Pill */}
        <div className="w-full flex items-center justify-between pb-2.5 mb-2 border-b border-indigo-500/20">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-300">
              {badgeLabel}
            </span>
          </div>
          <div className="flex items-center gap-1 text-[10px] font-bold text-indigo-300 bg-indigo-900/60 px-2 py-0.5 rounded-full border border-indigo-400/20">
            <ShieldCheck className="w-3 h-3 text-emerald-400" aria-hidden="true" />
            <span>NPCI UPI</span>
          </div>
        </div>

        {/* Business Title & Amount */}
        <div className="my-1 w-full px-1">
          <h4 className="text-sm font-black text-white tracking-tight truncate">
            {payeeName}
          </h4>
          {amount && amount > 0 ? (
            <p className="text-base font-extrabold text-amber-400 mt-0.5">
              {"₹" + amount.toLocaleString("en-IN")}
            </p>
          ) : (
            <p className="text-[11px] text-indigo-200/90 font-medium mt-0.5">
              Scan & Pay with Any UPI App
            </p>
          )}
        </div>

        {/* QR Code Presentation Box */}
        <div className="my-3 p-3 bg-white rounded-xl shadow-lg border-2 border-indigo-400/40">
          {svgMarkup ? (
            <div
              style={{ width: size, height: size }}
              className="flex items-center justify-center [&>svg]:w-full [&>svg]:h-full"
              dangerouslySetInnerHTML={{ __html: svgMarkup }}
            />
          ) : (
            <div
              style={{ width: size, height: size }}
              className="bg-slate-100 rounded-lg flex items-center justify-center text-xs text-slate-400 animate-pulse"
            >
              Generating QR...
            </div>
          )}
        </div>

        {/* Universal UPI App Badges */}
        <div className="flex items-center justify-center gap-1.5 my-1 text-[9px] font-bold text-slate-300">
          <span className="bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">GPay</span>
          <span className="bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">PhonePe</span>
          <span className="bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">Paytm</span>
          <span className="bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">BHIM</span>
        </div>

        {/* VPA Copy Pill */}
        <div className="mt-2.5 w-full flex items-center justify-between gap-1 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-indigo-500/20 text-xs">
          <div className="text-left truncate">
            <span className="text-[9px] uppercase tracking-wider text-slate-400 block font-bold">
              Merchant VPA
            </span>
            <span className="text-indigo-200 font-mono font-bold text-[11px] truncate block">
              {upiId}
            </span>
          </div>
          <button
            type="button"
            onClick={handleCopyVPA}
            className="p-1.5 rounded text-indigo-300 hover:text-white hover:bg-slate-700 transition focus:outline-none focus:ring-1 focus:ring-indigo-400"
            title="Copy UPI VPA"
            aria-label="Copy UPI VPA"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
            ) : (
              <Copy className="w-3.5 h-3.5" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Download Standee Button */}
        <div className="mt-3 w-full">
          <button
            type="button"
            onClick={handleDownload}
            disabled={!pngDataUrl}
            className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 active:scale-98 text-slate-950 rounded-lg text-xs font-black shadow-sm transition disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Download Counter Standee</span>
          </button>
        </div>
      </div>
    );
  }
);

UpiQrCard.displayName = "UpiQrCard";
