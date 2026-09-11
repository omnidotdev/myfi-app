import { Loader2Icon } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import type { QuickbooksStatus } from "@/features/quickbooks/types/status";
import { API_URL } from "@/lib/config/env.config";

type Reconciliation = NonNullable<QuickbooksStatus["latestReconciliation"]>;

type Props = {
  bookId: string;
  connectedAccountId: string;
  latestReconciliation: Reconciliation | null;
  onReconcileStarted: () => void | Promise<void>;
};

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-gray-100 text-gray-800",
  running: "bg-blue-100 text-blue-800",
  complete: "bg-green-100 text-green-800",
  failed: "bg-red-100 text-red-800",
};

const STATUS_LABELS: Record<string, string> = {
  pending: "Pending",
  running: "Running",
  complete: "Complete",
  failed: "Failed",
};

/** Format a YYYY-MM-DD period bound for display */
function formatPeriod(start: string | null, end: string | null): string {
  if (!start && !end) return "Full history";

  return `${start ?? "?"} to ${end ?? "?"}`;
}

/**
 * Reconcile the imported QuickBooks book against MyFi over a period, and show
 * the latest reconciliation summary
 */
function ReconcileControl({
  bookId,
  connectedAccountId,
  latestReconciliation,
  onReconcileStarted,
}: Props) {
  const [periodStart, setPeriodStart] = useState("");
  const [periodEnd, setPeriodEnd] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleReconcile = useCallback(async () => {
    if (!periodStart || !periodEnd) {
      toast.error("Select a start and end date");

      return;
    }

    if (periodStart > periodEnd) {
      toast.error("Start date must be on or before end date");

      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch(`${API_URL}/api/quickbooks/reconcile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookId,
          connectedAccountId,
          periodStart,
          periodEnd,
        }),
      });

      if (!res.ok) throw new Error("failed to start reconciliation");

      toast.success("Reconciliation started");
      await onReconcileStarted();
    } catch {
      toast.error("Failed to start reconciliation");
    } finally {
      setSubmitting(false);
    }
  }, [bookId, connectedAccountId, periodStart, periodEnd, onReconcileStarted]);

  const badgeStyle = latestReconciliation
    ? (STATUS_STYLES[latestReconciliation.status] ??
      "bg-gray-100 text-gray-800")
    : "";
  const badgeLabel = latestReconciliation
    ? (STATUS_LABELS[latestReconciliation.status] ??
      latestReconciliation.status)
    : "";

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-4">
      <span className="font-semibold text-sm">Reconcile</span>

      <div className="flex flex-wrap items-end gap-3">
        <label className="flex flex-col gap-1 text-xs">
          <span className="font-medium text-muted-foreground">Start date</span>
          <input
            type="date"
            value={periodStart}
            onChange={(e) => setPeriodStart(e.target.value)}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </label>

        <label className="flex flex-col gap-1 text-xs">
          <span className="font-medium text-muted-foreground">End date</span>
          <input
            type="date"
            value={periodEnd}
            onChange={(e) => setPeriodEnd(e.target.value)}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </label>

        <button
          type="button"
          onClick={handleReconcile}
          disabled={submitting}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
        >
          {submitting && <Loader2Icon className="size-4 animate-spin" />}
          Reconcile
        </button>
      </div>

      {latestReconciliation && (
        <div className="flex flex-col gap-2 border-border border-t pt-3">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm">Latest reconciliation</span>
            <span
              className={`inline-flex rounded-full px-2 py-0.5 font-medium text-xs ${badgeStyle}`}
            >
              {badgeLabel}
            </span>
          </div>

          <span className="text-muted-foreground text-xs">
            Period:{" "}
            {formatPeriod(
              latestReconciliation.periodStart,
              latestReconciliation.periodEnd,
            )}
          </span>

          <span className="text-muted-foreground text-xs">
            {latestReconciliation.mismatchCount} mismatched accounts, total
            variance {latestReconciliation.totalVariance ?? "0"}
          </span>

          {latestReconciliation.status === "failed" &&
            latestReconciliation.errorMessage && (
              <p className="text-destructive text-xs">
                {latestReconciliation.errorMessage}
              </p>
            )}
        </div>
      )}
    </div>
  );
}

export default ReconcileControl;
