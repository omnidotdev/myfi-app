import type { ErrorInfo, ReactNode } from "react";
import { Component } from "react";

type Props = { children: ReactNode; fallback?: ReactNode };
type State = { hasError: boolean; error: Error | null };

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[ErrorBoundary]", error, info);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 p-6">
          <h2 className="font-semibold text-xl">Something went wrong</h2>
          {/* Show a fixed, generic message; the raw error (which can contain
              internal details) is logged to the console in componentDidCatch,
              never rendered to the user */}
          <p className="text-muted-foreground text-sm">
            An unexpected error occurred. Reloading the page usually helps.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm"
          >
            Reload page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
