import { describe, expect, test } from "bun:test";

import formatCurrency, { formatSignedCurrency } from "./currency";

describe("formatCurrency", () => {
  test("formats positive number", () => {
    expect(formatCurrency(1234.56)).toBe("$1,234.56");
  });

  test("formats negative number with leading minus", () => {
    expect(formatCurrency(-500)).toBe("-$500.00");
  });

  test("formats zero", () => {
    expect(formatCurrency(0)).toBe("$0.00");
  });

  test("formats string input", () => {
    expect(formatCurrency("99.9")).toBe("$99.90");
  });

  test("formats large numbers with commas", () => {
    expect(formatCurrency(1000000)).toBe("$1,000,000.00");
  });

  test("handles NaN string", () => {
    expect(formatCurrency("not-a-number")).toBe("$0.00");
  });

  test("truncates to 2 decimal places", () => {
    expect(formatCurrency(10.999)).toBe("$11.00");
  });

  test("pads to 2 decimal places", () => {
    expect(formatCurrency(5)).toBe("$5.00");
  });
});

describe("formatSignedCurrency", () => {
  test("adds + prefix for positive", () => {
    expect(formatSignedCurrency(100)).toBe("+$100.00");
  });

  test("adds - prefix for negative", () => {
    expect(formatSignedCurrency(-50)).toBe("-$50.00");
  });

  test("no sign for zero", () => {
    expect(formatSignedCurrency(0)).toBe("$0.00");
  });

  test("handles string input", () => {
    expect(formatSignedCurrency("250.5")).toBe("+$250.50");
  });

  test("handles NaN string", () => {
    expect(formatSignedCurrency("invalid")).toBe("$0.00");
  });
});
