import { BookOpenIcon, Loader2Icon, PlusIcon } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import { toast } from "sonner";

import CreateBookDialog from "@/features/books/components/CreateBookDialog";
import { resolveWorkspaceView } from "@/features/books/lib/resolveWorkspaceView";
import type { BookType } from "@/features/books/types/book";
import { apiFetch } from "@/lib/api/apiFetch";
import useActiveBook from "@/lib/hooks/useActiveBook";
import { useOrganization } from "@/providers/OrganizationProvider";

/**
 * Gate for book-scoped workspace surfaces. A workspace with no book would
 * otherwise leave every book-scoped page spinning forever (each page's own
 * loading flag never clears without an active book). This resolves that into a
 * clear "create your first book" prompt, and is the personal-onboarding entry
 * point. Renders inside OrganizationProvider so it can read the active workspace
 */
const WorkspaceBookGuard = ({ children }: { children: ReactNode }) => {
  const ctx = useOrganization();
  const { books, isLoading, organizationId, refetch } = useActiveBook();
  const [dialogOpen, setDialogOpen] = useState(false);

  const view = resolveWorkspaceView({
    hasWorkspace: !!organizationId,
    booksLoading: isLoading,
    bookCount: books.length,
  });

  if (view === "ready") return <>{children}</>;

  if (view === "loading") {
    return (
      <div className="flex min-h-[60dvh] items-center justify-center">
        <Loader2Icon className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const workspaceName = ctx?.currentOrganization?.name;

  const handleCreate = async (data: {
    name: string;
    type: BookType;
    currency: string;
    fiscalYearStartMonth: number;
    template: string;
  }) => {
    if (!organizationId) return;
    try {
      const res = await apiFetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ organizationId, ...data }),
      });
      if (!res.ok) throw new Error("Create failed");
      toast.success("Book created");
      setDialogOpen(false);
      // Refresh so the new book is picked up and this guard yields to the page
      await refetch();
    } catch {
      toast.error("Could not create the book");
    }
  };

  return (
    <div className="mx-auto flex min-h-[60dvh] max-w-xl flex-col items-center justify-center gap-6 px-6 text-center">
      <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
        <BookOpenIcon className="size-6" />
      </span>

      <div className="flex flex-col gap-2">
        <h1 className="font-serif text-2xl text-foreground tracking-tight">
          Create your first book
        </h1>
        <p className="text-muted-foreground">
          {workspaceName
            ? `${workspaceName} doesn't have a book yet.`
            : "This workspace doesn't have a book yet."}{" "}
          A book holds your accounts, budgets, and transactions. Create one to
          get started.
        </p>
      </div>

      <button
        type="button"
        onClick={() => setDialogOpen(true)}
        className="inline-flex items-center gap-2 whitespace-nowrap rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90"
      >
        <PlusIcon className="size-4" />
        Create a book
      </button>

      <CreateBookDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleCreate}
      />
    </div>
  );
};

export default WorkspaceBookGuard;
