import { CheckIcon, PencilIcon, XIcon } from "lucide-react";
import { useState } from "react";

import type {
  CategorizationSource,
  ReconciliationItem,
} from "@/features/reconciliation/types/reconciliation";
import type { TagGroup } from "@/features/tags/types/tag";

type Account = {
  rowId: string;
  name: string;
  code: string;
};

type ReconciliationTableProps = {
  items: ReconciliationItem[];
  accounts: Account[];
  tagGroups?: TagGroup[];
  onApprove: (itemId: string) => void;
  onEdit: (itemId: string) => void;
  onReject: (itemId: string) => void;
  onCorrect?: (
    id: string,
    status: string,
    debitAccountId: string,
    creditAccountId: string,
    tagIds?: string[],
  ) => void;
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

const CATEGORIZATION_BADGE_CLASSES: Record<string, string> = {
  rule: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300",
  llm: "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300",
  manual: "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300",
  uncategorized: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300",
};

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

/** Get confidence display color class */
function getConfidenceClass(confidence: string | null): string {
  if (!confidence) return "text-gray-400 dark:text-gray-500";

  const value = Number.parseFloat(confidence);

  if (Number.isNaN(value)) return "text-gray-400 dark:text-gray-500";
  if (value > 0.9) return "text-green-600 dark:text-green-400";
  if (value > 0.7) return "text-yellow-600 dark:text-yellow-400";

  return "text-red-600 dark:text-red-400";
}

/** Format confidence as a percentage string */
function formatConfidence(confidence: string | null): string {
  if (!confidence) return "N/A";

  const value = Number.parseFloat(confidence);

  if (Number.isNaN(value)) return "N/A";

  return `${Math.round(value * 100)}%`;
}

/** Format categorization source for display */
function formatCategorizationSource(
  source: CategorizationSource | null,
): string {
  if (!source) return "Unknown";

  return source.charAt(0).toUpperCase() + source.slice(1);
}

/**
 * Table displaying pending reconciliation items with approve/edit/reject actions
 */
function ReconciliationTable({
  items,
  accounts,
  tagGroups = [],
  onApprove,
  onEdit,
  onReject,
  onCorrect,
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
            <th className="px-3 py-3 font-medium">Categorization</th>
            <th className="px-3 py-3 text-right font-medium">Amount</th>
            <th className="px-3 py-3 font-medium">Accounts</th>
            <th className="w-28 px-3 py-3 text-center font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <ReconciliationRow
              key={item.rowId}
              item={item}
              accounts={accounts}
              tagGroups={tagGroups}
              onApprove={onApprove}
              onEdit={onEdit}
              onReject={onReject}
              onCorrect={onCorrect}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

type ReconciliationRowProps = {
  item: ReconciliationItem;
  accounts: Account[];
  tagGroups: TagGroup[];
  onApprove: (itemId: string) => void;
  onEdit: (itemId: string) => void;
  onReject: (itemId: string) => void;
  onCorrect?: (
    id: string,
    status: string,
    debitAccountId: string,
    creditAccountId: string,
    tagIds?: string[],
  ) => void;
};

function ReconciliationRow({
  item,
  accounts,
  tagGroups,
  onApprove,
  onEdit,
  onReject,
  onCorrect,
}: ReconciliationRowProps) {
  const badgeClass = SOURCE_BADGE_CLASSES[item.source] ?? DEFAULT_BADGE_CLASS;
  const isPending = item.status === "pending_review";

  const [debitAccountId, setDebitAccountId] = useState(
    item.suggestedDebitAccountId ?? "",
  );
  const [creditAccountId, setCreditAccountId] = useState(
    item.suggestedCreditAccountId ?? "",
  );
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);

  const categorizationBadgeClass = item.categorizationSource
    ? (CATEGORIZATION_BADGE_CLASSES[item.categorizationSource] ??
      DEFAULT_BADGE_CLASS)
    : DEFAULT_BADGE_CLASS;

  const hasAccountCorrections =
    debitAccountId !== (item.suggestedDebitAccountId ?? "") ||
    creditAccountId !== (item.suggestedCreditAccountId ?? "");

  const hasTagSelections = selectedTagIds.length > 0;

  const handleApproveOrCorrect = () => {
    if ((hasAccountCorrections || hasTagSelections) && onCorrect) {
      onCorrect(
        item.rowId,
        hasAccountCorrections ? "adjusted" : "approved",
        debitAccountId,
        creditAccountId,
        hasTagSelections ? selectedTagIds : undefined,
      );
    } else {
      onApprove(item.rowId);
    }
  };

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

      {/* Categorization source and confidence */}
      <td className="px-3 py-3">
        <div className="flex flex-col gap-1">
          <span
            className={`inline-block w-fit rounded-full px-2 py-0.5 text-xs ${categorizationBadgeClass}`}
          >
            {formatCategorizationSource(item.categorizationSource)}
          </span>
          <span
            className={`font-medium text-xs ${getConfidenceClass(item.confidence)}`}
          >
            {formatConfidence(item.confidence)}
          </span>
        </div>
      </td>

      {/* Amount */}
      <td className="whitespace-nowrap px-3 py-3 text-right font-mono">
        {formatAmount(item.amount)}
      </td>

      {/* Accounts (static display or correction dropdowns) */}
      <td className="px-3 py-3">
        {isPending && accounts.length > 0 ? (
          <div className="flex flex-col gap-1.5">
            <label className="flex items-center gap-1.5 text-xs">
              <span className="font-medium text-foreground">DR</span>
              <select
                value={debitAccountId}
                onChange={(e) => setDebitAccountId(e.target.value)}
                className="rounded border border-border bg-background px-1.5 py-0.5 text-xs"
              >
                <option value="">Select account</option>
                {accounts.map((account) => (
                  <option key={account.rowId} value={account.rowId}>
                    {account.code} - {account.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex items-center gap-1.5 text-xs">
              <span className="font-medium text-foreground">CR</span>
              <select
                value={creditAccountId}
                onChange={(e) => setCreditAccountId(e.target.value)}
                className="rounded border border-border bg-background px-1.5 py-0.5 text-xs"
              >
                <option value="">Select account</option>
                {accounts.map((account) => (
                  <option key={account.rowId} value={account.rowId}>
                    {account.code} - {account.name}
                  </option>
                ))}
              </select>
            </label>
            {tagGroups.length > 0 && (
              <label className="flex items-center gap-1.5 text-xs">
                <span className="font-medium text-foreground">Tags</span>
                <select
                  multiple
                  value={selectedTagIds}
                  onChange={(e) =>
                    setSelectedTagIds(
                      Array.from(e.target.selectedOptions, (o) => o.value),
                    )
                  }
                  className="min-h-[2rem] rounded border border-border bg-background px-1.5 py-0.5 text-xs"
                >
                  {tagGroups.map((group) => {
                    const active = group.tags.filter((t) => t.isActive);

                    if (active.length === 0) return null;

                    return (
                      <optgroup key={group.id} label={group.name}>
                        {active.map((tag) => (
                          <option key={tag.id} value={tag.id}>
                            {tag.code ? `${tag.code} - ` : ""}
                            {tag.name}
                          </option>
                        ))}
                      </optgroup>
                    );
                  })}
                </select>
              </label>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-0.5 text-muted-foreground text-xs">
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
        )}
      </td>

      {/* Actions */}
      <td className="px-3 py-3">
        <div className="flex items-center justify-center gap-1">
          <button
            type="button"
            onClick={handleApproveOrCorrect}
            aria-label={`${hasAccountCorrections ? "Adjust" : "Approve"} ${item.memo ?? "transaction"}`}
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
