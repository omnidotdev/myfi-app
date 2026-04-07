import { describe, expect, test } from "bun:test";

import formatLabel from "./label";

describe("formatLabel", () => {
  test("converts snake_case to Title Case", () => {
    expect(formatLabel("accounts_receivable")).toBe("Accounts Receivable");
  });

  test("handles single word", () => {
    expect(formatLabel("asset")).toBe("Asset");
  });

  test("handles multiple underscores", () => {
    expect(formatLabel("cost_of_goods_sold")).toBe("Cost Of Goods Sold");
  });

  test("handles empty string", () => {
    expect(formatLabel("")).toBe("");
  });

  test("preserves already capitalized words", () => {
    expect(formatLabel("fixed_Asset")).toBe("Fixed Asset");
  });
});
