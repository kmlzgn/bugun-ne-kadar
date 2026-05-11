"use client";

import React from "react";

interface DateSelectorProps {
  year: string;
  month: string;
  onYearChange: (year: string) => void;
  onMonthChange: (month: string) => void;
  disabled?: boolean;
}

const MONTHS = [
  { value: "01", label: "Ocak" },
  { value: "02", label: "Şubat" },
  { value: "03", label: "Mart" },
  { value: "04", label: "Nisan" },
  { value: "05", label: "Mayıs" },
  { value: "06", label: "Haziran" },
  { value: "07", label: "Temmuz" },
  { value: "08", label: "Ağustos" },
  { value: "09", label: "Eylül" },
  { value: "10", label: "Ekim" },
  { value: "11", label: "Kasım" },
  { value: "12", label: "Aralık" },
];

const selectClass = `
  w-full px-4 py-4
  bg-white border border-zinc-200
  rounded-2xl text-lg font-medium text-zinc-900
  appearance-none cursor-pointer
  focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent
  disabled:opacity-50 disabled:cursor-not-allowed
  transition-shadow duration-150
  shadow-sm hover:shadow-md
`;

export function DateSelector({
  year,
  month,
  onYearChange,
  onMonthChange,
  disabled,
}: DateSelectorProps) {
  const monthId = React.useId();
  const yearId = React.useId();

  // Last complete year in dataset (2025)
  const years = Array.from({ length: 2025 - 2003 + 1 }, (_, i) => 2025 - i);

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="relative">
        <label htmlFor={monthId} className="sr-only">
          Ay
        </label>
        <select
          id={monthId}
          value={month}
          onChange={(e) => onMonthChange(e.target.value)}
          disabled={disabled}
          aria-label="Ay seçin"
          className={selectClass}
        >
          <option value="" disabled>
            Ay
          </option>
          {MONTHS.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>
        <ChevronIcon />
      </div>

      <div className="relative">
        <label htmlFor={yearId} className="sr-only">
          Yıl
        </label>
        <select
          id={yearId}
          value={year}
          onChange={(e) => onYearChange(e.target.value)}
          disabled={disabled}
          aria-label="Yıl seçin"
          className={selectClass}
        >
          <option value="" disabled>
            Yıl
          </option>
          {years.map((y) => (
            <option key={y} value={String(y)}>
              {y}
            </option>
          ))}
        </select>
        <ChevronIcon />
      </div>
    </div>
  );
}

function ChevronIcon() {
  return (
    <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d="M4 6l4 4 4-4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
