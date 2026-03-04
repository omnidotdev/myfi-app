import { PlusIcon, WalletIcon } from "lucide-react";

import BudgetCard from "@/features/budgets/components/BudgetCard";

import type { Budget, BudgetTracking } from "@/features/budgets/types/budget";

type BudgetListProps = {
  budgets: Budget[];
  tracking: BudgetTracking[];
  onNew: () => void;
  onEdit: (budget: Budget) => void;
  onDelete: (budget: Budget) => void;
};

/**
 * Grid of budget cards with empty state
 */
function BudgetList({
  budgets,
  tracking,
  onNew,
  onEdit,
  onDelete,
}: BudgetListProps) {
  if (budgets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-border py-16">
        <div className="flex size-12 items-center justify-center rounded-full bg-muted">
          <WalletIcon className="size-6 text-muted-foreground" />
        </div>
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="font-semibold text-base">No budgets yet</h3>
          <p className="max-w-sm text-muted-foreground text-sm">
            Create a budget to track spending against your expense accounts
          </p>
        </div>
        <button
          type="button"
          onClick={onNew}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90"
        >
          <PlusIcon className="size-4" />
          Create Budget
        </button>
      </div>
    );
  }

  // Build a lookup map for tracking data by budget ID
  const trackingByBudgetId = new Map(
    tracking.map((t) => [t.budgetId, t]),
  );

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {budgets.map((budget) => {
        const budgetTracking = trackingByBudgetId.get(budget.rowId);

        // Fall back to a zero-state tracking if not yet computed
        const trackingData: BudgetTracking = budgetTracking ?? {
          budgetId: budget.rowId,
          accountId: budget.accountId,
          accountName: budget.accountName ?? "Unknown",
          accountCode: budget.accountCode ?? null,
          targetAmount: budget.amount,
          actualAmount: "0",
          percentUsed: 0,
          remaining: budget.amount,
          status: "on_track",
        };

        return (
          <BudgetCard
            key={budget.rowId}
            tracking={trackingData}
            period={budget.period}
            onEdit={() => onEdit(budget)}
            onDelete={() => onDelete(budget)}
          />
        );
      })}
    </div>
  );
}

export default BudgetList;
