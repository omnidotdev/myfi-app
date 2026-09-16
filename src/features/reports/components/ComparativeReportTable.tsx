export interface ComparativeRow {
  accountId: string;
  accountName: string;
  accountCode?: string | null;
  current: string;
  prior: string;
  variance: string;
  variancePct: string | null;
}

interface ComparativeTotal {
  current: string;
  prior: string;
  variance: string;
  variancePct: string | null;
}

interface ComparativeSection {
  title: string;
  totalLabel: string;
  rows: ComparativeRow[];
  total: ComparativeTotal;
}

const money = (v: string) => {
  const n = Number.parseFloat(v) || 0;
  const s = Math.abs(n).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return n < 0 ? `($${s})` : `$${s}`;
};

const varianceClass = (v: string) =>
  (Number.parseFloat(v) || 0) >= 0
    ? "text-green-600 dark:text-green-400"
    : "text-red-600 dark:text-red-400";

/**
 * Renders a period-over-period comparative statement: each account with its
 * current value, prior value, variance, and percent change, grouped into
 * sections with totals, plus an optional grand total (e.g. Net Income)
 */
function ComparativeReportTable({
  sections,
  grandTotal,
}: {
  sections: ComparativeSection[];
  grandTotal?: { label: string; total: ComparativeTotal };
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-card">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-border border-b text-left text-muted-foreground">
            <th className="px-4 py-3 font-medium">Account</th>
            <th className="px-4 py-3 text-right font-medium">Current</th>
            <th className="px-4 py-3 text-right font-medium">Prior</th>
            <th className="px-4 py-3 text-right font-medium">Variance</th>
            <th className="px-4 py-3 text-right font-medium">%</th>
          </tr>
        </thead>
        <tbody>
          {sections.map((section) => (
            <FragmentSection key={section.title} section={section} />
          ))}
          {grandTotal && (
            <tr className="border-border border-t-2 font-semibold">
              <td className="px-4 py-3">{grandTotal.label}</td>
              <td className="px-4 py-3 text-right font-mono">
                {money(grandTotal.total.current)}
              </td>
              <td className="px-4 py-3 text-right font-mono text-muted-foreground">
                {money(grandTotal.total.prior)}
              </td>
              <td
                className={`px-4 py-3 text-right font-mono ${varianceClass(grandTotal.total.variance)}`}
              >
                {money(grandTotal.total.variance)}
              </td>
              <td className="px-4 py-3 text-right font-mono text-muted-foreground">
                {grandTotal.total.variancePct === null
                  ? "-"
                  : `${grandTotal.total.variancePct}%`}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function FragmentSection({ section }: { section: ComparativeSection }) {
  return (
    <>
      <tr className="bg-muted/40">
        <td className="px-4 py-2 font-semibold" colSpan={5}>
          {section.title}
        </td>
      </tr>
      {section.rows.map((row) => (
        <tr
          key={row.accountId}
          className="border-border/50 border-b last:border-0"
        >
          <td className="px-4 py-2 pl-6">
            {row.accountCode ? `${row.accountCode} - ` : ""}
            {row.accountName}
          </td>
          <td className="px-4 py-2 text-right font-mono">
            {money(row.current)}
          </td>
          <td className="px-4 py-2 text-right font-mono text-muted-foreground">
            {money(row.prior)}
          </td>
          <td
            className={`px-4 py-2 text-right font-mono ${varianceClass(row.variance)}`}
          >
            {money(row.variance)}
          </td>
          <td className="px-4 py-2 text-right font-mono text-muted-foreground">
            {row.variancePct === null ? "-" : `${row.variancePct}%`}
          </td>
        </tr>
      ))}
      <tr className="border-border border-b font-medium">
        <td className="px-4 py-2 pl-6">{section.totalLabel}</td>
        <td className="px-4 py-2 text-right font-mono">
          {money(section.total.current)}
        </td>
        <td className="px-4 py-2 text-right font-mono text-muted-foreground">
          {money(section.total.prior)}
        </td>
        <td
          className={`px-4 py-2 text-right font-mono ${varianceClass(section.total.variance)}`}
        >
          {money(section.total.variance)}
        </td>
        <td className="px-4 py-2 text-right font-mono text-muted-foreground">
          {section.total.variancePct === null
            ? "-"
            : `${section.total.variancePct}%`}
        </td>
      </tr>
    </>
  );
}

export default ComparativeReportTable;
