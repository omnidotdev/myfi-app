import { createFileRoute } from "@tanstack/react-router";
import {
  BarChart3Icon,
  RepeatIcon,
  TrendingUpIcon,
} from "lucide-react";
import { useState } from "react";

import SpendingByCategory from "@/features/spending/components/SpendingByCategory";
import SpendingTrends from "@/features/spending/components/SpendingTrends";
import SubscriptionList from "@/features/spending/components/SubscriptionList";

export const Route = createFileRoute("/_auth/spending/")({
  component: SpendingPage,
});

type Tab = "categories" | "trends" | "subscriptions";

const TABS: { id: Tab; label: string; icon: typeof BarChart3Icon }[] = [
  { id: "categories", label: "Categories", icon: BarChart3Icon },
  { id: "trends", label: "Trends", icon: TrendingUpIcon },
  { id: "subscriptions", label: "Subscriptions", icon: RepeatIcon },
];

function SpendingPage() {
  const [activeTab, setActiveTab] = useState<Tab>("categories");
  const [trendMonths, setTrendMonths] = useState(12);

  // Empty state data -- will be replaced with API fetch calls
  const categories: {
    accountId: string;
    accountName: string;
    accountCode: string | null;
    totalAmount: string;
    transactionCount: number;
    percentOfTotal: number;
  }[] = [];

  const trendsData: { month: string; total: string }[] = [];

  const subscriptions: {
    memo: string;
    frequency: string;
    averageAmount: string;
    lastDate: string;
    estimatedAnnualCost: string;
    occurrences: number;
  }[] = [];

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div>
        <h1 className="font-bold text-2xl">Spending Analysis</h1>
        <p className="text-muted-foreground text-sm">
          Analyze expenses by category, track trends, and detect recurring
          charges
        </p>
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

      {/* Tab content */}
      {activeTab === "categories" && (
        <SpendingByCategory categories={categories} total="0.0000" />
      )}

      {activeTab === "trends" && (
        <SpendingTrends
          months={trendsData}
          selectedRange={trendMonths}
          onRangeChange={setTrendMonths}
        />
      )}

      {activeTab === "subscriptions" && (
        <SubscriptionList
          subscriptions={subscriptions}
          totalAnnualCost="0.0000"
        />
      )}
    </div>
  );
}
