// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://miloscunda.com",

  /* ─── i18n Prefix Routing ─── */
  i18n: {
    defaultLocale: "tr",
    locales: ["tr", "en", "el"],
    routing: {
      prefixDefaultLocale: true, // /tr/, /en/, /el/
      redirectToDefaultLocale: false,
    },
  },

  /* ─── Integrations ─── */
  integrations: [
    react(), // React 19 islands
  ],

  /* ─── Vite Configuration ─── */
  vite: {
    plugins: [tailwindcss()],
  },

  /* ─── Build Settings ─── */
  build: {
    inlineStylesheets: "auto",
  },

  /* ─── Image Optimization ─── */
  image: {
    domains: ["miloscunda.com"],
    remotePatterns: [{ protocol: "https" }],
  },

  /* ─── Prefetch ─── */
  prefetch: {
    prefetchAll: false,
    defaultStrategy: "viewport",
  },
});
