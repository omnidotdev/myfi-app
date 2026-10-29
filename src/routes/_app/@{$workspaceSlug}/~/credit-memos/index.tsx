import { createFileRoute } from "@tanstack/react-router";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { useCallback, useEffect, useId, useState } from "react";
import { toast } from "sonner";

import ConfirmDialog from "@/components/ConfirmDialog";
import Dialog from "@/components/Dialog";
import EmptyState from "@/components/EmptyState";
import LoadError from "@/components/LoadError";
import BookPicker from "@/features/books/components/BookPicker";
import ApplyCreditMemoDialog from "@/features/credit-memos/components/ApplyCreditMemoDialog";
import CreditMemoForm, {
  type CreditMemoFormPayload,
} from "@/features/credit-memos/components/CreditMemoForm";
import type {
  CreditMemoListItem,
  CreditMemoStatus,
} from "@/features/credit-memos/types/creditMemo";
import type {
  Customer,
  InvoiceAccount,
  InvoiceListItem,
  TaxJurisdiction,
} from "@/features/invoicing/types/invoicing";
import { apiFetch } from "@/lib/api/apiFetch";
import formatCurrency from "@/lib/format/currency";
import useActiveBook from "@/lib/hooks/useActiveBook";

export const Route = createFileRoute("/_app/@{$workspaceSlug}/~/credit-memos/")(
  {
    component: CreditMemosPage,
  },
);

const STATUS_STYLES: Record<CreditMemoStatus, string> = {
  draft: "bg-muted text-muted-foreground",
  open: "bg-blue-100 text-blue-700",
  applied: "bg-green-100 text-green-700",
  void: "bg-muted text-muted-foreground line-through",
};

const today = () => new Date().toISOString().slice(0, 10);

function CreditMemosPage() {
  const {
    activeBookId,
    books,
    isLoading: booksLoading,
    setActiveBookId,
  } = useActiveBook();

  const formTitleId = useId();
  const [creditMemos, setCreditMemos] = useState<CreditMemoListItem[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [accounts, setAccounts] = useState<InvoiceAccount[]>([]);
  const [taxJurisdictions, setTaxJurisdictions] = useState<TaxJurisdiction[]>(
    [],
  );
  const [invoices, setInvoices] = useState<InvoiceListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [applyingMemo, setApplyingMemo] = useState<CreditMemoListItem | null>(
    null,
  );
  const [voidingMemo, setVoidingMemo] = useState<CreditMemoListItem | null>(
    null,
  );

  const incomeAccounts = accounts.filter((a) => a.type === "revenue");

  const totalUnapplied = creditMemos.reduce(
    (sum, cm) => sum + Number(cm.unapplied),
    0,
  );

  const fetchData = useCallback(async () => {
    if (!activeBookId) return;
    setIsLoading(true);
    setLoadError(false);
    try {
      const [cmRes, custRes, acctRes, taxRes, invRes] = await Promise.all([
        apiFetch(`/api/credit-memos?bookId=${activeBookId}`),
        apiFetch(`/api/customers?bookId=${activeBookId}`),
        apiFetch(`/api/accounts?bookId=${activeBookId}`),
        apiFetch(`/api/tax-jurisdictions?bookId=${activeBookId}`),
        apiFetch(`/api/invoices?bookId=${activeBookId}`),
      ]);
      const [cmData, custData, acctData, taxData, invData] = await Promise.all([
        cmRes.json(),
        custRes.json(),
        acctRes.json(),
        taxRes.json(),
        invRes.json(),
      ]);
      setCreditMemos(cmData.creditMemos ?? []);
      setCustomers(custData.customers ?? []);
      setAccounts(acctData.accounts ?? []);
      setTaxJurisdictions(
        taxData.taxJurisdictions ?? taxData.jurisdictions ?? [],
      );
      setInvoices(invData.invoices ?? []);
    } catch (err) {
      console.error("Failed to load credit memos", err);
      setLoadError(true);
    } finally {
      setIsLoading(false);
    }
  }, [activeBookId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCreate = useCallback(
    async (payload: CreditMemoFormPayload) => {
      if (!activeBookId) return;
      setSaving(true);
      try {
        const res = await apiFetch("/api/credit-memos", {
          method: "POST",
          body: JSON.stringify({ bookId: activeBookId, ...payload }),
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error ?? "Create failed");
        }
        toast.success("Draft credit memo created");
        setFormOpen(false);
        await fetchData();
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Create failed");
      } finally {
        setSaving(false);
      }
    },
    [activeBookId, fetchData],
  );

  const runAction = useCallback(
    async (
      memo: CreditMemoListItem,
      path: string,
      body: Record<string, unknown>,
      successMessage: string,
    ) => {
      if (!activeBookId) return false;
      setBusyId(memo.id);
      try {
        const res = await apiFetch(`/api/credit-memos/${memo.id}/${path}`, {
          method: "POST",
          body: JSON.stringify({ bookId: activeBookId, ...body }),
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error ?? "Action failed");
        }
        toast.success(successMessage);
        await fetchData();
        return true;
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Action failed");
        return false;
      } finally {
        setBusyId(null);
      }
    },
    [activeBookId, fetchData],
  );

  // Open or partially paid invoices for the customer whose memo is being applied
  const applyInvoices = applyingMemo
    ? invoices.filter(
        (inv) =>
          inv.customerId === applyingMemo.customerId &&
          (inv.status === "open" || inv.status === "partial"),
      )
    : [];

  const loading = booksLoading || isLoading;

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">Credit Memos</h1>
          <p className="text-muted-foreground text-sm">
            Issue customer credits and apply them to open invoices
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
            onClick={() => setFormOpen(true)}
            disabled={!activeBookId || customers.length === 0}
            title={customers.length === 0 ? "Add a customer first" : undefined}
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90 disabled:opacity-50"
          >
            <PlusIcon className="size-4" />
            New Credit Memo
          </button>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center rounded-lg border border-border bg-card p-8">
          <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
        </div>
      )}

      {!loading && loadError && (
        <LoadError resource="credit memos" onRetry={fetchData} />
      )}

      {!loading && !loadError && totalUnapplied > 0 && (
        <div className="rounded-lg border border-border bg-card p-4">
          <h2 className="mb-1 font-semibold text-sm">Unapplied Credit</h2>
          <p className="font-semibold text-lg">
            {formatCurrency(totalUnapplied.toFixed(2))}
          </p>
          <p className="text-muted-foreground text-xs">
            Total customer credit not yet applied to invoices
          </p>
        </div>
      )}

      {!loading && !loadError && creditMemos.length === 0 && (
        <EmptyState
          title="No credit memos yet"
          description={
            customers.length === 0
              ? "Add a customer, then issue your first credit memo."
              : "Issue your first credit memo to credit a customer."
          }
        />
      )}

      {!loading && !loadError && creditMemos.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="border-border border-b text-left text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Number</th>
                <th className="px-4 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 text-right font-medium">Total</th>
                <th className="px-4 py-3 text-right font-medium">Unapplied</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {creditMemos.map((cm) => {
                const unapplied = Number(cm.unapplied);
                return (
                  <tr
                    key={cm.id}
                    className="border-border/50 border-b last:border-0"
                  >
                    <td className="px-4 py-3 font-medium">{cm.number}</td>
                    <td className="px-4 py-3">{cm.customerName}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {cm.date}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block rounded-full px-2 py-0.5 font-medium text-xs ${STATUS_STYLES[cm.status]}`}
                      >
                        {cm.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {formatCurrency(cm.total)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {formatCurrency(cm.unapplied)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        {busyId === cm.id && (
                          <Loader2Icon className="size-4 animate-spin text-muted-foreground" />
                        )}
                        {cm.status === "draft" && (
                          <button
                            type="button"
                            disabled={busyId === cm.id}
                            onClick={() =>
                              runAction(cm, "post", {}, "Credit memo posted")
                            }
                            className="rounded-md border border-border px-2.5 py-1 text-xs transition-colors hover:bg-accent disabled:opacity-50"
                          >
                            Post
                          </button>
                        )}
                        {(cm.status === "open" || cm.status === "applied") &&
                          unapplied > 0 && (
                            <button
                              type="button"
                              disabled={busyId === cm.id}
                              onClick={() => setApplyingMemo(cm)}
                              className="rounded-md border border-border px-2.5 py-1 text-xs transition-colors hover:bg-accent disabled:opacity-50"
                            >
                              Apply
                            </button>
                          )}
                        {cm.status !== "void" && (
                          <button
                            type="button"
                            disabled={busyId === cm.id}
                            onClick={() => setVoidingMemo(cm)}
                            className="rounded-md border border-border px-2.5 py-1 text-destructive text-xs transition-colors hover:bg-accent disabled:opacity-50"
                          >
                            Void
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

      {formOpen && (
        <Dialog
          open
          onClose={() => setFormOpen(false)}
          busy={saving}
          labelledBy={formTitleId}
          className="my-8 max-w-2xl"
        >
          <h2 id={formTitleId} className="mb-4 font-semibold text-lg">
            New Credit Memo
          </h2>
          <CreditMemoForm
            customers={customers}
            incomeAccounts={incomeAccounts}
            taxJurisdictions={taxJurisdictions}
            saving={saving}
            onSubmit={handleCreate}
            onCancel={() => setFormOpen(false)}
          />
        </Dialog>
      )}

      {applyingMemo && (
        <ApplyCreditMemoDialog
          creditMemo={applyingMemo}
          openInvoices={applyInvoices}
          saving={busyId === applyingMemo.id}
          onCancel={() => setApplyingMemo(null)}
          onSubmit={async (payload) => {
            const ok = await runAction(
              applyingMemo,
              "apply",
              payload,
              "Credit applied",
            );
            if (ok) setApplyingMemo(null);
          }}
        />
      )}

      <ConfirmDialog
        open={voidingMemo !== null}
        title={`Void credit memo ${voidingMemo?.number ?? ""}?`}
        description="This reverses the credit memo's ledger entry and cannot be undone."
        confirmLabel="Void Credit Memo"
        destructive
        loading={busyId === voidingMemo?.id}
        onConfirm={async () => {
          if (!voidingMemo) return;
          const ok = await runAction(
            voidingMemo,
            "void",
            { date: today() },
            "Credit memo voided",
          );
          if (ok) setVoidingMemo(null);
        }}
        onCancel={() => setVoidingMemo(null)}
      />
    </div>
  );
}
