import { PlusIcon, WalletIcon } from "lucide-react";

import EmptyState from "@/components/EmptyState";
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
      <EmptyState
        icon={WalletIcon}
        title="No budgets yet"
        description="Create a budget to track spending against your expense accounts."
        action={
          <button
            type="button"
            onClick={onNew}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90"
          >
            <PlusIcon className="size-4" />
            Create a budget
          </button>
        }
      />
    );
  }

  // Build a lookup map for tracking data by budget ID
  const trackingByBudgetId = new Map(tracking.map((t) => [t.budgetId, t]));

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
