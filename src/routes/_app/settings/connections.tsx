import { createFileRoute } from "@tanstack/react-router";
import { Loader2Icon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import BookPicker from "@/features/books/components/BookPicker";
import ConnectedAccountsList from "@/features/connections/components/ConnectedAccountsList";
import FileImportButton from "@/features/connections/components/FileImportButton";
import PlaidLinkButton from "@/features/connections/components/PlaidLinkButton";
import type { ConnectedAccount } from "@/features/connections/types/connectedAccount";
import { API_URL } from "@/lib/config/env.config";
import useActiveBook from "@/lib/hooks/useActiveBook";

export const Route = createFileRoute("/_app/settings/connections")({
  component: ConnectionsSettingsPage,
});

function ConnectionsSettingsPage() {
  const { session } = Route.useRouteContext();
  const {
    activeBookId,
    books,
    isLoading: booksLoading,
    setActiveBookId,
  } = useActiveBook();

  const [accounts, setAccounts] = useState<ConnectedAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [importResult, setImportResult] = useState<{
    addedCount: number;
    format: string;
  } | null>(null);

  const userId = session?.user?.id ?? "";

  const fetchConnections = useCallback(async () => {
    if (!activeBookId) return;

    setIsLoading(true);

    try {
      const res = await fetch(
        `${API_URL}/api/connections?bookId=${activeBookId}`,
      );
      const data = await res.json();
      const mapped = (data.connections ?? []).map(
        (c: Record<string, unknown>) => ({
          ...c,
          rowId: c.id as string,
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
    fetchConnections();
  }, [fetchConnections]);

  const handleLinkSuccess = useCallback(() => {
    fetchConnections();
  }, [fetchConnections]);

  const handleImportSuccess = useCallback(
    (result: {
      addedCount: number;
      skippedCount: number;
      totalParsed: number;
      format: string;
    }) => {
      setImportResult(result);
      fetchConnections();
      setTimeout(() => setImportResult(null), 5000);
    },
    [fetchConnections],
  );

  const handleSync = useCallback(
    async (accountId: string) => {
      try {
        await fetch(`${API_URL}/api/plaid/sync`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ connectedAccountId: accountId }),
        });

        await fetchConnections();
      } catch {
        // Silently handle sync errors
      }
    },
    [fetchConnections],
  );

  const handleDisconnect = useCallback(
    async (accountId: string) => {
      try {
        await fetch(`${API_URL}/api/connections/${accountId}`, {
          method: "DELETE",
        });

        await fetchConnections();
      } catch {
        // Silently handle disconnect errors
      }
    },
    [fetchConnections],
  );

  const loading = booksLoading || isLoading;

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">Bank & Exchange Connections</h1>
          <p className="text-muted-foreground text-sm">
            Connect your bank accounts and exchanges to automatically import
            transactions
          </p>
        </div>

        <div className="flex items-center gap-3">
          <BookPicker
            books={books}
            selectedBookId={activeBookId}
            onSelect={setActiveBookId}
          />

          <FileImportButton
            bookId={activeBookId ?? ""}
            onSuccess={handleImportSuccess}
          />

          <PlaidLinkButton
            bookId={activeBookId ?? ""}
            userId={userId}
            onSuccess={handleLinkSuccess}
          />
        </div>
      </div>

      {importResult && (
        <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-green-800 text-sm dark:border-green-800 dark:bg-green-900/20 dark:text-green-300">
          Imported {importResult.addedCount} transactions from{" "}
          {importResult.format.toUpperCase()} file
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center rounded-lg border border-border bg-card p-8">
          <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
        </div>
      )}

      {/* Connections list */}
      {!loading && (
        <ConnectedAccountsList
          accounts={accounts}
          onSync={handleSync}
          onDisconnect={handleDisconnect}
        />
      )}
    </div>
  );
}
