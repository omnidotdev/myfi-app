import { Loader2Icon, PlusIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";

import type { DraftCreditMemoLine } from "@/features/credit-memos/types/creditMemo";
import type {
  Customer,
  InvoiceAccount,
  InvoiceInventoryOption,
  TaxJurisdiction,
} from "@/features/invoicing/types/invoicing";
import formatCurrency from "@/lib/format/currency";

interface CreditMemoFormPayload {
  customerId: string;
  number: string;
  date: string;
  memo?: string;
  lines: {
    description: string;
    quantity: number;
    unitPrice: number;
    incomeAccountId: string;
    taxJurisdictionId?: string;
    /** discount as a fraction 0..1 (the form collects a 0-100 percent) */
    discountPercent?: number;
    /** optional inventory item this line returns to stock when posted */
    inventoryItemId?: string;
  }[];
}

interface CreditMemoFormProps {
  customers: Customer[];
  incomeAccounts: InvoiceAccount[];
  taxJurisdictions: TaxJurisdiction[];
  inventoryItems: InvoiceInventoryOption[];
  saving: boolean;
  onSubmit: (payload: CreditMemoFormPayload) => void;
  onCancel: () => void;
}

// a stable client-side key for React list rendering, never sent to the server
type EditableLine = DraftCreditMemoLine & { key: string };

const emptyLine = (): EditableLine => ({
  key: crypto.randomUUID(),
  description: "",
  quantity: "1",
  unitPrice: "0",
  incomeAccountId: "",
  taxJurisdictionId: "",
  discountPercent: "",
  inventoryItemId: "",
});

const today = () => new Date().toISOString().slice(0, 10);

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

/** Form for drafting a customer credit memo with line items */
function CreditMemoForm({
  customers,
  incomeAccounts,
  taxJurisdictions,
  inventoryItems,
  saving,
  onSubmit,
  onCancel,
}: CreditMemoFormProps) {
  const [customerId, setCustomerId] = useState("");
  const [number, setNumber] = useState("");
  const [date, setDate] = useState(today());
  const [memo, setMemo] = useState("");
  const [lines, setLines] = useState<EditableLine[]>([emptyLine()]);

  const updateLine = (index: number, patch: Partial<DraftCreditMemoLine>) => {
    setLines((prev) =>
      prev.map((line, i) => (i === index ? { ...line, ...patch } : line)),
    );
  };

  const subtotal = lines.reduce((sum, l) => sum + lineTotal(l), 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      customerId,
      number,
      date,
      memo: memo || undefined,
      lines: lines.map((l) => {
        const fraction = discountFraction(l.discountPercent);
        return {
          description: l.description,
          quantity: Number.parseFloat(l.quantity) || 0,
          unitPrice: Number.parseFloat(l.unitPrice) || 0,
          incomeAccountId: l.incomeAccountId,
          taxJurisdictionId: l.taxJurisdictionId || undefined,
          discountPercent: fraction > 0 ? fraction : undefined,
          inventoryItemId: l.inventoryItemId || undefined,
        };
      }),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="cm-customer" className="font-medium text-sm">
            Customer
          </label>
          <select
            id="cm-customer"
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
          <label htmlFor="cm-number" className="font-medium text-sm">
            Credit Memo Number
          </label>
          <input
            id="cm-number"
            type="text"
            required
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="CM-1001"
            className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="cm-date" className="font-medium text-sm">
            Date
          </label>
          <input
            id="cm-date"
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="font-medium text-sm">Line Items</span>
        {lines.map((line, index) => (
          <div
            key={line.key}
            className="flex flex-col gap-2 rounded-md border border-border p-3"
          >
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
                    {tj.name}
                  </option>
                ))}
              </select>
            </div>
            {inventoryItems.length > 0 && (
              <select
                value={line.inventoryItemId}
                onChange={(e) =>
                  updateLine(index, { inventoryItemId: e.target.value })
                }
                aria-label="Returned inventory item"
                className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="">No item returned (price adjustment)</option>
                {inventoryItems.map((it) => (
                  <option key={it.id} value={it.id}>
                    Restock: {it.name}
                  </option>
                ))}
              </select>
            )}
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
        <label htmlFor="cm-memo" className="font-medium text-sm">
          Memo
          <span className="ml-1 font-normal text-muted-foreground">
            (optional)
          </span>
        </label>
        <input
          id="cm-memo"
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

export default CreditMemoForm;
export type { CreditMemoFormPayload };
