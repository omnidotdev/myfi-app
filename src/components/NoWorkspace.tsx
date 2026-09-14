import { gatekeeperDashboardUrl } from "@omnidotdev/providers/react";
import { ArrowRightIcon, Building2Icon, RefreshCwIcon } from "lucide-react";

import signIn from "@/lib/auth/signIn";
import signOut from "@/lib/auth/signOut";
import { AUTH_BASE_URL } from "@/lib/config/env.config";

type Props = {
  /**
   * A degraded session is authenticated but carries no access token, so
   * organizations could not be loaded. This is distinct from a genuinely
   * workspace-less user and is resolved by signing in again, not by creating a
   * workspace
   */
  degraded: boolean;
};

/**
 * Shown to an authenticated user who has no workspace to land on: either the
 * session is degraded (prompt a fresh sign-in) or the user genuinely belongs to
 * no organization yet (send them to the identity dashboard to create or join
 * one). Without this they would fall through to the marketing landing page,
 * which reads as if they were signed out
 */
function NoWorkspace({ degraded }: Props) {
  const orgDashboardUrl = AUTH_BASE_URL
    ? gatekeeperDashboardUrl(AUTH_BASE_URL)
    : "";

  const handleReauth = async () => {
    try {
      await signIn({
        redirectUrl: `${window.location.origin}/`,
        providerId: "omni",
      });
    } catch {
      // Auth redirect will handle the flow
    }
  };

  return (
    <div className="mx-auto flex min-h-[70dvh] max-w-xl flex-col items-center justify-center gap-6 px-6 text-center">
      <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
        {degraded ? (
          <RefreshCwIcon className="size-6" />
        ) : (
          <Building2Icon className="size-6" />
        )}
      </span>

      {degraded ? (
        <>
          <div className="flex flex-col gap-2">
            <h1 className="font-serif text-2xl text-foreground tracking-tight">
              Your session needs a refresh
            </h1>
            <p className="text-muted-foreground">
              We could not load your workspaces. Signing in again will restore
              your session.
            </p>
          </div>

          <button
            type="button"
            onClick={handleReauth}
            className="group inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-6 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Sign in again
            <ArrowRightIcon
              size={18}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </button>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-2">
            <h1 className="font-serif text-2xl text-foreground tracking-tight">
              No workspace yet
            </h1>
            <p className="text-muted-foreground">
              You are signed in but do not belong to a workspace. Create one or
              join an existing workspace to get started.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 sm:flex-row">
            {orgDashboardUrl && (
              <a
                href={orgDashboardUrl}
                className="group inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-6 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Create or join a workspace
                <ArrowRightIcon
                  size={18}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </a>
            )}

            <button
              type="button"
              onClick={signOut}
              className="inline-flex h-11 items-center justify-center rounded-lg border border-border px-6 font-medium transition-colors hover:border-primary/50 hover:text-primary"
            >
              Sign out
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default NoWorkspace;
