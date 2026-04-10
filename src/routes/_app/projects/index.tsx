import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArchiveIcon,
  CheckCircleIcon,
  Loader2Icon,
  PlusIcon,
  TrashIcon,
  XIcon,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

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
  createdAt: string;
};

type ProjectFormValues = {
  name: string;
  code: string;
  budgetAmount: string;
  startDate: string;
  endDate: string;
  notes: string;
};

const emptyForm: ProjectFormValues = {
  name: "",
  code: "",
  budgetAmount: "",
  startDate: "",
  endDate: "",
  notes: "",
};

export const Route = createFileRoute("/_app/projects/")({
  component: ProjectsPage,
});

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

function ProjectsPage() {
  const {
    activeBookId,
    books,
    isLoading: booksLoading,
    setActiveBookId,
  } = useActiveBook();

  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formValues, setFormValues] = useState<ProjectFormValues>(emptyForm);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    if (!activeBookId) return;

    setIsLoading(true);

    try {
      const res = await fetch(
        `${API_URL}/api/projects?bookId=${activeBookId}`,
      );
      const data = await res.json();

      setProjects(data.projects ?? []);
    } catch {
      // Silently handle fetch errors
    } finally {
      setIsLoading(false);
    }
  }, [activeBookId]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const openCreateForm = useCallback(() => {
    setEditingProject(null);
    setFormValues(emptyForm);
    setFormOpen(true);
  }, []);

  const openEditForm = useCallback((project: Project) => {
    setEditingProject(project);
    setFormValues({
      name: project.name,
      code: project.code ?? "",
      budgetAmount: project.budgetAmount ?? "",
      startDate: project.startDate ?? "",
      endDate: project.endDate ?? "",
      notes: project.notes ?? "",
    });
    setFormOpen(true);
  }, []);

  const closeForm = useCallback(() => {
    setFormOpen(false);
    setEditingProject(null);
    setFormValues(emptyForm);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!formValues.name.trim()) return;

      const payload: Record<string, unknown> = {
        name: formValues.name.trim(),
      };
      if (formValues.code.trim()) payload.code = formValues.code.trim();
      if (formValues.budgetAmount)
        payload.budgetAmount = formValues.budgetAmount;
      if (formValues.startDate) payload.startDate = formValues.startDate;
      if (formValues.endDate) payload.endDate = formValues.endDate;
      if (formValues.notes.trim()) payload.notes = formValues.notes.trim();

      try {
        if (editingProject) {
          await fetch(`${API_URL}/api/projects/${editingProject.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          toast.success("Project updated");
        } else {
          payload.bookId = activeBookId;
          await fetch(`${API_URL}/api/projects`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          toast.success("Project created");
        }

        await fetchProjects();
        closeForm();
      } catch {
        toast.error("Failed to save project");
      }
    },
    [editingProject, activeBookId, formValues, fetchProjects, closeForm],
  );

  const handleStatusAction = useCallback(
    async (projectId: string, action: "complete" | "archive") => {
      try {
        await fetch(`${API_URL}/api/projects/${projectId}/${action}`, {
          method: "POST",
        });
        toast.success(
          action === "complete" ? "Project completed" : "Project archived",
        );
        await fetchProjects();
      } catch {
        toast.error(`Failed to ${action} project`);
      }
    },
    [fetchProjects],
  );

  const handleDelete = useCallback(
    async (projectId: string) => {
      try {
        await fetch(`${API_URL}/api/projects/${projectId}`, {
          method: "DELETE",
        });
        toast.success("Project deleted");
        setDeleteConfirmId(null);
        await fetchProjects();
      } catch {
        toast.error("Failed to delete project");
      }
    },
    [fetchProjects],
  );

  const loading = booksLoading || isLoading;

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="font-bold text-2xl">Projects</h1>
          <p className="text-muted-foreground text-sm">
            Track project budgets, revenue, and expenses
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
            onClick={openCreateForm}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90"
          >
            <PlusIcon className="size-4" />
            New Project
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
      {!loading && projects.length === 0 && (
        <div className="rounded-lg border border-border bg-card p-8 text-center">
          <p className="text-muted-foreground">
            No projects yet. Create your first project to start tracking
            budgets and P&L by project.
          </p>
        </div>
      )}

      {/* Projects table */}
      {!loading && projects.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-border bg-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-border border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Name
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Code
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Status
                </th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                  Budget
                </th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                  Total Spend
                </th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                  Remaining
                </th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => {
                const budget = project.budgetAmount
                  ? Number.parseFloat(project.budgetAmount)
                  : null;
                const spend = Number.parseFloat(
                  project.totalExpenses ?? "0",
                );
                const remaining = budget != null ? budget - spend : null;
                const cfg = statusConfig[project.status];

                return (
                  <tr
                    key={project.id}
                    className="border-border border-b last:border-b-0 transition-colors hover:bg-muted/30"
                  >
                    <td className="px-4 py-3">
                      <Link
                        to="/projects/$projectId"
                        params={{ projectId: project.id }}
                        className="font-medium text-primary hover:underline"
                      >
                        {project.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 font-mono text-muted-foreground">
                      {project.code ?? "-"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs ${cfg.className}`}
                      >
                        {cfg.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-mono">
                      {budget != null ? formatCurrency(project.budgetAmount) : "-"}
                    </td>
                    <td className="px-4 py-3 text-right font-mono">
                      {formatCurrency(project.totalExpenses)}
                    </td>
                    <td className="px-4 py-3 text-right font-mono">
                      {remaining != null ? (
                        <span
                          className={
                            remaining < 0
                              ? "text-red-600 dark:text-red-400"
                              : "text-green-600 dark:text-green-400"
                          }
                        >
                          {remaining < 0 ? "-" : ""}
                          {formatCurrency(Math.abs(remaining).toString())}
                        </span>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => openEditForm(project)}
                          className="rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                          title="Edit"
                        >
                          <PlusIcon className="size-4 rotate-45" />
                        </button>
                        {project.status === "active" && (
                          <>
                            <button
                              type="button"
                              onClick={() =>
                                handleStatusAction(project.id, "complete")
                              }
                              className="rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-green-600"
                              title="Mark complete"
                            >
                              <CheckCircleIcon className="size-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                handleStatusAction(project.id, "archive")
                              }
                              className="rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-yellow-600"
                              title="Archive"
                            >
                              <ArchiveIcon className="size-4" />
                            </button>
                          </>
                        )}
                        {deleteConfirmId === project.id ? (
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleDelete(project.id)}
                              className="rounded bg-destructive px-2 py-1 text-destructive-foreground text-xs"
                            >
                              Confirm
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeleteConfirmId(null)}
                              className="rounded p-1 text-muted-foreground hover:text-foreground"
                            >
                              <XIcon className="size-3" />
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setDeleteConfirmId(project.id)}
                            className="rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-destructive"
                            title="Delete"
                          >
                            <TrashIcon className="size-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Create/Edit form dialog */}
      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
            onClick={closeForm}
            aria-label="Close dialog"
          />

          <div className="relative w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-lg">
            <h2 className="mb-4 font-semibold text-lg">
              {editingProject ? "Edit Project" : "New Project"}
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label
                  htmlFor="project-name"
                  className="mb-1 block font-medium text-sm"
                >
                  Name *
                </label>
                <input
                  id="project-name"
                  type="text"
                  required
                  value={formValues.name}
                  onChange={(e) =>
                    setFormValues((v) => ({ ...v, name: e.target.value }))
                  }
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                  placeholder="Project name"
                />
              </div>

              <div>
                <label
                  htmlFor="project-code"
                  className="mb-1 block font-medium text-sm"
                >
                  Code
                </label>
                <input
                  id="project-code"
                  type="text"
                  value={formValues.code}
                  onChange={(e) =>
                    setFormValues((v) => ({ ...v, code: e.target.value }))
                  }
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                  placeholder="Optional project code"
                />
              </div>

              <div>
                <label
                  htmlFor="project-budget"
                  className="mb-1 block font-medium text-sm"
                >
                  Budget Amount
                </label>
                <input
                  id="project-budget"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formValues.budgetAmount}
                  onChange={(e) =>
                    setFormValues((v) => ({
                      ...v,
                      budgetAmount: e.target.value,
                    }))
                  }
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                  placeholder="0.00"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="project-start"
                    className="mb-1 block font-medium text-sm"
                  >
                    Start Date
                  </label>
                  <input
                    id="project-start"
                    type="date"
                    value={formValues.startDate}
                    onChange={(e) =>
                      setFormValues((v) => ({
                        ...v,
                        startDate: e.target.value,
                      }))
                    }
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="project-end"
                    className="mb-1 block font-medium text-sm"
                  >
                    End Date
                  </label>
                  <input
                    id="project-end"
                    type="date"
                    value={formValues.endDate}
                    onChange={(e) =>
                      setFormValues((v) => ({
                        ...v,
                        endDate: e.target.value,
                      }))
                    }
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="project-notes"
                  className="mb-1 block font-medium text-sm"
                >
                  Notes
                </label>
                <textarea
                  id="project-notes"
                  value={formValues.notes}
                  onChange={(e) =>
                    setFormValues((v) => ({ ...v, notes: e.target.value }))
                  }
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                  rows={3}
                  placeholder="Optional notes"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={closeForm}
                  className="rounded-md border border-border bg-background px-4 py-2 text-sm transition-colors hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90"
                >
                  {editingProject ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
