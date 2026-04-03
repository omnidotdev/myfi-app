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

// Auth config
const PORT = env.VITE_PORT ?? 3000;
export const BASE_URL =
  env.VITE_BASE_URL || env.BASE_URL || `https://localhost:${PORT}`;
export const AUTH_BASE_URL = env.AUTH_BASE_URL || env.VITE_AUTH_BASE_URL;
export const CONSOLE_URL = env.CONSOLE_URL || env.VITE_CONSOLE_URL;
export const AUTH_CLIENT_ID = env.AUTH_CLIENT_ID;
export const AUTH_CLIENT_SECRET = env.AUTH_CLIENT_SECRET;

// Internal auth URL for server-to-server communication (Docker service name)
// Falls back to AUTH_BASE_URL for non-Docker environments
export const AUTH_INTERNAL_URL =
  typeof window === "undefined"
    ? process.env.AUTH_INTERNAL_URL || AUTH_BASE_URL
    : AUTH_BASE_URL;

