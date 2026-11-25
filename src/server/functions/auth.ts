import { buildIdpLogoutUrl } from "@omnidotdev/providers/auth";
import { createServerFn } from "@tanstack/react-start";
import { getRequest, setCookie } from "@tanstack/react-start/server";

import auth from "@/lib/auth/auth";
import { authCache } from "@/lib/auth/authCache";
import { toClientSession } from "@/lib/auth/clientSession";
import { getAuth } from "@/lib/auth/getAuth";
import { isSessionDegraded } from "@/lib/auth/sessionState";
import type { SignOutScope } from "@/lib/auth/signOutScope";
import { parseSignOutScope } from "@/lib/auth/signOutScope";
import {
  AUTH_BASE_URL,
  AUTH_CLIENT_ID,
  BASE_URL,
} from "@/lib/config/env.config";

export const fetchSession = createServerFn().handler(async () => {
  const request = getRequest();

  const session = await getAuth(request);

  return {
    session: toClientSession(session),
    // A degraded session is authenticated (getAuth returned it) but carries no
    // access token: the refresh-token grant failed, so getAuth served the
    // session without a fresh token and userinfo org hydration was skipped,
    // leaving organizations empty. This is distinct from a genuinely
    // organization-less user (who has a valid access token), so callers can
    // prompt a re-login instead of a silent "No workspaces yet" empty state
    authDegraded: isSessionDegraded(session),
  };
});

const clearAuthCacheCookie = () => {
  setCookie(authCache.cookieName, "", { maxAge: 0, path: "/" });
};

/**
 * Build the IDP end_session URL for federated logout
 * @param idTokenHint - The user's id token, required by the end-session endpoint
 * @param accounts - Which accounts on the browser to sign out of
 */
export function getIdpLogoutUrl(
  idTokenHint?: string,
  accounts?: SignOutScope["accounts"],
): string | null {
  return buildIdpLogoutUrl({
    authBaseUrl: AUTH_BASE_URL,
    clientId: AUTH_CLIENT_ID,
    redirectUri: BASE_URL,
    idTokenHint,
    accounts,
  });
}

/**
 * Sign out from the local session (server-side). `accounts` picks which
 * accounts the returned IdP logout URL signs out of (see `getIdpLogoutUrl`)
 * @returns The IDP logout URL for federated logout redirect
 */
export const signOutLocal = createServerFn({ method: "POST" })
  .inputValidator(parseSignOutScope)
  .handler(async ({ data }) => {
    const request = getRequest();
    const headers = request.headers;

    // Grab the ID token before we destroy the local session
    let idToken: string | undefined;
    try {
      const tokenResult = await auth.api.getAccessToken({
        body: { useAccountCookie: true },
        headers,
      });
      idToken = tokenResult?.idToken;
    } catch {
      // Token may already be expired, so proceed with logout anyway
    }

    await auth.api.signOut({ headers });
    clearAuthCacheCookie();

    return { idpLogoutUrl: getIdpLogoutUrl(idToken, data.accounts) };
  });
