import { createFileRoute } from "@tanstack/react-router";
import { Loader2Icon, StarIcon, Trash2Icon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import ConfirmDialog from "@/components/ConfirmDialog";
import EmptyState from "@/components/EmptyState";
import LoadError from "@/components/LoadError";
import BookPicker from "@/features/books/components/BookPicker";
import { apiFetch } from "@/lib/api/apiFetch";
import useActiveBook from "@/lib/hooks/useActiveBook";

export const Route = createFileRoute(
  "/_app/@{$workspaceSlug}/~/settings/form-templates",
)({
  component: FormTemplatesPage,
});

const inputClass =
  "rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50";

interface FormTemplate {
  id: string;
  name: string;
  documentType: string;
  accentColor: string;
  footerText: string | null;
  terms: string | null;
  showLogo: boolean;
  isDefault: boolean;
}

const emptyDraft = {
  name: "",
  documentType: "invoice",
  accentColor: "#0f172a",
  footerText: "",
  terms: "",
  showLogo: true,
};

function FormTemplatesPage() {
  const {
    activeBookId,
    books,
    isLoading: booksLoading,
    setActiveBookId,
  } = useActiveBook();

  const [templates, setTemplates] = useState<FormTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<FormTemplate | null>(null);
  const [draft, setDraft] = useState(emptyDraft);

  const fetchData = useCallback(async () => {
    if (!activeBookId) return;
    setIsLoading(true);
    setLoadError(false);
    try {
      const res = await apiFetch(`/api/form-templates?bookId=${activeBookId}`);
      const data = await res.json();
      setTemplates(data.templates ?? []);
    } catch (err) {
      console.error("Failed to load form templates", err);
      setLoadError(true);
    } finally {
      setIsLoading(false);
    }
  }, [activeBookId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCreate = useCallback(async () => {
    if (!activeBookId || !draft.name.trim()) return;
    setSaving(true);
    try {
      const res = await apiFetch("/api/form-templates", {
        method: "POST",
        body: JSON.stringify({
          bookId: activeBookId,
          name: draft.name.trim(),
          documentType: draft.documentType,
          accentColor: draft.accentColor,
          footerText: draft.footerText || undefined,
          terms: draft.terms || undefined,
          showLogo: draft.showLogo,
        }),
      });
      if (!res.ok) throw new Error("Create failed");
      toast.success("Template created");
      setDraft(emptyDraft);
      await fetchData();
    } catch {
      toast.error("Could not create the template");
    } finally {
      setSaving(false);
    }
  }, [activeBookId, draft, fetchData]);

  const makeDefault = useCallback(
    async (t: FormTemplate) => {
      if (!activeBookId) return;
      try {
        const res = await apiFetch(`/api/form-templates/${t.id}/default`, {
          method: "POST",
          body: JSON.stringify({ bookId: activeBookId }),
        });
        if (!res.ok) throw new Error("Failed");
        await fetchData();
      } catch {
        toast.error("Could not set the default");
      }
    },
    [activeBookId, fetchData],
  );

  const handleDelete = useCallback(async () => {
    if (!deleting) return;
    setSaving(true);
    try {
      const res = await apiFetch(`/api/form-templates/${deleting.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      toast.success("Template removed");
      setDeleting(null);
      await fetchData();
    } catch {
      toast.error("Could not remove the template");
    } finally {
      setSaving(false);
    }
  }, [deleting, fetchData]);

  const loading = booksLoading || isLoading;

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">Form Templates</h1>
          <p className="text-muted-foreground text-sm">
            Brand your invoices and estimates with a color, footer, and terms
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
        <LoadError resource="form templates" onRetry={fetchData} />
      )}

      {!loading && !loadError && (
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="flex flex-col gap-3 rounded-lg border border-border bg-card p-4">
            <h2 className="font-semibold">New Template</h2>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="ft-name" className="font-medium text-sm">
                Name
              </label>
              <input
                id="ft-name"
                type="text"
                value={draft.name}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, name: e.target.value }))
                }
                className={inputClass}
                disabled={!activeBookId}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="ft-type" className="font-medium text-sm">
                  Document
                </label>
                <select
                  id="ft-type"
                  value={draft.documentType}
                  onChange={(e) =>
                    setDraft((d) => ({ ...d, documentType: e.target.value }))
                  }
                  className={inputClass}
                >
                  <option value="invoice">Invoice</option>
                  <option value="estimate">Estimate</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="ft-color" className="font-medium text-sm">
                  Accent color
                </label>
                <input
                  id="ft-color"
                  type="color"
                  value={draft.accentColor}
                  onChange={(e) =>
                    setDraft((d) => ({ ...d, accentColor: e.target.value }))
                  }
                  className="h-10 w-full rounded-md border border-border bg-background"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="ft-footer" className="font-medium text-sm">
                Footer
              </label>
              <input
                id="ft-footer"
                type="text"
                value={draft.footerText}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, footerText: e.target.value }))
                }
                placeholder="Thank you for your business"
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="ft-terms" className="font-medium text-sm">
                Terms
              </label>
              <textarea
                id="ft-terms"
                rows={2}
                value={draft.terms}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, terms: e.target.value }))
                }
                className={inputClass}
              />
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={draft.showLogo}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, showLogo: e.target.checked }))
                }
                className="size-4 rounded border-border"
              />
              Show logo
            </label>

            {/* live preview */}
            <div className="mt-2 overflow-hidden rounded-md border border-border">
              <div
                className="px-4 py-3 font-semibold text-white"
                style={{ backgroundColor: draft.accentColor }}
              >
                {draft.documentType === "estimate" ? "ESTIMATE" : "INVOICE"}
              </div>
              <div className="px-4 py-3 text-muted-foreground text-xs">
                {draft.footerText || "Footer text appears here"}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleCreate}
                disabled={!activeBookId || saving || !draft.name.trim()}
                className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90 disabled:opacity-50"
              >
                {saving && <Loader2Icon className="size-4 animate-spin" />}
                Create Template
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {templates.length === 0 ? (
              <EmptyState
                title="No templates yet"
                description="Create a template to brand your invoices and estimates."
              />
            ) : (
              <ul className="flex flex-col gap-3">
                {templates.map((t) => (
                  <li
                    key={t.id}
                    className="flex items-center justify-between rounded-lg border border-border bg-card p-4"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="inline-block size-6 rounded"
                        style={{ backgroundColor: t.accentColor }}
                        aria-hidden="true"
                      />
                      <div>
                        <p className="font-medium">
                          {t.name}
                          {t.isDefault && (
                            <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-primary text-xs">
                              Default
                            </span>
                          )}
                        </p>
                        <p className="text-muted-foreground text-xs capitalize">
                          {t.documentType}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {!t.isDefault && (
                        <button
                          type="button"
                          aria-label={`Make ${t.name} the default`}
                          onClick={() => makeDefault(t)}
                          className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                          title="Set as default"
                        >
                          <StarIcon className="size-4" />
                        </button>
                      )}
                      <button
                        type="button"
                        aria-label={`Remove ${t.name}`}
                        onClick={() => setDeleting(t)}
                        className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-destructive"
                      >
                        <Trash2Icon className="size-4" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      <ConfirmDialog
        open={deleting !== null}
        title={`Remove "${deleting?.name ?? ""}"?`}
        description="This permanently deletes the template. This cannot be undone."
        confirmLabel="Remove"
        destructive
        loading={saving}
        onConfirm={handleDelete}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
}
