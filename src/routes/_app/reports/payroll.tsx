import { createFileRoute } from "@tanstack/react-router";
import { Loader2Icon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import BookPicker from "@/features/books/components/BookPicker";
import { API_URL } from "@/lib/config/env.config";
import formatCurrency from "@/lib/format/currency";
import useActiveBook from "@/lib/hooks/useActiveBook";

export const Route = createFileRoute("/_app/reports/payroll")({
  component: PayrollReportPage,
});

type PayrollRun = {
  date: string;
  description: string;
  grossWages: string;
  taxes: string;
  benefits: string;
  netPay: string;
};

type PayrollReport = {
  year: number;
  totalGrossWages: string;
  totalTaxes: string;
  totalBenefits: string;
  totalNetPay: string;
  runs: PayrollRun[];
};

function PayrollReportPage() {
  const {
    activeBookId,
    books,
    isLoading: booksLoading,
    setActiveBookId,
  } = useActiveBook();

  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const [data, setData] = useState<PayrollReport | null>(null);
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
      });

      const res = await fetch(
        `${API_URL}/api/reports/payroll?${params.toString()}`,
      );

      if (!res.ok) {
        throw new Error(`Failed to fetch report: ${res.statusText}`);
      }

      const json = await res.json();
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load report");
    } finally {
      setIsLoading(false);
    }
  }, [activeBookId, year]);

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  const loading = booksLoading || isLoading;

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">Payroll Report</h1>
          <p className="text-muted-foreground text-sm">
            Payroll runs, wages, taxes, and benefits by year
          </p>
        </div>

        <BookPicker
          books={books}
          selectedBookId={activeBookId}
          onSelect={setActiveBookId}
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-end gap-4 rounded-lg border border-border bg-card p-4">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="payroll-year"
            className="text-muted-foreground text-xs"
          >
            Year
          </label>
          <select
            id="payroll-year"
            value={year}
            onChange={(e) => setYear(Number.parseInt(e.target.value, 10))}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            {Array.from({ length: 3 }, (_, i) => currentYear - i).map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center rounded-lg border border-border bg-card p-8">
          <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive text-sm">
          {error}
        </div>
      )}

      {/* Report data */}
      {!loading && !error && data && (
        <>
          {/* Summary cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
            <SummaryCard
              label="Total Gross Wages"
              value={formatCurrency(data.totalGrossWages)}
            />
            <SummaryCard
              label="Total Taxes"
              value={formatCurrency(data.totalTaxes)}
            />
            <SummaryCard
              label="Total Benefits"
              value={formatCurrency(data.totalBenefits)}
            />
            <SummaryCard
              label="Total Net Pay"
              value={formatCurrency(data.totalNetPay)}
            />
          </div>

          {/* Payroll runs table */}
          {data.runs.length > 0 ? (
            <div className="overflow-x-auto rounded-lg border border-border bg-card">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-border border-b text-left text-muted-foreground">
                    <th className="px-4 py-3 font-medium">Date</th>
                    <th className="px-4 py-3 font-medium">Description</th>
                    <th className="px-4 py-3 text-right font-medium">
                      Gross Wages
                    </th>
                    <th className="px-4 py-3 text-right font-medium">Taxes</th>
                    <th className="px-4 py-3 text-right font-medium">
                      Benefits
                    </th>
                    <th className="px-4 py-3 text-right font-medium">
                      Net Pay
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {data.runs.map((run) => (
                    <tr
                      key={`${run.date}-${run.description}`}
                      className="border-border border-b transition-colors hover:bg-accent/30"
                    >
                      <td className="px-4 py-3">
                        {new Date(run.date).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">{run.description}</td>
                      <td className="px-4 py-3 text-right font-mono">
                        {formatCurrency(run.grossWages)}
                      </td>
                      <td className="px-4 py-3 text-right font-mono">
                        {formatCurrency(run.taxes)}
                      </td>
                      <td className="px-4 py-3 text-right font-mono">
                        {formatCurrency(run.benefits)}
                      </td>
                      <td className="px-4 py-3 text-right font-mono">
                        {formatCurrency(run.netPay)}
                      </td>
                    </tr>
                  ))}

                  {/* Totals row */}
                  <tr className="bg-muted/30 font-semibold">
                    <td className="px-4 py-3" colSpan={2}>
                      Total
                    </td>
                    <td className="px-4 py-3 text-right font-mono">
                      {formatCurrency(data.totalGrossWages)}
                    </td>
                    <td className="px-4 py-3 text-right font-mono">
                      {formatCurrency(data.totalTaxes)}
                    </td>
                    <td className="px-4 py-3 text-right font-mono">
                      {formatCurrency(data.totalBenefits)}
                    </td>
                    <td className="px-4 py-3 text-right font-mono">
                      {formatCurrency(data.totalNetPay)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div className="rounded-lg border border-border bg-card p-8 text-center">
              <p className="text-muted-foreground">
                No payroll data for the selected year
              </p>
            </div>
          )}
        </>
      )}

      {/* Empty state */}
      {!loading && !error && !data && (
        <div className="rounded-lg border border-border bg-card p-8 text-center">
          <p className="text-muted-foreground">
            Select a book to view the payroll report
          </p>
        </div>
      )}
    </div>
  );
}

type SummaryCardProps = {
  label: string;
  value: string;
};

function SummaryCard({ label, value }: SummaryCardProps) {
  return (
    <div className="flex flex-col gap-1 rounded-lg border border-border bg-card p-4">
      <span className="text-muted-foreground text-xs">{label}</span>
      <span className="font-mono font-semibold text-lg">{value}</span>
    </div>
  );
}
