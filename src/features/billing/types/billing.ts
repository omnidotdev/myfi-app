/** A vendor (who bills are owed to); a subset of the vendor record */
export interface BillVendor {
  id: string;
  name: string;
}

/** Bill lifecycle status */
export type BillStatus = "draft" | "open" | "partial" | "paid" | "void";

/** A row in the bill list, with the vendor name and outstanding balance */
export interface BillListItem {
  id: string;
  number: string;
  status: BillStatus;
  billDate: string;
  dueDate: string;
  total: string;
  amountPaid: string;
  vendorId: string;
  vendorName: string;
  balanceDue: string;
}

/** A line item being edited in the bill form */
export interface DraftBillLine {
  description: string;
  quantity: string;
  unitPrice: string;
  expenseAccountId: string;
  taxJurisdictionId: string;
}
