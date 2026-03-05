import { createFileRoute, Link } from "@tanstack/react-router";
import {
  DollarSignIcon,
  Loader2Icon,
  TrendingDownIcon,
  TrendingUpIcon,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import BookPicker from "@/features/books/components/BookPicker";
import type { NetWorthSummary } from "@/features/savings/types/savingsGoal";
import { API_URL } from "@/lib/config/env.config";
import formatCurrency from "@/lib/format/currency";
import useActiveBook from "@/lib/hooks/useActiveBook";

export const Route = createFileRoute("/_app/dashboard")({
  component: DashboardPage,
});

type SpendingMonth = {
  month: string;
  total: string;
};

type RecentEntry = {
  rowId: string;
  date: string;
  memo: string | null;
  lines: { debit: string | null }[];
};

function DashboardPage() {
  const {
    activeBookId,
    books,
    isLoading: booksLoading,
    setActiveBookId,
  } = useActiveBook();

  const [netWorth, setNetWorth] = useState<NetWorthSummary | null>(null);
  const [spendingMonths, setSpendingMonths] = useState<SpendingMonth[]>([]);
  const [recentEntries, setRecentEntries] = useState<RecentEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchNetWorth = useCallback(async () => {
    if (!activeBookId) return;

    try {
      const res = await fetch(
        `${API_URL}/api/net-worth?bookId=${activeBookId}`,
      );
      const data = await res.json();

      setNetWorth(data);
    } catch {
      // Silently handle fetch errors
    }
  }, [activeBookId]);

  const fetchSpendingTrends = useCallback(async () => {
    if (!activeBookId) return;

    try {
      const res = await fetch(
        `${API_URL}/api/spending/trends?bookId=${activeBookId}&months=12`,
      );
      const data = await res.json();

      setSpendingMonths(data.months ?? []);
    } catch {
      // Silently handle fetch errors
    }
  }, [activeBookId]);

  const fetchRecentEntries = useCallback(async () => {
    if (!activeBookId) return;

    try {
      const res = await fetch(
        `${API_URL}/api/journal-entries?bookId=${activeBookId}&limit=5`,
      );
      const data = await res.json();
      const mapped = (data.entries ?? []).map((e: Record<string, unknown>) => ({
        ...e,
        rowId: e.id as string,
      }));

      setRecentEntries(mapped);
    } catch {
      // Silently handle fetch errors
    }
  }, [activeBookId]);

  useEffect(() => {
    if (!activeBookId) return;

    setIsLoading(true);

    Promise.all([fetchNetWorth(), fetchSpendingTrends(), fetchRecentEntries()])
      .catch(() => {
        // Silently handle fetch errors
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [activeBookId, fetchNetWorth, fetchSpendingTrends, fetchRecentEntries]);

  const chartData = useMemo(
    () =>
      spendingMonths.map((m) => ({
        month: m.month,
        spending: Number.parseFloat(m.total) || 0,
      })),
    [spendingMonths],
  );

  const loading = booksLoading || isLoading;

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl">Dashboard</h1>

        <BookPicker
          books={books}
          selectedBookId={activeBookId}
          onSelect={setActiveBookId}
        />
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center rounded-lg border border-border bg-card p-8">
          <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
        </div>
      )}

      {/* Summary cards */}
      {!loading && netWorth && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
            <div className="flex size-10 items-center justify-center rounded-full bg-green-100 text-green-600">
              <TrendingUpIcon className="size-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-muted-foreground text-xs">
                Total Assets
              </span>
              <span className="font-semibold text-lg">
                {formatCurrency(netWorth.totalAssets)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
            <div className="flex size-10 items-center justify-center rounded-full bg-red-100 text-red-600">
              <TrendingDownIcon className="size-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-muted-foreground text-xs">
                Total Liabilities
              </span>
              <span className="font-semibold text-lg">
                {formatCurrency(netWorth.totalLiabilities)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
            <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <DollarSignIcon className="size-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-muted-foreground text-xs">Net Worth</span>
              <span
                className={`font-semibold text-lg ${Number.parseFloat(netWorth.netWorth) >= 0 ? "text-green-600" : "text-red-500"}`}
              >
                {formatCurrency(netWorth.netWorth)}
              </span>
            </div>
          </div>
        </div>
      )}

      {!loading && !netWorth && (
        <div className="rounded-lg border border-border bg-card p-8 text-center">
          <p className="text-muted-foreground text-sm">
            No financial summary available yet
          </p>
        </div>
      )}

      {/* Spending trends chart */}
      {!loading && (
        <div className="rounded-lg border border-border bg-card p-4">
          <h2 className="mb-4 font-semibold text-lg">Spending Trends</h2>

          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
                <Area
                  type="monotone"
                  dataKey="spending"
                  stroke="var(--color-primary-500)"
                  fill="var(--color-primary-500)"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <p className="py-8 text-center text-muted-foreground text-sm">
              No spending data available yet
            </p>
          )}
        </div>
      )}

      {/* Recent entries */}
      {!loading && (
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-lg">Recent Entries</h2>
            <Link to="/ledger" className="text-primary text-sm hover:underline">
              View all
            </Link>
          </div>

          {recentEntries.length > 0 ? (
            <div className="flex flex-col divide-y divide-border">
              {recentEntries.map((entry) => {
                const totalDebit = (entry.lines ?? []).reduce(
                  (sum, line) =>
                    sum + (Number.parseFloat(line.debit ?? "0") || 0),
                  0,
                );

                return (
                  <div
                    key={entry.rowId}
                    className="flex items-center justify-between py-3"
                  >
                    <div className="flex flex-col">
                      <span className="text-sm">{entry.memo || "No memo"}</span>
                      <span className="text-muted-foreground text-xs">
                        {entry.date}
                      </span>
                    </div>
                    <span className="font-medium text-sm">
                      {formatCurrency(totalDebit)}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="py-8 text-center text-muted-foreground text-sm">
              No journal entries yet.{" "}
              <Link to="/ledger/new" className="text-primary hover:underline">
                Create your first entry
              </Link>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
