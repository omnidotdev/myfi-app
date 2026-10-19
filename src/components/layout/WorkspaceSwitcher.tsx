import { gatekeeperDashboardUrl } from "@omnidotdev/providers/react";
import { WorkspaceSwitcher as SharedWorkspaceSwitcher } from "@omnidotdev/thornberry/workspace-switcher";
import { useNavigate } from "@tanstack/react-router";

import { AUTH_BASE_URL } from "@/lib/config/env.config";
import { useWorkspace } from "@/providers/WorkspaceProvider";

/**
 * Workspace switcher for the authed shell.
 *
 * Reads the user's Omni organizations from the organization context (sourced
 * from JWT claims, not a DB query) and switches the active workspace by
 * navigating to that workspace's URL (`/@{slug}/~`). The URL is the source of
 * truth, so the switch persists across refresh and deep links; the provider
 * also records it as last-used. Presentation is the shared thornberry switcher
 * (sidebar variant); a single-org user sees their workspace name without a
 * dropdown. This is top-level tenancy, distinct from the per-book picker.
 */
const WorkspaceSwitcher = () => {
  const orgContext = useWorkspace();
  const navigate = useNavigate();

  const organizations = orgContext?.workspaces ?? [];
  const current = orgContext?.currentWorkspace;

  // Nothing to switch between when the user belongs to no organizations
  if (!current || !organizations.length) return null;

  const handleSelect = (id: string) => {
    const org = organizations.find((o) => o.id === id);
    if (!org || org.id === current.id) return;

    // Remember as last-used, then navigate so the URL owns the active
    // workspace (survives refresh and is shareable)
    orgContext?.setCurrentWorkspace(org.id);
    navigate({
      to: "/@{$workspaceSlug}/~",
      params: { workspaceSlug: org.slug },
    });
  };

  return (
    <SharedWorkspaceSwitcher
      variant="sidebar"
      workspaces={organizations.map((org) => ({
        id: org.id,
        name: org.name,
        logo: org.logo,
      }))}
      currentWorkspaceId={current.id}
      onSelect={handleSelect}
      {...(AUTH_BASE_URL && {
        manageUrl: gatekeeperDashboardUrl(AUTH_BASE_URL),
      })}
    />
  );
};

export default WorkspaceSwitcher;
