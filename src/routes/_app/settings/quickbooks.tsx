import { createFileRoute, Link } from "@tanstack/react-router";
import { Loader2Icon } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import ConfirmDialog from "@/components/ConfirmDialog";
import BookPicker from "@/features/books/components/BookPicker";
import AccountMappingResolver from "@/features/quickbooks/components/AccountMappingResolver";
import CutoverButton from "@/features/quickbooks/components/CutoverButton";
import MigrationStatus from "@/features/quickbooks/components/MigrationStatus";
import QuickBooksConnectButton from "@/features/quickbooks/components/QuickBooksConnectButton";
import ReconcileControl from "@/features/quickbooks/components/ReconcileControl";
import ReconciliationResults from "@/features/quickbooks/components/ReconciliationResults";
import type { QuickbooksStatus } from "@/features/quickbooks/types/status";
import { API_URL } from "@/lib/config/env.config";
import useActiveBook from "@/lib/hooks/useActiveBook";

const POLL_INTERVAL_MS = 4000;
const ACTIVE_MIGRATION_STATUSES = new Set(["pending", "importing"]);
const ACTIVE_RECONCILIATION_STATUSES = new Set(["pending", "running"]);

type QuickbooksSearch = {
  error?: string;
};

export const Route = createFileRoute("/_app/settings/quickbooks")({
  validateSearch: (search: Record<string, unknown>): QuickbooksSearch => ({
    error: typeof search.error === "string" ? search.error : undefined,
  }),
  component: QuickbooksSettingsPage,
});

function QuickbooksSettingsPage() {
  const {
    activeBook,
    activeBookId,
    books,
    isLoading: booksLoading,
    setActiveBookId,
  } = useActiveBook();
  const { error } = Route.useSearch();

  const [status, setStatus] = useState<QuickbooksStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [importing, setImporting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const oauthErrorShown = useRef(false);

  const fetchStatus = useCallback(async () => {
    // No active book means there is nothing to fetch, so resolve loading and
    // let the empty state render instead of an infinite spinner
    if (!activeBookId) {
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `${API_URL}/api/quickbooks/status?bookId=${activeBookId}`,
      );

      if (!res.ok) throw new Error("failed to load status");

      const data: QuickbooksStatus = await res.json();
      setStatus(data);
    } catch {
      toast.error("Failed to load QuickBooks status");
    } finally {
      setIsLoading(false);
    }
  }, [activeBookId]);

  useEffect(() => {
    setIsLoading(true);
    setStatus(null);
    fetchStatus();
  }, [fetchStatus]);

  // Show the OAuth callback error once
  useEffect(() => {
    if (error === "quickbooks" && !oauthErrorShown.current) {
      oauthErrorShown.current = true;
      toast.error("Failed to connect QuickBooks. Please try again.");
    }
  }, [error]);

  // Poll while a migration or reconciliation is in progress
  const migrationStatus = status?.latestMigration?.status;
  const reconciliationStatus = status?.latestReconciliation?.status;
  useEffect(() => {
    const migrationActive =
      !!migrationStatus && ACTIVE_MIGRATION_STATUSES.has(migrationStatus);
    const reconciliationActive =
      !!reconciliationStatus &&
      ACTIVE_RECONCILIATION_STATUSES.has(reconciliationStatus);

    if (!migrationActive && !reconciliationActive) return;

    const interval = setInterval(fetchStatus, POLL_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [migrationStatus, reconciliationStatus, fetchStatus]);

  const handleImport = useCallback(async () => {
    if (!activeBookId || !status?.connection) return;

    setImporting(true);

    try {
      const res = await fetch(`${API_URL}/api/quickbooks/backfill`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookId: activeBookId,
          connectedAccountId: status.connection.id,
        }),
      });

      if (!res.ok) throw new Error("failed to start import");

      toast.success("Import started");
      setConfirmOpen(false);
      await fetchStatus();
    } catch {
      toast.error("Failed to start import");
    } finally {
      setImporting(false);
    }
  }, [activeBookId, status?.connection, fetchStatus]);

  const loading = booksLoading || isLoading;
  const connection = status?.connection ?? null;

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">QuickBooks</h1>
          <p className="text-muted-foreground text-sm">
            Migrate your books from QuickBooks into MyFi
          </p>
        </div>

        <BookPicker
          books={books}
          selectedBookId={activeBookId}
          onSelect={setActiveBookId}
        />
      </div>

      {loading && (
        <div className="flex items-center justify-center rounded-lg border border-border bg-card p-8">
          <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
        </div>
      )}

      {!loading && !activeBookId && (
        <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-border bg-card p-8 text-center">
          <div className="flex flex-col gap-1">
            <h2 className="font-semibold text-lg">Connect QuickBooks</h2>
            <p className="text-muted-foreground text-sm">
              Select a book from the top-right menu, or create one in Settings
              {" -> "}
              Books, to start a QuickBooks migration.
            </p>
          </div>
          <Link
            to="/settings/books"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90"
          >
            Go to Books
          </Link>
        </div>
      )}

      {!loading && activeBookId && !connection && (
        <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-border bg-card p-8">
          <p className="text-center text-muted-foreground text-sm">
            Connect your QuickBooks account to import your existing books
          </p>
          <QuickBooksConnectButton bookId={activeBookId} />
        </div>
      )}

      {!loading && connection && (
        <div className="flex flex-col gap-4">
          {/* Connection */}
          <div className="flex items-center justify-between rounded-lg border border-border bg-card p-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">QuickBooks</span>
                {status?.cutover ? (
                  <span className="inline-flex rounded-full bg-green-100 px-2 py-0.5 font-medium text-green-800 text-xs">
                    System of record: MyFi (QuickBooks disconnected)
                  </span>
                ) : (
                  <span className="inline-flex rounded-full bg-gray-100 px-2 py-0.5 font-medium text-gray-800 text-xs">
                    Migrating from QuickBooks
                  </span>
                )}
              </div>
              {connection.realmId && (
                <span className="text-muted-foreground text-xs">
                  Realm ID: {connection.realmId}
                </span>
              )}
              <span className="text-muted-foreground text-xs">
                Status: {connection.status}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setConfirmOpen(true)}
              disabled={importing}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
            >
              {importing && <Loader2Icon className="size-4 animate-spin" />}
              Import history
            </button>
          </div>

          {status?.latestMigration && (
            <MigrationStatus migration={status.latestMigration} />
          )}

          {/* Resolve QuickBooks account mappings */}
          {!status?.cutover && activeBookId && (
            <AccountMappingResolver
              bookId={activeBookId}
              connectedAccountId={connection.id}
            />
          )}

          {/* Reconcile the imported book, then review results */}
          {!status?.cutover && activeBookId && (
            <>
              <ReconcileControl
                bookId={activeBookId}
                connectedAccountId={connection.id}
                latestReconciliation={status?.latestReconciliation ?? null}
                onReconcileStarted={fetchStatus}
              />

              {status?.latestReconciliation && (
                <ReconciliationResults
                  bookId={activeBookId}
                  reconciliationId={status.latestReconciliation.id}
                />
              )}
            </>
          )}

          {/* Cut over the system of record to MyFi */}
          {activeBookId && (
            <CutoverButton
              bookId={activeBookId}
              connectedAccountId={connection.id}
              bookName={activeBook?.name ?? "this book"}
              latestReconciliation={status?.latestReconciliation ?? null}
              cutover={status?.cutover ?? null}
              onCutover={fetchStatus}
            />
          )}
        </div>
      )}

      <ConfirmDialog
        open={confirmOpen}
        title="Import QuickBooks history"
        description="This imports your historical entries from QuickBooks. It may take a while to complete."
        confirmLabel="Start import"
        loading={importing}
        onConfirm={handleImport}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}
