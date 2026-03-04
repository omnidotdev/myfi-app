import { PlusIcon, TrashIcon } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

import type { Account } from "@/features/accounts/types/account";

type LineInput = {
  accountId: string;
  debit: string;
  credit: string;
  memo: string;
};

type JournalEntryFormProps = {
  accounts: Account[];
  onSubmit: (entry: { date: string; memo: string; lines: LineInput[] }) => void;
  onCancel: () => void;
};

const EMPTY_LINE: LineInput = { accountId: "", debit: "", credit: "", memo: "" };

/** Create a fresh line with default values */
function createLine(): LineInput {
  return { ...EMPTY_LINE };
}

/** Parse a numeric string to a float, returning 0 for invalid values */
function parseAmount(value: string): number {
  const num = Number.parseFloat(value);
  return Number.isNaN(num) ? 0 : num;
}

/**
 * Multi-line journal entry form with running balance display
 */
function JournalEntryForm({
  accounts,
  onSubmit,
  onCancel,
}: JournalEntryFormProps) {
  const [date, setDate] = useState("");
  const [memo, setMemo] = useState("");
  const [lines, setLines] = useState<LineInput[]>([
    createLine(),
    createLine(),
  ]);

  const { totalDebits, totalCredits, difference } = useMemo(() => {
    let debits = 0;
    let credits = 0;

    for (const line of lines) {
      debits += parseAmount(line.debit);
      credits += parseAmount(line.credit);
    }

    return {
      totalDebits: debits,
      totalCredits: credits,
      difference: debits - credits,
    };
  }, [lines]);

  const isBalanced = Math.abs(difference) < 0.005;
  const canSubmit = date && lines.length >= 2 && isBalanced;

  const updateLine = useCallback(
    (index: number, field: keyof LineInput, value: string) => {
      setLines((prev) =>
        prev.map((line, i) => (i === index ? { ...line, [field]: value } : line)),
      );
    },
    [],
  );

  const removeLine = useCallback((index: number) => {
    setLines((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const addLine = useCallback(() => {
    setLines((prev) => [...prev, createLine()]);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    onSubmit({ date, memo, lines });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Header fields */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Date */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="entry-date" className="font-medium text-sm">
            Date
          </label>
          <input
            id="entry-date"
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {/* Memo */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="entry-memo" className="font-medium text-sm">
            Memo
          </label>
          <input
            id="entry-memo"
            type="text"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="Optional description"
            className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>

      {/* Line items */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-sm">Line Items</h3>
          <button
            type="button"
            onClick={addLine}
            className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm transition-colors hover:bg-accent"
          >
            <PlusIcon className="size-3.5" />
            Add Line
          </button>
        </div>

        {/* Column headers */}
        <div className="hidden grid-cols-[1fr_6rem_6rem_1fr_2.5rem] gap-2 text-muted-foreground text-xs sm:grid">
          <span>Account</span>
          <span>Debit</span>
          <span>Credit</span>
          <span>Memo</span>
          <span />
        </div>

        {/* Lines */}
        {lines.map((line, index) => (
          <div
            // Using index as key because lines have no stable identity
            // biome-ignore lint/suspicious/noArrayIndexKey: lines lack stable IDs
            key={index}
            className="grid grid-cols-1 gap-2 rounded-md border border-border p-3 sm:grid-cols-[1fr_6rem_6rem_1fr_2.5rem] sm:border-0 sm:p-0"
          >
            {/* Account picker */}
            <select
              value={line.accountId}
              onChange={(e) => updateLine(index, "accountId", e.target.value)}
              aria-label={`Line ${index + 1} account`}
              className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="">Select account</option>
              {accounts
                .filter((a) => !a.isPlaceholder)
                .map((a) => (
                  <option key={a.rowId} value={a.rowId}>
                    {a.code} - {a.name}
                  </option>
                ))}
            </select>

            {/* Debit */}
            <input
              type="number"
              step="0.01"
              min="0"
              value={line.debit}
              onChange={(e) => updateLine(index, "debit", e.target.value)}
              placeholder="0.00"
              aria-label={`Line ${index + 1} debit`}
              className="rounded-md border border-border bg-background px-3 py-2 text-right font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />

            {/* Credit */}
            <input
              type="number"
              step="0.01"
              min="0"
              value={line.credit}
              onChange={(e) => updateLine(index, "credit", e.target.value)}
              placeholder="0.00"
              aria-label={`Line ${index + 1} credit`}
              className="rounded-md border border-border bg-background px-3 py-2 text-right font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />

            {/* Line memo */}
            <input
              type="text"
              value={line.memo}
              onChange={(e) => updateLine(index, "memo", e.target.value)}
              placeholder="Line memo"
              aria-label={`Line ${index + 1} memo`}
              className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />

            {/* Remove */}
            <button
              type="button"
              onClick={() => removeLine(index)}
              disabled={lines.length <= 2}
              aria-label={`Remove line ${index + 1}`}
              className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive disabled:cursor-not-allowed disabled:opacity-30"
            >
              <TrashIcon className="size-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Running balance */}
      <div className="flex items-center justify-between rounded-md border border-border bg-muted/50 px-4 py-3">
        <div className="flex gap-6 font-mono text-sm">
          <span>
            Debits:{" "}
            <span className="font-semibold">{totalDebits.toFixed(2)}</span>
          </span>
          <span>
            Credits:{" "}
            <span className="font-semibold">{totalCredits.toFixed(2)}</span>
          </span>
        </div>

        <span
          className={`font-mono font-semibold text-sm ${
            isBalanced ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
          }`}
        >
          Difference: {difference.toFixed(2)}
        </span>
      </div>

      {/* Actions */}
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
          disabled={!canSubmit}
          className="rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Create Entry
        </button>
      </div>
    </form>
  );
}

export default JournalEntryForm;
