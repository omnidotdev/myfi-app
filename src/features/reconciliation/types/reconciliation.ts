export const RECONCILIATION_STATUSES = [
  "pending",
  "approved",
  "rejected",
  "modified",
] as const;
export type ReconciliationStatus = (typeof RECONCILIATION_STATUSES)[number];

export type ReconciliationItem = {
  rowId: string;
  journalEntryId: string;
  date: string;
  memo: string | null;
  source: string;
  sourceReferenceId: string | null;
  amount: string;
  suggestedDebitAccount: string | null;
  suggestedCreditAccount: string | null;
  status: ReconciliationStatus;
  reviewedAt: string | null;
  reviewedBy: string | null;
};

export default ReconciliationItem;
