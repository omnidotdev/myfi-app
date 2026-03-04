import { createFileRoute } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";
import { useCallback, useState } from "react";

import BudgetForm from "@/features/budgets/components/BudgetForm";
import BudgetList from "@/features/budgets/components/BudgetList";

import type { Account } from "@/features/accounts/types/account";
import type {
  Budget,
  BudgetPeriod,
  BudgetTracking,
} from "@/features/budgets/types/budget";

export const Route = createFileRoute("/_auth/budgets/")({
  component: BudgetsPage,
});

function BudgetsPage() {
  const [budgets] = useState<Budget[]>([]);
  const [tracking] = useState<BudgetTracking[]>([]);
  const [accounts] = useState<Account[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);

  const handleNew = useCallback(() => {
    setEditingBudget(null);
    setFormOpen(true);
  }, []);

  const handleEdit = useCallback((budget: Budget) => {
    setEditingBudget(budget);
    setFormOpen(true);
  }, []);

  const handleDelete = useCallback((_budget: Budget) => {
    // Will be wired to GraphQL mutation
  }, []);

  const handleSubmit = useCallback(
    (_values: {
      accountId: string;
      amount: string;
      period: BudgetPeriod;
      rollover: boolean;
    }) => {
      // Will be wired to GraphQL mutation
      setFormOpen(false);
      setEditingBudget(null);
    },
    [],
  );

  const handleCancel = useCallback(() => {
    setFormOpen(false);
    setEditingBudget(null);
  }, []);

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">Budgets</h1>
          <p className="text-muted-foreground text-sm">
            Track spending against your expense account budgets
          </p>
        </div>

        <button
          type="button"
          onClick={handleNew}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90"
        >
          <PlusIcon className="size-4" />
          New Budget
        </button>
      </div>

      {/* Budget list */}
      <BudgetList
        budgets={budgets}
        tracking={tracking}
        onNew={handleNew}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Budget form dialog */}
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
            <h2 className="mb-4 font-semibold text-lg">
              {editingBudget ? "Edit Budget" : "Create Budget"}
            </h2>

            <BudgetForm
              accounts={accounts}
              initialValues={editingBudget ?? undefined}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          </div>
        </div>
      )}
    </div>
  );
}
