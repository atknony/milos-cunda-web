/**
 * Tarih yardımcıları — PMS genelinde tüm tarihler saat İÇERMEZ (yyyy-MM-dd).
 * check_out günü konaklamaya DAHİL DEĞİLDİR (iCal kuralı = otel çıkış günü).
 */

export const HOTEL_TIMEZONE = "Europe/Istanbul";

/** Sabit otel politikası — her rezervasyon için aynıdır, kayıt başına saklanmaz. */
export const CHECK_OUT_TIME = "11:00";
export const CHECK_IN_TIME = "13:00";

/** Otelin bulunduğu saat diliminde bugünün tarihi (yyyy-MM-dd). */
export function todayInHotelTz(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: HOTEL_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

/** yyyy-MM-dd → gün ortası UTC Date (saat dilimi kaymalarına dayanıklı). */
export function toDate(isoDate: string): Date {
  return new Date(`${isoDate}T12:00:00Z`);
}

/** Date → yyyy-MM-dd (UTC bileşenleri üzerinden). */
export function toIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** yyyy-MM-dd → dd.MM.yyyy (Türkçe gösterim). */
export function formatTr(isoDate: string): string {
  const [y, m, d] = isoDate.split("-");
  return `${d}.${m}.${y}`;
}

/** İki tarih arasındaki gece sayısı. */
export function nightsBetween(checkIn: string, checkOut: string): number {
  return Math.round((toDate(checkOut).getTime() - toDate(checkIn).getTime()) / 86_400_000);
}

/** Tarihe gün ekle (yyyy-MM-dd → yyyy-MM-dd). */
export function addDays(isoDate: string, days: number): string {
  const d = toDate(isoDate);
  d.setUTCDate(d.getUTCDate() + days);
  return toIsoDate(d);
}

/** İki tarih aralığı çakışıyor mu? (çıkış günü hariç yarı-açık aralıklar) */
export function rangesOverlap(
  aIn: string,
  aOut: string,
  bIn: string,
  bOut: string
): boolean {
  return aIn < bOut && aOut > bIn;
}
