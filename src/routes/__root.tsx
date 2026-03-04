import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useRouteContext,
} from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

import app from "@/lib/config/app.config";
import ThemeProvider from "@/providers/ThemeProvider";
import { fetchSession } from "@/server/functions/auth";
import { getTheme } from "@/server/functions/theme";
import appStyles from "@/styles.css?url";

import type { OrganizationClaim } from "@omnidotdev/providers";
import type { QueryClient } from "@tanstack/react-query";
import type { Session } from "better-auth/types";
import type { ReactNode } from "react";

interface ExtendedUser {
  id: string;
  email: string;
  name?: string;
  image?: string;
  identityProviderId?: string;
  username?: string;
}

interface ExtendedSession extends Omit<Session, "user"> {
  user: ExtendedUser;
  accessToken?: string;
  organizations?: OrganizationClaim[];
}

const fetchSessionAndTheme = createServerFn({ method: "GET" }).handler(
  async () => {
    const { session } = await fetchSession();
    const theme = await getTheme();

    return { session, theme };
  },
);

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  session: ExtendedSession | null;
  theme: string;
}>()({
  beforeLoad: async () => {
    const { session, theme } = await fetchSessionAndTheme();

    return { session, theme };
  },
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#0a1628" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "default" },
      { name: "apple-mobile-web-app-title", content: app.name },
      { name: "mobile-web-app-capable", content: "yes" },
      { title: `${app.name} — ${app.description}` },
    ],
    links: [
      { rel: "stylesheet", href: appStyles },
      { rel: "icon", type: "image/svg+xml", href: "/omni-logo.svg" },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  const { theme } = useRouteContext({ from: "__root__" });

  return (
    <RootDocument theme={theme}>
      <ThemeProvider theme={theme}>
        <Outlet />
      </ThemeProvider>
    </RootDocument>
  );
}

function RootDocument({
  children,
  theme,
}: Readonly<{ children: ReactNode; theme: string }>) {
  return (
    <html lang="en" className={theme}>
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen bg-background text-foreground">
        {children}
        <Scripts />
      </body>
    </html>
  );
}
