import { createFileRoute, redirect } from "@tanstack/react-router";
import { ArrowRightIcon } from "lucide-react";
import { useEffect, useState } from "react";

import NetWorthComposition from "@/features/marketing/components/NetWorthComposition";
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

/** Modules, in the order a reader meets them, with a one-line description each */
const modules = [
  {
    name: "Ledger",
    detail:
      "Double-entry journal with multi-currency support and real-time balances.",
  },
  {
    name: "Accounts",
    detail:
      "A hierarchical chart of accounts on industry-standard templates, with Plaid bank feeds.",
  },
  {
    name: "Budgets",
    detail: "Envelope budgeting that holds spending against intent.",
  },
  {
    name: "Crypto",
    detail: "Wallets, DeFi and NFTs with cost basis carried through to tax.",
  },
  {
    name: "Assets",
    detail: "Holdings and depreciation, valued and tracked over time.",
  },
  {
    name: "Mileage",
    detail: "Trips logged and posted straight to the books.",
  },
  {
    name: "Reports",
    detail:
      "P&L, balance sheet, cash flow, and the tax forms that follow (8949, Schedule C, 1099).",
  },
  {
    name: "Dashboard",
    detail: "Every account and asset class in one composed view.",
  },
];

const TARGET_NET_WORTH = 1284650;

/** Illustrative net worth that resolves quietly on load */
function ResolvingAmount() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(TARGET_NET_WORTH);
      return;
    }
    const duration = 1400;
    const start = performance.now();
    let raf = 0;
    const step = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setValue(TARGET_NET_WORTH * (1 - (1 - p) ** 3));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <span className="font-serif text-3xl text-foreground tabular-nums tracking-tight sm:text-4xl">
      ${Math.floor(value).toLocaleString("en-US")}
      <span className="text-2xl text-muted-foreground">.00</span>
    </span>
  );
}

function Eyebrow({ children }: { children: string }) {
  return (
    <p className="flex items-center gap-2.5 font-medium font-sans text-muted-foreground text-xs uppercase tracking-[0.22em]">
      <span className="h-px w-6 bg-primary/70" />
      {children}
    </p>
  );
}

function HomePage() {
  const [openModule, setOpenModule] = useState(0);

  const handleGetStarted = async () => {
    try {
      await signIn({
        redirectUrl: `${window.location.origin}/dashboard`,
        providerId: "omni",
      });
    } catch {
      // Auth redirect will handle flow
    }
  };

  return (
    <div>
      {/* Hero: the quiet statement */}
      <section className="px-6 pt-20 pb-16 md:pt-28 md:pb-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Eyebrow>Unified finance, self hosted</Eyebrow>

          <h1 className="mt-6 font-light font-serif text-[clamp(3rem,9vw,6rem)] text-foreground leading-[0.96] tracking-[-0.018em]">
            Capital
            <br />
            <span className="text-primary italic">clarity.</span>
          </h1>

          <p className="mt-6 max-w-[46ch] text-lg text-muted-foreground">
            Business accounting, personal finance, and crypto, kept in one place
            and reconciled to the cent. One open-source platform. Your books,
            your data, your server.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={handleGetStarted}
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-7 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Get started
              <ArrowRightIcon
                size={18}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </button>
            <a
              href={appConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-border bg-background px-7 font-medium transition-colors hover:border-primary/50 hover:text-primary"
            >
              View on GitHub
            </a>
          </div>

          <div className="mt-12 flex max-w-[46ch] flex-wrap items-end gap-x-4 gap-y-1 border-border border-t pt-5">
            <ResolvingAmount />
            <span className="flex items-center gap-1.5 pb-1 font-sans font-semibold text-primary text-sm">
              <span className="text-xs">▲</span> in balance
            </span>
            <span className="basis-full text-muted-foreground text-xs tracking-wide">
              Illustrative net worth. Every figure traceable to a journal entry.
            </span>
          </div>
        </div>
      </section>

      {/* Composed: the clarity chart, as a feature */}
      <section className="px-6 py-16 md:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow>Net worth, composed</Eyebrow>
              <h2 className="mt-4 max-w-[18ch] font-normal font-serif text-3xl text-foreground leading-[1.04] tracking-tight sm:text-4xl">
                Every account and token, resolved into{" "}
                <span className="text-primary italic">one clear line.</span>
              </h2>
            </div>
            <p className="max-w-[34ch] text-muted-foreground">
              Each band is a module. Scrub across the years to watch the whole
              picture come together, and see exactly what it is made of.
            </p>
          </div>

          <NetWorthComposition />
        </div>
      </section>

      {/* Contents: the module index */}
      <section className="px-6 py-16 md:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow>Contents</Eyebrow>
              <h2 className="mt-4 max-w-[18ch] font-normal font-serif text-3xl text-foreground leading-[1.04] tracking-tight sm:text-4xl">
                Eight modules,{" "}
                <span className="text-primary italic">
                  one ledger of record.
                </span>
              </h2>
            </div>
            <p className="max-w-[34ch] text-muted-foreground">
              Each does its own work and posts to the same double-entry core, so
              the books always agree.
            </p>
          </div>

          <ol className="grid grid-cols-1 gap-x-16 md:grid-cols-2">
            {modules.map((mod, index) => {
              const open = openModule === index;
              return (
                <li key={mod.name}>
                  <button
                    type="button"
                    onMouseEnter={() => setOpenModule(index)}
                    onFocus={() => setOpenModule(index)}
                    className={`grid w-full grid-cols-[2.1rem_1fr] items-baseline gap-3.5 border-border/60 border-b py-3.5 text-left transition-all ${
                      open ? "bg-muted pl-4" : "pl-2"
                    }`}
                  >
                    <span
                      className={`font-serif text-sm tabular-nums tracking-wide ${
                        open ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="font-semibold text-base text-foreground">
                        {mod.name}
                      </span>
                      <span
                        className={`block overflow-hidden text-muted-foreground text-sm transition-all ${
                          open
                            ? "mt-1 max-h-16 opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        {mod.detail}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Closing */}
      <section className="px-6 py-20 md:py-28 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-8 border-border border-t pt-12">
            <h2 className="max-w-[16ch] font-light font-serif text-4xl text-foreground leading-[1.02] tracking-tight sm:text-5xl">
              Take control of your finances,{" "}
              <span className="text-primary italic">to the cent.</span>
            </h2>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleGetStarted}
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-7 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Get started
                <ArrowRightIcon
                  size={18}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </button>
              <a
                href={appConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-border bg-background px-7 font-medium transition-colors hover:border-primary/50 hover:text-primary"
              >
                View on GitHub
              </a>
            </div>
          </div>
          <p className="mt-6 text-muted-foreground text-sm">
            Free and open source, forever. No credit card required.
          </p>
        </div>
      </section>
    </div>
  );
}
