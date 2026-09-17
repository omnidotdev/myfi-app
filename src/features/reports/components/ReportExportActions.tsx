import { DownloadIcon, Loader2Icon, PrinterIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api/apiFetch";

type ExportFormat = "pdf" | "xlsx" | "csv";

const FORMAT_LABEL: Record<ExportFormat, string> = {
  pdf: "PDF",
  xlsx: "Excel",
  csv: "CSV",
};

const EXTENSION: Record<ExportFormat, string> = {
  pdf: "pdf",
  xlsx: "xlsx",
  csv: "csv",
};

type QueryValue = string | string[] | undefined | null;

type ReportExportActionsProps = {
  /** Report type understood by /api/reports/export (e.g. "profit-and-loss") */
  reportType: string;
  /** Base filename without extension (e.g. "profit-and-loss") */
  filename: string;
  /** Book id; export is disabled until present */
  bookId: string | null | undefined;
  /** Report-specific query params (dates, asOfDate, year, accountId, tagIds, ...) */
  query?: Record<string, QueryValue>;
  /** Disable all actions (e.g. while the report has no data) */
  disabled?: boolean;
  /** Formats to offer; defaults to PDF, Excel, CSV */
  formats?: ExportFormat[];
  /** Show the Print button */
  showPrint?: boolean;
};

/**
 * Shared export actions for report pages: Print plus one download button per
 * format. Downloads stream the file from /api/reports/export and save it with
 * the right extension, so PDF and Excel come straight from the server
 */
function ReportExportActions({
  reportType,
  filename,
  bookId,
  query = {},
  disabled = false,
  formats = ["pdf", "xlsx", "csv"],
  showPrint = true,
}: ReportExportActionsProps) {
  const [busy, setBusy] = useState<ExportFormat | null>(null);

  const download = async (format: ExportFormat) => {
    if (!bookId) return;
    setBusy(format);
    try {
      const sp = new URLSearchParams();
      sp.set("type", reportType);
      sp.set("format", format);
      sp.set("bookId", bookId);
      for (const [key, value] of Object.entries(query)) {
        if (value == null) continue;
        const v = Array.isArray(value) ? value.join(",") : value;
        if (v !== "") sp.set(key, v);
      }

      const res = await apiFetch(`/api/reports/export?${sp.toString()}`);
      if (!res.ok) throw new Error("Export failed");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${filename}.${EXTENSION[format]}`;
      link.click();
      URL.revokeObjectURL(url);
    } catch {
      toast.error(`Could not export ${FORMAT_LABEL[format]}`);
    } finally {
      setBusy(null);
    }
  };

  const btnClass =
    "inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm transition-colors hover:bg-muted disabled:opacity-50";

  return (
    <div className="flex flex-wrap gap-2">
      {showPrint && (
        <button
          type="button"
          onClick={() => window.print()}
          disabled={disabled}
          className={btnClass}
        >
          <PrinterIcon className="size-4" />
          Print
        </button>
      )}
      {formats.map((format) => (
        <button
          key={format}
          type="button"
          onClick={() => download(format)}
          disabled={disabled || !bookId || busy !== null}
          className={btnClass}
        >
          {busy === format ? (
            <Loader2Icon className="size-4 animate-spin" />
          ) : (
            <DownloadIcon className="size-4" />
          )}
          {FORMAT_LABEL[format]}
        </button>
      ))}
    </div>
  );
}

export default ReportExportActions;
