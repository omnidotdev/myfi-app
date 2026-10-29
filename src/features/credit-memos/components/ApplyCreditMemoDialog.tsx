import { Loader2Icon } from "lucide-react";
import { useId, useState } from "react";

import Dialog from "@/components/Dialog";
import type { CreditMemoListItem } from "@/features/credit-memos/types/creditMemo";
import type { InvoiceListItem } from "@/features/invoicing/types/invoicing";
import formatCurrency from "@/lib/format/currency";

interface ApplyCreditMemoDialogProps {
  creditMemo: CreditMemoListItem;
  /** Open or partially paid invoices for this memo's customer */
  openInvoices: InvoiceListItem[];
  saving: boolean;
  onSubmit: (payload: {
    invoiceId: string;
    amount: number;
    date: string;
  }) => void;
  onCancel: () => void;
}

const today = () => new Date().toISOString().slice(0, 10);

/** Dialog to apply a posted credit memo to one of the customer's open invoices */
function ApplyCreditMemoDialog({
  creditMemo,
  openInvoices,
  saving,
  onSubmit,
  onCancel,
}: ApplyCreditMemoDialogProps) {
  const titleId = useId();
  const unapplied = Number(creditMemo.unapplied);
  const [invoiceId, setInvoiceId] = useState("");
  const [date, setDate] = useState(today());

  const selectedInvoice = openInvoices.find((inv) => inv.id === invoiceId);
  // Cannot apply more than the memo's remaining credit or the invoice balance
  const maxAmount = selectedInvoice
    ? Math.min(unapplied, Number(selectedInvoice.balanceDue))
    : unapplied;
  const [amount, setAmount] = useState(unapplied.toFixed(2));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      invoiceId,
      amount: Number.parseFloat(amount) || 0,
      date,
    });
  };

  return (
    <Dialog
      open
      onClose={onCancel}
      busy={saving}
      labelledBy={titleId}
      className="max-w-md"
    >
      <h2 id={titleId} className="font-semibold text-lg">
        Apply Credit Memo
      </h2>
      <p className="mb-4 text-muted-foreground text-sm">
        Credit {creditMemo.number} for {creditMemo.customerName} - unapplied{" "}
        {formatCurrency(creditMemo.unapplied)}
      </p>
      {openInvoices.length === 0 ? (
        <>
          <p className="text-muted-foreground text-sm">
            This customer has no open invoices to apply the credit to.
          </p>
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-md border border-border px-4 py-2 text-sm transition-colors hover:bg-accent"
            >
              Close
            </button>
          </div>
        </>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="apply-invoice" className="font-medium text-sm">
              Invoice
            </label>
            <select
              id="apply-invoice"
              required
              value={invoiceId}
              onChange={(e) => setInvoiceId(e.target.value)}
              className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="" disabled>
                Select an invoice
              </option>
              {openInvoices.map((inv) => (
                <option key={inv.id} value={inv.id}>
                  {inv.number} - balance {formatCurrency(inv.balanceDue)}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="apply-amount" className="font-medium text-sm">
              Amount
            </label>
            <input
              id="apply-amount"
              type="number"
              min="0.01"
              max={maxAmount}
              step="0.01"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <span className="text-muted-foreground text-xs">
              Up to {formatCurrency(maxAmount.toFixed(2))}
            </span>
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="apply-date" className="font-medium text-sm">
              Date
            </label>
            <input
              id="apply-date"
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div className="mt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              disabled={saving}
              className="rounded-md border border-border px-4 py-2 text-sm transition-colors hover:bg-accent disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90 disabled:opacity-50"
            >
              {saving && <Loader2Icon className="size-4 animate-spin" />}
              Apply Credit
            </button>
          </div>
        </form>
      )}
    </Dialog>
  );
}

export default ApplyCreditMemoDialog;
