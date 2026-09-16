import { createFileRoute } from "@tanstack/react-router";
import {
  AlertTriangleIcon,
  CheckCircle2Icon,
  InfoIcon,
  Loader2Icon,
  LockIcon,
  XCircleIcon,
} from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";

import ConfirmDialog from "@/components/ConfirmDialog";
import BookPicker from "@/features/books/components/BookPicker";
import { apiFetch } from "@/lib/api/apiFetch";
import useActiveBook from "@/lib/hooks/useActiveBook";

export const Route = createFileRoute("/_app/@{$workspaceSlug}/~/close/")({
  component: ClosePage,
});

type Severity = "error" | "warning" | "info";

type Finding = {
  code: string;
  severity: Severity;
  title: string;
  detail: string;
  count?: number;
};

type CloseReview = {
  year: number;
  month: number;
  readyToClose: boolean;
  errorCount: number;
  warningCount: number;
  findings: Finding[];
};

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const now = new Date();

const SEVERITY_META: Record<
  Severity,
  { icon: typeof InfoIcon; className: string; label: string }
> = {
  error: {
    icon: XCircleIcon,
    className: "text-destructive",
    label: "Must fix",
  },
  warning: {
    icon: AlertTriangleIcon,
    className: "text-amber-600 dark:text-amber-400",
    label: "Review",
  },
  info: { icon: InfoIcon, className: "text-muted-foreground", label: "Note" },
};

function ClosePage() {
  const {
    activeBookId,
    books,
    isLoading: booksLoading,
    setActiveBookId,
  } = useActiveBook();

  const [year, setYear] = useState(now.getUTCFullYear());
  // Default to the previous month, the one you would typically be closing
  const [month, setMonth] = useState(
    now.getUTCMonth() === 0 ? 12 : now.getUTCMonth(),
  );
  const [review, setReview] = useState<CloseReview | null>(null);
  const [loading, setLoading] = useState(false);
  const [closing, setClosing] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const runReview = useCallback(async () => {
    if (!activeBookId) return;
    setLoading(true);
    setReview(null);
    try {
      const res = await apiFetch(
        `/api/close/review?bookId=${activeBookId}&year=${year}&month=${month}`,
      );
      if (!res.ok) throw new Error(`Review failed (${res.status})`);
      setReview(await res.json());
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to run review");
    } finally {
      setLoading(false);
    }
  }, [activeBookId, year, month]);

  const closePeriod = useCallback(async () => {
    if (!activeBookId) return;
    setClosing(true);
    try {
      const res = await apiFetch("/api/periods/close", {
        method: "POST",
        body: JSON.stringify({ bookId: activeBookId, year, month }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(body?.error ?? `Close failed (${res.status})`);
      }
      toast.success(`Closed ${MONTHS[month - 1]} ${year}`);
      setConfirmOpen(false);
      await runReview();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to close period",
      );
    } finally {
      setClosing(false);
    }
  }, [activeBookId, year, month, runReview]);

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-semibold text-xl">Month-End Close</h1>
          <p className="text-muted-foreground text-sm">
            Run the automated review, then lock the period once it is clean
          </p>
        </div>
        <BookPicker
          books={books}
          selectedBookId={activeBookId}
          onSelect={setActiveBookId}
        />
      </div>

      {/* Period selector */}
      <div className="flex flex-wrap items-end gap-3 rounded-lg border border-border bg-card p-4">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="close-month"
            className="text-muted-foreground text-xs"
          >
            Month
          </label>
          <select
            id="close-month"
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm"
          >
            {MONTHS.map((m, i) => (
              <option key={m} value={i + 1}>
                {m}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="close-year" className="text-muted-foreground text-xs">
            Year
          </label>
          <input
            id="close-year"
            type="number"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="w-28 rounded-md border border-border bg-background px-3 py-2 text-sm"
          />
        </div>
        <button
          type="button"
          onClick={runReview}
          disabled={!activeBookId || loading || booksLoading}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90 disabled:opacity-50"
        >
          {loading ? <Loader2Icon className="size-4 animate-spin" /> : null}
          Run review
        </button>
      </div>

      {review && (
        <>
          {/* Readiness banner */}
          <div
            className={`flex flex-wrap items-center justify-between gap-3 rounded-lg border p-4 ${
              review.readyToClose
                ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20"
                : "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20"
            }`}
          >
            <div className="flex items-center gap-2">
              {review.readyToClose ? (
                <CheckCircle2Icon className="size-5 text-green-600 dark:text-green-400" />
              ) : (
                <XCircleIcon className="size-5 text-destructive" />
              )}
              <span className="font-semibold">
                {review.readyToClose
                  ? "Ready to close"
                  : `${review.errorCount} issue${review.errorCount === 1 ? "" : "s"} must be fixed before closing`}
              </span>
              {review.warningCount > 0 && (
                <span className="text-muted-foreground text-sm">
                  · {review.warningCount} to review
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={() => setConfirmOpen(true)}
              disabled={!review.readyToClose || closing}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90 disabled:opacity-50"
            >
              <LockIcon className="size-4" />
              Close {MONTHS[month - 1]} {year}
            </button>
          </div>

          {/* Findings */}
          {review.findings.length === 0 ? (
            <p className="rounded-lg border border-border bg-card p-6 text-center text-muted-foreground text-sm">
              No issues found. The books look clean for this period.
            </p>
          ) : (
            <ul className="flex flex-col gap-2">
              {review.findings.map((f, i) => {
                const meta = SEVERITY_META[f.severity];
                const Icon = meta.icon;
                return (
                  <li
                    key={`${f.code}-${i}`}
                    className="flex items-start gap-3 rounded-md border border-border bg-card p-3"
                  >
                    <Icon
                      className={`mt-0.5 size-4 shrink-0 ${meta.className}`}
                    />
                    <div className="flex flex-col">
                      <span className="font-medium text-sm">{f.title}</span>
                      <span className="text-muted-foreground text-sm">
                        {f.detail}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </>
      )}

      {!review && !loading && (
        <p className="rounded-lg border border-border bg-card p-6 text-center text-muted-foreground text-sm">
          Pick a period and run the review to see what a bookkeeper would check
          before closing.
        </p>
      )}

      <ConfirmDialog
        open={confirmOpen}
        title={`Close ${MONTHS[month - 1]} ${year}?`}
        description="Closing locks the period so entries can no longer be added or changed for it. You can reopen it later if needed."
        confirmLabel="Close period"
        loading={closing}
        onConfirm={closePeriod}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}
