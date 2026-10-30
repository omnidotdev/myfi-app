import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeftIcon, Loader2Icon, PrinterIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import LoadError from "@/components/LoadError";
import { apiFetch } from "@/lib/api/apiFetch";
import formatCurrency from "@/lib/format/currency";
import useActiveBook from "@/lib/hooks/useActiveBook";

export const Route = createFileRoute(
  "/_app/@{$workspaceSlug}/~/invoices/$invoiceId",
)({
  component: InvoiceView,
});

interface Invoice {
  id: string;
  number: string;
  status: string;
  issueDate: string;
  dueDate: string;
  subtotal: string;
  taxAmount: string;
  total: string;
  amountPaid: string;
  currency: string;
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
  documentType: string;
  accentColor: string;
  footerText: string | null;
  terms: string | null;
  showLogo: boolean;
  isDefault: boolean;
}

function InvoiceView() {
  const { invoiceId, workspaceSlug } = Route.useParams();
  const { activeBook, activeBookId } = useActiveBook();

  const [invoice, setInvoice] = useState<Invoice | null>(null);
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
      const [invRes, custRes, tplRes] = await Promise.all([
        apiFetch(`/api/invoices/${invoiceId}?bookId=${activeBookId}`),
        apiFetch(`/api/customers?bookId=${activeBookId}`),
        apiFetch(
          `/api/form-templates?bookId=${activeBookId}&documentType=invoice`,
        ),
      ]);
      if (!invRes.ok) throw new Error("Not found");
      const invData = await invRes.json();
      const custData = await custRes.json();
      const tplData = await tplRes.json();
      setInvoice(invData.invoice ?? null);
      setLines(invData.lines ?? []);
      const customer = (custData.customers ?? []).find(
        (c: { id: string }) => c.id === invData.invoice?.customerId,
      );
      setCustomerName(customer?.name ?? "Customer");
      const templates: Template[] = tplData.templates ?? [];
      setTemplate(templates.find((t) => t.isDefault) ?? templates[0] ?? null);
    } catch (err) {
      console.error("Failed to load invoice", err);
      setLoadError(true);
    } finally {
      setIsLoading(false);
    }
  }, [activeBookId, invoiceId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const accent = template?.accentColor ?? "#0f172a";
  const balance = invoice
    ? Number(invoice.total) - Number(invoice.amountPaid)
    : 0;

  return (
    <div className="flex flex-col gap-4 p-6">
      {/* toolbar hidden when printing */}
      <div className="flex items-center justify-between print:hidden">
        <Link
          to="/@{$workspaceSlug}/~/invoices"
          params={{ workspaceSlug }}
          className="inline-flex items-center gap-1.5 text-muted-foreground text-sm transition-colors hover:text-foreground"
        >
          <ArrowLeftIcon className="size-4" />
          Back to invoices
        </Link>
        <button
          type="button"
          onClick={() => window.print()}
          disabled={!invoice}
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
        <LoadError resource="invoice" onRetry={fetchData} />
      )}

      {!isLoading && !loadError && invoice && (
        <div className="mx-auto w-full max-w-3xl rounded-lg border border-border bg-white text-slate-900 shadow-sm">
          {/* header band in the template accent color */}
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
              <p className="font-bold text-2xl tracking-wide">INVOICE</p>
              <p className="text-sm opacity-90">#{invoice.number}</p>
            </div>
          </div>

          <div className="px-8 py-6">
            <div className="flex justify-between text-sm">
              <div>
                <p className="font-semibold text-slate-500 text-xs uppercase">
                  Bill To
                </p>
                <p className="mt-1 font-medium">{customerName}</p>
              </div>
              <div className="text-right">
                <p>
                  <span className="text-slate-500">Issued: </span>
                  {invoice.issueDate}
                </p>
                <p>
                  <span className="text-slate-500">Due: </span>
                  {invoice.dueDate}
                </p>
                <p className="mt-1 capitalize">
                  <span className="text-slate-500">Status: </span>
                  {invoice.status}
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
                  <span>{formatCurrency(invoice.subtotal)}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Tax</span>
                  <span>{formatCurrency(invoice.taxAmount)}</span>
                </div>
                <div className="flex justify-between border-slate-300 border-t py-1 font-semibold">
                  <span>Total</span>
                  <span>{formatCurrency(invoice.total)}</span>
                </div>
                {Number(invoice.amountPaid) > 0 && (
                  <>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-500">Paid</span>
                      <span>{formatCurrency(invoice.amountPaid)}</span>
                    </div>
                    <div className="flex justify-between py-1 font-semibold">
                      <span>Balance Due</span>
                      <span>{formatCurrency(balance.toFixed(4))}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {(invoice.terms || template?.terms) && (
              <div className="mt-6 text-slate-600 text-xs">
                <p className="font-semibold">Terms</p>
                <p className="mt-1">{invoice.terms || template?.terms}</p>
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
