/**
 * AI-assisted categorization suggestion (client side).
 *
 * The pure response mapping lives here, free of any app or network imports, so
 * it is unit-testable in isolation. The authed request wrapper that consumes it
 * lives in suggestCategory.ts. Both this and a future bulk "AI review" queue can
 * reuse this mapping.
 */

import { hubCreditsUrl, hubPlanUrl } from "@omnidotdev/providers/react";

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
 * Discriminated result. "payment_required" (402 with that code: AI uses Omni
 * credits and the workspace is not paying yet), "allowance_used" (any other
 * 402: the workspace's included AI categorization for the period is used),
 * "disabled" (503) and "no_suggestion" (422) are expected, non-error outcomes
 * the UI messages differently from a genuine failure
 */
export type SuggestCategoryResult =
  | { status: "ok"; suggestion: CategorySuggestion }
  | { status: "payment_required" }
  | { status: "allowance_used" }
  | { status: "disabled" }
  | { status: "no_suggestion" }
  | { status: "error" };

/** Map a suggest-endpoint Response to a typed result */
export const parseSuggestResponse = async (
  res: Response,
): Promise<SuggestCategoryResult> => {
  if (res.status === 402) {
    const body = (await res.json().catch(() => null)) as {
      code?: unknown;
    } | null;

    return body?.code === "payment_required"
      ? { status: "payment_required" }
      : { status: "allowance_used" };
  }
  if (res.status === 503) return { status: "disabled" };
  if (res.status === 422) return { status: "no_suggestion" };
  if (!res.ok) return { status: "error" };

  const data = (await res.json().catch(() => null)) as {
    suggestion?: CategorySuggestion;
  } | null;

  if (!data?.suggestion) return { status: "error" };

  return { status: "ok", suggestion: data.suggestion };
};

/** Product id the account hub bills myfi under */
const PRODUCT_ID = "myfi";

/** Paid tier the upgrade prompt points at */
const UPGRADE_PLAN = "pro";

/**
 * Where to upgrade to Pro for more AI categorization, on the Omni account hub.
 * Empty when no account hub is configured, so the prompt degrades to plain
 * copy rather than a dead link
 * @param accountBaseUrl - Account hub base URL
 * @param workspaceSlug - Active workspace slug, when known
 * @param loginHint - The signed-in account's subject, so the hub opens as it
 */
export const aiUpgradeUrl = (
  accountBaseUrl: string | undefined,
  workspaceSlug?: string,
  loginHint?: string | null,
): string =>
  hubPlanUrl(accountBaseUrl, {
    product: PRODUCT_ID,
    plan: UPGRADE_PLAN,
    interval: "month",
    workspace: workspaceSlug,
    loginHint,
  });

/**
 * Where to buy Omni AI credits for the workspace, on the Omni account hub.
 * Empty when no account hub is configured
 * @param accountBaseUrl - Account hub base URL
 * @param workspaceSlug - Active workspace slug, when known
 * @param loginHint - The signed-in account's subject, so the hub opens as it
 */
export const aiCreditsUrl = (
  accountBaseUrl: string | undefined,
  workspaceSlug?: string,
  loginHint?: string | null,
): string =>
  hubCreditsUrl(accountBaseUrl, {
    product: PRODUCT_ID,
    workspace: workspaceSlug,
    loginHint,
  });
