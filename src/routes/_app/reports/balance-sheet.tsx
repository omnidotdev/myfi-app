import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import BookPicker from "@/features/books/components/BookPicker";
import HierarchicalReportTable from "@/features/reports/components/HierarchicalReportTable";
import ReportFilters from "@/features/reports/components/ReportFilters";
import TagFilter from "@/features/tags/components/TagFilter";

import { API_URL } from "@/lib/config/env.config";
import formatCurrency from "@/lib/format/currency";

import useActiveBook from "@/lib/hooks/useActiveBook";
import useTagGroups from "@/lib/hooks/useTagGroups";

type ReportLineItem = {
  accountId: string;
  accountCode: string | null;
  accountName: string;
  accountType: string;
  subType: string | null;
  parentId: string | null;
  balance?: string;
};

type BalanceSheetData = {
  assets: ReportLineItem[];
  liabilities: ReportLineItem[];
  equity: ReportLineItem[];
  totalAssets: string;
  totalLiabilities: string;
  totalEquity: string;
  isBalanced: boolean;
};

export const Route = createFileRoute("/_app/reports/balance-sheet")({
  component: BalanceSheetPage,
});

function BalanceSheetPage() {
  const {
    activeBookId,
    books,
    isLoading: booksLoading,
    setActiveBookId,
  } = useActiveBook();
  const { tagGroups } = useTagGroups(activeBookId);
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);
  const [data, setData] = useState<BalanceSheetData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (params: { asOfDate?: string }) => {
    setLoading(true);
    setError(null);

    try {
      const searchParams = new URLSearchParams();
      if (activeBookId) searchParams.set("bookId", activeBookId);
      if (params.asOfDate) searchParams.set("asOfDate", params.asOfDate);
      if (selectedTagIds.length > 0)
        searchParams.set("tagIds", selectedTagIds.join(","));

      const res = await fetch(
        `${API_URL}/api/reports/balance-sheet?${searchParams.toString()}`,
      );

      if (!res.ok) {
        throw new Error(`Failed to fetch report: ${res.statusText}`);
      }

      const json = await res.json();
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load report");
    } finally {
      setLoading(false);
    }
  };

  const sections = data
    ? [
        {
          title: "Assets",
          items: data.assets,
          total: data.totalAssets,
          totalLabel: "Total Assets",
        },
        {
          title: "Liabilities",
          items: data.liabilities,
          total: data.totalLiabilities,
          totalLabel: "Total Liabilities",
        },
        {
          title: "Equity",
          items: data.equity,
          total: data.totalEquity,
          totalLabel: "Total Equity",
        },
      ]
    : [];

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">Balance Sheet</h1>
          <p className="text-muted-foreground text-sm">
            Assets, liabilities, and equity as of a specific date
          </p>
        </div>
        <BookPicker
          books={books}
          selectedBookId={activeBookId}
          onSelect={setActiveBookId}
        />
      </div>

      <ReportFilters
        mode="point-in-time"
        onGenerate={handleGenerate}
        extraFilters={
          <TagFilter
            tagGroups={tagGroups}
            selectedTagIds={selectedTagIds}
            onChange={setSelectedTagIds}
          />
        }
      />

      {loading && (
        <div className="rounded-lg border border-border bg-card p-8 text-center">
          <p className="text-muted-foreground">Generating report...</p>
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive text-sm">
          {error}
        </div>
      )}

      {!loading && !error && data && (
        <>
          <HierarchicalReportTable sections={sections} />

          {/* Balance indicator */}
          <div
            className={`flex items-center justify-between rounded-lg border p-4 ${
              data.isBalanced
                ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20"
                : "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20"
            }`}
          >
            <span className="font-semibold">
              {data.isBalanced ? "Balanced" : "Unbalanced"}
            </span>
            <span className="text-muted-foreground text-sm">
              Assets ({formatCurrency(data.totalAssets)}) = Liabilities (
              {formatCurrency(data.totalLiabilities)}) + Equity (
              {formatCurrency(data.totalEquity)})
            </span>
          </div>
        </>
      )}

      {!loading && !error && !data && (
        <div className="rounded-lg border border-border bg-card p-8 text-center">
          <p className="text-muted-foreground">
            Select a date and click Generate to view the Balance Sheet
          </p>
        </div>
      )}
    </div>
  );
}
