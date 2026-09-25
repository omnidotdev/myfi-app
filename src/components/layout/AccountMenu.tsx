import { accountUrl } from "@omnidotdev/providers/react";
import {
  AvatarFallback,
  AvatarImage,
  AvatarRoot,
} from "@omnidotdev/thornberry/avatar";
import {
  MenuContent,
  MenuItem,
  MenuPositioner,
  MenuRoot,
  MenuSeparator,
  MenuTrigger,
} from "@omnidotdev/thornberry/menu";
import { ChevronsUpDown, ExternalLink, LogOut } from "lucide-react";

import signOut from "@/lib/auth/signOut";
import { ACCOUNT_URL } from "@/lib/config/env.config";

interface Props {
  /** Signed-in user, sourced from the route context session */
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  /** Invoked on any menu selection, e.g. to close the mobile sidebar overlay */
  onSelect?: () => void;
}

/**
 * Account control for the sidebar footer: the user's avatar and name, with
 * "Manage account" and "Sign out" nested in a dropdown rather than laid out
 * flat. Mirrors the account menu pattern shared across Omni product sidebars
 */
const AccountMenu = ({ user, onSelect }: Props) => {
  const displayName = user?.name || user?.email || "Account";

  return (
    <MenuRoot
      onSelect={(details) => {
        onSelect?.();
        if (details.value === "sign-out") signOut();
      }}
    >
      <MenuTrigger asChild>
        <button
          type="button"
          className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left font-medium text-sidebar-foreground text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <AvatarRoot className="size-6 shrink-0">
            <AvatarImage src={user?.image ?? undefined} alt={displayName} />
            <AvatarFallback className="font-semibold text-xs uppercase">
              {displayName.charAt(0)}
            </AvatarFallback>
          </AvatarRoot>
          <span className="min-w-0 flex-1 truncate">{displayName}</span>
          <ChevronsUpDown className="size-4 shrink-0 opacity-60" />
        </button>
      </MenuTrigger>

      <MenuPositioner className="w-(--reference-width)!">
        <MenuContent className="flex min-w-56 flex-col gap-0 rounded-lg">
          {ACCOUNT_URL && (
            <>
              <MenuItem asChild value="manage-account" className="gap-2">
                <a
                  href={accountUrl(ACCOUNT_URL)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="size-4 shrink-0 opacity-70" />
                  Manage account
                </a>
              </MenuItem>

              <MenuSeparator />
            </>
          )}

          <MenuItem value="sign-out" className="gap-2 text-destructive">
            <LogOut className="size-4 shrink-0" />
            Sign out
          </MenuItem>
        </MenuContent>
      </MenuPositioner>
    </MenuRoot>
  );
};

export default AccountMenu;
