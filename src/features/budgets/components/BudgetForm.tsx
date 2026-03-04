import { useState } from "react";
import type { Account } from "@/features/accounts/types/account";
import type { Budget, BudgetPeriod } from "@/features/budgets/types/budget";
import { BUDGET_PERIODS } from "@/features/budgets/types/budget";
import formatLabel from "@/lib/format/label";

type BudgetFormProps = {
  accounts: Account[];
  initialValues?: Partial<Budget>;
  onSubmit: (values: {
    accountId: string;
    amount: string;
    period: BudgetPeriod;
    rollover: boolean;
  }) => void;
  onCancel: () => void;
};

/**
 * Form for creating or editing a budget
 */
function BudgetForm({
  accounts,
  initialValues,
  onSubmit,
  onCancel,
}: BudgetFormProps) {
  const [accountId, setAccountId] = useState(initialValues?.accountId ?? "");
  const [amount, setAmount] = useState(initialValues?.amount ?? "");
  const [period, setPeriod] = useState<BudgetPeriod>(
    initialValues?.period ?? "monthly",
  );
  const [rollover, setRollover] = useState(initialValues?.rollover ?? false);

  // Filter to expense accounts only
  const expenseAccounts = accounts.filter((a) => a.type === "expense");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ accountId, amount, period, rollover });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Account */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="budget-account" className="font-medium text-sm">
          Expense Account
        </label>
        <select
          id="budget-account"
          required
          value={accountId}
          onChange={(e) => setAccountId(e.target.value)}
          className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <option value="" disabled>
            Select an account
          </option>
          {expenseAccounts.map((a) => (
            <option key={a.rowId} value={a.rowId}>
              {a.code ? `${a.code} - ` : ""}
              {a.name}
            </option>
          ))}
        </select>
      </div>

      {/* Amount */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="budget-amount" className="font-medium text-sm">
          Amount
        </label>
        <input
          id="budget-amount"
          type="number"
          required
          min="0.01"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="500.00"
          className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      {/* Period */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="budget-period" className="font-medium text-sm">
          Period
        </label>
        <select
          id="budget-period"
          value={period}
          onChange={(e) => setPeriod(e.target.value as BudgetPeriod)}
          className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          {BUDGET_PERIODS.map((p) => (
            <option key={p} value={p}>
              {formatLabel(p)}
            </option>
          ))}
        </select>
      </div>

      {/* Rollover */}
      <div className="flex items-center gap-2">
        <input
          id="budget-rollover"
          type="checkbox"
          checked={rollover}
          onChange={(e) => setRollover(e.target.checked)}
          className="size-4 rounded border-border"
        />
        <label htmlFor="budget-rollover" className="text-sm">
          Roll over unused budget to next period
        </label>
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

export default BudgetForm;
