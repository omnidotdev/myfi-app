type ReportLineItem = {
  accountId: string;
  accountCode: string | null;
  accountName: string;
  accountType: string;
  subType: string | null;
  parentId: string | null;
  // For P&L and Balance Sheet
  netAmount?: string;
  balance?: string;
  // For Trial Balance
  debitTotal?: string;
  creditTotal?: string;
};

type ReportSection = {
  title: string;
  items: ReportLineItem[];
  total: string;
  totalLabel: string;
};

type Props = {
  sections: ReportSection[];
  showDebitCredit?: boolean;
  grandTotal?: { label: string; value: string };
};

/** Compute indent depth by walking parent references within a section */
function computeDepth(
  item: ReportLineItem,
  itemMap: Map<string, ReportLineItem>,
): number {
  let depth = 0;
  let current = item;

  while (current.parentId) {
    const parent = itemMap.get(current.parentId);
    if (!parent) break;
    depth++;
    current = parent;
  }

  return depth;
}

/** Determine if an item is a parent (has children in the same section) */
function hasChildren(item: ReportLineItem, items: ReportLineItem[]): boolean {
  return items.some((other) => other.parentId === item.accountId);
}

/** Format a numeric string as currency */
function formatAmount(value: string | undefined): string {
  if (!value) return "";

  const num = Number.parseFloat(value);
  if (Number.isNaN(num)) return "";

  return `$${Math.abs(num).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/**
 * Hierarchical report table for rendering account data with indentation
 */
function HierarchicalReportTable({
  sections,
  showDebitCredit = false,
  grandTotal,
}: Props) {
  if (sections.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-8 text-center">
        <p className="text-muted-foreground">
          No report data available. Adjust filters and generate the report.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-card">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-border border-b text-left text-muted-foreground">
            <th className="px-4 py-3 font-medium">Code</th>
            <th className="px-4 py-3 font-medium">Account</th>
            {showDebitCredit ? (
              <>
                <th className="px-4 py-3 text-right font-medium">Debit</th>
                <th className="px-4 py-3 text-right font-medium">Credit</th>
              </>
            ) : (
              <th className="px-4 py-3 text-right font-medium">Amount</th>
            )}
          </tr>
        </thead>

        <tbody>
          {sections.map((section) => {
            // Build a lookup for depth computation
            const itemMap = new Map<string, ReportLineItem>();
            for (const item of section.items) {
              itemMap.set(item.accountId, item);
            }

            return (
              <SectionRows
                key={section.title}
                section={section}
                itemMap={itemMap}
                showDebitCredit={showDebitCredit}
              />
            );
          })}

          {/* Grand total */}
          {grandTotal && (
            <tr className="border-border border-t-2 bg-muted/30 font-bold">
              <td className="px-4 py-3" />
              <td className="px-4 py-3">{grandTotal.label}</td>
              {showDebitCredit ? (
                <>
                  <td className="px-4 py-3 text-right font-mono">
                    {formatAmount(grandTotal.value)}
                  </td>
                  <td className="px-4 py-3 text-right font-mono">
                    {formatAmount(grandTotal.value)}
                  </td>
                </>
              ) : (
                <td className="px-4 py-3 text-right font-mono">
                  {formatAmount(grandTotal.value)}
                </td>
              )}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

type SectionRowsProps = {
  section: ReportSection;
  itemMap: Map<string, ReportLineItem>;
  showDebitCredit: boolean;
};

function SectionRows({ section, itemMap, showDebitCredit }: SectionRowsProps) {
  const colSpan = showDebitCredit ? 4 : 3;

  return (
    <>
      {/* Section header */}
      <tr className="border-border border-b bg-muted/50">
        <td colSpan={colSpan} className="px-4 py-2 font-semibold text-sm">
          {section.title}
        </td>
      </tr>

      {/* Line items */}
      {section.items.map((item) => {
        const depth = computeDepth(item, itemMap);
        const isParent = hasChildren(item, section.items);
        const amount = item.netAmount ?? item.balance;

        return (
          <tr
            key={item.accountId}
            className={`border-border border-b transition-colors hover:bg-accent/30 ${
              isParent ? "font-semibold" : ""
            }`}
          >
            <td className="whitespace-nowrap px-4 py-2 font-mono text-muted-foreground">
              {item.accountCode}
            </td>
            <td
              className="px-4 py-2"
              style={{ paddingLeft: `${depth * 1.5 + 1}rem` }}
            >
              {item.accountName}
            </td>
            {showDebitCredit ? (
              <>
                <td className="whitespace-nowrap px-4 py-2 text-right font-mono">
                  {formatAmount(item.debitTotal)}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-right font-mono">
                  {formatAmount(item.creditTotal)}
                </td>
              </>
            ) : (
              <td className="whitespace-nowrap px-4 py-2 text-right font-mono">
                {formatAmount(amount)}
              </td>
            )}
          </tr>
        );
      })}

      {/* Section total */}
      <tr className="border-border border-b bg-muted/20 font-semibold">
        <td className="px-4 py-2" />
        <td className="px-4 py-2">{section.totalLabel}</td>
        {showDebitCredit ? (
          <>
            <td className="px-4 py-2 text-right font-mono">
              {formatAmount(section.total)}
            </td>
            <td className="px-4 py-2" />
          </>
        ) : (
          <td className="px-4 py-2 text-right font-mono">
            {formatAmount(section.total)}
          </td>
        )}
      </tr>
    </>
  );
}

export default HierarchicalReportTable;
