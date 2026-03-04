import { ChevronDownIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import { useCallback, useState } from "react";

import type {
  JournalEntry,
  JournalEntrySource,
} from "@/features/ledger/types/journalEntry";

type JournalEntryTableProps = {
  entries: JournalEntry[];
  onDelete?: (entryId: string) => void;
};

const SOURCE_BADGE_CLASSES: Record<JournalEntrySource, string> = {
  manual: "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300",
  mantle_sync:
    "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300",
  plaid_import:
    "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300",
  crypto_sync:
    "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300",
  recurring:
    "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300",
};

/** Format a snake_case source label for display */
function formatSource(source: string): string {
  return source
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/** Compute the total amount (sum of debits) for an entry */
function computeTotal(entry: JournalEntry): string {
  let total = 0;
  for (const line of entry.lines) {
    total += Number.parseFloat(line.debit) || 0;
  }
  return total.toFixed(2);
}

/**
 * Table displaying journal entries with expandable line detail
 */
function JournalEntryTable({ entries, onDelete }: JournalEntryTableProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggleExpanded = useCallback((entryId: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(entryId)) {
        next.delete(entryId);
      } else {
        next.add(entryId);
      }
      return next;
    });
  }, []);

  if (entries.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-8 text-center">
        <p className="text-muted-foreground">
          No journal entries yet. Create your first entry to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-card">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-border border-b text-left text-muted-foreground">
            <th className="w-8 px-3 py-3" />
            <th className="px-3 py-3 font-medium">Date</th>
            <th className="px-3 py-3 font-medium">Memo</th>
            <th className="px-3 py-3 font-medium">Source</th>
            <th className="px-3 py-3 font-medium">Status</th>
            <th className="px-3 py-3 text-right font-medium">Total</th>
            {onDelete && <th className="w-10 px-3 py-3" />}
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => {
            const isExpanded = expandedIds.has(entry.rowId);

            return (
              <EntryRow
                key={entry.rowId}
                entry={entry}
                isExpanded={isExpanded}
                onToggle={() => toggleExpanded(entry.rowId)}
                onDelete={onDelete}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

type EntryRowProps = {
  entry: JournalEntry;
  isExpanded: boolean;
  onToggle: () => void;
  onDelete?: (entryId: string) => void;
};

function EntryRow({ entry, isExpanded, onToggle, onDelete }: EntryRowProps) {
  return (
    <>
      {/* Summary row */}
      <tr
        className="cursor-pointer border-border border-b transition-colors hover:bg-accent/50"
        onClick={onToggle}
      >
        <td className="px-3 py-3">
          {isExpanded ? (
            <ChevronDownIcon className="size-4 text-muted-foreground" />
          ) : (
            <ChevronRightIcon className="size-4 text-muted-foreground" />
          )}
        </td>
        <td className="whitespace-nowrap px-3 py-3 font-mono">{entry.date}</td>
        <td className="max-w-xs truncate px-3 py-3">
          {entry.memo || (
            <span className="text-muted-foreground">No memo</span>
          )}
        </td>
        <td className="px-3 py-3">
          <span
            className={`inline-block rounded-full px-2 py-0.5 text-xs ${SOURCE_BADGE_CLASSES[entry.source]}`}
          >
            {formatSource(entry.source)}
          </span>
        </td>
        <td className="px-3 py-3">
          <div className="flex gap-1.5">
            {entry.isReviewed && (
              <span className="rounded-full bg-blue-100 px-2 py-0.5 text-blue-800 text-xs dark:bg-blue-900/20 dark:text-blue-300">
                Reviewed
              </span>
            )}
            {entry.isReconciled && (
              <span className="rounded-full bg-green-100 px-2 py-0.5 text-green-800 text-xs dark:bg-green-900/20 dark:text-green-300">
                Reconciled
              </span>
            )}
            {!entry.isReviewed && !entry.isReconciled && (
              <span className="text-muted-foreground text-xs">Pending</span>
            )}
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-3 text-right font-mono">
          ${computeTotal(entry)}
        </td>
        {onDelete && (
          <td className="px-3 py-3">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(entry.rowId);
              }}
              aria-label={`Delete entry ${entry.date}`}
              className="rounded p-1 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
            >
              <TrashIcon className="size-3.5" />
            </button>
          </td>
        )}
      </tr>

      {/* Expanded line detail */}
      {isExpanded && (
        <tr className="border-border border-b bg-muted/30">
          <td colSpan={onDelete ? 7 : 6} className="px-6 py-3">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-muted-foreground text-xs">
                  <th className="pb-2 font-medium">Account</th>
                  <th className="pb-2 text-right font-medium">Debit</th>
                  <th className="pb-2 text-right font-medium">Credit</th>
                  <th className="pb-2 font-medium">Memo</th>
                </tr>
              </thead>
              <tbody>
                {entry.lines.map((line) => (
                  <tr key={line.rowId}>
                    <td className="py-1">
                      {line.accountCode && (
                        <span className="mr-2 font-mono text-muted-foreground text-xs">
                          {line.accountCode}
                        </span>
                      )}
                      {line.accountName || line.accountId}
                    </td>
                    <td className="py-1 text-right font-mono">
                      {Number.parseFloat(line.debit) > 0
                        ? `$${Number.parseFloat(line.debit).toFixed(2)}`
                        : ""}
                    </td>
                    <td className="py-1 text-right font-mono">
                      {Number.parseFloat(line.credit) > 0
                        ? `$${Number.parseFloat(line.credit).toFixed(2)}`
                        : ""}
                    </td>
                    <td className="py-1 text-muted-foreground">
                      {line.memo || ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </td>
        </tr>
      )}
    </>
  );
}

export default JournalEntryTable;
