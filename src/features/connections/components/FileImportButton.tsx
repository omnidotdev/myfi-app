import { UploadIcon } from "lucide-react";
import { useCallback, useRef, useState } from "react";

import { API_URL } from "@/lib/config/env.config";

type Props = {
  bookId: string;
  onSuccess: (result: {
    addedCount: number;
    skippedCount: number;
    totalParsed: number;
    format: string;
  }) => void;
};

function FileImportButton({ bookId, onSuccess }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setIsUploading(true);
      setError(null);

      try {
        const formData = new FormData();
        formData.append("bookId", bookId);
        formData.append("file", file);

        const res = await fetch(`${API_URL}/api/import/file`, {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error ?? "Import failed");
        }

        onSuccess(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Import failed");
      } finally {
        setIsUploading(false);
        // Reset file input so the same file can be re-selected
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    },
    [bookId, onSuccess],
  );

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv,.ofx,.qfx"
        onChange={handleFileChange}
        className="hidden"
        aria-label="Import bank transactions file"
      />

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading || !bookId}
        className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2 font-medium text-sm transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
      >
        <UploadIcon className="size-4" />
        {isUploading ? "Importing..." : "Import File"}
      </button>

      {error && <p className="mt-2 text-destructive text-sm">{error}</p>}
    </div>
  );
}

export default FileImportButton;
