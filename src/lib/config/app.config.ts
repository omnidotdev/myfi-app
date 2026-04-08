/**
 * Application configuration
 *
 * To rename this app, update the `name` field below
 * All other references use this config, so renaming is a single change
 */
const app = {
  /** App name - change this to rename the product */
  name: "MyFi",
  /** App description (used in SEO meta tags) */
  description:
    "A comprehensive platform for unified asset management, portfolio tracking, and accounting that provides complete financial visibility and management for both individuals and businesses.",
  /** App tagline */
  tagline: "Capital clarity",
  /** Production URL */
  url: "https://myfi.omni.dev",
  /** Organization info */
  organization: {
    name: "Omni",
    website: "https://omni.dev",
    discord: "https://discord.gg/omnidotdev",
    x: "https://x.com/omnidotdev",
    linkedin: "https://www.linkedin.com/company/omnidotdev",
  },
  /** External links */
  links: {
    docs: "https://docs.omni.dev/core/myfi",
    github: "https://github.com/omnidotdev/myfi-stack",
    feedback: "https://backfeed.omni.dev/workspaces/omni/projects/myfi",
  },
  /** Module configuration - toggle modules on/off */
  modules: {
    dashboard: { enabled: true, label: "Dashboard", icon: "dashboard" },
    ledger: { enabled: true, label: "Ledger", icon: "notebook" },
    accounts: { enabled: true, label: "Accounts", icon: "landmark" },
    budgets: { enabled: true, label: "Budgets", icon: "wallet" },
    crypto: { enabled: true, label: "Crypto", icon: "bitcoin" },
    assets: { enabled: true, label: "Assets", icon: "hard-drive" },
    mileage: { enabled: true, label: "Mileage", icon: "car" },
    reports: { enabled: true, label: "Reports", icon: "chart-bar" },
  },
};

export default app;
