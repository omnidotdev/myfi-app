import type { CommandAction } from "@omnidotdev/thornberry/command-palette";
import { CommandPalette as CommandPaletteShell } from "@omnidotdev/thornberry/command-palette";
import {
  GLOBAL_HOTKEYS,
  hotkeyLabel,
} from "@omnidotdev/thornberry/use-hotkeys";
import {
  useNavigate,
  useParams,
  useRouteContext,
} from "@tanstack/react-router";
import {
  BarChart3Icon,
  BookOpenIcon,
  HomeIcon,
  LandmarkIcon,
  LayoutDashboardIcon,
  MoonStar,
  SettingsIcon,
  WalletIcon,
} from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";

/**
 * Global command palette (⌘/Ctrl+K). Mounted once at the app root so it works on
 * every route. Exposes top-level navigation and the theme toggle. Built on the
 * shared Thornberry palette so every Omni app shares the same behavior; this
 * wrapper only supplies MyFi's own actions. The shell owns the open state and
 * the mod+k hotkey, so no local open state is needed here.
 */
const CommandPalette = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { session } = useRouteContext({ from: "__root__" });

  // The active workspace is carried in the URL; when the palette is opened off a
  // workspace route (e.g. the landing page) fall back to the user's own org so
  // the nav targets still resolve to a valid handle
  const { workspaceSlug } = useParams({ strict: false });
  const activeWorkspaceSlug =
    workspaceSlug ??
    session?.organizations?.find((o) => o.type === "personal")?.slug ??
    session?.organizations?.[0]?.slug;

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  // The authenticated layout (`_app`) already binds "t" to the theme toggle, so
  // the hotkey is intentionally not registered here to avoid double-firing. The
  // palette still surfaces the action and its shortcut label
  const commands: CommandAction[] = [
    {
      id: "home",
      label: "Home",
      group: "Navigation",
      icon: HomeIcon,
      onSelect: () => navigate({ to: "/" }),
    },
    // Navigation into the authenticated app is only offered to signed-in users
    // with a resolvable workspace handle
    ...(session?.user && activeWorkspaceSlug
      ? ([
          {
            id: "dashboard",
            label: "Dashboard",
            group: "Navigation",
            icon: LayoutDashboardIcon,
            onSelect: () =>
              navigate({
                to: "/@{$workspaceSlug}/~",
                params: { workspaceSlug: activeWorkspaceSlug },
              }),
          },
          {
            id: "ledger",
            label: "Ledger",
            group: "Navigation",
            icon: BookOpenIcon,
            keywords: ["transactions"],
            onSelect: () =>
              navigate({
                to: "/@{$workspaceSlug}/~/ledger",
                params: { workspaceSlug: activeWorkspaceSlug },
              }),
          },
          {
            id: "accounts",
            label: "Accounts",
            group: "Navigation",
            icon: LandmarkIcon,
            onSelect: () =>
              navigate({
                to: "/@{$workspaceSlug}/~/accounts",
                params: { workspaceSlug: activeWorkspaceSlug },
              }),
          },
          {
            id: "budgets",
            label: "Budgets",
            group: "Navigation",
            icon: WalletIcon,
            onSelect: () =>
              navigate({
                to: "/@{$workspaceSlug}/~/budgets",
                params: { workspaceSlug: activeWorkspaceSlug },
              }),
          },
          {
            id: "reports",
            label: "Reports",
            group: "Navigation",
            icon: BarChart3Icon,
            onSelect: () =>
              navigate({
                to: "/@{$workspaceSlug}/~/reports",
                params: { workspaceSlug: activeWorkspaceSlug },
              }),
          },
          {
            id: "settings",
            label: "Settings",
            group: "Navigation",
            icon: SettingsIcon,
            onSelect: () =>
              navigate({
                to: "/@{$workspaceSlug}/~/settings",
                params: { workspaceSlug: activeWorkspaceSlug },
              }),
          },
        ] satisfies CommandAction[])
      : []),
    {
      id: "toggle-theme",
      label:
        theme === "light" ? "Switch to dark theme" : "Switch to light theme",
      group: "Preferences",
      icon: MoonStar,
      keywords: ["theme", "dark", "light", "appearance"],
      shortcut: hotkeyLabel(GLOBAL_HOTKEYS.toggleTheme),
      onSelect: toggleTheme,
    },
  ];

  return (
    <CommandPaletteShell commands={commands} placeholder="Search actions..." />
  );
};

export default CommandPalette;
