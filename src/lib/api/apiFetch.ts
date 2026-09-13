import { API_URL } from "@/lib/config/env.config";
import { fetchSession } from "@/server/functions/auth";

/**
 * Authed REST fetch against the myfi-api
 *
 * Prepends API_URL to the given path (e.g. "/api/books") and attaches the
 * current session's access token as a Bearer header, mirroring graphqlFetch so
 * REST calls authenticate identically to the GraphQL path. Returns the raw
 * Response so callers keep using res.ok, res.json, and res.status unchanged
 */
export const apiFetch = async (
  path: string,
  init?: RequestInit,
): Promise<Response> => {
  const { session } = await fetchSession();
  const accessToken = session?.accessToken;

  const headers = new Headers(init?.headers);

  // Default to JSON only for non-FormData bodies, so file uploads keep their
  // multipart content-type and boundary
  if (
    init?.body != null &&
    !(init.body instanceof FormData) &&
    !headers.has("Content-Type")
  ) {
    headers.set("Content-Type", "application/json");
  }

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  return fetch(`${API_URL}${path}`, {
    ...init,
    headers,
  });
};
