const IST_LOCALE = "tr-TR";

const MONTH_NAMES = [
  "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
  "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık",
];

export function getTodayIST(): Date {
  const now = new Date();
  // Istanbul is typically UTC+3
  const istOffset = 3 * 60;
  const localOffset = now.getTimezoneOffset();
  const istTime = new Date(now.getTime() + (localOffset + istOffset) * 60 * 1000);
  return istTime;
}

export function formatTodayLabel(date: Date = getTodayIST()): string {
  const day = date.getDate();
  const month = MONTH_NAMES[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

export function getTodayDateKey(): string {
  const today = getTodayIST();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

export function getLatestDateKey(dates: string[]): string {
  if (!dates.length) return getTodayDateKey();
  return dates[dates.length - 1];
}
