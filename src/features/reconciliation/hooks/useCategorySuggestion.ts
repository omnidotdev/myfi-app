import { useParams } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import type {
  CategorySuggestion,
  SuggestCategoryInput,
} from "@/features/reconciliation/api/categorySuggestion";
import {
  aiCreditsUrl,
  aiUpgradeUrl,
} from "@/features/reconciliation/api/categorySuggestion";
import { suggestCategory } from "@/features/reconciliation/api/suggestCategory";
import { ACCOUNT_URL } from "@/lib/config/env.config";

const openInNewTab = (url: string) => window.open(url, "_blank", "noopener");

/** Upsell shown once the workspace's included AI categorization is used */
const showAllowanceUsed = (workspaceSlug?: string) => {
  const upgradeUrl = aiUpgradeUrl(ACCOUNT_URL, workspaceSlug);

  toast.info("AI categorization used for this period", {
    description:
      "Rules keep categorizing your transactions. Upgrade your plan for more AI suggestions.",
    ...(upgradeUrl && {
      action: {
        label: "Upgrade",
        onClick: () => openInNewTab(upgradeUrl),
      },
    }),
  });
};

/**
 * Paid-access prompt shown when the workspace is not paying for AI yet: buy
 * Omni credits or upgrade to Pro, each on the account hub
 */
const showPaymentRequired = (workspaceSlug?: string) => {
  const creditsUrl = aiCreditsUrl(ACCOUNT_URL, workspaceSlug);
  const upgradeUrl = aiUpgradeUrl(ACCOUNT_URL, workspaceSlug);

  toast.info("AI categorization uses Omni credits", {
    description:
      "Buy credits or upgrade to Pro to get AI suggestions. Rules keep categorizing your transactions.",
    ...(creditsUrl && {
      action: {
        label: "Buy credits",
        onClick: () => openInNewTab(creditsUrl),
      },
    }),
    ...(upgradeUrl && {
      cancel: {
        label: "Upgrade",
        onClick: () => openInNewTab(upgradeUrl),
      },
    }),
  });
};

/**
 * Request an AI categorization suggestion and surface the expected non-success
 * outcomes (AI needs credits or a paid plan, included AI used for the period,
 * AI disabled, no confident answer, failure) as toasts. Returns the
 * suggestion on success or null otherwise, so a caller just prefills its inputs.
 * Reusable by both the inline reconciliation row and a future bulk review queue.
 */
const useCategorySuggestion = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { workspaceSlug } = useParams({ strict: false });

  const suggest = async (
    input: SuggestCategoryInput,
  ): Promise<CategorySuggestion | null> => {
    setIsLoading(true);

    try {
      const result = await suggestCategory(input);

      switch (result.status) {
        case "ok":
          return result.suggestion;
        case "payment_required":
          showPaymentRequired(workspaceSlug);
          return null;
        case "allowance_used":
          showAllowanceUsed(workspaceSlug);
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
