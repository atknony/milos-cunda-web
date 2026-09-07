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
      {/* Yeni kayıt — her zaman ulaşılabilir, büyük dokunma alanı */}
      <button
        onClick={() => setModalTarget("new")}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-stone-900 px-4 py-3.5 text-base font-semibold text-white hover:bg-stone-700 active:bg-stone-800"
      >
        <span className="text-xl leading-none">+</span> Yeni Kayıt
      </button>

      {/* Filtreler */}
      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-stone-200 bg-white p-2.5 text-sm">
        <select
          value={roomFilter}
          onChange={(e) => setRoomFilter(e.target.value)}
          className="min-h-11 flex-1 rounded-lg border border-stone-300 px-2.5 py-2"
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
          className="min-h-11 flex-1 rounded-lg border border-stone-300 px-2.5 py-2"
        >
          <option value="confirmed">Onaylı</option>
          <option value="cancelled">İptal edilmiş</option>
          <option value="">Tümü</option>
        </select>
        <label className="flex min-h-11 basis-full items-center gap-2 px-1 text-stone-600 sm:basis-auto">
          <input
            type="checkbox"
            checked={showPast}
            onChange={(e) => setShowPast(e.target.checked)}
            className="h-5 w-5"
          />
          Geçmişi göster
        </label>
      </div>

      {savedWarning && (
        <div className="flex items-start justify-between rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <span>⚠ {savedWarning}</span>
          <button onClick={() => setSavedWarning(null)} className="ml-3 font-bold" aria-label="Kapat">
            ✕
          </button>
        </div>
      )}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Kayıt listesi — mobilde kart, kaydırmalı tablo yok */}
      <div className="space-y-2">
        {loading && (
          <p className="rounded-xl border border-stone-200 bg-white p-6 text-center text-sm text-stone-400">
            Yükleniyor…
          </p>
        )}
        {!loading && reservations.length === 0 && (
          <p className="rounded-xl border border-stone-200 bg-white p-6 text-center text-sm text-stone-400">
            Kayıt bulunamadı.
          </p>
        )}
        {!loading &&
          reservations.map((r) => {
            const isConflicted = conflictedIds.has(r.id);
            return (
              <button
                key={r.id}
                onClick={() => setModalTarget(r)}
                className={`flex w-full items-center justify-between gap-3 rounded-xl border bg-white px-4 py-3.5 text-left transition-colors hover:bg-stone-50 ${
                  r.status === "cancelled" ? "opacity-50" : ""
                } ${isConflicted ? "border-red-300 bg-red-50" : "border-stone-200"}`}
              >
                <span className="min-w-0">
                  <span className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
                    {isConflicted && <span className="text-red-600" title="Çakışma var">⚠</span>}
                    <span className={`font-semibold text-stone-800 ${r.status === "cancelled" ? "line-through" : ""}`}>
                      {roomById.get(r.room_id)?.name ?? "?"}
                    </span>
                    <span className="text-stone-300">·</span>
                    <span className="truncate text-stone-600">
                      {r.type === "block" ? "Blokaj" : (r.guest_name ?? "—")}
                    </span>
                  </span>
                  <span className="mt-1 block text-xs text-stone-400">
                    {formatTr(r.check_in)} → {formatTr(r.check_out)} · {SOURCE_LABELS[r.source]}
                    {r.total_price != null ? ` · ${r.total_price} ${r.currency}` : ""}
                  </span>
                </span>
                {r.status === "confirmed" ? (
                  <span className="shrink-0 rounded-full bg-green-100 px-2.5 py-1 text-[11px] font-semibold text-green-700">
                    Onaylı
                  </span>
                ) : (
                  <span className="shrink-0 rounded-full bg-stone-100 px-2.5 py-1 text-[11px] font-semibold text-stone-500">
                    İptal
                  </span>
                )}
              </button>
            );
          })}
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
