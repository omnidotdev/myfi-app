import { describe, expect, test } from "bun:test";

import { pickDefaultPaymentAccount } from "./pickDefaultPaymentAccount";

const acct = (over: Record<string, unknown>) => ({
  rowId: "x",
  name: "x",
  type: "asset",
  isPlaceholder: false,
  ...over,
});

describe("pickDefaultPaymentAccount", () => {
  test("prefers a checking account by name", () => {
    const accounts = [
      acct({ rowId: "cash", name: "Cash" }),
      acct({ rowId: "chk", name: "Checking" }),
      acct({ rowId: "sav", name: "Savings" }),
    ];
    expect(pickDefaultPaymentAccount(accounts)).toBe("chk");
  });

  test("falls back to the first non-placeholder asset when no checking exists", () => {
    const accounts = [
      acct({ rowId: "grp", name: "Assets", isPlaceholder: true }),
      acct({ rowId: "cash", name: "Cash" }),
      acct({ rowId: "sav", name: "Savings" }),
    ];
    expect(pickDefaultPaymentAccount(accounts)).toBe("cash");
  });

  test("ignores placeholders and non-asset accounts", () => {
    const accounts = [
      acct({ rowId: "grp", name: "Assets", isPlaceholder: true }),
      acct({ rowId: "loan", name: "Student Loans", type: "liability" }),
    ];
    expect(pickDefaultPaymentAccount(accounts)).toBe("");
  });

  test("returns empty string when there are no accounts", () => {
    expect(pickDefaultPaymentAccount([])).toBe("");
  });
});
