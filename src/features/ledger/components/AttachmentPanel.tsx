import {
  ExternalLinkIcon,
  Loader2Icon,
  PaperclipIcon,
  TrashIcon,
  UnlinkIcon,
  UploadIcon,
} from "lucide-react";
import type { ChangeEvent, DragEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { API_URL } from "@/lib/config/env.config";

type AttachmentPanelProps = {
  bookId: string;
  journalEntryId: string;
};

type Attachment = {
  id: string;
  filename: string;
  contentType: string;
  sizeBytes: number;
  uploadStatus: string;
  downloadUrl: string | null;
  journalEntryId: string | null;
  createdAt: string;
};

const ACCEPTED_TYPES = "image/jpeg,image/png,image/heic,application/pdf";
const ACCEPTED_TYPE_SET = new Set([
  "image/jpeg",
  "image/png",
  "image/heic",
  "application/pdf",
]);
const MAX_FILE_SIZE = 25 * 1024 * 1024;

/** Format a byte count into a human-readable size string */
function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024)
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}

/**
 * Panel for uploading, viewing, unlinking, and deleting attachments on a
 * journal entry via the presigned-URL flow
 */
function AttachmentPanel({ bookId, journalEntryId }: AttachmentPanelProps) {
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchAttachments = useCallback(async () => {
    setIsLoading(true);

    try {
      const res = await fetch(
        `${API_URL}/api/attachments?bookId=${bookId}&journalEntryId=${journalEntryId}`,
      );

      if (!res.ok) {
        throw new Error(`Failed to load attachments (${res.status})`);
      }

      const data = (await res.json()) as { attachments: Attachment[] };
      setAttachments(data.attachments ?? []);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load attachments";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }, [bookId, journalEntryId]);

  useEffect(() => {
    fetchAttachments();
  }, [fetchAttachments]);

  const uploadFile = useCallback(
    async (file: File) => {
      if (!ACCEPTED_TYPE_SET.has(file.type)) {
        toast.error("Unsupported file type (allowed: JPEG, PNG, HEIC, PDF)");
        return;
      }

      if (file.size <= 0 || file.size > MAX_FILE_SIZE) {
        toast.error("File size must be between 1 byte and 25 MB");
        return;
      }

      setIsUploading(true);

      try {
        // Request a presigned upload URL
        const presignRes = await fetch(`${API_URL}/api/attachments/presign`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            bookId,
            journalEntryId,
            filename: file.name,
            contentType: file.type,
            sizeBytes: file.size,
          }),
        });

        if (!presignRes.ok) {
          const body = (await presignRes.json().catch(() => null)) as {
            error?: string;
          } | null;
          throw new Error(body?.error ?? "Failed to presign upload");
        }

        const { attachment, uploadUrl } = (await presignRes.json()) as {
          attachment: Attachment;
          uploadUrl: string;
        };

        // Immediately surface the pending attachment in the list
        setAttachments((prev) => [...prev, attachment]);

        // Upload the raw bytes directly to storage
        const putRes = await fetch(uploadUrl, {
          method: "PUT",
          headers: { "Content-Type": file.type },
          body: file,
        });

        if (!putRes.ok) {
          throw new Error(`Storage upload failed (${putRes.status})`);
        }

        // Confirm the upload so the server marks the row complete
        const confirmRes = await fetch(
          `${API_URL}/api/attachments/${attachment.id}/confirm`,
          { method: "POST" },
        );

        if (!confirmRes.ok) {
          const body = (await confirmRes.json().catch(() => null)) as {
            error?: string;
          } | null;
          throw new Error(body?.error ?? "Failed to confirm upload");
        }

        toast.success(`Uploaded ${file.name}`);
        await fetchAttachments();
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to upload file";
        toast.error(message);
        // Refresh to drop any pending placeholder on failure
        await fetchAttachments();
      } finally {
        setIsUploading(false);
      }
    },
    [bookId, journalEntryId, fetchAttachments],
  );

  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        void uploadFile(file);
      }
      // Reset so selecting the same file twice re-triggers change
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [uploadFile],
  );

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer.files?.[0];
      if (file) {
        void uploadFile(file);
      }
    },
    [uploadFile],
  );

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleUnlink = useCallback(
    async (id: string) => {
      try {
        const res = await fetch(`${API_URL}/api/attachments/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ journalEntryId: null }),
        });

        if (!res.ok) {
          throw new Error(`Failed to unlink (${res.status})`);
        }

        toast.success("Attachment unlinked");
        await fetchAttachments();
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to unlink attachment";
        toast.error(message);
      }
    },
    [fetchAttachments],
  );

  const handleDelete = useCallback(
    async (id: string) => {
      try {
        const res = await fetch(`${API_URL}/api/attachments/${id}`, {
          method: "DELETE",
        });

        if (!res.ok) {
          throw new Error(`Failed to delete (${res.status})`);
        }

        toast.success("Attachment deleted");
        await fetchAttachments();
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to delete attachment";
        toast.error(message);
      }
    },
    [fetchAttachments],
  );

  return (
    <section className="flex flex-col gap-4 rounded-md border border-border bg-card p-4">
      <header className="flex items-center gap-2">
        <PaperclipIcon className="size-4 text-muted-foreground" />
        <h2 className="font-medium text-sm">Attachments</h2>
        <span className="text-muted-foreground text-xs">
          ({attachments.length})
        </span>
      </header>

      {/* Upload dropzone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`flex flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed p-6 text-center transition-colors ${
          isDragging
            ? "border-primary bg-primary/5"
            : "border-border bg-background"
        }`}
      >
        <UploadIcon className="size-5 text-muted-foreground" />
        <p className="text-muted-foreground text-sm">
          Drag and drop a file here, or
        </p>
        <label
          htmlFor={`attachment-upload-${journalEntryId}`}
          className="cursor-pointer rounded-md bg-primary px-3 py-1.5 font-medium text-primary-foreground text-xs transition-colors hover:bg-primary/90"
        >
          {isUploading ? "Uploading..." : "Choose file"}
          <input
            ref={fileInputRef}
            id={`attachment-upload-${journalEntryId}`}
            type="file"
            accept={ACCEPTED_TYPES}
            className="sr-only"
            disabled={isUploading}
            onChange={handleFileChange}
          />
        </label>
        <p className="text-muted-foreground text-xs">
          JPEG, PNG, HEIC, or PDF up to 25 MB
        </p>
      </div>

      {/* Attachment list */}
      {isLoading ? (
        <div className="flex items-center justify-center p-4">
          <Loader2Icon className="size-4 animate-spin text-muted-foreground" />
        </div>
      ) : attachments.length === 0 ? (
        <p className="p-2 text-center text-muted-foreground text-sm">
          No attachments yet
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {attachments.map((attachment) => {
            const isPending = attachment.uploadStatus !== "complete";

            return (
              <li
                key={attachment.id}
                className="flex items-center gap-3 rounded-md border border-border bg-background p-3"
              >
                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate font-medium text-sm">
                    {attachment.filename}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    {formatFileSize(attachment.sizeBytes)} ·{" "}
                    {attachment.contentType}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  {isPending || !attachment.downloadUrl ? (
                    <span className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-muted-foreground text-xs">
                      <Loader2Icon className="size-3 animate-spin" />
                      Uploading...
                    </span>
                  ) : (
                    <a
                      href={attachment.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs transition-colors hover:bg-accent"
                    >
                      <ExternalLinkIcon className="size-3" />
                      View
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => handleUnlink(attachment.id)}
                    aria-label={`Unlink ${attachment.filename}`}
                    className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs transition-colors hover:bg-accent"
                  >
                    <UnlinkIcon className="size-3" />
                    Unlink
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(attachment.id)}
                    aria-label={`Delete ${attachment.filename}`}
                    className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-destructive text-xs transition-colors hover:bg-destructive/10"
                  >
                    <TrashIcon className="size-3" />
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

export default AttachmentPanel;
