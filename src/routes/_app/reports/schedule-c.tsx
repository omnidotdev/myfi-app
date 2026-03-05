import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { API_URL } from "@/lib/config/env.config";
import { formatCurrency, formatSignedCurrency } from "@/lib/format/currency";

type ScheduleCCategory = {
  category: string;
  label: string;
  lineNumber: number;
  amount: string;
};

type ScheduleCData = {
  year: number;
  grossIncome: string;
  categories: ScheduleCCategory[];
  totalExpenses: string;
  netProfitOrLoss: string;
};

export const Route = createFileRoute("/_app/reports/schedule-c")({
  component: ScheduleCPage,
});

function ScheduleCPage() {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const [data, setData] = useState<ScheduleCData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const searchParams = new URLSearchParams({ year: String(year) });
      const res = await fetch(
        `${API_URL}/api/tax/schedule-c?${searchParams.toString()}`,
      );

      if (!res.ok) {
        throw new Error(`Failed to fetch report: ${res.statusText}`);
      }

      const json = await res.json();
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="font-bold text-2xl">Schedule C</h1>
        <p className="text-muted-foreground text-sm">
          Self-employment income and expenses by IRS category
        </p>
      </div>

      {/* Year selector */}
      <form
        onSubmit={handleGenerate}
        className="flex flex-wrap items-end gap-4 rounded-lg border border-border bg-card p-4"
      >
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="schedule-c-year"
            className="text-muted-foreground text-xs"
          >
            Tax Year
          </label>
          <select
            id="schedule-c-year"
            value={year}
            onChange={(e) => setYear(Number.parseInt(e.target.value, 10))}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            {Array.from({ length: 5 }, (_, i) => currentYear - i).map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90"
        >
          Generate
        </button>
      </form>

      {loading && (
        <div className="rounded-lg border border-border bg-card p-8 text-center">
          <p className="text-muted-foreground">Generating report...</p>
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive text-sm">
          {error}
        </div>
      )}

      {!loading && !error && data && (
        <>
          {/* Gross income */}
          <div className="overflow-x-auto rounded-lg border border-border bg-card">
            <div className="border-border border-b bg-muted/50 px-4 py-3">
              <h2 className="font-semibold text-sm">
                Part I - Income (Line 7)
              </h2>
            </div>

            <div className="flex items-center justify-between px-4 py-3">
              <span>Gross income</span>
              <span className="font-mono font-semibold">
                {formatCurrency(data.grossIncome)}
              </span>
            </div>
          </div>

          {/* Expense categories */}
          <div className="overflow-x-auto rounded-lg border border-border bg-card">
            <div className="border-border border-b bg-muted/50 px-4 py-3">
              <h2 className="font-semibold text-sm">Part II - Expenses</h2>
            </div>

            {data.categories.length === 0 ? (
              <div className="px-4 py-6 text-center text-muted-foreground text-sm">
                No expenses recorded for this year
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-border border-b text-left text-muted-foreground">
                    <th className="px-4 py-2 font-medium">Line</th>
                    <th className="px-4 py-2 font-medium">Category</th>
                    <th className="px-4 py-2 text-right font-medium">Amount</th>
                  </tr>
                </thead>

                <tbody>
                  {data.categories.map((cat) => (
                    <tr
                      key={cat.category}
                      className="border-border border-b transition-colors hover:bg-accent/30"
                    >
                      <td className="whitespace-nowrap px-4 py-2 font-mono text-muted-foreground">
                        {cat.lineNumber}
                      </td>
                      <td className="px-4 py-2">{cat.label}</td>
                      <td className="whitespace-nowrap px-4 py-2 text-right font-mono">
                        {formatCurrency(cat.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>

                <tfoot>
                  <tr className="bg-muted/20 font-semibold">
                    <td className="px-4 py-2">28</td>
                    <td className="px-4 py-2">Total Expenses</td>
                    <td className="whitespace-nowrap px-4 py-2 text-right font-mono">
                      {formatCurrency(data.totalExpenses)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            )}
          </div>

          {/* Net profit/loss */}
          <div className="flex items-center justify-between rounded-lg border border-border bg-card p-4">
            <span className="font-semibold">
              Net Profit or (Loss) - Line 31
            </span>
            <span
              className={`font-mono font-semibold text-lg ${
                Number.parseFloat(data.netProfitOrLoss) >= 0
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {formatSignedCurrency(data.netProfitOrLoss)}
            </span>
          </div>
        </>
      )}

      {!loading && !error && !data && (
        <div className="rounded-lg border border-border bg-card p-8 text-center">
          <p className="text-muted-foreground">
            Select a tax year and click Generate to view the Schedule C report
          </p>
        </div>
      )}
    </div>
  );
}
