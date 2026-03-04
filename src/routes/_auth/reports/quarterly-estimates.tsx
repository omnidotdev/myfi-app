import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { API_URL } from "@/lib/config/env.config";
import formatCurrency from "@/lib/format/currency";

type QuarterEstimate = {
  quarter: number;
  label: string;
  dueDate: string;
  estimatedPayment: string;
  cumulativeIncome: string;
  cumulativeTax: string;
};

type QuarterlyEstimatesData = {
  year: number;
  annualProjectedIncome: string;
  selfEmploymentTax: string;
  estimatedIncomeTax: string;
  totalEstimatedTax: string;
  quarters: QuarterEstimate[];
  safeHarbor: {
    currentYear90Pct: string;
    priorYear100Pct: string | null;
  };
};

export const Route = createFileRoute("/_auth/reports/quarterly-estimates")({
  component: QuarterlyEstimatesPage,
});

function QuarterlyEstimatesPage() {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const [data, setData] = useState<QuarterlyEstimatesData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const searchParams = new URLSearchParams({ year: String(year) });
      const res = await fetch(
        `${API_URL}/api/tax/quarterly-estimates?${searchParams.toString()}`,
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

  /** Determine quarter status based on due date */
  const getQuarterStatus = (dueDate: string): "paid" | "due" | "overdue" => {
    const due = new Date(dueDate);
    const now = new Date();

    if (now > due) return "overdue";
    // Within 30 days of due date
    const thirtyDays = 30 * 24 * 60 * 60 * 1000;
    if (due.getTime() - now.getTime() < thirtyDays) return "due";
    return "paid";
  };

  const statusStyles: Record<string, string> = {
    paid: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    due: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    overdue: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="font-bold text-2xl">Quarterly Estimates</h1>
        <p className="text-muted-foreground text-sm">
          Estimated tax payments for self-employed filers
        </p>
      </div>

      {/* Year selector */}
      <form
        onSubmit={handleGenerate}
        className="flex flex-wrap items-end gap-4 rounded-lg border border-border bg-card p-4"
      >
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="quarterly-year"
            className="text-muted-foreground text-xs"
          >
            Tax Year
          </label>
          <select
            id="quarterly-year"
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
          {/* Quarter cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {data.quarters.map((q) => {
              const status = getQuarterStatus(q.dueDate);

              return (
                <div
                  key={q.quarter}
                  className="flex flex-col gap-3 rounded-lg border border-border bg-card p-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-sm">{q.label}</h3>
                    <span
                      className={`rounded-full px-2 py-0.5 font-medium text-xs ${statusStyles[status]}`}
                    >
                      {status}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Payment</span>
                      <span className="font-mono font-semibold">
                        {formatCurrency(q.estimatedPayment)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Due</span>
                      <span>{q.dueDate}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Cumulative income
                      </span>
                      <span className="font-mono">
                        {formatCurrency(q.cumulativeIncome)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Annual projection summary */}
          <div className="overflow-x-auto rounded-lg border border-border bg-card">
            <div className="border-border border-b bg-muted/50 px-4 py-3">
              <h2 className="font-semibold text-sm">Annual Projection</h2>
            </div>

            <div className="flex flex-col divide-y divide-border">
              <SummaryRow
                label="Projected annual income"
                value={formatCurrency(data.annualProjectedIncome)}
              />
              <SummaryRow
                label="Self-employment tax (15.3%)"
                value={formatCurrency(data.selfEmploymentTax)}
              />
              <SummaryRow
                label="Estimated income tax"
                value={formatCurrency(data.estimatedIncomeTax)}
              />
              <SummaryRow
                label="Total estimated tax"
                value={formatCurrency(data.totalEstimatedTax)}
                bold
              />
            </div>
          </div>

          {/* Safe harbor */}
          <div className="overflow-x-auto rounded-lg border border-border bg-card">
            <div className="border-border border-b bg-muted/50 px-4 py-3">
              <h2 className="font-semibold text-sm">Safe Harbor</h2>
              <p className="text-muted-foreground text-xs">
                Pay the lesser to avoid underpayment penalties
              </p>
            </div>

            <div className="flex flex-col divide-y divide-border">
              <SummaryRow
                label="90% of current year tax"
                value={formatCurrency(data.safeHarbor.currentYear90Pct)}
              />
              <SummaryRow
                label="100% of prior year tax"
                value={
                  data.safeHarbor.priorYear100Pct
                    ? formatCurrency(data.safeHarbor.priorYear100Pct)
                    : "N/A"
                }
              />
            </div>
          </div>
        </>
      )}

      {!loading && !error && !data && (
        <div className="rounded-lg border border-border bg-card p-8 text-center">
          <p className="text-muted-foreground">
            Select a tax year and click Generate to view quarterly estimates
          </p>
        </div>
      )}
    </div>
  );
}

type SummaryRowProps = {
  label: string;
  value: string;
  bold?: boolean;
};

function SummaryRow({ label, value, bold }: SummaryRowProps) {
  return (
    <div className="flex items-center justify-between px-4 py-2.5">
      <span className={bold ? "font-semibold" : "text-sm"}>{label}</span>
      <span className={`font-mono ${bold ? "font-semibold text-lg" : ""}`}>
        {value}
      </span>
    </div>
  );
}
