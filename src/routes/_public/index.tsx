import { createFileRoute, redirect } from "@tanstack/react-router";
import {
  ArrowRightIcon,
  BarChart3Icon,
  BitcoinIcon,
  BookOpenIcon,
  LandmarkIcon,
  ShieldCheckIcon,
  WalletIcon,
  ZapIcon,
} from "lucide-react";

import signIn from "@/lib/auth/signIn";
import appConfig from "@/lib/config/app.config";
import { signOutLocal } from "@/server/functions/auth";

export const Route = createFileRoute("/_public/")({
  beforeLoad: async ({ context: { session } }) => {
    // Clear zombie session (OAuth session exists but user not provisioned in DB)
    if (session?.user && !session.user.identityProviderId) {
      await signOutLocal();
      return;
    }

    if (session?.user?.identityProviderId) throw redirect({ to: "/dashboard" });
  },
  component: HomePage,
});

const modules = [
  {
    title: "Ledger",
    description:
      "Double-entry journal with multi-currency support and real-time balances",
    icon: <BookOpenIcon size={28} />,
  },
  {
    title: "Accounts",
    description:
      "Hierarchical chart of accounts with industry-standard templates",
    icon: <LandmarkIcon size={28} />,
  },
  {
    title: "Budgets",
    description: "Track spending against targets with envelope-style budgeting",
    icon: <WalletIcon size={28} />,
  },
  {
    title: "Crypto",
    description:
      "Portfolio tracking with DeFi integrations and cost-basis reporting",
    icon: <BitcoinIcon size={28} />,
  },
  {
    title: "Reports",
    description: "Balance sheets, income statements, and cash flow at a glance",
    icon: <BarChart3Icon size={28} />,
  },
];

const highlights = [
  {
    icon: <ZapIcon size={24} />,
    title: "Real-time sync",
    description: "Bank feeds and exchange data updated continuously",
  },
  {
    icon: <ShieldCheckIcon size={24} />,
    title: "Privacy first",
    description: "Self-hostable, open source, your data stays yours",
  },
];

function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative px-4 pt-20 pb-32 sm:px-6 md:pt-32 md:pb-40 lg:px-8">
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="h-[400px] w-[600px] rounded-full bg-primary-500/5 blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-8 flex justify-center">
            <span className="inline-flex items-center rounded-full border border-primary-500/20 bg-primary-500/10 px-4 py-2 font-medium text-primary text-sm">
              {appConfig.tagline}
            </span>
          </div>

          <h1 className="mb-6 font-extrabold text-4xl tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="block">Your finances,</span>
            <span className="mt-2 block text-primary">unified</span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground">
            Business accounting, personal finance, and crypto portfolios — all
            in one open-source platform. {appConfig.name} brings clarity to
            every dollar, token, and transaction.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              type="button"
              className="group inline-flex h-12 items-center gap-2 rounded-md bg-primary px-8 font-semibold text-primary-foreground shadow-lg transition-colors hover:bg-primary/90"
              onClick={async () => {
                try {
                  await signIn({
                    redirectUrl: `${window.location.origin}/dashboard`,
                    providerId: "omni",
                  });
                } catch {
                  // Auth redirect will handle flow
                }
              }}
            >
              Get Started Free
              <ArrowRightIcon
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>

            <a
              href={appConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-md border border-border bg-background px-8 font-medium transition-colors hover:bg-accent"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <span className="mb-4 inline-flex items-center rounded-full border border-border bg-muted px-3 py-1 font-medium text-sm">
              Modules
            </span>
            <h2 className="mb-4 font-bold text-3xl sm:text-4xl">
              Everything you need
            </h2>
            <p className="text-lg text-muted-foreground">
              Five core modules covering the full spectrum of financial
              management
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {modules.map((mod) => (
              <div
                key={mod.title}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-colors hover:border-primary/30"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary dark:bg-primary-950">
                  {mod.icon}
                </div>
                <h3 className="mb-2 font-semibold text-lg">{mod.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {mod.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-4 rounded-2xl border border-border bg-card p-8"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary dark:bg-primary-950">
                  {item.icon}
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-xl">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 font-bold text-4xl sm:text-5xl">
            Ready to take control of your{" "}
            <span className="text-primary">finances?</span>
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-lg text-muted-foreground">
            Stop juggling spreadsheets and siloed apps. Free and open source,
            forever.
          </p>

          <button
            type="button"
            className="group inline-flex h-14 items-center gap-2 rounded-md bg-primary px-10 font-semibold text-lg text-primary-foreground shadow-lg transition-colors hover:bg-primary/90"
            onClick={async () => {
              try {
                await signIn({
                  redirectUrl: `${window.location.origin}/dashboard`,
                  providerId: "omni",
                });
              } catch {
                // Auth redirect will handle flow
              }
            }}
          >
            Get Started for Free
            <ArrowRightIcon
              size={20}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>

          <p className="mt-6 text-muted-foreground text-sm">
            No credit card required. Free and open source.
          </p>
        </div>
      </section>
    </div>
  );
}
