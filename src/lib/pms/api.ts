import type { APIContext } from "astro";
import { getSessionUser } from "@/lib/supabase/server";

/** JSON yanıt kısayolu. */
export function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

/**
 * Oturum doğrulaması — middleware'e ek savunma katmanı.
 * Oturum yoksa 401 Response döndürür; varsa null (devam et).
 */
export async function requireSession(context: APIContext): Promise<Response | null> {
  const user = await getSessionUser(context.request, context.cookies);
  if (!user) {
    return json({ error: "Oturum gerekli." }, 401);
  }
  return null;
}
