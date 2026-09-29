import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    base: "/mwan-link/",
  },
  tanstackStart: {
    server: { entry: "server" },
    prerender: {
      enabled: true,
      autoStaticPathsDiscovery: false,
      crawlLinks: false,
      failOnError: true,
    },
  },
});
