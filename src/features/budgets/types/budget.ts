export const BUDGET_PERIODS = ["monthly", "quarterly", "yearly"] as const;
export type BudgetPeriod = (typeof BUDGET_PERIODS)[number];

export type Budget = {
  rowId: string;
  bookId: string;
  accountId: string;
  accountName?: string;
  accountCode?: string;
  amount: string;
  period: BudgetPeriod;
  rollover: boolean;
  createdAt: string;
  updatedAt: string;
};

export type BudgetTracking = {
  budgetId: string;
  accountId: string;
  accountName: string;
  accountCode: string | null;
  targetAmount: string;
  actualAmount: string;
  percentUsed: number;
  remaining: string;
  status: "on_track" | "warning" | "over_budget";
};

export default Budget;
