import { createFileRoute } from "@tanstack/solid-router";
import { For, Show } from "solid-js";
import { Link } from "@tanstack/solid-router";

// This would typically come from your database or API
const products = [
  {
    title: "Drawing Fundamentals",
    price: "$29.99",
    image: "/images/products/drawing-fundamentals.jpg",
    description:
      "A comprehensive guide to drawing techniques and fundamentals. Perfect for beginners and intermediate artists looking to improve their skills.",
    category: "Art Books and Educational Materials",
    details: [
      "Paperback, 256 pages",
      "Full-color illustrations",
      "Step-by-step tutorials",
      "Practice exercises included",
    ],
    relatedProducts: [
      {
        title: "Watercolor Techniques",
        price: "$34.99",
        image: "/images/products/watercolor-techniques.jpg",
      },
      {
        title: "Color Theory Basics",
        price: "$24.99",
        image: "/images/products/color-theory.jpg",
      },
    ],
  },
  {
    title: "Watercolor Techniques",
    price: "$34.99",
    image: "/images/products/watercolor-techniques.jpg",
    description:
      "Master the art of watercolor painting with this detailed guide. Learn essential techniques and create beautiful artwork.",
    category: "Art Books and Educational Materials",
    details: [
      "Hardcover, 320 pages",
      "High-quality paper",
      "Color mixing guide",
      "Project tutorials",
    ],
    relatedProducts: [
      {
        title: "Drawing Fundamentals",
        price: "$29.99",
        image: "/images/products/drawing-fundamentals.jpg",
      },
      {
        title: "Watercolor Paper Set",
        price: "$19.99",
        image: "/images/products/watercolor-paper.jpg",
      },
    ],
  },
];

export const Route = createFileRoute("/products/$product")({
  component: ProductPage,
});

function ProductPage() {
  const params = Route.useParams();
  const productData = products.find(
    (p) => p.title.toLowerCase().replace(/\s+/g, "-") === params().product
  );

  return (
    <Show when={productData} fallback={<div>Product not found</div>}>
      {(data) => (
        <div class="w-full space-y-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div class="flex justify-center">
              <img
                alt={`A picture of ${data().title}`}
                loading="eager"
                width="400"
                height="400"
                decoding="sync"
                class="h-[400px] w-[400px] border object-cover"
                src={data().image}
              />
            </div>

            {/* Product Info */}
            <div class="space-y-4">
              <h1 class="text-3xl font-bold text-[#FF6B00]">{data().title}</h1>
              <p class="text-2xl font-semibold text-[#FF6B00]">
                {data().price}
              </p>
              <p class="text-gray-600">{data().description}</p>

              {/* Product Details */}
              <div class="space-y-2">
                <h2 class="text-lg font-semibold text-[#FF6B00]">
                  Product Details
                </h2>
                <ul class="list-disc pl-5 space-y-1">
                  <For each={data().details}>
                    {(detail) => <li class="text-gray-600">{detail}</li>}
                  </For>
                </ul>
              </div>

              {/* Add to Cart Button */}
              <button class="w-full bg-accent1 text-white py-3 px-6 rounded hover:bg-accent2 transition-colors">
                Add to Cart
              </button>
            </div>
          </div>

          {/* Related Products */}
          <div class="space-y-4">
            <h2 class="text-xl font-semibold text-[#FF6B00]">
              Related Products
            </h2>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              <For each={data().relatedProducts}>
                {(product) => (
                  <Link
                    to="/products/$product"
                    params={{
                      product: product.title.toLowerCase().replace(/\s+/g, "-"),
                    }}
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
                    <span class="text-xs text-[#FF6B00]">{product.price}</span>
                  </Link>
                )}
              </For>
            </div>
          </div>
        </div>
      )}
    </Show>
  );
}
