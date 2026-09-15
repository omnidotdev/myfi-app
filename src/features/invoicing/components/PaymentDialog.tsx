import { Loader2Icon } from "lucide-react";
import { useState } from "react";

import type {
  InvoiceAccount,
  InvoiceListItem,
} from "@/features/invoicing/types/invoicing";
import formatCurrency from "@/lib/format/currency";

interface PaymentDialogProps {
  invoice: InvoiceListItem;
  depositAccounts: InvoiceAccount[];
  saving: boolean;
  onSubmit: (payload: {
    amount: number;
    depositAccountId: string;
    date: string;
    method?: string;
  }) => void;
  onCancel: () => void;
}

const today = () => new Date().toISOString().slice(0, 10);

/** Dialog to record a payment against an open invoice */
function PaymentDialog({
  invoice,
  depositAccounts,
  saving,
  onSubmit,
  onCancel,
}: PaymentDialogProps) {
  const balance = Number(invoice.balanceDue);
  const [amount, setAmount] = useState(balance.toFixed(2));
  const [depositAccountId, setDepositAccountId] = useState("");
  const [date, setDate] = useState(today());
  const [method, setMethod] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      amount: Number.parseFloat(amount) || 0,
      depositAccountId,
      date,
      method: method || undefined,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <button
        type="button"
        className="absolute inset-0 bg-black/50"
        onClick={onCancel}
        aria-label="Close dialog"
        disabled={saving}
      />
      <div className="relative w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-lg">
        <h2 className="font-semibold text-lg">Record Payment</h2>
        <p className="mb-4 text-muted-foreground text-sm">
          Invoice {invoice.number} to {invoice.customerName} - balance{" "}
          {formatCurrency(invoice.balanceDue)}
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="pay-amount" className="font-medium text-sm">
              Amount
            </label>
            <input
              id="pay-amount"
              type="number"
              min="0.01"
              max={balance}
              step="0.01"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="pay-account" className="font-medium text-sm">
              Deposit To
            </label>
            <select
              id="pay-account"
              required
              value={depositAccountId}
              onChange={(e) => setDepositAccountId(e.target.value)}
              className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="" disabled>
                Select an account
              </option>
              {depositAccounts.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.code ? `${a.code} - ` : ""}
                  {a.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="pay-date" className="font-medium text-sm">
              Date
            </label>
            <input
              id="pay-date"
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="pay-method" className="font-medium text-sm">
              Method
              <span className="ml-1 font-normal text-muted-foreground">
                (optional)
              </span>
            </label>
            <input
              id="pay-method"
              type="text"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              placeholder="Check, ACH, card"
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
              Record Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PaymentDialog;
