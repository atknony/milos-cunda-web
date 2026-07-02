import type { APIRoute } from "astro";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { buildCalendar, type IcalEvent } from "@/lib/ical/generate";
import { todayInHotelTz } from "@/lib/pms/dates";
import type { FeedPlatform } from "@/lib/supabase/types";

export const prerender = false;

/**
 * Oda başına gizli-token'lı iCal dışa aktarma beslemesi.
 *
 * URL biçimleri:
 *   /api/ical/{token}.ics               → genel (her şey dahil)
 *   /api/ical/{token}-airbnb.ics        → Airbnb'nin okuyacağı besleme
 *   /api/ical/{token}-booking_com.ics   → Booking.com'un okuyacağı besleme
 *   /api/ical/{token}-hotels_com.ics    → Hotels.com'un okuyacağı besleme
 *
 * Platform ekli beslemeler O PLATFORMDAN içe aktarılan kayıtları DIŞLAR —
 * platform kendi rezervasyonlarını geri okumaz (döngü önlenir).
 * Misafir bilgisi asla dışarı verilmez; tüm etkinlikler "CLOSED - Milos Cunda".
 */
const FEED_KEY = /^([0-9a-f]{48})(?:-(airbnb|booking_com|hotels_com))?$/;

export const GET: APIRoute = async ({ params }) => {
  const match = params.feedKey?.match(FEED_KEY);
  if (!match) return new Response("Not Found", { status: 404 });

  const [, token, excludedPlatform] = match as [string, string, FeedPlatform | undefined];

  const supabase = createSupabaseAdminClient();
  const { data: room } = await supabase
    .from("rooms")
    .select("id, name, is_active")
    .eq("ical_token", token)
    .maybeSingle();

  // Bilinmeyen token → var olmayan rotayla ayırt edilemez 404
  if (!room) return new Response("Not Found", { status: 404 });
  if (!room.is_active) return new Response("Gone", { status: 410 });

  // Güncel + gelecek onaylı kayıtlar (geçmiş OTA'ları ilgilendirmez)
  const today = todayInHotelTz();
  const { data: reservations, error } = await supabase
    .from("reservations")
    .select("id, check_in, check_out, updated_at, feed_id, ical_feeds(platform)")
    .eq("room_id", room.id)
    .eq("status", "confirmed")
    .gte("check_out", today)
    .order("check_in");

  if (error) return new Response("Internal Server Error", { status: 500 });

  const events: IcalEvent[] = (reservations ?? [])
    .filter((r) => {
      if (!excludedPlatform || !r.feed_id) return true;
      const feed = r.ical_feeds as unknown as { platform: FeedPlatform } | null;
      return feed?.platform !== excludedPlatform;
    })
    .map((r) => ({
      uid: r.id,
      start: r.check_in,
      end: r.check_out,
      summary: "CLOSED - Milos Cunda",
      updatedAt: r.updated_at,
    }));

  const body = buildCalendar(`Milos Cunda — ${room.name}`, events);

  return new Response(body, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Cache-Control": "public, s-maxage=300, max-age=0",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
};
