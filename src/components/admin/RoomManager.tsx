import { useState } from "react";
import type { Room } from "@/lib/supabase/types";

interface Props {
  initialRooms: Room[];
  /** Örn. https://cundamilos.com — export URL'lerini kurmak için */
  origin: string;
}

const EXPORT_VARIANTS = [
  { suffix: "-airbnb", label: "Airbnb" },
  { suffix: "-booking_com", label: "Booking.com" },
  { suffix: "-hotels_com", label: "Hotels.com" },
  { suffix: "", label: "Genel" },
] as const;

export default function RoomManager({ initialRooms, origin }: Props) {
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [error, setError] = useState<string | null>(null);
  const [newName, setNewName] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [busy, setBusy] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  async function api(path: string, method: string, body?: unknown) {
    setError(null);
    setBusy(true);
    try {
      const res = await fetch(path, {
        method,
        headers: { "Content-Type": "application/json" },
        body: body === undefined ? undefined : JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Bir hata oluştu.");
        return null;
      }
      return data;
    } catch {
      setError("Sunucuya ulaşılamadı.");
      return null;
    } finally {
      setBusy(false);
    }
  }

  async function addRoom(e: React.FormEvent) {
    e.preventDefault();
    const data = await api("/api/rooms", "POST", {
      name: newName,
      public_slug: newSlug || undefined,
      sort_order: rooms.length,
    });
    if (data?.room) {
      setRooms([...rooms, data.room]);
      setNewName("");
      setNewSlug("");
    }
  }

  async function patchRoom(id: string, updates: Partial<Room>) {
    const data = await api(`/api/rooms/${id}`, "PATCH", updates);
    if (data?.room) {
      setRooms(rooms.map((r) => (r.id === id ? data.room : r)));
    }
  }

  async function renameRoom(room: Room) {
    const name = window.prompt("Yeni oda adı:", room.name);
    if (name && name.trim() && name !== room.name) {
      await patchRoom(room.id, { name: name.trim() });
    }
  }

  async function rotateToken(room: Room) {
    const ok = window.confirm(
      `"${room.name}" odasının takvim adresi yenilenecek.\n\n` +
        "DİKKAT: Eski adresler anında geçersiz olur. Yeni adresleri " +
        "Airbnb/Booking.com'a tekrar yapıştırmanız gerekir. Devam edilsin mi?"
    );
    if (!ok) return;
    const data = await api(`/api/rooms/${room.id}/rotate-token`, "POST");
    if (data?.room) {
      setRooms(rooms.map((r) => (r.id === room.id ? data.room : r)));
      setExpandedId(room.id);
    }
  }

  function exportUrl(room: Room, suffix: string) {
    return `${origin}/api/ical/${room.ical_token}${suffix}.ics`;
  }

  async function copy(url: string) {
    await navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(null), 1500);
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Oda listesi */}
      <div className="overflow-hidden rounded-xl border border-stone-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-stone-200 bg-stone-50 text-left text-xs uppercase tracking-wide text-stone-500">
              <th className="px-4 py-2">Oda</th>
              <th className="px-4 py-2">Site bağlantısı</th>
              <th className="px-4 py-2">Durum</th>
              <th className="px-4 py-2 text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {rooms.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-stone-400">
                  Henüz oda eklenmedi.
                </td>
              </tr>
            )}
            {rooms.map((room) => (
              <RoomRow
                key={room.id}
                room={room}
                busy={busy}
                expanded={expandedId === room.id}
                copied={copied}
                onToggleExpand={() =>
                  setExpandedId(expandedId === room.id ? null : room.id)
                }
                onRename={() => renameRoom(room)}
                onToggleActive={() => patchRoom(room.id, { is_active: !room.is_active })}
                onRotate={() => rotateToken(room)}
                exportUrl={(suffix) => exportUrl(room, suffix)}
                onCopy={copy}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Yeni oda formu */}
      <form
        onSubmit={addRoom}
        className="flex flex-wrap items-end gap-3 rounded-xl border border-stone-200 bg-white p-4"
      >
        <div className="min-w-40 flex-1">
          <label className="mb-1 block text-xs font-medium text-stone-600">Oda adı *</label>
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            required
            placeholder="örn. Zeytin Suit"
            className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm focus:border-stone-500 focus:outline-none"
          />
        </div>
        <div className="min-w-40 flex-1">
          <label className="mb-1 block text-xs font-medium text-stone-600">
            Site slug (opsiyonel)
          </label>
          <input
            value={newSlug}
            onChange={(e) => setNewSlug(e.target.value)}
            placeholder="örn. zeytin"
            className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm focus:border-stone-500 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={busy}
          className="rounded-md bg-stone-900 px-4 py-2 text-sm font-medium text-white hover:bg-stone-700 disabled:opacity-50"
        >
          Oda Ekle
        </button>
      </form>
    </div>
  );
}

function RoomRow({
  room,
  busy,
  expanded,
  copied,
  onToggleExpand,
  onRename,
  onToggleActive,
  onRotate,
  exportUrl,
  onCopy,
}: {
  room: Room;
  busy: boolean;
  expanded: boolean;
  copied: string | null;
  onToggleExpand: () => void;
  onRename: () => void;
  onToggleActive: () => void;
  onRotate: () => void;
  exportUrl: (suffix: string) => string;
  onCopy: (url: string) => void;
}) {
  return (
    <>
      <tr className={`border-b border-stone-100 ${room.is_active ? "" : "opacity-50"}`}>
        <td className="px-4 py-3 font-medium">{room.name}</td>
        <td className="px-4 py-3 text-stone-500">{room.public_slug ?? "—"}</td>
        <td className="px-4 py-3">
          {room.is_active ? (
            <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
              Aktif
            </span>
          ) : (
            <span className="rounded-full bg-stone-100 px-2 py-0.5 text-xs font-medium text-stone-500">
              Pasif
            </span>
          )}
        </td>
        <td className="px-4 py-3 text-right">
          <div className="flex justify-end gap-2 text-xs">
            <button onClick={onToggleExpand} className="text-aegean-700 hover:underline">
              {expanded ? "Adresleri gizle" : "Takvim adresleri"}
            </button>
            <button onClick={onRename} disabled={busy} className="text-stone-600 hover:underline">
              Yeniden adlandır
            </button>
            <button
              onClick={onToggleActive}
              disabled={busy}
              className={
                room.is_active
                  ? "text-red-600 hover:underline"
                  : "text-green-700 hover:underline"
              }
            >
              {room.is_active ? "Pasife al" : "Aktifleştir"}
            </button>
          </div>
        </td>
      </tr>
      {expanded && (
        <tr className="border-b border-stone-100 bg-stone-50">
          <td colSpan={4} className="px-4 py-3">
            <p className="mb-2 text-xs text-stone-500">
              Her platforma KENDİ adresini yapıştırın — böylece platform kendi
              rezervasyonlarını geri okumaz (döngü önlenir).
            </p>
            <div className="space-y-1.5">
              {EXPORT_VARIANTS.map(({ suffix, label }) => {
                const url = exportUrl(suffix);
                return (
                  <div key={suffix} className="flex items-center gap-2 text-xs">
                    <span className="w-24 shrink-0 font-medium text-stone-600">{label}</span>
                    <code className="flex-1 truncate rounded bg-white px-2 py-1 text-stone-700">
                      {url}
                    </code>
                    <button
                      onClick={() => onCopy(url)}
                      className="shrink-0 rounded border border-stone-300 px-2 py-1 text-stone-600 hover:bg-stone-100"
                    >
                      {copied === url ? "Kopyalandı ✓" : "Kopyala"}
                    </button>
                  </div>
                );
              })}
            </div>
            <button
              onClick={onRotate}
              disabled={busy}
              className="mt-3 text-xs text-red-600 hover:underline"
            >
              Token'ı yenile (eski adresler geçersiz olur)
            </button>
          </td>
        </tr>
      )}
    </>
  );
}
