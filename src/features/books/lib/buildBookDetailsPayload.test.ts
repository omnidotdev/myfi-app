import { describe, expect, test } from "bun:test";

import { buildBookDetailsPayload } from "./buildBookDetailsPayload";

const base = {
  legalName: "Acme LLC",
  ein: "",
  address: "1 Main St",
  city: "Austin",
  state: "TX",
  zip: "78701",
  phone: "555-0100",
};

describe("buildBookDetailsPayload", () => {
  test("omits the EIN when left blank so the stored value is not overwritten", () => {
    // A blank EIN field means "leave the masked value on file", never clear it
    const payload = buildBookDetailsPayload(base);
    expect("ein" in payload).toBe(false);
    expect(payload.legalName).toBe("Acme LLC");
  });

  test("sends a trimmed EIN when the user types a new one", () => {
    const payload = buildBookDetailsPayload({ ...base, ein: "  12-3456789 " });
    expect(payload.ein).toBe("12-3456789");
  });

  test("still sends other fields when cleared so they can be unset", () => {
    const payload = buildBookDetailsPayload({ ...base, phone: "" });
    expect(payload.phone).toBe("");
  });
});
