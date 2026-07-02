import type { APIRoute } from "astro";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { json, requireSession } from "@/lib/pms/api";

export const prerender = false;

/**
 * Dış takvim adresi güncelle (url, aktif/pasif).
 * Pasife alınan besleme senkronizasyonda atlanır; içe aktarılmış
 * kayıtları silinmez (feed silme rotası bilinçli olarak yok).
 */
export const PATCH: APIRoute = async (context) => {
  const denied = await requireSession(context);
  if (denied) return denied;

  const id = context.params.id;
  let body: { url?: string; is_active?: boolean };
  try {
    body = await context.request.json();
  } catch {
    return json({ error: "Geçersiz istek." }, 400);
  }

  const updates: Record<string, unknown> = {};
  if (body.url !== undefined) {
    const url = body.url.trim();
    if (!url.startsWith("https://")) return json({ error: "Adres https:// ile başlamalıdır." }, 400);
    updates.url = url;
  }
  if (body.is_active !== undefined) updates.is_active = body.is_active;

  if (Object.keys(updates).length === 0) return json({ error: "Güncellenecek alan yok." }, 400);

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("ical_feeds")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) return json({ error: error.message }, 500);
  return json({ feed: data });
};
