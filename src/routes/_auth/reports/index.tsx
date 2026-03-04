import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowRightLeftIcon,
  BarChart3Icon,
  BookOpenIcon,
  FileSpreadsheetIcon,
  ScaleIcon,
} from "lucide-react";

export const Route = createFileRoute("/_auth/reports/")({
  component: ReportsPage,
});

const reportCards = [
  {
    title: "Profit & Loss",
    description:
      "Revenue minus expenses over a date range. See where your money comes from and where it goes",
    icon: BarChart3Icon,
    href: "/reports/profit-and-loss",
  },
  {
    title: "Balance Sheet",
    description:
      "Assets, liabilities, and equity as of a specific date. A snapshot of your financial position",
    icon: ScaleIcon,
    href: "/reports/balance-sheet",
  },
  {
    title: "Trial Balance",
    description:
      "Debit and credit totals for all accounts. Verify that your books are balanced",
    icon: FileSpreadsheetIcon,
    href: "/reports/trial-balance",
  },
  {
    title: "Cash Flow Statement",
    description:
      "Track cash movements across operating, investing, and financing activities",
    icon: ArrowRightLeftIcon,
    href: "/reports/cash-flow",
  },
  {
    title: "General Ledger",
    description:
      "Full transaction history for a specific account with running balance",
    icon: BookOpenIcon,
    href: "/reports/general-ledger",
  },
];

function ReportsPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="font-bold text-2xl">Reports</h1>
        <p className="text-muted-foreground text-sm">
          Generate financial reports from your ledger data
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reportCards.map((card) => (
          <Link
            key={card.href}
            to={card.href}
            className="group flex flex-col gap-3 rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary/50 hover:bg-accent/50"
          >
            <div className="flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary">
              <card.icon className="size-5" />
            </div>

            <div className="flex flex-col gap-1">
              <h2 className="font-semibold text-base group-hover:text-primary">
                {card.title}
              </h2>
              <p className="text-muted-foreground text-sm">
                {card.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
