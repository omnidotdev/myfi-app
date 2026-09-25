import { createFileRoute } from "@tanstack/react-router";
import {
  ExternalLinkIcon,
  FileTextIcon,
  Loader2Icon,
  TrashIcon,
  UploadIcon,
} from "lucide-react";
import type { ChangeEvent } from "react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import ConfirmDialog from "@/components/ConfirmDialog";
import EmptyState from "@/components/EmptyState";
import BookPicker from "@/features/books/components/BookPicker";
import { apiFetch } from "@/lib/api/apiFetch";
import useActiveBook from "@/lib/hooks/useActiveBook";

export const Route = createFileRoute("/_app/@{$workspaceSlug}/~/documents/")({
  component: DocumentsPage,
});

type Document = {
  id: string;
  category: string;
  name: string;
  filename: string;
  contentType: string;
  sizeBytes: number;
  vendorId: string | null;
  year: number | null;
  notes: string | null;
  createdAt: string;
};

type Vendor = { id: string; name: string };

const CATEGORIES = [
  { value: "articles", label: "Articles of Incorporation" },
  { value: "ein", label: "EIN Letter" },
  { value: "bylaws", label: "Bylaws / Operating Agreement" },
  { value: "tax_return", label: "Tax Return" },
  { value: "w9", label: "W-9" },
  { value: "statement", label: "Statement" },
  { value: "receipt", label: "Receipt" },
  { value: "cap_table", label: "Cap Table" },
  { value: "other", label: "Other" },
] as const;

const CATEGORY_LABELS: Record<string, string> = Object.fromEntries(
  CATEGORIES.map((c) => [c.value, c.label]),
);

const ACCEPTED_TYPES = "image/jpeg,image/png,image/heic,application/pdf";
const MAX_FILE_SIZE = 50 * 1024 * 1024;

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function DocumentsPage() {
  const {
    activeBookId,
    books,
    isLoading: booksLoading,
    setActiveBookId,
  } = useActiveBook();

  const [documents, setDocuments] = useState<Document[]>([]);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [category, setCategory] = useState<string>("other");
  const [vendorId, setVendorId] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [viewingId, setViewingId] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Document | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchDocuments = useCallback(async () => {
    if (!activeBookId) return;
    setIsLoading(true);
    try {
      const res = await apiFetch(`/api/documents?bookId=${activeBookId}`);
      if (!res.ok) throw new Error(`Failed to load documents (${res.status})`);
      const data = (await res.json()) as { documents: Document[] };
      setDocuments(data.documents ?? []);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to load documents",
      );
    } finally {
      setIsLoading(false);
    }
  }, [activeBookId]);

  const fetchVendors = useCallback(async () => {
    if (!activeBookId) return;
    try {
      const res = await apiFetch(`/api/vendors?bookId=${activeBookId}`);
      if (!res.ok) return;
      const data = (await res.json()) as {
        vendors: { id: string; name: string }[];
      };
      setVendors(data.vendors ?? []);
    } catch {
      // Vendor list is optional context for W-9 linking
    }
  }, [activeBookId]);

  useEffect(() => {
    fetchDocuments();
    fetchVendors();
  }, [fetchDocuments, fetchVendors]);

  const handleUpload = useCallback(async () => {
    if (!activeBookId || !file) return;

    if (file.size <= 0 || file.size > MAX_FILE_SIZE) {
      toast.error("File size must be between 1 byte and 50 MB");
      return;
    }

    setIsUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("bookId", activeBookId);
      form.append("category", category);
      if (vendorId) form.append("vendorId", vendorId);
      if (year.trim()) form.append("year", year.trim());
      if (notes.trim()) form.append("notes", notes.trim());

      const res = await apiFetch("/api/documents", {
        method: "POST",
        body: form,
      });

      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(body?.error ?? "Failed to upload document");
      }

      toast.success(`Uploaded ${file.name}`);
      setFile(null);
      setYear("");
      setNotes("");
      setVendorId("");
      await fetchDocuments();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to upload");
    } finally {
      setIsUploading(false);
    }
  }, [activeBookId, file, category, vendorId, year, notes, fetchDocuments]);

  const handleView = useCallback(
    async (doc: Document) => {
      if (!activeBookId) return;
      setViewingId(doc.id);
      try {
        const res = await apiFetch(
          `/api/documents/${doc.id}/download?bookId=${activeBookId}`,
        );
        if (!res.ok) throw new Error(`Failed to open file (${res.status})`);
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank", "noopener,noreferrer");
        setTimeout(() => URL.revokeObjectURL(url), 60_000);
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Failed to open");
      } finally {
        setViewingId(null);
      }
    },
    [activeBookId],
  );

  const handleDelete = useCallback(async () => {
    if (!pendingDelete || !activeBookId) return;
    setIsDeleting(true);
    try {
      const res = await apiFetch(
        `/api/documents/${pendingDelete.id}?bookId=${activeBookId}`,
        { method: "DELETE" },
      );
      if (!res.ok) throw new Error(`Failed to delete (${res.status})`);
      toast.success("Document deleted");
      setPendingDelete(null);
      await fetchDocuments();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete");
    } finally {
      setIsDeleting(false);
    }
  }, [pendingDelete, activeBookId, fetchDocuments]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] ?? null);
  };

  const vendorName = useCallback(
    (id: string | null) => vendors.find((v) => v.id === id)?.name ?? null,
    [vendors],
  );

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-semibold text-xl">Documents</h1>
          <p className="text-muted-foreground text-sm">
            Entity records, tax returns, and W-9s kept on file for your books
          </p>
        </div>
        <BookPicker
          books={books}
          selectedBookId={activeBookId}
          onSelect={setActiveBookId}
        />
      </div>

      {/* Upload */}
      <section className="flex flex-col gap-3 rounded-lg border border-border bg-card p-4">
        <h2 className="font-medium text-sm">Upload a document</h2>
        <div className="flex flex-wrap items-end gap-3">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="doc-category"
              className="text-muted-foreground text-xs"
            >
              Category
            </label>
            <select
              id="doc-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-md border border-border bg-background px-3 py-2 text-sm"
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          {category === "w9" && (
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="doc-vendor"
                className="text-muted-foreground text-xs"
              >
                Vendor
              </label>
              <select
                id="doc-vendor"
                value={vendorId}
                onChange={(e) => setVendorId(e.target.value)}
                className="rounded-md border border-border bg-background px-3 py-2 text-sm"
              >
                <option value="">Unassigned</option>
                {vendors.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label htmlFor="doc-year" className="text-muted-foreground text-xs">
              Year (optional)
            </label>
            <input
              id="doc-year"
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="2026"
              className="w-24 rounded-md border border-border bg-background px-3 py-2 text-sm"
            />
          </div>

          <div className="flex min-w-48 flex-1 flex-col gap-1.5">
            <label
              htmlFor="doc-notes"
              className="text-muted-foreground text-xs"
            >
              Notes (optional)
            </label>
            <input
              id="doc-notes"
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="rounded-md border border-border bg-background px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <input
            type="file"
            accept={ACCEPTED_TYPES}
            onChange={handleFileChange}
            className="text-sm"
          />
          <button
            type="button"
            onClick={handleUpload}
            disabled={!file || !activeBookId || isUploading}
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90 disabled:opacity-50"
          >
            {isUploading ? (
              <Loader2Icon className="size-4 animate-spin" />
            ) : (
              <UploadIcon className="size-4" />
            )}
            Upload
          </button>
        </div>
        <p className="text-muted-foreground text-xs">
          JPEG, PNG, HEIC, or PDF up to 50 MB. Files are stored privately and
          served only through this app.
        </p>
      </section>

      {/* List */}
      {booksLoading || isLoading ? (
        <div className="flex items-center justify-center p-8">
          <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
        </div>
      ) : documents.length === 0 ? (
        <EmptyState
          icon={FileTextIcon}
          title="No documents yet"
          description="Upload your entity records, tax returns, and W-9s to keep them on file."
        />
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-border border-b text-left text-muted-foreground">
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Vendor</th>
                <th className="px-4 py-3 font-medium">Year</th>
                <th className="px-4 py-3 font-medium">Size</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr key={doc.id} className="border-border border-b">
                  <td className="px-4 py-3">
                    <span className="font-medium">{doc.name}</span>
                    {doc.notes && (
                      <span className="block text-muted-foreground text-xs">
                        {doc.notes}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {CATEGORY_LABELS[doc.category] ?? doc.category}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {vendorName(doc.vendorId) ?? "-"}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {doc.year ?? "-"}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {formatFileSize(doc.sizeBytes)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => handleView(doc)}
                        disabled={viewingId === doc.id}
                        className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs transition-colors hover:bg-accent disabled:opacity-50"
                      >
                        {viewingId === doc.id ? (
                          <Loader2Icon className="size-3 animate-spin" />
                        ) : (
                          <ExternalLinkIcon className="size-3" />
                        )}
                        View
                      </button>
                      <button
                        type="button"
                        onClick={() => setPendingDelete(doc)}
                        aria-label={`Delete ${doc.name}`}
                        className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-destructive text-xs transition-colors hover:bg-destructive/10"
                      >
                        <TrashIcon className="size-3" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmDialog
        open={pendingDelete !== null}
        title="Delete document?"
        description={
          pendingDelete
            ? `"${pendingDelete.name}" will be permanently deleted. This cannot be undone.`
            : undefined
        }
        confirmLabel="Delete"
        destructive
        loading={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}
