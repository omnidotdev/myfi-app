import { createFileRoute } from "@tanstack/react-router";
import { DownloadIcon, PrinterIcon } from "lucide-react";
import { useRef, useState } from "react";

import BookPicker from "@/features/books/components/BookPicker";
import HierarchicalReportTable from "@/features/reports/components/HierarchicalReportTable";
import ReportFilters from "@/features/reports/components/ReportFilters";
import TagFilter from "@/features/tags/components/TagFilter";

import { API_URL } from "@/lib/config/env.config";

import useActiveBook from "@/lib/hooks/useActiveBook";
import useTagGroups from "@/lib/hooks/useTagGroups";

type ReportLineItem = {
  accountId: string;
  accountCode: string | null;
  accountName: string;
  accountType: string;
  subType: string | null;
  parentId: string | null;
  netAmount?: string;
};

type ProfitAndLossData = {
  revenue: ReportLineItem[];
  expenses: ReportLineItem[];
  totalRevenue: string;
  totalExpenses: string;
  netIncome: string;
};

export const Route = createFileRoute("/_app/reports/profit-and-loss")({
  component: ProfitAndLossPage,
});

function ProfitAndLossPage() {
  const {
    activeBookId,
    books,
    isLoading: booksLoading,
    setActiveBookId,
  } = useActiveBook();
  const { tagGroups } = useTagGroups(activeBookId);
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);
  const [data, setData] = useState<ProfitAndLossData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const lastParams = useRef<{ startDate?: string; endDate?: string }>({});

  const handleGenerate = async (params: {
    startDate?: string;
    endDate?: string;
  }) => {
    lastParams.current = params;
    setLoading(true);
    setError(null);

    try {
      const searchParams = new URLSearchParams();
      if (activeBookId) searchParams.set("bookId", activeBookId);
      if (params.startDate) searchParams.set("startDate", params.startDate);
      if (params.endDate) searchParams.set("endDate", params.endDate);
      if (selectedTagIds.length > 0)
        searchParams.set("tagIds", selectedTagIds.join(","));

      const res = await fetch(
        `${API_URL}/api/reports/profit-and-loss?${searchParams.toString()}`,
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
          title: "Revenue",
          items: data.revenue,
          total: data.totalRevenue,
          totalLabel: "Total Revenue",
        },
        {
          title: "Expenses",
          items: data.expenses,
          total: data.totalExpenses,
          totalLabel: "Total Expenses",
        },
      ]
    : [];

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">Profit & Loss</h1>
          <p className="text-muted-foreground text-sm">
            Revenue and expenses over a date range
          </p>
        </div>
        <BookPicker
          books={books}
          selectedBookId={activeBookId}
          onSelect={setActiveBookId}
        />
      </div>

      <ReportFilters
        mode="range"
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
          {/* Export actions */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm transition-colors hover:bg-muted"
            >
              <PrinterIcon className="size-4" />
              Print
            </button>
            <button
              type="button"
              onClick={async () => {
                const sp = new URLSearchParams();
                sp.set("type", "profit-and-loss");
                sp.set("format", "csv");
                if (activeBookId) sp.set("bookId", activeBookId);
                if (lastParams.current.startDate)
                  sp.set("startDate", lastParams.current.startDate);
                if (lastParams.current.endDate)
                  sp.set("endDate", lastParams.current.endDate);
                if (selectedTagIds.length > 0)
                  sp.set("tagIds", selectedTagIds.join(","));

                const res = await fetch(
                  `${API_URL}/api/reports/export?${sp.toString()}`,
                );

                if (!res.ok) return;

                const blob = await res.blob();
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = `profit-and-loss.csv`;
                link.click();
                URL.revokeObjectURL(url);
              }}
              className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm transition-colors hover:bg-muted"
            >
              <DownloadIcon className="size-4" />
              Download CSV
            </button>
          </div>

          <HierarchicalReportTable
            sections={sections}
            grandTotal={{ label: "Net Income", value: data.netIncome }}
          />

          {/* Net income summary */}
          <div className="flex items-center justify-between rounded-lg border border-border bg-card p-4">
            <span className="font-semibold">Net Income</span>
            <span
              className={`font-mono font-semibold text-lg ${
                Number.parseFloat(data.netIncome) >= 0
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              $
              {Math.abs(Number.parseFloat(data.netIncome)).toLocaleString(
                "en-US",
                {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                },
              )}
            </span>
          </div>
        </>
      )}

      {!loading && !error && !data && (
        <div className="rounded-lg border border-border bg-card p-8 text-center">
          <p className="text-muted-foreground">
            Select a date range and click Generate to view the Profit & Loss
            report
          </p>
        </div>
      )}
    </div>
  );
}
