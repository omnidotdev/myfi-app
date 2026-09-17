import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import BookPicker from "@/features/books/components/BookPicker";
import ReportFilters from "@/features/reports/components/ReportFilters";
import { apiFetch } from "@/lib/api/apiFetch";
import useActiveBook from "@/lib/hooks/useActiveBook";

type EquityAccountRow = {
  accountId: string;
  accountCode: string | null;
  accountName: string;
  beginningBalance: string;
  debits: string;
  credits: string;
  endingBalance: string;
};

type StatementOfEquityData = {
  accounts: EquityAccountRow[];
  totalBeginningEquity: string;
  totalEndingEquity: string;
  netIncome: string;
};

export const Route = createFileRoute(
  "/_app/@{$workspaceSlug}/~/reports/statement-of-equity",
)({
  component: StatementOfEquityPage,
});

const money = (v: string) => {
  const n = Number.parseFloat(v) || 0;
  const s = Math.abs(n).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return n < 0 ? `($${s})` : `$${s}`;
};

function StatementOfEquityPage() {
  const { activeBookId, books, setActiveBookId } = useActiveBook();
  const [data, setData] = useState<StatementOfEquityData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (params: {
    startDate?: string;
    endDate?: string;
  }) => {
    if (!activeBookId) return;
    setLoading(true);
    setError(null);
    try {
      const sp = new URLSearchParams({ bookId: activeBookId });
      if (params.startDate) sp.set("startDate", params.startDate);
      if (params.endDate) sp.set("endDate", params.endDate);
      const res = await apiFetch(
        `/api/reports/statement-of-equity?${sp.toString()}`,
      );
      if (!res.ok) throw new Error(`Failed to fetch report: ${res.statusText}`);
      setData(await res.json());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">Statement of Equity</h1>
          <p className="text-muted-foreground text-sm">
            How each equity account changed over the period
          </p>
        </div>
        <BookPicker
          books={books}
          selectedBookId={activeBookId}
          onSelect={setActiveBookId}
        />
      </div>

      <ReportFilters mode="range" onGenerate={handleGenerate} />

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
        <div className="overflow-x-auto rounded-lg border border-border bg-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-border border-b text-left text-muted-foreground">
                <th className="px-4 py-3 font-medium">Equity Account</th>
                <th className="px-4 py-3 text-right font-medium">Beginning</th>
                <th className="px-4 py-3 text-right font-medium">
                  Contributions
                </th>
                <th className="px-4 py-3 text-right font-medium">Reductions</th>
                <th className="px-4 py-3 text-right font-medium">Ending</th>
              </tr>
            </thead>
            <tbody>
              {data.accounts.map((row) => (
                <tr
                  key={row.accountId}
                  className="border-border/50 border-b last:border-0"
                >
                  <td className="px-4 py-2">
                    {row.accountCode ? `${row.accountCode} - ` : ""}
                    {row.accountName}
                  </td>
                  <td className="px-4 py-2 text-right font-mono">
                    {money(row.beginningBalance)}
                  </td>
                  <td className="px-4 py-2 text-right font-mono text-green-600 dark:text-green-400">
                    {money(row.credits)}
                  </td>
                  <td className="px-4 py-2 text-right font-mono text-red-600 dark:text-red-400">
                    {money(row.debits)}
                  </td>
                  <td className="px-4 py-2 text-right font-mono">
                    {money(row.endingBalance)}
                  </td>
                </tr>
              ))}
              <tr className="border-border border-t-2 font-semibold">
                <td className="px-4 py-3">Total Equity</td>
                <td className="px-4 py-3 text-right font-mono">
                  {money(data.totalBeginningEquity)}
                </td>
                <td className="px-4 py-3" />
                <td className="px-4 py-3" />
                <td className="px-4 py-3 text-right font-mono">
                  {money(data.totalEndingEquity)}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex items-center justify-between border-border border-t p-4 text-sm">
            <span className="text-muted-foreground">
              Net income for the period (closed to retained earnings at
              year-end)
            </span>
            <span className="font-mono font-semibold">
              {money(data.netIncome)}
            </span>
          </div>
        </div>
      )}

      {!loading && !error && !data && (
        <div className="rounded-lg border border-border bg-card p-8 text-center">
          <p className="text-muted-foreground">
            Select a date range and click Generate to view the statement of
            equity
          </p>
        </div>
      )}
    </div>
  );
}
