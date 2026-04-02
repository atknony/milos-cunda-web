/**
 * Milos Cunda — JSON-LD Schema Generators
 * Produces structured data for Hotel, LocalBusiness, BreadcrumbList.
 */

import type { Lang } from "../i18n/ui";
import { useTranslations } from "../i18n/utils";

const SITE_URL = "https://miloscunda.com";
const HOTEL_NAME = "Milos Cunda";
const PHONE = "+905336657431";
const WHATSAPP = "+905336657431";

const COORDINATES = {
  latitude: 39.3363,
  longitude: 26.6578,
};

const ADDRESS = {
  tr: {
    streetAddress: "Namık Kemal Mahallesi, Karanfil Sokak",
    addressLocality: "Ayvalık",
    addressRegion: "Balıkesir",
    postalCode: "10405",
    addressCountry: "TR",
  },
  en: {
    streetAddress: "Namık Kemal Mahallesi, Karanfil Sokak",
    addressLocality: "Ayvalık",
    addressRegion: "Balıkesir",
    postalCode: "10405",
    addressCountry: "TR",
  },
  el: {
    streetAddress: "Namık Kemal Mahallesi, Karanfil Sokak",
    addressLocality: "Αϊβαλί",
    addressRegion: "Μπαλίκεσιρ",
    postalCode: "10405",
    addressCountry: "TR",
  },
};

/**
 * Hotel + LocalBusiness combined schema.
 * Satisfies both Google's Hotel and LocalBusiness rich result types.
 */
export function generateHotelSchema(lang: Lang) {
  const t = useTranslations(lang);
  const addr = ADDRESS[lang];

  return {
    "@context": "https://schema.org",
    "@type": ["Hotel", "LocalBusiness"],
    "@id": `${SITE_URL}/#hotel`,
    name: HOTEL_NAME,
    alternateName: "Milos Cunda Boutique Hotel",
    description: t("meta.description"),
    url: `${SITE_URL}/${lang}/`,
    telephone: PHONE,
    image: [
      `${SITE_URL}/images/og/hotel-exterior.jpg`,
      `${SITE_URL}/images/og/hotel-interior.jpg`,
      `${SITE_URL}/images/og/hotel-terrace.jpg`,
    ],
    logo: `${SITE_URL}/images/logo.svg`,
    priceRange: "€€€",
    currenciesAccepted: "TRY, EUR, USD",
    paymentAccepted: "Cash, Credit Card",
    checkinTime: "14:00",
    checkoutTime: "11:00",
    starRating: {
      "@type": "Rating",
      ratingValue: "4",
    },
    numberOfRooms: 6,
    petsAllowed: false,
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Free WiFi", value: true },
      { "@type": "LocationFeatureSpecification", name: "Air Conditioning", value: true },
      { "@type": "LocationFeatureSpecification", name: "Breakfast Included", value: true },
      { "@type": "LocationFeatureSpecification", name: "Sea View", value: true },
      { "@type": "LocationFeatureSpecification", name: "Garden", value: true },
    ],
    address: {
      "@type": "PostalAddress",
      ...addr,
    },
    geo: {
      "@type": "GeoCoordinates",
      ...COORDINATES,
    },
    hasMap: `https://www.google.com/maps?q=${COORDINATES.latitude},${COORDINATES.longitude}`,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: PHONE,
        contactType: "reservations",
        availableLanguage: ["Turkish", "English", "Greek"],
      },
      {
        "@type": "ContactPoint",
        telephone: WHATSAPP,
        contactType: "customer support",
        description: "WhatsApp",
      },
    ],
    sameAs: [
      "https://www.instagram.com/miloscunda",
      "https://www.facebook.com/miloscunda",
      // Add TripAdvisor, Google Business, Booking.com profile URLs
    ],
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
      name: "Cunda Island",
      alternateName: ["Alibey Adası", "Αλιμπέι"],
      geo: {
        "@type": "GeoCoordinates",
        latitude: 39.33,
        longitude: 26.69,
      },
    },
  };
}

/**
 * BreadcrumbList schema generator.
 * Accepts an array of breadcrumb items.
 */
export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
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

/**
 * WebSite schema with SearchAction for sitelinks search box.
 */
export function generateWebSiteSchema(lang: Lang) {
  const t = useTranslations(lang);

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: HOTEL_NAME,
    url: `${SITE_URL}/${lang}/`,
    description: t("meta.description"),
    inLanguage: lang,
    publisher: {
      "@id": `${SITE_URL}/#hotel`,
    },
  };
}
