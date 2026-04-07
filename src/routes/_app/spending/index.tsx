import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BarChart3Icon,
  Loader2Icon,
  RepeatIcon,
  TrendingUpIcon,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import BookPicker from "@/features/books/components/BookPicker";
import SpendingByCategory from "@/features/spending/components/SpendingByCategory";
import SpendingTrends from "@/features/spending/components/SpendingTrends";
import SubscriptionList from "@/features/spending/components/SubscriptionList";
import { API_URL } from "@/lib/config/env.config";
import useActiveBook from "@/lib/hooks/useActiveBook";

export const Route = createFileRoute("/_app/spending/")({
  component: SpendingPage,
});

type Tab = "categories" | "trends" | "subscriptions";

type CategoryData = {
  accountId: string;
  accountName: string;
  accountCode: string | null;
  totalAmount: string;
  transactionCount: number;
  percentOfTotal: number;
};

type TrendData = {
  month: string;
  total: string;
};

type SubscriptionData = {
  memo: string;
  frequency: string;
  averageAmount: string;
  lastDate: string;
  estimatedAnnualCost: string;
  occurrences: number;
};

const TABS: { id: Tab; label: string; icon: typeof BarChart3Icon }[] = [
  { id: "categories", label: "Categories", icon: BarChart3Icon },
  { id: "trends", label: "Trends", icon: TrendingUpIcon },
  { id: "subscriptions", label: "Subscriptions", icon: RepeatIcon },
];

/** Get current year date range boundaries */
function getDefaultDateRange(): { startDate: string; endDate: string } {
  const now = new Date();
  const year = now.getFullYear();

  return {
    startDate: `${year}-01-01`,
    endDate: `${year}-12-31`,
  };
}

function SpendingPage() {
  const {
    activeBookId,
    books,
    isLoading: booksLoading,
    setActiveBookId,
  } = useActiveBook();

  const [activeTab, setActiveTab] = useState<Tab>("categories");
  const [trendMonths, setTrendMonths] = useState(12);

  // Category date range state
  const [dateRange, setDateRange] = useState(getDefaultDateRange);

  // Data state
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [categoriesTotal, setCategoriesTotal] = useState("0");
  const [trendsData, setTrendsData] = useState<TrendData[]>([]);
  const [subscriptions, setSubscriptions] = useState<SubscriptionData[]>([]);
  const [totalAnnualCost, setTotalAnnualCost] = useState("0");
  const [isLoading, setIsLoading] = useState(true);

  const fetchCategories = useCallback(async () => {
    if (!activeBookId) return;

    try {
      const params = new URLSearchParams({
        bookId: activeBookId,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
      });

      const res = await fetch(
        `${API_URL}/api/spending/categories?${params.toString()}`,
      );
      const data = await res.json();

      setCategories(data.categories ?? []);
      setCategoriesTotal(data.total ?? "0");
    } catch {
      // Silently handle fetch errors
    }
  }, [activeBookId, dateRange]);

  const fetchTrends = useCallback(async () => {
    if (!activeBookId) return;

    try {
      const res = await fetch(
        `${API_URL}/api/spending/trends?bookId=${activeBookId}&months=${trendMonths}`,
      );
      const data = await res.json();

      setTrendsData(data.months ?? []);
    } catch {
      // Silently handle fetch errors
    }
  }, [activeBookId, trendMonths]);

  const fetchSubscriptions = useCallback(async () => {
    if (!activeBookId) return;

    try {
      const res = await fetch(
        `${API_URL}/api/spending/recurring?bookId=${activeBookId}`,
      );
      const data = await res.json();

      setSubscriptions(data.subscriptions ?? []);
      setTotalAnnualCost(data.totalAnnualCost ?? "0");
    } catch {
      // Silently handle fetch errors
    }
  }, [activeBookId]);

  // Fetch all spending data when dependencies change
  useEffect(() => {
    if (!activeBookId) return;

    setIsLoading(true);

    Promise.all([fetchCategories(), fetchTrends(), fetchSubscriptions()])
      .catch(() => {
        // Silently handle fetch errors
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [activeBookId, fetchCategories, fetchTrends, fetchSubscriptions]);

  const loading = booksLoading || isLoading;

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">Spending Analysis</h1>
          <p className="text-muted-foreground text-sm">
            Analyze expenses by category, track trends, and detect recurring
            charges
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/spending/recurring"
            className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm transition-colors hover:bg-accent"
          >
            <RepeatIcon className="size-4" />
            Recurring
          </Link>

          <BookPicker
            books={books}
            selectedBookId={activeBookId}
            onSelect={setActiveBookId}
          />
        </div>
      </div>

      {/* Tab navigation */}
      <div className="flex items-center gap-1 rounded-lg border border-border bg-muted/50 p-1">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`inline-flex flex-1 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm transition-colors ${
              activeTab === tab.id
                ? "bg-card font-medium text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <tab.icon className="size-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center rounded-lg border border-border bg-card p-8">
          <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
        </div>
      )}

      {/* Tab content */}
      {!loading && activeTab === "categories" && (
        <div className="flex flex-col gap-4">
          {/* Date range picker */}
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">From</span>
              <input
                type="date"
                value={dateRange.startDate}
                onChange={(e) =>
                  setDateRange((prev) => ({
                    ...prev,
                    startDate: e.target.value,
                  }))
                }
                className="rounded-md border border-border bg-card px-3 py-1.5 text-sm"
              />
            </label>
            <label className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">To</span>
              <input
                type="date"
                value={dateRange.endDate}
                onChange={(e) =>
                  setDateRange((prev) => ({
                    ...prev,
                    endDate: e.target.value,
                  }))
                }
                className="rounded-md border border-border bg-card px-3 py-1.5 text-sm"
              />
            </label>
          </div>

          <SpendingByCategory categories={categories} total={categoriesTotal} />
        </div>
      )}

      {!loading && activeTab === "trends" && (
        <SpendingTrends
          months={trendsData}
          selectedRange={trendMonths}
          onRangeChange={setTrendMonths}
        />
      )}

      {!loading && activeTab === "subscriptions" && (
        <SubscriptionList
          subscriptions={subscriptions}
          totalAnnualCost={totalAnnualCost}
        />
      )}
    </div>
  );
}
