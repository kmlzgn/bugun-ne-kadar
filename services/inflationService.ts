import cpiDataset from "@/data/cpi-tr.json";
import type { CPIEntry, CalculationResult, InflationResult, ChartDataPoint } from "@/types";
import { getLatestDateKey } from "@/lib/date";

const { data: CPI_DATA } = cpiDataset;

export function getAvailableDates(): string[] {
  return CPI_DATA.map((entry) => entry.date);
}

export function getDatasetMeta() {
  return cpiDataset.metadata;
}

function findEntry(date: string): CPIEntry | undefined {
  return CPI_DATA.find((entry) => entry.date === date);
}

function parseAmount(value: string): number {
  const normalized = value.replace(/\./g, "").replace(",", ".");
  return parseFloat(normalized);
}

function isValidDateKey(dateKey: string): boolean {
  return /^\d{4}-(0[1-9]|1[0-2])$/.test(dateKey) && findEntry(dateKey) !== undefined;
}

function isFutureDate(dateKey: string): boolean {
  const latestDate = getLatestDateKey(getAvailableDates());
  return dateKey > latestDate;
}

function validateInput(amount: number, fromDate: string): string | null {
  if (!amount || isNaN(amount) || amount <= 0) {
    return "Lütfen geçerli bir tutar girin.";
  }
  if (!fromDate) {
    return "Lütfen ay ve yıl seçin.";
  }
  if (!isValidDateKey(fromDate)) {
    const meta = getDatasetMeta();
    return `Bu tarih için veri bulunamadı. Lütfen ${meta.baseYear}–${meta.updatedAt} arasında bir tarih seçin.`;
  }
  if (isFutureDate(fromDate)) {
    return "Gelecek tarihler için hesaplama yapılamaz.";
  }
  return null;
}

export function calculateInflation(
  amountStr: string,
  fromDate: string
): CalculationResult {
  const amount = parseAmount(amountStr);
  const error = validateInput(amount, fromDate);
  if (error) return { success: false, error };

  const oldEntry = findEntry(fromDate);
  if (!oldEntry || oldEntry.index === 0) {
    return { success: false, error: "Veri hatası: endeks değeri bulunamadı." };
  }

  const todayDate = getLatestDateKey(getAvailableDates());
  const todayEntry = findEntry(todayDate);
  if (!todayEntry || todayEntry.index === 0) {
    return { success: false, error: "Güncel veri bulunamadı." };
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

export function getChartData(amount: number, fromDate: string): ChartDataPoint[] {
  const startIndex = CPI_DATA.findIndex((entry) => entry.date === fromDate);
  if (startIndex === -1) return [];

  return CPI_DATA.slice(startIndex).map((entry) => ({
    date: entry.date,
    value: Math.round((amount * entry.index) / CPI_DATA[startIndex].index),
  }));
}