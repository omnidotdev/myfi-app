import { describe, expect, test } from "bun:test";

import {
  aiCreditsUrl,
  aiUpgradeUrl,
  parseSuggestResponse,
} from "./categorySuggestion";

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

  test("maps the typed 402 to allowance_used (included AI used for the period)", async () => {
    const result = await parseSuggestResponse(
      jsonResponse(402, {
        code: "ai_allowance_used",
        error: "AI categorization used for this period",
      }),
    );

    expect(result.status).toBe("allowance_used");
  });

  test("maps a 402 payment_required to the paid-access state", async () => {
    const result = await parseSuggestResponse(
      jsonResponse(402, {
        code: "payment_required",
        error: "AI categorization uses Omni credits.",
      }),
    );

    expect(result.status).toBe("payment_required");
  });

  test("keeps a 402 without a readable body as allowance_used", async () => {
    const result = await parseSuggestResponse(
      new Response("nope", { status: 402 }),
    );

    expect(result.status).toBe("allowance_used");
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

/** The query params of a hub link, order-independent */
const paramsOf = (url: string) =>
  Object.fromEntries(new URL(url).searchParams.entries());

describe("aiUpgradeUrl", () => {
  test("points at the Pro plan for the workspace on the account hub", () => {
    const url = aiUpgradeUrl("https://account.omni.dev/", "acme");

    expect(url.startsWith("https://account.omni.dev/billing?")).toBe(true);
    expect(paramsOf(url)).toEqual({
      product: "myfi",
      plan: "pro",
      interval: "month",
      workspace: "acme",
    });
  });

  test("omits the workspace when it is not known", () => {
    expect(paramsOf(aiUpgradeUrl("https://account.omni.dev"))).toEqual({
      product: "myfi",
      plan: "pro",
      interval: "month",
    });
  });

  test("opens the hub as the signed-in account when given its subject", () => {
    expect(
      paramsOf(aiUpgradeUrl("https://account.omni.dev", "acme", "sub_1"))
        .login_hint,
    ).toBe("sub_1");
    expect(
      paramsOf(aiUpgradeUrl("https://account.omni.dev", "acme")),
    ).not.toHaveProperty("login_hint");
  });

  test("is empty when no account hub is configured", () => {
    expect(aiUpgradeUrl(undefined, "acme")).toBe("");
  });
});

describe("aiCreditsUrl", () => {
  test("points at buying AI credits for the workspace on the account hub", () => {
    const url = aiCreditsUrl("https://account.omni.dev/", "acme");

    expect(url.startsWith("https://account.omni.dev/billing?")).toBe(true);
    expect(paramsOf(url)).toEqual({
      product: "myfi",
      workspace: "acme",
      tab: "ai",
    });
  });

  test("omits the workspace when it is not known", () => {
    expect(paramsOf(aiCreditsUrl("https://account.omni.dev"))).toEqual({
      product: "myfi",
      tab: "ai",
    });
  });

  test("opens the hub as the signed-in account when given its subject", () => {
    expect(
      paramsOf(aiCreditsUrl("https://account.omni.dev", "acme", "sub_1"))
        .login_hint,
    ).toBe("sub_1");
    expect(
      paramsOf(aiCreditsUrl("https://account.omni.dev", "acme")),
    ).not.toHaveProperty("login_hint");
  });

  test("is empty when no account hub is configured", () => {
    expect(aiCreditsUrl(undefined, "acme")).toBe("");
  });
});
