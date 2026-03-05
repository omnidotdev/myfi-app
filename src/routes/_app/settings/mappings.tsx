import { createFileRoute } from "@tanstack/react-router";
import { Loader2Icon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import type { Account } from "@/features/accounts/types/account";
import BookPicker from "@/features/books/components/BookPicker";
import AccountMappingForm from "@/features/settings/components/AccountMappingForm";
import { API_URL } from "@/lib/config/env.config";
import useActiveBook from "@/lib/hooks/useActiveBook";

export const Route = createFileRoute("/_app/settings/mappings")({
  component: MappingsSettingsPage,
});

function MappingsSettingsPage() {
  const {
    activeBookId,
    books,
    isLoading: booksLoading,
    setActiveBookId,
  } = useActiveBook();

  const [accounts, setAccounts] = useState<Account[]>([]);
  const [mappings, setMappings] = useState<
    {
      rowId: string;
      eventType: string;
      debitAccountId: string | null;
      creditAccountId: string | null;
    }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    if (!activeBookId) return;

    setIsLoading(true);

    try {
      const [accountsRes, mappingsRes] = await Promise.all([
        fetch(`${API_URL}/api/accounts?bookId=${activeBookId}`),
        fetch(`${API_URL}/api/account-mappings?bookId=${activeBookId}`),
      ]);

      const accountsData = await accountsRes.json();
      const mappingsData = await mappingsRes.json();

      const mappedAccounts = (accountsData.accounts ?? []).map(
        (a: Record<string, unknown>) => ({
          ...a,
          rowId: a.id as string,
        }),
      );

      const mappedMappings = (mappingsData.mappings ?? []).map(
        (m: Record<string, unknown>) => ({
          ...m,
          rowId: m.id as string,
        }),
      );

      setAccounts(mappedAccounts);
      setMappings(mappedMappings);
    } catch {
      // Silently handle fetch errors
    } finally {
      setIsLoading(false);
    }
  }, [activeBookId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSave = useCallback(
    async (
      eventType: string,
      debitAccountId: string,
      creditAccountId: string,
    ) => {
      if (!activeBookId) return;

      try {
        await fetch(`${API_URL}/api/account-mappings`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            bookId: activeBookId,
            eventType,
            debitAccountId,
            creditAccountId,
          }),
        });

        await fetchData();
      } catch {
        // Silently handle save errors
      }
    },
    [activeBookId, fetchData],
  );

  const loading = booksLoading || isLoading;

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">Account Mappings</h1>
          <p className="text-muted-foreground text-sm">
            Map Mantle event types to debit and credit accounts for automatic
            journal entry creation
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

      {/* Mapping form */}
      {!loading && (
        <AccountMappingForm
          accounts={accounts}
          mappings={mappings}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
