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
  /** currency the invoice is billed in; absent means the book's home currency */
  currency?: string;
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
  /** when true, this tax compounds on top of a line's primary tax */
  compound?: boolean;
}

/** A line item being edited in the invoice form */
export interface DraftLine {
  description: string;
  quantity: string;
  unitPrice: string;
  incomeAccountId: string;
  taxJurisdictionId: string;
  /** optional secondary tax jurisdiction, stacked on the primary tax */
  secondaryTaxJurisdictionId: string;
  /** optional inventory item this line sells (drives auto-COGS on posting) */
  inventoryItemId: string;
  /** optional per-line discount, entered as a percent 0 to 100 */
  discountPercent: string;
}

/** An inventory item option for an invoice line (drives auto-COGS) */
export interface InvoiceInventoryOption {
  id: string;
  name: string;
  salePrice: string;
  incomeAccountId: string;
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
