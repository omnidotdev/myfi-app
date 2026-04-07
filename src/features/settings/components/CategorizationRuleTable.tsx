import { CheckIcon, PencilIcon, TrashIcon, XIcon } from "lucide-react";
import { useCallback, useState } from "react";

type CategorizationRule = {
  rowId: string;
  name: string;
  matchField: string;
  matchType: string;
  matchValue: string;
  debitAccountId: string;
  creditAccountId: string;
  confidence: string;
  priority: number;
  hitCount: number;
  lastHitAt: string | null;
};

type CategorizationRuleTableProps = {
  rules: CategorizationRule[];
  accounts: { rowId: string; name: string; code: string }[];
  onDelete: (ruleId: string) => void;
  onEdit: (
    ruleId: string,
    updates: { debitAccountId: string; creditAccountId: string },
  ) => void;
};

/** Resolve an account ID to a display name */
function resolveAccount(
  accountId: string,
  accounts: CategorizationRuleTableProps["accounts"],
): string {
  const account = accounts.find((a) => a.rowId === accountId);

  return account ? `${account.code} - ${account.name}` : accountId;
}

/**
 * Table displaying categorization rules for the active book
 */
function CategorizationRuleTable({
  rules,
  accounts,
  onDelete,
  onEdit,
}: CategorizationRuleTableProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDebitAccountId, setEditDebitAccountId] = useState("");
  const [editCreditAccountId, setEditCreditAccountId] = useState("");

  const handleDelete = useCallback(
    (ruleId: string, ruleName: string) => {
      if (!confirm(`Delete rule "${ruleName}"?`)) return;
      onDelete(ruleId);
    },
    [onDelete],
  );

  const startEdit = useCallback((rule: CategorizationRule) => {
    setEditingId(rule.rowId);
    setEditDebitAccountId(rule.debitAccountId);
    setEditCreditAccountId(rule.creditAccountId);
  }, []);

  const cancelEdit = useCallback(() => {
    setEditingId(null);
  }, []);

  const saveEdit = useCallback(() => {
    if (!editingId) return;

    onEdit(editingId, {
      debitAccountId: editDebitAccountId,
      creditAccountId: editCreditAccountId,
    });

    setEditingId(null);
  }, [editingId, editDebitAccountId, editCreditAccountId, onEdit]);

  if (rules.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-8 text-center text-muted-foreground text-sm">
        No categorization rules yet. Rules are created automatically when you
        approve transactions.
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-card">
      {/* Header */}
      <div className="grid grid-cols-[1fr_1.5fr_1fr_1fr_0.5fr_0.5fr_auto] items-center gap-4 border-border border-b px-4 py-3 font-medium text-muted-foreground text-xs">
        <span>Name</span>
        <span>Match</span>
        <span>Debit Account</span>
        <span>Credit Account</span>
        <span>Confidence</span>
        <span>Hits</span>
        <span className="w-[4.75rem]" />
      </div>

      {/* Rows */}
      {rules.map((rule) => {
        const isEditing = editingId === rule.rowId;

        return (
          <div
            key={rule.rowId}
            className="grid grid-cols-[1fr_1.5fr_1fr_1fr_0.5fr_0.5fr_auto] items-center gap-4 border-border border-b px-4 py-3 last:border-b-0"
          >
            <span className="truncate text-sm" title={rule.name}>
              {rule.name}
            </span>

            <span
              className="truncate font-mono text-muted-foreground text-sm"
              title={`${rule.matchField} ${rule.matchType}: ${rule.matchValue}`}
            >
              {rule.matchField} {rule.matchType}: {rule.matchValue}
            </span>

            {isEditing ? (
              <select
                value={editDebitAccountId}
                onChange={(e) => setEditDebitAccountId(e.target.value)}
                className="rounded-md border border-border bg-background px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                {accounts.map((a) => (
                  <option key={a.rowId} value={a.rowId}>
                    {a.code} - {a.name}
                  </option>
                ))}
              </select>
            ) : (
              <span className="truncate text-sm">
                {resolveAccount(rule.debitAccountId, accounts)}
              </span>
            )}

            {isEditing ? (
              <select
                value={editCreditAccountId}
                onChange={(e) => setEditCreditAccountId(e.target.value)}
                className="rounded-md border border-border bg-background px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                {accounts.map((a) => (
                  <option key={a.rowId} value={a.rowId}>
                    {a.code} - {a.name}
                  </option>
                ))}
              </select>
            ) : (
              <span className="truncate text-sm">
                {resolveAccount(rule.creditAccountId, accounts)}
              </span>
            )}

            <span className="text-muted-foreground text-sm">
              {rule.confidence}
            </span>

            <span className="text-muted-foreground text-sm">
              {rule.hitCount}
            </span>

            {isEditing ? (
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={saveEdit}
                  aria-label="Save edit"
                  className="inline-flex size-9 items-center justify-center rounded-md text-primary text-sm transition-colors hover:bg-primary/10"
                >
                  <CheckIcon className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={cancelEdit}
                  aria-label="Cancel edit"
                  className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground text-sm transition-colors hover:bg-accent"
                >
                  <XIcon className="size-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => startEdit(rule)}
                  aria-label={`Edit rule ${rule.name}`}
                  className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground text-sm transition-colors hover:bg-accent"
                >
                  <PencilIcon className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(rule.rowId, rule.name)}
                  aria-label={`Delete rule ${rule.name}`}
                  className="inline-flex size-9 items-center justify-center rounded-md text-destructive text-sm transition-colors hover:bg-destructive/10"
                >
                  <TrashIcon className="size-4" />
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default CategorizationRuleTable;
export type { CategorizationRule };
