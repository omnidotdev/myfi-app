import {
  ExternalLinkIcon,
  Loader2Icon,
  TrashIcon,
  UploadIcon,
} from "lucide-react";
import type { ChangeEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import ConfirmDialog from "@/components/ConfirmDialog";
import { validateW9File, W9_ACCEPT_ATTR } from "@/features/vendors/w9File";
import { apiFetch } from "@/lib/api/apiFetch";

type W9Document = {
  id: string;
  name: string;
  filename: string;
  contentType: string;
  sizeBytes: number;
  year: number | null;
  createdAt: string;
};

type VendorW9DialogProps = {
  vendor: { id: string; name: string };
  bookId: string;
  onClose: () => void;
  /** Called after any change so the parent can refresh its W9 badges */
  onChanged: () => void;
};

/** Format a byte count into a human-readable size string */
function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Per-vendor W9 store. Lists, uploads, views, and deletes the W9 documents
 * linked to one vendor via the private document vault (category "w9"). Uploads
 * and downloads are proxied through the authed API (private bucket), so a W9
 * never transits a shareable URL. Deletion is confirm-gated.
 */
function VendorW9Dialog({
  vendor,
  bookId,
  onClose,
  onChanged,
}: VendorW9DialogProps) {
  const [documents, setDocuments] = useState<W9Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [viewingId, setViewingId] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<W9Document | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchDocuments = useCallback(async () => {
    setIsLoading(true);

    try {
      const res = await apiFetch(
        `/api/documents?bookId=${bookId}&category=w9&vendorId=${vendor.id}`,
      );

      if (!res.ok) throw new Error(`Failed to load W9s (${res.status})`);

      const data = (await res.json()) as { documents: W9Document[] };
      setDocuments(data.documents ?? []);
    } catch {
      toast.error("Failed to load W9 documents");
    } finally {
      setIsLoading(false);
    }
  }, [bookId, vendor.id]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const uploadFile = useCallback(
    async (file: File) => {
      const check = validateW9File(file);
      if (!check.ok) {
        toast.error(check.error);
        return;
      }

      setIsUploading(true);

      try {
        const form = new FormData();
        form.append("file", file);
        form.append("bookId", bookId);
        form.append("category", "w9");
        form.append("vendorId", vendor.id);
        form.append("name", `W9 - ${vendor.name}`);

        const res = await apiFetch("/api/documents", {
          method: "POST",
          body: form,
        });

        if (!res.ok) {
          const body = (await res.json().catch(() => null)) as {
            error?: string;
          } | null;
          throw new Error(body?.error ?? "Failed to upload W9");
        }

        toast.success(`Uploaded ${file.name}`);
        await fetchDocuments();
        onChanged();
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Failed to upload W9");
      } finally {
        setIsUploading(false);
      }
    },
    [bookId, vendor.id, vendor.name, fetchDocuments, onChanged],
  );

  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) void uploadFile(file);
      if (fileInputRef.current) fileInputRef.current.value = "";
    },
    [uploadFile],
  );

  const handleView = useCallback(
    async (doc: W9Document) => {
      setViewingId(doc.id);
      try {
        const res = await apiFetch(
          `/api/documents/${doc.id}/download?bookId=${bookId}`,
        );

        if (!res.ok) throw new Error(`Failed to open W9 (${res.status})`);

        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank", "noopener,noreferrer");
        setTimeout(() => URL.revokeObjectURL(url), 60_000);
      } catch {
        toast.error("Failed to open W9");
      } finally {
        setViewingId(null);
      }
    },
    [bookId],
  );

  const handleDelete = useCallback(async () => {
    if (!pendingDelete) return;
    setIsDeleting(true);

    try {
      const res = await apiFetch(
        `/api/documents/${pendingDelete.id}?bookId=${bookId}`,
        { method: "DELETE" },
      );

      if (!res.ok) throw new Error(`Failed to delete (${res.status})`);

      toast.success("W9 deleted");
      setPendingDelete(null);
      await fetchDocuments();
      onChanged();
    } catch {
      toast.error("Failed to delete W9");
    } finally {
      setIsDeleting(false);
    }
  }, [pendingDelete, bookId, fetchDocuments, onChanged]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <button
        type="button"
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-label="Close dialog"
      />

      <div className="relative flex max-h-[85vh] w-full max-w-lg flex-col gap-4 overflow-y-auto rounded-lg border border-border bg-card p-6 shadow-lg">
        <div>
          <h2 className="font-semibold text-lg">W9 documents</h2>
          <p className="text-muted-foreground text-sm">
            Collected W9s for{" "}
            <span className="font-medium text-foreground">{vendor.name}</span>
          </p>
        </div>

        <label
          htmlFor={`w9-upload-${vendor.id}`}
          className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-md bg-primary px-3 py-1.5 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90"
        >
          {isUploading ? (
            <Loader2Icon className="size-4 animate-spin" />
          ) : (
            <UploadIcon className="size-4" />
          )}
          {isUploading ? "Uploading..." : "Upload W9"}
          <input
            ref={fileInputRef}
            id={`w9-upload-${vendor.id}`}
            type="file"
            accept={W9_ACCEPT_ATTR}
            className="sr-only"
            disabled={isUploading}
            onChange={handleFileChange}
          />
        </label>
        <p className="-mt-2 text-muted-foreground text-xs">
          PDF or image (JPEG, PNG, HEIC) up to 50 MB
        </p>

        {isLoading ? (
          <div className="flex items-center justify-center p-4">
            <Loader2Icon className="size-4 animate-spin text-muted-foreground" />
          </div>
        ) : documents.length === 0 ? (
          <p className="rounded-md border border-border border-dashed p-4 text-center text-muted-foreground text-sm">
            No W9 on file for this vendor yet.
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {documents.map((doc) => (
              <li
                key={doc.id}
                className="flex items-center gap-3 rounded-md border border-border bg-background p-3"
              >
                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate font-medium text-sm">
                    {doc.filename}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    {formatFileSize(doc.sizeBytes)}
                    {doc.year ? ` · ${doc.year}` : ""}
                  </span>
                </div>

                <div className="flex items-center gap-1">
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
                    aria-label={`Delete ${doc.filename}`}
                    className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-destructive text-xs transition-colors hover:bg-destructive/10"
                  >
                    <TrashIcon className="size-3" />
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-border px-4 py-2 text-sm transition-colors hover:bg-accent"
          >
            Close
          </button>
        </div>
      </div>

      <ConfirmDialog
        open={pendingDelete !== null}
        title="Delete W9?"
        description={
          pendingDelete
            ? `"${pendingDelete.filename}" will be permanently deleted. This cannot be undone.`
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

export default VendorW9Dialog;
