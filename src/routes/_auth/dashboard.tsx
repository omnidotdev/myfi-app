import { createFileRoute } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Mock data -- will be replaced with GraphQL queries
const summaryCards = [
  { label: "Total Assets", value: "$0.00", change: "+0%" },
  { label: "Total Liabilities", value: "$0.00", change: "0%" },
  { label: "Net Worth", value: "$0.00", change: "+0%" },
  { label: "Income (MTD)", value: "$0.00", change: "+0%" },
  { label: "Expenses (MTD)", value: "$0.00", change: "0%" },
];

const chartData = [
  { month: "Jan", income: 0, expenses: 0 },
  { month: "Feb", income: 0, expenses: 0 },
  { month: "Mar", income: 0, expenses: 0 },
  { month: "Apr", income: 0, expenses: 0 },
  { month: "May", income: 0, expenses: 0 },
  { month: "Jun", income: 0, expenses: 0 },
  { month: "Jul", income: 0, expenses: 0 },
  { month: "Aug", income: 0, expenses: 0 },
  { month: "Sep", income: 0, expenses: 0 },
  { month: "Oct", income: 0, expenses: 0 },
  { month: "Nov", income: 0, expenses: 0 },
  { month: "Dec", income: 0, expenses: 0 },
];

export const Route = createFileRoute("/_auth/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl">Dashboard</h1>
        {/* BookPicker will be wired up with real data */}
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {summaryCards.map((card) => (
          <div
            key={card.label}
            className="rounded-lg border border-border bg-card p-4"
          >
            <p className="text-muted-foreground text-sm">{card.label}</p>
            <p className="mt-1 font-semibold text-2xl">{card.value}</p>
            <p className="mt-1 text-muted-foreground text-xs">{card.change}</p>
          </div>
        ))}
      </div>

      {/* Income vs Expenses chart */}
      <div className="rounded-lg border border-border bg-card p-4">
        <h2 className="mb-4 font-semibold text-lg">Income vs Expenses</h2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="income"
              stackId="1"
              stroke="var(--color-primary-500)"
              fill="var(--color-primary-500)"
              fillOpacity={0.3}
            />
            <Area
              type="monotone"
              dataKey="expenses"
              stackId="2"
              stroke="var(--color-destructive)"
              fill="var(--color-destructive)"
              fillOpacity={0.3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Recent transactions */}
      <div className="rounded-lg border border-border bg-card p-4">
        <h2 className="mb-4 font-semibold text-lg">Recent Transactions</h2>
        <p className="text-muted-foreground text-sm">
          No journal entries yet. Create your first entry in the Ledger.
        </p>
      </div>
    </div>
  );
}
