import { createFileRoute, Link } from "@tanstack/react-router";
import { HardDriveIcon, Loader2Icon, PlusIcon, Trash2Icon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import type { Account } from "@/features/accounts/types/account";
import BookPicker from "@/features/books/components/BookPicker";
import { API_URL } from "@/lib/config/env.config";
import formatCurrency from "@/lib/format/currency";
import useActiveBook from "@/lib/hooks/useActiveBook";

export const Route = createFileRoute("/_app/assets/")({
  component: AssetsPage,
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

const DEPRECIATION_METHODS = [
  { value: "straight_line", label: "Straight Line" },
  { value: "macrs", label: "MACRS" },
] as const;

const MACRS_CLASSES = [3, 5, 7, 15, 27.5, 39] as const;

function AssetsPage() {
  const {
    activeBookId,
    books,
    isLoading: booksLoading,
    setActiveBookId,
  } = useActiveBook();

  const [assets, setAssets] = useState<FixedAsset[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);

  // Form state
  const [formName, setFormName] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formAcquisitionDate, setFormAcquisitionDate] = useState("");
  const [formAcquisitionCost, setFormAcquisitionCost] = useState("");
  const [formSalvageValue, setFormSalvageValue] = useState("0");
  const [formUsefulLifeMonths, setFormUsefulLifeMonths] = useState("");
  const [formMethod, setFormMethod] = useState<"straight_line" | "macrs">(
    "straight_line",
  );
  const [formMacrsClass, setFormMacrsClass] = useState<string>("");
  const [formAssetAccountId, setFormAssetAccountId] = useState("");
  const [formExpenseAccountId, setFormExpenseAccountId] = useState("");
  const [formAccumAccountId, setFormAccumAccountId] = useState("");

  const fetchAssets = useCallback(async () => {
    if (!activeBookId) return;

    setIsLoading(true);

    try {
      const res = await fetch(
        `${API_URL}/api/fixed-assets?bookId=${activeBookId}`,
      );
      const data = await res.json();

      setAssets(data.assets ?? []);
    } catch {
      // Silently handle fetch errors
    } finally {
      setIsLoading(false);
    }
  }, [activeBookId]);

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
    fetchAssets();
    fetchAccounts();
  }, [fetchAssets, fetchAccounts]);

  const resetForm = useCallback(() => {
    setFormName("");
    setFormDescription("");
    setFormAcquisitionDate("");
    setFormAcquisitionCost("");
    setFormSalvageValue("0");
    setFormUsefulLifeMonths("");
    setFormMethod("straight_line");
    setFormMacrsClass("");
    setFormAssetAccountId("");
    setFormExpenseAccountId("");
    setFormAccumAccountId("");
  }, []);

  const handleAddAsset = useCallback(() => {
    resetForm();
    setFormOpen(true);
  }, [resetForm]);

  const handleCancel = useCallback(() => {
    setFormOpen(false);
    resetForm();
  }, [resetForm]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!activeBookId) return;

      try {
        await fetch(`${API_URL}/api/fixed-assets`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            bookId: activeBookId,
            name: formName,
            description: formDescription || undefined,
            acquisitionDate: formAcquisitionDate,
            acquisitionCost: formAcquisitionCost,
            salvageValue: formSalvageValue,
            usefulLifeMonths: Number(formUsefulLifeMonths),
            depreciationMethod: formMethod,
            macrsClass:
              formMethod === "macrs" ? Number(formMacrsClass) : undefined,
            assetAccountId: formAssetAccountId,
            depreciationExpenseAccountId: formExpenseAccountId,
            accumulatedDepreciationAccountId: formAccumAccountId,
          }),
        });

        await fetchAssets();
        setFormOpen(false);
        resetForm();
      } catch {
        // Silently handle submit errors
      }
    },
    [
      activeBookId,
      formName,
      formDescription,
      formAcquisitionDate,
      formAcquisitionCost,
      formSalvageValue,
      formUsefulLifeMonths,
      formMethod,
      formMacrsClass,
      formAssetAccountId,
      formExpenseAccountId,
      formAccumAccountId,
      fetchAssets,
      resetForm,
    ],
  );

  const handleDelete = useCallback(
    async (assetId: string) => {
      if (!confirm("Are you sure you want to delete this asset?")) return;

      try {
        await fetch(`${API_URL}/api/fixed-assets/${assetId}`, {
          method: "DELETE",
        });

        await fetchAssets();
      } catch {
        // Silently handle delete errors
      }
    },
    [fetchAssets],
  );

  const loading = booksLoading || isLoading;

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">Fixed Assets</h1>
          <p className="text-muted-foreground text-sm">
            Track depreciable assets and their book values
          </p>
        </div>

        <div className="flex items-center gap-3">
          <BookPicker
            books={books}
            selectedBookId={activeBookId}
            onSelect={setActiveBookId}
          />

          <button
            type="button"
            onClick={handleAddAsset}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90"
          >
            <PlusIcon className="size-4" />
            Add Asset
          </button>
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center rounded-lg border border-border bg-card p-8">
          <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
        </div>
      )}

      {/* Empty state */}
      {!loading && assets.length === 0 && (
        <div className="rounded-lg border border-border bg-card p-8 text-center">
          <HardDriveIcon className="mx-auto mb-3 size-10 text-muted-foreground" />
          <p className="font-medium">No fixed assets yet</p>
          <p className="mt-1 text-muted-foreground text-sm">
            Add your first asset to start tracking depreciation
          </p>
          <button
            type="button"
            onClick={handleAddAsset}
            className="mt-4 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90"
          >
            <PlusIcon className="size-4" />
            Add Asset
          </button>
        </div>
      )}

      {/* Asset table */}
      {!loading && assets.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-border border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Name
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Acquisition Date
                </th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                  Cost
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Method
                </th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                  Monthly Dep.
                </th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                  Total Depreciated
                </th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                  Book Value
                </th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset) => (
                <tr
                  key={asset.id}
                  className="border-border border-b transition-colors last:border-b-0 hover:bg-muted/30"
                >
                  <td className="px-4 py-3">
                    <Link
                      to="/assets/$assetId"
                      params={{ assetId: asset.id }}
                      className="font-medium text-primary hover:underline"
                    >
                      {asset.name}
                    </Link>
                    {asset.disposedAt && (
                      <span className="ml-2 rounded bg-muted px-1.5 py-0.5 text-muted-foreground text-xs">
                        Disposed
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {asset.acquisitionDate}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {formatCurrency(asset.acquisitionCost)}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {asset.depreciationMethod === "straight_line"
                      ? "Straight Line"
                      : `MACRS ${asset.macrsClass}yr`}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {formatCurrency(asset.monthlyDepreciation)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {formatCurrency(asset.totalDepreciated)}
                  </td>
                  <td className="px-4 py-3 text-right font-medium">
                    {formatCurrency(asset.bookValue)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to="/assets/$assetId"
                        params={{ assetId: asset.id }}
                        className="rounded-md border border-border px-2.5 py-1 text-xs transition-colors hover:bg-accent"
                      >
                        {asset.disposedAt ? "View" : "Dispose"}
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(asset.id)}
                        className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                        aria-label={`Delete ${asset.name}`}
                      >
                        <Trash2Icon className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add asset form dialog */}
      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
            onClick={handleCancel}
            aria-label="Close dialog"
          />

          {/* Dialog */}
          <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg border border-border bg-card p-6 shadow-lg">
            <h2 className="mb-4 font-semibold text-lg">Add Fixed Asset</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="asset-name" className="font-medium text-sm">
                  Name
                </label>
                <input
                  id="asset-name"
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Office Equipment"
                  className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="asset-desc" className="font-medium text-sm">
                  Description
                </label>
                <input
                  id="asset-desc"
                  type="text"
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Optional description"
                  className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              {/* Acquisition Date + Cost row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="asset-acq-date"
                    className="font-medium text-sm"
                  >
                    Acquisition Date
                  </label>
                  <input
                    id="asset-acq-date"
                    type="date"
                    required
                    value={formAcquisitionDate}
                    onChange={(e) => setFormAcquisitionDate(e.target.value)}
                    className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="asset-acq-cost"
                    className="font-medium text-sm"
                  >
                    Acquisition Cost
                  </label>
                  <input
                    id="asset-acq-cost"
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={formAcquisitionCost}
                    onChange={(e) => setFormAcquisitionCost(e.target.value)}
                    placeholder="0.00"
                    className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>

              {/* Salvage Value + Useful Life row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="asset-salvage"
                    className="font-medium text-sm"
                  >
                    Salvage Value
                  </label>
                  <input
                    id="asset-salvage"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formSalvageValue}
                    onChange={(e) => setFormSalvageValue(e.target.value)}
                    className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="asset-useful-life"
                    className="font-medium text-sm"
                  >
                    Useful Life (months)
                  </label>
                  <input
                    id="asset-useful-life"
                    type="number"
                    required
                    min="1"
                    value={formUsefulLifeMonths}
                    onChange={(e) => setFormUsefulLifeMonths(e.target.value)}
                    placeholder="e.g. 60"
                    className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>

              {/* Depreciation Method */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="asset-method" className="font-medium text-sm">
                  Depreciation Method
                </label>
                <select
                  id="asset-method"
                  value={formMethod}
                  onChange={(e) =>
                    setFormMethod(e.target.value as "straight_line" | "macrs")
                  }
                  className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  {DEPRECIATION_METHODS.map((m) => (
                    <option key={m.value} value={m.value}>
                      {m.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* MACRS Class (conditional) */}
              {formMethod === "macrs" && (
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="asset-macrs-class"
                    className="font-medium text-sm"
                  >
                    MACRS Class
                  </label>
                  <select
                    id="asset-macrs-class"
                    required
                    value={formMacrsClass}
                    onChange={(e) => setFormMacrsClass(e.target.value)}
                    className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="">Select class</option>
                    {MACRS_CLASSES.map((c) => (
                      <option key={c} value={c}>
                        {c}-year
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Account selections */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="asset-acct" className="font-medium text-sm">
                  Asset Account
                </label>
                <select
                  id="asset-acct"
                  required
                  value={formAssetAccountId}
                  onChange={(e) => setFormAssetAccountId(e.target.value)}
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
                  htmlFor="asset-expense-acct"
                  className="font-medium text-sm"
                >
                  Depreciation Expense Account
                </label>
                <select
                  id="asset-expense-acct"
                  required
                  value={formExpenseAccountId}
                  onChange={(e) => setFormExpenseAccountId(e.target.value)}
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
                  htmlFor="asset-accum-acct"
                  className="font-medium text-sm"
                >
                  Accumulated Depreciation Account
                </label>
                <select
                  id="asset-accum-acct"
                  required
                  value={formAccumAccountId}
                  onChange={(e) => setFormAccumAccountId(e.target.value)}
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

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="rounded-md border border-border px-4 py-2 text-sm transition-colors hover:bg-accent"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90"
                >
                  Create Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
