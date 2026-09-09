import {
  createFileRoute,
  Outlet,
  useRouteContext,
} from "@tanstack/react-router";
import { GithubIcon, MenuIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";

import signIn from "@/lib/auth/signIn";
import signOut from "@/lib/auth/signOut";
import appConfig from "@/lib/config/app.config";

export const Route = createFileRoute("/_public")({
  component: PublicLayout,
});

function PublicLayout() {
  const { session } = useRouteContext({ from: "__root__" });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [stuck, setStuck] = useState(false);

  const signedIn = Boolean(session?.user?.identityProviderId);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSignIn = async () => {
    try {
      await signIn({ redirectUrl: window.location.origin, providerId: "omni" });
    } catch (error) {
      console.error("[handleSignIn] OAuth sign-in failed:", error);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col">
      {/* Faint ledger-paper hairline grid */}
      <div
        className="paper-grid pointer-events-none fixed inset-0 z-0"
        aria-hidden="true"
      />

      {/* Header */}
      <header
        className={`sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md transition-colors ${
          stuck ? "border-border" : "border-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:px-8">
          <a href="/" className="flex items-baseline gap-2">
            <span className="text-base leading-none">💰</span>
            <span className="font-medium font-serif text-foreground text-xl tracking-tight">
              {appConfig.name}
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-baseline gap-7 md:flex">
            <a
              href={appConfig.links.docs}
              target="_blank"
              rel="noopener noreferrer"
              className="border-transparent border-b font-medium text-muted-foreground text-sm transition-colors hover:border-primary hover:text-primary"
            >
              Documentation
            </a>
            <a
              href={appConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="border-transparent border-b font-medium text-muted-foreground text-sm transition-colors hover:border-primary hover:text-primary"
            >
              Open source
            </a>
            {signedIn ? (
              <button
                type="button"
                onClick={signOut}
                className="font-medium text-foreground text-sm transition-colors hover:text-primary"
              >
                Sign out
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSignIn}
                className="font-medium text-foreground text-sm transition-colors hover:text-primary"
              >
                Sign in
              </button>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              {mobileMenuOpen ? (
                <XIcon className="size-5" />
              ) : (
                <MenuIcon className="size-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="border-border border-t bg-background md:hidden">
            <div className="space-y-1 px-6 py-4">
              <a
                href={appConfig.links.docs}
                target="_blank"
                rel="noopener noreferrer"
                className="block py-2 font-medium text-muted-foreground text-sm hover:text-primary"
              >
                Documentation
              </a>
              <a
                href={appConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="block py-2 font-medium text-muted-foreground text-sm hover:text-primary"
              >
                Open source
              </a>
              <div className="pt-2">
                {signedIn ? (
                  <button
                    type="button"
                    onClick={signOut}
                    className="w-full rounded-lg border border-border bg-background px-4 py-2 font-medium text-sm transition-colors hover:bg-accent"
                  >
                    Sign out
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSignIn}
                    className="w-full rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90"
                  >
                    Sign in
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="relative z-10 flex-1">
        <Outlet />
      </main>

      {/* Footer colophon */}
      <footer className="relative z-10 border-border border-t">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-6 lg:px-8">
          <span className="font-serif text-muted-foreground text-sm italic">
            Free and open source, forever.
          </span>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-muted-foreground text-xs">
            <span className="inline-flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-primary" />
              Made with 💰 by{" "}
              <a
                href={appConfig.organization.website}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
              >
                {appConfig.organization.name}
              </a>
            </span>
            <span aria-hidden="true">&middot;</span>
            <a
              href={appConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-primary"
            >
              <GithubIcon size={13} /> Source
            </a>
            <span aria-hidden="true">&middot;</span>
            <a href={appConfig.url} className="hover:text-primary">
              myfi.omni.dev
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
