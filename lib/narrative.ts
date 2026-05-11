import type { InflationResult } from "@/types";
import { formatTRY, formatDateLabel } from "./formatters";

export function generateNarrative(result: InflationResult): string {
  const year = result.originalDate.split("-")[0];
  const formattedAmount = formatTRY(result.originalAmount).replace("TL", "").trim();
  const formattedToday = formatTRY(result.todayAmount);

  return `${year}'teki ${formattedAmount} TL bugün yaklaşık ${formattedToday} TL alım gücüne denk geliyor.`;
}