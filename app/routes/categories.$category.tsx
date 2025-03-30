import { createFileRoute } from "@tanstack/solid-router";
import { For, Show } from "solid-js";

// This would typically come from your database or API
const categories = [
  {
    title: "Art Books and Educational Materials",
    href: "/categories/art-books-and-educational-materials",
    products: [
      {
        title: "Drawing Fundamentals",
        price: "$29.99",
        image: "/images/products/drawing-fundamentals.jpg",
      },
      {
        title: "Watercolor Techniques",
        price: "$34.99",
        image: "/images/products/watercolor-techniques.jpg",
      },
    ],
  },
  // ... other categories
];

export const Route = createFileRoute("/categories/$category")({
  component: CategoryPage,
});

function CategoryPage() {
  const params = Route.useParams();
  const categoryData = categories.find(
    (c) => c.href === `/categories/${params().category}`
  );

  return (
    <Show when={categoryData} fallback={<div>Category not found</div>}>
      {(data) => (
        <div class="w-full space-y-8">
          <h1 class="text-2xl font-bold text-[#FF6B00]">{data().title}</h1>
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <For each={data().products}>
              {(product) => (
                <a
                  href={`/products/${product.title
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  class="flex w-[125px] flex-col items-center text-center"
                >
                  <img
                    alt={`A small picture of ${product.title}`}
                    loading="eager"
                    width="48"
                    height="48"
                    decoding="sync"
                    class="mb-2 h-14 w-14 border hover:bg-accent2 object-cover"
                    src={product.image}
                  />
                  <span class="text-xs">{product.title}</span>
                  <span class="text-xs text-accent1">{product.price}</span>
                </a>
              )}
            </For>
          </div>
        </div>
      )}
    </Show>
  );
}
