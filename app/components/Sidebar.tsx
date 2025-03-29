export function Sidebar() {
  return (
    <div class="flex flex-col h-full">
      <h2 class="border-b border-accent1 text-sm font-semibold text-accent1 mb-4 pb-2">
        Choose a Category
      </h2>
      <nav class="flex-1 mb-8">
        <ul class="space-y-2">
          <li class="w-full">
            <a
              href="/"
              class="block w-full py-1 text-xs text-gray-800 hover:bg-accent2 hover:underline"
            >
              Home
            </a>
          </li>
          <li class="w-full">
            <a
              href="/order"
              class="block w-full py-1 text-xs text-gray-800 hover:bg-accent2 hover:underline"
            >
              Order
            </a>
          </li>
          <li class="w-full">
            <a
              href="/order-history"
              class="block w-full py-1 text-xs text-gray-800 hover:bg-accent2 hover:underline"
            >
              Order History
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
