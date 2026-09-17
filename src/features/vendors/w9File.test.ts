import { describe, expect, test } from "bun:test";

import { validateW9File, W9_MAX_BYTES } from "./w9File";

describe("validateW9File", () => {
  test("accepts a PDF within the size limit", () => {
    expect(validateW9File({ type: "application/pdf", size: 1000 })).toEqual({
      ok: true,
    });
  });

  test("accepts common image types", () => {
    for (const type of ["image/jpeg", "image/png", "image/heic"]) {
      expect(validateW9File({ type, size: 1000 }).ok).toBe(true);
    }
  });

  test("rejects a disallowed type", () => {
    const r = validateW9File({ type: "text/csv", size: 1000 });
    expect(r.ok).toBe(false);
  });

  test("rejects a file over the size limit", () => {
    const r = validateW9File({
      type: "application/pdf",
      size: W9_MAX_BYTES + 1,
    });
    expect(r.ok).toBe(false);
  });

  test("accepts a file exactly at the size limit", () => {
    expect(
      validateW9File({ type: "application/pdf", size: W9_MAX_BYTES }).ok,
    ).toBe(true);
  });
});
