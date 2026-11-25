import { describe, expect, test } from "bun:test";

import { parseSignOutScope } from "./signOutScope";

describe("parseSignOutScope", () => {
  test("keeps the current and all scopes", () => {
    expect(parseSignOutScope({ accounts: "current" })).toEqual({
      accounts: "current",
    });
    expect(parseSignOutScope({ accounts: "all" })).toEqual({ accounts: "all" });
  });

  test("leaves the scope unset for anything else", () => {
    expect(parseSignOutScope()).toEqual({ accounts: undefined });
    expect(parseSignOutScope({})).toEqual({ accounts: undefined });
    expect(parseSignOutScope({ accounts: "everyone" })).toEqual({
      accounts: undefined,
    });
  });
});
