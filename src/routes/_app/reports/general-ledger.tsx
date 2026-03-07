import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import BookPicker from "@/features/books/components/BookPicker";
import ReportFilters from "@/features/reports/components/ReportFilters";

import { API_URL } from "@/lib/config/env.config";
import formatCurrency from "@/lib/format/currency";

import useActiveBook from "@/lib/hooks/useActiveBook";

type AccountOption = {
  id: string;
  name: string;
  code: string | null;
  type: string;
  subType: string | null;
};

type LedgerEntry = {
  date: string;
  memo: string | null;
  source: string;
  debit: string;
  credit: string;
  runningBalance: string;
};

type GeneralLedgerData = {
  accountName: string;
  accountCode: string | null;
  entries: LedgerEntry[];
  openingBalance: string;
  closingBalance: string;
  totalDebits: string;
  totalCredits: string;
};

export const Route = createFileRoute("/_app/reports/general-ledger")({
  component: GeneralLedgerPage,
});

function GeneralLedgerPage() {
  const { activeBookId, books, isLoading: booksLoading, setActiveBookId } = useActiveBook();
  const [accounts, setAccounts] = useState<AccountOption[]>([]);
  const [selectedAccountId, setSelectedAccountId] = useState("");
  const [data, setData] = useState<GeneralLedgerData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch accounts for the picker
  useEffect(() => {
    if (!activeBookId) return;
    const fetchAccounts = async () => {
      try {
        const res = await fetch(`${API_URL}/api/accounts?bookId=${activeBookId}`);
        if (!res.ok) return;
        const json = await res.json();
        setAccounts(json.accounts ?? []);
      } catch {
        // Silently fail
      }
    };
    fetchAccounts();
  }, [activeBookId]);

  const handleGenerate = async (params: {
    startDate?: string;
    endDate?: string;
  }) => {
    if (!selectedAccountId) {
      setError("Please select an account");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const searchParams = new URLSearchParams();
      if (activeBookId) searchParams.set("bookId", activeBookId);
      searchParams.set("accountId", selectedAccountId);
      if (params.startDate) searchParams.set("startDate", params.startDate);
      if (params.endDate) searchParams.set("endDate", params.endDate);

      const res = await fetch(
        `${API_URL}/api/reports/general-ledger?${searchParams.toString()}`,
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">General Ledger</h1>
          <p className="text-muted-foreground text-sm">
            Full transaction history for a specific account with running balance
          </p>
        </div>
        <BookPicker books={books} selectedBookId={activeBookId} onSelect={setActiveBookId} />
      </div>

      {/* Account picker */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="gl-account-select"
          className="text-muted-foreground text-xs"
        >
          Account
        </label>
        <select
          id="gl-account-select"
          value={selectedAccountId}
          onChange={(e) => setSelectedAccountId(e.target.value)}
          className="max-w-sm rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <option value="">Select an account</option>
          {accounts.map((account) => (
            <option key={account.id} value={account.id}>
              {account.code ? `${account.code} - ` : ""}
              {account.name} ({account.type})
            </option>
          ))}
        </select>
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
        <>
          {/* Account header */}
          <div className="flex flex-wrap items-center gap-4 rounded-lg border border-border bg-card p-4">
            <div className="flex flex-col">
              <span className="text-muted-foreground text-xs">Account</span>
              <span className="font-semibold">
                {data.accountCode ? `${data.accountCode} - ` : ""}
                {data.accountName}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-muted-foreground text-xs">
                Opening Balance
              </span>
              <span className="font-mono font-semibold">
                {formatCurrency(data.openingBalance)}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-muted-foreground text-xs">
                Closing Balance
              </span>
              <span className="font-mono font-semibold">
                {formatCurrency(data.closingBalance)}
              </span>
            </div>
          </div>

          {/* Transaction table */}
          <div className="overflow-x-auto rounded-lg border border-border bg-card">
            {data.entries.length === 0 ? (
              <div className="px-4 py-8 text-center text-muted-foreground text-sm">
                No entries found for this account in the selected period
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-border border-b text-left text-muted-foreground">
                    <th className="px-4 py-3 font-medium">Date</th>
                    <th className="px-4 py-3 font-medium">Memo</th>
                    <th className="px-4 py-3 font-medium">Source</th>
                    <th className="px-4 py-3 text-right font-medium">Debit</th>
                    <th className="px-4 py-3 text-right font-medium">Credit</th>
                    <th className="px-4 py-3 text-right font-medium">
                      Balance
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {data.entries.map((entry, idx) => (
                    <tr
                      key={`${entry.date}-${idx}`}
                      className="border-border border-b transition-colors hover:bg-accent/30"
                    >
                      <td className="whitespace-nowrap px-4 py-2 font-mono text-muted-foreground">
                        {formatDate(entry.date)}
                      </td>
                      <td className="px-4 py-2">{entry.memo ?? ""}</td>
                      <td className="px-4 py-2">
                        <span className="rounded-full bg-muted px-2 py-0.5 text-muted-foreground text-xs">
                          {formatSource(entry.source)}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-right font-mono">
                        {Number.parseFloat(entry.debit) > 0
                          ? formatCurrency(entry.debit)
                          : ""}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-right font-mono">
                        {Number.parseFloat(entry.credit) > 0
                          ? formatCurrency(entry.credit)
                          : ""}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-right font-mono font-semibold">
                        {formatCurrency(entry.runningBalance)}
                      </td>
                    </tr>
                  ))}
                </tbody>

                <tfoot>
                  <tr className="border-border border-t-2 bg-muted/20 font-semibold">
                    <td className="px-4 py-2" />
                    <td className="px-4 py-2">Totals</td>
                    <td className="px-4 py-2" />
                    <td className="whitespace-nowrap px-4 py-2 text-right font-mono">
                      {formatCurrency(data.totalDebits)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-right font-mono">
                      {formatCurrency(data.totalCredits)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-right font-mono">
                      {formatCurrency(data.closingBalance)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            )}
          </div>
        </>
      )}

      {!loading && !error && !data && (
        <div className="rounded-lg border border-border bg-card p-8 text-center">
          <p className="text-muted-foreground">
            Select an account and date range, then click Generate to view the
            General Ledger
          </p>
        </div>
      )}
    </div>
  );
}

/** Format an ISO date string to a short display format */
function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

/** Format a journal entry source enum value for display */
function formatSource(source: string): string {
  const labels: Record<string, string> = {
    manual: "Manual",
    mantle_sync: "Mantle",
    plaid_import: "Plaid",
    crypto_sync: "Crypto",
    recurring: "Recurring",
  };
  return labels[source] ?? source;
}
