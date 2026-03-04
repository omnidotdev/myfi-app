import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import ReconciliationTable from "@/features/reconciliation/components/ReconciliationTable";

import type { ReconciliationItem } from "@/features/reconciliation/types/reconciliation";

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
  const [items] = useState<ReconciliationItem[]>([]);
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>("all");

  const filteredItems = useMemo(() => {
    if (sourceFilter === "all") return items;

    return items.filter((item) => item.source === sourceFilter);
  }, [items, sourceFilter]);

  const pendingCount = items.filter((item) => item.status === "pending").length;

  const handleApprove = (_itemId: string) => {
    // Will be wired to GraphQL mutation
  };

  const handleEdit = (_itemId: string) => {
    // Will navigate to journal entry form for editing
  };

  const handleReject = (_itemId: string) => {
    // Will be wired to GraphQL mutation
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <h1 className="font-bold text-2xl">Reconciliation Queue</h1>
        {pendingCount > 0 && (
          <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 font-medium text-amber-800 text-xs dark:bg-amber-900/20 dark:text-amber-300">
            {pendingCount} pending
          </span>
        )}
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

      {/* Reconciliation table */}
      <ReconciliationTable
        items={filteredItems}
        onApprove={handleApprove}
        onEdit={handleEdit}
        onReject={handleReject}
      />
    </div>
  );
}
