import { createFileRoute } from "@tanstack/solid-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return <h1 class="text-3xl font-bold">Home</h1>;
}
