import { Outlet, createRootRoute } from "@tanstack/solid-router";

import appCss from "@/styles/app.css?url";
import Header from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { getCart, getCategories } from "@/lib/server";
import { TanStackRouterDevtools } from '@tanstack/solid-router-devtools'
import { preloadImageIds } from "@/lib/imagePreloader";

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
    const categories = await getCategories();
    const cart = await getCart();

    preloadImageIds(categories.map(category => category.id), 48);

    return {
      cart,
      categories,
    };
  },
  component: RootComponent,
  staleTime: 1000 * 60 * 5, // 5 minutes
});

function RootComponent() {
  const data = Route.useLoaderData();

  return (
    <div>
      <Header cart={data().cart} />
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
      <TanStackRouterDevtools />
    </div>
  );
}
