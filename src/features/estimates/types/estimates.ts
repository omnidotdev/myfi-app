export type EstimateStatus =
  | "draft"
  | "sent"
  | "accepted"
  | "declined"
  | "converted"
  | "expired";

/** A row in the estimate list */
export interface EstimateListItem {
  id: string;
  number: string;
  status: EstimateStatus;
  estimateDate: string;
  expiryDate: string | null;
  total: string;
  customerId: string;
  customerName: string;
  convertedInvoiceId: string | null;
}

/** A line item being edited in the estimate form */
export interface DraftEstimateLine {
  description: string;
  quantity: string;
  unitPrice: string;
  incomeAccountId: string;
  taxJurisdictionId: string;
}
