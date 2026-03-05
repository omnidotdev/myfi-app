import { createFileRoute } from "@tanstack/react-router";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import type { Account } from "@/features/accounts/types/account";
import BookPicker from "@/features/books/components/BookPicker";
import BudgetForm from "@/features/budgets/components/BudgetForm";
import BudgetList from "@/features/budgets/components/BudgetList";
import type {
  Budget,
  BudgetPeriod,
  BudgetTracking,
} from "@/features/budgets/types/budget";
import { API_URL } from "@/lib/config/env.config";
import useActiveBook from "@/lib/hooks/useActiveBook";

export const Route = createFileRoute("/_app/budgets/")({
  component: BudgetsPage,
});

function BudgetsPage() {
  const {
    activeBookId,
    books,
    isLoading: booksLoading,
    setActiveBookId,
  } = useActiveBook();

  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [tracking, setTracking] = useState<BudgetTracking[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);

  const fetchBudgets = useCallback(async () => {
    if (!activeBookId) return;

    setIsLoading(true);

    try {
      const [budgetsRes, trackingRes, accountsRes] = await Promise.all([
        fetch(`${API_URL}/api/budgets?bookId=${activeBookId}`),
        fetch(`${API_URL}/api/budgets/tracking?bookId=${activeBookId}`),
        fetch(`${API_URL}/api/accounts?bookId=${activeBookId}`),
      ]);

      const [budgetsData, trackingData, accountsData] = await Promise.all([
        budgetsRes.json(),
        trackingRes.json(),
        accountsRes.json(),
      ]);

      const mappedBudgets = (budgetsData.budgets ?? []).map(
        (b: Record<string, unknown>) => ({
          ...b,
          rowId: b.id as string,
        }),
      );

      const mappedAccounts = (accountsData.accounts ?? []).map(
        (a: Record<string, unknown>) => ({
          ...a,
          rowId: a.id as string,
        }),
      );

      setBudgets(mappedBudgets);
      setTracking(trackingData.tracking ?? trackingData ?? []);
      setAccounts(mappedAccounts);
    } catch {
      // Silently handle fetch errors
    } finally {
      setIsLoading(false);
    }
  }, [activeBookId]);

  useEffect(() => {
    fetchBudgets();
  }, [fetchBudgets]);

  const handleNew = useCallback(() => {
    setEditingBudget(null);
    setFormOpen(true);
  }, []);

  const handleEdit = useCallback((budget: Budget) => {
    setEditingBudget(budget);
    setFormOpen(true);
  }, []);

  const handleDelete = useCallback(
    async (budget: Budget) => {
      try {
        await fetch(`${API_URL}/api/budgets/${budget.rowId}`, {
          method: "DELETE",
        });

        await fetchBudgets();
      } catch {
        // Silently handle delete errors
      }
    },
    [fetchBudgets],
  );

  const handleSubmit = useCallback(
    async (values: {
      accountId: string;
      amount: string;
      period: BudgetPeriod;
      rollover: boolean;
    }) => {
      try {
        if (editingBudget) {
          await fetch(`${API_URL}/api/budgets/${editingBudget.rowId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          });
        } else {
          await fetch(`${API_URL}/api/budgets`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              bookId: activeBookId,
              ...values,
            }),
          });
        }

        await fetchBudgets();
        setFormOpen(false);
        setEditingBudget(null);
      } catch {
        // Silently handle submit errors
      }
    },
    [editingBudget, activeBookId, fetchBudgets],
  );

  const handleCancel = useCallback(() => {
    setFormOpen(false);
    setEditingBudget(null);
  }, []);

  const loading = booksLoading || isLoading;

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

        <div className="flex items-center gap-3">
          <BookPicker
            books={books}
            selectedBookId={activeBookId}
            onSelect={setActiveBookId}
          />

          <button
            type="button"
            onClick={handleNew}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90"
          >
            <PlusIcon className="size-4" />
            New Budget
          </button>
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center rounded-lg border border-border bg-card p-8">
          <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
        </div>
      )}

      {/* Budget list */}
      {!loading && (
        <BudgetList
          budgets={budgets}
          tracking={tracking}
          onNew={handleNew}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

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
