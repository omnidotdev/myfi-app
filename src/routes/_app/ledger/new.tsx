import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Loader2Icon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import type { Account } from "@/features/accounts/types/account";
import BookPicker from "@/features/books/components/BookPicker";
import JournalEntryForm from "@/features/ledger/components/JournalEntryForm";
import { API_URL } from "@/lib/config/env.config";
import useActiveBook from "@/lib/hooks/useActiveBook";
import useTagGroups from "@/lib/hooks/useTagGroups";

export const Route = createFileRoute("/_app/ledger/new")({
  component: NewJournalEntryPage,
});

function NewJournalEntryPage() {
  const navigate = useNavigate();
  const {
    activeBookId,
    books,
    isLoading: booksLoading,
    setActiveBookId,
  } = useActiveBook();

  const { tagGroups } = useTagGroups(activeBookId);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [vendors, setVendors] = useState<{ rowId: string; name: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

      // Fetch vendors for the active book
      const vendorRes = await fetch(
        `${API_URL}/api/vendors?bookId=${activeBookId}`,
      );
      const vendorData = await vendorRes.json();
      const mappedVendors = (vendorData.vendors ?? []).map(
        (v: Record<string, unknown>) => ({
          rowId: v.id as string,
          name: v.name as string,
        }),
      );

      setVendors(mappedVendors);
    } catch {
      // Silently handle fetch errors
    } finally {
      setIsLoading(false);
    }
  }, [activeBookId]);

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  const handleSubmit = useCallback(
    async (entry: {
      date: string;
      memo: string;
      vendorId?: string;
      lines: {
        accountId: string;
        debit: string;
        credit: string;
        memo: string;
        tagIds: string[];
      }[];
    }) => {
      try {
        const res = await fetch(`${API_URL}/api/journal-entries`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            bookId: activeBookId,
            date: entry.date,
            memo: entry.memo,
            vendorId: entry.vendorId ?? null,
            source: "manual",
            lines: entry.lines.map((l) => ({
              accountId: l.accountId,
              debit: l.debit,
              credit: l.credit,
              memo: l.memo,
            })),
          }),
        });

        // Assign tags to lines if any were selected
        const created = await res.json();
        const createdLines: { id: string }[] = created?.lines ?? [];

        if (createdLines.length > 0) {
          const assignments: { lineId: string; tagId: string }[] = [];

          for (let i = 0; i < entry.lines.length; i++) {
            const line = entry.lines[i];
            const createdLine = createdLines[i];

            if (line.tagIds.length > 0 && createdLine?.id) {
              for (const tagId of line.tagIds) {
                assignments.push({ lineId: createdLine.id, tagId });
              }
            }
          }

          if (assignments.length > 0) {
            await fetch(`${API_URL}/api/tags/line-tags`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ assignments }),
            });
          }
        }

        navigate({ to: "/ledger" });
      } catch {
        // Silently handle submit errors
      }
    },
    [activeBookId, navigate],
  );

  const handleCancel = () => {
    navigate({ to: "/ledger" });
  };

  const loading = booksLoading || isLoading;

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">New Journal Entry</h1>
          <p className="text-muted-foreground text-sm">
            Create a balanced double-entry journal entry
          </p>
        </div>

        <BookPicker
          books={books}
          selectedBookId={activeBookId}
          onSelect={setActiveBookId}
        />
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center rounded-lg border border-border bg-card p-8">
          <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
        </div>
      )}

      {/* Form */}
      {!loading && (
        <div className="rounded-lg border border-border bg-card p-6">
          <JournalEntryForm
            accounts={accounts}
            tagGroups={tagGroups}
            vendors={vendors}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </div>
      )}
    </div>
  );
}
