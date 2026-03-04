type Subscription = {
  memo: string;
  frequency: string;
  averageAmount: string;
  lastDate: string;
  estimatedAnnualCost: string;
  occurrences: number;
};

type SubscriptionListProps = {
  subscriptions: Subscription[];
  totalAnnualCost: string;
};

/** Format a numeric string as currency display */
function formatAmount(value: string): string {
  const num = Number.parseFloat(value);
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/** Format a frequency enum value for display */
function formatFrequency(frequency: string): string {
  const labels: Record<string, string> = {
    weekly: "Weekly",
    biweekly: "Biweekly",
    monthly: "Monthly",
    quarterly: "Quarterly",
    yearly: "Yearly",
  };
  return labels[frequency] ?? frequency;
}

/** Format ISO date to short display */
function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/** Get a color class for the frequency badge */
function getFrequencyColor(frequency: string): string {
  switch (frequency) {
    case "weekly":
      return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
    case "biweekly":
      return "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400";
    case "monthly":
      return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
    case "quarterly":
      return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
    case "yearly":
      return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400";
    default:
      return "bg-muted text-muted-foreground";
  }
}

/**
 * Table of detected recurring charges sorted by annual cost
 */
function SubscriptionList({
  subscriptions,
  totalAnnualCost,
}: SubscriptionListProps) {
  if (subscriptions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-border border-dashed py-16">
        <p className="text-muted-foreground text-sm">
          No recurring charges detected
        </p>
        <p className="max-w-sm text-center text-muted-foreground text-xs">
          Recurring transactions are detected from Plaid imports. Connect a bank
          account and import transactions to see subscriptions here
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-muted-foreground text-sm">
            Detected Subscriptions
          </p>
          <p className="mt-1 font-semibold text-2xl">{subscriptions.length}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-muted-foreground text-sm">Estimated Annual Cost</p>
          <p className="mt-1 font-semibold text-2xl">
            ${formatAmount(totalAnnualCost)}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-border border-b bg-muted/50">
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                Name
              </th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                Frequency
              </th>
              <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                Amount
              </th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                Last Charged
              </th>
              <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                Annual Cost
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {subscriptions.map((sub) => (
              <tr
                key={sub.memo}
                className="transition-colors hover:bg-muted/30"
              >
                <td className="px-4 py-3">
                  <div className="flex flex-col">
                    <span className="font-medium">{sub.memo}</span>
                    <span className="text-muted-foreground text-xs">
                      {sub.occurrences} occurrences
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 font-medium text-xs ${getFrequencyColor(sub.frequency)}`}
                  >
                    {formatFrequency(sub.frequency)}
                  </span>
                </td>
                <td className="px-4 py-3 text-right font-medium">
                  ${formatAmount(sub.averageAmount)}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {formatDate(sub.lastDate)}
                </td>
                <td className="px-4 py-3 text-right font-semibold">
                  ${formatAmount(sub.estimatedAnnualCost)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-border border-t bg-muted/50">
              <td
                colSpan={4}
                className="px-4 py-3 text-right font-semibold text-sm"
              >
                Total Annual Cost
              </td>
              <td className="px-4 py-3 text-right font-bold text-base">
                ${formatAmount(totalAnnualCost)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default SubscriptionList;
