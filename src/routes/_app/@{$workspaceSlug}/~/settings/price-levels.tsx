import { createFileRoute } from "@tanstack/react-router";
import { Loader2Icon, Trash2Icon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import ConfirmDialog from "@/components/ConfirmDialog";
import EmptyState from "@/components/EmptyState";
import LoadError from "@/components/LoadError";
import BookPicker from "@/features/books/components/BookPicker";
import { apiFetch } from "@/lib/api/apiFetch";
import useActiveBook from "@/lib/hooks/useActiveBook";

export const Route = createFileRoute(
  "/_app/@{$workspaceSlug}/~/settings/price-levels",
)({
  component: PriceLevelsPage,
});

const inputClass =
  "rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50";

interface PriceLevel {
  id: string;
  name: string;
  adjustmentPercent: string;
  isActive: boolean;
}

function PriceLevelsPage() {
  const {
    activeBookId,
    books,
    isLoading: booksLoading,
    setActiveBookId,
  } = useActiveBook();

  const [priceLevels, setPriceLevels] = useState<PriceLevel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [name, setName] = useState("");
  const [percent, setPercent] = useState("0");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<PriceLevel | null>(null);
  const [busy, setBusy] = useState(false);

  const fetchData = useCallback(async () => {
    if (!activeBookId) return;
    setIsLoading(true);
    setLoadError(false);
    try {
      const res = await apiFetch(`/api/price-levels?bookId=${activeBookId}`);
      const data = await res.json();
      setPriceLevels(data.priceLevels ?? []);
    } catch (err) {
      console.error("Failed to load price levels", err);
      setLoadError(true);
    } finally {
      setIsLoading(false);
    }
  }, [activeBookId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCreate = useCallback(async () => {
    if (!activeBookId || !name.trim()) return;
    setSaving(true);
    try {
      const res = await apiFetch("/api/price-levels", {
        method: "POST",
        body: JSON.stringify({
          bookId: activeBookId,
          name: name.trim(),
          adjustmentPercent: Number.parseFloat(percent) || 0,
        }),
      });
      if (!res.ok) throw new Error("Create failed");
      setName("");
      setPercent("0");
      await fetchData();
    } catch {
      toast.error("Could not add the price level");
    } finally {
      setSaving(false);
    }
  }, [activeBookId, name, percent, fetchData]);

  const handleDelete = useCallback(async () => {
    if (!deleting) return;
    setBusy(true);
    try {
      const res = await apiFetch(`/api/price-levels/${deleting.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      toast.success("Price level removed");
      setDeleting(null);
      await fetchData();
    } catch {
      toast.error("Could not remove it");
    } finally {
      setBusy(false);
    }
  }, [deleting, fetchData]);

  const loading = booksLoading || isLoading;

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">Price Levels</h1>
          <p className="text-muted-foreground text-sm">
            Pricing tiers assigned to customers; selecting an item on their
            invoices adjusts the price by this percentage
          </p>
        </div>
        <BookPicker
          books={books}
          selectedBookId={activeBookId}
          onSelect={setActiveBookId}
        />
      </div>

      {loading && (
        <div className="flex items-center justify-center rounded-lg border border-border bg-card p-8">
          <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
        </div>
      )}

      {!loading && loadError && (
        <LoadError resource="price levels" onRetry={fetchData} />
      )}

      {!loading && !loadError && (
        <>
          <div className="flex flex-wrap items-end gap-3 rounded-lg border border-border bg-card p-4">
            <div className="flex flex-1 flex-col gap-1.5">
              <label htmlFor="pl-name" className="font-medium text-sm">
                Name
              </label>
              <input
                id="pl-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Wholesale"
                className={inputClass}
                disabled={!activeBookId}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="pl-percent" className="font-medium text-sm">
                Adjustment %
              </label>
              <input
                id="pl-percent"
                type="number"
                step="0.01"
                value={percent}
                onChange={(e) => setPercent(e.target.value)}
                className={`${inputClass} w-32`}
                disabled={!activeBookId}
              />
              <span className="text-muted-foreground text-xs">
                Negative for a discount, positive for a markup
              </span>
            </div>
            <button
              type="button"
              onClick={handleCreate}
              disabled={!activeBookId || saving || !name.trim()}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90 disabled:opacity-50"
            >
              {saving && <Loader2Icon className="size-4 animate-spin" />}
              Add
            </button>
          </div>

          {priceLevels.length === 0 ? (
            <EmptyState
              title="No price levels yet"
              description="Add a price level above, then assign it to customers."
            />
          ) : (
            <ul className="divide-y divide-border rounded-lg border border-border bg-card">
              {priceLevels.map((pl) => (
                <li
                  key={pl.id}
                  className="flex items-center justify-between px-4 py-2.5 text-sm"
                >
                  <span>
                    {pl.name}
                    <span className="ml-2 text-muted-foreground">
                      {Number(pl.adjustmentPercent) > 0 ? "+" : ""}
                      {Number(pl.adjustmentPercent)}%
                    </span>
                  </span>
                  <button
                    type="button"
                    aria-label={`Remove ${pl.name}`}
                    onClick={() => setDeleting(pl)}
                    className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-destructive"
                  >
                    <Trash2Icon className="size-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      <ConfirmDialog
        open={deleting !== null}
        title={`Remove "${deleting?.name ?? ""}"?`}
        description="Customers assigned this price level revert to standard pricing. This cannot be undone."
        confirmLabel="Remove"
        destructive
        loading={busy}
        onConfirm={handleDelete}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
}
