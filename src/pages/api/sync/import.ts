import type { APIRoute } from "astro";
import { timingSafeEqual } from "node:crypto";
import { getSessionUser } from "@/lib/supabase/server";
import { json, SYNC_ENABLED } from "@/lib/pms/api";
import { roleOf } from "@/lib/pms/roles";
import { runSync } from "@/lib/ical/sync";

export const prerender = false;
/** Vercel fonksiyon süresi — çok beslemeli senkronizasyon için */
export const maxDuration = 60;

function tokenMatches(provided: string | null): boolean {
  const secret = import.meta.env.CRON_SECRET;
  if (!provided || !secret) return false;
  const a = Buffer.from(provided);
  const b = Buffer.from(secret);
  return a.length === b.length && timingSafeEqual(a, b);
}

/**
 * İçe aktarma tetikleyicisi.
 * - Dış cron servisi (cron-job.org): ?token=CRON_SECRET ile GET
 * - Panel "Şimdi Senkronize Et": oturum çerezi ile GET/POST
 * Opsiyonel filtreler: ?feed_id=... veya ?room_id=...
 */
const handler: APIRoute = async (context) => {
  if (!SYNC_ENABLED) return json({ error: "Senkronizasyon şu an devre dışı." }, 403);

  const params = context.url.searchParams;

  const viaToken = tokenMatches(params.get("token"));
  const sessionUser = viaToken ? null : await getSessionUser(context.request, context.cookies);
  const viaSession = sessionUser !== null && roleOf(sessionUser) === "admin";
  if (!viaToken && !viaSession) return json({ error: "Yetkisiz." }, 401);

  try {
    const results = await runSync({
      trigger: viaToken ? "cron" : "manual",
      feedId: params.get("feed_id") ?? undefined,
      roomId: params.get("room_id") ?? undefined,
    });

    const totals = results.reduce(
      (acc, r) => ({
        feeds: acc.feeds + 1,
        eventsFound: acc.eventsFound + r.eventsFound,
        created: acc.created + r.created,
        updated: acc.updated + r.updated,
        cancelled: acc.cancelled + r.cancelled,
        errors: acc.errors + (r.error ? 1 : 0),
      }),
      { feeds: 0, eventsFound: 0, created: 0, updated: 0, cancelled: 0, errors: 0 }
    );

    return json({ ok: true, totals, results });
  } catch (err) {
    return json({ error: err instanceof Error ? err.message : "Senkronizasyon hatası." }, 500);
  }
};

export const GET = handler;
export const POST = handler;
