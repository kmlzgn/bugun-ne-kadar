export type YYYYMM = string; // canonical date format: "2025-06"

/** Turkish month names for label formatting */
const MONTH_NAMES = [
  "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
  "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık",
];

/**
 * Converts any date input to YYYY-MM format.
 * Handles: YYYY-MM, YYYY-MM-DD, Date objects, YYYY/MM/DD strings.
 * Returns null for invalid/unparseable input.
 */
export function normalizeToMonth(input: string | Date): YYYYMM | null {
  if (!input) return null;

  // Already YYYY-MM format
  if (typeof input === "string" && /^\d{4}-(0[1-9]|1[0-2])$/.test(input)) {
    return input;
  }

  let date: Date | null = null;

  // Try parsing as Date object
  if (input instanceof Date) {
    date = input;
  }

  // Try parsing YYYY-MM-DD or YYYY/MM/DD
  if (!date && typeof input === "string") {
    // Strip trailing time portion if present
    const stripped = input.split("T")[0];
    const parsed = new Date(stripped);
    if (!isNaN(parsed.getTime())) {
      date = parsed;
    }
  }

  if (!date) return null;

  // Validate year range (2000–2100 guard against garbage)
  const year = date.getFullYear();
  if (year < 2000 || year > 2100) return null;

  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

export function getTodayIST(): Date {
  const now = new Date();
  // Istanbul is UTC+3
  const istOffset = 3 * 60;
  const localOffset = now.getTimezoneOffset();
  return new Date(now.getTime() + (localOffset + istOffset) * 60 * 1000);
}

export function formatTodayLabel(date: Date = getTodayIST()): string {
  const day = date.getDate();
  const month = MONTH_NAMES[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

export function getTodayDateKey(): YYYYMM {
  const today = getTodayIST();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

export function getLatestDateKey(dates: YYYYMM[]): YYYYMM {
  if (!dates.length) return getTodayDateKey();
  return dates[dates.length - 1];
}

/** Format YYYY-MM as Turkish month+year label (e.g. "Mart 2025") */
export function formatMonthLabel(yyyymm: YYYYMM): string {
  const [year, month] = yyyymm.split("-");
  const monthIdx = parseInt(month, 10) - 1;
  if (monthIdx < 0 || monthIdx > 11) return yyyymm;
  return `${MONTH_NAMES[monthIdx]} ${year}`;
}