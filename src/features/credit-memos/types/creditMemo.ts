/** Credit memo lifecycle status (app-validated, mirrors the API) */
export type CreditMemoStatus = "draft" | "open" | "applied" | "void";

/** A row in the credit memo list, with the customer name and unapplied credit */
export interface CreditMemoListItem {
  id: string;
  number: string;
  status: CreditMemoStatus;
  date: string;
  total: string;
  amountApplied: string;
  customerId: string;
  customerName: string;
  /** Remaining credit not yet applied to an invoice */
  unapplied: string;
}

/** A line item being edited in the credit memo form */
export interface DraftCreditMemoLine {
  description: string;
  quantity: string;
  unitPrice: string;
  incomeAccountId: string;
  taxJurisdictionId: string;
  /** optional per-line discount, entered as a percent 0 to 100 */
  discountPercent: string;
}
