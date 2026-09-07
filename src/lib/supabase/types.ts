/** PMS veritabanı satır tipleri (001_pms_schema.sql ile eşleşir). */

export type ReservationType = "booking" | "block";
export type ReservationStatus = "confirmed" | "cancelled";
/** Senkronizasyon askıya alındı — panel yalnızca elle girilen kaynakları destekler. */
export type BookingSource = "direct" | "phone" | "whatsapp" | "instagram";
export type FeedPlatform = "airbnb" | "booking_com" | "hotels_com" | "other";

export interface Room {
  id: string;
  name: string;
  public_slug: string | null;
  is_active: boolean;
  ical_token: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface IcalFeed {
  id: string;
  room_id: string;
  platform: FeedPlatform;
  url: string;
  is_active: boolean;
  last_synced_at: string | null;
  last_sync_status: string | null;
  last_sync_error: string | null;
  created_at: string;
}

export interface Reservation {
  id: string;
  room_id: string;
  type: ReservationType;
  status: ReservationStatus;
  guest_name: string | null;
  guest_phone: string | null;
  guest_email: string | null;
  /** yyyy-MM-dd */
  check_in: string;
  /** yyyy-MM-dd — çıkış günü dahil değil */
  check_out: string;
  source: BookingSource;
  notes: string | null;
  total_price: number | null;
  currency: string;
  deposit_paid: number | null;
  payment_note: string | null;
  feed_id: string | null;
  external_uid: string | null;
  external_summary: string | null;
  created_at: string;
  updated_at: string;
}

export interface SyncLog {
  id: number;
  ran_at: string;
  trigger: "cron" | "manual";
  feed_id: string | null;
  events_found: number;
  created: number;
  updated: number;
  cancelled: number;
  conflicts: number;
  error: string | null;
}

export interface ConflictPair {
  reservation_a: string;
  reservation_b: string;
  room_id: string;
}

/** Türkçe etiketler — panel genelinde tek kaynak. */
export const SOURCE_LABELS: Record<BookingSource, string> = {
  direct: "Doğrudan",
  phone: "Telefon",
  whatsapp: "WhatsApp",
  instagram: "Instagram",
};

export const PLATFORM_LABELS: Record<FeedPlatform, string> = {
  airbnb: "Airbnb",
  booking_com: "Booking.com",
  hotels_com: "Hotels.com",
  other: "Diğer",
};
