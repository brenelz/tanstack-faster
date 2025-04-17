import { createAsync } from "@/lib/utils";
import { createFileRoute, getRouteApi } from "@tanstack/solid-router";
import { For } from "solid-js";
import { Link } from "@tanstack/solid-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const data = getRouteApi("__root__").useLoaderData();
  const categories = createAsync(() => data().categoriesPromise);

  return (
    <div class="w-full space-y-12">
      <div class="space-y-4">
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <For each={categories.latest}>
            {(category) => (
              <Link
                to="/categories/$category"
                params={{
                  category: category.slug,
                }}
                class="flex w-[125px] flex-col items-center text-center"
              >
                <img
                  alt={`A small picture of ${category.name}`}
                  width="48"
                  height="48"
                  class="mb-2 h-14 w-14 border hover:bg-accent2 object-cover"
                  src={`https://picsum.photos/id/${category.id}/48`}
                />
                <span class="text-xs">{category.name}</span>
              </Link>
            )}
          </For>
        </div>
      </div>
    </div>
  );
}
