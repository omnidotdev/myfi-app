import { describe, expect, test } from "bun:test";

import { resolveWorkspaceView } from "./resolveWorkspaceView";

describe("resolveWorkspaceView", () => {
  test("a non-workspace route is never guarded", () => {
    expect(
      resolveWorkspaceView({
        hasWorkspace: false,
        booksLoading: true,
        bookCount: 0,
      }),
    ).toBe("ready");
  });

  test("shows loading while books are still loading", () => {
    expect(
      resolveWorkspaceView({
        hasWorkspace: true,
        booksLoading: true,
        bookCount: 0,
      }),
    ).toBe("loading");
  });

  test("a settled workspace with no books resolves to no-book, not loading", () => {
    // This is the infinite-spinner bug: books done loading, none exist
    expect(
      resolveWorkspaceView({
        hasWorkspace: true,
        booksLoading: false,
        bookCount: 0,
      }),
    ).toBe("no-book");
  });

  test("a workspace with at least one book is ready", () => {
    expect(
      resolveWorkspaceView({
        hasWorkspace: true,
        booksLoading: false,
        bookCount: 2,
      }),
    ).toBe("ready");
  });
});
