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
  "/_app/@{$workspaceSlug}/~/settings/custom-fields",
)({
  component: CustomFieldsPage,
});

const inputClass =
  "rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50";

interface Definition {
  id: string;
  entityType: string;
  label: string;
  fieldType: string;
  position: number;
}

const ENTITIES: { entityType: string; label: string }[] = [
  { entityType: "customer", label: "Customers" },
  { entityType: "invoice", label: "Invoices" },
  { entityType: "vendor", label: "Vendors" },
  { entityType: "item", label: "Items" },
];

const FIELD_TYPES = ["text", "number", "date", "boolean"];

function CustomFieldsPage() {
  const {
    activeBookId,
    books,
    isLoading: booksLoading,
    setActiveBookId,
  } = useActiveBook();

  const [definitions, setDefinitions] = useState<Definition[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [drafts, setDrafts] = useState<
    Record<string, { label: string; fieldType: string }>
  >({});
  const [savingEntity, setSavingEntity] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<Definition | null>(null);
  const [busy, setBusy] = useState(false);

  const draftFor = (entityType: string) =>
    drafts[entityType] ?? { label: "", fieldType: "text" };

  const fetchData = useCallback(async () => {
    if (!activeBookId) return;
    setIsLoading(true);
    setLoadError(false);
    try {
      const res = await apiFetch(
        `/api/custom-fields/definitions?bookId=${activeBookId}`,
      );
      const data = await res.json();
      setDefinitions(data.definitions ?? []);
    } catch (err) {
      console.error("Failed to load custom fields", err);
      setLoadError(true);
    } finally {
      setIsLoading(false);
    }
  }, [activeBookId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCreate = useCallback(
    async (entityType: string) => {
      const draft = drafts[entityType] ?? { label: "", fieldType: "text" };
      const label = draft.label.trim();
      if (!activeBookId || !label) return;
      setSavingEntity(entityType);
      try {
        const res = await apiFetch("/api/custom-fields/definitions", {
          method: "POST",
          body: JSON.stringify({
            bookId: activeBookId,
            entityType,
            label,
            fieldType: draft.fieldType,
            position: definitions.filter((d) => d.entityType === entityType)
              .length,
          }),
        });
        if (!res.ok) throw new Error("Create failed");
        setDrafts((d) => ({
          ...d,
          [entityType]: { label: "", fieldType: "text" },
        }));
        await fetchData();
      } catch {
        toast.error("Could not add the field");
      } finally {
        setSavingEntity(null);
      }
    },
    [activeBookId, drafts, definitions, fetchData],
  );

  const handleDelete = useCallback(async () => {
    if (!deleting) return;
    setBusy(true);
    try {
      const res = await apiFetch(
        `/api/custom-fields/definitions/${deleting.id}`,
        { method: "DELETE" },
      );
      if (!res.ok) throw new Error("Delete failed");
      toast.success("Field removed");
      setDeleting(null);
      await fetchData();
    } catch {
      toast.error("Could not remove the field");
    } finally {
      setBusy(false);
    }
  }, [deleting, fetchData]);

  const loading = booksLoading || isLoading;

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">Custom Fields</h1>
          <p className="text-muted-foreground text-sm">
            Add your own fields to records for information the built-in fields
            do not cover
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
        <LoadError resource="custom fields" onRetry={fetchData} />
      )}

      {!loading &&
        !loadError &&
        ENTITIES.map(({ entityType, label }) => {
          const fields = definitions.filter((d) => d.entityType === entityType);
          const draft = draftFor(entityType);
          return (
            <section key={entityType} className="flex flex-col gap-3">
              <h2 className="font-semibold text-lg">{label}</h2>

              <div className="flex flex-wrap gap-2">
                <input
                  type="text"
                  value={draft.label}
                  onChange={(e) =>
                    setDrafts((d) => ({
                      ...d,
                      [entityType]: { ...draft, label: e.target.value },
                    }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleCreate(entityType);
                  }}
                  placeholder="Field name"
                  className={`${inputClass} flex-1`}
                  disabled={!activeBookId}
                />
                <select
                  value={draft.fieldType}
                  onChange={(e) =>
                    setDrafts((d) => ({
                      ...d,
                      [entityType]: { ...draft, fieldType: e.target.value },
                    }))
                  }
                  className={inputClass}
                  aria-label={`${label} field type`}
                >
                  {FIELD_TYPES.map((ft) => (
                    <option key={ft} value={ft}>
                      {ft}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => handleCreate(entityType)}
                  disabled={
                    !activeBookId ||
                    savingEntity === entityType ||
                    !draft.label.trim()
                  }
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90 disabled:opacity-50"
                >
                  {savingEntity === entityType && (
                    <Loader2Icon className="size-4 animate-spin" />
                  )}
                  Add
                </button>
              </div>

              {fields.length === 0 ? (
                <EmptyState
                  title={`No custom ${label.toLowerCase()} fields`}
                  description="Add a field above to collect extra information."
                />
              ) : (
                <ul className="divide-y divide-border rounded-lg border border-border bg-card">
                  {fields.map((f) => (
                    <li
                      key={f.id}
                      className="flex items-center justify-between px-4 py-2.5 text-sm"
                    >
                      <span>
                        {f.label}
                        <span className="ml-2 text-muted-foreground text-xs">
                          {f.fieldType}
                        </span>
                      </span>
                      <button
                        type="button"
                        aria-label={`Remove ${f.label}`}
                        onClick={() => setDeleting(f)}
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
        title={`Remove "${deleting?.label ?? ""}"?`}
        description="Values already entered for this field are deleted and cannot be recovered."
        confirmLabel="Remove"
        destructive
        loading={busy}
        onConfirm={handleDelete}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
}
