import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import HierarchicalReportTable from "@/features/reports/components/HierarchicalReportTable";
import ReportFilters from "@/features/reports/components/ReportFilters";

import { API_URL } from "@/lib/config/env.config";
import formatCurrency from "@/lib/format/currency";

type ReportLineItem = {
  accountId: string;
  accountCode: string | null;
  accountName: string;
  accountType: string;
  subType: string | null;
  parentId: string | null;
  debitTotal?: string;
  creditTotal?: string;
};

type TrialBalanceData = {
  accounts: ReportLineItem[];
  totalDebits: string;
  totalCredits: string;
  isBalanced: boolean;
};

export const Route = createFileRoute("/_app/reports/trial-balance")({
  component: TrialBalancePage,
});

function TrialBalancePage() {
  const [data, setData] = useState<TrialBalanceData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (params: {
    startDate?: string;
    endDate?: string;
  }) => {
    setLoading(true);
    setError(null);

    try {
      const searchParams = new URLSearchParams();
      if (params.startDate) searchParams.set("startDate", params.startDate);
      if (params.endDate) searchParams.set("endDate", params.endDate);

      const res = await fetch(
        `${API_URL}/api/reports/trial-balance?${searchParams.toString()}`,
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

  // Group accounts by type into sections
  const sections = data ? buildSections(data.accounts) : [];

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="font-bold text-2xl">Trial Balance</h1>
        <p className="text-muted-foreground text-sm">
          Debit and credit totals for all accounts over a date range
        </p>
      </div>

      <ReportFilters mode="range" onGenerate={handleGenerate} />

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
          <HierarchicalReportTable
            sections={sections}
            showDebitCredit
            grandTotal={{
              label: "Total",
              value: data.totalDebits,
            }}
          />

          {/* Totals summary */}
          <div className="flex flex-wrap items-center gap-6 rounded-lg border border-border bg-card p-4">
            <div className="flex flex-col">
              <span className="text-muted-foreground text-xs">
                Total Debits
              </span>
              <span className="font-mono font-semibold">
                {formatCurrency(data.totalDebits)}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-muted-foreground text-xs">
                Total Credits
              </span>
              <span className="font-mono font-semibold">
                {formatCurrency(data.totalCredits)}
              </span>
            </div>

            <div
              className={`ml-auto rounded-full px-3 py-1 text-sm ${
                data.isBalanced
                  ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                  : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
              }`}
            >
              {data.isBalanced ? "Balanced" : "Unbalanced"}
            </div>
          </div>
        </>
      )}

      {!loading && !error && !data && (
        <div className="rounded-lg border border-border bg-card p-8 text-center">
          <p className="text-muted-foreground">
            Select a date range and click Generate to view the Trial Balance
          </p>
        </div>
      )}
    </div>
  );
}

/** Group line items by account type into report sections */
function buildSections(accounts: ReportLineItem[]) {
  const typeOrder = ["asset", "liability", "equity", "revenue", "expense"];
  const typeLabels: Record<string, string> = {
    asset: "Assets",
    liability: "Liabilities",
    equity: "Equity",
    revenue: "Revenue",
    expense: "Expenses",
  };

  const grouped = new Map<string, ReportLineItem[]>();

  for (const account of accounts) {
    const type = account.accountType;
    const existing = grouped.get(type) ?? [];
    existing.push(account);
    grouped.set(type, existing);
  }

  return typeOrder
    .filter((type) => grouped.has(type))
    .map((type) => {
      const items = grouped.get(type) ?? [];

      // Sum debits for section total
      let total = 0;
      for (const item of items) {
        const debit = Number.parseFloat(item.debitTotal ?? "0");
        const credit = Number.parseFloat(item.creditTotal ?? "0");
        total += debit - credit;
      }

      return {
        title: typeLabels[type] ?? type,
        items,
        total: Math.abs(total).toFixed(2),
        totalLabel: `Total ${typeLabels[type] ?? type}`,
      };
    });
}
