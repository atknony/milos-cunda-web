import { useCallback, useEffect, useMemo, useState } from "react";
import type { ConflictPair, Reservation, Room } from "@/lib/supabase/types";
import { SOURCE_LABELS } from "@/lib/supabase/types";
import ReservationModal from "./ReservationModal";

interface Props {
  rooms: Room[];
  /** yyyy-MM-dd — varsayılan filtre başlangıcı (bugün) */
  today: string;
}

function formatTr(isoDate: string): string {
  const [y, m, d] = isoDate.split("-");
  return `${d}.${m}.${y}`;
}

export default function ReservationList({ rooms, today }: Props) {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [conflicts, setConflicts] = useState<ConflictPair[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [roomFilter, setRoomFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("confirmed");
  const [showPast, setShowPast] = useState(false);

  const [modalTarget, setModalTarget] = useState<Reservation | null | "new">(null);
  const [savedWarning, setSavedWarning] = useState<string | null>(null);

  const roomById = useMemo(() => new Map(rooms.map((r) => [r.id, r])), [rooms]);
  const conflictedIds = useMemo(() => {
    const ids = new Set<string>();
    for (const c of conflicts) {
      ids.add(c.reservation_a);
      ids.add(c.reservation_b);
    }
    return ids;
  }, [conflicts]);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const params = new URLSearchParams();
    if (!showPast) params.set("from", today);
    if (roomFilter) params.set("room_id", roomFilter);
    if (statusFilter) params.set("status", statusFilter);
    try {
      const res = await fetch(`/api/reservations?${params}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Liste yüklenemedi.");
        return;
      }
      setReservations(data.reservations);
      setConflicts(data.conflicts);
    } catch {
      setError("Sunucuya ulaşılamadı.");
    } finally {
      setLoading(false);
    }
  }, [roomFilter, statusFilter, showPast, today]);

  useEffect(() => {
    load();
  }, [load]);

  function onSaved(_r: Reservation, conflictsWith: Reservation[]) {
    setModalTarget(null);
    setSavedWarning(
      conflictsWith.length > 0
        ? `Kayıt oluşturuldu ancak aynı odada ${conflictsWith.length} kayıtla ÇAKIŞIYOR. Lütfen kontrol edin.`
        : null
    );
    load();
  }

  return (
    <div className="space-y-4">
      {/* Filtreler */}
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-stone-200 bg-white p-3 text-sm">
        <select
          value={roomFilter}
          onChange={(e) => setRoomFilter(e.target.value)}
          className="rounded-md border border-stone-300 px-2 py-1.5"
        >
          <option value="">Tüm odalar</option>
          {rooms.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-md border border-stone-300 px-2 py-1.5"
        >
          <option value="confirmed">Onaylı</option>
          <option value="cancelled">İptal edilmiş</option>
          <option value="">Tümü</option>
        </select>
        <label className="flex items-center gap-1.5 text-stone-600">
          <input
            type="checkbox"
            checked={showPast}
            onChange={(e) => setShowPast(e.target.checked)}
          />
          Geçmişi göster
        </label>
        <button
          onClick={() => setModalTarget("new")}
          className="ml-auto rounded-md bg-stone-900 px-4 py-1.5 font-medium text-white hover:bg-stone-700"
        >
          + Yeni Kayıt
        </button>
      </div>

      {savedWarning && (
        <div className="flex items-start justify-between rounded-md border border-amber-300 bg-amber-50 px-4 py-2 text-sm text-amber-800">
          <span>⚠ {savedWarning}</span>
          <button onClick={() => setSavedWarning(null)} className="ml-3 font-bold">
            ✕
          </button>
        </div>
      )}
      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Liste */}
      <div className="overflow-x-auto rounded-xl border border-stone-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-stone-200 bg-stone-50 text-left text-xs uppercase tracking-wide text-stone-500">
              <th className="px-4 py-2">Oda</th>
              <th className="px-4 py-2">Misafir</th>
              <th className="px-4 py-2">Giriş</th>
              <th className="px-4 py-2">Çıkış</th>
              <th className="px-4 py-2">Kaynak</th>
              <th className="px-4 py-2">Ücret</th>
              <th className="px-4 py-2">Durum</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-stone-400">
                  Yükleniyor…
                </td>
              </tr>
            )}
            {!loading && reservations.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-stone-400">
                  Kayıt bulunamadı.
                </td>
              </tr>
            )}
            {!loading &&
              reservations.map((r) => {
                const isConflicted = conflictedIds.has(r.id);
                return (
                  <tr
                    key={r.id}
                    onClick={() => setModalTarget(r)}
                    className={`cursor-pointer border-b border-stone-100 hover:bg-stone-50 ${
                      r.status === "cancelled" ? "opacity-45 line-through" : ""
                    } ${isConflicted ? "bg-red-50" : ""}`}
                  >
                    <td className="px-4 py-2.5 font-medium">
                      {roomById.get(r.room_id)?.name ?? "?"}
                      {isConflicted && (
                        <span className="ml-1.5 text-xs font-bold text-red-600" title="Çakışma var">
                          ⚠
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2.5">
                      {r.type === "block" ? (
                        <span className="italic text-stone-500">Blokaj</span>
                      ) : (
                        (r.guest_name ?? <span className="text-stone-400">—</span>)
                      )}
                    </td>
                    <td className="px-4 py-2.5">{formatTr(r.check_in)}</td>
                    <td className="px-4 py-2.5">{formatTr(r.check_out)}</td>
                    <td className="px-4 py-2.5">{SOURCE_LABELS[r.source]}</td>
                    <td className="px-4 py-2.5">
                      {r.total_price != null ? `${r.total_price} ${r.currency}` : "—"}
                    </td>
                    <td className="px-4 py-2.5">
                      {r.status === "confirmed" ? (
                        <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                          Onaylı
                        </span>
                      ) : (
                        <span className="rounded-full bg-stone-100 px-2 py-0.5 text-xs font-medium text-stone-500">
                          İptal
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      {modalTarget !== null && (
        <ReservationModal
          rooms={rooms}
          reservation={modalTarget === "new" ? null : modalTarget}
          onClose={() => setModalTarget(null)}
          onSaved={onSaved}
        />
      )}
    </div>
  );
}
