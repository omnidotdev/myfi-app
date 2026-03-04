import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Loader2Icon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import type { Account } from "@/features/accounts/types/account";
import BookPicker from "@/features/books/components/BookPicker";
import JournalEntryForm from "@/features/ledger/components/JournalEntryForm";
import { API_URL } from "@/lib/config/env.config";
import useActiveBook from "@/lib/hooks/useActiveBook";

export const Route = createFileRoute("/_auth/ledger/new")({
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

  const [accounts, setAccounts] = useState<Account[]>([]);
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
      lines: {
        accountId: string;
        debit: string;
        credit: string;
        memo: string;
      }[];
    }) => {
      try {
        await fetch(`${API_URL}/api/journal-entries`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            bookId: activeBookId,
            date: entry.date,
            memo: entry.memo,
            source: "manual",
            lines: entry.lines.map((l) => ({
              accountId: l.accountId,
              debit: l.debit,
              credit: l.credit,
              memo: l.memo,
            })),
          }),
        });

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
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </div>
      )}
    </div>
  );
}
