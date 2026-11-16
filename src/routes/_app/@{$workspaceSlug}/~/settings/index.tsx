import { createFileRoute, Link } from "@tanstack/react-router";
import { settingsItems } from "@/features/settings/settingsItems";

export const Route = createFileRoute("/_app/@{$workspaceSlug}/~/settings/")({
  component: SettingsPage,
});

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
