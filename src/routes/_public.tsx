import {
  createFileRoute,
  Outlet,
  useRouteContext,
} from "@tanstack/react-router";
import {
  GithubIcon,
  LinkedinIcon,
  MenuIcon,
  TwitterIcon,
  XIcon,
} from "lucide-react";
import { useState } from "react";

import signIn from "@/lib/auth/signIn";
import signOut from "@/lib/auth/signOut";
import appConfig from "@/lib/config/app.config";

export const Route = createFileRoute("/_public")({
  component: PublicLayout,
});

function PublicLayout() {
  const { session } = useRouteContext({ from: "__root__" });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignIn = async () => {
    try {
      await signIn({ redirectUrl: window.location.origin, providerId: "omni" });
    } catch (error) {
      console.error("[handleSignIn] OAuth sign-in failed:", error);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col">
      {/* Ambient glow orbs */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {/* Primary emerald glow -- top right */}
        <div
          className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-primary-500/10 blur-[120px]"
          style={{ animation: "wealth-pulse 8s ease-in-out infinite" }}
        />
        {/* Secondary teal glow -- bottom left */}
        <div
          className="absolute -bottom-24 -left-24 h-[400px] w-[400px] rounded-full bg-secondary-500/5 blur-[100px]"
          style={{ animation: "wealth-pulse 10s ease-in-out infinite 2s" }}
        />
      </div>

      {/* Header */}
      <div className="sticky top-0 z-50">
        <header className="w-full border-border border-b bg-background/80 backdrop-blur-lg">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <a href="/" className="flex items-center gap-2">
              <span className="font-bold text-primary text-xl tracking-tight">
                {appConfig.name}
              </span>
            </a>

            {/* Desktop nav */}
            <div className="hidden items-center gap-3 md:flex">
              <a
                href={appConfig.links.docs}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md px-3 py-2 font-medium text-muted-foreground text-sm transition-colors hover:text-foreground"
              >
                Docs
              </a>
              <a
                href={appConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md px-3 py-2 font-medium text-muted-foreground text-sm transition-colors hover:text-foreground"
              >
                GitHub
              </a>

              {session ? (
                <button
                  type="button"
                  onClick={signOut}
                  className="rounded-md border border-border bg-background px-4 py-2 font-medium text-sm transition-colors hover:bg-accent"
                >
                  Sign Out
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSignIn}
                  className="rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90"
                >
                  Sign In
                </button>
              )}
            </div>

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
              <div className="space-y-1 px-4 py-3">
                <a
                  href={appConfig.links.docs}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-md px-3 py-2 font-medium text-muted-foreground text-sm hover:bg-accent hover:text-foreground"
                >
                  Docs
                </a>
                <a
                  href={appConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-md px-3 py-2 font-medium text-muted-foreground text-sm hover:bg-accent hover:text-foreground"
                >
                  GitHub
                </a>
                <div className="pt-2">
                  {session ? (
                    <button
                      type="button"
                      onClick={signOut}
                      className="w-full rounded-md border border-border bg-background px-4 py-2 font-medium text-sm transition-colors hover:bg-accent"
                    >
                      Sign Out
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSignIn}
                      className="w-full rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90"
                    >
                      Sign In
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </header>
      </div>

      {/* Main content */}
      <main className="relative z-10 flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-border border-t bg-muted/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-sm">
                Built by{" "}
                <a
                  href={appConfig.organization.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground transition-colors hover:text-primary"
                >
                  {appConfig.organization.name}
                </a>
              </span>
            </div>

            <div className="flex items-center gap-6">
              <a
                href={appConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-base-400 transition-colors hover:text-primary"
              >
                <GithubIcon size={20} />
              </a>
              <a
                href={appConfig.organization.x}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="text-base-400 transition-colors hover:text-primary"
              >
                <TwitterIcon size={20} />
              </a>
              <a
                href={appConfig.organization.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-base-400 transition-colors hover:text-primary"
              >
                <LinkedinIcon size={20} />
              </a>
            </div>

            <p className="text-muted-foreground text-sm">
              &copy; {new Date().getFullYear()}{" "}
              <a
                href={appConfig.organization.website}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground"
              >
                {appConfig.organization.name}
              </a>
              . All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
