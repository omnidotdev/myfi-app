import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertCircleIcon,
  BookOpenIcon,
  CheckCircle2Icon,
  ClockIcon,
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

type BookSummary = {
  id: string;
  name: string;
  type: string;
  totalAssets: string;
  totalLiabilities: string;
  netWorth: string;
};

type DashboardSummary = {
  books: BookSummary[];
  pendingReviewCount: number;
  totalNetWorth: string;
};

type CloseStatus = {
  bookId: string;
  bookName: string;
  year: number;
  month: number;
  periodStatus: "open" | "closed";
  closedAt: string | null;
  pendingReviewCount: number;
  blockers: string[];
};

type CloseStatusResponse = {
  statuses: CloseStatus[];
  year: number;
  month: number;
};

/** Format a numeric month (1-12) and year as a human-readable label */
function formatPeriodLabel(year: number, month: number) {
  return new Date(year, month - 1).toLocaleString("default", {
    month: "long",
    year: "numeric",
  });
}

function DashboardPage() {
  const {
    activeBookId,
    books,
    isLoading: booksLoading,
    organizationId,
    setActiveBookId,
  } = useActiveBook();

  const [netWorth, setNetWorth] = useState<NetWorthSummary | null>(null);
  const [spendingMonths, setSpendingMonths] = useState<SpendingMonth[]>([]);
  const [recentEntries, setRecentEntries] = useState<RecentEntry[]>([]);
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [closeStatus, setCloseStatus] = useState<CloseStatusResponse | null>(
    null,
  );
  const [closingBookId, setClosingBookId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch multi-book summary when no book is selected
  const fetchSummary = useCallback(async () => {
    if (!organizationId) return;

    try {
      const res = await fetch(
        `${API_URL}/api/dashboard/summary?organizationId=${organizationId}`,
      );
      const data = await res.json();

      setSummary(data);
    } catch {
      // Silently handle fetch errors
    }
  }, [organizationId]);

  const fetchCloseStatus = useCallback(async () => {
    if (!organizationId) return;

    try {
      const res = await fetch(
        `${API_URL}/api/dashboard/close-status?organizationId=${organizationId}`,
      );
      const data = await res.json();

      setCloseStatus(data);
    } catch {
      // Silently handle fetch errors
    }
  }, [organizationId]);

  const handleClosePeriod = useCallback(
    async (bookId: string, year: number, month: number) => {
      setClosingBookId(bookId);

      try {
        const res = await fetch(`${API_URL}/api/periods/close`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bookId, year, month }),
        });

        if (res.ok) {
          // Refresh close status after successful close
          await fetchCloseStatus();
        }
      } catch {
        // Silently handle fetch errors
      } finally {
        setClosingBookId(null);
      }
    },
    [fetchCloseStatus],
  );

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

  // Single-book data fetch
  useEffect(() => {
    if (!activeBookId) return;

    setIsLoading(true);

    Promise.all([
      fetchNetWorth(),
      fetchSpendingTrends(),
      fetchRecentEntries(),
      fetchCloseStatus(),
    ])
      .catch(() => {
        // Silently handle fetch errors
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [
    activeBookId,
    fetchNetWorth,
    fetchSpendingTrends,
    fetchRecentEntries,
    fetchCloseStatus,
  ]);

  // Multi-book summary fetch
  useEffect(() => {
    if (activeBookId || booksLoading) return;

    setIsLoading(true);

    Promise.all([fetchSummary(), fetchCloseStatus()])
      .catch(() => {
        // Silently handle fetch errors
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [activeBookId, booksLoading, fetchSummary, fetchCloseStatus]);

  const chartData = useMemo(
    () =>
      spendingMonths.map((m) => ({
        month: m.month,
        spending: Number.parseFloat(m.total) || 0,
      })),
    [spendingMonths],
  );

  const loading = booksLoading || isLoading;
  const showAllBooks = !activeBookId && !booksLoading;

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

      {/* Monthly Close status */}
      {!loading && closeStatus && closeStatus.statuses.length > 0 && (
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-lg">Monthly Close</h2>
            <span className="text-muted-foreground text-sm">
              {formatPeriodLabel(closeStatus.year, closeStatus.month)}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {closeStatus.statuses.map((status) => {
              const isClosed = status.periodStatus === "closed";
              const hasPending = !isClosed && status.pendingReviewCount > 0;

              return (
                <div
                  key={status.bookId}
                  className="flex flex-col gap-2 rounded-md border border-border p-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">
                      {status.bookName}
                    </span>

                    {isClosed && (
                      <span className="flex items-center gap-1 text-green-600 text-xs">
                        <CheckCircle2Icon className="size-4" />
                        Closed
                      </span>
                    )}

                    {!isClosed && !hasPending && (
                      <span className="flex items-center gap-1 text-xs text-yellow-600">
                        <ClockIcon className="size-4" />
                        Open
                      </span>
                    )}

                    {hasPending && (
                      <span className="flex items-center gap-1 text-red-500 text-xs">
                        <AlertCircleIcon className="size-4" />
                        Open
                      </span>
                    )}
                  </div>

                  <span className="text-muted-foreground text-xs">
                    {formatPeriodLabel(status.year, status.month)}
                  </span>

                  {status.pendingReviewCount > 0 && (
                    <span className="text-muted-foreground text-xs">
                      {status.pendingReviewCount} item
                      {status.pendingReviewCount === 1 ? "" : "s"} pending
                      review
                    </span>
                  )}

                  <div className="flex items-center gap-2 pt-1">
                    {status.pendingReviewCount > 0 && (
                      <Link
                        to="/reconciliation"
                        className="text-primary text-xs hover:underline"
                      >
                        Review Items
                      </Link>
                    )}

                    {!isClosed && status.pendingReviewCount === 0 && (
                      <button
                        type="button"
                        disabled={closingBookId === status.bookId}
                        onClick={() =>
                          handleClosePeriod(
                            status.bookId,
                            status.year,
                            status.month,
                          )
                        }
                        className="rounded bg-primary px-3 py-1 font-medium text-primary-foreground text-xs transition-colors hover:bg-primary/90 disabled:opacity-50"
                      >
                        {closingBookId === status.bookId
                          ? "Closing..."
                          : "Close Now"}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Multi-book summary view */}
      {!loading && showAllBooks && summary && (
        <>
          {/* Total net worth across all books */}
          <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-5">
            <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <DollarSignIcon className="size-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-muted-foreground text-xs">
                Combined Net Worth
              </span>
              <span
                className={`font-semibold text-xl ${Number.parseFloat(summary.totalNetWorth) >= 0 ? "text-green-600" : "text-red-500"}`}
              >
                {formatCurrency(summary.totalNetWorth)}
              </span>
            </div>
          </div>

          {/* Pending reconciliation */}
          {summary.pendingReviewCount > 0 && (
            <Link
              to="/reconciliation"
              className="flex items-center gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 transition-colors hover:bg-amber-100 dark:border-amber-900 dark:bg-amber-950 dark:hover:bg-amber-900"
            >
              <AlertCircleIcon className="size-5 text-amber-600 dark:text-amber-400" />
              <span className="text-sm">
                <span className="font-semibold">
                  {summary.pendingReviewCount}
                </span>{" "}
                {summary.pendingReviewCount === 1
                  ? "transaction"
                  : "transactions"}{" "}
                pending review
              </span>
            </Link>
          )}

          {/* Per-book cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {summary.books.map((book) => (
              <button
                key={book.id}
                type="button"
                onClick={() => setActiveBookId(book.id)}
                className="flex flex-col gap-3 rounded-lg border border-border bg-card p-4 text-left transition-colors hover:border-primary/50 hover:bg-accent"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpenIcon className="size-4 text-muted-foreground" />
                    <span className="font-semibold text-sm">{book.name}</span>
                  </div>
                  <span className="rounded-full bg-muted px-2 py-0.5 text-muted-foreground text-xs capitalize">
                    {book.type}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-xs">
                      Assets
                    </span>
                    <span className="font-medium text-green-600 text-sm">
                      {formatCurrency(book.totalAssets)}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-xs">
                      Liabilities
                    </span>
                    <span className="font-medium text-red-500 text-sm">
                      {formatCurrency(book.totalLiabilities)}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-xs">
                      Net Worth
                    </span>
                    <span
                      className={`font-medium text-sm ${Number.parseFloat(book.netWorth) >= 0 ? "text-green-600" : "text-red-500"}`}
                    >
                      {formatCurrency(book.netWorth)}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </>
      )}

      {!loading && showAllBooks && !summary && (
        <div className="rounded-lg border border-border bg-card p-8 text-center">
          <p className="text-muted-foreground text-sm">
            No books available yet
          </p>
        </div>
      )}

      {/* Single-book: Summary cards */}
      {!loading && !showAllBooks && netWorth && (
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

      {!loading && !showAllBooks && !netWorth && (
        <div className="rounded-lg border border-border bg-card p-8 text-center">
          <p className="text-muted-foreground text-sm">
            No financial summary available yet
          </p>
        </div>
      )}

      {/* Single-book: Spending trends chart */}
      {!loading && !showAllBooks && (
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

      {/* Single-book: Recent entries */}
      {!loading && !showAllBooks && (
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
