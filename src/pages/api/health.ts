import type { APIRoute } from "astro";

export const prerender = false;

/** Basit sağlık kontrolü — SSR fonksiyonunun ayakta olduğunu doğrular. */
export const GET: APIRoute = () =>
  new Response(JSON.stringify({ ok: true, ts: new Date().toISOString() }), {
    headers: { "Content-Type": "application/json" },
  });
