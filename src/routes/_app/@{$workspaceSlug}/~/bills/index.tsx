import { createFileRoute } from "@tanstack/react-router";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import ConfirmDialog from "@/components/ConfirmDialog";
import EmptyState from "@/components/EmptyState";
import BillForm, {
  type BillFormPayload,
} from "@/features/billing/components/BillForm";
import BillPaymentDialog from "@/features/billing/components/BillPaymentDialog";
import type {
  BillListItem,
  BillStatus,
  BillVendor,
} from "@/features/billing/types/billing";
import BookPicker from "@/features/books/components/BookPicker";
import type {
  InvoiceAccount,
  TaxJurisdiction,
} from "@/features/invoicing/types/invoicing";
import { apiFetch } from "@/lib/api/apiFetch";
import formatCurrency from "@/lib/format/currency";
import useActiveBook from "@/lib/hooks/useActiveBook";

export const Route = createFileRoute("/_app/@{$workspaceSlug}/~/bills/")({
  component: BillsPage,
});

const STATUS_STYLES: Record<BillStatus, string> = {
  draft: "bg-muted text-muted-foreground",
  open: "bg-blue-100 text-blue-700",
  partial: "bg-amber-100 text-amber-700",
  paid: "bg-green-100 text-green-700",
  void: "bg-muted text-muted-foreground line-through",
};

interface AgingTotals {
  current: string;
  days1to30: string;
  days31to60: string;
  days61to90: string;
  over90: string;
  total: string;
}

function BillsPage() {
  const {
    activeBookId,
    books,
    isLoading: booksLoading,
    setActiveBookId,
  } = useActiveBook();

  const [bills, setBills] = useState<BillListItem[]>([]);
  const [vendors, setVendors] = useState<BillVendor[]>([]);
  const [accounts, setAccounts] = useState<InvoiceAccount[]>([]);
  const [taxJurisdictions, setTaxJurisdictions] = useState<TaxJurisdiction[]>(
    [],
  );
  const [agingTotals, setAgingTotals] = useState<AgingTotals | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [payingBill, setPayingBill] = useState<BillListItem | null>(null);
  const [voidingBill, setVoidingBill] = useState<BillListItem | null>(null);

  const expenseAccounts = accounts.filter((a) => a.type === "expense");
  const paymentAccounts = accounts.filter((a) => a.type === "asset");

  const fetchData = useCallback(async () => {
    if (!activeBookId) return;
    setIsLoading(true);
    const asOf = new Date().toISOString().slice(0, 10);
    try {
      const [billRes, vendRes, acctRes, taxRes, agingRes] = await Promise.all([
        apiFetch(`/api/bills?bookId=${activeBookId}`),
        apiFetch(`/api/vendors?bookId=${activeBookId}`),
        apiFetch(`/api/accounts?bookId=${activeBookId}`),
        apiFetch(`/api/tax-jurisdictions?bookId=${activeBookId}`),
        apiFetch(
          `/api/reports/ap-aging?bookId=${activeBookId}&asOfDate=${asOf}`,
        ),
      ]);
      const [billData, vendData, acctData, taxData, agingData] =
        await Promise.all([
          billRes.json(),
          vendRes.json(),
          acctRes.json(),
          taxRes.json(),
          agingRes.json(),
        ]);
      setBills(billData.bills ?? []);
      setVendors(vendData.vendors ?? []);
      setAccounts(acctData.accounts ?? []);
      setTaxJurisdictions(
        taxData.taxJurisdictions ?? taxData.jurisdictions ?? [],
      );
      setAgingTotals(agingData?.totals ?? null);
    } catch {
      toast.error("Could not load bills");
    } finally {
      setIsLoading(false);
    }
  }, [activeBookId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCreate = useCallback(
    async (payload: BillFormPayload) => {
      if (!activeBookId) return;
      setSaving(true);
      try {
        const res = await apiFetch("/api/bills", {
          method: "POST",
          body: JSON.stringify({ bookId: activeBookId, ...payload }),
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error ?? "Create failed");
        }
        toast.success("Draft bill created");
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
      bill: BillListItem,
      path: string,
      body: Record<string, unknown>,
      successMessage: string,
    ) => {
      if (!activeBookId) return;
      setBusyId(bill.id);
      try {
        const res = await apiFetch(`/api/bills/${bill.id}/${path}`, {
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
          <h1 className="font-bold text-2xl">Bills</h1>
          <p className="text-muted-foreground text-sm">
            Vendor bills and what you owe
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
            disabled={!activeBookId || vendors.length === 0}
            title={vendors.length === 0 ? "Add a vendor first" : undefined}
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90 disabled:opacity-50"
          >
            <PlusIcon className="size-4" />
            New Bill
          </button>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center rounded-lg border border-border bg-card p-8">
          <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
        </div>
      )}

      {!loading && agingTotals && Number(agingTotals.total) > 0 && (
        <div className="rounded-lg border border-border bg-card p-4">
          <h2 className="mb-3 font-semibold text-sm">Accounts Payable Aging</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-6">
            {(
              [
                ["Current", agingTotals.current],
                ["1-30", agingTotals.days1to30],
                ["31-60", agingTotals.days31to60],
                ["61-90", agingTotals.days61to90],
                ["90+", agingTotals.over90],
                ["Total", agingTotals.total],
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

      {!loading && bills.length === 0 && (
        <EmptyState
          title="No bills yet"
          description={
            vendors.length === 0
              ? "Add a vendor, then enter your first bill."
              : "Enter your first bill to track what you owe."
          }
        />
      )}

      {!loading && bills.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="border-border border-b text-left text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Number</th>
                <th className="px-4 py-3 font-medium">Vendor</th>
                <th className="px-4 py-3 font-medium">Due</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 text-right font-medium">Total</th>
                <th className="px-4 py-3 text-right font-medium">Balance</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bills.map((bill) => (
                <tr
                  key={bill.id}
                  className="border-border/50 border-b last:border-0"
                >
                  <td className="px-4 py-3 font-medium">{bill.number}</td>
                  <td className="px-4 py-3">{bill.vendorName}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {bill.dueDate}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 font-medium text-xs ${STATUS_STYLES[bill.status]}`}
                    >
                      {bill.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {formatCurrency(bill.total)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {formatCurrency(bill.balanceDue)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      {busyId === bill.id && (
                        <Loader2Icon className="size-4 animate-spin text-muted-foreground" />
                      )}
                      {bill.status === "draft" && (
                        <button
                          type="button"
                          disabled={busyId === bill.id}
                          onClick={() =>
                            runAction(bill, "post", {}, "Bill posted")
                          }
                          className="rounded-md border border-border px-2.5 py-1 text-xs transition-colors hover:bg-accent disabled:opacity-50"
                        >
                          Post
                        </button>
                      )}
                      {(bill.status === "open" ||
                        bill.status === "partial") && (
                        <button
                          type="button"
                          disabled={busyId === bill.id}
                          onClick={() => setPayingBill(bill)}
                          className="rounded-md border border-border px-2.5 py-1 text-xs transition-colors hover:bg-accent disabled:opacity-50"
                        >
                          Pay
                        </button>
                      )}
                      {bill.status !== "void" && bill.status !== "paid" && (
                        <button
                          type="button"
                          disabled={busyId === bill.id}
                          onClick={() => setVoidingBill(bill)}
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
            <h2 className="mb-4 font-semibold text-lg">New Bill</h2>
            <BillForm
              vendors={vendors}
              expenseAccounts={expenseAccounts}
              taxJurisdictions={taxJurisdictions}
              saving={saving}
              onSubmit={handleCreate}
              onCancel={() => setFormOpen(false)}
            />
          </div>
        </div>
      )}

      {payingBill && (
        <BillPaymentDialog
          bill={payingBill}
          paymentAccounts={paymentAccounts}
          saving={busyId === payingBill.id}
          onCancel={() => setPayingBill(null)}
          onSubmit={async (payload) => {
            const ok = await runAction(
              payingBill,
              "payments",
              payload,
              "Payment recorded",
            );
            if (ok) setPayingBill(null);
          }}
        />
      )}

      <ConfirmDialog
        open={voidingBill !== null}
        title={`Void bill ${voidingBill?.number ?? ""}?`}
        description="This reverses the bill's ledger entry and cannot be undone."
        confirmLabel="Void Bill"
        destructive
        loading={busyId === voidingBill?.id}
        onConfirm={async () => {
          if (!voidingBill) return;
          const ok = await runAction(voidingBill, "void", {}, "Bill voided");
          if (ok) setVoidingBill(null);
        }}
        onCancel={() => setVoidingBill(null)}
      />
    </div>
  );
}
