import { createFileRoute } from "@tanstack/react-router";
import { Loader2Icon, RepeatIcon } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import BookPicker from "@/features/books/components/BookPicker";
import { API_URL } from "@/lib/config/env.config";
import formatCurrency from "@/lib/format/currency";
import useActiveBook from "@/lib/hooks/useActiveBook";

export const Route = createFileRoute("/_app/spending/recurring")({
  component: RecurringTransactionsPage,
});

type RecurringTransaction = {
  memo: string;
  frequency: string;
  averageAmount: string;
  lastDate: string;
  estimatedAnnualCost: string;
  occurrences: number;
};

/** Format a frequency enum value for display */
function formatFrequency(frequency: string): string {
  const labels: Record<string, string> = {
    weekly: "Weekly",
    biweekly: "Biweekly",
    monthly: "Monthly",
    quarterly: "Quarterly",
    yearly: "Yearly",
  };

  return labels[frequency] ?? frequency;
}

/** Format ISO date to short display */
function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/** Get a color class for the frequency badge */
function getFrequencyColor(frequency: string): string {
  switch (frequency) {
    case "weekly":
      return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
    case "biweekly":
      return "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400";
    case "monthly":
      return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
    case "quarterly":
      return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
    case "yearly":
      return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400";
    default:
      return "bg-muted text-muted-foreground";
  }
}

function RecurringTransactionsPage() {
  const {
    activeBookId,
    books,
    isLoading: booksLoading,
    setActiveBookId,
  } = useActiveBook();

  const [transactions, setTransactions] = useState<RecurringTransaction[]>([]);
  const [totalAnnualCost, setTotalAnnualCost] = useState("0");
  const [isLoading, setIsLoading] = useState(true);

  const fetchRecurring = useCallback(async () => {
    if (!activeBookId) return;

    try {
      const res = await fetch(
        `${API_URL}/api/spending/recurring?bookId=${activeBookId}`,
      );
      const data = await res.json();

      setTransactions(data.subscriptions ?? []);
      setTotalAnnualCost(data.totalAnnualCost ?? "0");
    } catch {
      // Silently handle fetch errors
    }
  }, [activeBookId]);

  useEffect(() => {
    if (!activeBookId) return;

    setIsLoading(true);

    fetchRecurring()
      .catch(() => {
        // Silently handle fetch errors
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [activeBookId, fetchRecurring]);

  const sorted = useMemo(
    () =>
      [...transactions].sort(
        (a, b) =>
          Number.parseFloat(b.estimatedAnnualCost) -
          Number.parseFloat(a.estimatedAnnualCost),
      ),
    [transactions],
  );

  const loading = booksLoading || isLoading;

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">Recurring Transactions</h1>
          <p className="text-muted-foreground text-sm">
            Automatically detected recurring charges and subscriptions
          </p>
        </div>

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
      {!loading && sorted.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
            <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <RepeatIcon className="size-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-muted-foreground text-sm">
                Recurring Transactions
              </span>
              <span className="font-semibold text-2xl">{sorted.length}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
            <div className="flex size-10 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
              <RepeatIcon className="size-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-muted-foreground text-sm">
                Estimated Annual Cost
              </span>
              <span className="font-semibold text-2xl">
                {formatCurrency(totalAnnualCost)}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      {!loading && sorted.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-border bg-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-border border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Name
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Frequency
                </th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                  Amount
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Last Seen
                </th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                  Annual Cost
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {sorted.map((tx) => (
                <tr
                  key={tx.memo}
                  className="transition-colors hover:bg-muted/30"
                >
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="font-medium">{tx.memo}</span>
                      <span className="text-muted-foreground text-xs">
                        {tx.occurrences} occurrence
                        {tx.occurrences === 1 ? "" : "s"}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 font-medium text-xs ${getFrequencyColor(tx.frequency)}`}
                    >
                      {formatFrequency(tx.frequency)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-medium">
                    {formatCurrency(tx.averageAmount)}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {formatDate(tx.lastDate)}
                  </td>
                  <td className="px-4 py-3 text-right font-semibold">
                    {formatCurrency(tx.estimatedAnnualCost)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-border border-t bg-muted/50">
                <td
                  colSpan={4}
                  className="px-4 py-3 text-right font-semibold text-sm"
                >
                  Total Annual Cost
                </td>
                <td className="px-4 py-3 text-right font-bold text-base">
                  {formatCurrency(totalAnnualCost)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}

      {/* Empty state */}
      {!loading && sorted.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-border border-dashed py-16">
          <RepeatIcon className="size-8 text-muted-foreground" />
          <p className="text-muted-foreground text-sm">
            No recurring charges detected
          </p>
          <p className="max-w-sm text-center text-muted-foreground text-xs">
            Recurring transactions are automatically detected from imported
            transactions. Connect a bank account and import transactions to see
            them here
          </p>
        </div>
      )}
    </div>
  );
}
