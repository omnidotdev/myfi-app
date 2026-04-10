import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Loader2Icon, PlusIcon, TrashIcon } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import type { Account } from "@/features/accounts/types/account";
import BookPicker from "@/features/books/components/BookPicker";
import { API_URL } from "@/lib/config/env.config";
import useActiveBook from "@/lib/hooks/useActiveBook";

export const Route = createFileRoute("/_app/ledger/batch")({
  component: BatchJournalEntryPage,
});

// region types

interface BatchLine {
  id: string;
  accountId: string;
  debit: string;
  credit: string;
  memo: string;
}

interface BatchEntry {
  id: string;
  date: string;
  memo: string;
  lines: BatchLine[];
}

// endregion

// region helpers

let nextId = 1;
function uid() {
  return `batch-${Date.now()}-${nextId++}`;
}

function emptyLine(): BatchLine {
  return { id: uid(), accountId: "", debit: "", credit: "", memo: "" };
}

function emptyEntry(): BatchEntry {
  return {
    id: uid(),
    date: "",
    memo: "",
    lines: [emptyLine(), emptyLine()],
  };
}

function parseNum(v: string): number {
  const n = Number.parseFloat(v);
  return Number.isNaN(n) ? 0 : n;
}

function entryTotals(lines: BatchLine[]) {
  let debits = 0;
  let credits = 0;

  for (const l of lines) {
    debits += parseNum(l.debit);
    credits += parseNum(l.credit);
  }

  return { debits, credits, diff: Math.abs(debits - credits) };
}

function isEntryValid(entry: BatchEntry): boolean {
  if (!entry.date) return false;
  if (entry.lines.length < 2) return false;

  // Every line must have an account and at least one amount
  for (const l of entry.lines) {
    if (!l.accountId) return false;
    if (!l.debit && !l.credit) return false;
  }

  const { diff } = entryTotals(entry.lines);

  return diff < 0.005;
}

// endregion

function BatchJournalEntryPage() {
  const navigate = useNavigate();
  const {
    activeBookId,
    books,
    isLoading: booksLoading,
    setActiveBookId,
  } = useActiveBook();

  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [entries, setEntries] = useState<BatchEntry[]>([emptyEntry()]);

  // Fetch accounts
  const fetchAccounts = useCallback(async () => {
    if (!activeBookId) return;

    setIsLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/accounts?bookId=${activeBookId}`);
      const data = await res.json();
      const mapped = (data.accounts ?? []).map(
        (a: Record<string, unknown>) => ({
          ...a,
          rowId: a.id as string,
        }),
      );

      setAccounts(mapped);
    } catch {
      // Silently handle fetch errors
    } finally {
      setIsLoading(false);
    }
  }, [activeBookId]);

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  // All entries valid check
  const allValid = useMemo(
    () => entries.length > 0 && entries.every(isEntryValid),
    [entries],
  );

  // region entry mutations

  const updateEntry = useCallback(
    (entryId: string, patch: Partial<Omit<BatchEntry, "id" | "lines">>) => {
      setEntries((prev) =>
        prev.map((e) => (e.id === entryId ? { ...e, ...patch } : e)),
      );
    },
    [],
  );

  const removeEntry = useCallback((entryId: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== entryId));
  }, []);

  const addEntry = useCallback(() => {
    setEntries((prev) => [...prev, emptyEntry()]);
  }, []);

  // endregion

  // region line mutations

  const updateLine = useCallback(
    (
      entryId: string,
      lineId: string,
      patch: Partial<Omit<BatchLine, "id">>,
    ) => {
      setEntries((prev) =>
        prev.map((e) =>
          e.id === entryId
            ? {
                ...e,
                lines: e.lines.map((l) =>
                  l.id === lineId ? { ...l, ...patch } : l,
                ),
              }
            : e,
        ),
      );
    },
    [],
  );

  const removeLine = useCallback((entryId: string, lineId: string) => {
    setEntries((prev) =>
      prev.map((e) =>
        e.id === entryId
          ? { ...e, lines: e.lines.filter((l) => l.id !== lineId) }
          : e,
      ),
    );
  }, []);

  const addLine = useCallback((entryId: string) => {
    setEntries((prev) =>
      prev.map((e) =>
        e.id === entryId ? { ...e, lines: [...e.lines, emptyLine()] } : e,
      ),
    );
  }, []);

  // endregion

  // region clipboard paste

  const handlePaste = useCallback(
    (entryId: string, e: React.ClipboardEvent) => {
      const text = e.clipboardData.getData("text/plain");
      if (!text.includes("\t")) return;

      e.preventDefault();

      const rows = text
        .split("\n")
        .map((r) => r.split("\t").map((c) => c.trim()))
        .filter((r) => r.some(Boolean));

      if (rows.length === 0) return;

      const newLines: BatchLine[] = rows.map((cols) => {
        const [nameOrCode = "", debit = "", credit = "", memo = ""] = cols;

        // Try to match account by name or code (case-insensitive)
        const lower = nameOrCode.toLowerCase();
        const matched = accounts.find(
          (a) =>
            a.name.toLowerCase() === lower || a.code.toLowerCase() === lower,
        );

        return {
          id: uid(),
          accountId: matched?.rowId ?? "",
          debit,
          credit,
          memo,
        };
      });

      setEntries((prev) =>
        prev.map((entry) =>
          entry.id === entryId ? { ...entry, lines: newLines } : entry,
        ),
      );
    },
    [accounts],
  );

  // endregion

  // region submit

  const handleSubmit = useCallback(async () => {
    if (!activeBookId || !allValid) return;

    setIsSubmitting(true);

    try {
      const body = {
        entries: entries.map((entry) => ({
          bookId: activeBookId,
          date: entry.date,
          memo: entry.memo || undefined,
          lines: entry.lines.map((line) => ({
            accountId: line.accountId,
            debit: line.debit || undefined,
            credit: line.credit || undefined,
            memo: line.memo || undefined,
          })),
        })),
      };

      const res = await fetch(`${API_URL}/api/journal-entries/batch`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        const message =
          (data as { error?: string } | null)?.error ??
          "Failed to create batch entries";
        throw new Error(message);
      }

      toast.success(
        `Created ${entries.length} journal ${entries.length === 1 ? "entry" : "entries"}`,
      );
      navigate({ to: "/ledger" });
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to create batch entries",
      );
    } finally {
      setIsSubmitting(false);
    }
  }, [activeBookId, allValid, entries, navigate]);

  // endregion

  const loading = booksLoading || isLoading;

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">Batch Journal Entry</h1>
          <p className="text-muted-foreground text-sm">
            Create multiple journal entries at once
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
            disabled={!allValid || isSubmitting}
            onClick={handleSubmit}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting && <Loader2Icon className="size-4 animate-spin" />}
            Post All
          </button>
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center rounded-lg border border-border bg-card p-8">
          <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
        </div>
      )}

      {/* Entry groups */}
      {!loading &&
        entries.map((entry, entryIdx) => (
          <EntryCard
            key={entry.id}
            entry={entry}
            index={entryIdx}
            accounts={accounts}
            canRemove={entries.length > 1}
            onUpdate={updateEntry}
            onRemove={removeEntry}
            onUpdateLine={updateLine}
            onRemoveLine={removeLine}
            onAddLine={addLine}
            onPaste={handlePaste}
          />
        ))}

      {/* Add entry button */}
      {!loading && (
        <button
          type="button"
          onClick={addEntry}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-border border-dashed p-4 text-muted-foreground text-sm transition-colors hover:border-primary hover:text-foreground"
        >
          <PlusIcon className="size-4" />
          Add Entry
        </button>
      )}
    </div>
  );
}

// region EntryCard

function EntryCard({
  entry,
  index,
  accounts,
  canRemove,
  onUpdate,
  onRemove,
  onUpdateLine,
  onRemoveLine,
  onAddLine,
  onPaste,
}: {
  entry: BatchEntry;
  index: number;
  accounts: Account[];
  canRemove: boolean;
  onUpdate: (
    id: string,
    patch: Partial<Omit<BatchEntry, "id" | "lines">>,
  ) => void;
  onRemove: (id: string) => void;
  onUpdateLine: (
    entryId: string,
    lineId: string,
    patch: Partial<Omit<BatchLine, "id">>,
  ) => void;
  onRemoveLine: (entryId: string, lineId: string) => void;
  onAddLine: (entryId: string) => void;
  onPaste: (entryId: string, e: React.ClipboardEvent) => void;
}) {
  const { debits, credits, diff } = entryTotals(entry.lines);
  const balanced = diff < 0.005;

  return (
    <div className="rounded-lg border border-border bg-card">
      {/* Card header */}
      <div className="flex items-center gap-4 border-border border-b p-4">
        <span className="font-medium text-muted-foreground text-xs">
          #{index + 1}
        </span>

        <input
          type="date"
          value={entry.date}
          onChange={(e) => onUpdate(entry.id, { date: e.target.value })}
          className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        />

        <input
          type="text"
          placeholder="Memo (optional)"
          value={entry.memo}
          onChange={(e) => onUpdate(entry.id, { memo: e.target.value })}
          className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        />

        {/* Balance indicator */}
        <span
          className={`whitespace-nowrap font-medium text-xs ${balanced ? "text-green-600" : "text-red-600"}`}
        >
          Dr {debits.toFixed(2)} / Cr {credits.toFixed(2)}
          {!balanced && ` (off by ${diff.toFixed(2)})`}
        </span>

        {canRemove && (
          <button
            type="button"
            onClick={() => onRemove(entry.id)}
            className="rounded p-1 text-muted-foreground transition-colors hover:text-destructive"
            title="Remove entry"
          >
            <TrashIcon className="size-4" />
          </button>
        )}
      </div>

      {/* Lines table */}
      <div className="overflow-x-auto" onPaste={(e) => onPaste(entry.id, e)}>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-border border-b text-left text-muted-foreground text-xs">
              <th className="px-4 py-2 font-medium">Account</th>
              <th className="px-4 py-2 font-medium">Debit</th>
              <th className="px-4 py-2 font-medium">Credit</th>
              <th className="px-4 py-2 font-medium">Memo</th>
              <th className="w-10 px-2 py-2" />
            </tr>
          </thead>
          <tbody>
            {entry.lines.map((line) => (
              <tr
                key={line.id}
                className="border-border border-b last:border-0"
              >
                <td className="px-4 py-2">
                  <select
                    value={line.accountId}
                    onChange={(e) =>
                      onUpdateLine(entry.id, line.id, {
                        accountId: e.target.value,
                      })
                    }
                    className="w-full rounded-md border border-border bg-background px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="">Select account</option>
                    {accounts.map((a) => (
                      <option key={a.rowId} value={a.rowId}>
                        {a.code} - {a.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={line.debit}
                    onChange={(e) =>
                      onUpdateLine(entry.id, line.id, {
                        debit: e.target.value,
                      })
                    }
                    className="w-28 rounded-md border border-border bg-background px-2 py-1.5 text-right text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={line.credit}
                    onChange={(e) =>
                      onUpdateLine(entry.id, line.id, {
                        credit: e.target.value,
                      })
                    }
                    className="w-28 rounded-md border border-border bg-background px-2 py-1.5 text-right text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="text"
                    placeholder="Line memo"
                    value={line.memo}
                    onChange={(e) =>
                      onUpdateLine(entry.id, line.id, { memo: e.target.value })
                    }
                    className="w-full rounded-md border border-border bg-background px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </td>
                <td className="px-2 py-2">
                  <button
                    type="button"
                    disabled={entry.lines.length <= 2}
                    onClick={() => onRemoveLine(entry.id, line.id)}
                    className="rounded p-1 text-muted-foreground transition-colors hover:text-destructive disabled:cursor-not-allowed disabled:opacity-30"
                    title="Remove line"
                  >
                    <TrashIcon className="size-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add line button */}
      <div className="border-border border-t px-4 py-2">
        <button
          type="button"
          onClick={() => onAddLine(entry.id)}
          className="inline-flex items-center gap-1 text-muted-foreground text-xs transition-colors hover:text-foreground"
        >
          <PlusIcon className="size-3" />
          Add Line
        </button>
      </div>
    </div>
  );
}

// endregion
