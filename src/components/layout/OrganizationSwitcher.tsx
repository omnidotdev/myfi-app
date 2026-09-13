import {
  gatekeeperDashboardUrl,
  useOrganization,
} from "@omnidotdev/providers/react";
import {
  MenuContent,
  MenuItem,
  MenuPositioner,
  MenuRoot,
  MenuSeparator,
  MenuTrigger,
} from "@omnidotdev/thornberry/menu";
import { Building2, Check, ChevronsUpDown, Settings2 } from "lucide-react";

import { AUTH_BASE_URL } from "@/lib/config/env.config";

/**
 * Workspace switcher for the authed shell
 *
 * Reads the user's Omni organizations from the shared organization context
 * (sourced from JWT claims, not a DB query) and switches the active workspace
 * through the provider, which MyFi's data hooks key off for the current
 * organization. This is top-level tenancy, distinct from the per-book picker
 */
const OrganizationSwitcher = () => {
  const orgContext = useOrganization();

  const organizations = orgContext?.organizations ?? [];
  const current = orgContext?.currentOrganization;

  // Org/workspace lifecycle (create, join, list membership) lives on the
  // Gatekeeper identity dashboard, not the account console
  const orgDashboardUrl = AUTH_BASE_URL
    ? gatekeeperDashboardUrl(AUTH_BASE_URL)
    : "";

  // Nothing to switch between when the user belongs to no organizations
  if (!organizations.length) return null;

  return (
    <MenuRoot
      onSelect={(details) => {
        // Anchor items (e.g. manage workspaces) navigate on their own, so only
        // react to values that map to a known organization
        const org = organizations.find((o) => o.id === details.value);
        if (org) orgContext?.setCurrentOrganization(org.id);
      }}
    >
      <MenuTrigger asChild>
        <button
          type="button"
          className="flex w-full items-center gap-2 rounded-md border border-sidebar-border bg-sidebar-accent/40 px-3 py-2 text-left font-medium text-sidebar-foreground text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <Building2 className="size-4 shrink-0 text-primary" />
          <span className="flex-1 truncate">
            {current?.name ?? "Select workspace"}
          </span>
          <ChevronsUpDown className="size-4 shrink-0 opacity-60" />
        </button>
      </MenuTrigger>

      <MenuPositioner className="w-(--reference-width)!">
        <MenuContent className="flex max-h-80 min-w-56 flex-col gap-0 overflow-auto rounded-lg">
          {organizations.map((org) => {
            const isSelected = org.id === current?.id;

            return (
              <MenuItem key={org.id} value={org.id} className="gap-2">
                <Building2 className="size-4 shrink-0 opacity-70" />
                <span className="flex-1 truncate">{org.name}</span>
                {isSelected && (
                  <Check className="size-4 shrink-0 text-primary" />
                )}
              </MenuItem>
            );
          })}

          {orgDashboardUrl && (
            <>
              <MenuSeparator />

              <MenuItem asChild value="manage-workspaces" className="gap-2">
                <a href={orgDashboardUrl}>
                  <Settings2 className="size-4 shrink-0 opacity-70" />
                  Manage workspaces
                </a>
              </MenuItem>
            </>
          )}
        </MenuContent>
      </MenuPositioner>
    </MenuRoot>
  );
};

export default OrganizationSwitcher;
