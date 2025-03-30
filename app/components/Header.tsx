export default function Header() {
  return (
    <header class="fixed top-0 z-10 flex h-[90px] w-[100vw] flex-grow items-center justify-between border-b-2 border-accent2 bg-background p-2 pb-[4px] pt-2 sm:h-[70px] sm:flex-row sm:gap-4 sm:p-4 sm:pb-[4px] sm:pt-0">
      <div class="flex flex-grow flex-col">
        <div class="flex w-full flex-col items-start justify-center sm:w-auto sm:flex-row sm:items-center sm:gap-2">
          <a class="text-4xl font-bold text-[#FF6B00]" href="/">
            TanstackFaster
          </a>
          <div class="items flex w-full flex-row items-center justify-between gap-4">
            <div class="mx-0 flex-grow sm:mx-auto sm:flex-grow-0">
              <div class="font-sans">
                <div class="relative flex-grow">
                  <div class="relative">
                    <input
                      type="text"
                      class="flex h-9 w-full border border-gray-500 bg-transparent px-3 py-1 text-sm outline-none pr-12 font-sans font-medium sm:w-[300px] md:w-[375px]"
                      autocapitalize="off"
                      autocorrect="off"
                      placeholder="Search..."
                      value=""
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-x absolute right-7 top-2 h-5 w-5 text-muted-foreground hidden"
                    >
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex flex-row justify-between space-x-4">
              <div class="relative">
                <a class="text-lg text-[#FF6B00] hover:underline" href="/order">
                  ORDER
                </a>
              </div>
              <a
                class="hidden text-lg text-[#FF6B00] hover:underline md:block"
                href="/order-history"
              >
                ORDER HISTORY
              </a>
              <a
                aria-label="Order History"
                class="block text-lg text-[#FF6B00] hover:underline md:hidden"
                href="/order-history"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-menu"
                >
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
