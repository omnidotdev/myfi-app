import { createFileRoute } from "@tanstack/react-router";

import appConfig from "@/lib/config/app.config";

export const Route = createFileRoute("/_public/terms")({
  head: () => ({
    meta: [
      { title: `Terms of Service · ${appConfig.name}` },
      {
        name: "description",
        content: `The terms that govern your use of ${appConfig.name}.`,
      },
    ],
  }),
  component: TermsOfService,
});

const LAST_UPDATED = "October 14, 2026";

/**
 * Terms of service. Kept deliberately plain and accurate to the product (an
 * open-source bookkeeping tool, not a provider of financial, tax, or legal
 * advice). Update alongside any change that alters these terms
 */
function TermsOfService() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
      <h1 className="font-serif text-4xl tracking-tight">Terms of Service</h1>
      <p className="mt-2 text-muted-foreground text-sm">
        Last updated: {LAST_UPDATED}
      </p>

      <div className="mt-10 space-y-8 text-[0.95rem] leading-relaxed">
        <section className="space-y-3">
          <p>
            These terms govern your use of {appConfig.name}, an accounting and
            personal-finance platform operated by {appConfig.organization.name}{" "}
            at {appConfig.url}. By creating an account or using the service, you
            agree to these terms. If you do not agree, do not use the service.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-xl">The service</h2>
          <p>
            {appConfig.name} helps you record and organize financial
            information, connect accounts, and generate reports. It is software,
            not a bookkeeper, accountant, or tax advisor. {appConfig.name} does
            not provide financial, investment, legal, or tax advice, and its
            reports and tax-form outputs are for your convenience — you are
            responsible for reviewing them and for your own filings and
            financial decisions, ideally with a qualified professional.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-xl">Your account</h2>
          <p>
            You are responsible for your account, for the accuracy of the data
            you enter, and for keeping your sign-in secure. You must have the
            right to connect any financial account or upload any document you
            add to the service.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-xl">Acceptable use</h2>
          <p>
            Do not use the service for unlawful purposes, attempt to breach its
            security or access other users' data, disrupt its operation, or
            misuse connected third-party integrations.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-xl">Third-party services</h2>
          <p>
            Features such as bank linking (Plaid, OFX), payroll import (Gusto),
            and AI categorization (Anthropic) rely on third parties, and your
            use of them is also subject to those providers' terms. We are not
            responsible for third-party services. See our{" "}
            <a href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </a>{" "}
            for how data is shared.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-xl">Open source</h2>
          <p>
            {appConfig.name} is open source. Your use of the source code is
            governed by its license in the project repository; these terms
            govern your use of the hosted service.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-xl">
            Disclaimers and limitation of liability
          </h2>
          <p>
            The service is provided "as is" and "as available," without
            warranties of any kind, express or implied, including
            merchantability, fitness for a particular purpose, and
            non-infringement. To the fullest extent permitted by law,{" "}
            {appConfig.organization.name} is not liable for any indirect,
            incidental, special, consequential, or punitive damages, or for any
            loss of data, profits, or revenue, arising from your use of the
            service.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-xl">Termination</h2>
          <p>
            You may stop using the service and request deletion of your data at
            any time. We may suspend or terminate access for violations of these
            terms or to protect the service.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-xl">Changes</h2>
          <p>
            We may update these terms as the product evolves. Material changes
            will be reflected here with a new "last updated" date; continued use
            after a change means you accept the updated terms.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-xl">Contact</h2>
          <p>
            Questions about these terms can be directed to{" "}
            {appConfig.organization.name} at{" "}
            <a
              href={appConfig.organization.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {appConfig.organization.website.replace("https://", "")}
            </a>
            .
          </p>
        </section>
      </div>
    </article>
  );
}
