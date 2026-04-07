import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeftIcon,
  CalendarIcon,
  DollarSignIcon,
  Loader2Icon,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import type { Account } from "@/features/accounts/types/account";
import { API_URL } from "@/lib/config/env.config";
import formatCurrency from "@/lib/format/currency";
import useActiveBook from "@/lib/hooks/useActiveBook";

export const Route = createFileRoute("/_app/assets/$assetId")({
  component: AssetDetailPage,
});

type FixedAsset = {
  id: string;
  bookId: string;
  name: string;
  description: string | null;
  acquisitionDate: string;
  acquisitionCost: string;
  salvageValue: string;
  usefulLifeMonths: number;
  depreciationMethod: "straight_line" | "macrs";
  macrsClass: number | null;
  assetAccountId: string;
  depreciationExpenseAccountId: string;
  accumulatedDepreciationAccountId: string;
  disposedAt: string | null;
  disposalProceeds: string | null;
  totalDepreciated: string;
  bookValue: string;
  monthlyDepreciation: string;
  createdAt: string;
  updatedAt: string;
};

type ScheduleRow = {
  month: string;
  depreciationAmount: number;
  cumulative: number;
  remainingBookValue: number;
};

function AssetDetailPage() {
  const { assetId } = useParams({ from: "/_app/assets/$assetId" });
  const { activeBookId, isLoading: booksLoading } = useActiveBook();

  const [asset, setAsset] = useState<FixedAsset | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [disposeFormOpen, setDisposeFormOpen] = useState(false);

  // Dispose form state
  const [disposeDate, setDisposeDate] = useState("");
  const [disposeProceeds, setDisposeProceeds] = useState("0");
  const [disposeProceedsAccountId, setDisposeProceedsAccountId] = useState("");
  const [disposeGainLossAccountId, setDisposeGainLossAccountId] = useState("");

  const fetchAsset = useCallback(async () => {
    setIsLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/fixed-assets/${assetId}`);
      const data = await res.json();

      setAsset(data.asset ?? data);
    } catch {
      // Silently handle fetch errors
    } finally {
      setIsLoading(false);
    }
  }, [assetId]);

  const fetchAccounts = useCallback(async () => {
    if (!activeBookId) return;

    try {
      const res = await fetch(`${API_URL}/api/accounts?bookId=${activeBookId}`);
      const data = await res.json();
      const mapped = (data.accounts ?? []).map(
        (a: Record<string, unknown>) => ({
          ...a,
          rowId: a.id as string,
        }),
      );

      setAccounts(mapped);
    } catch {
      // Silently handle fetch errors
    }
  }, [activeBookId]);

  useEffect(() => {
    fetchAsset();
  }, [fetchAsset]);

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  // Generate depreciation schedule client-side
  const schedule = useMemo((): ScheduleRow[] => {
    if (!asset) return [];

    const cost = Number.parseFloat(asset.acquisitionCost);
    const salvage = Number.parseFloat(asset.salvageValue);
    const depreciableBasis = cost - salvage;
    const monthlyDep = depreciableBasis / asset.usefulLifeMonths;

    const rows: ScheduleRow[] = [];
    const startDate = new Date(`${asset.acquisitionDate}T00:00:00`);
    const endDate = asset.disposedAt
      ? new Date(`${asset.disposedAt}T00:00:00`)
      : new Date();

    // Start from the month after acquisition
    let current = new Date(startDate.getFullYear(), startDate.getMonth() + 1);
    let cumulative = 0;

    while (current <= endDate && rows.length < asset.usefulLifeMonths) {
      const amount = Math.min(monthlyDep, depreciableBasis - cumulative);
      if (amount <= 0) break;

      cumulative += amount;

      rows.push({
        month: current.toISOString().slice(0, 7),
        depreciationAmount: amount,
        cumulative,
        remainingBookValue: cost - cumulative,
      });

      current = new Date(current.getFullYear(), current.getMonth() + 1);
    }

    return rows;
  }, [asset]);

  const handleDispose = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      try {
        await fetch(`${API_URL}/api/fixed-assets/${assetId}/dispose`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            disposalDate: disposeDate,
            proceeds: disposeProceeds,
            proceedsAccountId: disposeProceedsAccountId || undefined,
            gainLossAccountId: disposeGainLossAccountId || undefined,
          }),
        });

        await fetchAsset();
        setDisposeFormOpen(false);
      } catch {
        // Silently handle dispose errors
      }
    },
    [
      assetId,
      disposeDate,
      disposeProceeds,
      disposeProceedsAccountId,
      disposeGainLossAccountId,
      fetchAsset,
    ],
  );

  const loading = booksLoading || isLoading;

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!asset) {
    return (
      <div className="flex flex-col items-center gap-4 p-12">
        <p className="text-muted-foreground">Asset not found</p>
        <Link to="/assets" className="text-primary text-sm hover:underline">
          Back to assets
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Back link + header */}
      <div>
        <Link
          to="/assets"
          className="mb-3 inline-flex items-center gap-1 text-muted-foreground text-sm transition-colors hover:text-foreground"
        >
          <ArrowLeftIcon className="size-4" />
          Back to assets
        </Link>

        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-bold text-2xl">{asset.name}</h1>
            {asset.description && (
              <p className="mt-1 text-muted-foreground text-sm">
                {asset.description}
              </p>
            )}
            <div className="mt-2 flex items-center gap-4 text-muted-foreground text-sm">
              <span className="inline-flex items-center gap-1">
                <CalendarIcon className="size-3.5" />
                Acquired {asset.acquisitionDate}
              </span>
              <span>
                {asset.depreciationMethod === "straight_line"
                  ? "Straight Line"
                  : `MACRS ${asset.macrsClass}yr`}
              </span>
              <span>{asset.usefulLifeMonths} months useful life</span>
              {asset.disposedAt && (
                <span className="rounded bg-muted px-1.5 py-0.5 text-xs">
                  Disposed {asset.disposedAt}
                </span>
              )}
            </div>
          </div>

          {!asset.disposedAt && (
            <button
              type="button"
              onClick={() => setDisposeFormOpen(true)}
              className="rounded-md border border-border px-4 py-2 text-sm transition-colors hover:bg-accent"
            >
              Dispose
            </button>
          )}
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <DollarSignIcon className="size-4" />
            Original Cost
          </div>
          <p className="mt-1 font-semibold text-2xl">
            {formatCurrency(asset.acquisitionCost)}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-muted-foreground text-sm">Total Depreciated</p>
          <p className="mt-1 font-semibold text-2xl">
            {formatCurrency(asset.totalDepreciated)}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-muted-foreground text-sm">Book Value</p>
          <p className="mt-1 font-semibold text-2xl">
            {formatCurrency(asset.bookValue)}
          </p>
        </div>
      </div>

      {/* Disposal info */}
      {asset.disposedAt && asset.disposalProceeds != null && (
        <div className="rounded-lg border border-border bg-card p-4">
          <h2 className="mb-2 font-semibold">Disposal Details</h2>
          <div className="flex gap-6 text-sm">
            <span>
              <span className="text-muted-foreground">Date:</span>{" "}
              {asset.disposedAt}
            </span>
            <span>
              <span className="text-muted-foreground">Proceeds:</span>{" "}
              {formatCurrency(asset.disposalProceeds)}
            </span>
          </div>
        </div>
      )}

      {/* Depreciation schedule */}
      <div>
        <h2 className="mb-3 font-semibold text-lg">Depreciation Schedule</h2>
        {schedule.length > 0 ? (
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-border border-b bg-muted/50">
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    Month
                  </th>
                  <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                    Depreciation Amount
                  </th>
                  <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                    Cumulative
                  </th>
                  <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                    Remaining Book Value
                  </th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((row) => (
                  <tr
                    key={row.month}
                    className="border-border border-b last:border-b-0"
                  >
                    <td className="px-4 py-2 text-muted-foreground">
                      {row.month}
                    </td>
                    <td className="px-4 py-2 text-right">
                      {formatCurrency(row.depreciationAmount)}
                    </td>
                    <td className="px-4 py-2 text-right">
                      {formatCurrency(row.cumulative)}
                    </td>
                    <td className="px-4 py-2 text-right font-medium">
                      {formatCurrency(row.remainingBookValue)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="rounded-lg border border-border bg-card p-6 text-center">
            <p className="text-muted-foreground text-sm">
              No depreciation entries yet
            </p>
          </div>
        )}
      </div>

      {/* Dispose form dialog */}
      {disposeFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
            onClick={() => setDisposeFormOpen(false)}
            aria-label="Close dialog"
          />

          {/* Dialog */}
          <div className="relative w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-lg">
            <h2 className="mb-4 font-semibold text-lg">Dispose Asset</h2>

            <form onSubmit={handleDispose} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="dispose-date" className="font-medium text-sm">
                  Disposal Date
                </label>
                <input
                  id="dispose-date"
                  type="date"
                  required
                  value={disposeDate}
                  onChange={(e) => setDisposeDate(e.target.value)}
                  className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="dispose-proceeds"
                  className="font-medium text-sm"
                >
                  Proceeds
                </label>
                <input
                  id="dispose-proceeds"
                  type="number"
                  min="0"
                  step="0.01"
                  value={disposeProceeds}
                  onChange={(e) => setDisposeProceeds(e.target.value)}
                  className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="dispose-proceeds-acct"
                  className="font-medium text-sm"
                >
                  Proceeds Account
                </label>
                <select
                  id="dispose-proceeds-acct"
                  value={disposeProceedsAccountId}
                  onChange={(e) => setDisposeProceedsAccountId(e.target.value)}
                  className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="">Select account</option>
                  {accounts.map((a) => (
                    <option key={a.rowId} value={a.rowId}>
                      {a.code} - {a.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="dispose-gainloss-acct"
                  className="font-medium text-sm"
                >
                  Gain/Loss Account
                </label>
                <select
                  id="dispose-gainloss-acct"
                  value={disposeGainLossAccountId}
                  onChange={(e) => setDisposeGainLossAccountId(e.target.value)}
                  className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="">Select account</option>
                  {accounts.map((a) => (
                    <option key={a.rowId} value={a.rowId}>
                      {a.code} - {a.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setDisposeFormOpen(false)}
                  className="rounded-md border border-border px-4 py-2 text-sm transition-colors hover:bg-accent"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90"
                >
                  Dispose Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
