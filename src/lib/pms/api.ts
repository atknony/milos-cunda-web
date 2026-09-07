import type { APIContext } from "astro";
import { getSessionUser } from "@/lib/supabase/server";
import { roleOf } from "@/lib/pms/roles";

/**
 * OTA senkronizasyonu (Airbnb/Booking.com/Hotels.com iCal içe aktarma) askıya
 * alındı — rezervasyonlar artık yalnızca elle giriliyor. Sayfa (/admin/sync)
 * ve ilgili API rotaları bu bayrağı kontrol eder. Tekrar açmak için burayı
 * true yapmak ve /admin/sync yönlendirmesini kaldırmak yeterlidir.
 */
export const SYNC_ENABLED = false;

/** JSON yanıt kısayolu. */
export function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

/**
 * Oturum + rol doğrulaması — middleware'e ek savunma katmanı.
 * Bu dosyadaki tüm API rotaları admin verisidir (rezervasyon/oda/besleme);
 * "cleaner" rolündeki hesaplar yalnızca /admin/cleaning sayfasını (statik
 * sunucu tarafı render, hiçbir API çağrısı yapmaz) kullanabilir — bu yüzden
 * burada oturum yoksa 401, admin değilse 403 döner; ikisi de yoksa null.
 */
export async function requireSession(context: APIContext): Promise<Response | null> {
  const user = await getSessionUser(context.request, context.cookies);
  if (!user) {
    return json({ error: "Oturum gerekli." }, 401);
  }
  if (roleOf(user) !== "admin") {
    return json({ error: "Bu işlem için yetkiniz yok." }, 403);
  }
  return null;
}
