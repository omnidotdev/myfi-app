import type { IdpLogoutConfig } from "@omnidotdev/providers/auth";

/** Which accounts on the browser a sign-out ends */
export type SignOutScope = Pick<IdpLogoutConfig, "accounts">;

/**
 * Read the sign-out scope sent from the browser, keeping only the values the
 * identity provider knows. Anything else is unset, so the identity provider
 * asks when more than one account is signed in
 * @param data - Untrusted server function input
 */
export const parseSignOutScope = (data?: {
  accounts?: unknown;
}): SignOutScope => ({
  accounts:
    data?.accounts === "current" || data?.accounts === "all"
      ? data.accounts
      : undefined,
});
