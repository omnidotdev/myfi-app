import { createFileRoute } from "@tanstack/react-router";
import { DownloadIcon, PrinterIcon } from "lucide-react";
import { useState } from "react";

import BookPicker from "@/features/books/components/BookPicker";
import ReportFilters from "@/features/reports/components/ReportFilters";

import { API_URL } from "@/lib/config/env.config";
import formatCurrency from "@/lib/format/currency";
import useActiveBook from "@/lib/hooks/useActiveBook";

type AgingBuckets = {
  current: string;
  days1to30: string;
  days31to60: string;
  days61to90: string;
  over90: string;
  total: string;
};

type AgingVendorRow = {
  vendorId: string | null;
  vendorName: string;
} & AgingBuckets;

type AgingReportData = {
  bookId: string;
  asOfDate: string;
  reportType: "ap" | "ar";
  vendors: AgingVendorRow[];
  totals: AgingBuckets;
  generatedAt: string;
};

export const Route = createFileRoute("/_app/reports/ar-aging")({
  component: ArAgingPage,
});

function ArAgingPage() {
  const { activeBookId, books, setActiveBookId } = useActiveBook();
  const [data, setData] = useState<AgingReportData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (params: { asOfDate?: string }) => {
    setLoading(true);
    setError(null);

    try {
      const searchParams = new URLSearchParams();
      if (activeBookId) searchParams.set("bookId", activeBookId);
      if (params.asOfDate) searchParams.set("asOfDate", params.asOfDate);

      const res = await fetch(
        `${API_URL}/api/reports/ar-aging?${searchParams.toString()}`,
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

  const downloadCsv = () => {
    if (!data) return;

    const headers = [
      "Customer",
      "Current",
      "1-30 Days",
      "31-60 Days",
      "61-90 Days",
      "90+ Days",
      "Total",
    ];
    const rows = data.vendors.map((v) => [
      v.vendorName,
      v.current,
      v.days1to30,
      v.days31to60,
      v.days61to90,
      v.over90,
      v.total,
    ]);
    rows.push([
      "Totals",
      data.totals.current,
      data.totals.days1to30,
      data.totals.days31to60,
      data.totals.days61to90,
      data.totals.over90,
      data.totals.total,
    ]);

    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "ar-aging.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">AR Aging</h1>
          <p className="text-muted-foreground text-sm">
            Outstanding receivables grouped by customer and aging bucket
          </p>
        </div>
        <BookPicker
          books={books}
          selectedBookId={activeBookId}
          onSelect={setActiveBookId}
        />
      </div>

      <ReportFilters mode="point-in-time" onGenerate={handleGenerate} />

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
              onClick={downloadCsv}
              className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm transition-colors hover:bg-muted"
            >
              <DownloadIcon className="size-4" />
              Download CSV
            </button>
          </div>

          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-border border-b bg-muted/50">
                  <th className="px-4 py-3 text-left font-medium">Customer</th>
                  <th className="px-4 py-3 text-right font-medium">Current</th>
                  <th className="px-4 py-3 text-right font-medium">1-30</th>
                  <th className="px-4 py-3 text-right font-medium">31-60</th>
                  <th className="px-4 py-3 text-right font-medium">61-90</th>
                  <th className="px-4 py-3 text-right font-medium">90+</th>
                  <th className="px-4 py-3 text-right font-medium">Total</th>
                </tr>
              </thead>
              <tbody>
                {data.vendors.map((vendor) => (
                  <tr
                    key={vendor.vendorId ?? vendor.vendorName}
                    className="border-border border-b"
                  >
                    <td className="px-4 py-3">{vendor.vendorName}</td>
                    <td className="px-4 py-3 text-right font-mono">
                      {formatCurrency(vendor.current)}
                    </td>
                    <td className="px-4 py-3 text-right font-mono">
                      {formatCurrency(vendor.days1to30)}
                    </td>
                    <td className="px-4 py-3 text-right font-mono">
                      {formatCurrency(vendor.days31to60)}
                    </td>
                    <td className="px-4 py-3 text-right font-mono">
                      {formatCurrency(vendor.days61to90)}
                    </td>
                    <td className="px-4 py-3 text-right font-mono">
                      {formatCurrency(vendor.over90)}
                    </td>
                    <td className="px-4 py-3 text-right font-mono font-semibold">
                      {formatCurrency(vendor.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-muted/50 font-semibold">
                  <td className="px-4 py-3">Totals</td>
                  <td className="px-4 py-3 text-right font-mono">
                    {formatCurrency(data.totals.current)}
                  </td>
                  <td className="px-4 py-3 text-right font-mono">
                    {formatCurrency(data.totals.days1to30)}
                  </td>
                  <td className="px-4 py-3 text-right font-mono">
                    {formatCurrency(data.totals.days31to60)}
                  </td>
                  <td className="px-4 py-3 text-right font-mono">
                    {formatCurrency(data.totals.days61to90)}
                  </td>
                  <td className="px-4 py-3 text-right font-mono">
                    {formatCurrency(data.totals.over90)}
                  </td>
                  <td className="px-4 py-3 text-right font-mono">
                    {formatCurrency(data.totals.total)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </>
      )}

      {!loading && !error && !data && (
        <div className="rounded-lg border border-border bg-card p-8 text-center">
          <p className="text-muted-foreground">
            Select a date and click Generate to view the AR Aging report
          </p>
        </div>
      )}
    </div>
  );
}
