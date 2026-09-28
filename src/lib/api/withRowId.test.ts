import { describe, expect, test } from "bun:test";

import { withRowId } from "./withRowId";

describe("withRowId", () => {
  test("adds rowId mirroring the API's id", () => {
    const rows = withRowId([
      { id: "a1", name: "Checking" },
      { id: "a2", name: "Savings" },
    ]);
    expect(rows[0].rowId).toBe("a1");
    expect(rows[1].rowId).toBe("a2");
  });

  test("keeps every other field", () => {
    const [row] = withRowId([{ id: "a1", name: "Checking", type: "asset" }]);
    expect(row).toEqual({
      id: "a1",
      name: "Checking",
      type: "asset",
      rowId: "a1",
    });
  });

  test("handles a nullish list", () => {
    expect(withRowId(undefined)).toEqual([]);
    expect(withRowId(null)).toEqual([]);
  });
});
