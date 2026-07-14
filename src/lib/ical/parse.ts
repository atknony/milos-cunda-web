import ical from "node-ical";
import { HOTEL_TIMEZONE } from "@/lib/pms/dates";

export interface ParsedEvent {
  uid: string;
  /** yyyy-MM-dd */
  checkIn: string;
  /** yyyy-MM-dd — münhasır */
  checkOut: string;
  summary: string;
}

const FETCH_TIMEOUT_MS = 8_000;

type IcalDate = Date & { dateOnly?: boolean };

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

/**
 * node-ical tarihini yyyy-MM-dd'ye çevirir.
 * - VALUE=DATE (dateOnly): node-ical tarihi SUNUCUNUN YEREL saat diliminde
 *   gece yarısı olarak kurar → yerel bileşenlerle okunur (UTC okumak
 *   UTC+3'te bir gün kaydırırdı).
 * - DATE-TIME: gerçek bir an → otelin saat dilimindeki takvim gününe çevrilir.
 */
function toIsoDate(d: IcalDate): string {
  if (d.dateOnly) {
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  }
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: HOTEL_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
}

function addOneDay(isoDate: string): string {
  const d = new Date(`${isoDate}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10);
}

/**
 * Dış iCal beslemesini indirir ve normalize edilmiş etkinlik listesi döndürür.
 * Hata durumunda fırlatır — çağıran (sync.ts) besleme başına yalıtır.
 */
export async function fetchAndParseFeed(url: string): Promise<ParsedEvent[]> {
  const res = await fetch(url, {
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    headers: { "User-Agent": "CundaMilosPMS/1.0 (+https://cundamilos.com)" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const text = await res.text();
  const parsed = await ical.async.parseICS(text);

  const events: ParsedEvent[] = [];
  for (const key of Object.keys(parsed)) {
    const item = parsed[key] as Record<string, unknown>;
    if (item.type !== "VEVENT") continue;

    const uid = typeof item.uid === "string" ? item.uid : key;
    const start = item.start as IcalDate | undefined;
    if (!uid || !start) continue;

    const checkIn = toIsoDate(start);
    const end = item.end as IcalDate | undefined;
    // DTEND yoksa RFC gereği tek günlük tüm-gün etkinlik kabul edilir
    let checkOut = end ? toIsoDate(end) : addOneDay(checkIn);
    // Sıfır/negatif süreye karşı koruma (bozuk besleme)
    if (checkOut <= checkIn) checkOut = addOneDay(checkIn);

    events.push({
      uid,
      checkIn,
      checkOut,
      summary: typeof item.summary === "string" ? item.summary : "",
    });
  }
  return events;
}
