export interface ReconciliationLine {
  id: string;
  accountName: string;
  qboAccountId: string;
  myfiAccountId: string | null;
  qboBalance: string;
  myfiBalance: string;
  variance: string;
}

export interface ReconciliationLinesResponse {
  reconciliation: {
    id: string;
    status: string;
    totalVariance: string | null;
    mismatchCount: number;
    periodStart: string | null;
    periodEnd: string | null;
  };
  lines: ReconciliationLine[];
}
