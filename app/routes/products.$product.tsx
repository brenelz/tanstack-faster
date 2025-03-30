import { createFileRoute } from "@tanstack/solid-router";
import { For, Show } from "solid-js";
import { getProduct } from "@/lib/server";

export const Route = createFileRoute("/products/$product")({
  component: ProductPage,
  loader: async ({ params }) => {
    return {
      product: await getProduct({ data: { product: params.product } }),
    };
  },
  staleTime: 1000 * 60 * 5, // 5 minutes
});

function ProductPage() {
  const data = Route.useLoaderData();

  return (
    <Show when={data().product} fallback={<div>Product not found</div>}>
      {(data) => (
        <div class="w-full space-y-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div class="flex justify-center">
              <img
                alt={`A picture of ${data().title}`}
                loading="eager"
                width="400"
                height="400"
                decoding="sync"
                class="h-[400px] w-[400px] border object-cover"
                src={data().image}
              />
            </div>

            {/* Product Info */}
            <div class="space-y-4">
              <h1 class="text-3xl font-bold text-[#FF6B00]">{data().title}</h1>
              <p class="text-2xl font-semibold text-[#FF6B00]">
                {data().price}
              </p>
              <p class="text-gray-600">{data().description}</p>

              {/* Product Details */}
              <div class="space-y-2">
                <h2 class="text-lg font-semibold text-[#FF6B00]">
                  Product Details
                </h2>
                <ul class="list-disc pl-5 space-y-1">
                  <For each={data().details}>
                    {(detail) => <li class="text-gray-600">{detail}</li>}
                  </For>
                </ul>
              </div>

              {/* Add to Cart Button */}
              <button class="w-full bg-accent1 text-white py-3 px-6 rounded hover:bg-accent2 transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </Show>
  );
}
