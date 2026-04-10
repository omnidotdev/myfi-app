import { createFileRoute, Link } from "@tanstack/react-router";
import { Loader2Icon, PlusIcon, TrashIcon, XIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
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
  createdAt: string;
};

type LoanFormValues = {
  name: string;
  liabilityAccountId: string;
  interestAccountId: string;
  paymentAccountId: string;
  originalPrincipal: string;
  annualRate: string;
  termMonths: string;
  startDate: string;
  paymentDay: string;
  paymentAmount: string;
  extraPrincipal: string;
  notes: string;
};

const emptyForm: LoanFormValues = {
  name: "",
  liabilityAccountId: "",
  interestAccountId: "",
  paymentAccountId: "",
  originalPrincipal: "",
  annualRate: "",
  termMonths: "",
  startDate: "",
  paymentDay: "1",
  paymentAmount: "",
  extraPrincipal: "",
  notes: "",
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

export const Route = createFileRoute("/_app/loans/")({
  component: LoansPage,
});

function LoansPage() {
  const {
    activeBookId,
    books,
    isLoading: booksLoading,
    setActiveBookId,
  } = useActiveBook();

  const [loans, setLoans] = useState<Loan[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [formValues, setFormValues] = useState<LoanFormValues>(emptyForm);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const fetchLoans = useCallback(async () => {
    if (!activeBookId) return;

    setIsLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/loans?bookId=${activeBookId}`);
      const data = await res.json();

      setLoans(data.loans ?? []);
    } catch {
      // Silently handle fetch errors
    } finally {
      setIsLoading(false);
    }
  }, [activeBookId]);

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
    fetchLoans();
    fetchAccounts();
  }, [fetchLoans, fetchAccounts]);

  const liabilityAccounts = accounts.filter((a) => a.type === "liability");
  const expenseAccounts = accounts.filter((a) => a.type === "expense");
  const paymentAccounts = accounts.filter(
    (a) => a.type === "asset" && !a.isPlaceholder,
  );

  const openCreateForm = useCallback(() => {
    setFormValues(emptyForm);
    setFormOpen(true);
  }, []);

  const closeForm = useCallback(() => {
    setFormOpen(false);
    setFormValues(emptyForm);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!formValues.name.trim() || !activeBookId) return;

      const payload: Record<string, unknown> = {
        bookId: activeBookId,
        name: formValues.name.trim(),
        liabilityAccountId: formValues.liabilityAccountId,
        interestAccountId: formValues.interestAccountId,
        paymentAccountId: formValues.paymentAccountId,
        originalPrincipal: formValues.originalPrincipal,
        annualRate: formValues.annualRate,
        termMonths: Number.parseInt(formValues.termMonths, 10),
        startDate: formValues.startDate,
        paymentDay: Number.parseInt(formValues.paymentDay, 10),
      };

      if (formValues.paymentAmount)
        payload.paymentAmount = formValues.paymentAmount;
      if (formValues.extraPrincipal)
        payload.extraPrincipal = formValues.extraPrincipal;
      if (formValues.notes.trim()) payload.notes = formValues.notes.trim();

      try {
        const res = await fetch(`${API_URL}/api/loans`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error ?? "Failed to create loan");
        }

        toast.success("Loan created");
        await fetchLoans();
        closeForm();
      } catch (err) {
        toast.error(
          err instanceof Error ? err.message : "Failed to create loan",
        );
      }
    },
    [activeBookId, formValues, fetchLoans, closeForm],
  );

  const handleDelete = useCallback(
    async (loanId: string) => {
      try {
        const res = await fetch(`${API_URL}/api/loans/${loanId}`, {
          method: "DELETE",
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(
            data.error ?? "Cannot delete loan with posted entries",
          );
        }

        toast.success("Loan deleted");
        setDeleteConfirmId(null);
        await fetchLoans();
      } catch (err) {
        toast.error(
          err instanceof Error ? err.message : "Failed to delete loan",
        );
        setDeleteConfirmId(null);
      }
    },
    [fetchLoans],
  );

  const loading = booksLoading || isLoading;

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="font-bold text-2xl">Loans</h1>
          <p className="text-muted-foreground text-sm">
            Track loans, amortization schedules, and payments
          </p>
        </div>

        <div className="flex items-center gap-3">
          <BookPicker
            books={books}
            selectedBookId={activeBookId}
            onSelect={setActiveBookId}
          />

          <button
            type="button"
            onClick={openCreateForm}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90"
          >
            <PlusIcon className="size-4" />
            New Loan
          </button>
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center rounded-lg border border-border bg-card p-8">
          <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
        </div>
      )}

      {/* Empty state */}
      {!loading && loans.length === 0 && (
        <div className="rounded-lg border border-border bg-card p-8 text-center">
          <p className="text-muted-foreground">
            No loans yet. Create your first loan to start tracking amortization
            and payments.
          </p>
        </div>
      )}

      {/* Loans table */}
      {!loading && loans.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-border bg-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-border border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Name
                </th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                  Original Principal
                </th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                  Current Balance
                </th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                  Rate
                </th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                  Term
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Status
                </th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan) => {
                const cfg = statusConfig[loan.status];

                return (
                  <tr
                    key={loan.id}
                    className="border-border border-b transition-colors last:border-b-0 hover:bg-muted/30"
                  >
                    <td className="px-4 py-3">
                      <Link
                        to="/loans/$loanId"
                        params={{ loanId: loan.id }}
                        className="font-medium text-primary hover:underline"
                      >
                        {loan.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-right font-mono">
                      {formatCurrency(loan.originalPrincipal)}
                    </td>
                    <td className="px-4 py-3 text-right font-mono">
                      {formatCurrency(loan.currentBalance)}
                    </td>
                    <td className="px-4 py-3 text-right font-mono">
                      {Number.parseFloat(loan.annualRate).toFixed(2)}%
                    </td>
                    <td className="px-4 py-3 text-right">
                      {loan.termMonths} mo
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs ${cfg.className}`}
                      >
                        {cfg.label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        {deleteConfirmId === loan.id ? (
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleDelete(loan.id)}
                              className="rounded bg-destructive px-2 py-1 text-destructive-foreground text-xs"
                            >
                              Confirm
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeleteConfirmId(null)}
                              className="rounded p-1 text-muted-foreground hover:text-foreground"
                            >
                              <XIcon className="size-3" />
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setDeleteConfirmId(loan.id)}
                            className="rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-destructive"
                            title="Delete"
                          >
                            <TrashIcon className="size-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Create form dialog */}
      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
            onClick={closeForm}
            aria-label="Close dialog"
          />

          <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg border border-border bg-card p-6 shadow-lg">
            <h2 className="mb-4 font-semibold text-lg">New Loan</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label
                  htmlFor="loan-name"
                  className="mb-1 block font-medium text-sm"
                >
                  Name *
                </label>
                <input
                  id="loan-name"
                  type="text"
                  required
                  value={formValues.name}
                  onChange={(e) =>
                    setFormValues((v) => ({ ...v, name: e.target.value }))
                  }
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                  placeholder="e.g. Auto Loan"
                />
              </div>

              <div>
                <label
                  htmlFor="loan-liability"
                  className="mb-1 block font-medium text-sm"
                >
                  Liability Account *
                </label>
                <select
                  id="loan-liability"
                  required
                  value={formValues.liabilityAccountId}
                  onChange={(e) =>
                    setFormValues((v) => ({
                      ...v,
                      liabilityAccountId: e.target.value,
                    }))
                  }
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                >
                  <option value="">Select liability account</option>
                  {liabilityAccounts.map((a) => (
                    <option key={a.rowId} value={a.rowId}>
                      {a.code} - {a.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="loan-interest"
                  className="mb-1 block font-medium text-sm"
                >
                  Interest Expense Account *
                </label>
                <select
                  id="loan-interest"
                  required
                  value={formValues.interestAccountId}
                  onChange={(e) =>
                    setFormValues((v) => ({
                      ...v,
                      interestAccountId: e.target.value,
                    }))
                  }
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                >
                  <option value="">Select interest expense account</option>
                  {expenseAccounts.map((a) => (
                    <option key={a.rowId} value={a.rowId}>
                      {a.code} - {a.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="loan-payment"
                  className="mb-1 block font-medium text-sm"
                >
                  Payment (Bank) Account *
                </label>
                <select
                  id="loan-payment"
                  required
                  value={formValues.paymentAccountId}
                  onChange={(e) =>
                    setFormValues((v) => ({
                      ...v,
                      paymentAccountId: e.target.value,
                    }))
                  }
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                >
                  <option value="">Select payment account</option>
                  {paymentAccounts.map((a) => (
                    <option key={a.rowId} value={a.rowId}>
                      {a.code} - {a.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="loan-principal"
                    className="mb-1 block font-medium text-sm"
                  >
                    Original Principal *
                  </label>
                  <input
                    id="loan-principal"
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    value={formValues.originalPrincipal}
                    onChange={(e) =>
                      setFormValues((v) => ({
                        ...v,
                        originalPrincipal: e.target.value,
                      }))
                    }
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                    placeholder="25000.00"
                  />
                </div>
                <div>
                  <label
                    htmlFor="loan-rate"
                    className="mb-1 block font-medium text-sm"
                  >
                    Annual Rate (%) *
                  </label>
                  <input
                    id="loan-rate"
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    value={formValues.annualRate}
                    onChange={(e) =>
                      setFormValues((v) => ({
                        ...v,
                        annualRate: e.target.value,
                      }))
                    }
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                    placeholder="5.25"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label
                    htmlFor="loan-term"
                    className="mb-1 block font-medium text-sm"
                  >
                    Term (months) *
                  </label>
                  <input
                    id="loan-term"
                    type="number"
                    min="1"
                    required
                    value={formValues.termMonths}
                    onChange={(e) =>
                      setFormValues((v) => ({
                        ...v,
                        termMonths: e.target.value,
                      }))
                    }
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                    placeholder="60"
                  />
                </div>
                <div>
                  <label
                    htmlFor="loan-start"
                    className="mb-1 block font-medium text-sm"
                  >
                    Start Date *
                  </label>
                  <input
                    id="loan-start"
                    type="date"
                    required
                    value={formValues.startDate}
                    onChange={(e) =>
                      setFormValues((v) => ({
                        ...v,
                        startDate: e.target.value,
                      }))
                    }
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="loan-payday"
                    className="mb-1 block font-medium text-sm"
                  >
                    Payment Day *
                  </label>
                  <input
                    id="loan-payday"
                    type="number"
                    min="1"
                    max="28"
                    required
                    value={formValues.paymentDay}
                    onChange={(e) =>
                      setFormValues((v) => ({
                        ...v,
                        paymentDay: e.target.value,
                      }))
                    }
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                    placeholder="1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="loan-custom-payment"
                    className="mb-1 block font-medium text-sm"
                  >
                    Custom Payment
                  </label>
                  <input
                    id="loan-custom-payment"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formValues.paymentAmount}
                    onChange={(e) =>
                      setFormValues((v) => ({
                        ...v,
                        paymentAmount: e.target.value,
                      }))
                    }
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                    placeholder="Optional override"
                  />
                </div>
                <div>
                  <label
                    htmlFor="loan-extra"
                    className="mb-1 block font-medium text-sm"
                  >
                    Extra Principal
                  </label>
                  <input
                    id="loan-extra"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formValues.extraPrincipal}
                    onChange={(e) =>
                      setFormValues((v) => ({
                        ...v,
                        extraPrincipal: e.target.value,
                      }))
                    }
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="loan-notes"
                  className="mb-1 block font-medium text-sm"
                >
                  Notes
                </label>
                <textarea
                  id="loan-notes"
                  value={formValues.notes}
                  onChange={(e) =>
                    setFormValues((v) => ({ ...v, notes: e.target.value }))
                  }
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                  rows={3}
                  placeholder="Optional notes"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={closeForm}
                  className="rounded-md border border-border bg-background px-4 py-2 text-sm transition-colors hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
