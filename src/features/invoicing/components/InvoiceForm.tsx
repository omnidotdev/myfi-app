import { Loader2Icon, PlusIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";

import type {
  Customer,
  DraftLine,
  InvoiceAccount,
  InvoiceInventoryOption,
  TaxJurisdiction,
} from "@/features/invoicing/types/invoicing";
import formatCurrency from "@/lib/format/currency";

interface InvoiceFormPayload {
  customerId: string;
  number: string;
  issueDate: string;
  dueDate: string;
  memo?: string;
  /** currency the invoice is billed in; omitted for the home currency */
  currency?: string;
  /** home-currency units per 1 unit of currency; omitted for the home currency */
  exchangeRate?: number;
  lines: {
    description: string;
    quantity: number;
    unitPrice: number;
    incomeAccountId: string;
    taxJurisdictionId?: string;
    secondaryTaxJurisdictionId?: string;
    inventoryItemId?: string;
    /** discount as a fraction 0..1 (the form collects a 0-100 percent) */
    discountPercent?: number;
  }[];
}

interface InvoiceFormProps {
  customers: Customer[];
  incomeAccounts: InvoiceAccount[];
  taxJurisdictions: TaxJurisdiction[];
  inventoryItems: InvoiceInventoryOption[];
  /** the book's home currency, used as the invoice currency default */
  homeCurrency: string;
  saving: boolean;
  onSubmit: (payload: InvoiceFormPayload) => void;
  onCancel: () => void;
}

// Label a jurisdiction option, flagging compound taxes that stack on the primary
const jurisdictionLabel = (tj: TaxJurisdiction): string =>
  tj.compound ? `${tj.name} (compound)` : tj.name;

// a stable client-side key for React list rendering, never sent to the server
type EditableLine = DraftLine & { key: string };

const emptyLine = (): EditableLine => ({
  key: crypto.randomUUID(),
  description: "",
  quantity: "1",
  unitPrice: "0",
  incomeAccountId: "",
  taxJurisdictionId: "",
  secondaryTaxJurisdictionId: "",
  inventoryItemId: "",
  discountPercent: "",
});

// Clamp a 0-100 percent string to a 0..1 fraction, mirroring the server's
// per-line discount clamp so the preview matches what posts
const discountFraction = (percent: string): number => {
  const value = Number.parseFloat(percent);
  if (!Number.isFinite(value) || value <= 0) return 0;
  return Math.min(value, 100) / 100;
};

// Net extended amount for a line after its discount
const lineTotal = (line: EditableLine): number => {
  const gross =
    (Number.parseFloat(line.quantity) || 0) *
    (Number.parseFloat(line.unitPrice) || 0);
  return gross * (1 - discountFraction(line.discountPercent));
};

const today = () => new Date().toISOString().slice(0, 10);
const inDays = (days: number) =>
  new Date(Date.now() + days * 86_400_000).toISOString().slice(0, 10);

/** Form for drafting an invoice with line items */
function InvoiceForm({
  customers,
  incomeAccounts,
  taxJurisdictions,
  inventoryItems,
  homeCurrency,
  saving,
  onSubmit,
  onCancel,
}: InvoiceFormProps) {
  const [customerId, setCustomerId] = useState("");
  const [number, setNumber] = useState("");
  const [issueDate, setIssueDate] = useState(today());
  const [dueDate, setDueDate] = useState(inDays(30));
  const [memo, setMemo] = useState("");
  const [currency, setCurrency] = useState(homeCurrency);
  const [exchangeRate, setExchangeRate] = useState("1");
  const [lines, setLines] = useState<EditableLine[]>([emptyLine()]);

  // A non-home currency posts to the ledger in the home currency at this rate
  const isForeign =
    currency.trim().toUpperCase() !== homeCurrency.toUpperCase();

  const updateLine = (index: number, patch: Partial<DraftLine>) => {
    setLines((prev) =>
      prev.map((line, i) => (i === index ? { ...line, ...patch } : line)),
    );
  };

  // Selecting an inventory item prefills the line's description, price, and
  // income account from the item (all still editable)
  const selectItem = (index: number, itemId: string) => {
    const item = inventoryItems.find((it) => it.id === itemId);
    if (!item) {
      updateLine(index, { inventoryItemId: "" });
      return;
    }
    updateLine(index, {
      inventoryItemId: item.id,
      description: item.name,
      unitPrice: item.salePrice,
      incomeAccountId: item.incomeAccountId,
    });
  };

  const subtotal = lines.reduce((sum, l) => sum + lineTotal(l), 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Home-currency invoices send neither currency nor rate, so they post
    // exactly as before; a foreign invoice carries its code and rate
    const rate = Number.parseFloat(exchangeRate);
    onSubmit({
      customerId,
      number,
      issueDate,
      dueDate,
      memo: memo || undefined,
      currency: isForeign ? currency.trim().toUpperCase() : undefined,
      exchangeRate: isForeign && rate > 0 ? rate : undefined,
      lines: lines.map((l) => {
        const fraction = discountFraction(l.discountPercent);
        return {
          description: l.description,
          quantity: Number.parseFloat(l.quantity) || 0,
          unitPrice: Number.parseFloat(l.unitPrice) || 0,
          incomeAccountId: l.incomeAccountId,
          taxJurisdictionId: l.taxJurisdictionId || undefined,
          secondaryTaxJurisdictionId: l.secondaryTaxJurisdictionId || undefined,
          inventoryItemId: l.inventoryItemId || undefined,
          discountPercent: fraction > 0 ? fraction : undefined,
        };
      }),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="inv-customer" className="font-medium text-sm">
            Customer
          </label>
          <select
            id="inv-customer"
            required
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="" disabled>
              Select a customer
            </option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="inv-number" className="font-medium text-sm">
            Invoice Number
          </label>
          <input
            id="inv-number"
            type="text"
            required
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="1001"
            className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="inv-issue" className="font-medium text-sm">
            Issue Date
          </label>
          <input
            id="inv-issue"
            type="date"
            required
            value={issueDate}
            onChange={(e) => setIssueDate(e.target.value)}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="inv-due" className="font-medium text-sm">
            Due Date
          </label>
          <input
            id="inv-due"
            type="date"
            required
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="inv-currency" className="font-medium text-sm">
            Currency
          </label>
          <input
            id="inv-currency"
            type="text"
            required
            value={currency}
            onChange={(e) => setCurrency(e.target.value.toUpperCase())}
            placeholder={homeCurrency}
            maxLength={3}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm uppercase focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        {isForeign && (
          <div className="flex flex-col gap-1.5">
            <label htmlFor="inv-rate" className="font-medium text-sm">
              Exchange rate
            </label>
            <input
              id="inv-rate"
              type="number"
              min="0"
              step="any"
              required
              value={exchangeRate}
              onChange={(e) => setExchangeRate(e.target.value)}
              className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <span className="text-muted-foreground text-xs">
              1 {currency.trim().toUpperCase() || currency} ={" "}
              {exchangeRate || "1"} {homeCurrency}. The ledger posts in{" "}
              {homeCurrency} at this rate
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <span className="font-medium text-sm">Line Items</span>
        {lines.map((line, index) => (
          <div
            key={line.key}
            className="flex flex-col gap-2 rounded-md border border-border p-3"
          >
            {inventoryItems.length > 0 && (
              <select
                value={line.inventoryItemId}
                onChange={(e) => selectItem(index, e.target.value)}
                aria-label="Inventory item"
                className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="">Custom line (no inventory item)</option>
                {inventoryItems.map((it) => (
                  <option key={it.id} value={it.id}>
                    {it.name}
                  </option>
                ))}
              </select>
            )}
            <input
              type="text"
              required
              aria-label="Line item description"
              value={line.description}
              onChange={(e) =>
                updateLine(index, { description: e.target.value })
              }
              placeholder="Description"
              className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              <input
                type="number"
                min="0"
                step="0.01"
                required
                value={line.quantity}
                onChange={(e) =>
                  updateLine(index, { quantity: e.target.value })
                }
                placeholder="Qty"
                aria-label="Quantity"
                className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <input
                type="number"
                min="0"
                step="0.01"
                required
                value={line.unitPrice}
                onChange={(e) =>
                  updateLine(index, { unitPrice: e.target.value })
                }
                placeholder="Unit price"
                aria-label="Unit price"
                className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <select
                required
                value={line.incomeAccountId}
                onChange={(e) =>
                  updateLine(index, { incomeAccountId: e.target.value })
                }
                aria-label="Income account"
                className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="" disabled>
                  Income account
                </option>
                {incomeAccounts.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.code ? `${a.code} - ` : ""}
                    {a.name}
                  </option>
                ))}
              </select>
              <select
                value={line.taxJurisdictionId}
                onChange={(e) =>
                  updateLine(index, { taxJurisdictionId: e.target.value })
                }
                aria-label="Tax"
                className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="">No tax</option>
                {taxJurisdictions.map((tj) => (
                  <option key={tj.id} value={tj.id}>
                    {jurisdictionLabel(tj)}
                  </option>
                ))}
              </select>
              <select
                value={line.secondaryTaxJurisdictionId}
                onChange={(e) =>
                  updateLine(index, {
                    secondaryTaxJurisdictionId: e.target.value,
                  })
                }
                aria-label="Secondary tax"
                className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="">No secondary tax</option>
                {taxJurisdictions.map((tj) => (
                  <option key={tj.id} value={tj.id}>
                    {jurisdictionLabel(tj)}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center justify-between gap-2">
              <label className="flex items-center gap-2 text-muted-foreground text-xs">
                Discount %
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  value={line.discountPercent}
                  onChange={(e) =>
                    updateLine(index, { discountPercent: e.target.value })
                  }
                  placeholder="0"
                  aria-label="Discount percent"
                  className="w-20 rounded-md border border-border bg-background px-2 py-1 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </label>
              <span className="text-muted-foreground text-xs">
                Line total{" "}
                <span className="font-medium text-foreground">
                  {formatCurrency(lineTotal(line))}
                </span>
              </span>
            </div>
            {lines.length > 1 && (
              <button
                type="button"
                onClick={() =>
                  setLines((prev) => prev.filter((_, i) => i !== index))
                }
                className="inline-flex w-fit items-center gap-1 text-destructive text-xs hover:underline"
              >
                <Trash2Icon className="size-3.5" />
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => setLines((prev) => [...prev, emptyLine()])}
          className="inline-flex w-fit items-center gap-1 rounded-md border border-border px-3 py-1.5 text-sm transition-colors hover:bg-accent"
        >
          <PlusIcon className="size-3.5" />
          Add line
        </button>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="inv-memo" className="font-medium text-sm">
          Memo
          <span className="ml-1 font-normal text-muted-foreground">
            (optional)
          </span>
        </label>
        <input
          id="inv-memo"
          type="text"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      <div className="flex items-center justify-between border-border border-t pt-3">
        <span className="text-muted-foreground text-sm">
          Subtotal (tax added on posting)
        </span>
        <span className="font-semibold">{formatCurrency(subtotal)}</span>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-border px-4 py-2 text-sm transition-colors hover:bg-accent"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90 disabled:opacity-50"
        >
          {saving && <Loader2Icon className="size-4 animate-spin" />}
          Save Draft
        </button>
      </div>
    </form>
  );
}

export default InvoiceForm;
export type { InvoiceFormPayload };
