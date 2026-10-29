import { createFileRoute } from "@tanstack/react-router";
import { Loader2Icon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import ConfirmDialog from "@/components/ConfirmDialog";
import EmptyState from "@/components/EmptyState";
import LoadError from "@/components/LoadError";
import BookPicker from "@/features/books/components/BookPicker";
import type { InvoiceAccount } from "@/features/invoicing/types/invoicing";
import { apiFetch } from "@/lib/api/apiFetch";
import formatCurrency from "@/lib/format/currency";
import useActiveBook from "@/lib/hooks/useActiveBook";

export const Route = createFileRoute("/_app/@{$workspaceSlug}/~/deposits/")({
  component: DepositsPage,
});

const today = () => new Date().toISOString().slice(0, 10);

const inputClass =
  "rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50";

/** A customer receipt sitting in Undeposited Funds, waiting to be deposited */
interface UndepositedPayment {
  id: string;
  amount: string;
  date: string;
  method: string | null;
  reference: string | null;
  invoiceNumber: string | null;
}

/** A recorded bank deposit */
interface BankDeposit {
  id: string;
  date: string;
  status: string;
  bankAccountId: string;
  memo: string | null;
  total: string;
}

function DepositsPage() {
  const {
    activeBookId,
    books,
    isLoading: booksLoading,
    setActiveBookId,
  } = useActiveBook();

  const [undeposited, setUndeposited] = useState<UndepositedPayment[]>([]);
  const [deposits, setDeposits] = useState<BankDeposit[]>([]);
  const [accounts, setAccounts] = useState<InvoiceAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [saving, setSaving] = useState(false);
  const [voiding, setVoiding] = useState<BankDeposit | null>(null);

  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [bankAccountId, setBankAccountId] = useState("");
  const [date, setDate] = useState(today());
  const [memo, setMemo] = useState("");

  // only real bank/cash accounts can receive a deposit, never Undeposited Funds
  const bankAccounts = accounts.filter(
    (a) => a.subType === "bank" || a.subType === "cash",
  );
  const accountName = (id: string) =>
    accounts.find((a) => a.id === id)?.name ?? "Bank account";

  const fetchData = useCallback(async () => {
    if (!activeBookId) return;
    setIsLoading(true);
    setLoadError(false);
    try {
      const [undepRes, depRes, acctRes] = await Promise.all([
        apiFetch(`/api/bank-deposits/undeposited?bookId=${activeBookId}`),
        apiFetch(`/api/bank-deposits?bookId=${activeBookId}`),
        apiFetch(`/api/accounts?bookId=${activeBookId}`),
      ]);
      const [undepData, depData, acctData] = await Promise.all([
        undepRes.json(),
        depRes.json(),
        acctRes.json(),
      ]);
      setUndeposited(undepData.payments ?? []);
      setDeposits(depData.deposits ?? []);
      setAccounts(acctData.accounts ?? []);
      setSelected(new Set());
    } catch (err) {
      console.error("Failed to load deposits", err);
      setLoadError(true);
    } finally {
      setIsLoading(false);
    }
  }, [activeBookId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    setSelected((prev) =>
      prev.size === undeposited.length
        ? new Set()
        : new Set(undeposited.map((p) => p.id)),
    );
  };

  const selectedTotal = undeposited
    .filter((p) => selected.has(p.id))
    .reduce((sum, p) => sum + Number(p.amount), 0);

  const handleDeposit = useCallback(async () => {
    if (!activeBookId || selected.size === 0 || !bankAccountId) return;
    setSaving(true);
    try {
      const res = await apiFetch("/api/bank-deposits", {
        method: "POST",
        body: JSON.stringify({
          bookId: activeBookId,
          date,
          bankAccountId,
          paymentIds: [...selected],
          memo: memo || undefined,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Deposit failed");
      }
      toast.success("Deposit recorded");
      setMemo("");
      setBankAccountId("");
      await fetchData();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Deposit failed");
    } finally {
      setSaving(false);
    }
  }, [activeBookId, selected, bankAccountId, date, memo, fetchData]);

  const handleVoid = useCallback(async () => {
    if (!activeBookId || !voiding) return;
    setSaving(true);
    try {
      const res = await apiFetch(`/api/bank-deposits/${voiding.id}/void`, {
        method: "POST",
        body: JSON.stringify({ bookId: activeBookId }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Void failed");
      }
      toast.success("Deposit voided");
      setVoiding(null);
      await fetchData();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Void failed");
    } finally {
      setSaving(false);
    }
  }, [activeBookId, voiding, fetchData]);

  const loading = booksLoading || isLoading;

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">Deposits</h1>
          <p className="text-muted-foreground text-sm">
            Group received payments held in Undeposited Funds into a single bank
            deposit
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
        <LoadError resource="deposits" onRetry={fetchData} />
      )}

      {!loading && !loadError && (
        <>
          <section className="flex flex-col gap-3">
            <h2 className="font-semibold text-lg">Undeposited Funds</h2>
            {undeposited.length === 0 ? (
              <EmptyState
                title="Nothing to deposit"
                description="Payments you hold in Undeposited Funds appear here, ready to group into a bank deposit."
              />
            ) : (
              <>
                <div className="overflow-x-auto rounded-lg border border-border bg-card">
                  <table className="w-full text-sm">
                    <thead className="border-border border-b text-left text-muted-foreground">
                      <tr>
                        <th className="w-10 px-4 py-3">
                          <input
                            type="checkbox"
                            aria-label="Select all undeposited payments"
                            checked={
                              undeposited.length > 0 &&
                              selected.size === undeposited.length
                            }
                            onChange={toggleAll}
                            className="size-4 rounded border-border"
                          />
                        </th>
                        <th className="px-4 py-3 font-medium">Date</th>
                        <th className="px-4 py-3 font-medium">Invoice</th>
                        <th className="px-4 py-3 font-medium">Method</th>
                        <th className="px-4 py-3 text-right font-medium">
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {undeposited.map((p) => (
                        <tr
                          key={p.id}
                          className="border-border/50 border-b last:border-0"
                        >
                          <td className="px-4 py-3">
                            <input
                              type="checkbox"
                              aria-label={`Select payment for invoice ${p.invoiceNumber ?? ""}`}
                              checked={selected.has(p.id)}
                              onChange={() => toggle(p.id)}
                              className="size-4 rounded border-border"
                            />
                          </td>
                          <td className="px-4 py-3">{p.date}</td>
                          <td className="px-4 py-3">
                            {p.invoiceNumber ?? "-"}
                          </td>
                          <td className="px-4 py-3 text-muted-foreground">
                            {p.method ?? "-"}
                          </td>
                          <td className="px-4 py-3 text-right">
                            {formatCurrency(p.amount)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex flex-wrap items-end gap-3 rounded-lg border border-border bg-card p-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="dep-bank" className="font-medium text-sm">
                      Deposit To
                    </label>
                    <select
                      id="dep-bank"
                      value={bankAccountId}
                      onChange={(e) => setBankAccountId(e.target.value)}
                      className={inputClass}
                    >
                      <option value="" disabled>
                        Select a bank account
                      </option>
                      {bankAccounts.map((a) => (
                        <option key={a.id} value={a.id}>
                          {a.code ? `${a.code} - ` : ""}
                          {a.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="dep-date" className="font-medium text-sm">
                      Date
                    </label>
                    <input
                      id="dep-date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-1.5">
                    <label htmlFor="dep-memo" className="font-medium text-sm">
                      Memo
                      <span className="ml-1 font-normal text-muted-foreground">
                        (optional)
                      </span>
                    </label>
                    <input
                      id="dep-memo"
                      type="text"
                      value={memo}
                      onChange={(e) => setMemo(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleDeposit}
                    disabled={saving || selected.size === 0 || !bankAccountId}
                    className="inline-flex items-center gap-2 whitespace-nowrap rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90 disabled:opacity-50"
                  >
                    {saving && <Loader2Icon className="size-4 animate-spin" />}
                    Record Deposit
                    {selected.size > 0 && ` (${formatCurrency(selectedTotal)})`}
                  </button>
                </div>
              </>
            )}
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-semibold text-lg">Recorded Deposits</h2>
            {deposits.length === 0 ? (
              <EmptyState
                title="No deposits yet"
                description="Deposits you record appear here."
              />
            ) : (
              <div className="overflow-x-auto rounded-lg border border-border bg-card">
                <table className="w-full text-sm">
                  <thead className="border-border border-b text-left text-muted-foreground">
                    <tr>
                      <th className="px-4 py-3 font-medium">Date</th>
                      <th className="px-4 py-3 font-medium">Account</th>
                      <th className="px-4 py-3 font-medium">Memo</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                      <th className="px-4 py-3 text-right font-medium">
                        Total
                      </th>
                      <th className="px-4 py-3 text-right font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {deposits.map((d) => (
                      <tr
                        key={d.id}
                        className="border-border/50 border-b last:border-0"
                      >
                        <td className="px-4 py-3">{d.date}</td>
                        <td className="px-4 py-3">
                          {accountName(d.bankAccountId)}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {d.memo ?? "-"}
                        </td>
                        <td className="px-4 py-3">
                          {d.status === "void" ? (
                            <span className="text-muted-foreground">Void</span>
                          ) : (
                            "Recorded"
                          )}
                        </td>
                        <td className="px-4 py-3 text-right">
                          {formatCurrency(d.total)}
                        </td>
                        <td className="px-4 py-3 text-right">
                          {d.status !== "void" && (
                            <button
                              type="button"
                              onClick={() => setVoiding(d)}
                              className="rounded-md border border-border px-2.5 py-1 text-xs transition-colors hover:bg-accent"
                            >
                              Void
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </>
      )}

      <ConfirmDialog
        open={voiding !== null}
        title="Void this deposit?"
        description="This reverses the deposit's ledger entry and returns its payments to Undeposited Funds so they can be deposited again."
        confirmLabel="Void Deposit"
        destructive
        loading={saving}
        onConfirm={handleVoid}
        onCancel={() => setVoiding(null)}
      />
    </div>
  );
}
