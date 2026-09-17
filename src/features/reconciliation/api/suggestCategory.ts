import { apiFetch } from "@/lib/api/apiFetch";
import type {
  SuggestCategoryInput,
  SuggestCategoryResult,
} from "./categorySuggestion";
import { parseSuggestResponse } from "./categorySuggestion";

/**
 * Request an AI categorization suggestion for a transaction. The endpoint is
 * auth-guarded, so this goes through apiFetch (Bearer token) rather than a bare
 * fetch. Network failures collapse into an "error" result so callers only
 * branch on the typed outcome
 */
export const suggestCategory = async (
  input: SuggestCategoryInput,
): Promise<SuggestCategoryResult> => {
  try {
    const res = await apiFetch("/api/categorization/suggest", {
      method: "POST",
      body: JSON.stringify(input),
    });

    return parseSuggestResponse(res);
  } catch {
    return { status: "error" };
  }
};
