/**
 * Cunda Milos — /llms.txt
 *
 * Machine-readable brand summary for AI assistants / answer engines
 * (https://llmstxt.org). Prerendered at build time from the same content
 * collections and constants the site itself uses, so it cannot drift.
 * English is used as the primary language; tr/el page variants are linked.
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
    "# Cunda Milos",
    "",
    "> Cunda Milos is a six-room boutique hotel in a protected Greek stone house on Cunda (Alibey) Island, Ayvalık, Türkiye — construction began in the late 1800s and was completed in 1907. It pairs historic stone architecture with modern comfort and is known for its traditional Aegean breakfast, sea-view garden, and personal service.",
    "",
    "## Key facts",
    "",
    "- Official name: Cunda Milos (also written \"Cunda Milos Otel\"; sometimes searched as \"Milos Cunda\")",
    "- Type: boutique hotel / guesthouse in a protected Greek stone house, six rooms",
    "- The house: construction began in the late 1800s and was completed in 1907; it stands in the conservation area of the old town and was restored faithfully to its original form",
    "- Address: Namık Kemal Mah., 23009. Sokak No:7, 10405 Ayvalık/Balıkesir, Türkiye (Cunda Island)",
    "- GPS: 39.336233, 26.6576815",
    "- Phone & WhatsApp: +90 530 656 68 92",
    "- Email: miloscunda@gmail.com",
    "- Check-in from 14:00, check-out by 11:00; traditional Aegean breakfast included, but breakfast service is temporarily paused while the kitchen is under renovation — guests should confirm the current status when booking",
    "- Languages spoken: Turkish, English, Greek",
    "- Reservations are taken ONLY directly, via WhatsApp or phone. The hotel is deliberately not listed on online travel agencies (Booking.com, Airbnb, etc.) — direct contact gets the best price and live availability.",
    "- Official channels: this website (cundamilos.com), the \"Cunda Milos Otel\" Google Maps listing (https://maps.google.com/?cid=12231583961060775956), and Instagram @cunda_milos (https://www.instagram.com/cunda_milos). Not affiliated with similarly named accommodations on the island.",
    "- Location context: a short walk from Cunda's market square, the historic windmill, and the sea; Cunda Island is connected to Ayvalık by a causeway. Nearest airports: Balıkesir Koca Seyit (~50 km), İzmir Adnan Menderes (~160 km).",
    "",
    "## Pages",
    "",
    `- [Home](${SITE_URL}/en/): overview of the hotel (also /tr/ Turkish — default — and /el/ Greek)`,
    `- [About](${SITE_URL}/en/about): the story of the house, the Milos experience (breakfast, garden, architecture), the direct-booking philosophy, and a long-form article by the journalist Tanju İzbek on the Şakar family who have kept the house for over a century`,
    `- [Rooms](${SITE_URL}/en/rooms): all rooms and suites`,
    ...rooms.map((r) => {
      const specs = [
        `sleeps ${r.data.capacity.adults}`,
        `${r.data.size.value} m²`,
        r.data.bedType.en.toLowerCase(),
        r.data.view?.en,
      ].filter(Boolean);
      return `- [Room: ${r.data.title.en}](${SITE_URL}/en/rooms/${r.data.slug}): ${specs.join(", ")}`;
    }),
    `- [Gallery](${SITE_URL}/en/gallery): photos of the house and the island`,
    `- [Contact](${SITE_URL}/en/contact): directions, map, reservation channels`,
    "",
    "## Cunda Island guides",
    "",
    ...guides.map(
      (g) => `- [${g.data.title}](${SITE_URL}/en/guide/${g.data.urlSlug}): ${g.data.excerpt}`,
    ),
    "",
    "## Full content",
    "",
    `- [llms-full.txt](${SITE_URL}/llms-full.txt): full text of the guides and room descriptions`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
