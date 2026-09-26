export type WorkspaceView = "loading" | "no-book" | "ready";

/**
 * Decide what a book-scoped workspace surface should render. Guards against the
 * infinite-spinner bug: once book loading has settled with no book, the answer
 * is "no-book" (prompt to create one), never a perpetual "loading"
 * @param params.hasWorkspace - Whether the route is inside a resolved workspace
 * @param params.booksLoading - Whether the books request is still in flight
 * @param params.bookCount - Number of books in the active workspace
 */
export const resolveWorkspaceView = (params: {
  hasWorkspace: boolean;
  booksLoading: boolean;
  bookCount: number;
}): WorkspaceView => {
  if (!params.hasWorkspace) return "ready";
  if (params.booksLoading) return "loading";
  if (params.bookCount === 0) return "no-book";
  return "ready";
};
