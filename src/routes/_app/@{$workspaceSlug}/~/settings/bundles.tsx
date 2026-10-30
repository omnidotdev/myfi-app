import { createFileRoute } from "@tanstack/react-router";
import { Loader2Icon, PlusIcon, Trash2Icon, XIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import ConfirmDialog from "@/components/ConfirmDialog";
import EmptyState from "@/components/EmptyState";
import LoadError from "@/components/LoadError";
import BookPicker from "@/features/books/components/BookPicker";
import { apiFetch } from "@/lib/api/apiFetch";
import useActiveBook from "@/lib/hooks/useActiveBook";

export const Route = createFileRoute(
  "/_app/@{$workspaceSlug}/~/settings/bundles",
)({
  component: BundlesPage,
});

const inputClass =
  "rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50";

interface ItemOption {
  id: string;
  name: string;
}

interface BundleComponent {
  inventoryItemId: string;
  quantity: string;
  itemName: string;
}

interface Bundle {
  id: string;
  name: string;
  description: string | null;
  components: BundleComponent[];
}

interface DraftComponent {
  inventoryItemId: string;
  quantity: string;
}

function BundlesPage() {
  const {
    activeBookId,
    books,
    isLoading: booksLoading,
    setActiveBookId,
  } = useActiveBook();

  const [bundles, setBundles] = useState<Bundle[]>([]);
  const [items, setItems] = useState<ItemOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<Bundle | null>(null);

  const [name, setName] = useState("");
  const [draftComponents, setDraftComponents] = useState<DraftComponent[]>([]);
  const [pickItemId, setPickItemId] = useState("");
  const [pickQty, setPickQty] = useState("1");

  const itemName = (id: string) =>
    items.find((it) => it.id === id)?.name ?? "Item";

  const fetchData = useCallback(async () => {
    if (!activeBookId) return;
    setIsLoading(true);
    setLoadError(false);
    try {
      const [bRes, iRes] = await Promise.all([
        apiFetch(`/api/bundles?bookId=${activeBookId}`),
        apiFetch(`/api/inventory-items?bookId=${activeBookId}`),
      ]);
      const [bData, iData] = await Promise.all([bRes.json(), iRes.json()]);
      setBundles(bData.bundles ?? []);
      setItems(iData.items ?? []);
    } catch (err) {
      console.error("Failed to load bundles", err);
      setLoadError(true);
    } finally {
      setIsLoading(false);
    }
  }, [activeBookId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const addComponent = () => {
    if (!pickItemId || !(Number.parseFloat(pickQty) > 0)) return;
    setDraftComponents((prev) => [
      ...prev.filter((c) => c.inventoryItemId !== pickItemId),
      { inventoryItemId: pickItemId, quantity: pickQty },
    ]);
    setPickItemId("");
    setPickQty("1");
  };

  const handleCreate = useCallback(async () => {
    if (!activeBookId || !name.trim() || draftComponents.length === 0) return;
    setSaving(true);
    try {
      const res = await apiFetch("/api/bundles", {
        method: "POST",
        body: JSON.stringify({
          bookId: activeBookId,
          name: name.trim(),
          components: draftComponents.map((c) => ({
            inventoryItemId: c.inventoryItemId,
            quantity: Number.parseFloat(c.quantity) || 1,
          })),
        }),
      });
      if (!res.ok) throw new Error("Create failed");
      toast.success("Bundle created");
      setName("");
      setDraftComponents([]);
      await fetchData();
    } catch {
      toast.error("Could not create the bundle");
    } finally {
      setSaving(false);
    }
  }, [activeBookId, name, draftComponents, fetchData]);

  const handleDelete = useCallback(async () => {
    if (!deleting) return;
    setSaving(true);
    try {
      const res = await apiFetch(`/api/bundles/${deleting.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      toast.success("Bundle removed");
      setDeleting(null);
      await fetchData();
    } catch {
      toast.error("Could not remove the bundle");
    } finally {
      setSaving(false);
    }
  }, [deleting, fetchData]);

  const loading = booksLoading || isLoading;

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">Bundles</h1>
          <p className="text-muted-foreground text-sm">
            Group items that are sold together; adding a bundle to an invoice
            expands into its component lines
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
        <LoadError resource="bundles" onRetry={fetchData} />
      )}

      {!loading && !loadError && (
        <>
          <div className="flex flex-col gap-3 rounded-lg border border-border bg-card p-4">
            <h2 className="font-semibold">New Bundle</h2>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Bundle name"
              className={inputClass}
              disabled={!activeBookId}
            />

            {draftComponents.length > 0 && (
              <ul className="flex flex-col gap-1">
                {draftComponents.map((c) => (
                  <li
                    key={c.inventoryItemId}
                    className="flex items-center justify-between rounded-md bg-muted/40 px-3 py-1.5 text-sm"
                  >
                    <span>
                      {c.quantity} &times; {itemName(c.inventoryItemId)}
                    </span>
                    <button
                      type="button"
                      aria-label={`Remove ${itemName(c.inventoryItemId)}`}
                      onClick={() =>
                        setDraftComponents((prev) =>
                          prev.filter(
                            (x) => x.inventoryItemId !== c.inventoryItemId,
                          ),
                        )
                      }
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <XIcon className="size-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <div className="flex flex-wrap gap-2">
              <select
                value={pickItemId}
                onChange={(e) => setPickItemId(e.target.value)}
                className={`${inputClass} flex-1`}
                aria-label="Add item to bundle"
              >
                <option value="">Add an item...</option>
                {items.map((it) => (
                  <option key={it.id} value={it.id}>
                    {it.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                min="0"
                step="0.25"
                value={pickQty}
                onChange={(e) => setPickQty(e.target.value)}
                className={`${inputClass} w-24`}
                aria-label="Quantity"
              />
              <button
                type="button"
                onClick={addComponent}
                disabled={!pickItemId}
                className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-2 text-sm transition-colors hover:bg-accent disabled:opacity-50"
              >
                <PlusIcon className="size-4" />
                Add
              </button>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleCreate}
                disabled={
                  !activeBookId ||
                  saving ||
                  !name.trim() ||
                  draftComponents.length === 0
                }
                className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90 disabled:opacity-50"
              >
                {saving && <Loader2Icon className="size-4 animate-spin" />}
                Create Bundle
              </button>
            </div>
          </div>

          {bundles.length === 0 ? (
            <EmptyState
              title="No bundles yet"
              description="Create a bundle above to reuse a set of items on invoices."
            />
          ) : (
            <ul className="flex flex-col gap-3">
              {bundles.map((b) => (
                <li
                  key={b.id}
                  className="rounded-lg border border-border bg-card p-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">{b.name}</p>
                      <ul className="mt-1 text-muted-foreground text-sm">
                        {b.components.map((c) => (
                          <li key={c.inventoryItemId}>
                            {Number(c.quantity)} &times; {c.itemName}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button
                      type="button"
                      aria-label={`Remove ${b.name}`}
                      onClick={() => setDeleting(b)}
                      className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-destructive"
                    >
                      <Trash2Icon className="size-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      <ConfirmDialog
        open={deleting !== null}
        title={`Remove "${deleting?.name ?? ""}"?`}
        description="Invoices already created keep their lines. This cannot be undone."
        confirmLabel="Remove"
        destructive
        loading={saving}
        onConfirm={handleDelete}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
}
