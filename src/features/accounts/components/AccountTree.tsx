import {
  ChevronDownIcon,
  ChevronRightIcon,
  EditIcon,
  EyeOffIcon,
  PlusIcon,
} from "lucide-react";
import { useMemo, useState } from "react";

import type { Account, AccountType } from "@/features/accounts/types/account";

type AccountTreeProps = {
  accounts: Account[];
  onEdit: (account: Account) => void;
  onAddChild: (parentAccount: Account) => void;
  onToggleActive: (account: Account) => void;
};

const TYPE_BADGE_CLASSES: Record<AccountType, string> = {
  asset: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300",
  liability: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300",
  equity:
    "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300",
  revenue:
    "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300",
  expense:
    "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300",
};

/** Build a tree from a flat account list by grouping children under `parentId` */
function buildTree(accounts: Account[]): Account[] {
  const map = new Map<string, Account>();
  const roots: Account[] = [];

  for (const account of accounts) {
    map.set(account.rowId, { ...account, children: [] });
  }

  for (const account of map.values()) {
    if (account.parentId) {
      const parent = map.get(account.parentId);
      parent?.children?.push(account);
    } else {
      roots.push(account);
    }
  }

  return roots;
}

/** Format a sub-type value for display */
function formatSubType(value: string): string {
  return value
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

type AccountNodeProps = {
  account: Account;
  depth: number;
  onEdit: (account: Account) => void;
  onAddChild: (parentAccount: Account) => void;
  onToggleActive: (account: Account) => void;
};

function AccountNode({
  account,
  depth,
  onEdit,
  onAddChild,
  onToggleActive,
}: AccountNodeProps) {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = (account.children?.length ?? 0) > 0;

  return (
    <div>
      <div
        className={`group flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors hover:bg-accent ${
          !account.isActive ? "opacity-50" : ""
        }`}
        style={{ paddingLeft: `${depth * 1.5 + 0.5}rem` }}
      >
        {/* Expand/collapse toggle */}
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className={`flex size-5 shrink-0 items-center justify-center rounded transition-colors hover:bg-accent ${
            !hasChildren ? "invisible" : ""
          }`}
          aria-label={expanded ? "Collapse" : "Expand"}
        >
          {expanded ? (
            <ChevronDownIcon className="size-3.5" />
          ) : (
            <ChevronRightIcon className="size-3.5" />
          )}
        </button>

        {/* Code */}
        <span className="w-16 shrink-0 font-mono text-muted-foreground text-xs">
          {account.code}
        </span>

        {/* Name */}
        <span
          className={`min-w-0 flex-1 truncate text-sm ${
            account.isPlaceholder ? "font-semibold" : ""
          }`}
        >
          {account.name}
        </span>

        {/* Type badge */}
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-xs ${TYPE_BADGE_CLASSES[account.type]}`}
        >
          {account.type}
        </span>

        {/* Sub-type */}
        {account.subType && (
          <span className="shrink-0 text-muted-foreground text-xs">
            {formatSubType(account.subType)}
          </span>
        )}

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            type="button"
            onClick={() => onEdit(account)}
            className="rounded p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            aria-label={`Edit ${account.name}`}
          >
            <EditIcon className="size-3.5" />
          </button>

          <button
            type="button"
            onClick={() => onAddChild(account)}
            className="rounded p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            aria-label={`Add child to ${account.name}`}
          >
            <PlusIcon className="size-3.5" />
          </button>

          <button
            type="button"
            onClick={() => onToggleActive(account)}
            className="rounded p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            aria-label={
              account.isActive
                ? `Deactivate ${account.name}`
                : `Activate ${account.name}`
            }
          >
            <EyeOffIcon className="size-3.5" />
          </button>
        </div>
      </div>

      {/* Children */}
      {expanded &&
        account.children?.map((child) => (
          <AccountNode
            key={child.rowId}
            account={child}
            depth={depth + 1}
            onEdit={onEdit}
            onAddChild={onAddChild}
            onToggleActive={onToggleActive}
          />
        ))}
    </div>
  );
}

/**
 * Hierarchical tree view of accounts
 */
function AccountTree({
  accounts,
  onEdit,
  onAddChild,
  onToggleActive,
}: AccountTreeProps) {
  const tree = useMemo(() => buildTree(accounts), [accounts]);

  if (tree.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-8 text-center">
        <p className="text-muted-foreground">
          No accounts yet. Add your first account to build your chart of
          accounts.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-card">
      {/* Header */}
      <div className="flex items-center gap-2 border-border border-b px-2 py-2 text-muted-foreground text-xs">
        <span className="w-5 shrink-0" />
        <span className="w-16 shrink-0">Code</span>
        <span className="min-w-0 flex-1">Name</span>
        <span className="shrink-0">Type</span>
      </div>

      {/* Tree nodes */}
      <div className="py-1">
        {tree.map((account) => (
          <AccountNode
            key={account.rowId}
            account={account}
            depth={0}
            onEdit={onEdit}
            onAddChild={onAddChild}
            onToggleActive={onToggleActive}
          />
        ))}
      </div>
    </div>
  );
}

export default AccountTree;
