/**
 * Cunda Milos — JSON-LD Schema Generator Library
 *
 * Typed generators for Schema.org structured data.
 * All functions return plain objects; the caller serializes via JSON.stringify.
 *
 * Entity graph:
 *   WebSite ──▶ Hotel (LocalBusiness)
 *                 ├── HotelRoom (per room)
 *                 └── publishes ──▶ Article
 *                                    ├── mentions ──▶ TouristAttraction / Museum / Place (standalone)
 *                                    ├── FAQPage (embedded)
 *                                    └── SpeakableSpecification
 */

import type { Lang } from "../i18n/ui";
import { useTranslations } from "../i18n/utils";

/* ─── Constants ─── */
export const SITE_URL = "https://cundamilos.com";
const HOTEL_NAME = "Cunda Milos";
const PHONE = "+905306566892";
const WHATSAPP = "+905306566892";

const COORDINATES = { latitude: 39.336233, longitude: 26.6576815 };

/**
 * Official off-site profiles for entity reconciliation (knowledge graph).
 * The Google Business Profile CID link doubles as hasMap below.
 * Add future profiles here as they are created (e.g. TripAdvisor, Facebook).
 */
const SAME_AS = [
  "https://www.instagram.com/cunda_milosotel",
  "https://maps.google.com/?cid=12231583961060775956",
  // "https://www.tripadvisor.com/…", // when the TripAdvisor listing exists
  // "https://www.facebook.com/…",    // when the Facebook page exists
];

const ADDRESS: Record<Lang, Record<string, string>> = {
  tr: {
    streetAddress: "Namık Kemal, 23009. Sokak No:7",
    addressLocality: "Ayvalık",
    addressRegion: "Balıkesir",
    postalCode: "10405",
    addressCountry: "TR",
  },
  en: {
    streetAddress: "Namık Kemal, 23009. Sokak No:7",
    addressLocality: "Ayvalık",
    addressRegion: "Balıkesir",
    postalCode: "10405",
    addressCountry: "TR",
  },
  el: {
    streetAddress: "Namık Kemal, 23009. Sokak No:7",
    addressLocality: "Αϊβαλί",
    addressRegion: "Μπαλίκεσιρ",
    postalCode: "10405",
    addressCountry: "TR",
  },
};

/* ─── Shared Types ─── */
type JsonLd = Record<string, unknown>;

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface RelatedEntity {
  name: string;
  type: string;
  sameAs?: string;
}

export interface FAQEntry {
  question: string;
  answer: string;
}

/* ══════════════════════════════════════════════
   1. CORE BUSINESS ENTITY — Hotel + LocalBusiness
   ══════════════════════════════════════════════ */

export function generateHotelSchema(lang: Lang): JsonLd {
  const t = useTranslations(lang);
  return {
    "@context": "https://schema.org",
    "@type": ["Hotel", "BedAndBreakfast", "LodgingBusiness", "LocalBusiness"],
    "@id": `${SITE_URL}/#hotel`,
    name: HOTEL_NAME,
    // "Cunda Milos Otel" matches the Google Business Profile name exactly;
    // "Milos Cunda" captures the common word-order flip in searches.
    alternateName: [
      "Cunda Milos Otel",
      "Cunda Milos Boutique Hotel",
      "Cunda Milos Butik Otel",
      "Cunda Milos Pansiyon",
      "Milos Cunda",
    ],
    slogan: t("hero.tagline"),
    description: t("meta.description"),
    url: `${SITE_URL}/${lang}/`,
    telephone: PHONE,
    email: "miloscunda@gmail.com",
    image: [
      `${SITE_URL}/images/gallery/exterior-facade.jpg`,
      `${SITE_URL}/images/experience/courtyard.jpg`,
      `${SITE_URL}/images/rooms/numara-1/bedroom.jpg`,
      `${SITE_URL}/images/gallery/windmill.jpg`,
    ],
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/images/logo.png`,
      width: 500,
      height: 500,
    },
    priceRange: "€€",
    currenciesAccepted: "TRY, EUR, USD",
    paymentAccepted: "Cash, Credit Card, Bank Transfer",
    checkinTime: "14:00",
    checkoutTime: "11:00",
    starRating: { "@type": "Rating", ratingValue: "4" },
    numberOfRooms: 6,
    petsAllowed: false,
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Free WiFi", value: true },
      { "@type": "LocationFeatureSpecification", name: "Air Conditioning", value: true },
      { "@type": "LocationFeatureSpecification", name: "Breakfast Included", value: true },
      { "@type": "LocationFeatureSpecification", name: "Sea View Rooms", value: true },
      { "@type": "LocationFeatureSpecification", name: "Garden & Courtyard", value: true },
      { "@type": "LocationFeatureSpecification", name: "Rooftop Terrace", value: true },
    ],
    address: { "@type": "PostalAddress", ...ADDRESS[lang] },
    geo: { "@type": "GeoCoordinates", ...COORDINATES },
    // Google Business Profile listing (stable CID link), not a bare pin
    hasMap: "https://maps.google.com/?cid=12231583961060775956",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: PHONE,
        contactType: "reservations",
        availableLanguage: ["Turkish", "English", "Greek"],
        areaServed: { "@type": "Country", name: "TR" },
      },
      {
        "@type": "ContactPoint",
        telephone: WHATSAPP,
        contactType: "customer support",
        description: "WhatsApp",
      },
    ],
    sameAs: SAME_AS,
    // Machine-readable "book direct via WhatsApp" — there is deliberately no
    // OTA channel; this tells search/answer engines how a booking happens.
    potentialAction: {
      "@type": "ReserveAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://wa.me/905306566892",
        actionPlatform: [
          "https://schema.org/DesktopWebPlatform",
          "https://schema.org/MobileWebPlatform",
        ],
        inLanguage: ["tr", "en", "el"],
      },
      result: { "@type": "LodgingReservation", name: "Direct reservation" },
    },
    subjectOf: {
      "@type": "AboutPage",
      url: `${SITE_URL}/${lang}/about`,
    },
    areaServed: {
      "@type": "Place",
      name: "Cunda Island (Alibey Island)",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Ayvalık",
        addressRegion: "Balıkesir",
        addressCountry: "TR",
      },
    },
    containedInPlace: {
      "@type": "Place",
      "@id": `${SITE_URL}/#cunda-island`,
      name: "Cunda Island",
      alternateName: ["Alibey Adası", "Αλιμπέι", "Alibey Island"],
      sameAs: "https://www.wikidata.org/wiki/Q2740733",
      geo: { "@type": "GeoCoordinates", latitude: 39.33, longitude: 26.65 },
    },
    // Speakable: what voice assistants should read aloud for this business
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["[data-speakable-name]", "[data-speakable-desc]"],
    },
  };
}

/* ══════════════════════════════════════════════
   2. WEBSITE SCHEMA
   ══════════════════════════════════════════════ */

export function generateWebSiteSchema(lang: Lang): JsonLd {
  const t = useTranslations(lang);
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: HOTEL_NAME,
    url: `${SITE_URL}/${lang}/`,
    description: t("meta.description"),
    inLanguage: lang === "tr" ? "tr-TR" : lang === "el" ? "el-GR" : "en-US",
    publisher: { "@id": `${SITE_URL}/#hotel` },
    potentialAction: {
      "@type": "ReadAction",
      target: `${SITE_URL}/${lang}/guide`,
    },
  };
}

/* ══════════════════════════════════════════════
   3. BREADCRUMB LIST
   ══════════════════════════════════════════════ */

export function generateBreadcrumbSchema(items: BreadcrumbItem[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/* ══════════════════════════════════════════════
   4. HOTEL ROOM
   ══════════════════════════════════════════════ */

export interface RoomSchemaInput {
  slug: string;
  name: string;
  description: string;
  image: string;
  gallery: string[];
  occupancy: { adults: number; children: number };
  size: { value: number; unit: string };
  bedType: string;
  amenities: string[];
  priceHint?: { amount: number; currency: string };
}

export function generateRoomSchema(lang: Lang, room: RoomSchemaInput): JsonLd {
  const roomUrl = `${SITE_URL}/${lang}/rooms/${room.slug}`;
  const resolveImg = (src: string) =>
    src.startsWith("http") ? src : `${SITE_URL}${src}`;

  return {
    "@context": "https://schema.org",
    "@type": "HotelRoom",
    "@id": `${roomUrl}#room`,
    name: room.name,
    description: room.description,
    url: roomUrl,
    image: [room.image, ...room.gallery].map(resolveImg),
    occupancy: {
      "@type": "QuantitativeValue",
      value: room.occupancy.adults + room.occupancy.children,
      unitText: "persons",
    },
    floorSize: {
      "@type": "QuantitativeValue",
      value: room.size.value,
      unitCode: room.size.unit === "m2" ? "MTK" : "FTK",
    },
    bed: {
      "@type": "BedDetails",
      typeOfBed: room.bedType,
      numberOfBeds: 1,
    },
    amenityFeature: room.amenities.map((name) => ({
      "@type": "LocationFeatureSpecification",
      name,
      value: true,
    })),
    ...(room.priceHint && {
      priceRange: `From ${room.priceHint.currency === "EUR" ? "€" : room.priceHint.currency}${room.priceHint.amount}`,
    }),
    containedInPlace: { "@id": `${SITE_URL}/#hotel` },
  };
}

/* ══════════════════════════════════════════════
   5. ARTICLE (with SpeakableSpecification)
   ══════════════════════════════════════════════ */

export interface ArticleSchemaInput {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  author?: string;
  publishedAt: string;
  updatedAt?: string;
  relatedEntities?: RelatedEntity[];
}

export function generateArticleSchema(lang: Lang, article: ArticleSchemaInput): JsonLd {
  const articleUrl = `${SITE_URL}/${lang}/guide/${article.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${articleUrl}#article`,
    headline: article.title,
    description: article.excerpt,
    url: articleUrl,
    image: article.image.startsWith("http")
      ? article.image
      : `${SITE_URL}${article.image}`,
    datePublished: article.publishedAt,
    ...(article.updatedAt && { dateModified: article.updatedAt }),
    inLanguage: lang === "tr" ? "tr-TR" : lang === "el" ? "el-GR" : "en-US",
    author: {
      "@type": "Organization",
      name: HOTEL_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/images/logo.png`,
    },
    publisher: { "@id": `${SITE_URL}/#hotel` },
    mainEntityOfPage: { "@id": articleUrl },
    isPartOf: { "@id": `${SITE_URL}/#website` },
    // Mentions — inline entity references for GEO
    ...(article.relatedEntities &&
      article.relatedEntities.length > 0 && {
        mentions: article.relatedEntities.map((entity) => ({
          "@type": entity.type,
          name: entity.name,
          ...(entity.sameAs && { sameAs: entity.sameAs }),
        })),
      }),
    // Speakable: headline + excerpt for voice/RAG citation
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".prose-guide > p:first-of-type", "h1"],
    },
  };
}

/* ══════════════════════════════════════════════
   6. STANDALONE ENTITIES (TouristAttraction, Museum, Place, etc.)
   Extracted from article relatedEntities and emitted as
   independent JSON-LD blocks for direct entity resolution.
   ══════════════════════════════════════════════ */

/**
 * Maps MDX relatedEntity type strings to Schema.org @type values.
 */
const ENTITY_TYPE_MAP: Record<string, string> = {
  Place: "Place",
  Restaurant: "Restaurant",
  LandmarksOrHistoricalBuildings: "TouristAttraction",
  Museum: "Museum",
  Event: "Event",
  FoodEstablishment: "FoodEstablishment",
  TouristAttraction: "TouristAttraction",
  CafeOrCoffeeShop: "CafeOrCoffeeShop",
  Beach: "Beach",
};

export interface StandaloneEntityInput {
  name: string;
  type: string;
  sameAs?: string;
  /** The article URL that mentions this entity */
  mentionedInUrl: string;
  /** Language for containedInPlace label */
  lang: Lang;
}

export function generateStandaloneEntitySchema(entity: StandaloneEntityInput): JsonLd {
  const schemaType = ENTITY_TYPE_MAP[entity.type] ?? "Place";

  return {
    "@context": "https://schema.org",
    "@type": schemaType,
    name: entity.name,
    ...(entity.sameAs && { sameAs: entity.sameAs }),
    // Ground to Cunda Island for spatial context
    containedInPlace: {
      "@type": "Place",
      "@id": `${SITE_URL}/#cunda-island`,
      name: "Cunda Island",
      sameAs: "https://www.wikidata.org/wiki/Q2740733",
    },
    // Back-link to the article that provides information about this entity
    subjectOf: {
      "@type": "Article",
      url: entity.mentionedInUrl,
    },
    // Attach to our hotel's area
    isPartOf: {
      "@type": "Place",
      name: entity.lang === "tr" ? "Ayvalık" : entity.lang === "el" ? "Αϊβαλί" : "Ayvalık",
      sameAs: "https://www.wikidata.org/wiki/Q793383",
    },
  };
}

/**
 * Batch generator: takes an article's relatedEntities array
 * and returns an array of standalone JSON-LD schemas.
 */
export function generateStandaloneEntitiesFromArticle(
  lang: Lang,
  articleSlug: string,
  entities?: RelatedEntity[]
): JsonLd[] {
  if (!entities || entities.length === 0) return [];

  const articleUrl = `${SITE_URL}/${lang}/guide/${articleSlug}`;

  return entities.map((entity) =>
    generateStandaloneEntitySchema({
      name: entity.name,
      type: entity.type,
      sameAs: entity.sameAs,
      mentionedInUrl: articleUrl,
      lang,
    })
  );
}

/* ══════════════════════════════════════════════
   7. FAQ PAGE
   For conversational AI / RAG citation readiness.
   ══════════════════════════════════════════════ */

export function generateFAQSchema(faqs: FAQEntry[]): JsonLd | null {
  if (!faqs || faqs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/* ══════════════════════════════════════════════
   8. ITEM LIST (for guide listing & rooms listing pages)
   Signals to search engines the ordered collection of items.
   ══════════════════════════════════════════════ */

export interface ItemListEntry {
  name: string;
  url: string;
  image?: string;
  position: number;
}

/* ══════════════════════════════════════════════
   9. ABOUT PAGE
   Grounds the brand entity: the page whose main
   subject is the hotel itself (see Hotel.subjectOf).
   ══════════════════════════════════════════════ */

export function generateAboutPageSchema(lang: Lang, title: string, description: string): JsonLd {
  const pageUrl = `${SITE_URL}/${lang}/about`;
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${pageUrl}#about`,
    name: title,
    description,
    url: pageUrl,
    inLanguage: lang === "tr" ? "tr-TR" : lang === "el" ? "el-GR" : "en-US",
    mainEntity: { "@id": `${SITE_URL}/#hotel` },
    isPartOf: { "@id": `${SITE_URL}/#website` },
  };
}

export function generateItemListSchema(
  listName: string,
  items: ItemListEntry[]
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: listName,
    numberOfItems: items.length,
    itemListElement: items.map((item) => ({
      "@type": "ListItem",
      position: item.position,
      name: item.name,
      url: item.url,
      ...(item.image && {
        image: item.image.startsWith("http")
          ? item.image
          : `${SITE_URL}${item.image}`,
      }),
    })),
  };
}
