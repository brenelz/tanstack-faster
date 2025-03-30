import { For } from "solid-js";
import { Link } from "@tanstack/solid-router";

const categories = [
  {
    title: "Art Books and Educational Materials",
    href: "/categories/art-books-and-educational-materials",
  },
  {
    title: "Canvas and Surfaces",
    href: "/categories/canvas-and-surfaces",
  },
  {
    title: "Ceramics and Pottery",
    href: "/categories/ceramics-and-pottery",
  },
  {
    title: "Craft Supplies",
    href: "/categories/craft-supplies",
  },
  {
    title: "Digital Art Supplies",
    href: "/categories/digital-art-supplies",
  },
];

export function Sidebar() {
  return (
    <div class="flex flex-col h-full">
      <h2 class="border-b border-[#FFA366] text-sm font-semibold text-[#FF6B00] mb-4">
        Choose a Category
      </h2>
      <ul class="flex flex-col items-start justify-center">
        <For each={categories}>
          {(category) => (
            <li class="w-full">
              <Link
                class="block w-full py-1 text-xs text-gray-800 hover:bg-accent2 hover:underline"
                to={category.href}
              >
                {category.title}
              </Link>
            </li>
          )}
        </For>
      </ul>
    </div>
  );
}
