import { createFileRoute, Link } from "@tanstack/react-router";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import BookPicker from "@/features/books/components/BookPicker";
import JournalEntryTable from "@/features/ledger/components/JournalEntryTable";
import type {
  JournalEntry,
  JournalEntrySource,
} from "@/features/ledger/types/journalEntry";
import { JOURNAL_ENTRY_SOURCES } from "@/features/ledger/types/journalEntry";
import { API_URL } from "@/lib/config/env.config";
import formatLabel from "@/lib/format/label";
import useActiveBook from "@/lib/hooks/useActiveBook";

export const Route = createFileRoute("/_auth/ledger/")({
  component: LedgerPage,
});

function LedgerPage() {
  const {
    activeBookId,
    books,
    isLoading: booksLoading,
    setActiveBookId,
  } = useActiveBook();

  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sourceFilter, setSourceFilter] = useState<JournalEntrySource | "all">(
    "all",
  );
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [showReviewed, setShowReviewed] = useState<
    "all" | "reviewed" | "unreviewed"
  >("all");

  const fetchEntries = useCallback(async () => {
    if (!activeBookId) return;

    setIsLoading(true);

    try {
      const res = await fetch(
        `${API_URL}/api/journal-entries?bookId=${activeBookId}&limit=50&offset=0`,
      );
      const data = await res.json();
      const mapped = (data.entries ?? []).map((e: Record<string, unknown>) => ({
        ...e,
        rowId: e.id as string,
        lines: ((e.lines as Record<string, unknown>[]) ?? []).map(
          (l: Record<string, unknown>) => ({
            ...l,
            rowId: l.id as string,
            journalEntryId: e.id as string,
          }),
        ),
      }));

      setEntries(mapped);
    } catch {
      // Silently handle fetch errors
    } finally {
      setIsLoading(false);
    }
  }, [activeBookId]);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

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

  const handleDelete = useCallback(
    async (entryId: string) => {
      try {
        await fetch(`${API_URL}/api/journal-entries/${entryId}`, {
          method: "DELETE",
        });

        await fetchEntries();
      } catch {
        // Silently handle delete errors
      }
    },
    [fetchEntries],
  );

  const loading = booksLoading || isLoading;

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

        <div className="flex items-center gap-3">
          <BookPicker
            books={books}
            selectedBookId={activeBookId}
            onSelect={setActiveBookId}
          />

          <Link
            to="/ledger/new"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90"
          >
            <PlusIcon className="size-4" />
            New Entry
          </Link>
        </div>
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap items-end gap-4 rounded-lg border border-border bg-card p-4">
        {/* Source filter */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="filter-source"
            className="text-muted-foreground text-xs"
          >
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
          <label
            htmlFor="filter-date-from"
            className="text-muted-foreground text-xs"
          >
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
          <label
            htmlFor="filter-date-to"
            className="text-muted-foreground text-xs"
          >
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
          <label
            htmlFor="filter-reviewed"
            className="text-muted-foreground text-xs"
          >
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

      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center rounded-lg border border-border bg-card p-8">
          <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
        </div>
      )}

      {/* Empty state */}
      {!loading && entries.length === 0 && (
        <div className="rounded-lg border border-border bg-card p-8 text-center">
          <p className="text-muted-foreground">
            No journal entries yet. Create your first entry to get started.
          </p>
        </div>
      )}

      {/* Journal entry table */}
      {!loading && entries.length > 0 && (
        <JournalEntryTable entries={filteredEntries} onDelete={handleDelete} />
      )}
    </div>
  );
}
