import { ChevronDownIcon, ChevronRightIcon, Loader2Icon } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import type {
  ReconciliationLine,
  ReconciliationLinesResponse,
} from "@/features/quickbooks/types/reconciliation";
import { API_URL } from "@/lib/config/env.config";

type Props = {
  bookId: string;
  reconciliationId: string;
};

/** Whether a variance string represents a non-zero difference */
function hasVariance(variance: string): boolean {
  return Number(variance) !== 0;
}

/**
 * Expandable section listing per-account reconciliation lines, fetched lazily
 * when first expanded. Rows with a non-zero variance are highlighted
 */
function ReconciliationResults({ bookId, reconciliationId }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [lines, setLines] = useState<ReconciliationLine[]>([]);

  const fetchLines = useCallback(async () => {
    setLoading(true);

    try {
      const res = await fetch(
        `${API_URL}/api/quickbooks/reconciliation/${reconciliationId}/lines?bookId=${bookId}`,
      );

      if (!res.ok) throw new Error("failed to load reconciliation lines");

      const data: ReconciliationLinesResponse = await res.json();
      setLines(data.lines);
      setLoaded(true);
    } catch {
      toast.error("Failed to load reconciliation results");
    } finally {
      setLoading(false);
    }
  }, [bookId, reconciliationId]);

  const handleToggle = useCallback(() => {
    const next = !expanded;
    setExpanded(next);

    if (next && !loaded && !loading) {
      fetchLines();
    }
  }, [expanded, loaded, loading, fetchLines]);

  return (
    <div className="rounded-lg border border-border bg-card">
      <button
        type="button"
        onClick={handleToggle}
        aria-expanded={expanded}
        className="flex w-full items-center gap-2 px-4 py-3 text-left font-semibold text-sm transition-colors hover:bg-accent/50"
      >
        {expanded ? (
          <ChevronDownIcon className="size-4" />
        ) : (
          <ChevronRightIcon className="size-4" />
        )}
        Reconciliation results
      </button>

      {expanded && (
        <div className="border-border border-t">
          {loading && (
            <div className="flex items-center justify-center p-8">
              <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
            </div>
          )}

          {!loading && loaded && lines.length === 0 && (
            <p className="p-8 text-center text-muted-foreground text-sm">
              No reconciliation lines to show
            </p>
          )}

          {!loading && loaded && lines.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-border border-b text-left text-muted-foreground">
                    <th className="px-3 py-3 font-medium">Account</th>
                    <th className="px-3 py-3 text-right font-medium">
                      QBO balance
                    </th>
                    <th className="px-3 py-3 text-right font-medium">
                      MyFi balance
                    </th>
                    <th className="px-3 py-3 text-right font-medium">
                      Variance
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {lines.map((line) => {
                    const mismatch = hasVariance(line.variance);

                    return (
                      <tr
                        key={line.id}
                        className={`border-border border-b transition-colors hover:bg-accent/50 ${
                          mismatch
                            ? "border-l-2 border-l-red-400 dark:border-l-red-500"
                            : ""
                        }`}
                      >
                        <td className="px-3 py-3">{line.accountName}</td>
                        <td className="whitespace-nowrap px-3 py-3 text-right font-mono">
                          {line.qboBalance}
                        </td>
                        <td className="whitespace-nowrap px-3 py-3 text-right font-mono">
                          {line.myfiBalance}
                        </td>
                        <td
                          className={`whitespace-nowrap px-3 py-3 text-right font-mono ${
                            mismatch
                              ? "font-medium text-red-600 dark:text-red-400"
                              : "text-muted-foreground"
                          }`}
                        >
                          {line.variance}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ReconciliationResults;
