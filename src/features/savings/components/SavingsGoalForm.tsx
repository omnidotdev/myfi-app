import { useState } from "react";

import type { Account } from "@/features/accounts/types/account";
import type { SavingsGoal } from "@/features/savings/types/savingsGoal";

type SavingsGoalFormProps = {
  accounts: Account[];
  initialValues?: Partial<SavingsGoal>;
  onSubmit: (values: {
    accountId: string;
    name: string;
    targetAmount: string;
    targetDate: string | null;
  }) => void;
  onCancel: () => void;
};

/**
 * Form for creating or editing a savings goal
 */
function SavingsGoalForm({
  accounts,
  initialValues,
  onSubmit,
  onCancel,
}: SavingsGoalFormProps) {
  const [accountId, setAccountId] = useState(initialValues?.accountId ?? "");
  const [name, setName] = useState(initialValues?.name ?? "");
  const [targetAmount, setTargetAmount] = useState(
    initialValues?.targetAmount ?? "",
  );
  const [targetDate, setTargetDate] = useState(initialValues?.targetDate ?? "");

  // Filter to asset accounts suitable for savings goals
  const savingsAccounts = accounts.filter(
    (a) =>
      a.type === "asset" &&
      (a.subType === "savings" ||
        a.subType === "investment" ||
        a.subType === "checking" ||
        a.subType === "cash"),
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      accountId,
      name,
      targetAmount,
      targetDate: targetDate || null,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="goal-name" className="font-medium text-sm">
          Goal Name
        </label>
        <input
          id="goal-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Emergency Fund"
          className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      {/* Account */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="goal-account" className="font-medium text-sm">
          Account
        </label>
        <select
          id="goal-account"
          required
          value={accountId}
          onChange={(e) => setAccountId(e.target.value)}
          className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <option value="" disabled>
            Select an account
          </option>
          {savingsAccounts.map((a) => (
            <option key={a.rowId} value={a.rowId}>
              {a.code ? `${a.code} - ` : ""}
              {a.name}
            </option>
          ))}
        </select>
      </div>

      {/* Target amount */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="goal-target" className="font-medium text-sm">
          Target Amount
        </label>
        <input
          id="goal-target"
          type="number"
          required
          min="0.01"
          step="0.01"
          value={targetAmount}
          onChange={(e) => setTargetAmount(e.target.value)}
          placeholder="10000.00"
          className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      {/* Target date (optional) */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="goal-date" className="font-medium text-sm">
          Target Date
          <span className="ml-1 font-normal text-muted-foreground">
            (optional)
          </span>
        </label>
        <input
          id="goal-date"
          type="date"
          value={targetDate ? targetDate.split("T")[0] : ""}
          onChange={(e) =>
            setTargetDate(e.target.value ? `${e.target.value}T00:00:00Z` : "")
          }
          className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      {/* Actions */}
      <div className="mt-2 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-border px-4 py-2 text-sm transition-colors hover:bg-accent"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90"
        >
          {initialValues?.rowId ? "Save" : "Create"}
        </button>
      </div>
    </form>
  );
}

export default SavingsGoalForm;
