import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import BookPicker from "@/features/books/components/BookPicker";
import ComparativeReportTable, {
  type ComparativeRow,
} from "@/features/reports/components/ComparativeReportTable";
import HierarchicalReportTable from "@/features/reports/components/HierarchicalReportTable";
import ReportExportActions from "@/features/reports/components/ReportExportActions";
import ReportFilters from "@/features/reports/components/ReportFilters";
import VarianceThresholdControls from "@/features/reports/components/VarianceThresholdControls";
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

type ComparativeTotal = {
  current: string;
  prior: string;
  variance: string;
  variancePct: string | null;
};

type ComparativeBsData = {
  priorAsOfDate: string;
  assets: ComparativeRow[];
  liabilities: ComparativeRow[];
  equity: ComparativeRow[];
  totals: {
    totalAssets: ComparativeTotal;
    totalLiabilities: ComparativeTotal;
    totalEquity: ComparativeTotal;
  };
};

/** The same calendar date one year earlier, for a year-over-year balance sheet */
const priorYear = (asOfDate: string) => {
  const d = new Date(asOfDate);
  d.setFullYear(d.getFullYear() - 1);
  return d.toISOString().slice(0, 10);
};

export const Route = createFileRoute(
  "/_app/@{$workspaceSlug}/~/reports/balance-sheet",
)({
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
  const [comparative, setComparative] = useState<ComparativeBsData | null>(
    null,
  );
  const [compare, setCompare] = useState(false);
  const [flagPct, setFlagPct] = useState(10);
  const [flagAmount, setFlagAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const lastParams = useRef<{ asOfDate?: string }>({});

  const handleGenerate = async (params: { asOfDate?: string }) => {
    lastParams.current = params;
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

      if (compare && params.asOfDate) {
        const cmp = new URLSearchParams(searchParams);
        cmp.set("priorAsOfDate", priorYear(params.asOfDate));
        const cmpRes = await fetch(
          `${API_URL}/api/reports/comparative-balance-sheet?${cmp.toString()}`,
        );
        setComparative(cmpRes.ok ? await cmpRes.json() : null);
      } else {
        setComparative(null);
      }
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
          <>
            <TagFilter
              tagGroups={tagGroups}
              selectedTagIds={selectedTagIds}
              onChange={setSelectedTagIds}
            />
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={compare}
                onChange={(e) => setCompare(e.target.checked)}
                className="size-4 rounded border-border"
              />
              Compare to prior year
            </label>
          </>
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
          <ReportExportActions
            reportType="balance-sheet"
            filename="balance-sheet"
            bookId={activeBookId}
            query={{
              asOfDate: lastParams.current.asOfDate,
              tagIds: selectedTagIds,
            }}
          />

          {comparative ? (
            <div className="flex flex-col gap-3">
              <VarianceThresholdControls
                pct={flagPct}
                amount={flagAmount}
                onPctChange={setFlagPct}
                onAmountChange={setFlagAmount}
              />
              <ComparativeReportTable
                sections={[
                  {
                    title: "Assets",
                    totalLabel: "Total Assets",
                    rows: comparative.assets,
                    total: comparative.totals.totalAssets,
                  },
                  {
                    title: "Liabilities",
                    totalLabel: "Total Liabilities",
                    rows: comparative.liabilities,
                    total: comparative.totals.totalLiabilities,
                  },
                  {
                    title: "Equity",
                    totalLabel: "Total Equity",
                    rows: comparative.equity,
                    total: comparative.totals.totalEquity,
                  },
                ]}
                thresholds={{ pct: flagPct, amount: flagAmount }}
              />
            </div>
          ) : (
            <HierarchicalReportTable sections={sections} />
          )}

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
