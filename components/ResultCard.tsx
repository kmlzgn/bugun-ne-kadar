"use client";

import { useState } from "react";
import { InflationResult } from "@/types";
import { generateNarrative } from "@/lib/narrative";
import {
  formatTRY,
  formatDateLabel,
  formatMultiplier,
  formatPercent,
} from "@/lib/formatters";
import { formatTodayLabel } from "@/lib/date";

interface ResultCardProps {
  result: InflationResult;
}

export function ResultCard({ result }: ResultCardProps) {
  const [copied, setCopied] = useState(false);

  const {
    originalAmount,
    todayAmount,
    originalDate,
    todayDate,
    percentageIncrease,
    multiplier,
  } = result;

  const narrative = generateNarrative(result);
  const todayLabel = formatTodayLabel();

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(narrative);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard not available
    }
  }

  async function handleShare() {
    const shareData = {
      title: "Bugün Ne Kadar?",
      text: narrative,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // user cancelled or not supported
      }
    } else {
      await handleCopy();
    }
  }

  return (
    <div
      className="rounded-3xl bg-zinc-900 text-white p-8 space-y-6 shadow-2xl"
      role="region"
      aria-label="Hesaplama sonucu"
    >
      {/* Main headline */}
      <div className="space-y-3">
        <p className="text-zinc-400 text-sm font-medium tracking-wide uppercase">
          Sonuç
        </p>
        <p className="text-lg text-zinc-300 leading-relaxed">
          <span className="text-white font-semibold">
            {formatDateLabel(originalDate)}
          </span>{" "}
          tarihindeki{" "}
          <span className="text-white font-semibold">
            {formatTRY(originalAmount)}
          </span>
          ...
        </p>
        <p className="text-3xl sm:text-4xl font-bold leading-tight tracking-tight">
          Bugün yaklaşık{" "}
          <span className="text-amber-400">{formatTRY(todayAmount)}</span>{" "}
          alım gücüne denk geliyor.
        </p>
      </div>

      {/* Today reference pill */}
      <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs text-zinc-400">
        <span className="h-1.5 w-1.5 rounded-full bg-green-400" aria-hidden="true" />
        <span>Bugün: {todayLabel}</span>
        <span className="text-zinc-600" aria-hidden="true">·</span>
        <span>Son veri: {formatDateLabel(todayDate)}</span>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-4">
        <StatBox
          label="Artış Oranı"
          value={formatPercent(percentageIncrease)}
          highlight
        />
        <StatBox label="Çarpan" value={formatMultiplier(multiplier)} />
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={handleCopy}
          className="
            flex-1 flex items-center justify-center gap-2 py-3 px-4
            bg-white/10 hover:bg-white/15 rounded-xl text-sm font-medium
            transition-colors duration-150
          "
        >
          {copied ? (
            <>
              <CheckIcon />
              Kopyalandı
            </>
          ) : (
            <>
              <CopyIcon />
              Kopyala
            </>
          )}
        </button>
        <button
          onClick={handleShare}
          className="
            flex-1 flex items-center justify-center gap-2 py-3 px-4
            bg-amber-500 hover:bg-amber-400 rounded-xl text-sm font-semibold
            text-zinc-900 transition-colors duration-150
          "
        >
          <ShareIcon />
          Paylaş
        </button>
      </div>

      {/* Fine print */}
      <p className="text-zinc-500 text-xs">
        Kaynak: TCMB resmi aylık TÜFE değişimleri (2003=100 baz endeksi).
      </p>
    </div>
  );
}

function StatBox({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="bg-zinc-800 rounded-2xl p-5">
      <p className="text-zinc-400 text-xs font-medium uppercase tracking-wide mb-2">
        {label}
      </p>
      <p
        className={`text-2xl font-bold ${
          highlight ? "text-amber-400" : "text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function CopyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 11V3a1 1 0 011-1h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8a2 2 0 100-4 2 2 0 000 4zM8 13a2 2 0 100-4 2 2 0 000 4zM13 8a2 2 0 100-4 2 2 0 000 4z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6.5 6.5l3 3M9.5 6.5l-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8l4 4 6-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}