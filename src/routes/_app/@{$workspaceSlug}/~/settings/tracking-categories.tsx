import { createFileRoute } from "@tanstack/react-router";
import { Loader2Icon, Trash2Icon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import ConfirmDialog from "@/components/ConfirmDialog";
import EmptyState from "@/components/EmptyState";
import LoadError from "@/components/LoadError";
import BookPicker from "@/features/books/components/BookPicker";
import { apiFetch } from "@/lib/api/apiFetch";
import useActiveBook from "@/lib/hooks/useActiveBook";

export const Route = createFileRoute(
  "/_app/@{$workspaceSlug}/~/settings/tracking-categories",
)({
  component: TrackingCategoriesPage,
});

const inputClass =
  "rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50";

interface TrackingCategory {
  id: string;
  kind: string;
  name: string;
  code: string | null;
  isActive: boolean;
}

const KINDS: { kind: string; label: string; help: string }[] = [
  {
    kind: "class",
    label: "Classes",
    help: "Segment transactions by department, program, or business line.",
  },
  {
    kind: "location",
    label: "Locations",
    help: "Segment transactions by location, region, or site.",
  },
];

function TrackingCategoriesPage() {
  const {
    activeBookId,
    books,
    isLoading: booksLoading,
    setActiveBookId,
  } = useActiveBook();

  const [categories, setCategories] = useState<TrackingCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [savingKind, setSavingKind] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<TrackingCategory | null>(null);
  const [busy, setBusy] = useState(false);

  const fetchData = useCallback(async () => {
    if (!activeBookId) return;
    setIsLoading(true);
    setLoadError(false);
    try {
      const res = await apiFetch(
        `/api/tracking-categories?bookId=${activeBookId}`,
      );
      const data = await res.json();
      setCategories(data.categories ?? []);
    } catch (err) {
      console.error("Failed to load tracking categories", err);
      setLoadError(true);
    } finally {
      setIsLoading(false);
    }
  }, [activeBookId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCreate = useCallback(
    async (kind: string) => {
      const name = (drafts[kind] ?? "").trim();
      if (!activeBookId || !name) return;
      setSavingKind(kind);
      try {
        const res = await apiFetch("/api/tracking-categories", {
          method: "POST",
          body: JSON.stringify({ bookId: activeBookId, kind, name }),
        });
        if (!res.ok) throw new Error("Create failed");
        setDrafts((d) => ({ ...d, [kind]: "" }));
        await fetchData();
      } catch {
        toast.error("Could not add it");
      } finally {
        setSavingKind(null);
      }
    },
    [activeBookId, drafts, fetchData],
  );

  const handleDelete = useCallback(async () => {
    if (!deleting) return;
    setBusy(true);
    try {
      const res = await apiFetch(`/api/tracking-categories/${deleting.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      toast.success("Removed");
      setDeleting(null);
      await fetchData();
    } catch {
      toast.error("Could not remove it");
    } finally {
      setBusy(false);
    }
  }, [deleting, fetchData]);

  const loading = booksLoading || isLoading;

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">Classes &amp; Locations</h1>
          <p className="text-muted-foreground text-sm">
            Tracking categories for segment reporting, filterable on the Profit
            &amp; Loss report
          </p>
        </div>
        <BookPicker
          books={books}
          selectedBookId={activeBookId}
          onSelect={setActiveBookId}
        />
      </div>

      {loading && (
        <div className="flex items-center justify-center rounded-lg border border-border bg-card p-8">
          <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
        </div>
      )}

      {!loading && loadError && (
        <LoadError resource="tracking categories" onRetry={fetchData} />
      )}

      {!loading &&
        !loadError &&
        KINDS.map(({ kind, label, help }) => {
          const items = categories.filter((c) => c.kind === kind);
          return (
            <section key={kind} className="flex flex-col gap-3">
              <div>
                <h2 className="font-semibold text-lg">{label}</h2>
                <p className="text-muted-foreground text-sm">{help}</p>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={drafts[kind] ?? ""}
                  onChange={(e) =>
                    setDrafts((d) => ({ ...d, [kind]: e.target.value }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleCreate(kind);
                  }}
                  placeholder={`Add a ${kind}`}
                  className={`${inputClass} flex-1`}
                  disabled={!activeBookId}
                />
                <button
                  type="button"
                  onClick={() => handleCreate(kind)}
                  disabled={
                    !activeBookId ||
                    savingKind === kind ||
                    !(drafts[kind] ?? "").trim()
                  }
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90 disabled:opacity-50"
                >
                  {savingKind === kind && (
                    <Loader2Icon className="size-4 animate-spin" />
                  )}
                  Add
                </button>
              </div>

              {items.length === 0 ? (
                <EmptyState
                  title={`No ${label.toLowerCase()} yet`}
                  description={`Add a ${kind} above to start tagging transactions.`}
                />
              ) : (
                <ul className="divide-y divide-border rounded-lg border border-border bg-card">
                  {items.map((c) => (
                    <li
                      key={c.id}
                      className="flex items-center justify-between px-4 py-2.5 text-sm"
                    >
                      <span>{c.name}</span>
                      <button
                        type="button"
                        aria-label={`Remove ${c.name}`}
                        onClick={() => setDeleting(c)}
                        className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-destructive"
                      >
                        <Trash2Icon className="size-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          );
        })}

      <ConfirmDialog
        open={deleting !== null}
        title={`Remove "${deleting?.name ?? ""}"?`}
        description="Existing transactions keep their history, but this category can no longer be assigned. This cannot be undone."
        confirmLabel="Remove"
        destructive
        loading={busy}
        onConfirm={handleDelete}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
}
