import { LEGAL_URLS } from "@omnidotdev/providers/legal";
import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Legacy privacy policy path. The policy lives in Omni's central legal docs, so
 * this permanently redirects there to keep existing links from breaking
 */
export const Route = createFileRoute("/privacy")({
  beforeLoad: () => {
    throw redirect({ href: LEGAL_URLS.privacy, statusCode: 301 });
  },
});
