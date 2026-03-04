export const JOURNAL_ENTRY_SOURCES = [
  "manual",
  "mantle_sync",
  "plaid_import",
  "crypto_sync",
  "recurring",
] as const;
export type JournalEntrySource = (typeof JOURNAL_ENTRY_SOURCES)[number];

export type JournalLine = {
  rowId: string;
  journalEntryId: string;
  accountId: string;
  accountName?: string;
  accountCode?: string;
  debit: string;
  credit: string;
  memo: string | null;
};

export type JournalEntry = {
  rowId: string;
  bookId: string;
  date: string;
  memo: string | null;
  source: JournalEntrySource;
  sourceReferenceId: string | null;
  isReviewed: boolean;
  isReconciled: boolean;
  lines: JournalLine[];
  createdAt: string;
  updatedAt: string;
};

export default JournalEntry;
