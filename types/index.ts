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
  originalDate: string;
  todayDate: string;
  percentageIncrease: number;
  multiplier: number;
}

export interface ChartDataPoint {
  date: string;
  value: number;
}

export interface CalculatorFormState {
  amount: string;
  year: string;
  month: string;
}

export type CalculationResult =
  | { success: true; data: InflationResult }
  | { success: false; error: string };
