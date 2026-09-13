import { createFileRoute } from "@tanstack/react-router";
import { BookOpenIcon, Loader2Icon, PlusIcon, TrashIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import EmptyState from "@/components/EmptyState";
import CreateBookDialog from "@/features/books/components/CreateBookDialog";
import type Book from "@/features/books/types/book";
import type { BookType } from "@/features/books/types/book";
import { apiFetch } from "@/lib/api/apiFetch";
import useActiveBookStore from "@/lib/stores/activeBook";
import { useOrganization } from "@/providers/OrganizationProvider";

type BooksSearch = {
  /** Auto-open the create dialog on arrival (e.g. from the dashboard CTA) */
  create?: boolean;
};

export const Route = createFileRoute("/_app/settings/books")({
  validateSearch: (search: Record<string, unknown>): BooksSearch => ({
    create: search.create === true || search.create === "true",
  }),
  component: BooksSettingsPage,
});

function BooksSettingsPage() {
  const org = useOrganization();
  const organizationId = org?.currentOrganization?.id;
  const { activeBookId, setActiveBookId } = useActiveBookStore();

  const { create } = Route.useSearch();
  const navigate = Route.useNavigate();

  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  // Open the create dialog automatically when arriving with ?create=true, then
  // clear the param so a refresh does not reopen it
  useEffect(() => {
    if (!create) return;

    setShowCreateDialog(true);
    navigate({ to: "/settings/books", search: {}, replace: true });
  }, [create, navigate]);

  const fetchBooks = useCallback(async () => {
    if (!organizationId) return;

    setIsLoading(true);

    try {
      const res = await apiFetch(`/api/books?organizationId=${organizationId}`);
      const data = await res.json();
      const mapped = (data.books ?? []).map((b: Record<string, unknown>) => ({
        ...b,
        rowId: b.id as string,
      }));

      setBooks(mapped);
    } catch {
      // Silently handle fetch errors
    } finally {
      setIsLoading(false);
    }
  }, [organizationId]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleCreate = async (data: {
    name: string;
    type: BookType;
    currency: string;
    fiscalYearStartMonth: number;
    template: string;
  }) => {
    try {
      await apiFetch(`/api/books`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ organizationId, ...data }),
      });

      setShowCreateDialog(false);
      await fetchBooks();
    } catch {
      // Silently handle create errors
    }
  };

  const handleDelete = async (bookId: string) => {
    try {
      await apiFetch(`/api/books/${bookId}`, { method: "DELETE" });

      // If the deleted book was active, clear the selection
      if (activeBookId === bookId) {
        const remaining = books.filter((b) => b.rowId !== bookId);
        setActiveBookId(remaining[0]?.rowId ?? "");
      }

      await fetchBooks();
    } catch {
      // Silently handle delete errors
    }
  };

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

      {isLoading ? (
        <div className="flex items-center justify-center rounded-lg border border-border bg-card p-8">
          <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
        </div>
      ) : books.length === 0 ? (
        <EmptyState
          icon={BookOpenIcon}
          title="No books yet"
          description="Create a book to start tracking your finances."
          action={
            <button
              type="button"
              onClick={() => setShowCreateDialog(true)}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90"
            >
              <PlusIcon className="size-4" />
              Create a book
            </button>
          }
        />
      ) : (
        <div className="flex flex-col gap-3">
          {books.map((book) => (
            <div
              key={book.rowId}
              className="flex items-center justify-between rounded-lg border border-border bg-card p-4"
            >
              <div className="flex items-center gap-3">
                <div>
                  <p className="font-medium">{book.name}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 font-medium text-primary text-xs">
                      {book.type}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      {book.currency}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleDelete(book.rowId)}
                className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                aria-label={`Delete ${book.name}`}
              >
                <TrashIcon className="size-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <CreateBookDialog
        open={showCreateDialog}
        onClose={() => setShowCreateDialog(false)}
        onSubmit={handleCreate}
      />
    </div>
  );
}
