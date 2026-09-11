import type { QuickbooksStatus } from "@/features/quickbooks/types/status";

type Migration = NonNullable<QuickbooksStatus["latestMigration"]>;

type Props = {
  migration: Migration;
};

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-gray-100 text-gray-800",
  importing: "bg-blue-100 text-blue-800",
  needs_mapping: "bg-amber-100 text-amber-800",
  completed: "bg-green-100 text-green-800",
  failed: "bg-red-100 text-red-800",
};

const STATUS_LABELS: Record<string, string> = {
  pending: "Pending",
  importing: "Importing",
  needs_mapping: "Needs Mapping",
  completed: "Completed",
  failed: "Failed",
};

/** Format a timestamp for display */
function formatTime(iso: string | null): string {
  if (!iso) return "Unknown";

  return new Date(iso).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

/**
 * Render the latest QuickBooks migration status
 */
function MigrationStatus({ migration }: Props) {
  const badgeStyle =
    STATUS_STYLES[migration.status] ?? "bg-gray-100 text-gray-800";
  const badgeLabel = STATUS_LABELS[migration.status] ?? migration.status;

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-border bg-card p-4">
      <div className="flex items-center gap-2">
        <span className="font-semibold text-sm">Import history</span>
        <span
          className={`inline-flex rounded-full px-2 py-0.5 font-medium text-xs ${badgeStyle}`}
        >
          {badgeLabel}
        </span>
      </div>

      <span className="text-muted-foreground text-xs">
        {migration.entriesImported} entries imported
      </span>

      <span className="text-muted-foreground text-xs">
        Started: {formatTime(migration.createdAt)}
      </span>

      {migration.status === "needs_mapping" && (
        <p className="text-amber-700 text-xs dark:text-amber-400">
          Some QuickBooks accounts need to be mapped to your chart of accounts
          before the import can finish
        </p>
      )}

      {migration.status === "failed" && migration.errorMessage && (
        <p className="text-destructive text-xs">{migration.errorMessage}</p>
      )}
    </div>
  );
}

export default MigrationStatus;
