import { HeadContent, Outlet, Scripts, createRootRoute } from "@tanstack/solid-router";

import "@/styles/app.css";
import Header from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { getCart, getCategories } from "@/lib/server";
import { Show, Suspense } from "solid-js";
import { createAsync } from "@/lib/utils";
import { HydrationScript } from "solid-js/web";

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
    <html>
      <head>
        <HydrationScript />
      </head>
      <body>
        <HeadContent />
        <Suspense>
          <div>
            <Header cart={cart.latest} />
            <div class="spt-[85px] sm:pt-[70px]">
              <div class="flex flex-grow font-mono">
                <aside class="fixed left-0 hidden w-64 min-w-64 max-w-64 overflow-y-auto border-r p-4 md:block">
                  <Suspense fallback={<div class="p-4">Loading Categories...</div>}>
                    <Sidebar categories={categories.latest} />
                  </Suspense>
                </aside>
                <main class="min-h-[calc(100vh-113px)] flex-1 overflow-y-auto p-4 pt-0 md:pl-64">
                  <div class="w-full p-4">
                    <Outlet />
                  </div>
                </main>
              </div>
            </div>
          </div >
        </Suspense>
        <Scripts />
      </body>
    </html>
  );
}
