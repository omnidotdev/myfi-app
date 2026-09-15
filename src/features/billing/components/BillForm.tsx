import { Loader2Icon, PlusIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";

import type {
  BillVendor,
  DraftBillLine,
} from "@/features/billing/types/billing";
import type {
  InvoiceAccount,
  TaxJurisdiction,
} from "@/features/invoicing/types/invoicing";
import formatCurrency from "@/lib/format/currency";

interface BillFormPayload {
  vendorId: string;
  number: string;
  billDate: string;
  dueDate: string;
  memo?: string;
  lines: {
    description: string;
    quantity: number;
    unitPrice: number;
    expenseAccountId: string;
    taxJurisdictionId?: string;
  }[];
}

interface BillFormProps {
  vendors: BillVendor[];
  expenseAccounts: InvoiceAccount[];
  taxJurisdictions: TaxJurisdiction[];
  saving: boolean;
  onSubmit: (payload: BillFormPayload) => void;
  onCancel: () => void;
}

type EditableLine = DraftBillLine & { key: string };

const emptyLine = (): EditableLine => ({
  key: crypto.randomUUID(),
  description: "",
  quantity: "1",
  unitPrice: "0",
  expenseAccountId: "",
  taxJurisdictionId: "",
});

const today = () => new Date().toISOString().slice(0, 10);
const inDays = (days: number) =>
  new Date(Date.now() + days * 86_400_000).toISOString().slice(0, 10);

/** Form for drafting a vendor bill with line items (mirror of InvoiceForm) */
function BillForm({
  vendors,
  expenseAccounts,
  taxJurisdictions,
  saving,
  onSubmit,
  onCancel,
}: BillFormProps) {
  const [vendorId, setVendorId] = useState("");
  const [number, setNumber] = useState("");
  const [billDate, setBillDate] = useState(today());
  const [dueDate, setDueDate] = useState(inDays(30));
  const [memo, setMemo] = useState("");
  const [lines, setLines] = useState<EditableLine[]>([emptyLine()]);

  const updateLine = (index: number, patch: Partial<DraftBillLine>) => {
    setLines((prev) =>
      prev.map((line, i) => (i === index ? { ...line, ...patch } : line)),
    );
  };

  const subtotal = lines.reduce(
    (sum, l) =>
      sum +
      (Number.parseFloat(l.quantity) || 0) *
        (Number.parseFloat(l.unitPrice) || 0),
    0,
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      vendorId,
      number,
      billDate,
      dueDate,
      memo: memo || undefined,
      lines: lines.map((l) => ({
        description: l.description,
        quantity: Number.parseFloat(l.quantity) || 0,
        unitPrice: Number.parseFloat(l.unitPrice) || 0,
        expenseAccountId: l.expenseAccountId,
        taxJurisdictionId: l.taxJurisdictionId || undefined,
      })),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="bill-vendor" className="font-medium text-sm">
            Vendor
          </label>
          <select
            id="bill-vendor"
            required
            value={vendorId}
            onChange={(e) => setVendorId(e.target.value)}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="" disabled>
              Select a vendor
            </option>
            {vendors.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="bill-number" className="font-medium text-sm">
            Bill Number
          </label>
          <input
            id="bill-number"
            type="text"
            required
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="INV-4501"
            className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="bill-date" className="font-medium text-sm">
            Bill Date
          </label>
          <input
            id="bill-date"
            type="date"
            required
            value={billDate}
            onChange={(e) => setBillDate(e.target.value)}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="bill-due" className="font-medium text-sm">
            Due Date
          </label>
          <input
            id="bill-due"
            type="date"
            required
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
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
                value={line.expenseAccountId}
                onChange={(e) =>
                  updateLine(index, { expenseAccountId: e.target.value })
                }
                aria-label="Expense account"
                className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="" disabled>
                  Expense account
                </option>
                {expenseAccounts.map((a) => (
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
        <label htmlFor="bill-memo" className="font-medium text-sm">
          Memo
          <span className="ml-1 font-normal text-muted-foreground">
            (optional)
          </span>
        </label>
        <input
          id="bill-memo"
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

export default BillForm;
export type { BillFormPayload };
