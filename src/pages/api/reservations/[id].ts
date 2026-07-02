import type { APIRoute } from "astro";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { json, requireSession } from "@/lib/pms/api";
import { findOverlaps } from "@/lib/pms/conflicts";
import type { Reservation } from "@/lib/supabase/types";

export const prerender = false;

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Rezervasyon güncelle. Silme yok — iptal (status='cancelled') kullanılır.
 * İçe aktarılan kayıtlarda (feed_id dolu) tarih/oda/durum senkronizasyona
 * aittir; yalnızca not ve ücret alanları düzenlenebilir.
 */
export const PATCH: APIRoute = async (context) => {
  const denied = await requireSession(context);
  if (denied) return denied;

  const id = context.params.id;
  let body: Record<string, unknown>;
  try {
    body = await context.request.json();
  } catch {
    return json({ error: "Geçersiz istek." }, 400);
  }

  const supabase = createSupabaseAdminClient();
  const { data: existing, error: fetchError } = await supabase
    .from("reservations")
    .select("*")
    .eq("id", id)
    .single();

  if (fetchError || !existing) return json({ error: "Kayıt bulunamadı." }, 404);
  const current = existing as Reservation;
  const isImported = current.feed_id !== null;

  const updates: Record<string, unknown> = {};

  // Her kayıtta düzenlenebilir alanlar
  if (body.notes !== undefined) updates.notes = (body.notes as string)?.trim() || null;
  if (body.total_price !== undefined) updates.total_price = body.total_price ?? null;
  if (body.currency !== undefined) updates.currency = body.currency || "TRY";
  if (body.deposit_paid !== undefined) updates.deposit_paid = body.deposit_paid ?? null;
  if (body.payment_note !== undefined)
    updates.payment_note = (body.payment_note as string)?.trim() || null;

  // Yalnızca elle girilen kayıtlarda düzenlenebilir alanlar
  const manualFields = [
    "room_id", "check_in", "check_out", "status", "source",
    "guest_name", "guest_phone", "guest_email", "type",
  ] as const;
  const touchesManualField = manualFields.some((f) => body[f] !== undefined);

  if (touchesManualField) {
    if (isImported) {
      return json(
        { error: "İçe aktarılan kayıtların tarih/durum bilgileri platformdan yönetilir." },
        400
      );
    }
    for (const f of manualFields) {
      if (body[f] !== undefined) updates[f] = body[f];
    }
    if (typeof updates.guest_name === "string") updates.guest_name = updates.guest_name.trim() || null;
    if (typeof updates.guest_phone === "string") updates.guest_phone = updates.guest_phone.trim() || null;
    if (typeof updates.guest_email === "string") updates.guest_email = updates.guest_email.trim() || null;
  }

  if (Object.keys(updates).length === 0) return json({ error: "Güncellenecek alan yok." }, 400);

  // Tarih doğrulaması (yeni değerler mevcutla birleştirilerek)
  const newCheckIn = (updates.check_in as string) ?? current.check_in;
  const newCheckOut = (updates.check_out as string) ?? current.check_out;
  if (!ISO_DATE.test(newCheckIn) || !ISO_DATE.test(newCheckOut) || newCheckOut <= newCheckIn) {
    return json({ error: "Çıkış tarihi giriş tarihinden sonra olmalıdır." }, 400);
  }

  const { data: reservation, error } = await supabase
    .from("reservations")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) return json({ error: error.message }, 500);

  const updated = reservation as Reservation;
  const conflictsWith =
    updated.status === "confirmed"
      ? await findOverlaps(supabase, {
          roomId: updated.room_id,
          checkIn: updated.check_in,
          checkOut: updated.check_out,
          excludeId: updated.id,
        })
      : [];

  return json({ reservation, conflictsWith });
};
