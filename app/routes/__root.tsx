import { Outlet, createRootRoute } from "@tanstack/solid-router";

import appCss from "@/styles/app.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charset: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "TanStackFaster",
      },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  component: RootComponent,
});

function RootComponent() {
  return <Outlet />;
}
