import type { APIRoute } from "astro";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { json, requireSession } from "@/lib/pms/api";

export const prerender = false;

/** Oda listesi (aktif + pasif). */
export const GET: APIRoute = async (context) => {
  const denied = await requireSession(context);
  if (denied) return denied;

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("rooms")
    .select("*")
    .order("sort_order")
    .order("name");

  if (error) return json({ error: error.message }, 500);
  return json({ rooms: data });
};

/** Yeni oda oluştur. ical_token veritabanı tarafından otomatik üretilir. */
export const POST: APIRoute = async (context) => {
  const denied = await requireSession(context);
  if (denied) return denied;

  let body: { name?: string; public_slug?: string; sort_order?: number };
  try {
    body = await context.request.json();
  } catch {
    return json({ error: "Geçersiz istek." }, 400);
  }

  const name = body.name?.trim();
  if (!name) return json({ error: "Oda adı zorunludur." }, 400);

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("rooms")
    .insert({
      name,
      public_slug: body.public_slug?.trim() || null,
      sort_order: body.sort_order ?? 0,
    })
    .select()
    .single();

  if (error) {
    if (error.code === "23505") return json({ error: "Bu isimde bir oda zaten var." }, 409);
    return json({ error: error.message }, 500);
  }
  return json({ room: data }, 201);
};
