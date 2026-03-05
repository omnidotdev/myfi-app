import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { API_URL } from "@/lib/config/env.config";
import { formatCurrency, formatSignedCurrency } from "@/lib/format/currency";

type HarvestableAsset = {
  cryptoAssetId: string;
  symbol: string;
  name: string;
  totalQuantity: string;
  costBasis: string;
  estimatedCurrentValue: string;
  unrealizedLoss: string;
  potentialTaxSavings: string;
};

type TaxLossHarvestingData = {
  assets: HarvestableAsset[];
  totalUnrealizedLoss: string;
  totalPotentialSavings: string;
  estimatedTaxRate: number;
};

export const Route = createFileRoute("/_app/reports/tax-loss-harvesting")({
  component: TaxLossHarvestingPage,
});

function TaxLossHarvestingPage() {
  const [data, setData] = useState<TaxLossHarvestingData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/api/tax/loss-harvesting`);

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
      <div>
        <h1 className="font-bold text-2xl">Tax-Loss Harvesting</h1>
        <p className="text-muted-foreground text-sm">
          Identify crypto positions with unrealized losses to offset capital
          gains
        </p>
      </div>

      {/* Generate button */}
      <div className="flex flex-wrap items-end gap-4 rounded-lg border border-border bg-card p-4">
        <button
          type="button"
          onClick={handleGenerate}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90"
        >
          Scan Positions
        </button>
      </div>

      {loading && (
        <div className="rounded-lg border border-border bg-card p-8 text-center">
          <p className="text-muted-foreground">Scanning positions...</p>
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive text-sm">
          {error}
        </div>
      )}

      {!loading && !error && data && (
        <>
          {data.assets.length === 0 ? (
            <div className="rounded-lg border border-border bg-card p-8 text-center">
              <p className="text-muted-foreground">
                No positions with unrealized losses found
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-border bg-card">
              <div className="border-border border-b bg-muted/50 px-4 py-3">
                <h2 className="font-semibold text-sm">Harvestable Positions</h2>
                <p className="text-muted-foreground text-xs">
                  Tax savings estimated at{" "}
                  {(data.estimatedTaxRate * 100).toFixed(0)}% marginal rate
                </p>
              </div>

              <table className="w-full text-sm">
                <thead>
                  <tr className="border-border border-b text-left text-muted-foreground">
                    <th className="px-4 py-2 font-medium">Asset</th>
                    <th className="px-4 py-2 text-right font-medium">
                      Quantity
                    </th>
                    <th className="px-4 py-2 text-right font-medium">
                      Current Value
                    </th>
                    <th className="px-4 py-2 text-right font-medium">
                      Cost Basis
                    </th>
                    <th className="px-4 py-2 text-right font-medium">
                      Unrealized Loss
                    </th>
                    <th className="px-4 py-2 text-right font-medium">
                      Tax Savings
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {data.assets.map((asset) => (
                    <tr
                      key={asset.cryptoAssetId}
                      className="border-border border-b transition-colors hover:bg-accent/30"
                    >
                      <td className="px-4 py-2">
                        <div className="flex flex-col">
                          <span className="font-semibold">{asset.symbol}</span>
                          <span className="text-muted-foreground text-xs">
                            {asset.name}
                          </span>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-right font-mono">
                        {Number.parseFloat(asset.totalQuantity).toFixed(6)}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-right font-mono">
                        {formatCurrency(asset.estimatedCurrentValue)}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-right font-mono">
                        {formatCurrency(asset.costBasis)}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-right font-mono text-red-600 dark:text-red-400">
                        {formatSignedCurrency(asset.unrealizedLoss)}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-right font-mono text-green-600 dark:text-green-400">
                        {formatCurrency(asset.potentialTaxSavings)}
                      </td>
                    </tr>
                  ))}
                </tbody>

                <tfoot>
                  <tr className="bg-muted/20 font-semibold">
                    <td className="px-4 py-2" colSpan={4}>
                      Total
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-right font-mono text-red-600 dark:text-red-400">
                      {formatSignedCurrency(data.totalUnrealizedLoss)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-right font-mono text-green-600 dark:text-green-400">
                      {formatCurrency(data.totalPotentialSavings)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </>
      )}

      {!loading && !error && !data && (
        <div className="rounded-lg border border-border bg-card p-8 text-center">
          <p className="text-muted-foreground">
            Click Scan Positions to identify tax-loss harvesting opportunities
          </p>
        </div>
      )}
    </div>
  );
}
