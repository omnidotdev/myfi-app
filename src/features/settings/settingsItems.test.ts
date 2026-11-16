import { describe, expect, test } from "bun:test";
import { existsSync } from "node:fs";
import { join } from "node:path";

import { settingsItems } from "./settingsItems";

const ROUTES_DIR = join(import.meta.dir, "../../routes/_app");

/** Route files that can serve a settings `href` */
const routeFilesFor = (href: string) => {
  const path = join(ROUTES_DIR, href);
  return [`${path}.tsx`, join(path, "index.tsx"), join(path, "route.tsx")];
};

describe("settings items", () => {
  test("every settings link resolves to a route", () => {
    for (const { href } of settingsItems) {
      expect(
        routeFilesFor(href).some((file) => existsSync(file)),
        `${href} has no route`,
      ).toBe(true);
    }
  });

  test("no audit log entry while no audit source is wired", () => {
    expect(settingsItems.map(({ href }) => href)).not.toContain(
      "/@{$workspaceSlug}/~/settings/audit",
    );
  });
});
