import type { APIRoute } from "astro";
import { randomBytes } from "node:crypto";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { json, requireSession } from "@/lib/pms/api";

export const prerender = false;

/**
 * iCal dışa aktarma token'ını yeniler.
 * DİKKAT: Eski takvim adresleri anında geçersiz olur — yeni adreslerin
 * Airbnb/Booking.com'a tekrar yapıştırılması gerekir (UI uyarır).
 */
export const POST: APIRoute = async (context) => {
  const denied = await requireSession(context);
  if (denied) return denied;

  const id = context.params.id;
  const newToken = randomBytes(24).toString("hex");

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("rooms")
    .update({ ical_token: newToken })
    .eq("id", id)
    .select()
    .single();

  if (error) return json({ error: error.message }, 500);
  return json({ room: data });
};
