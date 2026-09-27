import { createFileRoute, Link } from "@tanstack/react-router";
import { Loader2Icon, PlusIcon, TrashIcon, XIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import ConfirmDialog from "@/components/ConfirmDialog";
import type { Account } from "@/features/accounts/types/account";
import BookPicker from "@/features/books/components/BookPicker";
import { buildLiabilityAccountPayload } from "@/features/loans/lib/buildLiabilityAccountPayload";
import { pickDefaultPaymentAccount } from "@/features/loans/lib/pickDefaultPaymentAccount";
import { apiFetch } from "@/lib/api/apiFetch";
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

export const Route = createFileRoute("/_app/@{$workspaceSlug}/~/loans/")({
  component: LoansPage,
});

function LoansPage() {
  const { workspaceSlug } = Route.useParams();
  const {
    activeBook,
    activeBookId,
    books,
    isLoading: booksLoading,
    setActiveBookId,
  } = useActiveBook();
  const isPersonal = activeBook?.type === "personal";

  const [loans, setLoans] = useState<Loan[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [formValues, setFormValues] = useState<LoanFormValues>(emptyForm);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [showNewDebt, setShowNewDebt] = useState(false);
  const [newDebtName, setNewDebtName] = useState("");
  const [creatingDebt, setCreatingDebt] = useState(false);

  // Simple debts (a liability tracked as a balance) for personal books
  const [debts, setDebts] = useState<
    { id: string; name: string; balance: number }[]
  >([]);
  const [showAddDebt, setShowAddDebt] = useState(false);
  const [debtName, setDebtName] = useState("");
  const [debtAmount, setDebtAmount] = useState("");
  const [savingDebt, setSavingDebt] = useState(false);
  const [payingDebt, setPayingDebt] = useState<{
    id: string;
    name: string;
    balance: number;
  } | null>(null);
  const [payAmount, setPayAmount] = useState("");
  const [payFrom, setPayFrom] = useState("");
  const [savingPayment, setSavingPayment] = useState(false);
  const [removingDebt, setRemovingDebt] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [removingBusy, setRemovingBusy] = useState(false);

  const fetchLoans = useCallback(async () => {
    if (!activeBookId) return;

    setIsLoading(true);

    try {
      const res = await apiFetch(`/api/loans?bookId=${activeBookId}`);
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
      const res = await apiFetch(`/api/accounts?bookId=${activeBookId}`);
      const data = await res.json();

      // The API returns accounts keyed by `id`; the UI (and Account type) use
      // `rowId`, so map it. Without this the account <select> options carry no
      // value and a loan cannot be created
      const mapped = (data.accounts ?? []).map(
        (a: Record<string, unknown>) => ({ ...a, rowId: a.id as string }),
      );

      setAccounts(mapped);
    } catch {
      // Silently handle fetch errors
    }
  }, [activeBookId]);

  const fetchDebts = useCallback(async () => {
    if (!activeBookId) return;
    try {
      const res = await apiFetch(`/api/debts?bookId=${activeBookId}`);
      const data = await res.json();
      setDebts(data.debts ?? []);
    } catch {
      // Silently handle fetch errors
    }
  }, [activeBookId]);

  useEffect(() => {
    fetchLoans();
    fetchAccounts();
    fetchDebts();
  }, [fetchLoans, fetchAccounts, fetchDebts]);

  const addDebt = useCallback(async () => {
    if (!activeBookId || !debtName.trim()) return;
    setSavingDebt(true);
    try {
      const res = await apiFetch("/api/debts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookId: activeBookId,
          name: debtName.trim(),
          amount: debtAmount.trim() || "0",
        }),
      });
      if (!res.ok) throw new Error("Create failed");
      toast.success("Debt added");
      setShowAddDebt(false);
      setDebtName("");
      setDebtAmount("");
      await fetchDebts();
    } catch {
      toast.error("Could not add the debt");
    } finally {
      setSavingDebt(false);
    }
  }, [activeBookId, debtName, debtAmount, fetchDebts]);

  const openPayDebt = useCallback(
    (debt: { id: string; name: string; balance: number }) => {
      setPayingDebt(debt);
      setPayAmount(debt.balance > 0 ? String(debt.balance) : "");
      setPayFrom("");
    },
    [],
  );

  const recordPayment = useCallback(async () => {
    if (!activeBookId || !payingDebt) return;
    setSavingPayment(true);
    try {
      const res = await apiFetch(`/api/debts/${payingDebt.id}/payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookId: activeBookId,
          amount: payAmount.trim(),
          ...(payFrom ? { fromAccountId: payFrom } : {}),
        }),
      });
      if (!res.ok) throw new Error("Payment failed");
      toast.success("Payment recorded");
      setPayingDebt(null);
      await fetchDebts();
    } catch {
      toast.error("Could not record the payment");
    } finally {
      setSavingPayment(false);
    }
  }, [activeBookId, payingDebt, payAmount, payFrom, fetchDebts]);

  const removeDebt = useCallback(async () => {
    if (!activeBookId || !removingDebt) return;
    setRemovingBusy(true);
    try {
      const res = await apiFetch(
        `/api/debts/${removingDebt.id}?bookId=${activeBookId}`,
        { method: "DELETE" },
      );
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Remove failed");
      }
      toast.success("Debt removed");
      setRemovingDebt(null);
      await fetchDebts();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not remove");
    } finally {
      setRemovingBusy(false);
    }
  }, [activeBookId, removingDebt, fetchDebts]);

  // Only surface debts you actually owe: a non-zero balance, and not the
  // liability behind an amortizing loan (those show in the loans list below)
  const loanLiabilityIds = new Set(loans.map((l) => l.liabilityAccountId));
  const owedDebts = debts.filter(
    (d) => d.balance > 0.005 && !loanLiabilityIds.has(d.id),
  );

  const liabilityAccounts = accounts.filter((a) => a.type === "liability");
  const expenseAccounts = accounts.filter((a) => a.type === "expense");
  const paymentAccounts = accounts.filter(
    (a) => a.type === "asset" && !a.isPlaceholder,
  );

  // Create a liability account for a debt inline, so a personal user can add
  // "Loan from John" without leaving the loan form (the accounts page is hidden
  // in the simplified personal nav)
  const createDebtAccount = useCallback(async () => {
    const payload = buildLiabilityAccountPayload({
      bookId: activeBookId ?? "",
      name: newDebtName,
    });
    if (!payload) return;

    setCreatingDebt(true);
    try {
      const res = await apiFetch("/api/accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Create failed");

      const account = await res.json();
      const newId = (account?.id ?? account?.rowId) as string | undefined;

      await fetchAccounts();

      if (newId) {
        setFormValues((v) => ({ ...v, liabilityAccountId: newId }));
      }
      setNewDebtName("");
      setShowNewDebt(false);
      toast.success("Debt account created");
    } catch {
      toast.error("Could not create the debt account");
    } finally {
      setCreatingDebt(false);
    }
  }, [activeBookId, newDebtName, fetchAccounts]);

  const openCreateForm = useCallback(() => {
    // For personal books, prefill sensible defaults so an informal debt is
    // quick to enter: 0% interest, starting today, paid from the primary cash
    // account. The user just adds a name, the debt account, a balance, and how
    // many months to pay it off. All overridable
    setFormValues({
      ...emptyForm,
      ...(isPersonal
        ? {
            paymentAccountId: pickDefaultPaymentAccount(accounts),
            // Interest is hidden for a 0% personal debt but still required by
            // the API, so default it to any expense account (never posted to
            // while the rate is 0); the field appears if the rate is raised
            interestAccountId:
              accounts.find((a) => a.type === "expense")?.rowId ?? "",
            annualRate: "0",
            startDate: new Date().toISOString().slice(0, 10),
          }
        : {}),
    });
    setShowNewDebt(false);
    setNewDebtName("");
    setFormOpen(true);
  }, [isPersonal, accounts]);

  const closeForm = useCallback(() => {
    setFormOpen(false);
    setFormValues(emptyForm);
    setShowNewDebt(false);
    setNewDebtName("");
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
        const res = await apiFetch(`/api/loans`, {
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
        const res = await apiFetch(`/api/loans/${loanId}`, {
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
          <h1 className="font-bold text-2xl">
            {isPersonal ? "Debts & Loans" : "Loans"}
          </h1>
          <p className="text-muted-foreground text-sm">
            {isPersonal
              ? "Track what you owe, from informal IOUs to amortizing loans"
              : "Track loans, amortization schedules, and payments"}
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

      {/* Simple debts (personal): a balance you owe, no schedule needed */}
      {isPersonal && (
        <div className="rounded-lg border border-border bg-card">
          <div className="flex items-center justify-between border-border border-b p-4">
            <div>
              <h2 className="font-semibold">What you owe</h2>
              <p className="text-muted-foreground text-sm">
                Simple debts, like money you owe a person. Just a name and a
                balance
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowAddDebt(true)}
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-md border border-border px-3 py-2 font-medium text-sm transition-colors hover:bg-accent"
            >
              <PlusIcon className="size-4" />
              Add a debt
            </button>
          </div>

          {owedDebts.length === 0 ? (
            <p className="p-4 text-muted-foreground text-sm">
              No debts yet. Add one to start tracking what you owe.
            </p>
          ) : (
            <ul className="divide-y divide-border">
              {owedDebts.map((d) => (
                <li
                  key={d.id}
                  className="flex items-center justify-between gap-3 px-4 py-3"
                >
                  <span className="min-w-0 truncate">{d.name}</span>
                  <div className="flex shrink-0 items-center gap-2">
                    <span className="mr-1 font-medium font-mono">
                      {formatCurrency(d.balance)}
                    </span>
                    <button
                      type="button"
                      onClick={() => openPayDebt(d)}
                      className="rounded-md border border-border px-2.5 py-1 text-xs transition-colors hover:bg-accent"
                    >
                      Pay
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setRemovingDebt({ id: d.id, name: d.name })
                      }
                      aria-label={`Remove ${d.name}`}
                      className="rounded-md border border-border p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                    >
                      <TrashIcon className="size-3.5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

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
                        to="/@{$workspaceSlug}/~/loans/$loanId"
                        params={{ workspaceSlug, loanId: loan.id }}
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
                <div className="mb-1 flex items-center justify-between gap-2">
                  <label
                    htmlFor="loan-liability"
                    className="block font-medium text-sm"
                  >
                    {isPersonal
                      ? "Debt (what you owe) *"
                      : "Liability Account *"}
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowNewDebt((s) => !s)}
                    className="text-primary text-xs hover:underline"
                  >
                    {showNewDebt ? "Cancel" : "+ New"}
                  </button>
                </div>

                {showNewDebt ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={newDebtName}
                      onChange={(e) => setNewDebtName(e.target.value)}
                      placeholder={
                        isPersonal
                          ? "e.g. Loan from John"
                          : "New liability name"
                      }
                      className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                    />
                    <button
                      type="button"
                      onClick={createDebtAccount}
                      disabled={creatingDebt || !newDebtName.trim()}
                      className="inline-flex items-center gap-2 whitespace-nowrap rounded-md bg-primary px-3 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90 disabled:opacity-50"
                    >
                      {creatingDebt && (
                        <Loader2Icon className="size-4 animate-spin" />
                      )}
                      Add
                    </button>
                  </div>
                ) : (
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
                    <option value="">
                      {isPersonal
                        ? "Select a debt"
                        : "Select liability account"}
                    </option>
                    {liabilityAccounts.map((a) => (
                      <option key={a.rowId} value={a.rowId}>
                        {a.code ? `${a.code} - ` : ""}
                        {a.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Interest only matters when there is a rate; hide it for a 0%
                  personal debt (it is prefilled to an unused expense account) */}
              {!(
                isPersonal &&
                Number.parseFloat(formValues.annualRate || "0") === 0
              ) && (
                <div>
                  <label
                    htmlFor="loan-interest"
                    className="mb-1 block font-medium text-sm"
                  >
                    {isPersonal
                      ? "Interest goes to (expense) *"
                      : "Interest Expense Account *"}
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
                        {a.code ? `${a.code} - ` : ""}
                        {a.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label
                  htmlFor="loan-payment"
                  className="mb-1 block font-medium text-sm"
                >
                  {isPersonal ? "Pay from *" : "Payment (Bank) Account *"}
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

      {/* Add a debt (simple): name + balance, no schedule */}
      {showAddDebt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Close"
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowAddDebt(false)}
          />
          <div className="relative w-full max-w-sm rounded-lg border border-border bg-card p-6 shadow-lg">
            <h2 className="mb-1 font-semibold text-lg">Add a debt</h2>
            <p className="mb-4 text-muted-foreground text-sm">
              What you owe, tracked as a balance. No payment account or schedule
              needed.
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="debt-name" className="font-medium text-sm">
                  Who / what
                </label>
                <input
                  id="debt-name"
                  type="text"
                  value={debtName}
                  onChange={(e) => setDebtName(e.target.value)}
                  placeholder="e.g. Loan from John"
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="debt-amount" className="font-medium text-sm">
                  Amount owed
                </label>
                <input
                  id="debt-amount"
                  type="number"
                  min="0"
                  step="0.01"
                  value={debtAmount}
                  onChange={(e) => setDebtAmount(e.target.value)}
                  placeholder="500.00"
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                />
              </div>
              <div className="mt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddDebt(false)}
                  className="rounded-md border border-border px-4 py-2 text-sm transition-colors hover:bg-accent"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={addDebt}
                  disabled={savingDebt || !debtName.trim()}
                  className="inline-flex items-center gap-2 whitespace-nowrap rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90 disabled:opacity-50"
                >
                  {savingDebt && (
                    <Loader2Icon className="size-4 animate-spin" />
                  )}
                  Add debt
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Record a payment against a debt */}
      {payingDebt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Close"
            className="absolute inset-0 bg-black/50"
            onClick={() => setPayingDebt(null)}
          />
          <div className="relative w-full max-w-sm rounded-lg border border-border bg-card p-6 shadow-lg">
            <h2 className="mb-1 font-semibold text-lg">Record a payment</h2>
            <p className="mb-4 text-muted-foreground text-sm">
              {payingDebt.name} &middot; balance{" "}
              {formatCurrency(payingDebt.balance)}
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="pay-amount" className="font-medium text-sm">
                  Amount
                </label>
                <input
                  id="pay-amount"
                  type="number"
                  min="0"
                  step="0.01"
                  value={payAmount}
                  onChange={(e) => setPayAmount(e.target.value)}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="pay-from" className="font-medium text-sm">
                  Paid from (optional)
                </label>
                <select
                  id="pay-from"
                  value={payFrom}
                  onChange={(e) => setPayFrom(e.target.value)}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                >
                  <option value="">Don't track a source</option>
                  {paymentAccounts.map((a) => (
                    <option key={a.rowId} value={a.rowId}>
                      {a.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setPayingDebt(null)}
                  className="rounded-md border border-border px-4 py-2 text-sm transition-colors hover:bg-accent"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={recordPayment}
                  disabled={
                    savingPayment || !(Number.parseFloat(payAmount) > 0)
                  }
                  className="inline-flex items-center gap-2 whitespace-nowrap rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90 disabled:opacity-50"
                >
                  {savingPayment && (
                    <Loader2Icon className="size-4 animate-spin" />
                  )}
                  Record payment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={removingDebt !== null}
        title="Remove this debt?"
        description={
          removingDebt
            ? `"${removingDebt.name}" and its recorded balance and payments will be removed. This cannot be undone.`
            : undefined
        }
        confirmLabel="Remove"
        destructive
        loading={removingBusy}
        onConfirm={removeDebt}
        onCancel={() => setRemovingDebt(null)}
      />
    </div>
  );
}
