import { createFileRoute } from "@tanstack/react-router";
import { Loader2Icon } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import BookPicker from "@/features/books/components/BookPicker";
import ReconciliationTable from "@/features/reconciliation/components/ReconciliationTable";
import type { ReconciliationItem } from "@/features/reconciliation/types/reconciliation";
import { API_URL } from "@/lib/config/env.config";
import useActiveBook from "@/lib/hooks/useActiveBook";

type SourceFilter =
  | "all"
  | "plaid_import"
  | "mantle_sync"
  | "crypto_sync"
  | "csv_import"
  | "ofx_import";

type Account = {
  rowId: string;
  name: string;
  code: string;
};

const SOURCE_FILTERS: { value: SourceFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "plaid_import", label: "Plaid" },
  { value: "csv_import", label: "CSV" },
  { value: "ofx_import", label: "OFX" },
  { value: "mantle_sync", label: "Mantle" },
  { value: "crypto_sync", label: "Crypto" },
];

const MONTHS = [
  { value: 0, label: "All Months" },
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];

export const Route = createFileRoute("/_app/reconciliation/")({
  component: ReconciliationPage,
});

function ReconciliationPage() {
  const {
    activeBookId,
    books,
    isLoading: booksLoading,
    setActiveBookId,
  } = useActiveBook();

  const [items, setItems] = useState<ReconciliationItem[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>("all");
  const [periodYear, setPeriodYear] = useState<number>(0);
  const [periodMonth, setPeriodMonth] = useState<number>(0);

  const fetchItems = useCallback(async () => {
    if (!activeBookId) return;

    setIsLoading(true);

    try {
      const params = new URLSearchParams({ bookId: activeBookId });

      if (periodYear > 0) params.set("periodYear", String(periodYear));
      if (periodMonth > 0) params.set("periodMonth", String(periodMonth));

      const res = await fetch(
        `${API_URL}/api/reconciliation?${params.toString()}`,
      );
      const data = await res.json();
      const mapped = (data.items ?? []).map(
        (item: Record<string, unknown>) => ({
          ...item,
          rowId: item.id as string,
        }),
      );

      setItems(mapped);
    } catch {
      // Silently handle fetch errors
    } finally {
      setIsLoading(false);
    }
  }, [activeBookId, periodYear, periodMonth]);

  const fetchAccounts = useCallback(async () => {
    if (!activeBookId) return;

    try {
      const res = await fetch(`${API_URL}/api/accounts?bookId=${activeBookId}`);
      const data = await res.json();

      setAccounts(
        (data.accounts ?? []).map((a: Record<string, unknown>) => ({
          rowId: a.id as string,
          name: a.name as string,
          code: a.code as string,
        })),
      );
    } catch {
      // Silently handle fetch errors
    }
  }, [activeBookId]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  const filteredItems = useMemo(() => {
    if (sourceFilter === "all") return items;

    return items.filter((item) => item.source === sourceFilter);
  }, [items, sourceFilter]);

  // Summary counts
  const uncategorizedCount = items.filter(
    (item) =>
      item.categorizationSource === "uncategorized" ||
      item.categorizationSource === null,
  ).length;

  const needsReviewCount = items.filter(
    (item) => item.status === "pending_review",
  ).length;

  const autoApprovedCount = items.filter(
    (item) => item.status === "approved",
  ).length;

  // Generate year options (current year and a few prior)
  const currentYear = new Date().getFullYear();
  const yearOptions = useMemo(() => {
    const years = [{ value: 0, label: "All Years" }];

    for (let y = currentYear; y >= currentYear - 4; y--) {
      years.push({ value: y, label: String(y) });
    }

    return years;
  }, [currentYear]);

  const handleApprove = useCallback(
    async (itemId: string) => {
      try {
        await fetch(`${API_URL}/api/reconciliation/${itemId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "approved" }),
        });

        await fetchItems();
      } catch {
        // Silently handle approve errors
      }
    },
    [fetchItems],
  );

  const handleEdit = useCallback((_itemId: string) => {
    // Will navigate to journal entry form for editing
  }, []);

  const handleReject = useCallback(
    async (itemId: string) => {
      try {
        await fetch(`${API_URL}/api/reconciliation/${itemId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "rejected" }),
        });

        await fetchItems();
      } catch {
        // Silently handle reject errors
      }
    },
    [fetchItems],
  );

  const handleCorrect = useCallback(
    async (
      itemId: string,
      status: string,
      debitAccountId: string,
      creditAccountId: string,
    ) => {
      try {
        await fetch(`${API_URL}/api/reconciliation/${itemId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            status,
            debitAccountId: debitAccountId || undefined,
            creditAccountId: creditAccountId || undefined,
          }),
        });

        await fetchItems();
      } catch {
        // Silently handle correct errors
      }
    },
    [fetchItems],
  );

  const loading = booksLoading || isLoading;

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="font-bold text-2xl">Reconciliation Queue</h1>
          {needsReviewCount > 0 && (
            <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 font-medium text-amber-800 text-xs dark:bg-amber-900/20 dark:text-amber-300">
              {needsReviewCount} pending
            </span>
          )}
        </div>

        <BookPicker
          books={books}
          selectedBookId={activeBookId}
          onSelect={setActiveBookId}
        />
      </div>

      {/* Summary counts */}
      <div className="flex gap-4">
        <div className="rounded-lg border border-border bg-card px-4 py-2">
          <span className="text-muted-foreground text-xs">Uncategorized</span>
          <p className="font-semibold text-lg">{uncategorizedCount}</p>
        </div>
        <div className="rounded-lg border border-border bg-card px-4 py-2">
          <span className="text-muted-foreground text-xs">Needs Review</span>
          <p className="font-semibold text-lg">{needsReviewCount}</p>
        </div>
        <div className="rounded-lg border border-border bg-card px-4 py-2">
          <span className="text-muted-foreground text-xs">Auto-Approved</span>
          <p className="font-semibold text-lg">{autoApprovedCount}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Source filter tabs */}
        <div className="flex gap-1 rounded-lg border border-border bg-card p-1">
          {SOURCE_FILTERS.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => setSourceFilter(filter.value)}
              className={`rounded-md px-4 py-2 text-sm transition-colors ${
                sourceFilter === filter.value
                  ? "bg-primary font-medium text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Period filters */}
        <div className="flex items-center gap-2">
          <select
            value={periodYear}
            onChange={(e) => setPeriodYear(Number(e.target.value))}
            className="rounded-lg border border-border bg-card px-3 py-2 text-sm"
          >
            {yearOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <select
            value={periodMonth}
            onChange={(e) => setPeriodMonth(Number(e.target.value))}
            className="rounded-lg border border-border bg-card px-3 py-2 text-sm"
          >
            {MONTHS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center rounded-lg border border-border bg-card p-8">
          <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
        </div>
      )}

      {/* Reconciliation table */}
      {!loading && (
        <ReconciliationTable
          items={filteredItems}
          accounts={accounts}
          onApprove={handleApprove}
          onEdit={handleEdit}
          onReject={handleReject}
          onCorrect={handleCorrect}
        />
      )}
    </div>
  );
}
