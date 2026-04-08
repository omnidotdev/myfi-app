import { createFileRoute } from "@tanstack/react-router";
import {
  CheckCircle2Icon,
  HistoryIcon,
  Loader2Icon,
  PlayIcon,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { API_URL } from "@/lib/config/env.config";
import useActiveBook from "@/lib/hooks/useActiveBook";

type Account = {
  id: string;
  name: string;
  code: string | null;
  subType: string | null;
};

type Reconciliation = {
  id: string;
  bookId: string;
  accountId: string;
  statementDate: string;
  statementBalance: string;
  beginningBalance: string;
  status: string;
  completedAt: string | null;
  discrepancy: string | null;
  createdAt: string;
};

type ReconciliationLine = {
  lineId: string;
  journalEntryId: string;
  debit: string;
  credit: string;
  cleared: boolean;
  memo: string | null;
  entryDate: string;
  entryMemo: string | null;
  source: string;
};

const ASSET_SUBTYPES = ["cash", "bank", "credit_card"];

export const Route = createFileRoute("/_app/reconciliation/statements")({
  component: StatementReconciliationPage,
});

function StatementReconciliationPage() {
  const { activeBookId } = useActiveBook();

  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccountId, setSelectedAccountId] = useState("");
  const [statementDate, setStatementDate] = useState("");
  const [endingBalance, setEndingBalance] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Active reconciliation state
  const [activeRecon, setActiveRecon] = useState<Reconciliation | null>(null);
  const [lines, setLines] = useState<ReconciliationLine[]>([]);
  const [clearedBalance, setClearedBalance] = useState("0");
  const [difference, setDifference] = useState("0");

  // History
  const [history, setHistory] = useState<Reconciliation[]>([]);

  // Fetch accounts filtered to asset subtypes
  const fetchAccounts = useCallback(async () => {
    if (!activeBookId) return;

    try {
      const res = await fetch(`${API_URL}/api/accounts?bookId=${activeBookId}`);
      const data = await res.json();
      const filtered = (data.accounts ?? []).filter(
        (a: Account) => a.subType && ASSET_SUBTYPES.includes(a.subType),
      );
      setAccounts(filtered);
    } catch {
      // Silently handle fetch errors
    }
  }, [activeBookId]);

  // Fetch reconciliation history
  const fetchHistory = useCallback(async () => {
    if (!activeBookId) return;

    try {
      const params = new URLSearchParams({
        bookId: activeBookId,
      });
      if (selectedAccountId) {
        params.set("accountId", selectedAccountId);
      }
      const res = await fetch(
        `${API_URL}/api/statement-reconciliations?${params}`,
      );
      const data = await res.json();
      setHistory(
        (data.reconciliations ?? []).filter(
          (r: Reconciliation) => r.status === "completed",
        ),
      );
    } catch {
      // Silently handle fetch errors
    }
  }, [activeBookId, selectedAccountId]);

  // Fetch reconciliation detail
  const fetchDetail = useCallback(async (reconId: string) => {
    try {
      const res = await fetch(
        `${API_URL}/api/statement-reconciliations/${reconId}`,
      );
      const data = await res.json();
      setActiveRecon(data.reconciliation);
      setLines(data.lines ?? []);
      setClearedBalance(data.clearedBalance ?? "0");
      setDifference(data.difference ?? "0");
    } catch {
      // Silently handle fetch errors
    }
  }, []);

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  // Start a new reconciliation
  const handleStart = async () => {
    if (!activeBookId || !selectedAccountId || !statementDate || !endingBalance)
      return;

    setIsLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/statement-reconciliations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookId: activeBookId,
          accountId: selectedAccountId,
          statementDate,
          statementBalance: endingBalance,
        }),
      });
      const data = await res.json();

      if (data.reconciliation) {
        await fetchDetail(data.reconciliation.id);
      }
    } catch {
      // Silently handle errors
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle cleared on a line
  const handleToggleCleared = async (lineId: string, cleared: boolean) => {
    if (!activeRecon) return;

    try {
      await fetch(
        `${API_URL}/api/statement-reconciliations/${activeRecon.id}/lines/${lineId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cleared }),
        },
      );
      await fetchDetail(activeRecon.id);
    } catch {
      // Silently handle errors
    }
  };

  // Complete reconciliation
  const handleComplete = async () => {
    if (!activeRecon) return;

    setIsLoading(true);

    try {
      await fetch(
        `${API_URL}/api/statement-reconciliations/${activeRecon.id}/complete`,
        { method: "POST" },
      );
      setActiveRecon(null);
      setLines([]);
      setClearedBalance("0");
      setDifference("0");
      await fetchHistory();
    } catch {
      // Silently handle errors
    } finally {
      setIsLoading(false);
    }
  };

  const diffNum = Number(difference);
  const isBalanced = Math.abs(diffNum) < 0.005;

  if (!activeBookId) {
    return (
      <div className="p-6 text-muted-foreground">Select a book to begin</div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <h1 className="font-bold text-2xl">Statement Reconciliation</h1>

      {/* Start reconciliation form (only when no active recon) */}
      {!activeRecon && (
        <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-6">
          <h2 className="font-semibold text-lg">Start Reconciliation</h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="flex flex-col gap-1">
              <label htmlFor="recon-account" className="font-medium text-sm">
                Account
              </label>
              <select
                id="recon-account"
                value={selectedAccountId}
                onChange={(e) => setSelectedAccountId(e.target.value)}
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
              >
                <option value="">Select account</option>
                {accounts.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.code ? `${a.code} - ` : ""}
                    {a.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="recon-date" className="font-medium text-sm">
                Statement Date
              </label>
              <input
                id="recon-date"
                type="date"
                value={statementDate}
                onChange={(e) => setStatementDate(e.target.value)}
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="recon-balance" className="font-medium text-sm">
                Ending Balance
              </label>
              <input
                id="recon-balance"
                type="number"
                step="0.01"
                value={endingBalance}
                onChange={(e) => setEndingBalance(e.target.value)}
                placeholder="0.00"
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleStart}
            disabled={
              isLoading ||
              !selectedAccountId ||
              !statementDate ||
              !endingBalance
            }
            className="flex w-fit items-center gap-2 rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground text-sm disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2Icon className="size-4 animate-spin" />
            ) : (
              <PlayIcon className="size-4" />
            )}
            Start Reconciliation
          </button>
        </div>
      )}

      {/* Active reconciliation */}
      {activeRecon && (
        <div className="flex flex-col gap-4">
          {/* Summary bar */}
          <div className="flex items-center justify-between rounded-lg border border-border bg-card p-4">
            <div className="flex gap-6">
              <div>
                <span className="text-muted-foreground text-xs">
                  Statement Balance
                </span>
                <p className="font-semibold">
                  ${Number(activeRecon.statementBalance).toFixed(2)}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground text-xs">
                  Cleared Balance
                </span>
                <p className="font-semibold">
                  ${Number(clearedBalance).toFixed(2)}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground text-xs">
                  Difference
                </span>
                <p
                  className={`font-semibold ${isBalanced ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                >
                  ${Number(difference).toFixed(2)}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleComplete}
              disabled={isLoading || !isBalanced}
              className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 font-medium text-sm text-white disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2Icon className="size-4 animate-spin" />
              ) : (
                <CheckCircle2Icon className="size-4" />
              )}
              Complete
            </button>
          </div>

          {/* Transaction list */}
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-border border-b bg-muted/50">
                  <th className="px-4 py-3 text-left font-medium">Cleared</th>
                  <th className="px-4 py-3 text-left font-medium">Date</th>
                  <th className="px-4 py-3 text-left font-medium">
                    Description
                  </th>
                  <th className="px-4 py-3 text-left font-medium">Source</th>
                  <th className="px-4 py-3 text-right font-medium">Debit</th>
                  <th className="px-4 py-3 text-right font-medium">Credit</th>
                </tr>
              </thead>
              <tbody>
                {lines.map((line) => (
                  <tr
                    key={line.lineId}
                    className="border-border border-b last:border-b-0"
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={line.cleared}
                        onChange={(e) =>
                          handleToggleCleared(line.lineId, e.target.checked)
                        }
                        className="size-4"
                      />
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {line.entryDate
                        ? new Date(line.entryDate).toLocaleDateString()
                        : ""}
                    </td>
                    <td className="px-4 py-3">
                      {line.entryMemo || line.memo || ""}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {line.source}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {Number(line.debit) > 0
                        ? `$${Number(line.debit).toFixed(2)}`
                        : ""}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {Number(line.credit) > 0
                        ? `$${Number(line.credit).toFixed(2)}`
                        : ""}
                    </td>
                  </tr>
                ))}
                {lines.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-8 text-center text-muted-foreground"
                    >
                      No transactions found for this period
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <button
            type="button"
            onClick={() => {
              setActiveRecon(null);
              setLines([]);
            }}
            className="w-fit text-muted-foreground text-sm underline"
          >
            Cancel reconciliation
          </button>
        </div>
      )}

      {/* History table */}
      {!activeRecon && history.length > 0 && (
        <div className="flex flex-col gap-3">
          <h2 className="flex items-center gap-2 font-semibold text-lg">
            <HistoryIcon className="size-5" />
            Completed Reconciliations
          </h2>

          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-border border-b bg-muted/50">
                  <th className="px-4 py-3 text-left font-medium">
                    Statement Date
                  </th>
                  <th className="px-4 py-3 text-right font-medium">
                    Statement Balance
                  </th>
                  <th className="px-4 py-3 text-right font-medium">
                    Beginning Balance
                  </th>
                  <th className="px-4 py-3 text-left font-medium">Completed</th>
                </tr>
              </thead>
              <tbody>
                {history.map((r) => (
                  <tr
                    key={r.id}
                    className="border-border border-b last:border-b-0"
                  >
                    <td className="px-4 py-3">{r.statementDate}</td>
                    <td className="px-4 py-3 text-right">
                      ${Number(r.statementBalance).toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      ${Number(r.beginningBalance).toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {r.completedAt
                        ? new Date(r.completedAt).toLocaleDateString()
                        : ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
