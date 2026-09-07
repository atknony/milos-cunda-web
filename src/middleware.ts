import { defineMiddleware } from "astro:middleware";
import { getSessionUser } from "@/lib/supabase/server";
import { SYNC_ENABLED } from "@/lib/pms/api";

/**
 * PMS koruması:
 * - /admin/* (login hariç) yalnızca oturum açmış admin tarafından görülebilir.
 * - /admin ve /api yolları arama motorlarına kapalıdır (noindex).
 * - Oturum doğrulaması Supabase çerezleri üzerinden yapılır; API rotaları
 *   ayrıca kendi içlerinde yeniden doğrular (savunma katmanı).
 * - Senkronizasyon askıya alındığında /admin/sync burada /admin'e yönlendirilir
 *   (sayfa içinden Astro.redirect() kullanmak yerine — bu projede statik
 *   çıktı modunda SSR sayfalarında bozuk 404+Location yanıtına yol açıyordu).
 */
export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;
  const isAdminPage = pathname.startsWith("/admin");
  const isApi = pathname.startsWith("/api");

  if (!SYNC_ENABLED && pathname === "/admin/sync") {
    return context.redirect("/admin");
  }

  if (isAdminPage && pathname !== "/admin/login") {
    const user = await getSessionUser(context.request, context.cookies);
    if (!user) {
      return context.redirect("/admin/login");
    }
  }

  const response = await next();

  if (isAdminPage || isApi) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return response;
});
