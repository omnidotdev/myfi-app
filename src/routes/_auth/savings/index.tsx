import { createFileRoute } from "@tanstack/react-router";
import {
  DollarSignIcon,
  PlusIcon,
  TrendingDownIcon,
  TrendingUpIcon,
} from "lucide-react";
import { useCallback, useState } from "react";

import SavingsGoalCard from "@/features/savings/components/SavingsGoalCard";
import SavingsGoalForm from "@/features/savings/components/SavingsGoalForm";

import type { Account } from "@/features/accounts/types/account";
import type {
  NetWorthSummary,
  SavingsGoal,
} from "@/features/savings/types/savingsGoal";

export const Route = createFileRoute("/_auth/savings/")({
  component: SavingsPage,
});

/** Format a numeric string as currency display */
function formatAmount(value: string): string {
  const num = Number.parseFloat(value);
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function SavingsPage() {
  const [goals] = useState<SavingsGoal[]>([]);
  const [accounts] = useState<Account[]>([]);
  const [netWorth] = useState<NetWorthSummary | null>(null);
  const [formOpen, setFormOpen] = useState(false);

  const handleNew = useCallback(() => {
    setFormOpen(true);
  }, []);

  const handleDelete = useCallback((_goal: SavingsGoal) => {
    // Will be wired to GraphQL mutation
  }, []);

  const handleSubmit = useCallback(
    (_values: {
      accountId: string;
      name: string;
      targetAmount: string;
      targetDate: string | null;
    }) => {
      // Will be wired to GraphQL mutation
      setFormOpen(false);
    },
    [],
  );

  const handleCancel = useCallback(() => {
    setFormOpen(false);
  }, []);

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">Savings Goals</h1>
          <p className="text-muted-foreground text-sm">
            Track progress toward your financial goals
          </p>
        </div>

        <button
          type="button"
          onClick={handleNew}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90"
        >
          <PlusIcon className="size-4" />
          New Goal
        </button>
      </div>

      {/* Net worth summary */}
      {netWorth && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
            <div className="flex size-10 items-center justify-center rounded-full bg-green-100 text-green-600">
              <TrendingUpIcon className="size-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-muted-foreground text-xs">
                Total Assets
              </span>
              <span className="font-semibold text-lg">
                ${formatAmount(netWorth.totalAssets)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
            <div className="flex size-10 items-center justify-center rounded-full bg-red-100 text-red-600">
              <TrendingDownIcon className="size-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-muted-foreground text-xs">
                Total Liabilities
              </span>
              <span className="font-semibold text-lg">
                ${formatAmount(netWorth.totalLiabilities)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
            <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <DollarSignIcon className="size-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-muted-foreground text-xs">Net Worth</span>
              <span
                className={`font-semibold text-lg ${Number.parseFloat(netWorth.netWorth) >= 0 ? "text-green-600" : "text-red-500"}`}
              >
                ${formatAmount(netWorth.netWorth)}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Goals grid */}
      {goals.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border py-16">
          <p className="text-muted-foreground text-sm">
            No savings goals yet
          </p>
          <button
            type="button"
            onClick={handleNew}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90"
          >
            <PlusIcon className="size-4" />
            Create your first goal
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {goals.map((goal) => (
            <SavingsGoalCard
              key={goal.rowId}
              goal={goal}
              onDelete={() => handleDelete(goal)}
            />
          ))}
        </div>
      )}

      {/* Goal form dialog */}
      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
            onClick={handleCancel}
            aria-label="Close dialog"
          />

          {/* Dialog */}
          <div className="relative w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-lg">
            <h2 className="mb-4 font-semibold text-lg">Create Savings Goal</h2>

            <SavingsGoalForm
              accounts={accounts}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          </div>
        </div>
      )}
    </div>
  );
}
