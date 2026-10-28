import { AlertTriangleIcon } from "lucide-react";
import type { ReactNode } from "react";

type LoadErrorProps = {
  /**
   * User-facing resource name, lower case, e.g. "accounts"
   *
   * Produces the title "Couldn't load accounts". Ignored when an explicit
   * title is provided
   */
  resource?: string;
  /** Explicit title override, used instead of the resource-derived title */
  title?: string;
  /** Optional body copy, falls back to a generic retry hint */
  description?: ReactNode;
  /** Retry handler, renders a Retry button when provided */
  onRetry?: () => void;
};

/**
 * Shared load-error state
 *
 * Rendered when a fetch fails, so a transient API error is never mistaken for
 * a genuinely empty result. Mirrors the EmptyState card layout but carries a
 * destructive accent and a retry affordance, keeping it visually distinct from
 * the quiet empty state. Never surface raw errors, status codes, or internal
 * details here, log those to the console and show this generic, actionable copy
 */
function LoadError({ resource, title, description, onRetry }: LoadErrorProps) {
  const heading = title ?? `Couldn't load ${resource ?? "this data"}`;

  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border border-destructive/40 bg-destructive/5 p-8 text-center">
      <div className="flex size-11 items-center justify-center rounded-full bg-destructive/10">
        <AlertTriangleIcon className="size-5 text-destructive" />
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="font-medium text-base text-foreground">{heading}</h3>

        <p className="mx-auto max-w-sm text-muted-foreground text-sm">
          {description ?? "Something went wrong. Please try again."}
        </p>
      </div>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-1 inline-flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2 font-medium text-sm transition-colors hover:bg-accent"
        >
          Retry
        </button>
      )}
    </div>
  );
}

export default LoadError;
