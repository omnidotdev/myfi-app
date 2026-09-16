import formatCurrency from "@/lib/format/currency";

export type VendorSpendRow = {
  vendorId: string | null;
  vendorName: string;
  monthly: Record<string, string>;
  total: string;
  monthsActive: number;
  isRecurring: boolean;
};

export type VendorSpendData = {
  months: string[];
  vendors: VendorSpendRow[];
  monthlyTotals: Record<string, string>;
  grandTotal: string;
};

/** "2026-03" -> "Mar 2026" */
const monthLabel = (month: string): string => {
  const [year, m] = month.split("-").map(Number);
  const date = new Date(year, (m ?? 1) - 1, 1);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

/**
 * Vendor-by-month spend matrix: a row per vendor with each month's spend, a
 * recurring badge, and totals. Scrolls horizontally when there are many months
 */
function VendorSpendMatrix({ data }: { data: VendorSpendData }) {
  if (data.vendors.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-8 text-center text-muted-foreground text-sm">
        No vendor spending in this period.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-card">
      <table className="w-full text-sm">
        <thead className="border-border border-b text-left text-muted-foreground">
          <tr>
            <th className="px-4 py-3 font-medium">Vendor</th>
            {data.months.map((month) => (
              <th key={month} className="px-4 py-3 text-right font-medium">
                {monthLabel(month)}
              </th>
            ))}
            <th className="px-4 py-3 text-right font-medium">Total</th>
          </tr>
        </thead>
        <tbody>
          {data.vendors.map((vendor) => (
            <tr
              key={vendor.vendorId ?? "__unassigned__"}
              className="border-border/50 border-b last:border-0"
            >
              <td className="px-4 py-3">
                <span className="font-medium">{vendor.vendorName}</span>
                <span
                  className={
                    vendor.isRecurring
                      ? "ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-primary text-xs"
                      : "ml-2 rounded-full bg-muted px-2 py-0.5 text-muted-foreground text-xs"
                  }
                >
                  {vendor.isRecurring ? "Recurring" : "One-time"}
                </span>
              </td>
              {data.months.map((month) => (
                <td
                  key={month}
                  className="px-4 py-3 text-right text-muted-foreground"
                >
                  {vendor.monthly[month]
                    ? formatCurrency(vendor.monthly[month])
                    : "-"}
                </td>
              ))}
              <td className="px-4 py-3 text-right font-medium">
                {formatCurrency(vendor.total)}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-border border-t-2 font-medium">
            <td className="px-4 py-3">Totals</td>
            {data.months.map((month) => (
              <td key={month} className="px-4 py-3 text-right">
                {formatCurrency(data.monthlyTotals[month] ?? "0")}
              </td>
            ))}
            <td className="px-4 py-3 text-right">
              {formatCurrency(data.grandTotal)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default VendorSpendMatrix;
