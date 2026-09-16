import { createFileRoute } from "@tanstack/react-router";
import { Loader2Icon, PlayIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import ConfirmDialog from "@/components/ConfirmDialog";
import EmptyState from "@/components/EmptyState";
import BookPicker from "@/features/books/components/BookPicker";
import type { InvoiceAccount } from "@/features/invoicing/types/invoicing";
import { apiFetch } from "@/lib/api/apiFetch";
import formatCurrency from "@/lib/format/currency";
import useActiveBook from "@/lib/hooks/useActiveBook";

export const Route = createFileRoute("/_app/@{$workspaceSlug}/~/recurring/")({
  component: RecurringPage,
});

interface RecurringTransaction {
  id: string;
  bookId: string;
  name: string;
  amount: string;
  frequency: string;
  accountId: string;
  counterAccountId: string | null;
  isActive: boolean;
  nextExpectedDate: string | null;
}

const FREQUENCIES = [
  { value: "weekly", label: "Weekly" },
  { value: "biweekly", label: "Every 2 weeks" },
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" },
  { value: "yearly", label: "Yearly" },
] as const;

const frequencyLabel = (value: string) =>
  FREQUENCIES.find((f) => f.value === value)?.label ?? value;

const today = () => new Date().toISOString().slice(0, 10);

const toDay = (value: string | null) => (value ? value.slice(0, 10) : "-");

const inputClass =
  "rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50";

function RecurringPage() {
  const {
    activeBookId,
    books,
    isLoading: booksLoading,
    setActiveBookId,
  } = useActiveBook();

  const [items, setItems] = useState<RecurringTransaction[]>([]);
  const [accounts, setAccounts] = useState<InvoiceAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);

  const [createOpen, setCreateOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    amount: "0",
    frequency: "monthly",
    accountId: "",
    counterAccountId: "",
    nextExpectedDate: today(),
  });

  const [deleting, setDeleting] = useState<RecurringTransaction | null>(null);
  const [deletingBusy, setDeletingBusy] = useState(false);

  const accountLabel = useCallback(
    (id: string | null) => {
      if (!id) return "-";
      const account = accounts.find((a) => a.id === id);
      return account ? account.name : "-";
    },
    [accounts],
  );

  const fetchData = useCallback(async () => {
    if (!activeBookId) return;
    setIsLoading(true);
    try {
      const [recRes, acctRes] = await Promise.all([
        apiFetch(`/api/recurring-transactions?bookId=${activeBookId}`),
        apiFetch(`/api/accounts?bookId=${activeBookId}`),
      ]);
      const [recData, acctData] = await Promise.all([
        recRes.json(),
        acctRes.json(),
      ]);
      setItems(recData.recurringTransactions ?? []);
      setAccounts(acctData.accounts ?? []);
    } catch {
      toast.error("Could not load recurring transactions");
    } finally {
      setIsLoading(false);
    }
  }, [activeBookId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCreate = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!activeBookId) return;
      setSaving(true);
      try {
        const res = await apiFetch("/api/recurring-transactions", {
          method: "POST",
          body: JSON.stringify({
            bookId: activeBookId,
            name: form.name,
            amount: String(Number.parseFloat(form.amount) || 0),
            frequency: form.frequency,
            accountId: form.accountId,
            counterAccountId: form.counterAccountId || undefined,
            nextExpectedDate: form.nextExpectedDate,
          }),
        });
        if (!res.ok) throw new Error("Create failed");
        toast.success("Recurring transaction created");
        setCreateOpen(false);
        setForm({
          name: "",
          amount: "0",
          frequency: "monthly",
          accountId: "",
          counterAccountId: "",
          nextExpectedDate: today(),
        });
        await fetchData();
      } catch {
        toast.error("Could not create the recurring transaction");
      } finally {
        setSaving(false);
      }
    },
    [activeBookId, form, fetchData],
  );

  const toggleActive = useCallback(
    async (item: RecurringTransaction) => {
      if (!activeBookId) return;
      setBusyId(item.id);
      try {
        const res = await apiFetch(`/api/recurring-transactions/${item.id}`, {
          method: "PATCH",
          body: JSON.stringify({
            bookId: activeBookId,
            isActive: !item.isActive,
          }),
        });
        if (!res.ok) throw new Error("Update failed");
        toast.success(item.isActive ? "Paused" : "Resumed");
        await fetchData();
      } catch {
        toast.error("Could not update the recurring transaction");
      } finally {
        setBusyId(null);
      }
    },
    [activeBookId, fetchData],
  );

  const runNow = useCallback(
    async (item: RecurringTransaction) => {
      if (!activeBookId) return;
      setBusyId(item.id);
      try {
        const res = await apiFetch(
          `/api/recurring-transactions/${item.id}/run`,
          {
            method: "POST",
            body: JSON.stringify({ bookId: activeBookId }),
          },
        );
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error ?? "Run failed");
        }
        const data = await res.json();
        const posted = data.posted ?? 0;
        toast.success(
          posted > 0
            ? `Posted ${posted} entr${posted === 1 ? "y" : "ies"}`
            : "Nothing due",
        );
        await fetchData();
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Run failed");
      } finally {
        setBusyId(null);
      }
    },
    [activeBookId, fetchData],
  );

  const confirmDelete = useCallback(async () => {
    if (!deleting) return;
    setDeletingBusy(true);
    try {
      const res = await apiFetch(`/api/recurring-transactions/${deleting.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      toast.success("Recurring transaction deleted");
      setDeleting(null);
      await fetchData();
    } catch {
      toast.error("Could not delete the recurring transaction");
    } finally {
      setDeletingBusy(false);
    }
  }, [deleting, fetchData]);

  const loading = booksLoading || isLoading;
  const canCreate = form.name && form.accountId && form.counterAccountId;

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">Recurring Transactions</h1>
          <p className="text-muted-foreground text-sm">
            Memorized entries that post on a schedule
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
            onClick={() => setCreateOpen(true)}
            disabled={!activeBookId}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90 disabled:opacity-50"
          >
            <PlusIcon className="size-4" />
            New Recurring
          </button>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center rounded-lg border border-border bg-card p-8">
          <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
        </div>
      )}

      {!loading && items.length === 0 && (
        <EmptyState
          title="No recurring transactions yet"
          description="Set up a memorized entry to post rent, subscriptions, or other regular items automatically."
        />
      )}

      {!loading && items.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="border-border border-b text-left text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Frequency</th>
                <th className="px-4 py-3 text-right font-medium">Amount</th>
                <th className="px-4 py-3 font-medium">Posts To</th>
                <th className="px-4 py-3 font-medium">Next Date</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr
                  key={item.id}
                  className="border-border/50 border-b last:border-0"
                >
                  <td className="px-4 py-3 font-medium">{item.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {frequencyLabel(item.frequency)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {formatCurrency(item.amount)}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {accountLabel(item.accountId)}
                    {" / "}
                    {accountLabel(item.counterAccountId)}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {toDay(item.nextExpectedDate)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        item.isActive
                          ? "rounded-full bg-primary/10 px-2 py-0.5 text-primary text-xs"
                          : "rounded-full bg-muted px-2 py-0.5 text-muted-foreground text-xs"
                      }
                    >
                      {item.isActive ? "Active" : "Paused"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      {busyId === item.id && (
                        <Loader2Icon className="size-4 animate-spin text-muted-foreground" />
                      )}
                      <button
                        type="button"
                        disabled={busyId === item.id || !item.counterAccountId}
                        onClick={() => runNow(item)}
                        title="Post any due occurrences now"
                        className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1 text-xs transition-colors hover:bg-accent disabled:opacity-50"
                      >
                        <PlayIcon className="size-3" />
                        Run
                      </button>
                      <button
                        type="button"
                        disabled={busyId === item.id}
                        onClick={() => toggleActive(item)}
                        className="rounded-md border border-border px-2.5 py-1 text-xs transition-colors hover:bg-accent disabled:opacity-50"
                      >
                        {item.isActive ? "Pause" : "Resume"}
                      </button>
                      <button
                        type="button"
                        disabled={busyId === item.id}
                        onClick={() => setDeleting(item)}
                        aria-label={`Delete ${item.name}`}
                        className="rounded-md border border-border p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-destructive disabled:opacity-50"
                      >
                        <Trash2Icon className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {createOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4">
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
            onClick={() => setCreateOpen(false)}
            aria-label="Close dialog"
          />
          <div className="relative my-8 w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-lg">
            <h2 className="mb-4 font-semibold text-lg">
              New Recurring Transaction
            </h2>
            <form onSubmit={handleCreate} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="rec-name" className="font-medium text-sm">
                  Name
                </label>
                <input
                  id="rec-name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="rec-amount" className="font-medium text-sm">
                    Amount
                  </label>
                  <input
                    id="rec-amount"
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.amount}
                    onChange={(e) =>
                      setForm({ ...form, amount: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="rec-freq" className="font-medium text-sm">
                    Frequency
                  </label>
                  <select
                    id="rec-freq"
                    value={form.frequency}
                    onChange={(e) =>
                      setForm({ ...form, frequency: e.target.value })
                    }
                    className={inputClass}
                  >
                    {FREQUENCIES.map((f) => (
                      <option key={f.value} value={f.value}>
                        {f.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="rec-account" className="font-medium text-sm">
                  Debit Account
                </label>
                <select
                  id="rec-account"
                  required
                  value={form.accountId}
                  onChange={(e) =>
                    setForm({ ...form, accountId: e.target.value })
                  }
                  className={inputClass}
                >
                  <option value="" disabled>
                    Select an account
                  </option>
                  {accounts.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.code ? `${a.code} - ` : ""}
                      {a.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="rec-counter" className="font-medium text-sm">
                  Credit Account
                </label>
                <select
                  id="rec-counter"
                  required
                  value={form.counterAccountId}
                  onChange={(e) =>
                    setForm({ ...form, counterAccountId: e.target.value })
                  }
                  className={inputClass}
                >
                  <option value="" disabled>
                    Select an account
                  </option>
                  {accounts.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.code ? `${a.code} - ` : ""}
                      {a.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="rec-next" className="font-medium text-sm">
                  Next Date
                </label>
                <input
                  id="rec-next"
                  type="date"
                  required
                  value={form.nextExpectedDate}
                  onChange={(e) =>
                    setForm({ ...form, nextExpectedDate: e.target.value })
                  }
                  className={inputClass}
                />
              </div>
              <div className="mt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setCreateOpen(false)}
                  className="rounded-md border border-border px-4 py-2 text-sm transition-colors hover:bg-accent"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving || !canCreate}
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90 disabled:opacity-50"
                >
                  {saving && <Loader2Icon className="size-4 animate-spin" />}
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={deleting != null}
        title="Delete recurring transaction?"
        description={
          deleting
            ? `"${deleting.name}" will be removed. Entries already posted are kept. This cannot be undone.`
            : undefined
        }
        confirmLabel="Delete"
        destructive
        loading={deletingBusy}
        onConfirm={confirmDelete}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
}
