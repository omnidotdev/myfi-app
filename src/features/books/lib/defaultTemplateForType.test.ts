import { describe, expect, test } from "bun:test";

import { defaultTemplateForType } from "./defaultTemplateForType";

describe("defaultTemplateForType", () => {
  test("a personal book seeds the personal chart of accounts", () => {
    // Without this, a personal book starts empty and every account-backed
    // feature (loans, budgets, spending) has nothing to select
    expect(defaultTemplateForType("personal")).toBe("personal");
  });

  test("a business book does not seed the personal chart of accounts", () => {
    // Business users pick sole_proprietor / llc explicitly; default to none
    expect(defaultTemplateForType("business")).toBe("none");
  });
});
