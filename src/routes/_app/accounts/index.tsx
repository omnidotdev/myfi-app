import { createFileRoute } from "@tanstack/react-router";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import AccountForm from "@/features/accounts/components/AccountForm";
import AccountTree from "@/features/accounts/components/AccountTree";
import type { Account } from "@/features/accounts/types/account";
import BookPicker from "@/features/books/components/BookPicker";
import { API_URL } from "@/lib/config/env.config";
import useActiveBook from "@/lib/hooks/useActiveBook";

export const Route = createFileRoute("/_app/accounts/")({
  component: AccountsPage,
});

function AccountsPage() {
  const {
    activeBookId,
    books,
    isLoading: booksLoading,
    setActiveBookId,
  } = useActiveBook();

  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showInactive, setShowInactive] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);
  const [parentForNew, setParentForNew] = useState<Account | null>(null);

  const fetchAccounts = useCallback(async () => {
    if (!activeBookId) return;

    setIsLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/accounts?bookId=${activeBookId}`);
      const data = await res.json();
      const mapped = (data.accounts ?? []).map(
        (a: Record<string, unknown>) => ({
          ...a,
          rowId: a.id as string,
        }),
      );

      setAccounts(mapped);
    } catch {
      // Silently handle fetch errors
    } finally {
      setIsLoading(false);
    }
  }, [activeBookId]);

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

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

  const handleToggleActive = useCallback(
    async (account: Account) => {
      try {
        await fetch(`${API_URL}/api/accounts/${account.rowId}`, {
          method: "PATCH",
        });

        await fetchAccounts();
      } catch {
        // Silently handle toggle errors
      }
    },
    [fetchAccounts],
  );

  const handleSubmit = useCallback(
    async (values: Partial<Account>) => {
      try {
        if (editingAccount) {
          await fetch(`${API_URL}/api/accounts/${editingAccount.rowId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          });
        } else {
          await fetch(`${API_URL}/api/accounts`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              bookId: activeBookId,
              ...values,
            }),
          });
        }

        await fetchAccounts();
        setFormOpen(false);
        setEditingAccount(null);
        setParentForNew(null);
      } catch {
        // Silently handle submit errors
      }
    },
    [editingAccount, activeBookId, fetchAccounts],
  );

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

  const loading = booksLoading || isLoading;

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="font-bold text-2xl">Chart of Accounts</h1>
          <p className="text-muted-foreground text-sm">
            Manage your account hierarchy for double-entry bookkeeping
          </p>
        </div>

        <div className="flex items-center gap-3">
          <BookPicker
            books={books}
            selectedBookId={activeBookId}
            onSelect={setActiveBookId}
          />

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

      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center rounded-lg border border-border bg-card p-8">
          <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
        </div>
      )}

      {/* Empty state */}
      {!loading && accounts.length === 0 && (
        <div className="rounded-lg border border-border bg-card p-8 text-center">
          <p className="text-muted-foreground">
            No accounts yet. Add your first account to get started.
          </p>
        </div>
      )}

      {/* Account tree */}
      {!loading && accounts.length > 0 && (
        <AccountTree
          accounts={visibleAccounts}
          onEdit={handleEdit}
          onAddChild={handleAddChild}
          onToggleActive={handleToggleActive}
        />
      )}

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
                    ? {
                        parentId: parentForNew.rowId,
                        type: parentForNew.type,
                      }
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
