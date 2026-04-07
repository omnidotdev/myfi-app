import { createFileRoute } from "@tanstack/react-router";
import { DownloadIcon, PrinterIcon } from "lucide-react";
import { useRef, useState } from "react";

import BookPicker from "@/features/books/components/BookPicker";
import ReportFilters from "@/features/reports/components/ReportFilters";
import TagFilter from "@/features/tags/components/TagFilter";

import { API_URL } from "@/lib/config/env.config";
import formatCurrency from "@/lib/format/currency";

import useActiveBook from "@/lib/hooks/useActiveBook";
import useTagGroups from "@/lib/hooks/useTagGroups";

type CashFlowLineItem = {
  accountId: string;
  accountCode: string | null;
  accountName: string;
  accountType: string;
  subType: string | null;
  netAmount: string;
};

type CashFlowSection = {
  items: CashFlowLineItem[];
  total: string;
};

type CashFlowData = {
  operating: CashFlowSection;
  investing: CashFlowSection;
  financing: CashFlowSection;
  netCashChange: string;
};

export const Route = createFileRoute("/_app/reports/cash-flow")({
  component: CashFlowPage,
});

function CashFlowPage() {
  const {
    activeBookId,
    books,
    isLoading: booksLoading,
    setActiveBookId,
  } = useActiveBook();
  const { tagGroups } = useTagGroups(activeBookId);
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);
  const [data, setData] = useState<CashFlowData | null>(null);
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
        `${API_URL}/api/reports/cash-flow?${searchParams.toString()}`,
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

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">Cash Flow Statement</h1>
          <p className="text-muted-foreground text-sm">
            Cash movements classified by operating, investing, and financing
            activities
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
                sp.set("type", "cash-flow");
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
                link.download = "cash-flow.csv";
                link.click();
                URL.revokeObjectURL(url);
              }}
              className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm transition-colors hover:bg-muted"
            >
              <DownloadIcon className="size-4" />
              Download CSV
            </button>
          </div>

          <CashFlowSectionTable
            title="Operating Activities"
            description="Cash from revenue and expense accounts"
            section={data.operating}
          />

          <CashFlowSectionTable
            title="Investing Activities"
            description="Cash from asset accounts (excluding cash/bank)"
            section={data.investing}
          />

          <CashFlowSectionTable
            title="Financing Activities"
            description="Cash from liability and equity accounts"
            section={data.financing}
          />

          {/* Net cash change summary */}
          <div className="flex items-center justify-between rounded-lg border border-border bg-card p-4">
            <span className="font-semibold">Net Cash Change</span>
            <span
              className={`font-mono font-semibold text-lg ${
                Number.parseFloat(data.netCashChange) >= 0
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {formatCurrency(data.netCashChange)}
            </span>
          </div>
        </>
      )}

      {!loading && !error && !data && (
        <div className="rounded-lg border border-border bg-card p-8 text-center">
          <p className="text-muted-foreground">
            Select a date range and click Generate to view the Cash Flow
            Statement
          </p>
        </div>
      )}
    </div>
  );
}

type CashFlowSectionTableProps = {
  title: string;
  description: string;
  section: CashFlowSection;
};

function CashFlowSectionTable({
  title,
  description,
  section,
}: CashFlowSectionTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-card">
      <div className="border-border border-b bg-muted/50 px-4 py-3">
        <h2 className="font-semibold text-sm">{title}</h2>
        <p className="text-muted-foreground text-xs">{description}</p>
      </div>

      {section.items.length === 0 ? (
        <div className="px-4 py-6 text-center text-muted-foreground text-sm">
          No activity in this category
        </div>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="border-border border-b text-left text-muted-foreground">
              <th className="px-4 py-2 font-medium">Code</th>
              <th className="px-4 py-2 font-medium">Account</th>
              <th className="px-4 py-2 text-right font-medium">Amount</th>
            </tr>
          </thead>

          <tbody>
            {section.items.map((item) => (
              <tr
                key={item.accountId}
                className="border-border border-b transition-colors hover:bg-accent/30"
              >
                <td className="whitespace-nowrap px-4 py-2 font-mono text-muted-foreground">
                  {item.accountCode}
                </td>
                <td className="px-4 py-2">{item.accountName}</td>
                <td className="whitespace-nowrap px-4 py-2 text-right font-mono">
                  {formatCurrency(item.netAmount)}
                </td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr className="bg-muted/20 font-semibold">
              <td className="px-4 py-2" />
              <td className="px-4 py-2">Total {title}</td>
              <td className="whitespace-nowrap px-4 py-2 text-right font-mono">
                {formatCurrency(section.total)}
              </td>
            </tr>
          </tfoot>
        </table>
      )}
    </div>
  );
}
