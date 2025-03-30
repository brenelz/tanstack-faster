import { createFileRoute, getRouteApi } from "@tanstack/solid-router";
import { For } from "solid-js";
import { Link } from "@tanstack/solid-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const data = getRouteApi("__root__").useLoaderData();

  return (
    <div class="w-full space-y-12">
      <For each={data().categories}>
        {(category) => (
          <div class="space-y-4">
            <h2 class="text-lg font-semibold text-[#FF6B00] border-b border-[#FFA366] pb-2">
              {category.title}
            </h2>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              <For each={category.products}>
                {(product) => (
                  <Link
                    to="/products/$product"
                    params={{
                      product: product.title.toLowerCase().replace(/\s+/g, "-"),
                    }}
                    class="flex w-[125px] flex-col items-center text-center"
                  >
                    <img
                      alt={`A small picture of ${product.title}`}
                      loading="eager"
                      width="48"
                      height="48"
                      decoding="sync"
                      class="mb-2 h-14 w-14 border hover:bg-accent2 object-cover"
                      src={product.image}
                    />
                    <span class="text-xs">{product.title}</span>
                    <span class="text-xs text-[#FF6B00]">{product.price}</span>
                  </Link>
                )}
              </For>
            </div>
          </div>
        )}
      </For>
    </div>
  );
}
