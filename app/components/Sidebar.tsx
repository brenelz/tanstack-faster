import { For } from "solid-js";
import { Link } from "@tanstack/solid-router";
import { Category } from "@/db/schema";

type SidebarProps = {
  categories: Category[];
};

export function Sidebar(props: SidebarProps) {
  return (
    <div class="flex flex-col h-full">
      <h2 class="border-b border-[#FFA366] text-sm font-semibold text-[#FF6B00] mb-4">
        Choose a Category
      </h2>
      <ul class="flex flex-col items-start justify-center">
        <For each={props.categories}>
          {(category) => (
            <li class="w-full">
              <Link
                class="block w-full py-1 text-xs text-gray-800 hover:bg-accent2 hover:underline"
                to={`/categories/${category.slug}`}
              >
                {category.name}
              </Link>
            </li>
          )}
        </For>
      </ul>
    </div>
  );
}
