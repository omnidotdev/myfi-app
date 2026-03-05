import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
} from "@tanstack/react-router";
import {
  BarChart3Icon,
  BitcoinIcon,
  BookOpenIcon,
  LandmarkIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  MenuIcon,
  WalletIcon,
  XIcon,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Toaster } from "sonner";

import ErrorBoundary from "@/components/core/ErrorBoundary";
import signOut from "@/lib/auth/signOut";
import appConfig from "@/lib/config/app.config";
import OrganizationProvider from "@/providers/OrganizationProvider";
import {
  getLastOrgCookie,
  setLastOrgCookie,
} from "@/server/functions/lastWorkspace";

export const Route = createFileRoute("/_app")({
  beforeLoad: async ({ context: { session } }) => {
    if (!session?.user) throw redirect({ to: "/" });

    const slug = await getLastOrgCookie();
    const orgs = session.organizations ?? [];

    const matched = slug ? orgs.find((o) => o.slug === slug) : undefined;
    const active = matched ?? orgs[0];

    // Persist default when no cookie or cookie didn't match
    if (active && active.slug !== slug) {
      await setLastOrgCookie({ data: active.slug });
    }

    return { organizationId: active?.id };
  },
  component: AuthLayout,
});

const navItems = [
  {
    label: appConfig.modules.dashboard.label,
    href: "/dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    label: appConfig.modules.ledger.label,
    href: "/ledger",
    icon: BookOpenIcon,
  },
  {
    label: appConfig.modules.accounts.label,
    href: "/accounts",
    icon: LandmarkIcon,
  },
  {
    label: appConfig.modules.budgets.label,
    href: "/budgets",
    icon: WalletIcon,
  },
  {
    label: appConfig.modules.crypto.label,
    href: "/crypto",
    icon: BitcoinIcon,
  },
  {
    label: appConfig.modules.reports.label,
    href: "/reports",
    icon: BarChart3Icon,
  },
];

function AuthLayout() {
  const { session } = Route.useRouteContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const organizations = useMemo(
    () => session?.organizations ?? [],
    [session?.organizations],
  );

  return (
    <OrganizationProvider organizations={organizations}>
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
          <span className="font-bold text-lg text-primary tracking-tight">
            {appConfig.name}
          </span>
        </div>

        {/* Mobile menu overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-30 flex flex-col bg-sidebar pt-14 md:hidden print:hidden">
            <nav className="flex-1 space-y-1 p-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 rounded-md px-3 py-2 font-medium text-sidebar-foreground text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <item.icon className="size-4" />
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="border-sidebar-border border-t p-3">
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
          <div className="flex h-16 items-center gap-2 border-sidebar-border border-b px-4">
            <span className="font-bold text-lg text-primary tracking-tight">
              {appConfig.name}
            </span>
          </div>

          {/* Nav */}
          <nav className="flex-1 space-y-1 p-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="flex items-center gap-3 rounded-md px-3 py-2 font-medium text-sidebar-foreground text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <item.icon className="size-4" />
                {item.label}
              </Link>
            ))}
          </nav>

          {/* User section */}
          <div className="border-sidebar-border border-t p-3">
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
