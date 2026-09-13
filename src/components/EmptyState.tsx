import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type EmptyStateProps = {
  /** Optional lucide icon, rendered muted above the title */
  icon?: LucideIcon;
  /** Title line, one consistent size and weight across the app */
  title: string;
  /** Optional muted body copy, allows an inline link */
  description?: ReactNode;
  /** Optional call to action rendered below the copy */
  action?: ReactNode;
};

/**
 * Shared empty state
 *
 * One card, centered, with a single title size and a single description size
 * everywhere, so every empty surface in the app reads as one quiet, consistent
 * system aligned with the landing page
 */
function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border border-border bg-card p-8 text-center">
      {Icon && (
        <div className="flex size-11 items-center justify-center rounded-full bg-muted">
          <Icon className="size-5 text-muted-foreground" />
        </div>
      )}

      <div className="flex flex-col gap-1">
        <h3 className="font-medium text-base text-foreground">{title}</h3>

        {description && (
          <p className="mx-auto max-w-sm text-muted-foreground text-sm">
            {description}
          </p>
        )}
      </div>

      {action && <div className="mt-1">{action}</div>}
    </div>
  );
}

export default EmptyState;
