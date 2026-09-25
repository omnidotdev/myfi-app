import { createFileRoute } from "@tanstack/react-router";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import EmptyState from "@/components/EmptyState";
import MantleManagedBanner from "@/components/MantleManagedBanner";
import BookPicker from "@/features/books/components/BookPicker";
import type { InventoryItem } from "@/features/inventory/types/inventory";
import type { InvoiceAccount } from "@/features/invoicing/types/invoicing";
import { apiFetch } from "@/lib/api/apiFetch";
import formatCurrency from "@/lib/format/currency";
import useActiveBook from "@/lib/hooks/useActiveBook";

export const Route = createFileRoute("/_app/@{$workspaceSlug}/~/items/")({
  component: ItemsPage,
});

const today = () => new Date().toISOString().slice(0, 10);

const inputClass =
  "rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50";

function ItemsPage() {
  const {
    activeBook,
    activeBookId,
    books,
    isLoading: booksLoading,
    setActiveBookId,
  } = useActiveBook();
  const mantleManaged = activeBook?.invoiceSource === "mantle";

  const [items, setItems] = useState<InventoryItem[]>([]);
  const [accounts, setAccounts] = useState<InvoiceAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);

  const [createOpen, setCreateOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    sku: "",
    salePrice: "0",
    assetAccountId: "",
    cogsAccountId: "",
    incomeAccountId: "",
  });

  const [receiving, setReceiving] = useState<InventoryItem | null>(null);
  const [selling, setSelling] = useState<InventoryItem | null>(null);
  const [movement, setMovement] = useState({
    quantity: "1",
    unitCost: "0",
    sourceAccountId: "",
    date: today(),
  });

  const assetAccounts = accounts.filter((a) => a.type === "asset");
  const expenseAccounts = accounts.filter((a) => a.type === "expense");
  const incomeAccounts = accounts.filter((a) => a.type === "revenue");
  const fundingAccounts = accounts.filter(
    (a) => a.type === "asset" || a.type === "liability",
  );

  const fetchData = useCallback(async () => {
    if (!activeBookId) return;
    setIsLoading(true);
    try {
      const [itemRes, acctRes] = await Promise.all([
        apiFetch(`/api/inventory-items?bookId=${activeBookId}`),
        apiFetch(`/api/accounts?bookId=${activeBookId}`),
      ]);
      const [itemData, acctData] = await Promise.all([
        itemRes.json(),
        acctRes.json(),
      ]);
      setItems(itemData.items ?? []);
      setAccounts(acctData.accounts ?? []);
    } catch {
      toast.error("Could not load items");
    } finally {
      setIsLoading(false);
    }
  }, [activeBookId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCreate = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!activeBookId) return;
      setSaving(true);
      try {
        const res = await apiFetch("/api/inventory-items", {
          method: "POST",
          body: JSON.stringify({
            bookId: activeBookId,
            name: form.name,
            sku: form.sku || undefined,
            salePrice: Number.parseFloat(form.salePrice) || 0,
            assetAccountId: form.assetAccountId,
            cogsAccountId: form.cogsAccountId,
            incomeAccountId: form.incomeAccountId,
          }),
        });
        if (!res.ok) throw new Error("Create failed");
        toast.success("Item created");
        setCreateOpen(false);
        setForm({
          name: "",
          sku: "",
          salePrice: "0",
          assetAccountId: "",
          cogsAccountId: "",
          incomeAccountId: "",
        });
        await fetchData();
      } catch {
        toast.error("Could not create the item");
      } finally {
        setSaving(false);
      }
    },
    [activeBookId, form, fetchData],
  );

  const submitMovement = useCallback(
    async (item: InventoryItem, kind: "receive" | "sell") => {
      if (!activeBookId) return;
      setBusyId(item.id);
      try {
        const body: Record<string, unknown> = {
          bookId: activeBookId,
          quantity: Number.parseFloat(movement.quantity) || 0,
          date: movement.date,
        };
        if (kind === "receive") {
          body.unitCost = Number.parseFloat(movement.unitCost) || 0;
          body.sourceAccountId = movement.sourceAccountId;
        }
        const res = await apiFetch(`/api/inventory-items/${item.id}/${kind}`, {
          method: "POST",
          body: JSON.stringify(body),
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error ?? "Action failed");
        }
        toast.success(kind === "receive" ? "Stock received" : "Sale recorded");
        setReceiving(null);
        setSelling(null);
        await fetchData();
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Action failed");
      } finally {
        setBusyId(null);
      }
    },
    [activeBookId, movement, fetchData],
  );

  const openReceive = (item: InventoryItem) => {
    setMovement({
      quantity: "1",
      unitCost: item.averageCost,
      sourceAccountId: "",
      date: today(),
    });
    setReceiving(item);
  };
  const openSell = (item: InventoryItem) => {
    setMovement({
      quantity: "1",
      unitCost: "0",
      sourceAccountId: "",
      date: today(),
    });
    setSelling(item);
  };

  const loading = booksLoading || isLoading;

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">Inventory</h1>
          <p className="text-muted-foreground text-sm">
            Products you stock, with quantity and cost tracking
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
            onClick={() => setCreateOpen(true)}
            disabled={!activeBookId || mantleManaged}
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90 disabled:opacity-50"
          >
            <PlusIcon className="size-4" />
            New Item
          </button>
        </div>
      </div>

      {mantleManaged && <MantleManagedBanner noun="inventory items" />}

      {loading && (
        <div className="flex items-center justify-center rounded-lg border border-border bg-card p-8">
          <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
        </div>
      )}

      {!loading && items.length === 0 && (
        <EmptyState
          title="No inventory items yet"
          description="Add an item to track its stock and cost."
        />
      )}

      {!loading && items.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="border-border border-b text-left text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Item</th>
                <th className="px-4 py-3 font-medium">SKU</th>
                <th className="px-4 py-3 text-right font-medium">On Hand</th>
                <th className="px-4 py-3 text-right font-medium">Avg Cost</th>
                <th className="px-4 py-3 text-right font-medium">Price</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr
                  key={item.id}
                  className="border-border/50 border-b last:border-0"
                >
                  <td className="px-4 py-3 font-medium">{item.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {item.sku ?? "-"}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {Number(item.quantityOnHand).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {formatCurrency(item.averageCost)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {formatCurrency(item.salePrice)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      {busyId === item.id && (
                        <Loader2Icon className="size-4 animate-spin text-muted-foreground" />
                      )}
                      <button
                        type="button"
                        disabled={busyId === item.id}
                        onClick={() => openReceive(item)}
                        className="rounded-md border border-border px-2.5 py-1 text-xs transition-colors hover:bg-accent disabled:opacity-50"
                      >
                        Receive
                      </button>
                      <button
                        type="button"
                        disabled={busyId === item.id}
                        onClick={() => openSell(item)}
                        className="rounded-md border border-border px-2.5 py-1 text-xs transition-colors hover:bg-accent disabled:opacity-50"
                      >
                        Sell
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {createOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4">
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
            onClick={() => setCreateOpen(false)}
            aria-label="Close dialog"
          />
          <div className="relative my-8 w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-lg">
            <h2 className="mb-4 font-semibold text-lg">New Item</h2>
            <form onSubmit={handleCreate} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="it-name" className="font-medium text-sm">
                  Name
                </label>
                <input
                  id="it-name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="it-sku" className="font-medium text-sm">
                    SKU
                  </label>
                  <input
                    id="it-sku"
                    type="text"
                    value={form.sku}
                    onChange={(e) => setForm({ ...form, sku: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="it-price" className="font-medium text-sm">
                    Sale Price
                  </label>
                  <input
                    id="it-price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.salePrice}
                    onChange={(e) =>
                      setForm({ ...form, salePrice: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="it-asset" className="font-medium text-sm">
                  Inventory Asset Account
                </label>
                <select
                  id="it-asset"
                  required
                  value={form.assetAccountId}
                  onChange={(e) =>
                    setForm({ ...form, assetAccountId: e.target.value })
                  }
                  className={inputClass}
                >
                  <option value="" disabled>
                    Select an account
                  </option>
                  {assetAccounts.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.code ? `${a.code} - ` : ""}
                      {a.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="it-cogs" className="font-medium text-sm">
                  COGS Account
                </label>
                <select
                  id="it-cogs"
                  required
                  value={form.cogsAccountId}
                  onChange={(e) =>
                    setForm({ ...form, cogsAccountId: e.target.value })
                  }
                  className={inputClass}
                >
                  <option value="" disabled>
                    Select an account
                  </option>
                  {expenseAccounts.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.code ? `${a.code} - ` : ""}
                      {a.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="it-income" className="font-medium text-sm">
                  Income Account
                </label>
                <select
                  id="it-income"
                  required
                  value={form.incomeAccountId}
                  onChange={(e) =>
                    setForm({ ...form, incomeAccountId: e.target.value })
                  }
                  className={inputClass}
                >
                  <option value="" disabled>
                    Select an account
                  </option>
                  {incomeAccounts.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.code ? `${a.code} - ` : ""}
                      {a.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setCreateOpen(false)}
                  className="rounded-md border border-border px-4 py-2 text-sm transition-colors hover:bg-accent"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 whitespace-nowrap rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90 disabled:opacity-50"
                >
                  {saving && <Loader2Icon className="size-4 animate-spin" />}
                  Create Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {(receiving || selling) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
            onClick={() => {
              setReceiving(null);
              setSelling(null);
            }}
            aria-label="Close dialog"
          />
          <div className="relative w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-lg">
            <h2 className="font-semibold text-lg">
              {receiving ? "Receive Stock" : "Record Sale"}
            </h2>
            <p className="mb-4 text-muted-foreground text-sm">
              {(receiving ?? selling)?.name}
            </p>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="mv-qty" className="font-medium text-sm">
                    Quantity
                  </label>
                  <input
                    id="mv-qty"
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={movement.quantity}
                    onChange={(e) =>
                      setMovement({ ...movement, quantity: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>
                {receiving && (
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="mv-cost" className="font-medium text-sm">
                      Unit Cost
                    </label>
                    <input
                      id="mv-cost"
                      type="number"
                      min="0"
                      step="0.01"
                      value={movement.unitCost}
                      onChange={(e) =>
                        setMovement({ ...movement, unitCost: e.target.value })
                      }
                      className={inputClass}
                    />
                  </div>
                )}
              </div>
              {receiving && (
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="mv-source" className="font-medium text-sm">
                    Paid From
                  </label>
                  <select
                    id="mv-source"
                    required
                    value={movement.sourceAccountId}
                    onChange={(e) =>
                      setMovement({
                        ...movement,
                        sourceAccountId: e.target.value,
                      })
                    }
                    className={inputClass}
                  >
                    <option value="" disabled>
                      Select an account
                    </option>
                    {fundingAccounts.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.code ? `${a.code} - ` : ""}
                        {a.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="mv-date" className="font-medium text-sm">
                  Date
                </label>
                <input
                  id="mv-date"
                  type="date"
                  value={movement.date}
                  onChange={(e) =>
                    setMovement({ ...movement, date: e.target.value })
                  }
                  className={inputClass}
                />
              </div>
              <div className="mt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setReceiving(null);
                    setSelling(null);
                  }}
                  className="rounded-md border border-border px-4 py-2 text-sm transition-colors hover:bg-accent"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={
                    busyId === (receiving ?? selling)?.id ||
                    (receiving != null && !movement.sourceAccountId)
                  }
                  onClick={() => {
                    const item = receiving ?? selling;
                    if (item)
                      submitMovement(item, receiving ? "receive" : "sell");
                  }}
                  className="inline-flex items-center gap-2 whitespace-nowrap rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90 disabled:opacity-50"
                >
                  {busyId === (receiving ?? selling)?.id && (
                    <Loader2Icon className="size-4 animate-spin" />
                  )}
                  {receiving ? "Receive" : "Record Sale"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
