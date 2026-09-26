import { useCallback, useEffect, useState } from "react";
import type Book from "@/features/books/types/book";
import { apiFetch } from "@/lib/api/apiFetch";
import useActiveBookStore from "@/lib/stores/activeBook";
import { useOrganization } from "@/providers/OrganizationProvider";

const useActiveBook = () => {
  const ctx = useOrganization();
  const organizationId = ctx?.currentOrganization?.id ?? null;
  const { activeBookId, setActiveBookId } = useActiveBookStore();
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refetch = useCallback(async () => {
    // No organization means nothing to load; settle loading so book-scoped
    // surfaces render their empty/guard state instead of spinning forever
    if (!organizationId) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const r = await apiFetch(`/api/books?organizationId=${organizationId}`);
      const data = await r.json();
      const mapped = (data.books ?? []).map((b: Record<string, unknown>) => ({
        ...b,
        rowId: b.id as string,
      }));
      setBooks(mapped);
    } catch {
      // Silently handle fetch errors; loading still settles below
    } finally {
      setIsLoading(false);
    }
  }, [organizationId]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  // Default the active book to the first one when nothing valid is selected
  // (first run, or the previously-selected book was deleted). Without this a
  // user with a book but no selection sees "no active book" empty states and
  // dead-ends (e.g. the QuickBooks page never shows its connect button)
  useEffect(() => {
    if (books.length === 0) return;
    const hasValidSelection = books.some((b) => b.rowId === activeBookId);
    if (!hasValidSelection) setActiveBookId(books[0].rowId);
  }, [books, activeBookId, setActiveBookId]);

  const activeBook = books.find((b) => b.rowId === activeBookId) ?? null;

  return {
    activeBook,
    activeBookId: activeBook?.rowId ?? null,
    books,
    isLoading,
    organizationId,
    setActiveBookId,
    refetch,
  };
};

export default useActiveBook;
