-- ============================================================
-- Milos Cunda PMS — Şema v1
-- Supabase SQL Editor'de tek seferde çalıştırın.
-- ============================================================

-- ─── Enum'lar ───
create type reservation_type   as enum ('booking', 'block');
create type reservation_status as enum ('confirmed', 'cancelled');
create type booking_source     as enum ('direct', 'phone', 'whatsapp', 'airbnb', 'booking_com', 'hotels_com', 'other');
create type feed_platform      as enum ('airbnb', 'booking_com', 'hotels_com', 'other');

-- ─── Odalar ───
create table rooms (
  id          uuid primary key default gen_random_uuid(),
  name        text not null unique,
  public_slug text,                                -- src/content/rooms/*.json bağlantısı (opsiyonel)
  is_active   boolean not null default true,       -- silme yok, pasife alma var
  ical_token  text not null unique default encode(gen_random_bytes(24), 'hex'),
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ─── Dış iCal takvim adresleri (içe aktarma) ───
create table ical_feeds (
  id               uuid primary key default gen_random_uuid(),
  room_id          uuid not null references rooms(id) on delete cascade,
  platform         feed_platform not null,
  url              text not null,
  is_active        boolean not null default true,
  last_synced_at   timestamptz,
  last_sync_status text,                           -- 'ok' | 'error'
  last_sync_error  text,
  created_at       timestamptz not null default now(),
  unique (room_id, url)
);

create index ical_feeds_active_idx on ical_feeds (is_active);

-- ─── Rezervasyonlar ve blokajlar ───
create table reservations (
  id               uuid primary key default gen_random_uuid(),  -- aynı zamanda dışa aktarılan iCal UID'i
  room_id          uuid not null references rooms(id) on delete restrict,
  type             reservation_type not null default 'booking',
  status           reservation_status not null default 'confirmed',
  guest_name       text,
  guest_phone      text,
  guest_email      text,
  check_in         date not null,
  check_out        date not null,                  -- ÇIKIŞ GÜNÜ DAHİL DEĞİL (iCal kuralı)
  source           booking_source not null default 'direct',
  notes            text,
  total_price      numeric(10,2),
  currency         char(3) not null default 'TRY',
  deposit_paid     numeric(10,2),
  payment_note     text,
  feed_id          uuid references ical_feeds(id) on delete set null,  -- NULL = elle girilen kayıt
  external_uid     text,                           -- içe aktarılan VEVENT UID'i
  external_summary text,                           -- ham SUMMARY ("Reserved", "Not available"...)
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  constraint chk_dates check (check_out > check_in)
);

-- İçe aktarma için idempotent upsert anahtarı
create unique index reservations_feed_uid_idx
  on reservations (feed_id, external_uid) where feed_id is not null;

create index reservations_room_checkin_idx on reservations (room_id, check_in);
create index reservations_room_status_idx  on reservations (room_id, status);

-- ─── Senkronizasyon günlükleri ───
create table sync_logs (
  id           bigint generated always as identity primary key,
  ran_at       timestamptz not null default now(),
  trigger      text not null,                      -- 'cron' | 'manual'
  feed_id      uuid references ical_feeds(id) on delete set null,
  events_found integer not null default 0,
  created      integer not null default 0,
  updated      integer not null default 0,
  cancelled    integer not null default 0,
  conflicts    integer not null default 0,
  error        text
);

-- ─── Çakışma görünümü (okuma anında hesaplanır; bayrak saklanmaz) ───
create view v_conflicts as
select
  a.id as reservation_a,
  b.id as reservation_b,
  a.room_id
from reservations a
join reservations b
  on a.room_id = b.room_id
 and a.id < b.id
 and a.status = 'confirmed'
 and b.status = 'confirmed'
 and daterange(a.check_in, a.check_out) && daterange(b.check_in, b.check_out);

-- ─── updated_at tetikleyicisi ───
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

create trigger rooms_updated_at        before update on rooms        for each row execute function set_updated_at();
create trigger reservations_updated_at before update on reservations for each row execute function set_updated_at();

-- ─── RLS: tümü kapalı (deny-all) — erişim yalnızca service-role ile sunucudan ───
alter table rooms        enable row level security;
alter table ical_feeds   enable row level security;
alter table reservations enable row level security;
alter table sync_logs    enable row level security;
-- Bilinçli olarak hiçbir policy tanımlanmadı: anon/authenticated anahtarlar hiçbir satır göremez.
