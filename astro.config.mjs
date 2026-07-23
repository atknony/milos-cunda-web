// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  site: "https://cundamilos.com",

  /* ─── Adapter (public site stays prerendered; only /admin + /api opt into SSR) ─── */
  adapter: vercel(),

  /* ─── Root → default locale (real HTTP redirect via Vercel routing, not a
         prerendered meta-refresh page, which rendered as a white screen) ─── */
  redirects: {
    "/": { status: 301, destination: "/tr/" },
  },

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
    mdx(),   // MDX support for guide content collection
    react(), // React 19 islands
    sitemap({
      // Allowlist: only public localized pages. Excludes the root 302 redirect,
      // 404, and the SSR /admin + /api routes (which DO appear in Astro's page
      // list despite never being prerendered).
      filter: (page) => /^https:\/\/cundamilos\.com\/(tr|en|el)\//.test(page),
      i18n: {
        defaultLocale: "tr",
        // Same bare language codes the pages' hreflang tags use (see getAlternateUrls).
        locales: { tr: "tr", en: "en", el: "el" },
      },
    }),
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
    domains: ["cundamilos.com"],
    remotePatterns: [{ protocol: "https" }],
  },

  /* ─── Prefetch ─── */
  prefetch: {
    prefetchAll: false,
    defaultStrategy: "viewport",
  },
});
