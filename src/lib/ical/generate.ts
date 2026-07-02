/**
 * iCalendar (.ics) üretimi — bilinçli olarak elle string kurulur.
 * Otel takvimi tek bir şekle ihtiyaç duyar: tüm-gün VEVENT'ler
 * (DTSTART/DTEND;VALUE=DATE, DTEND münhasır). Kütüphane katmanının
 * tarih/saat dilimi dolaylaması burada hata kaynağı olurdu.
 */

export interface IcalEvent {
  /** Kalıcı UID — rezervasyon satırının UUID'i */
  uid: string;
  /** yyyy-MM-dd */
  start: string;
  /** yyyy-MM-dd — münhasır (iCal kuralı = çıkış günü) */
  end: string;
  summary: string;
  /** ISO timestamp; DTSTAMP için (kayıt güncelleme zamanı) */
  updatedAt?: string;
}

/** RFC 5545 metin kaçışları. */
function escapeText(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

/** yyyy-MM-dd → yyyyMMdd */
function toBasicDate(isoDate: string): string {
  return isoDate.replace(/-/g, "");
}

/** ISO timestamp → yyyyMMddTHHmmssZ (UTC basic format) */
function toBasicDateTime(iso: string): string {
  return new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

/**
 * RFC 5545 satır katlama: 75 oktetten uzun satırlar CRLF + boşlukla bölünür.
 * Oktet sınırını UTF-8 bayt uzunluğuyla sayar (Türkçe karakterler 2 bayt).
 */
function foldLine(line: string): string {
  const encoder = new TextEncoder();
  if (encoder.encode(line).length <= 75) return line;

  const parts: string[] = [];
  let current = "";
  let currentBytes = 0;
  for (const char of line) {
    const charBytes = encoder.encode(char).length;
    // Devam satırları baştaki boşlukla 1 oktet kaybeder → 74 sınırı
    const limit = parts.length === 0 ? 75 : 74;
    if (currentBytes + charBytes > limit) {
      parts.push(current);
      current = char;
      currentBytes = charBytes;
    } else {
      current += char;
      currentBytes += charBytes;
    }
  }
  if (current) parts.push(current);
  return parts.join("\r\n ");
}

/** Tam .ics takvim metni üretir (CRLF satır sonları). */
export function buildCalendar(calendarName: string, events: IcalEvent[]): string {
  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Milos Cunda//PMS 1.0//TR",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${escapeText(calendarName)}`,
  ];

  const fallbackStamp = toBasicDateTime(new Date().toISOString());

  for (const event of events) {
    lines.push(
      "BEGIN:VEVENT",
      `UID:${event.uid}@miloscunda.com`,
      `DTSTAMP:${event.updatedAt ? toBasicDateTime(event.updatedAt) : fallbackStamp}`,
      `DTSTART;VALUE=DATE:${toBasicDate(event.start)}`,
      `DTEND;VALUE=DATE:${toBasicDate(event.end)}`,
      `SUMMARY:${escapeText(event.summary)}`,
      "END:VEVENT"
    );
  }

  lines.push("END:VCALENDAR");
  return lines.map(foldLine).join("\r\n") + "\r\n";
}
