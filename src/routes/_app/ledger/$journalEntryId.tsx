import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeftIcon, Loader2Icon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import AttachmentPanel from "@/features/ledger/components/AttachmentPanel";
import type { JournalEntry } from "@/features/ledger/types/journalEntry";
import { API_URL } from "@/lib/config/env.config";
import useActiveBook from "@/lib/hooks/useActiveBook";

export const Route = createFileRoute("/_app/ledger/$journalEntryId")({
  component: JournalEntryDetailPage,
});

/** Format a snake_case source label for display */
function formatSource(source: string): string {
  return source
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function JournalEntryDetailPage() {
  const { journalEntryId } = Route.useParams();
  const navigate = useNavigate();
  const { activeBookId } = useActiveBook();

  const [entry, setEntry] = useState<JournalEntry | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const fetchEntry = useCallback(async () => {
    if (!activeBookId) return;

    setIsLoading(true);
    setNotFound(false);

    try {
      const res = await fetch(
        `${API_URL}/api/journal-entries?bookId=${activeBookId}&limit=500&offset=0`,
      );
      const data = await res.json();
      const raw = (data.entries ?? []).find(
        (e: { id: string }) => e.id === journalEntryId,
      );

      if (!raw) {
        setNotFound(true);
        setEntry(null);
        return;
      }

      const mapped: JournalEntry = {
        ...raw,
        rowId: raw.id,
        lines: (raw.lines ?? []).map((l: Record<string, unknown>) => ({
          ...l,
          rowId: l.id as string,
          journalEntryId: raw.id,
        })),
      };

      setEntry(mapped);
    } catch {
      // Silently handle fetch errors
    } finally {
      setIsLoading(false);
    }
  }, [activeBookId, journalEntryId]);

  useEffect(() => {
    fetchEntry();
  }, [fetchEntry]);

  const handleDelete = useCallback(async () => {
    if (!entry) return;

    try {
      await fetch(`${API_URL}/api/journal-entries/${entry.rowId}`, {
        method: "DELETE",
      });

      navigate({ to: "/ledger" });
    } catch {
      // Silently handle delete errors
    }
  }, [entry, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (notFound || !entry) {
    return (
      <div className="flex flex-col gap-4 p-6">
        <Link
          to="/ledger"
          className="inline-flex items-center gap-1.5 text-muted-foreground text-sm hover:text-foreground"
        >
          <ArrowLeftIcon className="size-4" />
          Back to ledger
        </Link>
        <div className="rounded-lg border border-border bg-card p-8 text-center">
          <p className="text-muted-foreground">Journal entry not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <Link
            to="/ledger"
            className="inline-flex w-fit items-center gap-1.5 text-muted-foreground text-sm hover:text-foreground"
          >
            <ArrowLeftIcon className="size-4" />
            Back to ledger
          </Link>
          <h1 className="font-bold text-2xl">Journal Entry</h1>
          <p className="text-muted-foreground text-sm">
            {entry.date} · {formatSource(entry.source)}
          </p>
        </div>

        <button
          type="button"
          onClick={handleDelete}
          className="rounded-md border border-destructive/30 px-4 py-2 font-medium text-destructive text-sm transition-colors hover:bg-destructive/10"
        >
          Delete Entry
        </button>
      </div>

      {/* Entry detail */}
      <div className="rounded-lg border border-border bg-card p-6">
        <dl className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <dt className="text-muted-foreground text-xs">Date</dt>
            <dd className="font-mono text-sm">{entry.date}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground text-xs">Source</dt>
            <dd className="text-sm">{formatSource(entry.source)}</dd>
          </div>
          <div className="md:col-span-2">
            <dt className="text-muted-foreground text-xs">Memo</dt>
            <dd className="text-sm">
              {entry.memo || (
                <span className="text-muted-foreground">No memo</span>
              )}
            </dd>
          </div>
        </dl>
      </div>

      {/* Lines */}
      <div className="overflow-x-auto rounded-lg border border-border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-border border-b text-left text-muted-foreground">
              <th className="px-4 py-3 font-medium">Account</th>
              <th className="px-4 py-3 text-right font-medium">Debit</th>
              <th className="px-4 py-3 text-right font-medium">Credit</th>
              <th className="px-4 py-3 font-medium">Memo</th>
            </tr>
          </thead>
          <tbody>
            {entry.lines.map((line) => (
              <tr key={line.rowId} className="border-border border-b">
                <td className="px-4 py-3">
                  {line.accountCode && (
                    <span className="mr-2 font-mono text-muted-foreground text-xs">
                      {line.accountCode}
                    </span>
                  )}
                  {line.accountName || line.accountId}
                </td>
                <td className="px-4 py-3 text-right font-mono">
                  {Number.parseFloat(line.debit) > 0
                    ? `$${Number.parseFloat(line.debit).toFixed(2)}`
                    : ""}
                </td>
                <td className="px-4 py-3 text-right font-mono">
                  {Number.parseFloat(line.credit) > 0
                    ? `$${Number.parseFloat(line.credit).toFixed(2)}`
                    : ""}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {line.memo || ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Attachments */}
      <AttachmentPanel bookId={entry.bookId} journalEntryId={entry.rowId} />
    </div>
  );
}
