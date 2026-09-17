/**
 * AI-assisted categorization suggestion (client side).
 *
 * The pure response mapping lives here, free of any app or network imports, so
 * it is unit-testable in isolation. The authed request wrapper that consumes it
 * lives in suggestCategory.ts. Both this and a future bulk "AI review" queue can
 * reuse this mapping.
 */

export type CategorySuggestion = {
  debitAccountId: string;
  debitAccountName: string;
  creditAccountId: string;
  creditAccountName: string;
  confidence: number;
  rationale: string;
};

export type SuggestCategoryInput = {
  bookId: string;
  description: string;
  amount: number;
  date: string;
};

/**
 * Discriminated result. "disabled" (503) and "no_suggestion" (422) are expected,
 * non-error outcomes the UI messages differently from a genuine failure
 */
export type SuggestCategoryResult =
  | { status: "ok"; suggestion: CategorySuggestion }
  | { status: "disabled" }
  | { status: "no_suggestion" }
  | { status: "error" };

/** Map a suggest-endpoint Response to a typed result */
export const parseSuggestResponse = async (
  res: Response,
): Promise<SuggestCategoryResult> => {
  if (res.status === 503) return { status: "disabled" };
  if (res.status === 422) return { status: "no_suggestion" };
  if (!res.ok) return { status: "error" };

  const data = (await res.json().catch(() => null)) as {
    suggestion?: CategorySuggestion;
  } | null;

  if (!data?.suggestion) return { status: "error" };

  return { status: "ok", suggestion: data.suggestion };
};
