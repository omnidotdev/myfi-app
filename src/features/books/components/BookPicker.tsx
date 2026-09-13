import { Link } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";

import type { Book } from "@/features/books/types/book";

type BookPickerProps = {
  books: Book[];
  selectedBookId: string | null;
  onSelect: (bookId: string | null) => void;
};

const ALL_BOOKS_VALUE = "__all__";

/**
 * Dropdown for switching between books
 */
function BookPicker({ books, selectedBookId, onSelect }: BookPickerProps) {
  // With no books there is nothing to switch between, so guide the user to create one
  if (books.length === 0) {
    return (
      <Link
        to="/settings/books"
        className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
      >
        <PlusIcon className="size-4" />
        Create book
      </Link>
    );
  }

  return (
    <select
      value={selectedBookId ?? ALL_BOOKS_VALUE}
      onChange={(e) =>
        onSelect(e.target.value === ALL_BOOKS_VALUE ? null : e.target.value)
      }
      className="rounded-md border border-border bg-background px-3 py-2 text-sm shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
    >
      {books.length > 1 && <option value={ALL_BOOKS_VALUE}>All Books</option>}

      {books.map((book) => (
        <option key={book.rowId} value={book.rowId}>
          {book.name} ({book.type})
        </option>
      ))}
    </select>
  );
}

export default BookPicker;
