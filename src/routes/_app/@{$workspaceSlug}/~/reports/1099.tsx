import { createFileRoute } from "@tanstack/react-router";
import { DownloadIcon, Loader2Icon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import BookPicker from "@/features/books/components/BookPicker";
import ReportExportActions from "@/features/reports/components/ReportExportActions";
import { apiFetch } from "@/lib/api/apiFetch";
import formatCurrency from "@/lib/format/currency";
import useActiveBook from "@/lib/hooks/useActiveBook";

export const Route = createFileRoute("/_app/@{$workspaceSlug}/~/reports/1099")({
  component: Report1099Page,
});

type VendorForm = {
  vendorId: string;
  vendorName: string;
  businessName: string | null;
  tinMasked: string;
  totalPayments: string;
  threshold: string;
  qualifies: boolean;
};

type Report1099Data = {
  year: number;
  forms: VendorForm[];
};

function Report1099Page() {
  const currentYear = new Date().getFullYear();
  const {
    activeBook,
    activeBookId,
    books,
    isLoading: booksLoading,
    setActiveBookId,
  } = useActiveBook();

  const [year, setYear] = useState(currentYear);
  const [data, setData] = useState<Report1099Data | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Filer (payer) details, needed on the IRIS e-file export. Seeded from the
  // active book; the EIN shows masked and is only sent when re-entered.
  const [filer, setFiler] = useState({
    legalName: "",
    ein: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
  });
  const [savingFiler, setSavingFiler] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    setFiler({
      legalName: activeBook?.legalName ?? "",
      ein: "",
      address: activeBook?.address ?? "",
      city: activeBook?.city ?? "",
      state: activeBook?.state ?? "",
      zip: activeBook?.zip ?? "",
      phone: activeBook?.phone ?? "",
    });
  }, [activeBook]);

  const saveFiler = async () => {
    if (!activeBookId) return;
    setSavingFiler(true);
    try {
      const body: Record<string, string> = {
        legalName: filer.legalName,
        address: filer.address,
        city: filer.city,
        state: filer.state,
        zip: filer.zip,
        phone: filer.phone,
      };
      // only send the EIN when the user typed a new one (blank keeps the stored value)
      if (filer.ein.trim()) body.ein = filer.ein.trim();
      const res = await apiFetch(`/api/books/${activeBookId}`, {
        method: "PUT",
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Failed to save filer details");
      toast.success("Filer details saved");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSavingFiler(false);
    }
  };

  const downloadIrisCsv = async () => {
    if (!activeBookId) return;
    setDownloading(true);
    try {
      const params = new URLSearchParams({
        bookId: activeBookId,
        year: String(year),
      });
      const res = await apiFetch(
        `/api/tax/1099-nec/iris-csv?${params.toString()}`,
      );
      if (!res.ok) throw new Error("Failed to generate IRIS CSV");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `1099-nec-iris-${year}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to download");
    } finally {
      setDownloading(false);
    }
  };

  const fetchReport = useCallback(async () => {
    if (!activeBookId) return;

    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        bookId: activeBookId,
        year: String(year),
      });
      const res = await apiFetch(`/api/tax/1099-nec?${params.toString()}`);

      if (!res.ok) {
        throw new Error(`Failed to fetch report: ${res.statusText}`);
      }

      const json = await res.json();

      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load report");
    } finally {
      setIsLoading(false);
    }
  }, [activeBookId, year]);

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  const totalFormsCount = data?.forms.filter((f) => f.qualifies).length ?? 0;
  const totalAmount =
    data?.forms
      .filter((f) => f.qualifies)
      .reduce((sum, f) => sum + Number.parseFloat(f.totalPayments), 0) ?? 0;

  const loading = booksLoading || isLoading;

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">1099-NEC Report</h1>
          <p className="text-muted-foreground text-sm">
            Non-employee compensation reporting for eligible vendors
          </p>
        </div>

        <BookPicker
          books={books}
          selectedBookId={activeBookId}
          onSelect={setActiveBookId}
        />
      </div>

      {/* Year selector */}
      <div className="flex flex-wrap items-end gap-4 rounded-lg border border-border bg-card p-4">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="report-year"
            className="text-muted-foreground text-xs"
          >
            Tax Year
          </label>
          <select
            id="report-year"
            value={year}
            onChange={(e) => setYear(Number.parseInt(e.target.value, 10))}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            {Array.from({ length: 3 }, (_, i) => currentYear - i).map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Filer details + IRS IRIS e-file */}
      <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-4">
        <div>
          <h2 className="font-semibold text-base">Filer details & e-file</h2>
          <p className="text-muted-foreground text-sm">
            Your company's details as the payer. Used to build a CSV you can
            upload to the free IRS IRIS portal to e-file these 1099-NECs.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-muted-foreground text-xs">Legal name</span>
            <input
              type="text"
              value={filer.legalName}
              onChange={(e) =>
                setFiler((f) => ({ ...f, legalName: e.target.value }))
              }
              placeholder={activeBook?.name ?? ""}
              className="rounded-md border border-border bg-background px-3 py-2 text-sm"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-muted-foreground text-xs">
              EIN{" "}
              {activeBook?.einMasked ? (
                <span className="font-mono">
                  (on file {activeBook.einMasked})
                </span>
              ) : null}
            </span>
            <input
              type="text"
              value={filer.ein}
              onChange={(e) => setFiler((f) => ({ ...f, ein: e.target.value }))}
              placeholder={activeBook?.einMasked ?? "12-3456789"}
              className="rounded-md border border-border bg-background px-3 py-2 text-sm"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-muted-foreground text-xs">Phone</span>
            <input
              type="text"
              value={filer.phone}
              onChange={(e) =>
                setFiler((f) => ({ ...f, phone: e.target.value }))
              }
              className="rounded-md border border-border bg-background px-3 py-2 text-sm"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm sm:col-span-2">
            <span className="text-muted-foreground text-xs">
              Street address
            </span>
            <input
              type="text"
              value={filer.address}
              onChange={(e) =>
                setFiler((f) => ({ ...f, address: e.target.value }))
              }
              className="rounded-md border border-border bg-background px-3 py-2 text-sm"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-muted-foreground text-xs">City</span>
            <input
              type="text"
              value={filer.city}
              onChange={(e) =>
                setFiler((f) => ({ ...f, city: e.target.value }))
              }
              className="rounded-md border border-border bg-background px-3 py-2 text-sm"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-muted-foreground text-xs">State</span>
            <input
              type="text"
              value={filer.state}
              onChange={(e) =>
                setFiler((f) => ({ ...f, state: e.target.value }))
              }
              className="rounded-md border border-border bg-background px-3 py-2 text-sm"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-muted-foreground text-xs">ZIP</span>
            <input
              type="text"
              value={filer.zip}
              onChange={(e) => setFiler((f) => ({ ...f, zip: e.target.value }))}
              className="rounded-md border border-border bg-background px-3 py-2 text-sm"
            />
          </label>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={saveFiler}
            disabled={savingFiler || !activeBookId}
            className="flex items-center gap-2 rounded-md border border-border px-4 py-2 font-medium text-sm disabled:opacity-50"
          >
            {savingFiler && <Loader2Icon className="size-4 animate-spin" />}
            Save filer details
          </button>
          <button
            type="button"
            onClick={downloadIrisCsv}
            disabled={downloading || !activeBookId}
            className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm disabled:opacity-50"
          >
            {downloading ? (
              <Loader2Icon className="size-4 animate-spin" />
            ) : (
              <DownloadIcon className="size-4" />
            )}
            Download IRIS CSV
          </button>
        </div>

        <p className="text-muted-foreground text-xs">
          Upload the CSV at the IRS IRIS Taxpayer Portal (free, requires your
          IRIS Transmitter Control Code). Confirm the columns against the
          current IRIS 1099-NEC template and review each record before
          submitting; IRIS also validates the file on upload.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive text-sm">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center rounded-lg border border-border bg-card p-8">
          <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
        </div>
      )}

      {/* Results */}
      {!loading && !error && data && (
        <>
          <ReportExportActions
            reportType="1099-nec"
            filename="1099-nec"
            bookId={activeBookId}
            query={{
              year: String(year),
            }}
          />

          {/* Summary cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-4">
              <p className="text-muted-foreground text-sm">Total Forms</p>
              <p className="font-bold font-mono text-2xl">{totalFormsCount}</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <p className="text-muted-foreground text-sm">Total Amount</p>
              <p className="font-bold font-mono text-2xl">
                {formatCurrency(totalAmount)}
              </p>
            </div>
          </div>

          {/* Table */}
          {data.forms.length === 0 ? (
            <div className="rounded-lg border border-border bg-card p-8 text-center">
              <p className="text-muted-foreground">
                No qualifying vendors found for {data.year}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-border bg-card">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-border border-b text-left text-muted-foreground">
                    <th className="px-4 py-3 font-medium">Vendor</th>
                    <th className="px-4 py-3 font-medium">Business Name</th>
                    <th className="px-4 py-3 font-medium">TIN</th>
                    <th className="px-4 py-3 text-right font-medium">
                      Total Payments
                    </th>
                    <th className="px-4 py-3 text-right font-medium">
                      Threshold
                    </th>
                    <th className="px-4 py-3 font-medium">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {data.forms.map((form) => (
                    <tr
                      key={form.vendorId}
                      className="border-border border-b transition-colors hover:bg-accent/30"
                    >
                      <td className="px-4 py-3">{form.vendorName}</td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {form.businessName ?? "\u2014"}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 font-mono text-muted-foreground">
                        {form.tinMasked}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-right font-mono">
                        {formatCurrency(form.totalPayments)}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-right font-mono text-muted-foreground">
                        {formatCurrency(form.threshold)}
                      </td>
                      <td className="px-4 py-3">
                        {form.qualifies ? (
                          <span className="rounded-full bg-green-500/10 px-2 py-0.5 font-medium text-green-600 text-xs dark:text-green-400">
                            Qualifies
                          </span>
                        ) : (
                          <span className="rounded-full bg-muted px-2 py-0.5 font-medium text-muted-foreground text-xs">
                            Below Threshold
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* Initial empty state */}
      {!loading && !error && !data && (
        <div className="rounded-lg border border-border bg-card p-8 text-center">
          <p className="text-muted-foreground">
            Select a book and year to view the 1099-NEC report
          </p>
        </div>
      )}
    </div>
  );
}
