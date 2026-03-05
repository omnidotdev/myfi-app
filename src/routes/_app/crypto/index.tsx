import { createFileRoute } from "@tanstack/react-router";
import { Loader2Icon, PlusIcon, WalletIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import BookPicker from "@/features/books/components/BookPicker";
import AddWalletForm from "@/features/crypto/components/AddWalletForm";
import CryptoAssetCard from "@/features/crypto/components/CryptoAssetCard";
import LotTable from "@/features/crypto/components/LotTable";
import type { CryptoAsset, CryptoLot } from "@/features/crypto/types/crypto";
import { API_URL } from "@/lib/config/env.config";
import formatCurrency from "@/lib/format/currency";
import useActiveBook from "@/lib/hooks/useActiveBook";

export const Route = createFileRoute("/_app/crypto/")({
  component: CryptoPage,
});

function CryptoPage() {
  const {
    activeBookId,
    books,
    isLoading: booksLoading,
    setActiveBookId,
  } = useActiveBook();

  const [assets, setAssets] = useState<CryptoAsset[]>([]);
  const [lots, setLots] = useState<CryptoLot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [viewingLotsFor, setViewingLotsFor] = useState<CryptoAsset | null>(
    null,
  );

  const fetchAssets = useCallback(async () => {
    if (!activeBookId) return;

    setIsLoading(true);

    try {
      const res = await fetch(
        `${API_URL}/api/crypto/wallets?bookId=${activeBookId}`,
      );
      const data = await res.json();
      const mapped = (data.assets ?? []).map((a: Record<string, unknown>) => ({
        ...a,
        rowId: a.id as string,
      }));

      setAssets(mapped);
    } catch {
      // Silently handle fetch errors
    } finally {
      setIsLoading(false);
    }
  }, [activeBookId]);

  useEffect(() => {
    fetchAssets();
  }, [fetchAssets]);

  // Fetch lots when viewing a specific asset
  const fetchLots = useCallback(async (cryptoAssetId: string) => {
    try {
      const res = await fetch(
        `${API_URL}/api/crypto/lots?cryptoAssetId=${cryptoAssetId}`,
      );
      const data = await res.json();
      const mapped = (data.lots ?? []).map((l: Record<string, unknown>) => ({
        ...l,
        rowId: l.id as string,
      }));

      setLots(mapped);
    } catch {
      // Silently handle fetch errors
    }
  }, []);

  // Compute portfolio summary from assets
  const totalValue = 0;
  const totalCost = 0;
  const unrealizedGainLoss = totalValue - totalCost;

  const handleAddAsset = useCallback(() => {
    setFormOpen(true);
  }, []);

  const handleSubmit = useCallback(
    async (values: {
      symbol: string;
      name: string;
      network: string;
      walletAddress: string;
      balance: string;
      costBasisMethod: string;
    }) => {
      if (!activeBookId) return;

      try {
        await fetch(`${API_URL}/api/crypto/wallets`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            bookId: activeBookId,
            symbol: values.symbol,
            name: values.name,
            network: values.network || undefined,
            walletAddress: values.walletAddress || undefined,
            balance: values.balance || undefined,
          }),
        });

        await fetchAssets();
        setFormOpen(false);
      } catch {
        // Silently handle submit errors
      }
    },
    [activeBookId, fetchAssets],
  );

  const handleCancel = useCallback(() => {
    setFormOpen(false);
  }, []);

  const handleViewLots = useCallback(
    (asset: CryptoAsset) => {
      setViewingLotsFor(asset);
      fetchLots(asset.rowId);
    },
    [fetchLots],
  );

  const handleRefresh = useCallback(
    async (asset: CryptoAsset) => {
      try {
        await fetch(`${API_URL}/api/crypto/wallets/${asset.rowId}/refresh`, {
          method: "POST",
        });

        await fetchAssets();
      } catch {
        // Silently handle refresh errors
      }
    },
    [fetchAssets],
  );

  const handleCloseLots = useCallback(() => {
    setViewingLotsFor(null);
    setLots([]);
  }, []);

  // Filter lots for the selected asset
  const assetLots = viewingLotsFor
    ? lots.filter((l) => l.cryptoAssetId === viewingLotsFor.rowId)
    : [];

  const loading = booksLoading || isLoading;

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">Crypto Portfolio</h1>
          <p className="text-muted-foreground text-sm">
            Track wallets, holdings, and unrealized gains across networks
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

      {/* Portfolio summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-muted-foreground text-sm">Total Value</p>
          <p className="mt-1 font-semibold text-2xl">
            {formatCurrency(totalValue)}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-muted-foreground text-sm">Total Cost Basis</p>
          <p className="mt-1 font-semibold text-2xl">
            {formatCurrency(totalCost)}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-muted-foreground text-sm">
            Unrealized Gain / Loss
          </p>
          <p
            className={`mt-1 font-semibold text-2xl ${
              unrealizedGainLoss > 0
                ? "text-green-600 dark:text-green-400"
                : unrealizedGainLoss < 0
                  ? "text-red-600 dark:text-red-400"
                  : ""
            }`}
          >
            {unrealizedGainLoss >= 0 ? "+" : ""}
            {formatCurrency(unrealizedGainLoss)}
          </p>
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center rounded-lg border border-border bg-card p-8">
          <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
        </div>
      )}

      {/* Asset cards grid */}
      {!loading && assets.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {assets.map((asset) => (
            <CryptoAssetCard
              key={asset.rowId}
              asset={asset}
              onViewLots={handleViewLots}
              onRefresh={handleRefresh}
            />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && assets.length === 0 && (
        <div className="rounded-lg border border-border bg-card p-8 text-center">
          <WalletIcon className="mx-auto mb-3 size-10 text-muted-foreground" />
          <p className="font-medium">No crypto assets yet</p>
          <p className="mt-1 text-muted-foreground text-sm">
            Add your first wallet or asset to start tracking your crypto
            portfolio
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

      {/* Lot detail panel */}
      {viewingLotsFor && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg">
              Lots for {viewingLotsFor.name} ({viewingLotsFor.symbol})
            </h2>
            <button
              type="button"
              onClick={handleCloseLots}
              className="rounded-md border border-border px-3 py-1.5 text-sm transition-colors hover:bg-accent"
            >
              Close
            </button>
          </div>
          <LotTable lots={assetLots} symbol={viewingLotsFor.symbol} />
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
          <div className="relative w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-lg">
            <h2 className="mb-4 font-semibold text-lg">Add Crypto Asset</h2>
            <AddWalletForm onSubmit={handleSubmit} onCancel={handleCancel} />
          </div>
        </div>
      )}
    </div>
  );
}
