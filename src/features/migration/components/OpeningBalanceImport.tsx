import {
  AlertTriangleIcon,
  CheckCircle2Icon,
  Loader2Icon,
  UploadIcon,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import ConfirmDialog from "@/components/ConfirmDialog";
import { apiFetch } from "@/lib/api/apiFetch";

type MyfiAccount = { id: string; name: string; code?: string | null };

type UnmatchedAccount = {
  name: string;
  accountNum?: string;
  debit: number;
  credit: number;
};

type Preview = {
  asOf: string | null;
  accountCount: number;
  balances: boolean;
  matched: { name: string; debit: number; credit: number }[];
  unmatched: UnmatchedAccount[];
};

type ImportResult = { imported: number; replaced: boolean; asOf: string };

type Props = { bookId: string };

/** Convert a QuickBooks "As of" date (e.g. "August 31, 2026") to YYYY-MM-DD */
const toIsoDate = (text: string | null): string => {
  if (!text) return "";
  const parsed = new Date(text);
  if (Number.isNaN(parsed.getTime())) return "";
  return parsed.toISOString().slice(0, 10);
};

/**
 * File-based QuickBooks migration: upload a Trial Balance CSV, review the
 * auto-matched accounts (resolving any the matcher could not place), confirm the
 * cutover date, and import the opening balances. Re-running replaces the prior
 * opening-balance entry, so a slipped cutover date never duplicates.
 */
function OpeningBalanceImport({ bookId }: Props) {
  const [accounts, setAccounts] = useState<MyfiAccount[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<Preview | null>(null);
  const [mappings, setMappings] = useState<Record<string, string>>({});
  const [asOf, setAsOf] = useState("");
  const [previewing, setPreviewing] = useState(false);
  const [importing, setImporting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [result, setResult] = useState<ImportResult | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load the book's chart so unmatched accounts can be mapped to a MyFi account
  useEffect(() => {
    apiFetch(`/api/accounts?bookId=${bookId}`)
      .then((r) => r.json())
      .then((data) => {
        const rows = (data.accounts ?? []) as Record<string, unknown>[];
        setAccounts(
          rows.map((a) => ({
            id: a.id as string,
            name: a.name as string,
            code: (a.code as string | null) ?? null,
          })),
        );
      })
      .catch(() => {});
  }, [bookId]);

  const reset = useCallback(() => {
    setPreview(null);
    setMappings({});
    setAsOf("");
    setResult(null);
  }, []);

  const runPreview = useCallback(
    async (selected: File) => {
      setPreviewing(true);
      reset();

      try {
        const form = new FormData();
        form.append("bookId", bookId);
        form.append("file", selected);

        const res = await apiFetch("/api/migration/opening-balances/preview", {
          method: "POST",
          body: form,
        });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error ?? "Could not read the Trial Balance");
        }

        setPreview(data as Preview);
        setAsOf(toIsoDate((data as Preview).asOf));
      } catch (err) {
        toast.error(
          err instanceof Error
            ? err.message
            : "Could not read the Trial Balance",
        );
        setFile(null);
      } finally {
        setPreviewing(false);
      }
    },
    [bookId, reset],
  );

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    setFile(selected);
    if (selected) runPreview(selected);
  };

  const allResolved =
    !!preview && preview.unmatched.every((u) => mappings[u.name]);
  const dateValid = /^\d{4}-\d{2}-\d{2}$/.test(asOf);
  const canImport = !!file && !!preview && allResolved && dateValid;

  const runImport = useCallback(async () => {
    if (!file) return;

    setImporting(true);

    try {
      const form = new FormData();
      form.append("bookId", bookId);
      form.append("file", file);
      form.append("asOf", asOf);
      if (Object.keys(mappings).length > 0) {
        form.append("mappings", JSON.stringify(mappings));
      }

      const res = await apiFetch("/api/migration/opening-balances", {
        method: "POST",
        body: form,
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Import failed");
      }

      setResult(data as ImportResult);
      setConfirmOpen(false);
      toast.success("Opening balances imported");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Import failed");
    } finally {
      setImporting(false);
    }
  }, [bookId, file, asOf, mappings]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-semibold text-lg">Migrate from QuickBooks</h2>
        <p className="text-muted-foreground text-sm">
          Export your <span className="font-medium">Trial Balance</span> from
          QuickBooks (Reports {"->"} Trial Balance, as of your cutover date,
          save as CSV) and upload it here. MyFi imports it as your opening
          balances. Re-uploading a newer export replaces the prior opening
          balances, so a shifting cutover date never double-counts.
        </p>
      </div>

      {/* Upload */}
      <div>
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv,text/csv"
          onChange={handleFile}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={previewing}
          className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 font-medium text-sm transition-colors hover:bg-accent disabled:opacity-50"
        >
          {previewing ? (
            <Loader2Icon className="size-4 animate-spin" />
          ) : (
            <UploadIcon className="size-4" />
          )}
          {file ? file.name : "Choose Trial Balance CSV"}
        </button>
      </div>

      {/* Result */}
      {result && (
        <div className="flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-900 dark:bg-green-950">
          <CheckCircle2Icon className="mt-0.5 size-5 text-green-600 dark:text-green-400" />
          <div className="text-sm">
            <p className="font-medium text-green-800 dark:text-green-300">
              Opening balances imported as of {result.asOf}
            </p>
            <p className="text-green-700 dark:text-green-400">
              {result.imported} accounts posted
              {result.replaced
                ? " (replaced the previous opening balances)"
                : ""}
              . Your books tie out to this trial balance as of the cutover date.
            </p>
          </div>
        </div>
      )}

      {/* Preview + resolve */}
      {preview && !result && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-4 rounded-lg border border-border bg-card p-4">
            <div className="flex flex-col">
              <span className="text-muted-foreground text-xs">Accounts</span>
              <span className="font-medium">{preview.accountCount}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-muted-foreground text-xs">Balances</span>
              <span
                className={`font-medium ${preview.balances ? "text-green-600" : "text-destructive"}`}
              >
                {preview.balances ? "Yes" : "No — not a balanced trial balance"}
              </span>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="cutover-date"
                className="text-muted-foreground text-xs"
              >
                Cutover date
              </label>
              <input
                id="cutover-date"
                type="date"
                value={asOf}
                onChange={(e) => setAsOf(e.target.value)}
                className="rounded-md border border-border bg-background px-2 py-1 text-sm"
              />
            </div>
          </div>

          {preview.unmatched.length > 0 && (
            <div className="flex flex-col gap-2 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950">
              <div className="flex items-center gap-2">
                <AlertTriangleIcon className="size-4 text-amber-600 dark:text-amber-400" />
                <span className="font-medium text-amber-800 text-sm dark:text-amber-300">
                  {preview.unmatched.length} account
                  {preview.unmatched.length === 1 ? "" : "s"} need mapping
                </span>
              </div>
              <p className="text-amber-700 text-xs dark:text-amber-400">
                Pick the MyFi account each QuickBooks account maps to.
              </p>

              <div className="mt-2 flex flex-col gap-2">
                {preview.unmatched.map((u) => (
                  <div
                    key={u.name}
                    className="flex flex-wrap items-center gap-2 text-sm"
                  >
                    <span className="min-w-40 flex-1 truncate">
                      {u.accountNum ? `${u.accountNum} ` : ""}
                      {u.name}
                    </span>
                    <select
                      value={mappings[u.name] ?? ""}
                      onChange={(e) =>
                        setMappings((m) => ({ ...m, [u.name]: e.target.value }))
                      }
                      className="rounded-md border border-border bg-background px-2 py-1 text-sm"
                    >
                      <option value="">Select MyFi account…</option>
                      {accounts.map((a) => (
                        <option key={a.id} value={a.id}>
                          {a.code ? `${a.code} ` : ""}
                          {a.name}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <button
              type="button"
              onClick={() => setConfirmOpen(true)}
              disabled={!canImport}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
            >
              Import opening balances
            </button>
            {!preview.balances && (
              <p className="mt-2 text-destructive text-xs">
                This file does not balance, re-export a Trial Balance (not
                another report) and try again.
              </p>
            )}
          </div>
        </div>
      )}

      <ConfirmDialog
        open={confirmOpen}
        title="Import opening balances"
        description={`This sets the opening balances as of ${asOf} and replaces any opening balances imported before. Continue?`}
        confirmLabel="Import"
        loading={importing}
        onConfirm={runImport}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}

export default OpeningBalanceImport;
