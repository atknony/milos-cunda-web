import type { APIRoute } from "astro";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { json, requireSession, SYNC_ENABLED } from "@/lib/pms/api";
import type { FeedPlatform } from "@/lib/supabase/types";

export const prerender = false;

const VALID_PLATFORMS: FeedPlatform[] = ["airbnb", "booking_com", "hotels_com", "other"];

/** Dış takvim adresi listesi. */
export const GET: APIRoute = async (context) => {
  const denied = await requireSession(context);
  if (denied) return denied;

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("ical_feeds")
    .select("*")
    .order("created_at");

  if (error) return json({ error: error.message }, 500);
  return json({ feeds: data });
};

/** Yeni dış takvim adresi ekle (https zorunlu; erişilebilirlik denenir). */
export const POST: APIRoute = async (context) => {
  const denied = await requireSession(context);
  if (denied) return denied;
  if (!SYNC_ENABLED) return json({ error: "Senkronizasyon şu an devre dışı." }, 403);

  let body: { room_id?: string; platform?: FeedPlatform; url?: string };
  try {
    body = await context.request.json();
  } catch {
    return json({ error: "Geçersiz istek." }, 400);
  }

  const url = body.url?.trim();
  if (!body.room_id) return json({ error: "Oda seçimi zorunludur." }, 400);
  if (!body.platform || !VALID_PLATFORMS.includes(body.platform)) {
    return json({ error: "Geçersiz platform." }, 400);
  }
  if (!url || !url.startsWith("https://")) {
    return json({ error: "Adres https:// ile başlamalıdır." }, 400);
  }

  // Erişilebilirlik ön kontrolü — kırık adres baştan yakalansın
  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(8_000),
      headers: { "User-Agent": "CundaMilosPMS/1.0 (+https://cundamilos.com)" },
    });
    if (!res.ok) return json({ error: `Adres erişilebilir değil (HTTP ${res.status}).` }, 400);
  } catch {
    return json({ error: "Adrese ulaşılamadı. Bağlantıyı kontrol edin." }, 400);
  }

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("ical_feeds")
    .insert({ room_id: body.room_id, platform: body.platform, url })
    .select()
    .single();

  if (error) {
    if (error.code === "23505") return json({ error: "Bu adres bu oda için zaten kayıtlı." }, 409);
    return json({ error: error.message }, 500);
  }
  return json({ feed: data }, 201);
};
