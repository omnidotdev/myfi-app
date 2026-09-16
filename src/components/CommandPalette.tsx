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
import type { LucideIcon } from "lucide-react";
import {
  BarChart3Icon,
  BitcoinIcon,
  BookOpenIcon,
  CarIcon,
  ClipboardListIcon,
  FileTextIcon,
  HardDriveIcon,
  HomeIcon,
  LandmarkIcon,
  LayoutDashboardIcon,
  MoonStar,
  PackageIcon,
  PieChartIcon,
  PiggyBankIcon,
  ReceiptIcon,
  RepeatIcon,
  ScaleIcon,
  SettingsIcon,
  UsersIcon,
  WalletIcon,
} from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";

// Workspace-scoped destinations, grouped to match the sidebar. `to` is a
// TanStack route template filled with the active workspace slug at select time
type Destination = {
  id: string;
  label: string;
  to: string;
  icon: LucideIcon;
  group: string;
  keywords?: string[];
};

const DESTINATIONS: Destination[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    to: "/@{$workspaceSlug}/~",
    icon: LayoutDashboardIcon,
    group: "Overview",
    keywords: ["home", "summary"],
  },
  {
    id: "estimates",
    label: "Estimates",
    to: "/@{$workspaceSlug}/~/estimates",
    icon: ClipboardListIcon,
    group: "Sales",
    keywords: ["quotes", "proposals"],
  },
  {
    id: "invoices",
    label: "Invoices",
    to: "/@{$workspaceSlug}/~/invoices",
    icon: FileTextIcon,
    group: "Sales",
    keywords: ["accounts receivable", "ar", "billing"],
  },
  {
    id: "customers",
    label: "Customers",
    to: "/@{$workspaceSlug}/~/customers",
    icon: UsersIcon,
    group: "Sales",
    keywords: ["clients"],
  },
  {
    id: "bills",
    label: "Bills",
    to: "/@{$workspaceSlug}/~/bills",
    icon: ReceiptIcon,
    group: "Expenses",
    keywords: ["accounts payable", "ap", "vendors"],
  },
  {
    id: "recurring",
    label: "Recurring",
    to: "/@{$workspaceSlug}/~/recurring",
    icon: RepeatIcon,
    group: "Expenses",
    keywords: ["subscriptions", "memorized", "scheduled"],
  },
  {
    id: "mileage",
    label: "Mileage",
    to: "/@{$workspaceSlug}/~/mileage",
    icon: CarIcon,
    group: "Expenses",
    keywords: ["vehicle", "trips", "deduction"],
  },
  {
    id: "reconciliation",
    label: "Reconciliation",
    to: "/@{$workspaceSlug}/~/reconciliation",
    icon: ScaleIcon,
    group: "Banking",
    keywords: ["reconcile", "bank", "statements"],
  },
  {
    id: "spending",
    label: "Spending",
    to: "/@{$workspaceSlug}/~/spending",
    icon: PieChartIcon,
    group: "Banking",
    keywords: ["expenses", "categories", "trends"],
  },
  {
    id: "savings",
    label: "Savings",
    to: "/@{$workspaceSlug}/~/savings",
    icon: PiggyBankIcon,
    group: "Banking",
    keywords: ["goals"],
  },
  {
    id: "ledger",
    label: "Ledger",
    to: "/@{$workspaceSlug}/~/ledger",
    icon: BookOpenIcon,
    group: "Accounting",
    keywords: ["transactions", "journal", "entries"],
  },
  {
    id: "accounts",
    label: "Accounts",
    to: "/@{$workspaceSlug}/~/accounts",
    icon: LandmarkIcon,
    group: "Accounting",
    keywords: ["chart of accounts", "coa"],
  },
  {
    id: "reports",
    label: "Reports",
    to: "/@{$workspaceSlug}/~/reports",
    icon: BarChart3Icon,
    group: "Accounting",
    keywords: [
      "financials",
      "statements",
      "profit and loss",
      "balance sheet",
      "cash flow",
      "1099",
      "taxes",
    ],
  },
  {
    id: "items",
    label: "Inventory",
    to: "/@{$workspaceSlug}/~/items",
    icon: PackageIcon,
    group: "Assets & Budgeting",
    keywords: ["products", "stock", "items"],
  },
  {
    id: "assets",
    label: "Assets",
    to: "/@{$workspaceSlug}/~/assets",
    icon: HardDriveIcon,
    group: "Assets & Budgeting",
    keywords: ["fixed assets", "depreciation"],
  },
  {
    id: "crypto",
    label: "Crypto",
    to: "/@{$workspaceSlug}/~/crypto",
    icon: BitcoinIcon,
    group: "Assets & Budgeting",
    keywords: ["bitcoin", "cost basis"],
  },
  {
    id: "budgets",
    label: "Budgets",
    to: "/@{$workspaceSlug}/~/budgets",
    icon: WalletIcon,
    group: "Assets & Budgeting",
    keywords: ["budget", "planning"],
  },
  {
    id: "settings",
    label: "Settings",
    to: "/@{$workspaceSlug}/~/settings",
    icon: SettingsIcon,
    group: "Workspace",
    keywords: ["preferences", "vendors", "tax", "members"],
  },
];

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
      group: "Overview",
      icon: HomeIcon,
      onSelect: () => navigate({ to: "/" }),
    },
    // Navigation into the authenticated app is only offered to signed-in users
    // with a resolvable workspace handle
    ...(session?.user && activeWorkspaceSlug
      ? DESTINATIONS.map(
          (dest): CommandAction => ({
            id: dest.id,
            label: dest.label,
            group: dest.group,
            icon: dest.icon,
            keywords: dest.keywords,
            onSelect: () =>
              navigate({
                to: dest.to,
                params: { workspaceSlug: activeWorkspaceSlug },
              }),
          }),
        )
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
    <CommandPaletteShell
      commands={commands}
      placeholder="Search pages and actions..."
    />
  );
};

export default CommandPalette;
