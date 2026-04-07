import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BookOpenIcon,
  Link2Icon,
  MapIcon,
  ScrollTextIcon,
  SparklesIcon,
  TagsIcon,
  UsersIcon,
} from "lucide-react";

export const Route = createFileRoute("/_app/settings/")({
  component: SettingsPage,
});

const settingsItems = [
  {
    label: "Books",
    description: "Manage your financial books",
    href: "/settings/books",
    icon: BookOpenIcon,
  },
  {
    label: "Connections",
    description: "Manage bank and exchange connections",
    href: "/settings/connections",
    icon: Link2Icon,
  },
  {
    label: "Mappings",
    description: "Map Mantle event types to accounts",
    href: "/settings/mappings",
    icon: MapIcon,
  },
  {
    label: "Categorization Rules",
    description: "Manage automatic transaction categorization rules",
    href: "/settings/rules",
    icon: SparklesIcon,
  },
  {
    label: "Tags",
    description: "Organize transactions by department, location, or project",
    href: "/settings/tags",
    icon: TagsIcon,
  },
  {
    label: "Vendors & 1099",
    description: "Manage vendors and 1099 eligibility for tax reporting",
    href: "/settings/vendors",
    icon: UsersIcon,
  },
  {
    label: "Audit Log",
    description: "Track changes across your organization",
    href: "/settings/audit",
    icon: ScrollTextIcon,
  },
];

function SettingsPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <h1 className="font-bold text-2xl">Settings</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {settingsItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
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
