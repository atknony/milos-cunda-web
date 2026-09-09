import { useEffect, useState } from "react";
import type { BookingSource, Reservation, Room } from "@/lib/supabase/types";
import { SOURCE_LABELS } from "@/lib/supabase/types";
import { CHECK_IN_TIME, CHECK_OUT_TIME } from "@/lib/pms/dates";
import { useModalLifecycle } from "@/lib/hooks/useModalLifecycle";

interface Props {
  rooms: Room[];
  /** Düzenlenen kayıt; yeni kayıt için null */
  reservation: Reservation | null;
  /** Yeni kayıt için ön-doldurma (takvimden hücre tıklaması) */
  defaults?: { room_id?: string; check_in?: string; check_out?: string };
  onClose: () => void;
  /** Kaydetme sonrası; conflictsWith uyarı göstermek için iletilir */
  onSaved: (reservation: Reservation, conflictsWith: Reservation[]) => void;
}

const inputCls =
  "w-full rounded-lg border border-stone-300 px-3 py-2.5 text-base focus:border-stone-500 focus:outline-none disabled:bg-stone-100 disabled:text-stone-400";
const labelCls = "mb-1 block text-xs font-medium text-stone-600";

export default function ReservationModal({ rooms, reservation, defaults, onClose, onSaved }: Props) {
  const isEdit = reservation !== null;
  const isImported = reservation?.feed_id != null;

  const [form, setForm] = useState({
    type: reservation?.type ?? "booking",
    room_id: reservation?.room_id ?? defaults?.room_id ?? rooms[0]?.id ?? "",
    check_in: reservation?.check_in ?? defaults?.check_in ?? "",
    check_out: reservation?.check_out ?? defaults?.check_out ?? "",
    guest_name: reservation?.guest_name ?? "",
    guest_phone: reservation?.guest_phone ?? "",
    guest_email: reservation?.guest_email ?? "",
    source: reservation?.source ?? "direct",
    notes: reservation?.notes ?? "",
    total_price: reservation?.total_price?.toString() ?? "",
    currency: reservation?.currency?.trim() || "TRY",
    deposit_paid: reservation?.deposit_paid?.toString() ?? "",
    payment_note: reservation?.payment_note ?? "",
  });
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const isBlock = form.type === "block";
  // İçe aktarılan kayıtlarda tarih/oda/kaynak/durum kilitli
  const lockCore = isImported;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useModalLifecycle(onClose);

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (form.check_out <= form.check_in) {
      setError("Çıkış tarihi giriş tarihinden sonra olmalıdır.");
      return;
    }
    if (!isBlock && !form.guest_name.trim() && !lockCore) {
      setError("Misafir adı zorunludur.");
      return;
    }

    const payload: Record<string, unknown> = {
      notes: form.notes,
      total_price: form.total_price === "" ? null : Number(form.total_price),
      currency: form.currency,
      deposit_paid: form.deposit_paid === "" ? null : Number(form.deposit_paid),
      payment_note: form.payment_note,
    };
    if (!lockCore) {
      Object.assign(payload, {
        type: form.type,
        room_id: form.room_id,
        check_in: form.check_in,
        check_out: form.check_out,
        source: form.source,
        guest_name: form.guest_name,
        guest_phone: form.guest_phone,
        guest_email: form.guest_email,
      });
    }

    setBusy(true);
    try {
      const res = await fetch(isEdit ? `/api/reservations/${reservation.id}` : "/api/reservations", {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Bir hata oluştu.");
        return;
      }
      onSaved(data.reservation, data.conflictsWith ?? []);
    } catch {
      setError("Sunucuya ulaşılamadı.");
    } finally {
      setBusy(false);
    }
  }

  async function cancelReservation() {
    if (!reservation) return;
    const ok = window.confirm("Bu kayıt iptal edilecek (silinmez, geçmişte kalır). Emin misiniz?");
    if (!ok) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/reservations/${reservation.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "cancelled" }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Bir hata oluştu.");
        return;
      }
      onSaved(data.reservation, []);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      className="admin-modal-backdrop fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center sm:p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="admin-modal-sheet max-h-[92vh] w-full max-w-lg overflow-y-auto overscroll-contain rounded-t-2xl bg-white p-5 shadow-xl sm:rounded-xl sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-serif text-xl font-bold">
            {isEdit ? (isBlock ? "Blokajı Düzenle" : "Rezervasyonu Düzenle") : "Yeni Kayıt"}
          </h2>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-stone-400 hover:bg-stone-100 hover:text-stone-600"
            aria-label="Kapat"
          >
            ✕
          </button>
        </div>

        {isImported && (
          <p className="mb-4 rounded-md bg-aegean-50 px-3 py-2 text-xs text-aegean-800">
            Bu kayıt {SOURCE_LABELS[reservation!.source as BookingSource]} takviminden içe
            aktarıldı. Tarih ve durum bilgileri platformdan yönetilir; yalnızca not ve ücret
            alanlarını düzenleyebilirsiniz.
          </p>
        )}

        <form onSubmit={save} className="space-y-4">
          {!isEdit && (
            <div className="flex gap-2">
              {(["booking", "block"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => set("type", t)}
                  className={`flex-1 rounded-lg border px-3 py-2.5 text-sm font-medium ${
                    form.type === t
                      ? "border-stone-900 bg-stone-900 text-white"
                      : "border-stone-300 text-stone-600 hover:bg-stone-50"
                  }`}
                >
                  {t === "booking" ? "Rezervasyon" : "Blokaj (bakım / kapalı)"}
                </button>
              ))}
            </div>
          )}

          <div>
            <label className={labelCls}>Oda *</label>
            <select
              value={form.room_id}
              onChange={(e) => set("room_id", e.target.value)}
              disabled={lockCore}
              required
              className={inputCls}
            >
              {rooms
                .filter((r) => r.is_active || r.id === form.room_id)
                .map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Giriş * · saat {CHECK_IN_TIME}</label>
              <input
                type="date"
                value={form.check_in}
                onChange={(e) => set("check_in", e.target.value)}
                disabled={lockCore}
                required
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Çıkış * · saat {CHECK_OUT_TIME}</label>
              <input
                type="date"
                value={form.check_out}
                onChange={(e) => set("check_out", e.target.value)}
                disabled={lockCore}
                required
                className={inputCls}
              />
            </div>
          </div>
          <p className="-mt-2 text-xs text-stone-400">
            Çıkış günü konaklamaya dahil değildir — oda o gün {CHECK_OUT_TIME}'da boşalır.
          </p>

          {!isBlock && (
            <>
              <div>
                <label className={labelCls}>Misafir adı *</label>
                <input
                  value={form.guest_name}
                  onChange={(e) => set("guest_name", e.target.value)}
                  disabled={lockCore}
                  className={inputCls}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Telefon</label>
                  <input
                    value={form.guest_phone}
                    onChange={(e) => set("guest_phone", e.target.value)}
                    disabled={lockCore}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>E-posta</label>
                  <input
                    type="email"
                    value={form.guest_email}
                    onChange={(e) => set("guest_email", e.target.value)}
                    disabled={lockCore}
                    className={inputCls}
                  />
                </div>
              </div>
              <div>
                <label className={labelCls}>Kaynak</label>
                <select
                  value={form.source}
                  onChange={(e) => set("source", e.target.value as BookingSource)}
                  disabled={lockCore}
                  className={inputCls}
                >
                  {Object.entries(SOURCE_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <fieldset className="rounded-md border border-stone-200 p-3">
                <legend className="px-1 text-xs font-medium text-stone-500">
                  Ücret (kayıt amaçlı, opsiyonel)
                </legend>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className={labelCls}>Toplam</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={form.total_price}
                      onChange={(e) => set("total_price", e.target.value)}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Para birimi</label>
                    <select
                      value={form.currency}
                      onChange={(e) => set("currency", e.target.value)}
                      className={inputCls}
                    >
                      <option value="TRY">TRY</option>
                      <option value="EUR">EUR</option>
                      <option value="USD">USD</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Kapora</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={form.deposit_paid}
                      onChange={(e) => set("deposit_paid", e.target.value)}
                      className={inputCls}
                    />
                  </div>
                </div>
                <div className="mt-2">
                  <label className={labelCls}>Ödeme notu</label>
                  <input
                    value={form.payment_note}
                    onChange={(e) => set("payment_note", e.target.value)}
                    placeholder="örn. kapora IBAN'a geldi"
                    className={inputCls}
                  />
                </div>
              </fieldset>
            </>
          )}

          <div>
            <label className={labelCls}>Notlar</label>
            <textarea
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
              rows={2}
              className={inputCls}
            />
          </div>

          {error && (
            <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          )}

          <div className="flex flex-col gap-3 pt-2">
            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-lg bg-stone-900 px-4 py-3.5 text-base font-semibold text-white hover:bg-stone-700 disabled:opacity-50"
            >
              {busy ? "Kaydediliyor…" : "Kaydet"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-lg border border-stone-300 px-4 py-3 text-sm font-medium text-stone-600 hover:bg-stone-50"
            >
              Vazgeç
            </button>
            {isEdit && !isImported && reservation.status === "confirmed" && (
              <button
                type="button"
                onClick={cancelReservation}
                disabled={busy}
                className="w-full rounded-lg py-2 text-sm font-medium text-red-600 hover:underline"
              >
                Kaydı iptal et
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
