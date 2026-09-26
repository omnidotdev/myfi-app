import { describe, expect, test } from "bun:test";

import { filterNavForBook } from "./filterNavForBook";

const groups = [
  { label: undefined, items: [{ label: "Dashboard" }] },
  {
    label: "Sales",
    items: [
      { label: "Estimates", businessOnly: true },
      { label: "Invoices", businessOnly: true },
    ],
  },
  {
    label: "Money",
    items: [{ label: "Spending" }, { label: "Bills", businessOnly: true }],
  },
] as const;

describe("filterNavForBook", () => {
  test("personal books hide business-only items", () => {
    const result = filterNavForBook(groups, "personal");
    const labels = result.flatMap((g) => g.items.map((i) => i.label));
    expect(labels).toEqual(["Dashboard", "Spending"]);
  });

  test("personal books drop groups left empty", () => {
    const result = filterNavForBook(groups, "personal");
    // The all-business "Sales" group is removed entirely
    expect(result.some((g) => g.label === "Sales")).toBe(false);
    expect(result.some((g) => g.label === "Money")).toBe(true);
  });

  test("business books keep every item", () => {
    const result = filterNavForBook(groups, "business");
    const labels = result.flatMap((g) => g.items.map((i) => i.label));
    expect(labels).toEqual([
      "Dashboard",
      "Estimates",
      "Invoices",
      "Spending",
      "Bills",
    ]);
  });

  test("an unknown or missing book type shows everything (safe default)", () => {
    expect(filterNavForBook(groups, undefined).length).toBe(groups.length);
    expect(filterNavForBook(groups, null).length).toBe(groups.length);
  });
});
