import { describe, expect, test } from "bun:test";

import { buildLiabilityAccountPayload } from "./buildLiabilityAccountPayload";

describe("buildLiabilityAccountPayload", () => {
  test("builds a liability account create payload", () => {
    expect(
      buildLiabilityAccountPayload({ bookId: "b1", name: "Loan from John" }),
    ).toEqual({
      bookId: "b1",
      name: "Loan from John",
      type: "liability",
      subType: "loan",
    });
  });

  test("trims the name", () => {
    expect(
      buildLiabilityAccountPayload({ bookId: "b1", name: "  Loan from Mom  " })
        ?.name,
    ).toBe("Loan from Mom");
  });

  test("returns null for a blank name (nothing to create)", () => {
    expect(
      buildLiabilityAccountPayload({ bookId: "b1", name: "   " }),
    ).toBeNull();
  });

  test("returns null without a book", () => {
    expect(buildLiabilityAccountPayload({ bookId: "", name: "X" })).toBeNull();
  });
});
