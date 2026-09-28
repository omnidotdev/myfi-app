export type WorkspaceView = "loading" | "no-workspace" | "no-book" | "ready";

/**
 * Decide what a book-scoped workspace surface should render. Guards against the
 * infinite-spinner bug: once loading has settled the answer is a concrete state
 * ("no-workspace" when the user is in no organization, "no-book" when the
 * workspace has none), never a perpetual "loading"
 * @param params.hasWorkspace - Whether the route is inside a resolved workspace
 * @param params.booksLoading - Whether the books request is still in flight
 * @param params.bookCount - Number of books in the active workspace
 */
export const resolveWorkspaceView = (params: {
  hasWorkspace: boolean;
  booksLoading: boolean;
  bookCount: number;
}): WorkspaceView => {
  if (!params.hasWorkspace) return "no-workspace";
  if (params.booksLoading) return "loading";
  if (params.bookCount === 0) return "no-book";
  return "ready";
};
