import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type CategoryData = {
  accountId: string;
  accountName: string;
  accountCode: string | null;
  totalAmount: string;
  transactionCount: number;
  percentOfTotal: number;
};

type SpendingByCategoryProps = {
  categories: CategoryData[];
  total: string;
};

const COLORS = [
  "var(--color-primary-500)",
  "var(--color-primary-400)",
  "var(--color-primary-300)",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
  "#ec4899",
  "#f97316",
];

/** Format a numeric string as currency display */
function formatAmount(value: string | number): string {
  const num = typeof value === "string" ? Number.parseFloat(value) : value;
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/**
 * Spending breakdown by category with pie and bar charts
 */
function SpendingByCategory({ categories, total }: SpendingByCategoryProps) {
  const chartData = categories.map((cat, i) => ({
    name: cat.accountName,
    value: Number.parseFloat(cat.totalAmount),
    fill: COLORS[i % COLORS.length],
  }));

  if (categories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-border border-dashed py-16">
        <p className="text-muted-foreground text-sm">
          No expense data for this period
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Total spending card */}
      <div className="rounded-lg border border-border bg-card p-4">
        <p className="text-muted-foreground text-sm">Total Spending</p>
        <p className="mt-1 font-semibold text-2xl">${formatAmount(total)}</p>
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Pie chart */}
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="mb-4 font-semibold text-base">Category Breakdown</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {chartData.map((entry) => (
                  <Cell key={entry.name} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [`$${formatAmount(value)}`, ""]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar chart */}
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="mb-4 font-semibold text-base">By Amount</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chartData} layout="vertical">
              <XAxis type="number" />
              <YAxis
                type="category"
                dataKey="name"
                width={120}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                formatter={(value: number) => [`$${formatAmount(value)}`, ""]}
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {chartData.map((entry) => (
                  <Cell key={entry.name} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category list */}
      <div className="rounded-lg border border-border bg-card">
        <div className="border-border border-b px-4 py-3">
          <h3 className="font-semibold text-base">All Categories</h3>
        </div>
        <div className="divide-y divide-border">
          {categories.map((cat, i) => (
            <div
              key={cat.accountId}
              className="flex items-center justify-between px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <div
                  className="size-3 rounded-full"
                  style={{ backgroundColor: COLORS[i % COLORS.length] }}
                />
                <div className="flex flex-col">
                  <span className="font-medium text-sm">{cat.accountName}</span>
                  {cat.accountCode && (
                    <span className="font-mono text-muted-foreground text-xs">
                      {cat.accountCode}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-6 text-sm">
                <span className="text-muted-foreground">
                  {cat.transactionCount} txns
                </span>
                <span className="text-muted-foreground">
                  {cat.percentOfTotal.toFixed(1)}%
                </span>
                <span className="font-medium">
                  ${formatAmount(cat.totalAmount)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SpendingByCategory;
