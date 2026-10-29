import { createFileRoute } from "@tanstack/react-router";
import { DownloadIcon, Loader2Icon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import BookPicker from "@/features/books/components/BookPicker";
import { apiFetch } from "@/lib/api/apiFetch";
import useActiveBook from "@/lib/hooks/useActiveBook";

export const Route = createFileRoute("/_app/@{$workspaceSlug}/~/settings/data")(
  {
    component: DataSettingsPage,
  },
);

// Pull the filename out of a Content-Disposition header, if present
const filenameFromDisposition = (header: string | null): string | null => {
  if (!header) return null;
  const match = /filename="?([^"]+)"?/i.exec(header);
  return match?.[1] ?? null;
};

function DataSettingsPage() {
  const {
    activeBook,
    activeBookId,
    books,
    isLoading: booksLoading,
    setActiveBookId,
  } = useActiveBook();

  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    if (!activeBookId) return;
    setExporting(true);
    try {
      const res = await apiFetch(`/api/books/${activeBookId}/export`);
      if (res.status === 403) {
        toast.error("Only a workspace owner can export this book's data");
        return;
      }
      if (!res.ok) throw new Error("Export failed");

      const blob = await res.blob();
      const fallback = `${activeBook?.name ?? "book"}-${new Date()
        .toISOString()
        .slice(0, 10)}.json`;
      const filename =
        filenameFromDisposition(res.headers.get("Content-Disposition")) ??
        fallback;

      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = filename;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(url);
      toast.success("Export downloaded");
    } catch (err) {
      console.error("Failed to export book", err);
      toast.error("Couldn't export your data. Please try again.");
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">Data & Privacy</h1>
          <p className="text-muted-foreground text-sm">
            Download a full copy of your workspace data
          </p>
        </div>
        <BookPicker
          books={books}
          selectedBookId={activeBookId}
          onSelect={setActiveBookId}
        />
      </div>

      <div className="flex flex-col gap-3 rounded-lg border border-border bg-card p-6">
        <div>
          <h2 className="font-semibold text-sm">Export all data (JSON)</h2>
          <p className="text-muted-foreground text-sm">
            Export every record in the selected book as a single JSON file for
            backup or portability. Available to workspace owners.
          </p>
        </div>
        <button
          type="button"
          onClick={handleExport}
          disabled={exporting || booksLoading || !activeBookId}
          className="inline-flex w-fit items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
        >
          {exporting ? (
            <Loader2Icon className="size-4 animate-spin" />
          ) : (
            <DownloadIcon className="size-4" />
          )}
          Export all data (JSON)
        </button>
      </div>
    </div>
  );
}
