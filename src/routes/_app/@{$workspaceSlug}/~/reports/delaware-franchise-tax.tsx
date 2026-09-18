import { createFileRoute } from "@tanstack/react-router";
import { Loader2Icon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import BookPicker from "@/features/books/components/BookPicker";
import { apiFetch } from "@/lib/api/apiFetch";
import formatCurrency from "@/lib/format/currency";
import useActiveBook from "@/lib/hooks/useActiveBook";

export const Route = createFileRoute(
  "/_app/@{$workspaceSlug}/~/reports/delaware-franchise-tax",
)({
  component: DelawareFranchiseTaxPage,
});

type DelawareFranchiseTaxResult = {
  authorizedSharesMethod: { tax: number };
  assumedParValueCapitalMethod: {
    assumedParPerShare: number;
    assumedParValueCapital: number;
    tax: number;
  };
  recommendedMethod: "authorized_shares" | "assumed_par_value_capital";
  franchiseTax: number;
  annualReportFee: number;
  totalDue: number;
};

function DelawareFranchiseTaxPage() {
  const {
    activeBookId,
    books,
    isLoading: booksLoading,
    setActiveBookId,
  } = useActiveBook();

  const [authorizedShares, setAuthorizedShares] = useState(10_000_000);
  const [issuedShares, setIssuedShares] = useState(0);
  const [totalGrossAssets, setTotalGrossAssets] = useState(0);
  const [parValuePerShare, setParValuePerShare] = useState(0.0001);
  const [data, setData] = useState<DelawareFranchiseTaxResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Pre-fill total gross assets from the current balance sheet (total assets),
  // leaving the field editable so the user can match their federal Schedule L.
  useEffect(() => {
    if (!activeBookId) return;
    let cancelled = false;
    (async () => {
      try {
        const params = new URLSearchParams({ bookId: activeBookId });
        const res = await apiFetch(
          `/api/reports/balance-sheet?${params.toString()}`,
        );
        if (!res.ok) return;
        const sheet = await res.json();
        const assets = Number.parseFloat(sheet?.totalAssets ?? "0");
        if (!cancelled && Number.isFinite(assets) && assets > 0) {
          setTotalGrossAssets(Math.round(assets));
        }
      } catch {
        // pre-fill is best-effort; the user can enter assets manually
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [activeBookId]);

  const calculate = useCallback(async () => {
    if (!activeBookId) return;
    setIsLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        bookId: activeBookId,
        authorizedShares: String(authorizedShares),
        issuedShares: String(issuedShares),
        totalGrossAssets: String(totalGrossAssets),
        parValuePerShare: String(parValuePerShare),
      });
      const res = await apiFetch(
        `/api/tax/delaware-franchise-tax?${params.toString()}`,
      );
      if (!res.ok) throw new Error("Failed to calculate franchise tax");
      setData(await res.json());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to calculate");
    } finally {
      setIsLoading(false);
    }
  }, [
    activeBookId,
    authorizedShares,
    issuedShares,
    totalGrossAssets,
    parValuePerShare,
  ]);

  const loading = booksLoading || isLoading;
  const inputClass =
    "w-44 rounded-md border border-border bg-card px-3 py-1.5 text-sm";
  const recommendedIsAuthorized =
    data?.recommendedMethod === "authorized_shares";

  const methodCardClass = (isRecommended: boolean) =>
    `flex flex-col gap-2 rounded-lg border p-4 ${
      isRecommended
        ? "border-primary bg-primary/5"
        : "border-border bg-card opacity-80"
    }`;

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">Delaware Franchise Tax</h1>
          <p className="text-muted-foreground text-sm">
            Estimates your annual Delaware franchise tax using both the
            Authorized Shares and Assumed Par Value Capital methods, and
            recommends the lower one
          </p>
        </div>
        <BookPicker
          books={books}
          selectedBookId={activeBookId}
          onSelect={setActiveBookId}
        />
      </div>

      <div className="flex flex-wrap items-end gap-4">
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-muted-foreground">Authorized shares</span>
          <input
            type="number"
            min="0"
            value={authorizedShares}
            onChange={(e) =>
              setAuthorizedShares(Number.parseInt(e.target.value, 10) || 0)
            }
            className={inputClass}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-muted-foreground">Issued shares</span>
          <input
            type="number"
            min="0"
            value={issuedShares}
            onChange={(e) =>
              setIssuedShares(Number.parseInt(e.target.value, 10) || 0)
            }
            className={inputClass}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-muted-foreground">Total gross assets ($)</span>
          <input
            type="number"
            min="0"
            step="1000"
            value={totalGrossAssets}
            onChange={(e) =>
              setTotalGrossAssets(Number.parseFloat(e.target.value) || 0)
            }
            className={inputClass}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-muted-foreground">Par value / share ($)</span>
          <input
            type="number"
            min="0"
            step="0.0001"
            value={parValuePerShare}
            onChange={(e) =>
              setParValuePerShare(Number.parseFloat(e.target.value) || 0)
            }
            className={inputClass}
          />
        </label>
        <button
          type="button"
          onClick={calculate}
          disabled={loading || !activeBookId}
          className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm disabled:opacity-50"
        >
          {loading && <Loader2Icon className="size-4 animate-spin" />}
          Calculate
        </button>
      </div>

      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive text-sm">
          {error}
        </div>
      )}

      {data && (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className={methodCardClass(recommendedIsAuthorized)}>
              <div className="flex items-center justify-between">
                <span className="font-medium">Authorized Shares Method</span>
                {recommendedIsAuthorized && (
                  <span className="rounded-full bg-primary/15 px-2 py-0.5 text-primary text-xs">
                    Recommended
                  </span>
                )}
              </div>
              <span className="font-bold text-2xl">
                {formatCurrency(data.authorizedSharesMethod.tax)}
              </span>
            </div>
            <div className={methodCardClass(!recommendedIsAuthorized)}>
              <div className="flex items-center justify-between">
                <span className="font-medium">
                  Assumed Par Value Capital Method
                </span>
                {!recommendedIsAuthorized && (
                  <span className="rounded-full bg-primary/15 px-2 py-0.5 text-primary text-xs">
                    Recommended
                  </span>
                )}
              </div>
              <span className="font-bold text-2xl">
                {formatCurrency(data.assumedParValueCapitalMethod.tax)}
              </span>
              <span className="text-muted-foreground text-xs">
                Assumed par{" "}
                {formatCurrency(
                  data.assumedParValueCapitalMethod.assumedParPerShare,
                )}
                /share · capital{" "}
                {formatCurrency(
                  data.assumedParValueCapitalMethod.assumedParValueCapital,
                )}
              </span>
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg border border-border bg-card">
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-border/50 border-b">
                  <td className="px-4 py-3 text-muted-foreground">
                    Franchise tax (lower method)
                  </td>
                  <td className="px-4 py-3 text-right font-medium">
                    {formatCurrency(data.franchiseTax)}
                  </td>
                </tr>
                <tr className="border-border/50 border-b">
                  <td className="px-4 py-3 text-muted-foreground">
                    Annual report fee
                  </td>
                  <td className="px-4 py-3 text-right font-medium">
                    {formatCurrency(data.annualReportFee)}
                  </td>
                </tr>
                <tr className="border-border border-t-2 font-medium">
                  <td className="px-4 py-3">Total due</td>
                  <td className="px-4 py-3 text-right text-lg">
                    {formatCurrency(data.totalDue)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-muted-foreground text-xs">
            An estimate for domestic corporations, not tax advice. Large
            corporate filers and multiple share classes with differing par
            values are handled specially by Delaware; confirm with the Division
            of Corporations before filing.
          </p>
        </>
      )}
    </div>
  );
}
