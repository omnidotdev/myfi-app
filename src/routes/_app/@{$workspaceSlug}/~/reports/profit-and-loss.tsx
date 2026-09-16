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

type ComparativeTotal = {
  current: string;
  prior: string;
  variance: string;
  variancePct: string | null;
};

type ComparativePnlData = {
  revenue: ComparativeRow[];
  expenses: ComparativeRow[];
  totals: {
    totalRevenue: ComparativeTotal;
    totalExpenses: ComparativeTotal;
    netIncome: ComparativeTotal;
  };
};

/** The equal-length period immediately preceding [startDate, endDate] */
const priorWindow = (startDate: string, endDate: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const lengthMs = end.getTime() - start.getTime();
  const priorEnd = new Date(start.getTime() - 86_400_000);
  const priorStart = new Date(priorEnd.getTime() - lengthMs);
  return {
    priorStartDate: priorStart.toISOString().slice(0, 10),
    priorEndDate: priorEnd.toISOString().slice(0, 10),
  };
};

export const Route = createFileRoute(
  "/_app/@{$workspaceSlug}/~/reports/profit-and-loss",
)({
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
  const [comparative, setComparative] = useState<ComparativePnlData | null>(
    null,
  );
  const [compare, setCompare] = useState(false);
  const [flagPct, setFlagPct] = useState(10);
  const [flagAmount, setFlagAmount] = useState(0);
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

      if (compare && params.startDate && params.endDate) {
        const { priorStartDate, priorEndDate } = priorWindow(
          params.startDate,
          params.endDate,
        );
        const cmp = new URLSearchParams(searchParams);
        cmp.set("priorStartDate", priorStartDate);
        cmp.set("priorEndDate", priorEndDate);
        const cmpRes = await fetch(
          `${API_URL}/api/reports/comparative-profit-and-loss?${cmp.toString()}`,
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
              Compare to prior period
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
            reportType="profit-and-loss"
            filename="profit-and-loss"
            bookId={activeBookId}
            query={{
              startDate: lastParams.current.startDate,
              endDate: lastParams.current.endDate,
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
                    title: "Revenue",
                    totalLabel: "Total Revenue",
                    rows: comparative.revenue,
                    total: comparative.totals.totalRevenue,
                  },
                  {
                    title: "Expenses",
                    totalLabel: "Total Expenses",
                    rows: comparative.expenses,
                    total: comparative.totals.totalExpenses,
                  },
                ]}
                grandTotal={{
                  label: "Net Income",
                  total: comparative.totals.netIncome,
                }}
                thresholds={{ pct: flagPct, amount: flagAmount }}
              />
            </div>
          ) : (
            <HierarchicalReportTable
              sections={sections}
              grandTotal={{ label: "Net Income", value: data.netIncome }}
            />
          )}

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
