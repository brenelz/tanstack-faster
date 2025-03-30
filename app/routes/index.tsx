import { createFileRoute } from "@tanstack/solid-router";
import { For } from "solid-js";

export const Route = createFileRoute("/")({
  component: Home,
});

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
  {
    title: "Canvas and Surfaces",
    href: "/categories/canvas-and-surfaces",
    products: [
      {
        title: "Stretched Canvas 24x36",
        price: "$45.99",
        image: "/images/products/canvas-24x36.jpg",
      },
      {
        title: "Canvas Panel Set",
        price: "$39.99",
        image: "/images/products/canvas-panel-set.jpg",
      },
    ],
  },
  {
    title: "Ceramics and Pottery",
    href: "/categories/ceramics-and-pottery",
    products: [
      {
        title: "Pottery Wheel Kit",
        price: "$199.99",
        image: "/images/products/pottery-wheel.jpg",
      },
      {
        title: "Clay Tool Set",
        price: "$49.99",
        image: "/images/products/clay-tools.jpg",
      },
    ],
  },
  {
    title: "Craft Supplies",
    href: "/categories/craft-supplies",
    products: [
      {
        title: "Beading Kit",
        price: "$24.99",
        image: "/images/products/beading-kit.jpg",
      },
      {
        title: "Scrapbooking Bundle",
        price: "$59.99",
        image: "/images/products/scrapbook-bundle.jpg",
      },
    ],
  },
  {
    title: "Digital Art Supplies",
    href: "/categories/digital-art-supplies",
    products: [
      {
        title: "Drawing Tablet",
        price: "$299.99",
        image: "/images/products/drawing-tablet.jpg",
      },
      {
        title: "Digital Pen Set",
        price: "$79.99",
        image: "/images/products/digital-pen.jpg",
      },
    ],
  },
];

function Home() {
  return (
    <div class="w-full space-y-12">
      <For each={categories}>
        {(category) => (
          <div class="space-y-4">
            <h2 class="text-lg font-semibold text-[#FF6B00] border-b border-[#FFA366] pb-2">
              {category.title}
            </h2>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              <For each={category.products}>
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
      </For>
    </div>
  );
}
