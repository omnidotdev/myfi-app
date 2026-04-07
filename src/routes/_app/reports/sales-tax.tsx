import { createFileRoute } from "@tanstack/react-router";
import { DownloadIcon, Loader2Icon, PrinterIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import BookPicker from "@/features/books/components/BookPicker";
import { API_URL } from "@/lib/config/env.config";
import formatCurrency from "@/lib/format/currency";
import useActiveBook from "@/lib/hooks/useActiveBook";

export const Route = createFileRoute("/_app/reports/sales-tax")({
  component: SalesTaxReportPage,
});

type PeriodRow = {
  label: string;
  collected: string;
  remitted: string;
  owed: string;
};

type JurisdictionSection = {
  jurisdictionId: string;
  jurisdictionName: string;
  jurisdictionCode: string;
  filingFrequency: "monthly" | "quarterly" | "annually";
  periods: PeriodRow[];
  totalCollected: string;
  totalRemitted: string;
  totalOwed: string;
};

type SalesTaxReport = {
  year: number;
  totalCollected: string;
  totalRemitted: string;
  totalOwed: string;
  jurisdictions: JurisdictionSection[];
};

type JurisdictionOption = {
  id: string;
  name: string;
};

const frequencyLabel: Record<string, string> = {
  monthly: "Monthly",
  quarterly: "Quarterly",
  annually: "Annually",
};

const frequencyStyle: Record<string, string> = {
  monthly: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  quarterly: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  annually: "bg-green-500/10 text-green-600 dark:text-green-400",
};

function SalesTaxReportPage() {
  const {
    activeBookId,
    books,
    isLoading: booksLoading,
    setActiveBookId,
  } = useActiveBook();

  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const [jurisdictionId, setJurisdictionId] = useState("");
  const [jurisdictionOptions, setJurisdictionOptions] = useState<
    JurisdictionOption[]
  >([]);
  const [data, setData] = useState<SalesTaxReport | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchJurisdictions = useCallback(async () => {
    if (!activeBookId) return;

    try {
      const res = await fetch(
        `${API_URL}/api/tax-jurisdictions?bookId=${activeBookId}`,
      );
      const json = await res.json();

      setJurisdictionOptions(
        (json.jurisdictions ?? []).map((j: { id: string; name: string }) => ({
          id: j.id,
          name: j.name,
        })),
      );
    } catch {
      // Silently handle fetch errors
    }
  }, [activeBookId]);

  useEffect(() => {
    fetchJurisdictions();
  }, [fetchJurisdictions]);

  const fetchReport = useCallback(async () => {
    if (!activeBookId) return;

    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        bookId: activeBookId,
        year: String(year),
      });

      if (jurisdictionId) {
        params.set("jurisdictionId", jurisdictionId);
      }

      const res = await fetch(
        `${API_URL}/api/reports/sales-tax?${params.toString()}`,
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
  }, [activeBookId, year, jurisdictionId]);

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  const loading = booksLoading || isLoading;

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">Sales Tax Report</h1>
          <p className="text-muted-foreground text-sm">
            Tax collected, remitted, and owed by jurisdiction
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
            htmlFor="sales-tax-year"
            className="text-muted-foreground text-xs"
          >
            Year
          </label>
          <select
            id="sales-tax-year"
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

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="sales-tax-jurisdiction"
            className="text-muted-foreground text-xs"
          >
            Jurisdiction
          </label>
          <select
            id="sales-tax-jurisdiction"
            value={jurisdictionId}
            onChange={(e) => setJurisdictionId(e.target.value)}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="">All Jurisdictions</option>
            {jurisdictionOptions.map((j) => (
              <option key={j.id} value={j.id}>
                {j.name}
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
          {/* Export actions */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm transition-colors hover:bg-muted"
            >
              <PrinterIcon className="size-4" />
              Print
            </button>
            <button
              type="button"
              onClick={async () => {
                const sp = new URLSearchParams();
                sp.set("type", "sales-tax");
                sp.set("format", "csv");
                if (activeBookId) sp.set("bookId", activeBookId);
                sp.set("year", String(year));
                if (jurisdictionId) sp.set("jurisdictionId", jurisdictionId);

                const res = await fetch(
                  `${API_URL}/api/reports/export?${sp.toString()}`,
                );

                if (!res.ok) return;

                const blob = await res.blob();
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = `sales-tax-${year}.csv`;
                link.click();
                URL.revokeObjectURL(url);
              }}
              className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm transition-colors hover:bg-muted"
            >
              <DownloadIcon className="size-4" />
              Download CSV
            </button>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <SummaryCard
              label="Total Collected"
              value={formatCurrency(data.totalCollected)}
            />
            <SummaryCard
              label="Total Remitted"
              value={formatCurrency(data.totalRemitted)}
            />
            <SummaryCard
              label="Total Owed"
              value={formatCurrency(data.totalOwed)}
              highlight={Number.parseFloat(data.totalOwed) > 0}
            />
          </div>

          {/* Per jurisdiction */}
          {data.jurisdictions.map((section) => (
            <div
              key={section.jurisdictionId}
              className="overflow-x-auto rounded-lg border border-border bg-card"
            >
              <div className="flex items-center gap-3 border-border border-b bg-muted/50 px-4 py-3">
                <h2 className="font-semibold text-sm">
                  {section.jurisdictionName}
                </h2>
                <span className="font-mono text-muted-foreground text-xs">
                  {section.jurisdictionCode}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 font-medium text-xs ${frequencyStyle[section.filingFrequency] ?? ""}`}
                >
                  {frequencyLabel[section.filingFrequency] ??
                    section.filingFrequency}
                </span>
              </div>

              <table className="w-full text-sm">
                <thead>
                  <tr className="border-border border-b text-left text-muted-foreground">
                    <th className="px-4 py-3 font-medium">Period</th>
                    <th className="px-4 py-3 text-right font-medium">
                      Collected
                    </th>
                    <th className="px-4 py-3 text-right font-medium">
                      Remitted
                    </th>
                    <th className="px-4 py-3 text-right font-medium">Owed</th>
                  </tr>
                </thead>

                <tbody>
                  {section.periods.map((period) => {
                    const owed = Number.parseFloat(period.owed);

                    return (
                      <tr
                        key={period.label}
                        className="border-border border-b transition-colors hover:bg-accent/30"
                      >
                        <td className="px-4 py-3">{period.label}</td>
                        <td className="px-4 py-3 text-right font-mono">
                          {formatCurrency(period.collected)}
                        </td>
                        <td className="px-4 py-3 text-right font-mono">
                          {formatCurrency(period.remitted)}
                        </td>
                        <td
                          className={`px-4 py-3 text-right font-medium font-mono ${
                            owed > 0
                              ? "text-red-600 dark:text-red-400"
                              : "text-green-600 dark:text-green-400"
                          }`}
                        >
                          {formatCurrency(period.owed)}
                        </td>
                      </tr>
                    );
                  })}

                  {/* Totals row */}
                  <tr className="bg-muted/30 font-semibold">
                    <td className="px-4 py-3">Total</td>
                    <td className="px-4 py-3 text-right font-mono">
                      {formatCurrency(section.totalCollected)}
                    </td>
                    <td className="px-4 py-3 text-right font-mono">
                      {formatCurrency(section.totalRemitted)}
                    </td>
                    <td
                      className={`px-4 py-3 text-right font-mono ${
                        Number.parseFloat(section.totalOwed) > 0
                          ? "text-red-600 dark:text-red-400"
                          : "text-green-600 dark:text-green-400"
                      }`}
                    >
                      {formatCurrency(section.totalOwed)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}

          {data.jurisdictions.length === 0 && (
            <div className="rounded-lg border border-border bg-card p-8 text-center">
              <p className="text-muted-foreground">
                No sales tax data for the selected filters
              </p>
            </div>
          )}
        </>
      )}

      {/* Empty state (no data fetched yet) */}
      {!loading && !error && !data && (
        <div className="rounded-lg border border-border bg-card p-8 text-center">
          <p className="text-muted-foreground">
            Select a book to view the sales tax report
          </p>
        </div>
      )}
    </div>
  );
}

type SummaryCardProps = {
  label: string;
  value: string;
  highlight?: boolean;
};

function SummaryCard({ label, value, highlight }: SummaryCardProps) {
  return (
    <div className="flex flex-col gap-1 rounded-lg border border-border bg-card p-4">
      <span className="text-muted-foreground text-xs">{label}</span>
      <span
        className={`font-mono font-semibold text-lg ${
          highlight ? "text-red-600 dark:text-red-400" : ""
        }`}
      >
        {value}
      </span>
    </div>
  );
}
