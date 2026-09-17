import { describe, expect, test } from "bun:test";

import { parseSuggestResponse } from "./categorySuggestion";

const okSuggestion = {
  debitAccountId: "a1",
  debitAccountName: "Office Supplies",
  creditAccountId: "a2",
  creditAccountName: "Checking",
  confidence: 0.92,
  rationale: "Office purchase paid from checking.",
};

const jsonResponse = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

describe("parseSuggestResponse", () => {
  test("returns the suggestion on a 200 with a suggestion", async () => {
    const result = await parseSuggestResponse(
      jsonResponse(200, { suggestion: okSuggestion }),
    );

    expect(result.status).toBe("ok");
    if (result.status === "ok") {
      expect(result.suggestion).toEqual(okSuggestion);
    }
  });

  test("maps 503 to disabled (AI not configured)", async () => {
    const result = await parseSuggestResponse(
      jsonResponse(503, { error: "AI categorization is not configured" }),
    );

    expect(result.status).toBe("disabled");
  });

  test("maps 422 to no_suggestion", async () => {
    const result = await parseSuggestResponse(
      jsonResponse(422, {
        error: "No confident suggestion for this transaction",
      }),
    );

    expect(result.status).toBe("no_suggestion");
  });

  test("maps other non-ok statuses to error", async () => {
    const result = await parseSuggestResponse(
      jsonResponse(500, { error: "Could not generate a suggestion" }),
    );

    expect(result.status).toBe("error");
  });

  test("treats a 200 without a suggestion as an error", async () => {
    const result = await parseSuggestResponse(jsonResponse(200, {}));

    expect(result.status).toBe("error");
  });
});
