import { useCallback, useEffect, useMemo, useState } from "react";
import type { ConflictPair, Reservation, Room } from "@/lib/supabase/types";
import { SOURCE_LABELS } from "@/lib/supabase/types";
import { CHECK_IN_TIME, CHECK_OUT_TIME } from "@/lib/pms/dates";
import ReservationModal from "./ReservationModal";
import ConflictBanner from "./ConflictBanner";

interface Props {
  rooms: Room[];
  /** yyyy-MM-dd (Europe/Istanbul) */
  today: string;
}

/* ─── Tarih yardımcıları (yalnızca yyyy-MM-dd string aritmetiği) ─── */

function daysInMonth(year: number, month: number): number {
  return new Date(Date.UTC(year, month, 0)).getUTCDate(); // month: 1-12
}

function isoDate(year: number, month: number, day: number): string {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function addDaysIso(iso: string, days: number): string {
  const d = new Date(`${iso}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

const MONTHS_TR = [
  "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
  "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık",
];
const WEEKDAYS_TR = ["Pt", "Sa", "Ça", "Pe", "Cu", "Ct", "Pz"];

function weekdayIndex(iso: string): number {
  // getUTCDay: 0=Pazar → Pazartesi-indeksli
  const wd = new Date(`${iso}T12:00:00Z`).getUTCDay();
  return (wd + 6) % 7;
}

function formatLong(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const wd = WEEKDAYS_FULL_TR[weekdayIndex(iso)];
  return `${d} ${MONTHS_TR[m - 1]} ${y} · ${wd}`;
}

const WEEKDAYS_FULL_TR = [
  "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar",
];

type Segment = { reservation: Reservation; kind: "arrival" | "staying" | "departure" };

/** Bir odanın belirli bir gündeki durumunu segmentlere ayırır (çıkış/giriş aynı günde olabilir). */
function segmentsFor(items: Reservation[], date: string): Segment[] {
  const segments: Segment[] = [];
  for (const r of items) {
    if (r.check_out === date) segments.push({ reservation: r, kind: "departure" });
  }
  for (const r of items) {
    if (r.check_in <= date && date < r.check_out) {
      segments.push({ reservation: r, kind: r.check_in === date ? "arrival" : "staying" });
    }
  }
  return segments;
}

export default function ReservationTimeline({ rooms, today }: Props) {
  const [selectedDate, setSelectedDate] = useState(today);
  const [viewYear, setViewYear] = useState(() => Number(today.slice(0, 4)));
  const [viewMonth, setViewMonth] = useState(() => Number(today.slice(5, 7))); // 1-12
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [conflicts, setConflicts] = useState<ConflictPair[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [modal, setModal] = useState<
    | { mode: "edit"; reservation: Reservation }
    | { mode: "new"; room_id: string; check_in: string }
    | null
  >(null);
  const [savedWarning, setSavedWarning] = useState<string | null>(null);

  const numDays = daysInMonth(viewYear, viewMonth);
  const monthStart = isoDate(viewYear, viewMonth, 1);
  const nextMonthStart = addDaysIso(isoDate(viewYear, viewMonth, numDays), 1);
  const activeRooms = useMemo(() => rooms.filter((r) => r.is_active), [rooms]);

  const load = useCallback(async () => {
    setError(null);
    try {
      const res = await fetch(
        `/api/reservations?from=${monthStart}&to=${nextMonthStart}&status=confirmed`
      );
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Takvim yüklenemedi.");
        return;
      }
      setReservations(data.reservations);
      setConflicts(data.conflicts);
    } catch {
      setError("Sunucuya ulaşılamadı.");
    }
  }, [monthStart, nextMonthStart]);

  useEffect(() => {
    load();
  }, [load]);

  const conflictedIds = useMemo(() => {
    const ids = new Set<string>();
    for (const c of conflicts) {
      ids.add(c.reservation_a);
      ids.add(c.reservation_b);
    }
    return ids;
  }, [conflicts]);

  const byRoom = useMemo(() => {
    const map = new Map<string, Reservation[]>();
    for (const r of reservations) {
      if (!map.has(r.room_id)) map.set(r.room_id, []);
      map.get(r.room_id)!.push(r);
    }
    return map;
  }, [reservations]);

  /** Gün → o gün dolu oda sayısı + çakışma var mı (aylık mini takvim için). */
  const dayStats = useMemo(() => {
    const stats = new Map<string, { occupied: number; conflict: boolean }>();
    for (let day = 1; day <= numDays; day++) {
      const iso = isoDate(viewYear, viewMonth, day);
      let occupied = 0;
      let conflict = false;
      for (const room of activeRooms) {
        const items = byRoom.get(room.id) ?? [];
        const occupying = items.filter((r) => r.check_in <= iso && iso < r.check_out);
        if (occupying.length > 0) occupied++;
        if (occupying.some((r) => conflictedIds.has(r.id))) conflict = true;
      }
      stats.set(iso, { occupied, conflict });
    }
    return stats;
  }, [activeRooms, byRoom, numDays, viewYear, viewMonth, conflictedIds]);

  function navMonth(delta: number) {
    let m = viewMonth + delta;
    let y = viewYear;
    if (m < 1) { m = 12; y--; }
    if (m > 12) { m = 1; y++; }
    setViewMonth(m);
    setViewYear(y);
  }

  function goToday() {
    setViewYear(Number(today.slice(0, 4)));
    setViewMonth(Number(today.slice(5, 7)));
    setSelectedDate(today);
  }

  function selectDay(iso: string) {
    setSelectedDate(iso);
  }

  function onSaved(_r: Reservation, conflictsWith: Reservation[]) {
    setModal(null);
    setSavedWarning(
      conflictsWith.length > 0
        ? `Kayıt oluşturuldu ancak aynı odada ${conflictsWith.length} kayıtla ÇAKIŞIYOR.`
        : null
    );
    load();
  }

  // Ayın 1. günü haftanın hangi gününe denk geliyor (Pazartesi=0)?
  const leadingBlanks = weekdayIndex(monthStart);

  return (
    <div className="space-y-4">
      {savedWarning && (
        <div className="flex items-start justify-between rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <span>⚠ {savedWarning}</span>
          <button onClick={() => setSavedWarning(null)} className="ml-3 font-bold" aria-label="Kapat">✕</button>
        </div>
      )}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <ConflictBanner
        conflicts={conflicts}
        reservations={reservations}
        rooms={rooms}
        onSelect={(r) => setModal({ mode: "edit", reservation: r })}
      />

      {/* Ay gezinme */}
      <div className="flex items-center justify-between rounded-xl border border-stone-200 bg-white px-2 py-2">
        <button
          onClick={() => navMonth(-1)}
          className="flex h-11 w-11 items-center justify-center rounded-lg text-lg text-stone-500 hover:bg-stone-100 active:bg-stone-200"
          aria-label="Önceki ay"
        >
          ←
        </button>
        <div className="flex flex-col items-center">
          <h2 className="font-serif text-lg font-bold leading-tight">
            {MONTHS_TR[viewMonth - 1]} {viewYear}
          </h2>
          <button onClick={goToday} className="text-xs font-medium text-aegean-700 hover:underline">
            Bugüne dön
          </button>
        </div>
        <button
          onClick={() => navMonth(1)}
          className="flex h-11 w-11 items-center justify-center rounded-lg text-lg text-stone-500 hover:bg-stone-100 active:bg-stone-200"
          aria-label="Sonraki ay"
        >
          →
        </button>
      </div>

      {/* Mini ay takvimi — büyük dokunma hedefleri */}
      <div className="rounded-xl border border-stone-200 bg-white p-2">
        <div className="mb-1 grid grid-cols-7 text-center text-[11px] font-medium uppercase tracking-wide text-stone-400">
          {WEEKDAYS_TR.map((wd) => (
            <div key={wd} className="py-1">{wd}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: leadingBlanks }, (_, i) => (
            <div key={`blank-${i}`} />
          ))}
          {Array.from({ length: numDays }, (_, i) => {
            const day = i + 1;
            const iso = isoDate(viewYear, viewMonth, day);
            const isToday = iso === today;
            const isSelected = iso === selectedDate;
            const stats = dayStats.get(iso) ?? { occupied: 0, conflict: false };
            const full = activeRooms.length > 0 && stats.occupied >= activeRooms.length;

            return (
              <button
                key={day}
                onClick={() => selectDay(iso)}
                className={`relative flex h-12 flex-col items-center justify-center rounded-lg text-sm transition-colors sm:h-14 ${
                  isSelected
                    ? "bg-stone-900 font-bold text-white"
                    : isToday
                      ? "bg-aegean-100 font-bold text-aegean-900"
                      : "text-stone-700 hover:bg-stone-100"
                } ${stats.conflict && !isSelected ? "ring-2 ring-red-500" : ""}`}
              >
                {day}
                {stats.occupied > 0 && (
                  <span
                    className={`mt-0.5 h-1.5 w-1.5 rounded-full ${
                      isSelected
                        ? "bg-white"
                        : full
                          ? "bg-terra-500"
                          : "bg-olive-500"
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Seçili günün oda panosu */}
      <div>
        <h3 className="mb-2 px-1 font-serif text-base font-bold text-stone-800">
          {formatLong(selectedDate)}
        </h3>

        {activeRooms.length === 0 ? (
          <p className="rounded-xl border border-stone-200 bg-white p-6 text-center text-sm text-stone-400">
            Aktif oda yok. Önce <a href="/admin/rooms" className="underline">Odalar</a> sayfasından oda ekleyin.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {activeRooms.map((room) => {
              const items = byRoom.get(room.id) ?? [];
              const segments = segmentsFor(items, selectedDate);

              if (segments.length === 0) {
                return (
                  <button
                    key={room.id}
                    onClick={() => setModal({ mode: "new", room_id: room.id, check_in: selectedDate })}
                    className="flex items-center justify-between rounded-xl border border-dashed border-stone-300 bg-white px-4 py-3 text-left transition-colors hover:border-olive-400 hover:bg-olive-50"
                  >
                    <span>
                      <span className="block font-medium text-stone-800">{room.name}</span>
                      <span className="block text-xs text-stone-400">Boş</span>
                    </span>
                    <span className="text-2xl font-light text-stone-300">+</span>
                  </button>
                );
              }

              const hasTurnover =
                segments.some((s) => s.kind === "departure") &&
                segments.some((s) => s.kind === "arrival" || s.kind === "staying");

              return (
                <div
                  key={room.id}
                  className={`overflow-hidden rounded-xl border bg-white ${
                    hasTurnover ? "border-terra-300" : "border-stone-200"
                  }`}
                >
                  <div className="flex items-center justify-between border-b border-stone-100 bg-stone-50 px-4 py-1.5">
                    <span className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                      {room.name}
                      {hasTurnover && (
                        <span className="ml-2 rounded-full bg-terra-100 px-2 py-0.5 text-[10px] font-bold text-terra-700">
                          DEVİR GÜNÜ
                        </span>
                      )}
                    </span>
                    <button
                      onClick={() => setModal({ mode: "new", room_id: room.id, check_in: selectedDate })}
                      title="Bu odaya bu gün için yeni kayıt ekle"
                      aria-label="Yeni kayıt ekle"
                      className="flex h-7 w-7 items-center justify-center rounded-full text-base font-light text-stone-400 hover:bg-stone-200 hover:text-stone-700"
                    >
                      +
                    </button>
                  </div>
                  <div className="divide-y divide-stone-100">
                    {segments.map((seg) => (
                      <RoomSegmentCard
                        key={`${seg.reservation.id}-${seg.kind}`}
                        segment={seg}
                        conflicted={conflictedIds.has(seg.reservation.id)}
                        onClick={() => setModal({ mode: "edit", reservation: seg.reservation })}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {modal && (
        <ReservationModal
          rooms={rooms}
          reservation={modal.mode === "edit" ? modal.reservation : null}
          defaults={
            modal.mode === "new"
              ? {
                  room_id: modal.room_id,
                  check_in: modal.check_in,
                  check_out: addDaysIso(modal.check_in, 1),
                }
              : undefined
          }
          onClose={() => setModal(null)}
          onSaved={onSaved}
        />
      )}
    </div>
  );
}

function RoomSegmentCard({
  segment,
  conflicted,
  onClick,
}: {
  segment: Segment;
  conflicted: boolean;
  onClick: () => void;
}) {
  const { reservation: r, kind } = segment;
  const label = r.type === "block" ? (r.notes?.trim() || "Blokaj") : (r.guest_name ?? SOURCE_LABELS[r.source]);

  const timeLabel =
    kind === "departure" ? `Çıkış · ${CHECK_OUT_TIME}` : kind === "arrival" ? `Giriş · ${CHECK_IN_TIME}` : "Konaklıyor";

  const badgeCls =
    kind === "departure"
      ? "bg-stone-100 text-stone-600"
      : kind === "arrival"
        ? "bg-olive-100 text-olive-700"
        : "bg-aegean-50 text-aegean-700";

  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-stone-50 ${
        conflicted ? "bg-red-50" : ""
      } ${r.type === "block" ? "opacity-80" : ""}`}
    >
      <span className="min-w-0">
        <span className="flex items-center gap-1.5">
          {conflicted && <span className="text-red-600" title="Çakışma var">⚠</span>}
          <span className="truncate font-medium text-stone-800">{label}</span>
        </span>
        <span className="mt-0.5 block text-xs text-stone-400">
          {r.type === "block" ? "Blokaj" : SOURCE_LABELS[r.source]}
        </span>
      </span>
      <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${badgeCls}`}>
        {timeLabel}
      </span>
    </button>
  );
}
