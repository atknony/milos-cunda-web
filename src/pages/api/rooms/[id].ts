import type { APIRoute } from "astro";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { json, requireSession } from "@/lib/pms/api";

export const prerender = false;

/**
 * Oda güncelle (ad, slug, sıra, aktif/pasif).
 * Silme rotası bilinçli olarak YOK — geçmiş korunur, oda pasife alınır.
 */
export const PATCH: APIRoute = async (context) => {
  const denied = await requireSession(context);
  if (denied) return denied;

  const id = context.params.id;
  let body: {
    name?: string;
    public_slug?: string | null;
    sort_order?: number;
    is_active?: boolean;
  };
  try {
    body = await context.request.json();
  } catch {
    return json({ error: "Geçersiz istek." }, 400);
  }

  const updates: Record<string, unknown> = {};
  if (body.name !== undefined) {
    const name = body.name.trim();
    if (!name) return json({ error: "Oda adı boş olamaz." }, 400);
    updates.name = name;
  }
  if (body.public_slug !== undefined) updates.public_slug = body.public_slug?.trim() || null;
  if (body.sort_order !== undefined) updates.sort_order = body.sort_order;
  if (body.is_active !== undefined) updates.is_active = body.is_active;

  if (Object.keys(updates).length === 0) return json({ error: "Güncellenecek alan yok." }, 400);

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("rooms")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    if (error.code === "23505") return json({ error: "Bu isimde bir oda zaten var." }, 409);
    return json({ error: error.message }, 500);
  }
  return json({ room: data });
};
