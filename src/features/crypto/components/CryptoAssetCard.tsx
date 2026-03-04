import { ClipboardCopyIcon, EyeIcon, RefreshCwIcon } from "lucide-react";
import { useCallback, useState } from "react";

import type {
  CostBasisMethod,
  CryptoAsset,
  CryptoNetwork,
} from "@/features/crypto/types/crypto";

type CryptoAssetCardProps = {
  asset: CryptoAsset;
  onViewLots: (asset: CryptoAsset) => void;
  onRefresh: (asset: CryptoAsset) => void;
};

const NETWORK_BADGE_CLASSES: Record<CryptoNetwork, string> = {
  ethereum: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300",
  bitcoin:
    "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300",
  solana:
    "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300",
  polygon:
    "bg-violet-100 text-violet-800 dark:bg-violet-900/20 dark:text-violet-300",
  arbitrum: "bg-sky-100 text-sky-800 dark:bg-sky-900/20 dark:text-sky-300",
  base: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300",
  avalanche: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300",
};

const METHOD_LABELS: Record<CostBasisMethod, string> = {
  fifo: "FIFO",
  lifo: "LIFO",
  hifo: "HIFO",
  acb: "ACB",
};

/** Truncate a wallet address for display */
function truncateAddress(address: string): string {
  if (address.length <= 12) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

/** Format a timestamp for display */
function formatSyncTime(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

/**
 * Card displaying a single crypto asset with balance, network, and actions
 */
function CryptoAssetCard({
  asset,
  onViewLots,
  onRefresh,
}: CryptoAssetCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = useCallback(async () => {
    if (!asset.walletAddress) return;
    try {
      await navigator.clipboard.writeText(asset.walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API may not be available in all contexts
      setCopied(false);
    }
  }, [asset.walletAddress]);

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border bg-card p-4">
      {/* Header: name, symbol, badges */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-sm">{asset.name}</h3>
          <p className="font-mono text-muted-foreground text-xs">
            {asset.symbol}
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          {asset.network && (
            <span
              className={`rounded-full px-2 py-0.5 text-xs capitalize ${NETWORK_BADGE_CLASSES[asset.network]}`}
            >
              {asset.network}
            </span>
          )}
          <span className="rounded-full bg-muted px-2 py-0.5 text-muted-foreground text-xs">
            {METHOD_LABELS[asset.costBasisMethod]}
          </span>
        </div>
      </div>

      {/* Balance */}
      <div>
        <p className="text-muted-foreground text-xs">Balance</p>
        <p className="font-mono font-semibold text-lg">
          {Number.parseFloat(asset.balance).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 8,
          })}
        </p>
      </div>

      {/* Wallet address */}
      {asset.walletAddress && (
        <div className="flex items-center gap-2">
          <span className="font-mono text-muted-foreground text-xs">
            {truncateAddress(asset.walletAddress)}
          </span>
          <button
            type="button"
            onClick={handleCopyAddress}
            className="rounded p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            aria-label="Copy wallet address"
          >
            <ClipboardCopyIcon className="size-3" />
          </button>
          {copied && (
            <span className="text-green-600 text-xs dark:text-green-400">
              Copied
            </span>
          )}
        </div>
      )}

      {/* Last synced */}
      {asset.lastSyncedAt && (
        <p className="text-muted-foreground text-xs">
          Synced {formatSyncTime(asset.lastSyncedAt)}
        </p>
      )}

      {/* Actions */}
      <div className="mt-auto flex items-center gap-2 border-border border-t pt-3">
        <button
          type="button"
          onClick={() => onRefresh(asset)}
          className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm transition-colors hover:bg-accent"
        >
          <RefreshCwIcon className="size-3.5" />
          Refresh
        </button>
        <button
          type="button"
          onClick={() => onViewLots(asset)}
          className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm transition-colors hover:bg-accent"
        >
          <EyeIcon className="size-3.5" />
          View Lots
        </button>
      </div>
    </div>
  );
}

export default CryptoAssetCard;
