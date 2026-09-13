import { AlertTriangleIcon, Loader2Icon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import type {
  AccountMapResponse,
  MyfiAccountOption,
  QboAccountMapping,
} from "@/features/quickbooks/types/accountMap";
import { apiFetch } from "@/lib/api/apiFetch";

type Props = {
  bookId: string;
  connectedAccountId: string;
};

/** Build a MyFi account option label */
function optionLabel(account: MyfiAccountOption): string {
  return account.code ? `${account.code} - ${account.name}` : account.name;
}

/**
 * Resolve unmapped QuickBooks accounts to MyFi chart-of-accounts entries. Each
 * QBO account gets a picker; changing it upserts the mapping and refetches
 */
function AccountMappingResolver({ bookId, connectedAccountId }: Props) {
  const [loading, setLoading] = useState(true);
  const [accounts, setAccounts] = useState<QboAccountMapping[]>([]);
  const [myfiAccounts, setMyfiAccounts] = useState<MyfiAccountOption[]>([]);
  const [savingId, setSavingId] = useState<string | null>(null);

  const fetchMap = useCallback(async () => {
    try {
      const res = await apiFetch(
        `/api/quickbooks/account-map?bookId=${bookId}&connectedAccountId=${connectedAccountId}`,
      );

      if (!res.ok) throw new Error("failed to load account map");

      const data: AccountMapResponse = await res.json();
      setAccounts(data.accounts);
      setMyfiAccounts(data.myfiAccounts);
    } catch {
      toast.error("Failed to load account mappings");
    } finally {
      setLoading(false);
    }
  }, [bookId, connectedAccountId]);

  useEffect(() => {
    setLoading(true);
    fetchMap();
  }, [fetchMap]);

  const handleMap = useCallback(
    async (account: QboAccountMapping, myfiAccountId: string) => {
      if (!myfiAccountId) return;

      setSavingId(account.qboAccountId);

      try {
        const res = await apiFetch(`/api/quickbooks/account-map`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            bookId,
            connectedAccountId,
            qboAccountId: account.qboAccountId,
            qboAccountName: account.qboAccountName,
            qboAccountType: account.qboAccountType,
            myfiAccountId,
          }),
        });

        if (!res.ok) throw new Error("failed to save mapping");

        toast.success("Mapping saved");
        await fetchMap();
      } catch {
        toast.error("Failed to save mapping");
      } finally {
        setSavingId(null);
      }
    },
    [bookId, connectedAccountId, fetchMap],
  );

  const unmappedCount = accounts.filter((a) => !a.myfiAccountId).length;

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border bg-card p-4">
      <div className="flex items-center gap-2">
        <span className="font-semibold text-sm">Account mapping</span>
        {unmappedCount > 0 && (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 font-medium text-amber-800 text-xs">
            <AlertTriangleIcon className="size-3" />
            {unmappedCount} unmapped
          </span>
        )}
      </div>

      <p className="text-muted-foreground text-xs">
        Map each QuickBooks account to an account in your chart of accounts
      </p>

      {loading && (
        <div className="flex items-center justify-center p-8">
          <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
        </div>
      )}

      {!loading && accounts.length === 0 && (
        <p className="p-4 text-center text-muted-foreground text-sm">
          No QuickBooks accounts to map
        </p>
      )}

      {!loading && accounts.length > 0 && (
        <div className="flex flex-col divide-y divide-border">
          {accounts.map((account) => {
            const unmapped = !account.myfiAccountId;

            return (
              <div
                key={account.qboAccountId}
                className={`grid grid-cols-[1fr_1fr_auto] items-center gap-4 py-3 ${
                  unmapped
                    ? "border-l-2 border-l-amber-400 pl-3 dark:border-l-amber-500"
                    : ""
                }`}
              >
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm">{account.qboAccountName}</span>
                  <span className="text-muted-foreground text-xs">
                    {account.qboAccountType}
                  </span>
                </div>

                <select
                  value={account.myfiAccountId ?? ""}
                  onChange={(e) => handleMap(account, e.target.value)}
                  disabled={savingId === account.qboAccountId}
                  aria-label={`Map ${account.qboAccountName}`}
                  className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
                >
                  <option value="">Select account</option>
                  {myfiAccounts.map((option) => (
                    <option key={option.id} value={option.id}>
                      {optionLabel(option)}
                    </option>
                  ))}
                </select>

                <div className="flex w-5 justify-center">
                  {savingId === account.qboAccountId && (
                    <Loader2Icon className="size-4 animate-spin text-muted-foreground" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default AccountMappingResolver;
