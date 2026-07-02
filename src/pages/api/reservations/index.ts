import type { APIRoute } from "astro";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { json, requireSession } from "@/lib/pms/api";
import { findOverlaps } from "@/lib/pms/conflicts";
import type { BookingSource, ReservationType } from "@/lib/supabase/types";

export const prerender = false;

const VALID_SOURCES: BookingSource[] = [
  "direct", "phone", "whatsapp", "airbnb", "booking_com", "hotels_com", "other",
];
const VALID_TYPES: ReservationType[] = ["booking", "block"];
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Rezervasyon listesi.
 * Filtreler: ?from=yyyy-MM-dd&to=yyyy-MM-dd&room_id=&status=&type=
 * Yanıt çakışma çiftlerini de içerir (v_conflicts).
 */
export const GET: APIRoute = async (context) => {
  const denied = await requireSession(context);
  if (denied) return denied;

  const params = context.url.searchParams;
  const supabase = createSupabaseAdminClient();

  let query = supabase.from("reservations").select("*").order("check_in");

  const from = params.get("from");
  const to = params.get("to");
  const roomId = params.get("room_id");
  const status = params.get("status");
  const type = params.get("type");

  // Aralık filtresi: aralıkla kesişen tüm kayıtlar
  if (from) query = query.gt("check_out", from);
  if (to) query = query.lt("check_in", to);
  if (roomId) query = query.eq("room_id", roomId);
  if (status) query = query.eq("status", status);
  if (type) query = query.eq("type", type);

  const { data: reservations, error } = await query;
  if (error) return json({ error: error.message }, 500);

  let conflictQuery = supabase.from("v_conflicts").select("*");
  if (roomId) conflictQuery = conflictQuery.eq("room_id", roomId);
  const { data: conflicts, error: cError } = await conflictQuery;
  if (cError) return json({ error: cError.message }, 500);

  return json({ reservations, conflicts });
};

/**
 * Yeni rezervasyon/blokaj oluştur.
 * Çakışma varsa YİNE DE kaydedilir; yanıtta conflictsWith ile bildirilir.
 */
export const POST: APIRoute = async (context) => {
  const denied = await requireSession(context);
  if (denied) return denied;

  let body: Record<string, unknown>;
  try {
    body = await context.request.json();
  } catch {
    return json({ error: "Geçersiz istek." }, 400);
  }

  const roomId = body.room_id as string | undefined;
  const checkIn = body.check_in as string | undefined;
  const checkOut = body.check_out as string | undefined;
  const type = (body.type as ReservationType) ?? "booking";
  const source = (body.source as BookingSource) ?? "direct";

  if (!roomId) return json({ error: "Oda seçimi zorunludur." }, 400);
  if (!checkIn || !ISO_DATE.test(checkIn) || !checkOut || !ISO_DATE.test(checkOut)) {
    return json({ error: "Geçerli giriş/çıkış tarihleri zorunludur." }, 400);
  }
  if (checkOut <= checkIn) {
    return json({ error: "Çıkış tarihi giriş tarihinden sonra olmalıdır." }, 400);
  }
  if (!VALID_TYPES.includes(type)) return json({ error: "Geçersiz kayıt türü." }, 400);
  if (!VALID_SOURCES.includes(source)) return json({ error: "Geçersiz kaynak." }, 400);
  if (type === "booking" && !(body.guest_name as string)?.trim()) {
    return json({ error: "Misafir adı zorunludur." }, 400);
  }

  const supabase = createSupabaseAdminClient();
  const { data: reservation, error } = await supabase
    .from("reservations")
    .insert({
      room_id: roomId,
      type,
      source,
      check_in: checkIn,
      check_out: checkOut,
      guest_name: type === "block" ? null : ((body.guest_name as string)?.trim() ?? null),
      guest_phone: type === "block" ? null : ((body.guest_phone as string)?.trim() || null),
      guest_email: type === "block" ? null : ((body.guest_email as string)?.trim() || null),
      notes: (body.notes as string)?.trim() || null,
      total_price: body.total_price ?? null,
      currency: (body.currency as string) || "TRY",
      deposit_paid: body.deposit_paid ?? null,
      payment_note: (body.payment_note as string)?.trim() || null,
    })
    .select()
    .single();

  if (error) return json({ error: error.message }, 500);

  const conflictsWith = await findOverlaps(supabase, {
    roomId,
    checkIn,
    checkOut,
    excludeId: reservation.id,
  });

  return json({ reservation, conflictsWith }, 201);
};
