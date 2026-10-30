import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeftIcon, Loader2Icon, PrinterIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import LoadError from "@/components/LoadError";
import { apiFetch } from "@/lib/api/apiFetch";
import formatCurrency from "@/lib/format/currency";
import useActiveBook from "@/lib/hooks/useActiveBook";

export const Route = createFileRoute(
  "/_app/@{$workspaceSlug}/~/estimates/$estimateId",
)({
  component: EstimateView,
});

interface Estimate {
  id: string;
  number: string;
  status: string;
  estimateDate: string;
  expiryDate: string | null;
  subtotal: string;
  total: string;
  memo: string | null;
  terms: string | null;
  customerId: string;
}

interface Line {
  id: string;
  description: string;
  quantity: string;
  unitPrice: string;
  amount: string;
}

interface Template {
  accentColor: string;
  footerText: string | null;
  terms: string | null;
  showLogo: boolean;
  isDefault: boolean;
}

function EstimateView() {
  const { estimateId, workspaceSlug } = Route.useParams();
  const { activeBook, activeBookId } = useActiveBook();

  const [estimate, setEstimate] = useState<Estimate | null>(null);
  const [lines, setLines] = useState<Line[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [template, setTemplate] = useState<Template | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const fetchData = useCallback(async () => {
    if (!activeBookId) return;
    setIsLoading(true);
    setLoadError(false);
    try {
      const [estRes, custRes, tplRes] = await Promise.all([
        apiFetch(`/api/estimates/${estimateId}?bookId=${activeBookId}`),
        apiFetch(`/api/customers?bookId=${activeBookId}`),
        apiFetch(
          `/api/form-templates?bookId=${activeBookId}&documentType=estimate`,
        ),
      ]);
      if (!estRes.ok) throw new Error("Not found");
      const estData = await estRes.json();
      const custData = await custRes.json();
      const tplData = await tplRes.json();
      setEstimate(estData.estimate ?? null);
      setLines(estData.lines ?? []);
      const customer = (custData.customers ?? []).find(
        (c: { id: string }) => c.id === estData.estimate?.customerId,
      );
      setCustomerName(customer?.name ?? "Customer");
      const templates: Template[] = tplData.templates ?? [];
      setTemplate(templates.find((t) => t.isDefault) ?? templates[0] ?? null);
    } catch (err) {
      console.error("Failed to load estimate", err);
      setLoadError(true);
    } finally {
      setIsLoading(false);
    }
  }, [activeBookId, estimateId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const accent = template?.accentColor ?? "#0f172a";

  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="flex items-center justify-between print:hidden">
        <Link
          to="/@{$workspaceSlug}/~/estimates"
          params={{ workspaceSlug }}
          className="inline-flex items-center gap-1.5 text-muted-foreground text-sm transition-colors hover:text-foreground"
        >
          <ArrowLeftIcon className="size-4" />
          Back to estimates
        </Link>
        <button
          type="button"
          onClick={() => window.print()}
          disabled={!estimate}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90 disabled:opacity-50"
        >
          <PrinterIcon className="size-4" />
          Print / Save PDF
        </button>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center rounded-lg border border-border bg-card p-8">
          <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
        </div>
      )}

      {!isLoading && loadError && (
        <LoadError resource="estimate" onRetry={fetchData} />
      )}

      {!isLoading && !loadError && estimate && (
        <div className="mx-auto w-full max-w-3xl rounded-lg border border-border bg-white text-slate-900 shadow-sm">
          <div
            className="flex items-start justify-between rounded-t-lg px-8 py-6 text-white"
            style={{ backgroundColor: accent }}
          >
            <div>
              {template?.showLogo !== false && (
                <p className="font-bold text-xl">
                  {activeBook?.name ?? "Your Company"}
                </p>
              )}
              {activeBook?.address && (
                <p className="mt-1 text-sm opacity-90">{activeBook.address}</p>
              )}
            </div>
            <div className="text-right">
              <p className="font-bold text-2xl tracking-wide">ESTIMATE</p>
              <p className="text-sm opacity-90">#{estimate.number}</p>
            </div>
          </div>

          <div className="px-8 py-6">
            <div className="flex justify-between text-sm">
              <div>
                <p className="font-semibold text-slate-500 text-xs uppercase">
                  Prepared For
                </p>
                <p className="mt-1 font-medium">{customerName}</p>
              </div>
              <div className="text-right">
                <p>
                  <span className="text-slate-500">Date: </span>
                  {estimate.estimateDate}
                </p>
                {estimate.expiryDate && (
                  <p>
                    <span className="text-slate-500">Valid until: </span>
                    {estimate.expiryDate}
                  </p>
                )}
                <p className="mt-1 capitalize">
                  <span className="text-slate-500">Status: </span>
                  {estimate.status}
                </p>
              </div>
            </div>

            <table className="mt-6 w-full text-sm">
              <thead>
                <tr
                  className="text-left text-white"
                  style={{ backgroundColor: accent }}
                >
                  <th className="px-3 py-2 font-medium">Description</th>
                  <th className="px-3 py-2 text-right font-medium">Qty</th>
                  <th className="px-3 py-2 text-right font-medium">Price</th>
                  <th className="px-3 py-2 text-right font-medium">Amount</th>
                </tr>
              </thead>
              <tbody>
                {lines.map((l) => (
                  <tr key={l.id} className="border-slate-200 border-b">
                    <td className="px-3 py-2">{l.description}</td>
                    <td className="px-3 py-2 text-right">
                      {Number(l.quantity)}
                    </td>
                    <td className="px-3 py-2 text-right">
                      {formatCurrency(l.unitPrice)}
                    </td>
                    <td className="px-3 py-2 text-right">
                      {formatCurrency(l.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-4 flex justify-end">
              <div className="w-64 text-sm">
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Subtotal</span>
                  <span>{formatCurrency(estimate.subtotal)}</span>
                </div>
                <div className="flex justify-between border-slate-300 border-t py-1 font-semibold">
                  <span>Total</span>
                  <span>{formatCurrency(estimate.total)}</span>
                </div>
              </div>
            </div>

            {(estimate.terms || template?.terms) && (
              <div className="mt-6 text-slate-600 text-xs">
                <p className="font-semibold">Terms</p>
                <p className="mt-1">{estimate.terms || template?.terms}</p>
              </div>
            )}

            {template?.footerText && (
              <p className="mt-6 border-slate-200 border-t pt-4 text-center text-slate-500 text-xs">
                {template.footerText}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
