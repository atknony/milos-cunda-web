-- ============================================================
-- Milos Cunda PMS — Panel sadeleştirme (v3)
-- - Mock odaların ve deneme rezervasyonlarının temizlenmesi
-- - Gerçek 6 oda ile yeniden tohumlama (Numara 1–6)
-- - Rezervasyon kaynakları: yalnızca Doğrudan / Telefon / WhatsApp / Instagram
--   (senkronizasyon askıya alındı — Airbnb/Booking.com/Hotels.com/Diğer kaldırıldı)
-- ============================================================

-- Mock veri: Zeytin/Peynir/Rakı/Balık/Ayvalık odalarına girilen deneme kayıtları.
delete from reservations;
delete from ical_feeds;
delete from rooms;

-- booking_source enum'unu daralt (tablo boş olduğu için cast güvenli).
alter table reservations alter column source drop default;

create type booking_source_new as enum ('direct', 'phone', 'whatsapp', 'instagram');

alter table reservations
  alter column source type booking_source_new
  using source::text::booking_source_new;

drop type booking_source;
alter type booking_source_new rename to booking_source;

alter table reservations alter column source set default 'direct';

-- Gerçek oda listesi.
insert into rooms (name, sort_order) values
  ('Numara 1', 0),
  ('Numara 2', 1),
  ('Numara 3', 2),
  ('Numara 4', 3),
  ('Numara 5', 4),
  ('Numara 6', 5);
