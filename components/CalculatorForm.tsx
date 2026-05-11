"use client";

import { useState, useTransition, useCallback } from "react";
import { AmountInput } from "@/components/AmountInput";
import { DateSelector } from "@/components/DateSelector";
import { ResultCard } from "@/components/ResultCard";
import { InflationChart } from "@/components/InflationChart";
import { LoadingSpinner, ErrorMessage, ResultSkeleton } from "@/components/Feedback";
import { calculateInflation, getChartData } from "@/services/inflationService";
import { padMonth } from "@/lib/formatters";
import type { InflationResult, ChartDataPoint } from "@/types";

const INITIAL_STATE = {
  amount: "",
  year: "",
  month: "",
};

export function CalculatorForm() {
  const [form, setForm] = useState(INITIAL_STATE);
  const [result, setResult] = useState<InflationResult | null>(null);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleCalculate = useCallback(() => {
    setError(null);
    setResult(null);
    setChartData([]);

    const calc = calculateInflation(form.amount, `${form.year}-${padMonth(parseInt(form.month))}`);
    if (!calc.success) {
      setError(calc.error);
      return;
    }

    const chart = getChartData(calc.data.originalAmount, calc.data.originalDate);
    setResult(calc.data);
    setChartData(chart);
  }, [form.amount, form.year, form.month]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(() => handleCalculate());
  }

  function handleReset() {
    setForm(INITIAL_STATE);
    setResult(null);
    setChartData([]);
    setError(null);
  }

  const isDisabled = isPending || !form.amount || !form.year || !form.month;

  return (
    <form onSubmit={handleSubmit} role="form" aria-label="Enflasyon hesaplayıcı" className="space-y-4">
      {/* Input card */}
      <div className="rounded-3xl bg-white border border-zinc-100 shadow-sm p-6 space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-zinc-400 uppercase tracking-wide">
            Tutar
          </label>
          <AmountInput
            value={form.amount}
            onChange={(v) => setForm((f) => ({ ...f, amount: v }))}
            disabled={isPending}
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-zinc-400 uppercase tracking-wide">
            Tarih
          </label>
          <DateSelector
            year={form.year}
            month={form.month}
            onYearChange={(v) => setForm((f) => ({ ...f, year: v }))}
            onMonthChange={(v) => setForm((f) => ({ ...f, month: v }))}
            disabled={isPending}
          />
        </div>

        <button
          type="submit"
          disabled={isDisabled}
          className="
            w-full py-4 px-6 rounded-2xl
            bg-zinc-900 text-white font-semibold text-base
            hover:bg-zinc-700 active:scale-[0.98]
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-150
            shadow-sm
          "
        >
          {isPending ? "Hesaplanıyor…" : "Hesapla"}
        </button>
      </div>

      {/* Loading */}
      {isPending && <ResultSkeleton />}

      {/* Error */}
      {error && !isPending && (
        <div aria-live="assertive">
          <ErrorMessage message={error} />
        </div>
      )}

      {/* Result */}
      {result && !isPending && (
        <div aria-live="polite">
          <ResultCard result={result} />
          {chartData.length > 1 && (
            <InflationChart
              data={chartData}
              originalAmount={result.originalAmount}
            />
          )}

          <button
            type="button"
            onClick={handleReset}
            className="w-full py-3 text-sm text-zinc-400 hover:text-zinc-700 transition-colors"
          >
            Yeni hesaplama yap
          </button>
        </div>
      )}
    </form>
  );
}