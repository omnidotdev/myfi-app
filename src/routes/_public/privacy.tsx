import { createFileRoute } from "@tanstack/react-router";

import appConfig from "@/lib/config/app.config";

export const Route = createFileRoute("/_public/privacy")({
  head: () => ({
    meta: [
      { title: `Privacy Policy · ${appConfig.name}` },
      {
        name: "description",
        content: `How ${appConfig.name} collects, uses, protects, and shares your financial data.`,
      },
    ],
  }),
  component: PrivacyPolicy,
});

const LAST_UPDATED = "October 14, 2026";

/**
 * Privacy policy. Describes the actual data flows in the product (connected
 * banking, payroll, AI categorization, document storage) so the disclosure
 * stays accurate to the code. Keep this in sync whenever a data flow changes
 */
function PrivacyPolicy() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
      <h1 className="font-serif text-4xl tracking-tight">Privacy Policy</h1>
      <p className="mt-2 text-muted-foreground text-sm">
        Last updated: {LAST_UPDATED}
      </p>

      <div className="mt-10 space-y-8 text-[0.95rem] leading-relaxed">
        <section className="space-y-3">
          <p>
            {appConfig.name} is an accounting and personal-finance platform
            operated by {appConfig.organization.name}. This policy explains what
            data the hosted service at {appConfig.url} collects, how it is used
            and protected, and the third parties it is shared with. If you
            self-host {appConfig.name}, your data stays on infrastructure you
            control and the third-party integrations below apply only to the
            ones you choose to configure.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-xl">Information we collect</h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>Account information</strong> from your sign-in provider:
              your name, email address, and avatar.
            </li>
            <li>
              <strong>Financial data you enter</strong>: books, accounts,
              transactions, invoices, bills, budgets, assets, documents, and
              related records, including business identifiers (EIN) and vendor
              tax IDs.
            </li>
            <li>
              <strong>Connected financial data</strong> when you link an
              account: bank and transaction data via Plaid or OFX direct
              connect, and payroll data via Gusto.
            </li>
            <li>
              <strong>Uploaded files</strong>: receipts and documents you
              attach.
            </li>
            <li>
              <strong>Technical data</strong>: your IP address (used for
              security and rate limiting) and essential session cookies.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-xl">How we use your data</h2>
          <p>
            We use your data to provide the service: to keep your books, sync
            and categorize transactions, generate reports and tax forms, and
            secure your account. We do not sell your data or use it for
            advertising.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-xl">Third-party sub-processors</h2>
          <p>
            We share data with the following providers only as needed to deliver
            features you use:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>Anthropic</strong> — when you use AI transaction
              categorization, a transaction's description, amount, and date are
              sent to Anthropic's API to suggest a category. This runs only for
              the categorization feature.
            </li>
            <li>
              <strong>Plaid</strong> and the{" "}
              <strong>financial institutions</strong> you connect (including via
              OFX) — to link accounts and import transactions.
            </li>
            <li>
              <strong>Gusto</strong> — to import payroll data when you connect
              it.
            </li>
            <li>
              <strong>Cloud storage</strong> (Amazon S3 / Cloudflare R2) — to
              store documents and receipts you upload.
            </li>
            <li>
              <strong>{appConfig.organization.name} identity and email</strong>{" "}
              — to authenticate you and send transactional notifications.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-xl">How we protect your data</h2>
          <p>
            Sensitive credentials — bank and payroll access tokens, OFX banking
            passwords, business EINs, and vendor tax IDs — are encrypted at rest
            with AES-256-GCM, and are never returned to the browser in full.
            Data is transmitted over HTTPS. No method of storage or transmission
            is perfectly secure, but we take reasonable measures to protect your
            information.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-xl">Your rights and choices</h2>
          <p>
            You can export a full copy of a book's data, and delete individual
            books or your workspace's data, yourself from the Data and Privacy
            page in Settings at any time. For any other access, correction, or
            deletion request, contact us through{" "}
            <a
              href={appConfig.organization.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {appConfig.organization.name}
            </a>
            . When you disconnect a connected bank or payroll account, we revoke
            its access token with the provider and remove it from our systems;
            you can also remove the linked institution from that provider's
            dashboard to confirm.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-xl">Data retention</h2>
          <p>
            We retain your data for as long as your account is active and as
            needed to provide the service, then delete it on request, subject to
            any legal retention obligations.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-xl">Changes to this policy</h2>
          <p>
            We may update this policy as the product evolves. Material changes
            will be reflected here with a new "last updated" date.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-xl">Contact</h2>
          <p>
            Questions about this policy or your data can be directed to{" "}
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
