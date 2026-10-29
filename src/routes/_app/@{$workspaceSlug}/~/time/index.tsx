import { createFileRoute } from "@tanstack/react-router";
import { Loader2Icon, Trash2Icon } from "lucide-react";
import { useCallback, useEffect, useId, useState } from "react";
import { toast } from "sonner";

import ConfirmDialog from "@/components/ConfirmDialog";
import Dialog from "@/components/Dialog";
import EmptyState from "@/components/EmptyState";
import LoadError from "@/components/LoadError";
import BookPicker from "@/features/books/components/BookPicker";
import type {
  Customer,
  InvoiceAccount,
} from "@/features/invoicing/types/invoicing";
import { apiFetch } from "@/lib/api/apiFetch";
import formatCurrency from "@/lib/format/currency";
import useActiveBook from "@/lib/hooks/useActiveBook";

export const Route = createFileRoute("/_app/@{$workspaceSlug}/~/time/")({
  component: TimeTrackingPage,
});

const today = () => new Date().toISOString().slice(0, 10);
const inDays = (n: number) =>
  new Date(Date.now() + n * 86_400_000).toISOString().slice(0, 10);

const inputClass =
  "rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50";

interface TimeEntry {
  id: string;
  customerId: string | null;
  date: string;
  hours: string;
  rate: string;
  description: string | null;
  billable: boolean;
  invoiceId: string | null;
}

function TimeTrackingPage() {
  const {
    activeBookId,
    books,
    isLoading: booksLoading,
    setActiveBookId,
  } = useActiveBook();

  const [entries, setEntries] = useState<TimeEntry[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [accounts, setAccounts] = useState<InvoiceAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<TimeEntry | null>(null);

  const [form, setForm] = useState({
    date: today(),
    customerId: "",
    hours: "1",
    rate: "0",
    description: "",
    billable: true,
  });

  const billTitleId = useId();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [billOpen, setBillOpen] = useState(false);
  const [billForm, setBillForm] = useState({
    number: "",
    issueDate: today(),
    dueDate: inDays(30),
    incomeAccountId: "",
  });

  const revenueAccounts = accounts.filter((a) => a.type === "revenue");
  const customerName = (id: string | null) =>
    customers.find((c) => c.id === id)?.name ?? "No customer";

  const fetchData = useCallback(async () => {
    if (!activeBookId) return;
    setIsLoading(true);
    setLoadError(false);
    try {
      const [teRes, custRes, acctRes] = await Promise.all([
        apiFetch(`/api/time-entries?bookId=${activeBookId}`),
        apiFetch(`/api/customers?bookId=${activeBookId}`),
        apiFetch(`/api/accounts?bookId=${activeBookId}`),
      ]);
      const [teData, custData, acctData] = await Promise.all([
        teRes.json(),
        custRes.json(),
        acctRes.json(),
      ]);
      setEntries(teData.entries ?? []);
      setCustomers(custData.customers ?? []);
      setAccounts(acctData.accounts ?? []);
      setSelected(new Set());
    } catch (err) {
      console.error("Failed to load time entries", err);
      setLoadError(true);
    } finally {
      setIsLoading(false);
    }
  }, [activeBookId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleLog = useCallback(async () => {
    if (!activeBookId || !(Number.parseFloat(form.hours) > 0)) return;
    setSaving(true);
    try {
      const res = await apiFetch("/api/time-entries", {
        method: "POST",
        body: JSON.stringify({
          bookId: activeBookId,
          customerId: form.customerId || undefined,
          date: form.date,
          hours: Number.parseFloat(form.hours) || 0,
          rate: Number.parseFloat(form.rate) || 0,
          description: form.description || undefined,
          billable: form.billable,
        }),
      });
      if (!res.ok) throw new Error("Log failed");
      setForm((f) => ({ ...f, hours: "1", description: "" }));
      await fetchData();
    } catch {
      toast.error("Could not log the time");
    } finally {
      setSaving(false);
    }
  }, [activeBookId, form, fetchData]);

  const handleDelete = useCallback(async () => {
    if (!deleting) return;
    setSaving(true);
    try {
      const res = await apiFetch(`/api/time-entries/${deleting.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      setDeleting(null);
      await fetchData();
    } catch {
      toast.error("Could not delete the entry");
    } finally {
      setSaving(false);
    }
  }, [deleting, fetchData]);

  // entries eligible to bill: billable, unbilled, and tied to a customer
  const billable = entries.filter(
    (e) => e.billable && !e.invoiceId && e.customerId,
  );
  const selectedEntries = billable.filter((e) => selected.has(e.id));
  // billing requires a single customer across the selection
  const selectedCustomerId =
    selectedEntries.length > 0 ? selectedEntries[0]?.customerId : null;
  const singleCustomer =
    selectedEntries.length > 0 &&
    selectedEntries.every((e) => e.customerId === selectedCustomerId);

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const handleBill = useCallback(async () => {
    if (!activeBookId || !selectedCustomerId || !billForm.incomeAccountId)
      return;
    setSaving(true);
    try {
      const res = await apiFetch("/api/time-entries/bill", {
        method: "POST",
        body: JSON.stringify({
          bookId: activeBookId,
          customerId: selectedCustomerId,
          entryIds: [...selected],
          number: billForm.number,
          issueDate: billForm.issueDate,
          dueDate: billForm.dueDate,
          incomeAccountId: billForm.incomeAccountId,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Billing failed");
      }
      toast.success("Draft invoice created from time");
      setBillOpen(false);
      setBillForm((f) => ({ ...f, number: "" }));
      await fetchData();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Billing failed");
    } finally {
      setSaving(false);
    }
  }, [activeBookId, selected, selectedCustomerId, billForm, fetchData]);

  const loading = booksLoading || isLoading;

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">Time Tracking</h1>
          <p className="text-muted-foreground text-sm">
            Log billable hours and group them into an invoice
          </p>
        </div>
        <BookPicker
          books={books}
          selectedBookId={activeBookId}
          onSelect={setActiveBookId}
        />
      </div>

      {loading && (
        <div className="flex items-center justify-center rounded-lg border border-border bg-card p-8">
          <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
        </div>
      )}

      {!loading && loadError && (
        <LoadError resource="time entries" onRetry={fetchData} />
      )}

      {!loading && !loadError && (
        <>
          <div className="grid gap-3 rounded-lg border border-border bg-card p-4 sm:grid-cols-2 lg:grid-cols-6">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="te-date" className="font-medium text-sm">
                Date
              </label>
              <input
                id="te-date"
                type="date"
                value={form.date}
                onChange={(e) =>
                  setForm((f) => ({ ...f, date: e.target.value }))
                }
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="te-customer" className="font-medium text-sm">
                Customer
              </label>
              <select
                id="te-customer"
                value={form.customerId}
                onChange={(e) =>
                  setForm((f) => ({ ...f, customerId: e.target.value }))
                }
                className={inputClass}
              >
                <option value="">None</option>
                {customers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="te-hours" className="font-medium text-sm">
                Hours
              </label>
              <input
                id="te-hours"
                type="number"
                min="0"
                step="0.25"
                value={form.hours}
                onChange={(e) =>
                  setForm((f) => ({ ...f, hours: e.target.value }))
                }
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="te-rate" className="font-medium text-sm">
                Rate
              </label>
              <input
                id="te-rate"
                type="number"
                min="0"
                step="0.01"
                value={form.rate}
                onChange={(e) =>
                  setForm((f) => ({ ...f, rate: e.target.value }))
                }
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1.5 lg:col-span-2">
              <label htmlFor="te-desc" className="font-medium text-sm">
                Description
              </label>
              <div className="flex gap-2">
                <input
                  id="te-desc"
                  type="text"
                  value={form.description}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, description: e.target.value }))
                  }
                  className={`${inputClass} flex-1`}
                />
                <button
                  type="button"
                  onClick={handleLog}
                  disabled={saving || !(Number.parseFloat(form.hours) > 0)}
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90 disabled:opacity-50"
                >
                  {saving && <Loader2Icon className="size-4 animate-spin" />}
                  Log
                </button>
              </div>
            </div>
          </div>

          {selected.size > 0 && (
            <div className="flex items-center justify-between rounded-lg border border-primary/40 bg-primary/5 px-4 py-2 text-sm">
              <span>
                {selected.size} selected
                {!singleCustomer && " (select one customer to bill)"}
              </span>
              <button
                type="button"
                disabled={!singleCustomer}
                onClick={() => setBillOpen(true)}
                className="rounded-md bg-primary px-3 py-1.5 font-medium text-primary-foreground text-xs transition-colors hover:bg-primary/90 disabled:opacity-50"
              >
                Bill to invoice
              </button>
            </div>
          )}

          {entries.length === 0 ? (
            <EmptyState
              title="No time logged yet"
              description="Log billable hours above to invoice them later."
            />
          ) : (
            <div className="overflow-x-auto rounded-lg border border-border bg-card">
              <table className="w-full text-sm">
                <thead className="border-border border-b text-left text-muted-foreground">
                  <tr>
                    <th className="w-10 px-4 py-3" />
                    <th className="px-4 py-3 font-medium">Date</th>
                    <th className="px-4 py-3 font-medium">Customer</th>
                    <th className="px-4 py-3 font-medium">Description</th>
                    <th className="px-4 py-3 text-right font-medium">Hours</th>
                    <th className="px-4 py-3 text-right font-medium">Rate</th>
                    <th className="px-4 py-3 text-right font-medium">Amount</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {entries.map((e) => {
                    const canBill = e.billable && !e.invoiceId && e.customerId;
                    return (
                      <tr
                        key={e.id}
                        className="border-border/50 border-b last:border-0"
                      >
                        <td className="px-4 py-3">
                          {canBill && (
                            <input
                              type="checkbox"
                              aria-label={`Select time entry ${e.date}`}
                              checked={selected.has(e.id)}
                              onChange={() => toggle(e.id)}
                              className="size-4 rounded border-border"
                            />
                          )}
                        </td>
                        <td className="px-4 py-3">{e.date}</td>
                        <td className="px-4 py-3">
                          {customerName(e.customerId)}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {e.description ?? "-"}
                        </td>
                        <td className="px-4 py-3 text-right">
                          {Number(e.hours)}
                        </td>
                        <td className="px-4 py-3 text-right">
                          {formatCurrency(e.rate)}
                        </td>
                        <td className="px-4 py-3 text-right">
                          {formatCurrency(
                            (Number(e.hours) * Number(e.rate)).toFixed(4),
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {e.invoiceId ? (
                            <span className="text-muted-foreground">
                              Billed
                            </span>
                          ) : e.billable ? (
                            "Unbilled"
                          ) : (
                            <span className="text-muted-foreground">
                              Non-billable
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-right">
                          {!e.invoiceId && (
                            <button
                              type="button"
                              aria-label="Delete time entry"
                              onClick={() => setDeleting(e)}
                              className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-destructive"
                            >
                              <Trash2Icon className="size-4" />
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {billOpen && (
        <Dialog
          open
          onClose={() => setBillOpen(false)}
          busy={saving}
          labelledBy={billTitleId}
          className="max-w-md"
        >
          <h2 id={billTitleId} className="font-semibold text-lg">
            Bill time to an invoice
          </h2>
          <p className="mb-4 text-muted-foreground text-sm">
            {selectedEntries.length} entries for{" "}
            {customerName(selectedCustomerId)}
          </p>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="bill-number" className="font-medium text-sm">
                Invoice number
              </label>
              <input
                id="bill-number"
                type="text"
                value={billForm.number}
                onChange={(e) =>
                  setBillForm((f) => ({ ...f, number: e.target.value }))
                }
                className={inputClass}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="bill-issue" className="font-medium text-sm">
                  Issue date
                </label>
                <input
                  id="bill-issue"
                  type="date"
                  value={billForm.issueDate}
                  onChange={(e) =>
                    setBillForm((f) => ({ ...f, issueDate: e.target.value }))
                  }
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="bill-due" className="font-medium text-sm">
                  Due date
                </label>
                <input
                  id="bill-due"
                  type="date"
                  value={billForm.dueDate}
                  onChange={(e) =>
                    setBillForm((f) => ({ ...f, dueDate: e.target.value }))
                  }
                  className={inputClass}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="bill-account" className="font-medium text-sm">
                Income account
              </label>
              <select
                id="bill-account"
                value={billForm.incomeAccountId}
                onChange={(e) =>
                  setBillForm((f) => ({
                    ...f,
                    incomeAccountId: e.target.value,
                  }))
                }
                className={inputClass}
              >
                <option value="" disabled>
                  Select an account
                </option>
                {revenueAccounts.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.code ? `${a.code} - ` : ""}
                    {a.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setBillOpen(false)}
                disabled={saving}
                className="rounded-md border border-border px-4 py-2 text-sm transition-colors hover:bg-accent disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleBill}
                disabled={
                  saving || !billForm.number || !billForm.incomeAccountId
                }
                className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90 disabled:opacity-50"
              >
                {saving && <Loader2Icon className="size-4 animate-spin" />}
                Create Draft Invoice
              </button>
            </div>
          </div>
        </Dialog>
      )}

      <ConfirmDialog
        open={deleting !== null}
        title="Delete this time entry?"
        description="This permanently removes the logged time. This cannot be undone."
        confirmLabel="Delete"
        destructive
        loading={saving}
        onConfirm={handleDelete}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
}
