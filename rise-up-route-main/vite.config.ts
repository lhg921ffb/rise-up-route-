import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // Inside Lovable the deploy target is forced to Cloudflare. Outside Lovable
  // (e.g. Netlify CI) NITRO_PRESET picks the target — netlify.toml sets it.
  nitro: { preset: process.env.NITRO_PRESET || "cloudflare-module" },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});