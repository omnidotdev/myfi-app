import { PencilIcon, Trash2Icon } from "lucide-react";

import type { BudgetTracking } from "@/features/budgets/types/budget";
import type { BudgetPeriod } from "@/features/budgets/types/budget";

type BudgetCardProps = {
  tracking: BudgetTracking;
  period: BudgetPeriod;
  onEdit: () => void;
  onDelete: () => void;
};

/** Format a snake_case value for display */
function formatLabel(value: string): string {
  return value
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/** Determine progress bar color based on percent used */
function getProgressColor(percent: number): string {
  if (percent >= 90) return "bg-red-500";
  if (percent >= 75) return "bg-yellow-500";
  return "bg-green-500";
}

/** Format a numeric string as currency display */
function formatAmount(value: string): string {
  const num = Number.parseFloat(value);
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/**
 * Card displaying a single budget with progress tracking
 */
function BudgetCard({ tracking, period, onEdit, onDelete }: BudgetCardProps) {
  const percentClamped = Math.min(tracking.percentUsed, 100);
  const isOverBudget = tracking.status === "over_budget";

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/30">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold text-base">
            {tracking.accountName}
          </h3>
          {tracking.accountCode && (
            <span className="font-mono text-muted-foreground text-xs">
              {tracking.accountCode}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-medium text-primary text-xs">
            {formatLabel(period)}
          </span>

          <button
            type="button"
            onClick={onEdit}
            aria-label="Edit budget"
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <PencilIcon className="size-3.5" />
          </button>
          <button
            type="button"
            onClick={onDelete}
            aria-label="Delete budget"
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
          >
            <Trash2Icon className="size-3.5" />
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="flex flex-col gap-1.5">
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className={`h-full rounded-full transition-all ${getProgressColor(tracking.percentUsed)}`}
            style={{ width: `${percentClamped}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">
            {tracking.percentUsed.toFixed(1)}% used
          </span>
          {isOverBudget && (
            <span className="font-medium text-red-500">Over budget</span>
          )}
        </div>
      </div>

      {/* Amounts */}
      <div className="grid grid-cols-3 gap-3 text-sm">
        <div className="flex flex-col">
          <span className="text-muted-foreground text-xs">Spent</span>
          <span className="font-medium">${formatAmount(tracking.actualAmount)}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-muted-foreground text-xs">Budget</span>
          <span className="font-medium">${formatAmount(tracking.targetAmount)}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-muted-foreground text-xs">Remaining</span>
          <span
            className={`font-medium ${Number.parseFloat(tracking.remaining) < 0 ? "text-red-500" : "text-green-600"}`}
          >
            ${formatAmount(tracking.remaining)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default BudgetCard;
