import { createFileRoute } from "@tanstack/react-router";
import {
  Loader2Icon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  XIcon,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import BookPicker from "@/features/books/components/BookPicker";
import { API_URL } from "@/lib/config/env.config";
import useActiveBook from "@/lib/hooks/useActiveBook";

export const Route = createFileRoute("/_app/settings/tax-jurisdictions")({
  component: TaxJurisdictionsPage,
});

type Account = {
  id: string;
  name: string;
  type: string;
};

type TaxJurisdiction = {
  id: string;
  name: string;
  code: string;
  filingFrequency: "monthly" | "quarterly" | "annually";
  taxPayableAccountId: string | null;
  taxPayableAccountName: string | null;
};

type JurisdictionFormData = {
  name: string;
  code: string;
  filingFrequency: "monthly" | "quarterly" | "annually";
  taxPayableAccountId: string;
};

const EMPTY_FORM: JurisdictionFormData = {
  name: "",
  code: "",
  filingFrequency: "quarterly",
  taxPayableAccountId: "",
};

const frequencyLabel: Record<string, string> = {
  monthly: "Monthly",
  quarterly: "Quarterly",
  annually: "Annually",
};

const frequencyStyle: Record<string, string> = {
  monthly: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  quarterly: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  annually: "bg-green-500/10 text-green-600 dark:text-green-400",
};

function TaxJurisdictionsPage() {
  const {
    activeBookId,
    books,
    isLoading: booksLoading,
    setActiveBookId,
  } = useActiveBook();

  const [jurisdictions, setJurisdictions] = useState<TaxJurisdiction[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<JurisdictionFormData>({ ...EMPTY_FORM });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchJurisdictions = useCallback(async () => {
    if (!activeBookId) return;

    setIsLoading(true);

    try {
      const res = await fetch(
        `${API_URL}/api/tax-jurisdictions?bookId=${activeBookId}`,
      );
      const data = await res.json();

      setJurisdictions(data.jurisdictions ?? []);
    } catch {
      // Silently handle fetch errors
    } finally {
      setIsLoading(false);
    }
  }, [activeBookId]);

  const fetchAccounts = useCallback(async () => {
    if (!activeBookId) return;

    try {
      const res = await fetch(`${API_URL}/api/accounts?bookId=${activeBookId}`);
      const data = await res.json();

      // Filter to liability type accounts for tax payable
      setAccounts(
        (data.accounts ?? []).filter((a: Account) => a.type === "liability"),
      );
    } catch {
      // Silently handle fetch errors
    }
  }, [activeBookId]);

  useEffect(() => {
    fetchJurisdictions();
    fetchAccounts();
  }, [fetchJurisdictions, fetchAccounts]);

  const resetForm = useCallback(() => {
    setForm({ ...EMPTY_FORM });
    setShowForm(false);
    setEditingId(null);
    setError(null);
  }, []);

  const handleAdd = useCallback(() => {
    setForm({ ...EMPTY_FORM });
    setEditingId(null);
    setError(null);
    setShowForm(true);
  }, []);

  const handleEdit = useCallback((jurisdiction: TaxJurisdiction) => {
    setForm({
      name: jurisdiction.name,
      code: jurisdiction.code,
      filingFrequency: jurisdiction.filingFrequency,
      taxPayableAccountId: jurisdiction.taxPayableAccountId ?? "",
    });
    setEditingId(jurisdiction.id);
    setError(null);
    setShowForm(true);
  }, []);

  const handleDelete = useCallback(
    async (jurisdictionId: string, jurisdictionName: string) => {
      if (
        !confirm(
          `Delete jurisdiction "${jurisdictionName}"? This cannot be undone.`,
        )
      )
        return;

      try {
        const res = await fetch(
          `${API_URL}/api/tax-jurisdictions/${jurisdictionId}`,
          { method: "DELETE" },
        );

        if (!res.ok) {
          throw new Error("Delete failed");
        }

        setError(null);
        await fetchJurisdictions();
      } catch {
        setError("Failed to delete jurisdiction");
      }
    },
    [fetchJurisdictions],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!activeBookId) return;

      setIsSaving(true);
      setError(null);

      const body: Record<string, unknown> = {
        name: form.name.trim(),
        code: form.code.trim(),
        filingFrequency: form.filingFrequency,
        taxPayableAccountId: form.taxPayableAccountId || null,
      };

      try {
        let res: Response;

        if (editingId) {
          res = await fetch(`${API_URL}/api/tax-jurisdictions/${editingId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });
        } else {
          body.bookId = activeBookId;

          res = await fetch(`${API_URL}/api/tax-jurisdictions`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });
        }

        if (!res.ok) {
          const errData = await res.json().catch(() => null);
          throw new Error(errData?.message ?? `Request failed (${res.status})`);
        }

        resetForm();
        await fetchJurisdictions();
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to save jurisdiction",
        );
      } finally {
        setIsSaving(false);
      }
    },
    [activeBookId, editingId, form, fetchJurisdictions, resetForm],
  );

  const updateField = useCallback(
    <K extends keyof JurisdictionFormData>(
      field: K,
      value: JurisdictionFormData[K],
    ) => {
      setForm((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  const loading = booksLoading || isLoading;

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">Tax Jurisdictions</h1>
          <p className="text-muted-foreground text-sm">
            Manage sales tax jurisdictions and filing frequencies
          </p>
        </div>

        <BookPicker
          books={books}
          selectedBookId={activeBookId}
          onSelect={setActiveBookId}
        />
      </div>

      {/* Error banner */}
      {error && (
        <div className="flex items-center justify-between rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive text-sm">
          <span>{error}</span>
          <button
            type="button"
            onClick={() => setError(null)}
            className="rounded-md p-1 transition-colors hover:bg-destructive/20"
          >
            <XIcon className="size-4" />
          </button>
        </div>
      )}

      {/* Add button */}
      {!loading && !showForm && (
        <div>
          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90"
          >
            <PlusIcon className="size-4" />
            Add Jurisdiction
          </button>
        </div>
      )}

      {/* Jurisdiction form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 rounded-lg border border-border bg-card p-6"
        >
          <h2 className="font-semibold text-lg">
            {editingId ? "Edit Jurisdiction" : "New Jurisdiction"}
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="jurisdiction-name"
                className="font-medium text-sm"
              >
                Name
              </label>
              <input
                id="jurisdiction-name"
                type="text"
                required
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="e.g. California"
                className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            {/* Code */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="jurisdiction-code"
                className="font-medium text-sm"
              >
                Code
              </label>
              <input
                id="jurisdiction-code"
                type="text"
                required
                value={form.code}
                onChange={(e) => updateField("code", e.target.value)}
                placeholder="e.g. CA"
                className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            {/* Filing frequency */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="jurisdiction-frequency"
                className="font-medium text-sm"
              >
                Filing Frequency
              </label>
              <select
                id="jurisdiction-frequency"
                value={form.filingFrequency}
                onChange={(e) =>
                  updateField(
                    "filingFrequency",
                    e.target.value as "monthly" | "quarterly" | "annually",
                  )
                }
                className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="annually">Annually</option>
              </select>
            </div>

            {/* Tax payable account */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="jurisdiction-account"
                className="font-medium text-sm"
              >
                Tax Payable Account
              </label>
              <select
                id="jurisdiction-account"
                value={form.taxPayableAccountId}
                onChange={(e) =>
                  updateField("taxPayableAccountId", e.target.value)
                }
                className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="">None</option>
                {accounts.map((account) => (
                  <option key={account.id} value={account.id}>
                    {account.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Form actions */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={resetForm}
              className="rounded-md border border-border px-4 py-2 text-sm transition-colors hover:bg-accent"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
            >
              {isSaving && <Loader2Icon className="size-4 animate-spin" />}
              {editingId ? "Save Changes" : "Create Jurisdiction"}
            </button>
          </div>
        </form>
      )}

      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center rounded-lg border border-border bg-card p-8">
          <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
        </div>
      )}

      {/* Empty state */}
      {!loading && jurisdictions.length === 0 && !showForm && (
        <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-card p-8 text-center">
          <p className="text-muted-foreground text-sm">
            No tax jurisdictions yet. Add one to start tracking sales tax.
          </p>
        </div>
      )}

      {/* Jurisdiction table */}
      {!loading && jurisdictions.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-border bg-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-border border-b text-left text-muted-foreground">
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Code</th>
                <th className="px-4 py-3 font-medium">Filing Frequency</th>
                <th className="px-4 py-3 font-medium">Linked Account</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>

            <tbody>
              {jurisdictions.map((j) => (
                <tr
                  key={j.id}
                  className="border-border border-b transition-colors hover:bg-accent/30"
                >
                  <td className="px-4 py-3">{j.name}</td>
                  <td className="px-4 py-3 font-mono text-muted-foreground">
                    {j.code}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 font-medium text-xs ${frequencyStyle[j.filingFrequency] ?? ""}`}
                    >
                      {frequencyLabel[j.filingFrequency] ?? j.filingFrequency}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {j.taxPayableAccountName ?? "None"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => handleEdit(j)}
                        className="rounded-md p-1.5 text-muted-foreground transition-colors hover:text-foreground"
                        title="Edit jurisdiction"
                      >
                        <PencilIcon className="size-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(j.id, j.name)}
                        className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                        title="Delete jurisdiction"
                      >
                        <TrashIcon className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
