import { createFileRoute } from "@tanstack/react-router";
import { Loader2Icon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import BookPicker from "@/features/books/components/BookPicker";
import ConnectedAccountsList from "@/features/connections/components/ConnectedAccountsList";
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

          <PlaidLinkButton
            bookId={activeBookId ?? ""}
            userId={userId}
            onSuccess={handleLinkSuccess}
          />
        </div>
      </div>

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
