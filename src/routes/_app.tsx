import { accountUrl } from "@omnidotdev/providers/react";
import { openCommandPalette } from "@omnidotdev/thornberry/command-palette";
import { LogoLockup } from "@omnidotdev/thornberry/logo-lockup";
import {
  GLOBAL_HOTKEYS,
  hotkeyLabel,
} from "@omnidotdev/thornberry/use-hotkeys";
import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
  useParams,
} from "@tanstack/react-router";
import {
  BanknoteIcon,
  BarChart3Icon,
  BitcoinIcon,
  BookOpenIcon,
  CarIcon,
  ClipboardListIcon,
  FileTextIcon,
  FolderIcon,
  HardDriveIcon,
  LandmarkIcon,
  LayoutDashboardIcon,
  LockIcon,
  LogOutIcon,
  MenuIcon,
  MoonIcon,
  PackageIcon,
  PieChartIcon,
  PiggyBankIcon,
  ReceiptIcon,
  RepeatIcon,
  ScaleIcon,
  SearchIcon,
  SettingsIcon,
  SunIcon,
  UserCogIcon,
  UsersIcon,
  WalletIcon,
  XIcon,
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { Toaster } from "sonner";
import { useEventListener } from "usehooks-ts";
import ErrorBoundary from "@/components/core/ErrorBoundary";
import OrganizationSwitcher from "@/components/layout/OrganizationSwitcher";
import MyfiMark from "@/components/MyfiMark";
import { isSessionDegraded } from "@/lib/auth/sessionState";
import signOut from "@/lib/auth/signOut";
import appConfig from "@/lib/config/app.config";
import { ACCOUNT_URL } from "@/lib/config/env.config";
import { OrganizationProvider } from "@/providers/OrganizationProvider";
import { useTheme } from "@/providers/ThemeProvider";

export const Route = createFileRoute("/_app")({
  beforeLoad: ({ context: { session } }) => {
    if (!session?.user) throw redirect({ to: "/" });
  },
  component: AuthLayout,
});

// The active workspace is carried in the URL (`/@{slug}/~/...`), so every nav
// target is a workspace-scoped template filled with the current slug at render.
// Nav is grouped by use case; a group without a label renders its items with no
// section heading (used for the top-level Dashboard and the trailing Settings)
const navGroups = [
  {
    label: undefined,
    items: [
      {
        label: appConfig.modules.dashboard.label,
        to: "/@{$workspaceSlug}/~",
        icon: LayoutDashboardIcon,
      },
    ],
  },
  {
    label: "Sales",
    items: [
      {
        label: "Estimates",
        to: "/@{$workspaceSlug}/~/estimates",
        icon: ClipboardListIcon,
      },
      {
        label: "Invoices",
        to: "/@{$workspaceSlug}/~/invoices",
        icon: FileTextIcon,
      },
      {
        label: "Customers",
        to: "/@{$workspaceSlug}/~/customers",
        icon: UsersIcon,
      },
    ],
  },
  {
    label: "Expenses",
    items: [
      {
        label: "Bills",
        to: "/@{$workspaceSlug}/~/bills",
        icon: ReceiptIcon,
      },
      {
        label: "Recurring",
        to: "/@{$workspaceSlug}/~/recurring",
        icon: RepeatIcon,
      },
      {
        label: appConfig.modules.mileage.label,
        to: "/@{$workspaceSlug}/~/mileage",
        icon: CarIcon,
      },
    ],
  },
  {
    label: "Banking",
    items: [
      {
        label: "Reconciliation",
        to: "/@{$workspaceSlug}/~/reconciliation",
        icon: ScaleIcon,
      },
      {
        label: "Spending",
        to: "/@{$workspaceSlug}/~/spending",
        icon: PieChartIcon,
      },
      {
        label: "Savings",
        to: "/@{$workspaceSlug}/~/savings",
        icon: PiggyBankIcon,
      },
    ],
  },
  {
    label: "Accounting",
    items: [
      {
        label: appConfig.modules.ledger.label,
        to: "/@{$workspaceSlug}/~/ledger",
        icon: BookOpenIcon,
      },
      {
        label: appConfig.modules.accounts.label,
        to: "/@{$workspaceSlug}/~/accounts",
        icon: LandmarkIcon,
      },
      {
        label: appConfig.modules.loans.label,
        to: "/@{$workspaceSlug}/~/loans",
        icon: BanknoteIcon,
      },
      {
        label: appConfig.modules.projects.label,
        to: "/@{$workspaceSlug}/~/projects",
        icon: FolderIcon,
      },
      {
        label: appConfig.modules.reports.label,
        to: "/@{$workspaceSlug}/~/reports",
        icon: BarChart3Icon,
      },
      {
        label: appConfig.modules.documents.label,
        to: "/@{$workspaceSlug}/~/documents",
        icon: FileTextIcon,
      },
      {
        label: appConfig.modules.close.label,
        to: "/@{$workspaceSlug}/~/close",
        icon: LockIcon,
      },
    ],
  },
  {
    label: "Assets & Budgeting",
    items: [
      {
        label: "Inventory",
        to: "/@{$workspaceSlug}/~/items",
        icon: PackageIcon,
      },
      {
        label: appConfig.modules.assets.label,
        to: "/@{$workspaceSlug}/~/assets",
        icon: HardDriveIcon,
      },
      {
        label: appConfig.modules.crypto.label,
        to: "/@{$workspaceSlug}/~/crypto",
        icon: BitcoinIcon,
      },
      {
        label: appConfig.modules.budgets.label,
        to: "/@{$workspaceSlug}/~/budgets",
        icon: WalletIcon,
      },
    ],
  },
  {
    label: undefined,
    items: [
      {
        label: "Settings",
        to: "/@{$workspaceSlug}/~/settings",
        icon: SettingsIcon,
      },
    ],
  },
] as const;

/**
 * The grouped sidebar links, shared by the desktop sidebar and the mobile
 * overlay. `onNavigate` lets the mobile menu close itself on selection
 */
function NavLinks({
  navSlug,
  onNavigate,
}: {
  navSlug: string;
  onNavigate?: () => void;
}) {
  return (
    <div className="space-y-4">
      {navGroups.map((group, index) => (
        <div key={group.label ?? `group-${index}`} className="space-y-1">
          {group.label && (
            <p className="px-3 pb-0.5 font-medium text-[11px] text-sidebar-foreground/50 uppercase tracking-wider">
              {group.label}
            </p>
          )}
          {group.items.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              params={{ workspaceSlug: navSlug }}
              onClick={onNavigate}
              activeOptions={{ exact: item.to === "/@{$workspaceSlug}/~" }}
              activeProps={{
                className: "bg-sidebar-accent text-sidebar-accent-foreground",
              }}
              className="flex items-center gap-3 rounded-md px-3 py-2 font-medium text-sidebar-foreground text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <item.icon className="size-4" />
              {item.label}
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}

function AuthLayout() {
  const { session } = Route.useRouteContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleTheme = useCallback(
    () => setTheme(theme === "dark" ? "light" : "dark"),
    [theme, setTheme],
  );

  useEventListener("keydown", (e) => {
    if (
      e.key === "t" &&
      !e.metaKey &&
      !e.ctrlKey &&
      !e.altKey &&
      !(e.target instanceof HTMLInputElement) &&
      !(e.target instanceof HTMLTextAreaElement) &&
      !(e.target instanceof HTMLSelectElement)
    ) {
      toggleTheme();
    }
  });

  const organizations = useMemo(
    () => session?.organizations ?? [],
    [session?.organizations],
  );

  // The URL owns the active workspace; the provider resolves it (falling back to
  // last-used, then first org). For nav link params we need a concrete slug, so
  // mirror that fallback here (personal org preferred)
  const { workspaceSlug } = useParams({ strict: false });
  const navSlug =
    workspaceSlug ??
    organizations.find((o) => o.type === "personal")?.slug ??
    organizations[0]?.slug ??
    "";

  return (
    <OrganizationProvider
      organizations={organizations}
      activeSlug={workspaceSlug}
      isDegraded={isSessionDegraded(session)}
    >
      <div className="flex h-dvh w-full">
        {/* Mobile top bar */}
        <div className="fixed inset-x-0 top-0 z-40 flex h-14 items-center gap-3 border-sidebar-border border-b bg-sidebar px-4 md:hidden print:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="text-sidebar-foreground"
          >
            {mobileMenuOpen ? (
              <XIcon className="size-5" />
            ) : (
              <MenuIcon className="size-5" />
            )}
          </button>
          <LogoLockup
            logo={<MyfiMark className="size-6 shrink-0 text-foreground" />}
            name={appConfig.name}
            nameClassName="font-medium font-serif text-foreground text-xl tracking-tight"
          />
          <button
            type="button"
            onClick={() => openCommandPalette()}
            aria-label="Search"
            className="ml-auto text-sidebar-foreground"
          >
            <SearchIcon className="size-5" />
          </button>
        </div>

        {/* Mobile menu overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-30 flex flex-col bg-sidebar pt-14 md:hidden print:hidden">
            {organizations.length > 0 && (
              <div className="shrink-0 border-sidebar-border border-b p-3">
                <OrganizationSwitcher />
              </div>
            )}

            <nav className="min-h-0 flex-1 overflow-y-auto p-3">
              <NavLinks
                navSlug={navSlug}
                onNavigate={() => setMobileMenuOpen(false)}
              />
            </nav>

            <div className="shrink-0 border-sidebar-border border-t p-3">
              <button
                type="button"
                onClick={toggleTheme}
                className="flex w-full items-center gap-3 rounded-md px-3 py-2 font-medium text-sidebar-foreground text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                {theme === "dark" ? (
                  <MoonIcon className="size-4" />
                ) : (
                  <SunIcon className="size-4" />
                )}
                Toggle Theme
                <kbd className="ml-auto rounded border border-sidebar-border px-1.5 py-0.5 font-mono text-[10px] text-sidebar-foreground/50">
                  T
                </kbd>
              </button>

              {ACCOUNT_URL && (
                <a
                  href={accountUrl(ACCOUNT_URL)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center gap-3 rounded-md px-3 py-2 font-medium text-sidebar-foreground text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <UserCogIcon className="size-4" />
                  Manage account
                </a>
              )}

              <div className="flex items-center justify-between rounded-md px-3 py-2">
                <span className="truncate text-sidebar-foreground text-sm">
                  {session?.user?.name || session?.user?.email}
                </span>
                <button
                  type="button"
                  onClick={signOut}
                  aria-label="Sign out"
                  className="text-sidebar-foreground/60 transition-colors hover:text-sidebar-foreground"
                >
                  <LogOutIcon className="size-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 flex-col border-sidebar-border border-r bg-sidebar md:flex print:hidden">
          {/* Brand */}
          <div className="flex h-16 shrink-0 items-center gap-2 border-sidebar-border border-b px-4">
            <LogoLockup
              logo={<MyfiMark className="size-6 shrink-0 text-foreground" />}
              name={appConfig.name}
              nameClassName="font-medium font-serif text-foreground text-xl tracking-tight"
            />
          </div>

          {/* Global search */}
          <div className="shrink-0 px-3 pt-3">
            <button
              type="button"
              onClick={() => openCommandPalette()}
              className="flex w-full items-center gap-2 rounded-md border border-sidebar-border bg-sidebar-accent/40 px-3 py-2 text-sidebar-foreground/60 text-sm transition-colors hover:text-sidebar-foreground"
            >
              <SearchIcon className="size-4" />
              <span>Search</span>
              <kbd className="ml-auto rounded border border-sidebar-border px-1.5 py-0.5 font-mono text-[10px] text-sidebar-foreground/50">
                {hotkeyLabel(GLOBAL_HOTKEYS.commandPalette)}
              </kbd>
            </button>
          </div>

          {/* Workspace switcher */}
          {organizations.length > 0 && (
            <div className="shrink-0 border-sidebar-border p-3">
              <OrganizationSwitcher />
            </div>
          )}

          {/* Nav */}
          <nav className="min-h-0 flex-1 overflow-y-auto p-3">
            <NavLinks navSlug={navSlug} />
          </nav>

          {/* Footer */}
          <div className="shrink-0 border-sidebar-border border-t p-3">
            <button
              type="button"
              onClick={toggleTheme}
              className="flex w-full items-center gap-3 rounded-md px-3 py-2 font-medium text-sidebar-foreground text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              {theme === "dark" ? (
                <MoonIcon className="size-4" />
              ) : (
                <SunIcon className="size-4" />
              )}
              Toggle Theme
              <kbd className="ml-auto rounded border border-sidebar-border px-1.5 py-0.5 font-mono text-[10px] text-sidebar-foreground/50">
                T
              </kbd>
            </button>

            {ACCOUNT_URL && (
              <a
                href={accountUrl(ACCOUNT_URL)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center gap-3 rounded-md px-3 py-2 font-medium text-sidebar-foreground text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <UserCogIcon className="size-4" />
                Manage account
              </a>
            )}

            <div className="flex items-center justify-between rounded-md px-3 py-2">
              <span className="truncate text-sidebar-foreground text-sm">
                {session?.user?.name || session?.user?.email}
              </span>
              <button
                type="button"
                onClick={signOut}
                aria-label="Sign out"
                className="text-sidebar-foreground/60 transition-colors hover:text-sidebar-foreground"
              >
                <LogOutIcon className="size-4" />
              </button>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto pt-14 md:pt-0">
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </main>
      </div>
      <Toaster position="bottom-right" richColors />
    </OrganizationProvider>
  );
}
