import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BookOpenIcon,
  BoxesIcon,
  DatabaseIcon,
  ImportIcon,
  LandmarkIcon,
  LayersIcon,
  Link2Icon,
  ListPlusIcon,
  MapIcon,
  PaletteIcon,
  PercentIcon,
  ScrollTextIcon,
  ShieldIcon,
  SparklesIcon,
  TagsIcon,
  UsersIcon,
} from "lucide-react";

export const Route = createFileRoute("/_app/@{$workspaceSlug}/~/settings/")({
  component: SettingsPage,
});

const settingsItems = [
  {
    label: "Books",
    description: "Manage your financial books",
    href: "/@{$workspaceSlug}/~/settings/books",
    icon: BookOpenIcon,
  },
  {
    label: "Connections",
    description: "Manage bank and exchange connections",
    href: "/@{$workspaceSlug}/~/settings/connections",
    icon: Link2Icon,
  },
  {
    label: "QuickBooks",
    description: "Migrate your books from QuickBooks",
    href: "/@{$workspaceSlug}/~/settings/quickbooks",
    icon: ImportIcon,
  },
  {
    label: "Mappings",
    description: "Map Mantle event types to accounts",
    href: "/@{$workspaceSlug}/~/settings/mappings",
    icon: MapIcon,
  },
  {
    label: "Categorization Rules",
    description: "Manage automatic transaction categorization rules",
    href: "/@{$workspaceSlug}/~/settings/rules",
    icon: SparklesIcon,
  },
  {
    label: "Tags",
    description: "Organize transactions by department, location, or project",
    href: "/@{$workspaceSlug}/~/settings/tags",
    icon: TagsIcon,
  },
  {
    label: "Classes & Locations",
    description: "QuickBooks-style tracking categories for segment reporting",
    href: "/@{$workspaceSlug}/~/settings/tracking-categories",
    icon: LayersIcon,
  },
  {
    label: "Custom Fields",
    description:
      "Add your own fields to customers, invoices, vendors, and items",
    href: "/@{$workspaceSlug}/~/settings/custom-fields",
    icon: ListPlusIcon,
  },
  {
    label: "Price Levels",
    description: "Customer pricing tiers that adjust item prices on invoices",
    href: "/@{$workspaceSlug}/~/settings/price-levels",
    icon: PercentIcon,
  },
  {
    label: "Bundles",
    description: "Groups of items that expand into their lines on an invoice",
    href: "/@{$workspaceSlug}/~/settings/bundles",
    icon: BoxesIcon,
  },
  {
    label: "Form Templates",
    description: "Branding for invoices and estimates (color, footer, terms)",
    href: "/@{$workspaceSlug}/~/settings/form-templates",
    icon: PaletteIcon,
  },
  {
    label: "Vendors & 1099",
    description: "Manage vendors and 1099 eligibility for tax reporting",
    href: "/@{$workspaceSlug}/~/settings/vendors",
    icon: UsersIcon,
  },
  {
    label: "Tax Jurisdictions",
    description: "Manage sales tax jurisdictions and filing frequencies",
    href: "/@{$workspaceSlug}/~/settings/tax-jurisdictions",
    icon: LandmarkIcon,
  },
  {
    label: "Access Control",
    description: "Manage who has access to each book and their role",
    href: "/@{$workspaceSlug}/~/settings/access",
    icon: ShieldIcon,
  },
  {
    label: "Audit Log",
    description: "Track changes across your workspace",
    href: "/@{$workspaceSlug}/~/settings/audit",
    icon: ScrollTextIcon,
  },
  {
    label: "Data & Privacy",
    description: "Export a full copy of your workspace data",
    href: "/@{$workspaceSlug}/~/settings/data",
    icon: DatabaseIcon,
  },
];

function SettingsPage() {
  const { workspaceSlug } = Route.useParams();

  return (
    <div className="flex flex-col gap-6 p-6">
      <h1 className="font-bold text-2xl">Settings</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {settingsItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            params={{ workspaceSlug }}
            className="flex items-start gap-4 rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent"
          >
            <item.icon className="mt-0.5 size-5 text-muted-foreground" />
            <div>
              <p className="font-medium">{item.label}</p>
              <p className="text-muted-foreground text-sm">
                {item.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
