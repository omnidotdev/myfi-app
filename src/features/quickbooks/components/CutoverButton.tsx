import { CheckCircle2Icon } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import ConfirmDialog from "@/components/ConfirmDialog";
import type { QuickbooksStatus } from "@/features/quickbooks/types/status";
import { API_URL } from "@/lib/config/env.config";

type Reconciliation = NonNullable<QuickbooksStatus["latestReconciliation"]>;
type Cutover = NonNullable<QuickbooksStatus["cutover"]>;

type Props = {
  bookId: string;
  connectedAccountId: string;
  bookName: string;
  latestReconciliation: Reconciliation | null;
  cutover: Cutover | null;
  onCutover: () => void | Promise<void>;
};

/**
 * Cut over the book's system of record from QuickBooks to MyFi. Enabled only
 * once the latest reconciliation is complete with zero mismatches, guarded by a
 * destructive confirmation
 */
function CutoverButton({
  bookId,
  connectedAccountId,
  bookName,
  latestReconciliation,
  cutover,
  onCutover,
}: Props) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [cuttingOver, setCuttingOver] = useState(false);

  const handleCutover = useCallback(async () => {
    if (!latestReconciliation) return;

    setCuttingOver(true);

    try {
      const res = await fetch(`${API_URL}/api/quickbooks/cutover`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookId,
          connectedAccountId,
          reconciliationId: latestReconciliation.id,
        }),
      });

      if (res.status === 409) {
        toast.error("Book has not reconciled cleanly - re-run reconciliation");

        return;
      }

      if (!res.ok) throw new Error("failed to cut over");

      toast.success("Cut over to MyFi");
      setConfirmOpen(false);
      await onCutover();
    } catch {
      toast.error("Failed to cut over");
    } finally {
      setCuttingOver(false);
    }
  }, [bookId, connectedAccountId, latestReconciliation, onCutover]);

  if (cutover) {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-4">
        <CheckCircle2Icon className="size-5 text-green-600 dark:text-green-400" />
        <div className="flex flex-col">
          <span className="font-medium text-sm">Migrated to MyFi</span>
          <span className="text-muted-foreground text-xs">
            MyFi is now the system of record. QuickBooks has been disconnected
          </span>
        </div>
      </div>
    );
  }

  const canCutover =
    latestReconciliation !== null &&
    latestReconciliation.status === "complete" &&
    latestReconciliation.mismatchCount === 0;

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-border bg-card p-4">
      <span className="font-semibold text-sm">Cut over</span>

      <button
        type="button"
        onClick={() => setConfirmOpen(true)}
        disabled={!canCutover}
        className="inline-flex w-fit items-center gap-2 rounded-md bg-destructive px-4 py-2 font-medium text-destructive-foreground text-sm transition-colors hover:bg-destructive/90 disabled:pointer-events-none disabled:opacity-50"
      >
        Cut over to MyFi
      </button>

      {!canCutover && (
        <p className="text-muted-foreground text-xs">
          Reconcile to zero variance before cutting over
        </p>
      )}

      <ConfirmDialog
        open={confirmOpen}
        title="Cut over to MyFi?"
        description={`This makes MyFi the system of record for "${bookName}" and disconnects QuickBooks. This cannot be undone.`}
        confirmLabel="Cut over"
        destructive
        loading={cuttingOver}
        onConfirm={handleCutover}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}

export default CutoverButton;
