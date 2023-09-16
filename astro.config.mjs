import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import vercelStatic from "@astrojs/vercel/static";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://embersee.vercel.app",
  integrations: [tailwind({
    applyBaseStyles: false
  }), sitemap()],
  output: "static",
  adapter: vercelStatic({
    webAnalytics: {
      enabled: true
    },
    speedInsights: {
      enabled: true
    }
  })
});