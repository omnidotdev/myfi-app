import type { OrganizationClaim } from "@omnidotdev/providers";
import { ensureFreshAccessToken, extractOrgClaims } from "@omnidotdev/providers";
import { setCookie } from "@tanstack/react-start/server";
import auth from "@/lib/auth/auth";
import { authCache, oidc } from "@/lib/auth/authCache";

export type { OrganizationClaim } from "@omnidotdev/providers";

export async function getAuth(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) return null;

    let accessToken: string | undefined;
    let organizations: OrganizationClaim[] = [];

    // Cast to access custom session properties added by customSession plugin
    const customUser = session.user as typeof session.user & {
      identityProviderId?: string | null;
      organizations?: OrganizationClaim[];
    };
    let identityProviderId = customUser.identityProviderId;
    const cachedOrganizations = customUser.organizations;

    // Check if we have complete cached data (avoids token verification on every request)
    const hasCachedData = identityProviderId && cachedOrganizations?.length;

    if (hasCachedData) {
      organizations = cachedOrganizations;
    }

    // Get tokens from Gatekeeper via Better Auth
    try {
      const tokenResult = await ensureFreshAccessToken({
        getAccessToken: () =>
          auth.api.getAccessToken({
            body: { providerId: "omni" },
            headers: request.headers,
          }),
        refreshToken: () =>
          auth.api.refreshToken({
            body: { providerId: "omni" },
            headers: request.headers,
          }),
      });
      accessToken = tokenResult?.accessToken;

      if (!accessToken) {
        console.warn("[getAuth] getAccessToken returned no accessToken");
      }

      // Extract claims from ID token (verified via OIDC discovery + JWKS)
      if (tokenResult?.idToken) {
        try {
          const payload = await oidc.verifyIdToken(tokenResult.idToken);

          if (!identityProviderId) {
            identityProviderId = payload.sub ?? null;
          }

          if (!hasCachedData) {
            organizations = extractOrgClaims(payload);

            // Cache auth data for subsequent requests
            if (identityProviderId) {
              const encrypted = await authCache.encrypt({
                // Use Better Auth user ID as rowId (no separate users table)
                rowId: session.user.id,
                identityProviderId,
                organizations,
              });
              setCookie(authCache.cookieName, encrypted, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
                maxAge: authCache.cookieTtlSeconds,
              });
            }
          }
        } catch (jwtError) {
          console.error("[getAuth] JWT verification failed:", jwtError);
        }
      }
    } catch (err) {
      console.error("[getAuth] Token fetch error:", err);
    }

    return {
      ...session,
      accessToken,
      organizations,
      user: {
        ...session.user,
        identityProviderId,
        username: session.user.name || session.user.email,
      },
    };
  } catch (error) {
    console.error("Failed to get auth session:", error);
    return null;
  }
}
