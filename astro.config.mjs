import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import vercelStatic from "@astrojs/vercel/static";
import sitemap from "@astrojs/sitemap";
import glsl from "vite-plugin-glsl";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://embersee.vercel.app",
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
    react(),
  ],
  output: "static",
  adapter: vercelStatic({
    webAnalytics: {
      enabled: true,
    },
    speedInsights: {
      enabled: true,
    },
  }),
  vite: {
    plugins: [glsl()],
    build: {
      assetsInlineLimit: 0,
      rollupOptions: {
        output: {
          assetFileNames: "[ext]/[name][extname]",
          entryFileNames: "script/entry.js",
        },
      },
      cssCodeSplit: false,
    },
  },
});
