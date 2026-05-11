/**
 * lib/formatters.ts
 *
 * Pure utility functions. No framework dependencies.
 * Keep these lean — they're called on every render.
 */

/**
 * Formats a number as Turkish Lira currency.
 * e.g. 8476.5 → "₺8.476,50"
 */
export function formatTRY(amount: number): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Formats a plain number with Turkish locale separators.
 * e.g. 8476 → "8.476"
 */
export function formatNumber(n: number): string {
  return new Intl.NumberFormat("tr-TR").format(Math.round(n));
}

/**
 * Converts a "YYYY-MM" string to a human-readable Turkish month+year.
 * e.g. "2010-03" → "Mart 2010"
 */
export function formatDateLabel(yyyyMm: string): string {
  const [year, month] = yyyyMm.split("-");
  const date = new Date(Number(year), Number(month) - 1, 1);
  return date.toLocaleDateString("tr-TR", { month: "long", year: "numeric" });
}

/**
 * Formats a multiplier for display.
 * e.g. 8.476 → "8,5x"
 */
export function formatMultiplier(multiplier: number): string {
  return `${multiplier.toFixed(1).replace(".", ",")}x`;
}

/**
 * Formats a percentage with Turkish locale.
 * e.g. 747.6 → "%748"
 */
export function formatPercent(pct: number): string {
  return `%${Math.round(pct).toLocaleString("tr-TR")}`;
}

/**
 * Pads a month number to two digits.
 * e.g. 3 → "03"
 */
export function padMonth(month: number): string {
  return String(month).padStart(2, "0");
}

/**
 * Returns an array of years available in the dataset.
 * Used to populate the year <select>.
 */
export function getYearRange(startYear: number, endYear: number): number[] {
  return Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);
}
