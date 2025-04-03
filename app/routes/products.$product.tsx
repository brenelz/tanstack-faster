import { createFileRoute } from "@tanstack/solid-router";
import { Show } from "solid-js";
import { getProduct } from "@/lib/server";
import { preloadImageIds } from "@/lib/imagePreloader";

export const Route = createFileRoute("/products/$product")({
  component: ProductPage,
  loader: async ({ params }) => {
    const product = await getProduct({ data: { product: params.product } });

    preloadImageIds([product.id], 400)

    return {
      product,
    };
  },
  staleTime: 1000 * 60 * 5, // 5 minutes
});

function ProductPage() {
  const data = Route.useLoaderData();

  return (
    <Show when={data().product} fallback={<div>Product not found</div>}>
      {(product) => (
        <div class="w-full space-y-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div class="flex justify-center">
              <img
                alt={`A picture of ${product().name}`}
                width="400"
                height="400"
                class="h-[400px] w-[400px] border object-cover"
                src={`https://picsum.photos/id/${product().id}/400`}
              />
            </div>

            {/* Product Info */}
            <div class="space-y-4">
              <h1 class="text-3xl font-bold text-[#FF6B00]">
                {product().name}
              </h1>
              <p class="text-2xl font-semibold text-[#FF6B00]">
                {product().price}
              </p>
              <p class="text-gray-600">{product().description}</p>
            </div>
          </div>
        </div>
      )}
    </Show>
  );
}
