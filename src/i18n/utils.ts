/**
 * Milos Cunda — i18n Utilities
 * Handles language detection, path translation, and UI string resolution.
 */

import { ui, defaultLang, languages, type Lang, type UIKey } from "./ui";

/* ─── Language Detection ─── */

/**
 * Extract language code from a URL pathname.
 * Falls back to defaultLang if no valid prefix is found.
 */
export function getLangFromUrl(url: URL): Lang {
  const [, langSegment] = url.pathname.split("/");
  if (langSegment && langSegment in languages) {
    return langSegment as Lang;
  }
  return defaultLang;
}

/**
 * Returns a `t()` function bound to a specific language.
 * Supports interpolation via `{key}` placeholders.
 *
 * @example
 * const t = useTranslations("en");
 * t("cta.whatsapp");                            // "Book via WhatsApp"
 * t("room.guests", { count: "2" });              // "2 Guests"
 * t("whatsapp.roomMessage", { roomName: "Zeytin" }); // "Hello, I would like to inquire about the Zeytin room."
 */
export function useTranslations(lang: Lang) {
  return function t(
    key: UIKey,
    params?: Record<string, string | number>
  ): string {
    const entry = ui[key];
    if (!entry) {
      console.warn(`[i18n] Missing key: "${key}"`);
      return key;
    }

    let text: string = entry[lang] ?? entry[defaultLang];

    if (params) {
      for (const [param, value] of Object.entries(params)) {
        text = text.replace(new RegExp(`\\{${param}\\}`, "g"), String(value));
      }
    }

    return text;
  };
}

/* ─── Path Translation ─── */

/**
 * Route slug translations for named pages.
 * Keys are the internal route identifiers, values are localized slugs.
 */
/**
 * Route slug map.
 *
 * IMPORTANT: These MUST match the actual Astro page filenames under
 * src/pages/[lang]/. Astro's file-based routing uses the literal
 * filename as the URL segment. Language differentiation comes from
 * the /[lang]/ prefix, not from translated slugs.
 *
 * If you need localized URL segments (e.g. /tr/odalar/ instead of
 * /tr/rooms/), you must restructure pages to use [...slug] catch-all
 * routes with getStaticPaths generating every localized variant.
 */
const routeSlugs: Record<string, Record<Lang, string>> = {
  rooms:      { tr: "rooms",      en: "rooms",      el: "rooms" },
  experience: { tr: "experience", en: "experience", el: "experience" },
  guide:      { tr: "guide",      en: "guide",      el: "guide" },
  gallery:    { tr: "gallery",    en: "gallery",    el: "gallery" },
  contact:    { tr: "contact",    en: "contact",    el: "contact" },
};

/**
 * Get a localized URL path for a named route.
 *
 * @example
 * getLocalizedPath("en", "rooms");         // "/en/rooms"
 * getLocalizedPath("tr", "rooms");         // "/tr/odalar"
 * getLocalizedPath("el", "rooms", "deluxe"); // "/el/domatia/deluxe"
 */
export function getLocalizedPath(
  lang: Lang,
  route: string,
  slug?: string
): string {
  const localizedRoute = routeSlugs[route]?.[lang] ?? route;
  const base = `/${lang}/${localizedRoute}`;
  return slug ? `${base}/${slug}` : base;
}

/**
 * Get the home path for a given language.
 */
export function getHomePath(lang: Lang): string {
  return `/${lang}/`;
}

/**
 * Generate alternate language URLs for the current page (used for hreflang tags).
 * Accepts the current URL and returns all language variants.
 */
export function getAlternateUrls(
  currentUrl: URL,
  siteUrl: string
): { lang: Lang; href: string }[] {
  const currentLang = getLangFromUrl(currentUrl);
  const pathWithoutLang = currentUrl.pathname
    .replace(new RegExp(`^/${currentLang}`), "")
    .replace(/^\//, "");

  return (Object.keys(languages) as Lang[]).map((lang) => {
    // Attempt to reverse-map the slug for this path
    const segments = pathWithoutLang.split("/").filter(Boolean);
    const translatedSegments = segments.map((segment) => {
      // Find if this segment is a known translated slug
      for (const [routeKey, slugMap] of Object.entries(routeSlugs)) {
        if (Object.values(slugMap).includes(segment)) {
          return slugMap[lang];
        }
      }
      return segment; // content slugs stay the same
    });

    const newPath = translatedSegments.length
      ? `/${lang}/${translatedSegments.join("/")}`
      : `/${lang}/`;

    return { lang, href: `${siteUrl}${newPath}` };
  });
}

/* ─── WhatsApp URL Builder ─── */

const WHATSAPP_NUMBER = "905XXXXXXXXX"; // Replace with actual number

/**
 * Build a WhatsApp click-to-chat URL with a pre-filled localized message.
 */
export function getWhatsAppUrl(lang: Lang, roomName?: string): string {
  const t = useTranslations(lang);
  const message = roomName
    ? t("whatsapp.roomMessage", { roomName })
    : t("whatsapp.message");

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/* ─── Phone URL ─── */

const PHONE_NUMBER = "+90-5XX-XXX-XXXX"; // Replace with actual number

export function getPhoneUrl(): string {
  return `tel:${PHONE_NUMBER.replace(/[^+\d]/g, "")}`;
}
