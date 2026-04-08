import { UploadIcon } from "lucide-react";
import { useCallback, useRef, useState } from "react";

import ImportPreviewDialog from "./ImportPreviewDialog";

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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setSelectedFile(file);

      // Reset so same file can be re-selected
      if (fileInputRef.current) fileInputRef.current.value = "";
    },
    [],
  );

  const handleConfirm = useCallback(
    (result: {
      addedCount: number;
      skippedCount: number;
      totalParsed: number;
      format: string;
    }) => {
      setSelectedFile(null);
      onSuccess(result);
    },
    [onSuccess],
  );

  const handleCancel = useCallback(() => {
    setSelectedFile(null);
  }, []);

  return (
    <>
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
        disabled={!bookId}
        className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2 font-medium text-sm transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
      >
        <UploadIcon className="size-4" />
        Import File
      </button>

      {selectedFile && (
        <ImportPreviewDialog
          file={selectedFile}
          bookId={bookId}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </>
  );
}

export default FileImportButton;
