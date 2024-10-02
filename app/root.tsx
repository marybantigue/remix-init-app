import clsx from "clsx";
import {
  PreventFlashOnWrongTheme,
  ThemeProvider,
  useTheme,
} from "remix-themes";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { themeSessionResolver } from "~/sessions.server";
import stylesheet from "~/tailwind.css?url";
import { getSession } from "~/services/session.server";
import { SidebarProvider } from "~/providers/SidebarProvider";
import { UserProvider } from "~/providers/UserProvider";
import { authenticator } from "./services/auth.server";
import { GlobalDataProvider } from "~/providers/GlobalDataProvider";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  { rel: "stylesheet", href: stylesheet },
];

// Return the theme from the session storage using the loader
export async function loader({ request }: LoaderFunctionArgs) {
  const { getTheme } = await themeSessionResolver(request);
  const session = await getSession(request.headers.get("Cookie"));
  const isOpen = session.get("isOpen") ?? true; // Default to false if not set
  const user = await authenticator.isAuthenticated(request);
  const appName = process.env.APP_NAME ?? "Remix App";
  return {
    theme: getTheme(),
    isOpen,
    user: user ?? null,
    appName,
  };
}

export function App() {
  const data = useLoaderData<typeof loader>();
  const [theme] = useTheme();
  return (
    <html lang="en" className={clsx(theme)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
        <Links />
      </head>
      <body className="transition-colors min-h-screen">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function AppWithProviders() {
  const data = useLoaderData<typeof loader>();
  return (
    <GlobalDataProvider appName={data.appName}>
      <UserProvider user={data.user}>
        <ThemeProvider
          specifiedTheme={data.theme}
          themeAction="/action/set-theme"
        >
          <SidebarProvider initialIsOpen={data.isOpen}>
            <App />
          </SidebarProvider>
        </ThemeProvider>
      </UserProvider>
    </GlobalDataProvider>
  );
}
