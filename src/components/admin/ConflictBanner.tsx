import type { ConflictPair, Reservation, Room } from "@/lib/supabase/types";
import { SOURCE_LABELS } from "@/lib/supabase/types";

interface Props {
  conflicts: ConflictPair[];
  reservations: Reservation[];
  rooms: Room[];
  onSelect: (reservation: Reservation) => void;
}

function formatTr(isoDate: string): string {
  const [y, m, d] = isoDate.split("-");
  return `${d}.${m}.${y}`;
}

function describe(r: Reservation | undefined): string {
  if (!r) return "bilinmeyen kayıt";
  const who = r.type === "block" ? "Blokaj" : (r.guest_name ?? SOURCE_LABELS[r.source]);
  return `${who} (${formatTr(r.check_in)} – ${formatTr(r.check_out)}, ${SOURCE_LABELS[r.source]})`;
}

/** Aynı odada çakışan onaylı kayıt çiftlerini listeler. */
export default function ConflictBanner({ conflicts, reservations, rooms, onSelect }: Props) {
  if (conflicts.length === 0) return null;

  const byId = new Map(reservations.map((r) => [r.id, r]));
  const roomById = new Map(rooms.map((r) => [r.id, r]));

  return (
    <div className="rounded-xl border border-red-300 bg-red-50 p-4">
      <h2 className="mb-2 text-sm font-bold text-red-800">
        ⚠ Çakışan rezervasyonlar ({conflicts.length})
      </h2>
      <ul className="space-y-1.5 text-sm text-red-700">
        {conflicts.map((c) => {
          const a = byId.get(c.reservation_a);
          const b = byId.get(c.reservation_b);
          return (
            <li key={`${c.reservation_a}-${c.reservation_b}`}>
              <span className="font-medium">{roomById.get(c.room_id)?.name ?? "?"}:</span>{" "}
              {a ? (
                <button onClick={() => onSelect(a)} className="underline hover:text-red-900">
                  {describe(a)}
                </button>
              ) : (
                describe(a)
              )}{" "}
              ↔{" "}
              {b ? (
                <button onClick={() => onSelect(b)} className="underline hover:text-red-900">
                  {describe(b)}
                </button>
              ) : (
                describe(b)
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
