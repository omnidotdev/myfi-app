/** A customer (who invoices are billed to) */
export interface Customer {
  id: string;
  name: string;
  businessName: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  notes: string | null;
  isActive: boolean;
}

/** Invoice lifecycle status */
export type InvoiceStatus = "draft" | "open" | "partial" | "paid" | "void";

/** A row in the invoice list, with the customer name and outstanding balance */
export interface InvoiceListItem {
  id: string;
  number: string;
  status: InvoiceStatus;
  issueDate: string;
  dueDate: string;
  total: string;
  amountPaid: string;
  customerId: string;
  customerName: string;
  balanceDue: string;
}

/** A chart-of-accounts account, as returned by /api/accounts */
export interface InvoiceAccount {
  id: string;
  name: string;
  code: string | null;
  type: string;
  subType: string | null;
}

/** A tax jurisdiction with its optional flat rate */
export interface TaxJurisdiction {
  id: string;
  name: string;
  rate: string | null;
}

/** A line item being edited in the invoice form */
export interface DraftLine {
  description: string;
  quantity: string;
  unitPrice: string;
  incomeAccountId: string;
  taxJurisdictionId: string;
}

/** One customer row in the AR aging report */
export interface ArAgingRow {
  customerId: string;
  customerName: string;
  current: string;
  days1to30: string;
  days31to60: string;
  days61to90: string;
  over90: string;
  total: string;
}

export interface ArAging {
  customers: ArAgingRow[];
  totals: Omit<ArAgingRow, "customerId" | "customerName">;
}
