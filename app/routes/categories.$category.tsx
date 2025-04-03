import { createFileRoute } from "@tanstack/solid-router";
import { For, Show } from "solid-js";
import { Link } from "@tanstack/solid-router";
import { getCategory } from "@/lib/server";
import { preloadImageIds } from "@/lib/imagePreloader";

export const Route = createFileRoute("/categories/$category")({
  component: CategoryPage,
  loader: async ({ params }) => {
    const category = await getCategory({ data: { slug: params.category } });

    await preloadImageIds(category.products.map(product => product.id), 48)

    return {
      category
    };
  },
  staleTime: 1000 * 60 * 5, // 5 minutes
});

function CategoryPage() {
  const data = Route.useLoaderData();

  return (
    <Show when={data().category} fallback={<div>Category not found</div>}>
      {(category) => (
        <div class="w-full space-y-8">
          <h1 class="text-2xl font-bold text-[#FF6B00]">{category().name}</h1>
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <For each={category().products}>
              {(product) => (
                <Link
                  to="/products/$product"
                  params={{
                    product: product.slug,
                  }}
                  class="flex w-[125px] flex-col items-center text-center"
                >
                  <img
                    alt={`A small picture of ${product.name}`}
                    width="48"
                    height="48"
                    class="mb-2 h-14 w-14 border hover:bg-accent2 object-cover"
                    src={`https://picsum.photos/id/${product.id}/48`}
                  />
                  <span class="text-xs">{product.name}</span>
                  <span class="text-xs text-[#FF6B00]">{product.price}</span>
                </Link>
              )}
            </For>
          </div>
        </div>
      )}
    </Show>
  );
}
