import { createFileRoute } from "@tanstack/react-router";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import type { Account } from "@/features/accounts/types/account";
import BookPicker from "@/features/books/components/BookPicker";
import type { CategorizationRule } from "@/features/settings/components/CategorizationRuleTable";
import CategorizationRuleTable from "@/features/settings/components/CategorizationRuleTable";
import { API_URL } from "@/lib/config/env.config";
import useActiveBook from "@/lib/hooks/useActiveBook";

export const Route = createFileRoute("/_app/settings/rules")({
  component: RulesPage,
});

const MATCH_FIELDS = [
  { value: "merchant_name", label: "Merchant Name" },
  { value: "memo", label: "Memo" },
  { value: "plaid_category", label: "Plaid Category" },
] as const;

const MATCH_TYPES = [
  { value: "exact", label: "Exact" },
  { value: "contains", label: "Contains" },
  { value: "starts_with", label: "Starts With" },
  { value: "regex", label: "Regex" },
] as const;

type CreateFormState = {
  name: string;
  matchField: string;
  matchType: string;
  matchValue: string;
  debitAccountId: string;
  creditAccountId: string;
  priority: number;
};

const INITIAL_FORM: CreateFormState = {
  name: "",
  matchField: "merchant_name",
  matchType: "contains",
  matchValue: "",
  debitAccountId: "",
  creditAccountId: "",
  priority: 0,
};

function RulesPage() {
  const {
    activeBookId,
    books,
    isLoading: booksLoading,
    setActiveBookId,
  } = useActiveBook();

  const [rules, setRules] = useState<CategorizationRule[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<CreateFormState>(INITIAL_FORM);
  const [isSaving, setIsSaving] = useState(false);

  const fetchData = useCallback(async () => {
    if (!activeBookId) return;

    setIsLoading(true);

    try {
      const [rulesRes, accountsRes] = await Promise.all([
        fetch(`${API_URL}/api/categorization-rules?bookId=${activeBookId}`),
        fetch(`${API_URL}/api/accounts?bookId=${activeBookId}`),
      ]);

      const rulesData = await rulesRes.json();
      const accountsData = await accountsRes.json();

      const mappedRules = (rulesData.rules ?? []).map(
        (r: Record<string, unknown>) => ({
          ...r,
          rowId: r.id as string,
        }),
      );

      const mappedAccounts = (accountsData.accounts ?? []).map(
        (a: Record<string, unknown>) => ({
          ...a,
          rowId: a.id as string,
        }),
      );

      setRules(mappedRules);
      setAccounts(mappedAccounts);
    } catch {
      // Silently handle fetch errors
    } finally {
      setIsLoading(false);
    }
  }, [activeBookId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const activeAccounts = accounts.filter((a) => a.isActive && !a.isPlaceholder);

  const handleCreate = useCallback(async () => {
    if (!activeBookId) return;
    if (
      !form.name ||
      !form.matchValue ||
      !form.debitAccountId ||
      !form.creditAccountId
    )
      return;

    setIsSaving(true);

    try {
      await fetch(`${API_URL}/api/categorization-rules`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookId: activeBookId,
          name: form.name,
          matchField: form.matchField,
          matchType: form.matchType,
          matchValue: form.matchValue,
          debitAccountId: form.debitAccountId,
          creditAccountId: form.creditAccountId,
          priority: form.priority,
        }),
      });

      setForm(INITIAL_FORM);
      setShowForm(false);
      await fetchData();
    } catch {
      // Silently handle save errors
    } finally {
      setIsSaving(false);
    }
  }, [activeBookId, form, fetchData]);

  const handleDelete = useCallback(
    async (ruleId: string) => {
      try {
        await fetch(`${API_URL}/api/categorization-rules/${ruleId}`, {
          method: "DELETE",
        });

        await fetchData();
      } catch {
        // Silently handle delete errors
      }
    },
    [fetchData],
  );

  const handleEdit = useCallback(
    async (
      ruleId: string,
      updates: { debitAccountId: string; creditAccountId: string },
    ) => {
      try {
        await fetch(`${API_URL}/api/categorization-rules/${ruleId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updates),
        });

        await fetchData();
      } catch {
        // Silently handle edit errors
      }
    },
    [fetchData],
  );

  const updateField = useCallback(
    <K extends keyof CreateFormState>(field: K, value: CreateFormState[K]) => {
      setForm((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  const loading = booksLoading || isLoading;

  const canSubmit =
    form.name &&
    form.matchValue &&
    form.debitAccountId &&
    form.creditAccountId &&
    !isSaving;

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">Categorization Rules</h1>
          <p className="text-muted-foreground text-sm">
            Rules that automatically categorize transactions into journal
            entries based on pattern matching
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
            onClick={() => setShowForm((prev) => !prev)}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-primary-foreground text-sm transition-colors hover:bg-primary/90"
          >
            <PlusIcon className="size-4" />
            Add Rule
          </button>
        </div>
      </div>

      {/* Creation form */}
      {showForm && !loading && (
        <div className="rounded-lg border border-border bg-card p-4">
          <h2 className="mb-4 font-medium text-sm">New Categorization Rule</h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Name */}
            <div className="flex flex-col gap-1">
              <label
                className="text-muted-foreground text-xs"
                htmlFor="rule-name"
              >
                Name
              </label>
              <input
                id="rule-name"
                type="text"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="e.g. Groceries at Costco"
                className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            {/* Match Field */}
            <div className="flex flex-col gap-1">
              <label
                className="text-muted-foreground text-xs"
                htmlFor="rule-match-field"
              >
                Match Field
              </label>
              <select
                id="rule-match-field"
                value={form.matchField}
                onChange={(e) => updateField("matchField", e.target.value)}
                className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                {MATCH_FIELDS.map((f) => (
                  <option key={f.value} value={f.value}>
                    {f.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Match Type */}
            <div className="flex flex-col gap-1">
              <label
                className="text-muted-foreground text-xs"
                htmlFor="rule-match-type"
              >
                Match Type
              </label>
              <select
                id="rule-match-type"
                value={form.matchType}
                onChange={(e) => updateField("matchType", e.target.value)}
                className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                {MATCH_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Match Value */}
            <div className="flex flex-col gap-1">
              <label
                className="text-muted-foreground text-xs"
                htmlFor="rule-match-value"
              >
                Match Value
              </label>
              <input
                id="rule-match-value"
                type="text"
                value={form.matchValue}
                onChange={(e) => updateField("matchValue", e.target.value)}
                placeholder="e.g. Costco"
                className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            {/* Debit Account */}
            <div className="flex flex-col gap-1">
              <label
                className="text-muted-foreground text-xs"
                htmlFor="rule-debit"
              >
                Debit Account
              </label>
              <select
                id="rule-debit"
                value={form.debitAccountId}
                onChange={(e) => updateField("debitAccountId", e.target.value)}
                className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="">Select account</option>
                {activeAccounts.map((a) => (
                  <option key={a.rowId} value={a.rowId}>
                    {a.code} - {a.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Credit Account */}
            <div className="flex flex-col gap-1">
              <label
                className="text-muted-foreground text-xs"
                htmlFor="rule-credit"
              >
                Credit Account
              </label>
              <select
                id="rule-credit"
                value={form.creditAccountId}
                onChange={(e) => updateField("creditAccountId", e.target.value)}
                className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="">Select account</option>
                {activeAccounts.map((a) => (
                  <option key={a.rowId} value={a.rowId}>
                    {a.code} - {a.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Priority */}
            <div className="flex flex-col gap-1">
              <label
                className="text-muted-foreground text-xs"
                htmlFor="rule-priority"
              >
                Priority
              </label>
              <input
                id="rule-priority"
                type="number"
                value={form.priority}
                onChange={(e) =>
                  updateField("priority", Number(e.target.value))
                }
                className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <button
              type="button"
              onClick={handleCreate}
              disabled={!canSubmit}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-primary-foreground text-sm transition-colors hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
            >
              {isSaving ? (
                <Loader2Icon className="size-4 animate-spin" />
              ) : (
                <PlusIcon className="size-4" />
              )}
              Create Rule
            </button>

            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setForm(INITIAL_FORM);
              }}
              className="rounded-md px-3 py-2 text-muted-foreground text-sm transition-colors hover:bg-accent"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center rounded-lg border border-border bg-card p-8">
          <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
        </div>
      )}

      {/* Rules table */}
      {!loading && (
        <CategorizationRuleTable
          rules={rules}
          accounts={activeAccounts.map((a) => ({
            rowId: a.rowId,
            name: a.name,
            code: a.code,
          }))}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}
    </div>
  );
}
