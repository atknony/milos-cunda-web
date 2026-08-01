/**
 * Cunda Milos — /llms-full.txt
 *
 * Expanded companion to /llms.txt (https://llmstxt.org): the same brand
 * summary plus the full markdown bodies of the English guide articles and
 * room descriptions, for answer engines that ingest long-form context.
 */

import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { SITE_URL } from "../lib/schema";

export const GET: APIRoute = async () => {
  const guides = (await getCollection("guides"))
    .filter((g) => g.data.lang === "en" && g.data.isPublished)
    .sort((a, b) => a.data.sortOrder - b.data.sortOrder);

  const rooms = (await getCollection("rooms"))
    .filter((r) => r.data.isPublished)
    .sort((a, b) => a.data.sortOrder - b.data.sortOrder);

  const lines = [
    "# Cunda Milos — full content",
    "",
    "> Cunda Milos is a six-room boutique hotel in a protected Greek stone house on Cunda (Alibey) Island, Ayvalık, Türkiye — construction began in the late 1800s and was completed in 1907. Reservations are taken only directly — by WhatsApp or phone (+90 530 656 68 92); the hotel is deliberately not listed on online booking platforms. Official channels: cundamilos.com, the \"Cunda Milos Otel\" Google Maps listing, and Instagram @cunda_milos.",
    "",
    "## Rooms",
    "",
    ...rooms.flatMap((r) => [
      `### ${r.data.title.en} (${SITE_URL}/en/rooms/${r.data.slug})`,
      "",
      r.data.tagline?.en ? `*${r.data.tagline.en}*` : "",
      "",
      r.data.description.en,
      "",
      `- Capacity: ${r.data.capacity.adults} adults${r.data.capacity.children ? ` + ${r.data.capacity.children} children` : ""}`,
      `- Size: ${r.data.size.value} ${r.data.size.unit === "m2" ? "m²" : "sq ft"}`,
      `- Bed: ${r.data.bedType.en}`,
      r.data.view?.en ? `- View: ${r.data.view.en}` : "",
      r.data.priceHint
        ? `- From ${r.data.priceHint.currency === "EUR" ? "€" : r.data.priceHint.currency}${r.data.priceHint.amount} per ${r.data.priceHint.period}`
        : "",
      "",
    ]),
    "## Cunda Island guides",
    "",
    ...guides.flatMap((g) => [
      `### ${g.data.title} (${SITE_URL}/en/guide/${g.data.urlSlug})`,
      "",
      g.data.excerpt,
      "",
      (g.body ?? "").trim(),
      "",
      "---",
      "",
    ]),
  ].filter((line) => line !== null);

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
