/**
 * Environment configuration
 * Client-safe vars use VITE_ prefix (build-time via import.meta.env)
 * Server-only vars (auth secrets) use process.env (runtime)
 */

// Build-time vars take precedence to prevent SSR hydration mismatch
const env =
  typeof window === "undefined"
    ? { ...process.env, ...import.meta.env }
    : import.meta.env;

export const API_URL = env.VITE_API_URL ?? "https://localhost:4000";
export const API_GRAPHQL_URL = `${API_URL}/graphql`;

// TODO(launch): bank linking (Plaid) is gated off while Plaid is unprovisioned
// (sandbox, no credentials in production) so the connect flow does not dead-end.
// CSV/file import stays available regardless. Before enabling: provision Plaid
// production credentials in infra, add Plaid to the central sub-processor list
// (omni.dev/legal), restore the bank-feeds mention on the landing page, then
// set VITE_PLAID_ENABLED=true
export const PLAID_ENABLED = env.VITE_PLAID_ENABLED === "true";

// TODO(launch): payroll sync (Gusto) is not provisioned in production yet, so
// the connect button is hidden and payroll CSV import stays available. Before
// enabling: provision the Gusto OAuth app in infra, add Gusto to the central
// sub-processor list (omni.dev/legal), then set VITE_GUSTO_ENABLED=true
export const GUSTO_ENABLED = env.VITE_GUSTO_ENABLED === "true";

// Auth config
const PORT = env.VITE_PORT ?? 3000;
export const BASE_URL =
  env.VITE_BASE_URL || env.BASE_URL || `https://localhost:${PORT}`;
export const AUTH_BASE_URL = env.AUTH_BASE_URL || env.VITE_AUTH_BASE_URL;
// Base URL for the canonical account-management surface. Prefer an explicit
// account URL; fall back to the console URL so the manage-account link keeps
// resolving to today's value until infra injects an account URL.
export const ACCOUNT_URL =
  env.ACCOUNT_URL ||
  env.VITE_ACCOUNT_URL ||
  env.CONSOLE_URL ||
  env.VITE_CONSOLE_URL;
export const AUTH_CLIENT_ID = env.AUTH_CLIENT_ID;
export const AUTH_CLIENT_SECRET = env.AUTH_CLIENT_SECRET;

// Internal auth URL for server-to-server communication (Docker service name)
// Falls back to AUTH_BASE_URL for non-Docker environments
export const AUTH_INTERNAL_URL =
  typeof window === "undefined"
    ? process.env.AUTH_INTERNAL_URL || AUTH_BASE_URL
    : AUTH_BASE_URL;
