import { useEffect, useState } from "react";
import type Book from "@/features/books/types/book";
import { API_URL } from "@/lib/config/env.config";
import useActiveBookStore from "@/lib/stores/activeBook";
import { useOrganization } from "@/providers/OrganizationProvider";

const useActiveBook = () => {
  const ctx = useOrganization();
  const organizationId = ctx?.currentOrganization?.id ?? null;
  const { activeBookId, setActiveBookId } = useActiveBookStore();
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!organizationId) return;
    setIsLoading(true);
    fetch(`${API_URL}/api/books?organizationId=${organizationId}`)
      .then((r) => r.json())
      .then((data) => {
        const mapped = (data.books ?? []).map((b: Record<string, unknown>) => ({
          ...b,
          rowId: b.id as string,
        }));
        setBooks(mapped);
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, [organizationId]);

  const activeBook = books.find((b) => b.rowId === activeBookId) ?? null;

  return {
    activeBook,
    activeBookId: activeBook?.rowId ?? null,
    books,
    isLoading,
    organizationId,
    setActiveBookId,
  };
};

export default useActiveBook;
