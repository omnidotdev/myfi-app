import { useState } from "react";
import { toast } from "sonner";

import type {
  CategorySuggestion,
  SuggestCategoryInput,
} from "@/features/reconciliation/api/categorySuggestion";
import { aiUpgradeUrl } from "@/features/reconciliation/api/categorySuggestion";
import { suggestCategory } from "@/features/reconciliation/api/suggestCategory";
import { ACCOUNT_URL } from "@/lib/config/env.config";

/** Upsell shown once the workspace's included AI categorization is used */
const showAllowanceUsed = () => {
  const upgradeUrl = aiUpgradeUrl(ACCOUNT_URL);

  toast.info("AI categorization used for this period", {
    description:
      "Rules keep categorizing your transactions. Upgrade your plan for more AI suggestions.",
    ...(upgradeUrl && {
      action: {
        label: "Upgrade",
        onClick: () => window.open(upgradeUrl, "_blank", "noopener"),
      },
    }),
  });
};

/**
 * Request an AI categorization suggestion and surface the expected non-success
 * outcomes (included AI used for the period, AI disabled, no confident answer,
 * failure) as toasts. Returns the
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
        case "allowance_used":
          showAllowanceUsed();
          return null;
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
