import { createFileRoute } from "@tanstack/react-router";
import { Loader2Icon, PlusIcon, Trash2Icon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import ConfirmDialog from "@/components/ConfirmDialog";
import BookPicker from "@/features/books/components/BookPicker";
import { apiFetch } from "@/lib/api/apiFetch";
import formatCurrency from "@/lib/format/currency";
import useActiveBook from "@/lib/hooks/useActiveBook";

export const Route = createFileRoute(
  "/_app/@{$workspaceSlug}/~/reports/rd-credit",
)({
  component: RdCreditPage,
});

const CATEGORIES = [
  { value: "wages", label: "Wages" },
  { value: "supplies", label: "Supplies" },
  { value: "contract_research", label: "Contract research (65%)" },
  { value: "cloud_computing", label: "Cloud / computer rental" },
  { value: "other", label: "Other" },
];
const CATEGORY_LABELS = Object.fromEntries(
  CATEGORIES.map((c) => [c.value, c.label]),
);

type RdExpense = {
  id: string;
  year: number;
  category: string;
  description: string;
  amount: string;
  isForeign: boolean;
};

type CategorySummary = {
  category: string;
  rawAmount: string;
  qualifiedAmount: string;
};
type ResearchSummary = {
  byCategory: CategorySummary[];
  totalQualifiedExpenses: string;
};
type RdCreditReport = {
  year: number;
  domestic: ResearchSummary;
  foreign: ResearchSummary;
  totalRawExpenses: string;
};

function RdCreditPage() {
  const {
    activeBookId,
    books,
    isLoading: booksLoading,
    setActiveBookId,
  } = useActiveBook();

  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const [expenses, setExpenses] = useState<RdExpense[]>([]);
  const [report, setReport] = useState<RdCreditReport | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formOpen, setFormOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [category, setCategory] = useState("wages");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [isForeign, setIsForeign] = useState(false);

  const [deleting, setDeleting] = useState<RdExpense | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!activeBookId) return;
    setIsLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        bookId: activeBookId,
        year: String(year),
      });
      const [expensesRes, reportRes] = await Promise.all([
        apiFetch(`/api/rd-expenses?${params.toString()}`),
        apiFetch(`/api/tax/rd-credit?${params.toString()}`),
      ]);
      if (!expensesRes.ok || !reportRes.ok)
        throw new Error("Failed to load R&D expenses");
      const expensesBody = await expensesRes.json();
      setExpenses(expensesBody.expenses ?? []);
      setReport(await reportRes.json());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setIsLoading(false);
    }
  }, [activeBookId, year]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const resetForm = () => {
    setCategory("wages");
    setDescription("");
    setAmount("");
    setIsForeign(false);
  };

  const handleCreate = async () => {
    if (!activeBookId) return;
    if (!description.trim() || !amount.trim()) {
      toast.error("Description and amount are required");
      return;
    }
    setSaving(true);
    try {
      const res = await apiFetch("/api/rd-expenses", {
        method: "POST",
        body: JSON.stringify({
          bookId: activeBookId,
          year,
          category,
          description: description.trim(),
          amount: Number.parseFloat(amount).toFixed(4),
          isForeign,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Failed to add expense");
      }
      toast.success("Expense captured");
      resetForm();
      setFormOpen(false);
      await fetchData();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to add expense");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (expense: RdExpense) => {
    setBusyId(expense.id);
    try {
      const res = await apiFetch(`/api/rd-expenses/${expense.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete expense");
      toast.success("Expense removed");
      setDeleting(null);
      await fetchData();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete");
    } finally {
      setBusyId(null);
    }
  };

  const loading = booksLoading || isLoading;
  const inputClass =
    "rounded-md border border-border bg-card px-3 py-1.5 text-sm";

  const summaryCard = (title: string, summary: ResearchSummary) => (
    <div className="flex flex-col gap-2 rounded-lg border border-border bg-card p-4">
      <span className="font-medium">{title}</span>
      <span className="font-bold text-2xl">
        {formatCurrency(summary.totalQualifiedExpenses)}
      </span>
      <span className="text-muted-foreground text-xs">
        qualified research expenses
      </span>
      {summary.byCategory.length > 0 && (
        <ul className="mt-1 flex flex-col gap-0.5 text-muted-foreground text-xs">
          {summary.byCategory.map((c) => (
            <li key={c.category} className="flex justify-between">
              <span>{CATEGORY_LABELS[c.category] ?? c.category}</span>
              <span>{formatCurrency(c.qualifiedAmount)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">R&amp;D Tax Credit</h1>
          <p className="text-muted-foreground text-sm">
            Capture qualified research expenses by year. Contract research
            counts at 65%; foreign research is tracked separately for section
            174
          </p>
        </div>
        <BookPicker
          books={books}
          selectedBookId={activeBookId}
          onSelect={setActiveBookId}
        />
      </div>

      <div className="flex flex-wrap items-end gap-4">
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-muted-foreground">Tax year</span>
          <input
            type="number"
            value={year}
            onChange={(e) =>
              setYear(Number.parseInt(e.target.value, 10) || currentYear)
            }
            className={`${inputClass} w-28`}
          />
        </label>
        <button
          type="button"
          onClick={() => setFormOpen((v) => !v)}
          className="ml-auto flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm"
        >
          <PlusIcon className="size-4" />
          Add expense
        </button>
      </div>

      {formOpen && (
        <div className="flex flex-wrap items-end gap-3 rounded-lg border border-border bg-card p-4">
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-muted-foreground">Category</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={inputClass}
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-1 flex-col gap-1 text-sm">
            <span className="text-muted-foreground">Description</span>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`${inputClass} w-full`}
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-muted-foreground">Amount ($)</span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={`${inputClass} w-32`}
            />
          </label>
          <label className="flex items-center gap-2 py-2 text-sm">
            <input
              type="checkbox"
              checked={isForeign}
              onChange={(e) => setIsForeign(e.target.checked)}
            />
            <span>Foreign research</span>
          </label>
          <button
            type="button"
            onClick={handleCreate}
            disabled={saving}
            className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm disabled:opacity-50"
          >
            {saving && <Loader2Icon className="size-4 animate-spin" />}
            Save
          </button>
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive text-sm">
          {error}
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center rounded-lg border border-border bg-card p-8">
          <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
        </div>
      )}

      {!loading && report && (
        <div className="grid gap-4 sm:grid-cols-2">
          {summaryCard("Domestic research", report.domestic)}
          {summaryCard("Foreign research", report.foreign)}
        </div>
      )}

      {!loading && (
        <div className="overflow-x-auto rounded-lg border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="border-border border-b text-left text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Description</th>
                <th className="px-4 py-3 font-medium">Region</th>
                <th className="px-4 py-3 text-right font-medium">Amount</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {expenses.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-8 text-center text-muted-foreground"
                  >
                    No R&amp;D expenses captured for {year}.
                  </td>
                </tr>
              )}
              {expenses.map((expense) => (
                <tr
                  key={expense.id}
                  className="border-border/50 border-b last:border-0"
                >
                  <td className="px-4 py-3">
                    {CATEGORY_LABELS[expense.category] ?? expense.category}
                  </td>
                  <td className="px-4 py-3">{expense.description}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {expense.isForeign ? "Foreign" : "Domestic"}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {formatCurrency(expense.amount)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => setDeleting(expense)}
                      className="text-muted-foreground hover:text-destructive"
                      aria-label="Delete expense"
                    >
                      <Trash2Icon className="size-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="text-muted-foreground text-xs">
        A capture worksheet for your CPA, not a Form 6765 credit computation.
        Domestic section 174 costs amortize over 5 years and foreign over 15.
      </p>

      <ConfirmDialog
        open={deleting !== null}
        title="Delete R&D expense?"
        description={
          deleting
            ? `Remove "${deleting.description}" (${formatCurrency(deleting.amount)}). This cannot be undone.`
            : ""
        }
        confirmLabel="Delete"
        destructive
        loading={busyId === deleting?.id}
        onConfirm={() => deleting && handleDelete(deleting)}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
}
