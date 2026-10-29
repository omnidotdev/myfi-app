import { Loader2Icon } from "lucide-react";
import { useId, useState } from "react";

import Dialog from "@/components/Dialog";
import type {
  InvoiceAccount,
  InvoiceListItem,
} from "@/features/invoicing/types/invoicing";
import formatCurrency from "@/lib/format/currency";

interface PaymentDialogProps {
  invoice: InvoiceListItem;
  depositAccounts: InvoiceAccount[];
  /** the book's home currency, used to decide whether to collect an FX rate */
  homeCurrency: string;
  saving: boolean;
  onSubmit: (payload: {
    amount: number;
    depositAccountId?: string;
    toUndepositedFunds?: boolean;
    date: string;
    method?: string;
    exchangeRate?: number;
  }) => void;
  onCancel: () => void;
}

const today = () => new Date().toISOString().slice(0, 10);

/** Dialog to record a payment against an open invoice */
function PaymentDialog({
  invoice,
  depositAccounts,
  homeCurrency,
  saving,
  onSubmit,
  onCancel,
}: PaymentDialogProps) {
  const titleId = useId();
  const balance = Number(invoice.balanceDue);
  const [amount, setAmount] = useState(balance.toFixed(2));
  const [depositAccountId, setDepositAccountId] = useState("");
  const [toUndepositedFunds, setToUndepositedFunds] = useState(false);
  const [date, setDate] = useState(today());
  const [method, setMethod] = useState("");
  const [exchangeRate, setExchangeRate] = useState("1");

  // A foreign-currency invoice settles in the home currency at the rate on the
  // payment date; a change from the invoice's rate books an FX gain or loss
  const invoiceCurrency = invoice.currency ?? homeCurrency;
  const isForeign =
    invoiceCurrency.toUpperCase() !== homeCurrency.toUpperCase();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const rate = Number.parseFloat(exchangeRate);
    onSubmit({
      amount: Number.parseFloat(amount) || 0,
      depositAccountId: toUndepositedFunds ? undefined : depositAccountId,
      toUndepositedFunds: toUndepositedFunds || undefined,
      date,
      method: method || undefined,
      exchangeRate: isForeign && rate > 0 ? rate : undefined,
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
        Record Payment
      </h2>
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
            required={!toUndepositedFunds}
            disabled={toUndepositedFunds}
            value={depositAccountId}
            onChange={(e) => setDepositAccountId(e.target.value)}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
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
          <label className="mt-1 flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={toUndepositedFunds}
              onChange={(e) => setToUndepositedFunds(e.target.checked)}
              className="size-4 rounded border-border"
            />
            Hold in Undeposited Funds (deposit later)
          </label>
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
        {isForeign && (
          <div className="flex flex-col gap-1.5">
            <label htmlFor="pay-rate" className="font-medium text-sm">
              Exchange rate
            </label>
            <input
              id="pay-rate"
              type="number"
              min="0"
              step="any"
              required
              value={exchangeRate}
              onChange={(e) => setExchangeRate(e.target.value)}
              className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <span className="text-muted-foreground text-xs">
              1 {invoiceCurrency} = {exchangeRate || "1"} {homeCurrency}. A rate
              change from the invoice books a foreign-exchange gain or loss
            </span>
          </div>
        )}
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
    </Dialog>
  );
}

export default PaymentDialog;
