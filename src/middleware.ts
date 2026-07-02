import { defineMiddleware } from "astro:middleware";

/**
 * PMS middleware — Faz 1 iskeleti.
 * Faz 2'de Supabase oturum doğrulaması eklenecek; şimdilik yalnızca
 * /admin ve /api yollarına noindex başlığı ekler.
 */
export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;
  const isPms = pathname.startsWith("/admin") || pathname.startsWith("/api");

  const response = await next();

  if (isPms) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return response;
});
