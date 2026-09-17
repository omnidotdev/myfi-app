import { useState } from "react";
import { toast } from "sonner";

import type {
  CategorySuggestion,
  SuggestCategoryInput,
} from "@/features/reconciliation/api/categorySuggestion";
import { suggestCategory } from "@/features/reconciliation/api/suggestCategory";

/**
 * Request an AI categorization suggestion and surface the expected non-success
 * outcomes (AI disabled, no confident answer, failure) as toasts. Returns the
 * suggestion on success or null otherwise, so a caller just prefills its inputs.
 * Reusable by both the inline reconciliation row and a future bulk review queue.
 */
const useCategorySuggestion = () => {
  const [isLoading, setIsLoading] = useState(false);

  const suggest = async (
    input: SuggestCategoryInput,
  ): Promise<CategorySuggestion | null> => {
    setIsLoading(true);

    try {
      const result = await suggestCategory(input);

      switch (result.status) {
        case "ok":
          return result.suggestion;
        case "disabled":
          toast.error("AI suggestions are unavailable right now");
          return null;
        case "no_suggestion":
          toast.error("No confident suggestion for this transaction");
          return null;
        default:
          toast.error("Could not generate a suggestion");
          return null;
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { suggest, isLoading };
};

export default useCategorySuggestion;
