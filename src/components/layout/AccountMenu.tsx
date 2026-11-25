import {
  accountUrl,
  otherRememberedAccounts,
  useRememberedAccounts,
} from "@omnidotdev/providers/react";
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
import {
  ArrowLeftRight,
  ChevronsUpDown,
  ExternalLink,
  LogOut,
} from "lucide-react";

import signOut from "@/lib/auth/signOut";
import switchAccount from "@/lib/auth/switchAccount";
import { ACCOUNT_URL, AUTH_BASE_URL } from "@/lib/config/env.config";

/** Prefix of a remembered account's menu item value, followed by its handle */
const ACCOUNT_VALUE_PREFIX = "account:";

interface Props {
  /** Signed-in user, sourced from the route context session */
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    /** Omni account subject, passed to the account hub as `login_hint` */
    identityProviderId?: string | null;
  };
  /** Invoked on any menu selection, e.g. to close the mobile sidebar overlay */
  onSelect?: () => void;
}

/** An account's avatar: its image, or the first letter of its name */
const AccountAvatar = ({
  name,
  image,
}: {
  name: string;
  image?: string | null;
}) => (
  <AvatarRoot className="size-6 shrink-0">
    <AvatarImage src={image ?? undefined} alt={name} />
    <AvatarFallback className="font-semibold text-xs uppercase">
      {name.charAt(0)}
    </AvatarFallback>
  </AvatarRoot>
);

/**
 * Account control for the sidebar footer: the user's avatar and name, with
 * "Manage account", the other accounts signed in on this browser, "Switch
 * account" and "Sign out" nested in a dropdown rather than laid out flat.
 * Mirrors the account menu pattern shared across Omni product sidebars
 */
const AccountMenu = ({ user, onSelect }: Props) => {
  const displayName = user?.name || user?.email || "Account";

  // The other accounts signed in on this browser, one click to switch to
  const otherAccounts = otherRememberedAccounts(
    useRememberedAccounts({ authBaseUrl: AUTH_BASE_URL, enabled: !!user }),
    user?.email,
  );

  return (
    <MenuRoot
      onSelect={(details) => {
        onSelect?.();
        if (details.value.startsWith(ACCOUNT_VALUE_PREFIX))
          void switchAccount(details.value.slice(ACCOUNT_VALUE_PREFIX.length));
        if (details.value === "switch-account") void switchAccount();
        if (details.value === "sign-out") void signOut({ accounts: "current" });
        if (details.value === "sign-out-all") void signOut({ accounts: "all" });
      }}
    >
      <MenuTrigger asChild>
        <button
          type="button"
          className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left font-medium text-sidebar-foreground text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <AccountAvatar name={displayName} image={user?.image} />
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
                  href={accountUrl(ACCOUNT_URL, {
                    loginHint: user?.identityProviderId,
                  })}
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

          {otherAccounts.map((account) => {
            const name = account.name?.trim() || account.email || "Account";

            return (
              <MenuItem
                key={account.handle}
                value={`${ACCOUNT_VALUE_PREFIX}${account.handle}`}
                className="gap-2"
              >
                <AccountAvatar name={name} image={account.image} />
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate">{name}</span>
                  {account.name?.trim() && account.email && (
                    <span className="truncate text-muted-foreground text-xs">
                      {account.email}
                    </span>
                  )}
                </span>
              </MenuItem>
            );
          })}

          <MenuItem value="switch-account" className="gap-2">
            <ArrowLeftRight className="size-4 shrink-0 opacity-70" />
            Switch account
          </MenuItem>

          <MenuItem value="sign-out" className="gap-2 text-destructive">
            <LogOut className="size-4 shrink-0" />
            Sign out
          </MenuItem>

          {otherAccounts.length > 0 && (
            <MenuItem value="sign-out-all" className="gap-2 text-destructive">
              <LogOut className="size-4 shrink-0" />
              Sign out of all accounts
            </MenuItem>
          )}
        </MenuContent>
      </MenuPositioner>
    </MenuRoot>
  );
};

export default AccountMenu;
