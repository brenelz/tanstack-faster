import { Link } from "@tanstack/solid-router";
import { Show } from "solid-js";
import { Cart } from "@/lib/server";

export default function Header(props: { cart: Cart }) {

  const cartQuantity = () => {
    if (!props.cart) return 0;
    return props.cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <header class="bg-white fixed top-0 z-10 flex h-[90px] w-[100vw] items-center justify-between border-b-2 border-[#FFA366] bg-background p-2 pb-[4px] pt-2 sm:h-[70px] sm:flex-row sm:gap-4 sm:p-4 sm:pb-[4px] sm:pt-0">
      <Link class="text-4xl font-bold text-[#FF6B00]" to="/">
        TanstackFaster
      </Link>
      <div class="flex items-center gap-4">
        <Link
          to="/cart"
          class="text-sm font-medium text-[#FF6B00] hover:text-[#FFA366] flex items-center gap-2 relative"
        >
          <div class="relative">
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
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
            <Show when={cartQuantity() > 0}>
              <div class="absolute -top-2 -right-2 bg-[#FF6B00] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartQuantity()}
              </div>
            </Show>
          </div>
          Cart
        </Link>
      </div>
    </header>
  );
}
