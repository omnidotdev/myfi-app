import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeftIcon, Loader2Icon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import BookPicker from "@/features/books/components/BookPicker";
import { API_URL } from "@/lib/config/env.config";
import useActiveBook from "@/lib/hooks/useActiveBook";

type Project = {
  id: string;
  bookId: string;
  name: string;
  code: string | null;
  status: "active" | "completed" | "archived";
  budgetAmount: string | null;
  totalRevenue: string | null;
  totalExpenses: string | null;
  startDate: string | null;
  endDate: string | null;
  notes: string | null;
};

type ReportLineItem = {
  accountId: string;
  accountCode: string | null;
  accountName: string;
  accountType: string;
  subType: string | null;
  parentId: string | null;
  netAmount?: string;
};

type ProjectPnLData = {
  revenue: ReportLineItem[];
  expenses: ReportLineItem[];
  totalRevenue: string;
  totalExpenses: string;
  netIncome: string;
};

const statusConfig = {
  active: {
    label: "Active",
    className:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  },
  completed: {
    label: "Completed",
    className:
      "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
  },
  archived: {
    label: "Archived",
    className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  },
};

function formatCurrency(value: string | null | undefined): string {
  if (!value) return "$0.00";
  const num = Number.parseFloat(value);
  return `$${Math.abs(num).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export const Route = createFileRoute("/_app/projects/$projectId")({
  component: ProjectDetailPage,
});

function ProjectDetailPage() {
  const { projectId } = Route.useParams();
  const {
    activeBookId,
    books,
    isLoading: booksLoading,
    setActiveBookId,
  } = useActiveBook();

  const [project, setProject] = useState<Project | null>(null);
  const [pnl, setPnl] = useState<ProjectPnLData | null>(null);
  const [loading, setLoading] = useState(true);
  const [pnlLoading, setPnlLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProject = useCallback(async () => {
    if (!activeBookId) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${API_URL}/api/projects?bookId=${activeBookId}`,
      );
      const data = await res.json();
      const found = (data.projects ?? []).find(
        (p: Project) => p.id === projectId,
      );

      if (!found) {
        setError("Project not found");
        setProject(null);
      } else {
        setProject(found);
      }
    } catch {
      setError("Failed to load project");
    } finally {
      setLoading(false);
    }
  }, [activeBookId, projectId]);

  const fetchPnl = useCallback(async () => {
    if (!activeBookId || !projectId) return;

    setPnlLoading(true);

    try {
      const res = await fetch(
        `${API_URL}/api/reports/project-pnl?bookId=${activeBookId}&projectId=${projectId}`,
      );

      if (res.ok) {
        const data = await res.json();
        setPnl(data);
      }
    } catch {
      // P&L fetch is best-effort
    } finally {
      setPnlLoading(false);
    }
  }, [activeBookId, projectId]);

  useEffect(() => {
    fetchProject();
    fetchPnl();
  }, [fetchProject, fetchPnl]);

  const isLoading = booksLoading || loading;

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 p-6">
        <div className="flex items-center justify-center rounded-lg border border-border bg-card p-8">
          <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="flex flex-col gap-6 p-6">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-muted-foreground text-sm hover:text-foreground"
        >
          <ArrowLeftIcon className="size-4" />
          Back to Projects
        </Link>
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive text-sm">
          {error ?? "Project not found"}
        </div>
      </div>
    );
  }

  const budget = project.budgetAmount
    ? Number.parseFloat(project.budgetAmount)
    : null;
  const totalExpenses = Number.parseFloat(project.totalExpenses ?? "0");
  const totalRevenue = Number.parseFloat(project.totalRevenue ?? "0");
  const budgetUsedPct = budget && budget > 0 ? (totalExpenses / budget) * 100 : null;
  const cfg = statusConfig[project.status];

  // Budget bar color
  let budgetBarColor = "bg-green-500";
  if (budgetUsedPct != null) {
    if (budgetUsedPct > 100) budgetBarColor = "bg-red-500";
    else if (budgetUsedPct >= 80) budgetBarColor = "bg-yellow-500";
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Back link and book picker */}
      <div className="flex items-center justify-between">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-muted-foreground text-sm hover:text-foreground"
        >
          <ArrowLeftIcon className="size-4" />
          Back to Projects
        </Link>
        <BookPicker
          books={books}
          selectedBookId={activeBookId}
          onSelect={setActiveBookId}
        />
      </div>

      {/* Project header */}
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <h1 className="font-bold text-2xl">{project.name}</h1>
              <span
                className={`rounded-full px-2 py-0.5 text-xs ${cfg.className}`}
              >
                {cfg.label}
              </span>
            </div>
            {project.code && (
              <p className="font-mono text-muted-foreground text-sm">
                Code: {project.code}
              </p>
            )}
            {(project.startDate || project.endDate) && (
              <p className="text-muted-foreground text-sm">
                {project.startDate ?? "?"} to {project.endDate ?? "ongoing"}
              </p>
            )}
            {project.notes && (
              <p className="mt-1 text-muted-foreground text-sm">
                {project.notes}
              </p>
            )}
          </div>

          <div className="flex flex-col items-end gap-1 text-right">
            <div className="text-muted-foreground text-sm">Revenue</div>
            <div className="font-mono font-semibold text-green-600 dark:text-green-400">
              {formatCurrency(project.totalRevenue)}
            </div>
            <div className="mt-1 text-muted-foreground text-sm">Expenses</div>
            <div className="font-mono font-semibold text-red-600 dark:text-red-400">
              {formatCurrency(project.totalExpenses)}
            </div>
          </div>
        </div>
      </div>

      {/* Budget tracking */}
      {budget != null && (
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="mb-4 font-semibold text-lg">Budget vs Actual</h2>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Spent: {formatCurrency(totalExpenses.toString())} of{" "}
                {formatCurrency(budget.toString())}
              </span>
              <span className="font-mono font-medium">
                {budgetUsedPct != null ? `${budgetUsedPct.toFixed(1)}%` : "0%"}
              </span>
            </div>

            {/* Progress bar */}
            <div className="h-4 w-full overflow-hidden rounded-full bg-muted">
              <div
                className={`h-full rounded-full transition-all ${budgetBarColor}`}
                style={{
                  width: `${Math.min(budgetUsedPct ?? 0, 100)}%`,
                }}
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Remaining</span>
              <span
                className={`font-mono font-medium ${
                  budget - totalExpenses < 0
                    ? "text-red-600 dark:text-red-400"
                    : "text-green-600 dark:text-green-400"
                }`}
              >
                {budget - totalExpenses < 0 ? "-" : ""}
                {formatCurrency(Math.abs(budget - totalExpenses).toString())}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* P&L section */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h2 className="mb-4 font-semibold text-lg">Project P&L</h2>

        {pnlLoading && (
          <div className="flex items-center justify-center p-8">
            <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
          </div>
        )}

        {!pnlLoading && !pnl && (
          <p className="text-muted-foreground text-sm">
            No P&L data available for this project
          </p>
        )}

        {!pnlLoading && pnl && (
          <div className="flex flex-col gap-4">
            {/* Revenue section */}
            <div>
              <h3 className="mb-2 font-medium text-muted-foreground text-sm uppercase tracking-wider">
                Revenue
              </h3>
              {pnl.revenue.length === 0 ? (
                <p className="text-muted-foreground text-sm">
                  No revenue entries
                </p>
              ) : (
                <table className="w-full text-sm">
                  <tbody>
                    {pnl.revenue.map((item) => (
                      <tr
                        key={item.accountId}
                        className="border-border border-b last:border-b-0"
                      >
                        <td className="py-2">
                          {item.accountCode && (
                            <span className="mr-2 font-mono text-muted-foreground text-xs">
                              {item.accountCode}
                            </span>
                          )}
                          {item.accountName}
                        </td>
                        <td className="py-2 text-right font-mono">
                          {formatCurrency(item.netAmount)}
                        </td>
                      </tr>
                    ))}
                    <tr className="font-semibold">
                      <td className="py-2">Total Revenue</td>
                      <td className="py-2 text-right font-mono">
                        {formatCurrency(pnl.totalRevenue)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              )}
            </div>

            {/* Expenses section */}
            <div>
              <h3 className="mb-2 font-medium text-muted-foreground text-sm uppercase tracking-wider">
                Expenses
              </h3>
              {pnl.expenses.length === 0 ? (
                <p className="text-muted-foreground text-sm">
                  No expense entries
                </p>
              ) : (
                <table className="w-full text-sm">
                  <tbody>
                    {pnl.expenses.map((item) => (
                      <tr
                        key={item.accountId}
                        className="border-border border-b last:border-b-0"
                      >
                        <td className="py-2">
                          {item.accountCode && (
                            <span className="mr-2 font-mono text-muted-foreground text-xs">
                              {item.accountCode}
                            </span>
                          )}
                          {item.accountName}
                        </td>
                        <td className="py-2 text-right font-mono">
                          {formatCurrency(item.netAmount)}
                        </td>
                      </tr>
                    ))}
                    <tr className="font-semibold">
                      <td className="py-2">Total Expenses</td>
                      <td className="py-2 text-right font-mono">
                        {formatCurrency(pnl.totalExpenses)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              )}
            </div>

            {/* Net income */}
            <div className="flex items-center justify-between rounded-md border border-border bg-muted/50 p-4">
              <span className="font-semibold">Net Income</span>
              <span
                className={`font-mono font-semibold text-lg ${
                  Number.parseFloat(pnl.netIncome) >= 0
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {Number.parseFloat(pnl.netIncome) < 0 ? "-" : ""}
                {formatCurrency(pnl.netIncome)}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
