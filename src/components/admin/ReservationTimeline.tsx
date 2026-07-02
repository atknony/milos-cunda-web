import { useCallback, useEffect, useMemo, useState } from "react";
import type { BookingSource, ConflictPair, Reservation, Room } from "@/lib/supabase/types";
import { SOURCE_LABELS } from "@/lib/supabase/types";
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

/** Kaynağa göre bar rengi */
const SOURCE_COLORS: Record<BookingSource, string> = {
  direct: "bg-olive-600",
  phone: "bg-olive-500",
  whatsapp: "bg-olive-400",
  airbnb: "bg-[#e0565b]",
  booking_com: "bg-[#1a4b8c]",
  hotels_com: "bg-terra-500",
  other: "bg-stone-500",
};

/** Çakışmayan barları şeritlere (lane) dağıt — çakışanlar alt alta çizilir. */
function assignLanes(items: Reservation[]): Map<string, number> {
  const sorted = [...items].sort((a, b) => a.check_in.localeCompare(b.check_in));
  const laneEnds: string[] = []; // her şeridin son check_out'u
  const lanes = new Map<string, number>();
  for (const r of sorted) {
    let lane = laneEnds.findIndex((end) => end <= r.check_in);
    if (lane === -1) {
      lane = laneEnds.length;
      laneEnds.push(r.check_out);
    } else {
      laneEnds[lane] = r.check_out;
    }
    lanes.set(r.id, lane);
  }
  return lanes;
}

export default function ReservationTimeline({ rooms, today }: Props) {
  const [year, setYear] = useState(() => Number(today.slice(0, 4)));
  const [month, setMonth] = useState(() => Number(today.slice(5, 7))); // 1-12
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [conflicts, setConflicts] = useState<ConflictPair[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [modal, setModal] = useState<
    | { mode: "edit"; reservation: Reservation }
    | { mode: "new"; room_id: string; check_in: string }
    | null
  >(null);
  const [savedWarning, setSavedWarning] = useState<string | null>(null);

  const numDays = daysInMonth(year, month);
  const monthStart = isoDate(year, month, 1);
  const nextMonthStart = addDaysIso(isoDate(year, month, numDays), 1);
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

  function nav(delta: number) {
    let m = month + delta;
    let y = year;
    if (m < 1) { m = 12; y--; }
    if (m > 12) { m = 1; y++; }
    setMonth(m);
    setYear(y);
  }

  function goToday() {
    setYear(Number(today.slice(0, 4)));
    setMonth(Number(today.slice(5, 7)));
  }

  function weekdayOf(day: number): string {
    // getUTCDay: 0=Pazar → Pazartesi-indeksli diziye çevir
    const wd = new Date(`${isoDate(year, month, day)}T12:00:00Z`).getUTCDay();
    return WEEKDAYS_TR[(wd + 6) % 7];
  }

  function isWeekend(day: number): boolean {
    const wd = new Date(`${isoDate(year, month, day)}T12:00:00Z`).getUTCDay();
    return wd === 0 || wd === 6;
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

  const gridCols = `repeat(${numDays}, minmax(2rem, 1fr))`;

  return (
    <div className="space-y-4">
      {/* Ay gezinme */}
      <div className="flex items-center justify-between rounded-xl border border-stone-200 bg-white px-4 py-2.5">
        <div className="flex items-center gap-2">
          <button
            onClick={() => nav(-1)}
            className="rounded-md border border-stone-300 px-2.5 py-1 text-sm hover:bg-stone-50"
            aria-label="Önceki ay"
          >
            ←
          </button>
          <button
            onClick={() => nav(1)}
            className="rounded-md border border-stone-300 px-2.5 py-1 text-sm hover:bg-stone-50"
            aria-label="Sonraki ay"
          >
            →
          </button>
          <button
            onClick={goToday}
            className="rounded-md border border-stone-300 px-2.5 py-1 text-sm hover:bg-stone-50"
          >
            Bugün
          </button>
          <h2 className="ml-2 font-serif text-lg font-bold">
            {MONTHS_TR[month - 1]} {year}
          </h2>
        </div>
        <button
          onClick={() =>
            setModal({ mode: "new", room_id: activeRooms[0]?.id ?? "", check_in: today })
          }
          className="rounded-md bg-stone-900 px-4 py-1.5 text-sm font-medium text-white hover:bg-stone-700"
        >
          + Yeni Kayıt
        </button>
      </div>

      {savedWarning && (
        <div className="flex items-start justify-between rounded-md border border-amber-300 bg-amber-50 px-4 py-2 text-sm text-amber-800">
          <span>⚠ {savedWarning}</span>
          <button onClick={() => setSavedWarning(null)} className="ml-3 font-bold">✕</button>
        </div>
      )}
      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      <ConflictBanner
        conflicts={conflicts}
        reservations={reservations}
        rooms={rooms}
        onSelect={(r) => setModal({ mode: "edit", reservation: r })}
      />

      {/* Zaman çizelgesi */}
      {activeRooms.length === 0 ? (
        <p className="rounded-xl border border-stone-200 bg-white p-6 text-center text-sm text-stone-400">
          Aktif oda yok. Önce <a href="/admin/rooms" className="underline">Odalar</a> sayfasından oda ekleyin.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-stone-200 bg-white">
          <div className="min-w-[60rem]">
            {/* Gün başlıkları */}
            <div className="flex border-b border-stone-200">
              <div className="w-32 shrink-0 border-r border-stone-200 px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-stone-500">
                Oda
              </div>
              <div className="grid flex-1" style={{ gridTemplateColumns: gridCols }}>
                {Array.from({ length: numDays }, (_, i) => {
                  const day = i + 1;
                  const iso = isoDate(year, month, day);
                  const isToday = iso === today;
                  return (
                    <div
                      key={day}
                      className={`border-r border-stone-100 py-1 text-center text-[10px] leading-tight ${
                        isToday
                          ? "bg-aegean-100 font-bold text-aegean-800"
                          : isWeekend(day)
                            ? "bg-stone-50 text-stone-500"
                            : "text-stone-500"
                      }`}
                    >
                      <div>{weekdayOf(day)}</div>
                      <div className="text-xs font-semibold">{day}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Oda satırları */}
            {activeRooms.map((room) => {
              const items = (byRoom.get(room.id) ?? []).filter(
                (r) => r.check_in < nextMonthStart && r.check_out > monthStart
              );
              const lanes = assignLanes(items);
              const laneCount = Math.max(1, ...[...lanes.values()].map((l) => l + 1));
              const rowHeight = laneCount * 2 + 0.5; // rem

              return (
                <div key={room.id} className="flex border-b border-stone-100 last:border-b-0">
                  <div className="flex w-32 shrink-0 items-center border-r border-stone-200 px-3 text-sm font-medium">
                    {room.name}
                  </div>
                  <div
                    className="relative grid flex-1"
                    style={{ gridTemplateColumns: gridCols, height: `${rowHeight}rem` }}
                  >
                    {/* Tıklanabilir boş hücreler */}
                    {Array.from({ length: numDays }, (_, i) => {
                      const day = i + 1;
                      const iso = isoDate(year, month, day);
                      return (
                        <button
                          key={day}
                          onClick={() => setModal({ mode: "new", room_id: room.id, check_in: iso })}
                          title={`${room.name} — ${day} ${MONTHS_TR[month - 1]}: yeni kayıt`}
                          style={{ gridColumn: day, gridRow: 1 }}
                          className={`h-full border-r border-stone-100 transition-colors hover:bg-aegean-50 ${
                            iso === today ? "bg-aegean-50/60" : isWeekend(day) ? "bg-stone-50/60" : ""
                          }`}
                        />
                      );
                    })}

                    {/* Rezervasyon barları */}
                    {items.map((r) => {
                      const startDay = r.check_in <= monthStart ? 1 : Number(r.check_in.slice(8, 10));
                      // check_out münhasır: son dolu gece check_out - 1
                      const endExclusive =
                        r.check_out >= nextMonthStart ? numDays + 1 : Number(r.check_out.slice(8, 10));
                      const lane = lanes.get(r.id) ?? 0;
                      const isConflicted = conflictedIds.has(r.id);
                      const label =
                        r.type === "block"
                          ? (r.notes?.trim() || "Blokaj")
                          : (r.guest_name ?? SOURCE_LABELS[r.source]);

                      return (
                        <button
                          key={r.id}
                          onClick={() => setModal({ mode: "edit", reservation: r })}
                          title={`${label} · ${r.check_in} → ${r.check_out} · ${SOURCE_LABELS[r.source]}`}
                          style={{
                            gridColumn: `${startDay} / ${endExclusive}`,
                            gridRow: 1,
                            marginTop: `${lane * 2 + 0.25}rem`,
                          }}
                          className={`z-10 mx-0.5 h-7 self-start truncate rounded-md px-2 text-left text-xs font-medium leading-7 text-white shadow-sm hover:brightness-110 ${
                            r.type === "block"
                              ? "bg-stone-400 bg-[repeating-linear-gradient(45deg,transparent,transparent_6px,rgba(255,255,255,0.25)_6px,rgba(255,255,255,0.25)_12px)]"
                              : SOURCE_COLORS[r.source]
                          } ${isConflicted ? "ring-2 ring-red-600 ring-offset-1" : ""}`}
                        >
                          {isConflicted && "⚠ "}
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Renk açıklamaları */}
      <div className="flex flex-wrap items-center gap-3 text-xs text-stone-600">
        {(Object.keys(SOURCE_COLORS) as BookingSource[]).map((s) => (
          <span key={s} className="flex items-center gap-1.5">
            <span className={`inline-block h-3 w-3 rounded ${SOURCE_COLORS[s]}`} />
            {SOURCE_LABELS[s]}
          </span>
        ))}
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded bg-stone-400 bg-[repeating-linear-gradient(45deg,transparent,transparent_3px,rgba(255,255,255,0.3)_3px,rgba(255,255,255,0.3)_6px)]" />
          Blokaj
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded ring-2 ring-red-600" />
          Çakışma
        </span>
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
