import { Outlet, createRootRoute } from "@tanstack/solid-router";

import appCss from "@/styles/app.css?url";
import Header from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { getCategories } from "@/lib/server";

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
  loader: async () => {
    return {
      categories: await getCategories(),
    };
  },
  component: RootComponent,
  staleTime: 1000 * 60 * 5, // 5 minutes
});

function RootComponent() {
  const data = Route.useLoaderData();

  return (
    <div>
      <Header />
      <div class="pt-[85px] sm:pt-[70px]">
        <div class="flex flex-grow font-mono">
          <aside class="fixed left-0 hidden w-64 min-w-64 max-w-64 overflow-y-auto border-r p-4 md:block">
            <Sidebar categories={data().categories} />
          </aside>
          <main class="min-h-[calc(100vh-113px)] flex-1 overflow-y-auto p-4 pt-0 md:pl-64">
            <div class="w-full p-4">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
