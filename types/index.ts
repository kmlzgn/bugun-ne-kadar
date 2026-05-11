export type YYYYMM = string; // "2025-06" format only

export interface CPIEntry {
  date: string;
  index: number;
}

export interface CPIMetadata {
  source: string;
  updatedAt: string;
  baseYear: number;
  description: string;
}

export interface CPIDataset {
  metadata: CPIMetadata;
  data: CPIEntry[];
}

export interface InflationResult {
  originalAmount: number;
  todayAmount: number;
  originalDate: YYYYMM;
  todayDate: YYYYMM;
  percentageIncrease: number;
  multiplier: number;
}

export interface ChartDataPoint {
  date: YYYYMM;
  value: number;
}

export interface CalculatorFormState {
  amount: string;
  year: string;
  month: string;
}

export type CalculationResult =
  | { success: true; data: InflationResult }
  | { success: false; error: string; validRange?: { min: YYYYMM; max: YYYYMM } };

export type NormalizedDate = YYYYMM;
