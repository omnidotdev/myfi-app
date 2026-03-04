import { createServerFn } from "@tanstack/react-start";
import { getCookie, setCookie } from "@tanstack/react-start/server";
import { z } from "zod";

const themeValidator = z.union([z.literal("light"), z.literal("dark")]);
const storageKey = "_preferred-theme";

type Theme = z.infer<typeof themeValidator>;

const getTheme = createServerFn().handler(
  async () => (getCookie(storageKey) || "dark") as Theme,
);

const setTheme = createServerFn({ method: "POST" })
  .inputValidator(themeValidator)
  .handler(async ({ data }) => setCookie(storageKey, data));

export { getTheme, setTheme };

export type { Theme };
