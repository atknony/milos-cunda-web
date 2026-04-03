/**
 * Milos Cunda — Content Collections Configuration
 * Defines schemas for: rooms, guides
 * Uses Astro Content Collections with Zod validation.
 */

import { defineCollection, z } from "astro:content";

/* ─── Shared Schema Fragments ─── */

const localizedString = z.object({
  tr: z.string(),
  en: z.string(),
  el: z.string(),
});

const imageAsset = z.object({
  src: z.string().describe("Path relative to /public or an imported image"),
  alt: localizedString.describe("Localized alt text for accessibility & SEO"),
  width: z.number().optional(),
  height: z.number().optional(),
});

const seoMeta = z
  .object({
    title: localizedString.optional(),
    description: localizedString.optional(),
    ogImage: z.string().optional(),
  })
  .optional();

/* ─── Rooms Collection ─── */

const rooms = defineCollection({
  type: "data", // JSON/YAML data files
  schema: z.object({
    /** URL-safe identifier (used in routing) */
    slug: z.string().regex(/^[a-z0-9-]+$/),

    /** Display order on listing pages */
    sortOrder: z.number().int().min(0).default(0),

    /** Localized room name */
    title: localizedString,

    /** Short tagline / selling point */
    tagline: localizedString.optional(),

    /** Rich description (supports markdown) */
    description: localizedString,

    /** Room specifications */
    capacity: z.object({
      adults: z.number().int().min(1).max(6),
      children: z.number().int().min(0).max(4).default(0),
    }),
    size: z.object({
      value: z.number().positive(),
      unit: z.enum(["m2", "sqft"]).default("m2"),
    }),

    /** Bed configuration */
    bedType: localizedString,

    /** Room view */
    view: localizedString.optional(),

    /** Feature list */
    amenities: z.array(
      z.object({
        icon: z.string().describe("Lucide icon name or custom SVG path"),
        label: localizedString,
      })
    ),

    /** Pricing hint (shown as 'starting from', no live rates) */
    priceHint: z
      .object({
        amount: z.number().positive(),
        currency: z.enum(["TRY", "EUR", "USD"]).default("EUR"),
        period: z.enum(["night", "week"]).default("night"),
      })
      .optional(),

    /** Image gallery */
    featuredImage: imageAsset,
    gallery: z.array(imageAsset).min(1).max(20),

    /** Room-specific JSON-LD overrides */
    seo: seoMeta,

    /** Visibility flag */
    isPublished: z.boolean().default(true),
  }),
});

/* ─── Guides Collection ─── */

const guides = defineCollection({
  type: "content", // Markdown/MDX files
  schema: z.object({
    /** URL-safe identifier */
    urSlug: z.string().regex(/^[a-z0-9-]+$/),

    /** Language of this content file */
    lang: z.enum(["tr", "en", "el"]),

    /** Display order */
    sortOrder: z.number().int().min(0).default(0),

    /** Content category for filtering */
    category: z.enum([
      "history",
      "architecture",
      "gastronomy",
      "nature",
      "culture",
      "activities",
    ]),

    /** Article title */
    title: z.string(),

    /** Short summary for cards and meta descriptions */
    excerpt: z.string().max(300),

    /** Featured image */
    featuredImage: imageAsset,

    /** Author (optional, for editorial credibility) */
    author: z.string().optional(),

    /** Publication & update dates */
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),

    /** Related entities for GEO / Schema.org enrichment */
    relatedEntities: z
      .array(
        z.object({
          name: z.string(),
          type: z
            .enum([
              "Place",
              "Restaurant",
              "LandmarksOrHistoricalBuildings",
              "Museum",
              "Event",
              "FoodEstablishment",
            ])
            .default("Place"),
          sameAs: z.string().url().optional().describe("Wikidata or Wikipedia URL"),
        })
      )
      .optional(),

    /** SEO overrides */
    seo: seoMeta,

    /** Visibility flag */
    isPublished: z.boolean().default(true),
  }),
});

/* ─── Export ─── */

export const collections = { rooms, guides };
