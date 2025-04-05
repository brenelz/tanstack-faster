import { getCart, removeFromCart } from "@/lib/server";
import { createFileRoute, useRouter } from "@tanstack/solid-router";
import { createResource, For, Show, Suspense } from "solid-js";
import { Link } from "@tanstack/solid-router";

export const Route = createFileRoute("/cart")({
    component: CartPage,
    loader: async () => {
        const cartPromise = getCart();
        return {
            cartPromise
        };
    }
});

function CartPage() {
    const data = Route.useLoaderData();
    const router = useRouter();
    const [cart] = createResource(() => data().cartPromise);

    const total = () => {
        return cart()?.reduce((sum, item) => {
            if (!item.product) return sum;
            return sum + (Number(item.product.price) * item.quantity);
        }, 0).toFixed(2);
    };

    const handleRemove = async (itemId: number) => {
        await removeFromCart({ data: { cartItemId: itemId } });
        router.invalidate();
    };

    return (
        <div class="w-full space-y-8">
            <h1 class="text-3xl font-bold text-[#FF6B00]">Shopping Cart</h1>
            <Suspense fallback={<div>Loading...</div>}>
                <Show
                    when={cart() && cart()!.length > 0}
                    fallback={
                        <div class="bg-white rounded-lg shadow">
                            <div class="p-6">
                                <p class="text-gray-600">Your cart is empty.</p>
                            </div>
                        </div>
                    }
                >
                    <div class="bg-white rounded-lg shadow">
                        <div class="p-6">
                            <div class="space-y-4">
                                <For each={cart()}>
                                    {(item) => (
                                        <Show when={item.product} fallback={null}>
                                            {(product) => (
                                                <div class="flex items-center justify-between border-b pb-4">
                                                    <div class="flex items-center space-x-4">
                                                        <Link
                                                            to="/products/$product"
                                                            params={{ product: product().slug }}
                                                            class="hover:opacity-75"
                                                        >
                                                            <img
                                                                alt={`A picture of ${product().name}`}
                                                                width="64"
                                                                height="64"
                                                                class="h-16 w-16 border object-cover"
                                                                src={`https://picsum.photos/id/${product().id}/64`}
                                                            />
                                                        </Link>
                                                        <div>
                                                            <Link
                                                                to="/products/$product"
                                                                params={{ product: product().slug }}
                                                                class="text-lg font-medium text-[#FF6B00] hover:text-[#FFA366]"
                                                            >
                                                                {product().name}
                                                            </Link>
                                                            <p class="text-sm text-gray-600">${product().price}</p>
                                                        </div>
                                                    </div>
                                                    <div class="flex items-center space-x-6">
                                                        <div class="flex items-center space-x-2">
                                                            <span class="text-gray-600">Qty:</span>
                                                            <span class="font-medium">{item.quantity}</span>
                                                        </div>
                                                        <div class="text-right">
                                                            <p class="text-lg font-medium text-[#FF6B00]">
                                                                ${(Number(product().price) * item.quantity).toFixed(2)}
                                                            </p>
                                                        </div>
                                                        <button
                                                            onClick={() => handleRemove(item.id)}
                                                            class="text-gray-500 hover:text-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                                            title="Remove item"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="20"
                                                                height="20"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                stroke-width="2"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                class="h-5 w-5"
                                                            >
                                                                <path d="M3 6h18" />
                                                                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                                                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                                                <line x1="10" y1="11" x2="10" y2="17" />
                                                                <line x1="14" y1="11" x2="14" y2="17" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </Show>
                                    )}
                                </For>
                                <div class="flex justify-end pt-4">
                                    <div class="text-right">
                                        <p class="text-sm text-gray-600">Total</p>
                                        <p class="text-2xl font-bold text-[#FF6B00]">${total()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Show>
            </Suspense>
        </div>
    );
} 