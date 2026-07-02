import { useState } from "react";
import type { FeedPlatform, IcalFeed, Room } from "@/lib/supabase/types";
import { PLATFORM_LABELS } from "@/lib/supabase/types";

interface Props {
  rooms: Room[];
  initialFeeds: IcalFeed[];
}

interface SyncTotals {
  feeds: number;
  eventsFound: number;
  created: number;
  updated: number;
  cancelled: number;
  errors: number;
}

function formatDateTime(iso: string | null): string {
  if (!iso) return "hiç";
  return new Intl.DateTimeFormat("tr-TR", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "Europe/Istanbul",
  }).format(new Date(iso));
}

export default function FeedManager({ rooms, initialFeeds }: Props) {
  const [feeds, setFeeds] = useState<IcalFeed[]>(initialFeeds);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [syncSummary, setSyncSummary] = useState<string | null>(null);

  const [newRoomId, setNewRoomId] = useState(rooms[0]?.id ?? "");
  const [newPlatform, setNewPlatform] = useState<FeedPlatform>("airbnb");
  const [newUrl, setNewUrl] = useState("");

  const activeRooms = rooms.filter((r) => r.is_active);

  async function addFeed(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const res = await fetch("/api/feeds", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ room_id: newRoomId, platform: newPlatform, url: newUrl.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Bir hata oluştu.");
        return;
      }
      setFeeds([...feeds, data.feed]);
      setNewUrl("");
    } catch {
      setError("Sunucuya ulaşılamadı.");
    } finally {
      setBusy(false);
    }
  }

  async function toggleFeed(feed: IcalFeed) {
    setError(null);
    const res = await fetch(`/api/feeds/${feed.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_active: !feed.is_active }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Bir hata oluştu.");
      return;
    }
    setFeeds(feeds.map((f) => (f.id === feed.id ? data.feed : f)));
  }

  async function syncNow(feedId?: string) {
    setError(null);
    setSyncSummary(null);
    setBusy(true);
    try {
      const qs = feedId ? `?feed_id=${feedId}` : "";
      const res = await fetch(`/api/sync/import${qs}`, { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Senkronizasyon başarısız.");
        return;
      }
      const t: SyncTotals = data.totals;
      setSyncSummary(
        `${t.feeds} besleme tarandı · ${t.eventsFound} etkinlik · ` +
          `${t.created} yeni · ${t.updated} güncellendi · ${t.cancelled} iptal` +
          (t.errors > 0 ? ` · ${t.errors} HATA` : "")
      );
      // Besleme durumlarını tazele
      const fres = await fetch("/api/feeds");
      const fdata = await fres.json();
      if (fres.ok) setFeeds(fdata.feeds);
    } catch {
      setError("Sunucuya ulaşılamadı.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-stone-500">
          Airbnb/Booking.com'dan aldığınız takvim dışa aktarma adreslerini buraya ekleyin.
        </p>
        <button
          onClick={() => syncNow()}
          disabled={busy}
          className="rounded-md bg-stone-900 px-4 py-2 text-sm font-medium text-white hover:bg-stone-700 disabled:opacity-50"
        >
          {busy ? "Çalışıyor…" : "Şimdi Senkronize Et"}
        </button>
      </div>

      {syncSummary && (
        <div className="rounded-md border border-green-300 bg-green-50 px-4 py-2 text-sm text-green-800">
          ✓ {syncSummary}
        </div>
      )}
      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Besleme listesi */}
      <div className="overflow-hidden rounded-xl border border-stone-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-stone-200 bg-stone-50 text-left text-xs uppercase tracking-wide text-stone-500">
              <th className="px-4 py-2">Oda</th>
              <th className="px-4 py-2">Platform</th>
              <th className="px-4 py-2">Adres</th>
              <th className="px-4 py-2">Son senkron</th>
              <th className="px-4 py-2 text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {feeds.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-stone-400">
                  Henüz dış takvim adresi eklenmedi.
                </td>
              </tr>
            )}
            {feeds.map((feed) => {
              const room = rooms.find((r) => r.id === feed.room_id);
              return (
                <tr
                  key={feed.id}
                  className={`border-b border-stone-100 ${feed.is_active ? "" : "opacity-50"}`}
                >
                  <td className="px-4 py-2.5 font-medium">{room?.name ?? "?"}</td>
                  <td className="px-4 py-2.5">{PLATFORM_LABELS[feed.platform]}</td>
                  <td className="max-w-64 truncate px-4 py-2.5 text-xs text-stone-500" title={feed.url}>
                    {feed.url}
                  </td>
                  <td className="px-4 py-2.5 text-xs">
                    {formatDateTime(feed.last_synced_at)}{" "}
                    {feed.last_sync_status === "ok" && <span className="text-green-600">✓</span>}
                    {feed.last_sync_status === "error" && (
                      <span className="text-red-600" title={feed.last_sync_error ?? ""}>
                        ✗ hata
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    <div className="flex justify-end gap-2 text-xs">
                      <button
                        onClick={() => syncNow(feed.id)}
                        disabled={busy || !feed.is_active}
                        className="text-aegean-700 hover:underline disabled:opacity-40"
                      >
                        Senkronize et
                      </button>
                      <button
                        onClick={() => toggleFeed(feed)}
                        disabled={busy}
                        className={
                          feed.is_active
                            ? "text-red-600 hover:underline"
                            : "text-green-700 hover:underline"
                        }
                      >
                        {feed.is_active ? "Pasife al" : "Aktifleştir"}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Yeni besleme formu */}
      <form
        onSubmit={addFeed}
        className="flex flex-wrap items-end gap-3 rounded-xl border border-stone-200 bg-white p-4"
      >
        <div>
          <label className="mb-1 block text-xs font-medium text-stone-600">Oda</label>
          <select
            value={newRoomId}
            onChange={(e) => setNewRoomId(e.target.value)}
            className="rounded-md border border-stone-300 px-3 py-2 text-sm"
          >
            {activeRooms.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-stone-600">Platform</label>
          <select
            value={newPlatform}
            onChange={(e) => setNewPlatform(e.target.value as FeedPlatform)}
            className="rounded-md border border-stone-300 px-3 py-2 text-sm"
          >
            {Object.entries(PLATFORM_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <div className="min-w-64 flex-1">
          <label className="mb-1 block text-xs font-medium text-stone-600">
            iCal adresi (https://…)
          </label>
          <input
            type="url"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            required
            placeholder="https://www.airbnb.com/calendar/ical/…ics"
            className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm"
          />
        </div>
        <button
          type="submit"
          disabled={busy || activeRooms.length === 0}
          className="rounded-md bg-stone-900 px-4 py-2 text-sm font-medium text-white hover:bg-stone-700 disabled:opacity-50"
        >
          Ekle
        </button>
      </form>
    </div>
  );
}
