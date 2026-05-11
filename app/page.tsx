import { CalculatorForm } from "@/components/CalculatorForm";
import { getDatasetMeta, getAvailableDates } from "@/services/inflationService";
import { formatTodayLabel, getLatestDateKey } from "@/lib/date";
import { formatDateLabel } from "@/lib/formatters";
import type { Metadata } from "next";
import { getDefaultMetadata } from "@/lib/metadata";

export const metadata: Metadata = getDefaultMetadata();

export default function HomePage() {
  const todayLabel = formatTodayLabel();
  const meta = getDatasetMeta();
  const latestDate = getLatestDateKey(getAvailableDates());

  return (
    <main className="min-h-screen bg-zinc-50">
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-white to-transparent pointer-events-none" />

      <div className="relative max-w-md mx-auto px-5 py-16 sm:py-24">
        <div className="mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 bg-white border border-zinc-100 rounded-full px-4 py-1.5 text-xs font-medium text-zinc-500 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
            TÜFE Bazlı Hesaplayıcı
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 leading-none">
            Bugün Ne Kadar?
          </h1>

          <p className="text-zinc-500 text-base leading-relaxed">
            Geçmişteki paranızın bugünkü karşılığını öğrenin.
          </p>

          <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-3 py-1 text-xs font-semibold text-green-700">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" aria-hidden="true" />
            Bugün: {todayLabel}
          </div>
        </div>

        <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 mb-4 text-xs text-amber-800">
          <svg className="shrink-0" width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M8 1a7 7 0 100 14A7 7 0 008 1zM7 5a1 1 0 112 0v3a1 1 0 11-2 0V5zm1 7a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
          <span>
            Son veri:{" "}
            <strong>{formatDateLabel(latestDate)}</strong> —
            {meta.source} resmi aylık TÜFE değişimleri kullanılmıştır.
          </span>
        </div>

        <CalculatorForm />

        <footer className="mt-16 pt-8 border-t border-zinc-100 text-center space-y-1">
          <p className="text-zinc-400 text-xs">
            Veriler {meta.source} &amp; TÜİK TÜFE istatistiklerinden alınmıştır.
          </p>
          <p className="text-zinc-300 text-xs">
            Son güncelleme: {meta.updatedAt} · Kesin finansal tavsiye değildir.
          </p>
        </footer>
      </div>
    </main>
  );
}
