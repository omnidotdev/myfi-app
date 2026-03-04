import { Link, createFileRoute } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";
import { useMemo, useState } from "react";

import JournalEntryTable from "@/features/ledger/components/JournalEntryTable";
import { JOURNAL_ENTRY_SOURCES } from "@/features/ledger/types/journalEntry";

import type { JournalEntry, JournalEntrySource } from "@/features/ledger/types/journalEntry";

export const Route = createFileRoute("/_auth/ledger/")({
  component: LedgerPage,
});

/** Format a snake_case value for display */
function formatLabel(value: string): string {
  return value
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function LedgerPage() {
  const [entries] = useState<JournalEntry[]>([]);
  const [sourceFilter, setSourceFilter] = useState<JournalEntrySource | "all">(
    "all",
  );
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [showReviewed, setShowReviewed] = useState<
    "all" | "reviewed" | "unreviewed"
  >("all");

  const filteredEntries = useMemo(() => {
    let result = entries;

    if (sourceFilter !== "all") {
      result = result.filter((e) => e.source === sourceFilter);
    }

    if (dateFrom) {
      result = result.filter((e) => e.date >= dateFrom);
    }

    if (dateTo) {
      result = result.filter((e) => e.date <= dateTo);
    }

    if (showReviewed === "reviewed") {
      result = result.filter((e) => e.isReviewed);
    } else if (showReviewed === "unreviewed") {
      result = result.filter((e) => !e.isReviewed);
    }

    return result;
  }, [entries, sourceFilter, dateFrom, dateTo, showReviewed]);

  const handleDelete = (_entryId: string) => {
    // Will be wired to GraphQL mutation
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">Ledger</h1>
          <p className="text-muted-foreground text-sm">
            Double-entry journal entries for your books
          </p>
        </div>

        <Link
          to="/ledger/new"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90"
        >
          <PlusIcon className="size-4" />
          New Entry
        </Link>
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap items-end gap-4 rounded-lg border border-border bg-card p-4">
        {/* Source filter */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="filter-source" className="text-muted-foreground text-xs">
            Source
          </label>
          <select
            id="filter-source"
            value={sourceFilter}
            onChange={(e) =>
              setSourceFilter(e.target.value as JournalEntrySource | "all")
            }
            className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="all">All Sources</option>
            {JOURNAL_ENTRY_SOURCES.map((source) => (
              <option key={source} value={source}>
                {formatLabel(source)}
              </option>
            ))}
          </select>
        </div>

        {/* Date from */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="filter-date-from" className="text-muted-foreground text-xs">
            From
          </label>
          <input
            id="filter-date-from"
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {/* Date to */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="filter-date-to" className="text-muted-foreground text-xs">
            To
          </label>
          <input
            id="filter-date-to"
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {/* Review status toggle */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="filter-reviewed" className="text-muted-foreground text-xs">
            Status
          </label>
          <select
            id="filter-reviewed"
            value={showReviewed}
            onChange={(e) =>
              setShowReviewed(
                e.target.value as "all" | "reviewed" | "unreviewed",
              )
            }
            className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="all">All</option>
            <option value="reviewed">Reviewed</option>
            <option value="unreviewed">Unreviewed</option>
          </select>
        </div>
      </div>

      {/* Journal entry table */}
      <JournalEntryTable entries={filteredEntries} onDelete={handleDelete} />
    </div>
  );
}
