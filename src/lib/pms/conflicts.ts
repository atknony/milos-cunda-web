import type { SupabaseClient } from "@supabase/supabase-js";
import type { Reservation } from "@/lib/supabase/types";

/**
 * Bir rezervasyonla çakışan onaylı kayıtları bulur.
 * Çakışmalar SAKLANMAZ — her zaman okuma anında hesaplanır (kendi kendini onarır).
 */
export async function findOverlaps(
  supabase: SupabaseClient,
  params: { roomId: string; checkIn: string; checkOut: string; excludeId?: string }
): Promise<Reservation[]> {
  let query = supabase
    .from("reservations")
    .select("*")
    .eq("room_id", params.roomId)
    .eq("status", "confirmed")
    .lt("check_in", params.checkOut)
    .gt("check_out", params.checkIn);

  if (params.excludeId) query = query.neq("id", params.excludeId);

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return (data ?? []) as Reservation[];
}
