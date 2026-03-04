export type SavingsGoal = {
  rowId: string;
  bookId: string;
  accountId: string;
  name: string;
  accountName?: string;
  accountCode?: string;
  targetAmount: string;
  targetDate: string | null;
  currentAmount: string;
  createdAt: string;
  updatedAt: string;
};

export type NetWorthSummary = {
  totalAssets: string;
  totalLiabilities: string;
  netWorth: string;
  generatedAt: string;
};

export default SavingsGoal;
