import { categories } from "@/lib/data";
import { createServerFn } from "@tanstack/solid-start";

export const getCategories = createServerFn().handler(async () => {
  return categories.map((category) => ({
    title: category.title,
    href: category.href,
  }));
});

export const getProduct = createServerFn()
  .validator((p: { product: string }) => {
    return p;
  })
  .handler(async ({ data }) => {
    return categories
      .flatMap((c) => c.products)
      .find((p) => p.title.toLowerCase().replace(/\s+/g, "-") === data.product);
  });

export const getCategory = createServerFn()
  .validator((p: { category: string }) => {
    return p;
  })
  .handler(async ({ data }) => {
    return categories.find((c) => c.href === `/categories/${data.category}`);
  });
