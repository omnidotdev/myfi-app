import { Loader2Icon, SaveIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { API_URL } from "@/lib/config/env.config";

type CsvColumnMap = {
  date: number;
  amount: number;
  memo: number;
  debit?: number;
  credit?: number;
};

type ImportProfile = {
  id: string;
  name: string;
  columnMap: CsvColumnMap;
  headerRows: string;
};

type CsvPreview = {
  format: "csv";
  headers: string[];
  sampleRows: string[][];
  totalRows: number;
  columnMap: CsvColumnMap | null;
  autoDetected: boolean;
};

type OfxPreview = {
  format: "ofx";
  transactions: {
    date: string;
    amount: number;
    memo: string;
    merchantName?: string | null;
    referenceId?: string | null;
  }[];
  totalRows: number;
};

type PreviewData = CsvPreview | OfxPreview;

type Props = {
  file: File;
  bookId: string;
  onConfirm: (result: {
    addedCount: number;
    skippedCount: number;
    totalParsed: number;
    format: string;
  }) => void;
  onCancel: () => void;
};

const COLUMN_ROLES = [
  { value: "", label: "Skip" },
  { value: "date", label: "Date" },
  { value: "memo", label: "Description" },
  { value: "amount", label: "Amount" },
  { value: "debit", label: "Debit" },
  { value: "credit", label: "Credit" },
] as const;

function ImportPreviewDialog({ file, bookId, onConfirm, onCancel }: Props) {
  const [preview, setPreview] = useState<PreviewData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isImporting, setIsImporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // CSV-specific state
  const [columnMap, setColumnMap] = useState<CsvColumnMap | null>(null);
  const [profiles, setProfiles] = useState<ImportProfile[]>([]);
  const [profileName, setProfileName] = useState("");
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // Fetch preview on mount
  useEffect(() => {
    const fetchPreview = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch(`${API_URL}/api/import/preview`, {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error ?? "Failed to preview file");
        }

        setPreview(data);

        if (data.format === "csv" && data.columnMap) {
          setColumnMap(data.columnMap);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Preview failed");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPreview();
  }, [file]);

  // Fetch saved profiles
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await fetch(
          `${API_URL}/api/import/profiles?bookId=${bookId}`,
        );
        const data = await res.json();

        setProfiles(data.profiles ?? []);
      } catch {
        // Non-critical
      }
    };

    fetchProfiles();
  }, [bookId]);

  const handleColumnChange = useCallback(
    (colIndex: number, role: string) => {
      if (!preview || preview.format !== "csv") return;

      const newMap = { ...columnMap } as Record<string, number>;

      // Remove this column from any existing role
      for (const key of Object.keys(newMap)) {
        if (newMap[key] === colIndex) {
          delete newMap[key];
        }
      }

      // Assign new role
      if (role) {
        newMap[role] = colIndex;
      }

      // Build a valid CsvColumnMap if we have the minimum required fields
      if ("date" in newMap && "memo" in newMap) {
        if ("amount" in newMap || "debit" in newMap || "credit" in newMap) {
          setColumnMap({
            date: newMap.date,
            memo: newMap.memo,
            amount: newMap.amount ?? -1,
            ...(newMap.debit !== undefined ? { debit: newMap.debit } : {}),
            ...(newMap.credit !== undefined ? { credit: newMap.credit } : {}),
          });
          return;
        }
      }

      setColumnMap(null);
    },
    [preview, columnMap],
  );

  const handleApplyProfile = useCallback((profile: ImportProfile) => {
    setColumnMap(profile.columnMap);
  }, []);

  const handleSaveProfile = useCallback(async () => {
    if (!profileName.trim() || !columnMap) return;

    setIsSavingProfile(true);

    try {
      const res = await fetch(`${API_URL}/api/import/profiles`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookId,
          name: profileName.trim(),
          columnMap,
        }),
      });

      const data = await res.json();

      if (data.profile) {
        setProfiles((prev) => [...prev, data.profile]);
        setProfileName("");
      }
    } catch {
      // Non-critical
    } finally {
      setIsSavingProfile(false);
    }
  }, [bookId, profileName, columnMap]);

  const handleConfirm = useCallback(async () => {
    setIsImporting(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("bookId", bookId);
      formData.append("file", file);

      if (preview?.format === "csv" && columnMap) {
        formData.append("columnMap", JSON.stringify(columnMap));
      }

      const res = await fetch(`${API_URL}/api/import/file`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Import failed");
      }

      onConfirm(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Import failed");
      setIsImporting(false);
    }
  }, [bookId, file, preview, columnMap, onConfirm]);

  const getRoleForColumn = (colIndex: number): string => {
    if (!columnMap) return "";
    for (const [role, idx] of Object.entries(columnMap)) {
      if (idx === colIndex) return role;
    }
    return "";
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="rounded-lg bg-card p-8">
          <Loader2Icon className="size-6 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (error && !preview) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="flex w-full max-w-md flex-col gap-4 rounded-lg bg-card p-6">
          <p className="text-destructive text-sm">{error}</p>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-border px-4 py-2 text-sm hover:bg-accent"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="flex max-h-[80vh] w-full max-w-4xl flex-col gap-4 rounded-lg bg-card p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-lg">
            Import Preview ({preview?.format?.toUpperCase()})
          </h2>
          <span className="text-muted-foreground text-sm">
            {preview?.totalRows ?? 0} transactions
          </span>
        </div>

        {/* Saved profiles (CSV only) */}
        {preview?.format === "csv" && profiles.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-muted-foreground text-sm">Profiles:</span>
            {profiles.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => handleApplyProfile(p)}
                className="rounded-md border border-border px-2 py-1 text-xs hover:bg-accent"
              >
                {p.name}
              </button>
            ))}
          </div>
        )}

        {/* CSV preview table */}
        {preview?.format === "csv" && (
          <div className="overflow-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr>
                  {preview.headers.map((header, i) => (
                    <th
                      key={`h-${header}-${i}`}
                      className="border border-border bg-muted/50 p-2 text-left"
                    >
                      <div className="flex flex-col gap-1">
                        <span className="font-medium">{header}</span>
                        <select
                          value={getRoleForColumn(i)}
                          onChange={(e) =>
                            handleColumnChange(i, e.target.value)
                          }
                          className="rounded border border-border bg-background px-1 py-0.5 text-xs"
                        >
                          {COLUMN_ROLES.map((r) => (
                            <option key={r.value} value={r.value}>
                              {r.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {preview.sampleRows.map((row, i) => (
                  <tr key={`r-${i}`}>
                    {row.map((cell, j) => (
                      <td
                        key={`c-${i}-${j}`}
                        className="border border-border p-2"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* OFX preview table */}
        {preview?.format === "ofx" && (
          <div className="overflow-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr>
                  <th className="border border-border bg-muted/50 p-2 text-left">
                    Date
                  </th>
                  <th className="border border-border bg-muted/50 p-2 text-left">
                    Description
                  </th>
                  <th className="border border-border bg-muted/50 p-2 text-right">
                    Amount
                  </th>
                  <th className="border border-border bg-muted/50 p-2 text-left">
                    Ref
                  </th>
                </tr>
              </thead>
              <tbody>
                {preview.transactions.slice(0, 10).map((txn, i) => (
                  <tr key={`t-${i}`}>
                    <td className="border border-border p-2">
                      {new Date(txn.date).toLocaleDateString()}
                    </td>
                    <td className="border border-border p-2">
                      {txn.merchantName ?? txn.memo}
                    </td>
                    <td className="border border-border p-2 text-right">
                      ${Math.abs(txn.amount).toFixed(2)}
                    </td>
                    <td className="border border-border p-2 text-muted-foreground text-xs">
                      {txn.referenceId}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Save profile (CSV only) */}
        {preview?.format === "csv" && columnMap && (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
              placeholder="Save as profile (e.g. Chase Checking)"
              className="flex-1 rounded-md border border-border bg-background px-3 py-1.5 text-sm"
            />
            <button
              type="button"
              onClick={handleSaveProfile}
              disabled={!profileName.trim() || isSavingProfile}
              className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-sm hover:bg-accent disabled:opacity-50"
            >
              <SaveIcon className="size-3" />
              Save
            </button>
          </div>
        )}

        {/* Error */}
        {error && <p className="text-destructive text-sm">{error}</p>}

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isImporting}
            className="rounded-md border border-border px-4 py-2 text-sm hover:bg-accent disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={isImporting || (preview?.format === "csv" && !columnMap)}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm hover:bg-primary/90 disabled:opacity-50"
          >
            {isImporting && <Loader2Icon className="size-4 animate-spin" />}
            Import {preview?.totalRows ?? 0} Transactions
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImportPreviewDialog;
