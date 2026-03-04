import { CheckIcon, PencilIcon, XIcon } from "lucide-react";

import type { ReconciliationItem } from "@/features/reconciliation/types/reconciliation";

type ReconciliationTableProps = {
  items: ReconciliationItem[];
  onApprove: (itemId: string) => void;
  onEdit: (itemId: string) => void;
  onReject: (itemId: string) => void;
};

const SOURCE_BADGE_CLASSES: Record<string, string> = {
  plaid_import:
    "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300",
  mantle_sync:
    "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300",
  crypto_sync:
    "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300",
};

const DEFAULT_BADGE_CLASS =
  "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300";

/** Format a snake_case source label for display */
function formatSource(source: string): string {
  return source
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/** Format an amount string as currency */
function formatAmount(amount: string): string {
  const value = Number.parseFloat(amount);

  if (Number.isNaN(value)) return "$0.00";

  return `$${Math.abs(value).toFixed(2)}`;
}

/**
 * Table displaying pending reconciliation items with approve/edit/reject actions
 */
function ReconciliationTable({
  items,
  onApprove,
  onEdit,
  onReject,
}: ReconciliationTableProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-8 text-center">
        <p className="text-muted-foreground">
          All caught up! No transactions pending review.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-card">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-border border-b text-left text-muted-foreground">
            <th className="px-3 py-3 font-medium">Date</th>
            <th className="px-3 py-3 font-medium">Description</th>
            <th className="px-3 py-3 font-medium">Source</th>
            <th className="px-3 py-3 text-right font-medium">Amount</th>
            <th className="px-3 py-3 font-medium">Suggested Accounts</th>
            <th className="w-28 px-3 py-3 text-center font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <ReconciliationRow
              key={item.rowId}
              item={item}
              onApprove={onApprove}
              onEdit={onEdit}
              onReject={onReject}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

type ReconciliationRowProps = {
  item: ReconciliationItem;
  onApprove: (itemId: string) => void;
  onEdit: (itemId: string) => void;
  onReject: (itemId: string) => void;
};

function ReconciliationRow({
  item,
  onApprove,
  onEdit,
  onReject,
}: ReconciliationRowProps) {
  const badgeClass = SOURCE_BADGE_CLASSES[item.source] ?? DEFAULT_BADGE_CLASS;
  const isPending = item.status === "pending";

  return (
    <tr
      className={`border-border border-b transition-colors hover:bg-accent/50 ${
        isPending ? "border-l-2 border-l-amber-400 dark:border-l-amber-500" : ""
      }`}
    >
      {/* Date */}
      <td className="whitespace-nowrap px-3 py-3 font-mono">{item.date}</td>

      {/* Description */}
      <td className="max-w-xs truncate px-3 py-3">
        {item.memo || (
          <span className="text-muted-foreground">No description</span>
        )}
      </td>

      {/* Source badge */}
      <td className="px-3 py-3">
        <span
          className={`inline-block rounded-full px-2 py-0.5 text-xs ${badgeClass}`}
        >
          {formatSource(item.source)}
        </span>
      </td>

      {/* Amount */}
      <td className="whitespace-nowrap px-3 py-3 text-right font-mono">
        {formatAmount(item.amount)}
      </td>

      {/* Suggested accounts */}
      <td className="px-3 py-3">
        <div className="flex flex-col gap-0.5 text-xs text-muted-foreground">
          {item.suggestedDebitAccount && (
            <span>
              <span className="font-medium text-foreground">DR</span>{" "}
              {item.suggestedDebitAccount}
            </span>
          )}
          {item.suggestedCreditAccount && (
            <span>
              <span className="font-medium text-foreground">CR</span>{" "}
              {item.suggestedCreditAccount}
            </span>
          )}
          {!item.suggestedDebitAccount && !item.suggestedCreditAccount && (
            <span className="italic">No suggestions</span>
          )}
        </div>
      </td>

      {/* Actions */}
      <td className="px-3 py-3">
        <div className="flex items-center justify-center gap-1">
          <button
            type="button"
            onClick={() => onApprove(item.rowId)}
            aria-label={`Approve ${item.memo ?? "transaction"}`}
            className="rounded p-1.5 text-green-600 transition-colors hover:bg-green-100 dark:text-green-400 dark:hover:bg-green-900/20"
          >
            <CheckIcon className="size-4" />
          </button>

          <button
            type="button"
            onClick={() => onEdit(item.rowId)}
            aria-label={`Edit ${item.memo ?? "transaction"}`}
            className="rounded p-1.5 text-blue-600 transition-colors hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-900/20"
          >
            <PencilIcon className="size-4" />
          </button>

          <button
            type="button"
            onClick={() => onReject(item.rowId)}
            aria-label={`Reject ${item.memo ?? "transaction"}`}
            className="rounded p-1.5 text-red-600 transition-colors hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900/20"
          >
            <XIcon className="size-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default ReconciliationTable;
