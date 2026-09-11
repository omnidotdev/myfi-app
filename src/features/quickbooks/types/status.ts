export interface QuickbooksStatus {
  connection: { id: string; realmId: string | null; status: string } | null;
  latestMigration: {
    id: string;
    status: string;
    periodStart: string | null;
    periodEnd: string | null;
    entriesImported: number;
    errorMessage: string | null;
    createdAt: string;
  } | null;
  latestReconciliation: {
    id: string;
    status: string;
    periodStart: string | null;
    periodEnd: string | null;
    totalVariance: string | null;
    mismatchCount: number;
    errorMessage: string | null;
    createdAt: string;
  } | null;
  cutover: { id: string; cutoverAt: string; reconciliationId: string } | null;
}
