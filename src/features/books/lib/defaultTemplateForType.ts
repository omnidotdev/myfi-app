import type { BookType } from "@/features/books/types/book";

export type BookTemplate = "none" | "personal" | "sole_proprietor" | "llc";

/**
 * The chart-of-accounts template a new book should default to for its type. A
 * personal book seeds the personal chart (checking/savings/cash, credit cards,
 * student loans, mortgage, everyday expense/income accounts) so account-backed
 * features work out of the box; business books default to none and let the user
 * pick sole_proprietor / llc explicitly. The picker stays overridable
 * @param type - The selected book type
 */
export const defaultTemplateForType = (type: BookType): BookTemplate =>
  type === "personal" ? "personal" : "none";
