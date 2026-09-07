import { defineMiddleware } from "astro:middleware";
import { getSessionUser } from "@/lib/supabase/server";
import { SYNC_ENABLED } from "@/lib/pms/api";
import { roleOf } from "@/lib/pms/roles";

const CLEANER_HOME = "/admin/cleaning";

/**
 * PMS koruması:
 * - /admin/* (login hariç) yalnızca oturum açmış kullanıcı tarafından görülebilir.
 * - "cleaner" rolündeki hesaplar yalnızca /admin/cleaning'i görebilir — başka
 *   herhangi bir /admin/* yoluna gidince oraya geri yönlendirilir. Ana admin
 *   hesabı (ve rolü ayarlanmamış her hesap) tüm sayfalara erişir (bkz. roles.ts).
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

  if (isAdminPage && pathname === "/admin/login") {
    // Zaten oturum açıksa role uygun ana sayfaya yönlendir
    const user = await getSessionUser(context.request, context.cookies);
    if (user) {
      return context.redirect(roleOf(user) === "cleaner" ? CLEANER_HOME : "/admin");
    }
  } else if (isAdminPage) {
    const user = await getSessionUser(context.request, context.cookies);
    if (!user) {
      return context.redirect("/admin/login");
    }
    if (roleOf(user) === "cleaner" && pathname !== CLEANER_HOME) {
      return context.redirect(CLEANER_HOME);
    }
  }

  if (!SYNC_ENABLED && pathname === "/admin/sync") {
    return context.redirect("/admin");
  }

  const response = await next();

  if (isAdminPage || isApi) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return response;
});
