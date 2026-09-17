import { Loader2Icon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import ConfirmDialog from "@/components/ConfirmDialog";
import { apiFetch } from "@/lib/api/apiFetch";

type Account = { id: string; name: string; code: string };

type RecategorizeResult = {
  matched: number;
  skippedReconciled: number;
  updated: number;
};

type RecategorizeVendorDialogProps = {
  vendor: { id: string; name: string };
  bookId: string;
  accounts: Account[];
  onClose: () => void;
  /** Called after a successful recategorize so the parent can refresh */
  onDone: () => void;
};

const accountLabel = (a: Account) => `${a.code} - ${a.name}`;

/**
 * Bulk-recategorize a vendor's transactions from one account to another. The
 * user previews the exact impact (a dry run, including how many reconciled
 * entries are skipped) before a destructive confirm actually rewrites the
 * journal lines. Reconciled (closed-period) entries are never touched.
 */
function RecategorizeVendorDialog({
  vendor,
  bookId,
  accounts,
  onClose,
  onDone,
}: RecategorizeVendorDialogProps) {
  const [fromAccountId, setFromAccountId] = useState("");
  const [toAccountId, setToAccountId] = useState("");
  const [preview, setPreview] = useState<RecategorizeResult | null>(null);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const canPreview =
    Boolean(fromAccountId) &&
    Boolean(toAccountId) &&
    fromAccountId !== toAccountId;

  const call = (dryRun: boolean) =>
    apiFetch(`/api/vendors/${vendor.id}/recategorize`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookId, fromAccountId, toAccountId, dryRun }),
    });

  // Reset a stale preview whenever the account selection changes
  const changeFrom = (id: string) => {
    setFromAccountId(id);
    setPreview(null);
  };
  const changeTo = (id: string) => {
    setToAccountId(id);
    setPreview(null);
  };

  const handlePreview = async () => {
    if (!canPreview) return;

    setIsPreviewing(true);

    try {
      const res = await call(true);

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        toast.error(data?.error ?? "Could not preview the change");
        return;
      }

      const data = await res.json();
      setPreview(data.result as RecategorizeResult);
    } catch {
      toast.error("Could not preview the change");
    } finally {
      setIsPreviewing(false);
    }
  };

  const handleConfirm = async () => {
    setIsRunning(true);

    try {
      const res = await call(false);

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        toast.error(data?.error ?? "Could not recategorize");
        return;
      }

      const data = await res.json();
      const result = data.result as RecategorizeResult;
      toast.success(
        `Recategorized ${result.updated} transaction${result.updated === 1 ? "" : "s"}` +
          (result.skippedReconciled > 0
            ? ` (${result.skippedReconciled} reconciled skipped)`
            : ""),
      );
      setConfirmOpen(false);
      onDone();
      onClose();
    } catch {
      toast.error("Could not recategorize");
    } finally {
      setIsRunning(false);
    }
  };

  const fromName = accounts.find((a) => a.id === fromAccountId);
  const toName = accounts.find((a) => a.id === toAccountId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <button
        type="button"
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-label="Close dialog"
      />

      <div className="relative w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-lg">
        <h2 className="mb-1 font-semibold text-lg">
          Recategorize transactions
        </h2>
        <p className="mb-4 text-muted-foreground text-sm">
          Move all of{" "}
          <span className="font-medium text-foreground">{vendor.name}</span>
          's transactions from one account to another. Reconciled entries in
          closed periods are left untouched.
        </p>

        <div className="flex flex-col gap-3">
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium">From account</span>
            <select
              value={fromAccountId}
              onChange={(e) => changeFrom(e.target.value)}
              className="rounded-md border border-border bg-background px-3 py-2 text-sm"
            >
              <option value="">Select account</option>
              {accounts.map((a) => (
                <option key={a.id} value={a.id}>
                  {accountLabel(a)}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium">To account</span>
            <select
              value={toAccountId}
              onChange={(e) => changeTo(e.target.value)}
              className="rounded-md border border-border bg-background px-3 py-2 text-sm"
            >
              <option value="">Select account</option>
              {accounts.map((a) => (
                <option key={a.id} value={a.id}>
                  {accountLabel(a)}
                </option>
              ))}
            </select>
          </label>

          {preview && (
            <div className="rounded-md border border-border bg-accent/30 p-3 text-sm">
              {preview.matched > 0 ? (
                <span>
                  <span className="font-medium text-foreground">
                    {preview.matched}
                  </span>{" "}
                  transaction{preview.matched === 1 ? "" : "s"} will move.
                </span>
              ) : (
                <span className="text-muted-foreground">
                  No editable transactions match this account.
                </span>
              )}
              {preview.skippedReconciled > 0 && (
                <span className="mt-1 block text-muted-foreground text-xs">
                  {preview.skippedReconciled} reconciled transaction
                  {preview.skippedReconciled === 1 ? "" : "s"} will be skipped
                  (closed period).
                </span>
              )}
            </div>
          )}
        </div>

        <div className="mt-5 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-border px-4 py-2 text-sm transition-colors hover:bg-accent"
          >
            Cancel
          </button>
          {preview && preview.matched > 0 ? (
            <button
              type="button"
              onClick={() => setConfirmOpen(true)}
              className="inline-flex items-center gap-2 rounded-md bg-destructive px-4 py-2 font-medium text-destructive-foreground text-sm transition-colors hover:bg-destructive/90"
            >
              Recategorize {preview.matched}
            </button>
          ) : (
            <button
              type="button"
              onClick={handlePreview}
              disabled={!canPreview || isPreviewing}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
            >
              {isPreviewing && <Loader2Icon className="size-4 animate-spin" />}
              Preview
            </button>
          )}
        </div>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title="Recategorize transactions?"
        description={`This moves ${preview?.matched ?? 0} of ${vendor.name}'s transactions from "${fromName ? accountLabel(fromName) : ""}" to "${toName ? accountLabel(toName) : ""}" by rewriting those journal entries. This cannot be undone automatically.`}
        confirmLabel="Recategorize"
        destructive
        loading={isRunning}
        onConfirm={handleConfirm}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}

export default RecategorizeVendorDialog;
