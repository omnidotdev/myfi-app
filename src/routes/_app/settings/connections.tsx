import { createFileRoute } from "@tanstack/react-router";
import {
  Loader2Icon,
  RefreshCwIcon,
  Trash2Icon,
  UploadIcon,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Account } from "@/features/accounts/types/account";
import BookPicker from "@/features/books/components/BookPicker";
import ConnectedAccountsList from "@/features/connections/components/ConnectedAccountsList";
import FileImportButton from "@/features/connections/components/FileImportButton";
import PlaidLinkButton from "@/features/connections/components/PlaidLinkButton";
import type { ConnectedAccount } from "@/features/connections/types/connectedAccount";
import { API_URL } from "@/lib/config/env.config";
import useActiveBook from "@/lib/hooks/useActiveBook";

const LINKABLE_SUB_TYPES = new Set([
  "cash",
  "checking",
  "savings",
  "credit_card",
  "investment",
]);

type PayrollStatus = {
  connected: boolean;
  id?: string;
  provider?: string;
  companyId?: string;
  lastSyncedAt?: string;
};

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

  const [chartOfAccounts, setChartOfAccounts] = useState<
    { id: string; name: string; code: string | null }[]
  >([]);

  const [payrollStatus, setPayrollStatus] = useState<PayrollStatus | null>(
    null,
  );
  const [payrollLoading, setPayrollLoading] = useState(false);
  const [payrollCsvResult, setPayrollCsvResult] = useState<string | null>(null);
  const payrollFileRef = useRef<HTMLInputElement>(null);

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

  const fetchChartOfAccounts = useCallback(async () => {
    if (!activeBookId) return;

    try {
      const res = await fetch(`${API_URL}/api/accounts?bookId=${activeBookId}`);
      const data = await res.json();
      const filtered = (data.accounts ?? [])
        .filter(
          (a: Account) =>
            a.isActive &&
            !a.isPlaceholder &&
            a.subType &&
            LINKABLE_SUB_TYPES.has(a.subType),
        )
        .map((a: Account) => ({
          id: a.rowId,
          name: a.name,
          code: a.code,
        }));

      setChartOfAccounts(filtered);
    } catch {
      // Silently handle fetch errors
    }
  }, [activeBookId]);

  useEffect(() => {
    fetchConnections();
    fetchChartOfAccounts();
  }, [fetchConnections, fetchChartOfAccounts]);

  const handleLinkAccount = useCallback(
    async (connectionId: string, accountId: string | null) => {
      try {
        await fetch(`${API_URL}/api/connections/${connectionId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ accountId }),
        });

        await fetchConnections();
      } catch {
        // Silently handle link errors
      }
    },
    [fetchConnections],
  );

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

  // Payroll status
  const fetchPayrollStatus = useCallback(async () => {
    if (!activeBookId) return;

    try {
      const res = await fetch(
        `${API_URL}/api/payroll/status?bookId=${activeBookId}`,
      );
      const json = await res.json();

      setPayrollStatus(json);
    } catch {
      // Silently handle fetch errors
    }
  }, [activeBookId]);

  useEffect(() => {
    fetchPayrollStatus();
  }, [fetchPayrollStatus]);

  const handlePayrollConnect = useCallback(async () => {
    if (!activeBookId) return;

    setPayrollLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/payroll/connect`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId: activeBookId }),
      });
      const json = await res.json();

      if (json.authUrl) {
        window.location.href = json.authUrl;
      }
    } catch {
      // Silently handle connect errors
    } finally {
      setPayrollLoading(false);
    }
  }, [activeBookId]);

  const handlePayrollSync = useCallback(async () => {
    if (!activeBookId) return;

    setPayrollLoading(true);

    try {
      await fetch(`${API_URL}/api/payroll/sync`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId: activeBookId }),
      });

      await fetchPayrollStatus();
    } catch {
      // Silently handle sync errors
    } finally {
      setPayrollLoading(false);
    }
  }, [activeBookId, fetchPayrollStatus]);

  const handlePayrollDisconnect = useCallback(async () => {
    if (!payrollStatus?.id) return;

    setPayrollLoading(true);

    try {
      await fetch(`${API_URL}/api/payroll/disconnect/${payrollStatus.id}`, {
        method: "DELETE",
      });

      setPayrollStatus(null);
      await fetchPayrollStatus();
    } catch {
      // Silently handle disconnect errors
    } finally {
      setPayrollLoading(false);
    }
  }, [payrollStatus?.id, fetchPayrollStatus]);

  const handlePayrollCsvImport = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file || !activeBookId) return;

      setPayrollLoading(true);
      setPayrollCsvResult(null);

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("bookId", activeBookId);

        const res = await fetch(`${API_URL}/api/payroll/import-csv`, {
          method: "POST",
          body: formData,
        });
        const json = await res.json();

        setPayrollCsvResult(
          `Imported ${json.importedCount ?? 0} payroll entries`,
        );
        setTimeout(() => setPayrollCsvResult(null), 5000);
      } catch {
        setPayrollCsvResult("Failed to import CSV");
        setTimeout(() => setPayrollCsvResult(null), 5000);
      } finally {
        setPayrollLoading(false);

        if (payrollFileRef.current) {
          payrollFileRef.current.value = "";
        }
      }
    },
    [activeBookId],
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
          chartOfAccounts={chartOfAccounts}
          onSync={handleSync}
          onDisconnect={handleDisconnect}
          onLinkAccount={handleLinkAccount}
        />
      )}

      {/* Payroll section */}
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="font-bold text-xl">Payroll</h2>
          <p className="text-muted-foreground text-sm">
            Connect your payroll provider to sync payroll data
          </p>
        </div>

        {payrollCsvResult && (
          <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-green-800 text-sm dark:border-green-800 dark:bg-green-900/20 dark:text-green-300">
            {payrollCsvResult}
          </div>
        )}

        {payrollStatus?.connected ? (
          <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-sm">
                  {payrollStatus.provider ?? "Payroll Provider"}
                </span>
                {payrollStatus.companyId && (
                  <span className="text-muted-foreground text-xs">
                    Company ID: {payrollStatus.companyId}
                  </span>
                )}
                {payrollStatus.lastSyncedAt && (
                  <span className="text-muted-foreground text-xs">
                    Last synced:{" "}
                    {new Date(payrollStatus.lastSyncedAt).toLocaleString()}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePayrollSync}
                  disabled={payrollLoading}
                  className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-50"
                >
                  <RefreshCwIcon className="size-4" />
                  Sync Now
                </button>
                <button
                  type="button"
                  onClick={handlePayrollDisconnect}
                  disabled={payrollLoading}
                  className="inline-flex items-center gap-2 rounded-md border border-destructive/50 bg-background px-3 py-2 text-destructive text-sm transition-colors hover:bg-destructive/10 disabled:pointer-events-none disabled:opacity-50"
                >
                  <Trash2Icon className="size-4" />
                  Disconnect
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center rounded-lg border border-border bg-card p-8">
            <button
              type="button"
              onClick={handlePayrollConnect}
              disabled={payrollLoading || !activeBookId}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
            >
              {payrollLoading && (
                <Loader2Icon className="size-4 animate-spin" />
              )}
              Connect Gusto
            </button>
          </div>
        )}

        {/* Import Payroll CSV */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-sm">Import Payroll CSV</h3>
          <div className="flex items-center gap-3">
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm transition-colors hover:bg-accent">
              <UploadIcon className="size-4" />
              Choose File
              <input
                ref={payrollFileRef}
                type="file"
                accept=".csv"
                onChange={handlePayrollCsvImport}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
