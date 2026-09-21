export const BOOK_TYPES = ["business", "personal"] as const;

export type BookType = (typeof BOOK_TYPES)[number];

export type Book = {
  rowId: string;
  organizationId: string;
  name: string;
  type: BookType;
  currency: string;
  fiscalYearStartMonth: number;
  /** source of record for invoices/quotes/inventory: "myfi" or "mantle" */
  invoiceSource?: string;
  /** filer (payer) details for information-return e-filing (1099s) */
  legalName?: string | null;
  /** masked filer EIN (e.g. "**-***6789"); the raw EIN is never sent */
  einMasked?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  zip?: string | null;
  phone?: string | null;
  createdAt: string;
  updatedAt: string;
};

export default Book;
