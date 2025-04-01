import { createFileRoute, getRouteApi } from "@tanstack/solid-router";
import { For, Show } from "solid-js";
import { Link } from "@tanstack/solid-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const data = getRouteApi("__root__").useLoaderData();

  return (
    <div class="w-full space-y-12">
      <div class="space-y-4">
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <For each={data().categories}>
            {(category) => (
              <Link
                to="/categories/$category"
                params={{
                  category: category.slug,
                }}
                class="flex w-[125px] flex-col items-center text-center"
              >
                <Show when={category.image_url}>
                  {(image_url) => (<img
                    alt={`A small picture of ${category.name}`}
                    loading="eager"
                    width="48"
                    height="48"
                    decoding="sync"
                    class="mb-2 h-14 w-14 border hover:bg-accent2 object-cover"
                    src={image_url()}
                  />)}
                </Show>
                <span class="text-xs">{category.name}</span>
              </Link>
            )}
          </For>
        </div>
      </div>
    </div>
  );
}
