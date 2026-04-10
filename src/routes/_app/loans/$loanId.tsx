import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeftIcon, Loader2Icon } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";

import type { Account } from "@/features/accounts/types/account";
import BookPicker from "@/features/books/components/BookPicker";
import { API_URL } from "@/lib/config/env.config";
import formatCurrency from "@/lib/format/currency";
import useActiveBook from "@/lib/hooks/useActiveBook";

type Loan = {
  id: string;
  bookId: string;
  name: string;
  liabilityAccountId: string;
  interestAccountId: string;
  paymentAccountId: string;
  originalPrincipal: string;
  annualRate: string;
  termMonths: number;
  startDate: string;
  paymentDay: number;
  paymentAmount: string | null;
  extraPrincipal: string | null;
  status: "active" | "paid_off";
  notes: string | null;
  currentBalance: number;
};

type ScheduleEntry = {
  id: string;
  loanId: string;
  sequenceNumber: number;
  dueDate: string;
  paymentAmount: string;
  principalAmount: string;
  interestAmount: string;
  extraPrincipal: string;
  balanceAfter: string;
  journalEntryId: string | null;
  status: "scheduled" | "posted" | "skipped";
};

type PayoffFormValues = {
  payoffDate: string;
  payoffAmount: string;
  paymentAccountId: string;
};

const statusConfig = {
  active: {
    label: "Active",
    className:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  },
  paid_off: {
    label: "Paid Off",
    className:
      "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
  },
};

export const Route = createFileRoute("/_app/loans/$loanId")({
  component: LoanDetailPage,
});

function LoanDetailPage() {
  const { loanId } = Route.useParams();
  const {
    activeBookId,
    books,
    isLoading: booksLoading,
    setActiveBookId,
  } = useActiveBook();

  const [loan, setLoan] = useState<Loan | null>(null);
  const [schedule, setSchedule] = useState<ScheduleEntry[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [scheduleLoading, setScheduleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [posting, setPosting] = useState(false);
  const [payoffOpen, setPayoffOpen] = useState(false);
  const [payoffValues, setPayoffValues] = useState<PayoffFormValues>({
    payoffDate: "",
    payoffAmount: "",
    paymentAccountId: "",
  });

  const fetchLoan = useCallback(async () => {
    if (!activeBookId) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/api/loans?bookId=${activeBookId}`);
      const data = await res.json();
      const found = (data.loans ?? []).find((l: Loan) => l.id === loanId);

      if (!found) {
        setError("Loan not found");
        setLoan(null);
      } else {
        setLoan(found);
      }
    } catch {
      setError("Failed to load loan");
    } finally {
      setLoading(false);
    }
  }, [activeBookId, loanId]);

  const fetchSchedule = useCallback(async () => {
    if (!loanId) return;

    setScheduleLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/loans/${loanId}/schedule`);

      if (res.ok) {
        const data = await res.json();
        setSchedule(data.schedule ?? []);
      }
    } catch {
      // Schedule fetch is best-effort
    } finally {
      setScheduleLoading(false);
    }
  }, [loanId]);

  const fetchAccounts = useCallback(async () => {
    if (!activeBookId) return;

    try {
      const res = await fetch(`${API_URL}/api/accounts?bookId=${activeBookId}`);
      const data = await res.json();
      setAccounts(data.accounts ?? []);
    } catch {
      // Silently handle fetch errors
    }
  }, [activeBookId]);

  useEffect(() => {
    fetchLoan();
    fetchSchedule();
    fetchAccounts();
  }, [fetchLoan, fetchSchedule, fetchAccounts]);

  const paymentAccounts = accounts.filter(
    (a) => a.type === "asset" && !a.isPlaceholder,
  );

  // Compute summary values from schedule
  const summary = useMemo(() => {
    if (!loan || schedule.length === 0) {
      return {
        totalInterestPaid: 0,
        totalInterestRemaining: 0,
      };
    }

    let totalInterestPaid = 0;
    let totalInterestRemaining = 0;

    for (const entry of schedule) {
      const interest = Number.parseFloat(entry.interestAmount) || 0;
      if (entry.status === "posted") {
        totalInterestPaid += interest;
      } else if (entry.status === "scheduled") {
        totalInterestRemaining += interest;
      }
    }

    return { totalInterestPaid, totalInterestRemaining };
  }, [loan, schedule]);

  // Chart data from schedule
  const chartData = useMemo(() => {
    return schedule
      .filter((e) => e.status !== "skipped")
      .map((entry) => ({
        dueDate: new Date(entry.dueDate).toLocaleDateString("en-US", {
          month: "short",
          year: "2-digit",
        }),
        balance: Number.parseFloat(entry.balanceAfter),
      }));
  }, [schedule]);

  const handlePostNext = useCallback(async () => {
    if (!activeBookId || !loan) return;

    setPosting(true);

    // Find the next scheduled entry to determine the year/month
    const nextScheduled = schedule.find((e) => e.status === "scheduled");
    if (!nextScheduled) {
      toast.error("No scheduled payments remaining");
      setPosting(false);
      return;
    }

    const dueDate = new Date(nextScheduled.dueDate);
    const year = dueDate.getFullYear();
    const month = dueDate.getMonth() + 1;

    try {
      const res = await fetch(`${API_URL}/api/loans/run-amortization`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId: activeBookId, year, month }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Failed to post payment");
      }

      toast.success("Payment posted");
      await Promise.all([fetchLoan(), fetchSchedule()]);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to post payment",
      );
    } finally {
      setPosting(false);
    }
  }, [activeBookId, loan, schedule, fetchLoan, fetchSchedule]);

  const handlePayoff = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!payoffValues.payoffDate || !payoffValues.payoffAmount) return;

      try {
        const res = await fetch(`${API_URL}/api/loans/${loanId}/payoff`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            payoffDate: payoffValues.payoffDate,
            payoffAmount: payoffValues.payoffAmount,
            paymentAccountId: payoffValues.paymentAccountId || undefined,
          }),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error ?? "Failed to pay off loan");
        }

        toast.success("Loan paid off");
        setPayoffOpen(false);
        await Promise.all([fetchLoan(), fetchSchedule()]);
      } catch (err) {
        toast.error(
          err instanceof Error ? err.message : "Failed to pay off loan",
        );
      }
    },
    [loanId, payoffValues, fetchLoan, fetchSchedule],
  );

  const isLoading = booksLoading || loading;

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 p-6">
        <div className="flex items-center justify-center rounded-lg border border-border bg-card p-8">
          <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (error || !loan) {
    return (
      <div className="flex flex-col gap-6 p-6">
        <Link
          to="/loans"
          className="inline-flex items-center gap-2 text-muted-foreground text-sm hover:text-foreground"
        >
          <ArrowLeftIcon className="size-4" />
          Back to Loans
        </Link>
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive text-sm">
          {error ?? "Loan not found"}
        </div>
      </div>
    );
  }

  const cfg = statusConfig[loan.status];

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Back link and book picker */}
      <div className="flex items-center justify-between">
        <Link
          to="/loans"
          className="inline-flex items-center gap-2 text-muted-foreground text-sm hover:text-foreground"
        >
          <ArrowLeftIcon className="size-4" />
          Back to Loans
        </Link>
        <BookPicker
          books={books}
          selectedBookId={activeBookId}
          onSelect={setActiveBookId}
        />
      </div>

      {/* Loan header */}
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <h1 className="font-bold text-2xl">{loan.name}</h1>
              <span
                className={`rounded-full px-2 py-0.5 text-xs ${cfg.className}`}
              >
                {cfg.label}
              </span>
            </div>
            <div className="flex items-center gap-4 text-muted-foreground text-sm">
              <span>{Number.parseFloat(loan.annualRate).toFixed(2)}% APR</span>
              <span>{loan.termMonths} month term</span>
              <span>Started {loan.startDate}</span>
            </div>
            {loan.notes && (
              <p className="mt-1 text-muted-foreground text-sm">{loan.notes}</p>
            )}
          </div>

          {loan.status === "active" && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePostNext}
                disabled={posting}
                className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90 disabled:opacity-50"
              >
                {posting && <Loader2Icon className="size-4 animate-spin" />}
                Post Next Payment
              </button>
              <button
                type="button"
                onClick={() => setPayoffOpen(true)}
                className="rounded-md border border-border bg-background px-4 py-2 text-sm transition-colors hover:bg-muted"
              >
                Pay Off
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="text-muted-foreground text-sm">
            Original Principal
          </div>
          <div className="mt-1 font-mono font-semibold text-lg">
            {formatCurrency(loan.originalPrincipal)}
          </div>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="text-muted-foreground text-sm">Current Balance</div>
          <div className="mt-1 font-mono font-semibold text-lg">
            {formatCurrency(loan.currentBalance)}
          </div>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="text-muted-foreground text-sm">
            Total Interest Paid
          </div>
          <div className="mt-1 font-mono font-semibold text-lg text-red-600 dark:text-red-400">
            {formatCurrency(summary.totalInterestPaid)}
          </div>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="text-muted-foreground text-sm">
            Interest Remaining
          </div>
          <div className="mt-1 font-mono font-semibold text-lg">
            {formatCurrency(summary.totalInterestRemaining)}
          </div>
        </div>
      </div>

      {/* Balance over time chart */}
      {chartData.length >= 2 && (
        <div className="rounded-lg border border-border bg-card p-4">
          <h2 className="mb-4 font-semibold text-lg">Balance Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dueDate" />
              <YAxis tickFormatter={(value: number) => formatCurrency(value)} />
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
              <Area
                type="monotone"
                dataKey="balance"
                stroke="var(--color-primary-500)"
                fill="var(--color-primary-500)"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Amortization schedule */}
      <div className="rounded-lg border border-border bg-card p-4">
        <h2 className="mb-4 font-semibold text-lg">Amortization Schedule</h2>

        {scheduleLoading && (
          <div className="flex items-center justify-center p-8">
            <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
          </div>
        )}

        {!scheduleLoading && schedule.length === 0 && (
          <p className="text-muted-foreground text-sm">
            No schedule entries yet
          </p>
        )}

        {!scheduleLoading && schedule.length > 0 && (
          <div className="max-h-[500px] overflow-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-card">
                <tr className="border-border border-b bg-muted/50">
                  <th className="px-3 py-2 text-left font-medium text-muted-foreground">
                    #
                  </th>
                  <th className="px-3 py-2 text-left font-medium text-muted-foreground">
                    Due Date
                  </th>
                  <th className="px-3 py-2 text-right font-medium text-muted-foreground">
                    Payment
                  </th>
                  <th className="px-3 py-2 text-right font-medium text-muted-foreground">
                    Principal
                  </th>
                  <th className="px-3 py-2 text-right font-medium text-muted-foreground">
                    Interest
                  </th>
                  <th className="px-3 py-2 text-right font-medium text-muted-foreground">
                    Extra
                  </th>
                  <th className="px-3 py-2 text-right font-medium text-muted-foreground">
                    Balance
                  </th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((entry) => {
                  let rowClass =
                    "border-border border-b transition-colors last:border-b-0";
                  if (entry.status === "posted") {
                    rowClass += " bg-green-50 dark:bg-green-900/10";
                  } else if (entry.status === "skipped") {
                    rowClass +=
                      " bg-gray-50 text-muted-foreground line-through dark:bg-gray-900/10";
                  }

                  return (
                    <tr key={entry.id} className={rowClass}>
                      <td className="px-3 py-2">{entry.sequenceNumber}</td>
                      <td className="px-3 py-2">{entry.dueDate}</td>
                      <td className="px-3 py-2 text-right font-mono">
                        {formatCurrency(entry.paymentAmount)}
                      </td>
                      <td className="px-3 py-2 text-right font-mono">
                        {formatCurrency(entry.principalAmount)}
                      </td>
                      <td className="px-3 py-2 text-right font-mono">
                        {formatCurrency(entry.interestAmount)}
                      </td>
                      <td className="px-3 py-2 text-right font-mono">
                        {Number.parseFloat(entry.extraPrincipal) > 0
                          ? formatCurrency(entry.extraPrincipal)
                          : "-"}
                      </td>
                      <td className="px-3 py-2 text-right font-mono">
                        {formatCurrency(entry.balanceAfter)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Payoff dialog */}
      {payoffOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
            onClick={() => setPayoffOpen(false)}
            aria-label="Close dialog"
          />

          <div className="relative w-full max-w-sm rounded-lg border border-border bg-card p-6 shadow-lg">
            <h2 className="mb-4 font-semibold text-lg">Pay Off Loan</h2>

            <form onSubmit={handlePayoff} className="flex flex-col gap-4">
              <div>
                <label
                  htmlFor="payoff-date"
                  className="mb-1 block font-medium text-sm"
                >
                  Payoff Date *
                </label>
                <input
                  id="payoff-date"
                  type="date"
                  required
                  value={payoffValues.payoffDate}
                  onChange={(e) =>
                    setPayoffValues((v) => ({
                      ...v,
                      payoffDate: e.target.value,
                    }))
                  }
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="payoff-amount"
                  className="mb-1 block font-medium text-sm"
                >
                  Payoff Amount *
                </label>
                <input
                  id="payoff-amount"
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  value={payoffValues.payoffAmount}
                  onChange={(e) =>
                    setPayoffValues((v) => ({
                      ...v,
                      payoffAmount: e.target.value,
                    }))
                  }
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                  placeholder={formatCurrency(loan.currentBalance)}
                />
              </div>

              <div>
                <label
                  htmlFor="payoff-account"
                  className="mb-1 block font-medium text-sm"
                >
                  Payment Account
                </label>
                <select
                  id="payoff-account"
                  value={payoffValues.paymentAccountId}
                  onChange={(e) =>
                    setPayoffValues((v) => ({
                      ...v,
                      paymentAccountId: e.target.value,
                    }))
                  }
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                >
                  <option value="">Use loan default</option>
                  {paymentAccounts.map((a) => (
                    <option key={a.rowId} value={a.rowId}>
                      {a.code} - {a.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setPayoffOpen(false)}
                  className="rounded-md border border-border bg-background px-4 py-2 text-sm transition-colors hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90"
                >
                  Pay Off
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
