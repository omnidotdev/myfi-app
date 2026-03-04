import type { CryptoLot } from "@/features/crypto/types/crypto";

type LotTableProps = {
  lots: CryptoLot[];
  symbol: string;
};

/** Derive lot status from remaining quantity and disposed date */
function getLotStatus(lot: CryptoLot): "open" | "closed" | "partial" {
  const remaining = Number.parseFloat(lot.remainingQuantity);
  const total = Number.parseFloat(lot.quantity);

  if (remaining <= 0 || lot.disposedAt) return "closed";
  if (remaining < total) return "partial";
  return "open";
}

const STATUS_CLASSES: Record<string, string> = {
  open: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300",
  closed: "bg-muted text-muted-foreground",
  partial:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300",
};

/** Format a numeric string for display */
function formatAmount(value: string, decimals = 2): string {
  const num = Number.parseFloat(value);
  if (Number.isNaN(num)) return "0.00";

  return num.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/** Format currency value */
function formatCurrency(value: string): string {
  const num = Number.parseFloat(value);
  if (Number.isNaN(num)) return "$0.00";

  const prefix = num < 0 ? "-" : "";
  return `${prefix}$${Math.abs(num).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/** Format a date string for display */
function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Table displaying individual lots for a crypto asset
 */
function LotTable({ lots, symbol }: LotTableProps) {
  if (lots.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-6 text-center">
        <p className="text-muted-foreground text-sm">
          No lots recorded for {symbol}
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-card">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-border border-b text-muted-foreground text-xs">
            <th className="px-4 py-2.5 text-left font-medium">Acquired</th>
            <th className="px-4 py-2.5 text-right font-medium">Quantity</th>
            <th className="px-4 py-2.5 text-right font-medium">Cost/Unit</th>
            <th className="px-4 py-2.5 text-right font-medium">Cost Basis</th>
            <th className="px-4 py-2.5 text-right font-medium">Remaining</th>
            <th className="px-4 py-2.5 text-center font-medium">Status</th>
            <th className="px-4 py-2.5 text-right font-medium">
              Realized G/L
            </th>
          </tr>
        </thead>
        <tbody>
          {lots.map((lot) => {
            const status = getLotStatus(lot);
            const gainLoss = lot.realizedGainLoss
              ? Number.parseFloat(lot.realizedGainLoss)
              : null;

            return (
              <tr
                key={lot.rowId}
                className="border-border border-b last:border-b-0 transition-colors hover:bg-accent/50"
              >
                <td className="px-4 py-2.5">{formatDate(lot.acquiredAt)}</td>
                <td className="px-4 py-2.5 text-right font-mono">
                  {formatAmount(lot.quantity, 8)}
                </td>
                <td className="px-4 py-2.5 text-right font-mono">
                  {formatCurrency(lot.costPerUnit)}
                </td>
                <td className="px-4 py-2.5 text-right font-mono">
                  {formatCurrency(lot.costBasis)}
                </td>
                <td className="px-4 py-2.5 text-right font-mono">
                  {formatAmount(lot.remainingQuantity, 8)}
                </td>
                <td className="px-4 py-2.5 text-center">
                  <span
                    className={`inline-block rounded-full px-2 py-0.5 text-xs capitalize ${STATUS_CLASSES[status]}`}
                  >
                    {status}
                  </span>
                </td>
                <td
                  className={`px-4 py-2.5 text-right font-mono ${
                    gainLoss !== null && gainLoss > 0
                      ? "text-green-600 dark:text-green-400"
                      : gainLoss !== null && gainLoss < 0
                        ? "text-red-600 dark:text-red-400"
                        : ""
                  }`}
                >
                  {lot.realizedGainLoss
                    ? formatCurrency(lot.realizedGainLoss)
                    : "--"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default LotTable;
