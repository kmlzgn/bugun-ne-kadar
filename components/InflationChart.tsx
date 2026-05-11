"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import type { ChartDataPoint } from "@/types";
import { formatTRY } from "@/lib/formatters";

interface InflationChartProps {
  data: ChartDataPoint[];
  originalAmount: number;
}

const CHART_HEIGHT = 200;

function formatXTick(date: string): string {
  const [year, month] = date.split("-");
  const monthNames = [
    "Oca", "Şub", "Mar", "Nis", "May", "Haz",
    "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara",
  ];
  return `${monthNames[parseInt(month, 10) - 1]} ${year.slice(2)}`;
}

function formatLabel(date: string): string {
  const [year, month] = date.split("-");
  const monthNames = [
    "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
    "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık",
  ];
  return `${monthNames[parseInt(month, 10) - 1]} ${year}`;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; payload: ChartDataPoint }>;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  const { value, date } = payload[0].payload;

  return (
    <div className="bg-zinc-900 text-white rounded-xl px-3 py-2 text-sm shadow-lg">
      <p className="text-zinc-400 text-xs mb-1">{formatLabel(date)}</p>
      <p className="font-semibold">{formatTRY(value)}</p>
    </div>
  );
}

export function InflationChart({ data, originalAmount }: InflationChartProps) {
  if (data.length < 2) return null;

  const tickInterval = Math.max(1, Math.floor(data.length / 6));

  return (
    <div className="rounded-3xl bg-white border border-zinc-100 shadow-sm p-6 space-y-4">
      <div>
        <p className="text-zinc-400 text-xs font-medium uppercase tracking-wide">
          Değer Grafiği
        </p>
        <p className="text-zinc-700 text-sm mt-1">
          {formatTRY(originalAmount)}&apos;nın yıllar içindeki alım gücü
        </p>
      </div>

      <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
        <AreaChart data={data} margin={{ top: 8, right: 4, left: 4, bottom: 0 }}>
          <defs>
            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#18181b" stopOpacity={0.12} />
              <stop offset="100%" stopColor="#18181b" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            tickFormatter={formatXTick}
            interval={tickInterval - 1}
            tick={{ fontSize: 11, fill: "#a1a1aa" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis hide domain={["auto", "auto"]} />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#18181b"
            strokeWidth={2.5}
            fill="url(#chartGrad)"
            dot={false}
            activeDot={{ r: 4, fill: "#18181b", strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
