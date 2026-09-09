import type { OrganizationClaim } from "@omnidotdev/providers";
import { useSessionRefresh } from "@omnidotdev/providers/react";
import type { QueryClient } from "@tanstack/react-query";
import type { ErrorComponentProps } from "@tanstack/react-router";
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
  useRouteContext,
} from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import type { Session } from "better-auth/types";
import type { ReactNode } from "react";
import CommandPalette from "@/components/CommandPalette";
import DefaultCatchBoundary from "@/components/DefaultCatchBoundary";
import NotFound from "@/components/NotFound";
import app from "@/lib/config/app.config";
import createMetaTags from "@/lib/util/createMetaTags";
import ThemeProvider from "@/providers/ThemeProvider";
import { fetchSession } from "@/server/functions/auth";
import { getTheme } from "@/server/functions/theme";
import appStyles from "@/styles.css?url";

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
      // paper ground in light, deep base in dark (approximates the base palette)
      {
        name: "theme-color",
        content: "#f6f7f9",
        media: "(prefers-color-scheme: light)",
      },
      {
        name: "theme-color",
        content: "#191b1d",
        media: "(prefers-color-scheme: dark)",
      },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "default" },
      { name: "apple-mobile-web-app-title", content: app.name },
      { name: "mobile-web-app-capable", content: "yes" },
      ...createMetaTags(),
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      // brand typefaces: Fraunces (display), Inter (text), IBM Plex Mono (figures)
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..600;1,9..144,340..460&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap",
      },
      { rel: "stylesheet", href: appStyles },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
      // .ico fallback for surfaces that don't read SVG favicons (link previews, iMessage)
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
    ],
  }),
  component: RootComponent,
  errorComponent: ErrorComponent,
  // Render 404s in-shell: a thrown `notFound()` renders here inside RootDocument
  // (globals + layout), not as a bare unstyled page. Pairs with the router's
  // `defaultNotFoundComponent` for unmatched routes.
  notFoundComponent: () => <NotFound />,
});

function ErrorComponent(props: ErrorComponentProps) {
  return (
    <RootDocument theme="light">
      <DefaultCatchBoundary {...props} />
    </RootDocument>
  );
}

function RootComponent() {
  // Keep the OAuth access token fresh while the user is idle
  useSessionRefresh(fetchSession);

  const { theme } = useRouteContext({ from: "__root__" });

  return (
    <RootDocument theme={theme}>
      <ThemeProvider theme={theme}>
        <CommandPalette />
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
