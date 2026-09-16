import { createFileRoute } from "@tanstack/react-router";
import { Loader2Icon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import BookPicker from "@/features/books/components/BookPicker";
import ReportExportActions from "@/features/reports/components/ReportExportActions";
import { API_URL } from "@/lib/config/env.config";
import formatCurrency from "@/lib/format/currency";
import useActiveBook from "@/lib/hooks/useActiveBook";

export const Route = createFileRoute(
  "/_app/@{$workspaceSlug}/~/reports/sales-by-state",
)({
  component: SalesByStateReportPage,
});

type StateRow = {
  state: string;
  salesTotal: string;
  transactionCount: number;
  exceedsThreshold: boolean;
};

type SalesByStateReport = {
  year: number;
  threshold: { amount: number; transactions: number };
  states: StateRow[];
  totalSales: string;
  totalTransactions: number;
};

function SalesByStateReportPage() {
  const {
    activeBookId,
    books,
    isLoading: booksLoading,
    setActiveBookId,
  } = useActiveBook();

  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const [thresholdAmount, setThresholdAmount] = useState(100000);
  const [thresholdTransactions, setThresholdTransactions] = useState(200);
  const [data, setData] = useState<SalesByStateReport | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReport = useCallback(async () => {
    if (!activeBookId) return;

    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        bookId: activeBookId,
        year: String(year),
        thresholdAmount: String(thresholdAmount),
        thresholdTransactions: String(thresholdTransactions),
      });

      const res = await fetch(
        `${API_URL}/api/reports/sales-by-state?${params.toString()}`,
      );
      if (!res.ok) throw new Error("Failed to load report");
      setData(await res.json());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load report");
    } finally {
      setIsLoading(false);
    }
  }, [activeBookId, year, thresholdAmount, thresholdTransactions]);

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  const loading = booksLoading || isLoading;
  const flaggedCount =
    data?.states.filter((s) => s.exceedsThreshold).length ?? 0;

  const inputClass =
    "w-28 rounded-md border border-border bg-card px-3 py-1.5 text-sm";

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">Sales by State</h1>
          <p className="text-muted-foreground text-sm">
            Invoiced sales grouped by customer state, flagged where you may
            cross an economic-nexus threshold
          </p>
        </div>
        <BookPicker
          books={books}
          selectedBookId={activeBookId}
          onSelect={setActiveBookId}
        />
      </div>

      <div className="flex flex-wrap items-end gap-4">
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-muted-foreground">Year</span>
          <input
            type="number"
            value={year}
            onChange={(e) =>
              setYear(Number.parseInt(e.target.value, 10) || currentYear)
            }
            className={inputClass}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-muted-foreground">Nexus threshold ($)</span>
          <input
            type="number"
            min="0"
            step="1000"
            value={thresholdAmount}
            onChange={(e) =>
              setThresholdAmount(Number.parseFloat(e.target.value) || 0)
            }
            className={inputClass}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-muted-foreground">or transactions</span>
          <input
            type="number"
            min="0"
            step="10"
            value={thresholdTransactions}
            onChange={(e) =>
              setThresholdTransactions(Number.parseInt(e.target.value, 10) || 0)
            }
            className={inputClass}
          />
        </label>
        {data && (
          <div className="ml-auto">
            <ReportExportActions
              reportType="sales-by-state"
              filename="sales-by-state"
              bookId={activeBookId}
              showPrint={false}
              query={{
                year: String(year),
                thresholdAmount: String(thresholdAmount),
                thresholdTransactions: String(thresholdTransactions),
              }}
            />
          </div>
        )}
      </div>

      {loading && (
        <div className="flex items-center justify-center rounded-lg border border-border bg-card p-8">
          <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive text-sm">
          {error}
        </div>
      )}

      {!loading && !error && data && data.states.length === 0 && (
        <div className="rounded-lg border border-border bg-card p-8 text-center text-muted-foreground text-sm">
          No invoiced sales for {year}.
        </div>
      )}

      {!loading && !error && data && data.states.length > 0 && (
        <>
          {flaggedCount > 0 && (
            <div className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-amber-800 text-sm dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200">
              {flaggedCount} state{flaggedCount === 1 ? "" : "s"} met the
              threshold. Review whether you need to register and collect sales
              tax there.
            </div>
          )}

          <div className="overflow-x-auto rounded-lg border border-border bg-card">
            <table className="w-full text-sm">
              <thead className="border-border border-b text-left text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">State</th>
                  <th className="px-4 py-3 text-right font-medium">Sales</th>
                  <th className="px-4 py-3 text-right font-medium">Invoices</th>
                  <th className="px-4 py-3 font-medium">Nexus</th>
                </tr>
              </thead>
              <tbody>
                {data.states.map((s) => (
                  <tr
                    key={s.state}
                    className={`border-border/50 border-b last:border-0 ${s.exceedsThreshold ? "bg-amber-50 dark:bg-amber-950/40" : ""}`}
                  >
                    <td className="px-4 py-3 font-medium">{s.state}</td>
                    <td className="px-4 py-3 text-right">
                      {formatCurrency(s.salesTotal)}
                    </td>
                    <td className="px-4 py-3 text-right text-muted-foreground">
                      {s.transactionCount.toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      {s.exceedsThreshold && (
                        <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-amber-600 text-xs dark:text-amber-400">
                          Review
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-border border-t-2 font-medium">
                  <td className="px-4 py-3">Total</td>
                  <td className="px-4 py-3 text-right">
                    {formatCurrency(data.totalSales)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {data.totalTransactions.toLocaleString()}
                  </td>
                  <td className="px-4 py-3" />
                </tr>
              </tfoot>
            </table>
          </div>

          <p className="text-muted-foreground text-xs">
            Thresholds are guidance for where to review sales-tax registration,
            not tax advice. Each state sets its own economic-nexus rules;
            confirm the current threshold for any flagged state.
          </p>
        </>
      )}
    </div>
  );
}
