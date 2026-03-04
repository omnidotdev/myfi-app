import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { API_URL } from "@/lib/config/env.config";
import { formatCurrency, formatSignedCurrency } from "@/lib/format/currency";

type DisposalItem = {
  description: string;
  dateAcquired: string;
  dateSold: string;
  proceeds: string;
  costBasis: string;
  gainOrLoss: string;
};

type Form8949Data = {
  year: number;
  shortTerm: DisposalItem[];
  longTerm: DisposalItem[];
  totalShortTermGainLoss: string;
  totalLongTermGainLoss: string;
  netGainLoss: string;
};

export const Route = createFileRoute("/_auth/reports/form-8949")({
  component: Form8949Page,
});

function Form8949Page() {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const [data, setData] = useState<Form8949Data | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const searchParams = new URLSearchParams({ year: String(year) });
      const res = await fetch(
        `${API_URL}/api/tax/form-8949?${searchParams.toString()}`,
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
        <h1 className="font-bold text-2xl">Form 8949</h1>
        <p className="text-muted-foreground text-sm">
          Sales and dispositions of capital assets (crypto)
        </p>
      </div>

      {/* Year selector */}
      <form
        onSubmit={handleGenerate}
        className="flex flex-wrap items-end gap-4 rounded-lg border border-border bg-card p-4"
      >
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="form-8949-year"
            className="text-muted-foreground text-xs"
          >
            Tax Year
          </label>
          <select
            id="form-8949-year"
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
          {/* Part I - Short-Term */}
          <DisposalSection
            title="Part I - Short-Term (held one year or less)"
            items={data.shortTerm}
            total={data.totalShortTermGainLoss}
          />

          {/* Part II - Long-Term */}
          <DisposalSection
            title="Part II - Long-Term (held more than one year)"
            items={data.longTerm}
            total={data.totalLongTermGainLoss}
          />

          {/* Net gain/loss summary */}
          <div className="flex items-center justify-between rounded-lg border border-border bg-card p-4">
            <span className="font-semibold">Net Capital Gain / (Loss)</span>
            <span
              className={`font-mono font-semibold text-lg ${
                Number.parseFloat(data.netGainLoss) >= 0
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {formatSignedCurrency(data.netGainLoss)}
            </span>
          </div>
        </>
      )}

      {!loading && !error && !data && (
        <div className="rounded-lg border border-border bg-card p-8 text-center">
          <p className="text-muted-foreground">
            Select a tax year and click Generate to view Form 8949
          </p>
        </div>
      )}
    </div>
  );
}

type DisposalSectionProps = {
  title: string;
  items: DisposalItem[];
  total: string;
};

function DisposalSection({ title, items, total }: DisposalSectionProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-card">
      <div className="border-border border-b bg-muted/50 px-4 py-3">
        <h2 className="font-semibold text-sm">{title}</h2>
      </div>

      {items.length === 0 ? (
        <div className="px-4 py-6 text-center text-muted-foreground text-sm">
          No dispositions in this category
        </div>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="border-border border-b text-left text-muted-foreground">
              <th className="px-4 py-2 font-medium">Description</th>
              <th className="px-4 py-2 font-medium">Date Acquired</th>
              <th className="px-4 py-2 font-medium">Date Sold</th>
              <th className="px-4 py-2 text-right font-medium">Proceeds</th>
              <th className="px-4 py-2 text-right font-medium">Cost Basis</th>
              <th className="px-4 py-2 text-right font-medium">
                Gain / (Loss)
              </th>
            </tr>
          </thead>

          <tbody>
            {items.map((item, idx) => (
              <tr
                key={`${item.description}-${item.dateSold}-${idx}`}
                className="border-border border-b transition-colors hover:bg-accent/30"
              >
                <td className="whitespace-nowrap px-4 py-2">
                  {item.description}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-muted-foreground">
                  {item.dateAcquired}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-muted-foreground">
                  {item.dateSold}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-right font-mono">
                  {formatCurrency(item.proceeds)}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-right font-mono">
                  {formatCurrency(item.costBasis)}
                </td>
                <td
                  className={`whitespace-nowrap px-4 py-2 text-right font-mono ${
                    Number.parseFloat(item.gainOrLoss) >= 0
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {formatSignedCurrency(item.gainOrLoss)}
                </td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr className="bg-muted/20 font-semibold">
              <td className="px-4 py-2" colSpan={5}>
                Total
              </td>
              <td
                className={`whitespace-nowrap px-4 py-2 text-right font-mono ${
                  Number.parseFloat(total) >= 0
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {formatSignedCurrency(total)}
              </td>
            </tr>
          </tfoot>
        </table>
      )}
    </div>
  );
}
