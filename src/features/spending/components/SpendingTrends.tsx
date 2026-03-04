import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type MonthlyData = {
  month: string;
  total: string;
};

type SpendingTrendsProps = {
  months: MonthlyData[];
  selectedRange: number;
  onRangeChange: (months: number) => void;
};

const RANGE_OPTIONS = [3, 6, 12] as const;

/** Format month key (YYYY-MM) to short display */
function formatMonth(month: string): string {
  const [year, m] = month.split("-");
  const date = new Date(Number(year), Number(m) - 1);
  return date.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
}

/** Format a number as currency display */
function formatAmount(value: number): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/**
 * Monthly spending trend line chart with selectable time range
 */
function SpendingTrends({
  months,
  selectedRange,
  onRangeChange,
}: SpendingTrendsProps) {
  const chartData = months.map((m) => ({
    month: formatMonth(m.month),
    total: Number.parseFloat(m.total),
  }));

  // Compute average and max for summary
  const totals = chartData.map((d) => d.total);
  const avgSpending =
    totals.length > 0
      ? totals.reduce((sum, v) => sum + v, 0) / totals.length
      : 0;
  const maxSpending = totals.length > 0 ? Math.max(...totals) : 0;

  if (months.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-border border-dashed py-16">
        <p className="text-muted-foreground text-sm">
          No spending data available
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Range selector and summary */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {RANGE_OPTIONS.map((range) => (
            <button
              key={range}
              type="button"
              onClick={() => onRangeChange(range)}
              className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                selectedRange === range
                  ? "bg-primary font-medium text-primary-foreground"
                  : "border border-border bg-card hover:bg-accent"
              }`}
            >
              {range}M
            </button>
          ))}
        </div>

        <div className="flex items-center gap-6 text-sm">
          <div className="flex flex-col">
            <span className="text-muted-foreground text-xs">Avg / Month</span>
            <span className="font-medium">${formatAmount(avgSpending)}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground text-xs">Peak Month</span>
            <span className="font-medium">${formatAmount(maxSpending)}</span>
          </div>
        </div>
      </div>

      {/* Line chart */}
      <div className="rounded-lg border border-border bg-card p-4">
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              formatter={(value: number) => [
                `$${formatAmount(value)}`,
                "Spending",
              ]}
            />
            <Line
              type="monotone"
              dataKey="total"
              stroke="var(--color-primary-500)"
              strokeWidth={2}
              dot={{ fill: "var(--color-primary-500)", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default SpendingTrends;
