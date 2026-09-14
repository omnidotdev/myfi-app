import { CheckCircle2Icon, Loader2Icon, UploadIcon } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import ConfirmDialog from "@/components/ConfirmDialog";
import { apiFetch } from "@/lib/api/apiFetch";

type MyfiAccount = { id: string; name: string; code?: string | null };

type CreateAccount = {
  name: string;
  accountNum?: string;
  debit: number;
  credit: number;
  type: string;
};

type Preview = {
  asOf: string | null;
  accountCount: number;
  balances: boolean;
  matched: { name: string; debit: number; credit: number }[];
  toCreate: CreateAccount[];
};

type ImportResult = {
  imported: number;
  created: number;
  replaced: boolean;
  asOf: string;
};

type Props = { bookId: string };

/** Convert a QuickBooks "As of" date (e.g. "Sep 13, 2026") to YYYY-MM-DD */
const toIsoDate = (text: string | null): string => {
  if (!text) return "";
  const parsed = new Date(text);
  if (Number.isNaN(parsed.getTime())) return "";
  return parsed.toISOString().slice(0, 10);
};

/**
 * File-based QuickBooks migration: upload a Trial Balance CSV, review the
 * balances (accounts matched to the chart, plus any that will be created to
 * mirror QuickBooks), confirm the as-of date, and import the opening balances.
 * Re-running replaces the prior opening-balance entry, so re-importing to stay
 * in parity never duplicates.
 */
function OpeningBalanceImport({ bookId }: Props) {
  const [accounts, setAccounts] = useState<MyfiAccount[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<Preview | null>(null);
  // Optional overrides: map a to-create account onto an existing MyFi account
  const [mappings, setMappings] = useState<Record<string, string>>({});
  const [asOf, setAsOf] = useState("");
  const [previewing, setPreviewing] = useState(false);
  const [importing, setImporting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [result, setResult] = useState<ImportResult | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const dateValid = /^\d{4}-\d{2}-\d{2}$/.test(asOf);
  const canImport = !!file && !!preview && preview.balances && dateValid;

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
          QuickBooks (Reports {"->"} Trial Balance, on a Cash basis, as of the
          date your books are current through, save as CSV) and upload it here.
          MyFi imports it as your opening balances, creating any accounts it
          does not already have so your chart mirrors QuickBooks. Re-uploading a
          newer export replaces the prior balances, so you can re-import to stay
          in parity as your bookkeeping progresses.
        </p>
      </div>

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

      {result && (
        <div className="flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-900 dark:bg-green-950">
          <CheckCircle2Icon className="mt-0.5 size-5 text-green-600 dark:text-green-400" />
          <div className="text-sm">
            <p className="font-medium text-green-800 dark:text-green-300">
              Opening balances imported as of {result.asOf}
            </p>
            <p className="text-green-700 dark:text-green-400">
              {result.imported} accounts posted
              {result.created > 0 ? `, ${result.created} created` : ""}
              {result.replaced ? " (replaced the previous import)" : ""}. Your
              books now match this trial balance as of that date.
            </p>
          </div>
        </div>
      )}

      {preview && !result && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-4 rounded-lg border border-border bg-card p-4">
            <div className="flex flex-col">
              <span className="text-muted-foreground text-xs">Accounts</span>
              <span className="font-medium">{preview.accountCount}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-muted-foreground text-xs">Matched</span>
              <span className="font-medium">{preview.matched.length}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-muted-foreground text-xs">To create</span>
              <span className="font-medium">{preview.toCreate.length}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-muted-foreground text-xs">Balances</span>
              <span
                className={`font-medium ${preview.balances ? "text-green-600" : "text-destructive"}`}
              >
                {preview.balances ? "Yes" : "No"}
              </span>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="as-of-date"
                className="text-muted-foreground text-xs"
              >
                As-of date
              </label>
              <input
                id="as-of-date"
                type="date"
                value={asOf}
                onChange={(e) => setAsOf(e.target.value)}
                className="rounded-md border border-border bg-background px-2 py-1 text-sm"
              />
            </div>
          </div>

          {preview.toCreate.length > 0 && (
            <div className="flex flex-col gap-2 rounded-lg border border-border bg-card p-4">
              <span className="font-medium text-sm">
                {preview.toCreate.length} account
                {preview.toCreate.length === 1 ? "" : "s"} will be created to
                mirror QuickBooks
              </span>
              <p className="text-muted-foreground text-xs">
                MyFi guesses each type from the account number; you can change
                it later, or map one onto an existing MyFi account instead.
              </p>

              <div className="mt-2 flex flex-col gap-2">
                {preview.toCreate.map((a) => (
                  <div
                    key={a.name}
                    className="flex flex-wrap items-center gap-2 text-sm"
                  >
                    <span className="min-w-40 flex-1 truncate">
                      {a.accountNum ? `${a.accountNum} ` : ""}
                      {a.name}
                    </span>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-muted-foreground text-xs capitalize">
                      {a.type}
                    </span>
                    <select
                      value={mappings[a.name] ?? ""}
                      onChange={(e) =>
                        setMappings((m) => {
                          const next = { ...m };
                          if (e.target.value) next[a.name] = e.target.value;
                          else delete next[a.name];
                          return next;
                        })
                      }
                      className="rounded-md border border-border bg-background px-2 py-1 text-sm"
                    >
                      <option value="">Create new</option>
                      {accounts.map((existing) => (
                        <option key={existing.id} value={existing.id}>
                          Map to: {existing.code ? `${existing.code} ` : ""}
                          {existing.name}
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
        description={`This sets the opening balances as of ${asOf} and replaces any imported before. Safe to re-run as your books update. Continue?`}
        confirmLabel="Import"
        loading={importing}
        onConfirm={runImport}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}

export default OpeningBalanceImport;
