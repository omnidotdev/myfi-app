import { createFileRoute } from "@tanstack/react-router";
import { Loader2Icon, PlusIcon, TrashIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import type { Account } from "@/features/accounts/types/account";
import BookPicker from "@/features/books/components/BookPicker";
import type {
  CategorizationRule,
  CategorizationRuleSplit,
} from "@/features/settings/components/CategorizationRuleTable";
import CategorizationRuleTable from "@/features/settings/components/CategorizationRuleTable";
import { API_URL } from "@/lib/config/env.config";
import useActiveBook from "@/lib/hooks/useActiveBook";
import useTagGroups from "@/lib/hooks/useTagGroups";

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

type SplitLineFormState = {
  accountId: string;
  side: "debit" | "credit";
  amountType: "percentage" | "fixed";
  amountValue: string;
  memo: string;
  tagId: string;
};

type CreateFormState = {
  name: string;
  matchField: string;
  matchType: string;
  matchValue: string;
  debitAccountId: string;
  creditAccountId: string;
  priority: number;
  isSplit: boolean;
  splits: SplitLineFormState[];
};

const makeEmptySplitLine = (
  side: "debit" | "credit" = "debit",
): SplitLineFormState => ({
  accountId: "",
  side,
  amountType: "percentage",
  amountValue: "",
  memo: "",
  tagId: "",
});

const INITIAL_FORM: CreateFormState = {
  name: "",
  matchField: "merchant_name",
  matchType: "contains",
  matchValue: "",
  debitAccountId: "",
  creditAccountId: "",
  priority: 0,
  isSplit: false,
  splits: [makeEmptySplitLine("debit"), makeEmptySplitLine("credit")],
};

/** Convert existing rule splits into form-friendly split lines */
const hydrateSplitLines = (
  splits: CategorizationRuleSplit[],
): SplitLineFormState[] =>
  splits.map((s) => ({
    accountId: s.accountId,
    side: s.side === "credit" ? "credit" : "debit",
    amountType:
      s.percentage != null && s.percentage !== "" ? "percentage" : "fixed",
    amountValue:
      s.percentage != null && s.percentage !== ""
        ? String(s.percentage)
        : s.fixedAmount != null
          ? String(s.fixedAmount)
          : "",
    memo: s.memo ?? "",
    tagId: s.tagId ?? "",
  }));

/** Validate split lines client-side, returns an error message or null */
const validateSplitLines = (lines: SplitLineFormState[]): string | null => {
  if (lines.length < 2) return "Split rules require at least 2 lines";

  for (const [i, line] of lines.entries()) {
    if (!line.accountId) return `Line ${i + 1} is missing an account`;
    if (!line.amountValue) return `Line ${i + 1} is missing an amount`;
    const n = Number(line.amountValue);
    if (!Number.isFinite(n) || n <= 0)
      return `Line ${i + 1} has an invalid amount`;
    if (line.amountType === "percentage" && n > 100)
      return `Line ${i + 1} percentage cannot exceed 100`;
  }

  const debits = lines.filter((l) => l.side === "debit");
  const credits = lines.filter((l) => l.side === "credit");
  if (debits.length === 0 || credits.length === 0)
    return "Split rules must have both a debit and credit line";

  const sumIfAllPct = (side: SplitLineFormState[], label: string) => {
    const allPct = side.every((l) => l.amountType === "percentage");
    if (!allPct) return null;
    const sum = side.reduce((acc, l) => acc + Number(l.amountValue), 0);
    if (Math.abs(sum - 100) > 0.01)
      return `${label} percentages must sum to 100 (got ${sum.toFixed(2)})`;
    return null;
  };

  const debitErr = sumIfAllPct(debits, "Debit");
  if (debitErr) return debitErr;
  const creditErr = sumIfAllPct(credits, "Credit");
  if (creditErr) return creditErr;

  return null;
};

function RulesPage() {
  const {
    activeBookId,
    books,
    isLoading: booksLoading,
    setActiveBookId,
  } = useActiveBook();

  const { tagGroups } = useTagGroups(activeBookId);

  const [rules, setRules] = useState<CategorizationRule[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<CreateFormState>(INITIAL_FORM);
  const [editingRuleId, setEditingRuleId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [splitError, setSplitError] = useState<string | null>(null);

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

  const resetForm = useCallback(() => {
    setForm(INITIAL_FORM);
    setEditingRuleId(null);
    setSplitError(null);
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!activeBookId) return;
    if (!form.name || !form.matchValue) return;

    let splitsPayload:
      | Array<{
          accountId: string;
          side: "debit" | "credit";
          percentage?: string;
          fixedAmount?: string;
          memo?: string;
          tagId?: string;
          sortOrder: number;
        }>
      | undefined;

    let debitAccountId = form.debitAccountId;
    let creditAccountId = form.creditAccountId;

    if (form.isSplit) {
      const err = validateSplitLines(form.splits);
      if (err) {
        setSplitError(err);
        return;
      }
      setSplitError(null);

      splitsPayload = form.splits.map((line, i) => ({
        accountId: line.accountId,
        side: line.side,
        ...(line.amountType === "percentage"
          ? { percentage: line.amountValue }
          : { fixedAmount: line.amountValue }),
        ...(line.memo ? { memo: line.memo } : {}),
        ...(line.tagId ? { tagId: line.tagId } : {}),
        sortOrder: i,
      }));

      // Use the first debit and credit split accounts to satisfy the required
      // top-level fields on the rule record
      const firstDebit = form.splits.find((l) => l.side === "debit");
      const firstCredit = form.splits.find((l) => l.side === "credit");
      debitAccountId = firstDebit?.accountId ?? "";
      creditAccountId = firstCredit?.accountId ?? "";
    } else {
      if (!form.debitAccountId || !form.creditAccountId) return;
    }

    setIsSaving(true);

    try {
      const payload = {
        bookId: activeBookId,
        name: form.name,
        matchField: form.matchField,
        matchType: form.matchType,
        matchValue: form.matchValue,
        debitAccountId,
        creditAccountId,
        priority: form.priority,
        ...(form.isSplit && splitsPayload
          ? { splits: splitsPayload }
          : { splits: [] }),
      };

      if (editingRuleId) {
        await fetch(`${API_URL}/api/categorization-rules/${editingRuleId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch(`${API_URL}/api/categorization-rules`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      resetForm();
      setShowForm(false);
      await fetchData();
    } catch {
      // Silently handle save errors
    } finally {
      setIsSaving(false);
    }
  }, [activeBookId, form, editingRuleId, fetchData, resetForm]);

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

  const handleEditSplit = useCallback((rule: CategorizationRule) => {
    setEditingRuleId(rule.rowId);
    // Guard against inconsistent DB state where a rule is flagged as split
    // but has fewer than 2 lines, which would render a broken editor
    const hydrated = hydrateSplitLines(rule.splits ?? []);
    const splits =
      hydrated.length >= 2
        ? hydrated
        : [makeEmptySplitLine("debit"), makeEmptySplitLine("credit")];
    setForm({
      name: rule.name,
      matchField: rule.matchField,
      matchType: rule.matchType,
      matchValue: rule.matchValue,
      debitAccountId: rule.debitAccountId,
      creditAccountId: rule.creditAccountId,
      priority: rule.priority,
      isSplit: true,
      splits,
    });
    setSplitError(null);
    setShowForm(true);
  }, []);

  const updateField = useCallback(
    <K extends keyof CreateFormState>(field: K, value: CreateFormState[K]) => {
      setForm((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  const updateSplitLine = useCallback(
    <K extends keyof SplitLineFormState>(
      index: number,
      field: K,
      value: SplitLineFormState[K],
    ) => {
      setSplitError(null);
      setForm((prev) => {
        const next = [...prev.splits];
        next[index] = { ...next[index], [field]: value };
        return { ...prev, splits: next };
      });
    },
    [],
  );

  const addSplitLine = useCallback(() => {
    setSplitError(null);
    setForm((prev) => {
      // Default new line to the side that has fewer lines
      const debits = prev.splits.filter((l) => l.side === "debit").length;
      const credits = prev.splits.filter((l) => l.side === "credit").length;
      const side: "debit" | "credit" = debits <= credits ? "debit" : "credit";
      return {
        ...prev,
        splits: [...prev.splits, makeEmptySplitLine(side)],
      };
    });
  }, []);

  const removeSplitLine = useCallback((index: number) => {
    setSplitError(null);
    setForm((prev) => {
      if (prev.splits.length <= 2) return prev;
      return {
        ...prev,
        splits: prev.splits.filter((_, i) => i !== index),
      };
    });
  }, []);

  const loading = booksLoading || isLoading;

  const canSubmit =
    !!form.name &&
    !!form.matchValue &&
    (form.isSplit
      ? validateSplitLines(form.splits) === null
      : !!form.debitAccountId && !!form.creditAccountId) &&
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
            onClick={() => {
              setShowForm((prev) => {
                const next = !prev;
                if (!next) resetForm();
                return next;
              });
            }}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-primary-foreground text-sm transition-colors hover:bg-primary/90"
          >
            <PlusIcon className="size-4" />
            Add Rule
          </button>
        </div>
      </div>

      {/* Creation/edit form */}
      {showForm && !loading && (
        <div className="rounded-lg border border-border bg-card p-4">
          <h2 className="mb-4 font-medium text-sm">
            {editingRuleId
              ? "Edit Categorization Rule"
              : "New Categorization Rule"}
          </h2>

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

            {/* Single debit/credit accounts (hidden when split enabled) */}
            {!form.isSplit && (
              <>
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
                    onChange={(e) =>
                      updateField("debitAccountId", e.target.value)
                    }
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
                    onChange={(e) =>
                      updateField("creditAccountId", e.target.value)
                    }
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
              </>
            )}

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

          {/* Split toggle */}
          <div className="mt-4 flex items-center gap-2">
            <input
              id="rule-is-split"
              type="checkbox"
              checked={form.isSplit}
              onChange={(e) => {
                updateField("isSplit", e.target.checked);
                setSplitError(null);
              }}
              className="size-4 rounded border-border"
            />
            <label className="text-sm" htmlFor="rule-is-split">
              Split transaction
            </label>
          </div>

          {/* Split line editor */}
          {form.isSplit && (
            <div className="mt-4 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-sm">Split Lines</h3>
                <button
                  type="button"
                  onClick={addSplitLine}
                  className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-primary text-xs transition-colors hover:bg-primary/10"
                >
                  <PlusIcon className="size-3" />
                  Add line
                </button>
              </div>

              {form.splits.map((line, index) => (
                <div
                  // biome-ignore lint/suspicious/noArrayIndexKey: split lines are edited in place and identified by position
                  key={index}
                  className="grid grid-cols-1 gap-2 rounded-md border border-border bg-background p-3 sm:grid-cols-[1fr_auto_auto_auto_1fr_1fr_auto] sm:items-end"
                >
                  <div className="flex flex-col gap-1">
                    <label
                      className="text-muted-foreground text-xs"
                      htmlFor={`split-${index}-account`}
                    >
                      Account
                    </label>
                    <select
                      id={`split-${index}-account`}
                      value={line.accountId}
                      onChange={(e) =>
                        updateSplitLine(index, "accountId", e.target.value)
                      }
                      className="rounded-md border border-border bg-background px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      <option value="">Select account</option>
                      {activeAccounts.map((a) => (
                        <option key={a.rowId} value={a.rowId}>
                          {a.code} - {a.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label
                      className="text-muted-foreground text-xs"
                      htmlFor={`split-${index}-side`}
                    >
                      Side
                    </label>
                    <select
                      id={`split-${index}-side`}
                      value={line.side}
                      onChange={(e) =>
                        updateSplitLine(
                          index,
                          "side",
                          e.target.value as "debit" | "credit",
                        )
                      }
                      className="rounded-md border border-border bg-background px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      <option value="debit">Debit</option>
                      <option value="credit">Credit</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label
                      className="text-muted-foreground text-xs"
                      htmlFor={`split-${index}-amount-type`}
                    >
                      Type
                    </label>
                    <select
                      id={`split-${index}-amount-type`}
                      value={line.amountType}
                      onChange={(e) =>
                        updateSplitLine(
                          index,
                          "amountType",
                          e.target.value as "percentage" | "fixed",
                        )
                      }
                      className="rounded-md border border-border bg-background px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      <option value="percentage">Percentage</option>
                      <option value="fixed">Fixed</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label
                      className="text-muted-foreground text-xs"
                      htmlFor={`split-${index}-amount`}
                    >
                      {line.amountType === "percentage" ? "Percent" : "Amount"}
                    </label>
                    <input
                      id={`split-${index}-amount`}
                      type="number"
                      step="0.01"
                      min="0"
                      value={line.amountValue}
                      onChange={(e) =>
                        updateSplitLine(index, "amountValue", e.target.value)
                      }
                      placeholder={
                        line.amountType === "percentage" ? "50" : "100.00"
                      }
                      className="w-24 rounded-md border border-border bg-background px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label
                      className="text-muted-foreground text-xs"
                      htmlFor={`split-${index}-memo`}
                    >
                      Memo
                    </label>
                    <input
                      id={`split-${index}-memo`}
                      type="text"
                      value={line.memo}
                      onChange={(e) =>
                        updateSplitLine(index, "memo", e.target.value)
                      }
                      placeholder="Optional"
                      className="rounded-md border border-border bg-background px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label
                      className="text-muted-foreground text-xs"
                      htmlFor={`split-${index}-tag`}
                    >
                      Tag
                    </label>
                    <select
                      id={`split-${index}-tag`}
                      value={line.tagId}
                      onChange={(e) =>
                        updateSplitLine(index, "tagId", e.target.value)
                      }
                      className="rounded-md border border-border bg-background px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      <option value="">None</option>
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
                  </div>

                  <button
                    type="button"
                    onClick={() => removeSplitLine(index)}
                    disabled={form.splits.length <= 2}
                    aria-label={`Remove split line ${index + 1}`}
                    className="inline-flex size-9 items-center justify-center rounded-md text-destructive text-sm transition-colors hover:bg-destructive/10 disabled:pointer-events-none disabled:opacity-50"
                  >
                    <TrashIcon className="size-4" />
                  </button>
                </div>
              ))}

              {splitError && (
                <p className="text-destructive text-xs">{splitError}</p>
              )}
            </div>
          )}

          <div className="mt-4 flex items-center gap-2">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-primary-foreground text-sm transition-colors hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
            >
              {isSaving ? (
                <Loader2Icon className="size-4 animate-spin" />
              ) : (
                <PlusIcon className="size-4" />
              )}
              {editingRuleId ? "Save Rule" : "Create Rule"}
            </button>

            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                resetForm();
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
          onEditSplit={handleEditSplit}
        />
      )}
    </div>
  );
}
