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
  createdAt: string;
  updatedAt: string;
};

export default Book;
