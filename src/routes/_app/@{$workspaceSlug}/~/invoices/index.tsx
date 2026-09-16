import { createFileRoute } from "@tanstack/react-router";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import ConfirmDialog from "@/components/ConfirmDialog";
import EmptyState from "@/components/EmptyState";
import BookPicker from "@/features/books/components/BookPicker";
import InvoiceForm, {
  type InvoiceFormPayload,
} from "@/features/invoicing/components/InvoiceForm";
import PaymentDialog from "@/features/invoicing/components/PaymentDialog";
import type {
  ArAging,
  Customer,
  InvoiceAccount,
  InvoiceInventoryOption,
  InvoiceListItem,
  InvoiceStatus,
  TaxJurisdiction,
} from "@/features/invoicing/types/invoicing";
import { apiFetch } from "@/lib/api/apiFetch";
import formatCurrency from "@/lib/format/currency";
import useActiveBook from "@/lib/hooks/useActiveBook";

export const Route = createFileRoute("/_app/@{$workspaceSlug}/~/invoices/")({
  component: InvoicesPage,
});

const STATUS_STYLES: Record<InvoiceStatus, string> = {
  draft: "bg-muted text-muted-foreground",
  open: "bg-blue-100 text-blue-700",
  partial: "bg-amber-100 text-amber-700",
  paid: "bg-green-100 text-green-700",
  void: "bg-muted text-muted-foreground line-through",
};

function InvoicesPage() {
  const {
    activeBookId,
    books,
    isLoading: booksLoading,
    setActiveBookId,
  } = useActiveBook();

  const [invoices, setInvoices] = useState<InvoiceListItem[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [accounts, setAccounts] = useState<InvoiceAccount[]>([]);
  const [taxJurisdictions, setTaxJurisdictions] = useState<TaxJurisdiction[]>(
    [],
  );
  const [aging, setAging] = useState<ArAging | null>(null);
  const [inventoryItems, setInventoryItems] = useState<
    InvoiceInventoryOption[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [payingInvoice, setPayingInvoice] = useState<InvoiceListItem | null>(
    null,
  );
  const [voidingInvoice, setVoidingInvoice] = useState<InvoiceListItem | null>(
    null,
  );

  const incomeAccounts = accounts.filter((a) => a.type === "revenue");
  const depositAccounts = accounts.filter((a) => a.type === "asset");

  const fetchData = useCallback(async () => {
    if (!activeBookId) return;
    setIsLoading(true);
    const asOf = new Date().toISOString().slice(0, 10);
    try {
      const [invRes, custRes, acctRes, taxRes, agingRes, itemRes] =
        await Promise.all([
          apiFetch(`/api/invoices?bookId=${activeBookId}`),
          apiFetch(`/api/customers?bookId=${activeBookId}`),
          apiFetch(`/api/accounts?bookId=${activeBookId}`),
          apiFetch(`/api/tax-jurisdictions?bookId=${activeBookId}`),
          apiFetch(
            `/api/reports/ar-aging?bookId=${activeBookId}&asOfDate=${asOf}`,
          ),
          apiFetch(`/api/inventory-items?bookId=${activeBookId}`),
        ]);
      const [invData, custData, acctData, taxData, agingData, itemData] =
        await Promise.all([
          invRes.json(),
          custRes.json(),
          acctRes.json(),
          taxRes.json(),
          agingRes.json(),
          itemRes.json(),
        ]);
      setInvoices(invData.invoices ?? []);
      setCustomers(custData.customers ?? []);
      setAccounts(acctData.accounts ?? []);
      setTaxJurisdictions(
        taxData.taxJurisdictions ?? taxData.jurisdictions ?? [],
      );
      setAging(agingData ?? null);
      setInventoryItems(itemData.items ?? []);
    } catch {
      toast.error("Could not load invoices");
    } finally {
      setIsLoading(false);
    }
  }, [activeBookId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCreate = useCallback(
    async (payload: InvoiceFormPayload) => {
      if (!activeBookId) return;
      setSaving(true);
      try {
        const res = await apiFetch("/api/invoices", {
          method: "POST",
          body: JSON.stringify({ bookId: activeBookId, ...payload }),
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error ?? "Create failed");
        }
        toast.success("Draft invoice created");
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
      invoice: InvoiceListItem,
      path: string,
      body: Record<string, unknown>,
      successMessage: string,
    ) => {
      if (!activeBookId) return;
      setBusyId(invoice.id);
      try {
        const res = await apiFetch(`/api/invoices/${invoice.id}/${path}`, {
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

  const loading = booksLoading || isLoading;

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">Invoices</h1>
          <p className="text-muted-foreground text-sm">
            Bill customers and track what you are owed
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
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90 disabled:opacity-50"
          >
            <PlusIcon className="size-4" />
            New Invoice
          </button>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center rounded-lg border border-border bg-card p-8">
          <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
        </div>
      )}

      {!loading && aging && Number(aging.totals.total) > 0 && (
        <div className="rounded-lg border border-border bg-card p-4">
          <h2 className="mb-3 font-semibold text-sm">
            Accounts Receivable Aging
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-6">
            {(
              [
                ["Current", aging.totals.current],
                ["1-30", aging.totals.days1to30],
                ["31-60", aging.totals.days31to60],
                ["61-90", aging.totals.days61to90],
                ["90+", aging.totals.over90],
                ["Total", aging.totals.total],
              ] as const
            ).map(([label, value]) => (
              <div key={label} className="flex flex-col">
                <span className="text-muted-foreground text-xs">{label}</span>
                <span className="font-semibold text-sm">
                  {formatCurrency(value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading && invoices.length === 0 && (
        <EmptyState
          title="No invoices yet"
          description={
            customers.length === 0
              ? "Add a customer, then create your first invoice."
              : "Create your first invoice to bill a customer."
          }
        />
      )}

      {!loading && invoices.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="border-border border-b text-left text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Number</th>
                <th className="px-4 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium">Due</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 text-right font-medium">Total</th>
                <th className="px-4 py-3 text-right font-medium">Balance</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr
                  key={inv.id}
                  className="border-border/50 border-b last:border-0"
                >
                  <td className="px-4 py-3 font-medium">{inv.number}</td>
                  <td className="px-4 py-3">{inv.customerName}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {inv.dueDate}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 font-medium text-xs ${STATUS_STYLES[inv.status]}`}
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {formatCurrency(inv.total)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {formatCurrency(inv.balanceDue)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      {busyId === inv.id && (
                        <Loader2Icon className="size-4 animate-spin text-muted-foreground" />
                      )}
                      {inv.status === "draft" && (
                        <button
                          type="button"
                          disabled={busyId === inv.id}
                          onClick={() =>
                            runAction(inv, "post", {}, "Invoice posted")
                          }
                          className="rounded-md border border-border px-2.5 py-1 text-xs transition-colors hover:bg-accent disabled:opacity-50"
                        >
                          Post
                        </button>
                      )}
                      {(inv.status === "open" || inv.status === "partial") && (
                        <button
                          type="button"
                          disabled={busyId === inv.id}
                          onClick={() => setPayingInvoice(inv)}
                          className="rounded-md border border-border px-2.5 py-1 text-xs transition-colors hover:bg-accent disabled:opacity-50"
                        >
                          Record Payment
                        </button>
                      )}
                      {inv.status !== "void" && inv.status !== "paid" && (
                        <button
                          type="button"
                          disabled={busyId === inv.id}
                          onClick={() => setVoidingInvoice(inv)}
                          className="rounded-md border border-border px-2.5 py-1 text-destructive text-xs transition-colors hover:bg-accent disabled:opacity-50"
                        >
                          Void
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4">
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
            onClick={() => setFormOpen(false)}
            aria-label="Close dialog"
          />
          <div className="relative my-8 w-full max-w-2xl rounded-lg border border-border bg-card p-6 shadow-lg">
            <h2 className="mb-4 font-semibold text-lg">New Invoice</h2>
            <InvoiceForm
              customers={customers}
              incomeAccounts={incomeAccounts}
              taxJurisdictions={taxJurisdictions}
              inventoryItems={inventoryItems}
              saving={saving}
              onSubmit={handleCreate}
              onCancel={() => setFormOpen(false)}
            />
          </div>
        </div>
      )}

      {payingInvoice && (
        <PaymentDialog
          invoice={payingInvoice}
          depositAccounts={depositAccounts}
          saving={busyId === payingInvoice.id}
          onCancel={() => setPayingInvoice(null)}
          onSubmit={async (payload) => {
            const ok = await runAction(
              payingInvoice,
              "payments",
              payload,
              "Payment recorded",
            );
            if (ok) setPayingInvoice(null);
          }}
        />
      )}

      <ConfirmDialog
        open={voidingInvoice !== null}
        title={`Void invoice ${voidingInvoice?.number ?? ""}?`}
        description="This reverses the invoice's ledger entry and cannot be undone."
        confirmLabel="Void Invoice"
        destructive
        loading={busyId === voidingInvoice?.id}
        onConfirm={async () => {
          if (!voidingInvoice) return;
          const ok = await runAction(
            voidingInvoice,
            "void",
            {},
            "Invoice voided",
          );
          if (ok) setVoidingInvoice(null);
        }}
        onCancel={() => setVoidingInvoice(null)}
      />
    </div>
  );
}
