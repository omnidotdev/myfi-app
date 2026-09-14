import { createFileRoute, Link } from "@tanstack/react-router";
import { Loader2Icon } from "lucide-react";

import BookPicker from "@/features/books/components/BookPicker";
import OpeningBalanceImport from "@/features/migration/components/OpeningBalanceImport";
import useActiveBook from "@/lib/hooks/useActiveBook";

export const Route = createFileRoute(
  "/_app/@{$workspaceSlug}/~/settings/quickbooks",
)({
  component: QuickbooksSettingsPage,
});

function QuickbooksSettingsPage() {
  const { workspaceSlug } = Route.useParams();
  const { activeBookId, books, isLoading, setActiveBookId } = useActiveBook();

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-bold text-2xl">QuickBooks</h1>
          <p className="text-muted-foreground text-sm">
            Migrate your books from QuickBooks into MyFi
          </p>
        </div>

        <BookPicker
          books={books}
          selectedBookId={activeBookId}
          onSelect={setActiveBookId}
        />
      </div>

      {isLoading && (
        <div className="flex items-center justify-center rounded-lg border border-border bg-card p-8">
          <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
        </div>
      )}

      {!isLoading && !activeBookId && (
        <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-border bg-card p-8 text-center">
          <div className="flex flex-col gap-1">
            <h2 className="font-semibold text-lg">Select a book</h2>
            <p className="text-muted-foreground text-sm">
              Choose a book from the top-right menu, or create one in Settings
              {" -> "}
              Books, to migrate it from QuickBooks.
            </p>
          </div>
          <Link
            to="/@{$workspaceSlug}/~/settings/books"
            params={{ workspaceSlug }}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90"
          >
            Go to Books
          </Link>
        </div>
      )}

      {!isLoading && activeBookId && (
        <div className="rounded-lg border border-border bg-card p-6">
          <OpeningBalanceImport bookId={activeBookId} />
        </div>
      )}
    </div>
  );
}
