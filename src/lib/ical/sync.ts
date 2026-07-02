import type { SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { fetchAndParseFeed, type ParsedEvent } from "@/lib/ical/parse";
import { todayInHotelTz } from "@/lib/pms/dates";
import type { IcalFeed, Reservation } from "@/lib/supabase/types";

export interface FeedSyncResult {
  feedId: string;
  roomId: string;
  platform: string;
  eventsFound: number;
  created: number;
  updated: number;
  cancelled: number;
  conflicts: number;
  error: string | null;
}

/** SUMMARY'den kayıt türü çıkarımı: müsait-değil/kapalı → blokaj */
const BLOCK_SUMMARY = /not available|blocked|closed|unavailable/i;

/**
 * İçe aktarma senkronizasyonu.
 * - Beslemeler paralel indirilir; bir beslemenin hatası diğerlerini durdurmaz.
 * - Upsert anahtarı (feed_id, external_uid) — tekrar çalıştırmak idempotenttir.
 * - Beslemeden kaybolan gelecek etkinlikler iptal edilir; geçmişe dokunulmaz.
 * - Çakışmalar ASLA engellemez — sayılır ve panelde uyarı olarak gösterilir.
 */
export async function runSync(options: {
  trigger: "cron" | "manual";
  feedId?: string;
  roomId?: string;
}): Promise<FeedSyncResult[]> {
  const supabase = createSupabaseAdminClient();

  let feedQuery = supabase
    .from("ical_feeds")
    .select("*, rooms!inner(is_active)")
    .eq("is_active", true)
    .eq("rooms.is_active", true);
  if (options.feedId) feedQuery = feedQuery.eq("id", options.feedId);
  if (options.roomId) feedQuery = feedQuery.eq("room_id", options.roomId);

  const { data: feeds, error } = await feedQuery;
  if (error) throw new Error(`Beslemeler yüklenemedi: ${error.message}`);

  const results = await Promise.all(
    (feeds ?? []).map((feed) => syncFeed(supabase, feed as IcalFeed, options.trigger))
  );
  return results;
}

async function syncFeed(
  supabase: SupabaseClient,
  feed: IcalFeed,
  trigger: "cron" | "manual"
): Promise<FeedSyncResult> {
  const result: FeedSyncResult = {
    feedId: feed.id,
    roomId: feed.room_id,
    platform: feed.platform,
    eventsFound: 0,
    created: 0,
    updated: 0,
    cancelled: 0,
    conflicts: 0,
    error: null,
  };

  try {
    let events = await fetchAndParseFeed(feed.url);
    // Aynı beslemede yinelenen UID'lere karşı koruma (son görülen kazanır)
    const byUid = new Map<string, ParsedEvent>();
    for (const e of events) byUid.set(e.uid, e);
    events = [...byUid.values()];
    result.eventsFound = events.length;

    const { data: existingRows, error: existingError } = await supabase
      .from("reservations")
      .select("*")
      .eq("feed_id", feed.id);
    if (existingError) throw new Error(existingError.message);
    const existing = new Map(
      ((existingRows ?? []) as Reservation[]).map((r) => [r.external_uid, r])
    );

    const today = todayInHotelTz();

    for (const event of events) {
      const type = BLOCK_SUMMARY.test(event.summary) ? "block" : "booking";
      const row = existing.get(event.uid);

      if (!row) {
        const { error: insertError } = await supabase.from("reservations").insert({
          room_id: feed.room_id,
          type,
          status: "confirmed",
          check_in: event.checkIn,
          check_out: event.checkOut,
          source: feed.platform, // enum isimleri booking_source ile birebir örtüşür
          feed_id: feed.id,
          external_uid: event.uid,
          external_summary: event.summary || null,
        });
        if (insertError) throw new Error(insertError.message);
        result.created++;
      } else {
        const changed =
          row.check_in !== event.checkIn ||
          row.check_out !== event.checkOut ||
          row.external_summary !== (event.summary || null) ||
          row.type !== type ||
          row.status !== "confirmed"; // beslemede yeniden görünen iptal → onaya döner
        if (changed) {
          const { error: updateError } = await supabase
            .from("reservations")
            .update({
              check_in: event.checkIn,
              check_out: event.checkOut,
              external_summary: event.summary || null,
              type,
              status: "confirmed",
            })
            .eq("id", row.id);
          if (updateError) throw new Error(updateError.message);
          result.updated++;
        }
      }
    }

    // İptal tespiti: beslemede artık olmayan GELECEK kayıtlar.
    // Koruma: besleme 200 döndürüp 0 etkinlik içeriyorsa ve önceden kayıt
    // varsa bu tur atlanır (geçici OTA arızası toplu iptale yol açmasın).
    const skipCancelDetection = result.eventsFound === 0 && existing.size > 0;
    if (!skipCancelDetection) {
      const seenUids = new Set(events.map((e) => e.uid));
      for (const row of existing.values()) {
        if (
          row.status === "confirmed" &&
          row.external_uid &&
          !seenUids.has(row.external_uid) &&
          row.check_out >= today
        ) {
          const { error: cancelError } = await supabase
            .from("reservations")
            .update({ status: "cancelled" })
            .eq("id", row.id);
          if (cancelError) throw new Error(cancelError.message);
          result.cancelled++;
        }
      }
    }

    // Oda bazında güncel çakışma sayısı (okuma anında hesaplanır)
    const { count } = await supabase
      .from("v_conflicts")
      .select("*", { count: "exact", head: true })
      .eq("room_id", feed.room_id);
    result.conflicts = count ?? 0;
  } catch (err) {
    result.error = err instanceof Error ? err.message : String(err);
  }

  // Besleme durumu + günlük kaydı (hata olsa da yazılır)
  await supabase
    .from("ical_feeds")
    .update({
      last_synced_at: new Date().toISOString(),
      last_sync_status: result.error ? "error" : "ok",
      last_sync_error: result.error,
    })
    .eq("id", feed.id);

  await supabase.from("sync_logs").insert({
    trigger,
    feed_id: feed.id,
    events_found: result.eventsFound,
    created: result.created,
    updated: result.updated,
    cancelled: result.cancelled,
    conflicts: result.conflicts,
    error: result.error,
  });

  return result;
}
