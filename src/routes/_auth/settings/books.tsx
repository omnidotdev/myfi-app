import { createFileRoute } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_auth/settings/books")({
  component: BooksSettingsPage,
});

function BooksSettingsPage() {
  const [_showCreateDialog, setShowCreateDialog] = useState(false);

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">Books</h1>
          <p className="text-muted-foreground text-sm">
            Manage your financial books and entities
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowCreateDialog(true)}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90"
        >
          <PlusIcon className="size-4" />
          New Book
        </button>
      </div>

      {/* Books list -- placeholder */}
      <div className="rounded-lg border border-border bg-card p-8 text-center">
        <p className="text-muted-foreground">
          No books yet. Create your first book to get started.
        </p>
      </div>

      {/* CreateBookDialog will be wired up with real data */}
    </div>
  );
}
