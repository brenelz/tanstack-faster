import { createFileRoute } from '@tanstack/solid-router'
import { useNavigate, useRouter } from "@tanstack/solid-router";
import { Show, createSignal, createMemo } from "solid-js";
import { addItemToCart, getProduct } from "@/lib/server";
import { preloadImageIds } from "@/lib/imagePreloader";

export const Route = createFileRoute('/products/$product')({
  component: ProductPage,
  loader: async ({ params }) => {
    const productPromise = getProduct({ data: { product: params.product } });

    productPromise.then(product => preloadImageIds([product.id], 400));

    return {
      productPromise,
    };
  },
  staleTime: 1000 * 60 * 5, // 5 minutes
});

function ProductPage() {
  const data = Route.useLoaderData();
  const product = createMemo(() => data()?.productPromise);
  const [isAdding, setIsAdding] = createSignal(false);
  const navigate = useNavigate();
  const router = useRouter();

  const handleAddToCart = async () => {
    console.log('product', product());
    setIsAdding(true);
    await addItemToCart({ data: { product: product()! } });
    router.invalidate();
    await router.preloadRoute({ to: '/cart' })
    navigate({ to: '/cart' });
  };

  return (
    <Show when={product()}>
      {(productItem) => (
        <div class="w-full space-y-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div class="flex justify-center">
              <img
                alt={`A picture of ${productItem().name}`}
                width="400"
                height="400"
                class="h-[400px] w-[400px] border object-cover"
                src={`https://picsum.photos/id/${productItem().id}/400`}
              />
            </div>

            {/* Product Info */}
            <div class="space-y-4">
              <h1 class="text-3xl font-bold text-[#FF6B00]">
                {productItem().name}
              </h1>
              <p class="text-2xl font-semibold text-[#FF6B00]">
                {productItem().price}
              </p>
              <p class="text-gray-600">{productItem().description}</p>
              <button
                class="w-full bg-[#FF6B00] text-white py-2 px-4 rounded-md hover:bg-[#FFA366] disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleAddToCart}
                disabled={isAdding()}
              >
                {isAdding() ? "Adding..." : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      )}
    </Show>
  );
}
