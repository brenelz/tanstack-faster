import { createFileRoute, useNavigate, useRouter } from "@tanstack/solid-router";
import { Show, createSignal } from "solid-js";
import { addItemToCart, getProduct } from "@/lib/server";
import { preloadImageIds } from "@/lib/imagePreloader";
import { createAsync } from "@/lib/utils";

export const Route = createFileRoute("/products/$product")({
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
  const product = createAsync(() => data().productPromise);
  const [isAdding, setIsAdding] = createSignal(false);
  const navigate = useNavigate();
  const router = useRouter();

  const handleAddToCart = async () => {
    setIsAdding(true);
    await addItemToCart({ data: { product: product()! } });
    router.invalidate();
    navigate({ to: '/cart' });
  };

  return (
    <Show when={product()} fallback={<div>Product not found</div>}>
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
