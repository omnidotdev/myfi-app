import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import ConnectedAccountsList from "@/features/connections/components/ConnectedAccountsList";
import PlaidLinkButton from "@/features/connections/components/PlaidLinkButton";

import type { ConnectedAccount } from "@/features/connections/types/connectedAccount";

export const Route = createFileRoute("/_auth/settings/connections")({
  component: ConnectionsSettingsPage,
});

// Placeholder data until API is wired up
const EMPTY_ACCOUNTS: ConnectedAccount[] = [];

function ConnectionsSettingsPage() {
  const { session } = Route.useRouteContext();

  const [accounts, _setAccounts] =
    useState<ConnectedAccount[]>(EMPTY_ACCOUNTS);

  // Placeholder bookId -- will be replaced with real selection
  const bookId = "default";
  const userId = session?.user?.id ?? "";

  const handleLinkSuccess = () => {
    // TODO: refetch connected accounts
  };

  const handleSync = (_accountId: string) => {
    // TODO: trigger sync for the given account
  };

  const handleDisconnect = (_accountId: string) => {
    // TODO: disconnect the given account
  };

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

        <PlaidLinkButton
          bookId={bookId}
          userId={userId}
          onSuccess={handleLinkSuccess}
        />
      </div>

      <ConnectedAccountsList
        accounts={accounts}
        onSync={handleSync}
        onDisconnect={handleDisconnect}
      />
    </div>
  );
}
