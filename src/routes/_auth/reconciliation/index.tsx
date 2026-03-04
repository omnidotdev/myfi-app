import { createFileRoute } from "@tanstack/react-router";
import { Loader2Icon } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import BookPicker from "@/features/books/components/BookPicker";
import ReconciliationTable from "@/features/reconciliation/components/ReconciliationTable";
import type { ReconciliationItem } from "@/features/reconciliation/types/reconciliation";
import { API_URL } from "@/lib/config/env.config";
import useActiveBook from "@/lib/hooks/useActiveBook";

type SourceFilter = "all" | "plaid_import" | "mantle_sync" | "crypto_sync";

const SOURCE_FILTERS: { value: SourceFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "plaid_import", label: "Plaid" },
  { value: "mantle_sync", label: "Mantle" },
  { value: "crypto_sync", label: "Crypto" },
];

export const Route = createFileRoute("/_auth/reconciliation/")({
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
  const [isLoading, setIsLoading] = useState(true);
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>("all");

  const fetchItems = useCallback(async () => {
    if (!activeBookId) return;

    setIsLoading(true);

    try {
      const res = await fetch(
        `${API_URL}/api/reconciliation?bookId=${activeBookId}`,
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
  }, [activeBookId]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const filteredItems = useMemo(() => {
    if (sourceFilter === "all") return items;

    return items.filter((item) => item.source === sourceFilter);
  }, [items, sourceFilter]);

  const pendingCount = items.filter(
    (item) => item.status === "pending_review",
  ).length;

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

  const loading = booksLoading || isLoading;

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="font-bold text-2xl">Reconciliation Queue</h1>
          {pendingCount > 0 && (
            <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 font-medium text-amber-800 text-xs dark:bg-amber-900/20 dark:text-amber-300">
              {pendingCount} pending
            </span>
          )}
        </div>

        <BookPicker
          books={books}
          selectedBookId={activeBookId}
          onSelect={setActiveBookId}
        />
      </div>

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
          onApprove={handleApprove}
          onEdit={handleEdit}
          onReject={handleReject}
        />
      )}
    </div>
  );
}
