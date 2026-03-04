import { CalendarIcon, TargetIcon, Trash2Icon } from "lucide-react";

import type { SavingsGoal } from "@/features/savings/types/savingsGoal";

type SavingsGoalCardProps = {
  goal: SavingsGoal;
  onDelete: () => void;
};

/** Format a numeric string as currency display */
function formatAmount(value: string): string {
  const num = Number.parseFloat(value);
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/** Compute days remaining until a target date */
function daysRemaining(targetDate: string): number {
  const target = new Date(targetDate);
  const now = new Date();
  const diffMs = target.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
}

/** Compute monthly contribution needed to reach a target by a date */
function monthlyContributionNeeded(
  current: number,
  target: number,
  targetDate: string,
): number | null {
  const remaining = target - current;
  if (remaining <= 0) return 0;

  const now = new Date();
  const end = new Date(targetDate);
  const monthsLeft =
    (end.getFullYear() - now.getFullYear()) * 12 +
    (end.getMonth() - now.getMonth());

  if (monthsLeft <= 0) return null;
  return remaining / monthsLeft;
}

/** Determine progress bar color based on whether the goal is on track */
function getProgressColor(
  percent: number,
  hasDate: boolean,
  isOnTrack: boolean,
): string {
  if (percent >= 100) return "bg-green-500";
  if (hasDate && !isOnTrack) return "bg-yellow-500";
  return "bg-green-500";
}

/**
 * Card displaying a single savings goal with progress tracking
 */
function SavingsGoalCard({ goal, onDelete }: SavingsGoalCardProps) {
  const current = Number.parseFloat(goal.currentAmount || "0");
  const target = Number.parseFloat(goal.targetAmount);
  const percent = target > 0 ? (current / target) * 100 : 0;
  const percentClamped = Math.min(percent, 100);

  const days = goal.targetDate ? daysRemaining(goal.targetDate) : null;
  const monthlyNeeded = goal.targetDate
    ? monthlyContributionNeeded(current, target, goal.targetDate)
    : null;

  // Consider "on track" if no target date or monthly contribution is reasonable
  const isOnTrack =
    monthlyNeeded === null ||
    monthlyNeeded === 0 ||
    monthlyNeeded < target / 12;

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/30">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <TargetIcon className="size-4 text-primary" />
          <div className="flex flex-col gap-0.5">
            <h3 className="font-semibold text-base">
              {goal.name || goal.accountName || "Savings Goal"}
            </h3>
            {goal.accountCode && (
              <span className="font-mono text-muted-foreground text-xs">
                {goal.accountCode}
              </span>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={onDelete}
          aria-label="Delete goal"
          className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
        >
          <Trash2Icon className="size-3.5" />
        </button>
      </div>

      {/* Progress bar */}
      <div className="flex flex-col gap-1.5">
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className={`h-full rounded-full transition-all ${getProgressColor(percent, !!goal.targetDate, isOnTrack)}`}
            style={{ width: `${percentClamped}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">
            {percent.toFixed(1)}% complete
          </span>
          {percent >= 100 && (
            <span className="font-medium text-green-600">Goal reached</span>
          )}
        </div>
      </div>

      {/* Amounts */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="flex flex-col">
          <span className="text-muted-foreground text-xs">Saved</span>
          <span className="font-medium">
            ${formatAmount(goal.currentAmount || "0")}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-muted-foreground text-xs">Target</span>
          <span className="font-medium">
            ${formatAmount(goal.targetAmount)}
          </span>
        </div>
      </div>

      {/* Target date info */}
      {goal.targetDate && (
        <div className="flex flex-col gap-1 border-border border-t pt-3 text-sm">
          <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
            <CalendarIcon className="size-3" />
            <span>
              {new Date(goal.targetDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            {days !== null && (
              <span className="ml-1">({days} days remaining)</span>
            )}
          </div>
          {monthlyNeeded !== null && monthlyNeeded > 0 && (
            <span className="text-muted-foreground text-xs">
              ${formatAmount(monthlyNeeded.toFixed(2))}/mo needed
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default SavingsGoalCard;
