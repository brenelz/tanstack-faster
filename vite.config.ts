import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import solidPlugin from "vite-plugin-solid";
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";

export default defineConfig({
  plugins: [
    tsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tailwindcss(),
    tanstackStart({
      customViteSolidPlugin: true,
    }),
    solidPlugin({ ssr: true }),
  ],
});
