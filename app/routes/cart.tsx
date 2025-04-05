import { getCart } from "@/lib/server";
import { createFileRoute } from "@tanstack/solid-router";
import { For, Show } from "solid-js";
import { Link } from "@tanstack/solid-router";

export const Route = createFileRoute("/cart")({
    component: CartPage,
    loader: async () => {
        const cartItems = await getCart();
        return {
            cartItems
        };
    }
});

function CartPage() {
    const data = Route.useLoaderData();

    const total = () => {
        return data().cartItems.reduce((sum, item) => {
            if (!item.product) return sum;
            return sum + (Number(item.product.price) * item.quantity);
        }, 0).toFixed(2);
    };

    return (
        <div class="w-full space-y-8">
            <h1 class="text-3xl font-bold text-[#FF6B00]">Cart</h1>
            <Show
                when={data().cartItems.length > 0}
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
                            <For each={data().cartItems}>
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
                                                <div class="flex items-center space-x-4">
                                                    <div class="flex items-center space-x-2">
                                                        <span class="text-gray-600">Qty:</span>
                                                        <span class="font-medium">{item.quantity}</span>
                                                    </div>
                                                    <div class="text-right">
                                                        <p class="text-lg font-medium text-[#FF6B00]">
                                                            ${(Number(product().price) * item.quantity).toFixed(2)}
                                                        </p>
                                                    </div>
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
        </div>
    );
} 