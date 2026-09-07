import { useState } from "react";
import type { Room } from "@/lib/supabase/types";

interface Props {
  initialRooms: Room[];
}

export default function RoomManager({ initialRooms }: Props) {
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [error, setError] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [busy, setBusy] = useState(false);

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
      setShowAdd(false);
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

  return (
    <div className="space-y-4">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Oda listesi */}
      <div className="space-y-2">
        {rooms.length === 0 && (
          <p className="rounded-xl border border-stone-200 bg-white p-6 text-center text-sm text-stone-400">
            Henüz oda eklenmedi.
          </p>
        )}
        {rooms.map((room) => (
          <div
            key={room.id}
            className={`flex items-center justify-between gap-3 rounded-xl border bg-white px-4 py-3.5 ${
              room.is_active ? "border-stone-200" : "border-stone-200 opacity-50"
            }`}
          >
            <div className="min-w-0">
              <p className="truncate font-semibold text-stone-800">{room.name}</p>
              <p className="text-xs text-stone-400">
                {room.is_active ? "Aktif" : "Pasif"}
                {room.public_slug ? ` · site: ${room.public_slug}` : ""}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-1.5">
              <button
                onClick={() => renameRoom(room)}
                disabled={busy}
                className="flex h-10 items-center rounded-lg px-3 text-sm font-medium text-stone-600 hover:bg-stone-100"
              >
                Ad değiştir
              </button>
              <button
                onClick={() => patchRoom(room.id, { is_active: !room.is_active })}
                disabled={busy}
                className={`flex h-10 items-center rounded-lg px-3 text-sm font-medium ${
                  room.is_active
                    ? "text-red-600 hover:bg-red-50"
                    : "text-green-700 hover:bg-green-50"
                }`}
              >
                {room.is_active ? "Pasife al" : "Aktifleştir"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Yeni oda ekle */}
      {showAdd ? (
        <form
          onSubmit={addRoom}
          className="space-y-3 rounded-xl border border-stone-200 bg-white p-4"
        >
          <div>
            <label className="mb-1 block text-xs font-medium text-stone-600">Oda adı *</label>
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              required
              placeholder="örn. Numara 7"
              className="w-full rounded-lg border border-stone-300 px-3 py-2.5 text-base focus:border-stone-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-stone-600">
              Site bağlantısı (opsiyonel)
            </label>
            <input
              value={newSlug}
              onChange={(e) => setNewSlug(e.target.value)}
              placeholder="örn. numara-7"
              className="w-full rounded-lg border border-stone-300 px-3 py-2.5 text-base focus:border-stone-500 focus:outline-none"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={busy}
              className="flex-1 rounded-lg bg-stone-900 px-4 py-3 text-sm font-semibold text-white hover:bg-stone-700 disabled:opacity-50"
            >
              Oda Ekle
            </button>
            <button
              type="button"
              onClick={() => setShowAdd(false)}
              className="rounded-lg border border-stone-300 px-4 py-3 text-sm font-medium text-stone-600 hover:bg-stone-50"
            >
              Vazgeç
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setShowAdd(true)}
          className="w-full rounded-xl border border-dashed border-stone-300 px-4 py-3 text-sm font-medium text-stone-500 hover:border-stone-400 hover:bg-stone-50"
        >
          + Yeni oda ekle
        </button>
      )}
    </div>
  );
}
