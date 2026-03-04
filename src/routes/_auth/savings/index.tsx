import { createFileRoute } from "@tanstack/react-router";
import {
  DollarSignIcon,
  Loader2Icon,
  PlusIcon,
  TrendingDownIcon,
  TrendingUpIcon,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import type { Account } from "@/features/accounts/types/account";
import BookPicker from "@/features/books/components/BookPicker";
import SavingsGoalCard from "@/features/savings/components/SavingsGoalCard";
import SavingsGoalForm from "@/features/savings/components/SavingsGoalForm";
import type {
  NetWorthSummary,
  SavingsGoal,
} from "@/features/savings/types/savingsGoal";
import { API_URL } from "@/lib/config/env.config";
import formatCurrency from "@/lib/format/currency";
import useActiveBook from "@/lib/hooks/useActiveBook";

export const Route = createFileRoute("/_auth/savings/")({
  component: SavingsPage,
});

function SavingsPage() {
  const {
    activeBookId,
    books,
    isLoading: booksLoading,
    setActiveBookId,
  } = useActiveBook();

  const [goals, setGoals] = useState<SavingsGoal[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [netWorth, setNetWorth] = useState<NetWorthSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);

  const fetchData = useCallback(async () => {
    if (!activeBookId) return;

    setIsLoading(true);

    try {
      const [goalsRes, accountsRes, netWorthRes] = await Promise.all([
        fetch(`${API_URL}/api/savings-goals?bookId=${activeBookId}`),
        fetch(`${API_URL}/api/accounts?bookId=${activeBookId}`),
        fetch(`${API_URL}/api/net-worth?bookId=${activeBookId}`),
      ]);

      const [goalsData, accountsData, netWorthData] = await Promise.all([
        goalsRes.json(),
        accountsRes.json(),
        netWorthRes.json(),
      ]);

      const mappedGoals = (goalsData.goals ?? []).map(
        (g: Record<string, unknown>) => ({
          ...g,
          rowId: g.id as string,
        }),
      );

      const mappedAccounts = (accountsData.accounts ?? []).map(
        (a: Record<string, unknown>) => ({
          ...a,
          rowId: a.id as string,
        }),
      );

      setGoals(mappedGoals);
      setAccounts(mappedAccounts);
      setNetWorth(netWorthData);
    } catch {
      // Silently handle fetch errors
    } finally {
      setIsLoading(false);
    }
  }, [activeBookId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleNew = useCallback(() => {
    setFormOpen(true);
  }, []);

  const handleDelete = useCallback(
    async (goal: SavingsGoal) => {
      try {
        await fetch(`${API_URL}/api/savings-goals/${goal.rowId}`, {
          method: "DELETE",
        });

        await fetchData();
      } catch {
        // Silently handle delete errors
      }
    },
    [fetchData],
  );

  const handleSubmit = useCallback(
    async (values: {
      accountId: string;
      name: string;
      targetAmount: string;
      targetDate: string | null;
    }) => {
      try {
        await fetch(`${API_URL}/api/savings-goals`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            bookId: activeBookId,
            ...values,
          }),
        });

        await fetchData();
        setFormOpen(false);
      } catch {
        // Silently handle submit errors
      }
    },
    [activeBookId, fetchData],
  );

  const handleCancel = useCallback(() => {
    setFormOpen(false);
  }, []);

  const loading = booksLoading || isLoading;

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
            New Goal
          </button>
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center rounded-lg border border-border bg-card p-8">
          <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
        </div>
      )}

      {/* Net worth summary */}
      {!loading && netWorth && (
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
                {formatCurrency(netWorth.totalAssets)}
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
                {formatCurrency(netWorth.totalLiabilities)}
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
                {formatCurrency(netWorth.netWorth)}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Goals grid */}
      {!loading && goals.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-border border-dashed py-16">
          <p className="text-muted-foreground text-sm">No savings goals yet</p>
          <button
            type="button"
            onClick={handleNew}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90"
          >
            <PlusIcon className="size-4" />
            Create your first goal
          </button>
        </div>
      )}

      {!loading && goals.length > 0 && (
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
