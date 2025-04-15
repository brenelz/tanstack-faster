import { Outlet, createRootRoute } from "@tanstack/solid-router";

import appCss from "@/styles/app.css?url";
import Header from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { getCart, getCategories } from "@/lib/server";
import { TanStackRouterDevtools } from '@tanstack/solid-router-devtools'
import { Show, Suspense } from "solid-js";
import { createAsync } from "@/lib/utils";

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
    // don't block loading the page
    return {
      cartPromise: getCart(),
      categoriesPromise: getCategories()
    };
  },
  component: RootComponent,
  staleTime: 1000 * 60 * 5, // 5 minutes
});

function RootComponent() {
  const data = Route.useLoaderData();

  const cart = createAsync(() => data().cartPromise);
  const categories = createAsync(() => data().categoriesPromise);

  return (
    <div>
      <Header cart={cart.latest} />
      <div class="pt-[85px] sm:pt-[70px]">
        <div class="flex flex-grow font-mono">
          <Show when={categories.latest} fallback={<div class="p-4">Loading Categories...</div>}>
            <aside class="fixed left-0 hidden w-64 min-w-64 max-w-64 overflow-y-auto border-r p-4 md:block">
              <Sidebar categories={categories.latest} />
            </aside>
            <main class="min-h-[calc(100vh-113px)] flex-1 overflow-y-auto p-4 pt-0 md:pl-64">
              <div class="w-full p-4">
                <Outlet />
              </div>
            </main>
          </Show>
        </div>
      </div>
      <TanStackRouterDevtools />
    </div >
  );
}
