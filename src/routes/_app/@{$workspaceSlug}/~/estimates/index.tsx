import { createFileRoute } from "@tanstack/react-router";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import EmptyState from "@/components/EmptyState";
import BookPicker from "@/features/books/components/BookPicker";
import EstimateForm, {
  type EstimateFormPayload,
} from "@/features/estimates/components/EstimateForm";
import type {
  EstimateListItem,
  EstimateStatus,
} from "@/features/estimates/types/estimates";
import type {
  Customer,
  InvoiceAccount,
  TaxJurisdiction,
} from "@/features/invoicing/types/invoicing";
import { apiFetch } from "@/lib/api/apiFetch";
import formatCurrency from "@/lib/format/currency";
import useActiveBook from "@/lib/hooks/useActiveBook";

export const Route = createFileRoute("/_app/@{$workspaceSlug}/~/estimates/")({
  component: EstimatesPage,
});

const STATUS_STYLES: Record<EstimateStatus, string> = {
  draft: "bg-muted text-muted-foreground",
  sent: "bg-blue-100 text-blue-700",
  accepted: "bg-green-100 text-green-700",
  declined: "bg-red-100 text-red-700",
  converted: "bg-primary/10 text-primary",
  expired: "bg-muted text-muted-foreground",
};

const today = () => new Date().toISOString().slice(0, 10);
const inDays = (days: number) =>
  new Date(Date.now() + days * 86_400_000).toISOString().slice(0, 10);

function EstimatesPage() {
  const {
    activeBookId,
    books,
    isLoading: booksLoading,
    setActiveBookId,
  } = useActiveBook();

  const [estimates, setEstimates] = useState<EstimateListItem[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [accounts, setAccounts] = useState<InvoiceAccount[]>([]);
  const [taxJurisdictions, setTaxJurisdictions] = useState<TaxJurisdiction[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [converting, setConverting] = useState<EstimateListItem | null>(null);
  const [convNumber, setConvNumber] = useState("");
  const [convIssue, setConvIssue] = useState(today());
  const [convDue, setConvDue] = useState(inDays(30));

  const incomeAccounts = accounts.filter((a) => a.type === "revenue");

  const fetchData = useCallback(async () => {
    if (!activeBookId) return;
    setIsLoading(true);
    try {
      const [estRes, custRes, acctRes, taxRes] = await Promise.all([
        apiFetch(`/api/estimates?bookId=${activeBookId}`),
        apiFetch(`/api/customers?bookId=${activeBookId}`),
        apiFetch(`/api/accounts?bookId=${activeBookId}`),
        apiFetch(`/api/tax-jurisdictions?bookId=${activeBookId}`),
      ]);
      const [estData, custData, acctData, taxData] = await Promise.all([
        estRes.json(),
        custRes.json(),
        acctRes.json(),
        taxRes.json(),
      ]);
      setEstimates(estData.estimates ?? []);
      setCustomers(custData.customers ?? []);
      setAccounts(acctData.accounts ?? []);
      setTaxJurisdictions(
        taxData.taxJurisdictions ?? taxData.jurisdictions ?? [],
      );
    } catch {
      toast.error("Could not load estimates");
    } finally {
      setIsLoading(false);
    }
  }, [activeBookId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCreate = useCallback(
    async (payload: EstimateFormPayload) => {
      if (!activeBookId) return;
      setSaving(true);
      try {
        const res = await apiFetch("/api/estimates", {
          method: "POST",
          body: JSON.stringify({ bookId: activeBookId, ...payload }),
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error ?? "Create failed");
        }
        toast.success("Draft estimate created");
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

  const setStatus = useCallback(
    async (estimate: EstimateListItem, status: string, message: string) => {
      if (!activeBookId) return;
      setBusyId(estimate.id);
      try {
        const res = await apiFetch(`/api/estimates/${estimate.id}/status`, {
          method: "POST",
          body: JSON.stringify({ bookId: activeBookId, status }),
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error ?? "Update failed");
        }
        toast.success(message);
        await fetchData();
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Update failed");
      } finally {
        setBusyId(null);
      }
    },
    [activeBookId, fetchData],
  );

  const openConvert = useCallback((estimate: EstimateListItem) => {
    setConverting(estimate);
    setConvNumber(estimate.number.replace(/^Q-?/i, "") || estimate.number);
    setConvIssue(today());
    setConvDue(inDays(30));
  }, []);

  const handleConvert = useCallback(async () => {
    if (!activeBookId || !converting) return;
    setBusyId(converting.id);
    try {
      const res = await apiFetch(`/api/estimates/${converting.id}/convert`, {
        method: "POST",
        body: JSON.stringify({
          bookId: activeBookId,
          invoiceNumber: convNumber,
          issueDate: convIssue,
          dueDate: convDue,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Convert failed");
      }
      toast.success("Estimate converted to a draft invoice");
      setConverting(null);
      await fetchData();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Convert failed");
    } finally {
      setBusyId(null);
    }
  }, [activeBookId, converting, convNumber, convIssue, convDue, fetchData]);

  const loading = booksLoading || isLoading;

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">Estimates</h1>
          <p className="text-muted-foreground text-sm">
            Quotes you send to customers, ready to convert into invoices
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
            New Estimate
          </button>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center rounded-lg border border-border bg-card p-8">
          <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
        </div>
      )}

      {!loading && estimates.length === 0 && (
        <EmptyState
          title="No estimates yet"
          description={
            customers.length === 0
              ? "Add a customer, then create your first estimate."
              : "Create an estimate to quote a customer."
          }
        />
      )}

      {!loading && estimates.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="border-border border-b text-left text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Number</th>
                <th className="px-4 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 text-right font-medium">Total</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {estimates.map((est) => (
                <tr
                  key={est.id}
                  className="border-border/50 border-b last:border-0"
                >
                  <td className="px-4 py-3 font-medium">{est.number}</td>
                  <td className="px-4 py-3">{est.customerName}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {est.estimateDate}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 font-medium text-xs ${STATUS_STYLES[est.status]}`}
                    >
                      {est.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {formatCurrency(est.total)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      {busyId === est.id && (
                        <Loader2Icon className="size-4 animate-spin text-muted-foreground" />
                      )}
                      {est.status === "draft" && (
                        <button
                          type="button"
                          disabled={busyId === est.id}
                          onClick={() =>
                            setStatus(est, "sent", "Estimate sent")
                          }
                          className="rounded-md border border-border px-2.5 py-1 text-xs transition-colors hover:bg-accent disabled:opacity-50"
                        >
                          Send
                        </button>
                      )}
                      {est.status === "sent" && (
                        <>
                          <button
                            type="button"
                            disabled={busyId === est.id}
                            onClick={() =>
                              setStatus(est, "accepted", "Estimate accepted")
                            }
                            className="rounded-md border border-border px-2.5 py-1 text-xs transition-colors hover:bg-accent disabled:opacity-50"
                          >
                            Accept
                          </button>
                          <button
                            type="button"
                            disabled={busyId === est.id}
                            onClick={() =>
                              setStatus(est, "declined", "Estimate declined")
                            }
                            className="rounded-md border border-border px-2.5 py-1 text-destructive text-xs transition-colors hover:bg-accent disabled:opacity-50"
                          >
                            Decline
                          </button>
                        </>
                      )}
                      {est.status === "accepted" && (
                        <button
                          type="button"
                          disabled={busyId === est.id}
                          onClick={() => openConvert(est)}
                          className="rounded-md bg-primary px-2.5 py-1 font-medium text-primary-foreground text-xs transition-colors hover:bg-primary/90 disabled:opacity-50"
                        >
                          Convert to Invoice
                        </button>
                      )}
                      {est.status === "converted" && (
                        <span className="text-muted-foreground text-xs">
                          Invoiced
                        </span>
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
            <h2 className="mb-4 font-semibold text-lg">New Estimate</h2>
            <EstimateForm
              customers={customers}
              incomeAccounts={incomeAccounts}
              taxJurisdictions={taxJurisdictions}
              saving={saving}
              onSubmit={handleCreate}
              onCancel={() => setFormOpen(false)}
            />
          </div>
        </div>
      )}

      {converting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
            onClick={() => setConverting(null)}
            aria-label="Close dialog"
            disabled={busyId === converting.id}
          />
          <div className="relative w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-lg">
            <h2 className="font-semibold text-lg">Convert to Invoice</h2>
            <p className="mb-4 text-muted-foreground text-sm">
              Estimate {converting.number} for {converting.customerName}
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="conv-number" className="font-medium text-sm">
                  Invoice Number
                </label>
                <input
                  id="conv-number"
                  type="text"
                  value={convNumber}
                  onChange={(e) => setConvNumber(e.target.value)}
                  className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="conv-issue" className="font-medium text-sm">
                    Issue Date
                  </label>
                  <input
                    id="conv-issue"
                    type="date"
                    value={convIssue}
                    onChange={(e) => setConvIssue(e.target.value)}
                    className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="conv-due" className="font-medium text-sm">
                    Due Date
                  </label>
                  <input
                    id="conv-due"
                    type="date"
                    value={convDue}
                    onChange={(e) => setConvDue(e.target.value)}
                    className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>
              <div className="mt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setConverting(null)}
                  disabled={busyId === converting.id}
                  className="rounded-md border border-border px-4 py-2 text-sm transition-colors hover:bg-accent disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConvert}
                  disabled={busyId === converting.id || !convNumber}
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90 disabled:opacity-50"
                >
                  {busyId === converting.id && (
                    <Loader2Icon className="size-4 animate-spin" />
                  )}
                  Create Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
