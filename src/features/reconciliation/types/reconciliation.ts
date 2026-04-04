export const RECONCILIATION_STATUSES = [
  "pending_review",
  "approved",
  "adjusted",
  "rejected",
] as const;
export type ReconciliationStatus = (typeof RECONCILIATION_STATUSES)[number];

export const CATEGORIZATION_SOURCES = [
  "rule",
  "llm",
  "manual",
  "uncategorized",
] as const;
export type CategorizationSource = (typeof CATEGORIZATION_SOURCES)[number];

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
  categorizationSource: CategorizationSource | null;
  confidence: string | null;
  suggestedDebitAccountId: string | null;
  suggestedCreditAccountId: string | null;
  priority: number;
  periodYear: number | null;
  periodMonth: number | null;
  status: ReconciliationStatus;
  reviewedAt: string | null;
  reviewedBy: string | null;
};

export default ReconciliationItem;
