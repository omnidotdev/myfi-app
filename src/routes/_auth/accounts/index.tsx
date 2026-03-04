import { createFileRoute } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";
import { useCallback, useState } from "react";

import AccountForm from "@/features/accounts/components/AccountForm";
import AccountTree from "@/features/accounts/components/AccountTree";

import type { Account } from "@/features/accounts/types/account";

export const Route = createFileRoute("/_auth/accounts/")({
  component: AccountsPage,
});

function AccountsPage() {
  const [accounts] = useState<Account[]>([]);
  const [showInactive, setShowInactive] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);
  const [parentForNew, setParentForNew] = useState<Account | null>(null);

  const visibleAccounts = showInactive
    ? accounts
    : accounts.filter((a) => a.isActive);

  const handleEdit = useCallback((account: Account) => {
    setEditingAccount(account);
    setParentForNew(null);
    setFormOpen(true);
  }, []);

  const handleAddChild = useCallback((parentAccount: Account) => {
    setEditingAccount(null);
    setParentForNew(parentAccount);
    setFormOpen(true);
  }, []);

  const handleToggleActive = useCallback((_account: Account) => {
    // Will be wired to GraphQL mutation
  }, []);

  const handleSubmit = useCallback((_values: Partial<Account>) => {
    // Will be wired to GraphQL mutation
    setFormOpen(false);
    setEditingAccount(null);
    setParentForNew(null);
  }, []);

  const handleCancel = useCallback(() => {
    setFormOpen(false);
    setEditingAccount(null);
    setParentForNew(null);
  }, []);

  const handleAddAccount = useCallback(() => {
    setEditingAccount(null);
    setParentForNew(null);
    setFormOpen(true);
  }, []);

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">Chart of Accounts</h1>
          <p className="text-muted-foreground text-sm">
            Manage your account hierarchy for double-entry bookkeeping
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Show inactive toggle */}
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={showInactive}
              onChange={(e) => setShowInactive(e.target.checked)}
              className="size-4 rounded border-border"
            />
            Show inactive
          </label>

          <button
            type="button"
            onClick={handleAddAccount}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90"
          >
            <PlusIcon className="size-4" />
            Add Account
          </button>
        </div>
      </div>

      {/* Account tree */}
      <AccountTree
        accounts={visibleAccounts}
        onEdit={handleEdit}
        onAddChild={handleAddChild}
        onToggleActive={handleToggleActive}
      />

      {/* Account form dialog */}
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
            <h2 className="mb-4 font-semibold text-lg">
              {editingAccount ? "Edit Account" : "Create Account"}
            </h2>

            <AccountForm
              accounts={accounts}
              initialValues={
                editingAccount
                  ? editingAccount
                  : parentForNew
                    ? { parentId: parentForNew.rowId, type: parentForNew.type }
                    : undefined
              }
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          </div>
        </div>
      )}
    </div>
  );
}
