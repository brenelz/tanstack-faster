import { Cart } from "@/lib/server";
import { Show } from "solid-js";

export default function QtyBadge(props: { cart: Cart }) {
    const cartQuantity = () => {
        if (!props.cart) return 0;
        return props.cart.reduce((total, item) => total + item.quantity, 0);
    };

    return (
        <Show when={cartQuantity() > 0}>
            <div class="absolute -top-2 -right-2 bg-[#FF6B00] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartQuantity()}
            </div>
        </Show>
    )
}