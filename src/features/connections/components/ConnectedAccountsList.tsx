import { Link2OffIcon, RefreshCwIcon } from "lucide-react";

import type {
  ConnectedAccount,
  ConnectedAccountStatus,
} from "@/features/connections/types/connectedAccount";

type Props = {
  accounts: ConnectedAccount[];
  onSync: (accountId: string) => void;
  onDisconnect: (accountId: string) => void;
};

const STATUS_STYLES: Record<ConnectedAccountStatus, string> = {
  active: "bg-green-100 text-green-800",
  inactive: "bg-gray-100 text-gray-800",
  error: "bg-red-100 text-red-800",
  reauth_required: "bg-amber-100 text-amber-800",
};

const STATUS_LABELS: Record<ConnectedAccountStatus, string> = {
  active: "Active",
  inactive: "Inactive",
  error: "Error",
  reauth_required: "Re-auth Required",
};

/** Format a timestamp for display */
function formatSyncTime(iso: string | null): string {
  if (!iso) return "Never";

  const date = new Date(iso);

  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

/**
 * Display a list of connected bank/exchange accounts with sync and disconnect actions
 */
function ConnectedAccountsList({ accounts, onSync, onDisconnect }: Props) {
  if (accounts.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-8 text-center">
        <p className="text-muted-foreground">No connected accounts yet</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {accounts.map((account) => (
        <div
          key={account.rowId}
          className="flex items-center justify-between rounded-lg border border-border bg-card p-4"
        >
          {/* Account info */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="font-medium">
                {account.institutionName ?? "Unknown Institution"}
              </span>

              {account.mask && (
                <span className="font-mono text-muted-foreground text-sm">
                  ****{account.mask}
                </span>
              )}

              <span
                className={`inline-flex rounded-full px-2 py-0.5 font-medium text-xs ${STATUS_STYLES[account.status]}`}
              >
                {STATUS_LABELS[account.status]}
              </span>
            </div>

            <span className="text-muted-foreground text-xs">
              Last synced: {formatSyncTime(account.lastSyncedAt)}
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onSync(account.rowId)}
              aria-label={`Sync ${account.institutionName ?? "account"}`}
              className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm transition-colors hover:bg-accent"
            >
              <RefreshCwIcon className="size-3.5" />
              Sync Now
            </button>

            <button
              type="button"
              onClick={() => onDisconnect(account.rowId)}
              aria-label={`Disconnect ${account.institutionName ?? "account"}`}
              className="inline-flex items-center gap-1.5 rounded-md border border-destructive/30 px-3 py-1.5 text-destructive text-sm transition-colors hover:bg-destructive/10"
            >
              <Link2OffIcon className="size-3.5" />
              Disconnect
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ConnectedAccountsList;
