import cpiDataset from "@/data/cpi-tr.json";
import type {
  CPIEntry,
  CalculationResult,
  InflationResult,
  ChartDataPoint,
  YYYYMM,
} from "@/types";
import { getLatestDateKey } from "@/lib/date";

const { data: CPI_DATA } = cpiDataset;

export function getAvailableDates(): YYYYMM[] {
  return CPI_DATA.map((entry) => entry.date as YYYYMM);
}

export function getDatasetMeta() {
  return cpiDataset.metadata;
}

function findEntry(date: YYYYMM): CPIEntry | undefined {
  return CPI_DATA.find((entry) => entry.date === date);
}

function parseAmount(value: string): number {
  const normalized = value.replace(/\./g, "").replace(",", ".");
  return parseFloat(normalized);
}

function isValidDateKey(dateKey: string): boolean {
  return /^\d{4}-(0[1-9]|1[0-2])$/.test(dateKey);
}

function getValidRange(): { min: YYYYMM; max: YYYYMM } {
  const dates = getAvailableDates();
  return {
    min: dates[0] as YYYYMM,
    max: dates[dates.length - 1] as YYYYMM,
  };
}

function isFutureDate(dateKey: YYYYMM): boolean {
  const latestDate = getLatestDateKey(getAvailableDates());
  return dateKey > latestDate;
}

/**
 * Builds a user-friendly error message with the valid date range.
 */
function buildDateError(dateKey: string): CalculationResult {
  const { min, max } = getValidRange();
  const [minYear] = min.split("-");
  const [maxYear, maxMonth] = max.split("-");

  return {
    success: false,
    error: `Seçtiğiniz ay için veri bulunamadı. Lütfen ${minYear}–${maxYear} aralığında bir ay seçin.`,
    validRange: { min, max },
  };
}

export function calculateInflation(
  amountStr: string,
  fromDate: YYYYMM
): CalculationResult {
  // Guard: amount
  const amount = parseAmount(amountStr);
  if (!amountStr || isNaN(amount) || amount <= 0) {
    return { success: false, error: "Lütfen geçerli bir tutar girin." };
  }

  // Guard: date format
  if (!fromDate || !isValidDateKey(fromDate)) {
    return { success: false, error: "Lütfen ay ve yıl seçin." };
  }

  // Guard: date exists in dataset
  if (!findEntry(fromDate)) {
    return buildDateError(fromDate);
  }

  // Guard: future date
  if (isFutureDate(fromDate)) {
    return { success: false, error: "Gelecek tarihler için hesaplama yapılamaz." };
  }

  // Guard: CPI entry index
  const oldEntry = findEntry(fromDate)!;
  if (!oldEntry || oldEntry.index === 0) {
    return { success: false, error: "Veri hatası: endeks değeri bulunamadı." };
  }

  // Guard: today entry
  const todayDate = getLatestDateKey(getAvailableDates());
  const todayEntry = findEntry(todayDate);
  if (!todayEntry || todayEntry.index === 0) {
    return { success: false, error: "Güncel veri bulunamadı." };
  }

  // Divide-by-zero guard
  if (oldEntry.index === 0) {
    return { success: false, error: "Veri hatası: bölme işlemi yapılamıyor." };
  }

  const multiplier = todayEntry.index / oldEntry.index;
  const todayAmount = Math.round(amount * multiplier * 100) / 100;
  const percentageIncrease = (multiplier - 1) * 100;

  return {
    success: true,
    data: {
      originalAmount: amount,
      todayAmount,
      originalDate: fromDate,
      todayDate,
      percentageIncrease,
      multiplier: Math.round(multiplier * 100) / 100,
    },
  };
}

export function getChartData(
  amount: number,
  fromDate: YYYYMM
): ChartDataPoint[] {
  const startIndex = CPI_DATA.findIndex((entry) => entry.date === fromDate);
  if (startIndex === -1) return [];

  const baseIndex = CPI_DATA[startIndex].index;
  if (baseIndex === 0) return [];

  return CPI_DATA.slice(startIndex).map((entry) => ({
    date: entry.date as YYYYMM,
    value: Math.round((amount * entry.index) / baseIndex),
  }));
}

/** Returns available months for each year in the dataset, keyed by year string. */
export function getAvailableMonthsPerYear(): Record<string, string[]> {
  const result: Record<string, string[]> = {};
  for (const entry of CPI_DATA) {
    const [year, month] = entry.date.split("-");
    if (!result[year]) result[year] = [];
    if (!result[year].includes(month)) result[year].push(month);
  }
  return result;
}