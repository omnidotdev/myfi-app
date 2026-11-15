import { LEGAL_URLS } from "@omnidotdev/providers/legal";
import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Legacy terms of service path. The terms live in Omni's central legal docs, so
 * this permanently redirects there to keep existing links from breaking
 */
export const Route = createFileRoute("/terms")({
  beforeLoad: () => {
    throw redirect({ href: LEGAL_URLS.terms, statusCode: 301 });
  },
});
