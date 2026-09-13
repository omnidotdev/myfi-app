import type { OrganizationClaim } from "@omnidotdev/providers";
import type { ReactNode } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

/**
 * Local organization context, URL-driven via the `@{workspaceSlug}` handle.
 *
 * MyFi replaces the shared `@omnidotdev/providers` provider with this one so the
 * active workspace is derived from the route (the source of truth) rather than
 * held in component state. A deep link or refresh on `/@{slug}/~/...` resolves to
 * the workspace the URL names instead of snapping back to the first org. The API
 * surface (currentOrganization, setCurrentOrganization, ...) matches the shared
 * provider so existing consumers keep working unchanged.
 */
interface OrganizationContextValue {
  /** All organizations the user is a member of */
  organizations: OrganizationClaim[];
  /** Currently active organization (URL wins, then last-used, then first) */
  currentOrganization: OrganizationClaim | null;
  /** Remember an org as last-used (for handle-less routes); URL still wins */
  setCurrentOrganization: (orgId: string) => void;
  /** Whether the user belongs to more than one organization */
  hasMultipleOrgs: boolean;
  /** Resolve organization details by ID. Returns undefined if not found */
  getOrganizationById: (orgId: string) => OrganizationClaim | undefined;
  /** True if organizations couldn't be loaded from IDP (degraded mode) */
  isDegradedMode: boolean;
}

const OrganizationContext = createContext<OrganizationContextValue | null>(
  null,
);

const STORAGE_KEY = "myfi:activeOrgId";

interface OrganizationProviderProps {
  children: ReactNode;
  organizations: OrganizationClaim[];
  /**
   * Workspace handle (org slug) from the current route, when the URL carries
   * one (e.g. `/@{slug}/~/ledger`). This is the source of truth for the active
   * workspace so a refresh or deep link resolves to the right org.
   */
  activeSlug?: string;
  /** True when organizations could not be loaded from the IDP (degraded auth) */
  isDegraded?: boolean;
}

const OrganizationProvider = ({
  children,
  organizations,
  activeSlug,
  isDegraded = false,
}: OrganizationProviderProps) => {
  // Last-used workspace, remembered for routes whose URL carries no handle.
  // Hydrated from storage after mount so server and first client render agree
  const [storedOrgId, setStoredOrgId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setStoredOrgId(saved);
    } catch {
      // localStorage may be unavailable (private mode, blocked); ignore
    }
  }, []);

  // The URL wins when it names a workspace; otherwise fall back to the last-used
  // workspace, then the first org. This keeps a refresh on `/@{slug}/...` pinned
  // to that workspace instead of snapping back to organizations[0]
  const urlOrg = activeSlug
    ? (organizations.find((o) => o.slug === activeSlug) ?? null)
    : null;
  const currentOrganization =
    urlOrg ??
    organizations.find((o) => o.id === storedOrgId) ??
    organizations[0] ??
    null;

  // Remember the workspace the URL put us in, so leaving a workspace route does
  // not fall back to a different org
  useEffect(() => {
    if (urlOrg && urlOrg.id !== storedOrgId) {
      setStoredOrgId(urlOrg.id);
      try {
        localStorage.setItem(STORAGE_KEY, urlOrg.id);
      } catch {
        // best effort
      }
    }
  }, [urlOrg, storedOrgId]);

  const setCurrentOrganization = useCallback((orgId: string) => {
    setStoredOrgId(orgId);
    try {
      localStorage.setItem(STORAGE_KEY, orgId);
    } catch {
      // best effort
    }
  }, []);

  const getOrganizationById = useCallback(
    (orgId: string) => organizations.find((o) => o.id === orgId),
    [organizations],
  );

  return (
    <OrganizationContext.Provider
      value={{
        organizations,
        currentOrganization,
        setCurrentOrganization,
        hasMultipleOrgs: organizations.length > 1,
        getOrganizationById,
        isDegradedMode: isDegraded,
      }}
    >
      {children}
    </OrganizationContext.Provider>
  );
};

/**
 * Hook to access organization context. Returns null if used outside the
 * provider (matching the shared provider's contract, so callers guard with `?.`)
 */
const useOrganization = () => useContext(OrganizationContext);

export { OrganizationProvider, useOrganization };
